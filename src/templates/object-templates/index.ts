import simpleFlyer from './simpleFlyer';
import { objectTemplateService } from '../../services/objectTemplateService';

// Register all built-in object templates
export function registerBuiltInTemplates() {
  objectTemplateService.registerTemplate(simpleFlyer);
}

// Export individual templates for direct access if needed
export { simpleFlyer };