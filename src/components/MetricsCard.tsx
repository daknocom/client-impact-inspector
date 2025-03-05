
import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricsCardProps {
  title: string;
  value: number;
  previousValue?: number;
  icon: React.ReactNode;
  format?: 'number' | 'percentage' | 'currency';
  color?: 'blue' | 'green' | 'orange' | 'red';
  delay?: number;
}

const MetricsCard: React.FC<MetricsCardProps> = ({ 
  title, 
  value, 
  previousValue, 
  icon, 
  format = 'number',
  color = 'blue',
  delay = 0
}) => {
  const formattedValue = React.useMemo(() => {
    switch (format) {
      case 'percentage':
        return `${value.toFixed(1)}%`;
      case 'currency':
        return new Intl.NumberFormat('en-US', { 
          style: 'currency', 
          currency: 'USD',
          maximumFractionDigits: 0
        }).format(value);
      default:
        return new Intl.NumberFormat('en-US').format(value);
    }
  }, [value, format]);

  const percentChange = previousValue 
    ? ((value - previousValue) / previousValue) * 100 
    : 0;
  
  const isPositive = percentChange > 0;
  
  const colorClasses = {
    blue: 'bg-report-blue/10 text-report-blue',
    green: 'bg-report-green/10 text-report-green',
    orange: 'bg-report-orange/10 text-report-orange',
    red: 'bg-report-red/10 text-report-red',
  };

  const animationStyle = {
    animationDelay: `${delay}ms`
  };
  
  return (
    <div 
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow transition-all duration-300 card-hover animate-fade-up"
      style={animationStyle}
    >
      <div className="flex items-start justify-between">
        <div className={cn("p-2 rounded-lg", colorClasses[color])}>
          {icon}
        </div>
        
        {previousValue && (
          <div className={cn(
            "flex items-center text-sm font-medium",
            isPositive ? "text-report-green" : "text-report-red"
          )}>
            {isPositive ? <ArrowUpIcon size={14} /> : <ArrowDownIcon size={14} />}
            <span>{Math.abs(percentChange).toFixed(1)}%</span>
          </div>
        )}
      </div>
      
      <h3 className="mt-4 text-lg font-medium text-report-gray-500">{title}</h3>
      <p className="mt-1 text-3xl font-bold">{formattedValue}</p>
    </div>
  );
};

export default MetricsCard;
