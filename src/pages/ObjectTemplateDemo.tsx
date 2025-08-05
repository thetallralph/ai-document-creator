import React, { useState } from 'react';
import { ObjectCodeEditor } from '../components/ObjectCodeEditor';
import { registerBuiltInTemplates } from '../templates/object-templates';
import { objectTemplateService } from '../services/objectTemplateService';
import './ObjectTemplateDemo.css';

// Register templates on module load
registerBuiltInTemplates();

export const ObjectTemplateDemo: React.FC = () => {
  const [previewElement, setPreviewElement] = useState<React.ReactElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'split' | 'code' | 'preview'>('split');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('simple-flyer');

  const templates = objectTemplateService.getAllTemplateMetadata();

  return (
    <div className="object-template-demo">
      <div className="demo-toolbar">
        <h1>Object Template Demo</h1>
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
            <ObjectCodeEditor
              key={selectedTemplateId} // Force remount on template change
              templateId={selectedTemplateId}
              onPreviewUpdate={(element, error) => {
                setPreviewElement(element);
                setError(error || null);
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