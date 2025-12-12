export type Language = 'zh' | 'en' | 'fr' | 'es' | 'ar';

export interface LocalizedText {
  zh: string;
  en: string;
  fr: string;
  es: string;
  ar: string;
}

export interface Product {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  images: string[];
  specs: {
    year: string;
    hours: string;
    condition: string;
  };
  contactPhone: string;
  timestamp: number;
}

export interface UILabels {
  siteTitle: LocalizedText;
  contactUs: LocalizedText;
  whatsapp: LocalizedText;
  uploadNew: LocalizedText;
  viewDetails: LocalizedText;
  adminPanel: LocalizedText;
  uploadTitle: LocalizedText;
  uploadDesc: LocalizedText;
  generate: LocalizedText;
  save: LocalizedText;
  cancel: LocalizedText;
  dropImages: LocalizedText;
  processing: LocalizedText;
  specs: LocalizedText;
  enterPasscode: LocalizedText;
  verify: LocalizedText;
  incorrectPasscode: LocalizedText;
  deleteProduct: LocalizedText;
  confirmDelete: LocalizedText;
  deleteWarning: LocalizedText;
}