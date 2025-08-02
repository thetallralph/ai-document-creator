import React from 'react';
import { Link } from 'react-router-dom';
import { allTemplates } from '../documents/templates';
import './DocumentList.css';

const DocumentList: React.FC = () => {
  const getUrlName = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '').replace(/'/g, '');
  };

  return (
    <div className="document-list">
      <h1>Document Templates</h1>
      <p className="subtitle">Click on any document to view it</p>
      
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
      </div>
    </div>
  );
};

export default DocumentList;