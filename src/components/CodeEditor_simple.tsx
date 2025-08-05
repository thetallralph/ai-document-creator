import React, { useState, useEffect, useCallback, useRef } from 'react';
import Editor from '@monaco-editor/react';
import * as Babel from '@babel/standalone';
import { getDocumentSource } from '../utils/documentSourceExtractor';
import { useEditorCode } from '../contexts/EditorCodeContext';
import './CodeEditor.css';

interface CodeEditorProps {
  documentComponent: React.ComponentType | null;
  documentName?: string;
  onCodeChange?: (updatedComponent: React.ComponentType | null) => void;
  onCodeUpdate?: (code: string) => void;
  isVisible?: boolean;
}

// Declare window extensions
declare global {
  interface Window {
    React: typeof React;
    DocumentComponents?: { Document: React.ComponentType<any> };
    PageComponents?: { Page: React.ComponentType<any> };
  }
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ 
  documentName,
  onCodeChange,
  onCodeUpdate,
  isVisible = true 
}) => {
  const { editorCode, setEditorCode } = useEditorCode();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  
  // Only load source when document changes
  useEffect(() => {
    if (!documentName) return;
    
    const loadSource = async () => {
      setLoading(true);
      try {
        const source = await getDocumentSource(documentName);
        if (source) {
          setEditorCode(source);
          onCodeUpdate?.(source);
        }
      } catch (error) {
        console.error('Failed to load source:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadSource();
  }, [documentName, setEditorCode, onCodeUpdate]);
  
  // Manual compile function
  const compile = useCallback((code: string) => {
    if (!code) return;
    
    try {
      const codeWithoutImports = code.replace(/import\s+.*?from\s+['"].*?['"];?\s*/g, '');
      
      const transformed = Babel.transform(codeWithoutImports, {
        presets: ['react'],
        filename: 'component.tsx'
      });
      
      const finalCode = transformed.code?.replace(/export\s+(const|let|var|function)\s+/, '$1 ') || '';
      
      // Get component name
      const componentMatch = code.match(/export\s+(?:const|function)\s+(\w+)/);
      const componentName = componentMatch?.[1] || 'EditableDocument';
      
      const wrapperCode = `
        (function() {
          const React = window.React;
          const { Document } = window.DocumentComponents || {};
          const { Page } = window.PageComponents || {};
          ${finalCode}
          return ${componentName};
        })()
      `;
      
      // Set up globals temporarily
      window.React = React;
      window.DocumentComponents = { Document: require('../components/document-components/Document').Document };
      window.PageComponents = { Page: require('../components/document-components/Page').Page };
      
      const component = eval(wrapperCode);
      
      // Clean up globals
      delete (window as any).React;
      delete (window as any).DocumentComponents;
      delete (window as any).PageComponents;
      
      if (typeof component === 'function') {
        setError(null);
        onCodeChange?.(component);
      }
    } catch (err) {
      console.error('Compilation error:', err);
      setError(err instanceof Error ? err.message : 'Compilation failed');
      onCodeChange?.(null);
    }
  }, [onCodeChange]);
  
  // Handle code changes with debounce
  const handleChange = useCallback((value: string | undefined) => {
    if (!value) return;
    
    setEditorCode(value);
    onCodeUpdate?.(value);
    
    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    // Debounce compilation
    debounceTimer.current = setTimeout(() => {
      compile(value);
    }, 1000);
  }, [setEditorCode, onCodeUpdate, compile]);
  
  // Cleanup
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);
  
  if (loading) {
    return (
      <div className="code-editor">
        <div className="code-editor-loading">Loading...</div>
      </div>
    );
  }
  
  return (
    <div className="code-editor" style={{ display: isVisible ? 'flex' : 'none' }}>
      <div className="code-editor-header">
        <div className="code-editor-title">Code Editor</div>
        {error && <span className="status-error">Error</span>}
      </div>
      
      <div className="editor-container">
        <Editor
          height="100%"
          defaultLanguage="typescript"
          theme="vs-dark"
          value={editorCode || ''}
          onChange={handleChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on'
          }}
        />
      </div>
      
      {error && (
        <div className="code-editor-error">
          <div className="error-title">Error</div>
          <div className="error-message">{error}</div>
        </div>
      )}
    </div>
  );
};