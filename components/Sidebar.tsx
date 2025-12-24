import React from 'react';
import { LayoutDashboard, MessageSquare, Users, Radio, Zap, BarChart2, Settings, MonitorPlay, Globe } from 'lucide-react';
import { NavItem, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface SidebarProps {
  activeItem: NavItem;
  onNavigate: (item: NavItem) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, onNavigate, language, onLanguageChange }) => {
  const t = TRANSLATIONS[language];

  const menuItems = [
    { id: NavItem.Dashboard, icon: LayoutDashboard, label: t['nav.dashboard'] },
    { id: NavItem.Inbox, icon: MessageSquare, label: t['nav.inbox'] },
    { id: NavItem.Members, icon: Users, label: t['nav.members'] },
    { id: NavItem.Broadcast, icon: Radio, label: t['nav.broadcast'] },
    { id: NavItem.Automation, icon: Zap, label: t['nav.automation'] },
    { id: NavItem.Analytics, icon: BarChart2, label: t['nav.analytics'] },
    { id: NavItem.Settings, icon: Settings, label: t['nav.settings'] },
  ];

  const toggleLanguage = () => {
    onLanguageChange(language === 'zh-TW' ? 'en' : 'zh-TW');
  };

  return (
    <aside className="w-16 md:w-64 bg-oak-purple-700 h-screen flex flex-col shadow-2xl z-50 transition-all duration-300">
      {/* Logo Area */}
      <div className="p-4 md:p-8 md:pb-12 flex justify-center md:justify-start">
        <div className="flex items-center space-x-2 text-white font-display font-bold text-2xl tracking-wide">
          <div className="w-8 h-8 bg-oak-orange-400 rounded-lg flex items-center justify-center text-oak-purple-700 shrink-0">
            O
          </div>
          <span className="hidden md:block">OakMega</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-2 md:px-4 space-y-2 overflow-y-auto no-scrollbar">
        {menuItems.map((item) => {
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-center md:justify-start md:space-x-3 px-2 md:px-4 py-3 rounded-lg transition-all duration-200 group relative
                ${isActive 
                  ? 'bg-white/10 text-white font-medium' 
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              title={item.label}
            >
              {/* Active Indicator Strip */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-oak-orange-400 rounded-r-full" />
              )}
              
              <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-oak-orange-400' : ''}`} />
              <span className="text-sm font-medium tracking-wide hidden md:block truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-white/10 space-y-2">
        {/* Language Switcher */}
        <button
          onClick={toggleLanguage}
          className="w-full flex items-center justify-center md:justify-start md:space-x-3 px-2 md:px-4 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
          title="Switch Language"
        >
          <Globe className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium hidden md:block">
            {language === 'zh-TW' ? 'English' : '繁體中文'}
          </span>
        </button>

        {/* Kiosk Mode Toggle */}
        <button
          onClick={() => onNavigate(NavItem.Kiosk)}
          className="w-full flex items-center justify-center md:justify-start md:space-x-3 px-2 md:px-4 py-3 rounded-lg text-oak-orange-400 hover:bg-white/5 transition-colors border border-dashed border-oak-orange-400/30"
          title={t['nav.kiosk']}
        >
          <MonitorPlay className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium hidden md:block truncate">{t['nav.kiosk']}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;