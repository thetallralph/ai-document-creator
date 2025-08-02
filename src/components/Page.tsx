import React from 'react';
import { Page, DocumentElement } from '../types/document';
import Element from './Element';
import './Page.css';

interface PageProps {
  page: Page;
  selectedElement: string | null;
  onSelectElement: (elementId: string | null) => void;
  onUpdateElement: (elementId: string, updates: Partial<DocumentElement>) => void;
  onDeleteElement: (elementId: string) => void;
}

const PageComponent: React.FC<PageProps> = ({
  page,
  selectedElement,
  onSelectElement,
  onUpdateElement,
  onDeleteElement
}) => {
  return (
    <div 
      className="page"
      style={{
        width: page.width,
        height: page.height,
        backgroundColor: page.backgroundColor || '#ffffff'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onSelectElement(null);
        }
      }}
    >
      {page.elements.map(element => (
        <Element
          key={element.id}
          element={element}
          isSelected={selectedElement === element.id}
          onSelect={() => onSelectElement(element.id)}
          onUpdate={(updates) => onUpdateElement(element.id, updates)}
          onDelete={() => onDeleteElement(element.id)}
        />
      ))}
    </div>
  );
};

export default PageComponent;