// This file will store the raw source code of each template
// We'll use raw string literals to preserve exact formatting

export const templateSources: Record<string, string> = {};

// Helper to register a template's source code
export function registerTemplateSource(name: string, source: string) {
  templateSources[name] = source;
}

// We'll populate this dynamically or through a build process
// For now, let's add a method to fetch source at runtime
export async function fetchTemplateSource(templatePath: string): Promise<string | null> {
  try {
    // In a real app, this would be handled by the build system
    // For now, we'll return a placeholder
    return null;
  } catch (error) {
    console.error('Error fetching template source:', error);
    return null;
  }
}