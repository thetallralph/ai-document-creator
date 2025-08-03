import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { importTemplateFromFile } from '../utils/templateDeserializer';
import { compileReactTemplate, validateTemplateCode } from '../utils/reactTemplateCompiler';
import { useTemplates } from '../contexts/TemplateContext';
import './ImportDialog.css';

interface ImportDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ImportDialog: React.FC<ImportDialogProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'file' | 'text'>('file');
  const [tsxContent, setTsxContent] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { addDynamicTemplate } = useTemplates();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      if (file.name.endsWith('.tsx')) {
        // Handle TSX file
        const content = await file.text();
        
        // Validate and compile the TSX template
        const validationError = validateTemplateCode(content);
        if (validationError) {
          setError(validationError);
          setIsLoading(false);
          return;
        }
        
        const { component, error: compileError } = compileReactTemplate(content);
        if (compileError) {
          setError(compileError);
          setIsLoading(false);
          return;
        }
        
        if (component) {
          const name = file.name.replace('.tsx', '').replace(/-/g, ' ');
          const id = addDynamicTemplate(
            name,
            'Imported TSX template',
            component
          );
          navigate(`/dynamic/${id}`);
          onClose();
        } else {
          setError('Failed to parse TSX file. Please check the format.');
        }
      } else {
        // Handle JSON file
        const component = await importTemplateFromFile(file);
        if (component) {
          const name = file.name.replace('.json', '').replace(/-/g, ' ');
          const id = addDynamicTemplate(
            name,
            'Imported template',
            component
          );
          navigate(`/dynamic/${id}`);
          onClose();
        } else {
          setError('Failed to import template. Please check the file format.');
        }
      }
    } catch (err) {
      setError('Error importing template: ' + (err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTsxImport = async () => {
    if (!tsxContent.trim()) {
      setError('Please paste TSX content');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Validate and compile the TSX template
      const validationError = validateTemplateCode(tsxContent);
      if (validationError) {
        setError(validationError);
        setIsLoading(false);
        return;
      }
      
      const { component, error: compileError } = compileReactTemplate(tsxContent);
      if (compileError) {
        setError(compileError);
        setIsLoading(false);
        return;
      }
      
      if (component) {
        const id = addDynamicTemplate(
          'Imported TSX Template',
          'Template imported from TSX code',
          component
        );
        navigate(`/dynamic/${id}`);
        onClose();
      } else {
        setError('Failed to parse TSX content. Please check the format.');
      }
    } catch (err) {
      setError('Error importing TSX: ' + (err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="import-dialog-overlay" onClick={onClose}>
      <div className="import-dialog" onClick={e => e.stopPropagation()}>
        <div className="import-dialog-header">
          <h2>Import Template</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="import-tabs">
          <button 
            className={`tab ${activeTab === 'file' ? 'active' : ''}`}
            onClick={() => setActiveTab('file')}
          >
            Upload File
          </button>
          <button 
            className={`tab ${activeTab === 'text' ? 'active' : ''}`}
            onClick={() => setActiveTab('text')}
          >
            Paste TSX
          </button>
        </div>
        
        <div className="import-dialog-content">
          {activeTab === 'file' ? (
            <>
              <p>Select a JSON or TSX template file to import:</p>
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,.tsx"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
              
              <button
                className="file-select-button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
              >
                {isLoading ? 'Importing...' : 'Choose File'}
              </button>
              
              <div className="import-info">
                <p>Supported formats:</p>
                <ul>
                  <li>JSON template files exported from the document viewer</li>
                  <li>TSX files exported from the document viewer</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <p>Paste your TSX component code:</p>
              
              <textarea
                className="tsx-input"
                value={tsxContent}
                onChange={(e) => setTsxContent(e.target.value)}
                placeholder={`import React from 'react';
import { Document, Page } from '../components/document-components';

export const MyTemplate = () => {
  return (
    <Document title="My Template" type="flyer" paperSize="A4">
      <Page background="#ffffff">
        {/* Your content here */}
      </Page>
    </Document>
  );
};`}
                rows={15}
              />
              
              <button
                className="file-select-button"
                onClick={handleTsxImport}
                disabled={isLoading}
              >
                {isLoading ? 'Importing...' : 'Import TSX'}
              </button>
              
              <div className="import-info">
                <p>Paste a TSX component that uses the Document and Page components.</p>
              </div>
            </>
          )}
          
          {error && (
            <div className="error-message">{error}</div>
          )}
        </div>
        
        <div className="import-dialog-footer">
          <button className="cancel-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ImportDialog;