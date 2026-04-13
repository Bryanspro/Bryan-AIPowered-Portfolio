/**
 * Kelly Custom Integration
 * Adds Dark/Light Theme Switching and Configures the Chatbot identity
 */

document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (!themeBtn) return;

    const savedTheme = localStorage.getItem('kelly-theme') || 'light';
    
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            themeBtn.innerHTML = '<i class="bi bi-moon" style="color: #aee;"></i> <span data-i18n="themeToggleDark">Dark</span>';
        } else {
            document.body.removeAttribute('data-theme');
            themeBtn.innerHTML = '<i class="bi bi-sun" style="color: #34b7a7;"></i> <span data-i18n="themeToggleLight">Light</span>';
        }
    };

    applyTheme(savedTheme);

    themeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        localStorage.setItem('kelly-theme', newTheme);
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

    // Dark mode icon override for chat widget logic
});

window.LOCALES_PATH = '../../../locales/';

// Post-load Kelly Theme Enforcer for Chat
(function applyKellyChatTheme() {
    const KELLY = '#34b7a7';
    const KELLY_GLOW = 'rgba(52, 183, 167, 0.4)';
    const DARK_BG = 'rgba(19,19,19,0.97)';

    function injectKellyStyles() {
        const existing = document.getElementById('kelly-override');
        if (existing) return;

        const style = document.createElement('style');
        style.id = 'kelly-override';
        style.textContent = `
            #chat-toggle {
                border: 1px solid ${KELLY} !important;
                color: ${KELLY} !important;
                box-shadow: 0 0 15px ${KELLY_GLOW} !important;
            }
            #chat-toggle:hover {
                background: rgba(52, 183, 167, 0.12) !important;
                box-shadow: 0 0 25px rgba(52, 183, 167, 0.5) !important;
            }
            #chat-toggle svg { stroke: ${KELLY} !important; color: ${KELLY} !important; }

            .css-avatar { border-color: ${KELLY} !important; box-shadow: 0 0 10px ${KELLY_GLOW} !important; }
            .avatar-eye { background: ${KELLY} !important; }
            .status-dot { background: ${KELLY} !important; box-shadow: 0 0 5px ${KELLY_GLOW} !important; }
            .bot-info .status { color: ${KELLY} !important; }
            .typing-dot { background: ${KELLY} !important; }
            #send-btn { color: ${KELLY} !important; }
            .quick-btn {
                background: rgba(52, 183, 167, 0.08) !important;
                border-color: rgba(52, 183, 167, 0.5) !important;
                color: #e0e0e0 !important;
            }
            .quick-btn:hover { background: ${KELLY} !important; color: #131313 !important; }
            .input-wrapper:focus-within { border-color: ${KELLY} !important; }
            .user .message-content { background: rgba(52, 183, 167, 0.1) !important; color: ${KELLY} !important; border-color: rgba(52, 183, 167, 0.3) !important; }
            .bot .message-content { border-color: rgba(52, 183, 167, 0.12) !important; }
            .action-btn:hover, .control-btn:hover { color: ${KELLY} !important; }
        `;
        document.head.appendChild(style);
    }

    const observer = new MutationObserver(() => {
        if (document.getElementById('chat-toggle')) {
            injectKellyStyles();
            observer.disconnect();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    if (document.readyState !== 'loading') injectKellyStyles();
    else document.addEventListener('DOMContentLoaded', injectKellyStyles);
})();


window.WIDGET_BOT_NAME = "Kelly Assistant";

window.quickReplyIntents = {
    about: { en: '👨‍💼 About', es: '👨‍💼 Acerca de', pt: '👨‍💼 Sobre', de: '👨‍💼 Über mich', fr: '👨‍💼 À propos', ja: '👨‍💼 概要', ko: '👨‍💼 소개', zh: '👨‍💼 关于', ar: '👨‍💼 حول', hi: '👨‍💼 के बारे में', he: '👨‍💼 אודות' },
    services: { en: '🛠 Services', es: '🛠 Servicios', pt: '🛠 Serviços', de: '🛠 Dienste', fr: '🛠 Services', ja: '🛠 サービス', ko: '🛠 서비스', zh: '🛠 服务', ar: '🛠 خدمات', hi: '🛠 सेवाएं', he: '🛠 שירותים' },
    portfolio: { en: '🎨 Portfolio', es: '🎨 Portafolio', pt: '🎨 Portfólio', de: '🎨 Portfolio', fr: '🎨 Portfolio', ja: '🎨 ポートフォリオ', ko: '🎨 포트폴리오', zh: '🎨 作品集', ar: '🎨 محفظة', hi: '🎨 पोर्टफोलियो', he: '🎨 תיק עבודות' },
    contact: { en: '✉️ Contact', es: '✉️ Contacto', pt: '✉️ Contato', de: '✉️ Kontakt', fr: '✉️ Contact', ja: '✉️ 連絡先', ko: '✉️ 연락처', zh: '✉️ 联系', ar: '✉️ اتصل', hi: '✉️ संपर्क', he: '✉️ קשר' }
};

window.suggestionLabels = window.quickReplyIntents;

window.WIDGET_GREETING = {
    en: "Welcome! I'm Kelly's Assistant. I can help you learn more about my resume, services, or my creative portfolio.",
    es: "¡Bienvenido! Soy el asistente de Kelly. Puedo ayudarte a conocer más sobre mi currículum, mis servicios o mi portafolio creativo."
};

window.WIDGET_SYSTEM_PROMPT = `Role: You are the Kelly Assistant. A professional helper for a creative portfolio.
Context: You know about the user's creative background, resume, services, and detailed portfolio.
Tone: Professional, creative, and welcoming.
Rules: Keep answers brief. Guide users to About, Services, Portfolio, or Contact section.`;

window.chatbotIntents = [
    {
        id: 'greeting',
        phrases: ['hello', 'hi', 'hey', 'good morning', 'hola', 'buenas'],
        keywords: ['greetings'],
        responses: {
            en: ["Hello! 👋 Professional assistant here. Ask me about the resume, services, or portfolio!"],
            es: ["¡Hola! 👋 Soy el asistente. ¡Pregúntame sobre el currículum, servicios o el portafolio!"]
        },
        suggestions: ['about', 'portfolio', 'services']
    },
    {
        id: 'about',
        phrases: ['who are you', 'resume', 'about', 'sobre', 'acerca'],
        keywords: ['about', 'resume', 'profile'],
        responses: {
            en: ["My <b>About</b> and <b>Resume</b> sections detail my journey as a creative designer and developer. Check them out for detailed skills!"],
            es: ["Mis secciones de <b>Acerca de</b> y <b>Currículum</b> detallan mi carrera como diseñador. ¡Échales un vistazo!"]
        },
        suggestions: ['portfolio', 'services']
    },
    {
        id: 'services',
        phrases: ['what do you do', 'services', 'servicios', 'help'],
        keywords: ['services', 'work', 'oferta'],
        responses: {
            en: ["I offer UI/UX design, web development, and digital illustration. View my <b>Services</b> page for details."],
            es: ["Ofrezco diseño UI/UX, desarrollo web e ilustración digital. Visita mi página de <b>Servicios</b>."]
        },
        suggestions: ['portfolio', 'contact']
    },
    {
        id: 'portfolio',
        phrases: ['show me work', 'portfolio', 'projects', 'portafolio', 'proyectos'],
        keywords: ['portfolio', 'projects', 'work'],
        responses: {
            en: ["Take a look at my <b>Portfolio</b> area to see my best illustrations, websites, and UI designs!"],
            es: ["¡Visita mi sección de <b>Portafolio</b> para ver mis mejores ilustraciones, sitios web y diseños!"]
        },
        suggestions: ['about', 'contact']
    },
    {
        id: 'contact',
        phrases: ['where are you', 'how to contact', 'support', 'contacto', 'soporte', 'email'],
        keywords: ['contact', 'email', 'support', 'contacto', 'soporte'],
        responses: {
            en: ["Want to collaborate? Visit the <b>Contact</b> page to send a direct message."],
            es: ["¿Quieres colaborar? Ve a la página de <b>Contacto</b> para enviar un mensaje directo."]
        },
        suggestions: ['services', 'portfolio']
    },
    {
        id: 'fallback',
        phrases: [], keywords: [],
        responses: {
            en: ["I'm not fully sure! Try asking about my Resume, Portfolio, or Services."],
            es: ["¡No estoy del todo seguro! Intenta preguntar sobre mi Currículum, Portafolio o Servicios."]
        },
        suggestions: ['about', 'portfolio', 'services']
    }
];
