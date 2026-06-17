---
name: hypernetics-design-system
description: Design system oficial de Hypernetics — colores, tipografía, componentes, bordes, sombras, iconos y patrones de layout. Extraído del componente DesignSystem.tsx.
---

# Hypernetics Design System

Token primario: `primary-green` (#a7cf9e). Fondo oscuro: `background` (#13151e) → `primary-blue` (#191c29). Toda la app usa fondo dark con texto blanco/slate.

---

## Colores

### Paleta principal

| Token | Hex | Clase | Uso |
|---|---|---|---|
| `primary-green` | `#a7cf9e` | `bg-[#a7cf9e]` | Verde acento, botones, hover states, borders |
| `accent-yellow` | `#d2d2af` | `bg-[#d2d2af]` | Detalles secundarios |
| `background` | `#13151e` | `bg-[#13151e]` | Fondo general |
| `primary-blue` | `#191c29` | `bg-[#191c29]` | Fondo de cards, contenedores, sidebar |
| `secondary-blue` | `#383e58` | `bg-[#383e58]` | Fondo secundario |
| `white` | `#ffffff` | `bg-white` | Solo en light mode, fondos de elementos |

### Grises (Slate)

De `slate-50` (#f8fafc) a `slate-900` (#0f172a). Los más usados:
- `text-slate-400` (#94a3b8): texto body, labels, placeholders
- `text-slate-300` (#cbd5e1): texto secundario con más contraste
- `bg-slate-800` (#1e293b): fondos de botones slate, badges
- `bg-slate-900` (#0f172a): fondos de inputs, contenedores oscuros
- `border-slate-700` (#334155): borders de inputs y cards
- `border-slate-800` (#1e293b): borders de contenedores secundarios, code blocks

### Estados (Red)

- `bg-red-100` / `text-red-600`: botón destructivo (ej. Trash2 icon button)
- `bg-red-400` (#f87171): alertas
- `bg-red-600` (#dc2626): errores, danger states

---

## Tipografía

- **Primaria:** Inter (sans-serif). Usar `font-family` por defecto via Tailwind.
- **Código:** Geist Mono (`font-mono`). Solo para code blocks.

### Pesos
- `font-bold`: headings, labels, botones principales
- `font-semibold`: badges, secondary emphasis
- `font-medium`: secondary buttons
- `font-normal` (default): body text

### Tamaños
| Clase | Px | Uso |
|---|---|---|
| `text-[9px]` | 9px | Etiquetas, labels de colores en design system |
| `text-[10px]` | 10px | Labels de inputs (uppercase), metadata, badges |
| `text-xs` | 12px | Textos secundarios, badges, botones compactos |
| `text-sm` | 14px | Cuerpo general, botones, inputs, select |
| `text-base` | 16px | Cuerpo grande |
| `text-lg` | 18px | Subtítulos de cards |
| `text-xl` | 20px | Títulos de sección |
| `text-2xl` | 24px | Títulos grandes |
| `text-3xl` | 30px | Headings de typography section |
| `text-4xl` | 36px | Page title (Design System) |

### Headings
```tsx
<h1 className="text-primary-green text-2xl md:text-4xl xl:text-4xl font-bold uppercase tracking-wide">
  Design System
</h1>
```

### Body text
```tsx
<p className="text-primary-green/80 mt-3 max-w-xl">
  Digital transformation is a process...
</p>
```

### Code text
```tsx
<div className="bg-primary-blue p-4 rounded-xl text-sm font-mono border border-slate-800">
  <pre className="text-slate-300">{`const app = { name: "Hypernetics" }`}</pre>
</div>
```

---

## Botones

### Variantes

#### Primary (verde sólido — acción principal)
```tsx
<button className="bg-primary-green hover:brightness-110 text-background font-bold py-3 px-5 rounded-xl transition-all shadow-lg shadow-primary-green/20 active:scale-95 text-sm">
  <Download className="w-4 h-4 inline mr-2" />
  Primary
</button>
```

#### Secondary Outline (verde transparente)
```tsx
<button className="bg-primary-green/10 text-primary-green hover:bg-primary-green/20 font-medium py-3 px-5 rounded-xl transition-all border border-primary-green/20 active:scale-95 text-sm">
  <Plus className="w-4 h-4 inline mr-1.5" />
  Secondary Outline
</button>
```

#### Secondary Slate
```tsx
<button className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-3 px-5 rounded-xl transition-all text-sm">
  <Settings2 className="w-4 h-4 inline mr-1.5" />
  Secondary (Slate)
</button>
```

#### Disabled
```tsx
<button className="bg-slate-900/50 border border-slate-800 text-slate-400 font-medium py-3 px-5 rounded-xl transition-all text-sm cursor-not-allowed" disabled>
  Disabled
</button>
```

#### Compacto (icon-only)
```tsx
<button className="bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 px-3 rounded-xl text-xs flex items-center gap-1.5 transition-all">
  <FolderOpen className="w-4 h-4" />
</button>
```

#### Light mode (fondo claro)
```tsx
<button className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-3 rounded-xl text-xs flex items-center gap-1.5 transition-all">
  <Copy className="w-4 h-4" />
  Light mode
</button>
```

#### Destructivo
```tsx
<button className="bg-red-100 text-red-600 p-1.5 rounded-full transition-all hover:bg-red-200">
  <Trash2 className="w-3.5 h-3.5" />
</button>
```

### Estados (Normal / Hover-Active / Disabled)
```tsx
// Normal
<button className="bg-primary-green/10 text-primary-green font-bold py-2 px-4 rounded-xl text-xs border border-primary-green/20 active:scale-95 transition-all">
  <FileText className="w-4 h-4 inline mr-1.5" /> Normal
</button>

// Hover/Active
<button className="bg-primary-green text-background font-bold py-2 px-4 rounded-xl text-xs shadow-lg shadow-primary-green/20 active:scale-95 transition-all">
  <Check className="w-4 h-4 inline mr-1.5" /> Hover/Active
</button>

// Disabled
<button className="bg-slate-800/50 text-slate-600 font-bold py-2 px-4 rounded-xl text-xs cursor-not-allowed transition-all" disabled>
  Disabled
</button>
```

---

## Inputs & Formularios

### Text Input
```tsx
<div>
  <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">
    Label
  </label>
  <input
    type="text"
    defaultValue="Ejemplo"
    className="w-full border border-slate-700 bg-slate-900 text-white rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary-green outline-none transition-all"
  />
</div>
```

### Number Input
```tsx
<div>
  <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">
    Cantidad
  </label>
  <input
    type="number"
    defaultValue="42"
    className="w-full border border-slate-700 bg-slate-900 text-white rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary-green outline-none transition-all"
  />
</div>
```

### Textarea
```tsx
<div>
  <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">
    Descripción
  </label>
  <textarea
    defaultValue="Texto de ejemplo..."
    className="w-full border border-slate-700 bg-slate-900 text-white rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary-green outline-none min-h-[80px] resize-none transition-all"
  />
</div>
```

### Select
```tsx
<div>
  <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">
    Opción
  </label>
  <select
    className="w-full border border-slate-700 bg-slate-900 text-white rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary-green outline-none transition-all"
  >
    <option value="1">Opción uno</option>
  </select>
</div>
```

### Checkbox
```tsx
<label className="flex items-center gap-3 cursor-pointer">
  <input
    type="checkbox"
    className="w-4 h-4 rounded border-slate-600 text-primary-green focus:ring-primary-green bg-slate-900"
  />
  <span className="text-xs font-bold text-slate-300">Mostrar precios por concepto</span>
</label>
```

### Color Picker
```tsx
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
```

---

## Cards & Contenedores

### Glassmorphism Card
```tsx
<div className="relative p-6 rounded-2xl bg-primary-blue/60 border border-slate-800/80 hover:border-primary-green/50 transition-all duration-300 overflow-hidden group">
  {/* Glow decoration */}
  <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(210,210,175,0.08),transparent_70%)] pointer-events-none" />
  <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center mb-4 group-hover:bg-primary-green/10 border border-slate-700/50 transition-all">
    <FileText className="w-5 h-5 text-slate-400 group-hover:text-primary-green transition-colors" />
  </div>
  <h3 className="text-lg font-bold text-white group-hover:text-primary-green transition-colors flex items-center gap-2">
    Title
    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
  </h3>
  <p className="text-slate-400 text-sm mt-2 leading-relaxed">Description</p>
</div>
```

### Border Card (hover con sombra)
```tsx
<div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:bg-slate-900/60 hover:shadow-lg hover:shadow-black/20 transition-all">
  <h3 className="text-lg font-bold text-white mb-2">Title</h3>
  <p className="text-slate-400 text-sm leading-relaxed">Description</p>
  <div className="flex gap-2 mt-4">
    <span className="text-[10px] font-bold text-slate-500 bg-slate-800 px-2 py-1 rounded-lg">tag</span>
  </div>
</div>
```

### Border Accent (primary-green/50)
```tsx
<div className="border border-primary-green/50 rounded-xl p-6">
  <h3 className="text-lg font-bold text-primary-green mb-2">Title</h3>
  <p className="text-slate-400 text-sm leading-relaxed">Description</p>
  <div className="mt-4 pt-4 border-t border-primary-green/20">
    <span className="text-[10px] text-primary-green/70">border-primary-green/50 · rounded-xl</span>
  </div>
</div>
```

### Dashed Border Card
```tsx
<div className="p-4 rounded-xl bg-primary-blue/30 border border-dashed border-slate-700 hover:border-primary-green/50 transition-all cursor-pointer">
  <div className="flex items-center gap-3">
    <input type="checkbox" className="w-4 h-4 rounded border-slate-600 text-primary-green focus:ring-primary-green bg-slate-900" />
    <span className="text-xs font-bold text-slate-300">Dashed border card</span>
  </div>
</div>
```

---

## Badges & Pills

```tsx
// Green pill badge
<span className="text-xs text-primary-green/70 font-semibold bg-primary-green/5 px-3 py-1.5 rounded-full border border-primary-green/10">
  v1.0.0 Internal
</span>

// Slate badge (rectangular)
<span className="text-[10px] font-bold text-slate-500 bg-slate-800 px-2 py-1 rounded-lg">
  slate badge
</span>

// Uppercase label (sin fondo)
<span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-transparent">
  Uppercase label
</span>

// Active badge (green solid bg)
<span className="text-xs text-primary-green bg-primary-green/10 px-3 py-1.5 rounded-full font-semibold">
  Active
</span>

// Border pill
<span className="text-xs text-slate-400 bg-slate-800/50 px-3 py-1.5 rounded-full font-semibold border border-slate-700">
  Border pill
</span>

// Icon badge
<span className="text-[10px] font-bold bg-slate-800 text-slate-400 px-2 py-1 rounded-lg border border-slate-700 flex items-center gap-1">
  <Sparkles className="w-3 h-3" />
  Icon badge
</span>
```

---

## Bordes

### Border radius
| Clase | Uso |
|---|---|
| `rounded-md` | Elementos pequeños |
| `rounded-lg` | Badges, tags |
| `rounded-xl` | Inputs, buttons, cards (MÁS COMÚN) |
| `rounded-2xl` | Cards principales, contenedores |
| `rounded-full` | Pills, badges, icon buttons |

### Border colors
| Clase | Uso |
|---|---|
| `border-slate-800` | Defecto para contenedores y code blocks |
| `border-primary-green/50` | Contenedores principales, border accent |
| `border-primary-green/20` | Botones secondary outline, dividers |
| `border-primary-green/30` | Dividers headers |
| `border-dashed border-slate-700` | Drag zones, drop areas |

### Dividers
```tsx
<div className="border-b border-primary-green/30" />   {/* Header divider */}
<div className="border-b border-slate-800/60" />        {/* Section divider */}
<div className="border-t border-primary-green/10" />    {/* Footer divider */}
```

---

## Sombras

| Clase | Uso |
|---|---|
| `shadow-lg shadow-primary-green/20` | Botón primary, cards con glow verde |
| `shadow-md` | Cards con elevación sutil |
| `shadow-[0_0_30px_rgba(210,210,175,0.05)]` | Glow decorativo |

---

## Iconos

Librería: **lucide-react**. Tamaños estándar:
- `w-3.5 h-3.5`: iconos en botones destructivos
- `w-4 h-4`: inline con botones, icon badges, sidebar nav
- `w-5 h-5`: iconos en cards, headers de sección

```tsx
// Icon in button
<Download className="w-4 h-4 inline mr-2" />

// Icon in section header
<Palette className="w-5 h-5" />

// Icon in card
<FileText className="w-5 h-5 text-slate-400 group-hover:text-primary-green transition-colors" />
```

Iconos disponibles: ArrowLeft, ArrowRight, Palette, Type, Square, AlignLeft, FileText, Sparkles, Mail, Plus, Trash2, Download, Copy, RefreshCcw, Settings2, FolderOpen, ChevronDown, User, Boxes, Check, Sun, Moon, Image, Camera, Music, Zap, Globe, Star, Heart, Code, FileCode, Layers.

---

## Layout

```tsx
// Page container
<section className="min-h-screen min-w-screen bg-gradient-to-br from-background via-primary-blue to-background text-white p-4 md:p-8">
  <div className="mx-auto max-w-[1600px]">
    {/* border container */}
    <div className="border border-primary-green/50 rounded-xl p-5 lg:p-8">
```

```tsx
// Sidebar + Content layout (flex-row en lg+)
<div className="flex gap-8 flex-col lg:flex-row">
  <nav className="lg:w-48 shrink-0 space-y-1 lg:sticky lg:top-8 lg:self-start">
    {/* nav items */}
  </nav>
  <div className="flex-1 min-w-0 space-y-16">
    {/* content sections */}
  </div>
</div>
```

```tsx
// Grid layouts
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">   {/* 2 cols */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">   {/* 3 cols */}
<div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-3">  {/* icons grid */}
```

```tsx
// Nav sidebar item (active/inactive states)
<button className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
  active
    ? "bg-primary-green/10 text-primary-green font-bold"
    : "text-slate-400 hover:text-white hover:bg-white/5"
}`}>
  <Icon className="w-4 h-4 shrink-0" />
  Label
</button>
```

### Footer
```tsx
<div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4 border-t border-primary-green/10 pt-4">
  <img src="/logo.svg" alt="Hypernetics" className="h-12" />
  <p className="text-sm text-primary-green/80/70">© Hypernetics. All Rights Reserved.</p>
</div>
```

### Toast notification
```tsx
{toast && (
  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-primary-green text-background text-xs font-bold px-5 py-3 rounded-xl shadow-lg animate-pulse">
    Copiado: {toast}
  </div>
)}
```

---

## Patrones comunes

### Background gradient (páginas principales)
```tsx
bg-gradient-to-br from-background via-primary-blue to-background
```

### Scroll spy (sidebar active section)
```tsx
// En componente con scroll:
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
```

### Hover glow effect (card decoration)
```tsx
<div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(210,210,175,0.08),transparent_70%)] pointer-events-none" />
```

### Links (next/link)
```tsx
import { Link } from "next/link";
```

### External images
```tsx
<img src="https://hypernetics.com.mx/_next/static/media/hypernetics-logo.7eda4e55.svg" alt="Hypernetics" className="h-12" />
```
