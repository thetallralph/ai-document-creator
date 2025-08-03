import { LLMService, DocumentAnalysis, TextImprovementType } from './types';
import { mistralService } from '../mistralService';

export class MistralAdapter implements LLMService {
  private apiKey: string | undefined;
  private model: string;

  constructor(apiKey?: string, model?: string) {
    this.apiKey = apiKey || import.meta.env.VITE_MISTRAL_API_KEY;
    this.model = model || import.meta.env.VITE_LLM_MODEL || 'mistral-small-latest';
  }

  isConfigured(): boolean {
    return !!this.apiKey;
  }

  isAuthenticated(): boolean {
    return mistralService.isConnected();
  }

  getAuthError(): string | null {
    if (!this.isConfigured()) {
      return 'Mistral API key not configured';
    }
    if (!this.isAuthenticated()) {
      return 'Mistral client not initialized';
    }
    return null;
  }

  async verifyAuthentication(): Promise<boolean> {
    try {
      if (!this.isConfigured()) {
        return false;
      }
      // Simple test to verify connection
      await mistralService.improveText('test', 'clarity');
      return true;
    } catch (error) {
      console.error('Mistral authentication verification failed:', error);
      return false;
    }
  }

  async analyzeDocument(documentContent: string, _documentType: string): Promise<DocumentAnalysis> {
    try {
      const analysis = await mistralService.analyzeDocument(documentContent);
      
      // Parse the analysis into structured format
      const lines = analysis.split('\n').filter(line => line.trim());
      const designSuggestions: string[] = [];
      const contentSuggestions: string[] = [];
      let overallFeedback = '';
      
      let currentSection = '';
      for (const line of lines) {
        if (line.includes('Visual hierarchy') || line.includes('Color scheme') || 
            line.includes('Layout') || line.includes('typography')) {
          currentSection = 'design';
          designSuggestions.push(line);
        } else if (line.includes('Content') || line.includes('organization')) {
          currentSection = 'content';
          contentSuggestions.push(line);
        } else if (line.includes('Overall') || line.includes('professional')) {
          currentSection = 'overall';
          overallFeedback += line + ' ';
        } else if (currentSection === 'design') {
          designSuggestions.push(line);
        } else if (currentSection === 'content') {
          contentSuggestions.push(line);
        } else if (currentSection === 'overall') {
          overallFeedback += line + ' ';
        }
      }

      return {
        designSuggestions: designSuggestions.slice(0, 5),
        contentSuggestions: contentSuggestions.slice(0, 5),
        layoutScore: 0.75,
        readabilityScore: 0.8,
        overallFeedback: overallFeedback.trim() || 'Document structure is good. Consider the suggestions above for improvements.'
      };
    } catch (error) {
      console.error('Mistral document analysis failed:', error);
      throw new Error('Failed to analyze document');
    }
  }

  async suggestElementImprovement(elementType: string, elementContent: string, context: string): Promise<string> {
    const prompt = `Suggest improvements for this ${elementType} element in the context of ${context}:\n${elementContent}`;
    return this.generateContent(prompt, context);
  }

  async generateContent(prompt: string, context: string): Promise<string> {
    try {
      const fullPrompt = `Context: ${context}\n\n${prompt}`;
      return await mistralService.improveText(fullPrompt, 'clarity');
    } catch (error) {
      console.error('Mistral content generation failed:', error);
      throw new Error('Failed to generate content');
    }
  }

  async improveText(originalText: string, improvementType: TextImprovementType): Promise<string> {
    return mistralService.improveText(originalText, improvementType);
  }

  async improvePageLayout(pageCode: string, documentType: string, additionalInstructions?: string): Promise<string> {
    // For compatibility with existing interface
    return this.improveSinglePage(pageCode, documentType, 0, additionalInstructions);
  }

  async improveSinglePage(
    pageInnerContent: string, 
    documentType: string, 
    pageNumber: number, 
    additionalInstructions?: string
  ): Promise<string> {
    return mistralService.improveSinglePage({
      pageContent: pageInnerContent,
      instructions: additionalInstructions,
      pageIndex: pageNumber,
      totalPages: 1 // This will be overridden by the actual page count in practice
    });
  }
}