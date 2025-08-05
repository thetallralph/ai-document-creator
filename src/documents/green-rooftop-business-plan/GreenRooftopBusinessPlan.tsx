import { Document, Page } from '../../components/document-components';
import { unsplashPresets, unsplashImage } from '../../utils/unsplash';

export const GreenRooftopBusinessPlan = () => {
  const colors = {
    primary: '#000000',
    secondary: '#666666',
    light: '#999999',
    background: '#FFFFFF',
    gray: '#F8F9FA',
    accent: '#2ECC71',
    border: '#E0E0E0'
  };

  const fonts = {
    primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    display: 'Georgia, "Times New Roman", serif'
  };

  return (
    <Document title="Plan d'Affaires - The Green Rooftop Parc" type="presentation" paperSize="PRESENTATION_16_9">
      {/* Slide 1: Title */}
      <Page background={colors.background}>
        <div style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          padding: '80px'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${unsplashPresets.nature(1280, 720)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.08
          }} />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h1 style={{
              fontSize: 64,
              fontWeight: 300,
              fontFamily: fonts.display,
              color: colors.primary,
              margin: '0 0 30px 0',
              letterSpacing: '-2px'
            }}>
              The Green Rooftop Parc
            </h1>
            <div style={{
              width: 100,
              height: 2,
              backgroundColor: colors.accent,
              margin: '0 auto 30px'
            }} />
            <p style={{
              fontSize: 24,
              fontFamily: fonts.primary,
              color: colors.secondary,
              margin: '0 0 40px 0',
              fontWeight: 300
            }}>
              Un souffle vert au cœur de la ville
            </p>
            <p style={{
              fontSize: 18,
              fontFamily: fonts.primary,
              color: colors.light,
              margin: 0
            }}>
              Premier parc de poche public-privé du Bénin
            </p>
          </div>
        </div>
      </Page>

      {/* Slide 2: Vision & Concept */}
      <Page background={colors.background}>
        <div style={{
          padding: 80,
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h2 style={{
            fontSize: 48,
            fontFamily: fonts.display,
            fontWeight: 300,
            color: colors.primary,
            marginBottom: 60,
            textAlign: 'center'
          }}>
            Notre Vision
          </h2>
          
          <div style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'center'
          }}>
            <div>
              <div style={{ marginBottom: 40 }}>
                <h3 style={{ 
                  fontSize: 24, 
                  fontFamily: fonts.primary,
                  fontWeight: 500,
                  color: colors.primary,
                  marginBottom: 15
                }}>
                  Une oasis urbaine
                </h3>
                <p style={{ 
                  fontSize: 18, 
                  lineHeight: 1.6, 
                  color: colors.secondary,
                  fontFamily: fonts.primary
                }}>
                  225 m² de nature en plein cœur de Cotonou, conçu pour la détente, la culture et le bien-être
                </p>
              </div>
              
              <div style={{ marginBottom: 40 }}>
                <h3 style={{ 
                  fontSize: 24, 
                  fontFamily: fonts.primary,
                  fontWeight: 500,
                  color: colors.primary,
                  marginBottom: 15
                }}>
                  Écologique
                </h3>
                <p style={{ 
                  fontSize: 18, 
                  lineHeight: 1.6, 
                  color: colors.secondary,
                  fontFamily: fonts.primary
                }}>
                  Architecture bio-climatique avec panneaux solaires et récupération d'eau
                </p>
              </div>
              
              <div>
                <h3 style={{ 
                  fontSize: 24, 
                  fontFamily: fonts.primary,
                  fontWeight: 500,
                  color: colors.primary,
                  marginBottom: 15
                }}>
                  Rentable
                </h3>
                <p style={{ 
                  fontSize: 18, 
                  lineHeight: 1.6, 
                  color: colors.secondary,
                  fontFamily: fonts.primary
                }}>
                  Modèle économique viable avec multiple sources de revenus
                </p>
              </div>
            </div>
            
            <div style={{
              width: '100%',
              height: 400,
              backgroundImage: `url(${unsplashImage({ 
                width: 500, 
                height: 400, 
                keywords: ['park', 'garden', 'minimal'] 
              })})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }} />
          </div>
        </div>
      </Page>

      {/* Slide 3: Marché Cible */}
      <Page background={colors.gray}>
        <div style={{
          padding: 80,
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h2 style={{
            fontSize: 48,
            fontFamily: fonts.display,
            fontWeight: 300,
            color: colors.primary,
            marginBottom: 60,
            textAlign: 'center'
          }}>
            Marché Cible
          </h2>
          
          <div style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 40
          }}>
            {[
              {
                title: 'Familles',
                desc: 'Espace sécurisé pour enfants avec aire de jeux écologique',
                value: '45%'
              },
              {
                title: 'Jeunes Professionnels',
                desc: 'Lieu de détente et networking après le travail',
                value: '35%'
              },
              {
                title: 'Touristes',
                desc: 'Attraction unique et authentique à Cotonou',
                value: '20%'
              }
            ].map((segment, index) => (
              <div key={index} style={{
                backgroundColor: colors.background,
                padding: 40,
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: 48,
                  fontWeight: 700,
                  color: colors.accent,
                  marginBottom: 20,
                  fontFamily: fonts.primary
                }}>
                  {segment.value}
                </div>
                <h3 style={{
                  fontSize: 20,
                  fontWeight: 500,
                  color: colors.primary,
                  marginBottom: 15,
                  fontFamily: fonts.primary
                }}>
                  {segment.title}
                </h3>
                <p style={{
                  fontSize: 16,
                  color: colors.secondary,
                  lineHeight: 1.5,
                  fontFamily: fonts.primary
                }}>
                  {segment.desc}
                </p>
              </div>
            ))}
          </div>
          
          <div style={{
            marginTop: 40,
            textAlign: 'center',
            fontSize: 20,
            color: colors.primary,
            fontFamily: fonts.primary
          }}>
            Potentiel: <strong>50,000+ visiteurs par an</strong>
          </div>
        </div>
      </Page>

      {/* Slide 4: Services & Revenus */}
      <Page background={colors.background}>
        <div style={{
          padding: 80,
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h2 style={{
            fontSize: 48,
            fontFamily: fonts.display,
            fontWeight: 300,
            color: colors.primary,
            marginBottom: 60,
            textAlign: 'center'
          }}>
            Sources de Revenus
          </h2>
          
          <div style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 60
          }}>
            <div>
              <h3 style={{
                fontSize: 24,
                fontWeight: 500,
                color: colors.primary,
                marginBottom: 30,
                fontFamily: fonts.primary
              }}>
                Services Principaux
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { service: 'Café-Restaurant Bio', price: '2,000-5,000 FCFA' },
                  { service: 'Location d\'espaces', price: '50,000+ FCFA/jour' },
                  { service: 'Événements culturels', price: '1,000-3,000 FCFA' },
                  { service: 'Ateliers & formations', price: '5,000-15,000 FCFA' }
                ].map((item, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingBottom: 15,
                    borderBottom: `1px solid ${colors.border}`
                  }}>
                    <span style={{
                      fontSize: 18,
                      color: colors.primary,
                      fontFamily: fonts.primary
                    }}>
                      {item.service}
                    </span>
                    <span style={{
                      fontSize: 18,
                      color: colors.accent,
                      fontWeight: 500,
                      fontFamily: fonts.primary
                    }}>
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div style={{
              backgroundColor: colors.gray,
              padding: 40,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <h3 style={{
                fontSize: 24,
                fontWeight: 500,
                color: colors.primary,
                marginBottom: 30,
                fontFamily: fonts.primary,
                textAlign: 'center'
              }}>
                Projection Annuelle
              </h3>
              
              <div style={{
                fontSize: 48,
                fontWeight: 700,
                color: colors.accent,
                textAlign: 'center',
                marginBottom: 20,
                fontFamily: fonts.primary
              }}>
                75M FCFA
              </div>
              
              <p style={{
                fontSize: 16,
                color: colors.secondary,
                textAlign: 'center',
                fontFamily: fonts.primary
              }}>
                Chiffre d'affaires prévu année 3
              </p>
            </div>
          </div>
        </div>
      </Page>

      {/* Slide 5: Impact & Bénéfices */}
      <Page background={colors.background}>
        <div style={{
          padding: 80,
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h2 style={{
            fontSize: 48,
            fontFamily: fonts.display,
            fontWeight: 300,
            color: colors.primary,
            marginBottom: 60,
            textAlign: 'center'
          }}>
            Impact Social & Environnemental
          </h2>
          
          <div style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'center'
          }}>
            <div style={{
              width: '100%',
              height: 400,
              backgroundImage: `url(${unsplashImage({ 
                width: 500, 
                height: 400, 
                keywords: ['community', 'garden', 'people'] 
              })})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }} />
            
            <div>
              <div style={{ marginBottom: 35 }}>
                <h3 style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: colors.primary,
                  marginBottom: 15,
                  fontFamily: fonts.primary
                }}>
                  Création d'emplois
                </h3>
                <p style={{
                  fontSize: 18,
                  color: colors.secondary,
                  fontFamily: fonts.primary
                }}>
                  15 emplois directs, 30 emplois indirects
                </p>
              </div>
              
              <div style={{ marginBottom: 35 }}>
                <h3 style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: colors.primary,
                  marginBottom: 15,
                  fontFamily: fonts.primary
                }}>
                  Réduction CO2
                </h3>
                <p style={{
                  fontSize: 18,
                  color: colors.secondary,
                  fontFamily: fonts.primary
                }}>
                  -2 tonnes de CO2 par an grâce à la végétation
                </p>
              </div>
              
              <div style={{ marginBottom: 35 }}>
                <h3 style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: colors.primary,
                  marginBottom: 15,
                  fontFamily: fonts.primary
                }}>
                  Éducation environnementale
                </h3>
                <p style={{
                  fontSize: 18,
                  color: colors.secondary,
                  fontFamily: fonts.primary
                }}>
                  5,000+ enfants sensibilisés par an
                </p>
              </div>
              
              <div>
                <h3 style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: colors.primary,
                  marginBottom: 15,
                  fontFamily: fonts.primary
                }}>
                  Biodiversité urbaine
                </h3>
                <p style={{
                  fontSize: 18,
                  color: colors.secondary,
                  fontFamily: fonts.primary
                }}>
                  50+ espèces végétales locales
                </p>
              </div>
            </div>
          </div>
        </div>
      </Page>

      {/* Slide 6: Financement */}
      <Page background={colors.gray}>
        <div style={{
          padding: 80,
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h2 style={{
            fontSize: 48,
            fontFamily: fonts.display,
            fontWeight: 300,
            color: colors.primary,
            marginBottom: 60,
            textAlign: 'center'
          }}>
            Plan de Financement
          </h2>
          
          <div style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 60
          }}>
            <div>
              <h3 style={{
                fontSize: 24,
                fontWeight: 500,
                color: colors.primary,
                marginBottom: 30,
                fontFamily: fonts.primary
              }}>
                Investissement Initial
              </h3>
              
              <div style={{
                backgroundColor: colors.background,
                padding: 30,
                marginBottom: 30
              }}>
                <div style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: colors.accent,
                  marginBottom: 10,
                  fontFamily: fonts.primary
                }}>
                  120M FCFA
                </div>
                <p style={{
                  fontSize: 16,
                  color: colors.secondary,
                  fontFamily: fonts.primary
                }}>
                  Capital total requis
                </p>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 16,
                  fontFamily: fonts.primary
                }}>
                  <span style={{ color: colors.secondary }}>Infrastructure</span>
                  <span style={{ color: colors.primary, fontWeight: 500 }}>60M FCFA</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 16,
                  fontFamily: fonts.primary
                }}>
                  <span style={{ color: colors.secondary }}>Aménagement</span>
                  <span style={{ color: colors.primary, fontWeight: 500 }}>35M FCFA</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 16,
                  fontFamily: fonts.primary
                }}>
                  <span style={{ color: colors.secondary }}>Équipements</span>
                  <span style={{ color: colors.primary, fontWeight: 500 }}>15M FCFA</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 16,
                  fontFamily: fonts.primary
                }}>
                  <span style={{ color: colors.secondary }}>Fonds de roulement</span>
                  <span style={{ color: colors.primary, fontWeight: 500 }}>10M FCFA</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 style={{
                fontSize: 24,
                fontWeight: 500,
                color: colors.primary,
                marginBottom: 30,
                fontFamily: fonts.primary
              }}>
                Retour sur Investissement
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 20,
                marginBottom: 30
              }}>
                <div style={{
                  backgroundColor: colors.background,
                  padding: 25,
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: 32,
                    fontWeight: 700,
                    color: colors.accent,
                    marginBottom: 5,
                    fontFamily: fonts.primary
                  }}>
                    4 ans
                  </div>
                  <p style={{
                    fontSize: 14,
                    color: colors.secondary,
                    fontFamily: fonts.primary
                  }}>
                    Période de retour
                  </p>
                </div>
                
                <div style={{
                  backgroundColor: colors.background,
                  padding: 25,
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: 32,
                    fontWeight: 700,
                    color: colors.accent,
                    marginBottom: 5,
                    fontFamily: fonts.primary
                  }}>
                    22%
                  </div>
                  <p style={{
                    fontSize: 14,
                    color: colors.secondary,
                    fontFamily: fonts.primary
                  }}>
                    TRI sur 10 ans
                  </p>
                </div>
              </div>
              
              <div style={{
                backgroundColor: colors.accent,
                color: colors.background,
                padding: 25,
                textAlign: 'center'
              }}>
                <p style={{
                  fontSize: 18,
                  fontFamily: fonts.primary,
                  margin: 0
                }}>
                  Rentabilité dès la 2ème année
                </p>
              </div>
            </div>
          </div>
        </div>
      </Page>

      {/* Slide 7: Équipe */}
      <Page background={colors.background}>
        <div style={{
          padding: 80,
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h2 style={{
            fontSize: 48,
            fontFamily: fonts.display,
            fontWeight: 300,
            color: colors.primary,
            marginBottom: 60,
            textAlign: 'center'
          }}>
            Notre Équipe
          </h2>
          
          <div style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 40
          }}>
            {[
              {
                name: 'Marie Kouassi',
                role: 'Directrice Générale',
                exp: '15 ans en gestion de projets durables'
              },
              {
                name: 'Jean-Paul Mensah',
                role: 'Directeur Technique',
                exp: 'Expert en architecture bio-climatique'
              },
              {
                name: 'Aminata Diallo',
                role: 'Directrice Marketing',
                exp: 'Spécialiste tourisme responsable'
              }
            ].map((member, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{
                  width: 150,
                  height: 150,
                  margin: '0 auto 25px',
                  borderRadius: '50%',
                  backgroundImage: `url(${unsplashPresets.business(150, 150)})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: `3px solid ${colors.border}`
                }} />
                
                <h3 style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: colors.primary,
                  marginBottom: 8,
                  fontFamily: fonts.primary
                }}>
                  {member.name}
                </h3>
                
                <p style={{
                  fontSize: 16,
                  color: colors.accent,
                  marginBottom: 15,
                  fontFamily: fonts.primary,
                  fontWeight: 500
                }}>
                  {member.role}
                </p>
                
                <p style={{
                  fontSize: 14,
                  color: colors.secondary,
                  lineHeight: 1.5,
                  fontFamily: fonts.primary
                }}>
                  {member.exp}
                </p>
              </div>
            ))}
          </div>
          
          <div style={{
            marginTop: 40,
            padding: 30,
            backgroundColor: colors.gray,
            textAlign: 'center'
          }}>
            <p style={{
              fontSize: 18,
              color: colors.primary,
              fontFamily: fonts.primary,
              margin: 0
            }}>
              Soutenu par un conseil consultatif d'experts en développement durable et urbanisme
            </p>
          </div>
        </div>
      </Page>

      {/* Slide 8: Prochaines Étapes */}
      <Page background={colors.accent}>
        <div style={{
          padding: 80,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          color: colors.background
        }}>
          <h2 style={{
            fontSize: 48,
            fontFamily: fonts.display,
            fontWeight: 300,
            marginBottom: 60,
            textAlign: 'center'
          }}>
            Rejoignez l'Aventure
          </h2>
          
          <div style={{
            maxWidth: 800,
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <p style={{
              fontSize: 24,
              marginBottom: 50,
              fontFamily: fonts.primary,
              fontWeight: 300,
              lineHeight: 1.6
            }}>
              Investissez dans le premier espace vert innovant du Bénin et contribuez à transformer notre ville
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 30,
              marginBottom: 60
            }}>
              {[
                { step: 'T1 2024', desc: 'Finalisation financement' },
                { step: 'T2 2024', desc: 'Début construction' },
                { step: 'T4 2024', desc: 'Ouverture au public' }
              ].map((item, index) => (
                <div key={index} style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  padding: 25,
                  borderRadius: 0
                }}>
                  <div style={{
                    fontSize: 20,
                    fontWeight: 600,
                    marginBottom: 10,
                    fontFamily: fonts.primary
                  }}>
                    {item.step}
                  </div>
                  <div style={{
                    fontSize: 16,
                    fontFamily: fonts.primary
                  }}>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{
              width: 80,
              height: 2,
              backgroundColor: colors.background,
              margin: '0 auto 40px',
              opacity: 0.5
            }} />
            
            <div style={{
              fontSize: 20,
              fontFamily: fonts.primary
            }}>
              <div style={{ marginBottom: 10 }}>
                <strong>Contact:</strong> contact@greenrooftop.bj
              </div>
              <div>
                <strong>Tél:</strong> +229 21 00 00 00
              </div>
            </div>
          </div>
        </div>
      </Page>
    </Document>
  );
};