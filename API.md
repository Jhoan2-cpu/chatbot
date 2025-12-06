# 📡 Documentación de API

## Base URL

```
Producción: https://tu-servicio.onrender.com
Local: http://localhost:3000
```

---

## Endpoints

### 1. POST `/api/chat`

Envía un mensaje al chatbot y recibe una respuesta generada por IA.

#### Request

**Headers:**
```http
Content-Type: application/json
```

**Body:**
```json
{
  "message": "string (requerido, 1-500 caracteres)",
  "conversationId": "string (opcional, UUID)"
}
```

#### Validaciones

- `message` es obligatorio
- `message` debe ser string
- `message` debe tener entre 1 y 500 caracteres
- `message` no debe contener scripts maliciosos (XSS)

#### Response Exitoso (200)

```json
{
  "success": true,
  "data": {
    "response": "La comunicación no verbal es el proceso de comunicación mediante el envío y recepción de mensajes sin palabras. Incluye:\n\n1. **Gestos y movimientos corporales**\n2. **Expresiones faciales**\n3. **Contacto visual**\n4. **Postura**\n5. **Tono de voz**",
    "timestamp": "2025-12-05T10:30:00.000Z",
    "conversationId": "550e8400-e29b-41d4-a716-446655440000"
  }
}
```

#### Response Error (400 - Bad Request)

```json
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "El mensaje es requerido y debe tener entre 1 y 500 caracteres"
  }
}
```

**Códigos de error 400:**
- `INVALID_INPUT` - Mensaje vacío, muy corto, muy largo, o formato inválido

#### Response Error (500 - Server Error)

```json
{
  "success": false,
  "error": {
    "code": "AI_SERVICE_ERROR",
    "message": "Error al conectar con el servicio de IA. Intenta nuevamente."
  }
}
```

**Códigos de error 500:**
- `AI_SERVICE_ERROR` - Error al conectar con Gemini AI

#### Ejemplo con cURL

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "¿Qué es la comunicación?",
    "conversationId": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

#### Ejemplo con JavaScript (Fetch)

```javascript
const response = await fetch('http://localhost:3000/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    message: '¿Qué es la comunicación?',
    conversationId: 'uuid-opcional'
  })
});

const data = await response.json();
console.log(data.data.response);
```

#### Ejemplo con Python (requests)

```python
import requests

url = "http://localhost:3000/api/chat"
payload = {
    "message": "¿Qué es la comunicación?",
    "conversationId": "uuid-opcional"
}

response = requests.post(url, json=payload)
data = response.json()
print(data['data']['response'])
```

---

### 2. GET `/health`

Health check del servicio. Útil para monitoreo y verificar conectividad con Gemini AI.

#### Request

No requiere parámetros.

#### Response Exitoso (200)

```json
{
  "status": "healthy",
  "timestamp": "2025-12-05T10:30:00.000Z",
  "uptime": 3600,
  "geminiConnected": true
}
```

**Campos:**
- `status`: Estado del servicio ("healthy" o "unhealthy")
- `timestamp`: Fecha y hora actual en formato ISO 8601
- `uptime`: Tiempo en segundos desde que se inició el servidor
- `geminiConnected`: `true` si Gemini AI responde, `false` si no

#### Response Error (500)

```json
{
  "status": "unhealthy",
  "timestamp": "2025-12-05T10:30:00.000Z"
}
```

#### Ejemplo con cURL

```bash
curl http://localhost:3000/health
```

---

### 3. GET `/`

Sirve la interfaz HTML del chatbot.

#### Request

No requiere parámetros.

#### Response

Retorna el archivo `public/index.html` con la interfaz completa del chatbot.

---

## Tipos TypeScript

### ChatRequest

```typescript
interface ChatRequest {
  message: string;           // 1-500 caracteres
  conversationId?: string;   // UUID opcional
}
```

### ChatResponse

```typescript
interface ChatResponse {
  success: boolean;
  data: {
    response: string;        // Respuesta del bot
    timestamp: string;       // ISO 8601
    conversationId: string;  // UUID
  }
}
```

### ErrorResponse

```typescript
interface ErrorResponse {
  success: false;
  error: {
    code: string;           // Código de error
    message: string;        // Descripción del error
  }
}
```

### HealthResponse

```typescript
interface HealthResponse {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  uptime?: number;
  geminiConnected?: boolean;
}
```

---

## Rate Limiting

**Límites actuales:**
- 20 mensajes por sesión (controlado en frontend)
- Sin límite de requests por IP (a implementar)

**Recomendaciones futuras:**
- Implementar rate limiting por IP: 100 requests/hora
- Implementar autenticación por usuario
- Agregar header `X-RateLimit-Remaining`

---

## CORS

**Dominios permitidos:**
- `https://moodle.cetivirgendelapuerta.com`
- `http://localhost:3000` (desarrollo)
- `*.onrender.com` (subdominios de Render)

**Métodos permitidos:**
- `GET`
- `POST`

**Credentials:** `false`

Para agregar un nuevo dominio, edita `src/index.ts`:

```typescript
const allowedOrigins = [
  'https://tu-nuevo-dominio.com',
  // ...
];
```

---

## Códigos de Estado HTTP

| Código | Significado | Cuándo ocurre |
|--------|-------------|---------------|
| 200 | OK | Request exitoso |
| 400 | Bad Request | Validación de input falló |
| 500 | Internal Server Error | Error del servidor o Gemini AI |

---

## Ejemplos de Casos de Uso

### 1. Primera pregunta del usuario

```http
POST /api/chat
Content-Type: application/json

{
  "message": "¿Qué es la comunicación?"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "response": "La comunicación es el proceso...",
    "timestamp": "2025-12-05T10:30:00.000Z",
    "conversationId": "abc-123"
  }
}
```

Guardar el `conversationId` para siguientes requests.

### 2. Pregunta de seguimiento

```http
POST /api/chat
Content-Type: application/json

{
  "message": "¿Puedes darme ejemplos?",
  "conversationId": "abc-123"
}
```

**Nota:** Actualmente el `conversationId` solo se devuelve, no afecta el contexto (sin persistencia).

### 3. Mensaje muy largo (error)

```http
POST /api/chat
Content-Type: application/json

{
  "message": "Lorem ipsum... (501+ caracteres)"
}
```

**Response (400):**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "El mensaje debe tener entre 1 y 500 caracteres"
  }
}
```

### 4. Health check

```http
GET /health
```

**Response (200):**
```json
{
  "status": "healthy",
  "timestamp": "2025-12-05T10:30:00.000Z",
  "uptime": 3600,
  "geminiConnected": true
}
```

---

## Seguridad

### Validaciones Implementadas

1. **Longitud de mensaje:** 1-500 caracteres
2. **Tipo de dato:** Debe ser string
3. **XSS Prevention:** Detecta scripts maliciosos (`<script`, `javascript:`, `on*=`)
4. **CORS:** Solo dominios autorizados

### Sanitización

- Entrada: Validada antes de enviar a Gemini
- Salida: Texto plano (sin HTML ejecutable)

### Variables Sensibles

- `GEMINI_API_KEY` nunca se expone al cliente
- `.env` no está en el repositorio Git

---

## Mejoras Futuras

- [ ] Implementar autenticación JWT
- [ ] Rate limiting por IP/usuario
- [ ] Caché de respuestas comunes
- [ ] Webhooks para notificaciones
- [ ] WebSocket para chat en tiempo real
- [ ] Paginación de historial
- [ ] Búsqueda de conversaciones anteriores

---

**Versión de API:** 1.0
**Última actualización:** Diciembre 2025
