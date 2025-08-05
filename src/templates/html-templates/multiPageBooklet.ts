import { HTMLTemplate } from '../../types/htmlTemplate';

export const multiPageBookletHTML: HTMLTemplate = {
  id: 'multi-page-booklet-html',
  name: 'Multi-Page Booklet',
  description: 'A5 6-page booklet demonstrating multi-page HTML templates',
  paperSize: 'A5',
  pages: [
    {
      // Page 1 - Cover
      background: '#2c3e50',
      content: `
<div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; text-align: center; padding: 40px;">
  <h1 style="font-size: 48px; margin-bottom: 20px; font-weight: bold;">
    Company Booklet
  </h1>
  <p style="font-size: 24px; margin-bottom: 40px; opacity: 0.9;">
    Innovation & Excellence
  </p>
  <div style="width: 100px; height: 4px; background-color: #3498db; margin: 0 auto;"></div>
  <p style="font-size: 18px; margin-top: 40px; opacity: 0.7;">
    2024 Annual Report
  </p>
</div>
`
    },
    {
      // Page 2 - Introduction
      background: '#ffffff',
      content: `
<div style="padding: 50px;">
  <h2 style="font-size: 36px; color: #2c3e50; margin-bottom: 30px;">
    Welcome Message
  </h2>
  <p style="font-size: 16px; line-height: 1.8; color: #333; margin-bottom: 20px;">
    Dear stakeholders and partners,
  </p>
  <p style="font-size: 16px; line-height: 1.8; color: #333; margin-bottom: 20px;">
    We are pleased to present our 2024 annual report, highlighting our achievements, 
    innovations, and commitment to excellence. This year has been transformative for 
    our organization, marked by significant growth and strategic milestones.
  </p>
  <p style="font-size: 16px; line-height: 1.8; color: #333;">
    Throughout these pages, you'll discover how we've continued to push boundaries, 
    embrace new technologies, and deliver exceptional value to our clients and communities.
  </p>
  <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e0e0e0;">
    <p style="font-size: 18px; font-weight: bold; color: #2c3e50;">John Smith</p>
    <p style="font-size: 14px; color: #666;">Chief Executive Officer</p>
  </div>
</div>
`
    },
    {
      // Page 3 - Our Services
      background: '#f8f9fa',
      content: `
<div style="padding: 50px;">
  <h2 style="font-size: 36px; color: #2c3e50; margin-bottom: 40px; text-align: center;">
    Our Services
  </h2>
  
  <div style="margin-bottom: 30px;">
    <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <h3 style="font-size: 24px; color: #3498db; margin-bottom: 15px;">
        🚀 Digital Transformation
      </h3>
      <p style="font-size: 14px; line-height: 1.6; color: #666;">
        Modernize your business with cutting-edge digital solutions that drive efficiency and growth.
      </p>
    </div>
  </div>
  
  <div style="margin-bottom: 30px;">
    <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <h3 style="font-size: 24px; color: #e74c3c; margin-bottom: 15px;">
        📊 Data Analytics
      </h3>
      <p style="font-size: 14px; line-height: 1.6; color: #666;">
        Unlock insights from your data with advanced analytics and visualization tools.
      </p>
    </div>
  </div>
  
  <div>
    <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <h3 style="font-size: 24px; color: #2ecc71; margin-bottom: 15px;">
        🌐 Cloud Solutions
      </h3>
      <p style="font-size: 14px; line-height: 1.6; color: #666;">
        Scale your infrastructure with secure, reliable cloud services tailored to your needs.
      </p>
    </div>
  </div>
</div>
`
    },
    {
      // Page 4 - Statistics
      background: '#ffffff',
      content: `
<div style="padding: 50px;">
  <h2 style="font-size: 36px; color: #2c3e50; margin-bottom: 40px; text-align: center;">
    2024 Achievements
  </h2>
  
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 40px;">
    <div style="text-align: center;">
      <p style="font-size: 48px; font-weight: bold; color: #3498db; margin: 0;">150+</p>
      <p style="font-size: 16px; color: #666; margin-top: 10px;">Happy Clients</p>
    </div>
    <div style="text-align: center;">
      <p style="font-size: 48px; font-weight: bold; color: #e74c3c; margin: 0;">95%</p>
      <p style="font-size: 16px; color: #666; margin-top: 10px;">Client Satisfaction</p>
    </div>
  </div>
  
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
    <div style="text-align: center;">
      <p style="font-size: 48px; font-weight: bold; color: #2ecc71; margin: 0;">500+</p>
      <p style="font-size: 16px; color: #666; margin-top: 10px;">Projects Completed</p>
    </div>
    <div style="text-align: center;">
      <p style="font-size: 48px; font-weight: bold; color: #f39c12; margin: 0;">24/7</p>
      <p style="font-size: 16px; color: #666; margin-top: 10px;">Support Available</p>
    </div>
  </div>
  
  <div style="margin-top: 50px; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
    <p style="font-size: 14px; text-align: center; color: #666; font-style: italic;">
      "Excellence is not a destination but a continuous journey of improvement."
    </p>
  </div>
</div>
`
    },
    {
      // Page 5 - Team
      background: '#f8f9fa',
      content: `
<div style="padding: 50px;">
  <h2 style="font-size: 36px; color: #2c3e50; margin-bottom: 40px; text-align: center;">
    Meet Our Team
  </h2>
  
  <div style="margin-bottom: 30px;">
    <div style="background: white; padding: 20px; border-radius: 8px; display: flex; align-items: center; gap: 20px;">
      <div style="width: 60px; height: 60px; background-color: #3498db; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: bold;">
        JS
      </div>
      <div>
        <h4 style="font-size: 18px; color: #2c3e50; margin: 0;">John Smith</h4>
        <p style="font-size: 14px; color: #666; margin: 5px 0;">Chief Executive Officer</p>
        <p style="font-size: 12px; color: #999;">20+ years of industry experience</p>
      </div>
    </div>
  </div>
  
  <div style="margin-bottom: 30px;">
    <div style="background: white; padding: 20px; border-radius: 8px; display: flex; align-items: center; gap: 20px;">
      <div style="width: 60px; height: 60px; background-color: #e74c3c; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: bold;">
        SD
      </div>
      <div>
        <h4 style="font-size: 18px; color: #2c3e50; margin: 0;">Sarah Davis</h4>
        <p style="font-size: 14px; color: #666; margin: 5px 0;">Chief Technology Officer</p>
        <p style="font-size: 12px; color: #999;">Innovation and technology expert</p>
      </div>
    </div>
  </div>
  
  <div>
    <div style="background: white; padding: 20px; border-radius: 8px; display: flex; align-items: center; gap: 20px;">
      <div style="width: 60px; height: 60px; background-color: #2ecc71; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: bold;">
        MJ
      </div>
      <div>
        <h4 style="font-size: 18px; color: #2c3e50; margin: 0;">Michael Johnson</h4>
        <p style="font-size: 14px; color: #666; margin: 5px 0;">Chief Operating Officer</p>
        <p style="font-size: 12px; color: #999;">Operations and strategy specialist</p>
      </div>
    </div>
  </div>
</div>
`
    },
    {
      // Page 6 - Contact
      background: '#2c3e50',
      content: `
<div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; text-align: center; padding: 40px;">
  <h2 style="font-size: 36px; margin-bottom: 40px;">
    Get In Touch
  </h2>
  
  <div style="margin-bottom: 30px;">
    <p style="font-size: 18px; margin-bottom: 10px;">📍 Address</p>
    <p style="font-size: 16px; opacity: 0.8;">
      123 Business Avenue<br/>
      Suite 500<br/>
      New York, NY 10001
    </p>
  </div>
  
  <div style="margin-bottom: 30px;">
    <p style="font-size: 18px; margin-bottom: 10px;">📞 Phone</p>
    <p style="font-size: 16px; opacity: 0.8;">
      +1 (555) 123-4567
    </p>
  </div>
  
  <div style="margin-bottom: 30px;">
    <p style="font-size: 18px; margin-bottom: 10px;">✉️ Email</p>
    <p style="font-size: 16px; opacity: 0.8;">
      info@company.com
    </p>
  </div>
  
  <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.3);">
    <p style="font-size: 14px; opacity: 0.6;">
      © 2024 Company Name. All rights reserved.
    </p>
  </div>
</div>
`
    }
  ]
};