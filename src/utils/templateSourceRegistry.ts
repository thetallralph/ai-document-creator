// Registry to store original TSX source code for templates
const templateSourceMap = new Map<string, string>();

export function registerTemplateSource(templateName: string, source: string) {
  templateSourceMap.set(templateName, source);
}

export function getTemplateSource(templateName: string): string | undefined {
  return templateSourceMap.get(templateName);
}

export function hasTemplateSource(templateName: string): boolean {
  return templateSourceMap.has(templateName);
}

// Helper to extract the raw TSX from a file
export function extractTsxSource(fileContent: string): string {
  // Extract everything from 'export const' to the end of the component
  const match = fileContent.match(/export\s+const\s+\w+.*?^}/ms);
  return match ? match[0] : fileContent;
}