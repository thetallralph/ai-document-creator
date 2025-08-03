// Map of template names to their source file paths
const templateSourcePaths: Record<string, string> = {
  'Cactuce Solutions Booklet': '/src/documents/cactuce-booklet/CactuceBooklet.tsx',
  'Plan d\'Affaires - The Green Rooftop Parc': '/src/documents/green-rooftop-business-plan/GreenRooftopBusinessPlan.tsx'
};

// Store the actual source content for each template
// This will be populated at build time or on first load
const templateSourceCache: Record<string, string> = {};

export async function loadTemplateSource(templateName: string): Promise<string | null> {
  // Check cache first
  if (templateSourceCache[templateName]) {
    return templateSourceCache[templateName];
  }

  const sourcePath = templateSourcePaths[templateName];
  if (!sourcePath) {
    console.error(`No source path found for template: ${templateName}`);
    return null;
  }

  try {
    // In a real implementation, this would be handled by your build system
    // For now, we'll use a different approach
    console.log(`Would load source from: ${sourcePath}`);
    return null;
  } catch (error) {
    console.error(`Error loading template source: ${error}`);
    return null;
  }
}

export function downloadOriginalSource(templateName: string, sourceContent: string) {
  const blob = new Blob([sourceContent], { type: 'text/typescript' });
  const url = URL.createObjectURL(blob);
  
  const filename = templateSourcePaths[templateName]?.split('/').pop() || 
                   `${templateName.replace(/\s+/g, '-').toLowerCase()}.tsx`;
  
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}