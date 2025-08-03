import React from 'react';

export interface PageProps {
  width?: number;
  height?: number;
  defaultWidth?: number;  // From Document component
  defaultHeight?: number; // From Document component
  background?: string;
  padding?: number | string;
  children?: React.ReactNode;
}

export const Page: React.FC<PageProps> = ({ 
  width,
  height,
  defaultWidth = 595,  // A4 default
  defaultHeight = 842, // A4 default
  background = '#ffffff',
  padding = 0,
  children 
}) => {
  // Use explicit width/height if provided, otherwise use defaults from Document
  const pageWidth = width || defaultWidth;
  const pageHeight = height || defaultHeight;
  
  return (
    <div 
      data-page
      data-width={pageWidth}
      data-height={pageHeight}
      style={{
        width: pageWidth,
        height: pageHeight,
        minWidth: pageWidth,
        maxWidth: pageWidth,
        minHeight: pageHeight,
        maxHeight: pageHeight,
        backgroundColor: background,
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
        flexShrink: 0,
        padding: 0,
        margin: 0
      }}
    >
      <div 
        style={{
          width: '100%',
          height: '100%',
          padding,
          boxSizing: 'border-box',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {children}
      </div>
    </div>
  );
};