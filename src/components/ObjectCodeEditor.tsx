import React, { useState, useEffect, useCallback, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { createElement, validateElementTree } from '../utils/createElement';
import { objectTemplateService } from '../services/objectTemplateService';
import './CodeEditor.css';

interface ObjectCodeEditorProps {
  templateId?: string;
  initialCode?: string;
  onPreviewUpdate?: (element: React.ReactElement | null, error?: string) => void;
  onCodeUpdate?: (code: string) => void;
  isVisible?: boolean;
}

export const ObjectCodeEditor: React.FC<ObjectCodeEditorProps> = ({ 
  templateId,
  initialCode,
  onPreviewUpdate, 
  onCodeUpdate,
  isVisible = true 
}) => {
  const [code, setCode] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | null>(null);
  // const [isCompiling, setIsCompiling] = useState(false);
  
  // Refs
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const isCompilingRef = useRef(false);
  const hasInitializedRef = useRef(false);

  // Load template or initial code
  useEffect(() => {
    if (templateId) {
      const template = objectTemplateService.getTemplate(templateId);
      if (template) {
        // Convert template to editable code
        const templateCode = `{
  id: "${template.id}",
  name: "${template.name}",
  description: "${template.description}",
  render: ${template.render.toString()}
}`;
        setCode(templateCode);
      }
    } else if (initialCode) {
      setCode(initialCode);
    } else {
      // Default template
      setCode(`{
  id: "new-template",
  name: "New Template",
  description: "A new template",
  render: () => ({
    type: "Document",
    props: {
      title: "New Document",
      paperSize: "A4"
    },
    children: [{
      type: "Page",
      props: {
        background: "#ffffff"
      },
      children: [
        {
          type: "h1",
          props: {
            style: {
              fontSize: 32,
              margin: "20px"
            }
          },
          children: ["Hello World"]
        }
      ]
    }]
  })
}`);
    }
  }, [templateId, initialCode]);

  const compileCode = useCallback(async (value: string) => {
    if (!value || isCompilingRef.current) {
      return;
    }
    
    isCompilingRef.current = true;
    // setIsCompiling(true);
    setError(null);
    
    try {
      // Evaluate the template object
      const templateFunction = new Function('return ' + value);
      const templateObject = templateFunction();
      
      if (!templateObject || typeof templateObject !== 'object') {
        throw new Error('Code must return an object');
      }
      
      if (typeof templateObject.render !== 'function') {
        throw new Error('Template must have a render function');
      }
      
      // Get the rendered element tree
      const elementTree = templateObject.render();
      
      // Validate the element tree
      const validation = validateElementTree(elementTree);
      if (!validation.valid) {
        throw new Error(validation.error || 'Invalid element tree');
      }
      
      // Create React elements
      const element = createElement(elementTree);
      
      setError(null);
      setSaveStatus('saved');
      
      if (onPreviewUpdate) {
        onPreviewUpdate(element as React.ReactElement, undefined);
      }
      
      // Clear save status after a delay
      setTimeout(() => setSaveStatus(null), 2000);
      
    } catch (err) {
      console.error('Compilation error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Invalid code';
      setError(errorMessage);
      
      if (onPreviewUpdate) {
        onPreviewUpdate(null, errorMessage);
      }
    } finally {
      isCompilingRef.current = false;
      // setIsCompiling(false);
    }
  }, [onPreviewUpdate]); // Remove isCompiling from dependencies

  const handleCodeChange = useCallback((value: string | undefined) => {
    if (!value) return;
    
    setCode(value);
    setSaveStatus('saving');
    
    // Notify parent of code update
    if (onCodeUpdate) {
      onCodeUpdate(value);
    }
    
    // Clear existing debounce timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    // Set new debounce timer
    debounceTimer.current = setTimeout(() => {
      compileCode(value);
    }, 1000); // Compile after 1 second of no typing
  }, [compileCode, onCodeUpdate]);

  // Initial compile only once when code is first set
  useEffect(() => {
    if (code && !hasInitializedRef.current) {
      hasInitializedRef.current = true;
      // Delay initial compile to ensure editor is ready
      const timer = setTimeout(() => {
        compileCode(code);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [code, compileCode]);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return (
    <div className="code-editor" style={{ display: isVisible ? 'flex' : 'none' }}>
      <div className="code-editor-header">
        <h3>Code Editor (Object Literal)</h3>
        <div className="code-editor-status">
          {saveStatus === 'saving' && <span className="code-saving">Compiling...</span>}
          {saveStatus === 'saved' && <span className="code-saved">✓ Applied</span>}
          {error && <span className="code-error">Error: {error}</span>}
        </div>
      </div>
      
      <Editor
        height="100%"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={code}
        onChange={handleCodeChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          formatOnPaste: true,
          formatOnType: true
        }}
      />
    </div>
  );
};