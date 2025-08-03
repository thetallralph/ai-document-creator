import React, { useState, useEffect, useRef } from 'react';
import { getLLMService, LLMFactory } from '../services/llm';
import { useEditorCode } from '../contexts/EditorCodeContext';
import { extractPageByIndex, replacePageInnerContent, extractAllPages } from '../utils/pageExtractor';
import { APIKeyWarning } from './APIKeyWarning';
import './AIAssistant.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

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
  const [error, setError] = useState<string | null>(null);
  
  // Chat state
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [contextPages, setContextPages] = useState<number[]>([selectedPageIndex]);
  const [totalPages, setTotalPages] = useState(1);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const llmService = getLLMService();
  const isConfigured = llmService.isConfigured();
  const currentProvider = LLMFactory.getCurrentProvider() || 'gemini';

  // Update total pages when editor code changes
  useEffect(() => {
    if (editorCode) {
      const pages = extractAllPages(editorCode);
      setTotalPages(pages.length);
    }
  }, [editorCode]);

  // Update context when selected page changes
  useEffect(() => {
    if (!contextPages.includes(selectedPageIndex)) {
      setContextPages([selectedPageIndex]);
    }
  }, [selectedPageIndex]);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (isConfigured) {
        setIsAuthenticating(true);
        const authenticated = await llmService.verifyAuthentication();
        setIsConnected(authenticated);
        setAuthError(authenticated ? null : llmService.getAuthError());
        setIsAuthenticating(false);
      } else {
        setIsConnected(false);
        setAuthError('No API key configured');
      }
    };
    
    checkAuthentication();
  }, [isConfigured, llmService]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      switch (currentProvider) {
        case 'claude':
          return 'Claude AI';
        case 'mistral':
          return 'Mistral AI';
        default:
          return 'Gemini AI';
      }
    }
    return 'Disconnected';
  };

  const handleSendMessage = async (messageToSend?: string) => {
    const message = messageToSend || inputMessage;
    if (!message || typeof message !== 'string' || !message.trim() || !isConnected || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      // Build context from selected pages
      let context = '';
      for (const pageIndex of contextPages) {
        const pageInfo = extractPageByIndex(editorCode, pageIndex);
        if (pageInfo) {
          context += `\n\n--- Page ${pageIndex + 1} ---\n${pageInfo.innerContent}`;
        }
      }

      // Create prompt with context
      const prompt = `You are helping improve a document. Here is the current content of the selected page(s):

${context}

User request: ${message}

If the user asks to modify the page, provide ONLY the improved inner content of the Page component without any wrapper.
Do NOT include <Page> tags or any imports.
Return ONLY the JSX content that goes inside the Page component.

For styles, ALWAYS use the React inline style syntax: style={{ property: 'value' }}`;

      // Get response from LLM
      const response = await llmService.improveSinglePage(
        context,
        documentType,
        contextPages[0], // Primary page for context
        message
      );

      // Auto-apply if it looks like JSX content
      let messageContent = response;
      if (response.includes('<') && response.includes('>')) {
        if (contextPages.length === 1) {
          const updatedCode = replacePageInnerContent(
            editorCode,
            contextPages[0],
            response
          );
          setEditorCode(updatedCode);
          messageContent = `✓ Successfully updated Page ${contextPages[0] + 1}`;
        } else {
          messageContent = `✓ Generated improvements for Pages ${contextPages.map(p => p + 1).join(', ')}. To apply changes, please select a single page.`;
        }
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: messageContent,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (err) {
      setError('Failed to get response. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const togglePageInContext = (pageIndex: number) => {
    setContextPages(prev => {
      if (prev.includes(pageIndex)) {
        // Don't remove if it's the only page
        if (prev.length === 1) return prev;
        return prev.filter(p => p !== pageIndex);
      } else {
        return [...prev, pageIndex].sort((a, b) => a - b);
      }
    });
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
          {isConnected && import.meta.env.MODE === 'development' && (
            <APIKeyWarning provider={currentProvider as 'gemini' | 'claude' | 'mistral'} />
          )}
          {!isConnected ? (
            <div className="ai-config-notice">
              {isAuthenticating ? (
                <p>🔄 Authenticating with {currentProvider === 'claude' ? 'Claude' : currentProvider === 'mistral' ? 'Mistral' : 'Gemini'} API...</p>
              ) : (
                <>
                  <p>⚠️ {authError || 'Not connected'}</p>
                  {!isConfigured && (
                    <>
                      <p>Add your API key to the .env file:</p>
                      <code>{currentProvider === 'claude' ? 'See Claude setup instructions in .env.example' : currentProvider === 'mistral' ? 'VITE_MISTRAL_API_KEY=your-key-here' : 'VITE_GEMINI_API_KEY=your-key-here'}</code>
                    </>
                  )}
                  {authError && (
                    <div style={{ fontSize: '12px', marginTop: '10px' }}>
                      <button 
                        className="retry-button"
                        onClick={async () => {
                          setIsAuthenticating(true);
                          const authenticated = await llmService.verifyAuthentication();
                          setIsConnected(authenticated);
                          setAuthError(authenticated ? null : llmService.getAuthError());
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
              {/* Scrollable Content Area */}
              <div className="chat-scrollable-content">
                {/* Context Selector */}
                <div className="context-selector">
                  <h4>Context Pages</h4>
                  <div className="page-selector-grid">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        className={`page-selector-button ${contextPages.includes(i) ? 'selected' : ''} ${i === selectedPageIndex ? 'current' : ''}`}
                        onClick={() => togglePageInContext(i)}
                        title={i === selectedPageIndex ? 'Current page' : `Page ${i + 1}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <p className="context-info">
                    Selected: {contextPages.map(p => p + 1).join(', ')} | Current: Page {selectedPageIndex + 1}
                  </p>
                </div>

                {/* Chat Messages */}
                <div className="chat-messages">
                  {messages.length === 0 && (
                    <div className="chat-welcome">
                      <p>👋 Hi! I can help you improve your document.</p>
                      <p>Ask me to modify layouts, improve text, or make any changes to the selected pages.</p>
                    </div>
                  )}
                  {messages.map(message => (
                    <div key={message.id} className={`chat-message ${message.role} ${message.content.startsWith('✓') ? 'success' : ''}`}>
                      <div className="message-content">{message.content}</div>
                      <div className="message-time">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="chat-message assistant loading">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  )}
                  {error && (
                    <div className="chat-error">{error}</div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Chat Input */}
              <div className="chat-input-section">
                <div className="chat-input-container">
                  <textarea
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me to improve your document..."
                    rows={2}
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={isLoading || !inputMessage.trim()}
                    className="send-button"
                  >
                    {isLoading ? '...' : '➤'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};