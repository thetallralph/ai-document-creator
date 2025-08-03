import { getLLMService } from './llm/factory';

export async function generateDocumentTemplate(prompt: string): Promise<string> {
  try {
    // Get the LLM service (will use Claude if VITE_LLM_PROVIDER=claude)
    const llmService = getLLMService();
    
    // Check if authenticated
    if (!llmService.isAuthenticated()) {
      // Try to authenticate
      const authResult = await llmService.verifyAuthentication();
      if (!authResult) {
        const authError = llmService.getAuthError();
        throw new Error(authError || 'Claude authentication failed');
      }
    }
    
    // Generate content using the LLM service
    const response = await llmService.generateContent(
      prompt,
      'Document template generation'
    );
    
    return response;
  } catch (error: any) {
    console.error('Error generating document template with Claude:', error);
    
    // If using Claude Code SDK, provide helpful error messages
    if (error.message.includes('backend service not running')) {
      throw new Error('Claude backend service not running. Please start it with: cd server && npm start');
    } else if (error.message.includes('Claude CLI not installed')) {
      throw new Error('Claude CLI not installed. Run: npm install -g @anthropic-ai/claude-code');
    } else if (error.message.includes('Claude CLI not authenticated')) {
      throw new Error('Claude CLI not authenticated. Run: claude login');
    }
    
    throw new Error(error.message || 'Failed to generate document template');
  }
}