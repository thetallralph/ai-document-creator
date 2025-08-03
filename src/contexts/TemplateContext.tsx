import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DocumentTemplate } from '../documents/templates';

interface DynamicTemplate extends DocumentTemplate {
  isDynamic: boolean;
  id: string;
}

interface TemplateContextType {
  dynamicTemplates: DynamicTemplate[];
  addDynamicTemplate: (name: string, description: string, component: React.FC) => string;
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

  const addDynamicTemplate = (name: string, description: string, component: React.FC): string => {
    const id = `dynamic-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newTemplate: DynamicTemplate = {
      id,
      name,
      description,
      component,
      isDynamic: true
    };
    
    setDynamicTemplates(prev => [...prev, newTemplate]);
    return id;
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