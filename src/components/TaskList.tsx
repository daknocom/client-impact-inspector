
import React from 'react';
import { CheckCircleIcon } from 'lucide-react';

export interface Task {
  id: string;
  title: string;
  description: string;
  date: Date;
  category: 'content' | 'social' | 'advertising' | 'development' | 'analytics';
}

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const categoryIcons = {
    content: "📄",
    social: "📱",
    advertising: "📣",
    development: "⚙️",
    analytics: "📊"
  };
  
  const categoryNames = {
    content: "Content Creation",
    social: "Social Media",
    advertising: "Advertising",
    development: "Development",
    analytics: "Analytics & Reporting"
  };
  
  // Group tasks by category
  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = [];
    }
    acc[task.category].push(task);
    return acc;
  }, {} as Record<string, Task[]>);
  
  return (
    <div className="space-y-8 animate-fade-in">
      <h2 className="text-2xl font-bold font-display">Work Completed This Month</h2>
      
      <div className="space-y-6">
        {Object.entries(groupedTasks).map(([category, categoryTasks]) => (
          <div key={category} className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">{categoryIcons[category as keyof typeof categoryIcons]}</span>
              <h3 className="text-xl font-medium">{categoryNames[category as keyof typeof categoryNames]}</h3>
            </div>
            
            <div className="pl-6 space-y-3">
              {categoryTasks.map(task => (
                <div 
                  key={task.id} 
                  className="flex items-start p-4 bg-report-gray-50 rounded-lg animate-scale-in"
                >
                  <CheckCircleIcon className="text-report-green mt-0.5 mr-3 h-5 w-5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">{task.title}</h4>
                    <p className="text-report-gray-500 text-sm mt-1">{task.description}</p>
                    <div className="mt-2 text-xs text-report-gray-400">
                      {new Intl.DateTimeFormat('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      }).format(task.date)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
