import React from 'react';
import { Document } from '../components/document-components/Document';
import { Page } from '../components/document-components/Page';
import { ElementNode, isElementNode } from '../types/objectTemplate';

// Map of component names to actual components
const componentMap: Record<string, React.ComponentType<any>> = {
  'Document': Document,
  'Page': Page,
};

/**
 * Convert an object literal element tree to React elements
 */
export function createElement(node: ElementNode | string | (ElementNode | string)[]): React.ReactElement | string | React.ReactElement[] {
  // Handle string nodes
  if (typeof node === 'string') {
    return node;
  }

  // Handle arrays of nodes
  if (Array.isArray(node)) {
    return node.map((child, index) => {
      const element = createElement(child);
      // Add key to React elements in arrays
      if (React.isValidElement(element)) {
        return React.cloneElement(element, { key: index });
      }
      return element;
    }) as React.ReactElement[];
  }

  // Handle element nodes
  if (isElementNode(node)) {
    const { type, props = {}, children = [] } = node;
    
    // Get component from map or use string for HTML elements
    const Component = componentMap[type] || type;
    
    // Process children
    const processedChildren = children.length > 0 
      ? children.map((child, index) => {
          const element = createElement(child);
          // Add key to React elements in arrays
          if (React.isValidElement(element)) {
            return React.cloneElement(element, { key: index });
          }
          return element;
        })
      : undefined;
    
    // Create the React element
    return React.createElement(
      Component,
      props,
      processedChildren
    );
  }

  throw new Error(`Invalid node type: ${typeof node}`);
}

/**
 * Validate an element tree structure
 */
export function validateElementTree(node: any): { valid: boolean; error?: string } {
  try {
    if (typeof node === 'string') {
      return { valid: true };
    }

    if (Array.isArray(node)) {
      for (const child of node) {
        const result = validateElementTree(child);
        if (!result.valid) return result;
      }
      return { valid: true };
    }

    if (!isElementNode(node)) {
      return { valid: false, error: 'Invalid node structure: missing type property' };
    }

    // Validate children recursively
    if (node.children) {
      if (!Array.isArray(node.children)) {
        return { valid: false, error: 'Children must be an array' };
      }
      for (const child of node.children) {
        const result = validateElementTree(child);
        if (!result.valid) return result;
      }
    }

    return { valid: true };
  } catch (error) {
    return { valid: false, error: error instanceof Error ? error.message : 'Unknown validation error' };
  }
}

/**
 * Extract text content from an element tree (useful for search/preview)
 */
export function extractTextContent(node: ElementNode | string | (ElementNode | string)[]): string {
  if (typeof node === 'string') {
    return node;
  }

  if (Array.isArray(node)) {
    return node.map(child => extractTextContent(child)).join(' ');
  }

  if (isElementNode(node) && node.children) {
    return node.children.map(child => extractTextContent(child)).join(' ');
  }

  return '';
}