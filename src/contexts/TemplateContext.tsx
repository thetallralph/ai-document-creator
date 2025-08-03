import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DynamicTemplate {
  id: string;
  name: string;
  description: string;
  code: string;
  component?: React.FC;
  isDynamic: boolean;
}

interface TemplateContextType {
  dynamicTemplates: DynamicTemplate[];
  addDynamicTemplate: (template: Omit<DynamicTemplate, 'isDynamic'>) => string;
  removeDynamicTemplate: (id: string) => void;
  getDynamicTemplate: (id: string) => DynamicTemplate | undefined;
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export const useTemplates = () => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplates must be used within a TemplateProvider');
  }
  return context;
};

export const TemplateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dynamicTemplates, setDynamicTemplates] = useState<DynamicTemplate[]>([]);

  const addDynamicTemplate = (template: Omit<DynamicTemplate, 'isDynamic'>): string => {
    const newTemplate: DynamicTemplate = {
      ...template,
      isDynamic: true
    };
    
    setDynamicTemplates(prev => [...prev, newTemplate]);
    return template.id;
  };

  const removeDynamicTemplate = (id: string) => {
    setDynamicTemplates(prev => prev.filter(t => t.id !== id));
  };

  const getDynamicTemplate = (id: string): DynamicTemplate | undefined => {
    return dynamicTemplates.find(t => t.id === id);
  };

  return (
    <TemplateContext.Provider value={{
      dynamicTemplates,
      addDynamicTemplate,
      removeDynamicTemplate,
      getDynamicTemplate
    }}>
      {children}
    </TemplateContext.Provider>
  );
};