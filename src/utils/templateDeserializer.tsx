import React from 'react';
import { SerializedDocument, SerializedPage, SerializedElement, TemplateFile } from '../types/template';
import { Document } from '../components/document-components/Document';
import { Page } from '../components/document-components/Page';

function deserializeElement(element: SerializedElement): React.ReactElement | null {
  const { type, tagName = 'div', style, content, src, alt, children } = element;
  
  const props: any = {
    key: element.id,
    style: style || {}
  };
  
  // Handle different element types
  if (type === 'image' && src) {
    return React.createElement('img', { ...props, src, alt: alt || '' });
  }
  
  if (type === 'text' && content) {
    // Use appropriate text tag based on style or default to div
    const textTag = tagName || 'div';
    return React.createElement(textTag, props, content);
  }
  
  // Handle container or shape elements
  const childElements = children?.map(child => deserializeElement(child)).filter(Boolean) || [];
  
  if (type === 'shape') {
    // For shapes, we'll use a div with appropriate styling
    return React.createElement('div', { ...props, className: 'shape' }, ...childElements);
  }
  
  // Default container
  return React.createElement(tagName || 'div', props, ...childElements);
}

function deserializePage(page: SerializedPage): React.ReactElement {
  const pageProps: any = {
    key: page.id,
    background: page.background,
    padding: page.padding
  };
  
  if (page.style) {
    pageProps.style = page.style;
  }
  
  const elements = page.elements.map(element => deserializeElement(element)).filter(Boolean);
  
  return React.createElement(Page, pageProps, ...elements);
}

export function deserializeDocument(serializedDoc: SerializedDocument): React.FC {
  return () => {
    const pages = serializedDoc.pages.map(page => deserializePage(page));
    
    return React.createElement(
      Document,
      {
        title: serializedDoc.title,
        type: serializedDoc.type,
        paperSize: serializedDoc.paperSize
      },
      ...pages
    );
  };
}

export function parseTemplateFile(jsonString: string): TemplateFile | null {
  try {
    const parsed = JSON.parse(jsonString);
    
    // Basic validation
    if (!parsed.version || !parsed.document) {
      throw new Error('Invalid template file format');
    }
    
    return parsed as TemplateFile;
  } catch (error) {
    console.error('Error parsing template file:', error);
    return null;
  }
}

export function importTemplateFromJSON(jsonString: string): React.FC | null {
  const templateFile = parseTemplateFile(jsonString);
  if (!templateFile) return null;
  
  return deserializeDocument(templateFile.document);
}

export async function importTemplateFromFile(file: File): Promise<React.FC | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const component = importTemplateFromJSON(content);
      resolve(component);
    };
    
    reader.onerror = () => {
      console.error('Error reading file');
      resolve(null);
    };
    
    reader.readAsText(file);
  });
}