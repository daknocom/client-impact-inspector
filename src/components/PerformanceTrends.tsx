
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export interface TrendDataPoint {
  month: string;
  impressions: number;
  visits: number;
  leads: number;
  conversations: number;
}

interface PerformanceTrendsProps {
  data: TrendDataPoint[];
}

const PerformanceTrends: React.FC<PerformanceTrendsProps> = ({ data }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold font-display">Performance Trends</h2>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fill: '#6B7280' }} />
            <YAxis tick={{ fill: '#6B7280' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                border: 'none'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="impressions" 
              stroke="#0A84FF" 
              strokeWidth={2}
              dot={{ fill: '#0A84FF', r: 4 }}
              activeDot={{ r: 6 }}
              name="Impressions"
            />
            <Line 
              type="monotone" 
              dataKey="visits" 
              stroke="#30D158" 
              strokeWidth={2}
              dot={{ fill: '#30D158', r: 4 }}
              activeDot={{ r: 6 }}
              name="Visits"
            />
            <Line 
              type="monotone" 
              dataKey="leads" 
              stroke="#FF9F0A" 
              strokeWidth={2} 
              dot={{ fill: '#FF9F0A', r: 4 }}
              activeDot={{ r: 6 }}
              name="Leads"
            />
            <Line 
              type="monotone" 
              dataKey="conversations" 
              stroke="#FF453A" 
              strokeWidth={2}
              dot={{ fill: '#FF453A', r: 4 }}
              activeDot={{ r: 6 }}
              name="Conversations"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceTrends;
