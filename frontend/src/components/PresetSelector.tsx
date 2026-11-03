import React from 'react';
import { PRESETS } from '../utils/presets';
import type { MusicFeatures } from '../types/music';
import { Sparkles } from 'lucide-react';

interface PresetSelectorProps {
  selectedPreset: string;
  onSelectPreset: (key: string, presetData: MusicFeatures) => void;
}

export const PresetSelector: React.FC<PresetSelectorProps> = ({ selectedPreset, onSelectPreset }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-amber-400" />
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
          Estilos de Referência (Preenchimento Rápido)
        </h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {Object.entries(PRESETS).map(([key, preset]) => {
          const isSelected = selectedPreset === key;
          return (
            <button
              key={key}
              onClick={() => onSelectPreset(key, preset.data)}
              className={`flex flex-col items-start p-3 rounded-xl transition-all text-left group shadow-sm cursor-pointer active:scale-95 ${
                isSelected
                  ? 'bg-indigo-950/60 border-2 border-indigo-500 ring-2 ring-indigo-500/30 shadow-indigo-500/20 shadow-md'
                  : 'bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 hover:border-indigo-500/50'
              }`}
            >
              <span className={`text-2xl mb-1 transition-transform ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`}>
                {preset.icon}
              </span>
              <span className={`font-medium text-sm ${isSelected ? 'text-indigo-300 font-bold' : 'text-white group-hover:text-indigo-300'}`}>
                {preset.label}
              </span>
              <span className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                {preset.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
