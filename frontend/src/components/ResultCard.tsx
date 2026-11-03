import React, { useEffect, useRef } from 'react';
import type { PredictionResponse } from '../types/music';
import { Disc, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ResultCardProps {
  result: PredictionResponse | null;
  error: string | null;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, error }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ((result || error) && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [result, error]);

  if (!result && !error) return null;

  const formatGenreInfo = (genre: string) => {
    switch (genre.toLowerCase()) {
      case 'pop': return { name: 'Pop Moderno', emoji: '🎤' };
      case 'rock': return { name: 'Rock Clássico', emoji: '🎸' };
      case 'hip-hop': return { name: 'Hip-Hop', emoji: '🎧' };
      case 'classical': return { name: 'Música Clássica', emoji: '🎻' };
      case 'jazz': return { name: 'Jazz', emoji: '🎷' };
      case 'electronic': return { name: 'Música Eletrônica', emoji: '🎹' };
      default: return { name: genre, emoji: '🎵' };
    }
  };

  const genreInfo = result ? formatGenreInfo(result.genero) : { name: '', emoji: '🎵' };

  return (
    <div ref={cardRef} className="mt-8 scroll-mt-8">
      {error && (
        <div className="p-4 bg-rose-950/50 border border-rose-800/80 rounded-2xl flex items-start gap-3 text-rose-200">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-rose-300 m-0">Erro na Previsão</h4>
            <p className="text-sm m-0 mt-1 text-rose-200/90">{error}</p>
          </div>
        </div>
      )}

      {result && !error && (
        <div className="p-6 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-purple-950/80 border border-indigo-500/30 rounded-2xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-3xl shadow-inner">
              {genreInfo.emoji}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Previsão Concluída com Sucesso</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white m-0 flex items-center gap-2">
                {genreInfo.name}
              </h3>
              <p className="text-slate-300 text-sm mt-1 m-0">
                Seu estilo musical é {genreInfo.name.toLowerCase()}!
              </p>
            </div>
            <div className="hidden sm:flex items-center justify-center p-3 text-indigo-400">
              <Disc className="w-10 h-10 opacity-60 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
