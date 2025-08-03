// Dynamic source code loader that fetches actual document source files
// In a real application, this would make HTTP requests to fetch the source

import { OutletFlyer } from '../documents/outlet-flyer/OutletFlyer';
import { OutletCatalog } from '../documents/outlet-catalog/OutletCatalog';
import { OutletPresentation } from '../documents/outlet-presentation/OutletPresentation';
import { CactuceBooklet } from '../documents/cactuce-booklet/CactuceBooklet';
import { GreenRooftopBusinessPlan } from '../documents/green-rooftop-business-plan/GreenRooftopBusinessPlan';
import { inlineStyles, getStyleNameForComponent } from './styleInliner';

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
      // Get the style name for this component
      const styleName = getStyleNameForComponent(componentName);
      
      if (styleName) {
        // Use the comprehensive style inliner
        return inlineStyles(source, styleName);
      } else {
        // For components without styles, just remove import statements
        return source
          .replace(/import\s+{\s*\w+Styles\s*}\s+from\s+['"]\.\/styles['"];?/g, '')
          .replace(/const\s+styles\s*=\s*\w+Styles;?/g, '');
      }
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