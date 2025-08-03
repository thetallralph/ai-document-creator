import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EditorCodeContextType {
  editorCode: string | null;
  setEditorCode: (code: string | null) => void;
  isEditorCodeReady: boolean;
}

const EditorCodeContext = createContext<EditorCodeContextType | undefined>(undefined);

export const EditorCodeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [editorCode, setEditorCode] = useState<string | null>(null);
  const isEditorCodeReady = editorCode !== null;

  return (
    <EditorCodeContext.Provider value={{ editorCode, setEditorCode, isEditorCodeReady }}>
      {children}
    </EditorCodeContext.Provider>
  );
};

export function useEditorCode() {
  const context = useContext(EditorCodeContext);
  if (context === undefined) {
    throw new Error('useEditorCode must be used within an EditorCodeProvider');
  }
  return context;
}