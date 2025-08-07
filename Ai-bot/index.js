

class GeminiChat {
    constructor() {
        this.apiKey = '';
        this.chatHistory = [];
        this.isTyping = false;

        this.initializeElements();
        this.bindEvents();
    }

    initializeElements() {
        this.apiKeyInput = document.getElementById('apiKeyInput');
        this.apiKeySection = document.getElementById('apiKeySection');
        this.chatMessages = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.sendButton = document.getElementById('sendButton');
    }

    bindEvents() {
        this.apiKeyInput.addEventListener('input', () => this.handleApiKeyInput());
        this.apiKeyInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleApiKeyInput();
        });

        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        this.chatInput.addEventListener('input', () => this.autoResize());
        this.sendButton.addEventListener('click', () => this.sendMessage());
    }

    handleApiKeyInput() {
        const apiKey = this.apiKeyInput.value.trim();
        if (apiKey) {
            this.apiKey = apiKey;
            this.apiKeySection.classList.add('hidden');
            this.enableChat();
            this.clearWelcomeMessage();
        }
    }

    enableChat() {
        this.chatInput.disabled = false;
        this.sendButton.disabled = false;
        this.chatInput.placeholder = 'Type your message here...';
        this.chatInput.focus();
    }

    clearWelcomeMessage() {
        const welcomeMessage = this.chatMessages.querySelector('.welcome-message');
        if (welcomeMessage) {
            welcomeMessage.remove();
        }
    }

    autoResize() {
        this.chatInput.style.height = 'auto';
        this.chatInput.style.height = Math.min(this.chatInput.scrollHeight, 120) + 'px';
    }

    async sendMessage() {
        const message = this.chatInput.value.trim();
        if (!message || this.isTyping) return;

        if (message.toLowerCase() === 'exit') {
            this.handleExit();
            return;
        }

        this.addMessage(message, 'user');
        this.chatInput.value = '';
        this.autoResize();
        this.chatInput.focus();

        this.showTypingIndicator();

        try {
            const response = await this.callGeminiAPI(message);
            this.hideTypingIndicator();
            this.addMessage(response, 'ai');
        } catch (error) {
            this.hideTypingIndicator();
            this.showError(error.message);
        }
    }

    addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        messageDiv.textContent = content;

        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();

        // Add to chat history
        if (type === 'user') {
            this.chatHistory.push({ role: 'user', parts: [{ text: content }] });
        } else {
            this.chatHistory.push({ role: 'model', parts: [{ text: content }] });
        }
    }

    showTypingIndicator() {
        this.isTyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
                    <span>AI is thinking</span>
                    <div class="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                `;

        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        this.isTyping = false;
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    async callGeminiAPI(message) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`;

        const requestBody = {
            contents: [...this.chatHistory, { role: 'user', parts: [{ text: message }] }],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
            }
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Failed to get response from Gemini API');
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = `Error: ${message}`;

        this.chatMessages.appendChild(errorDiv);
        this.scrollToBottom();

        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    handleExit() {
        this.addMessage('exit', 'user');
        this.addMessage('Goodbye! Thanks for chatting with My Chatbot App! 👋', 'ai');

        // Show chat history in console (like the original Python script)
        console.log('Chat History:', this.chatHistory);

        // Disable input
        this.chatInput.disabled = true;
        this.sendButton.disabled = true;
        this.chatInput.placeholder = 'Chat ended. Refresh to start a new conversation.';
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
}

// Initialize the chat application
document.addEventListener('DOMContentLoaded', () => {
    new GeminiChat();
});
