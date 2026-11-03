import type { FormAnswers, MusicFeatures, QuestionKey } from '../types/music';

export interface QuestionOption {
  value: FormAnswers[QuestionKey];
  label: string;
}

export interface QuestionDef {
  key: QuestionKey;
  title: string;
  options: QuestionOption[];
}

// As 5 perguntas de alternativas do formulário
export const QUESTIONS: QuestionDef[] = [
  {
    key: 'energia',
    title: 'Qual é o nível de energia?',
    options: [
      { value: 'baixa', label: 'Baixa' },
      { value: 'media', label: 'Média' },
      { value: 'alta', label: 'Alta' },
    ],
  },
  {
    key: 'dancante',
    title: 'Ela é dançante?',
    options: [
      { value: 'pouco', label: 'Pouco' },
      { value: 'moderadamente', label: 'Moderadamente' },
      { value: 'muito', label: 'Muito' },
    ],
  },
  {
    key: 'sons',
    title: 'Como são os sons predominantes?',
    options: [
      { value: 'acusticos', label: 'Acústicos' },
      { value: 'misturados', label: 'Misturados' },
      { value: 'eletronicos', label: 'Eletrônicos' },
    ],
  },
  {
    key: 'voz',
    title: 'Como é a presença de voz?',
    options: [
      { value: 'muita', label: 'Muita voz' },
      { value: 'voz_instrumentos', label: 'Voz e instrumentos' },
      { value: 'instrumental', label: 'Instrumental' },
    ],
  },
  {
    key: 'sensacao',
    title: 'Qual sensação a música transmite?',
    options: [
      { value: 'triste', label: 'Triste' },
      { value: 'neutra', label: 'Neutra' },
      { value: 'alegre', label: 'Alegre' },
    ],
  },
];

// Estado inicial do formulário (todas as perguntas em branco)
export const DEFAULT_ANSWERS: FormAnswers = {
  descricao: '',
  energia: null,
  dancante: null,
  sons: null,
  voz: null,
  sensacao: null,
};

// Quais features cada pergunta define (usado na página "Sobre o Modelo")
export const QUESTION_FEATURES: Record<QuestionKey, string[]> = {
  energia: ['energy'],
  dancante: ['danceability'],
  sons: ['acousticness'],
  voz: ['speechiness', 'instrumentalness'],
  sensacao: ['valence', 'mode'],
};

// Features sem pergunta correspondente: recebem valores fixos padrão
export const FIXED_FEATURES = [
  'duration_ms', 'explicit', 'key', 'loudness',
  'liveness', 'tempo', 'time_signature',
];

// Tabela de mapeamento: resposta -> valor numérico da feature
const ENERGY: Record<'baixa' | 'media' | 'alta', number> = {
  baixa: 0.15,
  media: 0.5,
  alta: 0.85,
};

const DANCEABILITY: Record<'pouco' | 'moderadamente' | 'muito', number> = {
  pouco: 0.25,
  moderadamente: 0.55,
  muito: 0.85,
};

const ACOUSTICNESS: Record<'acusticos' | 'misturados' | 'eletronicos', number> = {
  acusticos: 0.9,
  misturados: 0.45,
  eletronicos: 0.05,
};

const SPEECHINESS: Record<'muita' | 'voz_instrumentos' | 'instrumental', number> = {
  muita: 0.12,
  voz_instrumentos: 0.06,
  instrumental: 0.03,
};

const INSTRUMENTALNESS: Record<'muita' | 'voz_instrumentos' | 'instrumental', number> = {
  muita: 0.0,
  voz_instrumentos: 0.05,
  instrumental: 0.85,
};

const VALENCE: Record<'triste' | 'neutra' | 'alegre', number> = {
  triste: 0.15,
  neutra: 0.5,
  alegre: 0.85,
};

// Atualiza uma resposta específica mantendo as demais
export function updateAnswer<K extends QuestionKey>(
  answers: FormAnswers,
  key: K,
  value: FormAnswers[K]
): FormAnswers {
  return Object.assign({}, answers, { [key]: value });
}

// Converte as respostas do formulário nas 14 features esperadas pelo modelo.
// As features não cobertas pelas perguntas usam valores fixos padrão.
export function answersToFeatures(answers: FormAnswers): MusicFeatures {
  const energia = answers.energia ?? 'media';
  const dancante = answers.dancante ?? 'moderadamente';
  const sons = answers.sons ?? 'misturados';
  const voz = answers.voz ?? 'voz_instrumentos';
  const sensacao = answers.sensacao ?? 'neutra';

  return {
    duration_ms: 200000,
    explicit: 0,
    danceability: DANCEABILITY[dancante],
    energy: ENERGY[energia],
    key: 0,
    loudness: -8,
    mode: sensacao === 'triste' ? 0 : 1,
    speechiness: SPEECHINESS[voz],
    acousticness: ACOUSTICNESS[sons],
    instrumentalness: INSTRUMENTALNESS[voz],
    liveness: 0.1,
    valence: VALENCE[sensacao],
    tempo: 120,
    time_signature: 4,
  };
}

// Verifica se as 5 perguntas de alternativas foram respondidas
export function isComplete(answers: FormAnswers): boolean {
  return QUESTIONS.every((question) => answers[question.key] !== null);
}
