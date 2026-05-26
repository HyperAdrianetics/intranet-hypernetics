import React from "react";
import type { QuoteData, LineItem } from "../types/quote";
import { HYPERNETICS_TEMPLATES } from "../types/quote";
import {
  Plus,
  Trash2,
  Download,
  RefreshCcw,
  Copy,
  Type,
  FileText,
  User,
  Layers,
  Sparkles,
  FilePlus2,
} from "lucide-react";

interface SidebarProps {
  data: QuoteData;
  updateQuote: (newData: Partial<QuoteData>) => void;
  resetQuote: () => void;
  duplicateQuote: () => void;
  exportPdf: () => void;
  isDarkMode?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  data,
  updateQuote,
  resetQuote,
  duplicateQuote,
  exportPdf,
  isDarkMode = false,
}) => {
  const handleItemChange = (
    id: string,
    field: keyof LineItem,
    value: string | number,
  ) => {
    const newItems = data.items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item,
    );
    updateQuote({ items: newItems });
  };

  const addItem = () => {
    const newItem: LineItem = {
      id: Math.random().toString(36).substr(2, 9),
      description: "Nuevo concepto\nDescripción detallada",
      quantity: 1,
      price: 0,
    };
    updateQuote({ items: [...data.items, newItem] });
  };

  const removeItem = (id: string) => {
    updateQuote({ items: data.items.filter((item) => item.id !== id) });
  };

  const applyTemplate = (templateId: string) => {
    const template = HYPERNETICS_TEMPLATES.find(
      (t) => t.id === templateId,
    ) as unknown as QuoteData;
    if (template) {
      updateQuote({
        packageName: template.packageName,
        clientName: template.clientName,
        company: template.company,
        deliveryTime: template.deliveryTime,
        note: template.note || "",
        items: template.items,
        showItemPrices: template.showItemPrices ?? false,
        scope: template.scope || [],
        notIncluded: template.notIncluded || [],
        milestones: template.milestones || [],
        platformCost: template.platformCost,
        portfolio: template.portfolio || [],
        paymentConditions: template.paymentConditions || [],
        addons: template.addons || [],
        clauses: template.clauses || data.clauses,
      });
    }
  };

  return (
    <div
      className={`w-96 border-r h-screen overflow-y-auto p-6 flex flex-col gap-8 no-print transition-colors ${isDarkMode ? "bg-[#0f111a] border-slate-800" : "bg-white border-slate-200"}`}
    >
      <div className="flex items-center justify-between">
        <h2
          className={`text-xl font-bold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-800"}`}
        >
          <FileText className="w-5 h-5 text-primary" />
          Editor de Cotización
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={resetQuote}
            title="Nueva Cotización"
            className={`font-medium py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-all ${isDarkMode ? "bg-slate-800 hover:bg-slate-700 text-slate-300" : "bg-slate-100 hover:bg-slate-200 text-slate-700"}`}
          >
            <FilePlus2 className="w-4 h-4" />
          </button>
          <button
            onClick={duplicateQuote}
            title="Duplicar (Nuevo Folio)"
            className={`font-medium py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-all ${isDarkMode ? "bg-slate-800 hover:bg-slate-700 text-slate-300" : "bg-slate-100 hover:bg-slate-200 text-slate-700"}`}
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={resetQuote}
            title="Restablecer valores"
            className={`font-medium py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-all ${isDarkMode ? "bg-slate-800 hover:bg-slate-700 text-slate-300" : "bg-slate-100 hover:bg-slate-200 text-slate-700"}`}
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <section className="space-y-4">
        <h3
          className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}
        >
          <Sparkles className="w-4 h-4" />
          Plantillas Hypernetics
        </h3>
        <div className="grid grid-cols-1 gap-2">
          {HYPERNETICS_TEMPLATES.map((template) => (
            <button
              key={template.id}
              onClick={() => applyTemplate(template.id)}
              className={`text-left p-3 rounded-xl border text-xs transition-all ${
                data.packageName.includes(template.id) ||
                data.packageName.includes(template.name.split("— ")[1])
                  ? "border-primary bg-primary/10 text-primary font-bold"
                  : isDarkMode
                    ? "border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700"
                    : "border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200"
              }`}
            >
              {template.name}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3
          className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}
        >
          <User className="w-4 h-4" />
          Información General
        </h3>
        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">
              Título del Paquete
            </label>
            <input
              type="text"
              value={data.packageName}
              onChange={(e) => updateQuote({ packageName: e.target.value })}
              className={`w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all ${isDarkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-200"}`}
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">
              Nombre del Cliente
            </label>
            <input
              type="text"
              value={data.clientName}
              onChange={(e) => updateQuote({ clientName: e.target.value })}
              className={`w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all ${isDarkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-200"}`}
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">
              Empresa
            </label>
            <input
              type="text"
              value={data.company}
              onChange={(e) => updateQuote({ company: e.target.value })}
              className={`w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all ${isDarkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-200"}`}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">
                Folio
              </label>
              <input
                type="text"
                value={data.folio}
                onChange={(e) => updateQuote({ folio: e.target.value })}
                className={`w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all ${isDarkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-200"}`}
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">
                Fecha
              </label>
              <input
                type="text"
                value={data.date}
                onChange={(e) => updateQuote({ date: e.target.value })}
                className={`w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all ${isDarkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-200"}`}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3
            className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}
          >
            <Layers className="w-4 h-4" />
            Conceptos
          </h3>
          <button
            onClick={addItem}
            className="p-1.5 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-4">
          {data.items.map((item) => (
            <div
              key={item.id}
              className={`p-4 border rounded-2xl space-y-3 relative group transition-all ${isDarkMode ? "bg-slate-900/40 border-slate-800" : "bg-slate-50 border-slate-100 hover:bg-white hover:shadow-lg hover:shadow-slate-100"}`}
            >
              <button
                onClick={() => removeItem(item.id)}
                className="absolute -top-2 -right-2 p-1.5 bg-red-100 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-20"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <textarea
                value={item.description}
                onChange={(e) =>
                  handleItemChange(item.id, "description", e.target.value)
                }
                className={`w-full border rounded-xl p-3 text-xs focus:ring-2 focus:ring-primary outline-none min-h-[70px] resize-none transition-all ${isDarkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-200 text-slate-800"}`}
                placeholder="Descripción del concepto"
              />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">
                    Cantidad
                  </label>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(
                        item.id,
                        "quantity",
                        parseFloat(e.target.value),
                      )
                    }
                    className={`w-full border rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-primary outline-none transition-all ${isDarkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-200"}`}
                  />
                </div>
                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">
                    Precio Unit.
                  </label>
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) =>
                      handleItemChange(
                        item.id,
                        "price",
                        parseFloat(e.target.value),
                      )
                    }
                    className={`w-full border rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-primary outline-none transition-all ${isDarkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-200"}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/*
      <section className="space-y-4">
        <h3
          className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}
        >
          <Palette className="w-4 h-4" />
          Personalización
        </h3>
        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">
              Logo de Empresa
            </label>
            <div className="flex items-center gap-3">
              {data.logo && (
                <img
                  src={data.logo}
                  alt="Preview"
                  className="w-12 h-12 object-contain border border-slate-200 rounded-xl p-2 bg-white"
                />
              )}
              <label className="flex-grow">
                <div
                  className={`flex items-center justify-center gap-2 px-3 py-3 border-2 border-dashed rounded-xl text-xs transition-all cursor-pointer ${isDarkMode ? "border-slate-800 text-slate-500 hover:border-primary hover:text-primary" : "border-slate-200 text-slate-400 hover:border-primary hover:text-primary"}`}
                >
                  <ImageIcon className="w-4 h-4" />
                  {data.logo ? "Cambiar logo" : "Subir logo"}
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleLogoUpload}
                />
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">
                Color Primario
              </label>
              <input
                type="color"
                value={data.colors.primary}
                onChange={(e) =>
                  updateQuote({
                    colors: { ...data.colors, primary: e.target.value },
                  })
                }
                className="w-full h-12 rounded-xl cursor-pointer border-none p-0 overflow-hidden"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">
                Color Secundario
              </label>
              <input
                type="color"
                value={data.colors.secondary}
                onChange={(e) =>
                  updateQuote({
                    colors: { ...data.colors, secondary: e.target.value },
                  })
                }
                className="w-full h-12 rounded-xl cursor-pointer border-none p-0 overflow-hidden"
              />
            </div>
          </div>
        </div>
      </section>
      */}

      <div
        className="flex items-center gap-3 p-3 border rounded-xl border-dashed cursor-pointer hover:border-primary transition-all"
        onClick={() =>
          updateQuote({ showItemPrices: !data.showItemPrices })
        }
      >
        <input
          type="checkbox"
          checked={data.showItemPrices}
          onChange={(e) =>
            updateQuote({ showItemPrices: e.target.checked })
          }
          className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
        />
        <span
          className={`text-xs font-bold ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}
        >
          Mostrar precios por concepto
        </span>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3
            className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}
          >
            <FileText className="w-4 h-4" />
            Cláusulas
          </h3>
          <button
            onClick={() =>
              updateQuote({ clauses: [...data.clauses, "Nueva cláusula"] })
            }
            className="p-1.5 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-2">
          {data.clauses.map((clause, index) => (
            <div key={index} className="flex gap-2 group">
              <textarea
                value={clause}
                onChange={(e) => {
                  const newClauses = [...data.clauses];
                  newClauses[index] = e.target.value;
                  updateQuote({ clauses: newClauses });
                }}
                className={`flex-grow border rounded-xl p-2 text-[10px] focus:ring-2 focus:ring-primary outline-none min-h-[50px] resize-none transition-all ${isDarkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-200 text-slate-600"}`}
              />
              <button
                onClick={() => {
                  const newClauses = data.clauses.filter((_, i) => i !== index);
                  updateQuote({ clauses: newClauses });
                }}
                className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:text-red-600 transition-all self-center"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4 pb-10">
        <h3
          className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}
        >
          <Type className="w-4 h-4" />
          Textos Adicionales
        </h3>
        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">
              Tiempo de entrega
            </label>
            <textarea
              value={data.deliveryTime}
              onChange={(e) => updateQuote({ deliveryTime: e.target.value })}
              className={`w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary outline-none min-h-[100px] resize-none transition-all ${isDarkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-200"}`}
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">
              Nota importante
            </label>
            <textarea
              value={data.note || ""}
              onChange={(e) => updateQuote({ note: e.target.value })}
              className={`w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary outline-none min-h-[80px] resize-none transition-all ${isDarkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-200"}`}
              placeholder="Ej: La cotización no incluye..."
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">
              Observaciones (IVA, etc)
            </label>
            <input
              type="text"
              value={data.observations}
              onChange={(e) => updateQuote({ observations: e.target.value })}
              className={`w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all ${isDarkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-200"}`}
            />
          </div>
        </div>
      </section>

      <button
        onClick={exportPdf}
        className="w-full bg-primary hover:brightness-110 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 active:scale-95"
      >
        <Download className="w-5 h-5" />
        Exportar PDF
      </button>
    </div>
  );
};
