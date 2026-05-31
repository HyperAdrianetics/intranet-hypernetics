import React from 'react';
import { FolderOpen, FilePlus2, Copy, Trash2, Check } from 'lucide-react';
import { Modal } from './ui/Modal';
import type { QuoteSummary } from '../../shared';

interface QuoteListProps {
  quotes: QuoteSummary[];
  currentId: string | null;
  isDarkMode?: boolean;
  onClose: () => void;
  onOpen: (id: string) => void;
  onNew: () => void;
  onDuplicate: () => void;
  onDelete: (id: string) => void;
}

export const QuoteList: React.FC<QuoteListProps> = ({
  quotes,
  currentId,
  isDarkMode = false,
  onClose,
  onOpen,
  onNew,
  onDuplicate,
  onDelete,
}) => {
  const card = isDarkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50';

  return (
    <Modal
      title="Cotizaciones"
      icon={<FolderOpen className="w-5 h-5 text-primary" />}
      onClose={onClose}
      isDarkMode={isDarkMode}
    >
      <div className="flex gap-2 mb-4">
        <button
          onClick={onNew}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        >
          <FilePlus2 className="w-4 h-4" /> Nueva
        </button>
        <button
          onClick={onDuplicate}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
            isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <Copy className="w-4 h-4" /> Duplicar actual
        </button>
      </div>

      <div className="space-y-2">
        {quotes.length === 0 && (
          <p className="text-xs text-slate-400 py-6 text-center">No hay cotizaciones guardadas.</p>
        )}
        {quotes.map((q) => (
          <div key={q.id} className={`flex items-center gap-2 p-3 border rounded-xl ${card}`}>
            <button onClick={() => onOpen(q.id)} className="flex-grow text-left min-w-0">
              <div className="flex items-center gap-2">
                {q.id === currentId && <Check className="w-3.5 h-3.5 text-primary shrink-0" />}
                <p className="text-xs font-bold truncate">
                  {q.folio} — {q.clientName || 'Sin cliente'}
                </p>
              </div>
              <p className="text-[10px] text-slate-400 truncate">
                {q.packageName} · {q.company} · {q.date}
              </p>
            </button>
            <button
              onClick={() => onDelete(q.id)}
              title="Borrar"
              className="p-1.5 text-red-400 hover:text-red-600 transition-colors shrink-0"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </Modal>
  );
};
