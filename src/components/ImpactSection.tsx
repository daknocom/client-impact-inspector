
import React from 'react';
import { TrendingUpIcon, ZapIcon, StarIcon, BarChart2Icon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ImpactItem {
  id: string;
  title: string;
  description: string;
  type: 'growth' | 'improvement' | 'achievement' | 'insight';
}

interface ImpactSectionProps {
  items: ImpactItem[];
}

const ImpactSection: React.FC<ImpactSectionProps> = ({ items }) => {
  const getIconForType = (type: ImpactItem['type']) => {
    switch (type) {
      case 'growth': return <TrendingUpIcon className="w-5 h-5" />;
      case 'improvement': return <ZapIcon className="w-5 h-5" />;
      case 'achievement': return <StarIcon className="w-5 h-5" />;
      case 'insight': return <BarChart2Icon className="w-5 h-5" />;
    }
  };
  
  const getColorForType = (type: ImpactItem['type']) => {
    switch (type) {
      case 'growth': return 'bg-report-green/10 text-report-green';
      case 'improvement': return 'bg-report-blue/10 text-report-blue';
      case 'achievement': return 'bg-report-orange/10 text-report-orange';
      case 'insight': return 'bg-report-red/10 text-report-red';
    }
  };
  
  const getTitleForType = (type: ImpactItem['type']) => {
    switch (type) {
      case 'growth': return 'Growth';
      case 'improvement': return 'Improvement';
      case 'achievement': return 'Achievement';
      case 'insight': return 'Insight';
    }
  };
  
  return (
    <div className="space-y-8 animate-fade-in">
      <h2 className="text-2xl font-bold font-display">Positive Impact</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, index) => (
          <div 
            key={item.id} 
            className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 card-hover animate-fade-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start mb-4">
              <div className={cn("p-2 rounded-lg mr-3", getColorForType(item.type))}>
                {getIconForType(item.type)}
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium text-report-gray-500">
                  {getTitleForType(item.type)}
                </span>
                <h3 className="text-lg font-semibold mt-1">{item.title}</h3>
              </div>
            </div>
            <p className="text-report-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImpactSection;
