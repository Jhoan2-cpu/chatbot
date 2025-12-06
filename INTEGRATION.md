# 🔌 Guía de Integración con Moodle

Esta guía explica paso a paso cómo integrar el chatbot en tu plataforma Moodle.

---

## 📋 Requisitos Previos

- ✅ Chatbot desplegado en Render (o servidor propio)
- ✅ Acceso como administrador o profesor a Moodle
- ✅ Permisos para agregar recursos/actividades
- ✅ URL pública del chatbot (ej: `https://tu-chatbot.onrender.com`)

---

## 🚀 Método 1: Integración con iFrame (Recomendado)

### Paso 1: Preparar el código HTML

Copia el siguiente código y reemplaza `TU_URL_AQUI` con la URL real de tu chatbot:

```html
<div style="width: 100%; height: 600px; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <iframe
        src="TU_URL_AQUI"
        style="width: 100%; height: 100%; border: none;"
        title="Chatbot de Comunicación"
        allow="clipboard-write"
        sandbox="allow-scripts allow-same-origin allow-forms">
    </iframe>
</div>
```

**Ejemplo con URL real:**
```html
<div style="width: 100%; height: 600px; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <iframe
        src="https://moodle-chatbot-xyz.onrender.com"
        style="width: 100%; height: 100%; border: none;"
        title="Chatbot de Comunicación"
        allow="clipboard-write"
        sandbox="allow-scripts allow-same-origin allow-forms">
    </iframe>
</div>
```

### Paso 2: Acceder a Moodle

1. Inicia sesión en Moodle con cuenta de **Administrador** o **Profesor**
2. Navega al curso donde quieres integrar el chatbot (ej: "Curso de Comunicación")

### Paso 3: Activar modo de edición

- Haz clic en el botón **"Activar edición"** (esquina superior derecha)
- O usa el menú: **⚙️ Acciones → Activar edición**

### Paso 4: Agregar recurso

1. En la sección donde quieres el chatbot, haz clic en **"Añadir una actividad o un recurso"**
2. Selecciona **"Página"** de la lista
3. Haz clic en **"Agregar"**

### Paso 5: Configurar la página

**Pestaña General:**

- **Nombre:** `Chatbot de Comunicación 🤖`
- **Descripción:**
  ```
  Asistente virtual disponible 24/7 para resolver tus dudas sobre el curso.

  Funcionalidades:
  - Respuestas instantáneas
  - Especializado en temas de Comunicación
  - Preguntas sugeridas para empezar
  - Historial de conversación en tu sesión
  ```
- **Mostrar descripción en la página del curso:** ✅ (activado)

**Contenido de la página:**

1. Haz clic en el botón **`</>`** (código fuente) en la barra de herramientas del editor
2. **Pega** el código HTML del Paso 1
3. Haz clic nuevamente en **`</>`** para salir del modo código

### Paso 6: Ajustes adicionales (opcional)

**Apariencia:**
- **Mostrar nombre de la página:** Sí
- **Mostrar descripción de la página:** Sí

**Restricciones de acceso:**
- Configura si quieres que solo ciertos estudiantes accedan
- Por defecto, todos los inscritos en el curso pueden acceder

### Paso 7: Guardar

- Haz clic en **"Guardar cambios y mostrar"**
- El chatbot debería aparecer embebido en la página

### Paso 8: Verificar

- Desactiva el modo de edición
- Visita la página como estudiante
- Prueba enviar un mensaje al chatbot

---

## 🖼️ Capturas de Pantalla Ilustrativas

### 1. Activar edición
```
┌─────────────────────────────────────┐
│ ⚙️ Acciones  ▼                      │
│   ✏️ Activar edición                │
└─────────────────────────────────────┘
```

### 2. Añadir recurso
```
┌─────────────────────────────────────┐
│ Tema 1: Introducción                │
│ ┌─────────────────────────────────┐ │
│ │ ➕ Añadir una actividad o      │ │
│ │    un recurso                   │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### 3. Seleccionar Página
```
┌─────────────────────────────────────┐
│ Recursos                            │
│ ○ Archivo                           │
│ ○ Carpeta                           │
│ ● Página          ← Seleccionar     │
│ ○ URL                               │
└─────────────────────────────────────┘
```

### 4. Editor de contenido
```
┌─────────────────────────────────────┐
│ B I U  </> 🔗 🖼️                   │
│ ┌─────────────────────────────────┐ │
│ │ [Pegar código HTML aquí]        │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

---

## 📱 Método 2: Integración como Enlace Externo

Si el iframe no funciona por restricciones de seguridad:

### Paso 1: Agregar URL

1. **Añadir una actividad o un recurso** → **URL**
2. **Nombre:** `Chatbot de Comunicación (Nueva pestaña)`
3. **URL externa:** `https://tu-chatbot.onrender.com`
4. **Mostrar:**
   - ✅ Nueva ventana
   - Ancho: 1024px
   - Alto: 768px
5. **Guardar cambios**

**Ventajas:**
- Abre en nueva pestaña (pantalla completa)
- Sin restricciones de iframe

**Desventajas:**
- No está embebido en Moodle
- Requiere navegación adicional

---

## 🛡️ Configuración de Seguridad

### Permitir iframes en Moodle

Si Moodle bloquea iframes externos:

1. **Panel de administración** → **Seguridad** → **Políticas del sitio**
2. Buscar: **"Etiqueta iframe permitida"**
3. Activar o agregar tu dominio a la lista blanca

### Configurar CORS en el chatbot

Asegúrate de que el backend permita requests desde Moodle:

En `src/index.ts`, verifica:

```typescript
const allowedOrigins = [
  'https://tu-moodle.com',  // ← Tu dominio de Moodle
  'http://localhost:3000'
];
```

### Content Security Policy (CSP)

Si Moodle tiene CSP estricto, contacta al administrador del sistema para agregar:

```
frame-src https://tu-chatbot.onrender.com;
```

---

## 🎨 Personalización Visual

### Ajustar tamaño del iframe

Cambia `height` en el código HTML:

```html
<!-- Mobile: más compacto -->
<div style="height: 500px;">

<!-- Desktop: más grande -->
<div style="height: 700px;">

<!-- Pantalla completa -->
<div style="height: 100vh;">
```

### Cambiar colores del borde

```html
<div style="border: 2px solid #4A90E2; ...">
```

### Agregar título encima del iframe

```html
<h2 style="color: #4A90E2; font-family: Arial, sans-serif;">
  🤖 Asistente Virtual de Comunicación
</h2>
<p style="color: #666;">
  ¡Pregúntame lo que necesites sobre el curso!
</p>

<div style="width: 100%; height: 600px; ...">
  <iframe src="..."></iframe>
</div>
```

---

## 🧪 Testing de la Integración

### Checklist de verificación

- [ ] El iframe carga correctamente
- [ ] No aparecen errores de CORS en consola (F12)
- [ ] Se puede escribir y enviar mensajes
- [ ] Las respuestas del bot aparecen en <10 segundos
- [ ] Funciona en mobile (responsive)
- [ ] Las preguntas sugeridas son clicables
- [ ] El historial se mantiene durante la sesión

### Herramientas de depuración

**Consola del navegador (F12):**
```javascript
// Ver errores de CORS o JavaScript
// Debería estar vacía o solo mostrar info
```

**Network Tab (F12 → Network):**
- Verifica que `/api/chat` retorna 200 OK
- Verifica que `https://tu-chatbot.onrender.com` carga

---

## 🚨 Solución de Problemas

### Error: "Refused to frame 'X' because it violates CSP"

**Solución:**
1. Contacta al administrador de Moodle
2. Pide agregar tu dominio a `frame-src` en CSP
3. O usa Método 2 (enlace externo)

### Error: "No permitido por CORS"

**Solución:**
1. Verifica `allowedOrigins` en `src/index.ts`
2. Agrega el dominio de Moodle
3. Recompila (`npm run build`)
4. Redespliega en Render

### El chatbot carga muy lento (>30 segundos)

**Causa:** Render free tier está en "cold start"

**Soluciones:**
- Espera 30 seg en la primera carga
- Agrega un mensaje de carga en Moodle:
  ```html
  <p>⏳ Cargando chatbot, puede tardar unos segundos...</p>
  ```
- Considera upgrade a plan pago de Render

### El iframe no se muestra

**Verificar:**
1. ¿Usaste el botón `</>` (código fuente) en Moodle?
2. ¿La URL del chatbot es correcta?
3. ¿Moodle permite iframes externos?

**Solución alternativa:**
Usa Método 2 (enlace externo)

### Mensajes no se envían

**Verificar en consola (F12):**
- Error 400: Mensaje muy largo (>500 chars)
- Error 500: Problema con Gemini API
- Error CORS: Configurar dominios permitidos

---

## 📊 Recomendaciones de Uso

### Para Profesores

1. **Presentar el chatbot a los estudiantes:**
   - Explica qué preguntas puede responder
   - Aclara que es asistente, no reemplazo del profesor
   - Menciona el límite de 20 mensajes por sesión

2. **Monitorear uso:**
   - Revisa `/health` periódicamente
   - Pregunta feedback a estudiantes

3. **Actualizar preguntas sugeridas:**
   - Edita `src/utils/prompts.ts`
   - Agrega preguntas frecuentes del curso

### Para Estudiantes

**Instrucciones a compartir:**

```
📱 Cómo usar el Chatbot de Comunicación:

1. Haz clic en "Chatbot de Comunicación" en el curso
2. Escribe tu pregunta en el cuadro de texto
3. Presiona "Enviar" o Enter
4. Espera la respuesta (5-10 segundos)
5. Puedes hacer hasta 20 preguntas por sesión
6. Para más preguntas, recarga la página

💡 Consejos:
- Usa las preguntas sugeridas si no sabes qué preguntar
- Sé específico en tus dudas
- El bot está especializado en Comunicación
- Si el bot no puede ayudarte, contacta al profesor
```

---

## 🔄 Actualización del Chatbot

Si desplegaste una nueva versión:

1. **No necesitas cambiar nada en Moodle**
   - El iframe apunta a la URL, que se actualiza automáticamente

2. **Limpiar caché (opcional):**
   - En Moodle: **Administración → Desarrollo → Purgar cachés**
   - En navegador: Ctrl+F5 para forzar recarga

---

## 📞 Soporte

Si encuentras problemas durante la integración:

1. Revisa esta guía completa
2. Consulta [README.md](README.md) para configuración del chatbot
3. Revisa [API.md](API.md) para detalles técnicos
4. Abre un issue en GitHub (si corresponde)

---

## ✅ Checklist Final de Integración

- [ ] Chatbot desplegado y funcionando
- [ ] URL pública obtenida
- [ ] CORS configurado con dominio de Moodle
- [ ] Código HTML preparado con URL correcta
- [ ] Recurso "Página" creado en Moodle
- [ ] Código HTML pegado en modo fuente `</>`
- [ ] Página guardada y visible
- [ ] Prueba realizada como estudiante
- [ ] Mensajes se envían y reciben correctamente
- [ ] Responsive funciona en mobile

---

**¡Felicidades! 🎉 Tu chatbot está integrado en Moodle.**

---

**Última actualización:** Diciembre 2025
**Versión:** 1.0.0
