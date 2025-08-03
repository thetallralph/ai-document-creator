import Anthropic from '@anthropic-ai/sdk';
import { 
  LLMService, 
  DocumentAnalysis, 
  TextImprovementType 
} from './types';

export class ClaudeAdapter implements LLMService {
  private anthropic: Anthropic | null = null;
  private isAuthenticatedFlag = false;
  private authenticationError: string | null = null;
  private model: string;
  private apiKey: string | undefined;

  constructor(apiKey?: string, model: string = 'claude-3-sonnet-20240229') {
    this.apiKey = apiKey || import.meta.env.VITE_CLAUDE_API_KEY;
    this.model = model;
    
    if (!this.apiKey) {
      console.warn('Claude API key not found. Please set VITE_CLAUDE_API_KEY in your .env file');
    } else {
      // Note: This will need a proxy in production to avoid exposing the API key
      this.anthropic = new Anthropic({
        apiKey: this.apiKey,
        // @ts-ignore - dangerouslyAllowBrowser is needed for development
        dangerouslyAllowBrowser: true // Only for development
      });
    }
  }

  isConfigured(): boolean {
    return !!this.apiKey;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedFlag;
  }

  getAuthError(): string | null {
    return this.authenticationError;
  }

  async verifyAuthentication(): Promise<boolean> {
    if (!this.apiKey) {
      this.authenticationError = 'No API key provided';
      return false;
    }
    
    try {
      // Test if Claude API is working with a minimal request
      const message = await this.anthropic!.messages.create({
        model: this.model,
        max_tokens: 10,
        messages: [{ role: 'user', content: 'Hi' }]
      });
        
      if (message) {
        this.isAuthenticatedFlag = true;
        this.authenticationError = null;
        return true;
      }
      
      throw new Error('No response received');
    } catch (error: any) {
      this.isAuthenticatedFlag = false;
      console.error('Claude authentication error details:', error);
      
      const errorMessage = error.message || error.toString();
      
      if (errorMessage.includes('401') || errorMessage.includes('Invalid') || errorMessage.includes('Unauthorized')) {
        this.authenticationError = 'Invalid API key';
      } else if (errorMessage.includes('403') || errorMessage.includes('Forbidden')) {
        this.authenticationError = 'API key lacks required permissions';
      } else if (errorMessage.includes('429') || errorMessage.includes('rate_limit')) {
        this.authenticationError = 'Rate limit exceeded';
      } else if (errorMessage.includes('quota')) {
        this.authenticationError = 'API quota exceeded';
      } else {
        this.authenticationError = `Authentication failed: ${errorMessage.substring(0, 100)}`;
      }
      
      return false;
    }
  }

  async analyzeDocument(documentContent: string, documentType: string): Promise<DocumentAnalysis> {
    if (!this.anthropic) throw new Error('Claude API not configured');
    if (!this.isAuthenticatedFlag) throw new Error('Not authenticated. Please check your API key.');

    const prompt = `
      Analyze this document content and provide professional design and content suggestions.
      Document Type: ${documentType}
      Document Content Structure: ${documentContent}

      Please provide:
      1. Design suggestions (3-5 specific improvements)
      2. Content suggestions (3-5 specific improvements)
      3. Layout score (0-100)
      4. Readability score (0-100)
      5. Overall feedback (2-3 sentences)

      Format your response as JSON matching this structure:
      {
        "designSuggestions": ["suggestion1", "suggestion2"],
        "contentSuggestions": ["suggestion1", "suggestion2"],
        "layoutScore": 85,
        "readabilityScore": 90,
        "overallFeedback": "Overall feedback here"
      }
    `;

    try {
      const message = await this.anthropic.messages.create({
        model: this.model,
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      });
      
      const text = message.content[0].type === 'text' ? message.content[0].text : '';
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Error analyzing document:', error);
      throw error;
    }
  }

  async suggestElementImprovement(elementType: string, elementContent: string, context: string): Promise<string> {
    if (!this.anthropic) throw new Error('Claude API not configured');
    if (!this.isAuthenticatedFlag) throw new Error('Not authenticated. Please check your API key.');

    const prompt = `
      Suggest an improvement for this ${elementType} element in a document.
      Current content: ${elementContent}
      Context: ${context}

      Provide a specific, actionable suggestion in 1-2 sentences.
    `;

    try {
      const message = await this.anthropic.messages.create({
        model: this.model,
        max_tokens: 200,
        messages: [{ role: 'user', content: prompt }]
      });
        
      const text = message.content[0].type === 'text' ? message.content[0].text : '';
      return text.trim();
    } catch (error) {
      console.error('Error getting element suggestion:', error);
      throw error;
    }
  }

  async generateContent(prompt: string, context: string): Promise<string> {
    if (!this.anthropic) throw new Error('Claude API not configured');
    if (!this.isAuthenticatedFlag) throw new Error('Not authenticated. Please check your API key.');

    const fullPrompt = `
      Context: ${context}
      Request: ${prompt}

      Please provide a helpful response that fits the document design context.
    `;

    try {
      const message = await this.anthropic.messages.create({
        model: this.model,
        max_tokens: 500,
        messages: [{ role: 'user', content: fullPrompt }]
      });
        
      const text = message.content[0].type === 'text' ? message.content[0].text : '';
      return text;
    } catch (error) {
      console.error('Error generating content:', error);
      throw error;
    }
  }

  async improveText(originalText: string, improvementType: TextImprovementType): Promise<string> {
    if (!this.anthropic) throw new Error('Claude API not configured');
    if (!this.isAuthenticatedFlag) throw new Error('Not authenticated. Please check your API key.');

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
      const message = await this.anthropic.messages.create({
        model: this.model,
        max_tokens: 300,
        messages: [{ role: 'user', content: prompt }]
      });
        
      const text = message.content[0].type === 'text' ? message.content[0].text : '';
      return text.trim();
    } catch (error) {
      console.error('Error improving text:', error);
      throw error;
    }
  }

  async improvePageLayout(pageCode: string, documentType: string, additionalInstructions?: string): Promise<string> {
    if (!this.anthropic) throw new Error('Claude API not configured');
    if (!this.isAuthenticatedFlag) throw new Error('Not authenticated. Please check your API key.');

    console.log('=== Claude Page Improvement Request ===');
    console.log('Page code received:', pageCode);
    console.log('Document type:', documentType);
    console.log('Additional instructions:', additionalInstructions || 'None');

    const prompt = `
      You are a professional UI/UX designer improving the content inside a document page.
      
      Current page content (this is the content INSIDE a <Page> component):
      \`\`\`tsx
      ${pageCode}
      \`\`\`

      IMPORTANT INSTRUCTIONS:
      ${additionalInstructions ? `
      User instructions: ${additionalInstructions}
      
      ONLY follow the user's instructions above. Do NOT make any other changes.
      ` : `
      Since no specific instructions were provided, improve the overall design by:
      - Enhancing visual hierarchy and readability
      - Improving spacing and alignment
      - Ensuring professional and modern design
      `}

      CRITICAL REQUIREMENTS:
      1. Use ONLY standard HTML elements (div, h1, h2, p, span, img, etc.)
      2. STYLE SYNTAX: Always use style={{ property: 'value' }} with DOUBLE curly braces
         - CORRECT: style={{ color: 'red', fontSize: '16px' }}
         - WRONG: style={ color: 'red' } or style={{{ ... }}}
      3. Do NOT use any imported components or external dependencies
      4. Do NOT reference any variables like 'styles' or imported objects
      5. Keep all text content exactly the same
      6. Do NOT add a <Page> wrapper - return only the inner content
      7. IMPORTANT: Properly escape all quotes in text content:
         - If text contains apostrophes ('), wrap the text in double quotes "
         - Example: <p>L'application</p> or <p>{"L'application"}</p>
      
      Return ONLY the improved inner content without any explanation, markdown code blocks, or Page wrapper.
      The response should be valid TSX that will be placed inside a Page component.
    `;

    try {
      const message = await this.anthropic.messages.create({
        model: this.model,
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }]
      });
      
      let improvedCode = message.content[0].type === 'text' ? message.content[0].text : '';
      
      console.log('=== Claude Response ===');
      console.log('Raw response:', improvedCode);
      
      // Remove markdown code blocks if present
      improvedCode = improvedCode.replace(/^```[\w]*\n/gm, '');
      improvedCode = improvedCode.replace(/\n```$/gm, '');
      
      console.log('After removing markdown blocks:', improvedCode);
      
      // Post-process to fix common syntax issues
      improvedCode = improvedCode.replace(/>([^<]*['].*?)</g, (match, content) => {
        if (content.includes("'") && !content.startsWith('{')) {
          return `>{${JSON.stringify(content)}}<`;
        }
        return match;
      });
      
      console.log('Final processed code:', improvedCode);
      console.log('=== End Claude Response ===');
      
      return improvedCode;
    } catch (error) {
      console.error('Error improving page layout:', error);
      throw error;
    }
  }

  async improveSinglePage(pageInnerContent: string, documentType: string, pageNumber: number, additionalInstructions?: string): Promise<string> {
    if (!this.anthropic) throw new Error('Claude API not configured');
    if (!this.isAuthenticatedFlag) throw new Error('Not authenticated. Please check your API key.');

    console.log('=== Claude Single Page Improvement Request ===');
    console.log('Document type:', documentType);
    console.log('Page number:', pageNumber);
    console.log('Additional instructions:', additionalInstructions || 'None');
    console.log('Page content length:', pageInnerContent.length);

    const prompt = `
      You are a professional UI/UX designer improving the content inside a document page.
      
      Current page ${pageNumber} content (this is the content INSIDE a <Page> component):
      \`\`\`tsx
      ${pageInnerContent}
      \`\`\`

      IMPORTANT INSTRUCTIONS:
      ${additionalInstructions ? `
      User instructions: ${additionalInstructions}
      
      ONLY follow the user's instructions above. Do NOT make any other changes.
      ` : `
      Since no specific instructions were provided, improve the overall design by:
      - Enhancing visual hierarchy and readability
      - Improving spacing and alignment
      - Ensuring professional and modern design
      `}

      CRITICAL REQUIREMENTS:
      1. Use ONLY standard HTML elements (div, h1, h2, p, span, img, etc.)
      2. STYLE SYNTAX: Always use style={{ property: 'value' }} with DOUBLE curly braces
         - CORRECT: style={{ color: 'red', fontSize: '16px' }}
         - WRONG: style={ color: 'red' } or style={{{ ... }}}
      3. Do NOT use any imported components or external dependencies
      4. Do NOT reference any variables like 'styles' or imported objects
      5. Keep all text content exactly the same
      6. Do NOT add a <Page> wrapper - return only the inner content
      7. IMPORTANT: Properly escape all quotes in text content:
         - If text contains apostrophes ('), wrap the text in double quotes "
         - Example: <p>L'application</p> or <p>{"L'application"}</p>
      
      Return ONLY the improved inner content without any explanation, markdown code blocks, or Page wrapper.
      The response should be valid TSX that will be placed inside a Page component.
    `;

    try {
      const message = await this.anthropic.messages.create({
        model: this.model,
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }]
      });
      
      let improvedCode = message.content[0].type === 'text' ? message.content[0].text : '';
      
      console.log('=== Claude Single Page Response ===');
      console.log('Raw response:', improvedCode);
      
      // Remove markdown code blocks if present
      improvedCode = improvedCode.replace(/^```[\w]*\n/gm, '');
      improvedCode = improvedCode.replace(/\n```$/gm, '');
      
      console.log('After removing markdown blocks:', improvedCode);
      
      // Check if AI incorrectly returned a Page wrapper
      if (improvedCode.includes('<Page') || improvedCode.includes('</Page>')) {
        console.error('AI returned a Page wrapper when it should not have!');
        const innerMatch = improvedCode.match(/<Page[^>]*>([\s\S]*)<\/Page>/);
        if (innerMatch) {
          improvedCode = innerMatch[1];
          console.log('Extracted inner content from Page wrapper');
        }
      }
      
      // Post-process to fix common syntax issues
      improvedCode = improvedCode.replace(/>([^<]*['].*?)</g, (match, content) => {
        if (content.includes("'") && !content.startsWith('{')) {
          return `>{${JSON.stringify(content)}}<`;
        }
        return match;
      });
      
      console.log('Final processed code:', improvedCode);
      console.log('=== End Claude Single Page Response ===');
      
      return improvedCode;
    } catch (error) {
      console.error('Error improving page:', error);
      throw error;
    }
  }
}