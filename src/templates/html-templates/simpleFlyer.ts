import { HTMLTemplate } from '../../types/htmlTemplate';

export const simpleFlyerHTML: HTMLTemplate = {
  id: 'simple-flyer-html',
  name: 'Simple HTML Flyer',
  description: 'A4 single-page promotional flyer using plain HTML',
  paperSize: 'A4',
  pages: [{
    background: '#ffffff',
    content: `
<div style="text-align: center; padding: 40px;">
  <h1 style="font-size: 48px; color: #333; margin-bottom: 20px;">
    Big Summer Sale!
  </h1>
  <p style="font-size: 24px; color: #666; margin-bottom: 40px;">
    Up to 50% off on selected items
  </p>
</div>

<div style="background-color: #f0f0f0; padding: 30px; margin: 0 40px; border-radius: 10px;">
  <h2 style="font-size: 32px; color: #333; text-align: center; margin-bottom: 30px;">
    Featured Products
  </h2>
  
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
    <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <h3 style="font-size: 18px; margin-bottom: 10px;">Product 1</h3>
      <p style="font-size: 24px; font-weight: bold; color: #e74c3c;">$29.99</p>
    </div>
    
    <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <h3 style="font-size: 18px; margin-bottom: 10px;">Product 2</h3>
      <p style="font-size: 24px; font-weight: bold; color: #e74c3c;">$49.99</p>
    </div>
    
    <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <h3 style="font-size: 18px; margin-bottom: 10px;">Product 3</h3>
      <p style="font-size: 24px; font-weight: bold; color: #e74c3c;">$39.99</p>
    </div>
  </div>
</div>

<div style="text-align: center; margin-top: 60px; padding: 30px; background-color: #333; color: white;">
  <h3 style="font-size: 24px; margin-bottom: 10px;">Visit us today!</h3>
  <p style="font-size: 16px; opacity: 0.9;">
    123 Main Street, City | Open Mon-Sat 9AM-8PM
  </p>
</div>
`
  }]
};