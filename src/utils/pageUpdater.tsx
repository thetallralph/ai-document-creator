import React from 'react';
import * as Babel from '@babel/standalone';
import { Document, Page } from '../components/document-components';

/**
 * Compiles improved page TSX code and creates an updated component
 */
export function createUpdatedComponent(
  originalSource: string,
  improvedPageCode: string,
  pageIndex: number,
  _templateName?: string
): React.FC | null {
  try {
    // First, we need to replace the specific page in the original source
    const pages: Array<{ start: number; end: number }> = [];
    let currentIndex = 0;
    
    // Find all Page components in the original source
    while (currentIndex < originalSource.length) {
      const pageStart = originalSource.indexOf('<Page', currentIndex);
      if (pageStart === -1) break;
      
      // Find the matching closing tag
      let depth = 0;
      let i = pageStart;
      let inString = false;
      let stringChar = '';
      
      while (i < originalSource.length) {
        if (!inString && (originalSource[i] === '"' || originalSource[i] === "'" || originalSource[i] === '`')) {
          inString = true;
          stringChar = originalSource[i];
        } else if (inString && originalSource[i] === stringChar && originalSource[i - 1] !== '\\') {
          inString = false;
        }
        
        if (!inString) {
          if (originalSource[i] === '<') {
            if (originalSource.substring(i, i + 5) === '<Page') {
              const nextChar = originalSource[i + 5];
              if (nextChar === ' ' || nextChar === '>' || nextChar === '/') {
                depth++;
              }
            } else if (originalSource.substring(i, i + 7) === '</Page>') {
              depth--;
              if (depth === 0) {
                pages.push({ start: pageStart, end: i + 7 });
                currentIndex = i + 7;
                break;
              }
            }
          }
        }
        i++;
      }
      
      if (i >= originalSource.length) break;
    }
    
    // Replace the specific page with the improved code
    if (pages[pageIndex]) {
      const { start, end } = pages[pageIndex];
      const updatedSource = 
        originalSource.substring(0, start) + 
        improvedPageCode + 
        originalSource.substring(end);
      
      // Extract the component function body
      const componentMatch = updatedSource.match(/return\s*\(([\s\S]*)\);?\s*}/);
      if (!componentMatch) {
        console.error('Could not find component return statement');
        return null;
      }
      
      const jsxContent = componentMatch[1];
      
      // If the improved code still contains style references, we need to replace them
      let processedJsxContent = jsxContent;
      
      // Replace all styles.something references with actual values
      if (jsxContent.includes('styles.') || jsxContent.includes('styles[')) {
        console.log('Detected styles references in improved code, replacing with inline values...');
        console.log('Sample of code before replacement:', jsxContent.substring(0, 200));
        
        // Replace style references with actual values
        processedJsxContent = processedJsxContent
          // Replace specific color references
          .replace(/styles\.colors\.primary/g, '"#667eea"')
          .replace(/styles\.colors\.secondary/g, '"#764ba2"')
          .replace(/styles\.colors\.accent/g, '"#f39c12"')
          .replace(/styles\.colors\.background/g, '"#fafafa"')
          .replace(/styles\.colors\.text/g, '"#333333"')
          .replace(/styles\.colors\.green/g, '"#4ade80"')
          .replace(/styles\.colors\.red/g, '"#ef4444"')
          .replace(/styles\.colors\.blue/g, '"#3b82f6"')
          .replace(/styles\.colors\.yellow/g, '"#eab308"')
          .replace(/styles\.colors\.gray/g, '"#6b7280"')
          // Replace styles['colors']['primary'] format
          .replace(/styles\['colors'\]\['primary'\]/g, '"#667eea"')
          .replace(/styles\['colors'\]\['secondary'\]/g, '"#764ba2"')
          .replace(/styles\['colors'\]\['green'\]/g, '"#4ade80"')
          // Replace any remaining styles.colors.XXX with a default color
          .replace(/styles\.colors\.\w+/g, '"#667eea"')
          // Replace any other styles.something with empty object
          .replace(/styles\.\w+(\.\w+)*/g, '{}')
          // Replace styles['something'] with empty object
          .replace(/styles\[['"]\w+['"]\]/g, '{}');
          
        // Also handle styles within JSX expressions like {styles.colors.green}
        processedJsxContent = processedJsxContent.replace(/\{(styles\.colors\.\w+)\}/g, (_match, styleRef) => {
          const colorMap: Record<string, string> = {
            'styles.colors.primary': '#667eea',
            'styles.colors.secondary': '#764ba2',
            'styles.colors.accent': '#f39c12',
            'styles.colors.green': '#4ade80',
            'styles.colors.red': '#ef4444',
            'styles.colors.blue': '#3b82f6',
            'styles.colors.yellow': '#eab308',
            'styles.colors.gray': '#6b7280',
            'styles.colors.background': '#fafafa',
            'styles.colors.text': '#333333'
          };
          return `"${colorMap[styleRef] || '#667eea'}"`;
        });
        
        // Handle any remaining {styles.XXX} patterns
        processedJsxContent = processedJsxContent.replace(/\{styles\.[^}]+\}/g, '{}');
          
        console.log('Replaced styles references in improved code');
        console.log('Sample of code after replacement:', processedJsxContent.substring(0, 200));
      }
      
      // Transform the processed JSX
      let processedTransformedCode;
      try {
        processedTransformedCode = Babel.transform(processedJsxContent, {
          presets: ['react'],
          plugins: []
        }).code;
      } catch (babelError: any) {
        console.error('Babel transformation error:', babelError);
        console.error('Problematic JSX:', processedJsxContent.substring(0, 500));
        
        // Try to fix common issues and retry
        let fixedJsx = processedJsxContent;
        
        // Fix unescaped apostrophes in text
        fixedJsx = fixedJsx.replace(/>([^<{]*)'([^<}]*)</g, '>{"$1\'$2"}<');
        
        // Try transformation again
        processedTransformedCode = Babel.transform(fixedJsx, {
          presets: ['react'],
          plugins: []
        }).code;
      }
      
      // Create a component that doesn't rely on external dependencies
      const componentCode = `
        (function() {
          const React = arguments[0];
          const Document = arguments[1];
          const Page = arguments[2];
          
          return function UpdatedComponent() {
            return ${processedTransformedCode};
          };
        })
      `;
      
      // Evaluate the code to create the component
      const createComponent = eval(componentCode);
      const UpdatedComponent = createComponent(React, Document, Page);
      
      return UpdatedComponent;
    }
    
    return null;
  } catch (error: any) {
    console.error('Error creating updated component:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      originalSourceLength: originalSource?.length,
      improvedCodeLength: improvedPageCode?.length
    });
    return null;
  }
}

/**
 * Validates that the improved code is valid TSX
 */
export function validateImprovedCode(code: string): { valid: boolean; error?: string } {
  try {
    // Basic validation - check for balanced tags
    const openTags = (code.match(/<Page/g) || []).length;
    const closeTags = (code.match(/<\/Page>/g) || []).length;
    
    if (openTags !== closeTags) {
      return { valid: false, error: 'Unbalanced Page tags' };
    }
    
    // Try to transform with Babel to check syntax
    Babel.transform(code, {
      presets: ['react'],
      plugins: []
    });
    
    return { valid: true };
  } catch (error: any) {
    return { valid: false, error: error.message };
  }
}