import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, Download, UserPlus, Mail, Phone } from 'lucide-react';
import { MOCK_MEMBERS } from '../constants';

const Members: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const memberList = Object.values(MOCK_MEMBERS).filter(m => 
    m.lineName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.oakUid.includes(searchTerm)
  );

  return (
    <div className="h-full flex flex-col bg-oak-bg p-8 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-oak-purple-700 mb-2">Member Management</h1>
          <p className="text-gray-500">Manage your {Object.keys(MOCK_MEMBERS).length} members and their attributes.</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-oak-purple-700/20 text-oak-purple-700 rounded-lg hover:bg-white transition-colors">
            <Download className="w-4 h-4" />
            <span className="font-medium text-sm">Export</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-oak-purple-700 text-white rounded-lg hover:bg-oak-purple-900 transition-all shadow-md active:scale-95">
            <UserPlus className="w-4 h-4" />
            <span className="font-medium text-sm">Add Member</span>
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-t-xl border border-gray-100 flex items-center justify-between shadow-sm">
        <div className="relative w-96">
          <input 
            type="text" 
            placeholder="Search by Name or UID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-oak-purple-700/20 text-sm"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>
        <div className="flex space-x-2">
            <button className="p-2 text-gray-500 hover:text-oak-purple-700 hover:bg-gray-50 rounded-lg transition-colors">
                <Filter className="w-5 h-5" />
            </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto bg-white border-x border-b border-gray-100 rounded-b-xl shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Member Profile</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Level & Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Tags</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {memberList.map((member) => (
              <tr key={member.id} className="hover:bg-oak-bg transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img src={member.avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover border border-gray-200 mr-4" />
                    <div>
                      <div className="font-bold text-gray-800">{member.lineName}</div>
                      <div className="text-xs text-gray-400 font-mono">{member.oakUid}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    {member.email && (
                        <div className="flex items-center text-xs text-gray-600">
                            <Mail className="w-3 h-3 mr-1.5 text-gray-400" /> {member.email}
                        </div>
                    )}
                    {member.phone && (
                        <div className="flex items-center text-xs text-gray-600">
                            <Phone className="w-3 h-3 mr-1.5 text-gray-400" /> {member.phone}
                        </div>
                    )}
                    {!member.email && !member.phone && <span className="text-xs text-gray-400 italic">No contact info</span>}
                  </div>
                </td>
                <td className="px-6 py-4">
                    <div className="flex flex-col items-start space-y-1">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border
                            ${member.level === 'VIP' ? 'bg-oak-orange-400/20 text-oak-orange-400 border-oak-orange-400/30' : 
                              member.level === 'Gold' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                              'bg-gray-100 text-gray-600 border-gray-200'
                            }`}>
                            {member.level}
                        </span>
                        <span className="text-xs text-gray-400">Active {member.lastActive}</span>
                    </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {member.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded border border-gray-200 whitespace-nowrap">
                        {tag}
                      </span>
                    ))}
                    {member.tags.length > 3 && (
                        <span className="px-2 py-0.5 text-gray-400 text-xs">+ {member.tags.length - 3}</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-gray-400 hover:text-oak-purple-700 hover:bg-white rounded-full transition-colors opacity-0 group-hover:opacity-100">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Members;