import React, { useState, useEffect, useRef } from 'react';
import { getLLMService, LLMFactory } from '../services/llm';
import { useEditorCode } from '../contexts/EditorCodeContext';
import { replacePageInnerContent, extractAllPages } from '../utils/pageExtractor';
import { extractAllPagesWithAST, replacePageInnerContentWithAST } from '../utils/astPageExtractor';
import { APIKeyWarning } from './APIKeyWarning';
import './AIAssistant.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIAssistantProps {
  documentType: string;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  selectedPageIndex?: number;
  totalPages?: number;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
  documentType,
  collapsed = false,
  onToggleCollapse,
  selectedPageIndex = 0,
  totalPages: totalPagesProp = 1
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
  
  // @ mention state
  const [showPageMention, setShowPageMention] = useState(false);
  const [mentionPosition, setMentionPosition] = useState({ bottom: 0, left: 0, width: 0 });
  const [mentionFilter, setMentionFilter] = useState('');
  const [selectedMentionIndex, setSelectedMentionIndex] = useState(0);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const mentionRef = useRef<HTMLDivElement>(null);

  const llmService = getLLMService();
  const isConfigured = llmService.isConfigured();
  const currentProvider = LLMFactory.getCurrentProvider() || 'gemini';

  // Use the totalPages from props (which comes from DOM query) instead of parsing source
  useEffect(() => {
    setTotalPages(totalPagesProp);
    console.log('[AI Assistant] Total pages from DOM:', totalPagesProp);
  }, [totalPagesProp]);

  // Update context when selected page changes
  useEffect(() => {
    if (!contextPages.includes(selectedPageIndex)) {
      setContextPages([selectedPageIndex]);
    }
  }, [selectedPageIndex]);

  // Handle click outside of mention dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showPageMention && 
          mentionRef.current && 
          !mentionRef.current.contains(event.target as Node) &&
          inputRef.current &&
          !inputRef.current.contains(event.target as Node)) {
        setShowPageMention(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showPageMention]);

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
      // Use AST parser to get all pages first
      const allPages = editorCode ? extractAllPagesWithAST(editorCode) : [];
      const fallbackPages = allPages.length === 0 && editorCode ? extractAllPages(editorCode) : [];
      const pages = allPages.length > 0 ? allPages : fallbackPages;
      
      for (const pageIndex of contextPages) {
        const pageInfo = pages[pageIndex];
        if (pageInfo) {
          context += `\n\n--- Page ${pageIndex + 1} ---\n${pageInfo.innerContent}`;
        }
      }

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
        // With single page selection, we should always have exactly one page
        try {
          // Try AST-based replacement first
          const updatedCode = editorCode ? replacePageInnerContentWithAST(
            editorCode,
            contextPages[0],
            response
          ) : null;
          if (updatedCode) {
            setEditorCode(updatedCode);
            messageContent = `✓ Successfully updated Page ${contextPages[0] + 1}`;
          }
        } catch (astError) {
          console.log('[AI Assistant] AST replacement failed, trying regex:', astError);
          // Fallback to regex-based replacement
          const updatedCode = editorCode ? replacePageInnerContent(
            editorCode,
            contextPages[0],
            response
          ) : null;
          if (updatedCode) {
            setEditorCode(updatedCode);
            messageContent = `✓ Successfully updated Page ${contextPages[0] + 1}`;
          }
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
    if (showPageMention) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedMentionIndex(prev => 
          prev < getFilteredPages().length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedMentionIndex(prev => prev > 0 ? prev - 1 : 0);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const filteredPages = getFilteredPages();
        if (filteredPages.length > 0) {
          selectPageFromMention(filteredPages[selectedMentionIndex]);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setShowPageMention(false);
      }
    } else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const togglePageInContext = (pageIndex: number) => {
    // Single page selection only - clicking a page makes it the only selected page
    setContextPages([pageIndex]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputMessage(value);
    
    // Check for @ mention
    const cursorPosition = e.target.selectionStart;
    const textBeforeCursor = value.substring(0, cursorPosition);
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');
    
    if (lastAtIndex !== -1 && lastAtIndex === textBeforeCursor.length - 1) {
      // Just typed @, show mention dropdown
      const textarea = e.target;
      const textareaRect = textarea.getBoundingClientRect();
      const inputSection = textarea.closest('.chat-input-section');
      const inputSectionRect = inputSection?.getBoundingClientRect();
      
      // Calculate position to show just above the input section
      setMentionPosition({
        bottom: window.innerHeight - (inputSectionRect?.top || textareaRect.top) + 10,
        left: textareaRect.left,
        width: textareaRect.width
      });
      setShowPageMention(true);
      setMentionFilter('');
      setSelectedMentionIndex(0);
    } else if (lastAtIndex !== -1 && showPageMention) {
      // Check if we're still in a mention context
      const textAfterAt = textBeforeCursor.substring(lastAtIndex + 1);
      if (textAfterAt.match(/^[0-9]*$/)) {
        setMentionFilter(textAfterAt);
      } else {
        setShowPageMention(false);
      }
    } else {
      setShowPageMention(false);
    }
  };

  const getFilteredPages = () => {
    const pages = Array.from({ length: totalPages }, (_, i) => i);
    if (!mentionFilter) return pages;
    
    const filterNum = parseInt(mentionFilter);
    if (!isNaN(filterNum)) {
      return pages.filter(p => (p + 1).toString().startsWith(mentionFilter));
    }
    return pages;
  };

  const selectPageFromMention = (pageIndex: number) => {
    // Single page selection - selecting from mention sets it as the only context page
    setContextPages([pageIndex]);
    
    // Replace the @mention with the page reference
    const cursorPosition = inputRef.current?.selectionStart || 0;
    const textBeforeCursor = inputMessage.substring(0, cursorPosition);
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');
    
    if (lastAtIndex !== -1) {
      const newMessage = 
        inputMessage.substring(0, lastAtIndex) + 
        `@page${pageIndex + 1} ` +
        inputMessage.substring(cursorPosition);
      setInputMessage(newMessage);
    }
    
    setShowPageMention(false);
    inputRef.current?.focus();
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
                    Editing: Page {contextPages.length > 0 ? contextPages[0] + 1 : selectedPageIndex + 1} | Viewing: Page {selectedPageIndex + 1}
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
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask me to improve your document... (use @ to select pages)"
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
              
              {/* Page Mention Dropdown */}
              {showPageMention && (
                <div 
                  ref={mentionRef}
                  className="page-mention-dropdown"
                  style={{
                    position: 'fixed',
                    bottom: mentionPosition.bottom,
                    left: mentionPosition.left,
                    width: mentionPosition.width || 300,
                    maxWidth: '90vw',
                    zIndex: 1000
                  }}
                >
                  <div className="page-mention-header">
                    Select page to add to context
                  </div>
                  <div className="page-mention-list">
                    {getFilteredPages().map((pageIndex, index) => (
                      <div
                        key={pageIndex}
                        className={`page-mention-item ${index === selectedMentionIndex ? 'selected' : ''} ${contextPages.includes(pageIndex) ? 'in-context' : ''}`}
                        onClick={() => selectPageFromMention(pageIndex)}
                        onMouseEnter={() => setSelectedMentionIndex(index)}
                      >
                        <span className="page-mention-number">Page {pageIndex + 1}</span>
                        {pageIndex === selectedPageIndex && <span className="page-mention-current">👁️</span>}
                        {contextPages.includes(pageIndex) && <span className="page-mention-selected">✓</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};