import React from 'react';
import { Document } from '../components/document-components/Document';
import { Page } from '../components/document-components/Page';
import { parseRealTSX } from './tsxCompiler';

interface ElementData {
  type: string;
  props: any;
  children: (ElementData | string)[];
}

// Convert style string to object
function parseStyleString(styleStr: string): any {
  const style: any = {};
  
  // Remove the curly braces and split by comma
  const cleanStyle = styleStr.replace(/^\{|\}$/g, '').trim();
  const entries = cleanStyle.split(/,(?![^()]*\))/);
  
  entries.forEach(entry => {
    const [key, value] = entry.split(':').map(s => s.trim());
    if (key && value) {
      const cleanKey = key.replace(/['"]/g, '');
      let cleanValue: any = value.replace(/['"]/g, '');
      
      // Convert numeric values
      if (cleanValue.endsWith('px')) {
        cleanValue = parseInt(cleanValue);
      } else if (!isNaN(Number(cleanValue))) {
        cleanValue = Number(cleanValue);
      }
      
      style[cleanKey] = cleanValue;
    }
  });
  
  return style;
}

// Parse JSX-like content to element data
function parseJsxElement(jsx: string): ElementData | null {
  try {
    const tagMatch = jsx.match(/^<(\w+)([^>]*)>/);
    if (!tagMatch) return null;
    
    const [, tagName, propsStr] = tagMatch;
    const props: any = {};
    
    // Parse props
    const propRegex = /(\w+)=(?:{([^}]+)}|"([^"]+)")/g;
    let propMatch;
    
    while ((propMatch = propRegex.exec(propsStr)) !== null) {
      const [, propName, styleValue, stringValue] = propMatch;
      
      if (propName === 'style' && styleValue) {
        props.style = parseStyleString(styleValue);
      } else if (propName === 'padding' && styleValue) {
        // Handle numeric padding values
        props.padding = isNaN(Number(styleValue)) ? styleValue : Number(styleValue);
      } else {
        props[propName] = stringValue || styleValue;
      }
    }
    
    // Find closing tag and content
    const closingTag = `</${tagName}>`;
    const endIndex = jsx.lastIndexOf(closingTag);
    
    if (endIndex === -1) {
      // Self-closing tag
      return { type: tagName, props, children: [] };
    }
    
    const startContentIndex = jsx.indexOf('>') + 1;
    const content = jsx.substring(startContentIndex, endIndex).trim();
    
    const children: (ElementData | string)[] = [];
    
    if (content) {
      // Simple text content
      if (!content.includes('<')) {
        children.push(content);
      } else {
        // Parse nested elements
        let remaining = content;
        while (remaining) {
          const nextTagStart = remaining.indexOf('<');
          
          if (nextTagStart === -1) {
            if (remaining.trim()) children.push(remaining.trim());
            break;
          }
          
          if (nextTagStart > 0) {
            const text = remaining.substring(0, nextTagStart).trim();
            if (text) children.push(text);
          }
          
          // Find the complete element
          const elementMatch = remaining.match(/<(\w+)[^>]*>[\s\S]*?<\/\1>|<(\w+)[^>]*\/>/);
          if (elementMatch) {
            const element = parseJsxElement(elementMatch[0]);
            if (element) children.push(element);
            remaining = remaining.substring(elementMatch.index! + elementMatch[0].length);
          } else {
            break;
          }
        }
      }
    }
    
    return { type: tagName, props, children };
  } catch (error) {
    console.error('Error parsing JSX element:', error);
    return null;
  }
}

// Convert element data to React element
function createReactElement(data: ElementData | string): React.ReactNode {
  if (typeof data === 'string') {
    return data;
  }
  
  const children = data.children.map(child => createReactElement(child));
  
  switch (data.type) {
    case 'Document':
      return React.createElement(Document, data.props, ...children);
    case 'Page':
      return React.createElement(Page, data.props, ...children);
    default:
      return React.createElement(data.type.toLowerCase(), data.props, ...children);
  }
}

// Main TSX parser
export function parseTsxToComponent(tsxContent: string): React.FC | null {
  try {
    // Extract the JSX content between return ( and );
    const jsxMatch = tsxContent.match(/return\s*\(\s*([\s\S]*?)\s*\);\s*}/);
    if (!jsxMatch) {
      throw new Error('Could not find JSX content');
    }
    const jsxContent = jsxMatch[1].trim();
    
    // Parse the JSX content
    const elementData = parseJsxElement(jsxContent);
    if (!elementData) {
      throw new Error('Could not parse JSX structure');
    }
    
    // Create component
    return () => {
      return createReactElement(elementData) as React.ReactElement;
    };
  } catch (error) {
    console.error('Error parsing TSX:', error);
    return null;
  }
}

export async function importTsxFromText(tsxContent: string): Promise<React.FC | null> {
  // First try to parse it as real TSX (for files exported from our app)
  const realComponent = await parseRealTSX(tsxContent);
  if (realComponent) {
    return realComponent;
  }
  
  // Fallback to simple parser for basic JSX
  return parseTsxToComponent(tsxContent);
}