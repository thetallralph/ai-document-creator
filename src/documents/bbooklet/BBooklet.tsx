import { Document, Page } from '../../components/document-components';

export const Bbooklet = () => {
  return (
    <Document title="BBooklet" type="booklet" paperSize="A5">
      <Page background="linear-gradient(135deg, #2d5a27 0%, #4a7c59 100%)" padding="0">
        <div style={{ 
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '30px'
        }}>
          <div style={{
            position: 'absolute',
            top: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '80px',
            background: 'white',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            <span style={{ fontSize: '40px', color: '#2d5a27' }}>🌵</span>
          </div>
          
          <div style={{
            textAlign: 'center',
            color: 'white',
            marginTop: '80px'
          }}>
            <h2 style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: '18px',
              fontWeight: 300,
              margin: '0 0 20px 0',
              letterSpacing: '2px'
            }}>
              Solutions Numériques pour la Transformation des Services Publics
            </h2>
            
            <h1 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '36px',
              fontWeight: 700,
              margin: '20px 0',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              AssetiQ • DocuStruct
            </h1>
            
            <div style={{
              margin: '30px 0',
              width: '100%',
              height: '150px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '60px', marginBottom: '10px' }}>🚀</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>
                  Transformation Digitale
                </div>
              </div>
            </div>
            
            <p style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '14px',
              fontWeight: 300,
              margin: '20px 0 0 0',
              opacity: 0.9,
              fontStyle: 'italic'
            }}>
              Smart Software for Institutional Transformation
            </p>
          </div>
        </div>
      </Page>

      <Page background="#f8fafc" padding="30px">
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <h1 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '24px',
            fontWeight: 700,
            color: '#1a202c',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            L'URGENCE DE LA TRANSFORMATION
          </h1>
          
          <h2 style={{
            fontFamily: '"Outfit", sans-serif',
            fontSize: '16px',
            fontWeight: 600,
            color: '#2d5a27',
            marginBottom: '15px'
          }}>
            Les Défis Critiques de Votre Institution
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px' }}>
            <div style={{
              background: 'white',
              padding: '15px',
              borderRadius: '10px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              borderLeft: '4px solid #e53e3e'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '20px', marginRight: '10px' }}>📊</span>
                <h3 style={{
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#e53e3e',
                  margin: 0
                }}>
                  Gestion d'Actifs Chaotique
                </h3>
              </div>
              <ul style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '9px',
                color: '#4a5568',
                margin: 0,
                paddingLeft: '15px'
              }}>
                <li>30% des équipements perdus ou mal suivis</li>
                <li>Maintenance réactive coûteuse</li>
                <li>Aucune visibilité sur l'utilisation réelle</li>
              </ul>
            </div>
            
            <div style={{
              background: 'white',
              padding: '15px',
              borderRadius: '10px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              borderLeft: '4px solid #f56500'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '20px', marginRight: '10px' }}>📄</span>
                <h3 style={{
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#f56500',
                  margin: 0
                }}>
                  Documentation Archaïque
                </h3>
              </div>
              <ul style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '9px',
                color: '#4a5568',
                margin: 0,
                paddingLeft: '15px'
              }}>
                <li>2 heures par jour perdues en recherche</li>
                <li>Archives physiques débordantes</li>
                <li>Processus d'approbation interminables</li>
              </ul>
            </div>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #2d5a27 0%, #4a7c59 100%)',
            padding: '20px',
            borderRadius: '15px',
            color: 'white',
            textAlign: 'center',
            marginTop: 'auto'
          }}>
            <h3 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '16px',
              fontWeight: 700,
              margin: '0 0 10px 0'
            }}>
              La Transformation est Possible
            </h3>
            <p style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '10px',
              margin: '0 0 10px 0',
              lineHeight: 1.4
            }}>
              Deux plateformes intelligentes conçues spécifiquement pour les réalités des institutions publiques africaines.
            </p>
            <p style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '9px',
              margin: 0,
              fontStyle: 'italic',
              opacity: 0.9
            }}>
              Découvrez comment révolutionner vos opérations...
            </p>
          </div>
        </div>
      </Page>

      <Page background="linear-gradient(135deg, #3182ce 0%, #2c5282 100%)" padding="30px">
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', color: 'white' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 15px auto',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}>
              <span style={{ fontSize: '30px', color: '#3182ce' }}>⚙️</span>
            </div>
            
            <h1 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '22px',
              fontWeight: 700,
              margin: '0 0 5px 0'
            }}>
              AssetiQ
            </h1>
            <p style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '10px',
              margin: 0,
              opacity: 0.9
            }}>
              Gestion Intelligente des Actifs Publics
            </p>
          </div>
          
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '15px',
            borderRadius: '10px',
            marginBottom: '15px',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              margin: '0 0 8px 0'
            }}>
              Transformez chaque actif en ressource intelligente
            </h3>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <h3 style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              margin: '0 0 10px 0'
            }}>
              Le Problème Résolu
            </h3>
            <p style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '9px',
              lineHeight: 1.4,
              margin: 0
            }}>
              Fini les équipements introuvables, les maintenances surprises, les achats en double. AssetiQ apporte ordre et efficacité à votre patrimoine.
            </p>
          </div>
          
          <div style={{ flex: 1 }}>
            <h3 style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              margin: '0 0 10px 0'
            }}>
              Comment ça Marche
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  background: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '10px',
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: '10px', color: '#3182ce', fontWeight: 'bold' }}>1</span>
                </div>
                <div>
                  <h4 style={{
                    fontFamily: '"Outfit", sans-serif',
                    fontSize: '10px',
                    fontWeight: 600,
                    margin: '0 0 3px 0'
                  }}>
                    Identification Unique
                  </h4>
                  <p style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '8px',
                    margin: 0,
                    opacity: 0.9
                  }}>
                    Chaque actif reçoit un QR code intelligent qui contient toute son histoire
                  </p>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  background: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '10px',
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: '10px', color: '#3182ce', fontWeight: 'bold' }}>2</span>
                </div>
                <div>
                  <h4 style={{
                    fontFamily: '"Outfit", sans-serif',
                    fontSize: '10px',
                    fontWeight: 600,
                    margin: '0 0 3px 0'
                  }}>
                    Suivi en Temps Réel
                  </h4>
                  <p style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '8px',
                    margin: 0,
                    opacity: 0.9
                  }}>
                    Localisation, état, responsable : tout est visible instantanément
                  </p>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  background: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '10px',
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: '10px', color: '#3182ce', fontWeight: 'bold' }}>3</span>
                </div>
                <div>
                  <h4 style={{
                    fontFamily: '"Outfit", sans-serif',
                    fontSize: '10px',
                    fontWeight: 600,
                    margin: '0 0 3px 0'
                  }}>
                    Intelligence Prédictive
                  </h4>
                  <p style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '8px',
                    margin: 0,
                    opacity: 0.9
                  }}>
                    L'IA anticipe les besoins de maintenance et optimise l'utilisation
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '10px',
            borderRadius: '8px',
            textAlign: 'center',
            marginTop: '15px'
          }}>
            <div style={{ fontSize: '16px', marginBottom: '5px' }}>📱</div>
            <p style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '8px',
              margin: 0,
              opacity: 0.8
            }}>
              Interface principale - Dashboard intelligent
            </p>
          </div>
        </div>
      </Page>

      <Page background="#f7fafc" padding="30px">
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <h1 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '20px',
            fontWeight: 700,
            color: '#3182ce',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            Capacités Clés d'AssetiQ
          </h1>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
            <div style={{
              background: 'white',
              padding: '12px',
              borderRadius: '10px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              borderLeft: '4px solid #3182ce'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '16px', marginRight: '8px' }}>📊</span>
                <h3 style={{
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#3182ce',
                  margin: 0
                }}>
                  Tableaux de Bord Intelligents
                </h3>
              </div>
              <ul style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '8px',
                color: '#4a5568',
                margin: 0,
                paddingLeft: '12px',
                lineHeight: 1.3
              }}>
                <li>Vue d'ensemble instantanée de tous vos actifs</li>
                <li>Métriques d'utilisation et de performance</li>
                <li>Alertes proactives personnalisables</li>
              </ul>
            </div>
            
            <div style={{
              background: 'white',
              padding: '12px',
              borderRadius: '10px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              borderLeft: '4px solid #38a169'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '16px', marginRight: '8px' }}>🔄</span>
                <h3 style={{
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#38a169',
                  margin: 0
                }}>
                  Workflows de Réservation
                </h3>
              </div>
              <ul style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '8px',
                color: '#4a5568',
                margin: 0,
                paddingLeft: '12px',
                lineHeight: 1.3
              }}>
                <li>Système de booking sans conflits</li>
                <li>Approbations hiérarchiques automatisées</li>
                <li>Notifications multicanales (email, SMS, app)</li>
              </ul>
            </div>
            
            <div style={{
              background: 'white',
              padding: '12px',
              borderRadius: '10px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              borderLeft: '4px solid #f56500'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '16px', marginRight: '8px' }}>🛡️</span>
                <h3 style={{
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#f56500',
                  margin: 0
                }}>
                  Maintenance Prédictive
                </h3>
              </div>
              <ul style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '8px',
                color: '#4a5568',
                margin: 0,
                paddingLeft: '12px',
                lineHeight: 1.3
              }}>
                <li>Analyse des patterns d'utilisation</li>
                <li>Prédiction des pannes avant qu'elles arrivent</li>
                <li>Planification optimisée des interventions</li>
              </ul>
            </div>
            
            <div style={{
              background: 'white',
              padding: '12px',
              borderRadius: '10px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              borderLeft: '4px solid #805ad5'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '16px', marginRight: '8px' }}>📱</span>
                <h3 style={{
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#805ad5',
                  margin: 0
                }}>
                  Mobilité Complète
                </h3>
              </div>
              <ul style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '8px',
                color: '#4a5568',
                margin: 0,
                paddingLeft: '12px',
                lineHeight: 1.3
              }}>
                <li>Application mobile pour agents terrain</li>
                <li>Scan QR instantané pour check-in/out</li>
                <li>Mode hors-ligne pour zones sans réseau</li>
              </ul>
            </div>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #2d5a27 0%, #4a7c59 100%)',
            padding: '15px',
            borderRadius: '12px',
            color: 'white',
            marginTop: '15px'
          }}>
            <h3 style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              margin: '0 0 8px 0'
            }}>
              Impact Concret
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '8px',
                margin: 0,
                lineHeight: 1.3
              }}>
                <strong>Ministère de la Santé :</strong> 60% d'augmentation de disponibilité des ambulances
              </p>
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '8px',
                margin: 0,
                lineHeight: 1.3
              }}>
                <strong>Université Nationale :</strong> Économie de 2M€ en rachats évités
              </p>
            </div>
            
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '8px',
              borderRadius: '6px',
              textAlign: 'center',
              marginTop: '10px'
            }}>
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '9px',
                margin: 0,
                fontWeight: 600
              }}>
                Prêt pour une démo personnalisée ?
              </p>
            </div>
          </div>
        </div>
      </Page>

      <Page background="linear-gradient(135deg, #f56500 0%, #d69e2e 100%)" padding="30px">
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', color: 'white' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 15px auto',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}>
              <span style={{ fontSize: '30px', color: '#f56500' }}>📁</span>
            </div>
            
            <h1 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '22px',
              fontWeight: 700,
              margin: '0 0 5px 0'
            }}>
              DocuStruct
            </h1>
            <p style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '10px',
              margin: 0,
              opacity: 0.9
            }}>
              Dématérialisation Intelligente
            </p>
          </div>
          
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '15px',
            borderRadius: '10px',
            marginBottom: '15px',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              margin: '0 0 8px 0'
            }}>
              Du papier au numérique, en toute sécurité
            </h3>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <h3 style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              margin: '0 0 10px 0'
            }}>
              Le Problème Résolu
            </h3>
            <p style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '9px',
              lineHeight: 1.4,
              margin: 0
            }}>
              Éliminez les montagnes de papier, les recherches interminables et les risques de perte. DocuStruct digitalise et organise intelligemment tous vos documents.
            </p>
          </div>
          
          <div style={{ flex: 1 }}>
            <h3 style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              margin: '0 0 10px 0'
            }}>
              Comment ça Marche
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  background: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '10px',
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: '10px', color: '#f56500', fontWeight: 'bold' }}>1</span>
                </div>
                <div>
                  <h4 style={{
                    fontFamily: '"Outfit", sans-serif',
                    fontSize: '10px',
                    fontWeight: 600,
                    margin: '0 0 3px 0'
                  }}>
                    Capture Universelle
                  </h4>
                  <p style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '8px',
                    margin: 0,
                    opacity: 0.9
                  }}>
                    Scannez, importez ou créez directement vos documents numériques
                  </p>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  background: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '10px',
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: '10px', color: '#f56500', fontWeight: 'bold' }}>2</span>
                </div>
                <div>
                  <h4 style={{
                    fontFamily: '"Outfit", sans-serif',
                    fontSize: '10px',
                    fontWeight: 600,
                    margin: '0 0 3px 0'
                  }}>
                    Intelligence OCR
                  </h4>
                  <p style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '8px',
                    margin: 0,
                    opacity: 0.9
                  }}>
                    Extraction automatique du contenu, même des manuscrits
                  </p>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  background: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '10px',
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: '10px', color: '#f56500', fontWeight: 'bold' }}>3</span>
                </div>
                <div>
                  <h4 style={{
                    fontFamily: '"Outfit", sans-serif',
                    fontSize: '10px',
                    fontWeight: 600,
                    margin: '0 0 3px 0'
                  }}>
                    Organisation Automatique
                  </h4>
                  <p style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '8px',
                    margin: 0,
                    opacity: 0.9
                  }}>
                    Classification intelligente et workflows prédéfinis
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '10px',
            borderRadius: '8px',
            textAlign: 'center',
            marginTop: '15px'
          }}>
            <div style={{ fontSize: '16px', marginBottom: '5px' }}>🔍</div>
            <p style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '8px',
              margin: 0,
              opacity: 0.8
            }}>
              Recherche de documents - Interface intuitive
            </p>
          </div>
        </div>
      </Page>

      <Page background="#f7fafc" padding="30px">
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <h1 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '20px',
            fontWeight: 700,
            color: '#f56500',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            Capacités Clés de DocuStruct
          </h1>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
            <div style={{
              background: 'white',
              padding: '12px',
              borderRadius: '10px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              borderLeft: '4px solid #f56500'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '16px', marginRight: '8px' }}>🔍</span>
                <h3 style={{
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#f56500',
                  margin: 0
                }}>
                  Recherche Cognitive Avancée
                </h3>
              </div>
              <ul style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '8px',
                color: '#4a5568',
                margin: 0,
                paddingLeft: '12px',
                lineHeight: 1.3
              }}>
                <li>Trouvez par concept, pas juste par mots-clés</li>
                <li>Support multilingue complet</li>
                <li>Résultats instantanés avec aperçu</li>
              </ul>
            </div>
            
            <div style={{
              background: 'white',
              padding: '12px',
              borderRadius: '10px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              borderLeft: '4px solid #e53e3e'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '16px', marginRight: '8px' }}>🔐</span>
                <h3 style={{
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#e53e3e',
                  margin: 0
                }}>
                  Sécurité de Grade Militaire
                </h3>
              </div>
              <ul style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '8px',
                color: '#4a5568',
                margin: 0,
                paddingLeft: '12px',
                lineHeight: 1.3
              }}>
                <li>Chiffrement AES-256 de bout en bout</li>
                <li>Authentification multi-facteurs</li>
                <li>Coffre-fort numérique certifié</li>
              </ul>
            </div>
            
            <div style={{
              background: 'white',
              padding: '12px',
              borderRadius: '10px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              borderLeft: '4px solid #38a169'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '16px', marginRight: '8px' }}>⚡</span>
                <h3 style={{
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#38a169',
                  margin: 0
                }}>
                  Workflows Automatisés
                </h3>
              </div>
              <ul style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '8px',
                color: '#4a5568',
                margin: 0,
                paddingLeft: '12px',
                lineHeight: 1.3
              }}>
                <li>Circuits de validation personnalisables</li>
                <li>Signatures électroniques intégrées</li>
                <li>Rappels et escalades automatiques</li>
              </ul>
            </div>
            
            <div style={{
              background: 'white',
              padding: '12px',
              borderRadius: '10px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              borderLeft: '4px solid #805ad5'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginB: '6px' }}>
                <span style={{ fontSize: '16px', marginRight: '8px' }}>📈</span>
                <h3 style={{
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#805ad5',
                  margin: 0
                }}>
                  Analytics et Conformité
                </h3>
              </div>
              <ul style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '8px',
                color: '#4a5568',
                margin: 0,
                paddingLeft: '12px',
                lineHeight: 1.3
              }}>
                <li>Tableaux de bord d'activité</li>
                <li>Pistes d'audit complètes RGPD</li>
                <li>Rapports de conformité automatiques</li>
              </ul>
            </div>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #2d5a27 0%, #4a7c59 100%)',
            padding: '15px',
            borderRadius: '12px',
            color: 'white',
            marginTop: '15px'
          }}>
            <h3 style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              margin: '0 0 8px 0'
            }}>
              Transformations Réelles
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '8px',
                margin: 0,
                lineHeight: 1.3
              }}>
                <strong>Direction des Impôts :</strong> 10 millions de déclarations dématérialisées
              </p>
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '8px',
                margin: 0,
                lineHeight: 1.3
              }}>
                <strong>Services RH :</strong> Traitement 70% plus rapide des dossiers
              </p>
            </div>
            
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '8px',
              borderRadius: '6px',
              textAlign: 'center',
              marginTop: '10px'
            }}>
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '9px',
                margin: 0,
                fontWeight: 600
              }}>
                Commencez votre transformation
              </p>
            </div>
          </div>
        </div>
      </Page>

      <Page background="linear-gradient(135deg, #2d5a27 0%, #4a7c59 100%)" padding="30px">
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', color: 'white' }}>
          <h1 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '22px',
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            Pourquoi Cactuce ?
          </h1>
          
          <h2 style={{
            fontFamily: '"Outfit", sans-serif',
            fontSize: '14px',
            fontWeight: 600,
            marginBottom: '15px',
            textAlign: 'center'
          }}>
            Notre Expertise à Votre Service
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '12px',
              borderRadius: '10px',
              textAlign: 'center',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '20px', marginBottom: '5px' }}>🌍</div>
              <h3 style={{
                fontFamily: '"Outfit", sans-serif',
                fontSize: '10px',
                fontWeight: 600,
                margin: '0 0 3px 0'
              }}>
                Présence Africaine
              </h3>
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '8px',
                margin: 0,
                opacity: 0.9
              }}>
                8 pays - Une compréhension profonde des réalités locales
              </p>
            </div>
            
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '12px',
              borderRadius: '10px',
              textAlign: 'center',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '20px', marginBottom: '5px' }}>👥</div>
              <h3 style={{
                fontFamily: '"Outfit", sans-serif',
                fontSize: '10px',
                fontWeight: 600,
                margin: '0 0 3px 0'
              }}>
                Équipe d'Excellence
              </h3>
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '8px',
                margin: 0,
                opacity: 0.9
              }}>
                47 experts dont 42% de femmes - Diversité et expertise
              </p>
            </div>
            
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '12px',
              borderRadius: '10px',
              textAlign: 'center',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '20px', marginBottom: '5px' }}>✅</div>
              <h3 style={{
                fontFamily: '"Outfit", sans-serif',
                fontSize: '10px',
                fontWeight: 600,
                margin: '0 0 3px 0'
              }}>
                Track Record Prouvé
              </h3>
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '8px',
                margin: 0,
                opacity: 0.9
              }}>
                7 projets gouvernementaux - Des références solides
              </p>
            </div>
            
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '12px',
              borderRadius: '10px',
              textAlign: 'center',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '20px', marginBottom: '5px' }}>🎓</div>
              <h3 style={{
                fontFamily: '"Outfit", sans-serif',
                fontSize: '10px',
                fontWeight: 600,
                margin: '0 0 3px 0'
              }}>
                Engagement Formation
              </h3>
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '8px',
                margin: 0,
                opacity: 0.9
              }}>
                324 heures dispensées - Transfert de compétences garanti
              </p>
            </div>
          </div>
          
          <div style={{ flex: 1 }}>
            <h2 style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '12px',
              textAlign: 'center'
            }}>
              Notre Approche Unique
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '10px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <div style={{
                  width: '30px',
                  height: '30px',
                  background: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '10px',
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: '14px' }}>🤝</span>
                </div>
                <div>
                  <h4 style={{
                    fontFamily: '"Outfit", sans-serif',
                    fontSize: '10px',
                    fontWeight: 600,
                    margin: '0 0 2px 0'
                  }}>
                    Co-construction
                  </h4>
                  <p style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '8px',
                    margin: 0,
                    opacity: 0.9
                  }}>
                    Nous développons AVEC vous, pas POUR vous
                  </p>
                </div>
              </div>
              
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '10px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <div style={{
                  width: '30px',
                  height: '30px',
                  background: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '10px',
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: '14px' }}>🛡️</span>
                </div>
                <div>
                  <h4 style={{
                    fontFamily: '"Outfit", sans-serif',
                    fontSize: '10px',
                    fontWeight: 600,
                    margin: '0 0 2px 0'
                  }}>
                    Souveraineté Garantie
                  </h4>
                  <p style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '8px',
                    margin: 0,
                    opacity: 0.9
                  }}>
                    Vos données restent sous votre contrôle total
                  </p>
                </div>
              </div>
              
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '10px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <div style={{
                  width: '30px',
                  height: '30px',
                  background: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '10px',
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: '14px' }}>🔓</span>
                </div>
                <div>
                  <h4 style={{
                    fontFamily: '"Outfit", sans-serif',
                    fontSize: '10px',
                    fontWeight: 600,
                    margin: '0 0 2px 0'
                  }}>
                    Technologies Ouvertes
                  </h4>
                  <p style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '8px',
                    margin: 0,
                    opacity: 0.9
                  }}>
                    Pas de dépendance, évolutivité assurée
                  </p>
                </div>
              </div>
              
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '10px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <div style={{
                  width: '30px',
                  height: '30px',
                  background: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '10px',
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: '14px' }}>🏠</span>
                </div>
                <div>
                  <h4 style={{
                    fontFamily: '"Outfit", sans-serif',
                    fontSize: '10px',
                    fontWeight: 600,
                    margin: '0 0 2px 0'
                  }}>
                    Support Local
                  </h4>
                  <p style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '8px',
                    margin: 0,
                    opacity: 0.9
                  }}>
                    Équipes sur place, réactivité maximale
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Page>

      <Page background="#f7fafc" padding="30px">
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <h1 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '24px',
            fontWeight: 700,
            color: '#2d5a27',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            Passez à l'Action
          </h1>
          
          <h2 style={{
            fontFamily: '"Outfit", sans-serif',
            fontSize: '14px',
            fontWeight: 600,
            color: '#4a5568',
            textAlign: 'center',
            marginBottom: '15px'
          }}>
            Votre Transformation en 5 Étapes
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '15px' }}>
            {[
              { step: '1', title: 'Consultation Découverte (Gratuite)', desc: 'Analysons ensemble vos défis spécifiques', color: '#3182ce' },
              { step: '2', title: 'Démonstration Personnalisée', desc: 'Voyez les solutions adaptées à vos cas d\'usage', color: '#38a169' },
              { step: '3', title: 'Pilote sur Mesure', desc: 'Testez sur un département, sans engagement', color: '#f56500' },
              { step: '4', title: 'Déploiement Progressif', desc: 'Formation complète et accompagnement inclus', color: '#805ad5' },
              { step: '5', title: 'Succès Mesurable', desc: 'ROI démontré en 6 mois maximum', color: '#2d5a27' }
            ].map((item, index) => (
              <div key={index} style={{
                background: 'white',
                padding: '12px',
                borderRadius: '10px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                borderLeft: `4px solid ${item.color}`,
                display: 'flex',
                alignItems: 'center'
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  background: item.color,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px',
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: '10px', color: 'white', fontWeight: 'bold' }}>{item.step}</span>
                </div>
                <div>
                  <h4 style={{
                    fontFamily: '"Outfit", sans-serif',
                    fontSize: '10px',
                    fontWeight: 600,
                    color: item.color,
                    margin: '0 0 2px 0'
                  }}>
                    {item.title}
                  </h4>
                  <p style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '8px',
                    color: '#4a5568',
                    margin: 0,
                    lineHeight: 1.3
                  }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)',
            padding: '15px',
            borderRadius: '12px',
            color: 'white',
            textAlign: 'center',
            marginBottom: '15px'
          }}>
            <h3 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '14px',
              fontWeight: 700,
              margin: '0 0 8px 0'
            }}>
              Ne Perdez Plus de Temps
            </h3>
            <p style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '9px',
              margin: 0,
              lineHeight: 1.4
            }}>
              Chaque jour sans transformation digitale est une opportunité manquée d'améliorer le service public.
            </p>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #2d5a27 0%, #4a7c59 100%)',
            padding: '20px',
            borderRadius: '15px',
            color: 'white',
            textAlign: 'center',
            marginTop: 'auto'
          }}>
            <h3 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '16px',
              fontWeight: 700,
              margin: '0 0 12px 0'
            }}>
              Contactez-nous Aujourd'hui
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '12px', marginRight: '8px' }}>📧</span>
                <span style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '10px',
                  fontWeight: 600
                }}>
                  contact@cactuce.com
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '12px', marginRight: '8px' }}>🌐</span>
                <span style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '10px',
                  fontWeight: 600
                }}>
                  www.cactuce.com
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '12px', marginRight: '8px' }}>📱</span>
                <span style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '10px',
                  fontWeight: 600
                }}>
                  +XXX XX XX XX XX
                </span>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '20px', color: '#2d5a27' }}>🌵</span>
              </div>
              <div>
                <p style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '12px',
                  fontWeight: 700,
                  margin: 0
                }}>
                  Cactuce
                </p>
                <p style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '8px',
                  margin: 0,
                  opacity: 0.8,
                  fontStyle: 'italic'
                }}>
                  Ensemble, construisons l'administration publique de demain
                </p>
              </div>
            </div>
          </div>
        </div>
      </Page>
    </Document>
  );
};