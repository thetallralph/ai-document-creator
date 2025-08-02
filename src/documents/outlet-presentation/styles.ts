import { DocumentStyleConfig } from '../../types/documentStyle';

export const outletPresentationStyles: DocumentStyleConfig = {
  colors: {
    primary: '#667eea',
    secondary: '#764ba2',
    accent: '#e74c3c',
    background: '#f8f9fa',
    text: {
      primary: '#2c3e50',
      secondary: '#555555',
      light: '#777777'
    },
    surface: {
      primary: '#ffffff',
      secondary: '#ecf0f1'
    }
  },
  
  typography: {
    fontFamilies: {
      heading: 'system-ui, -apple-system, sans-serif',
      body: 'system-ui, -apple-system, sans-serif'
    },
    sizes: {
      h1: 72,
      h2: 48,
      h3: 36,
      h4: 28,
      large: 36,
      regular: 24,
      small: 20,
      caption: 16
    },
    lineHeights: {
      heading: 1.1,
      body: 1.5
    },
    letterSpacing: {
      tight: -1,
      normal: 0,
      wide: 1
    }
  },
  
  spacing: {
    xs: 10,
    sm: 20,
    md: 30,
    lg: 40,
    xl: 60,
    xxl: 80
  },
  
  borderRadius: {
    none: 0,
    sm: 8,
    md: 16,
    lg: 24,
    full: 9999
  },
  
  layout: {
    padding: {
      page: 60,
      section: 40,
      element: 20
    },
    grid: {
      columns: 3,
      gap: 40
    }
  },
  
  components: {
    button: {
      borderRadius: 30,
      padding: '15px 40px',
      fontSize: 24
    },
    card: {
      borderRadius: 16,
      padding: 30,
      shadow: '0 10px 30px rgba(0,0,0,0.1)'
    },
    badge: {
      borderRadius: 9999,
      padding: '8px 20px',
      fontSize: 18
    }
  }
};