import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Document, Page, DocumentElement } from '../types/document';
import PageComponent from './Page';
import Toolbar from './Toolbar';
import './DocumentEditor.css';

const DocumentEditor: React.FC = () => {
  const [document, setDocument] = useState<Document>({
    id: '1',
    title: 'Untitled Document',
    type: 'flyer',
    pages: [{
      id: 'page1',
      width: 595, // A4 width in pixels at 72 DPI
      height: 842, // A4 height in pixels at 72 DPI
      elements: []
    }]
  });

  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  const addElement = (type: DocumentElement['type']) => {
    const newElement: DocumentElement = {
      id: `element-${Date.now()}`,
      type,
      x: 50,
      y: 50,
      width: type === 'text' ? 200 : 150,
      height: type === 'text' ? 50 : 150,
      content: type === 'text' ? 'Click to edit text' : '',
      style: {
        fontSize: 16,
        fontFamily: 'Arial',
        color: '#000000'
      }
    };

    setDocument(prev => ({
      ...prev,
      pages: prev.pages.map((page, index) => 
        index === 0 
          ? { ...page, elements: [...page.elements, newElement] }
          : page
      )
    }));
  };

  const updateElement = (elementId: string, updates: Partial<DocumentElement>) => {
    setDocument(prev => ({
      ...prev,
      pages: prev.pages.map(page => ({
        ...page,
        elements: page.elements.map(el => 
          el.id === elementId ? { ...el, ...updates } : el
        )
      }))
    }));
  };

  const deleteElement = (elementId: string) => {
    setDocument(prev => ({
      ...prev,
      pages: prev.pages.map(page => ({
        ...page,
        elements: page.elements.filter(el => el.id !== elementId)
      }))
    }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="document-editor">
        <Toolbar onAddElement={addElement} />
        <div className="editor-main">
          <div className="pages-container">
            {document.pages.map(page => (
              <PageComponent
                key={page.id}
                page={page}
                selectedElement={selectedElement}
                onSelectElement={setSelectedElement}
                onUpdateElement={updateElement}
                onDeleteElement={deleteElement}
              />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default DocumentEditor;