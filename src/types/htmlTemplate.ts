// HTML-based template type definitions

export interface HTMLTemplate {
  id: string;
  name: string;
  description: string;
  paperSize?: string;
  thumbnailUrl?: string;
  pages: HTMLPage[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface HTMLPage {
  background?: string;
  style?: string; // CSS string for page-level styles
  content: string; // HTML content
}

export interface HTMLTemplateMetadata {
  id: string;
  name: string;
  description: string;
  paperSize?: string;
  thumbnailUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}