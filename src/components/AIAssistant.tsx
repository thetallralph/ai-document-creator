import React, { useState, useEffect } from 'react';
import { geminiService, DocumentAnalysis } from '../services/geminiService';
import { useEditorCode } from '../contexts/EditorCodeContext';
import { extractPageByIndex, replacePageInnerContent } from '../utils/pageExtractor';
import './AIAssistant.css';

interface AIAssistantProps {
  documentContent: string;
  documentType: string;
  selectedElement?: { type: string; content: string; id: string };
  onSuggestionApply?: (suggestion: string) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  selectedPageIndex?: number;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
  documentContent,
  documentType,
  selectedElement,
  onSuggestionApply,
  collapsed = false,
  onToggleCollapse,
  selectedPageIndex = 0
}) => {
  const { editorCode, setEditorCode } = useEditorCode();
  const [isConnected, setIsConnected] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'analysis' | 'suggestions' | 'improve-page'>('analysis');
  const [textInput, setTextInput] = useState('');
  const [improvementType, setImprovementType] = useState<'clarity' | 'conciseness' | 'tone' | 'grammar'>('clarity');
  const [improvedText, setImprovedText] = useState('');
  const [pageInstructions, setPageInstructions] = useState('');
  const [isImprovingPage, setIsImprovingPage] = useState(false);

  const isConfigured = geminiService.isConfigured();

  const analyzeDocument = async () => {
    if (!isConfigured) return;

    setIsLoading(true);
    setError(null);
    try {
      const result = await geminiService.analyzeDocument(documentContent, documentType);
      setAnalysis(result);
    } catch (err) {
      setError('Failed to analyze document. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const improveText = async () => {
    if (!textInput || !isConfigured) return;

    setIsLoading(true);
    setError(null);
    try {
      const improved = await geminiService.improveText(textInput, improvementType);
      setImprovedText(improved);
    } catch (err) {
      setError('Failed to improve text. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      if (isConfigured) {
        setIsAuthenticating(true);
        const authenticated = await geminiService.verifyAuthentication();
        setIsConnected(authenticated);
        setAuthError(authenticated ? null : geminiService.getAuthError());
        setIsAuthenticating(false);
      } else {
        setIsConnected(false);
        setAuthError('No API key configured');
      }
    };
    
    checkAuthentication();
  }, [isConfigured]);

  // Removed auto-analysis - now only analyze on user request

  const getStatusIcon = () => {
    if (isAuthenticating) {
      return <span className="status-icon authenticating">◐</span>;
    }
    if (isConnected) {
      return <span className="status-icon connected">●</span>;
    }
    return <span className="status-icon disconnected">●</span>;
  };

  const getStatusText = () => {
    if (isAuthenticating) {
      return 'Authenticating...';
    }
    if (isConnected) {
      return 'Gemini AI';
    }
    return 'Disconnected';
  };

  return (
    <div className={`panel ai-assistant-panel ${collapsed ? 'collapsed' : ''}`}>
      <div className="panel-header clickable" onClick={onToggleCollapse}>
        <h3>AI Assistant</h3>
        <div className="panel-header-right">
          <div className="ai-status">
            {getStatusIcon()}
            <span className="status-text">{getStatusText()}</span>
          </div>
          <button className="collapse-button">
            {collapsed ? '▼' : '▲'}
          </button>
        </div>
      </div>

      {!collapsed && (
        <div className="panel-content">
          {!isConnected ? (
            <div className="ai-config-notice">
              {isAuthenticating ? (
                <p>🔄 Authenticating with Gemini API...</p>
              ) : (
                <>
                  <p>⚠️ {authError || 'Not connected'}</p>
                  {!isConfigured && (
                    <>
                      <p>Add your API key to the .env file:</p>
                      <code>VITE_GEMINI_API_KEY=your-key-here</code>
                    </>
                  )}
                  {authError && (
                    <div style={{ fontSize: '12px', marginTop: '10px' }}>
                      {authError.includes('Invalid') && (
                        <p>Please check that your API key is correct.</p>
                      )}
                      {authError.includes('not authorized') && (
                        <>
                          <p>Please enable the Generative Language API:</p>
                          <ol style={{ textAlign: 'left', paddingLeft: '20px' }}>
                            <li>Go to Google Cloud Console</li>
                            <li>Enable "Generative Language API"</li>
                            <li>Make sure your API key has access</li>
                          </ol>
                        </>
                      )}
                      <button 
                        className="retry-button"
                        onClick={async () => {
                          setIsAuthenticating(true);
                          const authenticated = await geminiService.verifyAuthentication();
                          setIsConnected(authenticated);
                          setAuthError(authenticated ? null : geminiService.getAuthError());
                          setIsAuthenticating(false);
                        }}
                        style={{
                          marginTop: '10px',
                          padding: '6px 12px',
                          background: '#667eea',
                          border: 'none',
                          borderRadius: '4px',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        Retry Connection
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (

            <>
              <div className="ai-assistant-tabs">
                <button 
                  className={activeTab === 'analysis' ? 'active' : ''}
                  onClick={() => setActiveTab('analysis')}
                >
                  Analysis
                </button>
                <button 
                  className={activeTab === 'suggestions' ? 'active' : ''}
                  onClick={() => setActiveTab('suggestions')}
                >
                  Improve Text
                </button>
                <button 
                  className={activeTab === 'improve-page' ? 'active' : ''}
                  onClick={() => setActiveTab('improve-page')}
                >
                  Improve Page
                </button>
              </div>

              <div className="ai-assistant-content">
            {isLoading && <div className="loading">Analyzing...</div>}
            {error && <div className="error">{error}</div>}

            {activeTab === 'analysis' && (
              <div className="analysis-section">
                {!analysis ? (
                  <div className="analysis-prompt">
                    <p>Click the button below to analyze your document's design and get AI-powered suggestions.</p>
                    <button 
                      className="analyze-button"
                      onClick={analyzeDocument}
                      disabled={isLoading || !isConnected}
                    >
                      {isLoading ? 'Analyzing...' : 'Analyze Document'}
                    </button>
                  </div>
                ) : (
                  <div className="analysis-results">
                    <div className="scores">
                      <div className="score-item">
                        <span>Layout</span>
                        <div className="score-bar">
                          <div 
                            className="score-fill"
                            style={{ width: `${analysis.layoutScore}%` }}
                          />
                        </div>
                        <span>{analysis.layoutScore}%</span>
                      </div>
                      <div className="score-item">
                        <span>Readability</span>
                        <div className="score-bar">
                          <div 
                            className="score-fill"
                            style={{ width: `${analysis.readabilityScore}%` }}
                          />
                        </div>
                        <span>{analysis.readabilityScore}%</span>
                      </div>
                    </div>

                    <div className="feedback">
                      <h4>Overall Feedback</h4>
                      <p>{analysis.overallFeedback}</p>
                    </div>

                    <div className="suggestions">
                      <h4>Design Suggestions</h4>
                      <ul>
                        {analysis.designSuggestions.map((suggestion, index) => (
                          <li key={index}>{suggestion}</li>
                        ))}
                      </ul>

                      <h4>Content Suggestions</h4>
                      <ul>
                        {analysis.contentSuggestions.map((suggestion, index) => (
                          <li key={index}>{suggestion}</li>
                        ))}
                      </ul>
                    </div>

                    <button 
                      className="refresh-button"
                      onClick={analyzeDocument}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Analyzing...' : 'Refresh Analysis'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'suggestions' && (
              <div className="text-improvement">
                <h4>Improve Your Text</h4>
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Paste or type text to improve..."
                  rows={4}
                />
                
                <div className="improvement-options">
                  <label>
                    <input
                      type="radio"
                      value="clarity"
                      checked={improvementType === 'clarity'}
                      onChange={(e) => setImprovementType(e.target.value as any)}
                    />
                    Clarity
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="conciseness"
                      checked={improvementType === 'conciseness'}
                      onChange={(e) => setImprovementType(e.target.value as any)}
                    />
                    Conciseness
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="tone"
                      checked={improvementType === 'tone'}
                      onChange={(e) => setImprovementType(e.target.value as any)}
                    />
                    Professional Tone
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="grammar"
                      checked={improvementType === 'grammar'}
                      onChange={(e) => setImprovementType(e.target.value as any)}
                    />
                    Grammar
                  </label>
                </div>

                <button 
                  className="improve-button"
                  onClick={improveText}
                  disabled={isLoading || !textInput}
                >
                  Improve Text
                </button>

                {improvedText && (
                  <div className="improved-result">
                    <h5>Improved Version:</h5>
                    <div className="improved-text">{improvedText}</div>
                    {onSuggestionApply && (
                      <button 
                        className="apply-button"
                        onClick={() => onSuggestionApply(improvedText)}
                      >
                        Apply to Document
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'improve-page' && (
              <div className="page-improvement">
                <h4>Improve Page Layout</h4>
                <p className="improve-description">
                  Enhance the design and layout of the currently selected page (Page {selectedPageIndex + 1}).
                </p>
                
                <textarea
                  value={pageInstructions}
                  onChange={(e) => setPageInstructions(e.target.value)}
                  placeholder="Additional instructions (optional)... e.g., 'Make it more modern', 'Add more spacing', 'Use a color scheme with blue accents'"
                  rows={3}
                  className="instructions-input"
                />
                
                <button 
                  className="improve-page-button"
                  onClick={async () => {
                    setIsImprovingPage(true);
                    setError(null);
                    
                    try {
                      if (!editorCode) {
                        setError('Editor code is not available. Please ensure the code editor has loaded.');
                        return;
                      }
                      
                      // Extract the specific page
                      const pageInfo = extractPageByIndex(editorCode, selectedPageIndex);
                      if (!pageInfo) {
                        setError(`Page ${selectedPageIndex + 1} not found in the document.`);
                        return;
                      }
                      
                      console.log('Extracted page info:', {
                        pageNumber: selectedPageIndex + 1,
                        innerContentLength: pageInfo.innerContent.length,
                        openTag: pageInfo.openTag
                      });
                      
                      // Send only the page inner content to AI
                      const improvedInnerContent = await geminiService.improveSinglePage(
                        pageInfo.innerContent,
                        documentType,
                        selectedPageIndex + 1,
                        pageInstructions
                      );
                      
                      console.log('AI returned improved inner content');
                      
                      // Replace only this page in the editor code
                      const updatedCode = replacePageInnerContent(
                        editorCode,
                        selectedPageIndex,
                        improvedInnerContent
                      );
                      
                      // Update the editor code
                      setEditorCode(updatedCode);
                      
                      // Clear instructions after successful improvement
                      setPageInstructions('');
                      
                      console.log('Page improvement applied successfully');
                    } catch (err) {
                      setError('Failed to improve page layout. Please try again.');
                      console.error(err);
                    } finally {
                      setIsImprovingPage(false);
                    }
                  }}
                  disabled={isImprovingPage || !isConnected}
                >
                  {isImprovingPage ? 'Improving...' : 'Improve Page Layout'}
                </button>
                
                {isImprovingPage && (
                  <div className="improving-status">
                    <span className="status-icon authenticating">●</span>
                    <span>AI is analyzing and improving the page layout...</span>
                  </div>
                )}
              </div>
            )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};