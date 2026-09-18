import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Smartphone, Download, X } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-black font-black text-xs transition-all cursor-pointer shadow-sm shrink-0"
        title="Instalar TOPZCLUBS no seu dispositivo"
      >
        <Download className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Instalar App</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#181818] hover:bg-[#222222] border border-[#282828] text-zinc-200 hover:text-white text-xs font-semibold transition-all cursor-pointer shrink-0"
          title="Instalar TOPZCLUBS no iPhone / iPad"
        >
          <Smartphone className="w-3.5 h-3.5 text-[#ccff00]" />
          <span className="hidden sm:inline">Instalar no iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-150">
            <div className="w-full max-w-sm rounded-2xl bg-[#141517] border border-[#26272b] p-5 shadow-2xl text-zinc-100 relative">
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="absolute right-3.5 top-3.5 text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-3">
                <img src="/pwa-192x192.png" alt="TOPZCLUBS Logo" className="w-10 h-10 rounded-xl" />
                <div>
                  <h3 className="text-sm font-bold text-white">Instalar no iPhone / iPad</h3>
                  <p className="text-[11px] text-zinc-400">Adicionar TOPZCLUBS à tela de início</p>
                </div>
              </div>

              <ol className="text-xs text-zinc-300 space-y-2.5 my-4 bg-[#1b1c1f] p-3.5 rounded-xl border border-zinc-800/80 font-sans">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#ccff00]">1.</span>
                  <span>Toque no botão <strong className="text-white">Compartilhar</strong> na barra do Safari.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#ccff00]">2.</span>
                  <span>Role para baixo e selecione <strong className="text-white">Adicionar à Tela de Início</strong>.</span>
                </li>
              </ol>

              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-2 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-white transition-colors"
              >
                Entendi
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
