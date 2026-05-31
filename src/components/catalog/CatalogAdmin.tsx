import React, { useEffect, useState } from 'react';
import { Boxes, ListChecks, Type, Plus, Trash2, Settings2 } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { api } from '../../api/client';
import { TEXT_TYPE_LABELS } from './CatalogPicker';
import { TEXT_BLOCK_TYPES } from '../../../shared';
import type { CatalogItem, ScopeBlock, TextBlock, TextBlockType } from '../../../shared';

type Tab = 'items' | 'scope' | 'text';

interface CatalogAdminProps {
  isDarkMode?: boolean;
  onClose: () => void;
}

export const CatalogAdmin: React.FC<CatalogAdminProps> = ({ isDarkMode = false, onClose }) => {
  const [tab, setTab] = useState<Tab>('items');
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [scope, setScope] = useState<ScopeBlock[]>([]);
  const [text, setText] = useState<TextBlock[]>([]);

  // formularios de alta
  const [newDesc, setNewDesc] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newScopeItems, setNewScopeItems] = useState('');
  const [newType, setNewType] = useState<TextBlockType>('clause');
  const [newLabel, setNewLabel] = useState('');
  const [newValue, setNewValue] = useState('');

  const reloadItems = () => api.catalogItems.list().then(setItems);
  const reloadScope = () => api.scopeBlocks.list().then(setScope);
  const reloadText = () => api.textBlocks.list().then(setText);

  useEffect(() => {
    void reloadItems();
    void reloadScope();
    void reloadText();
  }, []);

  const input = `border rounded-xl p-2 text-xs outline-none focus:ring-2 focus:ring-primary ${
    isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200'
  }`;
  const card = isDarkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50';

  const tabBtn = (id: Tab, label: string, icon: React.ReactNode) => (
    <button
      onClick={() => setTab(id)}
      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
        tab === id ? 'bg-primary/15 text-primary' : isDarkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'
      }`}
    >
      {icon}
      {label}
    </button>
  );

  const AddBtn: React.FC<{ onClick: () => void; disabled?: boolean }> = ({ onClick, disabled }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-3 py-2 rounded-xl bg-primary text-white text-xs font-bold flex items-center gap-1.5 disabled:opacity-40 hover:brightness-110 transition-all"
    >
      <Plus className="w-4 h-4" /> Agregar
    </button>
  );

  const DelBtn: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button onClick={onClick} className="p-1.5 text-red-400 hover:text-red-600 transition-colors shrink-0">
      <Trash2 className="w-4 h-4" />
    </button>
  );

  return (
    <Modal
      title="Administrar catálogo"
      icon={<Settings2 className="w-5 h-5 text-primary" />}
      onClose={onClose}
      isDarkMode={isDarkMode}
    >
      <div className="flex gap-2 mb-4">
        {tabBtn('items', 'Conceptos', <Boxes className="w-4 h-4" />)}
        {tabBtn('scope', 'Alcance', <ListChecks className="w-4 h-4" />)}
        {tabBtn('text', 'Textos', <Type className="w-4 h-4" />)}
      </div>

      {tab === 'items' && (
        <div className="space-y-3">
          <div className="flex gap-2 items-start">
            <textarea
              placeholder="Descripción del concepto"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className={`${input} flex-grow min-h-[44px] resize-none`}
            />
            <input
              type="number"
              placeholder="Precio"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              className={`${input} w-24`}
            />
            <AddBtn
              disabled={!newDesc.trim()}
              onClick={async () => {
                await api.catalogItems.create({ description: newDesc, price: Number(newPrice) || 0 });
                setNewDesc('');
                setNewPrice('');
                await reloadItems();
              }}
            />
          </div>
          {items.map((it) => (
            <div key={it.id} className={`flex items-center gap-2 p-3 border rounded-xl ${card}`}>
              <span className="text-xs whitespace-pre-line flex-grow">{it.description}</span>
              <span className="text-[11px] font-bold text-primary">${it.price.toLocaleString('es-MX')}</span>
              <DelBtn onClick={async () => { await api.catalogItems.remove(it.id); await reloadItems(); }} />
            </div>
          ))}
        </div>
      )}

      {tab === 'scope' && (
        <div className="space-y-3">
          <div className="flex flex-col gap-2 p-3 border rounded-xl border-dashed">
            <input
              placeholder="Título de la sección"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className={input}
            />
            <textarea
              placeholder="Un elemento por línea"
              value={newScopeItems}
              onChange={(e) => setNewScopeItems(e.target.value)}
              className={`${input} min-h-[60px] resize-none`}
            />
            <div className="self-end">
              <AddBtn
                disabled={!newTitle.trim()}
                onClick={async () => {
                  const list = newScopeItems.split('\n').map((s) => s.trim()).filter(Boolean);
                  await api.scopeBlocks.create({ title: newTitle, items: list });
                  setNewTitle('');
                  setNewScopeItems('');
                  await reloadScope();
                }}
              />
            </div>
          </div>
          {scope.map((s) => (
            <div key={s.id} className={`flex items-center gap-2 p-3 border rounded-xl ${card}`}>
              <div className="flex-grow">
                <p className="text-xs font-bold">{s.title}</p>
                <p className="text-[10px] text-slate-400">{s.items.length} elementos</p>
              </div>
              <DelBtn onClick={async () => { await api.scopeBlocks.remove(s.id); await reloadScope(); }} />
            </div>
          ))}
        </div>
      )}

      {tab === 'text' && (
        <div className="space-y-3">
          <div className="flex gap-2 items-start flex-wrap">
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value as TextBlockType)}
              className={`${input} w-36`}
            >
              {TEXT_BLOCK_TYPES.map((t) => (
                <option key={t} value={t}>
                  {TEXT_TYPE_LABELS[t]}
                </option>
              ))}
            </select>
            <input
              placeholder="Texto / servicio"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              className={`${input} flex-grow`}
            />
            {newType === 'addon' && (
              <input
                placeholder="Costo"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className={`${input} w-28`}
              />
            )}
            <AddBtn
              disabled={!newLabel.trim()}
              onClick={async () => {
                await api.textBlocks.create({
                  type: newType,
                  label: newLabel,
                  value: newType === 'addon' ? newValue : null,
                });
                setNewLabel('');
                setNewValue('');
                await reloadText();
              }}
            />
          </div>
          {text.map((t) => (
            <div key={t.id} className={`flex items-center gap-2 p-3 border rounded-xl ${card}`}>
              <div className="flex-grow min-w-0">
                <span className="text-[9px] font-bold uppercase tracking-wider text-primary">
                  {TEXT_TYPE_LABELS[t.type]}
                </span>
                <p className="text-xs truncate">{t.label}</p>
                {t.value && <p className="text-[10px] text-slate-400">{t.value}</p>}
              </div>
              <DelBtn onClick={async () => { await api.textBlocks.remove(t.id); await reloadText(); }} />
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
};
