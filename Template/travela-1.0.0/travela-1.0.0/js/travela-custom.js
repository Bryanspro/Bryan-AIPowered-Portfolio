/**
 * Travela Custom — Theme Toggle + Chatbot Identity
 */
document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (!themeBtn) return;
    const savedTheme = localStorage.getItem('travela-theme') || 'light';

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            themeBtn.innerHTML = '<i class="bi bi-moon-fill" style="color: #3b82f6; font-size: 16px;"></i> <span data-i18n="themeToggleDark">Dark</span>';
        } else {
            document.body.removeAttribute('data-theme');
            themeBtn.innerHTML = '<i class="bi bi-sun-fill" style="color: #f59e0b; font-size: 16px;"></i> <span data-i18n="themeToggleLight">Light</span>';
        }
    };
    applyTheme(savedTheme);
    themeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const newTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        localStorage.setItem('travela-theme', newTheme);
        applyTheme(newTheme);
        if (window.currentTranslations) {
            const span = themeBtn.querySelector('span[data-i18n]');
            if (span) span.innerText = window.currentTranslations[newTheme === 'dark' ? 'themeToggleDark' : 'themeToggleLight'] || span.innerText;
        }
    });
});

window.LOCALES_PATH = '../../../locales/';

// Chat Theme
(function() {
    const C = '#3b82f6', G = 'rgba(59,130,246,0.4)';
    function inject() {
        if (document.getElementById('travela-chat-override')) return;
        const s = document.createElement('style'); s.id = 'travela-chat-override';
        s.textContent = `
            #chat-toggle { border: 1px solid ${C} !important; color: ${C} !important; box-shadow: 0 0 15px ${G} !important; }
            #chat-toggle:hover { background: rgba(59,130,246,0.12) !important; }
            #chat-toggle svg { stroke: ${C} !important; color: ${C} !important; }
            .css-avatar { border-color: ${C} !important; box-shadow: 0 0 10px ${G} !important; }
            .avatar-eye { background: ${C} !important; } .status-dot { background: ${C} !important; }
            .bot-info .status { color: ${C} !important; } .typing-dot { background: ${C} !important; }
            #send-btn { color: ${C} !important; }
            .quick-btn { background: rgba(59,130,246,0.08) !important; border-color: rgba(59,130,246,0.5) !important; }
            .quick-btn:hover { background: ${C} !important; color: #fff !important; }
            .input-wrapper:focus-within { border-color: ${C} !important; }
            .user .message-content { background: rgba(59,130,246,0.1) !important; color: ${C} !important; border-color: rgba(59,130,246,0.3) !important; }
            .bot .message-content { border-color: rgba(59,130,246,0.12) !important; }
            .action-btn:hover, .control-btn:hover { color: ${C} !important; }`;
        document.head.appendChild(s);
    }
    const obs = new MutationObserver(() => { if (document.getElementById('chat-toggle')) { inject(); obs.disconnect(); } });
    obs.observe(document.body, { childList: true, subtree: true });
    if (document.readyState !== 'loading') inject(); else document.addEventListener('DOMContentLoaded', inject);
})();

window.WIDGET_BOT_NAME = "Travela Assistant";
window.quickReplyIntents = {
    destinations: { en: '🌍 Destinations', es: '🌍 Destinos', pt: '🌍 Destinos', fr: '🌍 Destinations', de: '🌍 Reiseziele', ja: '🌍 目的地', ko: '🌍 목적지', zh: '🌍 目的地', ar: '🌍 وجهات', hi: '🌍 गंतव्य', he: '🌍 יעדים' },
    packages: { en: '📦 Packages', es: '📦 Paquetes', pt: '📦 Pacotes', fr: '📦 Forfaits', de: '📦 Pakete', ja: '📦 パッケージ', ko: '📦 패키지', zh: '📦 套餐', ar: '📦 حزم', hi: '📦 पैकेज', he: '📦 חבילות' },
    services: { en: '🛎️ Services', es: '🛎️ Servicios', pt: '🛎️ Serviços', fr: '🛎️ Services', de: '🛎️ Dienste', ja: '🛎️ サービス', ko: '🛎️ 서비스', zh: '🛎️ 服务', ar: '🛎️ خدمات', hi: '🛎️ सेवाएं', he: '🛎️ שירותים' },
    contact: { en: '📞 Contact', es: '📞 Contacto', pt: '📞 Contato', fr: '📞 Contact', de: '📞 Kontakt', ja: '📞 連絡先', ko: '📞 연락처', zh: '📞 联系', ar: '📞 اتصل', hi: '📞 संपर्क', he: '📞 קשר' }
};
window.suggestionLabels = window.quickReplyIntents;

window.WIDGET_GREETING = {
    en: "Welcome to Travela! 🌍 I can help you explore destinations, packages, guides, and more.",
    es: "¡Bienvenido a Travela! 🌍 Puedo ayudarle a explorar destinos, paquetes y más."
};
window.WIDGET_SYSTEM_PROMPT = `Role: You are the Travela Assistant. A travel expert for a global tour company.
Context: You know about destinations (NYC, Las Vegas, San Francisco, etc.), tour packages, guides, hotel reservations, and booking.
Tone: Friendly, adventurous, inspiring. Rules: Keep answers brief. Guide users to Destinations, Packages, Services, or Contact.`;

window.chatbotIntents = [
    { id: 'greeting', phrases: ['hello','hi','hey','hola'], keywords: ['greetings'],
      responses: { en: ["Hello! 🌍 Welcome to Travela. Where would you like to explore?"], es: ["¡Hola! 🌍 Bienvenido a Travela. ¿Qué destino le interesa?"] },
      suggestions: ['destinations','packages'] },
    { id: 'destinations', phrases: ['destinations','where to go','places','travel'], keywords: ['destination','places','city'],
      responses: { en: ["Explore our top <b>Destinations</b>: New York City, Las Vegas, San Francisco, and 120+ more worldwide!"], es: ["Explore nuestros <b>Destinos</b> principales: Nueva York, Las Vegas, San Francisco y más de 120 en todo el mundo."] },
      suggestions: ['packages','services'] },
    { id: 'packages', phrases: ['packages','deals','tours','pricing'], keywords: ['package','tour','deal','price'],
      responses: { en: ["We offer all-inclusive <b>Packages</b> starting at $299. Explore our curated National and International tour categories!"], es: ["Ofrecemos <b>Paquetes</b> todo incluido desde $299. ¡Explore nuestras categorías de tours nacionales e internacionales!"] },
      suggestions: ['destinations','contact'] },
    { id: 'services', phrases: ['services','hotel','flights','guides'], keywords: ['service','hotel','flight','guide','event'],
      responses: { en: ["Our <b>Services</b> include WorldWide Tours, Hotel Reservations, Travel Guides, and Event Management."], es: ["Nuestros <b>Servicios</b> incluyen Tours Mundiales, Reservas de Hotel, Guías de Viaje y Gestión de Eventos."] },
      suggestions: ['packages','contact'] },
    { id: 'contact', phrases: ['contact','phone','email','address'], keywords: ['contact','phone','email'],
      responses: { en: ["Find us via the <b>Contact</b> page. We're here 24/7 to help plan your dream journey!"], es: ["Encuéntrenos en la página de <b>Contacto</b>. ¡Estamos disponibles 24/7 para planificar su viaje soñado!"] },
      suggestions: ['destinations','packages'] },
    { id: 'fallback', phrases: [], keywords: [],
      responses: { en: ["I'm not sure about that! Try asking about Destinations, Packages, Services, or Contact."], es: ["¡No estoy seguro! Intente preguntar sobre Destinos, Paquetes, Servicios o Contacto."] },
      suggestions: ['destinations','packages','contact'] }
];
