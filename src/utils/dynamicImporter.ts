import React from 'react';
import * as Babel from '@babel/standalone';
import { Document } from '../components/document-components/Document';
import { Page } from '../components/document-components/Page';

// Configure Babel for transforming TSX
Babel.registerPreset('tsx-preset', {
  presets: [
    [Babel.availablePresets['typescript'], { allExtensions: true, isTSX: true }],
    [Babel.availablePresets['react'], { runtime: 'classic' }]
  ]
});

export async function importTsxSource(tsxCode: string): Promise<React.FC | null> {
  try {
    // Transform the TSX code to JavaScript
    const result = Babel.transform(tsxCode, {
      presets: ['tsx-preset'],
      filename: 'template.tsx'
    });

    if (!result.code) {
      throw new Error('Failed to transform TSX');
    }

    // Create a module scope with our dependencies
    const moduleScope = {
      React,
      Document,
      Page,
      exports: {} as any
    };

    // Create a function that executes the transformed code
    const moduleFunction = new Function(
      'React',
      'Document', 
      'Page',
      'exports',
      result.code + '\nreturn exports;'
    );

    // Execute the module
    const moduleExports = moduleFunction(
      moduleScope.React,
      moduleScope.Document,
      moduleScope.Page,
      moduleScope.exports
    );

    // Find the exported component
    const componentName = Object.keys(moduleExports).find(key => 
      typeof moduleExports[key] === 'function'
    );

    if (componentName) {
      return moduleExports[componentName];
    }

    // If no named export, check for default export
    if (moduleExports.default && typeof moduleExports.default === 'function') {
      return moduleExports.default;
    }

    throw new Error('No component found in exports');
  } catch (error) {
    console.error('Error importing TSX:', error);
    return null;
  }
}