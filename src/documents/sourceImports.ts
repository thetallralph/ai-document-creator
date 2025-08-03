// Import all template sources as raw text using Vite's ?raw query
// This allows us to access the actual source code at runtime

// @ts-ignore
import OutletFlyerSource from './outlet-flyer/OutletFlyer.tsx?raw';
// @ts-ignore
import OutletCatalogSource from './outlet-catalog/OutletCatalog.tsx?raw';
// @ts-ignore
import OutletPresentationSource from './outlet-presentation/OutletPresentation.tsx?raw';
// @ts-ignore
import CactuceBookletSource from './cactuce-booklet/CactuceBooklet.tsx?raw';
// @ts-ignore
import GreenRooftopBusinessPlanSource from './green-rooftop-business-plan/GreenRooftopBusinessPlan.tsx?raw';

export const templateSources: Record<string, string> = {
  'Outlet Sale Flyer': OutletFlyerSource,
  'Outlet Product Catalog': OutletCatalogSource,
  'Outlet Presentation': OutletPresentationSource,
  'Cactuce Solutions Booklet': CactuceBookletSource,
  'Plan d\'Affaires - The Green Rooftop Parc': GreenRooftopBusinessPlanSource
};

export function getTemplateSource(templateName: string): string | undefined {
  return templateSources[templateName];
}