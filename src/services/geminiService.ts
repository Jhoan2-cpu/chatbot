import { GoogleGenerativeAI } from '@google/generative-ai';
import { SYSTEM_PROMPT } from '../utils/prompts';

export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    // Usar models/gemini-2.5-flash (nombre completo encontrado en la API)
    // Este es el modelo más reciente y rápido disponible
    this.model = this.genAI.getGenerativeModel({
      model: 'models/gemini-2.5-flash'
    });
  }

  async generateResponse(userMessage: string): Promise<string> {
    try {
      const prompt = `${SYSTEM_PROMPT}\n\nPregunta del estudiante: ${userMessage}\n\nRespuesta:`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return text;
    } catch (error: any) {
      console.error('Error en Gemini Service:', error);
      throw new Error('Error al generar respuesta con IA');
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.model.generateContent('test');
      return true;
    } catch (error) {
      return false;
    }
  }
}
