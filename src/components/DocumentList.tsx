import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { allTemplates } from '../documents/templates';
import { useTemplates } from '../contexts/TemplateContext';
import DocumentCreator from './DocumentCreator';
import './DocumentList.css';

const DocumentList: React.FC = () => {
  const [newDocumentName, setNewDocumentName] = useState('');
  const [selectedType, setSelectedType] = useState('flyer');
  const [showCreator, setShowCreator] = useState(false);
  const { dynamicTemplates } = useTemplates();
  const navigate = useNavigate();
  
  const getUrlName = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '').replace(/'/g, '');
  };

  const handleCreateDocument = () => {
    if (newDocumentName.trim()) {
      setShowCreator(true);
    }
  };

  // Categorize templates
  const categorizedTemplates = {
    flyers: allTemplates.filter(t => t.name.toLowerCase().includes('flyer')),
    presentations: allTemplates.filter(t => t.name.toLowerCase().includes('presentation') || t.name.toLowerCase().includes('plan')),
    catalogs: allTemplates.filter(t => t.name.toLowerCase().includes('catalog')),
    booklets: allTemplates.filter(t => t.name.toLowerCase().includes('booklet')),
  };

  const documentTypes = [
    { value: 'flyer', label: 'Flyer', icon: '📄' },
    { value: 'presentation', label: 'Presentation', icon: '📊' },
    { value: 'catalog', label: 'Catalog', icon: '📚' },
    { value: 'booklet', label: 'Booklet', icon: '📖' },
    { value: 'poster', label: 'Poster', icon: '🖼️' },
    { value: 'brochure', label: 'Brochure', icon: '📋' },
  ];

  return (
    <div className="document-list">
      {/* Hero Section with Create Form */}
      <div className="hero-section">
        <h1>Create Beautiful Documents</h1>
        <p className="hero-subtitle">Design professional documents with AI-powered templates</p>
        
        <div className="create-form">
          <input
            type="text"
            placeholder="What do you want to create?"
            value={newDocumentName}
            onChange={(e) => setNewDocumentName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCreateDocument()}
            className="create-input"
          />
          
          <div className="document-types">
            {documentTypes.map((type) => (
              <button
                key={type.value}
                className={`type-button ${selectedType === type.value ? 'selected' : ''}`}
                onClick={() => setSelectedType(type.value)}
              >
                <span className="type-icon">{type.icon}</span>
                <span className="type-label">{type.label}</span>
              </button>
            ))}
          </div>
          
          <button 
            className="create-button"
            onClick={handleCreateDocument}
            disabled={!newDocumentName.trim()}
          >
            Create Document
          </button>
        </div>
      </div>


      {/* Templates Section */}
      <div className="templates-section">
        <h2>Start from a Template</h2>
        
        {/* Flyers */}
        {categorizedTemplates.flyers.length > 0 && (
          <div className="template-category">
            <h3>📄 Flyers</h3>
            <div className="templates-grid">
              {categorizedTemplates.flyers.map((template) => (
                <Link
                  key={template.name}
                  to={`/documents/${getUrlName(template.name)}`}
                  className="template-card"
                >
                  <div className="template-preview">
                    <div className="template-type-badge">Flyer</div>
                  </div>
                  <div className="template-info">
                    <h4>{template.name}</h4>
                    <p>{template.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Presentations */}
        {categorizedTemplates.presentations.length > 0 && (
          <div className="template-category">
            <h3>📊 Presentations</h3>
            <div className="templates-grid">
              {categorizedTemplates.presentations.map((template) => (
                <Link
                  key={template.name}
                  to={`/documents/${getUrlName(template.name)}`}
                  className="template-card"
                >
                  <div className="template-preview">
                    <div className="template-type-badge">Presentation</div>
                  </div>
                  <div className="template-info">
                    <h4>{template.name}</h4>
                    <p>{template.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Catalogs */}
        {categorizedTemplates.catalogs.length > 0 && (
          <div className="template-category">
            <h3>📚 Catalogs</h3>
            <div className="templates-grid">
              {categorizedTemplates.catalogs.map((template) => (
                <Link
                  key={template.name}
                  to={`/documents/${getUrlName(template.name)}`}
                  className="template-card"
                >
                  <div className="template-preview">
                    <div className="template-type-badge">Catalog</div>
                  </div>
                  <div className="template-info">
                    <h4>{template.name}</h4>
                    <p>{template.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Booklets */}
        {categorizedTemplates.booklets.length > 0 && (
          <div className="template-category">
            <h3>📖 Booklets</h3>
            <div className="templates-grid">
              {categorizedTemplates.booklets.map((template) => (
                <Link
                  key={template.name}
                  to={`/documents/${getUrlName(template.name)}`}
                  className="template-card"
                >
                  <div className="template-preview">
                    <div className="template-type-badge">Booklet</div>
                  </div>
                  <div className="template-info">
                    <h4>{template.name}</h4>
                    <p>{template.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Templates */}
        {dynamicTemplates.length > 0 && (
          <div className="template-category">
            <h3>📦 Imported Templates</h3>
            <div className="templates-grid">
              {dynamicTemplates.map((template) => (
                <Link
                  key={template.id}
                  to={`/documents/${template.id}`}
                  className="template-card dynamic"
                >
                  <div className="template-preview">
                    <div className="template-type-badge imported">Generated</div>
                  </div>
                  <div className="template-info">
                    <h4>{template.name}</h4>
                    <p>{template.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <DocumentCreator
        isOpen={showCreator}
        onClose={() => {
          setShowCreator(false);
          setNewDocumentName('');
        }}
        selectedType={selectedType}
        documentName={newDocumentName}
      />
    </div>
  );
};

export default DocumentList;