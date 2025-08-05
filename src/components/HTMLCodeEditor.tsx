import React, { useState, useEffect, useCallback, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { htmlTemplateToReact } from '../utils/htmlToReact';
import { htmlTemplateService } from '../services/htmlTemplateService';
import { HTMLTemplate } from '../types/htmlTemplate';
import './CodeEditor.css';

interface HTMLCodeEditorProps {
  templateId?: string;
  initialTemplate?: HTMLTemplate;
  onPreviewUpdate?: (element: React.ReactElement | null, error?: string) => void;
  onTemplateUpdate?: (template: HTMLTemplate) => void;
  isVisible?: boolean;
  selectedPageIndex?: number;
}

export const HTMLCodeEditor: React.FC<HTMLCodeEditorProps> = ({ 
  templateId,
  initialTemplate,
  onPreviewUpdate, 
  onTemplateUpdate,
  isVisible = true,
  selectedPageIndex = 0
}) => {
  const [template, setTemplate] = useState<HTMLTemplate | null>(null);
  const [pageContent, setPageContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | null>(null);
  
  // Refs
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const hasInitialized = useRef(false);

  // Load template
  useEffect(() => {
    // Prioritize initialTemplate if provided (contains latest edits)
    if (initialTemplate) {
      setTemplate(initialTemplate);
    } else if (templateId) {
      const loadedTemplate = htmlTemplateService.getTemplate(templateId);
      if (loadedTemplate) {
        setTemplate(loadedTemplate);
      }
    } else {
      // Default template
      setTemplate({
        id: 'new-template',
        name: 'New Template',
        description: 'A new template',
        paperSize: 'A4',
        pages: [{
          background: '#ffffff',
          content: `<h1 style="font-size: 32px; margin: 20px;">Hello World</h1>
<p style="font-size: 16px; margin: 20px;">Start editing your HTML here.</p>`
        }]
      });
    }
  }, [templateId, initialTemplate]);

  // Update page content when template or page index changes
  useEffect(() => {
    if (template && template.pages[selectedPageIndex]) {
      setPageContent(template.pages[selectedPageIndex].content);
    }
  }, [template, selectedPageIndex]);

  const updatePreview = useCallback(() => {
    if (!template) {
      return;
    }
    
    setSaveStatus('saving');
    setError(null);
    
    try {
      // Convert HTML template to React
      const element = htmlTemplateToReact(template);
      
      setError(null);
      setSaveStatus('saved');
      
      if (onPreviewUpdate) {
        onPreviewUpdate(element, undefined);
      }
      
      // Clear save status after a delay
      setTimeout(() => setSaveStatus(null), 2000);
      
    } catch (err) {
      console.error('Preview error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Invalid HTML';
      setError(errorMessage);
      
      if (onPreviewUpdate) {
        onPreviewUpdate(null, errorMessage);
      }
    }
  }, [template, onPreviewUpdate]); // Remove updatePreview from dependencies

  const handleContentChange = useCallback((value: string | undefined) => {
    if (!value || !template) return;
    
    setPageContent(value);
    setSaveStatus('saving');
    
    // Update template with new content
    const updatedTemplate = {
      ...template,
      pages: template.pages.map((page, index) => 
        index === selectedPageIndex 
          ? { ...page, content: value }
          : page
      ),
      updatedAt: new Date()
    };
    
    setTemplate(updatedTemplate);
    
    // Notify parent of template update
    if (onTemplateUpdate) {
      onTemplateUpdate(updatedTemplate);
    }
    
    // Clear existing debounce timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    // Set new debounce timer
    debounceTimer.current = setTimeout(() => {
      updatePreview();
    }, 300); // Update preview after 300ms of no typing
  }, [template, selectedPageIndex, updatePreview, onTemplateUpdate]);

  // Initial preview when template is first loaded
  useEffect(() => {
    if (template && !hasInitialized.current) {
      hasInitialized.current = true;
      // Small delay to ensure everything is ready
      const timer = setTimeout(() => {
        updatePreview();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [template]); // Only depend on template, not updatePreview

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  // Format HTML for display
  // const formatHTML = (html: string): string => {
  //   // Basic formatting - in production you'd use a proper HTML formatter
  //   return html
  //     .replace(/></g, '>\n<')
  //     .replace(/(\s*style=")([^"]+)(")/g, (match, p1, p2, p3) => {
  //       // Format inline styles
  //       const formatted = p2.replace(/;\s*/g, ';\n    ');
  //       return `${p1}${formatted}${p3}`;
  //     });
  // };

  return (
    <div className="code-editor" style={{ display: isVisible ? 'flex' : 'none' }}>
      <div className="code-editor-header">
        <h3>HTML Editor</h3>
        <div className="code-editor-status">
          {saveStatus === 'saving' && <span className="code-saving">Updating...</span>}
          {saveStatus === 'saved' && <span className="code-saved">✓ Updated</span>}
          {error && <span className="code-error">Error: {error}</span>}
        </div>
      </div>
      
      <div className="editor-info" style={{ 
        padding: '10px', 
        backgroundColor: '#2a2a2a', 
        fontSize: '12px',
        borderBottom: '1px solid #444'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: '8px'
        }}>
          <div style={{ 
            fontSize: '14px', 
            fontWeight: 'bold', 
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span>Editing:</span>
            <span style={{
              background: '#667eea',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '13px'
            }}>
              Page {selectedPageIndex + 1}
            </span>
            {template && template.pages.length > 1 && (
              <span style={{ color: '#999', fontSize: '12px' }}>
                of {template.pages.length}
              </span>
            )}
          </div>
          {template && template.pages.length > 1 && (
            <div style={{ 
              fontSize: '11px', 
              color: '#888',
              fontStyle: 'italic'
            }}>
              Navigate pages using the sidebar
            </div>
          )}
        </div>
        <p style={{ margin: '0 0 5px 0', color: '#999' }}>
          Edit the HTML content for this page. The Document and Page wrappers are added automatically.
        </p>
        <p style={{ margin: 0, color: '#999' }}>
          Use inline styles like: <code style={{ color: '#e06c75' }}>style="font-size: 24px; color: #333;"</code>
        </p>
      </div>
      
      <Editor
        height="100%"
        defaultLanguage="html"
        theme="vs-dark"
        value={pageContent}
        onChange={handleContentChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          formatOnPaste: true
        }}
      />
    </div>
  );
};