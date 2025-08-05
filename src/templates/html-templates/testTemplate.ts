import { HTMLTemplate } from '../../types/htmlTemplate';

export const testTemplateHTML: HTMLTemplate = {
  id: 'test-template-html',
  name: 'Test Template',
  description: 'Simple A4 test template using only HTML elements with inline styles',
  paperSize: 'A4',
  pages: [{
    background: '#ffffff',
    content: `
<div style="padding: 50px;">
  <h1 style="font-size: 36px; color: #333; margin-bottom: 20px;">Test Template</h1>
  <p style="font-size: 16px; color: #666; line-height: 1.5;">
    This is a simple test template using only HTML elements with inline styles.
  </p>
  <div style="margin-top: 40px; border: 2px solid #000; padding: 20px;">
    <h2 style="font-size: 24px; color: #000;">Box Section</h2>
    <p style="font-size: 14px; color: #333;">Content inside a bordered box.</p>
  </div>
</div>
`
  }]
};