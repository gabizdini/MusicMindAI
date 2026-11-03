export interface MusicFeatures {
  duration_ms: number;
  explicit: number;
  danceability: number;
  energy: number;
  key: number;
  loudness: number;
  mode: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  tempo: number;
  time_signature: number;
}

export interface PredictionResponse {
  genero: string;
  mensagem: string;
  erro?: string;
  detalhes?: string;
}

export type GenreType = 'classical' | 'electronic' | 'hip-hop' | 'jazz' | 'pop' | 'rock' | string;
