import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Palette, Paintbrush, Sparkles, Image, Camera, Music, Zap, Globe, Star, Heart, Code, Layers } from "lucide-react";
import mood1 from "../assets/mood-1.jpg";
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

export default function MoodBoard() {
  return (
    <section className="min-h-screen min-w-screen bg-gradient-to-br from-[#0A1320] via-[#18222F] to-[#0A1320] text-white p-4 md:p-8">
      <div className="mx-auto max-w-[1600px]">

        {/* NAVIGATION HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 pb-4 border-b border-[#B7F9D0]/10 no-print">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B7F9D0] bg-[#B7F9D0]/10 hover:bg-[#B7F9D0]/20 px-4 py-3 rounded-xl transition-all border border-[#B7F9D0]/20 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Inicio
          </Link>
         
        </div>

        <p className="text-[#B7F9D0] text-sm mb-3">
          Inter Bold
        </p>

        <div className="border border-[#B7F9D0]/50 rounded-xl p-5 lg:p-8">

          {/* HEADER */}

          <div className="flex flex-col xl:flex-row justify-between gap-8">

              <div className="flex items-center gap-4">

             <img
              src="https://hypernetics.com.mx/_next/static/media/hypernetics-logo.7eda4e55.svg"
              alt="Hypernetics"
              className="h-12 "
            />
            </div>

            <div>
              <h1 className="text-[#B7F9D0] text-2xl md:text-4xl xl:text-4xl font-bold uppercase tracking-wide">
               Moodboard de Identidad Corporativa
              </h1>

              <p className="mt-2 text-[#B7F9D0]/70">
                HEX #B7F9D0
              </p>
            </div>

          
          </div>

          <div className="border-b border-[#B7F9D0]/30 my-6" />

          {/* CONTENT */}

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">

            {/* ====================================== */}
            {/* MOOD */}
            {/* ====================================== */}

            <div className="space-y-4">

              <div className="flex justify-between items-center">
                <h2 className="text-[#B7F9D0] text-xl">
                  1. THE MOOD
                </h2>

                <span className="text-sm text-[#B7F9D0]/60">
                  Inter Medium
                </span>
              </div>

              <img
                src={mood1}
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

                <p className="text-[#D3E0D8] mt-2">
                  (Innovation, Precision, Modernity.)
                </p>

                <p className="text-sm text-[#D3E0D8]/70 mt-1">
                  Inter Regular, HEX #D3E0D8
                </p>
              </div>
            </div>

            {/* ====================================== */}
            {/* PALETTE */}
            {/* ====================================== */}

            <div>

              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[#B7F9D0] text-xl">
                  2. COLOR PALETTE
                </h2>

                <span className="text-sm text-[#B7F9D0]/60">
                  Inter Medium
                </span>
              </div>

              <div className="grid grid-cols-2 gap-6">

                <div className="text-center">
                  <div className="w-28 h-28 rounded-full bg-[#0A1320] border border-white/10 mx-auto" />
                  <p className="mt-3 text-sm font-semibold">DEEP TECH DARK</p>
                  <p className="text-xs text-slate-400">#0A1320</p>
                </div>

                <div className="text-center">
                  <div className="w-28 h-28 rounded-full bg-[#B7F9D0] mx-auto" />
                  <p className="mt-3 text-sm font-semibold">INNOVATION NEON GREEN</p>
                  <p className="text-xs text-slate-400">#B7F9D0</p>
                </div>
              </div>

              <img
                src={codeBg}
                alt=""
                className="w-full h-40 object-cover my-8"
              />

              <div className="grid grid-cols-3 gap-5">

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-[#0096C7] mx-auto" />
                  <p className="text-[10px] font-bold mt-2">CYBER BLUE</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-[#526071] mx-auto" />
                  <p className="text-[10px] font-bold mt-2">CODE GREY</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-[#AAD9BB] mx-auto" />
                  <p className="text-[10px] font-bold mt-2">SOFT LIME</p>
                </div>

              </div>
            </div>

            {/* ====================================== */}
            {/* TYPOGRAPHY */}
            {/* ====================================== */}

            <div>

              <h2 className="text-[#B7F9D0] text-xl mb-6">
                3. TYPOGRAPHY
              </h2>

              <div className="space-y-6">

                <div>
                  <p className="text-sm text-[#B7F9D0]/60 mb-3">
                    PRIMARY / HEADINGS
                  </p>

                  <h3 className="text-3xl font-bold">
                    PLUS JAKARTA SANS
                  </h3>

                  <div className="mt-4 space-y-2">
                    <p className="font-medium">Medium Medium</p>
                    <p className="font-bold">Bold Bold</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-[#B7F9D0]/60 mb-2">
                    BODY TEXT
                  </p>

                  <h3 className="text-3xl">
                    INTER
                  </h3>

                  <p className="text-[#D3E0D8] mt-3">
                    Digital transformation is a process to innovate,
                    evolve and optimize modern businesses through
                    software solutions and agile methodologies.
                  </p>
                </div>

                <div>
                  <p className="text-sm text-[#B7F9D0]/60 mb-2">
                    CODE TEXT: GEIST MONO
                  </p>

                  <div className="bg-[#08111C] p-4 rounded-lg text-sm font-mono border border-slate-800">
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

              <h2 className="text-[#B7F9D0] text-xl mb-6">
                4. GRAPHIC ELEMENTS & ICONS
              </h2>

              <div className="grid grid-cols-4 gap-3">

                {[Palette, Paintbrush, Sparkles, Image, Camera, Music, Zap, Globe, Star, Heart, Code, Layers].map((Icon, index) => (
                  <div
                    key={index}
                    className="aspect-square border border-[#B7F9D0]/30 rounded flex items-center justify-center text-xl hover:bg-[#B7F9D0]/10 transition-colors group"
                  >
                    <Icon className="w-7 h-7 text-[#B7F9D0]/60 group-hover:text-[#B7F9D0] transition-colors" />
                  </div>
                ))}

              </div>

              <h2 className="text-[#B7F9D0] text-xl mt-8 mb-6">
                5. TECHNOLOGY STACK ICONS
              </h2>

              <div className="grid grid-cols-4 gap-3 mt-6">

                {[aws, docker, mongodb, nextjs, nodejs, postgresql, python, react, reactnative, typescript].map((src, index) => (
                  <div
                    key={index}
                    className="aspect-square border border-[#B7F9D0]/30 rounded flex items-center justify-center hover:bg-[#B7F9D0]/10 transition-colors group"
                  >
                    <img src={src} alt="" className="h-18 brightness-0 invert-[.7] group-hover:brightness-0 group-hover:invert transition-all" />
                  </div>
                ))}

              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">

                <div className="bg-[linear-gradient(45deg,#314d6e,#0A1320)] h-24 rounded" />

                <div
                  className="
                  h-24
                  bg-[linear-gradient(90deg,transparent_95%,#B7F9D0_95%),linear-gradient(transparent_95%,#B7F9D0_95%)]
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

        <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4 border-t border-[#B7F9D0]/10 pt-4">

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-4">

             <img
              src="https://hypernetics.com.mx/_next/static/media/hypernetics-logo.7eda4e55.svg"
              alt="Hypernetics"
              className="h-12 "
            />
            </div>
          </div>

          <p className="text-sm text-[#D3E0D8]/70">
            © Hypernetics. All Rights Reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
