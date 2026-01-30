
// Add React import to resolve the 'React' namespace error for React.ReactNode
import React from 'react';

export interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
  subItems?: string[];
}

export interface DetailView {
  title: string;
  status: string;
  location: string;
  schedule: string;
  phone: string;
  imageUrl: string;
}

export type ViewState = 'menu' | 'expanded' | 'detail';
