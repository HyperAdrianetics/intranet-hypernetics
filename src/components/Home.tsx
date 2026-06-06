import { Link } from "react-router-dom";
import { FileText, Sparkles, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full min-w-screen min-h-screen bg-gradient-to-br from-[#0A1320] via-[#121B28] to-[#0A1320] text-white grid grid-rows-[auto_1fr_auto] p-6 relative overflow-hidden font-sans">
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(183,249,208,0.06),transparent_40%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      {/* TOP HEADER */}
      <header className="w-full flex justify-between items-center py-4 z-10">
        <div className="flex items-center gap-3">
          <img
            src="https://hypernetics.com.mx/_next/static/media/hypernetics-logo.7eda4e55.svg"
            alt="Hypernetics"
            className="h-6 md:h-7 opacity-85"
          />
        </div>
        <div className="text-xs text-[#B7F9D0]/70 font-semibold bg-[#B7F9D0]/5 px-3 py-1.5 rounded-full border border-[#B7F9D0]/10">
          v1.0.0 Internal
        </div>
      </header>

      {/* MAIN HERO & CALL TO ACTION */}
      <main className="w-full flex flex-col items-center justify-center text-center z-10">
       

        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-[#DDE7E2] to-[#B7F9D0] mb-4">
          Hypernetics Portal
        </h1>
        
        <p className="text-slate-400 max-w-xl text-sm md:text-base mb-12 leading-relaxed">
          Bienvenido al centro interno de herramientas. Crea y administra cotizaciones profesionales para clientes o consulta los recursos y guías de identidad corporativa.
        </p>

        {/* NAVIGATION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          
          {/* CARD 1: COTIZADOR */}
          <Link
            to="/cotizador"
            className="group relative text-left p-8 rounded-2xl bg-[#111A27]/60 border border-slate-800/80 hover:border-[#B7F9D0]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(183,249,208,0.05)] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(183,249,208,0.08),transparent_70%)] pointer-events-none" />
            
            <div className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center mb-6 group-hover:bg-[#B7F9D0]/10 border border-slate-700/50 group-hover:border-[#B7F9D0]/20 transition-all">
              <FileText className="w-6 h-6 text-slate-400 group-hover:text-[#B7F9D0] transition-colors" />
            </div>
            
            <h2 className="text-xl font-bold text-white group-hover:text-[#B7F9D0] transition-colors flex items-center gap-2 mb-2">
              Cotizador
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </h2>
            
            <p className="text-slate-400 text-sm leading-relaxed">
              Herramienta de edición interactiva para cotizar paquetes de software. Exportación a PDF con formato carta y catálogo reutilizable.
            </p>
          </Link>

          {/* CARD 2: MOOD BOARD */}
          <Link
            to="/moodboard"
            className="group relative text-left p-8 rounded-2xl bg-[#111A27]/60 border border-slate-800/80 hover:border-[#0096C7]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,150,199,0.05)] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(0,150,199,0.08),transparent_70%)] pointer-events-none" />
            
            <div className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center mb-6 group-hover:bg-[#0096C7]/10 border border-slate-700/50 group-hover:border-[#0096C7]/20 transition-all">
              <Sparkles className="w-6 h-6 text-slate-400 group-hover:text-[#0096C7] transition-colors" />
            </div>
            
            <h2 className="text-xl font-bold text-white group-hover:text-[#0096C7] transition-colors flex items-center gap-2 mb-2">
              Branding Mood Board
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </h2>
            
            <p className="text-slate-400 text-sm leading-relaxed">
              Panel visual de identidad corporativa. Revisa paletas de colores, especificaciones tipográficas, logotipos y estilos visuales de la marca.
            </p>
          </Link>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full flex flex-col sm:flex-row justify-between items-center py-6 border-t border-slate-800/60 text-slate-500 text-xs z-10 gap-2">
        <p>© {new Date().getFullYear()} Hypernetics. Todos los derechos reservados.</p>
        <p className="hover:text-white transition-colors cursor-pointer">Documentación Interna</p>
      </footer>

    </div>
  );
}
