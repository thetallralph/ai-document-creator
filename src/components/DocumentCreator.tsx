import React, { useState } from 'react';
import { useTemplates } from '../contexts/TemplateContext';
import { useNavigate } from 'react-router-dom';
import './DocumentCreator.css';

interface DocumentCreatorProps {
  isOpen: boolean;
  onClose: () => void;
  selectedType: string;
  documentName: string;
}

const DocumentCreator: React.FC<DocumentCreatorProps> = ({ 
  isOpen, 
  onClose, 
  selectedType,
  documentName 
}) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const { addDynamicTemplate } = useTemplates();
  const navigate = useNavigate();

  const getLLMProvider = () => {
    const provider = import.meta.env.VITE_LLM_PROVIDER || 'gemini';
    return provider;
  };

  const generateDocument = async () => {
    if (!prompt.trim() || !documentName.trim()) {
      setError('Please provide both document name and description');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const provider = getLLMProvider();
      let response;

      // Create a valid component name from the document name
      const componentName = documentName
        .replace(/[^a-zA-Z0-9\s]/g, '') // Remove special characters
        .trim() // Remove leading/trailing spaces
        .split(/\s+/) // Split by spaces
        .filter(word => word.length > 0) // Remove empty strings
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
        .join('') || 'Document'; // Join without spaces, fallback to 'Document' if empty
      
      console.log('Document name:', documentName);
      console.log('Generated component name:', componentName);

      // Create the system prompt with document structure
      const systemPrompt = `You are a creative document template generator. Create a visually stunning React component following this exact structure:

IMPORTANT: Return ONLY the component code without any markdown formatting, explanations, or code blocks.

The component should:
1. Import Document and Page from '../../components/document-components'
2. Export a functional component named exactly: ${componentName}
3. Use the Document component with title="${documentName}", type="${selectedType}", and appropriate paperSize
4. Create VISUALLY APPEALING pages with:
   - Beautiful background colors, gradients, or patterns (use CSS gradients, radial-gradient, linear-gradient)
   - High-quality images from Unsplash: use URLs like https://images.unsplash.com/photo-[ID]?w=800&h=600&fit=crop
   - Creative typography using Google Fonts available: 'Outfit', 'Playfair Display', 'Inter', 'Space Mono'
   - Decorative elements: shapes, icons (use emojis), borders, shadows
   - Professional layouts with creative positioning
5. Use inline styles for all styling (no CSS imports)
6. Include proper spacing, typography hierarchy, and visual balance
7. Make it modern, creative, and visually impressive

CRITICAL: The component name must be exactly "${componentName}" (no spaces or special characters)

Creative styling tips:
- Backgrounds: background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
- Patterns: background: 'repeating-linear-gradient(45deg, #606dbc, #606dbc 10px, #465298 10px, #465298 20px)'
- Images: <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop" style={{width: '100%', height: '400px', objectFit: 'cover'}} />
- Shapes: <div style={{width: 100, height: 100, borderRadius: '50%', background: '#ff6b35'}} />
- Shadows: boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
- Typography: fontFamily: '"Playfair Display", serif', fontSize: 48, fontWeight: 700

Example structure:
import { Document, Page } from '../../components/document-components';

export const ${componentName} = () => {
  return (
    <Document title="${documentName}" type="${selectedType}" paperSize="A4">
      <Page background="linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" padding="0">
        <div style={{ 
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img 
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop" 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '40%',
              objectFit: 'cover',
              opacity: 0.8
            }} 
          />
          <h1 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 64,
            fontWeight: 700,
            color: '#2d3748',
            textAlign: 'center',
            margin: '20px 0',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            zIndex: 1
          }}>
            Beautiful Title
          </h1>
        </div>
      </Page>
    </Document>
  );
};

User's request: Create a ${selectedType} document named "${documentName}" with the following requirements: ${prompt}`;

      if (provider === 'gemini') {
        const geminiService = await import('../services/geminiService');
        response = await geminiService.generateDocumentTemplate(systemPrompt);
      } else if (provider === 'claude') {
        const claudeService = await import('../services/claudeService');
        response = await claudeService.generateDocumentTemplate(systemPrompt);
      } else if (provider === 'mistral') {
        const mistralService = await import('../services/mistralService');
        response = await mistralService.generateDocumentTemplate(systemPrompt);
      }

      if (response) {
        // Clean the response - remove markdown code blocks if present
        let cleanCode = response.trim();
        cleanCode = cleanCode.replace(/^```[a-zA-Z]*\n/, '').replace(/\n```$/, '');
        cleanCode = cleanCode.replace(/^```\n/, '').replace(/\n```$/, '');
        
        // Fix common LLM mistakes with component names
        // First, find any export const declaration and extract what the LLM used as the component name
        const exportMatch = cleanCode.match(/export\s+const\s+([^=\s]+)\s*=/);
        if (exportMatch) {
          const llmComponentName = exportMatch[1];
          // If the LLM's component name is different from our valid one, replace it
          if (llmComponentName !== componentName) {
            // Replace all instances of the incorrect component name
            const incorrectNameRegex = new RegExp(`\\b${llmComponentName}\\b`, 'g');
            cleanCode = cleanCode.replace(incorrectNameRegex, componentName);
          }
        } else {
          // If no valid export found, try to fix common patterns
          cleanCode = cleanCode.replace(/export\s+const\s+[^=]+\s*=/, `export const ${componentName} =`);
        }

        // Add the template to dynamic templates
        const urlName = documentName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        addDynamicTemplate({
          id: urlName,
          name: documentName,
          description: `Generated ${selectedType}: ${prompt.substring(0, 100)}...`,
          code: cleanCode
        });

        // Navigate to the new document using the same URL structure as static templates
        navigate(`/documents/${urlName}`);
        onClose();
      }
    } catch (error: any) {
      console.error('Error generating document:', error);
      setError(error.message || 'Failed to generate document. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="document-creator-overlay" onClick={onClose}>
      <div className="document-creator-modal" onClick={(e) => e.stopPropagation()}>
        <div className="creator-header">
          <h2>Create New {selectedType}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="creator-content">
          <div className="document-info">
            <p className="document-name">{documentName}</p>
            <p className="document-type">{selectedType}</p>
          </div>

          <div className="prompt-section">
            <label htmlFor="prompt">Describe your document:</label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={`Describe what you want in your ${selectedType}. For example:\n\n- Main topic or purpose\n- Key sections or pages\n- Visual style (modern, vintage, minimalist, bold)\n- Color scheme preferences\n- Target audience\n- Specific images needed (e.g., "mountain landscape", "team photos")\n- Any specific content to include\n\nThe AI will create a visually stunning design with beautiful images, creative layouts, and modern typography!`}
              rows={8}
              disabled={isGenerating}
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="creator-actions">
            <button 
              className="cancel-button" 
              onClick={onClose}
              disabled={isGenerating}
            >
              Cancel
            </button>
            <button 
              className="generate-button"
              onClick={generateDocument}
              disabled={isGenerating || !prompt.trim()}
            >
              {isGenerating ? 'Generating...' : 'Generate Document'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentCreator;