/**
 * Utilitários de data sincronizados com o Horário de Brasília (America/Sao_Paulo - UTC-3)
 */

export function getBrasiliaTodayStr(): string {
  try {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    return formatter.format(new Date()); // Formato YYYY-MM-DD
  } catch (e) {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
}

export function addDaysToDateStr(dateStr: string, days: number): string {
  const [y, m, d] = (dateStr || getBrasiliaTodayStr()).split('-').map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + days);
  const nextY = date.getFullYear();
  const nextM = String(date.getMonth() + 1).padStart(2, '0');
  const nextD = String(date.getDate()).padStart(2, '0');
  return `${nextY}-${nextM}-${nextD}`;
}

export function formatBrasiliaDateLabel(targetDateStr: string, referenceTodayStr = getBrasiliaTodayStr()): string {
  const yesterdayStr = addDaysToDateStr(referenceTodayStr, -1);
  const tomorrowStr = addDaysToDateStr(referenceTodayStr, 1);

  if (targetDateStr === referenceTodayStr) return 'Hoje';
  if (targetDateStr === tomorrowStr) return 'Amanhã';
  if (targetDateStr === yesterdayStr) return 'Ontem';

  const [y, m, d] = targetDateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const dayName = dayNames[date.getDay()] || 'Dia';
  const dayNum = String(d).padStart(2, '0');
  const monthNum = String(m).padStart(2, '0');
  return `${dayName} ${dayNum}/${monthNum}`;
}

export function formatBrasiliaDateHeader(targetDateStr: string, referenceTodayStr = getBrasiliaTodayStr()): string {
  const [y, m, d] = (targetDateStr || referenceTodayStr).split('-').map(Number);
  const months = ['jan.', 'fev.', 'mar.', 'abr.', 'mai.', 'jun.', 'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'];
  const monthName = months[m - 1] || 'set.';
  const dayPad = String(d).padStart(2, '0');

  const yesterdayStr = addDaysToDateStr(referenceTodayStr, -1);
  const tomorrowStr = addDaysToDateStr(referenceTodayStr, 1);

  if (targetDateStr === referenceTodayStr) {
    return `Hoje (${dayPad} de ${monthName})`;
  }
  if (targetDateStr === tomorrowStr) {
    return `Amanhã (${dayPad} de ${monthName})`;
  }
  if (targetDateStr === yesterdayStr) {
    return `Ontem (${dayPad} de ${monthName})`;
  }

  return `${dayPad} de ${monthName} de ${y}`;
}

export function formatBrasiliaRowDate(targetDateStr: string): string {
  if (!targetDateStr) return '';
  const parts = targetDateStr.split('-');
  if (parts.length === 3) {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const mIdx = parseInt(parts[1], 10) - 1;
    return `${parseInt(parts[2], 10)} ${months[mIdx] || 'Set'}`;
  }
  return targetDateStr;
}
