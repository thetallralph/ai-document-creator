// Template type definitions for JavaScript object literal templates

export interface ElementNode {
  type: string;
  props?: Record<string, any>;
  children?: (ElementNode | string)[];
}

export interface ObjectTemplate {
  id: string;
  name: string;
  description: string;
  thumbnailUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
  render: () => ElementNode;
}

export interface ObjectTemplateMetadata {
  id: string;
  name: string;
  description: string;
  thumbnailUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Type guards
export function isElementNode(node: any): node is ElementNode {
  return node && typeof node === 'object' && 'type' in node;
}

export function isObjectTemplate(obj: any): obj is ObjectTemplate {
  return obj && 
    typeof obj === 'object' && 
    'id' in obj &&
    'name' in obj &&
    'render' in obj &&
    typeof obj.render === 'function';
}