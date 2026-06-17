"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Copy, Check } from "lucide-react";

export default function EmailSignature() {
  const [name, setName] = useState("Max Goodwin");
  const [position, setPosition] = useState("Director General");
  const [phone, setPhone] = useState("+52 55 1122 3344");
  const [emailPrefix, setEmailPrefix] = useState("max");
  const [copied, setCopied] = useState(false);

  const email = `${emailPrefix}@hypernetics.com.mx`;

  const signatureHTML = `
<table cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:650px;background-color:#0b111e;background-image:radial-gradient(circle at 80% 30%,rgba(218,56,114,0.20),transparent 45%),radial-gradient(circle at 65% 70%,rgba(214,142,34,0.20),transparent 45%),radial-gradient(circle at 55% 20%,rgba(46,184,110,0.25),transparent 50%),radial-gradient(circle at 90% 80%,rgba(138,43,226,0.20),transparent 40%);border-radius:12px;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
  <tr>
    <td style="padding:30px 25px 30px 25px;vertical-align:middle;width:190px">
      <img src="https://hypernetics.com.mx/_next/static/media/hypernetics-logo.7eda4e55.svg" width="180" height="44" alt="Hypernetics" style="display:block;border:0;width:100%;height:auto" />
    </td>
    <td style="width:1px;border-left:1px solid rgba(255,255,255,0.2);padding:0"></td>
    <td style="padding:25px 30px 25px 35px;vertical-align:middle;text-align:left">
      <div style="font-size:21px;font-weight:700;color:#ffffff;margin:0 0 2px 0;letter-spacing:0.5px;text-transform:uppercase;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${name}</div>
      <div style="font-size:13px;font-weight:600;color:#a2dbb0;margin:0 0 10px 0;letter-spacing:1px;text-transform:uppercase">${position}</div>
      <div style="width:100%;max-width:280px;height:1px;background-color:rgba(255,255,255,0.15);margin-bottom:10px"></div>
      <div style="margin:3px 0"><a href="tel:${phone.replace(/\s/g, "")}" style="font-size:13.5px;color:#cbd5e1;text-decoration:none">${phone}</a></div>
      <div style="margin:3px 0"><a href="mailto:${email}" style="font-size:13.5px;color:#cbd5e1;text-decoration:none">${email}</a></div>
    </td>
  </tr>
</table>`.trim();

  const copySignature = async () => {
    try {
      const blobHtml = new Blob([signatureHTML], { type: "text/html" });
      const blobText = new Blob([`${name}\n${position}\n${phone}\n${email}`], {
        type: "text/plain",
      });
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": blobHtml,
          "text/plain": blobText,
        }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-background via-primary-blue to-background flex flex-col items-center p-6 md:p-10 min-w-screen">
      <div className="w-full max-w-[650px]">
        {/* FLOATING BACK BUTTON */}
        <Link
          href="/"
          className="fixed bottom-6 left-6 z-50 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-green bg-background/80 hover:bg-primary-green/20 px-4 py-3 rounded-xl transition-all border border-primary-green/20 active:scale-95 no-print backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al Inicio
        </Link>

        {/* TITLE */}
        <h1 className="text-primary-green text-2xl md:text-3xl font-bold uppercase tracking-wide mb-2">
          Generador de Firmas Digitales
        </h1>
        <p className="mb-8 text-slate-400">Genera tu firma digital.</p>

        {/* PREVIEW */}
        <div
          id="signature-preview"
          dangerouslySetInnerHTML={{ __html: signatureHTML }}
        />

        {/* FORM */}
        <div className="mt-12 space-y-5 no-print">
          <h2 className="text-primary-green text-lg font-bold uppercase tracking-wider">
            Editar Firma
          </h2>

          <div>
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Nombre
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 bg-[#0b111e] border border-slate-700 rounded-xl p-3 text-sm text-white outline-none focus:ring-2 focus:ring-primary-green transition-all"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Puesto
            </label>
            <input
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full mt-1 bg-[#0b111e] border border-slate-700 rounded-xl p-3 text-sm text-white outline-none focus:ring-2 focus:ring-primary-green transition-all"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Teléfono
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full mt-1 bg-[#0b111e] border border-slate-700 rounded-xl p-3 text-sm text-white outline-none focus:ring-2 focus:ring-primary-green transition-all"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Correo electrónico
            </label>
            <div className="flex items-center mt-1">
              <input
                value={emailPrefix}
                onChange={(e) => setEmailPrefix(e.target.value)}
                className="flex-1 bg-[#0b111e] border border-slate-700 rounded-l-xl p-3 text-sm text-white outline-none focus:ring-2 focus:ring-primary-green transition-all"
              />
              <span className="bg-slate-800 text-slate-300 text-sm px-3 py-3 rounded-r-xl border border-l-0 border-slate-700">
                @hypernetics.com.mx
              </span>
            </div>
          </div>

          <button
            onClick={copySignature}
            className="w-full flex items-center justify-center gap-2 bg-primary-green hover:brightness-110 text-background font-bold py-3.5 px-4 rounded-xl transition-all active:scale-95 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                ¡Firma copiada!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copiar firma digital
              </>
            )}
          </button>
        </div>

        {/* VERSION BADGE */}
        <p className="text-center text-slate-500 text-[10px] font-mono mt-8 uppercase tracking-widest no-print">
          Digital Signature Generator V1.0
        </p>
      </div>
    </section>
  );
}
