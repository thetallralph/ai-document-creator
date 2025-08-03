import React from 'react';
import { Document } from '../components/document-components/Document';
import { Page } from '../components/document-components/Page';

interface ParsedStyle {
  [key: string]: string | number;
}

interface ParsedElement {
  type: string;
  props: Record<string, any>;
  children: (ParsedElement | string)[];
}

// Parse a style object from string representation
function parseStyleLiteral(styleStr: string): ParsedStyle {
  const style: ParsedStyle = {};
  
  // Remove outer braces and split by lines or commas
  const cleaned = styleStr.replace(/^\{|\}$/g, '').trim();
  
  // Match property: value pairs, handling nested functions like linear-gradient
  const styleRegex = /(\w+):\s*([^,]+(?:\([^)]*\)[^,]*)?),?/g;
  let match;
  
  while ((match = styleRegex.exec(cleaned)) !== null) {
    const [, prop, value] = match;
    const trimmedValue = value.trim();
    
    // Handle different value types
    if (trimmedValue.startsWith("'") || trimmedValue.startsWith('"')) {
      // String value
      style[prop] = trimmedValue.slice(1, -1);
    } else if (!isNaN(Number(trimmedValue))) {
      // Numeric value
      style[prop] = Number(trimmedValue);
    } else {
      // Other values (colors, functions, etc.)
      style[prop] = trimmedValue;
    }
  }
  
  return style;
}

// Parse JSX element from source code
function parseJsxFromSource(jsx: string, startIndex: number = 0): { element: ParsedElement | string | null; endIndex: number } {
  const trimmed = jsx.slice(startIndex).trim();
  
  // Check if it's a text node
  if (!trimmed.startsWith('<')) {
    const nextTag = trimmed.indexOf('<');
    if (nextTag === -1) {
      return { element: trimmed || null, endIndex: jsx.length };
    }
    const text = trimmed.slice(0, nextTag).trim();
    return { element: text || null, endIndex: startIndex + nextTag };
  }
  
  // Parse opening tag
  const tagMatch = trimmed.match(/^<(\w+)([^>]*)>/);
  if (!tagMatch) {
    return { element: null, endIndex: startIndex };
  }
  
  const [fullMatch, tagName, propsStr] = tagMatch;
  const props: Record<string, any> = {};
  
  // Parse props
  const propRegex = /(\w+)=(?:\{([^}]+)\}|"([^"]+)")/g;
  let propMatch;
  
  while ((propMatch = propRegex.exec(propsStr)) !== null) {
    const [, propName, jsValue, stringValue] = propMatch;
    
    if (propName === 'style' && jsValue) {
      // Parse style object
      props.style = parseStyleLiteral(jsValue);
    } else if (jsValue !== undefined) {
      // JavaScript expression
      if (!isNaN(Number(jsValue))) {
        props[propName] = Number(jsValue);
      } else {
        props[propName] = jsValue;
      }
    } else {
      // String value
      props[propName] = stringValue;
    }
  }
  
  // Check if self-closing
  if (propsStr.endsWith('/')) {
    return {
      element: { type: tagName, props, children: [] },
      endIndex: startIndex + fullMatch.length
    };
  }
  
  // Parse children
  const children: (ParsedElement | string)[] = [];
  let currentIndex = startIndex + fullMatch.length;
  const closingTag = `</${tagName}>`;
  
  while (currentIndex < jsx.length) {
    // Check for closing tag
    if (jsx.slice(currentIndex).startsWith(closingTag)) {
      return {
        element: { type: tagName, props, children },
        endIndex: currentIndex + closingTag.length
      };
    }
    
    // Parse next child
    const { element: child, endIndex } = parseJsxFromSource(jsx, currentIndex);
    if (child !== null) {
      children.push(child);
    }
    
    if (endIndex === currentIndex) {
      // No progress made, move forward
      currentIndex++;
    } else {
      currentIndex = endIndex;
    }
  }
  
  return {
    element: { type: tagName, props, children },
    endIndex: currentIndex
  };
}

// Convert parsed element to React element
function createElementFromParsed(parsed: ParsedElement | string): React.ReactNode {
  if (typeof parsed === 'string') {
    return parsed;
  }
  
  const { type, props, children } = parsed;
  
  // Map to actual components
  let Component: any = type;
  if (type === 'Document') {
    Component = Document;
  } else if (type === 'Page') {
    Component = Page;
  } else {
    // HTML elements are lowercase
    Component = type.toLowerCase();
  }
  
  const childElements = children.map((child, index) => {
    const element = createElementFromParsed(child);
    // Add key for React
    if (React.isValidElement(element) && !element.key) {
      return React.cloneElement(element, { key: index });
    }
    return element;
  });
  
  return React.createElement(Component, props, ...childElements);
}

// Main parser for TSX source files
export function parseTemplateSource(tsxSource: string): React.FC | null {
  try {
    // Extract the JSX from the return statement
    const returnMatch = tsxSource.match(/return\s*\(\s*([\s\S]*?)\s*\);\s*}/);
    if (!returnMatch) {
      console.error('Could not find return statement with JSX');
      return null;
    }
    
    const jsxContent = returnMatch[1];
    
    // Parse the JSX
    const { element } = parseJsxFromSource(jsxContent, 0);
    if (!element || typeof element === 'string') {
      console.error('Could not parse JSX structure');
      return null;
    }
    
    // Create component
    return () => createElementFromParsed(element) as React.ReactElement;
  } catch (error) {
    console.error('Error parsing template source:', error);
    return null;
  }
}