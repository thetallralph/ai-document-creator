import { Document, Page } from '../../components/document-components';
import { unsplashPresets } from '../../utils/unsplash';

export const OutletCatalog = () => {
  const colors = {
    primary: '#000000',
    secondary: '#666666',
    light: '#999999',
    background: '#FFFFFF',
    gray: '#F5F5F5',
    border: '#E0E0E0'
  };

  const fonts = {
    primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    display: 'Georgia, "Times New Roman", serif'
  };

  return (
    <Document title="Outlet Product Catalog" type="booklet" paperSize="A4">
      {/* Page 1 - Cover */}
      <Page background={colors.background}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${unsplashPresets.minimalCollection(842, 1191)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }} />
        
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255,255,255,0.9)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontFamily: fonts.display,
            fontSize: 64,
            fontWeight: 300,
            color: colors.primary,
            margin: 0,
            letterSpacing: -2
          }}>
            OUTLET
          </h1>
          <div style={{
            width: 60,
            height: 1,
            backgroundColor: colors.primary,
            margin: '30px 0'
          }} />
          <p style={{
            fontFamily: fonts.primary,
            fontSize: 18,
            fontWeight: 300,
            color: colors.secondary,
            letterSpacing: 4,
            textTransform: 'uppercase',
            margin: 0
          }}>
            Product Catalog 2024
          </p>
        </div>
      </Page>

      {/* Page 2 - Contents */}
      <Page background={colors.background}>
        <div style={{ padding: 60 }}>
          <h2 style={{
            fontFamily: fonts.display,
            fontSize: 36,
            fontWeight: 300,
            color: colors.primary,
            marginBottom: 60
          }}>
            Contents
          </h2>

          <div style={{ marginTop: 40 }}>
            {[
              { page: '03', title: 'New Arrivals', desc: 'Latest collection pieces' },
              { page: '04', title: 'Essentials', desc: 'Timeless wardrobe staples' },
              { page: '05', title: 'Accessories', desc: 'Complete your look' },
              { page: '06', title: 'Sale Items', desc: 'Special offers up to 70% off' }
            ].map((item, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                borderBottom: `1px solid ${colors.border}`,
                paddingBottom: 20,
                marginBottom: 30
              }}>
                <div>
                  <h3 style={{
                    fontFamily: fonts.primary,
                    fontSize: 24,
                    fontWeight: 400,
                    color: colors.primary,
                    margin: 0
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontFamily: fonts.primary,
                    fontSize: 14,
                    color: colors.secondary,
                    margin: '5px 0 0 0'
                  }}>
                    {item.desc}
                  </p>
                </div>
                <span style={{
                  fontFamily: fonts.primary,
                  fontSize: 18,
                  color: colors.light
                }}>
                  {item.page}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Page>

      {/* Page 3 - New Arrivals */}
      <Page background={colors.background}>
        <div style={{ padding: 60 }}>
          <h2 style={{
            fontFamily: fonts.display,
            fontSize: 36,
            fontWeight: 300,
            color: colors.primary,
            marginBottom: 40
          }}>
            New Arrivals
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 40
          }}>
            {[1, 2, 3, 4].map((item) => (
              <div key={item}>
                <div style={{
                  width: '100%',
                  height: 300,
                  backgroundColor: colors.gray,
                  backgroundImage: `url(${unsplashPresets.product(300, 300)})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  marginBottom: 20
                }} />
                <h3 style={{
                  fontFamily: fonts.primary,
                  fontSize: 18,
                  fontWeight: 400,
                  color: colors.primary,
                  margin: '0 0 5px 0'
                }}>
                  Minimal {item % 2 === 0 ? 'Jacket' : 'Shirt'}
                </h3>
                <p style={{
                  fontFamily: fonts.primary,
                  fontSize: 14,
                  color: colors.secondary,
                  margin: '0 0 10px 0'
                }}>
                  Premium cotton blend
                </p>
                <p style={{
                  fontFamily: fonts.primary,
                  fontSize: 20,
                  fontWeight: 500,
                  color: colors.primary,
                  margin: 0
                }}>
                  ${79 + item * 10}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Page>

      {/* Page 4 - Essentials */}
      <Page background={colors.gray}>
        <div style={{ padding: 60 }}>
          <h2 style={{
            fontFamily: fonts.display,
            fontSize: 36,
            fontWeight: 300,
            color: colors.primary,
            marginBottom: 40
          }}>
            Essentials
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 60,
            marginTop: 40
          }}>
            <div>
              <div style={{
                width: '100%',
                height: 400,
                backgroundColor: colors.background,
                backgroundImage: `url(${unsplashPresets.product(350, 400)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }} />
            </div>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <h3 style={{
                fontFamily: fonts.primary,
                fontSize: 28,
                fontWeight: 300,
                color: colors.primary,
                marginBottom: 20
              }}>
                The Perfect White Tee
              </h3>
              <p style={{
                fontFamily: fonts.primary,
                fontSize: 16,
                lineHeight: 1.6,
                color: colors.secondary,
                marginBottom: 30
              }}>
                Our signature essential piece. Made from 100% organic cotton with a perfect drape and minimal aesthetic. Available in classic white, soft gray, and deep black.
              </p>
              <div style={{
                display: 'flex',
                gap: 15,
                marginBottom: 30
              }}>
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <div key={size} style={{
                    width: 40,
                    height: 40,
                    border: `1px solid ${colors.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: fonts.primary,
                    fontSize: 14,
                    color: colors.primary
                  }}>
                    {size}
                  </div>
                ))}
              </div>
              <p style={{
                fontFamily: fonts.primary,
                fontSize: 24,
                fontWeight: 500,
                color: colors.primary
              }}>
                $49
              </p>
            </div>
          </div>
        </div>
      </Page>

      {/* Page 5 - Accessories */}
      <Page background={colors.background}>
        <div style={{ padding: 60 }}>
          <h2 style={{
            fontFamily: fonts.display,
            fontSize: 36,
            fontWeight: 300,
            color: colors.primary,
            marginBottom: 40
          }}>
            Accessories
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 30
          }}>
            {[
              { name: 'Leather Belt', price: 89 },
              { name: 'Canvas Tote', price: 49 },
              { name: 'Wool Scarf', price: 69 },
              { name: 'Card Holder', price: 39 },
              { name: 'Sunglasses', price: 129 },
              { name: 'Watch Band', price: 59 }
            ].map((item, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '100%',
                  height: 200,
                  backgroundColor: colors.gray,
                  backgroundImage: `url(${unsplashPresets.product(200, 200)})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  marginBottom: 15
                }} />
                <h4 style={{
                  fontFamily: fonts.primary,
                  fontSize: 16,
                  fontWeight: 400,
                  color: colors.primary,
                  margin: '0 0 5px 0'
                }}>
                  {item.name}
                </h4>
                <p style={{
                  fontFamily: fonts.primary,
                  fontSize: 18,
                  color: colors.secondary,
                  margin: 0
                }}>
                  ${item.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Page>

      {/* Page 6 - Sale & Contact */}
      <Page background={colors.background}>
        <div style={{ 
          padding: 60,
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ flex: 1 }}>
            <h2 style={{
              fontFamily: fonts.display,
              fontSize: 36,
              fontWeight: 300,
              color: colors.primary,
              marginBottom: 40
            }}>
              Sale Items
            </h2>

            <div style={{
              backgroundColor: colors.gray,
              padding: 40,
              textAlign: 'center',
              marginBottom: 40
            }}>
              <h3 style={{
                fontFamily: fonts.primary,
                fontSize: 32,
                fontWeight: 300,
                color: colors.primary,
                margin: '0 0 10px 0'
              }}>
                End of Season Sale
              </h3>
              <p style={{
                fontFamily: fonts.primary,
                fontSize: 48,
                fontWeight: 700,
                color: colors.primary,
                margin: '20px 0'
              }}>
                UP TO 70% OFF
              </p>
              <p style={{
                fontFamily: fonts.primary,
                fontSize: 16,
                color: colors.secondary,
                margin: 0
              }}>
                Selected items only • While stocks last
              </p>
            </div>
          </div>

          <div style={{
            borderTop: `1px solid ${colors.border}`,
            paddingTop: 40,
            textAlign: 'center'
          }}>
            <h3 style={{
              fontFamily: fonts.primary,
              fontSize: 18,
              fontWeight: 400,
              color: colors.primary,
              marginBottom: 20,
              letterSpacing: 2,
              textTransform: 'uppercase'
            }}>
              Visit Us
            </h3>
            <p style={{
              fontFamily: fonts.primary,
              fontSize: 16,
              color: colors.secondary,
              lineHeight: 1.8,
              margin: 0
            }}>
              outlet.store<br />
              contact@outlet.store<br />
              +1 234 567 890
            </p>
          </div>
        </div>
      </Page>
    </Document>
  );
};