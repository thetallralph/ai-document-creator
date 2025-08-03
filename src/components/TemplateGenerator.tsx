import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { compileReactTemplate, validateTemplateCode } from '../utils/reactTemplateCompiler';
import { generateTemplateWithLLM, createTemplatePrompt } from '../utils/llmIntegration';
import { useTemplates } from '../contexts/TemplateContext';
import './TemplateGenerator.css';

interface TemplateGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
}

const TemplateGenerator: React.FC<TemplateGeneratorProps> = ({ isOpen, onClose }) => {
  const [description, setDescription] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { addDynamicTemplate } = useTemplates();

  const handleGenerate = async () => {
    setError(null);
    setIsLoading(true);
    
    try {
      // Create the prompt for the LLM
      const prompt = createTemplatePrompt(description);
      
      // Call the LLM API (or use the demo implementation)
      const response = await generateTemplateWithLLM(prompt);
      
      if (response.error) {
        setError(response.error);
      } else if (response.code) {
        setGeneratedCode(response.code);
      }
    } catch (err) {
      setError('Error generating template: ' + (err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImport = () => {
    // Validate the code
    const validationError = validateTemplateCode(generatedCode);
    if (validationError) {
      setError(validationError);
      return;
    }

    // Compile the template
    const { component, error: compileError } = compileReactTemplate(generatedCode);
    
    if (compileError) {
      setError(compileError);
      return;
    }

    if (component) {
      const id = addDynamicTemplate({
        id: `ai-generated-${Date.now()}`,
        name: 'AI Generated Template',
        description: `Generated from: ${description}`,
        code: generatedCode,
        component
      });
      navigate(`/dynamic/${id}`);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="template-generator-overlay" onClick={onClose}>
      <div className="template-generator" onClick={e => e.stopPropagation()}>
        <div className="generator-header">
          <h2>Generate Template with AI</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="generator-content">
          <div className="description-section">
            <label>Describe your template:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="E.g., A professional invoice template with company logo, itemized list, and total calculation"
              rows={4}
            />
            <button 
              className="generate-button"
              onClick={handleGenerate}
              disabled={!description.trim() || isLoading}
            >
              {isLoading ? 'Generating...' : 'Generate Template'}
            </button>
          </div>

          {generatedCode && (
            <div className="code-section">
              <label>Generated Code (editable):</label>
              <textarea
                className="code-editor"
                value={generatedCode}
                onChange={(e) => setGeneratedCode(e.target.value)}
                rows={20}
              />
              <button 
                className="import-button"
                onClick={handleImport}
              >
                Import Template
              </button>
            </div>
          )}

          {error && (
            <div className="error-message">{error}</div>
          )}

          <div className="info-section">
            <h4>How it works:</h4>
            <ul>
              <li>Describe the template you want to create</li>
              <li>AI will generate React/TSX code for your template</li>
              <li>Review and edit the generated code if needed</li>
              <li>Import the template to use it immediately</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateGenerator;