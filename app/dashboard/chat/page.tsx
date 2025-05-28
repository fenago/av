'use client';

import { useAuth } from "@/libs/hooks";
import { redirect } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  learningPrinciples?: string[];
  mode?: string;
  isStreaming?: boolean;
}

interface ConversationMode {
  name: string;
  icon: string;
  description: string;
  color: string;
  bgColor: string;
}

export default function ChatPage() {
  const { session, userProfile, isLoading, isAuthenticated } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: "assistant",
      content: "Hello! I'm DrLeeGPT, your educational AI assistant with five educational superpowers. I'm here to help you teach and learn more effectively. Choose a mode below and let's start learning together! 🚀",
      timestamp: new Date(),
      learningPrinciples: ['Personalized Learning'],
      mode: 'Learn'
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [activeMode, setActiveMode] = useState("Learn");
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef(crypto.randomUUID());

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const conversationModes: ConversationMode[] = [
    { 
      name: "Learn", 
      icon: "", 
      description: "Master new concepts with personalized explanations", 
      color: "text-blue-600",
      bgColor: "bg-blue-50 border-blue-200"
    },
    { 
      name: "Explore", 
      icon: "", 
      description: "Investigate topics through guided discovery", 
      color: "text-purple-600",
      bgColor: "bg-purple-50 border-purple-200"
    },
    { 
      name: "Create", 
      icon: "", 
      description: "Generate educational content and activities", 
      color: "text-green-600",
      bgColor: "bg-green-50 border-green-200"
    },
    { 
      name: "Assess", 
      icon: "", 
      description: "Evaluate understanding and get feedback", 
      color: "text-orange-600",
      bgColor: "bg-orange-50 border-orange-200"
    }
  ];

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearConversation = () => {
    setMessages([{
      id: 'welcome',
      type: "assistant",
      content: "Hello! I'm DrLeeGPT, your educational AI assistant with five educational superpowers. I'm here to help you teach and learn more effectively. Choose a mode below and let's start learning together! 🚀",
      timestamp: new Date(),
      learningPrinciples: ['Personalized Learning'],
      mode: activeMode
    }]);
    sessionId.current = crypto.randomUUID();
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isGenerating) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
      mode: activeMode
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsGenerating(true);
    setStreamingMessage("");

    // Add temporary streaming message
    const streamingId = crypto.randomUUID();
    const tempMessage: Message = {
      id: streamingId,
      type: "assistant",
      content: "",
      timestamp: new Date(),
      isStreaming: true,
      mode: activeMode
    };
    setMessages(prev => [...prev, tempMessage]);

    try {
      // Build conversation history
      const conversationHistory = messages.map(msg => ({
        role: msg.type === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.content
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          mode: activeMode,
          sessionId: sessionId.current,
          conversationHistory,
          stream: true
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || 'An error occurred');
        // Remove the temporary streaming message
        setMessages(prev => prev.filter(msg => msg.id !== streamingId));
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response stream available');
      }

      let fullContent = '';
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              
              if (data.type === 'chunk') {
                fullContent += data.content;
                setStreamingMessage(fullContent);
                
                // Update the streaming message
                setMessages(prev => prev.map(msg => 
                  msg.id === streamingId 
                    ? { ...msg, content: fullContent }
                    : msg
                ));
              } else if (data.type === 'complete') {
                // Finalize the message
                setMessages(prev => prev.map(msg => 
                  msg.id === streamingId 
                    ? { 
                        ...msg, 
                        content: data.content,
                        learningPrinciples: data.learningPrinciples,
                        isStreaming: false
                      }
                    : msg
                ));
                break;
              } else if (data.type === 'error') {
                toast.error(data.message);
                setMessages(prev => prev.filter(msg => msg.id !== streamingId));
                break;
              }
            } catch (e) {
              // Skip malformed JSON
            }
          }
        }
      }

    } catch (error) {
      console.error('Chat error:', error);
      toast.error('Failed to send message. Please try again.');
      setMessages(prev => prev.filter(msg => msg.id !== streamingId));
    } finally {
      setIsGenerating(false);
      setStreamingMessage("");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading DrLeeGPT...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !session) {
    redirect('/signin');
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link 
              href="/dashboard"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm">Dashboard</span>
            </Link>
            
            <div className="flex items-center space-x-3 ml-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">Dr</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">DrLeeGPT</h1>
                <p className="text-sm text-gray-600">Educational AI Assistant</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={clearConversation}
              className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              New Chat
            </button>
          </div>
        </div>
      </div>

      {/* Mode Selection */}
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {conversationModes.map((mode) => (
              <button
                key={mode.name}
                onClick={() => setActiveMode(mode.name)}
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  activeMode === mode.name
                    ? `${mode.bgColor} ${mode.color} border-current`
                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-lg">{mode.icon}</span>
                  <span className="font-semibold">{mode.name}</span>
                </div>
                <p className="text-xs opacity-80">{mode.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="max-w-4xl mx-auto p-4 space-y-6">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-3xl ${message.type === 'user' ? 'ml-12' : 'mr-12'}`}>
                    {message.type === 'assistant' && (
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">Dr</span>
                        </div>
                        <span className="text-sm text-gray-600">DrLeeGPT</span>
                        {message.mode && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            {message.mode} Mode
                          </span>
                        )}
                      </div>
                    )}
                    
                    <div className={`p-4 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {message.type === 'user' ? (
                        <div className="whitespace-pre-wrap">
                          {message.content || (message.isStreaming && "Thinking...")}
                          {message.isStreaming && (
                            <span className="inline-block w-2 h-5 bg-gray-400 animate-pulse ml-1" />
                          )}
                        </div>
                      ) : (
                        <div className="prose prose-sm max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-strong:text-gray-800 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700">
                          <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            components={{
                              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                              ul: ({ children }) => <ul className="mb-2 last:mb-0 pl-4">{children}</ul>,
                              ol: ({ children }) => <ol className="mb-2 last:mb-0 pl-4">{children}</ol>,
                              li: ({ children }) => <li className="mb-1">{children}</li>,
                              h1: ({ children }) => <h1 className="text-lg font-bold mb-2 text-gray-800">{children}</h1>,
                              h2: ({ children }) => <h2 className="text-base font-semibold mb-2 text-gray-800">{children}</h2>,
                              h3: ({ children }) => <h3 className="text-sm font-medium mb-1 text-gray-800">{children}</h3>,
                              strong: ({ children }) => <strong className="font-bold text-gray-800">{children}</strong>,
                              em: ({ children }) => <em className="italic">{children}</em>,
                              code: ({ children }) => <code className="bg-gray-200 px-1 py-0.5 rounded text-sm font-mono">{children}</code>,
                              blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-300 pl-4 my-2 italic">{children}</blockquote>
                            }}
                          >
                            {message.content || (message.isStreaming ? "Thinking..." : "")}
                          </ReactMarkdown>
                          {message.isStreaming && (
                            <span className="inline-block w-2 h-5 bg-gray-400 animate-pulse ml-1" />
                          )}
                        </div>
                      )}
                    </div>

                    {/* Learning Principles Badges */}
                    {message.learningPrinciples && message.learningPrinciples.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {message.learningPrinciples.map((principle, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700"
                          >
                            {principle}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-1 text-xs text-gray-500">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-3">
            <div className="flex-1">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Ask DrLeeGPT to help you ${activeMode.toLowerCase()}...`}
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={1}
                disabled={isGenerating}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isGenerating}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isGenerating ? 'Thinking...' : 'Send'}
            </button>
          </div>
          
          <div className="mt-2 text-xs text-gray-500 text-center">
            Powered by DrLeeGPT • Press Enter to send • Shift+Enter for new line
          </div>
        </div>
      </div>
    </div>
  );
}
