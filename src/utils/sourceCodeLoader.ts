// Dynamic source code loader that fetches actual document source files
// In a real application, this would make HTTP requests to fetch the source

import { OutletFlyer } from '../documents/outlet-flyer/OutletFlyer';
import { OutletCatalog } from '../documents/outlet-catalog/OutletCatalog';
import { OutletPresentation } from '../documents/outlet-presentation/OutletPresentation';
import { CactuceBooklet } from '../documents/cactuce-booklet/CactuceBooklet';
import { GreenRooftopBusinessPlan } from '../documents/green-rooftop-business-plan/GreenRooftopBusinessPlan';

// Import raw source files as text
// @ts-expect-error - Vite raw import
import OutletFlyerSource from '../documents/outlet-flyer/OutletFlyer.tsx?raw';
// @ts-expect-error - Vite raw import
import OutletCatalogSource from '../documents/outlet-catalog/OutletCatalog.tsx?raw';
// @ts-expect-error - Vite raw import
import OutletPresentationSource from '../documents/outlet-presentation/OutletPresentation.tsx?raw';
// @ts-expect-error - Vite raw import
import CactuceBookletSource from '../documents/cactuce-booklet/CactuceBooklet.tsx?raw';
// @ts-expect-error - Vite raw import
import GreenRooftopBusinessPlanSource from '../documents/green-rooftop-business-plan/GreenRooftopBusinessPlan.tsx?raw';

// Map component names to their raw source code
const sourceMap: Record<string, string> = {
  OutletFlyer: OutletFlyerSource,
  OutletCatalog: OutletCatalogSource,
  OutletPresentation: OutletPresentationSource,
  CactuceBooklet: CactuceBookletSource,
  GreenRooftopBusinessPlan: GreenRooftopBusinessPlanSource,
};

export async function loadDocumentSource(componentName: string): Promise<string | null> {
  try {
    // Check if we have the source for this component
    const source = sourceMap[componentName];
    
    if (source) {
      // Process the source to make it editable
      // Remove style imports and replace with inline styles
      let processedSource = source
        .replace(/import\s+{\s*\w+Styles\s*}\s+from\s+['"]\.\/styles['"];?/g, '')
        .replace(/const\s+styles\s*=\s*\w+Styles;?/g, '');
      
      // Replace styles references with inline values
      // This is a simplified version - in production you'd parse and inline the actual styles
      processedSource = processedSource
        .replace(/styles\.colors\.(\w+)/g, (match, colorName) => {
          const colorMap: Record<string, string> = {
            green: '#27ae60',
            darkGray: '#2c3e50',
            lightGreen: '#e8f8f5',
            blue: '#3498db',
            lightBlue: '#ebf5fb',
            orange: '#e67e22',
            lightOrange: '#fdf2e9',
            textPrimary: '#333333',
            primary: '#667eea',
          };
          return `'${colorMap[colorName] || '#000000'}'`;
        })
        .replace(/styles\.fonts\.(\w+)/g, "'sans-serif'")
        .replace(/styles\.fontWeights\.(\w+)/g, (match, weight) => {
          const weightMap: Record<string, string> = {
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
          };
          return weightMap[weight] || '400';
        });
      
      return processedSource;
    }
    
    // Return a default template if source not found
    return `import { Document, Page } from '../../components/document-components';

export const ${componentName} = () => {
  return (
    <Document title="${componentName.replace(/([A-Z])/g, ' $1').trim()}" type="document" paperSize="A4">
      <Page background="#ffffff">
        <h1 style={{ position: 'absolute', top: 50, left: 50, fontSize: '32px' }}>
          ${componentName.replace(/([A-Z])/g, ' $1').trim()}
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