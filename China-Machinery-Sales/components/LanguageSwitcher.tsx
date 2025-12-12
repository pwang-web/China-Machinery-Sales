import React from 'react';
import { LANGUAGES } from '../constants';
import { Language } from '../types';

interface Props {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

const LanguageSwitcher: React.FC<Props> = ({ currentLang, onLanguageChange }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onLanguageChange(lang.code)}
          className={`
            flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap
            ${currentLang === lang.code 
              ? 'bg-yellow-500 text-slate-900 shadow-md ring-2 ring-yellow-300' 
              : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}
          `}
        >
          <span className="text-lg">{lang.flag}</span>
          <span>{lang.label}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;