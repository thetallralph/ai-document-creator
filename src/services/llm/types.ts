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

export type TextImprovementType = 'clarity' | 'conciseness' | 'tone' | 'grammar';

export interface LLMService {
  isConfigured(): boolean;
  isAuthenticated(): boolean;
  getAuthError(): string | null;
  verifyAuthentication(): Promise<boolean>;
  
  analyzeDocument(documentContent: string, documentType: string): Promise<DocumentAnalysis>;
  suggestElementImprovement(elementType: string, elementContent: string, context: string): Promise<string>;
  generateContent(prompt: string, context: string): Promise<string>;
  improveText(originalText: string, improvementType: TextImprovementType): Promise<string>;
  improvePageLayout(pageCode: string, documentType: string, additionalInstructions?: string): Promise<string>;
  improveSinglePage(pageInnerContent: string, documentType: string, pageNumber: number, additionalInstructions?: string): Promise<string>;
}

export type LLMProvider = 'gemini' | 'claude' | 'mistral';

export interface LLMConfig {
  provider: LLMProvider;
  apiKey?: string;
  model?: string;
}