import React, { useState, useRef, useEffect } from 'react';
import { DocumentElement } from '../types/document';
import './Element.css';

interface ElementProps {
  element: DocumentElement;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<DocumentElement>) => void;
  onDelete: () => void;
}

const Element: React.FC<ElementProps> = ({
  element,
  isSelected,
  onSelect,
  onUpdate,
  onDelete
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    onSelect();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - element.x,
      y: e.clientY - element.y
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        onUpdate({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, onUpdate]);

  const handleDoubleClick = () => {
    if (element.type === 'text') {
      setIsEditing(true);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    onUpdate({ content: e.currentTarget.textContent || '' });
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div
      ref={elementRef}
      className={`element ${isSelected ? 'selected' : ''}`}
      style={{
        position: 'absolute',
        left: element.x,
        top: element.y,
        width: element.width,
        height: element.height,
        ...element.style,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      {element.type === 'text' && (
        <div
          contentEditable={isEditing}
          suppressContentEditableWarning
          onInput={handleTextChange}
          onBlur={handleBlur}
          style={{ 
            width: '100%', 
            height: '100%',
            outline: 'none',
            cursor: isEditing ? 'text' : 'grab'
          }}
        >
          {element.content}
        </div>
      )}
      
      {element.type === 'image' && element.content && (
        <img src={element.content} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}

      {isSelected && (
        <>
          <div className="resize-handle resize-handle-se" />
          <button className="delete-button" onClick={onDelete}>×</button>
        </>
      )}
    </div>
  );
};

export default Element;