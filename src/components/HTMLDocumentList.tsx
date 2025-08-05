import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { htmlTemplateService } from '../services/htmlTemplateService';
import { registerBuiltInHTMLTemplates } from '../templates/html-templates';
import './DocumentList.css';

// Register templates on module load
registerBuiltInHTMLTemplates();

const HTMLDocumentList: React.FC = () => {
  const { user, signOut } = useAuth();
  const templates = htmlTemplateService.getAllTemplateMetadata();

  return (
    <div className="document-list">
      <header className="list-header">
        <div className="header-content">
          <h1>Pagayi</h1>
          <p className="subtitle">AI-powered document creator</p>
        </div>
        <div className="header-actions">
          <span className="user-email">{user?.email}</span>
          <button onClick={signOut} className="signout-button">
            Sign Out
          </button>
        </div>
      </header>
      
      <div className="demo-links" style={{ 
        maxWidth: '1200px', 
        margin: '20px auto', 
        padding: '0 20px',
        display: 'flex',
        gap: '10px'
      }}>
        <Link to="/template-editor" style={{
          padding: '10px 20px',
          backgroundColor: '#667eea',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          fontSize: '14px'
        }}>
          Template Editor →
        </Link>
        <Link to="/tsx-documents" style={{
          padding: '10px 20px',
          backgroundColor: '#4a5568',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          fontSize: '14px'
        }}>
          Legacy TSX Templates →
        </Link>
      </div>
      
      <main className="list-content">
        <div className="documents-grid">
          {templates.map(template => (
            <Link 
              key={template.id} 
              to={`/documents/${template.id}`}
              className="document-card"
            >
              <div className="card-preview">
                {template.thumbnailUrl ? (
                  <img src={template.thumbnailUrl} alt={template.name} />
                ) : (
                  <div className="preview-placeholder">
                    <span className="preview-icon">📄</span>
                  </div>
                )}
              </div>
              <div className="card-info">
                <h3>{template.name}</h3>
                <p>{template.description}</p>
                <div className="card-meta">
                  <span className="meta-item">📐 {template.paperSize || 'A4'}</span>
                  {template.id.startsWith('custom-html-') && (
                    <span className="meta-item custom-badge">Custom</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HTMLDocumentList;