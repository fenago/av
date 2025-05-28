import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/next-auth';
import { getUserProfile } from '@/libs/userProfile';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { decryptAPIKey } from '@/libs/encryption';

interface ChatRequest {
  message: string;
  mode?: string;
  sessionId?: string;
  conversationHistory?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  stream?: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { 
      message, 
      mode = 'Learn',
      sessionId,
      conversationHistory = [],
      stream = true
    }: ChatRequest = await req.json();

    if (!message?.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Get user profile and API key
    const userProfile = await getUserProfile(session.user.id);
    
    if (!userProfile) {
      return NextResponse.json(
        { 
          error: 'User profile not found',
          message: 'User profile not found. Please complete your profile setup.',
          action: 'setup_profile'
        },
        { status: 404 }
      );
    }

    // Check if user has a valid API key
    if (!userProfile.apiKey?.encryptedKey || !userProfile.apiKey.isValid) {
      return NextResponse.json(
        { 
          error: 'No valid Gemini API key found',
          message: 'No valid Gemini API key found. Please add your API key in Profile Settings to use DrLeeGPT.',
          action: 'configure_api_key'
        },
        { status: 400 }
      );
    }

    // Decrypt the user's API key
    let apiKey: string;
    try {
      apiKey = await decryptAPIKey(userProfile.apiKey.encryptedKey, userProfile.apiKey.salt!);
    } catch (error) {
      console.error('Failed to decrypt API key:', error);
      return NextResponse.json(
        { 
          error: 'Failed to decrypt API key',
          message: 'Failed to decrypt API key. Please re-add your API key in Profile Settings.',
          action: 'configure_api_key'
        },
        { status: 500 }
      );
    }

    // Initialize Gemini with user's API key
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      systemInstruction: generateSystemPrompt(userProfile.role, mode)
    });

    // Build conversation context
    const contents = [
      // Add conversation history
      ...conversationHistory.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
      })),
      // Add current message with educational context
      {
        role: 'user' as const,
        parts: [{ text: message }]
      }
    ];

    const generationConfig = {
      temperature: 0.7,
      maxOutputTokens: 4096,
    };

    if (stream) {
      // Return streaming response
      const response = await model.generateContentStream({
        contents,
        generationConfig,
      });

      // Create readable stream for SSE
      const encoder = new TextEncoder();
      
      const readableStream = new ReadableStream({
        async start(controller) {
          try {
            let fullContent = '';
            
            for await (const chunk of response.stream) {
              const chunkText = chunk.text();
              if (chunkText) {
                fullContent += chunkText;
                
                // Send streaming chunk
                const sseData = `data: ${JSON.stringify({
                  type: 'chunk',
                  content: chunkText
                })}\n\n`;
                controller.enqueue(encoder.encode(sseData));
              }
            }

            // Detect learning principles in the response
            const learningPrinciples = detectLearningPrinciples(fullContent, mode);

            // Send final completion with learning principles
            const completeData = `data: ${JSON.stringify({
              type: 'complete',
              learningPrinciples: learningPrinciples,
              mode: mode
            })}\n\n`;
            controller.enqueue(encoder.encode(completeData));
            
            controller.close();
          } catch (error: any) {
            console.error('Streaming error:', error);
            
            // Handle quota exceeded or API errors
            if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
              const errorData = `data: ${JSON.stringify({
                type: 'error',
                message: 'API quota exceeded. Please check your usage limits or upgrade your plan.',
                action: 'check_usage'
              })}\n\n`;
              controller.enqueue(encoder.encode(errorData));
            } else {
              const errorData = `data: ${JSON.stringify({
                type: 'error',
                message: 'An error occurred while generating the response.'
              })}\n\n`;
              controller.enqueue(encoder.encode(errorData));
            }
            
            controller.close();
          }
        }
      });

      return new NextResponse(readableStream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    } else {
      // Non-streaming response for compatibility
      const response = await model.generateContent({
        contents,
        generationConfig,
      });

      const responseText = response.response.text();
      const learningPrinciples = detectLearningPrinciples(responseText, mode);

      return NextResponse.json({
        success: true,
        data: {
          message: responseText,
          learningPrinciples: learningPrinciples,
          mode: mode
        }
      });
    }

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Failed to process your request. Please try again.',
        action: 'retry'
      },
      { status: 500 }
    );
  }
}

function generateSystemPrompt(mode: string, userRole: string = 'USER'): string {
  const basePrompt = `You are DrLeeGPT, an advanced educational AI assistant with five educational superpowers:

🎯 **Educational Superpowers:**
1. **Personalized Learning** - Adapt content to individual learning styles and pace
2. **Active Learning** - Engage learners through interactive experiences and questions
3. **Meaningful Learning** - Connect new concepts to existing knowledge and real-world applications
4. **Social Learning** - Encourage collaboration, discussion, and peer interaction
5. **Metacognitive Awareness** - Help learners reflect on their learning process

📋 **Response Guidelines:**
- Use clear, conversational language
- Format responses with proper markdown for readability
- Include engaging questions to promote active learning
- Provide concrete examples and analogies
- Encourage reflection and self-assessment
- Structure responses logically with headings and bullet points when helpful

🎯 **Current Mode: ${mode}**`;

  const modeInstructions = {
    'Learn': `
**Learn Mode - Master New Concepts:**
- Break down complex topics into digestible chunks
- Provide multiple examples and analogies
- Use scaffolding to build understanding progressively
- Ask checking questions to ensure comprehension
- Offer practice opportunities and reinforcement`,

    'Explore': `
**Explore Mode - Guided Discovery:**
- Encourage curiosity and investigation
- Ask thought-provoking questions
- Guide learners to discover connections
- Provide resources for deeper exploration
- Support inquiry-based learning`,

    'Create': `
**Create Mode - Generate Educational Content:**
- Help design lessons, activities, and assessments
- Provide templates and frameworks
- Suggest creative approaches to content delivery
- Support project-based learning initiatives
- Offer feedback on educational materials`,

    'Assess': `
**Assess Mode - Evaluate Understanding:**
- Create formative and summative assessments
- Provide rubrics and evaluation criteria
- Suggest self-assessment strategies
- Offer constructive feedback techniques
- Support data-driven instruction decisions`
  };

  const roleContext = userRole === 'INSTRUCTOR' || userRole === 'ADMIN' 
    ? '\n🎓 **Instructor Context:** You are assisting an educator. Focus on pedagogical strategies, classroom management, and instructional design.'
    : '\n👨‍🎓 **Learner Context:** You are assisting a student. Focus on understanding, skill development, and learning strategies.';

  return basePrompt + '\n' + (modeInstructions[mode as keyof typeof modeInstructions] || modeInstructions['Learn']) + roleContext + `

📝 **Important Formatting Rules:**
- Use proper markdown formatting (## for headings, **bold**, *italic*, bullet points)
- Structure responses clearly with sections
- Use engaging, conversational tone
- Include concrete examples
- End with actionable next steps or questions when appropriate`;
}

function detectLearningPrinciples(response: string, mode: string): string[] {
  const principles = [];
  const lowercaseResponse = response.toLowerCase();
  
  // 1. Concrete Examples
  if (lowercaseResponse.includes('example') || lowercaseResponse.includes('for instance') || 
      lowercaseResponse.includes('such as') || lowercaseResponse.includes('like when')) {
    principles.push('Concrete Examples');
  }
  
  // 2. Socratic Questioning  
  if (lowercaseResponse.includes('?') && (mode === 'Explore' || lowercaseResponse.includes('what do you think') || 
      lowercaseResponse.includes('how would you') || lowercaseResponse.includes('why might'))) {
    principles.push('Socratic Questioning');
  }
  
  // 3. Scaffolding
  if (lowercaseResponse.includes('step') || lowercaseResponse.includes('first') || lowercaseResponse.includes('next') ||
      lowercaseResponse.includes('break down') || lowercaseResponse.includes('gradually') || lowercaseResponse.includes('build up')) {
    principles.push('Scaffolding');
  }
  
  // 4. Real-world Relevance
  if (lowercaseResponse.includes('real-world') || lowercaseResponse.includes('application') || 
      lowercaseResponse.includes('everyday') || lowercaseResponse.includes('practical') || lowercaseResponse.includes('in practice')) {
    principles.push('Real-world Relevance');
  }
  
  // 5. Metacognition
  if (lowercaseResponse.includes('think about') || lowercaseResponse.includes('reflect') || 
      lowercaseResponse.includes('consider') || lowercaseResponse.includes('ask yourself') || lowercaseResponse.includes('self-assess')) {
    principles.push('Metacognition');
  }
  
  // 6. Engagement
  if (lowercaseResponse.includes('interesting') || lowercaseResponse.includes('exciting') || 
      lowercaseResponse.includes('engaging') || lowercaseResponse.includes('motivating') || lowercaseResponse.includes('curious')) {
    principles.push('Engagement');
  }
  
  // 7. Personalization
  if (lowercaseResponse.includes('your') || lowercaseResponse.includes('you might') || 
      lowercaseResponse.includes('depending on your') || lowercaseResponse.includes('based on your') || 
      lowercaseResponse.includes('your experience')) {
    principles.push('Personalization');
  }
  
  // 8. Active Learning
  if (lowercaseResponse.includes('try') || lowercaseResponse.includes('practice') || 
      lowercaseResponse.includes('experiment') || lowercaseResponse.includes('create') || 
      lowercaseResponse.includes('build') || lowercaseResponse.includes('do')) {
    principles.push('Active Learning');
  }
  
  // 9. Feedback & Assessment
  if (lowercaseResponse.includes('correct') || lowercaseResponse.includes('good job') || 
      lowercaseResponse.includes('well done') || lowercaseResponse.includes('check your') || 
      lowercaseResponse.includes('assess') || lowercaseResponse.includes('evaluate')) {
    principles.push('Feedback');
  }
  
  // 10. Comprehension Check
  if (lowercaseResponse.includes('understand') || lowercaseResponse.includes('make sense') || 
      lowercaseResponse.includes('clear') || lowercaseResponse.includes('grasp') || 
      lowercaseResponse.includes('does that help')) {
    principles.push('Comprehension');
  }
  
  // 11. Memory & Retention
  if (lowercaseResponse.includes('remember') || lowercaseResponse.includes('recall') || 
      lowercaseResponse.includes('memorize') || lowercaseResponse.includes('review') || 
      lowercaseResponse.includes('reinforce')) {
    principles.push('Retention');
  }
  
  // 12. Analogies & Metaphors
  if (lowercaseResponse.includes('like') || lowercaseResponse.includes('similar to') || 
      lowercaseResponse.includes('imagine') || lowercaseResponse.includes('think of it as') || 
      lowercaseResponse.includes('analogy')) {
    principles.push('Analogies');
  }
  
  // 13. Critical Thinking
  if (lowercaseResponse.includes('analyze') || lowercaseResponse.includes('evaluate') || 
      lowercaseResponse.includes('compare') || lowercaseResponse.includes('contrast') || 
      lowercaseResponse.includes('why') || lowercaseResponse.includes('reasoning')) {
    principles.push('Critical Thinking');
  }
  
  // 14. Prior Knowledge Connection
  if (lowercaseResponse.includes('you already know') || lowercaseResponse.includes('familiar') || 
      lowercaseResponse.includes('previously') || lowercaseResponse.includes('remember when') || 
      lowercaseResponse.includes('building on')) {
    principles.push('Prior Knowledge');
  }
  
  // 15. Collaborative Learning
  if (lowercaseResponse.includes('discuss') || lowercaseResponse.includes('share') || 
      lowercaseResponse.includes('work with') || lowercaseResponse.includes('peer') || 
      lowercaseResponse.includes('collaborate')) {
    principles.push('Collaboration');
  }
  
  // 16. Visual Learning
  if (lowercaseResponse.includes('diagram') || lowercaseResponse.includes('chart') || 
      lowercaseResponse.includes('visual') || lowercaseResponse.includes('picture') || 
      lowercaseResponse.includes('image')) {
    principles.push('Visual Learning');
  }
  
  // 17. Problem-solving
  if (lowercaseResponse.includes('solve') || lowercaseResponse.includes('problem') || 
      lowercaseResponse.includes('challenge') || lowercaseResponse.includes('puzzle') || 
      lowercaseResponse.includes('solution')) {
    principles.push('Problem-solving');
  }
  
  // Remove duplicates and ensure we always have at least one principle
  const uniquePrinciples = Array.from(new Set(principles));
  return uniquePrinciples.length > 0 ? uniquePrinciples : ['Personalized Learning'];
}
