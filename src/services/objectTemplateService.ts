import { ObjectTemplate, ObjectTemplateMetadata, isObjectTemplate } from '../types/objectTemplate';
import { validateElementTree } from '../utils/createElement';

const STORAGE_KEY = 'ai-document-creator-templates';
const CUSTOM_TEMPLATE_PREFIX = 'custom-';

export class ObjectTemplateService {
  private templates: Map<string, ObjectTemplate> = new Map();
  private customTemplates: Map<string, ObjectTemplate> = new Map();

  constructor() {
    this.loadCustomTemplatesFromStorage();
  }

  /**
   * Register a built-in template
   */
  registerTemplate(template: ObjectTemplate): void {
    if (!isObjectTemplate(template)) {
      throw new Error('Invalid template structure');
    }
    
    // Validate the render output
    const renderResult = template.render();
    const validation = validateElementTree(renderResult);
    if (!validation.valid) {
      throw new Error(`Template render validation failed: ${validation.error}`);
    }

    this.templates.set(template.id, template);
  }

  /**
   * Get a template by ID
   */
  getTemplate(id: string): ObjectTemplate | undefined {
    return this.templates.get(id) || this.customTemplates.get(id);
  }

  /**
   * Get all templates (built-in + custom)
   */
  getAllTemplates(): ObjectTemplate[] {
    return [
      ...Array.from(this.templates.values()),
      ...Array.from(this.customTemplates.values())
    ];
  }

  /**
   * Get template metadata (without render function)
   */
  getAllTemplateMetadata(): ObjectTemplateMetadata[] {
    return this.getAllTemplates().map(template => ({
      id: template.id,
      name: template.name,
      description: template.description,
      thumbnailUrl: template.thumbnailUrl,
      createdAt: template.createdAt,
      updatedAt: template.updatedAt
    }));
  }

  /**
   * Save a custom template
   */
  saveCustomTemplate(templateCode: string, metadata: Omit<ObjectTemplateMetadata, 'id'>): string {
    try {
      // Generate unique ID for custom template
      const id = `${CUSTOM_TEMPLATE_PREFIX}${Date.now()}`;
      
      // Evaluate the template code
      const templateFunction = new Function('return ' + templateCode);
      const templateObject = templateFunction();
      
      // Validate it's a proper template
      if (!templateObject || typeof templateObject !== 'object') {
        throw new Error('Template code must export an object');
      }
      
      // Create the full template
      const template: ObjectTemplate = {
        ...templateObject,
        id,
        name: metadata.name,
        description: metadata.description,
        thumbnailUrl: metadata.thumbnailUrl,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      // Validate the template
      if (!isObjectTemplate(template)) {
        throw new Error('Invalid template structure');
      }
      
      // Validate render output
      const renderResult = template.render();
      const validation = validateElementTree(renderResult);
      if (!validation.valid) {
        throw new Error(`Template render validation failed: ${validation.error}`);
      }
      
      // Save to memory and storage
      this.customTemplates.set(id, template);
      this.saveCustomTemplatesToStorage();
      
      return id;
    } catch (error) {
      throw new Error(`Failed to save template: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Update an existing custom template
   */
  updateCustomTemplate(id: string, templateCode: string, metadata?: Partial<ObjectTemplateMetadata>): void {
    const existingTemplate = this.customTemplates.get(id);
    if (!existingTemplate) {
      throw new Error('Template not found');
    }

    try {
      // Evaluate the new template code
      const templateFunction = new Function('return ' + templateCode);
      const templateObject = templateFunction();
      
      // Create updated template
      const updatedTemplate: ObjectTemplate = {
        ...templateObject,
        id,
        name: metadata?.name || existingTemplate.name,
        description: metadata?.description || existingTemplate.description,
        thumbnailUrl: metadata?.thumbnailUrl || existingTemplate.thumbnailUrl,
        createdAt: existingTemplate.createdAt,
        updatedAt: new Date()
      };
      
      // Validate
      if (!isObjectTemplate(updatedTemplate)) {
        throw new Error('Invalid template structure');
      }
      
      const renderResult = updatedTemplate.render();
      const validation = validateElementTree(renderResult);
      if (!validation.valid) {
        throw new Error(`Template render validation failed: ${validation.error}`);
      }
      
      // Update
      this.customTemplates.set(id, updatedTemplate);
      this.saveCustomTemplatesToStorage();
    } catch (error) {
      throw new Error(`Failed to update template: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
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
   * Convert template to exportable code string
   */
  exportTemplateCode(id: string): string {
    const template = this.getTemplate(id);
    if (!template) {
      throw new Error('Template not found');
    }

    // Create a clean object without metadata
    const exportObject = {
      render: template.render
    };

    // Convert to string with proper formatting
    return `export default ${JSON.stringify(exportObject, (_key, value) => {
      if (typeof value === 'function') {
        return value.toString();
      }
      return value;
    }, 2).replace(/"(render)":\s*"([^"]+)"/g, (_match, key, funcStr) => {
      // Unescape function strings
      return `"${key}": ${funcStr.replace(/\\n/g, '\n').replace(/\\"/g, '"')}`;
    })}`;
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
        try {
          // Reconstruct the template with function
          const template: ObjectTemplate = {
            ...templateData,
            render: new Function('return ' + templateData.renderCode)(),
            createdAt: new Date(templateData.createdAt),
            updatedAt: new Date(templateData.updatedAt)
          };

          if (isObjectTemplate(template)) {
            this.customTemplates.set(template.id, template);
          }
        } catch (error) {
          console.error('Failed to load template:', templateData.id, error);
        }
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
      const templates = Array.from(this.customTemplates.values()).map(template => ({
        id: template.id,
        name: template.name,
        description: template.description,
        thumbnailUrl: template.thumbnailUrl,
        createdAt: template.createdAt,
        updatedAt: template.updatedAt,
        renderCode: template.render.toString()
      }));

      localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
    } catch (error) {
      console.error('Failed to save templates to storage:', error);
    }
  }
}

// Singleton instance
export const objectTemplateService = new ObjectTemplateService();