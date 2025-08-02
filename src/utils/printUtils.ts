import { PAPER_SIZES } from '../config/paperSizes';

// Convert pixels to CSS units for print
export const pixelsToPrintUnit = (pixels: number, unit: 'mm' | 'in' = 'mm'): string => {
  const DPI = 72; // Standard web DPI
  
  if (unit === 'mm') {
    // Convert pixels to mm: pixels / DPI * 25.4mm/inch
    const mm = (pixels / DPI) * 25.4;
    return `${mm.toFixed(2)}mm`;
  } else {
    // Convert pixels to inches: pixels / DPI
    const inches = pixels / DPI;
    return `${inches.toFixed(2)}in`;
  }
};

// Create dynamic print styles for custom paper sizes
export const createPrintStyleSheet = (paperSize: string, width: number, height: number): HTMLStyleElement => {
  const style = document.createElement('style');
  style.id = 'dynamic-print-styles';
  
  // Determine the best unit based on paper size
  const isMetric = ['A3', 'A4', 'A5'].includes(paperSize);
  const unit = isMetric ? 'mm' : 'in';
  
  const printWidth = pixelsToPrintUnit(width, unit);
  const printHeight = pixelsToPrintUnit(height, unit);
  
  // Generate CSS for this specific paper size
  style.textContent = `
    @media print {
      /* Dynamic paper size */
      [data-paper-size="${paperSize}"] [data-page] {
        width: ${printWidth} !important;
        height: ${printHeight} !important;
        min-width: ${printWidth} !important;
        max-width: ${printWidth} !important;
        min-height: ${printHeight} !important;
        max-height: ${printHeight} !important;
      }
      
      /* @page rule for custom size */
      [data-paper-size="${paperSize}"] {
        @page {
          size: ${printWidth} ${printHeight};
          margin: 0;
        }
      }
    }
  `;
  
  return style;
};

// Handle print preparation
export const preparePrintStyles = (paperSize: string | undefined): void => {
  if (!paperSize) return;
  
  // Remove any existing dynamic print styles
  const existingStyle = document.getElementById('dynamic-print-styles');
  if (existingStyle) {
    existingStyle.remove();
  }
  
  // Check if this is a custom size not in our predefined CSS
  const paper = PAPER_SIZES[paperSize];
  if (paper && !['A3', 'A4', 'A5', 'LETTER', 'LEGAL', 'TABLOID'].includes(paperSize)) {
    // Create dynamic styles for custom sizes
    const styleSheet = createPrintStyleSheet(paperSize, paper.width, paper.height);
    document.head.appendChild(styleSheet);
  }
};

// Clean up print styles after printing
export const cleanupPrintStyles = (): void => {
  const dynamicStyle = document.getElementById('dynamic-print-styles');
  if (dynamicStyle) {
    dynamicStyle.remove();
  }
};