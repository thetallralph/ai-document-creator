import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { allTemplates } from '../documents/templates';
import { useTemplates } from '../contexts/TemplateContext';
import ImportDialog from './ImportDialog';
import TemplateGenerator from './TemplateGenerator';
import './DocumentList.css';

const DocumentList: React.FC = () => {
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);
  const { dynamicTemplates } = useTemplates();
  
  const getUrlName = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '').replace(/'/g, '');
  };

  return (
    <div className="document-list">
      <div className="document-list-header">
        <div>
          <h1>Document Templates</h1>
          <p className="subtitle">Click on any document to view it</p>
        </div>
        <div className="header-buttons">
          <button 
            className="generate-button"
            onClick={() => setShowGenerator(true)}
          >
            🤖 Generate with AI
          </button>
          <button 
            className="import-button"
            onClick={() => setShowImportDialog(true)}
          >
            📥 Import Template
          </button>
        </div>
      </div>
      
      <div className="templates-grid">
        {allTemplates.map((template) => (
          <Link
            key={template.name}
            to={`/documents/${getUrlName(template.name)}`}
            className="template-card"
          >
            <h3>{template.name}</h3>
            <p>{template.description}</p>
            <span className="view-link">View →</span>
          </Link>
        ))}
        
        {dynamicTemplates.map((template) => (
          <Link
            key={template.id}
            to={`/dynamic/${template.id}`}
            className="template-card dynamic"
          >
            <h3>{template.name}</h3>
            <p>{template.description}</p>
            <span className="template-badge">Imported</span>
            <span className="view-link">View →</span>
          </Link>
        ))}
      </div>
      
      <ImportDialog 
        isOpen={showImportDialog}
        onClose={() => setShowImportDialog(false)}
      />
      
      <TemplateGenerator
        isOpen={showGenerator}
        onClose={() => setShowGenerator(false)}
      />
    </div>
  );
};

export default DocumentList;