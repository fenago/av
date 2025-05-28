"use client";

import { useAuth } from "@/libs/hooks";
import { redirect } from "next/navigation";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

interface GeneratedImage {
  id: number;
  prompt: string;
  style: string;
  size: string;
  url: string;
  createdAt: string;
  downloading?: boolean;
}

export default function ImageGenerationPage() {
  const { session, userProfile, isLoading, isAuthenticated } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("realistic");
  const [selectedSize, setSelectedSize] = useState("1024x1024");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([
    {
      id: 1,
      prompt: "A detailed diagram of photosynthesis process in plants",
      style: "educational",
      size: "1024x1024",
      url: "https://via.placeholder.com/400x400/10B981/ffffff?text=Photosynthesis+Diagram",
      createdAt: "2 hours ago"
    },
    {
      id: 2,
      prompt: "Medieval castle with labeled architectural features",
      style: "realistic",
      size: "1024x768",
      url: "https://via.placeholder.com/400x300/3B82F6/ffffff?text=Medieval+Castle",
      createdAt: "Yesterday"
    },
    {
      id: 3,
      prompt: "Mathematical functions graph showing sine and cosine waves",
      style: "technical",
      size: "1024x1024",
      url: "https://via.placeholder.com/400x400/8B5CF6/ffffff?text=Math+Functions",
      createdAt: "3 days ago"
    }
  ]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated || !session) {
    redirect('/signin');
  }

  const imageStyles = [
    { id: 'realistic', name: 'Realistic', description: 'Photorealistic images', icon: '📸' },
    { id: 'educational', name: 'Educational', description: 'Diagrams and infographics', icon: '📊' },
    { id: 'artistic', name: 'Artistic', description: 'Creative and stylized', icon: '🎨' },
    { id: 'technical', name: 'Technical', description: 'Technical drawings and schemas', icon: '⚙️' },
    { id: 'cartoon', name: 'Cartoon', description: 'Fun and engaging illustrations', icon: '🎭' },
    { id: 'minimalist', name: 'Minimalist', description: 'Clean and simple designs', icon: '✨' }
  ];

  const imageSizes = [
    { id: '1024x1024', name: 'Square (1024×1024)', description: 'Perfect for presentations' },
    { id: '1024x768', name: 'Landscape (1024×768)', description: 'Great for slides' },
    { id: '768x1024', name: 'Portrait (768×1024)', description: 'Ideal for documents' },
    { id: '1920x1080', name: 'Widescreen (1920×1080)', description: 'Full HD displays' }
  ];

  const promptTemplates = [
    "A detailed scientific diagram showing [subject] with labeled components",
    "An educational infographic explaining [concept] for students",
    "A historical illustration of [event/period] in [artistic style] style",
    "A mathematical visualization of [formula/concept] with clear annotations",
    "A cross-section diagram of [object/system] showing internal structure",
    "A step-by-step visual guide for [process] with numbered stages"
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      const newImage: GeneratedImage = {
        id: Date.now(),
        prompt: prompt,
        style: selectedStyle,
        size: selectedSize,
        url: `https://via.placeholder.com/400x400/10B981/ffffff?text=${encodeURIComponent(prompt.slice(0, 20))}`,
        createdAt: "Just now"
      };
      
      setGeneratedImages([newImage, ...generatedImages]);
      setIsGenerating(false);
      setPrompt("");
    }, 3000);
  };

  const handleDownload = (image: GeneratedImage) => {
    // Simulate download
    setGeneratedImages(prev => 
      prev.map(img => 
        img.id === image.id ? { ...img, downloading: true } : img
      )
    );
    
    setTimeout(() => {
      setGeneratedImages(prev => 
        prev.map(img => 
          img.id === image.id ? { ...img, downloading: false } : img
        )
      );
    }, 2000);
  };

  const handleUseTemplate = (template: string) => {
    setPrompt(template);
  };

  return (
    <DashboardLayout>
      <div className="h-full bg-gray-50">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <span className="text-3xl mr-3">🎨</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Native Image Generation</h1>
                <p className="text-gray-600">Create custom educational visuals with AI</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Beta</span>
              <span className="text-sm text-gray-600">
                {userProfile?.role === 'FREE' ? '3/5 images used' : 'Unlimited'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Generation Panel */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Generate New Image</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image Description
                    </label>
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows={4}
                      placeholder="Describe the image you want to generate. Be specific about details, style, and educational purpose..."
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Tip: Include educational context for better results (e.g., "for 5th grade science class")
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Style
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {imageStyles.map((style) => (
                          <button
                            key={style.id}
                            onClick={() => setSelectedStyle(style.id)}
                            className={`p-3 border rounded-lg text-left transition-colors ${
                              selectedStyle === style.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            <div className="flex items-center mb-1">
                              <span className="mr-2">{style.icon}</span>
                              <span className="font-medium text-sm">{style.name}</span>
                            </div>
                            <p className="text-xs text-gray-600">{style.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Size
                      </label>
                      <div className="space-y-2">
                        {imageSizes.map((size) => (
                          <button
                            key={size.id}
                            onClick={() => setSelectedSize(size.id)}
                            className={`w-full p-3 border rounded-lg text-left transition-colors ${
                              selectedSize === size.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            <div className="font-medium text-sm">{size.name}</div>
                            <p className="text-xs text-gray-600">{size.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleGenerate}
                    disabled={!prompt.trim() || isGenerating}
                    className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    {isGenerating ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Generating...
                      </div>
                    ) : (
                      'Generate Image'
                    )}
                  </button>
                </div>
              </div>

              {/* Generated Images */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Generated Images</h2>
                
                {generatedImages.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🖼️</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No images yet</h3>
                    <p className="text-gray-600">Generate your first educational image above</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {generatedImages.map((image) => (
                      <div key={image.id} className="border rounded-lg overflow-hidden">
                        <div className="aspect-square bg-gray-100 flex items-center justify-center">
                          <img
                            src={image.url}
                            alt={image.prompt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <p className="text-sm text-gray-900 mb-2 line-clamp-2">{image.prompt}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                            <span>{image.style}</span>
                            <span>{image.size}</span>
                            <span>{image.createdAt}</span>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleDownload(image)}
                              disabled={image.downloading}
                              className="flex-1 px-3 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 disabled:bg-gray-300 transition-colors"
                            >
                              {image.downloading ? 'Downloading...' : 'Download'}
                            </button>
                            <button className="px-3 py-2 border border-gray-300 text-sm rounded hover:bg-gray-50 transition-colors">
                              Share
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Prompt Templates</h3>
                <div className="space-y-3">
                  {promptTemplates.map((template, index) => (
                    <button
                      key={index}
                      onClick={() => handleUseTemplate(template)}
                      className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm"
                    >
                      {template}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage & Limits</h3>
                <div className="space-y-4">
                  {userProfile?.role === 'FREE' ? (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Images Generated</span>
                        <span className="font-medium">3 / 5</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                      <p className="text-sm text-gray-600">
                        Upgrade to Instructor plan for unlimited image generation
                      </p>
                      <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm">
                        Upgrade Plan
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Plan</span>
                        <span className="font-medium text-green-600">Unlimited</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        You have unlimited image generation with your current plan
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tips for Better Results</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start">
                    <span className="mr-2">💡</span>
                    <span>Be specific about educational context and target audience</span>
                  </div>
                  <div className="flex items-start">
                    <span className="mr-2">🎯</span>
                    <span>Include details about colors, style, and composition</span>
                  </div>
                  <div className="flex items-start">
                    <span className="mr-2">📚</span>
                    <span>Mention if you need labels, annotations, or text</span>
                  </div>
                  <div className="flex items-start">
                    <span className="mr-2">✨</span>
                    <span>Use technical terms for more accurate results</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
