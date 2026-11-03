import type { MusicFeatures, PredictionResponse } from '../types/music';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    if (!response.ok) return false;
    const data = await response.json();
    return data.status === 'online';
  } catch {
    return false;
  }
}

export async function predictGenre(features: MusicFeatures): Promise<PredictionResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(features),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.erro || 'Falha ao realizar a previsão.');
    }

    return data;
  } catch (error: any) {
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error('Não foi possível conectar ao servidor backend (Flask). Verifique se o servidor está rodando em http://127.0.0.1:5000.');
    }
    throw error;
  }
}
