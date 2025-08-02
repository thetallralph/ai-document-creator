import { Document, Page } from '../../components/document-components';
import { cactuceStyles } from './styles';

export const CactuceBooklet = () => {
  const styles = cactuceStyles;
  
  return (
    <Document title="Cactuce Solutions Booklet" type="booklet" paperSize="A5">
      {/* Page 1 - Cover */}
      <Page background={styles.colors.green}>
        <div style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
          padding: '30px 20px'
        }}>
          <div style={{
            width: 100,
            height: 35,
            backgroundColor: 'white',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            fontWeight: 'bold',
            color: styles.colors.green,
            letterSpacing: 0.5
          }}>
            CACTUCE
          </div>
          
          <div>
            <h1 style={{
              fontSize: 22,
              fontWeight: 'bold',
              margin: '0 0 15px 0',
              lineHeight: 1.3
            }}>
              Solutions Numériques pour la Transformation des Services Publics
            </h1>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 15,
              fontSize: 16,
              fontWeight: 500,
              margin: '20px 0'
            }}>
              <span>AssetiQ</span>
              <span style={{ opacity: 0.5 }}>•</span>
              <span>DocuStruct</span>
            </div>
          </div>
          
          <div style={{
            width: 120,
            height: 120,
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 50
          }}>
            🚀
          </div>
          
          <p style={{
            fontSize: 13,
            fontStyle: 'italic',
            opacity: 0.9,
            letterSpacing: 0.3
          }}>
            Smart Software for Institutional Transformation
          </p>
        </div>
      </Page>

      {/* Page 2 - L'urgence de la transformation */}
      <Page background="#ffffff" padding="20px">
        <h2 style={{
          fontSize: 20,
          margin: '0 0 15px 0',
          color: styles.colors.darkGray,
          textAlign: 'center'
        }}>
          Les Défis Critiques de Votre Institution
        </h2>
        
        <div style={{ marginBottom: 20 }}>
          <div style={{
            backgroundColor: styles.colors.lightBlue,
            borderRadius: 10,
            padding: 15,
            marginBottom: 15
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 24 }}>📊</span>
              <h3 style={{ margin: 0, fontSize: 15, color: styles.colors.blue }}>
                Gestion d'Actifs Chaotique
              </h3>
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 11, fontFamily: styles.fonts.primary, lineHeight: 1.5, color: styles.colors.textPrimary }}>
              <li>30% des équipements perdus ou mal suivis</li>
              <li>Maintenance réactive coûteuse</li>
              <li>Aucune visibilité sur l'utilisation réelle</li>
            </ul>
          </div>
          
          <div style={{
            backgroundColor: styles.colors.lightOrange,
            borderRadius: 10,
            padding: 15
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 24 }}>📄</span>
              <h3 style={{ margin: 0, fontSize: 15, color: styles.colors.orange }}>
                Documentation Archaïque
              </h3>
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 11, fontFamily: styles.fonts.primary, lineHeight: 1.5, color: styles.colors.textPrimary }}>
              <li>2 heures par jour perdues en recherche</li>
              <li>Archives physiques débordantes</li>
              <li>Processus d'approbation interminables</li>
            </ul>
          </div>
        </div>
        
        <div style={{
          backgroundColor: styles.colors.green,
          color: 'white',
          borderRadius: 10,
          padding: 15,
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: 16 }}>
            La Transformation est Possible
          </h3>
          <p style={{ margin: 0, fontSize: 12, lineHeight: 1.4 }}>
            Deux plateformes intelligentes conçues spécifiquement pour les réalités des institutions publiques africaines.
          </p>
          <p style={{ margin: '10px 0 0 0', fontSize: 13, fontWeight: 'bold' }}>
            Découvrez comment révolutionner vos opérations...
          </p>
        </div>
      </Page>

      {/* Page 3 - AssetiQ Vue d'ensemble */}
      <Page background="#ffffff" padding="20px">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 15,
          marginBottom: 20
        }}>
          <div style={{
            width: 50,
            height: 50,
            backgroundColor: styles.colors.blue,
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: 24
          }}>
            📦
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: 24, fontFamily: styles.fonts.heading, fontWeight: styles.fontWeights.bold, color: styles.colors.textPrimary }}>
              AssetiQ
            </h2>
            <p style={{ margin: 0, fontSize: 14, fontFamily: styles.fonts.primary, color: styles.colors.textPrimary }}>
              Gestion Intelligente des Actifs Publics
            </p>
          </div>
        </div>
        
        <div style={{
          backgroundColor: styles.colors.lightBlue,
          padding: 15,
          borderRadius: 8,
          marginBottom: 20,
          textAlign: 'center',
          fontSize: 16,
          fontFamily: styles.fonts.primary,
          fontWeight: styles.fontWeights.medium,
          color: styles.colors.textPrimary
        }}>
          Transformez chaque actif en ressource intelligente
        </div>
        
        <div style={{ marginBottom: 25 }}>
          <h3 style={{ fontSize: 16, marginBottom: 10, fontFamily: styles.fonts.primary, fontWeight: styles.fontWeights.semibold, color: styles.colors.textPrimary }}>
            Le Problème Résolu
          </h3>
          <p style={{ fontSize: 13, lineHeight: 1.6, margin: 0, fontFamily: styles.fonts.primary, color: styles.colors.textPrimary }}>
            Fini les équipements introuvables, les maintenances surprises, les achats en double. AssetiQ apporte ordre et efficacité à votre patrimoine.
          </p>
        </div>
        
        <div style={{ marginBottom: 15 }}>
          <h3 style={{ fontSize: 14, marginBottom: 12, color: '#333' }}>
            Comment ça Marche
          </h3>
          
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <div style={{
                minWidth: 20,
                height: 20,
                backgroundColor: styles.colors.blue,
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
                fontWeight: 'bold'
              }}>
                1
              </div>
              <div>
                <h4 style={{ margin: '0 0 3px 0', fontSize: 12, fontFamily: styles.fonts.primary, fontWeight: styles.fontWeights.bold, color: styles.colors.textPrimary }}>
                  Identification Unique
                </h4>
                <p style={{ margin: 0, fontSize: 10, fontFamily: styles.fonts.primary, color: styles.colors.textPrimary, lineHeight: 1.4 }}>
                  Chaque actif reçoit un QR code intelligent qui contient toute son histoire
                </p>
              </div>
            </div>
          </div>
          
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <div style={{
                minWidth: 20,
                height: 20,
                backgroundColor: styles.colors.blue,
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
                fontWeight: 'bold'
              }}>
                2
              </div>
              <div>
                <h4 style={{ margin: '0 0 3px 0', fontSize: 12, fontFamily: styles.fonts.primary, fontWeight: styles.fontWeights.bold, color: styles.colors.textPrimary }}>
                  Suivi en Temps Réel
                </h4>
                <p style={{ margin: 0, fontSize: 10, fontFamily: styles.fonts.primary, color: styles.colors.textPrimary, lineHeight: 1.4 }}>
                  Localisation, état, responsable : tout est visible instantanément
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <div style={{
                minWidth: 20,
                height: 20,
                backgroundColor: styles.colors.blue,
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
                fontWeight: 'bold'
              }}>
                3
              </div>
              <div>
                <h4 style={{ margin: '0 0 3px 0', fontSize: 12, fontFamily: styles.fonts.primary, fontWeight: styles.fontWeights.bold, color: styles.colors.textPrimary }}>
                  Intelligence Prédictive
                </h4>
                <p style={{ margin: 0, fontSize: 10, fontFamily: styles.fonts.primary, color: styles.colors.textPrimary, lineHeight: 1.4 }}>
                  L'IA anticipe les besoins de maintenance et optimise l'utilisation
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{
          backgroundColor: '#f5f5f5',
          borderRadius: 8,
          padding: 12,
          textAlign: 'center'
        }}>
          <span style={{ fontSize: 10, fontFamily: styles.fonts.primary, color: styles.colors.textPrimary }}>Interface principale AssetiQ</span>
          <div style={{
            marginTop: 8,
            height: 60,
            backgroundColor: '#e0e0e0',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 30,
            opacity: 0.5
          }}>
            📊
          </div>
        </div>
      </Page>

      {/* Page 4 - AssetiQ Fonctionnalités */}
      <Page background="#ffffff" padding="20px">
        <h2 style={{
          fontSize: 18,
          margin: '0 0 15px 0',
          fontFamily: styles.fonts.heading,
          fontWeight: styles.fontWeights.bold,
          color: styles.colors.textPrimary,
          textAlign: 'center'
        }}>
          Capacités Clés d'AssetiQ
        </h2>
        
        <div style={{ display: 'grid', gap: 10 }}>
          <div style={{
            backgroundColor: '#f8f9fa',
            borderRadius: 8,
            padding: 10,
            borderLeft: `3px solid ${styles.colors.blue}`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
              <span style={{ fontSize: 16 }}>📊</span>
              <h3 style={{ margin: 0, fontSize: 12, fontFamily: styles.fonts.primary, fontWeight: styles.fontWeights.semibold, color: styles.colors.textPrimary }}>
                Tableaux de Bord Intelligents
              </h3>
            </div>
            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 9, fontFamily: styles.fonts.primary, lineHeight: 1.4, color: styles.colors.textPrimary }}>
              <li>Vue d'ensemble instantanée de tous vos actifs</li>
              <li>Métriques d'utilisation et de performance</li>
              <li>Alertes proactives personnalisables</li>
            </ul>
          </div>
          
          <div style={{
            backgroundColor: '#f8f9fa',
            borderRadius: 8,
            padding: 10,
            borderLeft: `3px solid ${styles.colors.blue}`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
              <span style={{ fontSize: 16 }}>🔄</span>
              <h3 style={{ margin: 0, fontSize: 12, color: '#333' }}>
                Workflows de Réservation
              </h3>
            </div>
            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 9, fontFamily: styles.fonts.primary, lineHeight: 1.4, color: styles.colors.textPrimary }}>
              <li>Système de booking sans conflits</li>
              <li>Approbations hiérarchiques automatisées</li>
              <li>Notifications multicanales (email, SMS, app)</li>
            </ul>
          </div>
          
          <div style={{
            backgroundColor: '#f8f9fa',
            borderRadius: 8,
            padding: 10,
            borderLeft: `3px solid ${styles.colors.blue}`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
              <span style={{ fontSize: 16 }}>🛡️</span>
              <h3 style={{ margin: 0, fontSize: 12, color: '#333' }}>
                Maintenance Prédictive
              </h3>
            </div>
            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 9, fontFamily: styles.fonts.primary, lineHeight: 1.4, color: styles.colors.textPrimary }}>
              <li>Analyse des patterns d'utilisation</li>
              <li>Prédiction des pannes avant qu'elles arrivent</li>
              <li>Planification optimisée des interventions</li>
            </ul>
          </div>
          
          <div style={{
            backgroundColor: '#f8f9fa',
            borderRadius: 8,
            padding: 10,
            borderLeft: `3px solid ${styles.colors.blue}`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
              <span style={{ fontSize: 16 }}>📱</span>
              <h3 style={{ margin: 0, fontSize: 12, color: '#333' }}>
                Mobilité Complète
              </h3>
            </div>
            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 9, fontFamily: styles.fonts.primary, lineHeight: 1.4, color: styles.colors.textPrimary }}>
              <li>Application mobile pour agents terrain</li>
              <li>Scan QR instantané pour check-in/out</li>
              <li>Mode hors-ligne pour zones sans réseau</li>
            </ul>
          </div>
        </div>
        
        <div style={{
          marginTop: 12,
          backgroundColor: styles.colors.green,
          color: 'white',
          borderRadius: 8,
          padding: 12
        }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: 13, fontFamily: styles.fonts.primary, fontWeight: styles.fontWeights.bold, textAlign: 'center' }}>
            Impact Concret
          </h3>
          <div style={{ fontSize: 10, fontFamily: styles.fonts.primary, lineHeight: 1.5 }}>
            <p style={{ margin: '0 0 5px 0' }}>
              <strong>Ministère de la Santé :</strong> 60% d'augmentation de disponibilité des ambulances
            </p>
            <p style={{ margin: 0 }}>
              <strong>Université Nationale :</strong> Économie de 2M€ en rachats évités
            </p>
          </div>
        </div>
        
        <div style={{
          marginTop: 10,
          textAlign: 'center',
          backgroundColor: styles.colors.blue,
          color: 'white',
          padding: 10,
          borderRadius: 6,
          fontSize: 12,
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          Prêt pour une démo personnalisée ?
        </div>
      </Page>

      {/* Page 5 - DocuStruct Vue d'ensemble */}
      <Page background="#ffffff" padding="20px">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 15
        }}>
          <div style={{
            width: 40,
            height: 40,
            backgroundColor: styles.colors.orange,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: 20
          }}>
            📄
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: 20, color: styles.colors.orange }}>
              DocuStruct
            </h2>
            <p style={{ margin: 0, fontSize: 12, color: '#666' }}>
              Dématérialisation Intelligente
            </p>
          </div>
        </div>
        
        <div style={{
          backgroundColor: styles.colors.lightOrange,
          padding: 12,
          borderRadius: 8,
          marginBottom: 15,
          textAlign: 'center',
          fontSize: 14,
          fontWeight: 500,
          color: styles.colors.orange
        }}>
          Du papier au numérique, en toute sécurité
        </div>
        
        <div style={{ marginBottom: 15 }}>
          <h3 style={{ fontSize: 14, marginBottom: 8, color: '#333' }}>
            Le Problème Résolu
          </h3>
          <p style={{ fontSize: 11, lineHeight: 1.5, margin: 0, color: '#555' }}>
            Éliminez les montagnes de papier, les recherches interminables et les risques de perte. DocuStruct digitalise et organise intelligemment tous vos documents.
          </p>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, marginBottom: 15, color: '#333' }}>
            Comment ça Marche
          </h3>
          
          <div style={{ marginBottom: 15 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <div style={{
                minWidth: 24,
                height: 24,
                backgroundColor: styles.colors.orange,
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 'bold'
              }}>
                1
              </div>
              <div>
                <h4 style={{ margin: '0 0 5px 0', fontSize: 14, fontWeight: 'bold' }}>
                  Capture Universelle
                </h4>
                <p style={{ margin: 0, fontSize: 12, color: '#666', lineHeight: 1.4 }}>
                  Scannez, importez ou créez directement vos documents numériques
                </p>
              </div>
            </div>
          </div>
          
          <div style={{ marginBottom: 15 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <div style={{
                minWidth: 24,
                height: 24,
                backgroundColor: styles.colors.orange,
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 'bold'
              }}>
                2
              </div>
              <div>
                <h4 style={{ margin: '0 0 5px 0', fontSize: 14, fontWeight: 'bold' }}>
                  Intelligence OCR
                </h4>
                <p style={{ margin: 0, fontSize: 12, color: '#666', lineHeight: 1.4 }}>
                  Extraction automatique du contenu, même des manuscrits
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <div style={{
                minWidth: 24,
                height: 24,
                backgroundColor: styles.colors.orange,
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 'bold'
              }}>
                3
              </div>
              <div>
                <h4 style={{ margin: '0 0 5px 0', fontSize: 14, fontWeight: 'bold' }}>
                  Organisation Automatique
                </h4>
                <p style={{ margin: 0, fontSize: 12, color: '#666', lineHeight: 1.4 }}>
                  Classification intelligente et workflows prédéfinis
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{
          backgroundColor: '#f5f5f5',
          borderRadius: 8,
          padding: 15,
          textAlign: 'center'
        }}>
          <span style={{ fontSize: 12, fontFamily: styles.fonts.primary, color: styles.colors.textPrimary }}>Recherche de documents DocuStruct</span>
          <div style={{
            marginTop: 10,
            height: 80,
            backgroundColor: '#e0e0e0',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 40,
            opacity: 0.5
          }}>
            🔍
          </div>
        </div>
      </Page>

      {/* Page 6 - DocuStruct Fonctionnalités */}
      <Page background="#ffffff" padding="20px">
        <h2 style={{
          fontSize: 18,
          margin: '0 0 15px 0',
          color: styles.colors.orange,
          textAlign: 'center'
        }}>
          Capacités Clés de DocuStruct
        </h2>
        
        <div style={{ display: 'grid', gap: 15 }}>
          <div style={{
            backgroundColor: '#f8f9fa',
            borderRadius: 10,
            padding: 15,
            borderLeft: `4px solid ${styles.colors.orange}`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 20 }}>🔍</span>
              <h3 style={{ margin: 0, fontSize: 15, color: '#333' }}>
                Recherche Cognitive Avancée
              </h3>
            </div>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 11, lineHeight: 1.5, color: '#666' }}>
              <li>Trouvez par concept, pas juste par mots-clés</li>
              <li>Support multilingue complet</li>
              <li>Résultats instantanés avec aperçu</li>
            </ul>
          </div>
          
          <div style={{
            backgroundColor: '#f8f9fa',
            borderRadius: 10,
            padding: 15,
            borderLeft: `4px solid ${styles.colors.orange}`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 20 }}>🔐</span>
              <h3 style={{ margin: 0, fontSize: 15, color: '#333' }}>
                Sécurité de Grade Militaire
              </h3>
            </div>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 11, lineHeight: 1.5, color: '#666' }}>
              <li>Chiffrement AES-256 de bout en bout</li>
              <li>Authentification multi-facteurs</li>
              <li>Coffre-fort numérique certifié</li>
            </ul>
          </div>
          
          <div style={{
            backgroundColor: '#f8f9fa',
            borderRadius: 10,
            padding: 15,
            borderLeft: `4px solid ${styles.colors.orange}`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 20 }}>⚡</span>
              <h3 style={{ margin: 0, fontSize: 15, color: '#333' }}>
                Workflows Automatisés
              </h3>
            </div>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 11, lineHeight: 1.5, color: '#666' }}>
              <li>Circuits de validation personnalisables</li>
              <li>Signatures électroniques intégrées</li>
              <li>Rappels et escalades automatiques</li>
            </ul>
          </div>
          
          <div style={{
            backgroundColor: '#f8f9fa',
            borderRadius: 10,
            padding: 15,
            borderLeft: `4px solid ${styles.colors.orange}`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 20 }}>📈</span>
              <h3 style={{ margin: 0, fontSize: 15, color: '#333' }}>
                Analytics et Conformité
              </h3>
            </div>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 11, lineHeight: 1.5, color: '#666' }}>
              <li>Tableaux de bord d'activité</li>
              <li>Pistes d'audit complètes RGPD</li>
              <li>Rapports de conformité automatiques</li>
            </ul>
          </div>
        </div>
        
        <div style={{
          marginTop: 20,
          backgroundColor: styles.colors.green,
          color: 'white',
          borderRadius: 10,
          padding: 15
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: 16, textAlign: 'center' }}>
            Transformations Réelles
          </h3>
          <div style={{ fontSize: 12, lineHeight: 1.6 }}>
            <p style={{ margin: '0 0 8px 0' }}>
              <strong>Direction des Impôts :</strong> 10 millions de déclarations dématérialisées
            </p>
            <p style={{ margin: 0 }}>
              <strong>Services RH :</strong> Traitement 70% plus rapide des dossiers
            </p>
          </div>
        </div>
        
        <div style={{
          marginTop: 15,
          textAlign: 'center',
          backgroundColor: styles.colors.orange,
          color: 'white',
          padding: 12,
          borderRadius: 8,
          fontSize: 14,
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          Commencez votre transformation
        </div>
      </Page>

      {/* Page 7 - Pourquoi Cactuce */}
      <Page background="#ffffff" padding="20px">
        <h2 style={{
          fontSize: 20,
          margin: '0 0 15px 0',
          color: styles.colors.darkGray,
          textAlign: 'center'
        }}>
          Notre Expertise à Votre Service
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 10,
          marginBottom: 15
        }}>
          <div style={{
            backgroundColor: styles.colors.lightGreen,
            borderRadius: 8,
            padding: 12,
            textAlign: 'center'
          }}>
            <span style={{ fontSize: 24, display: 'block', marginBottom: 3 }}>🌍</span>
            <h3 style={{ margin: '0 0 3px 0', fontSize: 13, fontFamily: styles.fonts.primary, fontWeight: styles.fontWeights.semibold, color: styles.colors.textPrimary }}>
              Présence Africaine
            </h3>
            <p style={{ margin: 0, fontSize: 16, fontFamily: styles.fonts.primary, fontWeight: styles.fontWeights.bold, color: styles.colors.textPrimary }}>8 pays</p>
            <p style={{ margin: 0, fontSize: 9, fontFamily: styles.fonts.primary, color: styles.colors.textPrimary }}>
              Une compréhension profonde des réalités locales
            </p>
          </div>
          
          <div style={{
            backgroundColor: styles.colors.lightGreen,
            borderRadius: 8,
            padding: 12,
            textAlign: 'center'
          }}>
            <span style={{ fontSize: 24, display: 'block', marginBottom: 3 }}>👥</span>
            <h3 style={{ margin: '0 0 3px 0', fontSize: 13, fontFamily: styles.fonts.primary, fontWeight: styles.fontWeights.semibold, color: styles.colors.textPrimary }}>
              Équipe d'Excellence
            </h3>
            <p style={{ margin: 0, fontSize: 16, fontFamily: styles.fonts.primary, fontWeight: styles.fontWeights.bold, color: styles.colors.textPrimary }}>47 experts</p>
            <p style={{ margin: 0, fontSize: 9, fontFamily: styles.fonts.primary, color: styles.colors.textPrimary }}>
              dont 42% de femmes - Diversité et expertise
            </p>
          </div>
          
          <div style={{
            backgroundColor: styles.colors.lightGreen,
            borderRadius: 8,
            padding: 12,
            textAlign: 'center'
          }}>
            <span style={{ fontSize: 24, display: 'block', marginBottom: 3 }}>🏆</span>
            <h3 style={{ margin: '0 0 3px 0', fontSize: 13, fontFamily: styles.fonts.primary, fontWeight: styles.fontWeights.semibold, color: styles.colors.textPrimary }}>
              Track Record Prouvé
            </h3>
            <p style={{ margin: 0, fontSize: 16, fontFamily: styles.fonts.primary, fontWeight: styles.fontWeights.bold, color: styles.colors.textPrimary }}>7 projets</p>
            <p style={{ margin: 0, fontSize: 9, fontFamily: styles.fonts.primary, color: styles.colors.textPrimary }}>
              gouvernementaux - Des références solides
            </p>
          </div>
          
          <div style={{
            backgroundColor: styles.colors.lightGreen,
            borderRadius: 8,
            padding: 12,
            textAlign: 'center'
          }}>
            <span style={{ fontSize: 24, display: 'block', marginBottom: 3 }}>🎓</span>
            <h3 style={{ margin: '0 0 3px 0', fontSize: 13, fontFamily: styles.fonts.primary, fontWeight: styles.fontWeights.semibold, color: styles.colors.textPrimary }}>
              Engagement Formation
            </h3>
            <p style={{ margin: 0, fontSize: 16, fontFamily: styles.fonts.primary, fontWeight: styles.fontWeights.bold, color: styles.colors.textPrimary }}>324 heures</p>
            <p style={{ margin: 0, fontSize: 9, fontFamily: styles.fonts.primary, color: styles.colors.textPrimary }}>
              dispensées - Transfert de compétences garanti
            </p>
          </div>
        </div>
        
        <div style={{
          backgroundColor: styles.colors.darkGray,
          color: 'white',
          borderRadius: 10,
          padding: 15
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: 15, fontFamily: styles.fonts.primary, fontWeight: styles.fontWeights.bold, textAlign: 'center' }}>
            Notre Approche Unique
          </h3>
          
          <div style={{ display: 'grid', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <span style={{ fontSize: 14 }}>🤝</span>
              <div>
                <h4 style={{ margin: '0 0 2px 0', fontSize: 12 }}>Co-construction</h4>
                <p style={{ margin: 0, fontSize: 10, opacity: 0.9 }}>
                  Nous développons AVEC vous, pas POUR vous
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <span style={{ fontSize: 14 }}>🔒</span>
              <div>
                <h4 style={{ margin: '0 0 2px 0', fontSize: 12 }}>Souveraineté Garantie</h4>
                <p style={{ margin: 0, fontSize: 10, opacity: 0.9 }}>
                  Vos données restent sous votre contrôle total
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <span style={{ fontSize: 14 }}>⚙️</span>
              <div>
                <h4 style={{ margin: '0 0 2px 0', fontSize: 12 }}>Technologies Ouvertes</h4>
                <p style={{ margin: 0, fontSize: 10, opacity: 0.9 }}>
                  Pas de dépendance, évolutivité assurée
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <span style={{ fontSize: 14 }}>📍</span>
              <div>
                <h4 style={{ margin: '0 0 2px 0', fontSize: 12 }}>Support Local</h4>
                <p style={{ margin: 0, fontSize: 10, opacity: 0.9 }}>
                  Équipes sur place, réactivité maximale
                </p>
              </div>
            </div>
          </div>
        </div>
      </Page>

      {/* Page 8 - Call to Action */}
      <Page background={styles.colors.green}>
        <div style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          color: 'white',
          padding: '20px'
        }}>
          <h2 style={{
            fontSize: 18,
            fontFamily: styles.fonts.heading,
            fontWeight: styles.fontWeights.bold,
            margin: '0 0 15px 0',
            textAlign: 'center'
          }}>
            Votre Transformation en 5 Étapes
          </h2>
          
          <div style={{ flexGrow: 1 }}>
            {[
              { num: '1', title: 'Consultation Découverte (Gratuite)', desc: 'Analysons ensemble vos défis spécifiques' },
              { num: '2', title: 'Démonstration Personnalisée', desc: 'Voyez les solutions adaptées à vos cas d\'usage' },
              { num: '3', title: 'Pilote sur Mesure', desc: 'Testez sur un département, sans engagement' },
              { num: '4', title: 'Déploiement Progressif', desc: 'Formation complète et accompagnement inclus' },
              { num: '5', title: 'Succès Mesurable', desc: 'ROI démontré en 6 mois maximum' }
            ].map((step, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: 10,
                opacity: 0.9 + (index * 0.02)
              }}>
                <div style={{
                  minWidth: 24,
                  height: 24,
                  backgroundColor: 'white',
                  color: styles.colors.green,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 'bold',
                  marginRight: 10
                }}>
                  {step.num}
                </div>
                <div>
                  <h4 style={{ margin: '0 0 2px 0', fontSize: 12, fontFamily: styles.fonts.primary, fontWeight: styles.fontWeights.semibold }}>{step.title}</h4>
                  <p style={{ margin: 0, fontSize: 10, fontFamily: styles.fonts.primary, opacity: 0.8 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div style={{
            backgroundColor: 'white',
            color: styles.colors.darkGray,
            borderRadius: 10,
            padding: 15,
            marginTop: 10,
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 5px 0', fontSize: 14, fontFamily: styles.fonts.primary, fontWeight: styles.fontWeights.bold, color: styles.colors.textPrimary }}>
              Ne Perdez Plus de Temps
            </h3>
            <p style={{ margin: '0 0 10px 0', fontSize: 10, fontFamily: styles.fonts.primary, color: styles.colors.textPrimary }}>
              Chaque jour sans transformation digitale est une opportunité manquée d'améliorer le service public.
            </p>
            
            <div style={{
              backgroundColor: styles.colors.lightGreen,
              borderRadius: 6,
              padding: 12,
              marginTop: 8
            }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: 13, fontFamily: styles.fonts.primary, fontWeight: styles.fontWeights.bold, color: styles.colors.textPrimary }}>
                Contactez-nous Aujourd'hui
              </h4>
              <div style={{ fontSize: 11, fontFamily: styles.fonts.primary, lineHeight: 1.6 }}>
                <p style={{ margin: '3px 0', color: styles.colors.textPrimary }}>📧 contact@cactuce.com</p>
                <p style={{ margin: '3px 0', color: styles.colors.textPrimary }}>🌐 www.cactuce.com</p>
                <p style={{ margin: '3px 0', color: styles.colors.textPrimary }}>📱 +XXX XX XX XX XX</p>
              </div>
            </div>
            
            <div style={{
              marginTop: 12,
              fontSize: 16,
              fontFamily: styles.fonts.mono,
              fontWeight: styles.fontWeights.bold,
              color: styles.colors.green,
              letterSpacing: 0.5
            }}>
              CACTUCE
            </div>
            
            <p style={{
              margin: '8px 0 0 0',
              fontSize: 10,
              fontFamily: styles.fonts.primary,
              fontStyle: 'italic',
              color: styles.colors.textPrimary
            }}>
              Ensemble, construisons l'administration publique de demain
            </p>
          </div>
        </div>
      </Page>
    </Document>
  );
};