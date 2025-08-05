import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { htmlTemplateService } from '../services/htmlTemplateService';
import { registerBuiltInHTMLTemplates } from '../templates/html-templates';
import { htmlTemplateToReact } from '../utils/htmlToReact';
import { HTMLTemplate } from '../types/htmlTemplate';
import { PAPER_SIZES } from '../config/paperSizes';
import { preparePrintStyles, cleanupPrintStyles } from '../utils/printUtils';
// import { useTemplates } from '../contexts/TemplateContext';
import { useEditorCode } from '../contexts/EditorCodeContext';
import PageChecker from './PageChecker';
import { HTMLCodeEditor } from './HTMLCodeEditor';
import { HTMLAIAssistant } from './HTMLAIAssistant';
import { ProfileButton } from './ProfileButton';
import './DocumentViewer.css';

// Register HTML templates
registerBuiltInHTMLTemplates();

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
  const [currentHTMLTemplate, setCurrentHTMLTemplate] = useState<HTMLTemplate | null>(null);
  const [compilationError, setCompilationError] = useState<string | null>(null);
  const scrollToPageRef = useRef<((pageIndex: number) => void) | null>(null);
  const previousDocumentNameRef = useRef<string | undefined>(documentName);
  // const { getDynamicTemplate } = useTemplates();
  const { setEditorCode } = useEditorCode();
  
  // Create a template object that mimics the old structure
  let template: any = null;
  if (documentName) {
    const htmlTemplate = htmlTemplateService.getTemplate(documentName);
    if (htmlTemplate) {
      // Create a wrapper component that renders the HTML template
      const TemplateComponent = () => {
        try {
          // Use currentHTMLTemplate if available (which includes edits), otherwise use the original
          const templateToRender = currentHTMLTemplate || htmlTemplate;
          return htmlTemplateToReact(templateToRender);
        } catch (error) {
          console.error('Error rendering template:', error);
          return <div>Error rendering template</div>;
        }
      };
      
      template = {
        name: htmlTemplate.name,
        description: htmlTemplate.description,
        component: TemplateComponent
      };
      
      // Store the HTML template for later use
      if (currentHTMLTemplate?.id !== htmlTemplate.id) {
        setCurrentHTMLTemplate(htmlTemplate);
      }
    }
  }
  
  // Reset editable component when switching documents
  useEffect(() => {
    // Only reset if we're actually changing documents
    if (documentName !== previousDocumentNameRef.current) {
      // Clear the editable component since we're switching documents
      setEditableComponent(null);
      previousDocumentNameRef.current = documentName;
    }
    // Don't clear editor code here - let CodeEditor manage its own state
  }, [documentName]);
  

  // Load HTML content when template is available
  useEffect(() => {
    if (currentHTMLTemplate) {
      // For HTML templates, we just set the HTML content of the current page
      const currentPageContent = currentHTMLTemplate.pages[selectedPage]?.content || '';
      setEditorCode(currentPageContent);
      
      // Update the editable component with the latest template changes
      try {
        const updatedElement = htmlTemplateToReact(currentHTMLTemplate);
        const UpdatedComponent = () => updatedElement;
        setEditableComponent(UpdatedComponent);
      } catch (error) {
        console.error('Error updating editable component:', error);
        setEditableComponent(null);
      }
    }
  }, [currentHTMLTemplate, selectedPage, setEditorCode]);
  
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
  
  // Reset editable component when switching to code view
  useEffect(() => {
    if (viewMode === 'code') {
      setEditableComponent(null);
      setCompilationError(null);
    }
  }, [viewMode]);
  
  useEffect(() => {
    const updatePages = () => {
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
    };
    
    // Initial update
    updatePages();
    
    // Update after a small delay to ensure DOM is ready
    const timer = setTimeout(updatePages, 100);
    
    return () => clearTimeout(timer);
  }, [selectedPage, editableComponent, currentHTMLTemplate]);
  
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
  const Component = template?.component;
  // const isDynamicTemplate = template && 'code' in template && !template.component;
  
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
        <Link to="/" className="back-button">← Pagayi</Link>
        <div className="document-title">
          {template?.name || 'Loading...'}
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
              if (currentHTMLTemplate) {
                const blob = new Blob([JSON.stringify(currentHTMLTemplate, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${currentHTMLTemplate.name.replace(/\s+/g, '-').toLowerCase()}.json`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              } else {
                alert('No template to export');
              }
            }}
            title="Export Template as JSON"
          >
            💾 Export JSON
          </button>
          <button 
            className="export-button"
            onClick={() => {
              if (currentHTMLTemplate) {
                // Export as HTML file
                let htmlContent = '<!DOCTYPE html>\n<html>\n<head>\n<title>' + currentHTMLTemplate.name + '</title>\n</head>\n<body>\n';
                currentHTMLTemplate.pages.forEach((page, index) => {
                  htmlContent += `<!-- Page ${index + 1} -->\n`;
                  htmlContent += `<div style="background: ${page.background || '#ffffff'}; padding: 20px; margin-bottom: 20px;">\n`;
                  htmlContent += page.content;
                  htmlContent += '\n</div>\n';
                });
                htmlContent += '</body>\n</html>';
                
                const blob = new Blob([htmlContent], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${currentHTMLTemplate.name.replace(/\s+/g, '-').toLowerCase()}.html`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              } else {
                alert('No template to export');
              }
            }}
            title="Export Template as HTML"
          >
            📄 Export HTML
          </button>
          
          <div className="toolbar-separator" />
          
          <ProfileButton />
        </div>
      </div>
      
      <div className="viewer-main" data-view-mode={viewMode}>
        {/* Left Sidebar - Document Properties */}
        <div className="sidebar sidebar-left">
          <div className="panel">
            <div className="panel-header">
              <h3>Document</h3>
            </div>
            <div className="panel-content">
              <div className="property-group">
                <label>Name</label>
                <div className="property-value">{template?.name || 'Loading...'}</div>
              </div>
              <div className="property-group">
                <label>Type</label>
                <div className="property-value">
                  {template?.name?.includes('Catalog') ? 'Booklet' : 'Flyer'}
                </div>
              </div>
              <div className="property-group">
                <label>Pages</label>
                <div className="property-value">{currentHTMLTemplate?.pages.length || pages.length || 1}</div>
              </div>
              <div className="property-group">
                <label>Paper Size</label>
                <div className="property-value">
                  {currentHTMLTemplate?.paperSize ? PAPER_SIZES[currentHTMLTemplate.paperSize]?.displayName || currentHTMLTemplate.paperSize : 'A4'}
                </div>
              </div>
              <div className="property-group">
                <label>Description</label>
                <div className="property-value small">{template?.description || ''}</div>
              </div>
            </div>
          </div>
          
          {/* Pages Panel */}
          <div className="panel">
            <div className="panel-header">
              <h3>Pages</h3>
            </div>
            <div className="panel-content pages-list">
              {(currentHTMLTemplate?.pages || pages).map((_, index) => (
                <div 
                  key={index}
                  className={`page-list-item ${selectedPage === index ? 'selected' : ''} ${visiblePage === index ? 'visible' : ''}`}
                  onClick={() => {
                    setSelectedPage(index);
                    scrollToPage(index);
                  }}
                  title={
                    viewMode === 'code' && selectedPage === index 
                      ? 'Currently editing this page' 
                      : `Click to ${viewMode === 'code' ? 'edit' : 'view'} page ${index + 1}`
                  }
                >
                  <span className="page-number">Page {index + 1}</span>
                  <div className="page-indicators">
                    {visiblePage === index && <span className="visible-indicator" title="Currently viewing">👁️</span>}
                    {viewMode === 'code' && selectedPage === index && <span className="editing-indicator" title="Currently editing">✏️</span>}
                  </div>
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
                    try {
                      // In code view, show the component compiled from CodeEditor
                      if (viewMode === 'code' && editableComponent) {
                        // Check if it's already a React element
                        if (React.isValidElement(editableComponent)) {
                          return editableComponent;
                        }
                        // Otherwise, render it as a component
                        const EditedComponent = editableComponent;
                        return <EditedComponent key={`edited-${documentName}`} />;
                      }
                      
                      // Show error state if compilation failed in code view
                      if (viewMode === 'code' && compilationError) {
                        return (
                          <div style={{ 
                            padding: '40px', 
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '400px',
                            backgroundColor: '#fee',
                            border: '1px solid #fcc',
                            borderRadius: '8px',
                            margin: '20px'
                          }}>
                            <div style={{
                              fontSize: '48px',
                              color: '#f44',
                              marginBottom: '20px'
                            }}>⚠️</div>
                            <h3 style={{ fontSize: '20px', color: '#f44', marginBottom: '10px' }}>
                              Compilation Error
                            </h3>
                            <p style={{ 
                              fontSize: '14px', 
                              color: '#666',
                              maxWidth: '600px',
                              lineHeight: '1.5',
                              fontFamily: 'monospace',
                              backgroundColor: '#fff',
                              padding: '15px',
                              borderRadius: '4px',
                              border: '1px solid #ddd'
                            }}>
                              {compilationError}
                            </p>
                          </div>
                        );
                      }
                      
                      // Show loading state while CodeEditor compiles (only in code view)
                      if (viewMode === 'code') {
                        return (
                        <div style={{ 
                          padding: '40px', 
                          textAlign: 'center',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minHeight: '400px'
                        }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            border: '3px solid #f3f3f3',
                            borderTop: '3px solid #3498db',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            marginBottom: '20px'
                          }} />
                          <p style={{ fontSize: '16px', color: '#666' }}>Loading template...</p>
                        </div>
                        );
                      }
                      
                      // In visual mode, show the updated component if available, otherwise the original
                      if (editableComponent) {
                        // Check if it's already a React element
                        if (React.isValidElement(editableComponent)) {
                          return editableComponent;
                        }
                        // Otherwise, render it as a component
                        const EditedComponent = editableComponent;
                        return <EditedComponent key={`edited-visual-${documentName}`} />;
                      } else if (Component) {
                        return <Component key={`template-${documentName}`} />;
                      }
                      
                      // Fallback if no component
                      return <div>No template found</div>;
                    } catch (error) {
                      console.error('Error rendering template:', error);
                      return <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
                        <p>Error rendering template</p>
                        <p style={{ fontSize: '14px' }}>{(error as Error)?.message || 'Unknown error'}</p>
                      </div>;
                    }
                  })()}
                </div>
              </div>
            </div>
          </div>
          
          <HTMLCodeEditor 
            templateId={currentHTMLTemplate?.id}
            initialTemplate={currentHTMLTemplate || undefined}
            selectedPageIndex={selectedPage}
            onPreviewUpdate={(element, error) => {
              if (element) {
                // Update the component for display
                const UpdatedComponent = () => element;
                setEditableComponent(UpdatedComponent);
              } else {
                setEditableComponent(null);
              }
              setCompilationError(error || null);
            }}
            onTemplateUpdate={(updatedTemplate) => {
              setCurrentHTMLTemplate(updatedTemplate);
            }}
            isVisible={viewMode === 'code'}
          />
          
          {/* Page Navigation */}
          {(currentHTMLTemplate?.pages.length || pages.length) > 1 && (
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
                Page {selectedPage + 1} of {currentHTMLTemplate?.pages.length || pages.length}
              </span>
              <button 
                onClick={() => {
                  const pageCount = currentHTMLTemplate?.pages.length || pages.length;
                  const newPage = Math.min(pageCount - 1, selectedPage + 1);
                  setSelectedPage(newPage);
                  scrollToPage(newPage);
                }}
                disabled={selectedPage === (currentHTMLTemplate?.pages.length || pages.length) - 1}
              >
                Next
              </button>
            </div>
          )}
          
          {/* Floating Focus Button */}
          {(currentHTMLTemplate?.pages.length || pages.length) > 1 && (
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
          {currentHTMLTemplate && (
            <HTMLAIAssistant 
              template={currentHTMLTemplate}
              selectedPageIndex={selectedPage}
              onTemplateUpdate={(updatedTemplate) => {
                setCurrentHTMLTemplate(updatedTemplate);
                // Update the preview
                try {
                  const element = htmlTemplateToReact(updatedTemplate);
                  const UpdatedComponent = () => element;
                  setEditableComponent(UpdatedComponent);
                  setCompilationError(null);
                } catch (error) {
                  console.error('Error updating preview:', error);
                  setCompilationError(error instanceof Error ? error.message : 'Failed to render template');
                }
              }}
              collapsed={aiPanelCollapsed}
              onToggleCollapse={() => setAiPanelCollapsed(!aiPanelCollapsed)}
            />
          )}
          
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