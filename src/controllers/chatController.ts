import { Request, Response } from 'express';
import { GeminiService } from '../services/geminiService';
import { v4 as uuidv4 } from 'uuid';

// Validación de mensaje
function validateMessage(message: string): { valid: boolean; error?: string } {
  if (!message || typeof message !== 'string') {
    return { valid: false, error: 'El mensaje es requerido y debe ser texto' };
  }

  if (message.length < 1 || message.length > 500) {
    return { valid: false, error: 'El mensaje debe tener entre 1 y 500 caracteres' };
  }

  // Prevenir XSS básico
  if (/<script|javascript:|on\w+=/i.test(message)) {
    return { valid: false, error: 'El mensaje contiene contenido no permitido' };
  }

  return { valid: true };
}

export class ChatController {
  private geminiService: GeminiService;

  constructor(geminiService: GeminiService) {
    this.geminiService = geminiService;
  }

  async handleChat(req: Request, res: Response): Promise<void> {
    try {
      const { message, conversationId } = req.body;

      // Validar mensaje
      const validation = validateMessage(message);
      if (!validation.valid) {
        res.status(400).json({
          success: false,
          error: {
            code: 'INVALID_INPUT',
            message: validation.error
          }
        });
        return;
      }

      // Generar respuesta con Gemini
      const response = await this.geminiService.generateResponse(message);

      // Construir respuesta
      res.json({
        success: true,
        data: {
          response: response,
          timestamp: new Date().toISOString(),
          conversationId: conversationId || uuidv4()
        }
      });

    } catch (error: any) {
      console.error('Error en chat controller:', error);
      res.status(500).json({
        success: false,
        error: {
          code: 'AI_SERVICE_ERROR',
          message: 'Error al conectar con el servicio de IA. Intenta nuevamente.'
        }
      });
    }
  }
}
