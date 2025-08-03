import { SerializedDocument, SerializedPage, SerializedElement, SerializedStyle } from '../types/template';

function styleToString(style?: SerializedStyle): string {
  if (!style || Object.keys(style).length === 0) return '';
  
  const styleEntries = Object.entries(style).map(([key, value]) => {
    // Handle numeric values that need 'px'
    if (typeof value === 'number' && !['opacity', 'zIndex', 'fontWeight', 'lineHeight'].includes(key)) {
      return `${key}: ${value}px`;
    }
    
    return `${key}: ${typeof value === 'string' ? `'${value}'` : value}`;
  });
  
  return `{ ${styleEntries.join(', ')} }`;
}

function serializeElementToTsx(element: SerializedElement, indent: number = 4): string {
  const spaces = ' '.repeat(indent);
  const styleStr = element.style ? ` style={${styleToString(element.style)}}` : '';
  
  if (element.type === 'image' && element.src) {
    return `${spaces}<img src="${element.src}" alt="${element.alt || ''}"${styleStr} />`;
  }
  
  if (element.type === 'text' && element.content) {
    const tag = element.tagName || 'div';
    return `${spaces}<${tag}${styleStr}>${element.content}</${tag}>`;
  }
  
  if (element.type === 'shape') {
    const className = element.style ? '' : ' className="shape"';
    return `${spaces}<div${className}${styleStr} />`;
  }
  
  // Container or other elements
  const tag = element.tagName || 'div';
  const hasChildren = element.children && element.children.length > 0;
  
  if (!hasChildren && !element.content) {
    return `${spaces}<${tag}${styleStr} />`;
  }
  
  let result = `${spaces}<${tag}${styleStr}>`;
  
  if (element.content) {
    result += element.content;
  }
  
  if (hasChildren) {
    result += '\n';
    element.children!.forEach(child => {
      result += serializeElementToTsx(child, indent + 2) + '\n';
    });
    result += spaces;
  }
  
  result += `</${tag}>`;
  
  return result;
}

function serializePageToTsx(page: SerializedPage, indent: number = 4): string {
  const spaces = ' '.repeat(indent);
  let result = `${spaces}<Page`;
  
  if (page.background) {
    result += ` background="${page.background}"`;
  }
  
  if (page.padding !== undefined && page.padding !== 0) {
    result += ` padding={${typeof page.padding === 'string' ? `"${page.padding}"` : page.padding}}`;
  }
  
  if (page.style) {
    result += ` style={${styleToString(page.style)}}`;
  }
  
  result += '>\n';
  
  page.elements.forEach(element => {
    result += serializeElementToTsx(element, indent + 2) + '\n';
  });
  
  result += `${spaces}</Page>`;
  
  return result;
}

export function exportDocumentAsTsx(document: SerializedDocument): string {
  const componentName = document.title
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
    .replace(/\s/g, '');
  
  let tsx = `import React from 'react';
import { Document, Page } from '../components/document-components';

export const ${componentName} = () => {
  return (
    <Document title="${document.title}" type="${document.type}" paperSize="${document.paperSize}">
`;
  
  document.pages.forEach(page => {
    tsx += serializePageToTsx(page) + '\n';
  });
  
  tsx += `    </Document>
  );
};
`;
  
  return tsx;
}

export function downloadTemplateAsTsx(serializedDoc: SerializedDocument, filename?: string) {
  const tsx = exportDocumentAsTsx(serializedDoc);
  const blob = new Blob([tsx], { type: 'text/typescript' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || `${serializedDoc.title.replace(/\s+/g, '-').toLowerCase()}.tsx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}