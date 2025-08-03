// Import all template sources as raw text using Vite's ?raw query
// This allows us to access the actual source code at runtime

// @ts-ignore
import CactuceBookletSource from './cactuce-booklet/CactuceBooklet.tsx?raw';
// @ts-ignore
import GreenRooftopBusinessPlanSource from './green-rooftop-business-plan/GreenRooftopBusinessPlan.tsx?raw';

export const templateSources: Record<string, string> = {
  'Cactuce Solutions Booklet': CactuceBookletSource,
  'Plan d\'Affaires - The Green Rooftop Parc': GreenRooftopBusinessPlanSource
};

export function getTemplateSource(templateName: string): string | undefined {
  return templateSources[templateName];
}