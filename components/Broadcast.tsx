import React, { useState } from 'react';
import { Send, Users, Image as ImageIcon, Smile, Type, CheckCircle, Tag } from 'lucide-react';
import { AVAILABLE_TAGS } from '../constants';

const Broadcast: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const estimatedReach = selectedTags.length === 0 ? 1248 : Math.floor(Math.random() * 500) + 50;

  return (
    <div className="h-full flex flex-col p-8 bg-oak-bg overflow-y-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-display font-bold text-oak-purple-700 mb-2">Broadcast Message</h1>
        <p className="text-gray-500">Send targeted messages to your audience to drive engagement.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
        {/* Left Column: Audience Settings */}
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-oak-purple-700/10 rounded-lg">
                        <Users className="w-5 h-5 text-oak-purple-700" />
                    </div>
                    <h3 className="font-bold text-gray-800">Target Audience</h3>
                </div>

                <div className="mb-6">
                    <div className="flex justify-between items-end mb-2">
                        <label className="text-sm font-medium text-gray-600">Filter by Tags</label>
                        <span className="text-xs text-oak-purple-700 cursor-pointer hover:underline" onClick={() => setSelectedTags([])}>Clear all</span>
                    </div>
                    <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto custom-scrollbar">
                        {AVAILABLE_TAGS.map(tag => (
                            <button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all
                                    ${selectedTags.includes(tag) 
                                        ? 'bg-oak-purple-700 text-white border-oak-purple-700 shadow-sm' 
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-oak-purple-700/50'}`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-oak-bg p-4 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500 mb-1">Estimated Reach</p>
                    <div className="flex items-baseline space-x-2">
                        <span className="text-3xl font-display font-bold text-oak-purple-700">{estimatedReach}</span>
                        <span className="text-sm text-gray-400">members</span>
                    </div>
                </div>
            </div>
            
            <button className="w-full py-4 bg-oak-purple-700 hover:bg-oak-purple-900 text-white rounded-xl shadow-lg shadow-oak-purple-700/20 font-bold text-lg flex items-center justify-center space-x-2 transition-all active:scale-[0.98]">
                <Send className="w-5 h-5" />
                <span>Send Broadcast</span>
            </button>
        </div>

        {/* Right Column: Composer */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <div className="flex space-x-1">
                    <button className="px-4 py-2 bg-white border border-gray-200 text-oak-purple-700 text-sm font-bold rounded-lg shadow-sm">Text</button>
                    <button className="px-4 py-2 text-gray-500 hover:bg-gray-100 text-sm font-medium rounded-lg transition-colors">Image</button>
                    <button className="px-4 py-2 text-gray-500 hover:bg-gray-100 text-sm font-medium rounded-lg transition-colors">Card Message (Flex)</button>
                </div>
                <div className="text-xs text-gray-400">Draft saved 2m ago</div>
            </div>

            <div className="flex-1 p-6">
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your broadcast message here..."
                    className="w-full h-64 p-4 text-gray-800 text-lg placeholder-gray-300 resize-none focus:outline-none"
                />
            </div>

            <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
                <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-oak-purple-700 hover:bg-oak-purple-700/5 rounded-full transition-colors">
                        <Smile className="w-6 h-6" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-oak-purple-700 hover:bg-oak-purple-700/5 rounded-full transition-colors">
                        <ImageIcon className="w-6 h-6" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-oak-purple-700 hover:bg-oak-purple-700/5 rounded-full transition-colors">
                        <Tag className="w-6 h-6" />
                    </button>
                </div>
                <div className="text-sm text-gray-400">
                    {message.length} / 500 chars
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Broadcast;