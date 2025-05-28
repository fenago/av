import { GoogleGenerativeAI } from '@google/generative-ai';
import { getEffectiveAPIKey, logTokenUsage } from './apiKeyManager';
import { getUserProfile } from './userProfile';
import RateLimiterService from './rateLimiter';

export interface GeminiRequestOptions {
  userId: string;
  model?: string;
  systemPrompt?: string;
  maxTokens?: number;
  temperature?: number;
  appName?: string;
  sessionId?: string;
}

export interface GeminiResponse {
  content: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    cost: number;
  };
  model: string;
  requestId: string;
}

// Token pricing for different Gemini models (per 1000 tokens)
const MODEL_PRICING = {
  'gemini-2.0-flash-exp': {
    input: 0.00015,   // $0.00015 per 1K input tokens
    output: 0.0006,   // $0.0006 per 1K output tokens
  },
  'gemini-2.0-flash-thinking-exp': {
    input: 0.00015,
    output: 0.0006,
  },
  'gemini-1.5-pro': {
    input: 0.00125,   // $0.00125 per 1K input tokens
    output: 0.005,    // $0.005 per 1K output tokens
  },
  'gemini-1.5-flash': {
    input: 0.000075,  // $0.000075 per 1K input tokens
    output: 0.0003,   // $0.0003 per 1K output tokens
  }
};

class GeminiService {
  private static instance: GeminiService;
  private clients: Map<string, GoogleGenerativeAI> = new Map();

  private constructor() {}

  public static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  private async getClient(userId: string): Promise<GoogleGenerativeAI> {
    // Check if we already have a client for this user
    if (this.clients.has(userId)) {
      return this.clients.get(userId)!;
    }

    // Get the effective API key (user's key or admin override)
    const effectiveKey = await getEffectiveAPIKey(userId);
    
    if (!effectiveKey) {
      throw new Error('No API key available. Please add your Gemini API key in your profile.');
    }

    // Create new client and cache it
    const client = new GoogleGenerativeAI(effectiveKey);
    this.clients.set(userId, client);
    
    return client;
  }

  public async generateContent(
    prompt: string, 
    options: GeminiRequestOptions
  ): Promise<GeminiResponse> {
    const requestId = crypto.randomUUID();
    const model = options.model || 'gemini-2.0-flash-exp';
    const startTime = Date.now();

    try {
      // Get user profile for quota checking
      const userProfile = await getUserProfile(options.userId);
      if (!userProfile) {
        throw new Error('User profile not found');
      }

      // Estimate tokens for rate limiting (rough approximation)
      const estimatedTokens = Math.ceil(prompt.length / 4) + (options.maxTokens || 2048);

      // Check rate limits and quotas
      const rateLimitCheck = await RateLimiterService.checkRateLimit(
        options.userId,
        userProfile.role,
        options.appName || 'chat',
        estimatedTokens
      );

      if (!rateLimitCheck.allowed) {
        const error = new Error(rateLimitCheck.error || 'Rate limit exceeded');
        (error as any).retryAfter = rateLimitCheck.retryAfter;
        (error as any).type = 'RATE_LIMIT_EXCEEDED';
        throw error;
      }

      // Get Gemini client
      const client = await this.getClient(options.userId);
      const geminiModel = client.getGenerativeModel({ 
        model,
        generationConfig: {
          maxOutputTokens: options.maxTokens || 2048,
          temperature: options.temperature || 0.7,
        },
        systemInstruction: options.systemPrompt || "You are DrLeeGPT, an educational AI assistant focused on helping with teaching and learning."
      });

      // Generate content
      const result = await geminiModel.generateContent(prompt);
      const response = await result.response;
      const content = response.text();

      // Calculate usage and costs
      const usage = this.calculateUsage(prompt, content, model);
      const endTime = Date.now();

      // Log token usage asynchronously
      this.logUsageAsync({
        userId: options.userId,
        model,
        promptTokens: usage.promptTokens,
        completionTokens: usage.completionTokens,
        totalTokens: usage.totalTokens,
        cost: usage.cost,
        sessionId: options.sessionId,
        requestId,
        appName: options.appName || 'chat',
        responseTime: endTime - startTime,
      });

      return {
        content,
        usage,
        model,
        requestId,
      };

    } catch (error: any) {
      // Log error for monitoring
      console.error('Gemini API Error:', {
        userId: options.userId,
        model,
        error: error.message,
        requestId,
      });

      // Handle specific error types
      if (error.type === 'RATE_LIMIT_EXCEEDED') {
        throw error; // Pass through rate limit errors with retry info
      } else if (error.message?.includes('API_KEY_INVALID')) {
        throw new Error('Invalid API key. Please check your Gemini API key in your profile.');
      } else if (error.message?.includes('QUOTA_EXCEEDED')) {
        throw new Error('API quota exceeded. Please check your usage limits.');
      } else if (error.message?.includes('RATE_LIMIT_EXCEEDED')) {
        throw new Error('Rate limit exceeded. Please try again in a moment.');
      }

      throw new Error(`AI service error: ${error.message}`);
    }
  }

  private calculateUsage(prompt: string, response: string, model: string) {
    // Approximate token calculation (more accurate would use actual tokenizer)
    const promptTokens = Math.ceil(prompt.length / 4); // Rough approximation
    const completionTokens = Math.ceil(response.length / 4);
    const totalTokens = promptTokens + completionTokens;

    // Calculate cost based on model pricing
    const pricing = MODEL_PRICING[model as keyof typeof MODEL_PRICING] || MODEL_PRICING['gemini-2.0-flash-exp'];
    const promptCost = (promptTokens / 1000) * pricing.input;
    const completionCost = (completionTokens / 1000) * pricing.output;
    const cost = promptCost + completionCost;

    return {
      promptTokens,
      completionTokens,
      totalTokens,
      cost: Math.round(cost * 10000) / 10000, // Round to 4 decimal places
    };
  }

  private async logUsageAsync(usage: {
    userId: string;
    model: string;
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    cost: number;
    sessionId?: string;
    requestId: string;
    appName: string;
    responseTime: number;
  }) {
    try {
      await logTokenUsage(usage.userId, {
        model: usage.model,
        promptTokens: usage.promptTokens,
        completionTokens: usage.completionTokens,
        totalTokens: usage.totalTokens,
        cost: usage.cost,
        sessionId: usage.sessionId,
        requestId: usage.requestId,
      });

      // Also log to analytics/monitoring (if needed)
      this.logAnalytics(usage);
    } catch (error) {
      console.error('Failed to log token usage:', error);
      // Don't throw here - we don't want usage logging failures to break the main request
    }
  }

  private logAnalytics(usage: any) {
    // Send to analytics service, monitoring, etc.
    // This could be enhanced with real-time dashboard updates
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Token Usage:', {
        user: usage.userId,
        app: usage.appName,
        tokens: usage.totalTokens,
        cost: `$${usage.cost.toFixed(4)}`,
        responseTime: `${usage.responseTime}ms`,
      });
    }
  }

  private async checkRateLimits(userId: string, userRole: string): Promise<void> {
    // This method is now handled by the RateLimiterService above
    // Keeping for backward compatibility but it's no longer used
    return Promise.resolve();
  }

  public clearClientCache(userId?: string) {
    if (userId) {
      this.clients.delete(userId);
    } else {
      this.clients.clear();
    }
  }

  // Streaming support for real-time responses
  public async generateContentStream(
    prompt: string,
    options: GeminiRequestOptions,
    onChunk: (chunk: string) => void
  ): Promise<GeminiResponse> {
    const requestId = crypto.randomUUID();
    const model = options.model || 'gemini-2.0-flash-exp';
    const startTime = Date.now();

    try {
      await this.checkRateLimits(options.userId, 'FREE'); // TODO: Get actual user role

      const client = await this.getClient(options.userId);
      const geminiModel = client.getGenerativeModel({ 
        model,
        generationConfig: {
          maxOutputTokens: options.maxTokens || 2048,
          temperature: options.temperature || 0.7,
        },
        systemInstruction: options.systemPrompt || "You are DrLeeGPT, an educational AI assistant."
      });

      const result = await geminiModel.generateContentStream(prompt);
      let fullResponse = '';

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        fullResponse += chunkText;
        onChunk(chunkText);
      }

      const usage = this.calculateUsage(prompt, fullResponse, model);
      const endTime = Date.now();

      // Log usage
      this.logUsageAsync({
        userId: options.userId,
        model,
        promptTokens: usage.promptTokens,
        completionTokens: usage.completionTokens,
        totalTokens: usage.totalTokens,
        cost: usage.cost,
        sessionId: options.sessionId,
        requestId,
        appName: options.appName || 'chat',
        responseTime: endTime - startTime,
      });

      return {
        content: fullResponse,
        usage,
        model,
        requestId,
      };

    } catch (error: any) {
      console.error('Gemini Streaming Error:', error);
      throw new Error(`Streaming error: ${error.message}`);
    }
  }
}

export default GeminiService.getInstance();
