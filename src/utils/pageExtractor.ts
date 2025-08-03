export interface PageInfo {
  fullPage: string;
  openTag: string;
  innerContent: string;
  startIndex: number;
  endIndex: number;
}

/**
 * Extract all pages from the document source code
 */
export function extractPages(sourceCode: string): PageInfo[] {
  const pages: PageInfo[] = [];
  let currentIndex = 0;
  
  while (currentIndex < sourceCode.length) {
    const pageStart = sourceCode.indexOf('<Page', currentIndex);
    if (pageStart === -1) break;
    
    // Find the matching closing tag by counting depth
    let depth = 0;
    let i = pageStart;
    let inString = false;
    let stringChar = '';
    let inComment = false;
    
    while (i < sourceCode.length) {
      // Handle comments
      if (!inString && sourceCode.substring(i, i + 2) === '/*') {
        inComment = true;
        i += 2;
        continue;
      }
      if (inComment && sourceCode.substring(i, i + 2) === '*/') {
        inComment = false;
        i += 2;
        continue;
      }
      if (inComment) {
        i++;
        continue;
      }
      
      // Handle strings
      if (!inString && (sourceCode[i] === '"' || sourceCode[i] === "'" || sourceCode[i] === '`')) {
        inString = true;
        stringChar = sourceCode[i];
      } else if (inString && sourceCode[i] === stringChar && sourceCode[i - 1] !== '\\') {
        inString = false;
      }
      
      // Count tags when not in string
      if (!inString) {
        if (sourceCode[i] === '<') {
          // Check for <Page
          if (sourceCode.substring(i, i + 5) === '<Page') {
            // Make sure it's followed by space, > or /
            const nextChar = sourceCode[i + 5];
            if (nextChar === ' ' || nextChar === '>' || nextChar === '/') {
              depth++;
            }
          }
          // Check for </Page>
          else if (sourceCode.substring(i, i + 7) === '</Page>') {
            depth--;
            if (depth === 0) {
              // Found the complete Page component
              const fullPage = sourceCode.substring(pageStart, i + 7);
              
              // Extract the Page opening tag with its props
              const pageOpenMatch = fullPage.match(/<Page[^>]*>/);
              const openTag = pageOpenMatch ? pageOpenMatch[0] : '<Page>';
              
              // Extract just the inner content (between <Page> and </Page>)
              const innerContentMatch = fullPage.match(/<Page[^>]*>([\s\S]*)<\/Page>/);
              const innerContent = innerContentMatch ? innerContentMatch[1] : '';
              
              pages.push({
                fullPage,
                openTag,
                innerContent,
                startIndex: pageStart,
                endIndex: i + 7
              });
              
              currentIndex = i + 7;
              break;
            }
          }
        }
      }
      i++;
    }
    
    // If we couldn't find a closing tag, move past this occurrence
    if (i >= sourceCode.length) {
      currentIndex = pageStart + 5;
    }
  }
  
  return pages;
}

/**
 * Extract a specific page by index
 */
export function extractPageByIndex(sourceCode: string, pageIndex: number): PageInfo | null {
  const pages = extractPages(sourceCode);
  return pages[pageIndex] || null;
}

/**
 * Replace a specific page in the source code
 */
export function replacePage(sourceCode: string, pageIndex: number, newPageContent: string): string {
  const pages = extractPages(sourceCode);
  const page = pages[pageIndex];
  
  if (!page) {
    throw new Error(`Page ${pageIndex} not found in source code`);
  }
  
  return sourceCode.substring(0, page.startIndex) + 
         newPageContent + 
         sourceCode.substring(page.endIndex);
}

/**
 * Replace only the inner content of a page, preserving the Page tag and its props
 */
export function replacePageInnerContent(sourceCode: string, pageIndex: number, newInnerContent: string): string {
  const pages = extractPages(sourceCode);
  const page = pages[pageIndex];
  
  if (!page) {
    throw new Error(`Page ${pageIndex} not found in source code`);
  }
  
  const newFullPage = `${page.openTag}${newInnerContent}</Page>`;
  
  return sourceCode.substring(0, page.startIndex) + 
         newFullPage + 
         sourceCode.substring(page.endIndex);
}