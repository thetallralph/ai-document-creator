import React from 'react';
import { Document } from '../components/document-components/Document';
import { Page } from '../components/document-components/Page';

export async function importTemplateTsxSimple(tsxContent: string): Promise<React.FC | null> {
  try {
    // Basic transformation: remove TypeScript types and imports
    let jsCode = tsxContent
      // Remove imports
      .replace(/import\s+.*?from\s+['"].*?['"];?\s*/g, '')
      // Remove TypeScript type annotations
      .replace(/:\s*React\.FC\s*=/g, ' =')
      .replace(/:\s*any\b/g, '')
      .replace(/:\s*string\b/g, '')
      .replace(/:\s*number\b/g, '')
      .replace(/:\s*boolean\b/g, '')
      // Change export to variable declaration
      .replace(/export\s+const/g, 'const');

    // Extract component name
    const componentMatch = jsCode.match(/const\s+(\w+)\s*=/);
    const componentName = componentMatch ? componentMatch[1] : 'Component';

    // Create a wrapper that provides all dependencies
    const wrapperCode = `
      return (function() {
        const React = arguments[0];
        const Document = arguments[1];
        const Page = arguments[2];
        
        ${jsCode}
        
        return ${componentName};
      }).apply(null, arguments);
    `;

    // Create and execute the wrapper function
    const createComponent = new Function('React', 'Document', 'Page', wrapperCode);
    const component = createComponent(React, Document, Page);
    
    return component;
  } catch (error) {
    console.error('Simple import error:', error);
    
    // Fallback: try to extract just the JSX structure
    try {
      return createFallbackComponent(tsxContent);
    } catch (fallbackError) {
      console.error('Fallback import error:', fallbackError);
      return null;
    }
  }
}

function createFallbackComponent(tsxContent: string): React.FC {
  // Extract basic structure for common templates
  const docMatch = tsxContent.match(/<Document\s+title="([^"]+)"\s+type="([^"]+)"\s+paperSize="([^"]+)"/);
  
  if (!docMatch) {
    throw new Error('Could not parse Document component');
  }
  
  const [, title, type, paperSize] = docMatch;
  
  // Extract pages
  const pages: Array<{ background?: string; padding?: string; content: string }> = [];
  const pageRegex = /<Page\s+([^>]+)>([\s\S]*?)<\/Page>/g;
  let pageMatch;
  
  while ((pageMatch = pageRegex.exec(tsxContent)) !== null) {
    const [, propsStr, content] = pageMatch;
    
    const backgroundMatch = propsStr.match(/background="([^"]+)"/);
    const paddingMatch = propsStr.match(/padding="([^"]+)"/);
    
    pages.push({
      background: backgroundMatch ? backgroundMatch[1] : undefined,
      padding: paddingMatch ? paddingMatch[1] : undefined,
      content: content.trim()
    });
  }
  
  // Return a component that recreates the structure
  return () => {
    return React.createElement(
      Document,
      { title, type: type as any, paperSize },
      pages.map((page, index) => 
        React.createElement(
          Page,
          { 
            key: index,
            background: page.background,
            padding: page.padding
          },
          React.createElement('div', {
            dangerouslySetInnerHTML: { __html: page.content }
          })
        )
      )
    );
  };
}