import { Document, Page } from '../../components/document-components';
import { outletCatalogStyles } from './styles';

export const OutletCatalog = () => {
  const styles = outletCatalogStyles;
  return (
    <Document title="Fashion Outlet Catalog" type="booklet" paperSize="A5">
      {/* Cover Page */}
      <Page background={styles.colors.primary}>
        <div style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
          padding: 30
        }}>
          <h1 style={{
            fontSize: 48,
            fontWeight: 'bold',
            margin: 0,
            letterSpacing: -2,
            fontFamily: 'Georgia, serif'
          }}>
            OUTLET
          </h1>
          <div style={{
            width: 80,
            height: 2,
            backgroundColor: '#f39c12',
            margin: '15px 0'
          }} />
          <p style={{
            fontSize: 18,
            margin: 0,
            letterSpacing: 3,
            textTransform: 'uppercase',
            opacity: 0.8
          }}>
            Collection 2024
          </p>
          <p style={{
            position: 'absolute',
            bottom: 30,
            fontSize: 14,
            opacity: 0.6
          }}>
            Premium Fashion at Outlet Prices
          </p>
        </div>
      </Page>

      {/* Women's Collection Page */}
      <Page background="#ffffff" padding="25px">
        <header style={{
          marginBottom: 25,
          borderBottom: '2px solid #333',
          paddingBottom: 15
        }}>
          <h2 style={{
            fontSize: 28,
            margin: 0,
            fontFamily: 'Georgia, serif'
          }}>
            Women's Collection
          </h2>
          <p style={{
            fontSize: 14,
            color: '#333',
            marginTop: 5
          }}>
            Designer styles at incredible prices
          </p>
        </header>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 15
        }}>
          {/* Item 1 */}
          <div>
            <div style={{
              height: 120,
              backgroundColor: '#e8e8e8',
              borderRadius: 8,
              marginBottom: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 50
            }}>
              👗
            </div>
            <h3 style={{ margin: '0 0 3px 0', fontSize: 15 }}>Elegant Evening Dress</h3>
            <p style={{ margin: '0 0 8px 0', color: '#333', fontSize: 11 }}>
              Silk blend, available in 3 colors
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ 
                fontSize: 16, 
                fontWeight: 'bold',
                color: '#e74c3c'
              }}>
                $89.99
              </span>
              <span style={{
                fontSize: 11,
                color: '#555',
                textDecoration: 'line-through'
              }}>
                $299.99
              </span>
              <span style={{
                fontSize: 10,
                backgroundColor: '#e74c3c',
                color: 'white',
                padding: '2px 5px',
                borderRadius: 3
              }}>
                -70%
              </span>
            </div>
          </div>

          {/* Item 2 */}
          <div>
            <div style={{
              height: 120,
              backgroundColor: '#e8e8e8',
              borderRadius: 8,
              marginBottom: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 50
            }}>
              👚
            </div>
            <h3 style={{ margin: '0 0 3px 0', fontSize: 15 }}>Casual Blouse</h3>
            <p style={{ margin: '0 0 8px 0', color: '#333', fontSize: 11 }}>
              100% Cotton, breathable fabric
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ 
                fontSize: 16, 
                fontWeight: 'bold',
                color: '#e74c3c'
              }}>
                $29.99
              </span>
              <span style={{
                fontSize: 11,
                color: '#555',
                textDecoration: 'line-through'
              }}>
                $79.99
              </span>
              <span style={{
                fontSize: 10,
                backgroundColor: '#e74c3c',
                color: 'white',
                padding: '2px 5px',
                borderRadius: 3
              }}>
                -63%
              </span>
            </div>
          </div>

          {/* Item 3 */}
          <div>
            <div style={{
              height: 120,
              backgroundColor: '#e8e8e8',
              borderRadius: 8,
              marginBottom: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 50
            }}>
              👖
            </div>
            <h3 style={{ margin: '0 0 3px 0', fontSize: 15 }}>Designer Jeans</h3>
            <p style={{ margin: '0 0 8px 0', color: '#333', fontSize: 11 }}>
              Premium denim, perfect fit
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ 
                fontSize: 16, 
                fontWeight: 'bold',
                color: '#e74c3c'
              }}>
                $49.99
              </span>
              <span style={{
                fontSize: 11,
                color: '#555',
                textDecoration: 'line-through'
              }}>
                $149.99
              </span>
              <span style={{
                fontSize: 10,
                backgroundColor: '#e74c3c',
                color: 'white',
                padding: '2px 5px',
                borderRadius: 3
              }}>
                -67%
              </span>
            </div>
          </div>

          {/* Item 4 */}
          <div>
            <div style={{
              height: 120,
              backgroundColor: '#e8e8e8',
              borderRadius: 8,
              marginBottom: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 50
            }}>
              🧥
            </div>
            <h3 style={{ margin: '0 0 3px 0', fontSize: 15 }}>Winter Coat</h3>
            <p style={{ margin: '0 0 8px 0', color: '#333', fontSize: 11 }}>
              Warm wool blend, water resistant
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ 
                fontSize: 16, 
                fontWeight: 'bold',
                color: '#e74c3c'
              }}>
                $119.99
              </span>
              <span style={{
                fontSize: 11,
                color: '#555',
                textDecoration: 'line-through'
              }}>
                $399.99
              </span>
              <span style={{
                fontSize: 10,
                backgroundColor: '#e74c3c',
                color: 'white',
                padding: '2px 5px',
                borderRadius: 3
              }}>
                -70%
              </span>
            </div>
          </div>
        </div>
      </Page>

      {/* Men's Collection Page */}
      <Page background="#ffffff" padding="25px">
        <header style={{
          marginBottom: 25,
          borderBottom: '2px solid #333',
          paddingBottom: 15
        }}>
          <h2 style={{
            fontSize: 28,
            margin: 0,
            fontFamily: 'Georgia, serif'
          }}>
            Men's Collection
          </h2>
          <p style={{
            fontSize: 14,
            color: '#333',
            marginTop: 5
          }}>
            Quality menswear at unbeatable prices
          </p>
        </header>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 15
        }}>
          {/* Item 1 */}
          <div>
            <div style={{
              height: 120,
              backgroundColor: '#e8e8e8',
              borderRadius: 8,
              marginBottom: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 50
            }}>
              👔
            </div>
            <h3 style={{ margin: '0 0 3px 0', fontSize: 15 }}>Business Shirt</h3>
            <p style={{ margin: '0 0 8px 0', color: '#333', fontSize: 11 }}>
              Premium cotton, non-iron
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ 
                fontSize: 16, 
                fontWeight: 'bold',
                color: '#e74c3c'
              }}>
                $34.99
              </span>
              <span style={{
                fontSize: 11,
                color: '#555',
                textDecoration: 'line-through'
              }}>
                $89.99
              </span>
              <span style={{
                fontSize: 10,
                backgroundColor: '#e74c3c',
                color: 'white',
                padding: '2px 5px',
                borderRadius: 3
              }}>
                -61%
              </span>
            </div>
          </div>

          {/* Item 2 */}
          <div>
            <div style={{
              height: 120,
              backgroundColor: '#e8e8e8',
              borderRadius: 8,
              marginBottom: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 50
            }}>
              🧔
            </div>
            <h3 style={{ margin: '0 0 3px 0', fontSize: 15 }}>Leather Jacket</h3>
            <p style={{ margin: '0 0 8px 0', color: '#333', fontSize: 11 }}>
              Genuine leather, classic style
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ 
                fontSize: 16, 
                fontWeight: 'bold',
                color: '#e74c3c'
              }}>
                $149.99
              </span>
              <span style={{
                fontSize: 11,
                color: '#555',
                textDecoration: 'line-through'
              }}>
                $499.99
              </span>
              <span style={{
                fontSize: 10,
                backgroundColor: '#e74c3c',
                color: 'white',
                padding: '2px 5px',
                borderRadius: 3
              }}>
                -70%
              </span>
            </div>
          </div>
        </div>

        {/* Store Information */}
        <div style={{
          marginTop: 30,
          padding: 20,
          backgroundColor: '#e8e8e8',
          borderRadius: 8,
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: 18, marginBottom: 15 }}>Visit Our Outlet Store</h3>
          <div style={{ fontSize: 12, lineHeight: 1.6 }}>
            <p style={{ margin: '3px 0' }}>
              <strong>Location:</strong> 123 Fashion Street, Downtown
            </p>
            <p style={{ margin: '3px 0' }}>
              <strong>Hours:</strong> Mon-Sat: 9AM-9PM | Sun: 10AM-7PM
            </p>
            <p style={{ margin: '3px 0' }}>
              <strong>Contact:</strong> (555) 123-4567
            </p>
          </div>
          <div style={{
            marginTop: 12,
            fontSize: 14,
            fontWeight: 'bold',
            color: '#e74c3c'
          }}>
            www.fashionoutlet.com
          </div>
        </div>
      </Page>
    </Document>
  );
};