// Dynamic source code loader that fetches actual document source files
// In a real application, this would make HTTP requests to fetch the source

// import { inlineStyles, getStyleNameForComponent } from './styleInliner';

// Import the template sources mapping
import { getTemplateSource } from '../documents/sourceImports';

export async function loadDocumentSource(componentName: string): Promise<string | null> {
  try {
    // First try to get source by template name (what CodeEditor receives)
    let source = getTemplateSource(componentName);
    
    if (source) {
      // We have the source, return it as is (no style inlining needed for now)
      return source;
    }
    
    // Return a default template if source not found
    // Make sure component name is a valid JavaScript identifier
    const sanitizedComponentName = componentName.replace(/\s+/g, '');
    const displayName = componentName.replace(/([A-Z])/g, ' $1').trim();
    
    return `import { Document, Page } from '../../components/document-components';

export const ${sanitizedComponentName} = () => {
  return (
    <Document title="${displayName}" type="document" paperSize="A4">
      <Page background="#ffffff">
        <h1 style={{ position: 'absolute', top: 50, left: 50, fontSize: '32px' }}>
          ${displayName}
        </h1>
        <p style={{ position: 'absolute', top: 120, left: 50, fontSize: '16px' }}>
          Edit this code to modify the document.
        </p>
      </Page>
    </Document>
  );
};`;
  } catch (error) {
    console.error('Failed to load document source:', error);
    return null;
  }
}