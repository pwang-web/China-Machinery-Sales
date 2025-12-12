import React, { useState, useEffect } from 'react';
import { generateProductContent } from '../services/geminiService';
import { Language, Product, UILabels } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
  currentLang: Language;
  uiLabels: UILabels;
}

const AdminUpload: React.FC<Props> = ({ isOpen, onClose, onAddProduct, currentLang, uiLabels }) => {
  const [images, setImages] = useState<string[]>([]);
  const [inputTitle, setInputTitle] = useState('');
  const [inputDesc, setInputDesc] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Manual API Key State (for deployments without ENV vars)
  const [manualApiKey, setManualApiKey] = useState('');
  const [needsApiKey, setNeedsApiKey] = useState(false);

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);

  // Check if API key exists in environment
  useEffect(() => {
    // If no ENV key is found, and we are not in an IDX environment that injects it, prompt user.
    if (!process.env.API_KEY) {
      setNeedsApiKey(true);
    }
  }, []);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setPasscode('');
      setAuthError(false);
      setIsAuthenticated(false);
      setImages([]);
      setInputTitle('');
      setInputDesc('');
      setError(null);
    }
  }, [isOpen]);

  const handleVerify = () => {
    if (passcode === '1111') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      
      // Convert to Base64 for local demo
      Promise.all(files.map(file => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file as Blob);
        });
      })).then(base64Images => {
        setImages(prev => [...prev, ...base64Images]);
      });
    }
  };

  const handleSubmit = async () => {
    if (!inputTitle || !inputDesc || images.length === 0) {
      alert("请上传照片并填写中文标题和描述 (Please upload images and fill in Chinese details).");
      return;
    }

    if (needsApiKey && !manualApiKey) {
      alert("Please enter a Google Gemini API Key.");
      return;
    }

    try {
      // Check for Google IDX/Studio environment key selection logic
      if (!process.env.API_KEY && !manualApiKey && window.aistudio && window.aistudio.openSelectKey) {
         await window.aistudio.openSelectKey();
      }

      setIsProcessing(true);
      setError(null);

      // Call AI Service with optional manual key
      const content = await generateProductContent(inputTitle, inputDesc, manualApiKey);

      const newProduct: Product = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        contactPhone: '8613102097999',
        images: images,
        specs: content.specs, // Specs extracted by AI
        title: content.title,
        description: content.description,
      };

      onAddProduct(newProduct);
      onClose();

    } catch (err: any) {
        console.error(err);
        setError("AI 生成失败，请检查 API Key 是否有效 (Generation failed, check API Key).");
    } finally {
      setIsProcessing(false);
    }
  };

  const isRTL = currentLang === 'ar';

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm p-4">
      <div className={`bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl ${isRTL ? 'text-right font-arabic' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-xl font-bold text-slate-800">{uiLabels.uploadNew[currentLang]}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isAuthenticated ? (
            // Auth View
            <div className="flex flex-col items-center py-8 space-y-4">
               <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-2">
                 <i className="fas fa-lock text-slate-400 text-2xl"></i>
               </div>
               <h3 className="text-lg font-semibold text-slate-700">{uiLabels.enterPasscode[currentLang]}</h3>
               <div className="w-full max-w-xs">
                 <input 
                   type="password" 
                   value={passcode}
                   onChange={(e) => {
                     setPasscode(e.target.value);
                     setAuthError(false);
                   }}
                   placeholder="1111"
                   className={`w-full text-center text-2xl tracking-widest p-2 border-b-2 outline-none focus:border-yellow-500 transition-colors
                     ${authError ? 'border-red-500 text-red-600' : 'border-slate-300 text-slate-800'}
                   `}
                   autoFocus
                   onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                 />
                 {authError && (
                   <p className="text-red-500 text-sm text-center mt-2">{uiLabels.incorrectPasscode[currentLang]}</p>
                 )}
               </div>
               <button 
                 onClick={handleVerify}
                 className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-8 rounded-full transition-colors shadow-sm"
               >
                 {uiLabels.verify[currentLang]}
               </button>
            </div>
          ) : (
            // Upload Form View
            <div className="space-y-6">
               
               {/* API Key Input (Only if missing in ENV) */}
               {needsApiKey && (
                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
                   <div className="flex items-center gap-2 mb-2 text-blue-800 font-bold">
                     <i className="fas fa-key"></i>
                     <span>System API Key Missing</span>
                   </div>
                   <p className="text-blue-700 mb-2">Please enter your Google Gemini API Key to enable translation.</p>
                   <input 
                     type="password"
                     value={manualApiKey}
                     onChange={(e) => setManualApiKey(e.target.value)}
                     placeholder="Paste your Gemini API Key here (starts with AIza...)"
                     className="w-full border border-blue-300 rounded p-2 text-slate-800 text-sm"
                   />
                 </div>
               )}

               <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800 flex items-start gap-3">
                  <i className="fas fa-language text-xl mt-0.5"></i>
                  <div>
                    <p className="font-bold mb-1">AI 自动翻译模式 (Auto-Translation Mode)</p>
                    <p>您只需填写<b>中文内容</b>，系统会自动翻译成英文、法语、西班牙语和阿拉伯语。</p>
                    <p className="mt-1 opacity-80">You only need to enter <b>Chinese</b>. The system will auto-translate to English, French, Spanish, and Arabic.</p>
                  </div>
               </div>

               {/* Image Upload Area */}
               <div className="space-y-2">
                 <label className="block text-sm font-bold text-slate-700">{uiLabels.dropImages[currentLang]}</label>
                 <div className="grid grid-cols-4 gap-2">
                    {images.map((img, idx) => (
                        <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200">
                            <img src={img} alt="preview" className="w-full h-full object-cover" />
                            <button 
                                onClick={() => setImages(prev => prev.filter((_, i) => i !== idx))}
                                className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    ))}
                    <label className="border-2 border-dashed border-slate-300 rounded-lg aspect-square flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-50 hover:border-yellow-500 transition-colors">
                        <i className="fas fa-camera text-2xl mb-1"></i>
                        <span className="text-xs text-center px-1">Add</span>
                        <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                 </div>
               </div>

               {/* Text Inputs - Hardcoded labels to ensure Chinese input */}
               <div className="space-y-4">
                   <div>
                       <label className="block text-sm font-bold text-slate-700 mb-1">
                         产品标题 (中文) <span className="text-slate-400 font-normal">- Product Title (Chinese)</span>
                       </label>
                       <input 
                        type="text" 
                        value={inputTitle}
                        onChange={(e) => setInputTitle(e.target.value)}
                        placeholder="例如：柳工 855 装载机..."
                        className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-500 outline-none transition-shadow"
                       />
                   </div>

                   <div>
                       <label className="block text-sm font-bold text-slate-700 mb-1">
                          产品描述 (中文) <span className="text-slate-400 font-normal">- Product Description (Chinese)</span>
                       </label>
                       <textarea 
                        value={inputDesc}
                        onChange={(e) => setInputDesc(e.target.value)}
                        placeholder="例如：90%新，车况完美，实表753小时..."
                        rows={4}
                        className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-500 outline-none transition-shadow"
                       />
                   </div>
               </div>
               
               {error && (
                 <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-200">
                   <i className="fas fa-exclamation-circle mr-2"></i>
                   {error}
                 </div>
               )}

               {/* Footer Actions */}
                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                    <button 
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-lg text-slate-600 font-medium hover:bg-slate-200 transition-colors"
                    >
                        {uiLabels.cancel[currentLang]}
                    </button>
                    <button 
                        onClick={handleSubmit}
                        disabled={isProcessing}
                        className={`px-5 py-2.5 rounded-lg text-white font-bold shadow-lg flex items-center gap-2
                            ${isProcessing ? 'bg-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500'}
                        `}
                    >
                        {isProcessing ? (
                            <>
                                <i className="fas fa-circle-notch fa-spin"></i>
                                {uiLabels.processing[currentLang]}
                            </>
                        ) : (
                            <>
                                <i className="fas fa-wand-magic-sparkles"></i>
                                {uiLabels.generate[currentLang]}
                            </>
                        )}
                    </button>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUpload;