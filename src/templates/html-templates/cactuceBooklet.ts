import { HTMLTemplate } from '../../types/htmlTemplate';

export const cactuceBookletHTML: HTMLTemplate = {
  id: 'cactuce-booklet',
  name: 'Cactuce Solutions Booklet',
  description: 'A5 8-page booklet presenting Cactuce digital transformation solutions',
  paperSize: 'A5',
  pages: [
    {
      // Page 1 - Cover
      background: '#ffffff',
      content: `
        <div style="height: 100%; display: flex; flex-direction: column; align-items: center; padding: 40px 30px;">
          <!-- Logo placeholder -->
          <div style="width: 120px; height: 120px; background: #16a34a; border-radius: 60px; margin-bottom: 60px; display: flex; align-items: center; justify-content: center;">
            <span style="color: white; font-size: 24px; font-weight: bold;">CACTUCE</span>
          </div>
          
          <!-- Main title -->
          <h1 style="font-size: 28px; color: #111827; text-align: center; font-weight: 800; line-height: 1.2; margin: 0 0 20px 0;">
            Solutions Numériques pour la Transformation des Services Publics
          </h1>
          
          <!-- Product names -->
          <p style="font-size: 20px; color: #16a34a; font-weight: 600; margin: 0 0 60px 0;">
            AssetiQ • DocuStruct
          </p>
          
          <!-- Visual space -->
          <div style="flex: 1; display: flex; align-items: center; justify-content: center; width: 100%;">
            <div style="width: 200px; height: 200px; background: linear-gradient(135deg, #16a34a 0%, #22c55e 50%, #86efac 100%); border-radius: 20px; opacity: 0.2;"></div>
          </div>
          
          <!-- Tagline -->
          <p style="font-size: 16px; color: #6b7280; font-style: italic; text-align: center; margin-top: 40px;">
            Smart Software for Institutional Transformation
          </p>
        </div>
      `
    },
    {
      // Page 2 - The Urgency of Transformation
      background: '#f9fafb',
      content: `
        <div style="padding: 40px 30px;">
          <h2 style="font-size: 24px; color: #111827; font-weight: 800; margin: 0 0 30px 0;">
            Les Défis Critiques de Votre Institution
          </h2>
          
          <!-- Asset Management Challenge -->
          <div style="margin-bottom: 30px;">
            <div style="display: flex; align-items: center; margin-bottom: 10px;">
              <div style="width: 40px; height: 40px; background: #ef4444; border-radius: 8px; margin-right: 15px; display: flex; align-items: center; justify-content: center;">
                <span style="color: white; font-size: 20px;">📊</span>
              </div>
              <h3 style="font-size: 18px; color: #111827; font-weight: 700; margin: 0;">
                Gestion d'Actifs Chaotique
              </h3>
            </div>
            <ul style="margin: 0 0 0 55px; padding: 0; list-style: none;">
              <li style="font-size: 14px; color: #4b5563; margin-bottom: 5px;">• 30% des équipements perdus ou mal suivis</li>
              <li style="font-size: 14px; color: #4b5563; margin-bottom: 5px;">• Maintenance réactive coûteuse</li>
              <li style="font-size: 14px; color: #4b5563;">• Aucune visibilité sur l'utilisation réelle</li>
            </ul>
          </div>
          
          <!-- Documentation Challenge -->
          <div style="margin-bottom: 40px;">
            <div style="display: flex; align-items: center; margin-bottom: 10px;">
              <div style="width: 40px; height: 40px; background: #f59e0b; border-radius: 8px; margin-right: 15px; display: flex; align-items: center; justify-content: center;">
                <span style="color: white; font-size: 20px;">📄</span>
              </div>
              <h3 style="font-size: 18px; color: #111827; font-weight: 700; margin: 0;">
                Documentation Archaïque
              </h3>
            </div>
            <ul style="margin: 0 0 0 55px; padding: 0; list-style: none;">
              <li style="font-size: 14px; color: #4b5563; margin-bottom: 5px;">• 2 heures par jour perdues en recherche</li>
              <li style="font-size: 14px; color: #4b5563; margin-bottom: 5px;">• Archives physiques débordantes</li>
              <li style="font-size: 14px; color: #4b5563;">• Processus d'approbation interminables</li>
            </ul>
          </div>
          
          <!-- Solution -->
          <div style="background: #16a34a; color: white; padding: 25px; border-radius: 12px; text-align: center;">
            <h3 style="font-size: 20px; font-weight: 700; margin: 0 0 10px 0;">
              La Transformation est Possible
            </h3>
            <p style="font-size: 14px; margin: 0; line-height: 1.6;">
              Deux plateformes intelligentes conçues spécifiquement pour les réalités des institutions publiques africaines.
            </p>
            <p style="font-size: 16px; font-weight: 600; margin: 15px 0 0 0;">
              Découvrez comment révolutionner vos opérations...
            </p>
          </div>
        </div>
      `
    },
    {
      // Page 3 - AssetiQ Overview
      background: '#ffffff',
      content: `
        <div style="padding: 40px 30px;">
          <!-- AssetiQ Logo/Title -->
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="width: 80px; height: 80px; background: #3b82f6; border-radius: 16px; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center;">
              <span style="color: white; font-size: 36px;">📊</span>
            </div>
            <h2 style="font-size: 22px; color: #3b82f6; font-weight: 800; margin: 0;">AssetiQ</h2>
            <p style="font-size: 16px; color: #111827; font-weight: 600; margin: 5px 0 0 0;">
              Gestion Intelligente des Actifs Publics
            </p>
            <p style="font-size: 14px; color: #6b7280; font-style: italic; margin: 5px 0 0 0;">
              Transformez chaque actif en ressource intelligente
            </p>
          </div>
          
          <!-- Problem Solved -->
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
            <h3 style="font-size: 16px; color: #111827; font-weight: 700; margin: 0 0 10px 0;">
              Le Problème Résolu
            </h3>
            <p style="font-size: 14px; color: #4b5563; line-height: 1.5; margin: 0;">
              Fini les équipements introuvables, les maintenances surprises, les achats en double. AssetiQ apporte ordre et efficacité à votre patrimoine.
            </p>
          </div>
          
          <!-- How it Works -->
          <div>
            <h3 style="font-size: 16px; color: #111827; font-weight: 700; margin: 0 0 15px 0;">
              Comment ça Marche
            </h3>
            
            <div style="margin-bottom: 15px;">
              <div style="display: flex; align-items: flex-start;">
                <span style="background: #3b82f6; color: white; width: 24px; height: 24px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 10px; flex-shrink: 0;">1</span>
                <div>
                  <h4 style="font-size: 14px; color: #111827; font-weight: 600; margin: 0 0 3px 0;">Identification Unique</h4>
                  <p style="font-size: 13px; color: #6b7280; margin: 0;">Chaque actif reçoit un QR code intelligent qui contient toute son histoire</p>
                </div>
              </div>
            </div>
            
            <div style="margin-bottom: 15px;">
              <div style="display: flex; align-items: flex-start;">
                <span style="background: #3b82f6; color: white; width: 24px; height: 24px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 10px; flex-shrink: 0;">2</span>
                <div>
                  <h4 style="font-size: 14px; color: #111827; font-weight: 600; margin: 0 0 3px 0;">Suivi en Temps Réel</h4>
                  <p style="font-size: 13px; color: #6b7280; margin: 0;">Localisation, état, responsable : tout est visible instantanément</p>
                </div>
              </div>
            </div>
            
            <div>
              <div style="display: flex; align-items: flex-start;">
                <span style="background: #3b82f6; color: white; width: 24px; height: 24px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 10px; flex-shrink: 0;">3</span>
                <div>
                  <h4 style="font-size: 14px; color: #111827; font-weight: 600; margin: 0 0 3px 0;">Intelligence Prédictive</h4>
                  <p style="font-size: 13px; color: #6b7280; margin: 0;">L'IA anticipe les besoins de maintenance et optimise l'utilisation</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Screenshot placeholder -->
          <div style="margin-top: 25px; background: #e5e7eb; height: 120px; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
            <span style="color: #6b7280; font-size: 14px;">[Interface AssetiQ]</span>
          </div>
        </div>
      `
    },
    {
      // Page 4 - AssetiQ Detailed Features
      background: '#f9fafb',
      content: `
        <div style="padding: 40px 30px;">
          <h2 style="font-size: 22px; color: #111827; font-weight: 800; margin: 0 0 25px 0;">
            Capacités Clés d'AssetiQ
          </h2>
          
          <!-- Feature 1 -->
          <div style="margin-bottom: 20px;">
            <h3 style="font-size: 16px; color: #3b82f6; font-weight: 700; margin: 0 0 8px 0; display: flex; align-items: center;">
              <span style="margin-right: 8px;">📊</span> Tableaux de Bord Intelligents
            </h3>
            <ul style="margin: 0; padding: 0 0 0 28px; list-style: none;">
              <li style="font-size: 13px; color: #4b5563; margin-bottom: 4px;">• Vue d'ensemble instantanée de tous vos actifs</li>
              <li style="font-size: 13px; color: #4b5563; margin-bottom: 4px;">• Métriques d'utilisation et de performance</li>
              <li style="font-size: 13px; color: #4b5563;">• Alertes proactives personnalisables</li>
            </ul>
          </div>
          
          <!-- Feature 2 -->
          <div style="margin-bottom: 20px;">
            <h3 style="font-size: 16px; color: #3b82f6; font-weight: 700; margin: 0 0 8px 0; display: flex; align-items: center;">
              <span style="margin-right: 8px;">🔄</span> Workflows de Réservation
            </h3>
            <ul style="margin: 0; padding: 0 0 0 28px; list-style: none;">
              <li style="font-size: 13px; color: #4b5563; margin-bottom: 4px;">• Système de booking sans conflits</li>
              <li style="font-size: 13px; color: #4b5563; margin-bottom: 4px;">• Approbations hiérarchiques automatisées</li>
              <li style="font-size: 13px; color: #4b5563;">• Notifications multicanales (email, SMS, app)</li>
            </ul>
          </div>
          
          <!-- Feature 3 -->
          <div style="margin-bottom: 20px;">
            <h3 style="font-size: 16px; color: #3b82f6; font-weight: 700; margin: 0 0 8px 0; display: flex; align-items: center;">
              <span style="margin-right: 8px;">🛡️</span> Maintenance Prédictive
            </h3>
            <ul style="margin: 0; padding: 0 0 0 28px; list-style: none;">
              <li style="font-size: 13px; color: #4b5563; margin-bottom: 4px;">• Analyse des patterns d'utilisation</li>
              <li style="font-size: 13px; color: #4b5563; margin-bottom: 4px;">• Prédiction des pannes avant qu'elles arrivent</li>
              <li style="font-size: 13px; color: #4b5563;">• Planification optimisée des interventions</li>
            </ul>
          </div>
          
          <!-- Feature 4 -->
          <div style="margin-bottom: 25px;">
            <h3 style="font-size: 16px; color: #3b82f6; font-weight: 700; margin: 0 0 8px 0; display: flex; align-items: center;">
              <span style="margin-right: 8px;">📱</span> Mobilité Complète
            </h3>
            <ul style="margin: 0; padding: 0 0 0 28px; list-style: none;">
              <li style="font-size: 13px; color: #4b5563; margin-bottom: 4px;">• Application mobile pour agents terrain</li>
              <li style="font-size: 13px; color: #4b5563; margin-bottom: 4px;">• Scan QR instantané pour check-in/out</li>
              <li style="font-size: 13px; color: #4b5563;">• Mode hors-ligne pour zones sans réseau</li>
            </ul>
          </div>
          
          <!-- Impact -->
          <div style="background: #dbeafe; padding: 20px; border-radius: 8px;">
            <h3 style="font-size: 16px; color: #1e40af; font-weight: 700; margin: 0 0 10px 0;">
              Impact Concret
            </h3>
            <p style="font-size: 13px; color: #1e40af; margin: 0 0 5px 0;">
              <strong>Ministère de la Santé :</strong> 60% d'augmentation de disponibilité des ambulances
            </p>
            <p style="font-size: 13px; color: #1e40af; margin: 0;">
              <strong>Université Nationale :</strong> Économie de 2M€ en rachats évités
            </p>
          </div>
          
          <!-- CTA -->
          <div style="text-align: center; margin-top: 25px;">
            <div style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 600;">
              Prêt pour une démo personnalisée ?
            </div>
          </div>
        </div>
      `
    },
    {
      // Page 5 - DocuStruct Overview
      background: '#ffffff',
      content: `
        <div style="padding: 40px 30px;">
          <!-- DocuStruct Logo/Title -->
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="width: 80px; height: 80px; background: #f97316; border-radius: 16px; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center;">
              <span style="color: white; font-size: 36px;">📄</span>
            </div>
            <h2 style="font-size: 22px; color: #f97316; font-weight: 800; margin: 0;">DocuStruct</h2>
            <p style="font-size: 16px; color: #111827; font-weight: 600; margin: 5px 0 0 0;">
              Dématérialisation Intelligente
            </p>
            <p style="font-size: 14px; color: #6b7280; font-style: italic; margin: 5px 0 0 0;">
              Du papier au numérique, en toute sécurité
            </p>
          </div>
          
          <!-- Problem Solved -->
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
            <h3 style="font-size: 16px; color: #111827; font-weight: 700; margin: 0 0 10px 0;">
              Le Problème Résolu
            </h3>
            <p style="font-size: 14px; color: #4b5563; line-height: 1.5; margin: 0;">
              Éliminez les montagnes de papier, les recherches interminables et les risques de perte. DocuStruct digitalise et organise intelligemment tous vos documents.
            </p>
          </div>
          
          <!-- How it Works -->
          <div>
            <h3 style="font-size: 16px; color: #111827; font-weight: 700; margin: 0 0 15px 0;">
              Comment ça Marche
            </h3>
            
            <div style="margin-bottom: 15px;">
              <div style="display: flex; align-items: flex-start;">
                <span style="background: #f97316; color: white; width: 24px; height: 24px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 10px; flex-shrink: 0;">1</span>
                <div>
                  <h4 style="font-size: 14px; color: #111827; font-weight: 600; margin: 0 0 3px 0;">Capture Universelle</h4>
                  <p style="font-size: 13px; color: #6b7280; margin: 0;">Scannez, importez ou créez directement vos documents numériques</p>
                </div>
              </div>
            </div>
            
            <div style="margin-bottom: 15px;">
              <div style="display: flex; align-items: flex-start;">
                <span style="background: #f97316; color: white; width: 24px; height: 24px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 10px; flex-shrink: 0;">2</span>
                <div>
                  <h4 style="font-size: 14px; color: #111827; font-weight: 600; margin: 0 0 3px 0;">Intelligence OCR</h4>
                  <p style="font-size: 13px; color: #6b7280; margin: 0;">Extraction automatique du contenu, même des manuscrits</p>
                </div>
              </div>
            </div>
            
            <div>
              <div style="display: flex; align-items: flex-start;">
                <span style="background: #f97316; color: white; width: 24px; height: 24px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 10px; flex-shrink: 0;">3</span>
                <div>
                  <h4 style="font-size: 14px; color: #111827; font-weight: 600; margin: 0 0 3px 0;">Organisation Automatique</h4>
                  <p style="font-size: 13px; color: #6b7280; margin: 0;">Classification intelligente et workflows prédéfinis</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Screenshot placeholder -->
          <div style="margin-top: 25px; background: #e5e7eb; height: 120px; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
            <span style="color: #6b7280; font-size: 14px;">[Interface DocuStruct]</span>
          </div>
        </div>
      `
    },
    {
      // Page 6 - DocuStruct Detailed Features
      background: '#f9fafb',
      content: `
        <div style="padding: 40px 30px;">
          <h2 style="font-size: 22px; color: #111827; font-weight: 800; margin: 0 0 25px 0;">
            Capacités Clés de DocuStruct
          </h2>
          
          <!-- Feature 1 -->
          <div style="margin-bottom: 20px;">
            <h3 style="font-size: 16px; color: #f97316; font-weight: 700; margin: 0 0 8px 0; display: flex; align-items: center;">
              <span style="margin-right: 8px;">🔍</span> Recherche Cognitive Avancée
            </h3>
            <ul style="margin: 0; padding: 0 0 0 28px; list-style: none;">
              <li style="font-size: 13px; color: #4b5563; margin-bottom: 4px;">• Trouvez par concept, pas juste par mots-clés</li>
              <li style="font-size: 13px; color: #4b5563; margin-bottom: 4px;">• Support multilingue complet</li>
              <li style="font-size: 13px; color: #4b5563;">• Résultats instantanés avec aperçu</li>
            </ul>
          </div>
          
          <!-- Feature 2 -->
          <div style="margin-bottom: 20px;">
            <h3 style="font-size: 16px; color: #f97316; font-weight: 700; margin: 0 0 8px 0; display: flex; align-items: center;">
              <span style="margin-right: 8px;">🔐</span> Sécurité de Grade Militaire
            </h3>
            <ul style="margin: 0; padding: 0 0 0 28px; list-style: none;">
              <li style="font-size: 13px; color: #4b5563; margin-bottom: 4px;">• Chiffrement AES-256 de bout en bout</li>
              <li style="font-size: 13px; color: #4b5563; margin-bottom: 4px;">• Authentification multi-facteurs</li>
              <li style="font-size: 13px; color: #4b5563;">• Coffre-fort numérique certifié</li>
            </ul>
          </div>
          
          <!-- Feature 3 -->
          <div style="margin-bottom: 20px;">
            <h3 style="font-size: 16px; color: #f97316; font-weight: 700; margin: 0 0 8px 0; display: flex; align-items: center;">
              <span style="margin-right: 8px;">⚡</span> Workflows Automatisés
            </h3>
            <ul style="margin: 0; padding: 0 0 0 28px; list-style: none;">
              <li style="font-size: 13px; color: #4b5563; margin-bottom: 4px;">• Circuits de validation personnalisables</li>
              <li style="font-size: 13px; color: #4b5563; margin-bottom: 4px;">• Signatures électroniques intégrées</li>
              <li style="font-size: 13px; color: #4b5563;">• Rappels et escalades automatiques</li>
            </ul>
          </div>
          
          <!-- Feature 4 -->
          <div style="margin-bottom: 25px;">
            <h3 style="font-size: 16px; color: #f97316; font-weight: 700; margin: 0 0 8px 0; display: flex; align-items: center;">
              <span style="margin-right: 8px;">📈</span> Analytics et Conformité
            </h3>
            <ul style="margin: 0; padding: 0 0 0 28px; list-style: none;">
              <li style="font-size: 13px; color: #4b5563; margin-bottom: 4px;">• Tableaux de bord d'activité</li>
              <li style="font-size: 13px; color: #4b5563; margin-bottom: 4px;">• Pistes d'audit complètes RGPD</li>
              <li style="font-size: 13px; color: #4b5563;">• Rapports de conformité automatiques</li>
            </ul>
          </div>
          
          <!-- Impact -->
          <div style="background: #fed7aa; padding: 20px; border-radius: 8px;">
            <h3 style="font-size: 16px; color: #c2410c; font-weight: 700; margin: 0 0 10px 0;">
              Transformations Réelles
            </h3>
            <p style="font-size: 13px; color: #c2410c; margin: 0 0 5px 0;">
              <strong>Direction des Impôts :</strong> 10 millions de déclarations dématérialisées
            </p>
            <p style="font-size: 13px; color: #c2410c; margin: 0;">
              <strong>Services RH :</strong> Traitement 70% plus rapide des dossiers
            </p>
          </div>
          
          <!-- CTA -->
          <div style="text-align: center; margin-top: 25px;">
            <div style="display: inline-block; background: #f97316; color: white; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 600;">
              Commencez votre transformation
            </div>
          </div>
        </div>
      `
    },
    {
      // Page 7 - Why Cactuce
      background: '#ffffff',
      content: `
        <div style="padding: 40px 30px;">
          <h2 style="font-size: 22px; color: #111827; font-weight: 800; margin: 0 0 30px 0; text-align: center;">
            Pourquoi Cactuce ?
          </h2>
          
          <h3 style="font-size: 18px; color: #16a34a; font-weight: 700; margin: 0 0 20px 0;">
            Notre Expertise à Votre Service
          </h3>
          
          <!-- Stats Grid -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 30px;">
            <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; text-align: center;">
              <p style="font-size: 28px; color: #16a34a; font-weight: 800; margin: 0;">8</p>
              <p style="font-size: 12px; color: #166534; font-weight: 600; margin: 5px 0 0 0;">Pays Africains</p>
              <p style="font-size: 11px; color: #4b5563; margin: 3px 0 0 0;">Compréhension locale</p>
            </div>
            
            <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; text-align: center;">
              <p style="font-size: 28px; color: #16a34a; font-weight: 800; margin: 0;">47</p>
              <p style="font-size: 12px; color: #166534; font-weight: 600; margin: 5px 0 0 0;">Experts</p>
              <p style="font-size: 11px; color: #4b5563; margin: 3px 0 0 0;">42% de femmes</p>
            </div>
            
            <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; text-align: center;">
              <p style="font-size: 28px; color: #16a34a; font-weight: 800; margin: 0;">7</p>
              <p style="font-size: 12px; color: #166534; font-weight: 600; margin: 5px 0 0 0;">Projets Gouvernementaux</p>
              <p style="font-size: 11px; color: #4b5563; margin: 3px 0 0 0;">Références solides</p>
            </div>
            
            <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; text-align: center;">
              <p style="font-size: 28px; color: #16a34a; font-weight: 800; margin: 0;">324</p>
              <p style="font-size: 12px; color: #166534; font-weight: 600; margin: 5px 0 0 0;">Heures Formation</p>
              <p style="font-size: 11px; color: #4b5563; margin: 3px 0 0 0;">Transfert garanti</p>
            </div>
          </div>
          
          <h3 style="font-size: 18px; color: #16a34a; font-weight: 700; margin: 0 0 20px 0;">
            Notre Approche Unique
          </h3>
          
          <!-- Approach points -->
          <div style="margin-bottom: 15px;">
            <h4 style="font-size: 15px; color: #111827; font-weight: 600; margin: 0 0 5px 0;">
              🤝 Co-construction
            </h4>
            <p style="font-size: 13px; color: #6b7280; margin: 0 0 0 24px;">
              Nous développons AVEC vous, pas POUR vous
            </p>
          </div>
          
          <div style="margin-bottom: 15px;">
            <h4 style="font-size: 15px; color: #111827; font-weight: 600; margin: 0 0 5px 0;">
              🔒 Souveraineté Garantie
            </h4>
            <p style="font-size: 13px; color: #6b7280; margin: 0 0 0 24px;">
              Vos données restent sous votre contrôle total
            </p>
          </div>
          
          <div style="margin-bottom: 15px;">
            <h4 style="font-size: 15px; color: #111827; font-weight: 600; margin: 0 0 5px 0;">
              🔧 Technologies Ouvertes
            </h4>
            <p style="font-size: 13px; color: #6b7280; margin: 0 0 0 24px;">
              Pas de dépendance, évolutivité assurée
            </p>
          </div>
          
          <div>
            <h4 style="font-size: 15px; color: #111827; font-weight: 600; margin: 0 0 5px 0;">
              📍 Support Local
            </h4>
            <p style="font-size: 13px; color: #6b7280; margin: 0 0 0 24px;">
              Équipes sur place, réactivité maximale
            </p>
          </div>
        </div>
      `
    },
    {
      // Page 8 - Call to Action
      background: '#16a34a',
      content: `
        <div style="padding: 40px 30px; color: white;">
          <h2 style="font-size: 22px; font-weight: 800; margin: 0 0 25px 0; text-align: center;">
            Votre Transformation en 5 Étapes
          </h2>
          
          <!-- Timeline -->
          <div style="margin-bottom: 30px;">
            <div style="display: flex; align-items: center; margin-bottom: 12px;">
              <span style="background: white; color: #16a34a; width: 28px; height: 28px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; margin-right: 12px; flex-shrink: 0;">1</span>
              <div>
                <p style="font-size: 14px; font-weight: 600; margin: 0;">Consultation Découverte (Gratuite)</p>
                <p style="font-size: 12px; margin: 2px 0 0 0; opacity: 0.9;">Analysons ensemble vos défis spécifiques</p>
              </div>
            </div>
            
            <div style="display: flex; align-items: center; margin-bottom: 12px;">
              <span style="background: white; color: #16a34a; width: 28px; height: 28px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; margin-right: 12px; flex-shrink: 0;">2</span>
              <div>
                <p style="font-size: 14px; font-weight: 600; margin: 0;">Démonstration Personnalisée</p>
                <p style="font-size: 12px; margin: 2px 0 0 0; opacity: 0.9;">Voyez les solutions adaptées à vos cas d'usage</p>
              </div>
            </div>
            
            <div style="display: flex; align-items: center; margin-bottom: 12px;">
              <span style="background: white; color: #16a34a; width: 28px; height: 28px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; margin-right: 12px; flex-shrink: 0;">3</span>
              <div>
                <p style="font-size: 14px; font-weight: 600; margin: 0;">Pilote sur Mesure</p>
                <p style="font-size: 12px; margin: 2px 0 0 0; opacity: 0.9;">Testez sur un département, sans engagement</p>
              </div>
            </div>
            
            <div style="display: flex; align-items: center; margin-bottom: 12px;">
              <span style="background: white; color: #16a34a; width: 28px; height: 28px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; margin-right: 12px; flex-shrink: 0;">4</span>
              <div>
                <p style="font-size: 14px; font-weight: 600; margin: 0;">Déploiement Progressif</p>
                <p style="font-size: 12px; margin: 2px 0 0 0; opacity: 0.9;">Formation complète et accompagnement inclus</p>
              </div>
            </div>
            
            <div style="display: flex; align-items: center;">
              <span style="background: white; color: #16a34a; width: 28px; height: 28px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; margin-right: 12px; flex-shrink: 0;">5</span>
              <div>
                <p style="font-size: 14px; font-weight: 600; margin: 0;">Succès Mesurable</p>
                <p style="font-size: 12px; margin: 2px 0 0 0; opacity: 0.9;">ROI démontré en 6 mois maximum</p>
              </div>
            </div>
          </div>
          
          <!-- Message -->
          <div style="background: rgba(255, 255, 255, 0.15); padding: 20px; border-radius: 8px; margin-bottom: 25px; text-align: center;">
            <p style="font-size: 16px; font-weight: 600; margin: 0;">
              Ne Perdez Plus de Temps
            </p>
            <p style="font-size: 13px; margin: 8px 0 0 0;">
              Chaque jour sans transformation digitale est une opportunité manquée d'améliorer le service public.
            </p>
          </div>
          
          <!-- Contact -->
          <div style="background: white; color: #111827; padding: 25px; border-radius: 12px; text-align: center;">
            <h3 style="font-size: 18px; color: #16a34a; font-weight: 700; margin: 0 0 15px 0;">
              Contactez-nous Aujourd'hui
            </h3>
            <p style="font-size: 15px; margin: 0 0 5px 0;">📧 contact@cactuce.com</p>
            <p style="font-size: 15px; margin: 0 0 5px 0;">🌐 www.cactuce.com</p>
            <p style="font-size: 15px; margin: 0 0 15px 0;">📱 +XXX XX XX XX XX</p>
            
            <div style="width: 80px; height: 80px; background: #16a34a; border-radius: 40px; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
              <span style="color: white; font-size: 16px; font-weight: bold;">CACTUCE</span>
            </div>
          </div>
          
          <p style="font-size: 12px; text-align: center; margin: 20px 0 0 0; opacity: 0.8;">
            Ensemble, construisons l'administration publique de demain
          </p>
        </div>
      `
    }
  ]
};