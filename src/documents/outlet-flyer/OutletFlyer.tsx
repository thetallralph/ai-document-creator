import { Document, Page } from '../../components/document-components';

export const OutletFlyer = () => {
  return (
    <Document title="Outlet Sale Flyer" type="flyer" paperSize="A4">
      <Page background="#ffffff">
        <div style={{ padding: '50px', backgroundColor: '#f8f9fa', fontFamily: 'Arial, sans-serif' }}>
          <h1 style={{ fontSize: '48px', color: '#ff6347', marginBottom: '20px', textAlign: 'center', fontWeight: 'bold' }}>Resume of Jesus</h1>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <img src="https://via.placeholder.com/150" alt="Jesus" style={{ borderRadius: '50%', border: '3px solid #ff6347', marginRight: '20px' }} />
          </div>
          <p style={{ fontSize: '18px', color: '#333', lineHeight: '1.6', textAlign: 'center', marginBottom: '40px' }}>
            This is a simple test model using only HTML elements with inline styles.
          </p>
          <div style={{ marginTop: '40px', border: '2px solid #000', padding: '20px', backgroundColor: '#fff' }}>
            <h2 style={{ fontSize: '28px', color: '#000', marginBottom: '10px' }}>Personal Information</h2>
            <p style={{ fontSize: '16px', color: '#333', lineHeight: '1.5' }}>
              <strong>Name:</strong> Jesus<br/>
              <strong>Title:</strong> Messiah<br/>
              <strong>Location:</strong> Bethlehem, Israel
            </p>
          </div>
        </div>
      </Page>
    </Document>
  );
};