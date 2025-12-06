# 🤖 Chatbot Educativo para Moodle

Chatbot inteligente especializado en el curso de Comunicación, integrado con Google Gemini AI. Proporciona asistencia 24/7 a estudiantes a través de una interfaz embebida en Moodle.

## ✨ Características

- 💬 Chat interactivo con respuestas generadas por IA
- 📚 Especializado en temas de Comunicación
- 🎯 Preguntas sugeridas para guiar a los estudiantes
- 📱 Diseño responsive (mobile, tablet, desktop)
- ⚡ Respuestas en tiempo real
- 🔒 Límite de 20 mensajes por sesión
- 🌐 Integración mediante iframe en Moodle

## 🛠️ Stack Tecnológico

**Backend:**
- TypeScript
- Node.js 18+
- Express.js
- Google Gemini AI (gemini-pro)
- CORS habilitado

**Frontend:**
- HTML5
- CSS3 (Responsive)
- JavaScript Vanilla

**Infraestructura:**
- Hosting: Render (Free Tier)
- CI/CD: Despliegue automático desde GitHub

## 📋 Requisitos Previos

- Node.js 18 o superior
- npm o yarn
- API Key de Google Gemini AI
- Cuenta en Render (para despliegue)

## 🚀 Instalación Local

### 1. Clonar el repositorio

```bash
git clone <tu-repositorio>
cd moodle-chatbot
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
GEMINI_API_KEY=tu_api_key_de_gemini
PORT=3000
NODE_ENV=development
```

**Obtener API Key de Gemini:**
1. Visita [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crea un nuevo proyecto
3. Genera una API Key
4. Copia la key al archivo `.env`

### 4. Compilar TypeScript

```bash
npm run build
```

### 5. Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

### 6. Ejecutar en producción

```bash
npm start
```

## 📁 Estructura del Proyecto

```
moodle-chatbot/
├── src/
│   ├── index.ts              # Servidor principal
│   ├── routes/
│   │   └── chat.ts           # Rutas del API
│   ├── controllers/
│   │   └── chatController.ts # Lógica del chatbot
│   ├── services/
│   │   └── geminiService.ts  # Integración con Gemini
│   └── utils/
│       └── prompts.ts        # Prompts del sistema
├── public/
│   ├── index.html            # Interfaz del chat
│   ├── styles.css            # Estilos
│   └── app.js                # Lógica del frontend
├── dist/                      # Código compilado
├── .env                       # Variables de entorno (no incluido)
├── .env.example              # Template de variables
├── .gitignore
├── package.json
├── tsconfig.json
├── render.yaml               # Configuración de Render
└── README.md
```

## 🌐 Despliegue en Render

### Método 1: Usando render.yaml (Recomendado)

1. **Crear cuenta en Render**
   - Visita [render.com](https://render.com)
   - Regístrate con tu cuenta de GitHub

2. **Conectar repositorio**
   - Dashboard → New → Web Service
   - Conecta tu repositorio de GitHub
   - Render detectará automáticamente `render.yaml`

3. **Configurar variables de entorno**
   - En el dashboard del servicio
   - Environment → Add Environment Variable
   - Agregar: `GEMINI_API_KEY` con tu API key

4. **Desplegar**
   - Render desplegará automáticamente
   - La URL será: `https://tu-servicio.onrender.com`

### Método 2: Configuración Manual

1. **New Web Service**
   - Name: `moodle-chatbot`
   - Environment: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

2. **Variables de entorno**
   ```
   GEMINI_API_KEY=tu_api_key
   NODE_ENV=production
   ```

3. **Deploy**

### Notas sobre Render Free Tier

- ⚠️ **Cold Start:** El servicio se suspende después de 15 min de inactividad
- ⏱️ Primera request puede tardar ~30 segundos en despertar
- 💾 Límite: 512MB RAM, 0.1 CPU
- 🔄 Despliegue automático al hacer push a `main`

## 🔌 Integración con Moodle

### Código HTML para insertar en Moodle

```html
<div style="width: 100%; height: 600px; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
    <iframe
        src="https://tu-servicio.onrender.com/"
        style="width: 100%; height: 100%; border: none;"
        title="Chatbot de Comunicación"
        allow="clipboard-write"
        sandbox="allow-scripts allow-same-origin allow-forms">
    </iframe>
</div>
```

### Pasos para integrar

1. Acceder a Moodle como administrador
2. Ir al curso de Comunicación
3. Activar modo de edición
4. Agregar recurso → **Página**
5. Configurar:
   - Nombre: "Chatbot de Comunicación"
   - Descripción: "Asistente virtual 24/7"
6. En el editor de contenido → Botón `</>` (código fuente)
7. Pegar el código HTML de arriba
8. Reemplazar `tu-servicio.onrender.com` con tu URL real
9. Guardar cambios

## 📡 API Endpoints

### POST `/api/chat`

Envía un mensaje al chatbot y recibe respuesta.

**Request:**
```json
{
  "message": "¿Qué es la comunicación no verbal?",
  "conversationId": "uuid-opcional"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "response": "La comunicación no verbal incluye...",
    "timestamp": "2025-12-05T10:30:00.000Z",
    "conversationId": "abc-123-def-456"
  }
}
```

**Error (400):**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "El mensaje es requerido..."
  }
}
```

### GET `/health`

Health check del servicio.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-12-05T10:30:00.000Z",
  "uptime": 3600,
  "geminiConnected": true
}
```

## 🔒 Seguridad

- ✅ Validación de entrada (XSS prevention)
- ✅ Límite de 500 caracteres por mensaje
- ✅ Rate limiting (20 mensajes por sesión)
- ✅ CORS configurado para dominios específicos
- ✅ Variables sensibles en `.env` (no en código)
- ✅ HTTPS obligatorio en producción
- ✅ Sanitización de salida

## 🧪 Testing

Para probar el endpoint:

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "¿Qué es la comunicación?"}'
```

## 📊 Comandos Disponibles

```bash
npm run dev      # Ejecutar en modo desarrollo con hot-reload
npm run build    # Compilar TypeScript a JavaScript
npm start        # Ejecutar en producción
npm test         # Ejecutar tests (no implementado aún)
```

## ⚙️ Configuración Avanzada

### Modificar preguntas sugeridas

Edita `src/utils/prompts.ts`:

```typescript
export const SUGGESTED_QUESTIONS = [
  "Tu pregunta 1",
  "Tu pregunta 2",
  // ...
];
```

### Ajustar prompt del sistema

Edita `SYSTEM_PROMPT` en `src/utils/prompts.ts` para cambiar el comportamiento del bot.

### Configurar CORS

Edita `src/index.ts` para agregar dominios permitidos:

```typescript
const allowedOrigins = [
  'https://tu-moodle.com',
  'http://localhost:3000'
];
```

## 🐛 Solución de Problemas

### Error: "GEMINI_API_KEY no configurada"
- Verifica que el archivo `.env` existe
- Verifica que la variable está correctamente escrita
- En Render, verifica las Environment Variables

### Error: "No permitido por CORS"
- Agrega el dominio de Moodle a `allowedOrigins` en `src/index.ts`
- Recompila y redespliega

### El bot responde muy lento
- Gemini API gratuita tiene límites de velocidad
- Render free tier se suspende (cold start)
- Considera actualizar a plan pago

### Frontend no carga
- Verifica que la carpeta `public/` existe en el build
- Verifica que `express.static` apunta correctamente

## 📝 Limitaciones Conocidas

1. **No persistencia:** Historial se pierde al recargar
2. **Contexto limitado:** Gemini no recuerda conversaciones previas
3. **Rate limits de Gemini:** API gratuita tiene límites
4. **Cold start:** Render free tier tarda en despertar

## 🚀 Mejoras Futuras

- [ ] Persistencia de historial con base de datos
- [ ] Autenticación con usuarios de Moodle
- [ ] Dashboard de analytics
- [ ] Exportar conversaciones a PDF
- [ ] Modo oscuro
- [ ] Soporte multiidioma

## 📄 Licencia

ISC

## 👥 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📞 Soporte

Para problemas o preguntas, abre un issue en GitHub.

---

**Última actualización:** Diciembre 2025
**Versión:** 1.0.0
