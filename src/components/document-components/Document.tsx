import React from 'react';
import { getPaperSize } from '../../config/paperSizes';
import { Page } from './Page';

export interface DocumentProps {
  title?: string;
  type?: 'flyer' | 'booklet' | 'presentation';
  paperSize?: string; // Key from PAPER_SIZES
  children: React.ReactNode;
}

export const Document: React.FC<DocumentProps> = ({ 
  title = 'Untitled Document', 
  type = 'flyer',
  paperSize = 'A4',
  children 
}) => {
  const paper = getPaperSize(paperSize);
  
  return (
    <div 
      data-document-root
      data-title={title}
      data-type={type}
      data-paper-size={paperSize}
      data-paper-width={paper.width}
      data-paper-height={paper.height}
    >
      {React.Children.map(children, child => {
        // Pass paper size to Page components if they don't have explicit dimensions
        if (React.isValidElement(child) && child.type === Page) {
          return React.cloneElement(child, {
            defaultWidth: paper.width,
            defaultHeight: paper.height,
            ...child.props
          });
        }
        return child;
      })}
    </div>
  );
};