import type { MusicFeatures } from '../types/music';

export const PRESETS: Record<string, { label: string; description: string; icon: string; data: MusicFeatures }> = {
  pop: {
    label: 'Pop Moderno',
    description: 'Baseado em faixa real de Pop do Spotify',
    icon: '🎤',
    data: {
      duration_ms: 200040,
      explicit: 0,
      danceability: 0.514,
      energy: 0.73,
      key: 1,
      loudness: -5.934,
      mode: 1,
      speechiness: 0.0598,
      acousticness: 0.00146,
      instrumentalness: 0.0000954,
      liveness: 0.0897,
      valence: 0.334,
      tempo: 171.005,
      time_signature: 4
    }
  },
  rock: {
    label: 'Rock Clássico',
    description: 'Energia alta, guitarras e batida forte',
    icon: '🎸',
    data: {
      duration_ms: 260000,
      explicit: 0,
      danceability: 0.45,
      energy: 0.88,
      key: 4,
      loudness: -6.0,
      mode: 1,
      speechiness: 0.05,
      acousticness: 0.02,
      instrumentalness: 0.05,
      liveness: 0.25,
      valence: 0.55,
      tempo: 135.0,
      time_signature: 4
    }
  },
  hiphop: {
    label: 'Hip-Hop',
    description: 'Batidas marcantes e speechiness acentuada',
    icon: '🎧',
    data: {
      duration_ms: 200000,
      explicit: 1,
      danceability: 0.82,
      energy: 0.70,
      key: 8,
      loudness: -7.0,
      mode: 0,
      speechiness: 0.28,
      acousticness: 0.08,
      instrumentalness: 0.00,
      liveness: 0.18,
      valence: 0.65,
      tempo: 95.0,
      time_signature: 4
    }
  },
  classical: {
    label: 'Música Clássica',
    description: 'Acústico, sem voz, instrumental rico',
    icon: '🎻',
    data: {
      duration_ms: 400000,
      explicit: 0,
      danceability: 0.25,
      energy: 0.15,
      key: 2,
      loudness: -20.0,
      mode: 1,
      speechiness: 0.04,
      acousticness: 0.95,
      instrumentalness: 0.88,
      liveness: 0.10,
      valence: 0.20,
      tempo: 80.0,
      time_signature: 4
    }
  },
  jazz: {
    label: 'Jazz',
    description: 'Baseado em faixa real de Jazz do Spotify',
    icon: '🎷',
    data: {
      duration_ms: 438493,
      explicit: 0,
      danceability: 0.749,
      energy: 0.497,
      key: 10,
      loudness: -12.609,
      mode: 0,
      speechiness: 0.105,
      acousticness: 0.41,
      instrumentalness: 0.0499,
      liveness: 0.0504,
      valence: 0.585,
      tempo: 95.818,
      time_signature: 4
    }
  },
  electronic: {
    label: 'Eletrônica',
    description: 'Sintetizadores e batida pulsante',
    icon: '🎹',
    data: {
      duration_ms: 330000,
      explicit: 0,
      danceability: 0.72,
      energy: 0.92,
      key: 9,
      loudness: -4.0,
      mode: 1,
      speechiness: 0.07,
      acousticness: 0.01,
      instrumentalness: 0.78,
      liveness: 0.20,
      valence: 0.40,
      tempo: 128.0,
      time_signature: 4
    }
  }
};

export const INITIAL_VALUES: MusicFeatures = PRESETS.pop.data;
