import React, { useState, useEffect } from 'react';
import { Bell, Flame, TrendingDown, Ticket, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { playNotificationAudioByType } from '../utils/notificationAudio';

export interface InAppNotificationPayload {
  id: string;
  type: 'foguinho' | 'derrota' | 'bilhete_progresso' | 'bilhete_green' | 'bilhete_red' | 'teste';
  title: string;
  body: string;
  timestamp?: string;
}

export const InAppNotificationModal: React.FC = () => {
  const [activeNotification, setActiveNotification] = useState<InAppNotificationPayload | null>(null);
  const [seenIds, setSeenIds] = useState<Set<string>>(() => new Set());
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  // Listen to custom local events (e.g. from test button click)
  useEffect(() => {
    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<InAppNotificationPayload>;
      if (customEvent.detail) {
        setActiveNotification(customEvent.detail);
        setSeenIds((prev) => new Set(prev).add(customEvent.detail.id));
      }
    };

    window.addEventListener('topzclubs-inapp-notification', handleCustomEvent);
    return () => {
      window.removeEventListener('topzclubs-inapp-notification', handleCustomEvent);
    };
  }, []);

  // Poll server for new notification logs every 8 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const checkServerLogs = async () => {
      try {
        const res = await fetch('/api/notifications/logs');
        const data = await res.json();
        if (data.success && Array.isArray(data.logs) && data.logs.length > 0) {
          const latestLogs: InAppNotificationPayload[] = data.logs;

          if (isInitialLoad) {
            // Mark existing logs as seen so we don't pop up old notifications when loading page
            const existingSet = new Set<string>();
            latestLogs.forEach((log) => existingSet.add(log.id));
            setSeenIds(existingSet);
            setIsInitialLoad(false);
          } else {
            // Find first unseen log
            const unseen = latestLogs.find((log) => !seenIds.has(log.id));
            if (unseen) {
              setActiveNotification(unseen);
              setSeenIds((prev) => new Set(prev).add(unseen.id));
            }
          }
        }
      } catch (err) {
        // Silent error
      }
    };

    // First check after 2 seconds
    const firstCheck = setTimeout(checkServerLogs, 2000);

    // Interval check every 8 seconds
    timer = setInterval(checkServerLogs, 8000);

    return () => {
      clearTimeout(firstCheck);
      clearInterval(timer);
    };
  }, [seenIds, isInitialLoad]);

  // Auto hide & play audio when notification is active
  useEffect(() => {
    if (!activeNotification) return;

    // Play notification audio (cash register / coin drop sound for Green & Progresso)
    playNotificationAudioByType(activeNotification.type);

    const hideTimer = setTimeout(() => {
      setActiveNotification(null);
    }, 12000);

    return () => clearTimeout(hideTimer);
  }, [activeNotification]);

  if (!activeNotification) return null;

  const { type, title, body } = activeNotification;

  const getTheme = () => {
    switch (type) {
      case 'foguinho':
        return {
          icon: <Flame className="w-5 h-5 text-amber-400" />,
          bgColor: 'bg-[#18150c]',
          borderColor: 'border-amber-500/50',
          accentColor: 'text-amber-400',
          badgeText: 'MÉTODO FOGUINHO',
        };
      case 'derrota':
        return {
          icon: <TrendingDown className="w-5 h-5 text-rose-400" />,
          bgColor: 'bg-[#1a0d0e]',
          borderColor: 'border-rose-500/50',
          accentColor: 'text-rose-400',
          badgeText: 'MÉTODO DERROTA',
        };
      case 'bilhete_green':
        return {
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
          bgColor: 'bg-[#0d1a12]',
          borderColor: 'border-emerald-500/50',
          accentColor: 'text-emerald-400',
          badgeText: 'BILHETE GREEN',
        };
      case 'bilhete_red':
        return {
          icon: <AlertCircle className="w-5 h-5 text-red-400" />,
          bgColor: 'bg-[#1a0e0e]',
          borderColor: 'border-red-500/50',
          accentColor: 'text-red-400',
          badgeText: 'BILHETE RED',
        };
      case 'bilhete_progresso':
        return {
          icon: <Ticket className="w-5 h-5 text-blue-400" />,
          bgColor: 'bg-[#0d131a]',
          borderColor: 'border-blue-500/50',
          accentColor: 'text-blue-400',
          badgeText: 'BALANÇO DE APOSTAS',
        };
      default:
        return {
          icon: <Bell className="w-5 h-5 text-amber-400" />,
          bgColor: 'bg-[#161616]',
          borderColor: 'border-amber-500/40',
          accentColor: 'text-amber-400',
          badgeText: 'NOTIFICAÇÃO TOPZCLUBS',
        };
    }
  };

  const theme = getTheme();

  return (
    <div className="fixed top-4 right-4 left-4 sm:left-auto sm:w-[400px] z-[9999] animate-bounce-in">
      <div className={`p-4 rounded-2xl border shadow-2xl backdrop-blur-md flex flex-col gap-3 ${theme.bgColor} ${theme.borderColor}`}>
        {/* Header */}
        <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <img
              src="/pwa-192x192.png"
              alt="TOPZCLUBS"
              className="w-5 h-5 rounded-md object-cover bg-amber-500 shadow-sm"
            />
            <span className="text-xs font-black uppercase tracking-wider text-white">
              TOPZCLUBS
            </span>
          </div>
          <button
            onClick={() => setActiveNotification(null)}
            className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            title="Fechar Notificação"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content - Single Clean Text */}
        <div className="flex flex-col">
          <p className="text-xs text-zinc-100 font-medium leading-relaxed">
            {body}
          </p>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-1">
          <button
            onClick={() => setActiveNotification(null)}
            className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer border border-white/10 shadow-sm"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
