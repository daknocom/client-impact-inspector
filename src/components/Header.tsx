
import React from 'react';
import { CalendarIcon } from 'lucide-react';

interface HeaderProps {
  clientName: string;
  reportDate: Date;
}

const Header: React.FC<HeaderProps> = ({ clientName, reportDate }) => {
  const formattedDate = new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'long'
  }).format(reportDate);
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col space-y-2 mb-8">
        <div className="inline-flex items-center bg-report-blue/10 text-report-blue rounded-full px-3 py-1 text-sm font-medium self-start">
          <CalendarIcon size={14} className="mr-1" />
          {formattedDate}
        </div>
        <h1 className="text-4xl font-display font-bold tracking-tight">
          Marketing Performance Report
        </h1>
        <p className="text-lg text-report-gray-500">
          Prepared for <span className="font-semibold">{clientName}</span>
        </p>
      </div>
    </div>
  );
};

export default Header;
