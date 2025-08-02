import { DocumentStyleConfig } from '../../types/documentStyle';

export const outletCatalogStyles: DocumentStyleConfig = {
  colors: {
    primary: '#1a1a1a',
    secondary: '#333333',
    accent: '#e74c3c',
    background: '#ffffff',
    text: {
      primary: '#1a1a1a',
      secondary: '#333333',
      light: '#555555'
    },
    surface: {
      primary: '#e8e8e8',
      secondary: '#f5f5f5'
    }
  },
  
  typography: {
    fontFamilies: {
      heading: 'Georgia, serif',
      body: 'system-ui, -apple-system, sans-serif'
    },
    sizes: {
      h1: 48,
      h2: 28,
      h3: 18,
      h4: 15,
      large: 18,
      regular: 14,
      small: 12,
      caption: 11
    },
    lineHeights: {
      heading: 1.2,
      body: 1.6
    },
    letterSpacing: {
      tight: -2,
      normal: 0,
      wide: 3
    }
  },
  
  spacing: {
    xs: 3,
    sm: 5,
    md: 10,
    lg: 15,
    xl: 25,
    xxl: 30
  },
  
  borderRadius: {
    none: 0,
    sm: 3,
    md: 5,
    lg: 8,
    full: 9999
  },
  
  layout: {
    padding: {
      page: 25,
      section: 20,
      element: 10
    },
    grid: {
      columns: 2,
      gap: 15
    }
  },
  
  components: {
    card: {
      borderRadius: 8,
      padding: 15,
      shadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    badge: {
      borderRadius: 3,
      padding: '2px 5px',
      fontSize: 10
    }
  }
};