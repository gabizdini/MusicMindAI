import React from 'react';
import type { FormAnswers, QuestionKey } from '../types/music';
import { MessageSquareText, Send, RotateCcw } from 'lucide-react';
import { QUESTIONS, DEFAULT_ANSWERS, updateAnswer, isComplete } from '../utils/answers';

interface MusicFormProps {
  answers: FormAnswers;
  onChange: React.Dispatch<React.SetStateAction<FormAnswers>>;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export const MusicForm: React.FC<MusicFormProps> = ({
  answers,
  onChange,
  onSubmit,
  loading
}) => {
  const handleChange = (key: QuestionKey, value: FormAnswers[QuestionKey]) => {
    onChange((prev) => updateAnswer(prev, key, value));
  };

  const handleReset = () => {
    onChange(DEFAULT_ANSWERS);
  };

  const complete = isComplete(answers);

  return (
    <form onSubmit={onSubmit} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <MessageSquareText className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white m-0">Conte como é essa música</h2>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Limpar Respostas</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Descrição (texto livre - apenas coletado) */}
        <div className="space-y-2 md:col-span-2">
          <div className="flex items-center gap-1.5">
            <label htmlFor="descricao" className="text-xs font-medium text-slate-300">
              Como você descreveria essa música?
            </label>
            <span className="text-[10px] text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">
              opcional
            </span>
          </div>
          <textarea
            id="descricao"
            rows={3}
            value={answers.descricao}
            onChange={(e) => onChange((prev) => ({ ...prev, descricao: e.target.value }))}
            placeholder="Ex: uma música animada, com guitarra elétrica e voz forte..."
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 resize-y"
          />
        </div>

        {/* Perguntas de alternativas */}
        {QUESTIONS.map((question) => (
          <div key={question.key} className="space-y-2">
            <label className="block text-xs font-medium text-slate-300">
              {question.title}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {question.options.map((option) => {
                const isSelected = answers[question.key] === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleChange(question.key, option.value)}
                    className={`px-2 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer leading-tight ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-2 border-indigo-500 shadow-lg shadow-indigo-600/30'
                        : 'bg-slate-950 text-slate-300 border border-slate-700 hover:border-indigo-500 hover:text-white'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col items-end gap-2">
        {!complete && (
          <span className="text-xs text-amber-400">
            Responda as 5 perguntas para liberar a análise.
          </span>
        )}
        <button
          type="submit"
          disabled={loading || !complete}
          className="flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
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
