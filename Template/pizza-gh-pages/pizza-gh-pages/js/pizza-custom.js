/**
 * Pizza Templates Custom Integration
 * Adds Dark/Light Theme Switching and Configures the Chatbot identity
 */

document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (!themeBtn) return;

    const savedTheme = localStorage.getItem('pizza-theme') || 'light';
    
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            themeBtn.innerHTML = '<span class="ion-ios-moon" style="color: #fac564; font-size: 16px;"></span> <span data-i18n="themeToggleDark">Dark</span>';
        } else {
            document.body.removeAttribute('data-theme');
            themeBtn.innerHTML = '<span class="ion-ios-sunny" style="color: #fac564; font-size: 16px;"></span> <span data-i18n="themeToggleLight">Light</span>';
        }
    };

    applyTheme(savedTheme);

    themeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        localStorage.setItem('pizza-theme', newTheme);
        applyTheme(newTheme);

        // Update translated label immediately if translations are loaded
        if (typeof window.currentTranslations !== 'undefined' && window.currentTranslations) {
            const span = themeBtn.querySelector('span[data-i18n]');
            if (span) {
                const key = newTheme === 'dark' ? 'themeToggleDark' : 'themeToggleLight';
                span.innerText = window.currentTranslations[key] || span.innerText;
            }
        }
    });
});

window.LOCALES_PATH = '../../../locales/';

// Post-load Pizza Theme Enforcer for Chat
(function applyPizzaChatTheme() {
    const PIZZA = '#fac564';
    const PIZZA_GLOW = 'rgba(250, 197, 100, 0.4)';

    function injectPizzaStyles() {
        const existing = document.getElementById('pizza-override');
        if (existing) return;

        const style = document.createElement('style');
        style.id = 'pizza-override';
        style.textContent = `
            #chat-toggle {
                border: 1px solid ${PIZZA} !important;
                color: ${PIZZA} !important;
                box-shadow: 0 0 15px ${PIZZA_GLOW} !important;
            }
            #chat-toggle:hover {
                background: rgba(250, 197, 100, 0.12) !important;
                box-shadow: 0 0 25px rgba(250, 197, 100, 0.5) !important;
            }
            #chat-toggle svg { stroke: ${PIZZA} !important; color: ${PIZZA} !important; }

            .css-avatar { border-color: ${PIZZA} !important; box-shadow: 0 0 10px ${PIZZA_GLOW} !important; }
            .avatar-eye { background: ${PIZZA} !important; }
            .status-dot { background: ${PIZZA} !important; box-shadow: 0 0 5px ${PIZZA_GLOW} !important; }
            .bot-info .status { color: ${PIZZA} !important; }
            .typing-dot { background: ${PIZZA} !important; }
            #send-btn { color: ${PIZZA} !important; }
            .quick-btn {
                background: rgba(250, 197, 100, 0.08) !important;
                border-color: rgba(250, 197, 100, 0.5) !important;
                color: #e0e0e0 !important;
            }
            .quick-btn:hover { background: ${PIZZA} !important; color: #131313 !important; }
            .input-wrapper:focus-within { border-color: ${PIZZA} !important; }
            .user .message-content { background: rgba(250, 197, 100, 0.1) !important; color: ${PIZZA} !important; border-color: rgba(250, 197, 100, 0.3) !important; }
            .bot .message-content { border-color: rgba(250, 197, 100, 0.12) !important; }
            .action-btn:hover, .control-btn:hover { color: ${PIZZA} !important; }
        `;
        document.head.appendChild(style);
    }

    const observer = new MutationObserver(() => {
        if (document.getElementById('chat-toggle')) {
            injectPizzaStyles();
            observer.disconnect();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    if (document.readyState !== 'loading') injectPizzaStyles();
    else document.addEventListener('DOMContentLoaded', injectPizzaStyles);
})();


window.WIDGET_BOT_NAME = "Pizza Assistant";

window.quickReplyIntents = {
    menu: { en: '🍕 Menu', es: '🍕 Menú', pt: '🍕 Menu', de: '🍕 Speisekarte', fr: '🍕 Menu', ja: '🍕 メニュー', ko: '🍕 메뉴', zh: '🍕 菜单', ar: '🍕 قائمة طعام', hi: '🍕 मेनू', he: '🍕 תפריט' },
    services: { en: '🛠 Services', es: '🛠 Servicios', pt: '🛠 Serviços', de: '🛠 Dienste', fr: '🛠 Services', ja: '🛠 サービス', ko: '🛠 서비스', zh: '🛠 服务', ar: '🛠 خدمات', hi: '🛠 सेवाएं', he: '🛠 שירותים' },
    blog: { en: '📝 Blog', es: '📝 Blog', pt: '📝 Blog', de: '📝 Blog', fr: '📝 Blog', ja: '📝 ブログ', ko: '📝 블로그', zh: '📝 博客', ar: '📝 مدونة', hi: '📝 ब्लॉग', he: '📝 בלוג' },
    contact: { en: '✉️ Contact', es: '✉️ Contacto', pt: '✉️ Contato', de: '✉️ Kontakt', fr: '✉️ Contact', ja: '✉️ 連絡先', ko: '✉️ 연락처', zh: '✉️ 联系', ar: '✉️ اتصل', hi: '✉️ संपर्क', he: '✉️ קשר' }
};

window.suggestionLabels = window.quickReplyIntents;

window.WIDGET_GREETING = {
    en: "Welcome! I'm the Epic Pizza Assistant. Do you want to see our menu, services, or blog?",
    es: "¡Bienvenido! Soy el asistente de Epic Pizza. ¿Deseas ver nuestro menú, servicios o blog?"
};

window.WIDGET_SYSTEM_PROMPT = `Role: You are the Epic Pizza Assistant. A professional helper for a local pizza restaurant.
Context: You know about the restaurant's menu, ingredients, services (delivery/catering), and blog.
Tone: Professional, appetizing, and welcoming.
Rules: Keep answers brief. Guide users to Menu, Services, Blog, or Contact section.`;

window.chatbotIntents = [
    {
        id: 'greeting',
        phrases: ['hello', 'hi', 'hey', 'good morning', 'hola', 'buenas'],
        keywords: ['greetings'],
        responses: {
            en: ["Hello! 👋 Epic Pizza assistant here. Ask me about our menu, services, or blog!"],
            es: ["¡Hola! 👋 Soy el asistente. ¡Pregúntame sobre el menú o servicios!"]
        },
        suggestions: ['menu', 'services']
    },
    {
        id: 'menu',
        phrases: ['what is on the menu', 'pizza', 'menu', 'food', 'eat'],
        keywords: ['menu', 'pizza', 'food', 'comida'],
        responses: {
            en: ["Our <b>Menu</b> features authentic Neapolitan pizza baked in our wood-fired oven. Check it out!"],
            es: ["Nuestro <b>Menú</b> tiene pizza napolitana auténtica hecha al horno de leña. ¡Échale un vistazo!"]
        },
        suggestions: ['services', 'contact']
    },
    {
        id: 'services',
        phrases: ['what do you do', 'services', 'servicios', 'delivery', 'catering'],
        keywords: ['services', 'delivery', 'catering'],
        responses: {
            en: ["We offer fast delivery and event catering. View our <b>Services</b> page for details."],
            es: ["Ofrecemos entrega rápida y catering. Visita la página de <b>Servicios</b>."]
        },
        suggestions: ['menu', 'contact']
    },
    {
        id: 'blog',
        phrases: ['news', 'blog', 'updates', 'noticias'],
        keywords: ['blog', 'news', 'updates'],
        responses: {
            en: ["Read our latest culinary stories and updates on our <b>Blog</b>."],
            es: ["Lee nuestras últimas historias culinarias en nuestro <b>Blog</b>."]
        },
        suggestions: ['menu', 'services']
    },
    {
        id: 'contact',
        phrases: ['where are you', 'how to contact', 'support', 'contacto', 'soporte', 'email', 'phone'],
        keywords: ['contact', 'email', 'support', 'contacto', 'phone'],
        responses: {
            en: ["Want to place an order? Visit the <b>Contact</b> page for our location and phone number."],
            es: ["¿Quieres ordenar? Ve a la página de <b>Contacto</b> para ver nuestra dirección y teléfono."]
        },
        suggestions: ['menu', 'services']
    },
    {
        id: 'fallback',
        phrases: [], keywords: [],
        responses: {
            en: ["I'm not fully sure! Try asking about our Menu, Services, or Contact information."],
            es: ["¡No estoy del todo seguro! Intenta preguntar sobre nuestro Menú, Servicios o Contacto."]
        },
        suggestions: ['menu', 'services', 'contact']
    }
];
