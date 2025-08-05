import { HTMLTemplate, HTMLTemplateMetadata } from '../types/htmlTemplate';

const STORAGE_KEY = 'ai-document-creator-html-templates';
const CUSTOM_TEMPLATE_PREFIX = 'custom-html-';

export class HTMLTemplateService {
  private templates: Map<string, HTMLTemplate> = new Map();
  private customTemplates: Map<string, HTMLTemplate> = new Map();

  constructor() {
    this.loadCustomTemplatesFromStorage();
  }

  /**
   * Register a built-in template
   */
  registerTemplate(template: HTMLTemplate): void {
    this.templates.set(template.id, template);
  }

  /**
   * Get a template by ID
   */
  getTemplate(id: string): HTMLTemplate | undefined {
    return this.templates.get(id) || this.customTemplates.get(id);
  }

  /**
   * Get all templates (built-in + custom)
   */
  getAllTemplates(): HTMLTemplate[] {
    return [
      ...Array.from(this.templates.values()),
      ...Array.from(this.customTemplates.values())
    ];
  }

  /**
   * Get template metadata (without content)
   */
  getAllTemplateMetadata(): HTMLTemplateMetadata[] {
    return this.getAllTemplates().map(template => ({
      id: template.id,
      name: template.name,
      description: template.description,
      paperSize: template.paperSize,
      thumbnailUrl: template.thumbnailUrl,
      createdAt: template.createdAt,
      updatedAt: template.updatedAt
    }));
  }

  /**
   * Save a custom template
   */
  saveCustomTemplate(template: Omit<HTMLTemplate, 'id' | 'createdAt' | 'updatedAt'>): string {
    const id = `${CUSTOM_TEMPLATE_PREFIX}${Date.now()}`;
    const fullTemplate: HTMLTemplate = {
      ...template,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.customTemplates.set(id, fullTemplate);
    this.saveCustomTemplatesToStorage();
    
    return id;
  }

  /**
   * Update an existing custom template
   */
  updateCustomTemplate(id: string, updates: Partial<Omit<HTMLTemplate, 'id' | 'createdAt'>>): void {
    const existingTemplate = this.customTemplates.get(id);
    if (!existingTemplate) {
      throw new Error('Template not found');
    }

    const updatedTemplate: HTMLTemplate = {
      ...existingTemplate,
      ...updates,
      updatedAt: new Date()
    };
    
    this.customTemplates.set(id, updatedTemplate);
    this.saveCustomTemplatesToStorage();
  }

  /**
   * Delete a custom template
   */
  deleteCustomTemplate(id: string): void {
    if (!id.startsWith(CUSTOM_TEMPLATE_PREFIX)) {
      throw new Error('Can only delete custom templates');
    }
    
    this.customTemplates.delete(id);
    this.saveCustomTemplatesToStorage();
  }

  /**
   * Load custom templates from localStorage
   */
  private loadCustomTemplatesFromStorage(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return;

      const templates = JSON.parse(stored);
      if (!Array.isArray(templates)) return;

      for (const templateData of templates) {
        const template: HTMLTemplate = {
          ...templateData,
          createdAt: new Date(templateData.createdAt),
          updatedAt: new Date(templateData.updatedAt)
        };
        this.customTemplates.set(template.id, template);
      }
    } catch (error) {
      console.error('Failed to load templates from storage:', error);
    }
  }

  /**
   * Save custom templates to localStorage
   */
  private saveCustomTemplatesToStorage(): void {
    try {
      const templates = Array.from(this.customTemplates.values());
      localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
    } catch (error) {
      console.error('Failed to save templates to storage:', error);
    }
  }
}

// Singleton instance
export const htmlTemplateService = new HTMLTemplateService();