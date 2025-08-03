import React from 'react';
import { Document } from '../components/document-components/Document';
import { Page } from '../components/document-components/Page';

// Convert style string to object
function parseStyleObject(styleStr: string): Record<string, any> {
  try {
    // Create a safe evaluator for style objects
    const styleFunc = new Function(`
      "use strict";
      return ${styleStr};
    `);
    return styleFunc();
  } catch (error) {
    console.error('Error parsing style:', error);
    return {};
  }
}


// Generate React.createElement code from JSX string
function generateCreateElementCode(jsx: string): string {
  // This is a simplified version - you'd want a proper JSX parser in production
  // For now, let's handle the specific format of our templates
  
  // Extract Document props
  const docMatch = jsx.match(/<Document\s+([^>]+)>/);
  if (!docMatch) return 'return null;';
  
  const docProps = parseProps(docMatch[1]);
  
  // Extract Pages
  const pageRegex = /<Page\s+([^>]*?)>([\s\S]*?)<\/Page>/g;
  const pages: string[] = [];
  let pageMatch;
  
  while ((pageMatch = pageRegex.exec(jsx)) !== null) {
    const [, pagePropsStr, pageContent] = pageMatch;
    const pageProps = parseProps(pagePropsStr);
    
    // Parse page children
    const children = parseChildren(pageContent);
    
    pages.push(`React.createElement(Page, ${JSON.stringify(pageProps)}, ${children})`);
  }
  
  return `
    return React.createElement(
      Document,
      ${JSON.stringify(docProps)},
      ${pages.join(',\n      ')}
    );
  `;
}

// Parse props from JSX props string
function parseProps(propsStr: string): Record<string, any> {
  const props: Record<string, any> = {};
  
  // Match prop="value" or prop={value}
  const propRegex = /(\w+)=(?:"([^"]+)"|{([^}]+)})/g;
  let match;
  
  while ((match = propRegex.exec(propsStr)) !== null) {
    const [, name, stringValue, jsValue] = match;
    
    if (stringValue !== undefined) {
      props[name] = stringValue;
    } else if (jsValue !== undefined) {
      // Handle JS expressions
      if (name === 'style') {
        props[name] = parseStyleObject(jsValue);
      } else if (!isNaN(Number(jsValue))) {
        props[name] = Number(jsValue);
      } else {
        props[name] = jsValue;
      }
    }
  }
  
  return props;
}

// Parse children elements
function parseChildren(content: string): string {
  // This is simplified - just return the raw content as a string for now
  // In a real implementation, you'd recursively parse child elements
  const trimmed = content.trim();
  if (!trimmed) return 'null';
  
  // For now, create a div with dangerouslySetInnerHTML
  // This preserves the exact content but isn't ideal
  return `React.createElement('div', { 
    dangerouslySetInnerHTML: { __html: ${JSON.stringify(trimmed)} } 
  })`;
}

// Main import function
export async function importTemplateTsx(tsxContent: string): Promise<React.FC | null> {
  try {
    // Extract component name
    const componentMatch = tsxContent.match(/export\s+const\s+(\w+)\s*=/);
    const componentName = componentMatch ? componentMatch[1] : 'ImportedTemplate';
    
    // Extract the return statement content
    const returnMatch = tsxContent.match(/return\s*\(\s*([\s\S]*?)\s*\);\s*}/);
    if (!returnMatch) {
      throw new Error('Could not find return statement');
    }
    
    const jsxContent = returnMatch[1];
    
    // Create the component function
    const createComponent = new Function(
      'React',
      'Document',
      'Page',
      `
      return function ${componentName}() {
        ${generateComponentBody(jsxContent)}
      };
      `
    );
    
    return createComponent(React, Document, Page);
  } catch (error) {
    console.error('Error importing template:', error);
    return null;
  }
}

// Generate component body with proper JSX handling
function generateComponentBody(jsx: string): string {
  // For a more robust solution, we'll create the elements programmatically
  return `
    const React = arguments[0];
    const Document = arguments[1];
    const Page = arguments[2];
    
    try {
      ${generateCreateElementCode(jsx)}
    } catch (error) {
      console.error('Error rendering imported template:', error);
      return React.createElement('div', null, 'Error rendering template');
    }
  `;
}