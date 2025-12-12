import React, { useState, useEffect } from 'react';
import LanguageSwitcher from './components/LanguageSwitcher';
import ProductCard from './components/ProductCard';
import AdminUpload from './components/AdminUpload';
import DeleteProductModal from './components/DeleteProductModal';
import { INITIAL_PRODUCTS, UI_LABELS } from './constants';
import { Language, Product } from './types';

const App: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('zh');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  
  // Modal States
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    const checkApiKey = async () => {
      if (window.aistudio && window.aistudio.hasSelectedApiKey) {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(hasKey);
      }
    };
    checkApiKey();
  }, []);

  const handleApiKeySelect = async () => {
    if (window.aistudio && window.aistudio.openSelectKey) {
      await window.aistudio.openSelectKey();
      setHasApiKey(true);
    }
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  // Delete Logic
  const initiateDelete = (id: string) => {
    setProductToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(prev => prev.filter(p => p.id !== productToDelete));
      setDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  const isRTL = currentLang === 'ar';

  return (
    <div className={`min-h-screen flex flex-col ${isRTL ? 'font-arabic' : ''}`}>
      
      {/* Navbar / Header */}
      <header className="sticky top-0 z-40 bg-slate-900 text-white shadow-xl">
        <div className="container mx-auto px-4 py-3">
          <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            
            {/* Logo Area */}
            <div className="flex items-center gap-3">
              <div className="bg-yellow-500 text-slate-900 p-2 rounded-lg">
                <i className="fas fa-truck-front text-2xl"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold leading-tight">{UI_LABELS.siteTitle[currentLang]}</h1>
                <p className="text-xs text-slate-400 font-mono">+86 131 0209 7999</p>
              </div>
            </div>

            {/* Language & Actions */}
            <div className={`flex flex-col gap-3 ${isRTL ? 'items-start md:items-start' : 'items-start md:items-end'}`}>
               <LanguageSwitcher currentLang={currentLang} onLanguageChange={setCurrentLang} />
            </div>

          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 bg-slate-50">
        
        {/* Admin / Upload Trigger */}
        <div className="mb-8 flex justify-end">
             {!hasApiKey && (
               <button 
                 onClick={handleApiKeySelect}
                 className="mr-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-200 transition-colors"
               >
                 <i className="fas fa-key mr-2"></i>
                 Enable AI Translation (Select Key)
               </button>
             )}
            <button 
              onClick={() => setIsAdminOpen(true)}
              className="bg-white border border-slate-200 text-slate-700 px-5 py-2 rounded-full shadow-sm hover:shadow-md hover:border-yellow-500 hover:text-yellow-600 transition-all text-sm font-semibold flex items-center gap-2"
            >
              <i className="fas fa-plus-circle"></i>
              {UI_LABELS.uploadNew[currentLang]}
            </button>
        </div>

        {/* Hero / Intro (Simple) */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
             <h2 className="text-3xl font-bold text-slate-800 mb-4">
               {UI_LABELS.siteTitle[currentLang]}
             </h2>
             <div className="h-1 w-20 bg-yellow-500 mx-auto rounded-full"></div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              currentLang={currentLang} 
              uiLabels={UI_LABELS}
              onDelete={initiateDelete}
            />
          ))}
        </div>

        {/* Empty State / Fallback */}
        {products.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <i className="fas fa-box-open text-6xl mb-4"></i>
            <p>No products currently available.</p>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
        <p>© {new Date().getFullYear()} Global Machinery Sales. All rights reserved.</p>
        <div className="mt-2 flex justify-center gap-4">
           <a href="#" className="hover:text-yellow-500"><i className="fab fa-facebook"></i></a>
           <a href="#" className="hover:text-yellow-500"><i className="fab fa-whatsapp"></i></a>
        </div>
      </footer>

      {/* Floating Upload Button (Mobile) */}
      <button 
        onClick={() => setIsAdminOpen(true)}
        className="md:hidden fixed bottom-6 right-6 bg-yellow-500 text-slate-900 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center z-40 hover:scale-105 transition-transform"
      >
        <i className="fas fa-camera text-2xl"></i>
      </button>

      {/* Admin Modals */}
      <AdminUpload 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
        onAddProduct={handleAddProduct}
        currentLang={currentLang}
        uiLabels={UI_LABELS}
      />

      <DeleteProductModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        currentLang={currentLang}
        uiLabels={UI_LABELS}
      />

    </div>
  );
};

export default App;