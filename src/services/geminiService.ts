import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn('Gemini API key not found. Please set VITE_GEMINI_API_KEY in your .env file');
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export interface DocumentAnalysis {
  designSuggestions: string[];
  contentSuggestions: string[];
  layoutScore: number;
  readabilityScore: number;
  overallFeedback: string;
}

export interface ElementSuggestion {
  elementId: string;
  suggestion: string;
  priority: 'high' | 'medium' | 'low';
}

let isAuthenticated = false;
let authenticationError: string | null = null;

export const geminiService = {
  isConfigured: () => !!API_KEY,
  
  isAuthenticated: () => isAuthenticated,
  
  getAuthError: () => authenticationError,
  
  async verifyAuthentication(): Promise<boolean> {
    if (!API_KEY) {
      authenticationError = 'No API key provided';
      return false;
    }
    
    try {
      const testModel = genAI!.getGenerativeModel({ model: 'gemini-1.5-flash' });
      // Simple test to verify the API key works
      const result = await testModel.generateContent('Hello');
      await result.response;
      isAuthenticated = true;
      authenticationError = null;
      return true;
    } catch (error: any) {
      isAuthenticated = false;
      console.error('Authentication error details:', error);
      
      // Check for specific error patterns
      const errorMessage = error.message || error.toString();
      
      if (errorMessage.includes('API_KEY_INVALID') || errorMessage.includes('API key not valid')) {
        authenticationError = 'Invalid API key';
      } else if (errorMessage.includes('PERMISSION_DENIED')) {
        authenticationError = 'API key lacks required permissions';
      } else if (errorMessage.includes('quota')) {
        authenticationError = 'API quota exceeded';
      } else if (errorMessage.includes('403')) {
        authenticationError = 'API key not authorized. Please enable Generative Language API in Google Cloud Console';
      } else {
        authenticationError = `Authentication failed: ${errorMessage.substring(0, 100)}`;
      }
      
      return false;
    }
  },

  async analyzeDocument(documentContent: string, documentType: string): Promise<DocumentAnalysis> {
    if (!genAI) throw new Error('Gemini API not configured');
    if (!isAuthenticated) throw new Error('Not authenticated. Please check your API key.');

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

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
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Parse JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Error analyzing document:', error);
      throw error;
    }
  },

  async suggestElementImprovement(elementType: string, elementContent: string, context: string): Promise<string> {
    if (!genAI) throw new Error('Gemini API not configured');
    if (!isAuthenticated) throw new Error('Not authenticated. Please check your API key.');

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      Suggest an improvement for this ${elementType} element in a document.
      Current content: ${elementContent}
      Context: ${context}

      Provide a specific, actionable suggestion in 1-2 sentences.
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error('Error getting element suggestion:', error);
      throw error;
    }
  },

  async generateContent(prompt: string, context: string): Promise<string> {
    if (!genAI) throw new Error('Gemini API not configured');
    if (!isAuthenticated) throw new Error('Not authenticated. Please check your API key.');

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const fullPrompt = `
      Context: ${context}
      Request: ${prompt}

      Please provide a helpful response that fits the document design context.
    `;

    try {
      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating content:', error);
      throw error;
    }
  },

  async improveText(originalText: string, improvementType: 'clarity' | 'conciseness' | 'tone' | 'grammar'): Promise<string> {
    if (!genAI) throw new Error('Gemini API not configured');
    if (!isAuthenticated) throw new Error('Not authenticated. Please check your API key.');

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

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
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error('Error improving text:', error);
      throw error;
    }
  },

  async improvePageLayout(pageCode: string, documentType: string, additionalInstructions?: string): Promise<string> {
    if (!genAI) throw new Error('Gemini API not configured');
    if (!isAuthenticated) throw new Error('Not authenticated. Please check your API key.');

    console.log('=== AI Page Improvement Request ===');
    console.log('Page code received:', pageCode);
    console.log('Document type:', documentType);
    console.log('Additional instructions:', additionalInstructions || 'None');

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

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
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let improvedCode = response.text().trim();
      
      console.log('=== AI Response ===');
      console.log('Raw AI response:', improvedCode);
      
      // Remove markdown code blocks if present
      improvedCode = improvedCode.replace(/^```[\w]*\n/gm, '');
      improvedCode = improvedCode.replace(/\n```$/gm, '');
      
      console.log('After removing markdown blocks:', improvedCode);
      
      // Post-process to fix common syntax issues
      // Fix unescaped quotes in text content only
      improvedCode = improvedCode.replace(/>([^<]*['].*?)</g, (match, content) => {
        // If content has single quotes, ensure it's properly handled
        if (content.includes("'") && !content.startsWith('{')) {
          return `>{${JSON.stringify(content)}}<`;
        }
        return match;
      });
      
      console.log('Final processed code:', improvedCode);
      console.log('=== End AI Response ===');
      
      return improvedCode;
    } catch (error) {
      console.error('Error improving page layout:', error);
      throw error;
    }
  },

  async improveSinglePage(pageInnerContent: string, documentType: string, pageNumber: number, additionalInstructions?: string): Promise<string> {
    if (!genAI) throw new Error('Gemini API not configured');
    if (!isAuthenticated) throw new Error('Not authenticated. Please check your API key.');

    console.log('=== AI Single Page Improvement Request ===');
    console.log('Document type:', documentType);
    console.log('Page number:', pageNumber);
    console.log('Additional instructions:', additionalInstructions || 'None');
    console.log('Page content length:', pageInnerContent.length);

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

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
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let improvedCode = response.text().trim();
      
      console.log('=== AI Single Page Response ===');
      console.log('Raw AI response:', improvedCode);
      
      // Remove markdown code blocks if present
      improvedCode = improvedCode.replace(/^```[\w]*\n/gm, '');
      improvedCode = improvedCode.replace(/\n```$/gm, '');
      
      console.log('After removing markdown blocks:', improvedCode);
      
      // Check if AI incorrectly returned a Page wrapper
      if (improvedCode.includes('<Page') || improvedCode.includes('</Page>')) {
        console.error('AI returned a Page wrapper when it should not have!');
        // Try to extract just the inner content
        const innerMatch = improvedCode.match(/<Page[^>]*>([\s\S]*)<\/Page>/);
        if (innerMatch) {
          improvedCode = innerMatch[1];
          console.log('Extracted inner content from Page wrapper');
        }
      }
      
      // Post-process to fix common syntax issues
      // Fix unescaped quotes in text content only
      improvedCode = improvedCode.replace(/>([^<]*['].*?)</g, (match, content) => {
        // If content has single quotes, ensure it's properly handled
        if (content.includes("'") && !content.startsWith('{')) {
          return `>{${JSON.stringify(content)}}<`;
        }
        return match;
      });
      
      console.log('Final processed code:', improvedCode);
      console.log('=== End AI Single Page Response ===');
      
      return improvedCode;
    } catch (error) {
      console.error('Error improving page:', error);
      throw error;
    }
  }
};