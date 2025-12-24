import React, { useState, useEffect, useRef } from 'react';
import { Search, Paperclip, Smile, Send, Mic, Phone, Mail, ExternalLink, X, ChevronLeft, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { MOCK_CONVERSATIONS, MOCK_MEMBERS, AVAILABLE_TAGS, TRANSLATIONS } from '../constants';
import { Conversation, Language } from '../types';

/* ----------------------------------------------------------------------------------
   TYPES & PROPS
   ---------------------------------------------------------------------------------- */
interface SmartInboxProps {
  language: Language;
}

// Mobile View State Management
type MobileView = 'list' | 'chat' | 'details';

/* ----------------------------------------------------------------------------------
   SUB-COMPONENT: COLLAPSIBLE SECTION
   ---------------------------------------------------------------------------------- */
const CollapsibleSection: React.FC<{
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}> = ({ title, children, defaultOpen = true, className = '' }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`border-b border-gray-100 ${className}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors"
      >
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{title}</h4>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>
      {isOpen && (
        <div className="px-6 pb-6 animate-fade-in-down">
          {children}
        </div>
      )}
    </div>
  );
};

/* ----------------------------------------------------------------------------------
   SUB-COMPONENT: INBOX LIST (Left Column)
   ---------------------------------------------------------------------------------- */
const InboxList: React.FC<{ 
    conversations: Conversation[]; 
    selectedId: string | null; 
    onSelect: (id: string) => void;
    t: Record<string, string>;
    className?: string;
}> = ({ conversations, selectedId, onSelect, t, className = '' }) => {
    return (
        <div className={`w-full md:w-80 flex flex-col border-r border-gray-200 bg-white h-full ${className}`}>
            <div className="p-4 border-b border-gray-100 sticky top-0 bg-white z-10 shadow-sm md:shadow-none">
                <h2 className="text-xl font-display font-bold text-oak-purple-700 mb-4">{t['inbox.title']}</h2>
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder={t['inbox.search']}
                        className="w-full pl-10 pr-4 py-3 bg-oak-bg rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-oak-purple-700/20 text-oak-text-primary placeholder-gray-400 transition-all"
                    />
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                </div>
                <div className="flex space-x-2 mt-4 overflow-x-auto pb-1 no-scrollbar">
                    <button className="px-4 py-1.5 bg-oak-purple-700 text-white text-xs font-medium rounded-full whitespace-nowrap shadow-sm active:scale-95 transition-transform">{t['inbox.filter.all']}</button>
                    <button className="px-4 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full hover:bg-gray-200 active:bg-gray-300 whitespace-nowrap transition-colors">{t['inbox.filter.unread']}</button>
                    <button className="px-4 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full hover:bg-gray-200 active:bg-gray-300 whitespace-nowrap transition-colors">{t['inbox.filter.followup']}</button>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                {conversations.map(conv => {
                    const member = MOCK_MEMBERS[conv.memberId];
                    return (
                        <div 
                            key={conv.id}
                            onClick={() => onSelect(conv.id)}
                            className={`p-4 flex items-start space-x-3 cursor-pointer transition-colors border-l-4 active:bg-gray-50
                                ${selectedId === conv.id 
                                    ? 'bg-oak-bg border-l-oak-orange-400' 
                                    : 'hover:bg-gray-50 border-l-transparent'}`}
                        >
                            <img src={member.avatarUrl} alt={member.lineName} className="w-12 h-12 rounded-full object-cover border border-gray-200 shrink-0" />
                            <div className="flex-1 min-w-0 py-0.5">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className={`text-sm truncate ${selectedId === conv.id ? 'font-bold text-oak-purple-700' : 'font-medium text-gray-900'}`}>
                                        {member.lineName}
                                    </h4>
                                    <span className="text-xs text-gray-400 whitespace-nowrap ml-2 shrink-0">{conv.lastMessageTime}</span>
                                </div>
                                <p className={`text-xs truncate ${conv.unreadCount > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                                    {conv.lastMessage}
                                </p>
                                
                                {member.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {member.tags.slice(0, 3).map(tag => (
                                            <span key={tag} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded-md border border-gray-200 whitespace-nowrap shrink-0 max-w-[100px] truncate">
                                                {tag}
                                            </span>
                                        ))}
                                        {member.tags.length > 3 && (
                                            <span className="px-1.5 py-0.5 text-gray-400 text-[10px] whitespace-nowrap shrink-0">+ {member.tags.length - 3}</span>
                                        )}
                                    </div>
                                )}
                            </div>
                            {conv.unreadCount > 0 && (
                                <div className="w-2.5 h-2.5 bg-oak-orange-400 rounded-full mt-2 shrink-0 animate-pulse"></div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

/* ----------------------------------------------------------------------------------
   SUB-COMPONENT: CHAT INTERFACE (Middle Column)
   ---------------------------------------------------------------------------------- */
const ChatArea: React.FC<{ 
    conversation: Conversation | null; 
    t: Record<string, string>;
    onBack?: () => void;
    onViewDetails?: () => void;
    className?: string;
}> = ({ conversation, t, onBack, onViewDetails, className = '' }) => {
    const [whisperMode, setWhisperMode] = useState(false);
    const [inputText, setInputText] = useState('');

    if (!conversation) {
        return (
            <div className={`flex-1 flex items-center justify-center bg-oak-bg ${className} hidden md:flex`}>
                <div className="text-center text-gray-400">
                    <Smile className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>{t['inbox.empty']}</p>
                </div>
            </div>
        );
    }

    const member = MOCK_MEMBERS[conversation.memberId];

    return (
        <div className={`flex-1 flex flex-col bg-oak-bg h-full relative ${className}`}>
             {/* Header */}
            <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 shadow-sm z-10 sticky top-0">
                <div className="flex items-center space-x-2 min-w-0">
                    {/* Mobile Back Button - Large Touch Target */}
                    {onBack && (
                        <button 
                            onClick={onBack} 
                            className="md:hidden w-10 h-10 flex items-center justify-center -ml-2 mr-1 text-gray-600 hover:text-oak-purple-700 active:bg-gray-100 rounded-full transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                    )}
                    
                    <div className="flex items-center">
                        {/* Mobile Avatar in Header */}
                        <img src={member.avatarUrl} className="w-8 h-8 rounded-full mr-3 md:hidden border border-gray-200 shrink-0" />
                        <div>
                            <h3 className="font-display font-bold text-lg text-gray-800 truncate leading-tight">{member.lineName}</h3>
                            {member.level === 'VIP' && (
                                <span className="md:hidden inline-block text-[10px] bg-oak-orange-400/20 text-oak-orange-400 px-1.5 rounded font-bold uppercase">VIP</span>
                            )}
                        </div>
                    </div>
                    {member.level === 'VIP' && (
                        <span className="hidden md:inline-block px-2 py-0.5 bg-oak-orange-400/20 text-oak-orange-400 text-xs font-bold rounded uppercase shrink-0 ml-2">VIP</span>
                    )}
                </div>
                <div className="flex items-center space-x-2 sm:space-x-4 text-gray-400 shrink-0">
                    <div className="text-xs text-gray-400 flex items-center hidden sm:flex">
                         <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                         {t['chat.active']}
                    </div>
                    {/* Mobile Details Toggle - Large Touch Target */}
                    {onViewDetails && (
                        <button 
                            onClick={onViewDetails} 
                            className="xl:hidden w-10 h-10 flex items-center justify-center text-gray-600 hover:text-oak-purple-700 active:bg-gray-100 rounded-full"
                        >
                            <Info className="w-6 h-6" />
                        </button>
                    )}
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-oak-bg">
                {conversation.messages.map(msg => (
                    <div key={msg.id} className={`flex w-full ${msg.senderId === 'agent_01' || msg.senderId === 'system' ? 'justify-end' : 'justify-start'}`}>
                        {/* Avatar for user */}
                        {msg.senderId !== 'agent_01' && (
                             <img src={member.avatarUrl} className="w-8 h-8 rounded-full mr-2 self-end mb-1 shrink-0" />
                        )}

                        <div className={`max-w-[85%] sm:max-w-[70%] flex flex-col ${msg.senderId === 'agent_01' ? 'items-end' : 'items-start'}`}>
                            
                            {/* Whisper Bubble */}
                            {msg.isWhisper ? (
                                <div className="bg-yellow-100 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-xl rounded-tr-none text-sm mb-1 shadow-sm relative">
                                    <div className="flex items-center text-xs font-bold mb-1 opacity-70">
                                        <Mic className="w-3 h-3 mr-1" /> {t['chat.whisper']}
                                    </div>
                                    {msg.text}
                                </div>
                            ) : (
                                /* Standard Bubble */
                                <div className={`
                                    px-4 py-3 text-sm shadow-sm relative break-words
                                    ${msg.senderId === 'agent_01' 
                                        ? 'bg-oak-purple-700 text-white rounded-2xl rounded-tr-none' 
                                        : 'bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-tl-none'}
                                    ${msg.type === 'sticker' ? 'bg-transparent border-0 shadow-none p-0' : ''}
                                `}>
                                    {msg.type === 'sticker' ? <div className="text-4xl">🐱</div> : msg.text}
                                </div>
                            )}
                            
                            {/* Timestamp */}
                            <span className="text-[10px] text-gray-400 mt-1 px-1">
                                {msg.timestamp} {msg.senderId === 'agent_01' && (msg.read ? '• Read' : '• Sent')}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className={`p-4 bg-white border-t transition-colors ${whisperMode ? 'border-yellow-200 bg-yellow-50/50' : 'border-gray-200'}`}>
                {/* Whisper Toggle Bar */}
                <div className="flex items-center justify-between mb-3 px-1">
                    <div className="flex space-x-2">
                         <button 
                            onClick={() => setWhisperMode(false)}
                            className={`px-4 py-1.5 text-xs rounded-full font-medium transition-all active:scale-95 ${!whisperMode ? 'bg-oak-purple-700 text-white shadow-md' : 'text-gray-500 bg-gray-100'}`}
                         >
                             {t['chat.reply']}
                         </button>
                         <button 
                             onClick={() => setWhisperMode(true)}
                             className={`px-4 py-1.5 text-xs rounded-full font-medium transition-all flex items-center active:scale-95 ${whisperMode ? 'bg-yellow-400 text-yellow-900 shadow-md' : 'text-gray-500 bg-gray-100'}`}
                         >
                             <Mic className="w-3 h-3 mr-1" /> {t['chat.whisper']}
                         </button>
                    </div>
                    {whisperMode && <span className="text-xs text-yellow-700 font-medium hidden sm:inline-block">{t['chat.whisper.hint']}</span>}
                </div>

                <div className="relative">
                     <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder={whisperMode ? t['chat.whisper.placeholder'] : t['chat.placeholder']}
                        className={`w-full rounded-2xl border p-4 pr-14 text-base md:text-sm focus:outline-none focus:ring-2 resize-none h-24 sm:h-24 transition-all
                            ${whisperMode 
                                ? 'border-yellow-300 bg-yellow-100/50 focus:ring-yellow-400 placeholder-yellow-700/50' 
                                : 'border-gray-200 bg-oak-bg focus:ring-oak-purple-700/20'}
                        `}
                     />
                     <div className="absolute bottom-3 right-3 flex items-center space-x-1">
                        {!whisperMode && (
                             <>
                                <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-oak-purple-700 hover:bg-white active:bg-gray-100 rounded-full transition-colors hidden sm:flex"><Paperclip className="w-5 h-5" /></button>
                                <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-oak-purple-700 hover:bg-white active:bg-gray-100 rounded-full transition-colors hidden sm:flex"><Smile className="w-5 h-5" /></button>
                             </>
                        )}
                        <button 
                            className={`w-10 h-10 flex items-center justify-center rounded-full text-white shadow-md transition-transform active:scale-90
                            ${whisperMode ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-oak-orange-400 hover:bg-orange-500'}`}
                        >
                            <Send className="w-5 h-5 ml-0.5" />
                        </button>
                     </div>
                </div>
            </div>
        </div>
    );
};

/* ----------------------------------------------------------------------------------
   SUB-COMPONENT: MEMBER 360 (Right Column)
   ---------------------------------------------------------------------------------- */
const Member360: React.FC<{ 
    conversation: Conversation | null; 
    t: Record<string, string>;
    onBack?: () => void;
    className?: string;
}> = ({ conversation, t, onBack, className = '' }) => {
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Sync tags when conversation changes
    useEffect(() => {
        if (conversation) {
            const member = MOCK_MEMBERS[conversation.memberId];
            setTags(member ? [...member.tags] : []);
        } else {
            setTags([]);
        }
        setTagInput('');
        setShowSuggestions(false);
    }, [conversation]);

    // Handle clicking outside to close suggestions
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    if (!conversation) return <div className={`w-96 bg-white border-l border-gray-200 hidden xl:block ${className}`}></div>;
    
    const member = MOCK_MEMBERS[conversation.memberId];

    const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setTagInput(val);
        if (val.trim().length > 0) {
            const filtered = AVAILABLE_TAGS.filter(
                tag => tag.toLowerCase().includes(val.toLowerCase()) && !tags.includes(tag)
            );
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const addTag = (tag: string) => {
        const trimmedTag = tag.trim();
        if (trimmedTag && !tags.includes(trimmedTag)) {
            const newTags = [...tags, trimmedTag];
            setTags(newTags);
            // Persist to Mock DB
            if (conversation && MOCK_MEMBERS[conversation.memberId]) {
                MOCK_MEMBERS[conversation.memberId].tags = newTags;
            }
        }
        setTagInput('');
        setShowSuggestions(false);
        inputRef.current?.focus();
    };

    const removeTag = (tagToRemove: string) => {
        const newTags = tags.filter(tag => tag !== tagToRemove);
        setTags(newTags);
        // Persist to Mock DB
        if (conversation && MOCK_MEMBERS[conversation.memberId]) {
            MOCK_MEMBERS[conversation.memberId].tags = newTags;
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (tagInput.trim()) {
                addTag(tagInput);
            }
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
        }
    };

    return (
        <div className={`w-full xl:w-96 bg-white xl:border-l border-gray-200 flex flex-col h-full overflow-y-auto ${className}`}>
            {/* Mobile Header for Details */}
            {onBack && (
                <div className="h-16 px-4 border-b border-gray-100 flex items-center xl:hidden sticky top-0 bg-white z-20 shadow-sm">
                     <button onClick={onBack} className="w-10 h-10 flex items-center justify-center -ml-2 mr-1 text-gray-600 hover:text-oak-purple-700 active:bg-gray-100 rounded-full transition-colors">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <span className="font-bold text-gray-800 text-lg">{t['action.details']}</span>
                </div>
            )}

            {/* Profile Header */}
            <div className="p-8 text-center border-b border-gray-100 relative">
                <div className="relative inline-block">
                    {/* Fixed shrink-0 to prevent squeezing */}
                    <img src={member.avatarUrl} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-oak-bg object-cover shrink-0 shadow-sm" />
                    <div className="absolute bottom-1 right-1 w-6 h-6 bg-oak-orange-400 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold shadow-sm">L</div>
                </div>
                <h2 className="text-2xl font-display font-bold text-oak-text-primary break-words px-4 leading-tight">{member.lineName}</h2>
                <p className="text-sm text-gray-400 mb-6 font-mono bg-gray-50 inline-block px-2 py-0.5 rounded mt-1">{member.oakUid}</p>
                
                <div className="flex justify-center space-x-4 mb-2">
                     {/* Quick Actions - Larger touch targets */}
                    <button className="w-12 h-12 rounded-full bg-oak-bg hover:bg-gray-200 active:bg-gray-300 text-oak-purple-700 transition-colors flex items-center justify-center shadow-sm" title="Generate Deep Link">
                        <ExternalLink className="w-5 h-5" />
                    </button>
                     <button className="w-12 h-12 rounded-full bg-oak-bg hover:bg-gray-200 active:bg-gray-300 text-oak-purple-700 transition-colors flex items-center justify-center shadow-sm" title="Send Email">
                        <Mail className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Info Grid (Collapsible) */}
            <CollapsibleSection title={t['member.contact']} defaultOpen={true}>
                <div className="space-y-4">
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mr-3 shrink-0">
                            <Mail className="w-4 h-4 text-gray-400" />
                        </div>
                        <span className="text-sm text-gray-700 break-all">{member.email || t['member.not_provided']}</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mr-3 shrink-0">
                            <Phone className="w-4 h-4 text-gray-400" />
                        </div>
                        <span className="text-sm text-gray-700">{member.phone || t['member.not_provided']}</span>
                    </div>
                </div>
            </CollapsibleSection>

            {/* Tags System (Collapsible) */}
            <CollapsibleSection title={t['member.tags']} defaultOpen={true}>
                <div className="flex flex-wrap gap-2 items-center" ref={wrapperRef}>
                    {tags.map(tag => (
                        <span key={tag} className="pl-3 pr-1 py-1.5 bg-oak-purple-700/5 text-oak-purple-900 rounded-full text-sm md:text-xs font-medium border border-oak-purple-700/10 inline-flex items-center group shrink-0 max-w-full">
                            <span className="truncate max-w-[150px]">{tag}</span>
                            <button 
                                onClick={() => removeTag(tag)}
                                className="ml-1 w-6 h-6 flex items-center justify-center rounded-full text-oak-purple-700/40 hover:text-oak-purple-700 hover:bg-oak-purple-700/10 active:bg-oak-purple-700/20 transition-colors shrink-0"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </span>
                    ))}
                    
                    {/* Autocomplete Input */}
                    <div className="relative inline-block flex-1 min-w-[120px]">
                        <input 
                            ref={inputRef}
                            type="text" 
                            value={tagInput}
                            onChange={handleTagInputChange}
                            onKeyDown={handleKeyDown}
                            onFocus={() => { if(tagInput) setShowSuggestions(true) }}
                            placeholder={t['member.tags.placeholder']}
                            className="w-full px-3 py-2 text-sm bg-transparent focus:outline-none border-b border-dashed border-gray-300 focus:border-oak-purple-700 transition-colors placeholder-gray-400 text-gray-700"
                        />
                        {showSuggestions && (
                            <div className="absolute left-0 top-full mt-1 w-full min-w-[200px] bg-white border border-gray-200 shadow-xl rounded-lg z-50 max-h-60 overflow-y-auto">
                                {suggestions.length > 0 ? (
                                    suggestions.map(s => (
                                        <button 
                                            key={s}
                                            onClick={() => addTag(s)}
                                            className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-oak-bg hover:text-oak-purple-700 active:bg-oak-bg transition-colors border-b border-gray-50 last:border-0"
                                        >
                                            {s}
                                        </button>
                                    ))
                                ) : (
                                    /* Allow explicit creation click */
                                    <button
                                        onClick={() => addTag(tagInput)}
                                        className="w-full text-left px-4 py-3 text-sm text-oak-purple-700 font-bold hover:bg-oak-bg active:bg-oak-bg transition-colors"
                                    >
                                        + {t['member.tags.create']} "{tagInput}"
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </CollapsibleSection>

            {/* Journey Timeline (Collapsible) */}
            <CollapsibleSection title={t['member.journey']} defaultOpen={true}>
                 <div className="space-y-6 border-l-2 border-gray-200 pl-4 ml-1">
                    <div className="relative">
                        <div className="absolute -left-[21px] top-1 w-3 h-3 bg-oak-orange-400 rounded-full border-2 border-white shadow-sm"></div>
                        <p className="text-xs text-gray-400 mb-1">10:42 AM Today</p>
                        <p className="text-sm font-medium text-gray-800">Asked about Test Drive</p>
                    </div>
                    <div className="relative">
                        <div className="absolute -left-[21px] top-1 w-3 h-3 bg-gray-300 rounded-full border-2 border-white shadow-sm"></div>
                        <p className="text-xs text-gray-400 mb-1">Yesterday</p>
                        <p className="text-sm text-gray-600">Clicked menu "Latest Promos"</p>
                    </div>
                     <div className="relative">
                        <div className="absolute -left-[21px] top-1 w-3 h-3 bg-oak-purple-700 rounded-full border-2 border-white shadow-sm"></div>
                        <p className="text-xs text-gray-400 mb-1">Nov 12, 2024</p>
                        <p className="text-sm text-gray-600">Joined via QR Code (Taipei Expo)</p>
                    </div>
                 </div>
            </CollapsibleSection>
        </div>
    );
};

/* ----------------------------------------------------------------------------------
   MAIN COMPONENT
   ---------------------------------------------------------------------------------- */
const SmartInbox: React.FC<SmartInboxProps> = ({ language }) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [mobileView, setMobileView] = useState<MobileView>('list');
    
    // Auto-select first conversation on Desktop only
    useEffect(() => {
        // Simple check for desktop viewport
        if (window.innerWidth >= 768 && !selectedId) {
             setSelectedId('c_01');
        }
    }, []);

    const activeConversation = selectedId 
        ? MOCK_CONVERSATIONS.find(c => c.id === selectedId) || null 
        : null;

    const t = TRANSLATIONS[language];

    // Handlers for mobile navigation
    const handleSelect = (id: string) => {
        setSelectedId(id);
        setMobileView('chat');
    };

    const handleBackToList = () => {
        setMobileView('list');
    };

    const handleViewDetails = () => {
        setMobileView('details');
    };

    const handleBackToChat = () => {
        setMobileView('chat');
    };

    return (
        <div className="flex h-full overflow-hidden bg-white w-full">
            {/* List Column: Visible on Desktop OR if mobile view is 'list' */}
            <InboxList 
                conversations={MOCK_CONVERSATIONS} 
                selectedId={selectedId}
                onSelect={handleSelect}
                t={t}
                className={`${mobileView === 'list' ? 'block' : 'hidden md:block'}`}
            />
            
            {/* Chat Column: Visible on Desktop OR if mobile view is 'chat' */}
            <ChatArea 
                conversation={activeConversation} 
                t={t}
                onBack={handleBackToList}
                onViewDetails={handleViewDetails}
                className={`${mobileView === 'chat' ? 'block' : 'hidden md:flex'}`}
            />
            
            {/* Details Column: Visible on Desktop (XL) OR if mobile view is 'details' */}
            <Member360 
                conversation={activeConversation} 
                t={t}
                onBack={handleBackToChat}
                // Fixed z-index to 60 to overlay Sidebar (z-50) for true full-screen on mobile
                className={`${mobileView === 'details' ? 'block w-full fixed inset-0 z-[60] animate-slide-in-right' : 'hidden xl:block'}`}
            />
        </div>
    );
};

export default SmartInbox;