import React from 'react';
import { OutletFlyer } from './outlet-flyer';
import { OutletCatalog } from './outlet-catalog';
import { OutletPresentation } from './outlet-presentation';
import { CactuceBooklet } from './cactuce-booklet';
import { GreenRooftopBusinessPlan } from './green-rooftop-business-plan';

export interface DocumentTemplate {
  name: string;
  description: string;
  component: React.FC;
}

export const allTemplates: DocumentTemplate[] = [
  {
    name: 'Outlet Sale Flyer',
    description: 'A4 single-page flyer for outlet store promotions',
    component: OutletFlyer
  },
  {
    name: 'Outlet Product Catalog',
    description: 'A4 multi-page catalog showcasing outlet products',
    component: OutletCatalog
  },
  {
    name: 'Outlet Presentation',
    description: '16:9 widescreen presentation for digital display',
    component: OutletPresentation
  },
  {
    name: 'Cactuce Solutions Booklet',
    description: 'A5 8-page booklet presenting AssetiQ and DocuStruct solutions',
    component: CactuceBooklet
  },
  {
    name: 'Plan d\'Affaires - The Green Rooftop Parc',
    description: 'Présentation 16:9 du plan d\'affaires pour un parc urbain écologique au Bénin',
    component: GreenRooftopBusinessPlan
  }
];