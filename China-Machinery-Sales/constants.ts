import { LocalizedText, Product, UILabels } from './types';

export const LANGUAGES: { code: keyof LocalizedText; label: string; flag: string }[] = [
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
];

export const UI_LABELS: UILabels = {
  siteTitle: {
    zh: '全球工程机械直销',
    en: 'Global Machinery Direct',
    fr: 'Vente Directe de Machines',
    es: 'Maquinaria Global Directa',
    ar: 'مبيعات الآلات العالمية المباشرة',
  },
  contactUs: {
    zh: '联系我们',
    en: 'Contact Us',
    fr: 'Contactez-nous',
    es: 'Contáctenos',
    ar: 'اتصل بنا',
  },
  whatsapp: {
    zh: 'WhatsApp 咨询',
    en: 'Chat on WhatsApp',
    fr: 'Discuter sur WhatsApp',
    es: 'Chat en WhatsApp',
    ar: 'دردشة عبر واتساب',
  },
  uploadNew: {
    zh: '上传新产品',
    en: 'Upload New Product',
    fr: 'Télécharger un produit',
    es: 'Subir nuevo producto',
    ar: 'تحميل منتج جديد',
  },
  viewDetails: {
    zh: '查看详情',
    en: 'View Details',
    fr: 'Voir les détails',
    es: 'Ver detalles',
    ar: 'عرض التفاصيل',
  },
  adminPanel: {
    zh: '卖家管理后台',
    en: 'Seller Admin Panel',
    fr: 'Panneau d\'administration',
    es: 'Panel de administración',
    ar: 'لوحة تحكم البائع',
  },
  uploadTitle: {
    zh: '产品标题 (请输入中文)',
    en: 'Product Title (Input Chinese)',
    fr: 'Titre du produit',
    es: 'Título del producto',
    ar: 'عنوان المنتج',
  },
  uploadDesc: {
    zh: '产品描述 (请输入中文)',
    en: 'Product Description (Input Chinese)',
    fr: 'Description du produit',
    es: 'Descripción del producto',
    ar: 'وصف المنتج',
  },
  generate: {
    zh: 'AI 自动翻译生成',
    en: 'AI Auto-Translate',
    fr: 'Traduction IA',
    es: 'Traducción IA',
    ar: 'ترجمة الذكاء الاصطناعي',
  },
  save: {
    zh: '发布产品',
    en: 'Publish Product',
    fr: 'Publier',
    es: 'Publicar',
    ar: 'نشر المنتج',
  },
  cancel: {
    zh: '取消',
    en: 'Cancel',
    fr: 'Annuler',
    es: 'Cancelar',
    ar: 'إلغاء',
  },
  dropImages: {
    zh: '点击上传照片',
    en: 'Click to upload photos',
    fr: 'Cliquez pour télécharger',
    es: 'Clic para subir fotos',
    ar: 'انقر لتحميل الصور',
  },
  processing: {
    zh: 'AI 正在分析与翻译...',
    en: 'AI Analyzing & Translating...',
    fr: 'Traitement IA...',
    es: 'Procesando IA...',
    ar: 'جاري المعالجة...',
  },
  specs: {
    zh: '规格参数',
    en: 'Specifications',
    fr: 'Caractéristiques',
    es: 'Especificaciones',
    ar: 'المواصفات',
  },
  enterPasscode: {
    zh: '请输入管理员密码',
    en: 'Enter Admin Passcode',
    fr: 'Entrez le code administrateur',
    es: 'Ingrese código de administrador',
    ar: 'أدخل رمز المدير',
  },
  verify: {
    zh: '验证',
    en: 'Verify',
    fr: 'Vérifier',
    es: 'Verificar',
    ar: 'تحقق',
  },
  incorrectPasscode: {
    zh: '密码错误',
    en: 'Incorrect Passcode',
    fr: 'Code incorrect',
    es: 'Código incorrecto',
    ar: 'الرمز غير صحيح',
  },
  deleteProduct: {
    zh: '删除产品',
    en: 'Delete Product',
    fr: 'Supprimer',
    es: 'Eliminar',
    ar: 'حذف المنتج',
  },
  confirmDelete: {
    zh: '确认删除',
    en: 'Confirm Delete',
    fr: 'Confirmer',
    es: 'Confirmar',
    ar: 'تأكيد الحذف',
  },
  deleteWarning: {
    zh: '此操作无法撤销。',
    en: 'This action cannot be undone.',
    fr: 'Cette action est irréversible.',
    es: 'Esta acción no se puede deshacer.',
    ar: 'لا يمكن التراجع عن هذا الإجراء.',
  }
};

// Initial Data - Containing ONLY the LiuGong loader as requested
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    timestamp: Date.now(),
    contactPhone: '8613102097999',
    images: [
      'https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=800&auto=format&fit=crop', // 1. Side Profile
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop', // 2. Side Angle
      'https://images.unsplash.com/photo-1575306660163-e4c1f964259b?q=80&w=800&auto=format&fit=crop', // 3. Bucket/Front
      'https://images.unsplash.com/photo-1664303847960-586318f59035?q=80&w=800&auto=format&fit=crop', // 4. Cabin Interior
      'https://images.unsplash.com/photo-1535973906380-68426090e50f?q=80&w=800&auto=format&fit=crop', // 5. Dashboard/Hour Meter
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800&auto=format&fit=crop', // 6. Engine Side
      'https://images.unsplash.com/photo-1518709414768-a88981a4515d?q=80&w=800&auto=format&fit=crop', // 7. Engine Detail
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800&auto=format&fit=crop', // 8. Plate/ID
      'https://images.unsplash.com/photo-1580901369227-3d60943eb96d?q=80&w=800&auto=format&fit=crop', // 9. Hydraulic Level
    ],
    specs: {
      year: '2024',
      hours: '753h',
      condition: '90% New'
    },
    title: {
      zh: '柳工 855 5吨装载机 (24年新款)',
      en: 'LiuGong 855 5-Ton Loader (2024 Model)',
      fr: 'Chargeuse LiuGong 855 5 Tonnes (Modèle 2024)',
      es: 'Cargadora LiuGong 855 de 5 Toneladas (Modelo 2024)',
      ar: 'لويغونغ 855 5 طن محمل (موديل 2024)',
    },
    description: {
      zh: '柳工5吨装载机，90%新，目前在库，24年855加长臂，实表753小时，全车原版。',
      en: 'LiuGong 5-ton loader, 90% new, currently in stock, 2024 model 855 with long boom, actual 753 hours, all original parts.',
      fr: 'Chargeuse LiuGong 5 tonnes, 90% neuve, en stock, modèle 2024 855 avec bras long, 753 heures réelles, entièrement d\'origine.',
      es: 'Cargadora LiuGong de 5 toneladas, 90% nueva, en stock, modelo 2024 855 con brazo largo, 753 horas reales, todo original.',
      ar: 'محمل لويغونغ 5 طن، 90% جديد، متوفر حاليا، موديل 2024 855 بذراع طويل، 753 ساعة حقيقية، أصلي بالكامل.',
    }
  }
];