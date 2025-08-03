/// <reference types="vite/client" />

declare module '*.tsx?raw' {
  const content: string;
  export default content;
}

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY?: string;
  readonly VITE_CLAUDE_API_KEY?: string;
  readonly VITE_LLM_PROVIDER?: 'gemini' | 'claude';
  readonly VITE_LLM_MODEL?: string;
  readonly VITE_USE_CLAUDE_CODE_SDK?: string;
  readonly VITE_CLAUDE_BACKEND_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
