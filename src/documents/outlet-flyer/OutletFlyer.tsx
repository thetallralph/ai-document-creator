import { Document, Page } from '../../components/document-components';

export const OutletFlyer = () => {
  return (
    <Document title="Fashion Outlet Sale" type="flyer" paperSize="A4">
      <Page background="#fafafa">
        {/* Header */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 180,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white'
        }}>
          <h1 style={{
            fontSize: 52,
            fontWeight: 'bold',
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: 2
          }}>
            Outlet Sale
          </h1>
          <p style={{
            fontSize: 24,
            margin: '10px 0 0 0',
            opacity: 0.9
          }}>
            Up to 70% OFF
          </p>
        </div>

        {/* Sale Badge */}
        <div style={{
          position: 'absolute',
          top: 150,
          right: 50,
          width: 120,
          height: 120,
          backgroundColor: '#ff6b6b',
          borderRadius: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          boxShadow: '0 10px 30px rgba(255, 107, 107, 0.3)',
          transform: 'rotate(15deg)'
        }}>
          <span style={{ fontSize: 36, fontWeight: 'bold' }}>70%</span>
          <span style={{ fontSize: 18 }}>OFF</span>
        </div>

        {/* Product Grid */}
        <div style={{
          position: 'absolute',
          top: 220,
          left: 50,
          right: 50,
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 20
        }}>
          {/* Product 1 */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: 12,
            padding: 20,
            boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
            textAlign: 'center'
          }}>
            <div style={{
              height: 120,
              backgroundColor: '#f0f0f0',
              borderRadius: 8,
              marginBottom: 15,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 60
            }}>
              👔
            </div>
            <h3 style={{ margin: '0 0 5px 0', fontSize: 18 }}>Designer Shirts</h3>
            <p style={{ margin: 0, color: '#666', fontSize: 14 }}>From $29.99</p>
          </div>

          {/* Product 2 */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: 12,
            padding: 20,
            boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
            textAlign: 'center'
          }}>
            <div style={{
              height: 120,
              backgroundColor: '#f0f0f0',
              borderRadius: 8,
              marginBottom: 15,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 60
            }}>
              👗
            </div>
            <h3 style={{ margin: '0 0 5px 0', fontSize: 18 }}>Summer Dresses</h3>
            <p style={{ margin: 0, color: '#666', fontSize: 14 }}>From $39.99</p>
          </div>

          {/* Product 3 */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: 12,
            padding: 20,
            boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
            textAlign: 'center'
          }}>
            <div style={{
              height: 120,
              backgroundColor: '#f0f0f0',
              borderRadius: 8,
              marginBottom: 15,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 60
            }}>
              👟
            </div>
            <h3 style={{ margin: '0 0 5px 0', fontSize: 18 }}>Sneakers</h3>
            <p style={{ margin: 0, color: '#666', fontSize: 14 }}>From $49.99</p>
          </div>

          {/* Product 4 */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: 12,
            padding: 20,
            boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
            textAlign: 'center'
          }}>
            <div style={{
              height: 120,
              backgroundColor: '#f0f0f0',
              borderRadius: 8,
              marginBottom: 15,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 60
            }}>
              👜
            </div>
            <h3 style={{ margin: '0 0 5px 0', fontSize: 18 }}>Handbags</h3>
            <p style={{ margin: 0, color: '#666', fontSize: 14 }}>From $59.99</p>
          </div>
        </div>

        {/* Store Info */}
        <div style={{
          position: 'absolute',
          bottom: 80,
          left: 50,
          right: 50,
          backgroundColor: '#2d3436',
          color: 'white',
          padding: 20,
          borderRadius: 12,
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: 20 }}>Visit Our Outlet Store</h3>
          <p style={{ margin: '0 0 5px 0', fontSize: 14, opacity: 0.8 }}>
            123 Fashion Street, Downtown • Mon-Sat 9AM-9PM
          </p>
          <p style={{ margin: 0, fontSize: 16, fontWeight: 'bold' }}>
            www.fashionoutlet.com
          </p>
        </div>

        {/* Footer */}
        <div style={{
          position: 'absolute',
          bottom: 20,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: 12,
          color: '#999'
        }}>
          *Terms and conditions apply. While stocks last.
        </div>
      </Page>
    </Document>
  );
};