import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CHART_DATA_VOLUME, MOCK_MEMBERS } from '../constants';
import { MessageSquare, Users, Clock, Zap } from 'lucide-react';

const COLORS = ['#5D38BF', '#FFC044', '#3E1C96', '#E5E7EB', '#6366F1', '#EC4899'];

const StatCard: React.FC<{ title: string; value: string; sub: string; icon: React.ElementType }> = ({ title, value, sub, icon: Icon }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-oak-text-secondary text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-display font-bold text-oak-purple-700">{value}</h3>
      </div>
      <div className="p-3 bg-oak-bg rounded-lg">
        <Icon className="w-6 h-6 text-oak-orange-400" />
      </div>
    </div>
    <p className="text-xs text-green-600 font-medium flex items-center">
      <span>▲</span>
      <span className="ml-1">{sub}</span>
    </p>
  </div>
);

const Dashboard: React.FC = () => {
  // Calculate tag distribution dynamically from the current state of MOCK_MEMBERS
  const tagData = useMemo(() => {
    const stats: Record<string, number> = {};
    Object.values(MOCK_MEMBERS).forEach(member => {
      if (member.tags) {
        member.tags.forEach(tag => {
          stats[tag] = (stats[tag] || 0) + 1;
        });
      }
    });
    
    // Sort by count descending and take top 6, or just map all
    return Object.entries(stats)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, []); // Dependency array empty assuming MOCK_MEMBERS mutation triggers re-render if parent updates or if we force update, 
          // but for this prototype, switching views forces re-mount of Dashboard which re-calculates.

  const totalTags = tagData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="p-8 h-full overflow-y-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-display font-bold text-oak-text-primary mb-2">Command Center</h1>
        <p className="text-oak-text-secondary">Welcome back, Sarah. Here's what's happening today.</p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Today's Messages" value="1,248" sub="12% vs yesterday" icon={MessageSquare} />
        <StatCard title="Avg. Response Time" value="45s" sub="5% faster" icon={Clock} />
        <StatCard title="New Friends" value="86" sub="32 this week" icon={Users} />
        <StatCard title="Conversion Rate" value="4.2%" sub="0.8% increase" icon={Zap} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-display font-bold text-lg text-oak-text-primary mb-6">Message Volume (Today)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={CHART_DATA_VOLUME}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#666', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#666', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
                <Line 
                  type="monotone" 
                  dataKey="messages" 
                  stroke="#5D38BF" 
                  strokeWidth={3} 
                  dot={{fill: '#5D38BF', r: 4}} 
                  activeDot={{r: 6, fill: '#FFC044', stroke: '#fff', strokeWidth: 2}}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-display font-bold text-lg text-oak-text-primary mb-6">Tag Distribution</h3>
          <div className="h-80 relative">
            {tagData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={tagData}
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {tagData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
                <div className="flex h-full items-center justify-center text-gray-400">
                    No tags data available
                </div>
            )}
            
            {tagData.length > 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                        <span className="block text-2xl font-bold text-oak-purple-700">{totalTags}</span>
                        <span className="text-xs text-gray-400 uppercase">Total Tags</span>
                    </div>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;