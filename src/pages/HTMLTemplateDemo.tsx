import React, { useState, useEffect } from 'react';
import { HTMLCodeEditor } from '../components/HTMLCodeEditor';
import { registerBuiltInHTMLTemplates } from '../templates/html-templates';
import { htmlTemplateService } from '../services/htmlTemplateService';
import { HTMLTemplate } from '../types/htmlTemplate';
import './ObjectTemplateDemo.css';

// Register templates on module load
registerBuiltInHTMLTemplates();

export const HTMLTemplateDemo: React.FC = () => {
  const [previewElement, setPreviewElement] = useState<React.ReactElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'split' | 'code' | 'preview'>('split');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('simple-flyer-html');
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [currentTemplate, setCurrentTemplate] = useState<HTMLTemplate | null>(null);

  const templates = htmlTemplateService.getAllTemplateMetadata();

  // Load initial template
  useEffect(() => {
    const template = htmlTemplateService.getTemplate(selectedTemplateId);
    if (template) {
      setCurrentTemplate(template);
      setCurrentPageIndex(0);
    }
  }, [selectedTemplateId]);

  const handleSaveTemplate = () => {
    if (currentTemplate) {
      if (currentTemplate.id.startsWith('custom-html-')) {
        // Update existing custom template
        htmlTemplateService.updateCustomTemplate(currentTemplate.id, currentTemplate);
        alert('Template updated!');
      } else {
        // Save as new custom template
        const newId = htmlTemplateService.saveCustomTemplate({
          ...currentTemplate,
          name: `${currentTemplate.name} (Copy)`,
          description: `Copy of ${currentTemplate.description}`
        });
        setSelectedTemplateId(newId);
        alert('Template saved as new custom template!');
      }
    }
  };

  return (
    <div className="object-template-demo">
      <div className="demo-toolbar">
        <h1>HTML Template Demo</h1>
        <div className="toolbar-controls">
          <select 
            value={selectedTemplateId} 
            onChange={(e) => setSelectedTemplateId(e.target.value)}
            className="template-selector"
          >
            {templates.map(template => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
          
          {currentTemplate && currentTemplate.pages.length > 1 && (
            <div className="page-selector" style={{ marginLeft: '20px' }}>
              <label>Page: </label>
              <select 
                value={currentPageIndex} 
                onChange={(e) => setCurrentPageIndex(Number(e.target.value))}
              >
                {currentTemplate.pages.map((_, index) => (
                  <option key={index} value={index}>
                    Page {index + 1}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          <button 
            onClick={handleSaveTemplate}
            style={{
              marginLeft: '20px',
              padding: '8px 16px',
              backgroundColor: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Save Template
          </button>
          
          <div className="view-mode-buttons">
            <button 
              className={viewMode === 'split' ? 'active' : ''}
              onClick={() => setViewMode('split')}
            >
              Split View
            </button>
            <button 
              className={viewMode === 'code' ? 'active' : ''}
              onClick={() => setViewMode('code')}
            >
              Code Only
            </button>
            <button 
              className={viewMode === 'preview' ? 'active' : ''}
              onClick={() => setViewMode('preview')}
            >
              Preview Only
            </button>
          </div>
        </div>
      </div>

      <div className={`demo-content view-${viewMode}`}>
        {viewMode !== 'preview' && (
          <div className="editor-panel">
            <HTMLCodeEditor
              key={`${selectedTemplateId}-${currentPageIndex}`} // Force remount on template/page change
              templateId={selectedTemplateId}
              selectedPageIndex={currentPageIndex}
              onPreviewUpdate={(element, error) => {
                setPreviewElement(element);
                setError(error || null);
              }}
              onTemplateUpdate={(template) => {
                setCurrentTemplate(template);
              }}
              isVisible={true}
            />
          </div>
        )}
        
        {viewMode !== 'code' && (
          <div className="preview-panel">
            <div className="preview-header">
              <h3>Preview</h3>
              {error && <span className="preview-error">Error in template</span>}
            </div>
            <div className="preview-content">
              {error ? (
                <div className="error-display">
                  <h3>Template Error</h3>
                  <pre>{error}</pre>
                </div>
              ) : previewElement ? (
                <div className="document-preview">
                  {previewElement}
                </div>
              ) : (
                <div className="loading-display">
                  <p>Loading preview...</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};