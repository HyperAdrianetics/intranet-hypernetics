import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Palette,
  Paintbrush,
  Sparkles,
  Image,
  Camera,
  Music,
  Zap,
  Globe,
  Star,
  Heart,
  Code,
  Layers,
} from "lucide-react";
import hero from "../assets/Hero.jpg";
import mood2 from "../assets/mood-2.jpg";
import mood3 from "../assets/mood-3.jpg";
import codeBg from "../assets/code-bg.jpg";
import abstract from "../assets/abstract.jpg";
import aws from "../assets/technologies/aws.svg";
import docker from "../assets/technologies/docker.svg";
import mongodb from "../assets/technologies/mongodb.svg";
import nextjs from "../assets/technologies/nextjs.svg";
import nodejs from "../assets/technologies/node-js.svg";
import postgresql from "../assets/technologies/postgresql.svg";
import python from "../assets/technologies/python.svg";
import react from "../assets/technologies/react.svg";
import reactnative from "../assets/technologies/reactnative.svg";
import typescript from "../assets/technologies/typescript.svg";

const paletteColors = [
  { name: "PRIMARY GREEN", hex: "#a7cf9e", className: "bg-[#a7cf9e]" },
  { name: "ACCENT YELLOW", hex: "#d2d2af", className: "bg-[#d2d2af]" },
  {
    name: "BACKGROUND",
    hex: "#13151e",
    className: "bg-[#13151e] border border-white/20",
  },
  {
    name: "PRIMARY BLUE",
    hex: "#191c29",
    className: "bg-[#191c29] border border-primary-green/50",
  },
  { name: "SECONDARY BLUE", hex: "#383e58", className: "bg-[#383e58]" },
];

export default function MoodBoard() {
  const [toast, setToast] = useState<string | null>(null);

  const copyColor = async (name: string, hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setToast(`${name} (${hex})`);
      setTimeout(() => setToast(null), 2000);
    } catch {
      setToast(null);
    }
  };

  return (
    <section className="min-h-screen min-w-screen bg-gradient-to-br from-background via-primary-blue to-background text-white p-4 md:p-8">
      <div className="mx-auto max-w-[1600px]">
        {/* NAVIGATION HEADER */}

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
                Moodboard de Identidad Corporativa
              </h1>
            </div>
          </div>

          <div className="border-b border-primary-green/30 my-6" />

          {/* CONTENT */}

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* ====================================== */}
            {/* MOOD */}
            {/* ====================================== */}

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-primary-green text-xl">1. THE MOOD</h2>

                <span className="text-sm text-primary-green/60">
                  Inter Medium
                </span>
              </div>

              <img
                src={hero}
                alt=""
                className="w-full h-[260px] object-cover"
              />

              <div className="grid grid-cols-2 gap-3">
                <img
                  src={mood2}
                  alt=""
                  className="h-[180px] w-full object-cover"
                />

                <img
                  src={mood3}
                  alt=""
                  className="h-[180px] w-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-xl leading-tight uppercase">
                  Transformamos tus ideas en soluciones digitales.
                </h3>

                <p className="text-primary-green/80 mt-2">
                  (Innovation, Precision, Modernity.)
                </p>

                <p className="text-sm text-primary-green/80/70 mt-1">
                  Inter Regular, HEX #d2d2af
                </p>
              </div>
            </div>

            {/* ====================================== */}
            {/* PALETTE */}
            {/* ====================================== */}

            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-primary-green text-xl">2. COLOR PALETTE</h2>

                <span className="text-sm text-primary-green/60">
                  Inter Medium
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {paletteColors.map((c) => (
                  <div
                    key={c.name}
                    className="text-center cursor-pointer"
                    onClick={() => copyColor(c.name, c.hex)}
                  >
                    <div
                      className={`w-20 h-20 rounded-full mx-auto transition-transform hover:scale-110 ${c.className}`}
                    />
                    <p className="mt-2 text-xs font-semibold">{c.name}</p>
                    <p className="text-[10px] text-slate-400">{c.hex}</p>
                  </div>
                ))}
              </div>

              {toast && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-primary-green text-background text-xs font-bold px-5 py-3 rounded-xl shadow-lg animate-pulse">
                  Copiado: {toast}
                </div>
              )}

              <img
                src={codeBg}
                alt=""
                className="w-full h-32 object-cover mt-6"
              />
            </div>

            {/* ====================================== */}
            {/* TYPOGRAPHY */}
            {/* ====================================== */}

            <div>
              <h2 className="text-primary-green text-xl mb-6">3. TYPOGRAPHY</h2>

              <div className="space-y-6">
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

                  <p className="text-primary-green/80 mt-3">
                    Digital transformation is a process to innovate, evolve and
                    optimize modern businesses through software solutions and
                    agile methodologies.
                  </p>
                </div>

                <div>
                  <p className="text-sm text-primary-green/60 mb-2">
                    CODE TEXT: GEIST MONO
                  </p>

                  <div className="bg-primary-blue p-4 rounded-lg text-sm font-mono border border-slate-800">
                    <pre>{`const app = {
  name: "Hypernetics",
  stack: "React + Node"
}`}</pre>
                  </div>
                </div>
              </div>
            </div>

            {/* ====================================== */}
            {/* ICONS */}
            {/* ====================================== */}

            <div>
              <h2 className="text-primary-green text-xl mb-2">
                4. GRAPHIC ELEMENTS & ICONS
              </h2>
              <p className="text-sm text-primary-green/60 mb-6 underline hover:text-primary-green transition-colors">
                <a href="https://lucide.dev/art" target="_blank">
                  Lucide Art icons
                </a>
              </p>

              <div className="grid grid-cols-4 gap-3">
                {[
                  Palette,
                  Paintbrush,
                  Sparkles,
                  Image,
                  Camera,
                  Music,
                  Zap,
                  Globe,
                  Star,
                  Heart,
                  Code,
                  Layers,
                ].map((Icon, index) => (
                  <div
                    key={index}
                    className="aspect-square border border-primary-green/30 rounded flex items-center justify-center text-xl hover:bg-primary-green/10 transition-colors group"
                  >
                    <Icon className="w-7 h-7 text-primary-green/60 group-hover:text-primary-green transition-colors" />
                  </div>
                ))}
              </div>

              <h2 className="text-primary-green text-xl mt-8 mb-6">
                5. TECHNOLOGY STACK ICONS
              </h2>

              <div className="grid grid-cols-4 gap-3 mt-6">
                {[
                  aws,
                  docker,
                  mongodb,
                  nextjs,
                  nodejs,
                  postgresql,
                  python,
                  react,
                  reactnative,
                  typescript,
                ].map((src, index) => (
                  <div
                    key={index}
                    className="aspect-square border border-primary-green/30 rounded flex items-center justify-center hover:bg-primary-green/10 transition-colors group"
                  >
                    <img
                      src={src}
                      alt=""
                      className="h-18 md:h-10 brightness-0 invert-[.7] group-hover:brightness-0 group-hover:invert transition-all"
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="bg-[linear-gradient(45deg,var(--color-secondary-blue),var(--color-background))] h-24 rounded" />

                <div
                  className="
                  h-24
                  bg-[linear-gradient(90deg,transparent_95%,var(--color-primary-green)_95%),linear-gradient(transparent_95%,var(--color-primary-green)_95%)]
                  bg-[size:18px_18px]
                  rounded
                "
                />

                <img
                  src={abstract}
                  alt=""
                  className="h-24 object-cover w-full rounded"
                />
              </div>
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
            <div className="flex items-center gap-4">
              <img
                src="https://hypernetics.com.mx/_next/static/media/hypernetics-logo.7eda4e55.svg"
                alt="Hypernetics"
                className="h-12 "
              />
            </div>
          </div>

          <p className="text-sm text-primary-green/80/70">
            © Hypernetics. All Rights Reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
