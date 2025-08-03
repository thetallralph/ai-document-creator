import { LLMService, LLMProvider, LLMConfig } from './types';
import { GeminiAdapter } from './geminiAdapter';
import { ClaudeAdapter } from './claudeAdapter';
import { ClaudeCodeAdapter } from './claudeCodeAdapter';
import { MistralAdapter } from './mistralAdapter';

export class LLMFactory {
  private static instance: LLMService | null = null;
  private static currentProvider: LLMProvider | null = null;

  static createLLMService(config?: LLMConfig): LLMService {
    // If config is provided, recreate the instance with new settings
    if (config) {
      this.instance = null;
      this.currentProvider = null;
    }

    // Return existing instance if already created and no new config
    if (this.instance && !config) {
      return this.instance;
    }

    // Determine provider from config or environment
    const provider = config?.provider || this.getProviderFromEnv();
    const apiKey = config?.apiKey;
    const model = config?.model;

    // Create appropriate adapter based on provider
    switch (provider) {
      case 'gemini':
        this.instance = new GeminiAdapter(apiKey, model);
        break;
      case 'claude':
        // Use ClaudeCodeAdapter if VITE_USE_CLAUDE_CODE_SDK is true
        if (import.meta.env.VITE_USE_CLAUDE_CODE_SDK === 'true') {
          this.instance = new ClaudeCodeAdapter();
        } else {
          this.instance = new ClaudeAdapter(apiKey, model);
        }
        break;
      case 'mistral':
        this.instance = new MistralAdapter(apiKey, model);
        break;
      default:
        throw new Error(`Unsupported LLM provider: ${provider}`);
    }

    this.currentProvider = provider;
    return this.instance;
  }

  private static getProviderFromEnv(): LLMProvider {
    const envProvider = import.meta.env.VITE_LLM_PROVIDER;
    
    if (envProvider && ['gemini', 'claude', 'mistral'].includes(envProvider)) {
      return envProvider as LLMProvider;
    }

    // Default to Gemini for backward compatibility
    return 'gemini';
  }

  static getCurrentProvider(): LLMProvider | null {
    return this.currentProvider;
  }

  static resetInstance(): void {
    this.instance = null;
    this.currentProvider = null;
  }
}

// Export a default instance for convenience
export const getLLMService = (config?: LLMConfig): LLMService => {
  return LLMFactory.createLLMService(config);
};