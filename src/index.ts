import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { GeminiService } from './services/geminiService';
import { ChatController } from './controllers/chatController';
import { createChatRouter } from './routes/chat';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Validar API Key
if (!process.env.GEMINI_API_KEY) {
  console.error('ERROR: GEMINI_API_KEY no está configurada');
  console.error('Obtén una en: https://aistudio.google.com/apikey');
  process.exit(1);
}

// Configuración CORS
const corsOptions = {
  origin: function (origin: string | undefined, callback: any) {
    // Permitir requests sin origin (como Postman, apps móviles, etc.)
    if (!origin) return callback(null, true);

    // Lista de orígenes permitidos
    const allowedOrigins = [
      'https://moodle.cetivirgendelapuerta.com',
      'http://localhost:3000',
      /\.onrender\.com$/  // Cualquier subdominio de Render
    ];

    const isAllowed = allowedOrigins.some(allowed => {
      if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return allowed === origin;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: ['GET', 'POST'],
  credentials: false
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Inicializar servicios
const geminiService = new GeminiService(process.env.GEMINI_API_KEY);
const chatController = new ChatController(geminiService);

// Rutas API
app.use('/api', createChatRouter(chatController));

// Health check
app.get('/health', async (req, res) => {
  try {
    const geminiConnected = await geminiService.testConnection();
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      geminiConnected
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString()
    });
  }
});

// Ruta principal - servir HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`🤖 Chatbot de Comunicación activo`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
