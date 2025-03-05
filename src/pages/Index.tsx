
import React, { useState } from 'react';
import { 
  Users, 
  MousePointerClick, 
  MessageSquareText, 
  BarChart4
} from 'lucide-react';

import Header from '@/components/Header';
import MetricsCard from '@/components/MetricsCard';
import TaskList from '@/components/TaskList';
import ImpactSection from '@/components/ImpactSection';
import PDFExport from '@/components/PDFExport';
import { Task } from '@/components/TaskList';
import { ImpactItem } from '@/components/ImpactSection';

const Index = () => {
  // Sample data - in a real app this would come from an API or database
  const [clientName, setClientName] = useState('Acme Corporation');
  const [reportDate, setReportDate] = useState(new Date());
  
  // Sample metrics data
  const metrics = [
    { 
      title: 'Total Impressions', 
      value: 125830, 
      previousValue: 98450, 
      icon: <Users className="h-5 w-5" />,
      color: 'blue',
      delay: 0
    },
    { 
      title: 'Website Visits', 
      value: 23456, 
      previousValue: 18970, 
      icon: <MousePointerClick className="h-5 w-5" />,
      color: 'green',
      delay: 100
    },
    { 
      title: 'Leads Generated', 
      value: 284, 
      previousValue: 196, 
      icon: <BarChart4 className="h-5 w-5" />,
      color: 'orange',
      delay: 200
    },
    { 
      title: 'Conversations', 
      value: 142, 
      previousValue: 98, 
      icon: <MessageSquareText className="h-5 w-5" />,
      color: 'red',
      delay: 300
    }
  ];
  
  // Sample tasks data
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Website Content Update',
      description: 'Updated homepage copy and product descriptions to improve SEO and conversion rates.',
      date: new Date(2023, 6, 5),
      category: 'content'
    },
    {
      id: '2',
      title: 'Blog Article Publishing',
      description: 'Published 3 new industry-focused blog articles targeting key customer pain points.',
      date: new Date(2023, 6, 12),
      category: 'content'
    },
    {
      id: '3',
      title: 'Social Media Campaign',
      description: 'Executed 2-week campaign across Instagram and LinkedIn highlighting customer success stories.',
      date: new Date(2023, 6, 18),
      category: 'social'
    },
    {
      id: '4',
      title: 'Google Ads Optimization',
      description: 'Refined ad targeting and improved ad copy based on performance data, increasing CTR by 15%.',
      date: new Date(2023, 6, 15),
      category: 'advertising'
    },
    {
      id: '5',
      title: 'Email Newsletter Design',
      description: 'Designed and sent monthly newsletter highlighting new products and promotions.',
      date: new Date(2023, 6, 22),
      category: 'content'
    },
    {
      id: '6',
      title: 'Analytics Dashboard Setup',
      description: 'Set up custom report dashboards in Google Analytics for better performance tracking.',
      date: new Date(2023, 6, 8),
      category: 'analytics'
    }
  ];
  
  // Sample impact data
  const impactItems: ImpactItem[] = [
    {
      id: '1',
      title: 'Increased Organic Traffic',
      description: 'Content optimization efforts resulted in a 28% increase in organic search traffic this month.',
      type: 'growth'
    },
    {
      id: '2',
      title: 'Higher Conversion Rate',
      description: 'Landing page improvements led to conversion rate increase from 2.3% to 3.5%.',
      type: 'improvement'
    },
    {
      id: '3',
      title: 'Social Media Milestone',
      description: 'Reached 10,000 followers on LinkedIn, expanding brand reach to key decision makers.',
      type: 'achievement'
    },
    {
      id: '4',
      title: 'Customer Engagement Trend',
      description: 'Identified peak engagement times through analytics, allowing for optimized posting schedule.',
      type: 'insight'
    }
  ];
  
  return (
    <div className="min-h-screen bg-report-gray-100">
      <div className="max-w-[66rem] mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Export Controls */}
        <div className="mb-8 flex justify-end no-print">
          <PDFExport reportId="marketing-report" clientName={clientName} />
        </div>
        
        {/* Report Content */}
        <div id="marketing-report" className="report-container bg-white rounded-xl shadow-md p-8 mb-8">
          <Header clientName={clientName} reportDate={reportDate} />
          
          {/* Metrics Overview */}
          <div className="mt-12 mb-16">
            <h2 className="text-2xl font-bold font-display mb-6">Performance Metrics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <MetricsCard
                  key={index}
                  title={metric.title}
                  value={metric.value}
                  previousValue={metric.previousValue}
                  icon={metric.icon}
                  color={metric.color}
                  delay={metric.delay}
                />
              ))}
            </div>
          </div>
          
          {/* Tasks Completed */}
          <div className="mb-16">
            <TaskList tasks={tasks} />
          </div>
          
          {/* Impact Analysis */}
          <div className="mb-8">
            <ImpactSection items={impactItems} />
          </div>
          
          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-report-gray-200 text-center text-report-gray-500 text-sm">
            Generated on {new Intl.DateTimeFormat('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }).format(new Date())}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
