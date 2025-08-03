import * as React from 'react';
import { transform } from '@babel/standalone';
import { Document } from '../components/document-components/Document';
import { Page } from '../components/document-components/Page';

// Define the template context with all available components and utilities
const TEMPLATE_CONTEXT = {
  React,
  Document,
  Page,
  // Add more components as needed
};

export interface CompileResult {
  component: React.FC | null;
  error: string | null;
}

/**
 * Compiles TSX code string into a React component
 * Safe for LLM-generated code
 */
export function compileReactTemplate(tsxCode: string): CompileResult {
  try {
    // Transform TSX to JavaScript using Babel
    const transformed = transform(tsxCode, {
      presets: ['react', 'typescript'],
      filename: 'template.tsx',
    }).code;

    if (!transformed) {
      return { component: null, error: 'Failed to transform TSX code' };
    }

    // Create a function that returns the component
    const componentFactory = new Function(
      ...Object.keys(TEMPLATE_CONTEXT),
      `
      ${transformed}
      
      // Find and return the exported component
      if (typeof Template !== 'undefined') return Template;
      if (typeof MyTemplate !== 'undefined') return MyTemplate;
      if (typeof Component !== 'undefined') return Component;
      
      // Try to find any function that looks like a component
      const possibleComponents = Object.keys(this)
        .filter(key => typeof this[key] === 'function' && /^[A-Z]/.test(key))
        .map(key => this[key]);
      
      if (possibleComponents.length > 0) {
        return possibleComponents[0];
      }
      
      throw new Error('No component found in the code');
      `
    );

    // Execute the factory with our context
    const component = componentFactory(...Object.values(TEMPLATE_CONTEXT));

    return { component, error: null };
  } catch (error) {
    return { 
      component: null, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Validates that the TSX code is safe and follows our template structure
 */
export function validateTemplateCode(tsxCode: string): string | null {
  // Basic security checks
  const dangerousPatterns = [
    /eval\s*\(/,
    /Function\s*\(/,
    /import\s+.*\s+from\s+['"](?!\.\/components)/,
    /require\s*\(/,
    /global\./,
    /window\./,
    /document\./,
    /process\./,
  ];

  for (const pattern of dangerousPatterns) {
    if (pattern.test(tsxCode)) {
      return `Dangerous pattern detected: ${pattern}`;
    }
  }

  // Check for required structure
  if (!tsxCode.includes('<Document')) {
    return 'Template must include a Document component';
  }

  if (!tsxCode.includes('<Page')) {
    return 'Template must include at least one Page component';
  }

  return null;
}

/**
 * Generate a template prompt for the LLM
 */
export function generateTemplatePrompt(description: string): string {
  return `Create a React component for a document template with the following requirements:

${description}

Use this exact structure:
\`\`\`tsx
const Template = () => {
  return (
    <Document title="Your Title" type="flyer|booklet|presentation" paperSize="A4|A5|Letter|etc">
      <Page background="#ffffff" padding="40px">
        {/* Your content here */}
      </Page>
    </Document>
  );
};
\`\`\`

Guidelines:
- Use only React, Document, and Page components (already imported)
- Use inline styles for all styling
- Keep the component name as "Template"
- Return a single Document with one or more Page components
- Use standard HTML elements inside Page components
- All styles should be inline style objects

Example:
\`\`\`tsx
const Template = () => {
  return (
    <Document title="Sales Flyer" type="flyer" paperSize="A4">
      <Page background="linear-gradient(to bottom, #f0f0f0, #ffffff)" padding="60px">
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontSize: 48, color: '#333', marginBottom: 20 }}>
            Big Sale!
          </h1>
          <p style={{ fontSize: 24, color: '#666' }}>
            Up to 50% off selected items
          </p>
        </div>
      </Page>
    </Document>
  );
};
\`\`\``;
}