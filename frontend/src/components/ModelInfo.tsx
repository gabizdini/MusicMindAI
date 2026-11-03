import React from 'react';
import {
  Cpu, Database, BarChart3, ShieldCheck, Layers, Sparkles,
  MessageSquareText, ArrowRight
} from 'lucide-react';
import { QUESTIONS, QUESTION_FEATURES, FIXED_FEATURES } from '../utils/answers';

const featureLabels: Record<string, string> = {
  duration_ms: 'Duração',
  explicit: 'Explícito',
  danceability: 'Dançabilidade',
  energy: 'Energia',
  key: 'Tom',
  loudness: 'Volume (dB)',
  mode: 'Modo (Maior/Menor)',
  speechiness: 'Fala/Vocal',
  acousticness: 'Acústica',
  instrumentalness: 'Instrumental',
  liveness: 'Ao vivo',
  valence: 'Positividade/Alegria',
  tempo: 'BPM',
  time_signature: 'Compasso',
};

const ALL_FEATURES = Object.keys(featureLabels);
const derivedFeatures = new Set(Object.values(QUESTION_FEATURES).flat());

export const ModelInfo: React.FC = () => {
  const genres = [
    { name: 'Pop', icon: '🎤', desc: 'Melodias comerciais, alta energia e dançabilidade.' },
    { name: 'Rock', icon: '🎸', desc: 'Guitarras marcantes, energia alta e batidas fortes.' },
    { name: 'Hip-Hop', icon: '🎧', desc: 'Ritmos cadenciados, batidas fortes e alta vocalização (speechiness).' },
    { name: 'Música Clássica', icon: '🎻', desc: 'Composições acústicas, alto grau de instrumental e sem vocais.' },
    { name: 'Jazz', icon: '🎷', desc: 'Harmonias sofisticadas, acústica rica e improvisação.' },
    { name: 'Eletrônica', icon: '🎹', desc: 'Sintetizadores, alta energia e batidas eletrônicas pulsantes.' }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Overview */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-indigo-600/20 border border-indigo-500/30 rounded-xl text-indigo-400">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white m-0">Sobre o Modelo de Machine Learning</h2>
            <p className="text-sm text-slate-400 m-0">Arquitetura, treinamento e funcionamento da IA</p>
          </div>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">
          O <strong className="text-white">MusicMind AI</strong> utiliza um classificador supervisionado baseado em <strong className="text-indigo-400">Random Forest (Floresta Aleatória)</strong>. O modelo foi treinado para analisar padrões complexos entre 14 características acústicas extraídas de faixas musicais e classificá-las em 6 gêneros principais.
        </p>
        <p className="text-slate-300 text-sm leading-relaxed mt-3">
          Para interagir com ele, você não preenche valores técnicos: basta responder <strong className="text-white">5 perguntas simples</strong> sobre a música (mais uma descrição opcional). O sistema traduz essas respostas nos 14 parâmetros numéricos que o modelo entende.
        </p>
      </div>

      {/* Grid Specs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-2.5 text-indigo-400 mb-3">
            <Database className="w-5 h-5" />
            <h3 className="font-semibold text-white m-0">Dataset</h3>
          </div>
          <p className="text-sm text-slate-300 m-0 leading-relaxed">
            Treinado com dados do Spotify extraídos via Hugging Face (<code className="text-xs bg-slate-950 px-1.5 py-0.5 rounded text-indigo-300">spotify-tracks-dataset</code>), rigorosamente limpo e balanceado.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-2.5 text-indigo-400 mb-3">
            <BarChart3 className="w-5 h-5" />
            <h3 className="font-semibold text-white m-0">Hiperparâmetros</h3>
          </div>
          <ul className="text-sm text-slate-300 space-y-1.5 m-0 list-disc list-inside">
            <li><strong className="text-white">300</strong> Estimadores (Árvores)</li>
            <li><strong className="text-white">max_depth</strong> = 20</li>
            <li><strong className="text-white">min_samples_split</strong> = 5</li>
            <li><strong className="text-white">random_state</strong> = 42</li>
          </ul>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-2.5 text-indigo-400 mb-3">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="font-semibold text-white m-0">Validação</h3>
          </div>
          <p className="text-sm text-slate-300 m-0 leading-relaxed">
            Divisão treino/teste de 80/20 com estratificação por gênero (<code className="text-xs bg-slate-950 px-1.5 py-0.5 rounded text-emerald-400">stratify=y</code>), garantindo robustez e evitando viés de amostragem.
          </p>
        </div>
      </div>

      {/* Como as respostas viram features */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquareText className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-bold text-white m-0">Como suas respostas viram dados</h3>
        </div>
        <p className="text-sm text-slate-300 mb-5">
          Cada resposta do formulário é convertida automaticamente nos valores numéricos enviados à API:
        </p>

        <div className="space-y-3">
          {QUESTIONS.map((question) => (
            <div
              key={question.key}
              className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl"
            >
              <div className="sm:w-1/2">
                <p className="text-sm font-medium text-white m-0">{question.title}</p>
                <p className="text-[11px] text-slate-400 m-0 mt-0.5">
                  {question.options.map((o) => o.label).join(' • ')}
                </p>
              </div>
              <div className="flex-1 flex items-center gap-2 flex-wrap">
                <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />
                {QUESTION_FEATURES[question.key].map((feature) => (
                  <span
                    key={feature}
                    className="px-2 py-1 bg-indigo-600/15 border border-indigo-500/30 text-xs font-mono text-indigo-300 rounded-md"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-400 mt-4 leading-relaxed">
          Os outros {FIXED_FEATURES.length} parâmetros ({FIXED_FEATURES.join(', ')}) usam
          <strong className="text-slate-300"> valores fixos padrão</strong>, já que não há pergunta
          correspondente no formulário. A descrição escrita é apenas coletada como contexto e não
          interfere na previsão.
        </p>
      </div>

      {/* Genres Covered */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-bold text-white m-0">Gêneros Classificados</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {genres.map((g, idx) => (
            <div key={idx} className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl flex items-start gap-3">
              <span className="text-2xl">{g.icon}</span>
              <div>
                <h4 className="font-semibold text-white text-sm m-0">{g.name}</h4>
                <p className="text-xs text-slate-400 m-0 mt-1">{g.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 14 Features */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <Layers className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-bold text-white m-0">As 14 Características de Entrada (Features)</h3>
        </div>
        <p className="text-sm text-slate-300 mb-4">
          O modelo avalia conjuntamente estes 14 parâmetros numéricos para traçar o perfil sonoro.
          As cores indicam de onde cada um vem:
        </p>

        <div className="flex flex-wrap items-center gap-4 mb-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
            <span className="text-slate-400">Definidas pelas suas respostas ({derivedFeatures.size})</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-600"></span>
            <span className="text-slate-400">Valores fixos padrão ({FIXED_FEATURES.length})</span>
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {ALL_FEATURES.map((feat) => {
            const isDerived = derivedFeatures.has(feat);
            return (
              <span
                key={feat}
                title={isDerived
                  ? `Definida pela resposta: ${QUESTIONS.filter((q) => QUESTION_FEATURES[q.key].includes(feat)).map((q) => q.title).join(', ')}`
                  : 'Valor fixo padrão, sem pergunta correspondente'}
                className={`px-3 py-1.5 border text-xs font-mono rounded-lg ${
                  isDerived
                    ? 'bg-indigo-600/15 border-indigo-500/30 text-indigo-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                {feat} <span className="opacity-60">({featureLabels[feat]})</span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};
