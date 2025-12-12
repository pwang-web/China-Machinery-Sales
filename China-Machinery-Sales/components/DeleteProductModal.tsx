import React, { useState, useEffect } from 'react';
import { Language, UILabels } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  currentLang: Language;
  uiLabels: UILabels;
}

const DeleteProductModal: React.FC<Props> = ({ isOpen, onClose, onConfirm, currentLang, uiLabels }) => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPasscode('');
      setError(false);
    }
  }, [isOpen]);

  const handleVerify = () => {
    if (passcode === '1111') {
      onConfirm();
    } else {
      setError(true);
    }
  };

  if (!isOpen) return null;

  const isRTL = currentLang === 'ar';

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm p-4">
      <div className={`bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 ${isRTL ? 'text-right font-arabic' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-red-600 flex items-center gap-2">
            <i className="fas fa-trash-alt"></i>
            {uiLabels.deleteProduct[currentLang]}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        <p className="text-slate-600 mb-6 font-medium">
          {uiLabels.deleteWarning[currentLang]}
        </p>

        <div className="mb-6">
           <label className="block text-sm font-bold text-slate-700 mb-2">{uiLabels.enterPasscode[currentLang]}</label>
           <input 
             type="password" 
             value={passcode}
             onChange={(e) => {
               setPasscode(e.target.value);
               setError(false);
             }}
             placeholder="1111"
             className={`w-full text-center text-2xl tracking-widest p-2 border-b-2 outline-none focus:border-red-500 transition-colors
               ${error ? 'border-red-500 text-red-600' : 'border-slate-300 text-slate-800'}
             `}
             autoFocus
             onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
           />
           {error && (
             <p className="text-red-500 text-sm mt-2 text-center">{uiLabels.incorrectPasscode[currentLang]}</p>
           )}
        </div>

        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-lg text-slate-600 font-medium hover:bg-slate-100 transition-colors"
          >
            {uiLabels.cancel[currentLang]}
          </button>
          <button 
            onClick={handleVerify}
            className="flex-1 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold shadow-md transition-colors"
          >
            {uiLabels.confirmDelete[currentLang]}
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeleteProductModal;