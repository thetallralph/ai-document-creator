export interface DocumentStyleConfig {
  // Color palette
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: {
      primary: string;
      secondary: string;
      light: string;
    };
    surface: {
      primary: string;
      secondary: string;
    };
  };
  
  // Typography
  typography: {
    fontFamilies: {
      heading: string;
      body: string;
      accent?: string;
    };
    sizes: {
      // Heading sizes
      h1: number;
      h2: number;
      h3: number;
      h4: number;
      // Body text sizes
      large: number;
      regular: number;
      small: number;
      caption: number;
    };
    lineHeights: {
      heading: number;
      body: number;
    };
    letterSpacing?: {
      tight: number;
      normal: number;
      wide: number;
    };
  };
  
  // Spacing
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  
  // Border and effects
  borderRadius: {
    none: number;
    sm: number;
    md: number;
    lg: number;
    full: number;
  };
  
  // Layout
  layout: {
    maxWidth?: number;
    padding: {
      page: number;
      section: number;
      element: number;
    };
    grid?: {
      columns: number;
      gap: number;
    };
  };
  
  // Component-specific styles
  components?: {
    button?: {
      borderRadius: number;
      padding: string;
      fontSize: number;
    };
    card?: {
      borderRadius: number;
      padding: number;
      shadow?: string;
    };
    badge?: {
      borderRadius: number;
      padding: string;
      fontSize: number;
    };
  };
}