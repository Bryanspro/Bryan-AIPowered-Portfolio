// 1. Core Chatbot Overrides
window.LOCALES_PATH = 'ai-locales/';

window.WIDGET_GREETING = {
    en: "Hello! I am Nexus Assistant. How can I help you with our AI Enterprise Solutions today?",
    es: "¡Hola! Soy el Asistente Nexus. ¿Cómo puedo ayudarte hoy con nuestras soluciones empresariales de IA?"
};

window.WIDGET_SYSTEM_PROMPT = "You are Nexus Assistant, a helpful expert for Nexus.AI. You specialize in answering questions about enterprise artificial intelligence, machine learning, robotic automation, and predictive analysis. Be concise and professional. Do NOT invent new services outside of AI tech.";

window.quickReplyIntents = {
    services: { en: '🤖 AI Services', es: '🤖 Servicios de IA' },
    projects: { en: '🚀 Case Studies', es: '🚀 Casos de Estudio' },
    contact: { en: '✉️ Contact Us', es: '✉️ Contáctenos' }
};

window.suggestionLabels = {
    services: { en: 'AI Services', es: 'Servicios de IA' },
    projects: { en: 'Case Studies', es: 'Casos de Estudio' },
    contact: { en: 'Contact Us', es: 'Contáctenos' }
};

window.chatbotIntents = [
    {
        id: 'services',
        phrases: ['services', 'what do you do', 'solutions', 'servicios', 'que hacen', 'soluciones'],
        keywords: ['services', 'automation', 'machine learning', 'predictive', 'servicios', 'automatizacion', 'aprendizaje'],
        responses: {
            en: ["Nexus.AI provides three core enterprise solutions:<br><br><b>1. Robotic Automation:</b> Empowering production lines with autonomous systems.<br><b>2. Machine Learning:</b> Deploying advanced ML architectures to classify rapid data.<br><b>3. Predictive Analysis:</b> Forecasting market trends with 92% accuracy.<br><br>How can we empower your business?"],
            es: ["Nexus.AI provee tres soluciones empresariales clave:<br><br><b>1. Automatización Robótica:</b> Potenciando líneas de producción con sistemas autónomos.<br><b>2. Machine Learning:</b> Desplegando arquitecturas avanzadas para clasificar datos rápidamente.<br><b>3. Análisis Predictivo:</b> Pronosticando tendencias del mercado con 92% de precisión.<br><br>¿Cómo podemos ayudar a su empresa?"]
        },
        suggestions: ['projects', 'contact']
    },
    {
        id: 'projects',
        phrases: ['projects', 'case studies', 'examples', 'proyectos', 'casos de estudio', 'ejemplos'],
        keywords: ['projects', 'cases', 'clients', 'proyectos', 'casos', 'clientes'],
        responses: {
            en: ["Our case studies showcase how we've reduced latency by 40% and optimized continuous operations globally for over 4,500 enterprises. Visit our Projects page to see in-depth automation examples!"],
            es: ["Nuestros casos de estudio demuestran cómo hemos reducido la latencia en un 40% y optimizado operaciones continuas para más de 4,500 empresas. ¡Visite nuestra página de Proyectos para ver ejemplos detallados de automatización!"]
        },
        suggestions: ['services', 'contact']
    },
    {
        id: 'contact',
        phrases: ['where are you located', 'contact', 'address', 'contacto', 'direccion', 'ubicacion', 'email', 'phone'],
        keywords: ['address', 'location', 'phone', 'contact', 'direccion', 'telefono', 'contacto'],
        responses: {
            en: [
                "You can reach us here:<br><br><b>Address:</b><br>123 Street, New York, USA<br><br><b>Phone:</b><br>+012 345 67890<br><br><b>Email:</b><br>info@example.com"
            ],
            es: [
                "Puede comunicarse con nosotros aquí:<br><br><b>Dirección:</b><br>123 Street, New York, USA<br><br><b>Teléfono:</b><br>+012 345 67890<br><br><b>Email:</b><br>info@example.com"
            ]
        },
        suggestions: ['services', 'projects']
    },
    {
        id: 'fallback',
        phrases: [], keywords: [],
        responses: {
            en: ["I didn't quite catch that. Try asking about our AI Services, Case Studies, or Contact info!"],
            es: ["No entendí muy bien. ¡Intente preguntar por nuestros Servicios de IA, Casos de Estudio o Información de Contacto!"]
        },
        suggestions: ['services', 'projects', 'contact']
    }
];


// 2. Setup Theme Toggling
document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (!themeBtn) return;

    function updateThemeToggleButton(theme) {
        if (!themeBtn) return;
        const isDark = theme === 'dark';
        themeBtn.innerHTML = isDark 
            ? `<i class="fas fa-moon" style="color: #8ab4f8;"></i> <span data-i18n="themeToggleDark" style="margin-left: 2px;">Dark</span>` 
            : `<i class="fas fa-sun" style="color: #f4b400;"></i> <span data-i18n="themeToggleLight" style="margin-left: 2px;">Light</span>`;
        
        themeBtn.setAttribute('aria-label', isDark ? 'Dark Mode Active' : 'Light Mode Active');
        
        if (window.i18nEngine) {
            window.i18nEngine.updatePageContent();
        }
    }

    // The AI Template defaults to light. Dark theme adds [data-theme="dark"]
    const savedTheme = localStorage.getItem('ai-theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        updateThemeToggleButton('dark');
    } else {
        updateThemeToggleButton('light');
    }

    themeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const currentTheme = document.body.getAttribute('data-theme') || 'light';
        if (currentTheme === 'dark') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('ai-theme', 'light');
            updateThemeToggleButton('light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('ai-theme', 'dark');
            updateThemeToggleButton('dark');
        }
    });
});
