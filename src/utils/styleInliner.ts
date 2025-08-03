// Import all style files
import { outletFlyerStyles } from '../documents/outlet-flyer/styles';
import { outletCatalogStyles } from '../documents/outlet-catalog/styles';
import { outletPresentationStyles } from '../documents/outlet-presentation/styles';
import { cactuceStyles } from '../documents/cactuce-booklet/styles';

// Map of style names to their actual objects
export const styleMap: Record<string, any> = {
  outletFlyerStyles,
  outletCatalogStyles,
  outletPresentationStyles,
  cactuceStyles,
};

// Function to inline styles in source code
export function inlineStyles(source: string, styleName: string): string {
  const styles = styleMap[styleName];
  if (!styles) {
    console.warn(`Style object ${styleName} not found`);
    return source;
  }

  // Remove import statements and style assignments
  let processedSource = source
    .replace(/import\s+{\s*\w+Styles?\s*}\s+from\s+['"]\.\/styles['"];?/g, '')
    .replace(/const\s+styles\s*=\s*\w+Styles?;?/g, '');

  // Function to safely access nested properties
  const getNestedValue = (obj: any, path: string): any => {
    return path.split('.').reduce((current, prop) => {
      return current ? current[prop] : undefined;
    }, obj);
  };

  // Replace all styles.* references with actual values
  processedSource = processedSource.replace(/styles\.([a-zA-Z0-9_.]+)/g, (match, path) => {
    const value = getNestedValue(styles, path);
    
    if (value === undefined) {
      console.warn(`Style path ${path} not found in ${styleName}`);
      return match;
    }

    // Handle different types of values
    if (typeof value === 'string') {
      // If it's already a quoted string in the source, don't double-quote
      return `'${value}'`;
    } else if (typeof value === 'number') {
      return value.toString();
    } else if (typeof value === 'object') {
      // For objects, stringify them
      return JSON.stringify(value);
    }
    
    return match;
  });

  return processedSource;
}

// Get the style name from the component name
export function getStyleNameForComponent(componentName: string): string | null {
  const styleMapping: Record<string, string> = {
    OutletFlyer: 'outletFlyerStyles',
    OutletCatalog: 'outletCatalogStyles',
    OutletPresentation: 'outletPresentationStyles',
    CactuceBooklet: 'cactuceStyles',
  };
  
  return styleMapping[componentName] || null;
}