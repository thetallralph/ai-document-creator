import React from 'react';
import { CactuceBooklet } from './cactuce-booklet';
import { GreenRooftopBusinessPlan } from './green-rooftop-business-plan';
import { Bbooklet } from './bbooklet';

export interface DocumentTemplate {
  name: string;
  description: string;
  component: React.FC;
}

export const allTemplates: DocumentTemplate[] = [
  {
    name: 'Cactuce Solutions Booklet',
    description: 'A5 8-page booklet presenting AssetiQ and DocuStruct solutions',
    component: CactuceBooklet
  },
  {
    name: 'Plan d\'Affaires - The Green Rooftop Parc',
    description: 'Présentation 16:9 du plan d\'affaires pour un parc urbain écologique au Bénin',
    component: GreenRooftopBusinessPlan
  },
  {
    name: 'BBooklet',
    description: 'A5 8-page Cactuce booklet showcasing AssetiQ and DocuStruct digital transformation solutions',
    component: Bbooklet
  }
];