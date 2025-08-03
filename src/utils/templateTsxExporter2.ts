import { SerializedDocument, SerializedPage, SerializedElement, SerializedStyle } from '../types/template';

// Convert style object to inline style string with better formatting
function styleToInlineString(style?: SerializedStyle): string {
  if (!style || Object.keys(style).length === 0) return '';
  
  const styleEntries = Object.entries(style).map(([key, value]) => {
    // Convert camelCase to itself (React uses camelCase for style props)
    if (typeof value === 'number' && !['opacity', 'zIndex', 'fontWeight', 'lineHeight', 'flex'].includes(key)) {
      return `${key}: ${value}`;
    }
    
    if (typeof value === 'string') {
      // Check if it's already quoted
      if (value.startsWith("'") || value.startsWith('"')) {
        return `${key}: ${value}`;
      }
      return `${key}: '${value}'`;
    }
    
    return `${key}: ${value}`;
  });
  
  if (styleEntries.length <= 2) {
    return `{{ ${styleEntries.join(', ')} }}`;
  }
  
  // Multi-line formatting for readability
  return `{{\n          ${styleEntries.join(',\n          ')}\n        }}`;
}

function serializeElementToDetailedTsx(element: SerializedElement, indent: number = 8): string {
  const spaces = ' '.repeat(indent);
  
  if (element.type === 'image' && element.src) {
    const styleStr = element.style ? ` style=${styleToInlineString(element.style)}` : '';
    return `${spaces}<img src="${element.src}" alt="${element.alt || ''}"${styleStr} />`;
  }
  
  if (element.type === 'text' && element.content && !element.children?.length) {
    const tag = element.tagName || 'div';
    const styleStr = element.style ? ` style=${styleToInlineString(element.style)}` : '';
    
    // For simple text elements, keep them on one line if short
    if (element.content.length < 50 && !element.style) {
      return `${spaces}<${tag}${styleStr}>${element.content}</${tag}>`;
    }
    
    return `${spaces}<${tag}${styleStr}>\n${spaces}  ${element.content}\n${spaces}</${tag}>`;
  }
  
  // Container or other elements
  const tag = element.tagName || 'div';
  const styleStr = element.style ? ` style=${styleToInlineString(element.style)}` : '';
  const hasChildren = element.children && element.children.length > 0;
  
  if (!hasChildren && !element.content) {
    return `${spaces}<${tag}${styleStr} />`;
  }
  
  let result = `${spaces}<${tag}${styleStr}>`;
  
  if (element.content) {
    result += `\n${spaces}  ${element.content}`;
  }
  
  if (hasChildren) {
    result += '\n';
    element.children!.forEach(child => {
      result += serializeElementToDetailedTsx(child, indent + 2) + '\n';
    });
    result += spaces;
  } else if (element.content) {
    result += '\n' + spaces;
  }
  
  result += `</${tag}>`;
  
  return result;
}

function serializePageToDetailedTsx(page: SerializedPage, indent: number = 6): string {
  const spaces = ' '.repeat(indent);
  let result = `${spaces}<Page`;
  
  // Add props in a consistent order
  if (page.background) {
    result += ` background="${page.background}"`;
  }
  
  if (page.padding !== undefined && page.padding !== 0) {
    result += ` padding={${typeof page.padding === 'string' ? `"${page.padding}"` : page.padding}}`;
  }
  
  if (page.style && Object.keys(page.style).length > 0) {
    result += ` style=${styleToInlineString(page.style)}`;
  }
  
  result += '>\n';
  
  // Group elements by type/structure for better organization
  page.elements.forEach((element, index) => {
    if (index > 0 && shouldAddSpaceBefore(element, page.elements[index - 1])) {
      result += '\n';
    }
    result += serializeElementToDetailedTsx(element) + '\n';
  });
  
  result += `${spaces}</Page>`;
  
  return result;
}

// Determine if we should add a blank line before an element for readability
function shouldAddSpaceBefore(current: SerializedElement, previous: SerializedElement): boolean {
  // Add space between major sections
  if (current.style?.position === 'absolute' && previous.style?.position === 'absolute') {
    return true;
  }
  
  // Add space before comments or major structural elements
  if (current.tagName !== previous.tagName) {
    return true;
  }
  
  return false;
}

export function exportDocumentAsDetailedTsx(document: SerializedDocument): string {
  const componentName = document.title
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
    .replace(/\s/g, '');
  
  let tsx = `import { Document, Page } from '../../components/document-components';

export const ${componentName} = () => {
  return (
    <Document title="${document.title}" type="${document.type}" paperSize="${document.paperSize}">
`;
  
  document.pages.forEach((page, index) => {
    if (index > 0) tsx += '\n';
    tsx += serializePageToDetailedTsx(page) + '\n';
  });
  
  tsx += `    </Document>
  );
};`;
  
  return tsx;
}

export function downloadTemplateAsDetailedTsx(serializedDoc: SerializedDocument, filename?: string) {
  const tsx = exportDocumentAsDetailedTsx(serializedDoc);
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