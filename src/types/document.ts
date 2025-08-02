export interface DocumentElement {
  id: string;
  type: 'text' | 'image' | 'shape';
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  style?: {
    fontSize?: number;
    fontFamily?: string;
    color?: string;
    backgroundColor?: string;
    borderRadius?: number;
    padding?: number;
  };
}

export interface Page {
  id: string;
  width: number;
  height: number;
  elements: DocumentElement[];
  backgroundColor?: string;
}

export interface Document {
  id: string;
  title: string;
  type: 'flyer' | 'booklet' | 'presentation';
  pages: Page[];
}