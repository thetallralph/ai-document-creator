import React from 'react';
import { SerializedDocument, SerializedPage, SerializedElement, SerializedStyle, TemplateFile } from '../types/template';

function extractStyleFromProps(style: any): SerializedStyle | undefined {
  if (!style) return undefined;
  
  const serializedStyle: SerializedStyle = {};
  const styleKeys = Object.keys(style);
  
  for (const key of styleKeys) {
    if (style[key] !== undefined) {
      (serializedStyle as any)[key] = style[key];
    }
  }
  
  return Object.keys(serializedStyle).length > 0 ? serializedStyle : undefined;
}

function serializeReactElement(element: React.ReactElement, id: string = '0'): SerializedElement | null {
  if (!element) return null;
  
  const { type, props } = element;
  const tagName = typeof type === 'string' ? type : undefined;
  
  const serializedElement: SerializedElement = {
    id,
    type: 'container',
    tagName,
    style: extractStyleFromProps(props.style)
  };
  
  // Detect element type based on tag name or props
  if (tagName === 'img') {
    serializedElement.type = 'image';
    serializedElement.src = props.src;
    serializedElement.alt = props.alt;
  } else if (tagName === 'h1' || tagName === 'h2' || tagName === 'h3' || tagName === 'h4' || tagName === 'h5' || tagName === 'h6' || tagName === 'p' || tagName === 'span') {
    serializedElement.type = 'text';
    if (typeof props.children === 'string') {
      serializedElement.content = props.children;
    }
  } else if (props.className?.includes('shape') || tagName === 'circle' || tagName === 'rect' || tagName === 'path') {
    serializedElement.type = 'shape';
  }
  
  // Process children
  if (props.children) {
    const children: SerializedElement[] = [];
    React.Children.forEach(props.children, (child, index) => {
      if (React.isValidElement(child)) {
        const serializedChild = serializeReactElement(child, `${id}-${index}`);
        if (serializedChild) {
          children.push(serializedChild);
        }
      } else if (typeof child === 'string' && serializedElement.type === 'container') {
        // Text content in a container
        serializedElement.content = child;
        serializedElement.type = 'text';
      }
    });
    
    if (children.length > 0) {
      serializedElement.children = children;
    }
  }
  
  return serializedElement;
}

function serializePage(pageElement: React.ReactElement, index: number): SerializedPage {
  const { props } = pageElement;
  const elements: SerializedElement[] = [];
  
  React.Children.forEach(props.children, (child, childIndex) => {
    if (React.isValidElement(child)) {
      const serializedElement = serializeReactElement(child, `page-${index}-element-${childIndex}`);
      if (serializedElement) {
        elements.push(serializedElement);
      }
    }
  });
  
  return {
    id: `page-${index}`,
    background: props.background,
    padding: props.padding,
    style: extractStyleFromProps(props.style),
    elements
  };
}

export function serializeDocument(component: React.FC): SerializedDocument | null {
  try {
    // Render the component to extract its structure
    const rendered = component({});
    if (!React.isValidElement(rendered)) return null;
    
    // Find the Document component
    let documentElement = rendered;
    let documentProps = rendered.props;
    
    // If the rendered element has a data-document-root attribute, use it
    if (rendered.props && rendered.props['data-document-root'] !== undefined) {
      documentElement = rendered;
      documentProps = rendered.props;
    } else if (rendered.props && rendered.props.children) {
      // Otherwise, look for the Document component in children
      React.Children.forEach(rendered.props.children, (child) => {
        if (React.isValidElement(child) && child.props && child.props['data-document-root'] !== undefined) {
          documentElement = child;
          documentProps = child.props;
        }
      });
    }
    
    // Extract document metadata
    const title = documentProps['data-title'] || documentProps.title || 'Untitled';
    const type = documentProps['data-type'] || documentProps.type || 'flyer';
    const paperSize = documentProps['data-paper-size'] || documentProps.paperSize || 'A4';
    
    // Extract pages
    const pages: SerializedPage[] = [];
    const children = documentProps.children || documentElement.props.children;
    
    React.Children.forEach(children, (child, index) => {
      if (React.isValidElement(child)) {
        // Check if it's a Page component by props or structure
        const isPage = (child.type as any).name === 'Page' || 
                      child.props['data-page'] !== undefined ||
                      (child.props.background !== undefined && child.props.children);
                      
        if (isPage) {
          pages.push(serializePage(child, index));
        }
      }
    });
    
    return {
      id: `doc-${Date.now()}`,
      title,
      type,
      paperSize,
      pages,
      metadata: {
        createdAt: new Date().toISOString(),
        version: '1.0.0'
      }
    };
  } catch (error) {
    console.error('Error serializing document:', error);
    return null;
  }
}

export function createTemplateFile(document: SerializedDocument): TemplateFile {
  return {
    version: '1.0.0',
    document
  };
}

export function exportTemplateAsJSON(document: SerializedDocument): string {
  const templateFile = createTemplateFile(document);
  return JSON.stringify(templateFile, null, 2);
}

export function downloadTemplate(serializedDoc: SerializedDocument, filename?: string) {
  const json = exportTemplateAsJSON(serializedDoc);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || `${serializedDoc.title.replace(/\s+/g, '-').toLowerCase()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}