/**
 * Unsplash image URL generator for templates
 * Uses Unsplash Source API for quick image integration
 */

export interface UnsplashOptions {
  width?: number;
  height?: number;
  keywords?: string[];
  collection?: string;
  user?: string;
  likes?: boolean;
  orientation?: 'landscape' | 'portrait' | 'squarish';
}

/**
 * Generate an Unsplash image URL
 * @param options Configuration options for the image
 * @returns URL string for the Unsplash image
 */
export function unsplashImage(options: UnsplashOptions = {}): string {
  const { 
    width = 800, 
    height = 600, 
    keywords = [], 
    collection,
    user,
    likes = false,
    orientation
  } = options;

  // Base URL for Unsplash Source
  let url = 'https://source.unsplash.com';

  // Add collection if specified
  if (collection) {
    url += `/collection/${collection}`;
  } 
  // Add user photos if specified
  else if (user) {
    url += `/user/${user}`;
    if (likes) {
      url += '/likes';
    }
  }
  // Default to random featured photo
  else {
    url += '/featured';
  }

  // Add dimensions
  url += `/${width}x${height}`;

  // Add search keywords if any
  if (keywords.length > 0) {
    url += `/?${keywords.join(',')}`;
  }

  // Add orientation if specified
  if (orientation && keywords.length === 0) {
    url += `/?${orientation}`;
  } else if (orientation && keywords.length > 0) {
    url += `,${orientation}`;
  }

  // Add a cache-busting parameter based on keywords to make URLs more stable
  // This will ensure the same image is used for the same parameters within a session
  const seed = keywords.join('') + (collection || '') + (user || '') + width + height;
  const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  url += (url.includes('?') ? '&' : '?') + `sig=${hash}`;

  return url;
}

/**
 * Preset image generators for common use cases
 */
export const unsplashPresets = {
  // Business and professional
  business: (w?: number, h?: number) => 
    unsplashImage({ width: w, height: h, keywords: ['business', 'professional', 'minimal'] }),
  
  office: (w?: number, h?: number) => 
    unsplashImage({ width: w, height: h, keywords: ['office', 'workspace', 'minimal'] }),
  
  technology: (w?: number, h?: number) => 
    unsplashImage({ width: w, height: h, keywords: ['technology', 'computer', 'minimal'] }),
  
  // Nature and environment
  nature: (w?: number, h?: number) => 
    unsplashImage({ width: w, height: h, keywords: ['nature', 'minimal', 'clean'] }),
  
  landscape: (w?: number, h?: number) => 
    unsplashImage({ width: w, height: h, keywords: ['landscape', 'minimal'], orientation: 'landscape' }),
  
  // Abstract and patterns
  abstract: (w?: number, h?: number) => 
    unsplashImage({ width: w, height: h, keywords: ['abstract', 'minimal', 'geometric'] }),
  
  pattern: (w?: number, h?: number) => 
    unsplashImage({ width: w, height: h, keywords: ['pattern', 'minimal', 'texture'] }),
  
  // Products
  product: (w?: number, h?: number) => 
    unsplashImage({ width: w, height: h, keywords: ['product', 'minimal', 'clean'] }),
  
  // Architecture
  architecture: (w?: number, h?: number) => 
    unsplashImage({ width: w, height: h, keywords: ['architecture', 'minimal', 'modern'] }),
  
  // Specific collections for consistent style
  minimalCollection: (w?: number, h?: number) => 
    unsplashImage({ width: w, height: h, collection: '53059230' }), // Minimal collection
  
  // Hero images
  hero: (w?: number, h?: number) => 
    unsplashImage({ width: w || 1200, height: h || 600, keywords: ['minimal', 'hero'], orientation: 'landscape' })
};