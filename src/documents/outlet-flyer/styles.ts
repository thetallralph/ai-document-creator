import { DocumentStyleConfig } from '../../types/documentStyle';

export const outletFlyerStyles: DocumentStyleConfig = {
  colors: {
    primary: '#667eea',
    secondary: '#764ba2',
    accent: '#ff6b6b',
    background: '#fafafa',
    text: {
      primary: '#1a1a1a',
      secondary: '#666666',
      light: '#999999'
    },
    surface: {
      primary: '#ffffff',
      secondary: '#f0f0f0'
    }
  },
  
  typography: {
    fontFamilies: {
      heading: 'system-ui, -apple-system, sans-serif',
      body: 'system-ui, -apple-system, sans-serif'
    },
    sizes: {
      h1: 52,
      h2: 32,
      h3: 18,
      h4: 16,
      large: 24,
      regular: 16,
      small: 14,
      caption: 12
    },
    lineHeights: {
      heading: 1.2,
      body: 1.5
    },
    letterSpacing: {
      tight: -0.5,
      normal: 0,
      wide: 2
    }
  },
  
  spacing: {
    xs: 5,
    sm: 10,
    md: 15,
    lg: 20,
    xl: 30,
    xxl: 50
  },
  
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    full: 9999
  },
  
  layout: {
    padding: {
      page: 50,
      section: 30,
      element: 20
    },
    grid: {
      columns: 2,
      gap: 20
    }
  },
  
  components: {
    button: {
      borderRadius: 25,
      padding: '10px 30px',
      fontSize: 18
    },
    card: {
      borderRadius: 12,
      padding: 20,
      shadow: '0 5px 20px rgba(0,0,0,0.08)'
    },
    badge: {
      borderRadius: 9999,
      padding: '5px 15px',
      fontSize: 14
    }
  }
};