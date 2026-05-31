import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  title: string;
  icon?: React.ReactNode;
  onClose: () => void;
  isDarkMode?: boolean;
  children: React.ReactNode;
}

/** Modal de control utilitario (no forma parte del documento/PDF). */
export const Modal: React.FC<ModalProps> = ({ title, icon, onClose, isDarkMode = false, children }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 no-print">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className={`relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border shadow-2xl p-6 ${
          isDarkMode ? 'bg-[#0f111a] border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold flex items-center gap-2">
            {icon}
            {title}
          </h2>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-xl transition-colors ${
              isDarkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'
            }`}
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
