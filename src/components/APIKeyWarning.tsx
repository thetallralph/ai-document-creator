import React, { useState } from 'react';

interface APIKeyWarningProps {
  provider: 'gemini' | 'claude' | 'mistral';
}

export const APIKeyWarning: React.FC<APIKeyWarningProps> = ({ provider }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div style={{
      backgroundColor: '#fff3cd',
      border: '1px solid #ffeaa7',
      borderRadius: '4px',
      padding: '12px',
      marginBottom: '16px',
      fontSize: '14px',
      color: '#856404'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        cursor: 'pointer'
      }} onClick={() => setIsExpanded(!isExpanded)}>
        <strong>⚠️ Security Warning</strong>
        <button style={{
          background: 'none',
          border: 'none',
          color: '#856404',
          cursor: 'pointer',
          fontSize: '12px',
          padding: '2px 6px'
        }}>
          {isExpanded ? '▲' : '▼'}
        </button>
      </div>
      
      {isExpanded && (
        <>
          <div style={{ marginTop: '8px' }}>
            This app is currently configured to use API keys directly in the browser. 
            This is only suitable for development. In production, you should:
          </div>
          <ul style={{ marginTop: '8px', marginBottom: '0' }}>
            <li>Use a backend proxy server to handle API calls</li>
            <li>Never expose API keys in client-side code</li>
            <li>Implement proper authentication and rate limiting</li>
          </ul>
          {provider === 'claude' && (
            <p style={{ marginTop: '8px', marginBottom: '0' }}>
              The Claude API key is being used with <code>dangerouslyAllowBrowser: true</code> which is only for development.
            </p>
          )}
        </>
      )}
    </div>
  );
};