import { useState, useEffect } from 'react';

// Map template names to their source file paths
const templateSourcePaths: Record<string, string> = {
  'Outlet Sale Flyer': '/src/documents/outlet-flyer/OutletFlyer.tsx',
  'Outlet Product Catalog': '/src/documents/outlet-catalog/OutletCatalog.tsx',
  'Outlet Presentation': '/src/documents/outlet-presentation/OutletPresentation.tsx',
  'Cactuce Solutions Booklet': '/src/documents/cactuce-booklet/CactuceBooklet.tsx',
  'Plan d\'Affaires - The Green Rooftop Parc': '/src/documents/green-rooftop-business-plan/GreenRooftopBusinessPlan.tsx'
};

export function useTemplateSource(templateName: string) {
  const [source, setSource] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSource = async () => {
      const sourcePath = templateSourcePaths[templateName];
      if (!sourcePath) {
        setError('Template source path not found');
        setLoading(false);
        return;
      }

      try {
        // In development, Vite can serve source files
        // We need to use the raw import to get the actual file content
        const response = await fetch(sourcePath);
        if (!response.ok) {
          throw new Error(`Failed to load source: ${response.statusText}`);
        }
        
        const content = await response.text();
        setSource(content);
      } catch (err) {
        console.error('Error loading template source:', err);
        setError(err instanceof Error ? err.message : 'Failed to load source');
      } finally {
        setLoading(false);
      }
    };

    loadSource();
  }, [templateName]);

  return { source, loading, error };
}