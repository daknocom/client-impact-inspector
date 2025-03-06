
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const generatePDF = async (elementId: string, filename: string): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Element not found');
    return;
  }

  try {
    // Temporarily modify element for optimal PDF capture
    const htmlElement = element as HTMLElement;
    const originalPadding = htmlElement.style.padding;
    htmlElement.style.padding = '10mm';
    
    // Special handling for website mockup
    const iframe = element.querySelector('.website-iframe-container iframe');
    const fallbackImg = element.querySelector('.website-image-fallback img');

    // If there's an iframe in the mockup, temporarily hide it and show the image fallback
    if (iframe && fallbackImg) {
      (iframe as HTMLElement).style.opacity = '0';
      const fallbackContainer = element.querySelector('.website-image-fallback');
      if (fallbackContainer) {
        fallbackContainer.classList.remove('opacity-0');
      }
    }
    
    // Wait for images to load
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create canvas from element
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: true,
      foreignObjectRendering: false, // Changed to false for better compatibility
      onclone: (clonedDoc) => {
        // Additional modifications to the cloned document if needed
        const clonedIframes = clonedDoc.querySelectorAll('iframe');
        clonedIframes.forEach(frame => {
          frame.remove(); // Remove iframes from the clone as they won't render in PDF
        });
      }
    });
    
    // Restore original styling
    htmlElement.style.padding = originalPadding;
    
    // Restore iframe visibility if it was modified
    if (iframe && fallbackImg) {
      (iframe as HTMLElement).style.opacity = '1';
      const fallbackContainer = element.querySelector('.website-image-fallback');
      if (fallbackContainer) {
        fallbackContainer.classList.add('opacity-0');
      }
    }
    
    // Calculate PDF dimensions (A4)
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Calculate proper scaling
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Handle multi-page content if needed
    if (imgHeight > 297) { // A4 height in mm
      let heightLeft = imgHeight;
      let position = 0;
      
      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= 297;
      position -= 297;
      
      // Add additional pages if needed
      while (heightLeft > 0) {
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= 297;
        position -= 297;
      }
    } else {
      // Content fits on a single page
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    }
    
    // Save PDF
    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};
