# ⚡ Guía Rápida de Inicio

## 🚀 En 5 Minutos

### 1️⃣ Obtener API Key de Gemini (2 min)

1. Ve a: https://makersuite.google.com/app/apikey
2. Inicia sesión con Google
3. Clic en **"Create API Key"**
4. Copia la key generada

### 2️⃣ Configurar el Proyecto (1 min)

```bash
# Editar archivo .env
GEMINI_API_KEY=pega_tu_api_key_aqui
PORT=3000
NODE_ENV=development
```

### 3️⃣ Instalar y Ejecutar (2 min)

```bash
# Si ya instalaste dependencias
npm run dev

# Si es primera vez
npm install && npm run dev
```

### 4️⃣ Probar

Abre: http://localhost:3000

¡Listo! 🎉

---

## 📦 Despliegue Rápido en Render

### Opción 1: Con GitHub (5 min)

1. **Sube a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin tu-repo-url
   git push -u origin main
   ```

2. **Render Dashboard:**
   - New → Web Service
   - Conecta tu repo
   - Render detecta `render.yaml` automáticamente

3. **Configurar variable:**
   - Environment → Add Variable
   - `GEMINI_API_KEY` = tu_key

4. **Deploy!**

URL será: `https://tu-app.onrender.com`

---

## 🔌 Integrar en Moodle (2 min)

1. En Moodle: **Agregar → Página**

2. Código fuente `</>` → Pegar:

```html
<iframe
  src="https://TU-URL-RENDER.onrender.com"
  style="width:100%;height:600px;border:none">
</iframe>
```

3. **Guardar**

¡Listo! 🎉

---

## 🆘 Problemas Comunes

### ❌ Error: "GEMINI_API_KEY no configurada"
```bash
# Verifica que .env existe y contiene:
GEMINI_API_KEY=tu_key_aqui
```

### ❌ Puerto 3000 ocupado
```bash
# Cambia PORT en .env:
PORT=8080
```

### ❌ "Cannot find module"
```bash
npm install
npm run build
```

### ❌ Render muy lento
Es normal. Primera carga tarda ~30 segundos (cold start).

---

## 📚 Documentación Completa

- **[README.md](README.md)** - Instalación completa
- **[API.md](API.md)** - Endpoints y ejemplos
- **[INTEGRATION.md](INTEGRATION.md)** - Guía Moodle detallada
- **[RESUMEN.md](RESUMEN.md)** - Estado del proyecto

---

## ✅ Checklist Pre-Deploy

- [ ] API Key de Gemini obtenida
- [ ] `.env` configurado
- [ ] `npm install` ejecutado
- [ ] `npm run dev` funciona localmente
- [ ] Mensaje de prueba enviado OK
- [ ] Código subido a GitHub
- [ ] Render desplegado
- [ ] Variable `GEMINI_API_KEY` en Render
- [ ] URL de Render funciona
- [ ] Integrado en Moodle
- [ ] Prueba desde Moodle OK

---

**¿Listo?** 🚀

```bash
npm run dev
```

**¡A chatear!** 🤖
