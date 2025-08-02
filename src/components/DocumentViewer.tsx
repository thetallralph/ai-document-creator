import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { allTemplates } from '../documents/templates';
import { PAPER_SIZES } from '../config/paperSizes';
import { preparePrintStyles, cleanupPrintStyles } from '../utils/printUtils';
import PageChecker from './PageChecker';
import './DocumentViewer.css';

interface PageElement {
  id: string;
  type: string;
  name: string;
  visible: boolean;
  children?: PageElement[];
}

const DocumentViewer: React.FC = () => {
  const { documentName } = useParams<{ documentName: string }>();
  const [zoom, setZoom] = useState(75);
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  const documentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<HTMLElement[]>([]);
  const [layers, setLayers] = useState<PageElement[]>([]);
  const [documentInfo, setDocumentInfo] = useState<{ paperSize?: string; width?: number; height?: number }>();
  const [visiblePage, setVisiblePage] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);
  const [focusMode, setFocusMode] = useState(false);
  const [layersPanelCollapsed, setLayersPanelCollapsed] = useState(false);
  const scrollToPageRef = useRef<((pageIndex: number) => void) | null>(null);
  
  // Find the template by name (URL-friendly)
  const template = allTemplates.find(
    t => t.name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '').replace(/'/g, '') === documentName
  );
  
  const extractLayers = useCallback((element: Element, depth: number = 0): PageElement[] => {
    const children = Array.from(element.children);
    const layers: PageElement[] = [];
    
    children.forEach((child, index) => {
      const tagName = child.tagName.toLowerCase();
      const text = child.textContent?.substring(0, 30) || '';
      const classes = child.className || '';
      
      // Generate a meaningful name
      let name = tagName;
      if (tagName === 'div' && classes) {
        name = classes.split(' ')[0] || 'container';
      } else if (tagName === 'h1' || tagName === 'h2' || tagName === 'h3' || tagName === 'p') {
        name = `${tagName}: ${text}...`;
      }
      
      const layer: PageElement = {
        id: `layer-${depth}-${index}`,
        type: tagName,
        name: name,
        visible: true,
        children: child.children.length > 0 ? extractLayers(child, depth + 1) : undefined
      };
      
      layers.push(layer);
    });
    
    return layers;
  }, []);
  
  useEffect(() => {
    if (documentRef.current) {
      const pageElements = Array.from(documentRef.current.querySelectorAll('[data-page]'));
      setPages(pageElements as HTMLElement[]);
      
      // Extract document info
      const docRoot = documentRef.current.querySelector('[data-document-root]');
      if (docRoot) {
        setDocumentInfo({
          paperSize: docRoot.getAttribute('data-paper-size') || 'A4',
          width: parseInt(docRoot.getAttribute('data-paper-width') || '595'),
          height: parseInt(docRoot.getAttribute('data-paper-height') || '842')
        });
      }
      
      // Extract layers from selected page
      if (pageElements[selectedPage]) {
        const extractedLayers = extractLayers(pageElements[selectedPage], 0);
        setLayers(extractedLayers);
      }
      
      // Add click handlers to pages
      pageElements.forEach((page, index) => {
        const htmlPage = page as HTMLElement;
        htmlPage.style.cursor = 'pointer';
        htmlPage.onclick = () => {
          setSelectedPage(index);
          if (scrollToPageRef.current) {
            scrollToPageRef.current(index);
          }
        };
      });
    }
  }, [selectedPage, template, extractLayers]);
  
  // Handle scroll to detect visible page
  useEffect(() => {
    const handleScroll = () => {
      if (!canvasRef.current || !documentRef.current) return;
      
      const pageElements = Array.from(documentRef.current.querySelectorAll('[data-page]'));
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const canvasCenter = canvasRect.top + canvasRect.height / 2;
      
      let newVisiblePage = 0;
      for (let i = 0; i < pageElements.length; i++) {
        const pageRect = pageElements[i].getBoundingClientRect();
        if (pageRect.top <= canvasCenter && pageRect.bottom >= canvasCenter) {
          newVisiblePage = i;
          break;
        }
      }
      
      if (newVisiblePage !== visiblePage) {
        setVisiblePage(newVisiblePage);
      }
    };
    
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('scroll', handleScroll);
      return () => canvas.removeEventListener('scroll', handleScroll);
    }
  }, [visiblePage]);
  
  // Scroll to page when clicking thumbnails or navigation
  const scrollToPage = useCallback((pageIndex: number) => {
    if (!canvasRef.current || !documentRef.current) return;
    
    const pageElements = Array.from(documentRef.current.querySelectorAll('[data-page]'));
    if (pageElements[pageIndex]) {
      const pageTop = (pageElements[pageIndex] as HTMLElement).offsetTop;
      const wrapperTop = documentRef.current.offsetTop;
      canvasRef.current.scrollTo({
        top: pageTop - wrapperTop - 40, // 40px for padding
        behavior: 'smooth'
      });
    }
  }, []);
  
  // Store scrollToPage in ref to avoid circular dependency
  useEffect(() => {
    scrollToPageRef.current = scrollToPage;
  }, [scrollToPage]);
  
  // Toggle focus mode
  const toggleFocusMode = () => {
    setFocusMode(!focusMode);
  };
  
  // Clean up print styles on unmount
  useEffect(() => {
    return () => {
      cleanupPrintStyles();
    };
  }, []);
  
  if (!template) {
    return (
      <div className="document-viewer-error">
        <h2>Document not found</h2>
        <p>The document "{documentName}" could not be found.</p>
        <Link to="/">← Back to documents</Link>
      </div>
    );
  }
  
  const Component = template.component;
  
  const renderLayerItem = (layer: PageElement, depth: number = 0) => (
    <div key={layer.id} className="layer-item" style={{ paddingLeft: depth * 20 }}>
      <div 
        className={`layer-row ${selectedLayer === layer.id ? 'selected' : ''}`}
        onClick={() => setSelectedLayer(layer.id)}
      >
        <span className="layer-icon">
          {layer.children ? '📁' : getIconForElement(layer.type)}
        </span>
        <span className="layer-name">{layer.name}</span>
        <button className="layer-visibility">👁️</button>
      </div>
      {layer.children && (
        <div className="layer-children">
          {layer.children.map(child => renderLayerItem(child, depth + 1))}
        </div>
      )}
    </div>
  );
  
  const getIconForElement = (type: string) => {
    switch(type) {
      case 'h1':
      case 'h2':
      case 'h3': return 'T';
      case 'p': return '¶';
      case 'img': return '🖼️';
      case 'div': return '▢';
      default: return '•';
    }
  };
  
  return (
    <div className="document-viewer-container">
      {/* Top Toolbar */}
      <div className="viewer-toolbar">
        <Link to="/" className="back-button">← Documents</Link>
        <div className="document-title">{template.name}</div>
        <div className="toolbar-controls">
          <div className="zoom-controls">
            <button onClick={() => setZoom(Math.max(25, zoom - 25))}>−</button>
            <span className="zoom-level">{zoom}%</span>
            <button onClick={() => setZoom(Math.min(200, zoom + 25))}>+</button>
          </div>
          <button 
            className="print-button"
            onClick={() => {
              // Ensure document has proper paper size attributes before printing
              const docRoot = documentRef.current?.querySelector('[data-document-root]');
              if (docRoot && documentInfo?.paperSize) {
                docRoot.setAttribute('data-paper-size', documentInfo.paperSize);
                if (documentInfo.width) {
                  docRoot.setAttribute('data-paper-width', documentInfo.width.toString());
                }
                if (documentInfo.height) {
                  docRoot.setAttribute('data-paper-height', documentInfo.height.toString());
                }
              }
              
              // Prepare dynamic print styles if needed
              preparePrintStyles(documentInfo?.paperSize);
              
              // Print
              window.print();
              
              // Clean up dynamic styles after a delay
              setTimeout(() => {
                cleanupPrintStyles();
              }, 1000);
            }}
            title="Print Document"
          >
            🖨️ Print
          </button>
        </div>
      </div>
      
      <div className="viewer-main">
        {/* Left Sidebar - Document Properties */}
        <div className="sidebar sidebar-left">
          <div className="panel">
            <div className="panel-header">
              <h3>Document</h3>
            </div>
            <div className="panel-content">
              <div className="property-group">
                <label>Name</label>
                <div className="property-value">{template.name}</div>
              </div>
              <div className="property-group">
                <label>Type</label>
                <div className="property-value">
                  {template.name.includes('Catalog') ? 'Booklet' : 'Flyer'}
                </div>
              </div>
              <div className="property-group">
                <label>Pages</label>
                <div className="property-value">{pages.length || 1}</div>
              </div>
              <div className="property-group">
                <label>Paper Size</label>
                <div className="property-value">
                  {PAPER_SIZES[documentInfo?.paperSize || 'A4']?.displayName || 'Custom'}
                </div>
              </div>
              <div className="property-group">
                <label>Description</label>
                <div className="property-value small">{template.description}</div>
              </div>
            </div>
          </div>
          
          {/* Pages Panel */}
          <div className="panel">
            <div className="panel-header">
              <h3>Pages</h3>
            </div>
            <div className="panel-content pages-list">
              {pages.map((_, index) => (
                <div 
                  key={index}
                  className={`page-list-item ${selectedPage === index ? 'selected' : ''} ${visiblePage === index ? 'visible' : ''}`}
                  onClick={() => {
                    setSelectedPage(index);
                    scrollToPage(index);
                  }}
                >
                  <span className="page-number">Page {index + 1}</span>
                  {visiblePage === index && <span className="visible-indicator">👁️</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Center - Document Canvas */}
        <div className="viewer-canvas">
          <div className="canvas-container" ref={canvasRef}>
            <div 
              className="document-wrapper"
              style={{ transform: `scale(${zoom / 100})` }}
              ref={documentRef}
            >
              <div className="document-shadow continuous-scroll" data-focus-mode={focusMode} data-selected-page={selectedPage}>
                <Component />
              </div>
            </div>
          </div>
          
          {/* Page Navigation */}
          {pages.length > 1 && (
            <div className="page-navigation">
              <button 
                onClick={() => {
                  const newPage = Math.max(0, selectedPage - 1);
                  setSelectedPage(newPage);
                  scrollToPage(newPage);
                }}
                disabled={selectedPage === 0}
              >
                Previous
              </button>
              <span className="page-info">
                Page {selectedPage + 1} of {pages.length}
              </span>
              <button 
                onClick={() => {
                  const newPage = Math.min(pages.length - 1, selectedPage + 1);
                  setSelectedPage(newPage);
                  scrollToPage(newPage);
                }}
                disabled={selectedPage === pages.length - 1}
              >
                Next
              </button>
            </div>
          )}
          
          {/* Floating Focus Button */}
          {pages.length > 1 && (
            <button 
              className={`focus-mode-button ${focusMode ? 'active' : ''}`}
              onClick={toggleFocusMode}
              title={focusMode ? 'Show all pages' : 'Focus on selected page'}
            >
              {focusMode ? '⊞' : '⊡'}
            </button>
          )}
        </div>
        
        {/* Right Sidebar - Layers */}
        <div className="sidebar sidebar-right">
          <div className={`panel ${layersPanelCollapsed ? 'collapsed' : ''}`}>
            <div className="panel-header clickable" onClick={() => setLayersPanelCollapsed(!layersPanelCollapsed)}>
              <h3>Layers</h3>
              <div className="panel-header-right">
                <span className="panel-subtitle">Page {selectedPage + 1}</span>
                <button className="collapse-button">
                  {layersPanelCollapsed ? '▼' : '▲'}
                </button>
              </div>
            </div>
            {!layersPanelCollapsed && (
              <div className="panel-content layers-panel">
                {layers.length > 0 ? (
                  layers.map(layer => renderLayerItem(layer))
                ) : (
                  <div className="empty-state">No layers detected</div>
                )}
              </div>
            )}
          </div>
          
          {/* Page Checker Panel */}
          <PageChecker 
            pageElement={pages[selectedPage] || null}
            paperSize={documentInfo?.paperSize}
            pageIndex={selectedPage}
          />
        </div>
      </div>
    </div>
  );
}

export default DocumentViewer;