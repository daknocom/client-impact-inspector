
import React, { useState, useEffect } from 'react';
import { Laptop } from 'lucide-react';

interface WebsiteMockupProps {
  websiteUrl: string;
  clientName: string;
}

const WebsiteMockup: React.FC<WebsiteMockupProps> = ({ websiteUrl, clientName }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Sanitize URL by ensuring it has the proper protocol
  const sanitizedUrl = websiteUrl.startsWith('http') 
    ? websiteUrl 
    : `https://${websiteUrl}`;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="space-y-6 mb-16 animate-fade-in">
      <h2 className="text-2xl font-bold font-display">Website Overview</h2>
      <div className="relative mx-auto max-w-4xl">
        {/* Laptop/Monitor Frame */}
        <div className="relative laptop-frame bg-report-gray-900 rounded-t-xl pt-4 pb-3 px-4 shadow-2xl">
          {/* Screen Bezel */}
          <div className="absolute top-2 left-0 right-0 flex justify-center">
            <div className="w-2 h-2 rounded-full bg-report-gray-700"></div>
          </div>
          
          {/* Website Display Area */}
          <div className="website-screen bg-white rounded overflow-hidden relative aspect-[16/9] shadow-inner border-2 border-gray-800">
            {isLoading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-report-gray-100">
                <Laptop className="w-16 h-16 text-report-gray-300 mb-4 animate-pulse" />
                <p className="text-report-gray-500">Loading preview...</p>
              </div>
            ) : error ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-report-gray-100">
                <p className="text-red-500">Unable to load website preview</p>
              </div>
            ) : (
              <>
                {/* We'll use an iframe with fallback for the PDF export */}
                <div className="website-iframe-container absolute inset-0">
                  <iframe 
                    src={sanitizedUrl}
                    className="w-full h-full border-0" 
                    title={`${clientName} website`}
                    onError={() => setError("Failed to load website")}
                    sandbox="allow-same-origin allow-scripts"
                  />
                </div>
                <div className="website-image-fallback absolute inset-0 opacity-0">
                  <img 
                    src={`https://api.apiflash.com/v1/urltoimage?access_key=ACCESS_KEY_HERE&url=${encodeURIComponent(sanitizedUrl)}&format=png&width=1280&height=720&response_type=image`} 
                    alt={`${clientName} website screenshot`} 
                    className="w-full h-full object-cover"
                    onError={() => setError("Failed to load website screenshot")}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Laptop Base/Stand */}
        <div className="mx-auto laptop-base bg-report-gray-800 h-4 rounded-b-xl max-w-[85%]"></div>
        <div className="mx-auto laptop-stand bg-report-gray-700 h-10 w-16 rounded-b-lg"></div>
      </div>
      
      <div className="text-center text-report-gray-500 mt-4">
        <p className="text-sm">{websiteUrl}</p>
      </div>
    </div>
  );
};

export default WebsiteMockup;
