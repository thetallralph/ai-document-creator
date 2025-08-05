import { PageInfo } from './pageExtractor';

/**
 * Extract pages using regex since Babel standalone doesn't include traverse
 */
export function extractPagesWithAST(sourceCode: string): PageInfo[] {
  // For now, fall back to regex-based extraction
  // This is a limitation of @babel/standalone which doesn't include traverse
  return extractAllPages(sourceCode);
}

/**
 * Extract all pages from source code
 */
export function extractAllPagesWithAST(sourceCode: string): PageInfo[] {
  return extractAllPages(sourceCode);
}

/**
 * Replace page inner content using AST
 */
export function replacePageInnerContentWithAST(
  sourceCode: string,
  pageIndex: number,
  newInnerContent: string
): string {
  // Fall back to regex-based replacement
  return replacePageInnerContent(sourceCode, pageIndex, newInnerContent);
}

// Import the regex-based functions
import { extractAllPages, replacePageInnerContent } from './pageExtractor';