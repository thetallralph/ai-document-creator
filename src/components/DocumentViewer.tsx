import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { allTemplates } from '../documents/templates';
import { PAPER_SIZES } from '../config/paperSizes';
import { preparePrintStyles, cleanupPrintStyles } from '../utils/printUtils';
import { serializeDocument, downloadTemplate } from '../utils/templateSerializer';
import { exportTemplateForBabel } from '../utils/templateExporter';
import { useTemplates } from '../contexts/TemplateContext';
import { useEditorCode } from '../contexts/EditorCodeContext';
import PageChecker from './PageChecker';
import { CodeEditor } from './CodeEditor';
import { AIAssistant } from './AIAssistant';
import { getTemplateSource } from '../documents/sourceImports';
import { getDocumentSource } from '../utils/documentSourceExtractor';
import './DocumentViewer.css';

interface PageElement {
  id: string;
  type: string;
  name: string;
  visible: boolean;
  children?: PageElement[];
}

const DocumentViewer: React.FC = () => {
  const { documentName } = useParams<{ documentName?: string }>();
  const [zoom, setZoom] = useState(75);
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  const documentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<HTMLElement[]>([]);
  const [documentInfo, setDocumentInfo] = useState<{ paperSize?: string; width?: number; height?: number }>();
  const [visiblePage, setVisiblePage] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);
  const [focusMode, setFocusMode] = useState(false);
  const [aiPanelCollapsed, setAiPanelCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState<'visual' | 'code'>('visual');
  const [editableComponent, setEditableComponent] = useState<React.ComponentType | null>(null);
  const scrollToPageRef = useRef<((pageIndex: number) => void) | null>(null);
  const { getDynamicTemplate } = useTemplates();
  const { setEditorCode } = useEditorCode();
  
  // Find the template - either static or dynamic
  let template: any;
  if (documentName) {
    // First check static templates
    template = allTemplates.find(
      t => t.name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '').replace(/'/g, '') === documentName
    );
    
    // If not found in static, check dynamic templates
    if (!template) {
      const dynamicTemplate = getDynamicTemplate(documentName);
      if (dynamicTemplate) {
        template = dynamicTemplate;
      }
    }
  }
  
  // Reset editable component when switching documents
  useEffect(() => {
    setEditableComponent(null);
  }, [documentName]);

  // Load source code when template is available
  useEffect(() => {
    const loadSource = async () => {
      if (!template) {
        return;
      }
      
      try {
        // Check if template has code (dynamic template)
        if ('code' in template && template.code) {
          setEditorCode(template.code);
          return;
        }
        
        // Try to get source from template source first
        let source = template.name ? getTemplateSource(template.name) : null;
        
        // If not found, try to extract from component
        if (!source && template.component) {
          const componentName = template.component.name || 'Document';
          source = await getDocumentSource(componentName);
        }
        
        if (source) {
          setEditorCode(source);
        }
      } catch (error) {
        console.error('Error loading document source:', error);
      }
    };

    loadSource();
  }, [template, setEditorCode]);
  
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
      // Layers functionality is currently disabled
      // if (pageElements[selectedPage]) {
      //   const extractedLayers = extractLayers(pageElements[selectedPage], 0);
      //   setLayers(extractedLayers);
      // }
      
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
  }, [selectedPage, template, editableComponent, extractLayers]);
  
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
      const pageElement = pageElements[pageIndex] as HTMLElement;
      // Use getBoundingClientRect for more accurate positioning
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const pageRect = pageElement.getBoundingClientRect();
      
      // Calculate the distance to scroll
      const currentScroll = canvasRef.current.scrollTop;
      const relativeTop = pageRect.top - canvasRect.top + currentScroll;
      
      canvasRef.current.scrollTo({
        top: relativeTop - 40, // 40px for padding at the top
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
  
  // For dynamic templates, component might not exist yet
  const Component = template.component;
  const isDynamicTemplate = 'code' in template && !template.component;
  
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
        <div className="document-title">
          {template.name}
        </div>
        <div className="toolbar-controls">
          <div className="zoom-controls">
            <button onClick={() => setZoom(Math.max(25, zoom - 25))}>−</button>
            <span className="zoom-level">{zoom}%</span>
            <button onClick={() => setZoom(Math.min(200, zoom + 25))}>+</button>
          </div>
          <button
            className={`view-mode-button ${viewMode === 'visual' ? 'active' : ''}`}
            onClick={() => setViewMode('visual')}
            title="Visual View"
          >
            👁️ Visual
          </button>
          <button
            className={`view-mode-button ${viewMode === 'code' ? 'active' : ''}`}
            onClick={() => setViewMode('code')}
            title="Code View"
          >
            {"</>"} Code
          </button>
          <div className="toolbar-separator" />
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
          <button 
            className="export-button"
            onClick={() => {
              if (Component) {
                const serialized = serializeDocument(Component);
                if (serialized) {
                  downloadTemplate(serialized);
                } else {
                  alert('Failed to export template');
                }
              } else {
                alert('Please switch to Code view and compile the template first');
              }
            }}
            title="Export Template as JSON"
          >
            💾 Export JSON
          </button>
          <button 
            className="export-button"
            onClick={() => {
              // Export template in Babel-compatible format
              if (!Component && isDynamicTemplate) {
                alert('Please switch to Code view and compile the template first');
                return;
              }
              const exportedCode = exportTemplateForBabel(template.name, Component);
              
              if (exportedCode) {
                const blob = new Blob([exportedCode], { type: 'text/typescript' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${template.name.replace(/\s+/g, '-').toLowerCase()}.tsx`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              } else {
                alert('Failed to export template');
              }
            }}
            title="Export Template as TSX (Original Source)"
          >
            📄 Export TSX
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
          
          {/* Page Checker Panel */}
          <PageChecker 
            pageElement={pages[selectedPage] || null}
            paperSize={documentInfo?.paperSize}
            pageIndex={selectedPage}
          />
        </div>
        
        {/* Center - Document Canvas or Code Editor */}
        <div className="viewer-canvas">
          {/* Always render both views but only show the active one */}
          <div style={{ display: viewMode === 'visual' ? 'flex' : 'none', height: '100%', flexDirection: 'column' }}>
            <div className="canvas-container" ref={canvasRef}>
              <div 
                className="document-wrapper"
                style={{ transform: `scale(${zoom / 100})` }}
                ref={documentRef}
              >
                <div className="document-shadow continuous-scroll" data-focus-mode={focusMode} data-selected-page={selectedPage}>
                  {(() => {
                    if (editableComponent) {
                      console.log('Using edited component');
                      console.log('editableComponent type:', typeof editableComponent);
                      console.log('editableComponent:', editableComponent);
                      
                      // If it's already a React element, just return it
                      if (editableComponent && typeof editableComponent === 'object' && (editableComponent as any).$$typeof) {
                        console.log('editableComponent is already a React element!');
                        return editableComponent as React.ReactElement;
                      }
                      
                      // Otherwise, render it as a component
                      const EditedComponent = editableComponent;
                      return <EditedComponent />;
                    } else if (Component) {
                      console.log('Using original component');
                      return <Component />;
                    } else if (isDynamicTemplate) {
                      // For dynamic templates without a compiled component yet
                      return <div style={{ padding: '20px', textAlign: 'center' }}>
                        <p>Loading dynamic template...</p>
                        <p style={{ fontSize: '14px', color: '#666' }}>Switch to Code view to see and compile the template.</p>
                      </div>;
                    }
                  })()}
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ display: viewMode === 'code' ? 'flex' : 'none', height: '100%', flexDirection: 'column' }}>
            <CodeEditor 
              documentComponent={Component}
              documentName={template.name || (Component && Component.name) || 'Document'}
              onCodeChange={(updatedComponent) => {
                console.log('onCodeChange received:', updatedComponent);
                console.log('Type:', typeof updatedComponent);
                setEditableComponent(updatedComponent);
              }}
              onCodeUpdate={(code) => {
                setEditorCode(code);
              }}
            />
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
        
        {/* Right Sidebar - AI Assistant and Layers */}
        <div className="sidebar sidebar-right">
          {/* AI Assistant Panel */}
          <AIAssistant 
            documentType={template?.type || 'document'}
            collapsed={aiPanelCollapsed}
            onToggleCollapse={() => setAiPanelCollapsed(!aiPanelCollapsed)}
            selectedPageIndex={selectedPage}
          />
          
          {/* Layers Panel - Hidden for now */}
          {/* <div className={`panel layers-panel-container ${layersPanelCollapsed ? 'collapsed' : ''}`}>
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
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default DocumentViewer;