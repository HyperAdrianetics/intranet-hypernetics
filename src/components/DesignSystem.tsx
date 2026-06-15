import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Palette,
  Type,
  Square,
  AlignLeft,
  Check,
  Sun,
  Moon,
  FileText,
  Sparkles,
  Mail,
  Boxes,
  Image,
  Camera,
  Music,
  Zap,
  Globe,
  Star,
  Heart,
  Code,
  FileCode,
  Layers,
  Plus,
  Trash2,
  Download,
  Copy,
  Settings2,
  FolderOpen,
  ChevronDown,
  RefreshCcw,
  User,
  ArrowRight,
} from "lucide-react";

const paletteColors = [
  { name: "Primary Green", hex: "#a7cf9e", className: "bg-[#a7cf9e]" },
  { name: "Accent Yellow", hex: "#d2d2af", className: "bg-[#d2d2af]" },
  { name: "Background", hex: "#13151e", className: "bg-[#13151e] border border-white/20" },
  { name: "Primary Blue", hex: "#191c29", className: "bg-[#191c29] border border-primary-green/50" },
  { name: "Secondary Blue", hex: "#383e58", className: "bg-[#383e58]" },
  { name: "White", hex: "#ffffff", className: "bg-white border border-slate-700" },
];

const grayScale = [
  { name: "Slate 50", hex: "#f8fafc", className: "bg-slate-50 border border-slate-300" },
  { name: "Slate 100", hex: "#f1f5f9", className: "bg-slate-100 border border-slate-300" },
  { name: "Slate 200", hex: "#e2e8f0", className: "bg-slate-200 border border-slate-300" },
  { name: "Slate 300", hex: "#cbd5e1", className: "bg-slate-300 border border-slate-300" },
  { name: "Slate 400", hex: "#94a3b8", className: "bg-slate-400" },
  { name: "Slate 500", hex: "#64748b", className: "bg-slate-500" },
  { name: "Slate 600", hex: "#475569", className: "bg-slate-600" },
  { name: "Slate 700", hex: "#334155", className: "bg-slate-700" },
  { name: "Slate 800", hex: "#1e293b", className: "bg-slate-800" },
  { name: "Slate 900", hex: "#0f172a", className: "bg-slate-900 border border-white/10" },
];

const redScale = [
  { name: "Red 100", hex: "#fee2e2", className: "bg-red-100" },
  { name: "Red 400", hex: "#f87171", className: "bg-red-400" },
  { name: "Red 600", hex: "#dc2626", className: "bg-red-600" },
];

type Section =
  | "colors"
  | "typography"
  | "buttons"
  | "inputs"
  | "cards"
  | "badges"
  | "borders"
  | "shadows"
  | "icons"
  | "codeblocks";

const sections: { id: Section; label: string; icon: typeof Palette }[] = [
  { id: "colors", label: "Colores", icon: Palette },
  { id: "typography", label: "Tipografía", icon: Type },
  { id: "buttons", label: "Botones", icon: Square },
  { id: "inputs", label: "Inputs", icon: AlignLeft },
  { id: "cards", label: "Cards", icon: FileText },
  { id: "badges", label: "Badges", icon: Sparkles },
  { id: "borders", label: "Bordes", icon: Boxes },
  { id: "shadows", label: "Sombras", icon: Sun },
  { id: "icons", label: "Iconos", icon: Code },
  { id: "codeblocks", label: "Code Blocks", icon: FileCode },
];

export default function DesignSystemPage() {
  const [activeSection, setActiveSection] = useState<Section>("colors");
  const [toast, setToast] = useState<string | null>(null);

  const copyColor = (name: string, hex: string) => {
    navigator.clipboard.writeText(hex);
    setToast(`${name} (${hex})`);
    setTimeout(() => setToast(null), 2000);
  };

  const scrollTo = (id: Section) => {
    setActiveSection(id);
    document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: "smooth" });
  };

  const sectionIds: Section[] = sections.map((s) => s.id);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY + 150;
    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const el = document.getElementById(`section-${sectionIds[i]}`);
      if (el && el.offsetTop <= scrollY) {
        setActiveSection(sectionIds[i]);
        return;
      }
    }
    setActiveSection(sectionIds[0]);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section className="min-h-screen min-w-screen bg-gradient-to-br from-background via-primary-blue to-background text-white p-4 md:p-8">
      <div className="mx-auto max-w-[1600px]">
        <div className="border border-primary-green/50 rounded-xl p-5 lg:p-8">
          {/* HEADER */}
          <div className="flex flex-col xl:flex-row justify-between gap-8">
            <div className="flex items-center gap-4">
              <Link to="/">
                <img
                  src="https://hypernetics.com.mx/_next/static/media/hypernetics-logo.7eda4e55.svg"
                  alt="Hypernetics"
                  className="h-12 cursor-pointer"
                />
              </Link>
            </div>
            <div>
              <h1 className="text-primary-green text-2xl md:text-4xl xl:text-4xl font-bold uppercase tracking-wide">
                Design System
              </h1>
            </div>
          </div>

          <div className="border-b border-primary-green/30 my-6" />

          {/* SIDEBAR NAV */}
          <div className="flex gap-8 flex-col lg:flex-row">
            <nav className="lg:w-48 shrink-0 space-y-1 lg:sticky lg:top-8 lg:self-start">
              {sections.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                      activeSection === s.id
                        ? "bg-primary-green/10 text-primary-green font-bold"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {s.label}
                  </button>
                );
              })}
            </nav>

            {/* CONTENT */}
            <div className="flex-1 min-w-0 space-y-16">
              {/* ===== COLORS ===== */}
              <section id="section-colors">
                <h2 className="text-primary-green text-xl font-bold mb-6 flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Colores
                </h2>

                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Paleta principal
                </h3>
                <div className="flex flex-wrap gap-4 mb-8">
                  {paletteColors.map((c) => (
                    <div
                      key={c.name}
                      className="text-center cursor-pointer"
                      onClick={() => copyColor(c.name, c.hex)}
                    >
                      <div className={`w-20 h-20 rounded-xl mx-auto transition-transform hover:scale-110 ${c.className}`} />
                      <p className="mt-2 text-xs font-semibold">{c.name}</p>
                      <p className="text-[10px] text-slate-400">{c.hex}</p>
                    </div>
                  ))}
                </div>

                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Grises (Slate)
                </h3>
                <div className="flex flex-wrap gap-4 mb-8">
                  {grayScale.map((c) => (
                    <div
                      key={c.name}
                      className="text-center cursor-pointer"
                      onClick={() => copyColor(c.name, c.hex)}
                    >
                      <div className={`w-16 h-16 rounded-lg mx-auto transition-transform hover:scale-110 ${c.className}`} />
                      <p className="mt-1.5 text-[10px] font-semibold">{c.name}</p>
                      <p className="text-[9px] text-slate-500">{c.hex}</p>
                    </div>
                  ))}
                </div>

                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Estados (Red)
                </h3>
                <div className="flex flex-wrap gap-4">
                  {redScale.map((c) => (
                    <div
                      key={c.name}
                      className="text-center cursor-pointer"
                      onClick={() => copyColor(c.name, c.hex)}
                    >
                      <div className={`w-16 h-16 rounded-lg mx-auto transition-transform hover:scale-110 ${c.className}`} />
                      <p className="mt-1.5 text-[10px] font-semibold">{c.name}</p>
                      <p className="text-[9px] text-slate-500">{c.hex}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ===== TYPOGRAPHY ===== */}
              <section id="section-typography">
                <h2 className="text-primary-green text-xl font-bold mb-6 flex items-center gap-2">
                  <Type className="w-5 h-5" />
                  Tipografía
                </h2>

                <div className="space-y-8">
                  <div>
                    <p className="text-sm text-primary-green/60 mb-3">
                      PRIMARY / HEADINGS
                    </p>
                    <h3 className="text-3xl font-bold">INTER</h3>
                    <div className="mt-4 space-y-2">
                      <p className="font-medium">Medium Medium</p>
                      <p className="font-bold">Bold Bold</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-primary-green/60 mb-2">
                      BODY TEXT
                    </p>
                    <h3 className="text-3xl">INTER</h3>
                    <p className="text-primary-green/80 mt-3 max-w-xl">
                      Digital transformation is a process to innovate, evolve and optimize modern businesses through software solutions and agile methodologies.
                    </p>
                    <p className="text-[10px] text-slate-500 mt-2">
                      Inter Regular · 14px · #94a3b8 (slate-400)
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-primary-green/60 mb-2">
                      CODE TEXT: GEIST MONO
                    </p>
                    <div className="bg-primary-blue p-4 rounded-xl text-sm font-mono border border-slate-800">
                      <pre className="text-slate-300">{`const app = {
  name: "Hypernetics",
  stack: "React + Node"
}`}</pre>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-slate-800 pt-6">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Tamaños de texto (clases utilitarias)
                  </h3>
                  <div className="space-y-2">
                    <p className="text-[9px] text-slate-400">text-[9px] — etiquetas / labels</p>
                    <p className="text-[10px] text-slate-400">text-[10px] — labels de inputs</p>
                    <p className="text-xs text-slate-400">text-xs (12px) — textos secundarios</p>
                    <p className="text-sm text-slate-400">text-sm (14px) — cuerpo general</p>
                    <p className="text-base text-slate-400">text-base (16px) — cuerpo grande</p>
                  </div>
                </div>
              </section>

              {/* ===== BUTTONS ===== */}
              <section id="section-buttons">
                <h2 className="text-primary-green text-xl font-bold mb-6 flex items-center gap-2">
                  <Square className="w-5 h-5" />
                  Botones
                </h2>

                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Variantes
                </h3>
                <div className="flex flex-wrap gap-3 mb-8">
                  <button className="bg-primary-green hover:brightness-110 text-background font-bold py-3 px-5 rounded-xl transition-all shadow-lg shadow-primary-green/20 active:scale-95 text-sm">
                    <Download className="w-4 h-4 inline mr-2" />
                    Primary (Exportar PDF)
                  </button>
                  <button className="bg-primary-green/10 text-primary-green hover:bg-primary-green/20 font-medium py-3 px-5 rounded-xl transition-all border border-primary-green/20 active:scale-95 text-sm">
                    <Plus className="w-4 h-4 inline mr-1.5" />
                    Secondary Outline
                  </button>
                  <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-3 px-5 rounded-xl transition-all text-sm">
                    <Settings2 className="w-4 h-4 inline mr-1.5" />
                    Secondary (Slate)
                  </button>
                  <button className="bg-slate-900/50 border border-slate-800 text-slate-400 font-medium py-3 px-5 rounded-xl transition-all text-sm" disabled>
                    Disabled
                  </button>
                </div>

                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Tamaños compactos (icon + text)
                </h3>
                <div className="flex flex-wrap gap-2">
                  <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 px-3 rounded-xl text-xs flex items-center gap-1.5 transition-all">
                    <FolderOpen className="w-4 h-4" />
                  </button>
                  <button className="bg-primary-green/10 text-primary-green hover:bg-primary-green/20 py-2 px-3 rounded-xl text-xs flex items-center gap-1.5 transition-all">
                    <Boxes className="w-4 h-4" />
                  </button>
                  <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 px-3 rounded-xl text-xs flex items-center gap-1.5 transition-all">
                    <Settings2 className="w-4 h-4" />
                  </button>
                  <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-3 rounded-xl text-xs flex items-center gap-1.5 transition-all">
                    <Copy className="w-4 h-4" />
                    Light mode
                  </button>
                </div>

                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mt-8 mb-3">
                  Estados
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button className="bg-primary-green/10 text-primary-green font-bold py-2 px-4 rounded-xl text-xs border border-primary-green/20 active:scale-95 transition-all">
                    <FileText className="w-4 h-4 inline mr-1.5" />
                    Normal
                  </button>
                  <button className="bg-primary-green text-background font-bold py-2 px-4 rounded-xl text-xs shadow-lg shadow-primary-green/20 active:scale-95 transition-all">
                    <Check className="w-4 h-4 inline mr-1.5" />
                    Hover/Active
                  </button>
                  <button className="bg-slate-800/50 text-slate-600 font-bold py-2 px-4 rounded-xl text-xs cursor-not-allowed transition-all">
                    Disabled
                  </button>
                  <button className="bg-red-100 text-red-600 p-1.5 rounded-full transition-all hover:bg-red-200">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </section>

              {/* ===== INPUTS ===== */}
              <section id="section-inputs">
                <h2 className="text-primary-green text-xl font-bold mb-6 flex items-center gap-2">
                  <AlignLeft className="w-5 h-5" />
                  Inputs & Formularios
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                      Text Input
                    </h3>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">
                        Label
                      </label>
                      <input
                        type="text"
                        defaultValue="Ejemplo de texto"
                        className="w-full border border-slate-700 bg-slate-900 text-white rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary-green outline-none transition-all"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                      Number Input
                    </h3>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">
                        Cantidad
                      </label>
                      <input
                        type="number"
                        defaultValue="42"
                        className="w-full border border-slate-700 bg-slate-900 text-white rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary-green outline-none transition-all"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                      Textarea
                    </h3>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">
                        Descripción
                      </label>
                      <textarea
                        defaultValue="Texto de ejemplo con múltiples líneas\npara mostrar el estilo del textarea."
                        className="w-full border border-slate-700 bg-slate-900 text-white rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary-green outline-none min-h-[80px] resize-none transition-all"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                      Select
                    </h3>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">
                        Opción
                      </label>
                      <select
                        defaultValue="1"
                        className="w-full border border-slate-700 bg-slate-900 text-white rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary-green outline-none transition-all"
                      >
                        <option value="1">Opción uno</option>
                        <option value="2">Opción dos</option>
                        <option value="3">Opción tres</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                      Checkbox
                    </h3>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 rounded border-slate-600 text-primary-green focus:ring-primary-green bg-slate-900"
                      />
                      <span className="text-xs font-bold text-slate-300">
                        Mostrar precios por concepto
                      </span>
                    </label>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                      Color Picker
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">
                          Primario
                        </label>
                        <input
                          type="color"
                          defaultValue="#a7cf9e"
                          className="w-full h-12 rounded-xl cursor-pointer border-none p-0 overflow-hidden"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">
                          Secundario
                        </label>
                        <input
                          type="color"
                          defaultValue="#191c29"
                          className="w-full h-12 rounded-xl cursor-pointer border-none p-0 overflow-hidden"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ===== CARDS ===== */}
              <section id="section-cards">
                <h2 className="text-primary-green text-xl font-bold mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Cards & Contenedores
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="relative p-6 rounded-2xl bg-primary-blue/60 border border-slate-800/80 hover:border-primary-green/50 transition-all duration-300 overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(210,210,175,0.08),transparent_70%)] pointer-events-none" />
                    <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center mb-4 group-hover:bg-primary-green/10 border border-slate-700/50 transition-all">
                      <FileText className="w-5 h-5 text-slate-400 group-hover:text-primary-green transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-primary-green transition-colors flex items-center gap-2">
                      Glassmorphism Card
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </h3>
                    <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                      Usada en la página de inicio para enlaces de navegación.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:bg-slate-900/60 hover:shadow-lg hover:shadow-black/20 transition-all">
                    <h3 className="text-lg font-bold text-white mb-2">Border Card</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Estilo usado para ítems de cotización. Hover eleva la tarjeta con sombra.
                    </p>
                    <div className="flex gap-2 mt-4">
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-800 px-2 py-1 rounded-lg">
                        border-slate-800
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-800 px-2 py-1 rounded-lg">
                        rounded-2xl
                      </span>
                    </div>
                  </div>

                  <div className="border border-primary-green/50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-primary-green mb-2">Border Accent</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Contenedor principal usado en MoodBoard y Design System. Borde primary-green/50.
                    </p>
                    <div className="mt-4 pt-4 border-t border-primary-green/20">
                      <span className="text-[10px] text-primary-green/70">
                        border-primary-green/50 · rounded-xl
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-primary-blue/30 border border-dashed border-slate-700 hover:border-primary-green/50 transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-600 text-primary-green focus:ring-primary-green bg-slate-900" />
                    <span className="text-xs font-bold text-slate-300">
                      Dashed border card (hover cambia a primary-green)
                    </span>
                  </div>
                </div>
              </section>

              {/* ===== BADGES ===== */}
              <section id="section-badges">
                <h2 className="text-primary-green text-xl font-bold mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Badges & Pills
                </h2>

                <div className="flex flex-wrap gap-3">
                  <span className="text-xs text-primary-green/70 font-semibold bg-primary-green/5 px-3 py-1.5 rounded-full border border-primary-green/10">
                    v1.0.0 Internal
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-800 px-2 py-1 rounded-lg">
                    slate badge
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-transparent">
                    Uppercase label
                  </span>
                  <span className="text-xs text-primary-green bg-primary-green/10 px-3 py-1.5 rounded-full font-semibold">
                    Active
                  </span>
                  <span className="text-xs text-slate-400 bg-slate-800/50 px-3 py-1.5 rounded-full font-semibold border border-slate-700">
                    Border pill
                  </span>
                  <span className="text-[10px] font-bold bg-slate-800 text-slate-400 px-2 py-1 rounded-lg border border-slate-700 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Icon badge
                  </span>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Label style (usado en inputs)
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">
                    Label uppercase 10px
                  </div>
                </div>
              </section>

              {/* ===== BORDERS ===== */}
              <section id="section-borders">
                <h2 className="text-primary-green text-xl font-bold mb-6 flex items-center gap-2">
                  <Boxes className="w-5 h-5" />
                  Bordes & Divisores
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                      Border Radius
                    </h3>
                    <div className="space-y-2">
                      <div className="h-12 w-24 bg-slate-800 rounded-md flex items-center justify-center text-[10px] text-slate-400">
                        rounded-md
                      </div>
                      <div className="h-12 w-24 bg-slate-800 rounded-lg flex items-center justify-center text-[10px] text-slate-400">
                        rounded-lg
                      </div>
                      <div className="h-12 w-24 bg-slate-800 rounded-xl flex items-center justify-center text-[10px] text-slate-400">
                        rounded-xl
                      </div>
                      <div className="h-12 w-24 bg-slate-800 rounded-2xl flex items-center justify-center text-[10px] text-slate-400">
                        rounded-2xl
                      </div>
                      <div className="h-12 w-24 bg-slate-800 rounded-full flex items-center justify-center text-[10px] text-slate-400">
                        rounded-full
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                      Border Styles
                    </h3>
                    <div className="space-y-2">
                      <div className="h-12 bg-slate-900 border border-slate-800 rounded-xl flex items-center px-3 text-[10px] text-slate-400">
                        border-slate-800
                      </div>
                      <div className="h-12 bg-slate-900 border border-primary-green/50 rounded-xl flex items-center px-3 text-[10px] text-primary-green/70">
                        border-primary-green/50
                      </div>
                      <div className="h-12 bg-slate-900 border border-primary-green/20 rounded-xl flex items-center px-3 text-[10px] text-primary-green/50">
                        border-primary-green/20
                      </div>
                      <div className="h-12 bg-slate-900 border border-dashed border-slate-700 rounded-xl flex items-center px-3 text-[10px] text-slate-400">
                        border-dashed border-slate-700
                      </div>
                      <div className="h-12 bg-slate-900 border border-primary-green/30 rounded-xl flex items-center px-3 text-[10px] text-primary-green/60">
                        border-primary-green/30
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                      Dividers
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-slate-400 mb-2">border-b border-primary-green/30</p>
                        <div className="border-b border-primary-green/30" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-2">border-b border-slate-800/60</p>
                        <div className="border-b border-slate-800/60" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-2">border-t border-primary-green/10</p>
                        <div className="border-t border-primary-green/10" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ===== SHADOWS ===== */}
              <section id="section-shadows">
                <h2 className="text-primary-green text-xl font-bold mb-6 flex items-center gap-2">
                  <Sun className="w-5 h-5" />
                  Sombras
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="h-24 bg-slate-900 rounded-xl flex items-center justify-center text-xs text-slate-400 shadow-lg shadow-primary-green/20 border border-slate-800">
                    shadow-lg shadow-primary-green/20
                  </div>
                  <div className="h-24 bg-slate-900 rounded-xl flex items-center justify-center text-xs text-slate-400 shadow-md border border-slate-800">
                    shadow-md
                  </div>
                  <div className="h-24 bg-slate-900 rounded-xl flex items-center justify-center text-xs text-slate-400 shadow-[0_0_30px_rgba(210,210,175,0.05)] border border-slate-800">
                    glow style
                  </div>
                </div>
              </section>

              {/* ===== ICONS ===== */}
              <section id="section-icons">
                <h2 className="text-primary-green text-xl font-bold mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Iconos
                </h2>
                <p className="text-sm text-slate-400 mb-6">
                  Librería: <span className="text-primary-green">lucide-react</span>
                </p>

                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Iconos usados en la app
                </h3>
                <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-3">
                  {[
                    FileText, Sparkles, Mail, Palette, Type, Square, AlignLeft,
                    Plus, Trash2, Download, Copy, RefreshCcw, Settings2,
                    FolderOpen, ChevronDown, User, ArrowRight, ArrowLeft,
                    Boxes, Check, Sun, Moon, Image, Camera, Music, Zap,
                    Globe, Star, Heart, Code, Layers,
                  ].map((Icon, i) => (
                    <div
                      key={i}
                      className="aspect-square border border-primary-green/30 rounded-xl flex items-center justify-center hover:bg-primary-green/10 transition-colors group"
                    >
                      <Icon className="w-5 h-5 text-primary-green/60 group-hover:text-primary-green transition-colors" />
                    </div>
                  ))}
                </div>
              </section>

              {/* ===== CODE BLOCKS ===== */}
              <section id="section-codeblocks">
                <h2 className="text-primary-green text-xl font-bold mb-6 flex items-center gap-2">
                  <FileCode className="w-5 h-5" />
                  Code Blocks
                </h2>

                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Bloque simple
                </h3>
                <div className="bg-primary-blue p-5 rounded-xl text-sm font-mono border border-slate-800 mb-8">
                  <pre className="text-slate-300 leading-relaxed">{`function greet(name: string) {
  return \`Hello, \${name}!\`;
}

console.log(greet("Hypernetics"));`}</pre>
                </div>

                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
                  JSON / config
                </h3>
                <div className="bg-primary-blue p-5 rounded-xl text-sm font-mono border border-slate-800 mb-8">
                  <pre className="text-slate-300 leading-relaxed">{`{
  "app": "Hypernetics",
  "version": "1.0.0",
  "stack": {
    "frontend": "React 19 + TypeScript",
    "backend": "Vercel serverless",
    "database": "Postgres + Prisma"
  }
}`}</pre>
                </div>

                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Bash / CLI
                </h3>
                <div className="bg-primary-blue p-5 rounded-xl text-sm font-mono border border-slate-800 mb-8">
                  <pre className="text-slate-300 leading-relaxed">{`$ pnpm install
$ docker compose up -d
$ pnpm db:migrate
$ pnpm dev

  ➜  Local:   http://localhost:5173/
  ➜  API:     http://localhost:3001/`}</pre>
                </div>

                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Inline code
                </h3>
                <p className="text-sm text-slate-400 mb-2">
                  Usa <code className="bg-primary-blue text-primary-green px-1.5 py-0.5 rounded text-xs font-mono border border-slate-800">{"<code>"}</code> para fragmentos inline como{' '}
                  <code className="bg-primary-blue text-primary-green px-1.5 py-0.5 rounded text-xs font-mono border border-slate-800">pnpm exec tsc -b</code>{' '}
                  o <code className="bg-primary-blue text-primary-green px-1.5 py-0.5 rounded text-xs font-mono border border-slate-800">border-primary-green/50</code>.
                </p>
              </section>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-center mt-8 mb-4 no-print">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-green bg-primary-green/10 hover:bg-primary-green/20 px-4 py-3 rounded-xl transition-all border border-primary-green/20 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Inicio
          </Link>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4 border-t border-primary-green/10 pt-4">
          <div className="flex items-center gap-3">
            <img
              src="https://hypernetics.com.mx/_next/static/media/hypernetics-logo.7eda4e55.svg"
              alt="Hypernetics"
              className="h-12"
            />
          </div>
          <p className="text-sm text-primary-green/80/70">
            © Hypernetics. All Rights Reserved.
          </p>
        </div>
      </div>

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-primary-green text-background text-xs font-bold px-5 py-3 rounded-xl shadow-lg animate-pulse">
          Copiado: {toast}
        </div>
      )}
    </section>
  );
}
