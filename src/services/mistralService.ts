import { Mistral } from '@mistralai/mistralai';

interface ImprovePageOptions {
  pageContent: string;
  instructions?: string;
  pageIndex: number;
  totalPages: number;
}

class MistralService {
  private client: Mistral | null = null;
  private model: string = '';
  private agentId: string | null = null;
  private useAgent: boolean = false;

  constructor() {
    this.initializeClient();
  }

  private initializeClient() {
    const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
    this.model = import.meta.env.VITE_LLM_MODEL || 'mistral-small-latest';
    this.agentId = import.meta.env.VITE_MISTRAL_AGENT_ID || null;
    this.useAgent = !!this.agentId;

    if (!apiKey) {
      console.warn('Mistral API key not found');
      return;
    }

    try {
      this.client = new Mistral({ apiKey });
      console.log('Mistral client initialized', this.useAgent ? `with agent: ${this.agentId}` : 'with model');
    } catch (error) {
      console.error('Failed to initialize Mistral client:', error);
    }
  }

  isConnected(): boolean {
    return this.client !== null;
  }

  private async sendMessageToAgent(prompt: string): Promise<string> {
    if (!this.client || !this.agentId) {
      throw new Error('Mistral client or agent not configured');
    }

    try {
      const response = await this.client.beta.conversations.start({
        agentId: this.agentId,
        inputs: [{ role: 'user', content: prompt }]
      });

      if (!response.outputs || response.outputs.length === 0) {
        throw new Error('No response from Mistral agent');
      }

      const lastOutput = response.outputs[response.outputs.length - 1];
      if ('content' in lastOutput && typeof lastOutput.content === 'string') {
        return lastOutput.content;
      }

      throw new Error('Invalid response format from agent');
    } catch (error) {
      console.error('Mistral agent error:', error);
      throw error;
    }
  }

  private async sendMessageToModel(prompt: string, temperature: number = 0.7, maxTokens: number = 4000): Promise<string> {
    if (!this.client) {
      throw new Error('Mistral client not initialized');
    }

    try {
      const response = await this.client.chat.complete({
        model: this.model,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature,
        maxTokens,
      });

      if (!response.choices?.[0]?.message?.content) {
        throw new Error('No response from Mistral');
      }

      const content = response.choices[0].message.content;
      return typeof content === 'string' ? content : JSON.stringify(content);
    } catch (error) {
      console.error('Mistral API error:', error);
      throw error;
    }
  }

  async improveSinglePage({ pageContent, instructions, pageIndex, totalPages }: ImprovePageOptions): Promise<string> {
    if (!this.client) {
      throw new Error('Mistral client not initialized');
    }

    let prompt = `You are improving a document page. This is page ${pageIndex + 1} of ${totalPages}.

CRITICAL: You must return ONLY the inner content of the Page component without any wrapper.
Do NOT include <Page> tags or any imports.
Return ONLY the JSX content that goes inside the Page component.

For styles, ALWAYS use the React inline style syntax: style={{ property: 'value' }}
- CORRECT: style={{ color: 'red', fontSize: '16px' }}
- WRONG: style="color: red"
- WRONG: style={{{ color: 'red' }}}

`;

    if (instructions) {
      prompt += `Follow ONLY these specific instructions:
${instructions}

`;
    } else {
      prompt += `General improvements to make:
- Better visual hierarchy and typography
- Improved spacing and alignment
- Professional color usage
- Clear structure and organization

`;
    }

    prompt += `Current page content to improve:
${pageContent}

Remember: Return ONLY the improved inner content, no <Page> wrapper, no imports.`;

    try {
      let responseContent: string;
      
      if (this.useAgent) {
        responseContent = await this.sendMessageToAgent(prompt);
      } else {
        responseContent = await this.sendMessageToModel(prompt, 0.7, 4000);
      }

      let improvedContent = responseContent.trim();

      // Remove any Page wrapper if AI included it
      const pageMatch = improvedContent.match(/<Page[^>]*>([\s\S]*)<\/Page>/);
      if (pageMatch) {
        improvedContent = pageMatch[1].trim();
      }

      // Remove any import statements
      improvedContent = improvedContent.replace(/^import\s+.*?;?\s*$/gm, '').trim();

      // Fix common style syntax errors
      improvedContent = improvedContent.replace(/style=\{\{\{/g, 'style={{');
      improvedContent = improvedContent.replace(/\}\}\}/g, '}}');

      // Fix French apostrophes in text content
      improvedContent = improvedContent.replace(/([>])[^<]*'/g, (match, prefix) => {
        const textPart = match.substring(1);
        if (textPart.includes("'")) {
          return prefix + textPart.replace(/'/g, "\\'");
        }
        return match;
      });

      return improvedContent;
    } catch (error) {
      console.error('Mistral API error:', error);
      throw error;
    }
  }

  async improveText(text: string, improvementType: string): Promise<string> {
    if (!this.client) {
      throw new Error('Mistral client not initialized');
    }

    const prompts: Record<string, string> = {
      clarity: 'Make this text clearer and easier to understand while keeping the same meaning:',
      concise: 'Make this text more concise without losing important information:',
      tone: 'Improve the professional tone of this text:',
      grammar: 'Fix any grammar or spelling errors in this text:'
    };

    const prompt = prompts[improvementType] || prompts.clarity;

    try {
      const fullPrompt = `${prompt}\n\n"${text}"\n\nReturn only the improved text without quotes.`;
      
      let responseContent: string;
      if (this.useAgent) {
        responseContent = await this.sendMessageToAgent(fullPrompt);
      } else {
        responseContent = await this.sendMessageToModel(fullPrompt, 0.3, 1000);
      }

      return responseContent.trim().replace(/^["']|["']$/g, '');
    } catch (error) {
      console.error('Mistral API error:', error);
      throw error;
    }
  }

  async analyzeDocument(documentContent: string): Promise<string> {
    if (!this.client) {
      throw new Error('Mistral client not initialized');
    }

    const prompt = `Analyze this document and provide design improvement suggestions:

${documentContent}

Provide specific, actionable suggestions for:
1. Visual hierarchy and typography
2. Color scheme and contrast
3. Layout and spacing
4. Content organization
5. Overall professional appearance

Keep suggestions concise and practical.`;

    try {
      let responseContent: string;
      
      if (this.useAgent) {
        responseContent = await this.sendMessageToAgent(prompt);
      } else {
        responseContent = await this.sendMessageToModel(prompt, 0.5, 2000);
      }

      return responseContent.trim();
    } catch (error) {
      console.error('Mistral API error:', error);
      throw error;
    }
  }

  async generateHTMLContent(prompt: string): Promise<string> {
    if (!this.client) {
      throw new Error('Mistral client not initialized');
    }

    try {
      let responseContent: string;
      
      if (this.useAgent) {
        responseContent = await this.sendMessageToAgent(prompt);
      } else {
        responseContent = await this.sendMessageToModel(prompt, 0.7, 4000);
      }

      // Clean up the response
      let cleanedContent = responseContent.trim();
      
      // Remove markdown code blocks if present
      cleanedContent = cleanedContent.replace(/^```(?:html?)?\s*\n/gm, '');
      cleanedContent = cleanedContent.replace(/\n```$/gm, '');
      
      // Remove any explanatory text before/after HTML
      const firstTagIndex = cleanedContent.indexOf('<');
      const lastTagIndex = cleanedContent.lastIndexOf('>');
      
      if (firstTagIndex !== -1 && lastTagIndex !== -1 && lastTagIndex > firstTagIndex) {
        cleanedContent = cleanedContent.substring(firstTagIndex, lastTagIndex + 1);
      }

      return cleanedContent;
    } catch (error) {
      console.error('Mistral API error:', error);
      throw error;
    }
  }
}

export const mistralService = new MistralService();

export async function generateDocumentTemplate(prompt: string): Promise<string> {
  if (!mistralService.isConnected()) {
    throw new Error('Mistral AI is not configured. Please set VITE_MISTRAL_API_KEY in your .env file');
  }

  try {
    // Add a public method to the class or use the existing private methods
    const service = mistralService as any;
    const response = service.useAgent 
      ? await service.sendMessageToAgent(prompt)
      : await service.sendMessageToModel(prompt, 0.7, 8000); // Higher max tokens for document generation
    return response;
  } catch (error: any) {
    console.error('Error generating document template:', error);
    throw new Error(error.message || 'Failed to generate document template');
  }
}