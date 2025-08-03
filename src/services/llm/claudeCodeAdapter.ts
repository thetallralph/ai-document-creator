import { 
  LLMService, 
  DocumentAnalysis, 
  TextImprovementType 
} from './types';

export class ClaudeCodeAdapter implements LLMService {
  private isAuthenticatedFlag = false;
  private authenticationError: string | null = null;
  private apiUrl: string;

  constructor() {
    // Use environment variable or default to local backend
    this.apiUrl = import.meta.env.VITE_CLAUDE_BACKEND_URL || 'http://localhost:3001';
  }

  isConfigured(): boolean {
    // Claude Code SDK doesn't need API key configuration
    return true;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedFlag;
  }

  getAuthError(): string | null {
    return this.authenticationError;
  }

  async verifyAuthentication(): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiUrl}/api/claude`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: 'Hello', model: 'sonnet' })
      });
      
      const data = await response.json();
      
      if (data.success) {
        this.isAuthenticatedFlag = true;
        this.authenticationError = null;
        return true;
      } else {
        throw new Error(data.error || 'Authentication failed');
      }
    } catch (error: any) {
      this.isAuthenticatedFlag = false;
      console.error('Claude authentication error:', error);
      
      if (error.message.includes('fetch')) {
        this.authenticationError = 'Claude backend service not running. Start the server with: cd server && npm start';
      } else if (error.message.includes('Claude Code CLI not found')) {
        this.authenticationError = 'Claude CLI not installed on server. Run: npm install -g @anthropic-ai/claude-code';
      } else if (error.message.includes('not authenticated')) {
        this.authenticationError = 'Claude CLI not authenticated on server. Run: claude login';
      } else {
        this.authenticationError = `Authentication failed: ${error.message}`;
      }
      
      return false;
    }
  }

  async analyzeDocument(documentContent: string, documentType: string): Promise<DocumentAnalysis> {
    if (!this.isAuthenticatedFlag) throw new Error('Not authenticated. Please check Claude backend service.');

    try {
      const response = await fetch(`${this.apiUrl}/api/claude/analyze-document`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentContent, documentType })
      });
      
      const data = await response.json();
      
      if (data.success) {
        return data.analysis;
      } else {
        throw new Error(data.error || 'Analysis failed');
      }
    } catch (error) {
      console.error('Error analyzing document:', error);
      throw error;
    }
  }

  async suggestElementImprovement(elementType: string, elementContent: string, context: string): Promise<string> {
    if (!this.isAuthenticatedFlag) throw new Error('Not authenticated. Please check Claude backend service.');

    const prompt = `
      Suggest an improvement for this ${elementType} element in a document.
      Current content: ${elementContent}
      Context: ${context}

      Provide a specific, actionable suggestion in 1-2 sentences.
    `;

    try {
      const response = await fetch(`${this.apiUrl}/api/claude`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      
      const data = await response.json();
      
      if (data.success) {
        return data.response.trim();
      } else {
        throw new Error(data.error || 'Suggestion failed');
      }
    } catch (error) {
      console.error('Error getting element suggestion:', error);
      throw error;
    }
  }

  async generateContent(prompt: string, context: string): Promise<string> {
    if (!this.isAuthenticatedFlag) throw new Error('Not authenticated. Please check Claude backend service.');

    const fullPrompt = `
      Context: ${context}
      Request: ${prompt}

      Please provide a helpful response that fits the document design context.
    `;

    try {
      const response = await fetch(`${this.apiUrl}/api/claude`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: fullPrompt })
      });
      
      const data = await response.json();
      
      if (data.success) {
        return data.response;
      } else {
        throw new Error(data.error || 'Generation failed');
      }
    } catch (error) {
      console.error('Error generating content:', error);
      throw error;
    }
  }

  async improveText(originalText: string, improvementType: TextImprovementType): Promise<string> {
    if (!this.isAuthenticatedFlag) throw new Error('Not authenticated. Please check Claude backend service.');

    const prompts = {
      clarity: 'Rewrite this text to be clearer and easier to understand',
      conciseness: 'Make this text more concise while keeping the key message',
      tone: 'Adjust the tone to be more professional and engaging',
      grammar: 'Fix any grammar, spelling, or punctuation issues'
    };

    const prompt = `
      ${prompts[improvementType]}:
      "${originalText}"

      Provide only the improved text without any explanation.
    `;

    try {
      const response = await fetch(`${this.apiUrl}/api/claude`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      
      const data = await response.json();
      
      if (data.success) {
        return data.response.trim();
      } else {
        throw new Error(data.error || 'Text improvement failed');
      }
    } catch (error) {
      console.error('Error improving text:', error);
      throw error;
    }
  }

  async improvePageLayout(pageCode: string, documentType: string, additionalInstructions?: string): Promise<string> {
    if (!this.isAuthenticatedFlag) throw new Error('Not authenticated. Please check Claude backend service.');

    console.log('=== Claude Code SDK Page Improvement Request ===');
    console.log('Document type:', documentType);
    console.log('Additional instructions:', additionalInstructions || 'None');

    try {
      const response = await fetch(`${this.apiUrl}/api/claude/improve-page`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          pageContent: pageCode, 
          documentType, 
          pageNumber: 1,
          instructions: additionalInstructions 
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        console.log('=== Claude Code SDK Response ===');
        console.log('Improved code received');
        return data.improvedCode;
      } else {
        throw new Error(data.error || 'Page improvement failed');
      }
    } catch (error) {
      console.error('Error improving page layout:', error);
      throw error;
    }
  }

  async improveSinglePage(pageInnerContent: string, documentType: string, pageNumber: number, additionalInstructions?: string): Promise<string> {
    if (!this.isAuthenticatedFlag) throw new Error('Not authenticated. Please check Claude backend service.');

    console.log('=== Claude Code SDK Single Page Improvement Request ===');
    console.log('Document type:', documentType);
    console.log('Page number:', pageNumber);
    console.log('Additional instructions:', additionalInstructions || 'None');

    try {
      const response = await fetch(`${this.apiUrl}/api/claude/improve-page`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          pageContent: pageInnerContent, 
          documentType, 
          pageNumber,
          instructions: additionalInstructions 
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        console.log('=== Claude Code SDK Response ===');
        console.log('Improved page received');
        return data.improvedCode;
      } else {
        throw new Error(data.error || 'Page improvement failed');
      }
    } catch (error) {
      console.error('Error improving page:', error);
      throw error;
    }
  }
}