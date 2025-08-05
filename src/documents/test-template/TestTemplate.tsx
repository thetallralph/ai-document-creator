// import React from 'react';
import { Document, Page } from '../../components/document-components';

export const TestTemplate = () => {
  return (
    <Document title="Test Template" type="presentation" paperSize="A4">
      <Page background="#ffffff">
        <div style={{ padding: '50px' }}>
          <h1 style={{ fontSize: '36px', color: '#333', marginBottom: '20px' }}>Test Template</h1>
          <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.5' }}>
            This is a simple test template using only HTML elements with inline styles.
          </p>
          <div style={{ marginTop: '40px', border: '2px solid #000', padding: '20px' }}>
            <h2 style={{ fontSize: '24px', color: '#000' }}>Box Section</h2>
            <p style={{ fontSize: '14px', color: '#333' }}>Content inside a bordered box.</p>
          </div>
        </div>
      </Page>
    </Document>
  );
};