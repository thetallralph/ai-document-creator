import { Document, Page } from '../../components/document-components';

export const CactuceBooklet = () => {
  // Inline styles to avoid import issues in code editor
  const colors = {
    green: '#2ECC71',
    darkGreen: '#27AE60',
    blue: '#3498DB',
    darkBlue: '#2980B9',
    orange: '#E67E22',
    darkOrange: '#D35400',
    darkGray: '#2C3E50',
    lightGray: '#95A5A6',
    lightGreen: '#E8F8F5',
    lightBlue: '#EBF5FB',
    lightOrange: '#FDF2E9',
    textPrimary: '#2C3E50',
    textSecondary: '#34495E',
    textLight: '#7F8C8D',
    white: '#FFFFFF'
  };
  
  const fonts = {
    primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    heading: '"Playfair Display", Georgia, serif',
    mono: '"Space Mono", "Courier New", monospace'
  };
  
  const fontWeights = {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900
  };
  
  return (
    <Document title="Cactuce Solutions Booklet" type="booklet" paperSize="A5">
      {/* Page 1 - Cover - Professional and Impactful */}
      <Page background={`linear-gradient(135deg, ${colors.green} 0%, ${colors.darkGreen} 100%)`}>
        <div style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
          padding: '40px 30px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background decoration */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            backgroundColor: 'rgba(255,255,255,0.05)',
            borderRadius: '50%',
            zIndex: 0
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-100px',
            left: '-100px',
            width: '300px',
            height: '300px',
            backgroundColor: 'rgba(255,255,255,0.03)',
            borderRadius: '50%',
            zIndex: 0
          }} />
          
          {/* Logo */}
          <div style={{
            width: 120,
            height: 45,
            backgroundColor: 'white',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.green,
            letterSpacing: 1,
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            fontFamily: fonts.mono,
            zIndex: 1
          }}>
            CACTUCE
          </div>
          
          {/* Main content */}
          <div style={{ zIndex: 1 }}>
            <h1 style={{
              fontSize: 28,
              fontFamily: fonts.heading,
              fontWeight: fontWeights.bold,
              margin: '0 0 20px 0',
              lineHeight: 1.2,
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              Solutions Numériques pour la Transformation des Services Publics
            </h1>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 20,
              fontSize: 18,
              fontWeight: fontWeights.medium,
              margin: '30px 0'
            }}>
              <span style={{
                padding: '8px 16px',
                backgroundColor: 'rgba(255,255,255,0.15)',
                borderRadius: 20,
                backdropFilter: 'blur(10px)'
              }}>AssetiQ</span>
              <span style={{ opacity: 0.5 }}>•</span>
              <span style={{
                padding: '8px 16px',
                backgroundColor: 'rgba(255,255,255,0.15)',
                borderRadius: 20,
                backdropFilter: 'blur(10px)'
              }}>DocuStruct</span>
            </div>
          </div>
          
          {/* Icon */}
          <div style={{
            width: 140,
            height: 140,
            backgroundColor: 'rgba(255,255,255,0.15)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 60,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(10px)',
            zIndex: 1
          }}>
            🚀
          </div>
          
          {/* Tagline */}
          <p style={{
            fontSize: 14,
            fontStyle: 'italic',
            opacity: 0.9,
            letterSpacing: 0.5,
            fontFamily: fonts.primary,
            zIndex: 1
          }}>
            Smart Software for Institutional Transformation
          </p>
        </div>
      </Page>

      {/* Page 2 - The Challenges - Visual and Engaging */}
      <Page background="#ffffff">
        <div style={{
          height: '100%',
          padding: '30px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h2 style={{
            fontSize: 24,
            margin: '0 0 25px 0',
            color: colors.darkGray,
            textAlign: 'center',
            fontFamily: fonts.heading,
            fontWeight: fontWeights.bold
          }}>
            Les Défis Critiques de Votre Institution
          </h2>
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Asset Management Challenge */}
            <div style={{
              backgroundColor: colors.lightBlue,
              borderRadius: 12,
              padding: 20,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              border: `2px solid ${colors.blue}20`
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  backgroundColor: colors.blue,
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  color: 'white'
                }}>
                  📊
                </div>
                <h3 style={{ 
                  margin: 0, 
                  fontSize: 18, 
                  color: colors.darkBlue,
                  fontFamily: fonts.primary,
                  fontWeight: fontWeights.bold
                }}>
                  Gestion d'Actifs Chaotique
                </h3>
              </div>
              <ul style={{ 
                margin: 0, 
                paddingLeft: 20, 
                fontSize: 13, 
                fontFamily: fonts.primary, 
                lineHeight: 1.8, 
                color: colors.textPrimary 
              }}>
                <li><strong>30%</strong> des équipements perdus ou mal suivis</li>
                <li>Maintenance réactive <strong>coûteuse</strong></li>
                <li>Aucune visibilité sur l'utilisation réelle</li>
              </ul>
            </div>
            
            {/* Documentation Challenge */}
            <div style={{
              backgroundColor: colors.lightOrange,
              borderRadius: 12,
              padding: 20,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              border: `2px solid ${colors.orange}20`
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  backgroundColor: colors.orange,
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  color: 'white'
                }}>
                  📄
                </div>
                <h3 style={{ 
                  margin: 0, 
                  fontSize: 18, 
                  color: colors.darkOrange,
                  fontFamily: fonts.primary,
                  fontWeight: fontWeights.bold
                }}>
                  Documentation Archaïque
                </h3>
              </div>
              <ul style={{ 
                margin: 0, 
                paddingLeft: 20, 
                fontSize: 13, 
                fontFamily: fonts.primary, 
                lineHeight: 1.8, 
                color: colors.textPrimary 
              }}>
                <li><strong>2 heures</strong> par jour perdues en recherche</li>
                <li>Archives physiques débordantes</li>
                <li>Processus d'approbation <strong>interminables</strong></li>
              </ul>
            </div>
          </div>
          
          {/* Call to action */}
          <div style={{
            backgroundColor: colors.green,
            color: 'white',
            borderRadius: 12,
            padding: 20,
            textAlign: 'center',
            marginTop: 20,
            boxShadow: '0 4px 12px rgba(46, 204, 113, 0.3)'
          }}>
            <h3 style={{ 
              margin: '0 0 10px 0', 
              fontSize: 18,
              fontFamily: fonts.primary,
              fontWeight: fontWeights.bold
            }}>
              La Transformation est Possible
            </h3>
            <p style={{ 
              margin: 0, 
              fontSize: 14, 
              lineHeight: 1.6,
              fontFamily: fonts.primary
            }}>
              Deux plateformes intelligentes conçues spécifiquement pour les réalités des institutions publiques africaines.
            </p>
            <p style={{ 
              margin: '12px 0 0 0', 
              fontSize: 16, 
              fontWeight: fontWeights.bold,
              fontFamily: fonts.primary
            }}>
              Découvrez comment révolutionner vos opérations →
            </p>
          </div>
        </div>
      </Page>

      {/* Page 3 - AssetiQ Overview - Clean and Professional */}
      <Page background="#ffffff">
        <div style={{
          height: '100%',
          padding: '30px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 15,
            marginBottom: 25
          }}>
            <div style={{
              width: 60,
              height: 60,
              backgroundColor: colors.blue,
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 28,
              boxShadow: '0 4px 12px rgba(52, 152, 219, 0.3)'
            }}>
              📦
            </div>
            <div>
              <h2 style={{ 
                margin: 0, 
                fontSize: 28, 
                fontFamily: fonts.heading, 
                fontWeight: fontWeights.bold, 
                color: colors.darkBlue 
              }}>
                AssetiQ
              </h2>
              <p style={{ 
                margin: 0, 
                fontSize: 16, 
                fontFamily: fonts.primary, 
                color: colors.textLight 
              }}>
                Gestion Intelligente des Actifs Publics
              </p>
            </div>
          </div>
          
          {/* Value proposition */}
          <div style={{
            backgroundColor: colors.lightBlue,
            padding: 18,
            borderRadius: 10,
            marginBottom: 25,
            textAlign: 'center',
            fontSize: 17,
            fontFamily: fonts.primary,
            fontWeight: fontWeights.medium,
            color: colors.darkBlue,
            border: `2px solid ${colors.blue}20`
          }}>
            Transformez chaque actif en ressource intelligente
          </div>
          
          {/* Problem solved */}
          <div style={{ marginBottom: 25 }}>
            <h3 style={{ 
              fontSize: 18, 
              marginBottom: 12, 
              fontFamily: fonts.primary, 
              fontWeight: fontWeights.bold, 
              color: colors.textPrimary 
            }}>
              Le Problème Résolu
            </h3>
            <p style={{ 
              fontSize: 14, 
              lineHeight: 1.7, 
              margin: 0, 
              fontFamily: fonts.primary, 
              color: colors.textSecondary 
            }}>
              Fini les équipements introuvables, les maintenances surprises, les achats en double. AssetiQ apporte ordre et efficacité à votre patrimoine institutionnel.
            </p>
          </div>
          
          {/* How it works */}
          <div style={{ flex: 1 }}>
            <h3 style={{ 
              fontSize: 16, 
              marginBottom: 15, 
              color: colors.textPrimary,
              fontFamily: fonts.primary,
              fontWeight: fontWeights.bold
            }}>
              Comment ça Marche
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { num: '1', title: 'Identification Unique', desc: 'Chaque actif reçoit un QR code intelligent' },
                { num: '2', title: 'Suivi en Temps Réel', desc: 'Localisation et état visibles instantanément' },
                { num: '3', title: 'Intelligence Prédictive', desc: 'L\'IA anticipe les besoins de maintenance' }
              ].map((step, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{
                    minWidth: 28,
                    height: 28,
                    backgroundColor: colors.blue,
                    color: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: fontWeights.bold,
                    fontFamily: fonts.primary
                  }}>
                    {step.num}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ 
                      margin: '0 0 4px 0', 
                      fontSize: 14, 
                      fontFamily: fonts.primary, 
                      fontWeight: fontWeights.bold, 
                      color: colors.textPrimary 
                    }}>
                      {step.title}
                    </h4>
                    <p style={{ 
                      margin: 0, 
                      fontSize: 12, 
                      fontFamily: fonts.primary, 
                      color: colors.textLight, 
                      lineHeight: 1.5 
                    }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Preview */}
          <div style={{
            backgroundColor: '#f8f9fa',
            borderRadius: 10,
            padding: 15,
            textAlign: 'center',
            marginTop: 20,
            border: '1px solid #e0e0e0'
          }}>
            <span style={{ 
              fontSize: 11, 
              fontFamily: fonts.primary, 
              color: colors.textLight,
              textTransform: 'uppercase',
              letterSpacing: 0.5
            }}>Interface AssetiQ</span>
            <div style={{
              marginTop: 10,
              height: 70,
              backgroundColor: '#ffffff',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 35,
              color: colors.blue,
              border: '1px solid #e0e0e0'
            }}>
              📊
            </div>
          </div>
        </div>
      </Page>

      {/* Page 4 - AssetiQ Features - Grid Layout */}
      <Page background="#ffffff">
        <div style={{
          height: '100%',
          padding: '30px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h2 style={{
            fontSize: 22,
            margin: '0 0 25px 0',
            fontFamily: fonts.heading,
            fontWeight: fontWeights.bold,
            color: colors.darkBlue,
            textAlign: 'center'
          }}>
            Capacités Clés d'AssetiQ
          </h2>
          
          <div style={{ 
            flex: 1, 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr',
            gap: 15,
            marginBottom: 20
          }}>
            {[
              { icon: '📊', title: 'Tableaux de Bord', items: ['Vue d\'ensemble instantanée', 'Métriques en temps réel', 'Alertes proactives'] },
              { icon: '🔄', title: 'Workflows', items: ['Réservations sans conflits', 'Approbations automatisées', 'Notifications multicanales'] },
              { icon: '🛡️', title: 'Maintenance', items: ['Analyse prédictive', 'Prévention des pannes', 'Planning optimisé'] },
              { icon: '📱', title: 'Mobilité', items: ['App terrain', 'Scan QR code', 'Mode hors-ligne'] }
            ].map((feature, index) => (
              <div key={index} style={{
                backgroundColor: '#f8f9fa',
                borderRadius: 10,
                padding: 15,
                borderLeft: `4px solid ${colors.blue}`,
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 20 }}>{feature.icon}</span>
                  <h3 style={{ 
                    margin: 0, 
                    fontSize: 14, 
                    fontFamily: fonts.primary, 
                    fontWeight: fontWeights.bold, 
                    color: colors.textPrimary 
                  }}>
                    {feature.title}
                  </h3>
                </div>
                <ul style={{ 
                  margin: 0, 
                  paddingLeft: 16, 
                  fontSize: 11, 
                  fontFamily: fonts.primary, 
                  lineHeight: 1.6, 
                  color: colors.textSecondary,
                  flex: 1
                }}>
                  {feature.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {/* Impact section */}
          <div style={{
            backgroundColor: colors.green,
            color: 'white',
            borderRadius: 10,
            padding: 18,
            boxShadow: '0 4px 12px rgba(46, 204, 113, 0.3)'
          }}>
            <h3 style={{ 
              margin: '0 0 12px 0', 
              fontSize: 16, 
              fontFamily: fonts.primary, 
              fontWeight: fontWeights.bold, 
              textAlign: 'center' 
            }}>
              Impact Concret
            </h3>
            <div style={{ 
              fontSize: 12, 
              fontFamily: fonts.primary, 
              lineHeight: 1.8,
              display: 'grid',
              gap: 8
            }}>
              <p style={{ margin: 0 }}>
                <strong>Ministère de la Santé :</strong> 60% d'augmentation de disponibilité des ambulances
              </p>
              <p style={{ margin: 0 }}>
                <strong>Université Nationale :</strong> Économie de 2M€ en rachats évités
              </p>
            </div>
          </div>
          
          {/* CTA Button */}
          <div style={{
            marginTop: 15,
            textAlign: 'center',
            backgroundColor: colors.blue,
            color: 'white',
            padding: 12,
            borderRadius: 8,
            fontSize: 14,
            fontWeight: fontWeights.bold,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(52, 152, 219, 0.3)',
            fontFamily: fonts.primary
          }}>
            Prêt pour une démo personnalisée ?
          </div>
        </div>
      </Page>

      {/* Page 5 - DocuStruct Overview - Clean Layout */}
      <Page background="#ffffff">
        <div style={{
          height: '100%',
          padding: '30px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 15,
            marginBottom: 25
          }}>
            <div style={{
              width: 60,
              height: 60,
              backgroundColor: colors.orange,
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 28,
              boxShadow: '0 4px 12px rgba(230, 126, 34, 0.3)'
            }}>
              📄
            </div>
            <div>
              <h2 style={{ 
                margin: 0, 
                fontSize: 28, 
                fontFamily: fonts.heading,
                fontWeight: fontWeights.bold,
                color: colors.darkOrange 
              }}>
                DocuStruct
              </h2>
              <p style={{ 
                margin: 0, 
                fontSize: 16, 
                color: colors.textLight,
                fontFamily: fonts.primary
              }}>
                Dématérialisation Intelligente
              </p>
            </div>
          </div>
          
          {/* Value proposition */}
          <div style={{
            backgroundColor: colors.lightOrange,
            padding: 18,
            borderRadius: 10,
            marginBottom: 25,
            textAlign: 'center',
            fontSize: 17,
            fontWeight: fontWeights.medium,
            color: colors.darkOrange,
            fontFamily: fonts.primary,
            border: `2px solid ${colors.orange}20`
          }}>
            Du papier au numérique, en toute sécurité
          </div>
          
          {/* Problem solved */}
          <div style={{ marginBottom: 25 }}>
            <h3 style={{ 
              fontSize: 18, 
              marginBottom: 12, 
              color: colors.textPrimary,
              fontFamily: fonts.primary,
              fontWeight: fontWeights.bold
            }}>
              Le Problème Résolu
            </h3>
            <p style={{ 
              fontSize: 14, 
              lineHeight: 1.7, 
              margin: 0, 
              color: colors.textSecondary,
              fontFamily: fonts.primary
            }}>
              Éliminez les montagnes de papier, les recherches interminables et les risques de perte. DocuStruct digitalise et organise intelligemment tous vos documents.
            </p>
          </div>
          
          {/* How it works */}
          <div style={{ flex: 1 }}>
            <h3 style={{ 
              fontSize: 16, 
              marginBottom: 15, 
              color: colors.textPrimary,
              fontFamily: fonts.primary,
              fontWeight: fontWeights.bold
            }}>
              Comment ça Marche
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
              {[
                { num: '1', title: 'Capture Universelle', desc: 'Scannez, importez ou créez vos documents' },
                { num: '2', title: 'Intelligence OCR', desc: 'Extraction automatique du contenu' },
                { num: '3', title: 'Organisation Auto', desc: 'Classification et workflows intelligents' }
              ].map((step, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{
                    minWidth: 28,
                    height: 28,
                    backgroundColor: colors.orange,
                    color: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: fontWeights.bold,
                    fontFamily: fonts.primary
                  }}>
                    {step.num}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ 
                      margin: '0 0 4px 0', 
                      fontSize: 14, 
                      fontWeight: fontWeights.bold,
                      color: colors.textPrimary,
                      fontFamily: fonts.primary
                    }}>
                      {step.title}
                    </h4>
                    <p style={{ 
                      margin: 0, 
                      fontSize: 12, 
                      color: colors.textLight, 
                      lineHeight: 1.5,
                      fontFamily: fonts.primary
                    }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Preview */}
          <div style={{
            backgroundColor: '#f8f9fa',
            borderRadius: 10,
            padding: 15,
            textAlign: 'center',
            marginTop: 20,
            border: '1px solid #e0e0e0'
          }}>
            <span style={{ 
              fontSize: 11, 
              fontFamily: fonts.primary, 
              color: colors.textLight,
              textTransform: 'uppercase',
              letterSpacing: 0.5
            }}>Interface DocuStruct</span>
            <div style={{
              marginTop: 10,
              height: 70,
              backgroundColor: '#ffffff',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 35,
              color: colors.orange,
              border: '1px solid #e0e0e0'
            }}>
              🔍
            </div>
          </div>
        </div>
      </Page>

      {/* Page 6 - DocuStruct Features - Visual Grid */}
      <Page background="#ffffff">
        <div style={{
          height: '100%',
          padding: '30px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h2 style={{
            fontSize: 22,
            margin: '0 0 25px 0',
            color: colors.darkOrange,
            textAlign: 'center',
            fontFamily: fonts.heading,
            fontWeight: fontWeights.bold
          }}>
            Capacités Clés de DocuStruct
          </h2>
          
          <div style={{ 
            flex: 1, 
            display: 'grid', 
            gap: 15,
            marginBottom: 20
          }}>
            {[
              { icon: '🔍', title: 'Recherche Cognitive', desc: 'Trouvez par concept, support multilingue, résultats instantanés' },
              { icon: '🔐', title: 'Sécurité Militaire', desc: 'Chiffrement AES-256, authentification multi-facteurs, coffre-fort certifié' },
              { icon: '⚡', title: 'Workflows Auto', desc: 'Circuits personnalisables, signatures électroniques, rappels automatiques' },
              { icon: '📈', title: 'Analytics RGPD', desc: 'Tableaux de bord, pistes d\'audit complètes, rapports de conformité' }
            ].map((feature, index) => (
              <div key={index} style={{
                backgroundColor: '#f8f9fa',
                borderRadius: 12,
                padding: 18,
                borderLeft: `4px solid ${colors.orange}`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <span style={{ fontSize: 24 }}>{feature.icon}</span>
                  <h3 style={{ 
                    margin: 0, 
                    fontSize: 16, 
                    color: colors.textPrimary,
                    fontFamily: fonts.primary,
                    fontWeight: fontWeights.bold
                  }}>
                    {feature.title}
                  </h3>
                </div>
                <p style={{ 
                  margin: 0, 
                  fontSize: 12, 
                  lineHeight: 1.6, 
                  color: colors.textSecondary,
                  fontFamily: fonts.primary
                }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
          
          {/* Success stories */}
          <div style={{
            backgroundColor: colors.green,
            color: 'white',
            borderRadius: 10,
            padding: 18,
            boxShadow: '0 4px 12px rgba(46, 204, 113, 0.3)'
          }}>
            <h3 style={{ 
              margin: '0 0 12px 0', 
              fontSize: 16, 
              textAlign: 'center',
              fontFamily: fonts.primary,
              fontWeight: fontWeights.bold
            }}>
              Transformations Réelles
            </h3>
            <div style={{ 
              fontSize: 12, 
              lineHeight: 1.8,
              fontFamily: fonts.primary,
              display: 'grid',
              gap: 8
            }}>
              <p style={{ margin: 0 }}>
                <strong>Direction des Impôts :</strong> 10 millions de déclarations dématérialisées
              </p>
              <p style={{ margin: 0 }}>
                <strong>Services RH :</strong> Traitement 70% plus rapide des dossiers
              </p>
            </div>
          </div>
          
          {/* CTA Button */}
          <div style={{
            marginTop: 15,
            textAlign: 'center',
            backgroundColor: colors.orange,
            color: 'white',
            padding: 12,
            borderRadius: 8,
            fontSize: 14,
            fontWeight: fontWeights.bold,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(230, 126, 34, 0.3)',
            fontFamily: fonts.primary
          }}>
            Commencez votre transformation
          </div>
        </div>
      </Page>

      {/* Page 7 - Why Cactuce - Credibility & Trust */}
      <Page background="#ffffff">
        <div style={{
          height: '100%',
          padding: '30px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h2 style={{
            fontSize: 24,
            margin: '0 0 25px 0',
            color: colors.darkGray,
            textAlign: 'center',
            fontFamily: fonts.heading,
            fontWeight: fontWeights.bold
          }}>
            Notre Expertise à Votre Service
          </h2>
          
          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
            marginBottom: 20
          }}>
            {[
              { icon: '🌍', label: 'Présence Africaine', value: '8 pays', desc: 'Compréhension locale' },
              { icon: '👥', label: 'Équipe d\'Excellence', value: '47 experts', desc: '42% de femmes' },
              { icon: '🏆', label: 'Track Record', value: '7 projets', desc: 'gouvernementaux' },
              { icon: '🎓', label: 'Formation', value: '324 heures', desc: 'dispensées' }
            ].map((stat, index) => (
              <div key={index} style={{
                backgroundColor: colors.lightGreen,
                borderRadius: 10,
                padding: 15,
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <span style={{ fontSize: 28, display: 'block', marginBottom: 5 }}>{stat.icon}</span>
                <h3 style={{ 
                  margin: '0 0 4px 0', 
                  fontSize: 14, 
                  fontFamily: fonts.primary, 
                  fontWeight: fontWeights.semibold, 
                  color: colors.textPrimary 
                }}>
                  {stat.label}
                </h3>
                <p style={{ 
                  margin: 0, 
                  fontSize: 20, 
                  fontFamily: fonts.primary, 
                  fontWeight: fontWeights.bold, 
                  color: colors.green 
                }}>
                  {stat.value}
                </p>
                <p style={{ 
                  margin: 0, 
                  fontSize: 11, 
                  fontFamily: fonts.primary, 
                  color: colors.textLight 
                }}>
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
          
          {/* Our Approach */}
          <div style={{
            backgroundColor: colors.darkGray,
            color: 'white',
            borderRadius: 12,
            padding: 20,
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h3 style={{ 
              margin: '0 0 15px 0', 
              fontSize: 18, 
              fontFamily: fonts.primary, 
              fontWeight: fontWeights.bold, 
              textAlign: 'center' 
            }}>
              Notre Approche Unique
            </h3>
            
            <div style={{ 
              display: 'grid', 
              gap: 12,
              flex: 1
            }}>
              {[
                { icon: '🤝', title: 'Co-construction', desc: 'Nous développons AVEC vous, pas POUR vous' },
                { icon: '🔒', title: 'Souveraineté Garantie', desc: 'Vos données restent sous votre contrôle total' },
                { icon: '⚙️', title: 'Technologies Ouvertes', desc: 'Pas de dépendance, évolutivité assurée' },
                { icon: '📍', title: 'Support Local', desc: 'Équipes sur place, réactivité maximale' }
              ].map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span style={{ fontSize: 18, marginTop: 2 }}>{item.icon}</span>
                  <div>
                    <h4 style={{ 
                      margin: '0 0 3px 0', 
                      fontSize: 14,
                      fontFamily: fonts.primary,
                      fontWeight: fontWeights.semibold
                    }}>
                      {item.title}
                    </h4>
                    <p style={{ 
                      margin: 0, 
                      fontSize: 11, 
                      opacity: 0.9,
                      fontFamily: fonts.primary,
                      lineHeight: 1.5
                    }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Page>

      {/* Page 8 - Call to Action - Strong Finish */}
      <Page background={`linear-gradient(135deg, ${colors.darkGreen} 0%, ${colors.green} 100%)`}>
        <div style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          color: 'white',
          padding: '30px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background decoration */}
          <div style={{
            position: 'absolute',
            top: '-100px',
            left: '-100px',
            width: '300px',
            height: '300px',
            backgroundColor: 'rgba(255,255,255,0.05)',
            borderRadius: '50%',
            zIndex: 0
          }} />
          
          <h2 style={{
            fontSize: 24,
            fontFamily: fonts.heading,
            fontWeight: fontWeights.bold,
            margin: '0 0 20px 0',
            textAlign: 'center',
            zIndex: 1,
            position: 'relative'
          }}>
            Votre Transformation en 5 Étapes
          </h2>
          
          <div style={{ 
            flex: 1, 
            marginBottom: 20,
            zIndex: 1,
            position: 'relative'
          }}>
            {[
              { num: '1', title: 'Consultation Découverte', desc: 'Analysons vos défis (Gratuite)' },
              { num: '2', title: 'Démo Personnalisée', desc: 'Solutions adaptées à vos besoins' },
              { num: '3', title: 'Pilote sur Mesure', desc: 'Test sans engagement' },
              { num: '4', title: 'Déploiement Progressif', desc: 'Formation et accompagnement' },
              { num: '5', title: 'Succès Mesurable', desc: 'ROI en 6 mois maximum' }
            ].map((step, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: 12,
                opacity: 0.95
              }}>
                <div style={{
                  minWidth: 30,
                  height: 30,
                  backgroundColor: 'white',
                  color: colors.green,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: fontWeights.bold,
                  marginRight: 12,
                  fontFamily: fonts.primary
                }}>
                  {step.num}
                </div>
                <div>
                  <h4 style={{ 
                    margin: '0 0 3px 0', 
                    fontSize: 14, 
                    fontFamily: fonts.primary, 
                    fontWeight: fontWeights.semibold 
                  }}>
                    {step.title}
                  </h4>
                  <p style={{ 
                    margin: 0, 
                    fontSize: 11, 
                    fontFamily: fonts.primary, 
                    opacity: 0.85 
                  }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Contact Card */}
          <div style={{
            backgroundColor: 'white',
            color: colors.darkGray,
            borderRadius: 12,
            padding: 20,
            textAlign: 'center',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            zIndex: 1,
            position: 'relative'
          }}>
            <h3 style={{ 
              margin: '0 0 8px 0', 
              fontSize: 18, 
              fontFamily: fonts.primary, 
              fontWeight: fontWeights.bold, 
              color: colors.green 
            }}>
              Ne Perdez Plus de Temps
            </h3>
            <p style={{ 
              margin: '0 0 15px 0', 
              fontSize: 12, 
              fontFamily: fonts.primary, 
              color: colors.textSecondary,
              lineHeight: 1.6
            }}>
              Chaque jour sans transformation digitale est une opportunité manquée d'améliorer le service public.
            </p>
            
            <div style={{
              backgroundColor: colors.lightGreen,
              borderRadius: 8,
              padding: 15,
              marginBottom: 15
            }}>
              <h4 style={{ 
                margin: '0 0 10px 0', 
                fontSize: 16, 
                fontFamily: fonts.primary, 
                fontWeight: fontWeights.bold, 
                color: colors.darkGreen 
              }}>
                Contactez-nous Aujourd'hui
              </h4>
              <div style={{ 
                fontSize: 13, 
                fontFamily: fonts.primary, 
                lineHeight: 1.8,
                color: colors.textPrimary
              }}>
                <p style={{ margin: '4px 0' }}>📧 contact@cactuce.com</p>
                <p style={{ margin: '4px 0' }}>🌐 www.cactuce.com</p>
                <p style={{ margin: '4px 0' }}>📱 +225 XX XX XX XX</p>
              </div>
            </div>
            
            <div style={{
              fontSize: 20,
              fontFamily: fonts.mono,
              fontWeight: fontWeights.bold,
              color: colors.green,
              letterSpacing: 1,
              marginBottom: 8
            }}>
              CACTUCE
            </div>
            
            <p style={{
              margin: 0,
              fontSize: 11,
              fontFamily: fonts.primary,
              fontStyle: 'italic',
              color: colors.textLight
            }}>
              Ensemble, construisons l'administration publique de demain
            </p>
          </div>
        </div>
      </Page>
    </Document>
  );
};