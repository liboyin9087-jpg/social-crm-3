import React from 'react';
import { User, Bell, Lock, Globe, Save } from 'lucide-react';
import { CURRENT_USER } from '../constants';

const SettingsSection: React.FC<{ title: string, icon: React.ElementType, children: React.ReactNode }> = ({ title, icon: Icon, children }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-100 flex items-center space-x-3 bg-gray-50/50">
            <div className="p-2 bg-white rounded-lg border border-gray-200 text-oak-purple-700">
                <Icon className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-800">{title}</h3>
        </div>
        <div className="p-6">
            {children}
        </div>
    </div>
);

const Settings: React.FC = () => {
  return (
    <div className="p-8 bg-oak-bg h-full overflow-y-auto max-w-4xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-display font-bold text-oak-purple-700 mb-2">System Settings</h1>
                <p className="text-gray-500">Manage your profile and system configurations.</p>
            </div>
            <button className="flex items-center space-x-2 px-6 py-3 bg-oak-purple-700 text-white font-bold rounded-xl shadow-lg shadow-oak-purple-700/20 hover:bg-oak-purple-900 transition-all active:scale-95">
                <Save className="w-5 h-5" />
                <span>Save Changes</span>
            </button>
        </header>

        <SettingsSection title="Agent Profile" icon={User}>
            <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                    <img src={CURRENT_USER.avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover" />
                    <button className="mt-3 text-xs text-oak-purple-700 font-bold hover:underline w-full text-center">Change Photo</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
                        <input type="text" defaultValue={CURRENT_USER.name} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-oak-purple-700 transition-colors" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                        <input type="text" defaultValue="Senior Agent" disabled className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bio / Signature</label>
                        <textarea className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-oak-purple-700 transition-colors h-24 resize-none" placeholder="Happy to help!"></textarea>
                    </div>
                </div>
            </div>
        </SettingsSection>

        <SettingsSection title="Notifications" icon={Bell}>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="text-sm font-bold text-gray-800">Desktop Notifications</h4>
                        <p className="text-xs text-gray-500">Receive a popup when new messages arrive.</p>
                    </div>
                    <div className="w-12 h-6 bg-oak-purple-700 rounded-full relative cursor-pointer">
                        <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                    </div>
                </div>
                <div className="w-full h-px bg-gray-100"></div>
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="text-sm font-bold text-gray-800">Sound Alerts</h4>
                        <p className="text-xs text-gray-500">Play a sound for urgent tags (e.g. Complaint).</p>
                    </div>
                    <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer hover:bg-gray-300 transition-colors">
                        <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm"></div>
                    </div>
                </div>
            </div>
        </SettingsSection>

        <SettingsSection title="Auto-Reply Rules" icon={Globe}>
             <div className="space-y-4">
                 <div className="p-4 bg-oak-bg rounded-lg border border-gray-200 flex justify-between items-center">
                     <div>
                         <span className="text-xs font-bold text-oak-orange-400 bg-oak-orange-400/10 px-2 py-0.5 rounded uppercase">After Hours</span>
                         <p className="text-sm font-medium text-gray-800 mt-1">"Thanks for messaging. We are closed..."</p>
                     </div>
                     <button className="text-sm text-oak-purple-700 font-bold hover:underline">Edit</button>
                 </div>
                 <button className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 hover:text-oak-purple-700 hover:border-oak-purple-700 font-medium transition-colors text-sm">
                     + Add New Rule
                 </button>
             </div>
        </SettingsSection>
    </div>
  );
};

export default Settings;