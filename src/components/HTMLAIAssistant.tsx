import React, { useState, useEffect, useRef } from 'react';
import { getLLMService, LLMFactory } from '../services/llm';
import { HTMLTemplate } from '../types/htmlTemplate';
import { APIKeyWarning } from './APIKeyWarning';
import './AIAssistant.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface HTMLAIAssistantProps {
  template: HTMLTemplate;
  selectedPageIndex: number;
  onTemplateUpdate: (template: HTMLTemplate) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

/**
 * Extracts HTML code from LLM response, handling various formats:
 * - Plain HTML
 * - HTML wrapped in markdown code blocks
 * - HTML with surrounding text/explanations
 * - Multiple code blocks (takes the first one)
 */
function extractHTMLCode(response: string): string | null {
  // Remove leading/trailing whitespace
  let content = response.trim();
  
  // Check if the response is wrapped in markdown code blocks
  // Try multiple patterns to be more flexible
  const codeBlockPatterns = [
    /```(?:html?|xml|jsx?|tsx?)?\s*\n([\s\S]*?)\n```/,  // With language
    /```\s*\n([\s\S]*?)\n```/,                           // Without language
    /```([\s\S]*?)```/,                                  // Inline style
    /`([\s\S]*?)`/                                       // Single backticks (less common)
  ];
  
  for (const pattern of codeBlockPatterns) {
    const match = content.match(pattern);
    if (match) {
      content = match[1].trim();
      break;
    }
  }
  
  // If content still contains backticks at the start/end, remove them
  if (content.startsWith('```')) {
    content = content.substring(3);
    const endIndex = content.lastIndexOf('```');
    if (endIndex !== -1) {
      content = content.substring(0, endIndex);
    }
  }
  
  // Check if the content looks like HTML
  // Must have at least one HTML tag
  if (!content.includes('<') || !content.includes('>')) {
    return null;
  }
  
  // Extract just the HTML if there's text before/after
  // Look for the first < and last > to isolate HTML content
  const firstTagIndex = content.indexOf('<');
  const lastTagIndex = content.lastIndexOf('>');
  
  if (firstTagIndex !== -1 && lastTagIndex !== -1 && lastTagIndex > firstTagIndex) {
    // Check if there's substantial text before the first tag
    const textBefore = content.substring(0, firstTagIndex).trim();
    const textAfter = content.substring(lastTagIndex + 1).trim();
    
    // If there's explanatory text before or after, extract just the HTML
    if (textBefore.length > 50 || textAfter.length > 50) {
      content = content.substring(firstTagIndex, lastTagIndex + 1);
    }
  }
  
  // Final validation - ensure it's valid HTML structure
  const tagCount = (content.match(/<[^>]+>/g) || []).length;
  if (tagCount < 1) {
    return null;
  }
  
  // Clean up any remaining artifacts
  content = content.trim();
  
  // Remove any "Here's the updated HTML:" type prefixes
  const prefixPatterns = [
    /^Here'?s?\s+(?:the\s+)?(?:updated?\s+)?(?:HTML|code)[:\s]*/i,
    /^The\s+(?:updated?\s+)?(?:HTML|code)\s+is[:\s]*/i,
    /^Updated?\s+(?:HTML|code)[:\s]*/i
  ];
  
  for (const pattern of prefixPatterns) {
    content = content.replace(pattern, '');
  }
  
  return content.trim();
}

export const HTMLAIAssistant: React.FC<HTMLAIAssistantProps> = ({
  template,
  selectedPageIndex,
  onTemplateUpdate,
  collapsed = false,
  onToggleCollapse
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Chat state
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  
  // Page selection state
  const [contextPageIndex, setContextPageIndex] = useState<number>(selectedPageIndex);
  const [showPageMention, setShowPageMention] = useState(false);
  const [mentionFilter, setMentionFilter] = useState('');
  const [selectedMentionIndex, setSelectedMentionIndex] = useState(0);
  const [mentionPosition, setMentionPosition] = useState({ bottom: 0, left: 0, width: 0 });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const mentionRef = useRef<HTMLDivElement>(null);

  const llmService = getLLMService();
  const isConfigured = llmService.isConfigured();
  const currentProvider = LLMFactory.getCurrentProvider() || 'gemini';

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

  // Update context page when selected page changes
  useEffect(() => {
    setContextPageIndex(selectedPageIndex);
  }, [selectedPageIndex]);

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
    const pages = Array.from({ length: template.pages.length }, (_, i) => i);
    if (!mentionFilter) return pages;
    
    const filterNum = parseInt(mentionFilter);
    if (!isNaN(filterNum)) {
      return pages.filter(p => (p + 1).toString().startsWith(filterNum.toString()));
    }
    return pages;
  };

  const selectPageFromMention = (pageIndex: number) => {
    setContextPageIndex(pageIndex);
    
    // Replace the @ mention with the page reference
    const cursorPosition = inputRef.current?.selectionStart || 0;
    const textBeforeCursor = inputMessage.substring(0, cursorPosition);
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');
    const textAfterCursor = inputMessage.substring(cursorPosition);
    
    const newMessage = inputMessage.substring(0, lastAtIndex) + 
                      `@page${pageIndex + 1} ` + 
                      textAfterCursor;
    
    setInputMessage(newMessage);
    setShowPageMention(false);
    
    // Focus back on input
    setTimeout(() => {
      inputRef.current?.focus();
      const newCursorPos = lastAtIndex + `@page${pageIndex + 1} `.length;
      inputRef.current?.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
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

  const handleSendMessage = async () => {
    const message = inputMessage.trim();
    if (!message || !isConnected || isLoading) return;

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
      // Get current page content
      const currentPage = template.pages[contextPageIndex];
      const currentContent = currentPage.content;
      
      // Create prompt for HTML modification
      const prompt = `You are an AI assistant helping to edit HTML content. 
The user is editing page ${contextPageIndex + 1} of a document.

Current HTML content of the page:
\`\`\`html
${currentContent}
\`\`\`

User request: ${message}

IMPORTANT: Return ONLY the HTML code. Do not include:
- Any explanations or descriptions
- Markdown code blocks (\`\`\`html or \`\`\`)
- Text before or after the HTML
- Comments about what was changed

Just return the raw HTML starting with the first < and ending with the last >.
Use inline styles for all styling. Keep the same structure but apply the requested changes.`;

      // Get response from LLM
      const response = await llmService.generateContent(prompt, 'html-editing');
      
      console.log('LLM Response:', response);
      
      // Extract HTML code from the response
      const extractedCode = extractHTMLCode(response);
      
      if (extractedCode) {
        console.log('Extracted HTML code:', extractedCode);
        
        // Validate the extracted code
        try {
          // Basic validation - ensure it's well-formed HTML
          const parser = new DOMParser();
          const doc = parser.parseFromString(extractedCode, 'text/html');
          const parseErrors = doc.querySelector('parsererror');
          
          if (parseErrors) {
            console.error('HTML parsing error:', parseErrors.textContent);
            throw new Error('Invalid HTML structure');
          }
          
          // Update the template
          const updatedTemplate: HTMLTemplate = {
            ...template,
            pages: template.pages.map((page, index) => 
              index === contextPageIndex 
                ? { ...page, content: extractedCode }
                : page
            ),
            updatedAt: new Date()
          };
          
          onTemplateUpdate(updatedTemplate);
          
          // Show success message
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: `✓ Successfully updated Page ${contextPageIndex + 1}`,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, assistantMessage]);
        } catch (validationError) {
          console.error('HTML validation failed:', validationError);
          // Show error message
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: `❌ The generated HTML appears to be invalid. Please try again with a different request.`,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, assistantMessage]);
        }
      } else {
        console.log('Could not extract HTML code from response');
        // Show the response as a regular message
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
      }

    } catch (err) {
      setError('Failed to get response. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
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
                      <code>{currentProvider === 'claude' ? 'See Claude setup instructions' : currentProvider === 'mistral' ? 'VITE_MISTRAL_API_KEY=your-key' : 'VITE_GEMINI_API_KEY=your-key'}</code>
                    </>
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
                  <h4>Select Page to Edit</h4>
                  <div className="page-selector-grid">
                    {Array.from({ length: template.pages.length }, (_, i) => (
                      <button
                        key={i}
                        className={`page-selector-button ${i === contextPageIndex ? 'selected' : ''} ${i === selectedPageIndex ? 'current' : ''}`}
                        onClick={() => setContextPageIndex(i)}
                        title={i === selectedPageIndex ? 'Currently viewing this page' : `Click to edit page ${i + 1}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <p className="context-info">
                    Editing: Page {contextPageIndex + 1} | Viewing: Page {selectedPageIndex + 1}
                  </p>
                </div>

                {/* Chat Messages */}
                <div className="chat-messages">
                  {messages.length === 0 && (
                    <div className="chat-welcome">
                      <p>👋 Hi! I can help you modify your HTML content.</p>
                      <p>Try asking me to:</p>
                      <ul style={{ fontSize: '14px', textAlign: 'left' }}>
                        <li>Change colors or font sizes</li>
                        <li>Add new elements</li>
                        <li>Modify text content</li>
                        <li>Adjust layouts</li>
                      </ul>
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
                    placeholder="Ask me to modify your HTML... (use @ to select pages)"
                    rows={2}
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSendMessage}
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
                    Select page to edit
                  </div>
                  <div className="page-mention-list">
                    {getFilteredPages().map((pageIndex, index) => (
                      <div
                        key={pageIndex}
                        className={`page-mention-item ${index === selectedMentionIndex ? 'selected' : ''} ${pageIndex === contextPageIndex ? 'in-context' : ''}`}
                        onClick={() => selectPageFromMention(pageIndex)}
                        onMouseEnter={() => setSelectedMentionIndex(index)}
                      >
                        <span className="page-mention-number">Page {pageIndex + 1}</span>
                        {pageIndex === selectedPageIndex && <span className="page-mention-current">👁️</span>}
                        {pageIndex === contextPageIndex && <span className="page-mention-selected">✓</span>}
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