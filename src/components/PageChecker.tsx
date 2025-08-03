import React, { useEffect, useState, useCallback } from 'react';
import { PAPER_SIZES } from '../config/paperSizes';
import './PageChecker.css';

interface CheckResult {
  id: string;
  type: 'error' | 'warning' | 'info';
  category: string;
  message: string;
  element?: Element;
}

interface PageCheckerProps {
  pageElement: HTMLElement | null;
  paperSize?: string;
  pageIndex: number;
}

const PageChecker: React.FC<PageCheckerProps> = ({ pageElement, paperSize }) => {
  const [checks, setChecks] = useState<CheckResult[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);

  // Helper functions defined outside component or as stable references
  const parseRgb = useCallback((color: string): number[] | null => {
    const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
      return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
    }
    return null;
  }, []);

  const relativeLuminance = useCallback((rgb: number[]): number => {
    const [r, g, b] = rgb.map(val => {
      const sRGB = val / 255;
      return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }, []);

  // Calculate contrast ratio between two colors
  const calculateContrast = useCallback((color1: string, color2: string): number => {
    const rgb1 = parseRgb(color1);
    const rgb2 = parseRgb(color2);
    
    if (!rgb1 || !rgb2) return 21; // Return max contrast if can't parse
    
    const l1 = relativeLuminance(rgb1);
    const l2 = relativeLuminance(rgb2);
    
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }, [parseRgb, relativeLuminance]);

  const runChecks = useCallback(() => {
    if (!pageElement) return;

    const results: CheckResult[] = [];
    const pageDimensions = PAPER_SIZES[paperSize || 'A4'];

    // 1. Check for text that's too small
    const textElements = pageElement.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6, a, li, td, th');
    textElements.forEach((element) => {
      const styles = window.getComputedStyle(element);
      const fontSize = parseFloat(styles.fontSize);
      
      if (fontSize < 8) {
        results.push({
          id: `small-text-${results.length}`,
          type: 'error',
          category: 'Font Size',
          message: `Text too small (${fontSize.toFixed(1)}px) - minimum recommended is 8px`,
          element
        });
      } else if (fontSize < 10) {
        results.push({
          id: `small-text-${results.length}`,
          type: 'warning',
          category: 'Font Size',
          message: `Text may be hard to read (${fontSize.toFixed(1)}px)`,
          element
        });
      }
    });

    // 2. Check contrast ratios
    const elementsWithText = pageElement.querySelectorAll('*');
    elementsWithText.forEach((element) => {
      const styles = window.getComputedStyle(element);
      const color = styles.color;
      const backgroundColor = styles.backgroundColor;
      
      if (color && backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)') {
        const contrast = calculateContrast(color, backgroundColor);
        
        if (contrast < 3) {
          results.push({
            id: `contrast-${results.length}`,
            type: 'error',
            category: 'Contrast',
            message: `Poor contrast ratio (${contrast.toFixed(1)}:1) - minimum is 4.5:1`,
            element
          });
        } else if (contrast < 4.5) {
          results.push({
            id: `contrast-${results.length}`,
            type: 'warning',
            category: 'Contrast',
            message: `Low contrast ratio (${contrast.toFixed(1)}:1)`,
            element
          });
        }
      }
    });

    // 3. Check for overflow
    const checkOverflow = (element: Element) => {
      const rect = element.getBoundingClientRect();
      const pageRect = pageElement.getBoundingClientRect();
      
      if (rect.right > pageRect.right || rect.left < pageRect.left) {
        results.push({
          id: `overflow-${results.length}`,
          type: 'error',
          category: 'Layout',
          message: `Content overflows page boundaries`,
          element
        });
      }
    };

    pageElement.querySelectorAll('*').forEach(checkOverflow);

    // 4. Check image resolution
    const images = pageElement.querySelectorAll('img');
    images.forEach((img) => {
      const naturalWidth = (img as HTMLImageElement).naturalWidth;
      const displayWidth = img.getBoundingClientRect().width;
      
      if (naturalWidth && displayWidth && naturalWidth < displayWidth * 2) {
        results.push({
          id: `image-res-${results.length}`,
          type: 'warning',
          category: 'Images',
          message: `Image may appear pixelated when printed`,
          element: img
        });
      }
    });

    // 5. Check for empty space usage
    const pageHeight = pageDimensions?.height || 842;
    const contentHeight = pageElement.scrollHeight;
    const unusedSpace = ((pageHeight - contentHeight) / pageHeight) * 100;
    
    if (unusedSpace > 40) {
      results.push({
        id: `unused-space-${results.length}`,
        type: 'info',
        category: 'Layout',
        message: `${unusedSpace.toFixed(0)}% of page is unused`
      });
    }

    // 6. Check line height for readability
    const paragraphs = pageElement.querySelectorAll('p');
    paragraphs.forEach((p) => {
      const styles = window.getComputedStyle(p);
      const lineHeight = parseFloat(styles.lineHeight);
      const fontSize = parseFloat(styles.fontSize);
      const ratio = lineHeight / fontSize;
      
      if (ratio < 1.2) {
        results.push({
          id: `line-height-${results.length}`,
          type: 'warning',
          category: 'Typography',
          message: `Line height too tight (${ratio.toFixed(1)}) - recommended 1.4-1.6`,
          element: p
        });
      }
    });

    // 7. Check margins for print safety
    const firstLevelChildren = Array.from(pageElement.children);
    firstLevelChildren.forEach((child) => {
      const rect = child.getBoundingClientRect();
      const pageRect = pageElement.getBoundingClientRect();
      const marginLeft = rect.left - pageRect.left;
      const marginRight = pageRect.right - rect.right;
      const marginTop = rect.top - pageRect.top;
      const marginBottom = pageRect.bottom - rect.bottom;
      
      const minMargin = 20; // 20px minimum for print safety
      
      if (marginLeft < minMargin || marginRight < minMargin || 
          marginTop < minMargin || marginBottom < minMargin) {
        results.push({
          id: `margins-${results.length}`,
          type: 'warning',
          category: 'Print Safety',
          message: `Content too close to page edge (min ${minMargin}px margin recommended)`,
          element: child
        });
      }
    });

    setChecks(results);
  }, [pageElement, paperSize, calculateContrast]);

  useEffect(() => {
    runChecks();
  }, [pageElement, runChecks]);

  const getIconForType = (type: 'error' | 'warning' | 'info'): string => {
    switch (type) {
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
    }
  };

  const errorCount = checks.filter(c => c.type === 'error').length;
  const warningCount = checks.filter(c => c.type === 'warning').length;
  const infoCount = checks.filter(c => c.type === 'info').length;

  return (
    <div className="page-checker-panel">
      <div className="panel-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h3>Page Checks</h3>
        <div className="check-summary">
          {errorCount > 0 && <span className="error-count">{errorCount}</span>}
          {warningCount > 0 && <span className="warning-count">{warningCount}</span>}
          {infoCount > 0 && <span className="info-count">{infoCount}</span>}
        </div>
      </div>
      
      {isExpanded && (
        <div className="panel-content">
          {checks.length === 0 ? (
            <div className="no-issues">✅ No issues found</div>
          ) : (
            <div className="check-list">
              {checks.map((check) => (
                <div key={check.id} className={`check-item ${check.type}`}>
                  <span className="check-icon">{getIconForType(check.type)}</span>
                  <div className="check-details">
                    <span className="check-category">{check.category}</span>
                    <span className="check-message">{check.message}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PageChecker;