import { Document, Page } from '../../components/document-components';
import { unsplashPresets, unsplashImage } from '../../utils/unsplash';

export const OutletPresentation = () => {
  const colors = {
    primary: '#000000',
    secondary: '#666666',
    light: '#999999',
    background: '#FFFFFF',
    gray: '#F8F9FA',
    accent: '#007AFF'
  };

  const fonts = {
    primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    display: 'Georgia, "Times New Roman", serif'
  };

  return (
    <Document title="Outlet Presentation" type="presentation" paperSize="PRESENTATION_16_9">
      {/* Slide 1 - Title */}
      <Page background={colors.background}>
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: `url(${unsplashPresets.abstract(1280, 720)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255,255,255,0.95)'
          }} />
          
          <div style={{
            position: 'relative',
            textAlign: 'center'
          }}>
            <h1 style={{
              fontFamily: fonts.display,
              fontSize: 96,
              fontWeight: 300,
              color: colors.primary,
              margin: 0,
              letterSpacing: -3
            }}>
              OUTLET
            </h1>
            <div style={{
              width: 100,
              height: 2,
              backgroundColor: colors.primary,
              margin: '40px auto'
            }} />
            <p style={{
              fontFamily: fonts.primary,
              fontSize: 24,
              fontWeight: 300,
              color: colors.secondary,
              letterSpacing: 6,
              textTransform: 'uppercase'
            }}>
              Company Overview
            </p>
          </div>
        </div>
      </Page>

      {/* Slide 2 - Mission */}
      <Page background={colors.background}>
        <div style={{
          padding: 80,
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h2 style={{
            fontFamily: fonts.display,
            fontSize: 48,
            fontWeight: 300,
            color: colors.primary,
            marginBottom: 60
          }}>
            Our Mission
          </h2>
          
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 80
          }}>
            <div style={{ flex: 1 }}>
              <p style={{
                fontFamily: fonts.primary,
                fontSize: 32,
                fontWeight: 300,
                lineHeight: 1.5,
                color: colors.primary,
                marginBottom: 40
              }}>
                Making premium quality accessible to everyone
              </p>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {[
                  'Curated collections',
                  'Sustainable practices',
                  'Fair pricing',
                  'Exceptional service'
                ].map((item, index) => (
                  <li key={index} style={{
                    fontFamily: fonts.primary,
                    fontSize: 20,
                    color: colors.secondary,
                    marginBottom: 15,
                    paddingLeft: 30,
                    position: 'relative'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      top: 8,
                      width: 8,
                      height: 8,
                      backgroundColor: colors.accent,
                      borderRadius: '50%'
                    }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div style={{ flex: 1 }}>
              <div style={{
                width: '100%',
                height: 400,
                backgroundImage: `url(${unsplashPresets.business(500, 400)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }} />
            </div>
          </div>
        </div>
      </Page>

      {/* Slide 3 - Numbers */}
      <Page background={colors.gray}>
        <div style={{
          padding: 80,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h2 style={{
            fontFamily: fonts.display,
            fontSize: 48,
            fontWeight: 300,
            color: colors.primary,
            marginBottom: 80,
            textAlign: 'center'
          }}>
            By the Numbers
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 40
          }}>
            {[
              { number: '150+', label: 'Stores Worldwide' },
              { number: '50K', label: 'Products Sold Monthly' },
              { number: '98%', label: 'Customer Satisfaction' },
              { number: '24/7', label: 'Online Support' }
            ].map((stat, index) => (
              <div key={index} style={{
                textAlign: 'center',
                backgroundColor: colors.background,
                padding: 40,
                borderRadius: 0
              }}>
                <h3 style={{
                  fontFamily: fonts.primary,
                  fontSize: 48,
                  fontWeight: 700,
                  color: colors.accent,
                  margin: '0 0 10px 0'
                }}>
                  {stat.number}
                </h3>
                <p style={{
                  fontFamily: fonts.primary,
                  fontSize: 16,
                  color: colors.secondary,
                  margin: 0
                }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Page>

      {/* Slide 4 - Products */}
      <Page background={colors.background}>
        <div style={{
          padding: 80,
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h2 style={{
            fontFamily: fonts.display,
            fontSize: 48,
            fontWeight: 300,
            color: colors.primary,
            marginBottom: 60
          }}>
            Product Categories
          </h2>
          
          <div style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 40
          }}>
            {[
              { title: 'Apparel', desc: 'Premium clothing for all seasons', image: 'clothing' },
              { title: 'Accessories', desc: 'Curated selection of lifestyle items', image: 'accessories' },
              { title: 'Home', desc: 'Minimal home decor and essentials', image: 'interior' }
            ].map((category, index) => (
              <div key={index}>
                <div style={{
                  width: '100%',
                  height: 250,
                  backgroundImage: `url(${unsplashImage({ 
                    width: 350, 
                    height: 250, 
                    keywords: [category.image, 'minimal'] 
                  })})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  marginBottom: 20
                }} />
                <h3 style={{
                  fontFamily: fonts.primary,
                  fontSize: 24,
                  fontWeight: 500,
                  color: colors.primary,
                  marginBottom: 10
                }}>
                  {category.title}
                </h3>
                <p style={{
                  fontFamily: fonts.primary,
                  fontSize: 16,
                  color: colors.secondary,
                  lineHeight: 1.5
                }}>
                  {category.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Page>

      {/* Slide 5 - Process */}
      <Page background={colors.background}>
        <div style={{
          padding: 80,
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h2 style={{
            fontFamily: fonts.display,
            fontSize: 48,
            fontWeight: 300,
            color: colors.primary,
            marginBottom: 80
          }}>
            Our Process
          </h2>
          
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            {[
              { step: '01', title: 'Source', desc: 'Carefully selected materials' },
              { step: '02', title: 'Design', desc: 'Minimal, timeless aesthetics' },
              { step: '03', title: 'Produce', desc: 'Ethical manufacturing' },
              { step: '04', title: 'Deliver', desc: 'Direct to consumer' }
            ].map((item, index) => (
              <div key={index} style={{
                textAlign: 'center',
                flex: 1
              }}>
                <div style={{
                  width: 120,
                  height: 120,
                  margin: '0 auto 30px',
                  backgroundColor: colors.gray,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 36,
                  fontWeight: 300,
                  fontFamily: fonts.primary,
                  color: colors.primary
                }}>
                  {item.step}
                </div>
                <h3 style={{
                  fontFamily: fonts.primary,
                  fontSize: 20,
                  fontWeight: 500,
                  color: colors.primary,
                  marginBottom: 10
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontFamily: fonts.primary,
                  fontSize: 14,
                  color: colors.secondary
                }}>
                  {item.desc}
                </p>
                
                {index < 3 && (
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: `${25 * (index + 1)}%`,
                    transform: 'translateX(-50%)',
                    width: 100,
                    height: 1,
                    backgroundColor: colors.light
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </Page>

      {/* Slide 6 - Contact */}
      <Page background={colors.primary}>
        <div style={{
          padding: 80,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          color: colors.background
        }}>
          <h2 style={{
            fontFamily: fonts.display,
            fontSize: 64,
            fontWeight: 300,
            marginBottom: 40
          }}>
            Let's Connect
          </h2>
          
          <p style={{
            fontFamily: fonts.primary,
            fontSize: 24,
            fontWeight: 300,
            marginBottom: 60,
            lineHeight: 1.6
          }}>
            Ready to experience premium quality at accessible prices?
          </p>
          
          <div style={{
            display: 'flex',
            gap: 60,
            marginBottom: 80
          }}>
            <div>
              <h3 style={{
                fontFamily: fonts.primary,
                fontSize: 16,
                fontWeight: 400,
                marginBottom: 10,
                opacity: 0.7
              }}>
                Email
              </h3>
              <p style={{
                fontFamily: fonts.primary,
                fontSize: 20
              }}>
                hello@outlet.store
              </p>
            </div>
            
            <div>
              <h3 style={{
                fontFamily: fonts.primary,
                fontSize: 16,
                fontWeight: 400,
                marginBottom: 10,
                opacity: 0.7
              }}>
                Phone
              </h3>
              <p style={{
                fontFamily: fonts.primary,
                fontSize: 20
              }}>
                +1 234 567 890
              </p>
            </div>
            
            <div>
              <h3 style={{
                fontFamily: fonts.primary,
                fontSize: 16,
                fontWeight: 400,
                marginBottom: 10,
                opacity: 0.7
              }}>
                Website
              </h3>
              <p style={{
                fontFamily: fonts.primary,
                fontSize: 20
              }}>
                outlet.store
              </p>
            </div>
          </div>
          
          <div style={{
            width: 60,
            height: 1,
            backgroundColor: colors.background,
            opacity: 0.3
          }} />
        </div>
      </Page>
    </Document>
  );
};