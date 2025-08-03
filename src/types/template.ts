export interface SerializedStyle {
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  backgroundColor?: string;
  borderRadius?: number;
  padding?: number;
  position?: 'absolute' | 'relative';
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  width?: number | string;
  height?: number | string;
  display?: string;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  gap?: number;
  margin?: number | string;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  textAlign?: string;
  fontWeight?: number | string;
  lineHeight?: number | string;
  letterSpacing?: number | string;
  textTransform?: string;
  border?: string;
  borderWidth?: number;
  borderColor?: string;
  borderStyle?: string;
  boxShadow?: string;
  opacity?: number;
  zIndex?: number;
  overflow?: string;
  objectFit?: string;
  transform?: string;
  transition?: string;
}

export interface SerializedElement {
  id: string;
  type: 'text' | 'image' | 'container' | 'shape';
  content?: string;
  src?: string;
  alt?: string;
  style?: SerializedStyle;
  children?: SerializedElement[];
  tagName?: string;
}

export interface SerializedPage {
  id: string;
  background?: string;
  padding?: number | string;
  style?: SerializedStyle;
  elements: SerializedElement[];
}

export interface SerializedDocument {
  id: string;
  title: string;
  type: 'flyer' | 'booklet' | 'presentation';
  paperSize: string;
  description?: string;
  pages: SerializedPage[];
  metadata?: {
    createdAt?: string;
    modifiedAt?: string;
    author?: string;
    version?: string;
  };
}

export interface TemplateFile {
  version: string;
  document: SerializedDocument;
}