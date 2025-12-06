# 🤖 ESPECIFICACIONES TÉCNICAS - CHATBOT EDUCATIVO PARA MOODLE

## 📄 DOCUMENTO DE REQUERIMIENTOS

**Versión:** 1.0  
**Fecha:** Diciembre 2025  
**Proyecto:** Integración de IA Generativa en Moodle  
**Módulo:** Chatbot Educativo Especializado  

---

## 📋 ÍNDICE

1. [Resumen Ejecutivo](#1-resumen-ejecutivo)
2. [Objetivos del Chatbot](#2-objetivos-del-chatbot)
3. [Funcionalidades Requeridas](#3-funcionalidades-requeridas)
4. [Especificaciones Técnicas](#4-especificaciones-técnicas)
5. [Arquitectura del Sistema](#5-arquitectura-del-sistema)
6. [Diseño de Interfaz (UI/UX)](#6-diseño-de-interfaz-uiux)
7. [Casos de Uso](#7-casos-de-uso)
8. [API Endpoints](#8-api-endpoints)
9. [Integración con Moodle](#9-integración-con-moodle)
10. [Seguridad y Privacidad](#10-seguridad-y-privacidad)
11. [Criterios de Aceptación](#11-criterios-de-aceptación)
12. [Entregables](#12-entregables)
13. [Timeline Estimado](#13-timeline-estimado)

---

## 1. RESUMEN EJECUTIVO

### 1.1 Descripción del Producto

Chatbot educativo inteligente integrado en Moodle que proporciona asistencia 24/7 a estudiantes del curso de Comunicación. Utiliza Google Gemini AI para responder preguntas, explicar conceptos y guiar a los estudiantes en su proceso de aprendizaje.

### 1.2 Alcance

**Incluye:**
- ✅ Interfaz de chat interactiva embebida en Moodle
- ✅ Backend con API REST usando TypeScript/Node.js
- ✅ Integración con Google Gemini AI
- ✅ Historial de conversaciones (sesión actual)
- ✅ Respuestas especializadas en temas de Comunicación
- ✅ Sugerencias de preguntas predefinidas
- ✅ Despliegue en Render (gratuito)

**NO Incluye (Fase 1):**
- ❌ Persistencia de historial entre sesiones
- ❌ Autenticación de usuarios
- ❌ Dashboard de analytics
- ❌ Integración con base de datos de Moodle

---

## 2. OBJETIVOS DEL CHATBOT

### 2.1 Objetivos Primarios

1. **Asistencia Inmediata:** Responder dudas de estudiantes en tiempo real sin esperar al profesor
2. **Disponibilidad 24/7:** Funcionar en cualquier momento del día
3. **Especialización:** Enfocado en temas del curso de Comunicación
4. **Fácil Integración:** Embebido en Moodle mediante iframe

### 2.2 Objetivos Secundarios

1. Reducir carga de trabajo del docente
2. Mejorar experiencia de aprendizaje del estudiante
3. Proporcionar respuestas consistentes y precisas
4. Guiar al estudiante hacia recursos relevantes

### 2.3 Métricas de Éxito

- ✅ Tiempo de respuesta < 5 segundos
- ✅ Tasa de satisfacción > 80%
- ✅ Disponibilidad del servicio > 99%
- ✅ Respuestas relevantes al contexto educativo

---

## 3. FUNCIONALIDADES REQUERIDAS

### 3.1 Funcionalidades Core (Obligatorias)

#### 3.1.1 Chat Interactivo
```
COMO estudiante
QUIERO enviar preguntas al chatbot
PARA obtener respuestas inmediatas sobre el curso
```

**Criterios:**
- Input de texto con máximo 500 caracteres
- Botón de envío habilitado solo si hay texto
- Mensajes se muestran en burbuja de chat
- Scroll automático al último mensaje

#### 3.1.2 Respuestas con IA
```
COMO estudiante
QUIERO recibir respuestas inteligentes
PARA aprender sobre temas de comunicación
```

**Criterios:**
- Respuestas generadas por Gemini AI
- Contexto: "Asistente del curso de Comunicación"
- Respuestas en español
- Formato legible y estructurado

#### 3.1.3 Historial de Conversación
```
COMO estudiante
QUIERO ver mi historial de preguntas y respuestas
PARA revisar la conversación actual
```

**Criterios:**
- Mostrar todas las preguntas y respuestas de la sesión
- Diferenciación visual entre usuario y bot
- Timestamps en cada mensaje

#### 3.1.4 Sugerencias de Preguntas
```
COMO estudiante
QUIERO ver preguntas sugeridas
PARA saber qué tipo de dudas puedo consultar
```

**Criterios:**
- Mínimo 5 preguntas sugeridas
- Botones clicables
- Al hacer clic, se envía la pregunta automáticamente

### 3.2 Funcionalidades Avanzadas (Opcionales)

#### 3.2.1 Indicador de Escritura
- Mostrar "El asistente está escribiendo..." mientras genera respuesta
- Animación de puntos suspensivos

#### 3.2.2 Manejo de Errores
- Mensaje amigable si la API falla
- Opción de reintentar
- No mostrar errores técnicos al usuario

#### 3.2.3 Límite de Uso
- Máximo 20 mensajes por sesión
- Mensaje informativo al alcanzar el límite

---

## 4. ESPECIFICACIONES TÉCNICAS

### 4.1 Stack Tecnológico

#### Backend
```yaml
Lenguaje: TypeScript
Runtime: Node.js 18+
Framework: Express.js
IA: Google Gemini AI (gemini-pro)
CORS: Habilitado para Moodle
```

#### Frontend
```yaml
HTML5: Estructura semántica
CSS3: Diseño responsive
JavaScript Vanilla: Sin frameworks
Fetch API: Para llamadas al backend
```

#### Infraestructura
```yaml
Hosting: Render (Free Tier)
Repositorio: GitHub
CI/CD: Despliegue automático desde main
```

### 4.2 Dependencias NPM

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "@google/generative-ai": "^0.1.3",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "@types/express": "^4.17.21",
    "@types/cors": "^2.8.17",
    "@types/node": "^20.10.5",
    "ts-node": "^10.9.2",
    "nodemon": "^3.0.2"
  }
}
```

### 4.3 Variables de Entorno

```env
# .env
GEMINI_API_KEY=AIzaSy... (API Key de Google Gemini)
PORT=3000
NODE_ENV=production
```

### 4.4 Configuración TypeScript

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

## 5. ARQUITECTURA DEL SISTEMA

### 5.1 Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                         MOODLE                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │              Curso de Comunicación                  │    │
│  │  ┌──────────────────────────────────────────────┐  │    │
│  │  │         iFrame (Chatbot Embebido)            │  │    │
│  │  └──────────────────────────────────────────────┘  │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                           │
                           │ HTTPS
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    RENDER (Cloud)                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Backend (Node.js + Express)            │   │
│  │                                                      │   │
│  │  ┌──────────────────┐    ┌──────────────────┐     │   │
│  │  │   Frontend HTML  │    │   API REST       │     │   │
│  │  │   (Interfaz)     │◄───│   /api/chat      │     │   │
│  │  └──────────────────┘    └──────────────────┘     │   │
│  │                                   │                 │   │
│  └───────────────────────────────────┼─────────────────┘   │
└───────────────────────────────────────┼─────────────────────┘
                                        │
                                        │ API Call
                                        ▼
                          ┌──────────────────────────┐
                          │   Google Gemini AI       │
                          │   (gemini-pro model)     │
                          └──────────────────────────┘
```

### 5.2 Flujo de Datos

```
1. Usuario escribe mensaje en el chat (Frontend)
   │
   ▼
2. Frontend envía POST a /api/chat con el mensaje
   │
   ▼
3. Backend recibe request y valida datos
   │
   ▼
4. Backend construye prompt con contexto educativo
   │
   ▼
5. Backend llama a Gemini AI con el prompt
   │
   ▼
6. Gemini AI procesa y genera respuesta
   │
   ▼
7. Backend recibe respuesta de Gemini
   │
   ▼
8. Backend envía respuesta al Frontend (JSON)
   │
   ▼
9. Frontend muestra respuesta en la interfaz
```

### 5.3 Estructura de Directorios

```
moodle-chatbot/
├── src/
│   ├── index.ts              # Punto de entrada principal
│   ├── routes/
│   │   └── chat.ts           # Rutas del API
│   ├── controllers/
│   │   └── chatController.ts # Lógica del chatbot
│   ├── services/
│   │   └── geminiService.ts  # Integración con Gemini
│   └── utils/
│       └── prompts.ts        # Templates de prompts
├── public/                    # Archivos estáticos (si necesario)
├── dist/                      # Código compilado (generado)
├── .env                       # Variables de entorno
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 6. DISEÑO DE INTERFAZ (UI/UX)

### 6.1 Wireframe del Chat

```
┌─────────────────────────────────────────────────────┐
│  🤖 Asistente de Comunicación              [—][□][✕] │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌────────────────────────────────────────────┐    │
│  │  ¡Hola! Soy tu asistente de Comunicación  │◀── Bot
│  │  ¿En qué puedo ayudarte hoy?              │    │
│  └────────────────────────────────────────────┘    │
│                                                      │
│                   ┌─────────────────────────────┐   │
│              User │ ¿Qué es la comunicación     │   │
│                   │ no verbal?                  │   │
│                   └─────────────────────────────┘   │
│                                                      │
│  ┌────────────────────────────────────────────┐    │
│  │ La comunicación no verbal incluye gestos, │◀── Bot
│  │ expresiones faciales, postura...          │    │
│  └────────────────────────────────────────────┘    │
│                                                      │
│  [Scroll Area - Historial de mensajes]             │
│                                                      │
├─────────────────────────────────────────────────────┤
│  💡 Preguntas Sugeridas:                            │
│  [Elementos de comunicación] [Barreras] [Tipos]    │
├─────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────┐   [📤]  │
│  │ Escribe tu pregunta...                │   Enviar│
│  └───────────────────────────────────────┘         │
└─────────────────────────────────────────────────────┘
```

### 6.2 Especificaciones de Diseño

#### 6.2.1 Colores

```css
/* Paleta de colores */
--primary-color: #4A90E2;      /* Azul principal */
--primary-dark: #357ABD;       /* Azul oscuro */
--secondary-color: #50E3C2;    /* Verde agua */
--background: #F5F7FA;         /* Gris claro */
--white: #FFFFFF;              /* Blanco */
--text-dark: #333333;          /* Texto oscuro */
--text-light: #666666;         /* Texto claro */
--border: #E0E0E0;             /* Bordes */
--user-bubble: #4A90E2;        /* Burbuja usuario */
--bot-bubble: #F0F0F0;         /* Burbuja bot */
--error: #E74C3C;              /* Rojo error */
--success: #2ECC71;            /* Verde éxito */
```

#### 6.2.2 Tipografía

```css
/* Fuentes */
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

/* Tamaños */
--font-size-title: 20px;       /* Título del chat */
--font-size-message: 14px;     /* Mensajes */
--font-size-timestamp: 11px;   /* Hora de mensaje */
--font-size-button: 13px;      /* Botones */
```

#### 6.2.3 Espaciado

```css
/* Padding y margins */
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
```

#### 6.2.4 Componentes

**Burbuja de Mensaje (Usuario)**
```css
.user-message {
    background: #4A90E2;
    color: white;
    padding: 12px 16px;
    border-radius: 18px 18px 4px 18px;
    max-width: 70%;
    margin-left: auto;
    margin-bottom: 12px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

**Burbuja de Mensaje (Bot)**
```css
.bot-message {
    background: #F0F0F0;
    color: #333;
    padding: 12px 16px;
    border-radius: 18px 18px 18px 4px;
    max-width: 70%;
    margin-right: auto;
    margin-bottom: 12px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

**Input de Texto**
```css
.chat-input {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #E0E0E0;
    border-radius: 24px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.3s;
}

.chat-input:focus {
    border-color: #4A90E2;
}
```

**Botón de Enviar**
```css
.send-button {
    background: #4A90E2;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 24px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.3s;
}

.send-button:hover {
    background: #357ABD;
}

.send-button:disabled {
    background: #CCCCCC;
    cursor: not-allowed;
}
```

### 6.3 Responsive Design

```css
/* Mobile (< 768px) */
@media (max-width: 768px) {
    .chat-container {
        width: 100%;
        height: 100vh;
        border-radius: 0;
    }
    
    .user-message, .bot-message {
        max-width: 85%;
    }
}

/* Tablet (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
    .chat-container {
        max-width: 600px;
    }
}

/* Desktop (> 1024px) */
@media (min-width: 1024px) {
    .chat-container {
        max-width: 800px;
    }
}
```

---

## 7. CASOS DE USO

### 7.1 Caso de Uso 1: Consulta Simple

**Actor:** Estudiante  
**Precondición:** Chat abierto en Moodle  
**Flujo Principal:**

1. Estudiante escribe: "¿Qué es la comunicación?"
2. Sistema muestra indicador de "escribiendo..."
3. Bot responde con definición clara y ejemplos
4. Mensaje se muestra en burbuja del bot
5. Estudiante puede hacer seguimiento

**Postcondición:** Respuesta guardada en historial de sesión

### 7.2 Caso de Uso 2: Pregunta Sugerida

**Actor:** Estudiante  
**Precondición:** Chat abierto  
**Flujo Principal:**

1. Estudiante ve sección de "Preguntas Sugeridas"
2. Hace clic en "¿Cuáles son los elementos de la comunicación?"
3. Pregunta se envía automáticamente
4. Bot responde con lista de elementos
5. Respuesta incluye explicación breve de cada elemento

**Postcondición:** Pregunta y respuesta en historial

### 7.3 Caso de Uso 3: Manejo de Error

**Actor:** Estudiante  
**Precondición:** API de Gemini caída  
**Flujo Principal:**

1. Estudiante envía pregunta
2. Sistema intenta conectar con Gemini
3. Timeout después de 30 segundos
4. Sistema muestra mensaje amigable:
   > "Lo siento, estoy teniendo problemas técnicos. Por favor intenta nuevamente en unos momentos."
5. Botón de "Reintentar" aparece

**Flujo Alternativo:**
- Si reintento falla: Sugerir contactar al profesor

**Postcondición:** Error loggeado en backend

### 7.4 Caso de Uso 4: Límite de Mensajes

**Actor:** Estudiante  
**Precondición:** Usuario ha enviado 19 mensajes  
**Flujo Principal:**

1. Estudiante envía mensaje número 20
2. Sistema procesa normalmente
3. Después de responder, muestra aviso:
   > "Has alcanzado el límite de 20 preguntas por sesión. Recarga la página para continuar."
4. Input se deshabilita

**Postcondición:** No se aceptan más mensajes en esa sesión

---

## 8. API ENDPOINTS

### 8.1 POST /api/chat

**Descripción:** Envía mensaje al chatbot y recibe respuesta de IA

#### Request

```http
POST /api/chat HTTP/1.1
Host: moodle-chatbot.onrender.com
Content-Type: application/json

{
  "message": "¿Qué es la comunicación no verbal?",
  "conversationId": "uuid-v4-optional"
}
```

**Parámetros:**

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `message` | string | Sí | Mensaje del usuario (1-500 caracteres) |
| `conversationId` | string | No | ID para mantener contexto (opcional fase 1) |

#### Response Exitoso (200)

```json
{
  "success": true,
  "data": {
    "response": "La comunicación no verbal es el proceso de comunicación mediante el envío y recepción de mensajes sin palabras. Incluye:\n\n1. **Gestos y movimientos corporales**\n2. **Expresiones faciales**\n3. **Contacto visual**\n4. **Postura**\n5. **Tono de voz**\n\nEstos elementos pueden reforzar o contradecir el mensaje verbal.",
    "timestamp": "2025-12-05T10:30:00.000Z",
    "conversationId": "abc-123-def-456"
  }
}
```

**Response Schema:**

```typescript
interface ChatResponse {
  success: boolean;
  data: {
    response: string;           // Respuesta del chatbot
    timestamp: string;          // ISO 8601
    conversationId: string;     // UUID de la conversación
  }
}
```

#### Response Error (400)

```json
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "El mensaje es requerido y debe tener entre 1 y 500 caracteres"
  }
}
```

#### Response Error (500)

```json
{
  "success": false,
  "error": {
    "code": "AI_SERVICE_ERROR",
    "message": "Error al conectar con el servicio de IA. Intenta nuevamente."
  }
}
```

### 8.2 GET /

**Descripción:** Página principal con interfaz del chatbot

#### Response

```http
HTTP/1.1 200 OK
Content-Type: text/html

<!DOCTYPE html>
<html>
...
</html>
```

### 8.3 GET /health

**Descripción:** Health check del servicio

#### Response

```json
{
  "status": "healthy",
  "timestamp": "2025-12-05T10:30:00.000Z",
  "uptime": 3600,
  "geminiConnected": true
}
```

---

## 9. INTEGRACIÓN CON MOODLE

### 9.1 Método de Integración: iFrame

**Ubicación:** Página/Recurso dentro del curso de Comunicación

### 9.2 Código HTML para Moodle

```html
<div style="width: 100%; height: 600px; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
    <iframe 
        src="https://moodle-chatbot.onrender.com/" 
        style="width: 100%; height: 100%; border: none;"
        title="Chatbot de Comunicación"
        allow="clipboard-write"
        sandbox="allow-scripts allow-same-origin allow-forms">
    </iframe>
</div>
```

### 9.3 Pasos para Integrar

1. **Acceder a Moodle** como administrador
2. **Ir al curso** de Comunicación
3. **Activar modo de edición**
4. **Agregar recurso** → Página
5. **Configurar:**
   - Nombre: "Chatbot de Comunicación"
   - Descripción: "Asistente virtual 24/7"
6. **Editor de contenido** → Botón `</>` (código fuente)
7. **Pegar código HTML** de arriba
8. **Guardar cambios**

### 9.4 Permisos Requeridos

- Rol: Administrador o Docente
- Capacidad: `moodle/course:manageactivities`

### 9.5 Consideraciones de Seguridad

- ✅ iFrame con sandbox para limitar permisos
- ✅ HTTPS obligatorio
- ✅ CSP (Content Security Policy) configurado
- ✅ No acceso a cookies de Moodle

---

## 10. SEGURIDAD Y PRIVACIDAD

### 10.1 Autenticación

**Fase 1:** No se requiere autenticación (acceso anónimo)  
**Fase 2 (Futura):** Integración con JWT de Moodle

### 10.2 Rate Limiting

```typescript
// Implementar en backend
const rateLimit = {
  maxRequests: 20,      // 20 mensajes
  windowMs: 3600000,    // por hora (60 min)
  message: "Has excedido el límite de mensajes por hora"
}
```

### 10.3 Validación de Entrada

```typescript
// Validaciones obligatorias
function validateMessage(message: string): boolean {
  if (!message || typeof message !== 'string') return false;
  if (message.length < 1 || message.length > 500) return false;
  if (/<script|javascript:|on\w+=/i.test(message)) return false; // XSS
  return true;
}
```

### 10.4 Sanitización de Salida

```typescript
// Escapar HTML en respuestas
function escapeHtml(text: string): string {
  const map: {[key: string]: string} = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
```

### 10.5 Variables Sensibles

- ✅ API Keys en variables de entorno (NO en código)
- ✅ Archivo .env NO subido a Git (.gitignore)
- ✅ Secrets de Render configurados correctamente

### 10.6 CORS

```typescript
// Configuración CORS estricta
const corsOptions = {
  origin: [
    'https://moodle.cetivirgendelapuerta.com',
    'http://localhost:3000' // Solo para desarrollo
  ],
  methods: ['GET', 'POST'],
  credentials: false
};

app.use(cors(corsOptions));
```

### 10.7 HTTPS

- ✅ Render proporciona HTTPS automáticamente
- ✅ Redirección HTTP → HTTPS forzada
- ✅ Certificados SSL gestionados por Render

### 10.8 Logs y Monitoreo

```typescript
// Logging básico
console.log('[INFO]', timestamp, userId, action);
// NO loggear mensajes completos (privacidad)
```

---

## 11. CRITERIOS DE ACEPTACIÓN

### 11.1 Funcionales

- [ ] Usuario puede enviar mensajes de texto
- [ ] Bot responde en máximo 10 segundos
- [ ] Respuestas son relevantes al contexto educativo
- [ ] Historial de conversación visible durante la sesión
- [ ] 5+ preguntas sugeridas funcionan correctamente
- [ ] Interfaz responsive en mobile/tablet/desktop
- [ ] Integración con Moodle mediante iframe funciona

### 11.2 Técnicos

- [ ] API REST implementada con TypeScript
- [ ] Código compilado sin errores
- [ ] Tests unitarios cubren endpoints principales
- [ ] Desplegado en Render y accesible públicamente
- [ ] Variables de entorno configuradas correctamente
- [ ] CORS habilitado para dominio de Moodle
- [ ] Rate limiting implementado

### 11.3 UI/UX

- [ ] Diseño sigue mockups proporcionados
- [ ] Colores y tipografía según especificaciones
- [ ] Burbujas de chat diferenciadas (usuario vs bot)
- [ ] Indicador de "escribiendo..." funciona
- [ ] Mensajes de error son amigables
- [ ] Accesibilidad básica (contraste, tamaños)

### 11.4 Documentación

- [ ] README.md completo con instrucciones de instalación
- [ ] Comentarios en código explicando lógica compleja
- [ ] Documentación de API (endpoints)
- [ ] Guía de integración con Moodle

---

## 12. ENTREGABLES

### 12.1 Código Fuente

**Repositorio Git:**
- ✅ Estructura de carpetas según especificación
- ✅ Código TypeScript bien documentado
- ✅ Archivo .gitignore configurado
- ✅ package.json con todas las dependencias
- ✅ tsconfig.json optimizado

**Archivos Principales:**
```
moodle-chatbot/
├── src/index.ts (Servidor principal)
├── package.json
├── tsconfig.json
├── .env.example (template)
├── .gitignore
└── README.md
```

### 12.2 Documentación

1. **README.md** con:
   - Descripción del proyecto
   - Requisitos previos
   - Instalación local
   - Variables de entorno
   - Comandos disponibles
   - Despliegue en Render

2. **API.md** con:
   - Documentación de endpoints
   - Ejemplos de requests/responses
   - Códigos de error

3. **INTEGRATION.md** con:
   - Pasos para integrar en Moodle
   - Código HTML del iframe
   - Capturas de pantalla

### 12.3 Despliegue

- ✅ URL pública en Render
- ✅ Servicio "Live" (activo)
- ✅ Configurado para despliegue automático desde main
- ✅ Variables de entorno configuradas en Render

### 12.4 Testing

**Tests Mínimos:**
- [ ] Test endpoint POST /api/chat con mensaje válido
- [ ] Test endpoint con mensaje vacío (debe fallar)
- [ ] Test endpoint con mensaje muy largo (debe fallar)
- [ ] Test health check GET /health

**Herramienta:** Jest o Mocha

### 12.5 Capturas de Pantalla

1. Interfaz del chatbot (desktop)
2. Interfaz del chatbot (mobile)
3. Conversación de ejemplo
4. Preguntas sugeridas en acción
5. Integración en Moodle
6. Panel de Render mostrando servicio activo

---

## 13. TIMELINE ESTIMADO

### 13.1 Desglose de Tareas

| Fase | Tarea | Tiempo Estimado |
|------|-------|-----------------|
| **1. Setup** | Crear proyecto, instalar dependencias | 30 min |
| **2. Backend** | Implementar servidor Express + endpoints | 2 horas |
| **3. Gemini** | Integración con API de Gemini | 1 hora |
| **4. Frontend** | Crear interfaz HTML/CSS/JS | 3 horas |
| **5. Testing** | Pruebas locales y debugging | 1 hora |
| **6. Deploy** | Configurar y desplegar en Render | 1 hora |
| **7. Integración** | Integrar en Moodle con iframe | 30 min |
| **8. Docs** | Escribir documentación | 1 hora |
| **TOTAL** | | **10 horas** |

### 13.2 Cronograma Sugerido

**Día 1 (4 horas):**
- Setup del proyecto
- Backend básico
- Integración Gemini

**Día 2 (4 horas):**
- Frontend completo
- Testing

**Día 3 (2 horas):**
- Deploy en Render
- Integración Moodle
- Documentación

---

## 14. NOTAS ADICIONALES

### 14.1 Limitaciones Conocidas

1. **No persistencia:** Historial se pierde al recargar
2. **Contexto limitado:** Gemini no recuerda conversaciones previas
3. **Rate limits de Gemini:** API gratuita tiene límites de uso
4. **Cold start:** Render free tier puede tardar ~30s en arrancar

### 14.2 Mejoras Futuras (Backlog)

- [ ] Persistencia de historial con base de datos
- [ ] Autenticación con usuarios de Moodle
- [ ] Dashboard de analytics para profesores
- [ ] Exportar conversaciones a PDF
- [ ] Modo oscuro
- [ ] Soporte multiidioma
- [ ] Integración con banco de preguntas de Moodle
- [ ] Notificaciones push

### 14.3 Contacto del Equipo de Desarrollo

**Product Owner:** [Nombre]  
**Tech Lead:** [Nombre]  
**Canal de comunicación:** [Slack/Discord/Email]  

---

## 15. APROBACIÓN

### 15.1 Checklist de Revisión

- [ ] Especificaciones funcionales revisadas
- [ ] Especificaciones técnicas aprobadas
- [ ] Diseño UI/UX aprobado
- [ ] Timeline acordado
- [ ] Recursos asignados

### 15.2 Firmas

**Product Owner:** __________________ Fecha: _______  
**Tech Lead:** _____________________ Fecha: _______  
**Stakeholder:** ___________________ Fecha: _______  

---

**FIN DEL DOCUMENTO**

---

*Última actualización: Diciembre 2025*  
*Versión: 1.0*  
*Clasificación: Interno*