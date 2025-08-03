import React from 'react';
import { Document } from '../components/document-components/Document';
import { Page } from '../components/document-components/Page';

// Transform TypeScript/JSX code to JavaScript
async function transformTSX(code: string): Promise<string> {
  try {
    // In a real implementation, we would use a proper TypeScript compiler
    // For now, we'll do basic transformations
    
    // Remove TypeScript type annotations
    let jsCode = code
      .replace(/:\s*React\.FC\s*=/g, ' =')
      .replace(/:\s*React\.FC/g, '')
      .replace(/:\s*any/g, '')
      .replace(/:\s*string/g, '')
      .replace(/:\s*number/g, '')
      .replace(/:\s*boolean/g, '')
      .replace(/export\s+const/g, 'const');
    
    // Remove import statements (we'll provide these in scope)
    jsCode = jsCode.replace(/import\s+.*?from\s+['"].*?['"];?\s*/g, '');
    
    // Extract the component function
    const componentMatch = jsCode.match(/const\s+(\w+)\s*=\s*\(\s*\)\s*=>\s*{([\s\S]*?)^}/m);
    if (!componentMatch) {
      throw new Error('Could not find component function');
    }
    
    const [, componentName, functionBody] = componentMatch;
    
    // Create a function that returns the component
    return `
      return function ${componentName}() {
        ${functionBody}
      }
    `;
  } catch (error) {
    console.error('Error transforming TSX:', error);
    throw error;
  }
}

// Compile and execute TSX code to create a React component
export async function compileTSX(tsxCode: string): Promise<React.FC | null> {
  try {
    // Transform the TSX to JavaScript
    const jsCode = await transformTSX(tsxCode);
    
    // Create a function with the required dependencies in scope
    const componentFactory = new Function(
      'React',
      'Document',
      'Page',
      jsCode
    );
    
    // Execute the factory to get the component
    const component = componentFactory(React, Document, Page);
    
    return component;
  } catch (error) {
    console.error('Error compiling TSX:', error);
    return null;
  }
}

// Enhanced parser that handles real TSX syntax
export async function parseRealTSX(tsxContent: string): Promise<React.FC | null> {
  try {
    // For complex TSX with styles and structure, we need a different approach
    // We'll use eval with a controlled scope (in production, use a proper sandbox)
    
    // Create a controlled environment
    const scope = {
      React,
      Document,
      Page,
      // Add any other dependencies that might be used in templates
    };
    
    // Transform the code to be executable
    let executableCode = tsxContent;
    
    // Remove imports
    executableCode = executableCode.replace(/import\s+.*?from\s+['"].*?['"];?\s*/g, '');
    
    // Replace export with return
    executableCode = executableCode.replace(/export\s+const\s+(\w+)\s*=/, 'return $1 =');
    
    // Wrap in a function
    const wrapperFunction = new Function(...Object.keys(scope), executableCode);
    
    // Execute with our scope
    const component = wrapperFunction(...Object.values(scope));
    
    return component;
  } catch (error) {
    console.error('Error parsing real TSX:', error);
    
    // Fallback to the simpler parser
    return compileTSX(tsxContent);
  }
}

// Parse style objects from TSX code
function parseStyleObject(styleStr: string): any {
  try {
    // Use Function constructor to safely evaluate the style object
    const styleFunction = new Function('return ' + styleStr);
    return styleFunction();
  } catch (error) {
    console.error('Error parsing style:', error);
    return {};
  }
}