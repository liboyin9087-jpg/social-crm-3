import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { CHART_DATA_VOLUME, CHART_DATA_WEEKLY } from '../constants';
import { ArrowUpRight, TrendingUp, Users, MessageCircle, Calendar, ChevronDown, UserPlus, Sparkles, Loader2, Activity } from 'lucide-react';

const AnalyticsCard: React.FC<{ title: string, value: string, percent: string, color: string }> = ({ title, value, percent, color }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-md hover:scale-[1.02]">
        <p className="text-gray-500 text-sm font-medium mb-2">{title}</p>
        <div className="flex items-baseline space-x-3">
            <h3 className="text-3xl font-display font-bold text-gray-800 transition-all duration-300">{value}</h3>
            <span className={`text-sm font-bold flex items-center ${color === 'green' ? 'text-green-600' : 'text-oak-purple-700'}`}>
                <ArrowUpRight className="w-3 h-3 mr-1" /> {percent}
            </span>
        </div>
    </div>
);

const ChartSkeleton = () => (
    <div className="h-full w-full flex flex-col justify-end p-4 space-y-2 bg-gray-50/50 rounded-xl animate-pulse border border-gray-100">
        <div className="flex-1 w-full flex items-end space-x-2">
            <div className="w-full bg-gray-200 rounded-t-sm h-[40%]"></div>
            <div className="w-full bg-gray-200 rounded-t-sm h-[70%]"></div>
            <div className="w-full bg-gray-200 rounded-t-sm h-[50%]"></div>
            <div className="w-full bg-gray-200 rounded-t-sm h-[80%]"></div>
            <div className="w-full bg-gray-200 rounded-t-sm h-[60%]"></div>
        </div>
        <div className="h-4 w-1/3 bg-gray-200 rounded mx-auto"></div>
    </div>
);

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/95 backdrop-blur-md p-5 border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl ring-1 ring-black/5 transition-all transform hover:scale-105">
                <p className="text-xs text-gray-400 mb-3 font-bold uppercase tracking-wider flex items-center border-b border-gray-100 pb-2">
                    <Calendar className="w-3 h-3 mr-1.5" />
                    {label}
                </p>
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="space-y-1.5 mt-2">
                        <div className="flex items-center justify-between min-w-[140px] space-x-6">
                            <div className="flex items-center space-x-2">
                                <div className="w-2.5 h-2.5 rounded-full ring-2 ring-white shadow-sm" style={{ backgroundColor: entry.color }}></div>
                                <span className="text-gray-600 font-medium text-sm">{entry.name}</span>
                            </div>
                            <span className="text-gray-900 font-bold font-display text-lg">{entry.value.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-end">
                            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-gray-50 text-gray-400 font-medium border border-gray-100">
                                {entry.name.includes('Rate') ? 'Conversion' : (entry.value > 100 ? 'High Volume' : 'Steady')}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const Analytics: React.FC = () => {
  const [metrics, setMetrics] = useState({
    messages: 45231,
    users: 8942,
    ctr: 3.8
  });
  
  // Chart Data State
  const [weeklyData, setWeeklyData] = useState(CHART_DATA_WEEKLY);
  const [volumeData, setVolumeData] = useState(CHART_DATA_VOLUME);
  
  const [dateRange, setDateRange] = useState('Last 7 Days');
  const [isDateMenuOpen, setIsDateMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate real-time data ingestion
    const interval = setInterval(() => {
      // 1. Update Metrics with slightly larger random increments for visibility
      setMetrics(prev => ({
        messages: prev.messages + Math.floor(Math.random() * 8) + 2, 
        users: prev.users + (Math.random() > 0.6 ? Math.floor(Math.random() * 3) + 1 : 0),
        ctr: parseFloat((prev.ctr + (Math.random() * 0.2 - 0.1)).toFixed(2))
      }));

      // 2. Update Charts (Simulate live traffic)
      setWeeklyData(prev => {
          const newData = [...prev];
          const lastIdx = newData.length - 1;
          // Only update the last day significantly
          newData[lastIdx] = {
              ...newData[lastIdx],
              active: newData[lastIdx].active + (Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0),
              new: newData[lastIdx].new + (Math.random() > 0.8 ? 1 : 0)
          };
          return newData;
      });

      setVolumeData(prev => {
          // Simulate messages coming in for the current hour (randomly picking one of the later hours)
          const newData = [...prev];
          const activeIndex = Math.floor(Math.random() * 3) + 4; // Focus on later hours in mock data
          if (newData[activeIndex]) {
            newData[activeIndex] = {
                ...newData[activeIndex],
                messages: newData[activeIndex].messages + Math.floor(Math.random() * 4) + 1
            };
          }
          return newData;
      });

    }, 2500); // 2.5s update interval

    return () => clearInterval(interval);
  }, []);

  const handleRangeChange = (range: string) => {
    setIsLoading(true);
    setDateRange(range);
    setIsDateMenuOpen(false);
    
    // Simulate API fetch delay
    setTimeout(() => {
        setMetrics(prev => ({
            messages: Math.floor(prev.messages * (Math.random() * 0.5 + 0.8)), 
            users: Math.floor(prev.users * (Math.random() * 0.5 + 0.8)),
            ctr: parseFloat((Math.random() * 5 + 1).toFixed(2))
        }));
    
        // Randomize charts to look like "different" data sets
        setWeeklyData(CHART_DATA_WEEKLY.map(d => ({
            ...d,
            active: Math.floor(d.active * (Math.random() * 0.4 + 0.8)),
            new: Math.floor(d.new * (Math.random() * 0.4 + 0.8))
        })));
        setVolumeData(CHART_DATA_VOLUME.map(d => ({
            ...d,
            messages: Math.floor(d.messages * (Math.random() * 0.4 + 0.8))
        })));
        
        setIsLoading(false);
    }, 800);
  };

  return (
    <div className="p-8 bg-oak-bg h-full overflow-y-auto custom-scrollbar" onClick={() => setIsDateMenuOpen(false)}>
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-display font-bold text-oak-purple-700 mb-2">Performance Analytics</h1>
                <p className="text-gray-500">Deep dive into your customer engagement metrics.</p>
            </div>
            <div className="flex items-center space-x-3">
                 <button className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-oak-purple-700 to-oak-purple-900 text-white rounded-lg shadow-md hover:shadow-lg transition-all text-sm font-medium active:scale-95 group">
                    <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
                    <span>Ask AI Insights</span>
                </button>

                {/* Date Range Filter */}
                <div className="relative" onClick={e => e.stopPropagation()}>
                    <button 
                        onClick={() => setIsDateMenuOpen(!isDateMenuOpen)}
                        className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 w-40 justify-between"
                    >
                        <div className="flex items-center space-x-2 truncate">
                            <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
                            <span className="truncate">{dateRange}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${isDateMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isDateMenuOpen && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-20 animate-fade-in-down">
                            {['Last 7 Days', 'Last 30 Days', 'This Month', 'Last Month', 'Custom Range'].map((range) => (
                                <button
                                    key={range}
                                    onClick={() => handleRangeChange(range)}
                                    className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between
                                        ${dateRange === range 
                                            ? 'font-bold text-oak-purple-700 bg-oak-purple-700/5' 
                                            : 'text-gray-600 hover:bg-oak-bg hover:text-oak-purple-700'}`}
                                >
                                    {range}
                                    {dateRange === range && <div className="w-1.5 h-1.5 rounded-full bg-oak-purple-700"></div>}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Live Data Badge */}
                <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                    <span className="hidden sm:inline text-xs font-bold text-gray-600 uppercase tracking-wide">Live</span>
                </div>
            </div>
        </header>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <AnalyticsCard 
                title="Total Messages Sent" 
                value={metrics.messages.toLocaleString()} 
                percent={dateRange === 'Last 7 Days' ? "+12.5%" : dateRange === 'Last 30 Days' ? "+45.2%" : "+2.1%"} 
                color="purple" 
            />
            <AnalyticsCard 
                title="Active Users (WAU)" 
                value={metrics.users.toLocaleString()} 
                percent={dateRange === 'Last 7 Days' ? "+5.2%" : "+18.4%"}
                color="green" 
            />
            <AnalyticsCard 
                title="Click-Through Rate" 
                value={`${metrics.ctr}%`} 
                percent="+0.4%" 
                color="green" 
            />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* New User Acquisition Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-96">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-gray-800 flex items-center">
                        <UserPlus className="w-5 h-5 mr-2 text-green-500" />
                        New User Acquisition
                    </h3>
                </div>
                <div className="flex-1 w-full min-h-0">
                    {isLoading ? (
                        <ChartSkeleton />
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={weeklyData}>
                                <defs>
                                    <linearGradient id="colorNewUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 12}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 12}} />
                                <Tooltip 
                                    content={<CustomTooltip />} 
                                    cursor={{ stroke: '#10B981', strokeWidth: 1.5, strokeDasharray: '4 4' }} 
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="new" 
                                    name="New Users"
                                    stroke="#10B981" 
                                    strokeWidth={3} 
                                    fillOpacity={1} 
                                    fill="url(#colorNewUsers)" 
                                    isAnimationActive={true}
                                    animationDuration={1000}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>

            {/* Peak Hours Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-96">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-gray-800 flex items-center">
                        <MessageCircle className="w-5 h-5 mr-2 text-oak-orange-400" />
                        Message Volume by Hour
                    </h3>
                </div>
                <div className="flex-1 w-full min-h-0">
                    {isLoading ? (
                        <ChartSkeleton />
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={volumeData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 12}} dy={10} />
                                <Tooltip 
                                    content={<CustomTooltip />} 
                                    cursor={{ fill: '#FFC044', opacity: 0.15 }} 
                                />
                                <Bar 
                                    dataKey="messages" 
                                    name="Messages"
                                    fill="#FFC044" 
                                    radius={[4, 4, 0, 0]} 
                                    isAnimationActive={true}
                                    animationDuration={800}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>
        </div>

        {/* Active Users Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col h-96">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-800 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-oak-purple-700" />
                    Active Users Trend
                </h3>
            </div>
            <div className="flex-1 w-full min-h-0">
                {isLoading ? (
                    <ChartSkeleton />
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={weeklyData}>
                            <defs>
                                <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#5D38BF" stopOpacity={0.4}/>
                                    <stop offset="95%" stopColor="#5D38BF" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 12}} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 12}} />
                            <Tooltip 
                                content={<CustomTooltip />} 
                                cursor={{ stroke: '#5D38BF', strokeWidth: 1.5, strokeDasharray: '4 4' }}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="active" 
                                name="Active Users"
                                stroke="#5D38BF" 
                                strokeWidth={3} 
                                fillOpacity={1} 
                                fill="url(#colorActive)" 
                                isAnimationActive={true}
                                animationDuration={1000}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    </div>
  );
};

export default Analytics;