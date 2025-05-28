"use client";

import { useAuth } from "@/libs/hooks";
import { redirect } from "next/navigation";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

export default function ThemedAvatarsPage() {
  const { session, userProfile, isLoading, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("create");
  const [selectedTheme, setSelectedTheme] = useState("scientist");
  const [selectedStyle, setSelectedStyle] = useState("realistic");
  const [avatarConfig, setAvatarConfig] = useState({
    gender: "neutral",
    age: "adult",
    ethnicity: "diverse",
    clothing: "professional",
    accessories: [],
    personality: "friendly"
  });
  const [isGenerating, setIsGenerating] = useState(false);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div></div>;
  }

  if (!isAuthenticated || !session) {
    redirect('/signin');
  }

  const themes = [
    { id: "scientist", name: "Scientists", emoji: "🔬", description: "Lab coats, goggles, research equipment", subjects: ["Chemistry", "Biology", "Physics"] },
    { id: "historian", name: "Historians", emoji: "📜", description: "Period clothing, manuscripts, artifacts", subjects: ["World History", "Ancient Civilizations"] },
    { id: "mathematician", name: "Mathematicians", emoji: "🔢", description: "Equations, geometric tools, calculators", subjects: ["Algebra", "Geometry", "Calculus"] },
    { id: "artist", name: "Artists", emoji: "🎨", description: "Paint brushes, easels, creative tools", subjects: ["Art", "Design", "Creative Writing"] },
    { id: "explorer", name: "Explorers", emoji: "🗺️", description: "Maps, compass, adventure gear", subjects: ["Geography", "Earth Science"] },
    { id: "musician", name: "Musicians", emoji: "🎵", description: "Instruments, sheet music, sound waves", subjects: ["Music Theory", "Composition"] },
    { id: "engineer", name: "Engineers", emoji: "⚙️", description: "Blueprints, tools, mechanical parts", subjects: ["Engineering", "Technology"] },
    { id: "doctor", name: "Medical", emoji: "👩‍⚕️", description: "Stethoscope, medical tools, anatomy", subjects: ["Biology", "Health Sciences"] },
    { id: "chef", name: "Culinary", emoji: "👨‍🍳", description: "Chef hat, cooking utensils, ingredients", subjects: ["Nutrition", "Chemistry"] },
    { id: "astronaut", name: "Space", emoji: "🚀", description: "Space suit, rockets, planets", subjects: ["Astronomy", "Physics"] },
    { id: "detective", name: "Detective", emoji: "🕵️", description: "Magnifying glass, clues, mystery tools", subjects: ["Logic", "Critical Thinking"] },
    { id: "librarian", name: "Scholar", emoji: "📚", description: "Books, scrolls, wisdom accessories", subjects: ["Literature", "Research"] }
  ];

  const styles = [
    { id: "realistic", name: "Realistic", description: "Photorealistic human avatars" },
    { id: "cartoon", name: "Cartoon", description: "Friendly animated style" },
    { id: "anime", name: "Anime", description: "Japanese animation inspired" },
    { id: "pixel", name: "Pixel Art", description: "Retro 8-bit gaming style" },
    { id: "minimalist", name: "Minimalist", description: "Clean, simple design" },
    { id: "fantasy", name: "Fantasy", description: "Magical, ethereal appearance" }
  ];

  const myAvatars = [
    {
      id: 1,
      name: "Dr. Emma Chen",
      theme: "scientist",
      style: "realistic",
      subject: "Chemistry",
      created: "2 days ago",
      uses: 34,
      favorite: true,
      preview: "🧑‍🔬"
    },
    {
      id: 2,
      name: "Professor Marcus",
      theme: "historian",
      style: "cartoon",
      subject: "Ancient Rome",
      created: "1 week ago",
      uses: 67,
      favorite: false,
      preview: "👨‍🏫"
    },
    {
      id: 3,
      name: "Captain Nova",
      theme: "astronaut",
      style: "anime",
      subject: "Space Science",
      created: "3 days ago",
      uses: 23,
      favorite: true,
      preview: "👩‍🚀"
    },
    {
      id: 4,
      name: "Detective Riley",
      theme: "detective",
      style: "cartoon",
      subject: "Logic Puzzles",
      created: "5 days ago",
      uses: 45,
      favorite: false,
      preview: "🕵️‍♀️"
    }
  ];

  const popularAvatars = [
    { name: "Professor Sage", theme: "Scholar", downloads: 1247, rating: 4.9, preview: "👨‍🏫" },
    { name: "Lab Assistant Zoe", theme: "Scientist", downloads: 987, rating: 4.8, preview: "👩‍🔬" },
    { name: "Space Commander", theme: "Astronaut", downloads: 856, rating: 4.7, preview: "👨‍🚀" },
    { name: "Art Mentor Maya", theme: "Artist", downloads: 743, rating: 4.9, preview: "👩‍🎨" }
  ];

  const handleGenerateAvatar = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setActiveTab("gallery");
    }, 3000);
  };

  return (
    <DashboardLayout>
      <div className="h-full bg-gray-50">
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-3xl mr-3">👤</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Themed Avatars</h1>
                <p className="text-gray-600">Create subject-specific AI avatars for personalized learning experiences</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">{myAvatars.length} Avatars Created</span>
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                🎭 Quick Create
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("create")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "create" ? "border-b-2 border-green-500 text-green-600" : "text-gray-500"}`}
              >
                Create Avatar
              </button>
              <button
                onClick={() => setActiveTab("gallery")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "gallery" ? "border-b-2 border-green-500 text-green-600" : "text-gray-500"}`}
              >
                My Avatars
              </button>
              <button
                onClick={() => setActiveTab("marketplace")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "marketplace" ? "border-b-2 border-green-500 text-green-600" : "text-gray-500"}`}
              >
                Avatar Marketplace
              </button>
              <button
                onClick={() => setActiveTab("classroom")}
                className={`px-6 py-3 font-medium text-sm ${activeTab === "classroom" ? "border-b-2 border-green-500 text-green-600" : "text-gray-500"}`}
              >
                Classroom Integration
              </button>
            </div>
          </div>

          {activeTab === "create" && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="bg-white rounded-lg shadow-sm border p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Avatar</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Theme Selection */}
                  <div className="lg:col-span-2">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Choose Theme & Subject</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                      {themes.map((theme) => (
                        <div
                          key={theme.id}
                          onClick={() => setSelectedTheme(theme.id)}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            selectedTheme === theme.id ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-center">
                            <div className="text-3xl mb-2">{theme.emoji}</div>
                            <h4 className="font-medium text-gray-900 mb-1">{theme.name}</h4>
                            <p className="text-xs text-gray-600 mb-2">{theme.description}</p>
                            <div className="flex flex-wrap gap-1 justify-center">
                              {theme.subjects.slice(0, 2).map((subject, index) => (
                                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                  {subject}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Style Selection */}
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Choose Art Style</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                      {styles.map((style) => (
                        <div
                          key={style.id}
                          onClick={() => setSelectedStyle(style.id)}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            selectedStyle === style.id ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <h4 className="font-medium text-gray-900 mb-1">{style.name}</h4>
                          <p className="text-xs text-gray-600">{style.description}</p>
                        </div>
                      ))}
                    </div>

                    {/* Configuration Options */}
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Customize Appearance</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Gender Presentation</label>
                        <select 
                          value={avatarConfig.gender}
                          onChange={(e) => setAvatarConfig({...avatarConfig, gender: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="neutral">Gender Neutral</option>
                          <option value="feminine">Feminine</option>
                          <option value="masculine">Masculine</option>
                          <option value="non-binary">Non-binary</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Age Range</label>
                        <select 
                          value={avatarConfig.age}
                          onChange={(e) => setAvatarConfig({...avatarConfig, age: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="young">Young Adult (20-30)</option>
                          <option value="adult">Adult (30-50)</option>
                          <option value="mature">Mature (50-70)</option>
                          <option value="elder">Elder (70+)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ethnicity</label>
                        <select 
                          value={avatarConfig.ethnicity}
                          onChange={(e) => setAvatarConfig({...avatarConfig, ethnicity: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="diverse">Diverse/Mixed</option>
                          <option value="african">African Descent</option>
                          <option value="asian">Asian</option>
                          <option value="caucasian">Caucasian</option>
                          <option value="hispanic">Hispanic/Latino</option>
                          <option value="indigenous">Indigenous</option>
                          <option value="middle-eastern">Middle Eastern</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Personality</label>
                        <select 
                          value={avatarConfig.personality}
                          onChange={(e) => setAvatarConfig({...avatarConfig, personality: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="friendly">Friendly & Approachable</option>
                          <option value="professional">Professional & Serious</option>
                          <option value="enthusiastic">Enthusiastic & Energetic</option>
                          <option value="wise">Wise & Thoughtful</option>
                          <option value="quirky">Quirky & Creative</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Additional Accessories</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {["Glasses", "Hat", "Jewelry", "Watch", "Backpack", "Tablet", "Book", "Badge"].map((accessory) => (
                          <label key={accessory} className="flex items-center">
                            <input 
                              type="checkbox" 
                              className="mr-2"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setAvatarConfig({...avatarConfig, accessories: [...avatarConfig.accessories, accessory]});
                                } else {
                                  setAvatarConfig({...avatarConfig, accessories: avatarConfig.accessories.filter(a => a !== accessory)});
                                }
                              }}
                            />
                            <span className="text-sm">{accessory}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Preview Panel */}
                  <div className="lg:col-span-1">
                    <div className="sticky top-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Avatar Preview</h3>
                      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-8 text-center border-2 border-dashed border-green-200">
                        <div className="text-8xl mb-4">
                          {themes.find(t => t.id === selectedTheme)?.emoji || "👤"}
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {themes.find(t => t.id === selectedTheme)?.name || "Avatar"} Teacher
                        </h4>
                        <p className="text-sm text-gray-600 mb-4">
                          {styles.find(s => s.id === selectedStyle)?.name || "Style"} • {avatarConfig.personality}
                        </p>
                        <div className="text-xs text-gray-500 space-y-1">
                          <p>Gender: {avatarConfig.gender}</p>
                          <p>Age: {avatarConfig.age}</p>
                          <p>Style: {selectedStyle}</p>
                          {avatarConfig.accessories.length > 0 && (
                            <p>Accessories: {avatarConfig.accessories.join(", ")}</p>
                          )}
                        </div>
                      </div>

                      <div className="mt-6 space-y-3">
                        <input
                          type="text"
                          placeholder="Avatar Name (e.g., Dr. Sarah)"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        <input
                          type="text"
                          placeholder="Subject/Course (e.g., Biology 101)"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        <button
                          onClick={handleGenerateAvatar}
                          disabled={isGenerating}
                          className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 font-medium"
                        >
                          {isGenerating ? (
                            <div className="flex items-center justify-center">
                              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                              Generating...
                            </div>
                          ) : (
                            "✨ Generate Avatar"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "gallery" && (
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">My Avatar Gallery</h2>
                    <div className="flex items-center space-x-3">
                      <input
                        type="text"
                        placeholder="Search avatars..."
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                      <select className="px-3 py-2 border border-gray-300 rounded-lg">
                        <option>All Themes</option>
                        <option>Scientists</option>
                        <option>Historians</option>
                        <option>Mathematicians</option>
                        <option>Artists</option>
                      </select>
                      <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                        Create New
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {myAvatars.map((avatar) => (
                      <div key={avatar.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="text-center mb-4">
                          <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-3">
                            {avatar.preview}
                          </div>
                          <div className="flex items-center justify-center mb-2">
                            <h3 className="font-semibold text-gray-900">{avatar.name}</h3>
                            {avatar.favorite && <span className="ml-2 text-yellow-500">⭐</span>}
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>{avatar.theme} • {avatar.style}</p>
                            <p>{avatar.subject}</p>
                            <p className="text-xs">Created {avatar.created}</p>
                          </div>
                        </div>

                        <div className="text-center text-sm text-gray-600 mb-4">
                          <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            {avatar.uses} uses
                          </span>
                        </div>

                        <div className="space-y-2">
                          <button className="w-full px-3 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600">
                            Use in Lesson
                          </button>
                          <div className="flex space-x-2">
                            <button className="flex-1 px-3 py-2 border border-gray-300 text-sm rounded hover:bg-gray-50">
                              Edit
                            </button>
                            <button className="flex-1 px-3 py-2 border border-gray-300 text-sm rounded hover:bg-gray-50">
                              Share
                            </button>
                            <button className="px-3 py-2 border border-gray-300 text-sm rounded hover:bg-gray-50">
                              {avatar.favorite ? "💖" : "🤍"}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Add New Avatar Card */}
                    <div 
                      onClick={() => setActiveTab("create")}
                      className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-green-500 hover:bg-green-50 transition-colors cursor-pointer"
                    >
                      <div className="text-center">
                        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-4xl mx-auto mb-3">
                          ➕
                        </div>
                        <h3 className="font-semibold text-gray-600 mb-2">Create New Avatar</h3>
                        <p className="text-sm text-gray-500">Add a new themed avatar to your collection</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "marketplace" && (
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Avatar Marketplace</h2>
                  <p className="text-gray-600">Discover and download avatars created by the community</p>
                </div>

                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Popular Avatars</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {popularAvatars.map((avatar, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="text-center mb-3">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-2">
                              {avatar.preview}
                            </div>
                            <h4 className="font-medium text-gray-900">{avatar.name}</h4>
                            <p className="text-sm text-gray-600">{avatar.theme}</p>
                          </div>
                          
                          <div className="text-center text-sm text-gray-600 mb-3">
                            <div className="flex items-center justify-center space-x-3">
                              <span>⭐ {avatar.rating}</span>
                              <span>📥 {avatar.downloads}</span>
                            </div>
                          </div>

                          <button className="w-full px-3 py-2 bg-purple-500 text-white text-sm rounded hover:bg-purple-600">
                            Download Free
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-center py-12 text-gray-500">
                    <div className="text-6xl mb-4">🏪</div>
                    <h3 className="text-lg font-medium mb-2">More Avatars Coming Soon!</h3>
                    <p className="text-sm">We're building a community marketplace for sharing educational avatars</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "classroom" && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Classroom Integration</h2>
                <p className="text-gray-600 mb-6">Use your avatars across different learning platforms and activities</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <div className="text-4xl mb-3">💬</div>
                    <h3 className="font-semibold text-gray-900 mb-2">Chat Integration</h3>
                    <p className="text-sm text-gray-600 mb-4">Use avatars in DrLeeGPT conversations to create immersive subject-specific interactions</p>
                    <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
                      Setup Chat Avatars
                    </button>
                  </div>

                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <div className="text-4xl mb-3">🎥</div>
                    <h3 className="font-semibold text-gray-900 mb-2">Video Narration</h3>
                    <p className="text-sm text-gray-600 mb-4">Add avatar narrators to your educational videos for personalized learning experiences</p>
                    <button className="px-4 py-2 bg-purple-500 text-white text-sm rounded hover:bg-purple-600">
                      Create Video Avatar
                    </button>
                  </div>

                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <div className="text-4xl mb-3">📚</div>
                    <h3 className="font-semibold text-gray-900 mb-2">Interactive Lessons</h3>
                    <p className="text-sm text-gray-600 mb-4">Embed avatars in interactive lessons and quizzes to guide student learning</p>
                    <button className="px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600">
                      Design Lessons
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Avatar Analytics</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">87%</p>
                    <p className="text-sm text-gray-600">Student Engagement</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">156</p>
                    <p className="text-sm text-gray-600">Total Interactions</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">23</p>
                    <p className="text-sm text-gray-600">Active Avatars</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">4.8★</p>
                    <p className="text-sm text-gray-600">Student Rating</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
