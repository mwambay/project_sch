import axios from 'axios';

const API_URL = 'http://localhost:3000/gemini';

export interface GeminiFilters {
  ville?: string;
  genre?: string;
  annee?: string;
  classe?: string;
  option?: string;
}

export const GeminiService = {
  /**
   * Envoie une requête en langage naturel à l'API Gemini et récupère les filtres extraits.
   * @param prompt La requête utilisateur en langage naturel.
   */
  async getFilters(prompt: string): Promise<GeminiFilters> {
    const response = await axios.post(`${API_URL}/filters`, { prompt });
    // On suppose que le backend retourne { filters: { ... } }
    return typeof response.data.filters === 'string'
      ? JSON.parse(response.data.filters)
      : response.data.filters;
  },

  /**
   * Envoie un prompt à l'API Gemini pour obtenir un résumé IA.
   * @param prompt Le prompt à résumer.
   */
  async getSummary(prompt: string): Promise<string> {
    const response = await axios.post(`${API_URL}/summary`, { prompt });
    return response.data.summary;
  }
};