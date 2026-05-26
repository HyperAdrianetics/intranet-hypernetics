import React, { useState } from 'react';
import { useQuote } from '../hooks/useQuote';
import { Sidebar } from './Sidebar';
import { DocumentPreview } from './DocumentPreview';
import html2pdf from 'html2pdf.js';
import type { QuoteData } from '../types/quote';
interface QuoteEditorProps {
  initialData: QuoteData;
  isDarkMode?: boolean;
}

export const QuoteEditor: React.FC<QuoteEditorProps> = ({ initialData, isDarkMode = false }) => {
  const brandKey = 'hypernetics';
  const { quote, updateQuote, resetQuote, duplicateQuote } = useQuote(brandKey, initialData);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const exportToPdf = async () => {
    const element = document.getElementById('quote-document');
    if (!element) return;

    // 1. Wait for fonts to ensure proper layout
    await document.fonts.ready;

    // 2. Fix html2canvas bounding box bug by temporarily removing the parent's scale transform
    const wrapper = element.parentElement;
    const originalTransform = wrapper ? wrapper.style.transform : '';
    const originalTransition = wrapper ? wrapper.style.transition : '';
    if (wrapper) {
      wrapper.style.transition = 'none';
      wrapper.style.transform = 'scale(1)';
    }

    // Wait for the unscaled layout to settle
    await new Promise(resolve => setTimeout(resolve, 300));

    // Measure the full scroll height of the unscaled element
    const scrollHeight = element.scrollHeight;
    const heightInInches = (scrollHeight / 96) + 0.5; // Half-inch buffer to prevent extra pages

    const opt = {
      margin: 0,
      filename: `Cotizacion_Hypernetics_${quote.folio}.pdf`,
      image: { type: 'jpeg' as const, quality: 1.0 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: isDarkMode ? quote.colors.secondary : '#ffffff',
        scrollY: 0,
        height: scrollHeight, // Force the canvas to be the full height
        windowHeight: scrollHeight,
        removeContainer: true,
        logging: false,
        onclone: (clonedDoc: Document) => {
          const originalDocElement = document.getElementById('quote-document');
          const clonedDocElement = clonedDoc.getElementById('quote-document');

          if (originalDocElement && clonedDocElement) {
            // Force the cloned element to have the exact measured height
            clonedDocElement.style.height = `${scrollHeight}px`;
            clonedDocElement.style.overflow = 'visible';

            const origElements = [originalDocElement, ...Array.from(originalDocElement.getElementsByTagName("*"))];
            const cloneElements = [clonedDocElement, ...Array.from(clonedDocElement.getElementsByTagName("*"))];

            const limit = Math.min(origElements.length, cloneElements.length);
            for (let i = 0; i < limit; i++) {
              const orig = origElements[i] as HTMLElement;
              const clone = cloneElements[i] as HTMLElement;

              if (orig && clone && clone.style) {
                const compStyle = window.getComputedStyle(orig);

                clone.style.color = compStyle.color;
                clone.style.backgroundColor = compStyle.backgroundColor;
                clone.style.borderColor = compStyle.borderColor;
                clone.style.fill = compStyle.fill;
                clone.style.stroke = compStyle.stroke;
                clone.style.display = compStyle.display;
                clone.style.flexDirection = compStyle.flexDirection;
                clone.style.alignItems = compStyle.alignItems;
                clone.style.justifyContent = compStyle.justifyContent;
                clone.style.gap = compStyle.gap;
                clone.style.padding = compStyle.padding;
                clone.style.margin = compStyle.margin;
                clone.style.position = compStyle.position;
                clone.style.top = compStyle.top;
                clone.style.left = compStyle.left;
                clone.style.right = compStyle.right;
                clone.style.bottom = compStyle.bottom;
                clone.style.width = compStyle.width;
                clone.style.height = compStyle.height;
                clone.style.boxSizing = compStyle.boxSizing;
                clone.style.fontFamily = compStyle.fontFamily;
                clone.style.fontSize = compStyle.fontSize;
                clone.style.fontWeight = compStyle.fontWeight;
                clone.style.lineHeight = compStyle.lineHeight;
                clone.style.textAlign = compStyle.textAlign;
                clone.style.textTransform = compStyle.textTransform;
                clone.style.letterSpacing = compStyle.letterSpacing;
                clone.style.borderRadius = compStyle.borderRadius;
                clone.style.opacity = compStyle.opacity;
              }
            }
          }

          const styles = clonedDoc.querySelectorAll('style');
          styles.forEach(style => {
            if (style.innerHTML) {
              style.innerHTML = style.innerHTML.replace(/(oklch|oklab|color-mix)\([^)]+\)/g, 'transparent');
            }
          });

          const overrideStyle = clonedDoc.createElement('style');
          overrideStyle.innerHTML = `
            * { 
              box-shadow: none !important;
              text-shadow: none !important;
              transition: none !important;
              animation: none !important;
              backdrop-filter: none !important;
              filter: none !important;
            }
            #quote-document {
              height: ${scrollHeight}px !important;
              min-height: ${scrollHeight}px !important;
              overflow: visible !important;
              display: block !important;
            }
            .letter-page {
              margin: 0 !important;
              margin-bottom: 20px !important;
              box-shadow: none !important;
              page-break-after: avoid !important;
              page-break-inside: avoid !important;
              height: auto !important;
              min-height: 0 !important;
            }
            .letter-page:last-child {
              margin-bottom: 0 !important;
            }
          `;
          clonedDoc.head.appendChild(overrideStyle);
        }
      },
      jsPDF: {
        unit: 'in',
        format: [8.5, heightInInches] as [number, number],
        orientation: 'portrait' as const,
        compress: true
      },
      pagebreak: { mode: ['css', 'legacy'] }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      // 3. Restore the scale transform after generation
      if (wrapper) {
        if (!originalTransform) {
          wrapper.style.removeProperty('transform');
        } else {
          wrapper.style.transform = originalTransform;
        }
        if (!originalTransition) {
          wrapper.style.removeProperty('transition');
        } else {
          wrapper.style.transition = originalTransition;
        }
      }
    });
  };

  return (
    <div className={`flex h-screen w-full overflow-hidden font-sans ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'}`}>
      {/* Toggle button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`fixed top-6 left-6 z-50 no-print p-2.5 rounded-xl transition-all lg:hidden ${isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-white text-slate-600 hover:bg-slate-100'} shadow-lg border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}
        aria-label={sidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
      >
        {sidebarOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Editor Sidebar */}
      <div className={`${sidebarOpen ? 'fixed inset-y-0 left-0 z-50' : 'hidden'} lg:block transition-all`}>
        <Sidebar
          data={quote}
          updateQuote={updateQuote}
          resetQuote={resetQuote}
          duplicateQuote={duplicateQuote}
          exportPdf={exportToPdf}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Preview Area */}
      <main className={`flex-grow overflow-y-auto p-12 flex flex-col items-center gap-6 ${isDarkMode ? 'bg-[#0a0b10] shadow-inner' : 'bg-slate-200 shadow-inner'}`}>
        <div className="w-full max-w-[8.5in] flex justify-end items-center no-print px-4">
          <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-white text-slate-400'}`}>
            Modo de Visualización: Carta (Letter)
          </div>
        </div>

        <div className="transform scale-90 origin-top lg:scale-100 transition-transform duration-300">
          <DocumentPreview data={quote} isDarkMode={isDarkMode} />
        </div>
      </main>

      {/* Floating elements */}
      <div className="fixed top-6 right-6 no-print z-50">
        <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-white border-slate-200 text-slate-500'} backdrop-blur-md px-4 py-2 rounded-full shadow-lg border text-xs font-medium`}>
          Auto-guardado: Hypernetics
        </div>
      </div>

      <button
        onClick={exportToPdf}
        className="fixed bottom-6 right-6 no-print z-50 bg-primary hover:brightness-110 text-white font-bold py-3 px-5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 active:scale-95"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Exportar PDF
      </button>
    </div>
  );
};
