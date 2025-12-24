import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import SmartInbox from './components/SmartInbox';
import Members from './components/Members';
import Broadcast from './components/Broadcast';
import Automation from './components/Automation';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import KioskMode from './components/KioskMode';
import { NavItem, Language } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<NavItem>(NavItem.Dashboard);
  const [language, setLanguage] = useState<Language>('zh-TW');

  const renderContent = () => {
    switch (currentView) {
      case NavItem.Dashboard:
        return <Dashboard />;
      case NavItem.Inbox:
        return <SmartInbox language={language} />;
      case NavItem.Members:
        return <Members />;
      case NavItem.Broadcast:
        return <Broadcast />;
      case NavItem.Automation:
        return <Automation />;
      case NavItem.Analytics:
        return <Analytics />;
      case NavItem.Settings:
        return <Settings />;
      default:
        return (
            <div className="flex items-center justify-center h-full text-gray-400">
             <div className="text-center">
               <h2 className="text-xl font-bold mb-2">Work in Progress</h2>
               <p>This module is under construction.</p>
             </div>
          </div>
        );
    }
  };

  // Kiosk mode takes over the full screen
  if (currentView === NavItem.Kiosk) {
    return <KioskMode onExit={() => setCurrentView(NavItem.Dashboard)} />;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-oak-bg font-sans text-oak-text-primary">
      <Sidebar 
        activeItem={currentView} 
        onNavigate={setCurrentView} 
        language={language}
        onLanguageChange={setLanguage}
      />
      
      <main className="flex-1 h-full overflow-hidden relative">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;