import { loadDocumentSource } from './sourceCodeLoader';

// Function to get the source code for a component
export async function getDocumentSource(componentName: string): Promise<string | null> {
  try {
    // Load the actual source code dynamically
    const source = await loadDocumentSource(componentName);
    return source;
  } catch (error) {
    console.error('Failed to fetch document source:', error);
    return null;
  }
}