import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Monitor, 
  Flame, 
  TrendingDown, 
  Ticket, 
  CheckCircle2, 
  AlertCircle, 
  Bell, 
  Volume2, 
  Clock, 
  Wifi, 
  Battery, 
  Lock, 
  ShieldCheck,
  Send,
  Coins
} from 'lucide-react';
import { playNotificationAudioByType, playMoneyCoinSound } from '../utils/notificationAudio';

interface NotificationSettings {
  fireTemplate: string;
  lossTemplate: string;
  betProgressTemplate: string;
  betWonTemplate: string;
  betLostTemplate: string;
  notifyFire: boolean;
  notifyLoss: boolean;
  notifyBets: boolean;
}

interface NotificationSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: NotificationSettings;
}

export const NotificationSimulatorModal: React.FC<NotificationSimulatorModalProps> = ({
  isOpen,
  onClose,
  settings,
}) => {
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'desktop'>('mobile');
  const [selectedType, setSelectedType] = useState<'foguinho' | 'derrota' | 'green' | 'red' | 'progresso' | 'teste'>('foguinho');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  if (!isOpen) return null;

  // Synthesize a quick notification chime audio using Web Audio API
  const playChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {
      // Ignore if browser restricts audio
    }
  };

  const triggerSimulationAnimation = (type: typeof selectedType) => {
    setSelectedType(type);
    setIsAnimating(true);
    playNotificationAudioByType(type);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Get clean dynamic notification text based on settings
  const getNotificationData = () => {
    switch (selectedType) {
      case 'foguinho':
        return {
          title: 'TOPZCLUBS',
          body: settings.fireTemplate
            .replace('{time}', 'Flamengo')
            .replace('{placar}', '1 x 0'),
        };
      case 'derrota':
        return {
          title: 'TOPZCLUBS',
          body: settings.lossTemplate
            .replace('{time}', 'Palmeiras')
            .replace('{placar}', '0 x 2'),
        };
      case 'green':
        return {
          title: 'TOPZCLUBS',
          body: settings.betWonTemplate
            .replace('{titulo}', 'Dupla Brasileirão')
            .replace('{jogos}', 'Flamengo x Vasco')
            .replace('{casa}', 'Betano')
            .replace('{data}', '15/09')
            .replace('{retorno}', 'R$ 125,00'),
        };
      case 'red':
        return {
          title: 'TOPZCLUBS',
          body: settings.betLostTemplate
            .replace('{titulo}', 'Múltipla de Terça')
            .replace('{jogos}', 'São Paulo x Grêmio')
            .replace('{casa}', 'Bet365')
            .replace('{data}', '15/09'),
        };
      case 'progresso':
        return {
          title: 'TOPZCLUBS',
          body: settings.betProgressTemplate
            .replace('{titulo}', 'Tripla Serie A')
            .replace('{jogos}', 'Corinthians x Fluminense')
            .replace('{restantes}', '1')
            .replace('{total}', '3'),
        };
      default:
        return {
          title: 'TOPZCLUBS',
          body: '🔔 Notificação ativada no seu dispositivo com sucesso!',
        };
    }
  };

  const notificationData = getNotificationData();

  return (
    <div className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fade-in">
      <div className="bg-[#121212] border border-[#262626] w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col my-auto overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#222222] bg-[#161616] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
              <Send className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
                <span>Simulador de Notificações</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded font-mono uppercase">
                  Ao Vivo
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                Veja exatamente como a notificação aparece no celular (Tela de Bloqueio) e no Navegador.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-[#222222] hover:bg-[#2e2e2e] text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Fechar Simulador"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start bg-[#0e0e0e]">
          
          {/* LEFT SIDE: Controls & Selectors (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            
            {/* Device Toggle */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-zinc-300">1. Selecione o Dispositivo:</label>
              <div className="grid grid-cols-2 gap-2 bg-[#161616] p-1.5 rounded-xl border border-[#242424]">
                <button
                  onClick={() => setDeviceMode('mobile')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    deviceMode === 'mobile'
                      ? 'bg-amber-500 text-black shadow-md font-black'
                      : 'text-zinc-400 hover:text-white hover:bg-[#202020]'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>📱 Celular (Bloqueio)</span>
                </button>
                <button
                  onClick={() => setDeviceMode('desktop')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    deviceMode === 'desktop'
                      ? 'bg-amber-500 text-black shadow-md font-black'
                      : 'text-zinc-400 hover:text-white hover:bg-[#202020]'
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                  <span>💻 Navegador / App</span>
                </button>
              </div>
            </div>

            {/* Notification Type Buttons */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-zinc-300">2. Escolha o Tipo de Notificação:</label>
              <div className="flex flex-col gap-1.5">
                
                <button
                  onClick={() => triggerSimulationAnimation('foguinho')}
                  className={`p-2.5 rounded-xl border flex items-center justify-between text-left text-xs font-bold transition-all cursor-pointer ${
                    selectedType === 'foguinho'
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : 'bg-[#161616] border-[#222222] text-zinc-400 hover:text-white hover:bg-[#1f1f1f]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span>🔥 Método Foguinho</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">Under 1.5</span>
                </button>

                <button
                  onClick={() => triggerSimulationAnimation('derrota')}
                  className={`p-2.5 rounded-xl border flex items-center justify-between text-left text-xs font-bold transition-all cursor-pointer ${
                    selectedType === 'derrota'
                      ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                      : 'bg-[#161616] border-[#222222] text-zinc-400 hover:text-white hover:bg-[#1f1f1f]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-rose-400" />
                    <span>🔻 Método Derrota</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">Derrota Favorito</span>
                </button>

                <button
                  onClick={() => triggerSimulationAnimation('green')}
                  className={`p-2.5 rounded-xl border flex items-center justify-between text-left text-xs font-bold transition-all cursor-pointer ${
                    selectedType === 'green'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : 'bg-[#161616] border-[#222222] text-zinc-400 hover:text-white hover:bg-[#1f1f1f]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>🟢 Bilhete Green (Ganho)</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">Retorno R$</span>
                </button>

                <button
                  onClick={() => triggerSimulationAnimation('red')}
                  className={`p-2.5 rounded-xl border flex items-center justify-between text-left text-xs font-bold transition-all cursor-pointer ${
                    selectedType === 'red'
                      ? 'bg-red-500/20 border-red-500 text-red-300'
                      : 'bg-[#161616] border-[#222222] text-zinc-400 hover:text-white hover:bg-[#1f1f1f]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <span>🔴 Bilhete Red (Perdido)</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">Encerrado</span>
                </button>

                <button
                  onClick={() => triggerSimulationAnimation('progresso')}
                  className={`p-2.5 rounded-xl border flex items-center justify-between text-left text-xs font-bold transition-all cursor-pointer ${
                    selectedType === 'progresso'
                      ? 'bg-blue-500/20 border-blue-500 text-blue-300'
                      : 'bg-[#161616] border-[#222222] text-zinc-400 hover:text-white hover:bg-[#1f1f1f]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-blue-400" />
                    <span>📊 Progresso do Bilhete</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">Restantes</span>
                </button>

              </div>
            </div>

            {/* Test Sound Buttons */}
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={playMoneyCoinSound}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                <Coins className="w-4 h-4 text-emerald-400 animate-bounce" />
                <span>💰 Ouvir Som de Moeda (Green / Lucro)</span>
              </button>

              <button
                onClick={() => playNotificationAudioByType('foguinho')}
                className="w-full py-2 px-3 rounded-xl bg-[#1b1b1b] hover:bg-[#242424] border border-[#2d2d2d] text-zinc-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                <span>🔔 Som de Alerta Padrão</span>
              </button>
            </div>

          </div>

          {/* RIGHT SIDE: Visual Preview Stage (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[380px] bg-[#141414] border border-[#242424] rounded-2xl p-4 sm:p-6 relative overflow-hidden shadow-inner">
            
            <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Prévia Fiel em Tempo Real</span>
            </div>

            {/* A. SMARTPHONE LOCKSCREEN SIMULATION */}
            {deviceMode === 'mobile' && (
              <div className="w-[280px] sm:w-[320px] bg-gradient-to-b from-zinc-900 via-slate-950 to-zinc-950 border-[6px] border-zinc-800 rounded-[38px] p-4 shadow-2xl flex flex-col relative my-auto select-none overflow-hidden">
                
                {/* Notch / Dynamic Island */}
                <div className="w-24 h-4 bg-black rounded-full mx-auto mb-3 flex items-center justify-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
                </div>

                {/* Status bar */}
                <div className="flex items-center justify-between text-[10px] text-zinc-400 font-semibold px-2 mb-6">
                  <span>21:45</span>
                  <div className="flex items-center gap-1.5">
                    <Wifi className="w-3 h-3" />
                    <Battery className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Lockscreen Clock */}
                <div className="flex flex-col items-center my-2 text-white">
                  <span className="text-4xl font-extrabold font-mono tracking-tight text-white drop-shadow-md">
                    21:45
                  </span>
                  <span className="text-[11px] font-medium text-zinc-400 mt-0.5">
                    Terça-feira, 15 de Setembro
                  </span>
                </div>

                {/* Lock Icon */}
                <div className="flex justify-center my-3 text-zinc-500">
                  <Lock className="w-4 h-4" />
                </div>

                {/* PUSH NOTIFICATION CARD ON LOCK SCREEN */}
                <div className={`mt-2 p-3 rounded-2xl bg-zinc-900/95 border border-zinc-700/80 backdrop-blur-xl shadow-2xl flex flex-col gap-1.5 transition-all duration-300 ${
                  isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
                }`}>
                  
                  {/* Push Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src="/pwa-192x192.png"
                        alt="TOPZCLUBS"
                        className="w-4 h-4 rounded-md object-cover shadow-sm bg-amber-500"
                        onError={(e) => {
                          // Fallback icon if image loading fails
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <span className="text-[11px] font-black text-white tracking-wide uppercase">
                        TOPZCLUBS
                      </span>
                    </div>
                    <span className="text-[9px] text-zinc-400 font-medium">agora</span>
                  </div>

                  {/* Push Body - Single Clean Line */}
                  <div className="flex flex-col mt-0.5">
                    <span className="text-xs text-zinc-200 leading-snug font-medium">
                      {notificationData.body}
                    </span>
                  </div>

                </div>

                {/* Phone Bottom Home Bar */}
                <div className="w-28 h-1 bg-zinc-600 rounded-full mx-auto mt-10 mb-1"></div>

              </div>
            )}

            {/* B. DESKTOP / IN-APP POPUP SIMULATION */}
            {deviceMode === 'desktop' && (
              <div className="w-full max-w-md flex flex-col gap-4 my-auto">
                
                <div className="text-center text-xs text-zinc-400 font-medium mb-1">
                  Simulação da notificação exibida no Navegador / Computador:
                </div>

                {/* Desktop Notification Card */}
                <div className={`p-4 rounded-2xl border shadow-2xl bg-[#1a1a1a] border-zinc-700 flex flex-col gap-3 transition-all duration-300 ${
                  isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
                }`}>
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                    <div className="flex items-center gap-2">
                      <img
                        src="/pwa-192x192.png"
                        alt="TOPZCLUBS"
                        className="w-5 h-5 rounded-md object-cover bg-amber-500"
                      />
                      <span className="text-xs font-black text-white tracking-wide uppercase">
                        TOPZCLUBS
                      </span>
                    </div>
                    <span className="text-[10px] text-zinc-500 font-mono">agora</span>
                  </div>

                  {/* Card Body - Single Clean Line */}
                  <div className="flex flex-col">
                    <p className="text-xs text-zinc-200 leading-relaxed font-medium">
                      {notificationData.body}
                    </p>
                  </div>

                  {/* Card Actions */}
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      onClick={onClose}
                      className="px-4 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold border border-zinc-700 transition-colors cursor-pointer"
                    >
                      Fechar
                    </button>
                  </div>

                </div>

              </div>
            )}

          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#222222] bg-[#161616] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-zinc-400 text-center sm:text-left">
            💡 <strong>Dica:</strong> Você pode alterar as palavras e templates na aba de notificações para customizar o texto!
          </span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs transition-all cursor-pointer shadow-md"
          >
            Fechar Simulador
          </button>
        </div>

      </div>
    </div>
  );
};
