import { useState, useEffect, useCallback } from 'react';
import type { FormAnswers, PredictionResponse } from './types/music';
import { DEFAULT_ANSWERS, answersToFeatures } from './utils/answers';
import { checkApiHealth, predictGenre } from './services/api';
import { Header } from './components/Header';
import { MusicForm } from './components/MusicForm';
import { ResultCard } from './components/ResultCard';
import { ModelInfo } from './components/ModelInfo';
import { Sliders, Cpu } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'predictor' | 'model-info'>('predictor');
  const [answers, setAnswers] = useState<FormAnswers>(DEFAULT_ANSWERS);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<boolean | null>(null);

  const verifyApi = useCallback(async () => {
    setApiStatus(null);
    const status = await checkApiHealth();
    setApiStatus(status);
  }, []);

  useEffect(() => {
    verifyApi();
  }, [verifyApi]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await predictGenre(answersToFeatures(answers));
      setResult(response);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro desconhecido.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      <Header apiStatus={apiStatus} onRefreshStatus={verifyApi} />

      {/* Navigation Tabs */}
      <div className="max-w-5xl w-full mx-auto px-4 pt-6">
        <div className="flex border-b border-slate-800 gap-6">
          <button
            onClick={() => setActiveTab('predictor')}
            className={`flex items-center gap-2 pb-3 text-sm font-semibold transition-colors border-b-2 cursor-pointer ${
              activeTab === 'predictor'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Preditor Interativo</span>
          </button>
          <button
            onClick={() => setActiveTab('model-info')}
            className={`flex items-center gap-2 pb-3 text-sm font-semibold transition-colors border-b-2 cursor-pointer ${
              activeTab === 'model-info'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Sobre o Modelo & Acurácia</span>
          </button>
        </div>
      </div>

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
        {activeTab === 'predictor' ? (
          <>
            <MusicForm
              answers={answers}
              onChange={setAnswers}
              onSubmit={handleSubmit}
              loading={loading}
            />

            <ResultCard result={result} error={error} />
          </>
        ) : (
          <ModelInfo />
        )}
      </main>

      <footer className="py-6 border-t border-slate-800 text-center text-xs text-slate-500">
        MusicMind AI &copy; 2026 &bull; Desenvolvido por Gabrieli, Laurene e Melissa
      </footer>
    </div>
  );
}

export default App;
