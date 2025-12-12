import React, { useState } from 'react';
import { Language, Product, UILabels } from '../types';

interface Props {
  product: Product;
  currentLang: Language;
  uiLabels: UILabels;
  onDelete: (id: string) => void;
}

const ProductCard: React.FC<Props> = ({ product, currentLang, uiLabels, onDelete }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const isRTL = currentLang === 'ar';

  return (
    <>
      <div className={`relative bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col ${isRTL ? 'text-right font-arabic' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        
        {/* Delete Button (Visible on Hover or always visible for simplicity in this demo) */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            onDelete(product.id);
          }}
          className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-10 w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur text-slate-400 hover:text-red-600 rounded-full shadow-sm hover:bg-red-50 transition-all`}
          title={uiLabels.deleteProduct[currentLang]}
        >
          <i className="fas fa-trash-alt text-sm"></i>
        </button>

        {/* Content Section (Top) */}
        <div className="p-5 flex-1 flex flex-col">
          
          {/* Header */}
          <div className="mb-3 pr-8">
             <h3 className="text-xl font-bold text-slate-900 mb-2 leading-snug">
              {product.title[currentLang]}
             </h3>
             
             {/* Specs Tags */}
             <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-start' : ''}`}>
               <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-semibold border border-blue-100">
                 {product.specs.year}
               </span>
               <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-semibold border border-blue-100">
                 {product.specs.hours}
               </span>
               <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-semibold border border-green-100">
                 {product.specs.condition}
               </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line mb-4">
            {product.description[currentLang]}
          </p>

          {/* Image Grid (Facebook Style) */}
          <div className={`grid gap-1 mb-6 ${
            product.images.length === 1 ? 'grid-cols-1' : 
            product.images.length === 2 ? 'grid-cols-2' :
            'grid-cols-2 md:grid-cols-3'
          }`}>
            {product.images.map((img, idx) => (
              <div 
                key={idx} 
                className={`relative overflow-hidden cursor-pointer group ${
                  product.images.length === 3 && idx === 0 ? 'col-span-2 row-span-2' : ''
                } ${
                   product.images.length > 3 && idx === 0 ? 'col-span-2' : ''
                }`}
                onClick={() => setSelectedImage(img)}
              >
                <img 
                  src={img} 
                  alt={`Product view ${idx + 1}`} 
                  className="w-full h-full object-cover min-h-[150px] max-h-[400px] hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
            ))}
          </div>

          {/* CTA */}
          <a 
            href={`https://wa.me/${product.contactPhone}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-auto block w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-4 rounded-lg text-center transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <i className="fab fa-whatsapp text-xl"></i>
            <span>{uiLabels.whatsapp[currentLang]}</span>
          </a>
        </div>
      </div>

      {/* Lightbox / Image Preview Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white/70 hover:text-white"
            onClick={() => setSelectedImage(null)}
          >
            <i className="fas fa-times text-3xl"></i>
          </button>
          <img 
            src={selectedImage} 
            alt="Full size" 
            className="max-w-full max-h-[90vh] rounded shadow-2xl"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </>
  );
};

export default ProductCard;