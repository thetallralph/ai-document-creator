import { HTMLTemplate } from '../../types/htmlTemplate';

export const outletFlyerHTML: HTMLTemplate = {
  id: 'outlet-flyer-html',
  name: 'Outlet Sale Flyer',
  description: 'A4 single-page promotional flyer',
  paperSize: 'A4',
  pages: [{
    background: '#ffffff',
    content: `
<div style="padding: 50px; background-color: #f8f9fa; font-family: Arial, sans-serif;">
  <h1 style="font-size: 48px; color: #ff6347; margin-bottom: 20px; text-align: center; font-weight: bold;">
    Outlet Sale!
  </h1>
  <div style="text-align: center; margin-bottom: 40px;">
    <img src="https://via.placeholder.com/150" alt="Sale" style="border-radius: 50%; border: 3px solid #ff6347; margin-right: 20px;" />
  </div>
  <p style="font-size: 18px; color: #333; line-height: 1.6; text-align: center; margin-bottom: 40px;">
    Incredible deals on all items. Don't miss our biggest sale of the year!
  </p>
  <div style="margin-top: 40px; border: 2px solid #000; padding: 20px; background-color: #fff;">
    <h2 style="font-size: 28px; color: #000; margin-bottom: 10px;">Sale Information</h2>
    <p style="font-size: 16px; color: #333; line-height: 1.5;">
      <strong>Dates:</strong> March 1-31, 2024<br/>
      <strong>Discount:</strong> Up to 70% off<br/>
      <strong>Location:</strong> All Outlet Stores
    </p>
  </div>
</div>
`
  }]
};