import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HTMLCodeEditor } from './HTMLCodeEditor';
import { htmlTemplateToReact } from '../utils/htmlToReact';
import { htmlTemplateService } from '../services/htmlTemplateService';
import { registerBuiltInHTMLTemplates } from '../templates/html-templates';
import { HTMLTemplate } from '../types/htmlTemplate';
import { ProfileButton } from './ProfileButton';
import { HTMLAIAssistant } from './HTMLAIAssistant';
import './DocumentViewer.css';

// Register templates on module load
registerBuiltInHTMLTemplates();

interface HTMLDocumentViewerProps {
  templateId?: string;
}

const HTMLDocumentViewer: React.FC<HTMLDocumentViewerProps> = ({ templateId: propTemplateId }) => {
  const { documentName } = useParams<{ documentName?: string }>();
  const [zoom, setZoom] = useState(75);
  const [viewMode, setViewMode] = useState<'visual' | 'code'>('visual');
  const [previewElement, setPreviewElement] = useState<React.ReactElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentTemplate, setCurrentTemplate] = useState<HTMLTemplate | null>(null);
  const [selectedPageIndex, setSelectedPageIndex] = useState(0);
  const [aiPanelCollapsed, setAiPanelCollapsed] = useState(false);
  const documentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Get template ID from props or URL
  const templateId = propTemplateId || documentName || 'test-template-html';

  // Load template
  useEffect(() => {
    const template = htmlTemplateService.getTemplate(templateId);
    if (template) {
      setCurrentTemplate(template);
      setSelectedPageIndex(0);
      
      // Generate initial preview
      try {
        const element = htmlTemplateToReact(template);
        setPreviewElement(element);
      } catch (err) {
        console.error('Error generating preview:', err);
        setError(err instanceof Error ? err.message : 'Failed to render template');
      }
    }
  }, [templateId]);

  const handlePrint = () => {
    window.print();
  };

  const handleSaveTemplate = () => {
    if (currentTemplate) {
      if (currentTemplate.id.startsWith('custom-html-')) {
        htmlTemplateService.updateCustomTemplate(currentTemplate.id, currentTemplate);
        alert('Template updated!');
      } else {
        const newId = htmlTemplateService.saveCustomTemplate({
          ...currentTemplate,
          name: `${currentTemplate.name} (Copy)`,
          description: `Copy of ${currentTemplate.description}`
        });
        alert(`Template saved with ID: ${newId}`);
      }
    }
  };

  if (!currentTemplate) {
    return (
      <div className="document-viewer-error">
        <h2>Template not found</h2>
        <p>The template "{templateId}" could not be found.</p>
        <Link to="/">← Back to documents</Link>
      </div>
    );
  }

  return (
    <div className="document-viewer-container">
      {/* Top Toolbar */}
      <div className="viewer-toolbar">
        <Link to="/" className="back-button">← Pagayi</Link>
        <div className="document-title">
          {currentTemplate.name}
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
            onClick={handlePrint}
            title="Print Document"
          >
            🖨️ Print
          </button>
          <button 
            className="export-button"
            onClick={handleSaveTemplate}
            title="Save Template"
          >
            💾 Save
          </button>
          
          <div className="toolbar-separator" />
          
          <ProfileButton />
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
                <div className="property-value">{currentTemplate.name}</div>
              </div>
              <div className="property-group">
                <label>Pages</label>
                <div className="property-value">{currentTemplate.pages.length}</div>
              </div>
              <div className="property-group">
                <label>Paper Size</label>
                <div className="property-value">{currentTemplate.paperSize || 'A4'}</div>
              </div>
              <div className="property-group">
                <label>Description</label>
                <div className="property-value small">{currentTemplate.description}</div>
              </div>
            </div>
          </div>
          
          {/* Pages Panel */}
          <div className="panel">
            <div className="panel-header">
              <h3>Pages</h3>
            </div>
            <div className="panel-content pages-list">
              {currentTemplate.pages.map((_, index) => (
                <div 
                  key={index}
                  className={`page-list-item ${selectedPageIndex === index ? 'selected' : ''}`}
                  onClick={() => setSelectedPageIndex(index)}
                >
                  <span className="page-number">Page {index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Center - Document Canvas or Code Editor */}
        <div className="viewer-canvas">
          <div style={{ display: viewMode === 'visual' ? 'flex' : 'none', height: '100%', flexDirection: 'column' }}>
            <div className="canvas-container" ref={canvasRef}>
              <div 
                className="document-wrapper"
                style={{ transform: `scale(${zoom / 100})` }}
                ref={documentRef}
              >
                <div className="document-shadow continuous-scroll">
                  {error ? (
                    <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
                      <p>Error rendering template</p>
                      <p style={{ fontSize: '14px' }}>{error}</p>
                    </div>
                  ) : previewElement ? (
                    previewElement
                  ) : (
                    <div style={{ padding: '20px', textAlign: 'center' }}>
                      <p>Loading template...</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <HTMLCodeEditor
            templateId={currentTemplate.id}
            selectedPageIndex={selectedPageIndex}
            onPreviewUpdate={(element, err) => {
              setPreviewElement(element);
              setError(err || null);
            }}
            onTemplateUpdate={(template) => {
              setCurrentTemplate(template);
            }}
            isVisible={viewMode === 'code'}
          />
          
          {/* Page Navigation */}
          {currentTemplate.pages.length > 1 && (
            <div className="page-navigation">
              <button 
                onClick={() => setSelectedPageIndex(Math.max(0, selectedPageIndex - 1))}
                disabled={selectedPageIndex === 0}
              >
                Previous
              </button>
              <span className="page-info">
                Page {selectedPageIndex + 1} of {currentTemplate.pages.length}
              </span>
              <button 
                onClick={() => setSelectedPageIndex(Math.min(currentTemplate.pages.length - 1, selectedPageIndex + 1))}
                disabled={selectedPageIndex === currentTemplate.pages.length - 1}
              >
                Next
              </button>
            </div>
          )}
        </div>
        
        {/* Right Sidebar - AI Assistant */}
        <div className="sidebar sidebar-right">
          <HTMLAIAssistant
            template={currentTemplate}
            selectedPageIndex={selectedPageIndex}
            onTemplateUpdate={(updatedTemplate) => {
              setCurrentTemplate(updatedTemplate);
              // Regenerate preview
              try {
                const element = htmlTemplateToReact(updatedTemplate);
                setPreviewElement(element);
                setError(null);
              } catch (err) {
                console.error('Error regenerating preview:', err);
                setError(err instanceof Error ? err.message : 'Failed to render template');
              }
            }}
            collapsed={aiPanelCollapsed}
            onToggleCollapse={() => setAiPanelCollapsed(!aiPanelCollapsed)}
          />
        </div>
      </div>
    </div>
  );
};

export default HTMLDocumentViewer;