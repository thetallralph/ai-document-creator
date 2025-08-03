import React, { useState, useEffect, useCallback, useRef } from 'react';
import Editor from '@monaco-editor/react';
import * as Babel from '@babel/standalone';
import { getDocumentSource } from '../utils/documentSourceExtractor';
import { useEditorCode } from '../contexts/EditorCodeContext';
import './CodeEditor.css';

interface CodeEditorProps {
  documentComponent: React.ComponentType;
  documentName?: string;
  onCodeChange?: (updatedComponent: React.ComponentType | null) => void;
  onCodeUpdate?: (code: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ documentComponent, documentName, onCodeChange, onCodeUpdate }) => {
  const { editorCode, setEditorCode } = useEditorCode();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [hasUserEdits, setHasUserEdits] = useState(false);

  // Reset edits when document changes
  useEffect(() => {
    setHasUserEdits(false);
  }, [documentName]);

  // Track the last code set by user to detect external changes
  const lastUserCodeRef = useRef<string>('');
  
  // Debounce timer ref
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  
  // Ref to track previous editor code for change detection
  const previousEditorCodeRef = useRef<string | null>(null);
  
  // Flag to prevent compilation loops
  const isInitialLoadRef = useRef(true);

  const compileCode = useCallback(async (value: string) => {
    if (isCompiling) {
      return;
    }
    
    setIsCompiling(true);
    
    try {
      // Import the required components
      const DocumentModule = await import('../components/document-components/Document');
      const PageModule = await import('../components/document-components/Page');
      const Document = DocumentModule.Document;
      const Page = PageModule.Page;
      
      console.log('Document component:', Document);
      console.log('Page component:', Page);
      
      // Extract the component name from the code
      const componentNameMatch = value.match(/export\s+(?:const|function)\s+(\w+)/);
      const componentName = componentNameMatch ? componentNameMatch[1] : 'EditableDocument';
      
      // Simple approach: just remove imports and transform
      const codeToTransform = value
        .replace(/import\s+.*?from\s+['"].*?['"];?\s*/g, ''); // Remove imports
      
      // Transform JSX using Babel
      const transformed = Babel.transform(codeToTransform, {
        presets: ['react'],
        filename: 'component.tsx',
        plugins: []
      });
      
      // Remove export from transformed code
      let finalCode = transformed.code || '';
      finalCode = finalCode.replace(/export\s+(const|let|var|function)\s+/, '$1 ');
      
      console.log('Original code (first 300 chars):', codeToTransform.substring(0, 300));
      console.log('Final code (first 300 chars):', finalCode.substring(0, 300));
      
      // Wrap in a function that creates and returns the component
      const wrapperCode = `
        (function(React, Document, Page) {
          ${finalCode}
          
          // Find and return the component
          if (typeof ${componentName} === 'function') {
            return ${componentName};
          }
          
          throw new Error('Component ${componentName} not found or not a function');
        })
      `;
      
      // Use eval to execute the transformed code
      // eslint-disable-next-line no-eval
      const componentFactory = eval(wrapperCode);
      const component = componentFactory(React, Document, Page);
      
      console.log('Compiled component type:', typeof component);
      console.log('Component:', component);
      
      if (typeof component === 'function') {
        setError(null);
        setSaveStatus('saved');
        if (onCodeChange) {
          // Pass the component directly - it already has Document and Page in its closure
          onCodeChange(component);
        }
        // Clear save status after a delay
        setTimeout(() => setSaveStatus(null), 2000);
      } else {
        throw new Error('Component must be a function, got: ' + typeof component);
      }
    } catch (err) {
      console.error('Compilation error:', err);
      setError(err instanceof Error ? err.message : 'Invalid code');
      if (onCodeChange) {
        onCodeChange(null);
      }
    } finally {
      setIsCompiling(false);
    }
  }, [isCompiling, onCodeChange]);

  useEffect(() => {
    // Don't reload source if user has made edits or if editor code is already loaded
    if (hasUserEdits || editorCode) {
      setLoading(false);
      return;
    }
    
    const loadDocumentSource = async () => {
      setLoading(true);
      
      // Try to get the component name from the function
      const componentName = documentName || documentComponent.name || 'EditableDocument';
      
      // Try to load the actual source
      const source = await getDocumentSource(componentName);
      
      if (source) {
        setEditorCode(source);
        previousEditorCodeRef.current = source; // Track initial load
        lastUserCodeRef.current = source; // This is not a user edit
        // Notify parent of initial code
        if (onCodeUpdate) {
          onCodeUpdate(source);
        }
        // Compile the initial code
        compileCode(source);
      } else {
        // Fallback to a basic template
        const template = `import { Document, Page } from '../../components/document-components';

export const ${componentName} = () => {
  return (
    <Document title="${componentName.replace(/([A-Z])/g, ' $1').trim()}" type="document" paperSize="A4">
      <Page background="#ffffff">
        <h1 style={{ position: 'absolute', top: 50, left: 50, fontSize: '32px' }}>
          ${componentName.replace(/([A-Z])/g, ' $1').trim()}
        </h1>
        <p style={{ position: 'absolute', top: 120, left: 50, fontSize: '16px' }}>
          Edit this code to modify the document.
        </p>
      </Page>
    </Document>
  );
};`;
        setEditorCode(template);
        previousEditorCodeRef.current = template; // Track initial load
        lastUserCodeRef.current = template; // This is not a user edit
        // Notify parent of fallback template
        if (onCodeUpdate) {
          onCodeUpdate(template);
        }
        // Compile the fallback template
        compileCode(template);
      }
      
      setLoading(false);
    };
    
    loadDocumentSource();
  }, [documentComponent, documentName, hasUserEdits, editorCode, setEditorCode, onCodeUpdate, compileCode]);

  // Detect when editor code changes from external source (AI)
  useEffect(() => {
    // Skip on initial load
    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;
      previousEditorCodeRef.current = editorCode;
      return;
    }
    
    // Only compile if:
    // 1. We have editor code
    // 2. It's different from the previous value
    // 3. It's not a user edit (lastUserCodeRef would be the same)
    if (editorCode && 
        editorCode !== previousEditorCodeRef.current && 
        editorCode !== lastUserCodeRef.current) {
      // Code changed externally (by AI)
      console.log('External code change detected (AI)');
      previousEditorCodeRef.current = editorCode;
      setHasUserEdits(false);
      setSaveStatus('saving');
      compileCode(editorCode);
      setTimeout(() => setSaveStatus('saved'), 500);
    }
  }, [editorCode, compileCode]);

  const handleCodeChange = useCallback((value: string | undefined) => {
    if (!value) return;
    
    console.log('User code change');
    lastUserCodeRef.current = value; // Track this as user-initiated change
    previousEditorCodeRef.current = value; // Update previous ref to prevent re-trigger
    setEditorCode(value);
    setHasUserEdits(true); // Mark that user has made edits
    setSaveStatus('saving');
    
    // Notify parent component of code update
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
  }, [compileCode, onCodeUpdate, setEditorCode]);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return (
    <div className="code-editor">
      <div className="code-editor-header">
        <h3>Code Editor</h3>
        <div className="code-editor-status">
          {saveStatus === 'saving' && <span className="code-saving">Compiling...</span>}
          {saveStatus === 'saved' && <span className="code-saved">✓ Applied</span>}
          {error && <span className="code-error">Error: {error}</span>}
        </div>
      </div>
      
      {loading ? (
        <div className="editor-loading">Loading code...</div>
      ) : (
        <Editor
          height="100%"
          defaultLanguage="typescript"
          theme="vs-dark"
          value={editorCode || ''}
          onChange={handleCodeChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
          }}
        />
      )}
    </div>
  );
};