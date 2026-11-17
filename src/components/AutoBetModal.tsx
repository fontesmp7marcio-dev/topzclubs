import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Bot,
  Home,
  Plane,
  Check,
  RefreshCw,
} from 'lucide-react';
import {
  AutoBetConfig,
  AutoBetMarketOption,
  AutoBetMode,
  AutoBetPreview,
  BetBookmaker,
} from '../types';
import { DEFAULT_AUTO_BET_CONFIG } from '../utils/autoBetBuilder';
import { getBrasiliaTodayStr } from '../utils/dateUtils';

interface AutoBetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdated: (message: string) => void;
  initialConfig?: AutoBetConfig | null;
}

function formatBreakdown(breakdown: number[]): string {
  if (!breakdown || breakdown.length === 0) return '0 bilhetes';
  const triples = breakdown.filter((n) => n === 3).length;
  const doubles = breakdown.filter((n) => n === 2).length;
  const singles = breakdown.filter((n) => n === 1).length;
  const parts: string[] = [];
  if (triples > 0) parts.push(`${triples} tripla${triples > 1 ? 's' : ''}`);
  if (doubles > 0) parts.push(`${doubles} dupla${doubles > 1 ? 's' : ''}`);
  if (singles > 0) parts.push(`${singles} simples`);
  return parts.join(' + ');
}

export const AutoBetModal: React.FC<AutoBetModalProps> = ({
  isOpen,
  onClose,
  onUpdated,
  initialConfig,
}) => {
  const [enabled, setEnabled] = useState<boolean>(
    initialConfig?.updatedAt ? Boolean(initialConfig.enabled) : true
  );
  const [mode, setMode] = useState<AutoBetMode>(initialConfig?.mode ?? 'home');
  const [bookmaker, setBookmaker] = useState<BetBookmaker>(initialConfig?.bookmaker ?? 'Betano');
  const [market, setMarket] = useState<AutoBetMarketOption>(initialConfig?.market ?? 'OVER_1_5');
  const [stake, setStake] = useState<string>(String(initialConfig?.stake ?? 20));
  const [defaultOdd, setDefaultOdd] = useState<string>(String(initialConfig?.defaultOdd ?? 2.0));

  const [preview, setPreview] = useState<AutoBetPreview | null>(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const previewSeqRef = useRef<number>(0);

  const todayStr = getBrasiliaTodayStr();

  // Load saved config & live preview on open
  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    const seq = ++previewSeqRef.current;
    setIsLoadingPreview(true);

    fetch(`/api/auto-bet/config?date=${todayStr}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled || seq !== previewSeqRef.current) return;
        if (data && data.success && data.config) {
          // On first-ever configuration (no updatedAt yet), default toggle to ON so clicking Salvar activates right away
          const hasBeenConfigured = Boolean(data.config.updatedAt);
          setEnabled(hasBeenConfigured ? Boolean(data.config.enabled) : true);
          setMode(data.config.mode === 'away' ? 'away' : 'home');
          setBookmaker(data.config.bookmaker === 'Bet365' ? 'Bet365' : 'Betano');
          setMarket(data.config.market || 'OVER_1_5');
          setStake(String(data.config.stake ?? 20));
          setDefaultOdd(String(data.config.defaultOdd ?? 2.0));
        }
        if (data && data.preview) {
          setPreview(data.preview);
        }
      })
      .catch((err) => {
        console.warn('Error loading auto-bet config:', err);
      })
      .finally(() => {
        if (!cancelled && seq === previewSeqRef.current) {
          setIsLoadingPreview(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, todayStr]);

  // Refresh live preview strictly for selected mode ('home' vs 'away')
  const handleModeChange = (nextMode: AutoBetMode) => {
    setMode(nextMode);
    const seq = ++previewSeqRef.current;
    setIsLoadingPreview(true);

    fetch(`/api/auto-bet/config?date=${todayStr}&mode=${nextMode}`)
      .then((res) => res.json())
      .then((data) => {
        if (seq !== previewSeqRef.current) return;
        if (data && data.preview) {
          setPreview(data.preview);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (seq === previewSeqRef.current) {
          setIsLoadingPreview(false);
        }
      });
  };

  if (!isOpen) return null;

  const parsedStake = Math.max(1, parseFloat(stake.replace(',', '.')) || DEFAULT_AUTO_BET_CONFIG.stake);
  const parsedOdd = Math.max(1.01, parseFloat(defaultOdd.replace(',', '.')) || DEFAULT_AUTO_BET_CONFIG.defaultOdd);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSaving) return;
    setIsSaving(true);
    try {
      const res = await fetch('/api/auto-bet/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enabled,
          mode,
          bookmaker,
          market,
          stake: parsedStake,
          defaultOdd: parsedOdd,
          maxGamesPerTicket: 3,
          date: todayStr,
        }),
      });
      const data = await res.json();
      if (data && data.success) {
        const createdCount = Array.isArray(data.createdBets) ? data.createdBets.length : 0;
        const modeText = mode === 'home' ? 'Favoritos em Casa' : 'Favoritos Fora de Casa';
        let msg = enabled
          ? `Automação salva (${modeText})!`
          : 'Automação diária desativada.';
        if (enabled && createdCount > 0) {
          msg = `${createdCount} ${
            createdCount === 1 ? 'bilhete montado' : 'bilhetes montados'
          } (${modeText}) e salvo no Balanço!`;
        }
        onUpdated(msg);
        onClose();
      }
    } catch (err) {
      console.error('Error saving auto-bet config:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const modeLabel = mode === 'home' ? 'Somente favoritos em casa' : 'Somente favoritos fora de casa';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs overflow-y-auto select-none">
      <div
        id="modal-autobet-container"
        className="bg-[#121214] border border-[#232328] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150 my-4 flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#222226] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-black tracking-tight text-white uppercase font-sans">
                Montagem Automática
              </h2>
              <p className="text-[11px] text-zinc-400">
                Até 3 jogos por bilhete, todo dia automaticamente
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSave} className="p-4 space-y-3.5 overflow-y-auto flex-1">
          {/* Simple On/Off Switch */}
          <div
            onClick={() => setEnabled((prev) => !prev)}
            className={`px-3.5 py-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
              enabled
                ? 'bg-emerald-950/30 border-emerald-500/50'
                : 'bg-[#17171b] border-[#292932] hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span
                className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                  enabled ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-600'
                }`}
              />
              <span className="text-xs font-black text-white uppercase tracking-wide">
                {enabled ? 'Automação Ativada' : 'Automação Desativada'}
              </span>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={enabled}
              onClick={(e) => {
                e.stopPropagation();
                setEnabled((prev) => !prev);
              }}
              className={`w-11 h-6 rounded-full transition-colors p-0.5 shrink-0 cursor-pointer ${
                enabled ? 'bg-emerald-500' : 'bg-zinc-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  enabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* 2 Criteria Buttons: Home vs Away */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              Critério dos Jogos Favoritos
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                id="btn-autobet-mode-home"
                onClick={() => handleModeChange('home')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                  mode === 'home'
                    ? 'bg-[#ccff00]/10 border-[#ccff00] text-white'
                    : 'bg-[#17171b] border-[#292932] text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      mode === 'home' ? 'bg-[#ccff00] text-black' : 'bg-[#22222a] text-zinc-400'
                    }`}
                  >
                    <Home className="w-3.5 h-3.5" />
                  </div>
                  {mode === 'home' && <Check className="w-4 h-4 text-[#ccff00]" />}
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-tight">
                    Favoritos em Casa
                  </div>
                  <div className="text-[10px] text-zinc-400">Só mandantes</div>
                </div>
              </button>

              <button
                type="button"
                id="btn-autobet-mode-away"
                onClick={() => handleModeChange('away')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                  mode === 'away'
                    ? 'bg-[#ccff00]/10 border-[#ccff00] text-white'
                    : 'bg-[#17171b] border-[#292932] text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      mode === 'away' ? 'bg-[#ccff00] text-black' : 'bg-[#22222a] text-zinc-400'
                    }`}
                  >
                    <Plane className="w-3.5 h-3.5" />
                  </div>
                  {mode === 'away' && <Check className="w-4 h-4 text-[#ccff00]" />}
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-tight">
                    Favoritos Fora
                  </div>
                  <div className="text-[10px] text-zinc-400">Só visitantes</div>
                </div>
              </button>
            </div>
          </div>

          {/* Compact Ticket Defaults */}
          <div className="grid grid-cols-2 gap-2.5 bg-[#151519] border border-[#262630] rounded-xl p-3">
            <div>
              <label className="block text-[9.5px] font-bold text-zinc-400 uppercase mb-1">
                Casa
              </label>
              <select
                value={bookmaker}
                onChange={(e) => setBookmaker(e.target.value as BetBookmaker)}
                className="w-full bg-[#111114] border border-[#2c2c35] focus:border-emerald-500 rounded-lg px-2.5 py-1.5 text-xs text-white font-semibold outline-none cursor-pointer"
              >
                <option value="Betano">Betano</option>
                <option value="Bet365">Bet365</option>
              </select>
            </div>

            <div>
              <label className="block text-[9.5px] font-bold text-zinc-400 uppercase mb-1">
                Mercado
              </label>
              <select
                value={market}
                onChange={(e) => setMarket(e.target.value as AutoBetMarketOption)}
                className="w-full bg-[#111114] border border-[#2c2c35] focus:border-emerald-500 rounded-lg px-2.5 py-1.5 text-xs text-white font-semibold outline-none cursor-pointer"
              >
                <option value="OVER_1_5">Mais de 1.5 gols</option>
                <option value="FAV_WIN">Vitória do Favorito</option>
                <option value="FAV_DC">Dupla Chance</option>
              </select>
            </div>

            <div>
              <label className="block text-[9.5px] font-bold text-zinc-400 uppercase mb-1">
                Valor (R$)
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={stake}
                onChange={(e) => setStake(e.target.value)}
                className="w-full bg-[#111114] border border-[#2c2c35] focus:border-emerald-500 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold outline-none"
              />
            </div>

            <div>
              <label className="block text-[9.5px] font-bold text-zinc-400 uppercase mb-1">
                Odd Padrão
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={defaultOdd}
                onChange={(e) => setDefaultOdd(e.target.value)}
                className="w-full bg-[#111114] border border-[#2c2c35] focus:border-emerald-500 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold outline-none"
              />
            </div>
          </div>

          {/* Filtered Daily Preview */}
          <div className="bg-[#151518] border border-[#26262e] rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10.5px] font-black text-amber-400 uppercase tracking-wider">
                {modeLabel} ({todayStr.split('-').reverse().join('/')})
              </span>
              {isLoadingPreview ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
              ) : preview ? (
                <span className="text-[10px] font-bold text-zinc-300 bg-[#202028] px-2 py-0.5 rounded-full border border-zinc-700">
                  {preview.eligibleMatchesCount} jogo{preview.eligibleMatchesCount === 1 ? '' : 's'} •{' '}
                  {formatBreakdown(preview.plannedBreakdown)}
                </span>
              ) : null}
            </div>

            {preview && preview.matches.length > 0 ? (
              <div className="max-h-36 overflow-y-auto space-y-1 pr-1">
                {preview.matches.map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg bg-[#1a1a20] border border-[#272732] text-[11px]"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[10px] font-bold text-zinc-400 shrink-0">
                        {m.time || '16:00'}
                      </span>
                      <span className="font-semibold text-white truncate">
                        <span className={mode === 'home' ? 'text-[#ccff00] font-black' : 'text-zinc-300'}>
                          {m.team1}
                        </span>{' '}
                        <span className="text-zinc-500">x</span>{' '}
                        <span className={mode === 'away' ? 'text-[#ccff00] font-black' : 'text-zinc-300'}>
                          {m.team2}
                        </span>
                      </span>
                    </div>
                    {m.alreadyInBet && (
                      <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/50 border border-emerald-800/50 px-1.5 py-0.5 rounded shrink-0">
                        Salvo
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-[11px] text-zinc-400 py-2 text-center bg-[#1a1a20] rounded-lg border border-[#26262e]">
                {isLoadingPreview
                  ? 'Buscando jogos...'
                  : `Nenhum jogo encontrado hoje (${mode === 'home' ? 'favoritos em casa' : 'favoritos fora'}).`}
              </div>
            )}
          </div>

          {/* Single Simple Footer */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#222226] shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-zinc-300 hover:text-white bg-[#18181c] hover:bg-[#222228] border border-[#2c2c34] transition-all cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2 rounded-xl text-xs font-black text-black bg-[#ccff00] hover:bg-[#b8e600] shadow-md transition-all cursor-pointer uppercase tracking-wider disabled:opacity-50"
            >
              {isSaving ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
