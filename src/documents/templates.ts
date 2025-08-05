import React from 'react';
import { CactuceBooklet } from './cactuce-booklet';
import { GreenRooftopBusinessPlan } from './green-rooftop-business-plan';
import { Bbooklet } from './bbooklet';
import { OutletFlyer } from './outlet-flyer';
import { OutletCatalog } from './outlet-catalog';
import { OutletPresentation } from './outlet-presentation';
import { TestTemplate } from './test-template';

export interface DocumentTemplate {
  name: string;
  description: string;
  component: React.FC;
}

export const allTemplates: DocumentTemplate[] = [
  {
    name: 'Outlet Sale Flyer',
    description: 'A4 single-page minimal promotional flyer with dynamic Unsplash images',
    component: OutletFlyer
  },
  {
    name: 'Outlet Product Catalog',
    description: 'A4 multi-page minimal product catalog with Unsplash integration',
    component: OutletCatalog
  },
  {
    name: 'Outlet Presentation',
    description: '16:9 widescreen minimal business presentation',
    component: OutletPresentation
  },
  {
    name: 'Cactuce Solutions Booklet',
    description: 'A5 8-page minimal booklet presenting AssetiQ and DocuStruct solutions',
    component: CactuceBooklet
  },
  {
    name: 'Plan d\'Affaires - The Green Rooftop Parc',
    description: 'Présentation 16:9 minimaliste pour un parc urbain écologique au Bénin',
    component: GreenRooftopBusinessPlan
  },
  {
    name: 'BBooklet',
    description: 'A5 8-page Cactuce booklet showcasing AssetiQ and DocuStruct digital transformation solutions',
    component: Bbooklet
  },
  {
    name: 'Test Presentation',
    description: 'Simple A4 test template using only HTML elements with inline styles',
    component: TestTemplate
  }
];