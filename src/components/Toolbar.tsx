import React from 'react';
import { DocumentElement } from '../types/document';
import './Toolbar.css';

interface ToolbarProps {
  onAddElement: (type: DocumentElement['type']) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onAddElement }) => {
  return (
    <div className="toolbar">
      <h3>Elements</h3>
      <button onClick={() => onAddElement('text')} className="toolbar-button">
        <span className="icon">T</span>
        Add Text
      </button>
      <button onClick={() => onAddElement('image')} className="toolbar-button">
        <span className="icon">🖼️</span>
        Add Image
      </button>
      <button onClick={() => onAddElement('shape')} className="toolbar-button">
        <span className="icon">◼</span>
        Add Shape
      </button>
      
      <h3>Export</h3>
      <button className="toolbar-button export-button">
        Export as PDF
      </button>
      <button className="toolbar-button export-button">
        Export as PNG
      </button>
    </div>
  );
};

export default Toolbar;