import React, { useState, useEffect, useCallback, useRef } from 'react';
import Editor from '@monaco-editor/react';
import * as Babel from '@babel/standalone';
import { getDocumentSource } from '../utils/documentSourceExtractor';
import { useEditorCode } from '../contexts/EditorCodeContext';
import './CodeEditor.css';

interface CodeEditorProps {
  documentComponent: React.ComponentType | null;
  documentName?: string;
  onCodeChange?: (updatedComponent: React.ComponentType | null, error?: string) => void;
  onCodeUpdate?: (code: string) => void;
  onCompilationStart?: () => void;
  isVisible?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ documentComponent, documentName, onCodeChange, onCodeUpdate, isVisible = true }) => {
  const { editorCode, setEditorCode } = useEditorCode();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | null>(null);
  // const [isCompiling, setIsCompiling] = useState(false);
  const [hasUserEdits, setHasUserEdits] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Reset edits when document changes
  useEffect(() => {
    setHasUserEdits(false);
    setError(null);
    setLoadError(null);
    setSaveStatus(null);
    setLoading(true);
  }, [documentName]);

  // Track the last code set by user to detect external changes
  const lastUserCodeRef = useRef<string>('');
  
  // Debounce timer ref
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  
  // Ref to track previous editor code for change detection
  const previousEditorCodeRef = useRef<string | null>(null);
  
  // Flag to prevent compilation loops
  const isInitialLoadRef = useRef(true);
  
  // Track current document to prevent stale updates
  const currentDocumentRef = useRef<string | undefined>(documentName);
  
  // Track compilation state with ref to avoid dependency issues
  const isCompilingRef = useRef(false);

  const compileCode = useCallback(async (value: string) => {
    console.log('compileCode called, isCompiling:', isCompilingRef.current, 'value length:', value?.length);
    if (isCompilingRef.current || !value) {
      console.log('Skipping compilation - isCompiling:', isCompilingRef.current, 'has value:', !!value);
      return;
    }
    
    isCompilingRef.current = true;
    // setIsCompiling(true);
    setError(null);
    
    
    try {
      // Import the required components
      const DocumentModule = await import('../components/document-components/Document');
      const PageModule = await import('../components/document-components/Page');
      const Document = DocumentModule.Document;
      const Page = PageModule.Page;
      
      console.log('Document component:', Document);
      console.log('Page component:', Page);
      
      // First, let's fix any invalid component names with spaces
      let processedCode = value;
      const invalidNameMatch = value.match(/export\s+(?:const|function)\s+([^=]+?)\s*=/);
      let componentName = 'EditableDocument';
      
      if (invalidNameMatch) {
        const originalName = invalidNameMatch[1].trim();
        if (originalName.includes(' ')) {
          // Component name has spaces, need to fix it
          const sanitizedName = originalName.replace(/\s+/g, '');
          componentName = sanitizedName;
          console.log('Fixing invalid component name:', originalName, '->', sanitizedName);
          // Replace the invalid name with the sanitized one in the code
          processedCode = processedCode.replace(
            new RegExp(`export\\s+(const|function)\\s+${originalName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*=`),
            `export $1 ${sanitizedName} =`
          );
          console.log('Code after fix (first 200 chars):', processedCode.substring(0, 200));
        } else {
          // Valid component name
          componentName = originalName;
        }
      } else {
        // Try to extract just word characters as fallback
        const componentNameMatch = value.match(/export\s+(?:const|function)\s+(\w+)/);
        if (componentNameMatch) {
          componentName = componentNameMatch[1];
        }
      }
      
      // Simple approach: just remove imports and transform
      const codeToTransform = processedCode
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
          onCodeChange(component, undefined);
        }
        // Clear save status after a delay
        setTimeout(() => setSaveStatus(null), 2000);
      } else {
        throw new Error('Component must be a function, got: ' + typeof component);
      }
    } catch (err) {
      console.error('Compilation error:', err);
      setError(err instanceof Error ? err.message : 'Invalid code');
      // Set null on error to indicate compilation failure
      const errorMessage = err instanceof Error ? err.message : 'Invalid code';
      if (onCodeChange) {
        onCodeChange(null, errorMessage);
      }
    } finally {
      isCompilingRef.current = false;
      // setIsCompiling(false);
    }
  }, [onCodeChange]); // Remove isCompiling - we'll use a ref instead

  useEffect(() => {
    // Update current document ref
    currentDocumentRef.current = documentName;
    
    // Reset initial load flag when document changes
    isInitialLoadRef.current = true;
    
    // Check if editor code is already set by DocumentViewer
    if (editorCode && !hasUserEdits) {
      // Editor code was already set (likely by DocumentViewer)
      setLoading(false);
      previousEditorCodeRef.current = editorCode;
      lastUserCodeRef.current = editorCode;
      
      // Compile the initial code
      setTimeout(() => {
        if (currentDocumentRef.current === documentName) {
          compileCode(editorCode);
        }
      }, 300);
      return;
    }
    
    // Always reload source when document changes, regardless of edits
    const loadDocumentSource = async () => {
      setLoading(true);
      setLoadError(null);
      
      
      try {
        // Try to get the component name from the function
        const componentName = documentName || (documentComponent && documentComponent.name) || 'EditableDocument';
        
        // Try to load the actual source
        const source = await getDocumentSource(componentName);
        
        // Check if this is still the current document (prevent race conditions)
        if (currentDocumentRef.current !== documentName) {
          console.log('Document changed during load, ignoring stale source');
          return;
        }
        
        if (source) {
          setEditorCode(source);
          previousEditorCodeRef.current = source; // Track initial load
          // Don't set lastUserCodeRef here - let external detection work
          // Notify parent of initial code
          if (onCodeUpdate) {
            onCodeUpdate(source);
          }
          // Initial compile after load
          setTimeout(() => {
            if (currentDocumentRef.current === documentName && source) {
              compileCode(source);
            }
          }, 300);
        } else {
          // Fallback to a basic template
          const sanitizedName = componentName.replace(/\s+/g, '');
          const displayName = componentName.replace(/([A-Z])/g, ' $1').trim();
          const template = `import { Document, Page } from '../../components/document-components';

export const ${sanitizedName} = () => {
  return (
    <Document title="${displayName}" type="document" paperSize="A4">
      <Page background="#ffffff">
        <h1 style={{ position: 'absolute', top: 50, left: 50, fontSize: '32px' }}>
          ${displayName}
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
          // Don't set lastUserCodeRef here - let external detection work
          // Notify parent of fallback template
          if (onCodeUpdate) {
            onCodeUpdate(template);
          }
          // Initial compile after load
          setTimeout(() => {
            if (currentDocumentRef.current === documentName && source) {
              compileCode(source);
            }
          }, 300);
        }
      } catch (error) {
        console.error('Error loading template source:', error);
        setLoadError('Failed to load template source');
        // Still provide a fallback
        const sanitizedName = (documentName || 'Document').replace(/\s+/g, '');
        const displayName = (documentName || 'Document').replace(/([A-Z])/g, ' $1').trim();
        const fallbackTemplate = `import { Document, Page } from '../../components/document-components';

export const ${sanitizedName} = () => {
  return (
    <Document title="${displayName}" type="document" paperSize="A4">
      <Page background="#ffffff">
        <h1 style={{ position: 'absolute', top: 50, left: 50, fontSize: '32px' }}>
          ${displayName}
        </h1>
        <p style={{ position: 'absolute', top: 120, left: 50, fontSize: '16px', color: 'red' }}>
          Error loading template. Edit this code to create your document.
        </p>
      </Page>
    </Document>
  );
};`;
        setEditorCode(fallbackTemplate);
        if (onCodeUpdate) {
          onCodeUpdate(fallbackTemplate);
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadDocumentSource();
  }, [documentComponent, documentName]); // Remove functions from dependencies to prevent loops

  // Detect when editor code changes from external source (AI)
  useEffect(() => {
    console.log('External change detection effect - isInitial:', isInitialLoadRef.current, 
                'editorCode length:', editorCode?.length,
                'previousRef length:', previousEditorCodeRef.current?.length,
                'lastUserRef length:', lastUserCodeRef.current?.length);
    
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
  }, [editorCode]); // Remove compileCode from dependencies to prevent loops

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
  }, []); // Remove all dependencies - they're stable or handled via refs

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
        <h3>Code Editor</h3>
        <div className="code-editor-status">
          {saveStatus === 'saving' && <span className="code-saving">Compiling...</span>}
          {saveStatus === 'saved' && <span className="code-saved">✓ Applied</span>}
          {error && <span className="code-error">Error: {error}</span>}
        </div>
      </div>
      
      {loading ? (
        <div className="editor-loading">
          <div>Loading template...</div>
          {loadError && <div className="load-error">{loadError}</div>}
        </div>
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