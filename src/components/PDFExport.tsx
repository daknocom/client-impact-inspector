
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';
import { generatePDF } from '@/utils/pdfUtils';

interface PDFExportProps {
  reportId: string;
  clientName: string;
  isGenerating?: boolean;
  onGenerateStart?: () => void;
  onGenerateEnd?: () => void;
}

const PDFExport: React.FC<PDFExportProps> = ({ 
  reportId, 
  clientName,
  isGenerating = false,
  onGenerateStart,
  onGenerateEnd
}) => {
  const [generating, setGenerating] = React.useState(isGenerating);
  
  const handleExportPDF = async () => {
    if (onGenerateStart) onGenerateStart();
    setGenerating(true);
    
    try {
      const filename = `${clientName.replace(/\s+/g, '-')}-Marketing-Report-${new Date().toISOString().slice(0, 7)}`;
      await generatePDF(reportId, filename);
    } catch (error) {
      console.error('Error exporting PDF:', error);
    } finally {
      setGenerating(false);
      if (onGenerateEnd) onGenerateEnd();
    }
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <div className="flex flex-col sm:flex-row gap-3 print:hidden">
      <Button
        variant="default"
        className="bg-report-blue hover:bg-report-blue/90 text-white"
        onClick={handleExportPDF}
        disabled={generating}
      >
        <Download className="mr-2 h-4 w-4" />
        {generating ? 'Generating PDF...' : 'Export as PDF'}
      </Button>
      
      <Button
        variant="outline"
        className="border-report-gray-200"
        onClick={handlePrint}
      >
        <Printer className="mr-2 h-4 w-4" />
        Print Report
      </Button>
    </div>
  );
};

export default PDFExport;
