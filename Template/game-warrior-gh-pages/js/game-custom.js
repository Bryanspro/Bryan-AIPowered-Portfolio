/**
 * Game Warrior Custom Integration
 * Adds Dark/Light Theme Switching and Configures the Chatbot identity
 */

// 1. Theme Configuration
document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (!themeBtn) return;

    const savedTheme = localStorage.getItem('game-theme') || 'light';
    
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            themeBtn.innerHTML = '<i class="fa fa-moon-o" style="color: #aee;"></i> <span data-i18n="themeToggleDark">Dark</span>';
        } else {
            document.body.removeAttribute('data-theme');
            themeBtn.innerHTML = '<i class="fa fa-sun-o" style="color: #ffb320;"></i> <span data-i18n="themeToggleLight">Light</span>';
        }
    };

    applyTheme(savedTheme);

    themeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('game-theme', newTheme);
        applyTheme(newTheme);

        // Update translated label immediately if translations are loaded
        if (typeof window.currentTranslations !== 'undefined' && window.currentTranslations) {
            const span = themeBtn.querySelector('span');
            const key = newTheme === 'dark' ? 'themeToggleDark' : 'themeToggleLight';
            if (span && window.currentTranslations[key]) {
                span.innerText = window.currentTranslations[key];
            }
        }
    });
});

window.LOCALES_PATH = 'game-locales/';

// 3. Post-load Golden Theme Enforcer
// The chat-widget.html injects its own <style> block at runtime via fetch().
// We inject a final overriding <style> block AFTER it lands to ensure golden accent.
(function applyGoldenChatTheme() {
    const GOLD = '#ffb320';
    const GOLD_GLOW = 'rgba(255, 179, 32, 0.4)';
    const DARK_BG = 'rgba(19,19,19,0.97)';

    function injectGoldenStyles() {
        const existing = document.getElementById('gw-golden-override');
        if (existing) return; // only once

        const style = document.createElement('style');
        style.id = 'gw-golden-override';
        style.textContent = `
            #chat-toggle {
                background: rgba(19,19,19,0.95) !important;
                border: 1px solid ${GOLD} !important;
                color: ${GOLD} !important;
                box-shadow: 0 0 15px ${GOLD_GLOW} !important;
            }
            #chat-toggle:hover {
                background: rgba(255,179,32,0.12) !important;
                box-shadow: 0 0 25px rgba(255,179,32,0.5) !important;
            }
            #chat-toggle svg { stroke: ${GOLD} !important; color: ${GOLD} !important; }

            #chat-container {
                background: ${DARK_BG} !important;
                border-color: rgba(255,179,32,0.2) !important;
            }
            .css-avatar { border-color: ${GOLD} !important; box-shadow: 0 0 10px ${GOLD_GLOW} !important; }
            .avatar-eye { background: ${GOLD} !important; }
            .status-dot { background: ${GOLD} !important; box-shadow: 0 0 5px ${GOLD_GLOW} !important; }
            .bot-info .status { color: ${GOLD} !important; }
            .typing-dot { background: ${GOLD} !important; }
            #send-btn { color: ${GOLD} !important; }
            .quick-btn {
                background: rgba(255,179,32,0.08) !important;
                border-color: rgba(255,179,32,0.5) !important;
                color: #e0e0e0 !important;
            }
            .quick-btn:hover { background: ${GOLD} !important; color: #131313 !important; }
            .input-wrapper:focus-within { border-color: ${GOLD} !important; }
            .user .message-content { background: rgba(255,179,32,0.1) !important; color: ${GOLD} !important; border-color: rgba(255,179,32,0.3) !important; }
            .bot .message-content { border-color: rgba(255,179,32,0.12) !important; }
            .action-btn:hover, .control-btn:hover { color: ${GOLD} !important; }
        `;
        document.head.appendChild(style);
    }

    // Wait for chat widget toggle button to appear (it's injected async via fetch)
    const observer = new MutationObserver(() => {
        if (document.getElementById('chat-toggle')) {
            injectGoldenStyles();
            observer.disconnect();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Also try immediately in case it already loaded
    if (document.readyState !== 'loading') injectGoldenStyles();
    else document.addEventListener('DOMContentLoaded', injectGoldenStyles);
})();


// 2. Configure the Chatbot Intents for Game Warrior

window.WIDGET_BOT_NAME = "Game Warrior Assistant";

// Game Warrior Quick Replies
window.quickReplyIntents = {
    games: { en: '🎮 Games', es: '🎮 Juegos', pt: '🎮 Jogos', de: '🎮 Spiele', fr: '🎮 Jeux', ja: '🎮 ゲーム', ko: '🎮 게임', zh: '🎮 游戏', ar: '🎮 الألعاب', hi: '🎮 गेम्स', he: '🎮 משחקים' },
    blog: { en: '📝 Blog', es: '📝 Blog', pt: '📝 Blog', de: '📝 Blog', fr: '📝 Blog', ja: '📝 ブログ', ko: '📝 블로그', zh: '📝 博客', ar: '📝 المدونة', hi: '📝 ब्लॉग', he: '📝 בלוג' },
    forums: { en: '👥 Forums', es: '👥 Foros', pt: '👥 Fóruns', de: '👥 Foren', fr: '👥 Forums', ja: '👥 フォーラム', ko: '👥 포럼', zh: '👥 论坛', ar: '👥 المنتديات', hi: '👥 मंच', he: '👥 פורומים' },
    contact: { en: '📍 Contact', es: '📍 Contacto', pt: '📍 Contato', de: '📍 Kontakt', fr: '📍 Contact', ja: '📍 連絡先', ko: '📍 연락처', zh: '📍 联系', ar: '📍 اتصل', hi: '📍 संपर्क', he: '📍 קשר' }
};

window.suggestionLabels = window.quickReplyIntents;

// Initial Greeting Override
window.WIDGET_GREETING = {
    en: "System Online! I'm the Game Warrior Assistant. Looking for the latest game reviews, blog posts, or want to join the forums?",
    es: "¡Sistema en línea! Soy el Asistente de Game Warrior. ¿Buscas las últimas reseñas, blogs o unirte a nosotros en los foros?"
};

// System Prompt Override 
window.WIDGET_SYSTEM_PROMPT = `Role: You are the Game Warrior Assistant. A friendly, energetic bot helping gamers navigate a gaming portal and portfolio.
Context: You know about recent game releases, in-depth reviews, the active forum community, and latest blog news.
Tone: Energetic, gamer-friendly, knowledgeable.
Rules: Keep answers brief (under 2 paragraphs). Guide users toward the Games page, Blog, or Forums.`;

window.chatbotIntents = [
    {
        id: 'greeting',
        phrases: ['hello', 'hi', 'hey', 'good morning', 'hola', 'buenas'],
        keywords: ['greetings'],
        responses: {
            en: [
                "Hello! 👋 I'm the Game Warrior Assistant. Ready to explore epic adventures? Ask me about our latest Games, Blog posts, or the Forums!"
            ],
            es: [
                "¡Hola! 👋 Soy el asistente de Game Warrior. ¿Listo para la aventura? ¡Pregúntame sobre Juegos, el Blog o nuestros Foros!"
            ]
        },
        suggestions: ['games', 'blog', 'forums']
    },
    {
        id: 'games',
        phrases: ['game reviews', 'what games do you have', 'latest games', 'juegos', 'reseñas'],
        keywords: ['games', 'reviews', 'play', 'juegos', 'juegos'],
        responses: {
            en: [
                "We feature top-tier gaming content and reviews.<br><br><b>Trending:</b><br>• RPG Epics<br>• Competitive Shooters<br>• Action Adventures<br><br>Check out our <b>Games</b> section for robust reviews and insights."
            ],
            es: [
                "Destacamos el mejor contenido y reseñas de juegos.<br><br><b>Tendencias:</b><br>• RPGs Épicos<br>• Shooters Competitivos<br>• Acción Aventura<br><br>Visita la sección de <b>Juegos</b> para obtener análisis detallados."
            ]
        },
        suggestions: ['blog', 'forums']
    },
    {
        id: 'blog',
        phrases: ['news', 'latest blog', 'articles', 'noticias', 'articulos', 'blog'],
        keywords: ['blog', 'news', 'articles', 'noticias'],
        responses: {
            en: [
                "Our Blog is packed with industry news and technical deep-dives!<br><br>Read about the latest game engine updates, competitive strategies, and community highlights."
            ],
            es: [
                "¡Nuestro Blog está lleno de noticias de la industria y análisis técnicos!<br><br>Lee sobre las últimas actualizaciones de motores gráficos, estrategias y noticias de la comunidad."
            ]
        },
        suggestions: ['games', 'forums']
    },
    {
        id: 'forums',
        phrases: ['community', 'how to talk to others', 'forums', 'comunidad', 'foros'],
        keywords: ['forum', 'community', 'players', 'comunidad', 'foro'],
        responses: {
            en: [
                "Join thousands of active players in our Community Forums!<br><br>Discuss strategies, share accomplishments, and meet new teammates."
            ],
            es: [
                "¡Únete a miles de jugadores activos en nuestros Foros de Comunidad!<br><br>Discute estrategias, comparte logros y conoce nuevos compañeros de equipo."
            ]
        },
        suggestions: ['games', 'contact']
    },
    {
        id: 'contact',
        phrases: ['where are you', 'how to contact', 'support', 'contacto', 'soporte'],
        keywords: ['contact', 'email', 'support', 'contacto', 'soporte'],
        responses: {
            en: [
                "Need help? Reach out to us!<br><br>Visit our <b>Contact</b> page to send us a direct message or join our community Discord server."
            ],
            es: [
                "¿Necesitas ayuda? ¡Contáctanos!<br><br>Visita nuestra página de <b>Contacto</b> para enviarnos un mensaje o únete a nuestro Discord de la comunidad."
            ]
        },
        suggestions: ['games', 'forums']
    },
    {
        id: 'fallback',
        phrases: [], keywords: [],
        responses: {
            en: ["I didn't catch that respawn point! Try asking about our Games, Blog, or Forums."],
            es: ["¡No entendí ese punto de control! Intenta preguntar sobre Juegos, nuestro Blog o Foros."]
        },
        suggestions: ['games', 'blog', 'forums']
    }
];
