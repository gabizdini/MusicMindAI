import React from 'react';
import { Music, Activity } from 'lucide-react';

interface HeaderProps {
  apiStatus: boolean | null;
  onRefreshStatus: () => void;
}

export const Header: React.FC<HeaderProps> = ({ apiStatus, onRefreshStatus }) => {
  return (
    <header className="py-8 px-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/30">
            <Music className="w-8 h-8 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white m-0">
              MusicMind <span className="text-indigo-400">AI</span>
            </h1>
            <p className="text-sm text-slate-400 m-0">
              Classificador Inteligente de Gêneros Musicais por Machine Learning
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRefreshStatus}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-all border border-slate-700"
            title="Verificar status do backend"
          >
            <Activity className="w-3.5 h-3.5 text-indigo-400" />
            <span>API:</span>
            {apiStatus === null ? (
              <span className="text-amber-400 font-medium">Verificando...</span>
            ) : apiStatus ? (
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Online
              </span>
            ) : (
              <span className="text-rose-400 font-medium">Offline</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
