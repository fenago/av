'use client';

import { useAuth } from "@/libs/hooks";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeftIcon, CogIcon, BookOpenIcon, UserIcon, AcademicCapIcon } from "@heroicons/react/24/outline";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  learningPrinciples?: string[];
  mode?: string;
  isStreaming?: boolean;
}

interface LearningPrinciple {
  name: string;
  icon: string;
  color: string;
  description: string;
}

const LEARNING_PRINCIPLES: LearningPrinciple[] = [
  {
    name: "Active Learning",
    icon: "🧠",
    color: "bg-blue-100 text-blue-800",
    description: "Encouraging practice and healthy struggle with timely feedback"
  },
  {
    name: "Cognitive Load",
    icon: "📚",
    color: "bg-purple-100 text-purple-800", 
    description: "Managing information complexity for better understanding"
  },
  {
    name: "Adaptivity",
    icon: "🎯",
    color: "bg-green-100 text-green-800",
    description: "Adjusting to individual learning needs and goals"
  },
  {
    name: "Curiosity",
    icon: "🔍",
    color: "bg-orange-100 text-orange-800",
    description: "Stimulating interest and motivation to learn"
  },
  {
    name: "Metacognition",
    icon: "🪞",
    color: "bg-teal-100 text-teal-800",
    description: "Helping learners understand their own thinking process"
  }
];

export default function DrLeeGPTPage() {
  const { session, userProfile, isLoading, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'instructor' | 'student' | 'about'>('instructor');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: "assistant",
      content: "Hello! I'm DrLeeGPT, your AI teaching assistant built on learning science principles. I can help you create engaging educational experiences that adapt to your students' needs. How can I assist you today?",
      timestamp: new Date(),
      learningPrinciples: ['Adaptivity'],
      mode: 'Instructor'
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef(crypto.randomUUID());
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  const handleClick = (e: React.MouseEvent) => {
    setShowCursor(true);
    setTimeout(() => setShowCursor(false), 1000);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isGenerating) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date(),
      mode: activeTab === 'instructor' ? 'Instructor' : 'Student'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          mode: activeTab === 'instructor' ? 'Instructor' : 'Student',
          sessionId: sessionId.current,
          conversationHistory: messages.map(msg => ({
            role: msg.type === 'user' ? 'user' : 'assistant',
            content: msg.content
          })),
          stream: true
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to get response');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        type: 'assistant',
        content: '',
        timestamp: new Date(),
        learningPrinciples: [],
        mode: activeTab === 'instructor' ? 'Instructor' : 'Student',
        isStreaming: true
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      let fullResponse = '';
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.content) {
                fullResponse += data.content;
                setStreamingMessage(fullResponse);
              }
              if (data.learningPrinciples) {
                assistantMessage.learningPrinciples = data.learningPrinciples;
              }
            } catch (e) {
              // Ignore parsing errors for incomplete chunks
            }
          }
        }
      }

      assistantMessage.content = fullResponse;
      assistantMessage.isStreaming = false;
      setMessages(prev => 
        prev.map(msg => 
          msg.id === assistantMessage.id 
            ? assistantMessage 
            : msg
        )
      );
      setStreamingMessage('');

    } catch (error) {
      console.error('Chat error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to send message');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h1>
          <p className="text-gray-600 mb-6">Please sign in to access DrLeeGPT.</p>
          <Link
            href="/signin"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="flex flex-col min-h-screen bg-gray-50 relative"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {/* SplashCursor Effect */}
      <AnimatePresence>
        {showCursor && (
          <motion.div
            className="fixed pointer-events-none z-50"
            style={{
              left: cursorPosition.x - 20,
              top: cursorPosition.y - 20,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 opacity-30"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Navigation */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/dashboard"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              <span className="font-medium">Dashboard</span>
            </Link>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">Dr</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">DrLeeGPT</h1>
            </div>
          </div>

          {/* Center - Tab Navigation */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('instructor')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'instructor'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <AcademicCapIcon className="h-4 w-4 inline mr-2" />
              Instructor View
            </button>
            <button
              onClick={() => setActiveTab('student')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'student'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <UserIcon className="h-4 w-4 inline mr-2" />
              Student View
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'about'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              About DrLeeGPT
            </button>
          </div>

          {/* Right side - Controls */}
          <div className="flex items-center space-x-3">
            {activeTab === 'instructor' && (
              <>
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <BookOpenIcon className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <CogIcon className="h-5 w-5 text-gray-600" />
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'instructor' && (
            <motion.div
              key="instructor"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="h-full flex flex-col"
            >
              <InstructorChatInterface
                messages={messages}
                streamingMessage={streamingMessage}
                isGenerating={isGenerating}
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                sendMessage={sendMessage}
                handleKeyPress={handleKeyPress}
                messagesEndRef={messagesEndRef}
              />
            </motion.div>
          )}

          {activeTab === 'student' && (
            <motion.div
              key="student"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="h-full flex flex-col"
            >
              <StudentChatInterface
                messages={messages.map(msg => ({ ...msg, mode: 'Student' }))}
                streamingMessage={streamingMessage}
                isGenerating={isGenerating}
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                sendMessage={sendMessage}
                handleKeyPress={handleKeyPress}
                messagesEndRef={messagesEndRef}
              />
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="h-full overflow-y-auto"
            >
              <AboutDrLeeGPT />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// Instructor Chat Interface Component
function InstructorChatInterface({
  messages,
  streamingMessage,
  isGenerating,
  inputMessage,
  setInputMessage,
  sendMessage,
  handleKeyPress,
  messagesEndRef
}: any) {
  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <AnimatePresence>
          {messages.map((message: Message) => (
            <MessageBubble key={message.id} message={message} showControls={true} />
          ))}
        </AnimatePresence>
        
        {/* Streaming Message */}
        {isGenerating && streamingMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="max-w-3xl">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold text-xs">Dr</span>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-tl-md px-6 py-4">
                  <ReactMarkdown 
                    components={{
                      p: ({node, ...props}) => <p className="text-sm leading-relaxed text-gray-700" {...props} />,
                      h1: ({node, ...props}) => <h1 className="text-lg font-semibold mb-2 text-gray-900" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-md font-semibold mb-2 text-gray-900" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-sm font-semibold mb-1 text-gray-900" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-1 text-gray-700" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal list-inside space-y-1 text-gray-700" {...props} />,
                      li: ({node, ...props}) => <li className="text-sm" {...props} />,
                      code: ({node, ...props}) => <code className="px-1 py-0.5 rounded text-xs font-mono bg-gray-200 text-gray-800" {...props} />,
                      pre: ({node, ...props}) => <pre className="p-3 rounded-lg text-xs font-mono overflow-x-auto bg-gray-200 text-gray-800" {...props} />
                    }}
                    remarkPlugins={[remarkGfm]}
                  >
                    {streamingMessage}
                  </ReactMarkdown>
                  <div className="flex items-center mt-2">
                    <div className="animate-pulse flex space-x-1">
                      <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-6">
        <div className="flex items-end space-x-3">
          <div className="flex-1">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask DrLeeGPT anything about teaching and learning..."
              className="w-full resize-none border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent max-h-32"
              rows={1}
              disabled={isGenerating}
            />
          </div>
          
          {/* New Chat Button */}
          <button
            onClick={() => {
              setMessages([{
                id: 'welcome',
                type: "assistant",
                content: "Hello! I'm DrLeeGPT, your AI teaching assistant built on learning science principles. I can help you create engaging educational experiences that adapt to your students' needs. How can I assist you today?",
                timestamp: new Date(),
                learningPrinciples: ['Adaptivity'],
                mode: 'Instructor'
              }]);
              setInputMessage("");
              setStreamingMessage("");
              sessionId.current = crypto.randomUUID();
            }}
            className="px-4 py-3 rounded-2xl font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all"
            title="Start a new conversation"
          >
            New Chat
          </button>
          
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isGenerating}
            className={`px-6 py-3 rounded-2xl font-medium transition-all transform ${
              !inputMessage.trim() || isGenerating
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-xl'
            }`}
          >
            {isGenerating ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              'Send'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Student Chat Interface Component
function StudentChatInterface({
  messages,
  streamingMessage,
  isGenerating,
  inputMessage,
  setInputMessage,
  sendMessage,
  handleKeyPress,
  messagesEndRef
}: any) {
  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Simple header for students */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900">Chat with DrLeeGPT</h2>
          <p className="text-sm text-gray-600">Your AI learning assistant</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <AnimatePresence>
          {messages.map((message: Message) => (
            <MessageBubble key={message.id} message={message} showControls={false} />
          ))}
        </AnimatePresence>
        
        {/* Streaming Message */}
        {isGenerating && streamingMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="max-w-3xl">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
                    <span className="text-white font-bold text-xs">🤖</span>
                  </div>
                </div>
                <div className="bg-white rounded-2xl rounded-tl-md px-6 py-4 shadow-sm">
                  <ReactMarkdown 
                    components={{
                      p: ({node, ...props}) => <p className="text-sm leading-relaxed text-gray-700" {...props} />,
                      h1: ({node, ...props}) => <h1 className="text-lg font-semibold mb-2 text-gray-900" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-md font-semibold mb-2 text-gray-900" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-sm font-semibold mb-1 text-gray-900" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-1 text-gray-700" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal list-inside space-y-1 text-gray-700" {...props} />,
                      li: ({node, ...props}) => <li className="text-sm" {...props} />,
                      code: ({node, ...props}) => <code className="px-1 py-0.5 rounded text-xs font-mono bg-gray-200 text-gray-800" {...props} />,
                      pre: ({node, ...props}) => <pre className="p-3 rounded-lg text-xs font-mono overflow-x-auto bg-gray-200 text-gray-800" {...props} />
                    }}
                    remarkPlugins={[remarkGfm]}
                  >
                    {streamingMessage}
                  </ReactMarkdown>
                  <div className="flex items-center mt-2">
                    <div className="animate-pulse flex space-x-1">
                      <div className="h-2 w-2 bg-green-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="h-2 w-2 bg-green-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="h-2 w-2 bg-green-500 rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Simplified Input Area */}
      <div className="bg-white border-t border-gray-200 p-6">
        <div className="flex items-end space-x-4">
          <div className="flex-1">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your studies..."
              className="w-full resize-none border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent max-h-32"
              rows={1}
              disabled={isGenerating}
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isGenerating}
            className={`px-6 py-3 rounded-2xl font-medium transition-all transform ${
              !inputMessage.trim() || isGenerating
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-blue-600 text-white hover:from-green-600 hover:to-blue-700 hover:scale-105 shadow-lg hover:shadow-xl'
            }`}
          >
            {isGenerating ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              'Send'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Message Bubble Component
function MessageBubble({ message, showControls }: { message: Message; showControls: boolean }) {
  const isUser = message.type === 'user';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-3xl ${isUser ? 'order-2' : 'order-1'}`}>
        <div className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
          {/* Avatar */}
          <div className="flex-shrink-0">
            {isUser ? (
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                <UserIcon className="h-4 w-4 text-white" />
              </div>
            ) : (
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">Dr</span>
              </div>
            )}
          </div>

          {/* Message Content */}
          <div className={`${
            isUser 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl rounded-tr-md' 
              : 'bg-gray-100 rounded-2xl rounded-tl-md'
          } px-6 py-4`}>
            <ReactMarkdown 
              components={{
                p: ({node, ...props}) => <p className={`text-sm leading-relaxed ${isUser ? 'text-blue-100' : 'text-gray-700'}`} {...props} />,
                h1: ({node, ...props}) => <h1 className={`text-lg font-semibold mb-2 ${isUser ? 'text-white' : 'text-gray-900'}`} {...props} />,
                h2: ({node, ...props}) => <h2 className={`text-md font-semibold mb-2 ${isUser ? 'text-white' : 'text-gray-900'}`} {...props} />,
                h3: ({node, ...props}) => <h3 className={`text-sm font-semibold mb-1 ${isUser ? 'text-white' : 'text-gray-900'}`} {...props} />,
                ul: ({node, ...props}) => <ul className={`list-disc list-inside space-y-1 ${isUser ? 'text-blue-100' : 'text-gray-700'}`} {...props} />,
                ol: ({node, ...props}) => <ol className={`list-decimal list-inside space-y-1 ${isUser ? 'text-blue-100' : 'text-gray-700'}`} {...props} />,
                li: ({node, ...props}) => <li className="text-sm" {...props} />,
                code: ({node, ...props}) => <code className={`px-1 py-0.5 rounded text-xs font-mono ${isUser ? 'bg-blue-400 text-white' : 'bg-gray-200 text-gray-800'}`} {...props} />,
                pre: ({node, ...props}) => <pre className={`p-3 rounded-lg text-xs font-mono overflow-x-auto ${isUser ? 'bg-blue-400 text-white' : 'bg-gray-200 text-gray-800'}`} {...props} />
              }}
              remarkPlugins={[remarkGfm]}
            >
              {message.content}
            </ReactMarkdown>
            
            {/* Learning Principles */}
            {!isUser && message.learningPrinciples && message.learningPrinciples.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {message.learningPrinciples.map((principle) => {
                  const principleInfo = LEARNING_PRINCIPLES.find(p => p.name === principle);
                  if (!principleInfo) return null;
                  
                  return (
                    <span
                      key={principle}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${principleInfo.color}`}
                      title={principleInfo.description}
                    >
                      <span className="mr-1">{principleInfo.icon}</span>
                      {principle}
                    </span>
                  );
                })}
              </div>
            )}
            
            {/* Timestamp */}
            <div className={`text-xs mt-2 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// About DrLeeGPT Component
function AboutDrLeeGPT() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-12">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-6">
          <span className="text-white font-bold text-2xl">Dr</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">DrLeeGPT</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your AI teaching assistant built on proven learning science principles to enhance education for both instructors and students.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {LEARNING_PRINCIPLES.map((principle) => (
          <motion.div
            key={principle.name}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
          >
            <div className="text-4xl mb-4">{principle.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{principle.name}</h3>
            <p className="text-gray-600">{principle.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to transform your teaching?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          DrLeeGPT adapts to your teaching style and helps create engaging, personalized learning experiences for every student.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.open('https://learningscience.ai', '_blank')}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            Learn More
          </button>
          <button
            onClick={() => navigator.share?.({ title: 'DrLeeGPT', url: window.location.href })}
            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            Share DrLeeGPT
          </button>
        </div>
      </div>
    </div>
  );
}
