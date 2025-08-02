import { Document, Page } from '../../components/document-components';

export const GreenRooftopBusinessPlan = () => {
  return (
    <Document title="Plan d'Affaires - The Green Rooftop Parc" type="presentation" paperSize="PRESENTATION_16_9">
      {/* Slide 1: Titre */}
      <Page background="linear-gradient(135deg, #134e5e 0%, #71b280 100%)">
        <div style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.3
          }} />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h1 style={{
              fontSize: 72,
              fontWeight: 'bold',
              margin: '0 0 30px 0',
              textShadow: '3px 3px 6px rgba(0,0,0,0.5)',
              letterSpacing: '2px'
            }}>
              The Green Rooftop Parc
            </h1>
            <p style={{
              fontSize: 36,
              margin: '0 0 50px 0',
              opacity: 0.95,
              fontStyle: 'italic'
            }}>
              Un souffle vert au cœur de la ville
            </p>
            <p style={{
              fontSize: 24,
              opacity: 0.9
            }}>
              Premier parc de poche public-privé du Bénin
            </p>
          </div>
        </div>
      </Page>

      {/* Slide 2: Vision & Concept */}
      <Page background="#ffffff" padding="80px">
        <h2 style={{
          fontSize: 48,
          color: '#134e5e',
          marginBottom: 50,
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          Notre Vision
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 60,
          alignItems: 'center'
        }}>
          <div>
            <div style={{ marginBottom: 40 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                <span style={{ fontSize: 36, marginRight: 20 }}>🌿</span>
                <h3 style={{ fontSize: 28, margin: 0, color: '#2c3e50' }}>Une oasis urbaine</h3>
              </div>
              <p style={{ fontSize: 20, lineHeight: 1.6, color: '#555' }}>
                225 m² de nature en plein cœur de Cotonou, conçu pour la détente, la culture et le bien-être
              </p>
            </div>
            
            <div style={{ marginBottom: 40 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                <span style={{ fontSize: 36, marginRight: 20 }}>♻️</span>
                <h3 style={{ fontSize: 28, margin: 0, color: '#2c3e50' }}>Écologique</h3>
              </div>
              <p style={{ fontSize: 20, lineHeight: 1.6, color: '#555' }}>
                Architecture bio-climatique avec panneaux solaires et récupération d'eau
              </p>
            </div>
            
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                <span style={{ fontSize: 36, marginRight: 20 }}>💼</span>
                <h3 style={{ fontSize: 28, margin: 0, color: '#2c3e50' }}>Rentable</h3>
              </div>
              <p style={{ fontSize: 20, lineHeight: 1.6, color: '#555' }}>
                Modèle économique diversifié et durable
              </p>
            </div>
          </div>
          
          <div style={{
            height: 400,
            backgroundImage: 'url(https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 20,
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }} />
        </div>
      </Page>

      {/* Slide 3: Chiffres Clés */}
      <Page background="linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" padding="80px">
        <h2 style={{
          fontSize: 48,
          color: '#134e5e',
          marginBottom: 70,
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          Chiffres Clés
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 40,
          marginBottom: 60
        }}>
          <div style={{
            background: 'white',
            padding: 40,
            borderRadius: 20,
            textAlign: 'center',
            boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              fontSize: 56,
              fontWeight: 'bold',
              color: '#e74c3c',
              marginBottom: 15
            }}>
              57 M FCFA
            </div>
            <p style={{
              fontSize: 22,
              color: '#555',
              margin: 0
            }}>
              Investissement initial
            </p>
          </div>
          
          <div style={{
            background: 'white',
            padding: 40,
            borderRadius: 20,
            textAlign: 'center',
            boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              fontSize: 56,
              fontWeight: 'bold',
              color: '#3498db',
              marginBottom: 15
            }}>
              92 M FCFA
            </div>
            <p style={{
              fontSize: 22,
              color: '#555',
              margin: 0
            }}>
              Chiffre d'affaires visé/an
            </p>
          </div>
          
          <div style={{
            background: 'white',
            padding: 40,
            borderRadius: 20,
            textAlign: 'center',
            boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              fontSize: 56,
              fontWeight: 'bold',
              color: '#2ecc71',
              marginBottom: 15
            }}>
              {'< 9 mois'}
            </div>
            <p style={{
              fontSize: 22,
              color: '#555',
              margin: 0
            }}>
              Retour sur investissement
            </p>
          </div>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 40
        }}>
          <div style={{
            background: 'white',
            padding: 40,
            borderRadius: 20,
            textAlign: 'center',
            boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              fontSize: 56,
              fontWeight: 'bold',
              color: '#9b59b6',
              marginBottom: 15
            }}>
              50 pers.
            </div>
            <p style={{
              fontSize: 22,
              color: '#555',
              margin: 0
            }}>
              Capacité maximale
            </p>
          </div>
          
          <div style={{
            background: 'white',
            padding: 40,
            borderRadius: 20,
            textAlign: 'center',
            boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              fontSize: 56,
              fontWeight: 'bold',
              color: '#f39c12',
              marginBottom: 15
            }}>
              7 emplois
            </div>
            <p style={{
              fontSize: 22,
              color: '#555',
              margin: 0
            }}>
              Créations directes
            </p>
          </div>
        </div>
      </Page>

      {/* Slide 4: Localisation & Marché */}
      <Page background="#ffffff" padding="80px">
        <h2 style={{
          fontSize: 48,
          color: '#134e5e',
          marginBottom: 50,
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          Emplacement Stratégique
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 60,
          alignItems: 'center'
        }}>
          <div style={{
            height: 450,
            backgroundImage: 'url(https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 20,
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              bottom: 30,
              left: 30,
              right: 30,
              background: 'rgba(255,255,255,0.95)',
              padding: 20,
              borderRadius: 15,
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: 24, margin: 0, color: '#134e5e' }}>Quartier La Haie Vive</h3>
              <p style={{ fontSize: 18, margin: '10px 0 0 0', color: '#666' }}>Cœur dynamique de Cotonou</p>
            </div>
          </div>
          
          <div>
            <div style={{ marginBottom: 35 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                <span style={{ fontSize: 32, marginRight: 15 }}>📍</span>
                <h3 style={{ fontSize: 26, margin: 0, color: '#2c3e50' }}>Zone premium</h3>
              </div>
              <p style={{ fontSize: 20, lineHeight: 1.6, color: '#555' }}>
                Quartier résidentiel aisé avec ambassades, ONG et entreprises internationales
              </p>
            </div>
            
            <div style={{ marginBottom: 35 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                <span style={{ fontSize: 32, marginRight: 15 }}>🎓</span>
                <h3 style={{ fontSize: 26, margin: 0, color: '#2c3e50' }}>2 000 élèves</h3>
              </div>
              <p style={{ fontSize: 20, lineHeight: 1.6, color: '#555' }}>
                CEG Océan et École Montaigne à proximité immédiate
              </p>
            </div>
            
            <div style={{ marginBottom: 35 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                <span style={{ fontSize: 32, marginRight: 15 }}>👥</span>
                <h3 style={{ fontSize: 26, margin: 0, color: '#2c3e50' }}>270 000 habitants</h3>
              </div>
              <p style={{ fontSize: 20, lineHeight: 1.6, color: '#555' }}>
                Dans un rayon de 3 km autour du parc
              </p>
            </div>
            
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                <span style={{ fontSize: 32, marginRight: 15 }}>✈️</span>
                <h3 style={{ fontSize: 26, margin: 0, color: '#2c3e50' }}>1 km de l'aéroport</h3>
              </div>
              <p style={{ fontSize: 20, lineHeight: 1.6, color: '#555' }}>
                Accès facile pour visiteurs internationaux
              </p>
            </div>
          </div>
        </div>
      </Page>

      {/* Slide 5: Services & Offres */}
      <Page background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" padding="80px">
        <h2 style={{
          fontSize: 48,
          color: 'white',
          marginBottom: 60,
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          Nos Services
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 40
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            padding: 35,
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: 48, marginRight: 25 }}>🎟️</span>
            <div>
              <h3 style={{ fontSize: 24, margin: '0 0 10px 0', color: '#2c3e50' }}>Billetterie</h3>
              <p style={{ fontSize: 18, margin: 0, color: '#666' }}>
                2 000 FCFA/jour • Abonnements mensuels disponibles
              </p>
            </div>
          </div>
          
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            padding: 35,
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: 48, marginRight: 25 }}>🥗</span>
            <div>
              <h3 style={{ fontSize: 24, margin: '0 0 10px 0', color: '#2c3e50' }}>Kiosque Healthy</h3>
              <p style={{ fontSize: 18, margin: 0, color: '#666' }}>
                Cuisine fraîche et locale • 3 000-5 000 FCFA
              </p>
            </div>
          </div>
          
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            padding: 35,
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: 48, marginRight: 25 }}>🎨</span>
            <div>
              <h3 style={{ fontSize: 24, margin: '0 0 10px 0', color: '#2c3e50' }}>Ateliers</h3>
              <p style={{ fontSize: 18, margin: 0, color: '#666' }}>
                Yoga, DIY, jardinage • 15 000-25 000 FCFA
              </p>
            </div>
          </div>
          
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            padding: 35,
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: 48, marginRight: 25 }}>🎭</span>
            <div>
              <h3 style={{ fontSize: 24, margin: '0 0 10px 0', color: '#2c3e50' }}>Événements</h3>
              <p style={{ fontSize: 18, margin: 0, color: '#666' }}>
                Concerts, expositions, marchés créatifs
              </p>
            </div>
          </div>
          
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            padding: 35,
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: 48, marginRight: 25 }}>🏢</span>
            <div>
              <h3 style={{ fontSize: 24, margin: '0 0 10px 0', color: '#2c3e50' }}>Privatisation</h3>
              <p style={{ fontSize: 18, margin: 0, color: '#666' }}>
                Team building, événements corporate
              </p>
            </div>
          </div>
          
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            padding: 35,
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: 48, marginRight: 25 }}>📶</span>
            <div>
              <h3 style={{ fontSize: 24, margin: '0 0 10px 0', color: '#2c3e50' }}>Wi-Fi Fibre</h3>
              <p style={{ fontSize: 18, margin: 0, color: '#666' }}>
                Espace coworking plein air
              </p>
            </div>
          </div>
        </div>
      </Page>

      {/* Slide 6: Impact Environnemental */}
      <Page background="#ffffff" padding="80px">
        <h2 style={{
          fontSize: 48,
          color: '#134e5e',
          marginBottom: 60,
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          Impact Environnemental
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 60,
          alignItems: 'center'
        }}>
          <div>
            <div style={{
              background: '#f0f9ff',
              padding: 35,
              borderRadius: 20,
              marginBottom: 30,
              borderLeft: '5px solid #3498db'
            }}>
              <h3 style={{ fontSize: 26, margin: '0 0 15px 0', color: '#2c3e50' }}>
                🌡️ Réduction de température
              </h3>
              <p style={{ fontSize: 20, margin: 0, color: '#555', lineHeight: 1.6 }}>
                -2°C grâce à la végétalisation et l'ombrage
              </p>
            </div>
            
            <div style={{
              background: '#f0fdf4',
              padding: 35,
              borderRadius: 20,
              marginBottom: 30,
              borderLeft: '5px solid #2ecc71'
            }}>
              <h3 style={{ fontSize: 26, margin: '0 0 15px 0', color: '#2c3e50' }}>
                🌳 Captation CO₂
              </h3>
              <p style={{ fontSize: 20, margin: 0, color: '#555', lineHeight: 1.6 }}>
                312 kg de CO₂ captés par an
              </p>
            </div>
            
            <div style={{
              background: '#fef3c7',
              padding: 35,
              borderRadius: 20,
              borderLeft: '5px solid #f39c12'
            }}>
              <h3 style={{ fontSize: 26, margin: '0 0 15px 0', color: '#2c3e50' }}>
                ☀️ Énergie solaire
              </h3>
              <p style={{ fontSize: 20, margin: 0, color: '#555', lineHeight: 1.6 }}>
                60% d'autonomie énergétique
              </p>
            </div>
          </div>
          
          <div style={{
            height: 500,
            backgroundImage: 'url(https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 20,
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }} />
        </div>
      </Page>

      {/* Slide 7: Modèle Financier */}
      <Page background="linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" padding="80px">
        <h2 style={{
          fontSize: 48,
          color: '#134e5e',
          marginBottom: 60,
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          Modèle Financier
        </h2>
        
        <div style={{
          background: 'white',
          padding: 50,
          borderRadius: 20,
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          marginBottom: 40
        }}>
          <h3 style={{ fontSize: 32, marginBottom: 30, color: '#2c3e50', textAlign: 'center' }}>
            Sources de Revenus
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30 }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '20px 0',
              borderBottom: '2px solid #ecf0f1'
            }}>
              <span style={{ fontSize: 22, color: '#555' }}>🎟️ Billetterie</span>
              <span style={{ fontSize: 22, fontWeight: 'bold', color: '#e74c3c' }}>35%</span>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '20px 0',
              borderBottom: '2px solid #ecf0f1'
            }}>
              <span style={{ fontSize: 22, color: '#555' }}>🥗 Kiosque F&B</span>
              <span style={{ fontSize: 22, fontWeight: 'bold', color: '#3498db' }}>15%</span>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '20px 0',
              borderBottom: '2px solid #ecf0f1'
            }}>
              <span style={{ fontSize: 22, color: '#555' }}>🎨 Ateliers</span>
              <span style={{ fontSize: 22, fontWeight: 'bold', color: '#9b59b6' }}>25%</span>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '20px 0',
              borderBottom: '2px solid #ecf0f1'
            }}>
              <span style={{ fontSize: 22, color: '#555' }}>🤝 Sponsoring</span>
              <span style={{ fontSize: 22, fontWeight: 'bold', color: '#f39c12' }}>25%</span>
            </div>
          </div>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 30
        }}>
          <div style={{
            background: 'white',
            padding: 30,
            borderRadius: 15,
            textAlign: 'center',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
          }}>
            <h4 style={{ fontSize: 20, marginBottom: 15, color: '#666' }}>Marge opérationnelle</h4>
            <p style={{ fontSize: 36, fontWeight: 'bold', color: '#2ecc71', margin: 0 }}>72%</p>
          </div>
          
          <div style={{
            background: 'white',
            padding: 30,
            borderRadius: 15,
            textAlign: 'center',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
          }}>
            <h4 style={{ fontSize: 20, marginBottom: 15, color: '#666' }}>ROI</h4>
            <p style={{ fontSize: 36, fontWeight: 'bold', color: '#e74c3c', margin: 0 }}>132%</p>
          </div>
          
          <div style={{
            background: 'white',
            padding: 30,
            borderRadius: 15,
            textAlign: 'center',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
          }}>
            <h4 style={{ fontSize: 20, marginBottom: 15, color: '#666' }}>Break-even</h4>
            <p style={{ fontSize: 36, fontWeight: 'bold', color: '#3498db', margin: 0 }}>24 mois</p>
          </div>
        </div>
      </Page>

      {/* Slide 8: Offre Investisseurs */}
      <Page background="#ffffff" padding="80px">
        <h2 style={{
          fontSize: 48,
          color: '#134e5e',
          marginBottom: 60,
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          Opportunité d'Investissement
        </h2>
        
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: 50,
          borderRadius: 20,
          color: 'white',
          marginBottom: 50,
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}>
          <h3 style={{ fontSize: 36, marginBottom: 30, textAlign: 'center' }}>
            Levée de fonds : 30 M FCFA
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 40
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 48, fontWeight: 'bold', marginBottom: 10 }}>10%</div>
              <p style={{ fontSize: 20, opacity: 0.9 }}>Rendement annuel garanti</p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 48, fontWeight: 'bold', marginBottom: 10 }}>6 ans</div>
              <p style={{ fontSize: 20, opacity: 0.9 }}>Durée du placement</p>
            </div>
          </div>
        </div>
        
        <div style={{ marginBottom: 40 }}>
          <h3 style={{ fontSize: 32, marginBottom: 30, color: '#2c3e50', textAlign: 'center' }}>
            Avantages Investisseurs
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 30
          }}>
            <div style={{
              background: '#f8f9fa',
              padding: 30,
              borderRadius: 15,
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: 36, marginRight: 20 }}>💰</span>
              <div>
                <h4 style={{ fontSize: 22, margin: '0 0 10px 0', color: '#2c3e50' }}>Dividendes annuels</h4>
                <p style={{ fontSize: 18, margin: 0, color: '#666' }}>10% de votre investissement chaque année</p>
              </div>
            </div>
            
            <div style={{
              background: '#f8f9fa',
              padding: 30,
              borderRadius: 15,
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: 36, marginRight: 20 }}>🛡️</span>
              <div>
                <h4 style={{ fontSize: 22, margin: '0 0 10px 0', color: '#2c3e50' }}>Capital garanti</h4>
                <p style={{ fontSize: 18, margin: 0, color: '#666' }}>100% remboursé en fin de bail</p>
              </div>
            </div>
            
            <div style={{
              background: '#f8f9fa',
              padding: 30,
              borderRadius: 15,
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: 36, marginRight: 20 }}>🎖️</span>
              <div>
                <h4 style={{ fontSize: 22, margin: '0 0 10px 0', color: '#2c3e50' }}>Nom gravé</h4>
                <p style={{ fontSize: 18, margin: 0, color: '#666' }}>Sur le mur des mécènes du parc</p>
              </div>
            </div>
            
            <div style={{
              background: '#f8f9fa',
              padding: 30,
              borderRadius: 15,
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: 36, marginRight: 20 }}>♾️</span>
              <div>
                <h4 style={{ fontSize: 22, margin: '0 0 10px 0', color: '#2c3e50' }}>Accès illimité</h4>
                <p style={{ fontSize: 18, margin: 0, color: '#666' }}>Au parc pendant toute la durée</p>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{
          textAlign: 'center',
          fontSize: 20,
          color: '#666',
          fontStyle: 'italic'
        }}>
          Ticket minimum : 1 M FCFA
        </div>
      </Page>

      {/* Slide 9: Calendrier */}
      <Page background="linear-gradient(135deg, #134e5e 0%, #71b280 100%)" padding="80px">
        <h2 style={{
          fontSize: 48,
          color: 'white',
          marginBottom: 60,
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          Calendrier de Réalisation
        </h2>
        
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          padding: 50,
          borderRadius: 20,
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}>
          <div style={{ position: 'relative' }}>
            {/* Timeline line */}
            <div style={{
              position: 'absolute',
              left: 50,
              top: 0,
              bottom: 0,
              width: 4,
              background: '#71b280'
            }} />
            
            {/* Timeline items */}
            <div style={{ paddingLeft: 100 }}>
              <div style={{ marginBottom: 40, position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: -70,
                  top: 5,
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: '#71b280',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}>1</div>
                <h3 style={{ fontSize: 24, marginBottom: 10, color: '#2c3e50' }}>Juillet 2025</h3>
                <p style={{ fontSize: 20, color: '#666' }}>Études et permis validés</p>
              </div>
              
              <div style={{ marginBottom: 40, position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: -70,
                  top: 5,
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: '#71b280',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}>2</div>
                <h3 style={{ fontSize: 24, marginBottom: 10, color: '#2c3e50' }}>Août - Novembre 2025</h3>
                <p style={{ fontSize: 20, color: '#666' }}>Phase de construction et aménagement</p>
              </div>
              
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: -70,
                  top: 5,
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: '#e74c3c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}>3</div>
                <h3 style={{ fontSize: 24, marginBottom: 10, color: '#2c3e50' }}>Décembre 2025</h3>
                <p style={{ fontSize: 20, color: '#666' }}>Inauguration et ouverture au public</p>
              </div>
            </div>
          </div>
        </div>
      </Page>

      {/* Slide 10: Appel à l'action */}
      <Page background="linear-gradient(135deg, #134e5e 0%, #71b280 100%)">
        <div style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
          padding: 80,
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.3
          }} />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{
              fontSize: 56,
              fontWeight: 'bold',
              marginBottom: 40,
              textShadow: '3px 3px 6px rgba(0,0,0,0.5)'
            }}>
              Rejoignez l'Aventure !
            </h2>
            
            <p style={{
              fontSize: 28,
              marginBottom: 50,
              lineHeight: 1.6,
              maxWidth: 800,
              opacity: 0.95
            }}>
              Ensemble, créons le premier parc de poche du Bénin et transformons Cotonou en ville verte et durable
            </p>
            
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              padding: 40,
              borderRadius: 20,
              border: '2px solid rgba(255,255,255,0.3)',
              marginBottom: 40
            }}>
              <h3 style={{ fontSize: 32, marginBottom: 20 }}>Contact</h3>
              <p style={{ fontSize: 24, margin: '0 0 10px 0' }}>Cabinet Architecture du Soleil</p>
              <p style={{ fontSize: 20, opacity: 0.9 }}>info@greenrooftopparc.bj</p>
            </div>
            
            <p style={{
              fontSize: 20,
              fontStyle: 'italic',
              opacity: 0.8
            }}>
              "Un souffle vert au cœur de la ville"
            </p>
          </div>
        </div>
      </Page>
    </Document>
  );
};