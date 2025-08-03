import React from 'react';
import { Document } from '../components/document-components/Document';
import { Page } from '../components/document-components/Page';

interface TemplateStructure {
  title: string;
  type: 'flyer' | 'booklet' | 'presentation';
  paperSize: string;
  pages: Array<{
    background?: string;
    padding?: string | number;
    elements: React.ReactNode[];
  }>;
}

// Parse the TSX file and extract the template structure
function extractTemplateStructure(tsxContent: string): TemplateStructure | null {
  try {
    // Extract Document props
    const docMatch = tsxContent.match(/<Document\s+title="([^"]+)"\s+type="([^"]+)"\s+paperSize="([^"]+)"/);
    if (!docMatch) {
      console.error('Could not find Document component');
      return null;
    }

    const [, title, type, paperSize] = docMatch;
    
    // Extract all Page components
    const pages: TemplateStructure['pages'] = [];
    const pageRegex = /<Page\s+([^>]*?)>([\s\S]*?)<\/Page>/g;
    let pageMatch;
    
    while ((pageMatch = pageRegex.exec(tsxContent)) !== null) {
      const [, pagePropsStr, pageContent] = pageMatch;
      
      // Extract page props
      const backgroundMatch = pagePropsStr.match(/background="([^"]+)"/);
      const paddingMatch = pagePropsStr.match(/padding=["']?([^"'\s>]+)["']?/);
      
      const page = {
        background: backgroundMatch ? backgroundMatch[1] : undefined,
        padding: paddingMatch ? parsePaddingValue(paddingMatch[1]) : undefined,
        elements: [createContentElement(pageContent)]
      };
      
      pages.push(page);
    }
    
    return {
      title,
      type: type as 'flyer' | 'booklet' | 'presentation',
      paperSize,
      pages
    };
  } catch (error) {
    console.error('Error extracting template structure:', error);
    return null;
  }
}

// Parse padding value (could be string like "80px" or number)
function parsePaddingValue(value: string): string | number {
  if (value.match(/^\d+$/)) {
    return parseInt(value, 10);
  }
  return value.replace(/[{}'"]/g, '');
}

// Create a simplified content element
function createContentElement(htmlContent: string): React.ReactNode {
  // For now, we'll render the content as HTML
  // In a production app, you'd want to properly parse and recreate the React elements
  return (
    <div 
      key="content"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      style={{ width: '100%', height: '100%' }}
    />
  );
}

// Reconstruct the template as a React component
export function reconstructTemplate(tsxContent: string): React.FC | null {
  const structure = extractTemplateStructure(tsxContent);
  
  if (!structure) {
    return null;
  }
  
  // Return a component that renders the template
  return function ReconstructedTemplate() {
    return (
      <Document 
        title={structure.title} 
        type={structure.type} 
        paperSize={structure.paperSize}
      >
        {structure.pages.map((page, index) => (
          <Page 
            key={index}
            background={page.background}
            padding={page.padding}
          >
            {page.elements}
          </Page>
        ))}
      </Document>
    );
  };
}

// Main import function with better error handling
export async function importTemplateWithReconstruction(tsxContent: string): Promise<React.FC | null> {
  try {
    // First, try to reconstruct from the template structure
    const reconstructed = reconstructTemplate(tsxContent);
    if (reconstructed) {
      return reconstructed;
    }
    
    // If that fails, try a more aggressive approach
    console.warn('Could not reconstruct template, trying alternative approach');
    
    // Alternative: Create a basic template with the content
    return createBasicTemplate(tsxContent);
  } catch (error) {
    console.error('Error importing template:', error);
    return null;
  }
}

// Create a basic template when parsing fails
function createBasicTemplate(tsxContent: string): React.FC {
  return function BasicImportedTemplate() {
    return (
      <Document title="Imported Template" type="flyer" paperSize="A4">
        <Page background="#ffffff" padding="40px">
          <div style={{ padding: 20, textAlign: 'center' }}>
            <h2>Import Error</h2>
            <p>Could not fully parse the template. The original content is preserved below:</p>
            <pre style={{ 
              textAlign: 'left', 
              background: '#f5f5f5', 
              padding: 20, 
              overflow: 'auto',
              fontSize: 12
            }}>
              {tsxContent.substring(0, 500)}...
            </pre>
          </div>
        </Page>
      </Document>
    );
  };
}