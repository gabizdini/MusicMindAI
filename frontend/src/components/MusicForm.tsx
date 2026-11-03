import React from 'react';
import type { MusicFeatures } from '../types/music';
import { Sliders, Send, RotateCcw } from 'lucide-react';
import { INITIAL_VALUES } from '../utils/presets';

interface MusicFormProps {
  features: MusicFeatures;
  onChange: (features: MusicFeatures) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export const MusicForm: React.FC<MusicFormProps> = ({
  features,
  onChange,
  onSubmit,
  loading
}) => {
  const handleChange = (key: keyof MusicFeatures, value: number) => {
    onChange({
      ...features,
      [key]: value
    });
  };

  const handleReset = () => {
    onChange(INITIAL_VALUES);
  };

  return (
    <form onSubmit={onSubmit} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white m-0">Características Sonoras da Música</h2>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restaurar Padrão</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Duração */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <label className="font-medium text-slate-300">Duração (ms)</label>
            <span className="text-indigo-400 font-mono">{(features.duration_ms / 1000).toFixed(1)}s</span>
          </div>
          <input
            type="number"
            min="10000"
            max="3600000"
            value={features.duration_ms}
            onChange={(e) => handleChange('duration_ms', Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
          />
        </div>

        {/* Explicit */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-300">Explícito</label>
          <select
            value={features.explicit}
            onChange={(e) => handleChange('explicit', Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
          >
            <option value={0}>Não (0)</option>
            <option value={1}>Sim (1)</option>
          </select>
        </div>

        {/* Danceability */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <label className="font-medium text-slate-300">Dançabilidade (Danceability)</label>
            <span className="text-indigo-400 font-mono">{features.danceability}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="any"
            value={features.danceability}
            onChange={(e) => handleChange('danceability', Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>

        {/* Energy */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <label className="font-medium text-slate-300">Energia (Energy)</label>
            <span className="text-indigo-400 font-mono">{features.energy}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="any"
            value={features.energy}
            onChange={(e) => handleChange('energy', Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>

        {/* Key */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <label className="font-medium text-slate-300">Tom (Key: 0-11)</label>
            <span className="text-indigo-400 font-mono">{features.key}</span>
          </div>
          <input
            type="number"
            min="0"
            max="11"
            value={features.key}
            onChange={(e) => handleChange('key', Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
          />
        </div>

        {/* Loudness */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <label className="font-medium text-slate-300">Volume (Loudness dB)</label>
            <span className="text-indigo-400 font-mono">{features.loudness} dB</span>
          </div>
          <input
            type="number"
            min="-60"
            max="0"
            step="any"
            value={features.loudness}
            onChange={(e) => handleChange('loudness', Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
          />
        </div>

        {/* Mode */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-300">Modo (Mode: 0=Minor, 1=Major)</label>
          <select
            value={features.mode}
            onChange={(e) => handleChange('mode', Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
          >
            <option value={0}>Menor (0)</option>
            <option value={1}>Maior (1)</option>
          </select>
        </div>

        {/* Speechiness */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <label className="font-medium text-slate-300">Fala/Vocalização (Speechiness)</label>
            <span className="text-indigo-400 font-mono">{features.speechiness}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="any"
            value={features.speechiness}
            onChange={(e) => handleChange('speechiness', Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>

        {/* Acousticness */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <label className="font-medium text-slate-300">Acústica (Acousticness)</label>
            <span className="text-indigo-400 font-mono">{features.acousticness}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="any"
            value={features.acousticness}
            onChange={(e) => handleChange('acousticness', Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>

        {/* Instrumentalness */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <label className="font-medium text-slate-300">Instrumental (Instrumentalness)</label>
            <span className="text-indigo-400 font-mono">{features.instrumentalness}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="any"
            value={features.instrumentalness}
            onChange={(e) => handleChange('instrumentalness', Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>

        {/* Liveness */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <label className="font-medium text-slate-300">Ao Vivo (Liveness)</label>
            <span className="text-indigo-400 font-mono">{features.liveness}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="any"
            value={features.liveness}
            onChange={(e) => handleChange('liveness', Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>

        {/* Valence */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <label className="font-medium text-slate-300">Positividade (Valence)</label>
            <span className="text-indigo-400 font-mono">{features.valence}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="any"
            value={features.valence}
            onChange={(e) => handleChange('valence', Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>

        {/* Tempo */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <label className="font-medium text-slate-300">Andamento (Tempo BPM)</label>
            <span className="text-indigo-400 font-mono">{features.tempo} BPM</span>
          </div>
          <input
            type="number"
            min="40"
            max="220"
            step="any"
            value={features.tempo}
            onChange={(e) => handleChange('tempo', Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
          />
        </div>

        {/* Time Signature */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-300">Compasso (Time Signature)</label>
          <select
            value={features.time_signature}
            onChange={(e) => handleChange('time_signature', Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
          >
            <option value={3}>3/4</option>
            <option value={4}>4/4</option>
            <option value={5}>5/4</option>
          </select>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Analisando com IA...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Analisar Gênero Musical</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
