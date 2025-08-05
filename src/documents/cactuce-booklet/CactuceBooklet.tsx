import { Document, Page } from '../../components/document-components';
import { unsplashPresets } from '../../utils/unsplash';

export const CactuceBooklet = () => {
  // Minimal color palette
  const colors = {
    primary: '#000000',
    secondary: '#666666',
    light: '#999999',
    background: '#FFFFFF',
    gray: '#F5F5F5',
    accent: '#2ECC71',
    border: '#E0E0E0'
  };
  
  const fonts = {
    primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    display: 'Georgia, "Times New Roman", serif'
  };
  
  return (
    <Document title="Cactuce Solutions Booklet" type="booklet" paperSize="A5">
      {/* Page 1 - Cover */}
      <Page background={colors.background}>
        <div style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '40px 30px',
          position: 'relative'
        }}>
          {/* Background image with overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${unsplashPresets.technology(420, 595)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.05
          }} />
          
          {/* Logo */}
          <div style={{
            fontSize: 24,
            fontWeight: 700,
            color: colors.primary,
            letterSpacing: 3,
            fontFamily: fonts.primary,
            marginBottom: 40
          }}>
            CACTUCE
          </div>
          
          <h1 style={{
            fontSize: 28,
            fontFamily: fonts.display,
            fontWeight: 300,
            margin: '0 0 20px 0',
            lineHeight: 1.3,
            color: colors.primary
          }}>
            Solutions Numériques pour la Transformation des Services Publics
          </h1>
          
          <div style={{
            width: 60,
            height: 1,
            backgroundColor: colors.accent,
            margin: '30px 0'
          }} />
          
          <p style={{
            fontSize: 16,
            color: colors.secondary,
            margin: 0,
            fontFamily: fonts.primary
          }}>
            AssetiQ • DocuStruct
          </p>
        </div>
      </Page>

      {/* Page 2 - The Challenges */}
      <Page background={colors.background}>
        <div style={{
          height: '100%',
          padding: '40px 30px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h2 style={{
            fontSize: 24,
            margin: '0 0 30px 0',
            color: colors.primary,
            textAlign: 'center',
            fontFamily: fonts.display,
            fontWeight: 300
          }}>
            Les Défis de Votre Institution
          </h2>
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 25 }}>
            {/* Asset Management Challenge */}
            <div style={{
              backgroundColor: colors.gray,
              padding: 25,
              borderLeft: `3px solid ${colors.accent}`
            }}>
              <h3 style={{ 
                margin: '0 0 12px 0', 
                fontSize: 18, 
                color: colors.primary,
                fontFamily: fonts.primary,
                fontWeight: 500
              }}>
                Gestion d'Actifs
              </h3>
              <ul style={{ 
                margin: 0, 
                paddingLeft: 20, 
                fontSize: 14, 
                fontFamily: fonts.primary, 
                lineHeight: 1.8, 
                color: colors.secondary 
              }}>
                <li>30% des équipements mal suivis</li>
                <li>Maintenance réactive coûteuse</li>
                <li>Aucune visibilité temps réel</li>
              </ul>
            </div>
            
            {/* Documentation Challenge */}
            <div style={{
              backgroundColor: colors.gray,
              padding: 25,
              borderLeft: `3px solid ${colors.accent}`
            }}>
              <h3 style={{ 
                margin: '0 0 12px 0', 
                fontSize: 18, 
                color: colors.primary,
                fontFamily: fonts.primary,
                fontWeight: 500
              }}>
                Gestion Documentaire
              </h3>
              <ul style={{ 
                margin: 0, 
                paddingLeft: 20, 
                fontSize: 14, 
                fontFamily: fonts.primary, 
                lineHeight: 1.8, 
                color: colors.secondary 
              }}>
                <li>Archives papier vulnérables</li>
                <li>Recherche chronophage</li>
                <li>Collaboration limitée</li>
              </ul>
            </div>
            
            {/* Bottom note */}
            <div style={{
              marginTop: 'auto',
              textAlign: 'center',
              fontSize: 16,
              color: colors.primary,
              fontWeight: 500,
              fontFamily: fonts.primary,
              paddingTop: 20
            }}>
              Votre institution mérite mieux.
            </div>
          </div>
        </div>
      </Page>

      {/* Page 3 - AssetiQ Solution */}
      <Page background={colors.background}>
        <div style={{
          height: '100%',
          padding: '40px 30px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Header with accent background */}
          <div style={{
            backgroundColor: colors.accent,
            color: colors.background,
            padding: '20px',
            margin: '-40px -30px 30px -30px',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: 28,
              margin: 0,
              fontFamily: fonts.display,
              fontWeight: 300
            }}>
              AssetiQ
            </h2>
            <p style={{
              fontSize: 14,
              margin: '8px 0 0 0',
              fontFamily: fonts.primary
            }}>
              Solution Intelligente de Gestion d'Actifs
            </p>
          </div>
          
          {/* Hero image */}
          <div style={{
            width: '100%',
            height: 180,
            backgroundImage: `url(${unsplashPresets.office(360, 180)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            marginBottom: 25
          }} />
          
          {/* Key features */}
          <div style={{ flex: 1 }}>
            <h3 style={{
              fontSize: 16,
              fontWeight: 600,
              color: colors.primary,
              marginBottom: 15,
              fontFamily: fonts.primary
            }}>
              Fonctionnalités Clés
            </h3>
            
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 12,
              fontSize: 14,
              fontFamily: fonts.primary,
              color: colors.secondary,
              lineHeight: 1.6
            }}>
              <div>• <strong>Suivi temps réel</strong> - Géolocalisez vos actifs</div>
              <div>• <strong>QR Codes</strong> - Identification instantanée</div>
              <div>• <strong>Maintenance prédictive</strong> - Économisez 40%</div>
              <div>• <strong>Tableaux de bord</strong> - Décisions éclairées</div>
            </div>
          </div>
        </div>
      </Page>

      {/* Page 4 - AssetiQ Benefits */}
      <Page background={colors.gray}>
        <div style={{
          height: '100%',
          padding: '40px 30px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h2 style={{
            fontSize: 24,
            margin: '0 0 35px 0',
            color: colors.primary,
            textAlign: 'center',
            fontFamily: fonts.display,
            fontWeight: 300
          }}>
            Résultats avec AssetiQ
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 20,
            marginBottom: 30
          }}>
            {[
              { number: '-40%', label: 'Coûts de maintenance' },
              { number: '+85%', label: 'Utilisation optimale' },
              { number: '100%', label: 'Traçabilité complète' },
              { number: '24/7', label: 'Accès temps réel' }
            ].map((stat, index) => (
              <div key={index} style={{
                backgroundColor: colors.background,
                padding: 20,
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: colors.accent,
                  marginBottom: 5,
                  fontFamily: fonts.primary
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: 12,
                  color: colors.secondary,
                  fontFamily: fonts.primary
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          
          {/* Case study */}
          <div style={{
            flex: 1,
            backgroundColor: colors.background,
            padding: 20,
            borderLeft: `3px solid ${colors.accent}`
          }}>
            <h3 style={{
              fontSize: 16,
              fontWeight: 600,
              color: colors.primary,
              marginBottom: 10,
              fontFamily: fonts.primary
            }}>
              Cas d'Usage
            </h3>
            <p style={{
              fontSize: 13,
              color: colors.secondary,
              lineHeight: 1.6,
              margin: 0,
              fontFamily: fonts.primary
            }}>
              "Grâce à AssetiQ, nous avons réduit nos coûts de maintenance de 40% et amélioré la disponibilité de nos équipements critiques."
              <br /><br />
              <em>- Ministère de l'Infrastructure</em>
            </p>
          </div>
        </div>
      </Page>

      {/* Page 5 - DocuStruct Solution */}
      <Page background={colors.background}>
        <div style={{
          height: '100%',
          padding: '40px 30px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Header with accent background */}
          <div style={{
            backgroundColor: colors.accent,
            color: colors.background,
            padding: '20px',
            margin: '-40px -30px 30px -30px',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: 28,
              margin: 0,
              fontFamily: fonts.display,
              fontWeight: 300
            }}>
              DocuStruct
            </h2>
            <p style={{
              fontSize: 14,
              margin: '8px 0 0 0',
              fontFamily: fonts.primary
            }}>
              Gestion Documentaire Nouvelle Génération
            </p>
          </div>
          
          {/* Hero image */}
          <div style={{
            width: '100%',
            height: 180,
            backgroundImage: `url(${unsplashPresets.abstract(360, 180)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            marginBottom: 25
          }} />
          
          {/* Key features */}
          <div style={{ flex: 1 }}>
            <h3 style={{
              fontSize: 16,
              fontWeight: 600,
              color: colors.primary,
              marginBottom: 15,
              fontFamily: fonts.primary
            }}>
              Fonctionnalités Clés
            </h3>
            
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 12,
              fontSize: 14,
              fontFamily: fonts.primary,
              color: colors.secondary,
              lineHeight: 1.6
            }}>
              <div>• <strong>OCR intelligent</strong> - Numérisation automatique</div>
              <div>• <strong>Recherche avancée</strong> - Trouvez en secondes</div>
              <div>• <strong>Workflow automatisé</strong> - Processus optimisés</div>
              <div>• <strong>Sécurité renforcée</strong> - Conformité garantie</div>
            </div>
          </div>
        </div>
      </Page>

      {/* Page 6 - DocuStruct Benefits */}
      <Page background={colors.gray}>
        <div style={{
          height: '100%',
          padding: '40px 30px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h2 style={{
            fontSize: 24,
            margin: '0 0 35px 0',
            color: colors.primary,
            textAlign: 'center',
            fontFamily: fonts.display,
            fontWeight: 300
          }}>
            Impact de DocuStruct
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 20,
            marginBottom: 30
          }}>
            {[
              { number: '90%', label: 'Gain de temps' },
              { number: '0', label: 'Documents perdus' },
              { number: '100%', label: 'Traçabilité' },
              { number: 'x5', label: 'Productivité' }
            ].map((stat, index) => (
              <div key={index} style={{
                backgroundColor: colors.background,
                padding: 20,
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: colors.accent,
                  marginBottom: 5,
                  fontFamily: fonts.primary
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: 12,
                  color: colors.secondary,
                  fontFamily: fonts.primary
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          
          {/* Implementation timeline */}
          <div style={{
            flex: 1,
            backgroundColor: colors.background,
            padding: 20
          }}>
            <h3 style={{
              fontSize: 16,
              fontWeight: 600,
              color: colors.primary,
              marginBottom: 15,
              fontFamily: fonts.primary
            }}>
              Déploiement Rapide
            </h3>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 13,
              fontFamily: fonts.primary
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: 18, 
                  fontWeight: 700, 
                  color: colors.accent,
                  marginBottom: 5 
                }}>
                  2
                </div>
                <div style={{ color: colors.secondary }}>Semaines</div>
                <div style={{ 
                  fontSize: 11, 
                  color: colors.light,
                  marginTop: 3 
                }}>
                  Installation
                </div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: 18, 
                  fontWeight: 700, 
                  color: colors.accent,
                  marginBottom: 5 
                }}>
                  1
                </div>
                <div style={{ color: colors.secondary }}>Semaine</div>
                <div style={{ 
                  fontSize: 11, 
                  color: colors.light,
                  marginTop: 3 
                }}>
                  Formation
                </div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: 18, 
                  fontWeight: 700, 
                  color: colors.accent,
                  marginBottom: 5 
                }}>
                  ∞
                </div>
                <div style={{ color: colors.secondary }}>Support</div>
                <div style={{ 
                  fontSize: 11, 
                  color: colors.light,
                  marginTop: 3 
                }}>
                  Continu
                </div>
              </div>
            </div>
          </div>
        </div>
      </Page>

      {/* Page 7 - Why Cactuce */}
      <Page background={colors.background}>
        <div style={{
          height: '100%',
          padding: '40px 30px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h2 style={{
            fontSize: 24,
            margin: '0 0 35px 0',
            color: colors.primary,
            textAlign: 'center',
            fontFamily: fonts.display,
            fontWeight: 300
          }}>
            Pourquoi Cactuce?
          </h2>
          
          <div style={{
            width: '100%',
            height: 150,
            backgroundImage: `url(${unsplashPresets.business(360, 150)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            marginBottom: 30
          }} />
          
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 20
          }}>
            {[
              {
                title: 'Expertise Locale',
                desc: '10+ ans d\'expérience en Afrique de l\'Ouest'
              },
              {
                title: 'Technologies Modernes',
                desc: 'Solutions cloud sécurisées et évolutives'
              },
              {
                title: 'Support Dédié',
                desc: 'Équipe disponible 24/7 en français'
              },
              {
                title: 'ROI Garanti',
                desc: 'Rentabilité en moins de 12 mois'
              }
            ].map((item, index) => (
              <div key={index} style={{
                borderLeft: `2px solid ${colors.accent}`,
                paddingLeft: 15
              }}>
                <h3 style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: colors.primary,
                  margin: '0 0 5px 0',
                  fontFamily: fonts.primary
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: 13,
                  color: colors.secondary,
                  margin: 0,
                  fontFamily: fonts.primary
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Page>

      {/* Page 8 - Contact */}
      <Page background={colors.accent}>
        <div style={{
          height: '100%',
          padding: '40px 30px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          color: colors.background
        }}>
          <h2 style={{
            fontSize: 32,
            margin: '0 0 20px 0',
            fontFamily: fonts.display,
            fontWeight: 300
          }}>
            Transformez Votre Institution
          </h2>
          
          <p style={{
            fontSize: 18,
            margin: '0 0 40px 0',
            fontFamily: fonts.primary,
            fontWeight: 300,
            lineHeight: 1.5
          }}>
            Rejoignez les institutions qui ont choisi l'excellence numérique
          </p>
          
          <div style={{
            width: 60,
            height: 1,
            backgroundColor: colors.background,
            margin: '0 0 40px 0',
            opacity: 0.5
          }} />
          
          <div style={{
            fontSize: 16,
            lineHeight: 1.8,
            fontFamily: fonts.primary
          }}>
            <div style={{ marginBottom: 20 }}>
              <strong style={{ fontSize: 18 }}>Contact</strong>
            </div>
            <div>info@cactuce.com</div>
            <div>+225 07 08 09 10 11</div>
            <div style={{ marginTop: 20 }}>
              www.cactuce.com
            </div>
          </div>
          
          <div style={{
            position: 'absolute',
            bottom: 30,
            fontSize: 12,
            opacity: 0.8,
            fontFamily: fonts.primary
          }}>
            © 2024 Cactuce Solutions
          </div>
        </div>
      </Page>
    </Document>
  );
};