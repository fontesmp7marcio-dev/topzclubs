import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { getBrasiliaTodayStr } from '../utils/dateUtils';

interface CalendarPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string; // YYYY-MM-DD
  onSelectDate: (date: string) => void;
}

export const CalendarPickerModal: React.FC<CalendarPickerModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  onSelectDate,
}) => {
  const [currentYear, setCurrentYear] = useState(() => {
    const parts = (selectedDate || getBrasiliaTodayStr()).split('-').map(Number);
    return parts[0] || 2026;
  });
  const [currentMonth, setCurrentMonth] = useState(() => {
    const parts = (selectedDate || getBrasiliaTodayStr()).split('-').map(Number);
    return (parts[1] || 9) - 1; // 0-indexed
  });

  useEffect(() => {
    if (isOpen && selectedDate) {
      const parts = selectedDate.split('-').map(Number);
      if (parts.length === 3) {
        setCurrentYear(parts[0]);
        setCurrentMonth(parts[1] - 1);
      }
    }
  }, [isOpen, selectedDate]);

  if (!isOpen) return null;

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfWeek }, (_, i) => i);

  const handleDayClick = (day: number) => {
    const mm = String(currentMonth + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    const dateStr = `${currentYear}-${mm}-${dd}`;
    onSelectDate(dateStr);
    onClose();
  };

  const parsedParts = (selectedDate || getBrasiliaTodayStr()).split('-').map(Number);
  const isDaySelected = (day: number) => {
    return (
      parsedParts[0] === currentYear &&
      parsedParts[1] === currentMonth + 1 &&
      parsedParts[2] === day
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div
        id="modal-calendar-picker"
        className="bg-[#141414] border border-[#262626] rounded-2xl w-full max-w-sm p-4 shadow-2xl relative select-none"
      >
        {/* Header month / year switcher matching Screenshot 7 */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#222222]">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-sm font-bold text-white tracking-tight">
            {monthNames[currentMonth]} {currentYear}
          </span>

          <button
            onClick={handleNextMonth}
            className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Days of week */}
        <div className="grid grid-cols-7 text-center mb-2">
          {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((wd, i) => (
            <span key={i} className="text-[11px] font-semibold text-zinc-500 py-1">
              {wd}
            </span>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {blanks.map((b) => (
            <div key={`blank-${b}`} className="p-2"></div>
          ))}

          {days.map((day) => {
            const selected = isDaySelected(day);
            return (
              <button
                key={day}
                onClick={() => handleDayClick(day)}
                className={`py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                  selected
                    ? 'bg-emerald-500 text-black font-extrabold shadow-md'
                    : 'text-zinc-300 hover:bg-[#222222] hover:text-white'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Quick action: Hoje */}
        <div className="mt-4 pt-3 border-t border-[#222222] flex items-center justify-between">
          <button
            onClick={() => {
              onSelectDate(getBrasiliaTodayStr());
              onClose();
            }}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
          >
            Ir para Hoje (Brasília)
          </button>

          <button
            onClick={onClose}
            className="text-xs text-zinc-400 hover:text-white font-medium px-3 py-1 rounded-md hover:bg-zinc-800 cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
