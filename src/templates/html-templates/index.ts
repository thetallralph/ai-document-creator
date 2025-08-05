import { simpleFlyerHTML } from './simpleFlyer';
import { testTemplateHTML } from './testTemplate';
import { multiPageBookletHTML } from './multiPageBooklet';
import { outletFlyerHTML } from './outletFlyer';
import { cactuceBookletHTML } from './cactuceBooklet';
import { htmlTemplateService } from '../../services/htmlTemplateService';

// Register all built-in HTML templates
export function registerBuiltInHTMLTemplates() {
  htmlTemplateService.registerTemplate(simpleFlyerHTML);
  htmlTemplateService.registerTemplate(testTemplateHTML);
  htmlTemplateService.registerTemplate(multiPageBookletHTML);
  htmlTemplateService.registerTemplate(outletFlyerHTML);
  htmlTemplateService.registerTemplate(cactuceBookletHTML);
}

// Export individual templates for direct access if needed
export { simpleFlyerHTML, testTemplateHTML, multiPageBookletHTML, outletFlyerHTML, cactuceBookletHTML };