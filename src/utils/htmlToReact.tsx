import React from 'react';
import { Document } from '../components/document-components/Document';
import { Page } from '../components/document-components/Page';
import { HTMLTemplate } from '../types/htmlTemplate';

/**
 * Parse style string to React style object
 */
function parseStyleString(styleStr: string): React.CSSProperties {
  const style: any = {};
  if (!styleStr) return style;
  
  // Split by semicolon and process each declaration
  styleStr.split(';').forEach(decl => {
    const [property, value] = decl.split(':').map(s => s.trim());
    if (property && value) {
      // Convert kebab-case to camelCase
      const camelProperty = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      
      // Handle numeric values
      if (['fontSize', 'lineHeight', 'width', 'height', 'top', 'left', 'right', 'bottom', 
           'padding', 'margin', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight',
           'marginTop', 'marginBottom', 'marginLeft', 'marginRight', 'borderRadius', 
           'borderWidth', 'zIndex', 'opacity'].includes(camelProperty)) {
        const numValue = parseFloat(value);
        if (!isNaN(numValue) && value.match(/^\d+(\.\d+)?$/)) {
          style[camelProperty] = numValue;
        } else {
          style[camelProperty] = value;
        }
      } else {
        style[camelProperty] = value;
      }
    }
  });
  
  return style;
}

/**
 * Parse HTML string to React elements
 */
function parseHTML(html: string): React.ReactNode {
  // Create a temporary container
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  // Convert DOM nodes to React elements
  function convertNode(node: Node, index: number = 0): React.ReactNode {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    }
    
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const tagName = element.tagName.toLowerCase();
      
      // Get attributes
      const props: any = { key: index };
      
      // Handle style attribute
      const styleAttr = element.getAttribute('style');
      if (styleAttr) {
        props.style = parseStyleString(styleAttr);
      }
      
      // Handle class attribute
      const classAttr = element.getAttribute('class');
      if (classAttr) {
        props.className = classAttr;
      }
      
      // Handle other common attributes
      ['id', 'href', 'src', 'alt', 'title', 'target', 'rel'].forEach(attr => {
        const value = element.getAttribute(attr);
        if (value) props[attr] = value;
      });
      
      // Convert children
      const children = Array.from(element.childNodes).map((child, i) => convertNode(child, i));
      
      return React.createElement(
        tagName,
        props,
        children.length > 0 ? children : undefined
      );
    }
    
    return null;
  }
  
  // Convert all body children
  const bodyChildren = Array.from(doc.body.childNodes);
  const elements = bodyChildren.map((child, i) => convertNode(child, i)).filter(Boolean);
  
  return elements.length === 1 ? elements[0] : elements;
}

/**
 * Convert HTML template to React component
 */
export function htmlTemplateToReact(template: HTMLTemplate): React.ReactElement {
  const pages = template.pages.map((page, index) => {
    // Parse page content
    const content = parseHTML(page.content);
    
    // Create page props
    const pageProps: any = { key: index };
    if (page.background) {
      pageProps.background = page.background;
    }
    if (page.style) {
      pageProps.style = parseStyleString(page.style);
    }
    
    return React.createElement(Page, pageProps, content);
  });
  
  return React.createElement(
    Document,
    {
      title: template.name,
      paperSize: template.paperSize || 'A4'
    },
    pages
  );
}

/**
 * Create a simple HTML template
 */
export function createHTMLTemplate(
  name: string,
  description: string,
  paperSize: string = 'A4'
): HTMLTemplate {
  return {
    id: `html-${Date.now()}`,
    name,
    description,
    paperSize,
    pages: [{
      background: '#ffffff',
      content: `
        <h1 style="font-size: 32px; margin: 20px;">New Document</h1>
        <p style="font-size: 16px; margin: 20px;">Start editing your content here.</p>
      `
    }],
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

/**
 * Extract HTML from existing React elements (for migration)
 */
export function reactToHTML(element: React.ReactElement): string {
  // This is a simplified version - in production you'd want more robust handling
  const { type, props } = element;
  
  if (typeof type === 'string') {
    const { children, style, className, ...attrs } = props as any;
    
    let html = `<${type}`;
    
    // Add class
    if (className) {
      html += ` class="${className}"`;
    }
    
    // Add style
    if (style) {
      const styleStr = Object.entries(style)
        .map(([key, value]) => {
          // Convert camelCase to kebab-case
          const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
          return `${kebabKey}: ${value}`;
        })
        .join('; ');
      html += ` style="${styleStr}"`;
    }
    
    // Add other attributes
    Object.entries(attrs).forEach(([key, value]) => {
      if (key !== 'key' && value != null) {
        html += ` ${key}="${value}"`;
      }
    });
    
    html += '>';
    
    // Add children
    if (children) {
      if (typeof children === 'string') {
        html += children;
      } else if (Array.isArray(children)) {
        html += children.map(child => 
          React.isValidElement(child) ? reactToHTML(child) : child
        ).join('');
      } else if (React.isValidElement(children)) {
        html += reactToHTML(children);
      }
    }
    
    html += `</${type}>`;
    return html;
  }
  
  return '';
}