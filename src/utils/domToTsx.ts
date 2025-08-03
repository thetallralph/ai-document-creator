// Convert DOM elements back to TSX preserving structure and styles

interface DomElementData {
  tagName: string;
  attributes: Record<string, any>;
  styles: Record<string, any>;
  children: (DomElementData | string)[];
}

function parseStyleString(styleStr: string): Record<string, any> {
  const styles: Record<string, any> = {};
  if (!styleStr) return styles;
  
  styleStr.split(';').forEach(rule => {
    const [prop, value] = rule.split(':').map(s => s.trim());
    if (prop && value) {
      // Convert kebab-case to camelCase
      const camelProp = prop.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      
      // Convert pixel values to numbers
      if (value.endsWith('px')) {
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
          styles[camelProp] = numValue;
        } else {
          styles[camelProp] = value;
        }
      } else {
        styles[camelProp] = value;
      }
    }
  });
  
  return styles;
}

function extractDomElement(element: Element): DomElementData {
  const tagName = element.tagName.toLowerCase();
  const attributes: Record<string, any> = {};
  const styles = parseStyleString(element.getAttribute('style') || '');
  
  // Extract attributes
  Array.from(element.attributes).forEach(attr => {
    if (attr.name !== 'style' && !attr.name.startsWith('data-')) {
      attributes[attr.name] = attr.value;
    }
  });
  
  // Extract children
  const children: (DomElementData | string)[] = [];
  element.childNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim();
      if (text) {
        children.push(text);
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      children.push(extractDomElement(node as Element));
    }
  });
  
  return { tagName, attributes, styles, children };
}

function formatStyleObject(styles: Record<string, any>): string {
  const entries = Object.entries(styles);
  if (entries.length === 0) return '';
  
  if (entries.length <= 2) {
    const styleStr = entries.map(([key, value]) => {
      if (typeof value === 'string' && !value.match(/^-?\d+(\.\d+)?$/)) {
        return `${key}: '${value}'`;
      }
      return `${key}: ${value}`;
    }).join(', ');
    return `{{ ${styleStr} }}`;
  }
  
  // Multi-line for readability
  const styleStr = entries.map(([key, value]) => {
    if (typeof value === 'string' && !value.match(/^-?\d+(\.\d+)?$/)) {
      return `          ${key}: '${value}'`;
    }
    return `          ${key}: ${value}`;
  }).join(',\n');
  
  return `{{\n${styleStr}\n        }}`;
}

function domDataToTsx(data: DomElementData, indent: number = 8): string {
  const spaces = ' '.repeat(indent);
  const { tagName, attributes, styles, children } = data;
  
  // Build props string
  let propsStr = '';
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'class') {
      propsStr += ` className="${value}"`;
    } else {
      propsStr += ` ${key}="${value}"`;
    }
  });
  
  if (Object.keys(styles).length > 0) {
    propsStr += ` style=${formatStyleObject(styles)}`;
  }
  
  // Handle self-closing tags
  if (children.length === 0) {
    return `${spaces}<${tagName}${propsStr} />`;
  }
  
  // Handle simple text content
  if (children.length === 1 && typeof children[0] === 'string' && children[0].length < 50) {
    return `${spaces}<${tagName}${propsStr}>${children[0]}</${tagName}>`;
  }
  
  // Handle complex content
  let result = `${spaces}<${tagName}${propsStr}>`;
  
  if (children.length === 1 && typeof children[0] === 'string') {
    result += `\n${spaces}  ${children[0]}\n${spaces}`;
  } else {
    result += '\n';
    children.forEach(child => {
      if (typeof child === 'string') {
        result += `${spaces}  ${child}\n`;
      } else {
        result += domDataToTsx(child, indent + 2) + '\n';
      }
    });
    result += spaces;
  }
  
  result += `</${tagName}>`;
  
  return result;
}

export function extractDocumentFromDom(documentElement: HTMLElement): string {
  // Find the document root
  const docRoot = documentElement.querySelector('[data-document-root]');
  if (!docRoot) return '';
  
  const title = docRoot.getAttribute('data-title') || 'Untitled';
  const type = docRoot.getAttribute('data-type') || 'flyer';
  const paperSize = docRoot.getAttribute('data-paper-size') || 'A4';
  
  // Extract pages
  const pages = Array.from(docRoot.querySelectorAll('[data-page]'));
  
  const componentName = title
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
    .replace(/\s/g, '');
  
  let tsx = `import { Document, Page } from '../../components/document-components';

export const ${componentName} = () => {
  return (
    <Document title="${title}" type="${type}" paperSize="${paperSize}">
`;
  
  pages.forEach((page, index) => {
    // Get page props from parent element (the actual Page component wrapper)
    const pageWrapper = page as HTMLElement;
    const background = pageWrapper.style.backgroundColor || '#ffffff';
    
    // Look for the inner padding div
    const paddingDiv = pageWrapper.querySelector('div[style*="padding"]') as HTMLElement;
    let padding: string | number = 0;
    
    if (paddingDiv) {
      const paddingStyle = paddingDiv.style.padding;
      if (paddingStyle) {
        padding = paddingStyle;
      }
    }
    
    if (index > 0) tsx += '\n';
    tsx += `      <Page background="${background}"${padding ? ` padding="${padding}"` : ''}>\n`;
    
    // Extract page content
    const contentContainer = paddingDiv || pageWrapper;
    Array.from(contentContainer.children).forEach(child => {
      const elementData = extractDomElement(child);
      tsx += domDataToTsx(elementData) + '\n';
    });
    
    tsx += '      </Page>\n';
  });
  
  tsx += `    </Document>
  );
};`;
  
  return tsx;
}

export function exportDomAsTsx(documentRef: HTMLElement | null): string | null {
  if (!documentRef) return null;
  
  try {
    return extractDocumentFromDom(documentRef);
  } catch (error) {
    console.error('Error extracting TSX from DOM:', error);
    return null;
  }
}