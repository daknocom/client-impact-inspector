
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Globe, MessageSquare, Search, Share2 } from 'lucide-react';

export interface ChannelData {
  name: string;
  value: number;
  color: string;
}

interface ChannelBreakdownProps {
  data: ChannelData[];
}

const ChannelBreakdown: React.FC<ChannelBreakdownProps> = ({ data }) => {
  // Generate channel icons based on name
  const getChannelIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'organic search': return <Search className="w-4 h-4" />;
      case 'social media': return <Share2 className="w-4 h-4" />;
      case 'direct': return <Globe className="w-4 h-4" />;
      case 'referral': return <MessageSquare className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold font-display">Traffic Channel Breakdown</h2>
      <div className="bg-white p-6 rounded-xl shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 flex flex-col space-y-4">
          {data.map((entry, index) => (
            <div key={`channel-${index}`} className="flex items-center">
              <div 
                className="w-4 h-4 rounded-full mr-2" 
                style={{ backgroundColor: entry.color }}
              />
              <div className="flex items-center mr-2">
                {getChannelIcon(entry.name)}
              </div>
              <span className="text-report-gray-600">{entry.name}: </span>
              <span className="ml-1 font-semibold">{entry.value}%</span>
            </div>
          ))}
        </div>
        <div className="md:col-span-2 h-60">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Percentage']}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  border: 'none'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChannelBreakdown;
