// Configuración
const API_URL = window.location.origin + '/api/chat';
const MAX_MESSAGES = 20;

// Estado de la aplicación
let messageCount = 0;
let conversationId = null;

// Preguntas sugeridas
const SUGGESTED_QUESTIONS = [
    "¿Qué es la comunicación?",
    "¿Cuáles son los elementos de la comunicación?",
    "¿Qué tipos de comunicación existen?",
    "¿Cuáles son las barreras de la comunicación?",
    "¿Qué es la comunicación no verbal?"
];

// Elementos DOM
const messagesContainer = document.getElementById('messagesContainer');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const charCount = document.getElementById('charCount');
const suggestionsButtons = document.getElementById('suggestionsButtons');
const initialTimestamp = document.getElementById('initialTimestamp');

// Inicialización
function init() {
    // Timestamp inicial
    initialTimestamp.textContent = formatTime(new Date());

    // Renderizar sugerencias
    renderSuggestions();

    // Event listeners
    messageInput.addEventListener('input', handleInputChange);
    messageInput.addEventListener('keydown', handleKeyDown);
    sendButton.addEventListener('click', handleSendMessage);

    // Focus en el input
    messageInput.focus();
}

// Renderizar preguntas sugeridas
function renderSuggestions() {
    suggestionsButtons.innerHTML = '';
    SUGGESTED_QUESTIONS.forEach(question => {
        const button = document.createElement('button');
        button.className = 'suggestion-btn';
        button.textContent = question;
        button.addEventListener('click', () => handleSuggestionClick(question));
        suggestionsButtons.appendChild(button);
    });
}

// Manejar clic en sugerencia
function handleSuggestionClick(question) {
    messageInput.value = question;
    handleInputChange();
    handleSendMessage();
}

// Manejar cambios en el input
function handleInputChange() {
    const value = messageInput.value;
    const length = value.length;

    // Actualizar contador
    charCount.textContent = length;

    // Habilitar/deshabilitar botón
    sendButton.disabled = length === 0 || length > 500;

    // Auto-resize del textarea
    messageInput.style.height = 'auto';
    messageInput.style.height = messageInput.scrollHeight + 'px';
}

// Manejar Enter para enviar
function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (!sendButton.disabled) {
            handleSendMessage();
        }
    }
}

// Enviar mensaje
async function handleSendMessage() {
    const message = messageInput.value.trim();

    if (!message || message.length > 500) return;

    // Verificar límite de mensajes
    if (messageCount >= MAX_MESSAGES) {
        showError('Has alcanzado el límite de 20 preguntas por sesión. Recarga la página para continuar.');
        return;
    }

    // Limpiar input
    messageInput.value = '';
    messageInput.style.height = 'auto';
    handleInputChange();

    // Agregar mensaje del usuario
    addMessage(message, 'user');
    messageCount++;

    // Mostrar indicador de escritura
    const typingIndicator = showTypingIndicator();

    try {
        // Llamar a la API
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                conversationId: conversationId
            })
        });

        // Quitar indicador de escritura
        typingIndicator.remove();

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Error al obtener respuesta');
        }

        const data = await response.json();

        if (data.success) {
            // Guardar conversationId
            conversationId = data.data.conversationId;

            // Agregar respuesta del bot
            addMessage(data.data.response, 'bot');

            // Verificar límite
            if (messageCount >= MAX_MESSAGES) {
                showLimitMessage();
            }
        } else {
            throw new Error(data.error?.message || 'Error desconocido');
        }

    } catch (error) {
        typingIndicator.remove();
        console.error('Error:', error);
        showError('Lo siento, estoy teniendo problemas técnicos. Por favor intenta nuevamente en unos momentos.');
    }
}

// Agregar mensaje al chat
function addMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    // Dividir en párrafos si contiene saltos de línea
    const paragraphs = text.split('\n').filter(p => p.trim());
    paragraphs.forEach(paragraph => {
        const p = document.createElement('p');
        p.textContent = paragraph;
        contentDiv.appendChild(p);
    });

    const timestamp = document.createElement('span');
    timestamp.className = 'timestamp';
    timestamp.textContent = formatTime(new Date());

    messageDiv.appendChild(contentDiv);
    messageDiv.appendChild(timestamp);
    messagesContainer.appendChild(messageDiv);

    // Scroll al final
    scrollToBottom();
}

// Mostrar indicador de escritura
function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.id = 'typingIndicator';
    indicator.innerHTML = '<span></span><span></span><span></span>';
    messagesContainer.appendChild(indicator);
    scrollToBottom();
    return indicator;
}

// Mostrar error
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'message bot-message';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content error-message';

    const p = document.createElement('p');
    p.textContent = message;
    contentDiv.appendChild(p);

    errorDiv.appendChild(contentDiv);
    messagesContainer.appendChild(errorDiv);
    scrollToBottom();
}

// Mostrar mensaje de límite
function showLimitMessage() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.style.background = '#fff3cd';
    contentDiv.style.borderLeft = '4px solid #ffc107';

    const p = document.createElement('p');
    p.textContent = '⚠️ Has alcanzado el límite de 20 preguntas por sesión. Recarga la página para continuar.';
    p.style.color = '#856404';
    contentDiv.appendChild(p);

    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);

    // Deshabilitar input
    messageInput.disabled = true;
    sendButton.disabled = true;

    scrollToBottom();
}

// Formatear hora
function formatTime(date) {
    return date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Scroll al final
function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Inicializar cuando cargue el DOM
document.addEventListener('DOMContentLoaded', init);
