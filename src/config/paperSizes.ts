export interface PaperSize {
  name: string;
  width: number;  // in pixels at 72 DPI
  height: number; // in pixels at 72 DPI
  displayName: string;
  orientation?: 'portrait' | 'landscape';
}

// Standard paper sizes at 72 DPI (points)
export const PAPER_SIZES: Record<string, PaperSize> = {
  // ISO 216 A Series
  A3: {
    name: 'A3',
    width: 842,
    height: 1191,
    displayName: 'A3 (297 × 420 mm)'
  },
  A4: {
    name: 'A4',
    width: 595,
    height: 842,
    displayName: 'A4 (210 × 297 mm)'
  },
  A5: {
    name: 'A5',
    width: 420,
    height: 595,
    displayName: 'A5 (148 × 210 mm)'
  },
  
  // US Paper Sizes
  LETTER: {
    name: 'LETTER',
    width: 612,
    height: 792,
    displayName: 'Letter (8.5 × 11 in)'
  },
  LEGAL: {
    name: 'LEGAL',
    width: 612,
    height: 1008,
    displayName: 'Legal (8.5 × 14 in)'
  },
  TABLOID: {
    name: 'TABLOID',
    width: 792,
    height: 1224,
    displayName: 'Tabloid (11 × 17 in)'
  },
  
  // Custom sizes for digital displays
  PRESENTATION_16_9: {
    name: 'PRESENTATION_16_9',
    width: 1024,
    height: 576,
    displayName: 'Presentation 16:9'
  },
  PRESENTATION_4_3: {
    name: 'PRESENTATION_4_3',
    width: 1024,
    height: 768,
    displayName: 'Presentation 4:3'
  },
  
  // Social Media / Digital
  INSTAGRAM_POST: {
    name: 'INSTAGRAM_POST',
    width: 1080,
    height: 1080,
    displayName: 'Instagram Post (1:1)'
  },
  INSTAGRAM_STORY: {
    name: 'INSTAGRAM_STORY',
    width: 1080,
    height: 1920,
    displayName: 'Instagram Story (9:16)'
  }
};

// Helper function to get paper size
export const getPaperSize = (sizeName: string): PaperSize => {
  return PAPER_SIZES[sizeName] || PAPER_SIZES.A4;
};

// Get landscape version of a paper size
export const getLandscape = (size: PaperSize): PaperSize => {
  return {
    ...size,
    width: size.height,
    height: size.width,
    orientation: 'landscape'
  };
};