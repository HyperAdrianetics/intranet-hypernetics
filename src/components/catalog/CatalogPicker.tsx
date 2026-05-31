import React, { useEffect, useState } from 'react';
import { Boxes, Plus, ListChecks, Type } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { api } from '../../api/client';
import type { CatalogItem, ScopeBlock, TextBlock, TextBlockType } from '../../../shared';

export const TEXT_TYPE_LABELS: Record<TextBlockType, string> = {
  clause: 'Cláusula',
  addon: 'Add-on',
  payment_condition: 'Condición de pago',
  not_included: 'No incluye',
};

type Tab = 'items' | 'scope' | 'text';

interface CatalogPickerProps {
  isDarkMode?: boolean;
  onClose: () => void;
  onInsertItem: (item: CatalogItem) => void;
  onInsertScope: (block: ScopeBlock) => void;
  onInsertText: (block: TextBlock) => void;
}

export const CatalogPicker: React.FC<CatalogPickerProps> = ({
  isDarkMode = false,
  onClose,
  onInsertItem,
  onInsertScope,
  onInsertText,
}) => {
  const [tab, setTab] = useState<Tab>('items');
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [scope, setScope] = useState<ScopeBlock[]>([]);
  const [text, setText] = useState<TextBlock[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([api.catalogItems.list(), api.scopeBlocks.list(), api.textBlocks.list()])
      .then(([i, s, t]) => {
        setItems(i);
        setScope(s);
        setText(t);
      })
      .catch(() => setError('No se pudo cargar el catálogo.'));
  }, []);

  const tabBtn = (id: Tab, label: string, icon: React.ReactNode) => (
    <button
      onClick={() => setTab(id)}
      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
        tab === id
          ? 'bg-primary/15 text-primary'
          : isDarkMode
            ? 'text-slate-400 hover:bg-slate-800'
            : 'text-slate-500 hover:bg-slate-100'
      }`}
    >
      {icon}
      {label}
    </button>
  );

  const card = isDarkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50';

  return (
    <Modal
      title="Agregar del catálogo"
      icon={<Boxes className="w-5 h-5 text-primary" />}
      onClose={onClose}
      isDarkMode={isDarkMode}
    >
      <div className="flex gap-2 mb-4">
        {tabBtn('items', 'Conceptos', <Boxes className="w-4 h-4" />)}
        {tabBtn('scope', 'Alcance', <ListChecks className="w-4 h-4" />)}
        {tabBtn('text', 'Textos', <Type className="w-4 h-4" />)}
      </div>

      {error && <p className="text-xs text-red-500 mb-3">{error}</p>}

      {tab === 'items' && (
        <div className="space-y-2">
          {items.length === 0 && <Empty />}
          {items.map((it) => (
            <Row key={it.id} className={card} onAdd={() => onInsertItem(it)}>
              <span className="text-xs whitespace-pre-line">{it.description}</span>
              <span className="text-[11px] font-bold text-primary ml-2 shrink-0">
                ${it.price.toLocaleString('es-MX')}
              </span>
            </Row>
          ))}
        </div>
      )}

      {tab === 'scope' && (
        <div className="space-y-2">
          {scope.length === 0 && <Empty />}
          {scope.map((s) => (
            <Row key={s.id} className={card} onAdd={() => onInsertScope(s)}>
              <div>
                <p className="text-xs font-bold">{s.title}</p>
                <p className="text-[10px] text-slate-400">{s.items.length} elementos</p>
              </div>
            </Row>
          ))}
        </div>
      )}

      {tab === 'text' && (
        <div className="space-y-2">
          {text.length === 0 && <Empty />}
          {text.map((t) => (
            <Row key={t.id} className={card} onAdd={() => onInsertText(t)}>
              <div className="min-w-0">
                <span className="text-[9px] font-bold uppercase tracking-wider text-primary">
                  {TEXT_TYPE_LABELS[t.type]}
                </span>
                <p className="text-xs truncate">{t.label}</p>
                {t.value && <p className="text-[10px] text-slate-400">{t.value}</p>}
              </div>
            </Row>
          ))}
        </div>
      )}
    </Modal>
  );
};

const Empty = () => <p className="text-xs text-slate-400 py-6 text-center">Catálogo vacío.</p>;

const Row: React.FC<{ className: string; onAdd: () => void; children: React.ReactNode }> = ({
  className,
  onAdd,
  children,
}) => (
  <div className={`flex items-center justify-between gap-2 p-3 border rounded-xl ${className}`}>
    <div className="flex items-center justify-between gap-2 flex-grow min-w-0">{children}</div>
    <button
      onClick={onAdd}
      title="Agregar a la cotización"
      className="p-1.5 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors shrink-0"
    >
      <Plus className="w-4 h-4" />
    </button>
  </div>
);
