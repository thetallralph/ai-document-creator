import { Document, Page } from '../../components/document-components';

export const OutletPresentation = () => {
  return (
    <Document title="Outlet Store Presentation" type="presentation" paperSize="PRESENTATION_16_9">
      {/* Title Slide */}
      <Page background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
        <div style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: 72,
            fontWeight: 'bold',
            margin: '0 0 20px 0',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            Fashion Outlet
          </h1>
          <p style={{
            fontSize: 36,
            margin: 0,
            opacity: 0.9
          }}>
            Premium Brands at Outlet Prices
          </p>
        </div>
      </Page>

      {/* Stats Slide */}
      <Page background="#f8f9fa" padding="60px">
        <h2 style={{
          fontSize: 48,
          color: '#2c3e50',
          marginBottom: 60,
          textAlign: 'center'
        }}>
          Why Shop With Us?
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 40,
          textAlign: 'center'
        }}>
          <div>
            <div style={{
              fontSize: 64,
              fontWeight: 'bold',
              color: '#e74c3c',
              marginBottom: 10
            }}>
              70%
            </div>
            <p style={{
              fontSize: 24,
              color: '#555'
            }}>
              Average Savings
            </p>
          </div>
          
          <div>
            <div style={{
              fontSize: 64,
              fontWeight: 'bold',
              color: '#3498db',
              marginBottom: 10
            }}>
              500+
            </div>
            <p style={{
              fontSize: 24,
              color: '#555'
            }}>
              Premium Brands
            </p>
          </div>
          
          <div>
            <div style={{
              fontSize: 64,
              fontWeight: 'bold',
              color: '#2ecc71',
              marginBottom: 10
            }}>
              24/7
            </div>
            <p style={{
              fontSize: 24,
              color: '#555'
            }}>
              Online Shopping
            </p>
          </div>
        </div>
      </Page>
    </Document>
  );
};