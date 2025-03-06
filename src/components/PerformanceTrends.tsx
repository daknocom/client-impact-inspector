
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [scaleType, setScaleType] = useState<'linear' | 'log'>('linear');
  const [viewMode, setViewMode] = useState<'combined' | 'separate'>('combined');
  
  const toggleScale = () => {
    setScaleType(prev => prev === 'linear' ? 'log' : 'linear');
  };
  
  const calculateGrowth = (data: TrendDataPoint[]) => {
    if (data.length < 2) return '0%';
    const firstMonth = data[0];
    const lastMonth = data[data.length - 1];
    
    const impressionsGrowth = ((lastMonth.impressions - firstMonth.impressions) / firstMonth.impressions) * 100;
    return `${impressionsGrowth.toFixed(1)}%`;
  };
  
  const growthRate = calculateGrowth(data);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold font-display">Performance Trends</h2>
          <p className="text-report-gray-500 text-sm mt-1">
            <span className="font-semibold text-report-green">↗ {growthRate} growth</span> in impressions since {data[0]?.month}
          </p>
        </div>
        <div className="space-x-2 flex">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setViewMode(prev => prev === 'combined' ? 'separate' : 'combined')}
            className="text-xs"
          >
            {viewMode === 'combined' ? 'Show Separate Charts' : 'Show Combined Chart'}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleScale}
            className="text-xs"
          >
            {scaleType === 'linear' ? 'Show Logarithmic Scale' : 'Show Linear Scale'}
          </Button>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm">
        {viewMode === 'combined' ? (
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
              <YAxis 
                tick={{ fill: '#6B7280' }} 
                scale={scaleType}
                domain={scaleType === 'log' ? [1, 'auto'] : [0, 'auto']}
                allowDataOverflow
              />
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
        ) : (
          <Tabs defaultValue="impressions" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="impressions">Impressions</TabsTrigger>
              <TabsTrigger value="visits">Visits</TabsTrigger>
              <TabsTrigger value="leads">Leads</TabsTrigger>
              <TabsTrigger value="conversations">Conversations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="impressions">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fill: '#6B7280' }} />
                  <YAxis tick={{ fill: '#6B7280' }} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="impressions" 
                    stroke="#0A84FF" 
                    strokeWidth={3}
                    dot={{ fill: '#0A84FF', r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Impressions"
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="visits">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fill: '#6B7280' }} />
                  <YAxis tick={{ fill: '#6B7280' }} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="visits" 
                    stroke="#30D158" 
                    strokeWidth={3}
                    dot={{ fill: '#30D158', r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Visits"
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="leads">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fill: '#6B7280' }} />
                  <YAxis tick={{ fill: '#6B7280' }} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="leads" 
                    stroke="#FF9F0A" 
                    strokeWidth={3}
                    dot={{ fill: '#FF9F0A', r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Leads"
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="conversations">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fill: '#6B7280' }} />
                  <YAxis tick={{ fill: '#6B7280' }} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="conversations" 
                    stroke="#FF453A" 
                    strokeWidth={3}
                    dot={{ fill: '#FF453A', r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Conversations"
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default PerformanceTrends;
