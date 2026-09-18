import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  CheckCircle2, 
  AlertCircle, 
  Smartphone, 
  Flame, 
  TrendingDown, 
  Ticket, 
  Send, 
  Save, 
  RotateCcw, 
  Info,
  Clock,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  Eye
} from 'lucide-react';
import { NotificationSimulatorModal } from './NotificationSimulatorModal';

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

interface NotificationLog {
  id: string;
  type: 'foguinho' | 'derrota' | 'bilhete_progresso' | 'bilhete_green' | 'bilhete_red' | 'teste';
  title: string;
  body: string;
  timestamp: string;
  successCount: number;
}

const DEFAULT_SETTINGS: NotificationSettings = {
  fireTemplate: '🔥 O favorito {time} entrou no Método Foguinho! Fim de jogo: {placar}.',
  lossTemplate: '🔻 O {time} perdeu a partida! Placar final: {placar}.',
  betProgressTemplate: '📊 Jogo encerrado no bilhete "{titulo}" ({jogos})! Faltam apenas {restantes} partida(s).',
  betWonTemplate: '🟢 DEU GREEN! Seu bilhete "{titulo}" ({jogos}) bateu perfeitamente!',
  betLostTemplate: '🔴 Fim de jogo. Seu bilhete "{titulo}" ({jogos}) não bateu desta vez.',
  notifyFire: true,
  notifyLoss: true,
  notifyBets: true,
};

// Convert VAPID base64 key to Uint8Array for browser PushManager
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const NotificacoesView: React.FC = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [settings, setSettings] = useState<NotificationSettings>(DEFAULT_SETTINGS);
  const [logs, setLogs] = useState<NotificationLog[]>([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);

  // Check current permission and subscription on load
  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }

    // Check service worker push subscription
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        reg.pushManager.getSubscription().then((sub) => {
          setIsSubscribed(!!sub);
        }).catch(() => {});
      }).catch(() => {});
    }

    // Load saved settings from server
    fetch('/api/notifications/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setSettings(data.settings);
        }
      })
      .catch(() => {});

    // Load recent notification logs
    loadLogs();
  }, []);

  const loadLogs = () => {
    setIsLoadingLogs(true);
    fetch('/api/notifications/logs')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.logs)) {
          setLogs(data.logs);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoadingLogs(false));
  };

  const showFeedback = (type: 'success' | 'error', text: string) => {
    setFeedbackMsg({ type, text });
    setTimeout(() => setFeedbackMsg(null), 5000);
  };

  // Subscribe user device to Push Notifications
  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        showFeedback('error', 'Seu navegador não tem suporte a Push Notifications.');
        setIsLoading(false);
        return;
      }

      // Request user permission
      const perm = await Notification.requestPermission();
      setPermission(perm);

      if (perm !== 'granted') {
        showFeedback('error', 'Permissão negada. Por favor, libere as notificações nas configurações do seu navegador.');
        setIsLoading(false);
        return;
      }

      // Register the push service worker
      const reg = await navigator.serviceWorker.register('/sw-push.js', { scope: '/' });
      await navigator.serviceWorker.ready;

      // Get VAPID public key from backend
      const keyRes = await fetch('/api/notifications/vapid-key');
      const keyData = await keyRes.json();
      if (!keyData.success || !keyData.publicKey) {
        throw new Error('Falha ao obter chave pública VAPID.');
      }

      const convertedKey = urlBase64ToUint8Array(keyData.publicKey);

      // Subscribe with PushManager
      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedKey,
      });

      // Send subscription to server
      const saveRes = await fetch('/api/notifications/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription),
      });

      const saveData = await saveRes.json();
      if (saveData.success) {
        setIsSubscribed(true);
        showFeedback('success', 'Dispositivo conectado com sucesso! As notificações estão ativas.');
      } else {
        throw new Error(saveData.error || 'Erro ao registrar assinatura.');
      }
    } catch (err: any) {
      console.error('Push subscription error:', err);
      showFeedback('error', err.message || 'Erro ao ativar notificações no aparelho.');
    } finally {
      setIsLoading(false);
    }
  };

  // Send a test push notification & open interactive simulator
  const handleSendTest = async () => {
    setIsTesting(true);

    // Open Interactive Simulation Modal
    setIsSimulatorOpen(true);

    // Dispatch in-app Pop-up Modal as fallback
    const testPayload = {
      id: `test-pop-${Date.now()}`,
      type: 'teste' as const,
      title: 'TOPZCLUBS',
      body: 'Seu dispositivo está conectado! Você receberá os alertas na tela e no aparelho.',
    };
    window.dispatchEvent(new CustomEvent('topzclubs-inapp-notification', { detail: testPayload }));

    try {
      const res = await fetch('/api/notifications/test', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        showFeedback('success', 'Simulação aberta! Notificação push enviada para o dispositivo.');
        setTimeout(loadLogs, 1000);
      } else {
        showFeedback('success', 'Simulação aberta na tela!');
      }
    } catch (err) {
      showFeedback('error', 'Erro ao conectar ao servidor para teste.');
    } finally {
      setIsTesting(false);
    }
  };

  // Save customized message templates
  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/notifications/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        showFeedback('success', 'Configurações e textos de notificação salvos com sucesso!');
      } else {
        showFeedback('error', 'Falha ao salvar configurações.');
      }
    } catch (err) {
      showFeedback('error', 'Erro ao salvar configurações no servidor.');
    } finally {
      setIsSaving(false);
    }
  };

  // Reset to default templates
  const handleResetDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
    showFeedback('success', 'Textos restaurados para o padrão original. Clique em "Salvar Configurações" para confirmar.');
  };

  return (
    <div className="w-full flex flex-col gap-5 pb-12 animate-fade-in max-w-5xl mx-auto">
      
      {/* 1. TOP BANNER: Header & Live Status */}
      <div className="bg-[#141414] border border-[#222222] rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-inner">
            <Bell className="w-6 h-6 text-amber-400 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-lg sm:text-xl font-black text-white tracking-tight font-sans">
                Notificações Automáticas
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Push & Pop-Up em Primeiro Plano
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              Disparos em primeiro plano (Pop-Up no app com botão Fechar) e na tela de bloqueio do celular quando os clubes favoritos entrarem no Método Foguinho (🔥), sofrerem Derrota (🔻), ou quando bilhetes do Balanço finalizarem.
            </p>
          </div>
        </div>

        {/* Device Status Card */}
        <div className="flex items-center gap-2.5 bg-[#1a1a1a] p-3 rounded-xl border border-[#262626] shrink-0">
          <Smartphone className={`w-5 h-5 ${isSubscribed ? 'text-emerald-400' : 'text-zinc-500'}`} />
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-400 font-medium">Status do Aparelho</span>
            <span className="text-xs font-bold flex items-center gap-1.5 text-white">
              {isSubscribed ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-emerald-400">Ativo e Recebendo</span>
                </>
              ) : permission === 'denied' ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-red-400"></span>
                  <span className="text-red-400">Bloqueado no Navegador</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  <span className="text-amber-400">Não Ativado</span>
                </>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Feedback Toast */}
      {feedbackMsg && (
        <div className={`p-4 rounded-xl text-xs font-bold border flex items-center gap-2.5 transition-all ${
          feedbackMsg.type === 'success'
            ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
            : 'bg-red-950/40 border-red-800 text-red-300'
        }`}>
          {feedbackMsg.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          )}
          <span>{feedbackMsg.text}</span>
        </div>
      )}

      {/* 2. ACTIVATION & TEST BUTTONS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Activation Button */}
        <button
          id="btn-activate-push"
          onClick={handleSubscribe}
          disabled={isLoading || isSubscribed}
          className={`p-4 rounded-xl border flex items-center justify-between gap-3 text-left transition-all cursor-pointer shadow-sm ${
            isSubscribed
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 cursor-default'
              : 'bg-[#181818] hover:bg-[#202020] border-amber-500/40 hover:border-amber-500 text-white'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isSubscribed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold">
                {isSubscribed ? 'Notificações Ativas Neste Aparelho' : 'Ativar Notificações no Celular'}
              </span>
              <span className="text-[11px] text-zinc-400">
                {isSubscribed ? 'Você receberá os alertas na tela de bloqueio' : 'Clique para conceder a permissão com 1 toque'}
              </span>
            </div>
          </div>
          <span className="text-xs font-extrabold px-3 py-1.5 rounded-lg bg-[#252525] border border-zinc-700 text-zinc-200">
            {isLoading ? 'Ativando...' : isSubscribed ? 'Conectado ✓' : 'Ativar Agora'}
          </span>
        </button>

        {/* Test Push Button */}
        <button
          id="btn-send-test-push"
          onClick={handleSendTest}
          disabled={isTesting}
          className="p-4 rounded-xl bg-[#181818] hover:bg-[#202020] border border-[#282828] hover:border-zinc-700 flex items-center justify-between gap-3 text-left transition-all cursor-pointer shadow-sm group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-zinc-800 text-zinc-300 group-hover:text-white transition-colors">
              <Send className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white">Testar Notificação Agora</span>
              <span className="text-[11px] text-zinc-400">Dispara um push de teste imediato para a tela</span>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700">
            {isTesting ? 'Enviando...' : 'Enviar Teste'}
          </span>
        </button>
      </div>

      {/* 3. NOTIFICATION TRIGGERS TOGGLES */}
      <div className="bg-[#141414] border border-[#222222] rounded-2xl p-5 flex flex-col gap-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Gatilhos Automáticos de Disparo</span>
            </h2>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Escolha quais eventos geram notificações para não sobrecarregar seu celular.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Toggle Foguinho */}
          <div 
            onClick={() => setSettings(s => ({ ...s, notifyFire: !s.notifyFire }))}
            className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
              settings.notifyFire 
                ? 'bg-amber-500/10 border-amber-500/40' 
                : 'bg-[#181818] border-[#262626] opacity-60'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Flame className={`w-4 h-4 ${settings.notifyFire ? 'text-amber-400' : 'text-zinc-500'}`} />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">Método Foguinho (🔥)</span>
                <span className="text-[10px] text-zinc-400">Under 1.5 de clubes favoritos</span>
              </div>
            </div>
            <div className={`w-9 h-5 rounded-full p-0.5 transition-colors ${settings.notifyFire ? 'bg-amber-500' : 'bg-zinc-700'}`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.notifyFire ? 'translate-x-4' : 'translate-x-0'}`}></div>
            </div>
          </div>

          {/* Toggle Derrota */}
          <div 
            onClick={() => setSettings(s => ({ ...s, notifyLoss: !s.notifyLoss }))}
            className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
              settings.notifyLoss 
                ? 'bg-rose-500/10 border-rose-500/40' 
                : 'bg-[#181818] border-[#262626] opacity-60'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <TrendingDown className={`w-4 h-4 ${settings.notifyLoss ? 'text-rose-400' : 'text-zinc-500'}`} />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">Método Derrota (🔻)</span>
                <span className="text-[10px] text-zinc-400">Derrotas de clubes favoritos</span>
              </div>
            </div>
            <div className={`w-9 h-5 rounded-full p-0.5 transition-colors ${settings.notifyLoss ? 'bg-rose-500' : 'bg-zinc-700'}`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.notifyLoss ? 'translate-x-4' : 'translate-x-0'}`}></div>
            </div>
          </div>

          {/* Toggle Balanço */}
          <div 
            onClick={() => setSettings(s => ({ ...s, notifyBets: !s.notifyBets }))}
            className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
              settings.notifyBets 
                ? 'bg-emerald-500/10 border-emerald-500/40' 
                : 'bg-[#181818] border-[#262626] opacity-60'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Ticket className={`w-4 h-4 ${settings.notifyBets ? 'text-emerald-400' : 'text-zinc-500'}`} />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">Bilhetes do Balanço</span>
                <span className="text-[10px] text-zinc-400">Progresso, Green e Red</span>
              </div>
            </div>
            <div className={`w-9 h-5 rounded-full p-0.5 transition-colors ${settings.notifyBets ? 'bg-emerald-500' : 'bg-zinc-700'}`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.notifyBets ? 'translate-x-4' : 'translate-x-0'}`}></div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. CUSTOMIZABLE MESSAGE TEMPLATES */}
      <div className="bg-[#141414] border border-[#222222] rounded-2xl p-5 sm:p-6 flex flex-col gap-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#222222]">
          <div className="flex flex-col">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Personalização dos Textos de Mensagem</span>
            </h2>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Edite as mensagens que aparecem no celular. O sistema substitui as palavras entre chaves automaticamente.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              id="btn-reset-templates"
              onClick={handleResetDefaults}
              className="px-3 py-1.5 rounded-lg bg-[#1e1e1e] hover:bg-[#252525] border border-zinc-700 text-zinc-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Restaurar mensagens padrão"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar Padrão</span>
            </button>
            <button
              id="btn-save-templates"
              onClick={handleSaveSettings}
              disabled={isSaving}
              className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Salvando...' : 'Salvar Configurações'}</span>
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-4">
          
          {/* Template 1: Foguinho */}
          <div className="flex flex-col gap-1.5 bg-[#181818] p-3.5 rounded-xl border border-[#262626]">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" />
                <span>1. Método Foguinho (Partida Under 1.5)</span>
              </label>
              <span className="text-[10px] text-zinc-500 font-mono">Tags: {'{time}'}, {'{placar}'}</span>
            </div>
            <input
              id="input-tpl-foguinho"
              type="text"
              value={settings.fireTemplate}
              onChange={(e) => setSettings({ ...settings, fireTemplate: e.target.value })}
              className="w-full bg-[#121212] border border-[#2d2d2d] focus:border-amber-500/80 rounded-lg px-3 py-2 text-xs text-white outline-none font-medium transition-all"
            />
            <span className="text-[10px] text-zinc-400">
              Exemplo real: <strong className="text-zinc-300">{settings.fireTemplate.replace('{time}', 'Flamengo').replace('{placar}', '1 x 0')}</strong>
            </span>
          </div>

          {/* Template 2: Derrota */}
          <div className="flex flex-col gap-1.5 bg-[#181818] p-3.5 rounded-xl border border-[#262626]">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                <TrendingDown className="w-3.5 h-3.5" />
                <span>2. Método Derrota (Favorito Perdeu)</span>
              </label>
              <span className="text-[10px] text-zinc-500 font-mono">Tags: {'{time}'}, {'{placar}'}</span>
            </div>
            <input
              id="input-tpl-derrota"
              type="text"
              value={settings.lossTemplate}
              onChange={(e) => setSettings({ ...settings, lossTemplate: e.target.value })}
              className="w-full bg-[#121212] border border-[#2d2d2d] focus:border-rose-500/80 rounded-lg px-3 py-2 text-xs text-white outline-none font-medium transition-all"
            />
            <span className="text-[10px] text-zinc-400">
              Exemplo real: <strong className="text-zinc-300">{settings.lossTemplate.replace('{time}', 'Palmeiras').replace('{placar}', '1 x 2')}</strong>
            </span>
          </div>

          {/* Template 3: Progresso do Bilhete */}
          <div className="flex flex-col gap-1.5 bg-[#181818] p-3.5 rounded-xl border border-[#262626]">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                <Ticket className="w-3.5 h-3.5" />
                <span>3. Progresso do Bilhete (Partida Encerrada)</span>
              </label>
              <span className="text-[10px] text-zinc-500 font-mono">Tags: {'{titulo}'}, {'{jogos}'}, {'{restantes}'}, {'{total}'}</span>
            </div>
            <input
              id="input-tpl-bilhete-progresso"
              type="text"
              value={settings.betProgressTemplate}
              onChange={(e) => setSettings({ ...settings, betProgressTemplate: e.target.value })}
              className="w-full bg-[#121212] border border-[#2d2d2d] focus:border-blue-500/80 rounded-lg px-3 py-2 text-xs text-white outline-none font-medium transition-all"
            />
            <span className="text-[10px] text-zinc-400">
              Exemplo real: <strong className="text-zinc-300">{settings.betProgressTemplate.replace('{titulo}', 'Dupla Serie A').replace('{jogos}', 'Flamengo x Vasco').replace('{restantes}', '1').replace('{total}', '2')}</strong>
            </span>
          </div>

          {/* Template 4: Bilhete Ganho (Green) */}
          <div className="flex flex-col gap-1.5 bg-[#181818] p-3.5 rounded-xl border border-[#262626]">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>4. Bilhete Ganho (Deu Green 🎉)</span>
              </label>
              <span className="text-[10px] text-zinc-500 font-mono">Tags: {'{titulo}'}, {'{jogos}'}, {'{retorno}'}, {'{casa}'}</span>
            </div>
            <input
              id="input-tpl-bilhete-green"
              type="text"
              value={settings.betWonTemplate}
              onChange={(e) => setSettings({ ...settings, betWonTemplate: e.target.value })}
              className="w-full bg-[#121212] border border-[#2d2d2d] focus:border-emerald-500/80 rounded-lg px-3 py-2 text-xs text-white outline-none font-medium transition-all"
            />
            <span className="text-[10px] text-zinc-400">
              Exemplo real: <strong className="text-zinc-300">{settings.betWonTemplate.replace('{titulo}', 'Dupla Serie A').replace('{jogos}', 'Flamengo x Vasco, Palmeiras x Santos').replace('{retorno}', 'R$ 75,00').replace('{casa}', 'Betano')}</strong>
            </span>
          </div>

          {/* Template 5: Bilhete Perdido (Red) */}
          <div className="flex flex-col gap-1.5 bg-[#181818] p-3.5 rounded-xl border border-[#262626]">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>5. Bilhete Perdido (Red ❌)</span>
              </label>
              <span className="text-[10px] text-zinc-500 font-mono">Tags: {'{titulo}'}, {'{jogos}'}, {'{casa}'}</span>
            </div>
            <input
              id="input-tpl-bilhete-red"
              type="text"
              value={settings.betLostTemplate}
              onChange={(e) => setSettings({ ...settings, betLostTemplate: e.target.value })}
              className="w-full bg-[#121212] border border-[#2d2d2d] focus:border-red-500/80 rounded-lg px-3 py-2 text-xs text-white outline-none font-medium transition-all"
            />
            <span className="text-[10px] text-zinc-400">
              Exemplo real: <strong className="text-zinc-300">{settings.betLostTemplate.replace('{titulo}', 'Múltipla de Terça').replace('{jogos}', 'São Paulo x Grêmio').replace('{casa}', 'Bet365')}</strong>
            </span>
          </div>

        </div>

        <div className="flex justify-end pt-2">
          <button
            id="btn-save-templates-bottom"
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black flex items-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Salvando Alterações...' : 'Salvar Configurações'}</span>
          </button>
        </div>
      </div>

      {/* 5. DISPATCH HISTORY LOGS */}
      <div className="bg-[#141414] border border-[#222222] rounded-2xl p-5 flex flex-col gap-4 shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-[#222222]">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-zinc-400" />
            <h2 className="text-sm font-bold text-white">Histórico Recente de Notificações</h2>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#222222] text-zinc-300 font-mono">
              {logs.length} disparos registrados
            </span>
          </div>
          <button
            id="btn-refresh-logs"
            onClick={loadLogs}
            disabled={isLoadingLogs}
            className="text-xs text-zinc-400 hover:text-white p-1.5 rounded-lg hover:bg-zinc-800 transition-colors flex items-center gap-1 cursor-pointer"
            title="Atualizar histórico"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingLogs ? 'animate-spin' : ''}`} />
            <span className="text-[11px]">Atualizar</span>
          </button>
        </div>

        {logs.length === 0 ? (
          <div className="text-center py-8 text-xs text-zinc-500 flex flex-col items-center gap-2">
            <Info className="w-6 h-6 text-zinc-600" />
            <span>Nenhuma notificação foi disparada ainda. Faça um teste acima para ver os registros aqui!</span>
          </div>
        ) : (
          <div className="flex flex-col gap-2 max-h-72 overflow-y-auto no-scrollbar pr-1">
            {logs.map((log) => {
              const isFire = log.type === 'foguinho';
              const isLoss = log.type === 'derrota';
              const isGreen = log.type === 'bilhete_green';
              const isRed = log.type === 'bilhete_red';

              return (
                <div
                  key={log.id}
                  className="bg-[#181818] border border-[#242424] p-3 rounded-xl flex items-start justify-between gap-3 text-xs"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-base leading-none mt-0.5">
                      {isFire ? '🔥' : isLoss ? '🔻' : isGreen ? '🟢' : isRed ? '🔴' : '🔔'}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-bold text-white">{log.title}</span>
                      <span className="text-zinc-300 text-[11px] mt-0.5">{log.body}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <span className="text-[10px] text-zinc-400 font-mono">{log.timestamp}</span>
                    <span className="text-[9px] text-emerald-400 font-semibold mt-0.5">
                      {log.successCount} dispositivo(s)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Notification Simulator Modal */}
      <NotificationSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        settings={settings}
      />

    </div>
  );
};
