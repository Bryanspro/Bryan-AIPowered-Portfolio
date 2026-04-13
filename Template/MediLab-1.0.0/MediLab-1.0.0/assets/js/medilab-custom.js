/**
 * MediLab Custom Integration
 * Dark/Light Theme + Chatbot identity + Locales path
 */

document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (!themeBtn) return;

    const savedTheme = localStorage.getItem('medilab-theme') || 'light';

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            themeBtn.innerHTML = '<i class="bi bi-moon-fill" style="color: #1977cc; font-size: 16px;"></i> <span data-i18n="themeToggleDark">Dark</span>';
        } else {
            document.body.removeAttribute('data-theme');
            themeBtn.innerHTML = '<i class="bi bi-sun-fill" style="color: #1977cc; font-size: 16px;"></i> <span data-i18n="themeToggleLight">Light</span>';
        }
    };

    applyTheme(savedTheme);

    themeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        localStorage.setItem('medilab-theme', newTheme);
        applyTheme(newTheme);

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

// Chat Widget Theme Override for MediLab Blue
(function applyMedilabChatTheme() {
    const MEDI = '#1977cc';
    const MEDI_GLOW = 'rgba(25, 119, 204, 0.4)';

    function injectMedilabStyles() {
        const existing = document.getElementById('medilab-override');
        if (existing) return;

        const style = document.createElement('style');
        style.id = 'medilab-override';
        style.textContent = `
            #chat-toggle {
                border: 1px solid ${MEDI} !important;
                color: ${MEDI} !important;
                box-shadow: 0 0 15px ${MEDI_GLOW} !important;
            }
            #chat-toggle:hover {
                background: rgba(25, 119, 204, 0.12) !important;
                box-shadow: 0 0 25px rgba(25, 119, 204, 0.5) !important;
            }
            #chat-toggle svg { stroke: ${MEDI} !important; color: ${MEDI} !important; }
            .css-avatar { border-color: ${MEDI} !important; box-shadow: 0 0 10px ${MEDI_GLOW} !important; }
            .avatar-eye { background: ${MEDI} !important; }
            .status-dot { background: ${MEDI} !important; box-shadow: 0 0 5px ${MEDI_GLOW} !important; }
            .bot-info .status { color: ${MEDI} !important; }
            .typing-dot { background: ${MEDI} !important; }
            #send-btn { color: ${MEDI} !important; }
            .quick-btn {
                background: rgba(25, 119, 204, 0.08) !important;
                border-color: rgba(25, 119, 204, 0.5) !important;
                color: #e0e0e0 !important;
            }
            .quick-btn:hover { background: ${MEDI} !important; color: #ffffff !important; }
            .input-wrapper:focus-within { border-color: ${MEDI} !important; }
            .user .message-content { background: rgba(25, 119, 204, 0.1) !important; color: ${MEDI} !important; border-color: rgba(25, 119, 204, 0.3) !important; }
            .bot .message-content { border-color: rgba(25, 119, 204, 0.12) !important; }
            .action-btn:hover, .control-btn:hover { color: ${MEDI} !important; }
        `;
        document.head.appendChild(style);
    }

    const observer = new MutationObserver(() => {
        if (document.getElementById('chat-toggle')) {
            injectMedilabStyles();
            observer.disconnect();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    if (document.readyState !== 'loading') injectMedilabStyles();
    else document.addEventListener('DOMContentLoaded', injectMedilabStyles);
})();


window.WIDGET_BOT_NAME = "HealthCare+ Assistant";

window.quickReplyIntents = {
    services: { en: '🏥 Services', es: '🏥 Servicios', pt: '🏥 Serviços', de: '🏥 Dienste', fr: '🏥 Services', ja: '🏥 サービス', ko: '🏥 서비스', zh: '🏥 服务', ar: '🏥 خدمات', hi: '🏥 सेवाएं', he: '🏥 שירותים' },
    departments: { en: '🩺 Departments', es: '🩺 Departamentos', pt: '🩺 Departamentos', de: '🩺 Abteilungen', fr: '🩺 Départements', ja: '🩺 部門', ko: '🩺 부서', zh: '🩺 科室', ar: '🩺 أقسام', hi: '🩺 विभाग', he: '🩺 מחלקות' },
    doctors: { en: '👨‍⚕️ Doctors', es: '👨‍⚕️ Médicos', pt: '👨‍⚕️ Médicos', de: '👨‍⚕️ Ärzte', fr: '👨‍⚕️ Médecins', ja: '👨‍⚕️ 医師', ko: '👨‍⚕️ 의사', zh: '👨‍⚕️ 医生', ar: '👨‍⚕️ أطباء', hi: '👨‍⚕️ डॉक्टर', he: '👨‍⚕️ רופאים' },
    contact: { en: '📞 Contact', es: '📞 Contacto', pt: '📞 Contato', de: '📞 Kontakt', fr: '📞 Contact', ja: '📞 連絡先', ko: '📞 연락처', zh: '📞 联系', ar: '📞 اتصل', hi: '📞 संपर्क', he: '📞 קשר' }
};

window.suggestionLabels = window.quickReplyIntents;

window.WIDGET_GREETING = {
    en: "Welcome to HealthCare+! I can help you find services, departments, doctors, or book an appointment.",
    es: "¡Bienvenido a HealthCare+! Puedo ayudarle a encontrar servicios, departamentos, médicos o programar una cita."
};

window.WIDGET_SYSTEM_PROMPT = `Role: You are the HealthCare+ Assistant. A professional helper for a multi-specialty hospital.
Context: You know about the hospital's services, departments (Cardiology, Neurology, Hepatology, Pediatrics, Eye Care), doctors, and appointment system.
Tone: Professional, empathetic, and reassuring.
Rules: Keep answers brief. Guide users to Services, Departments, Doctors, or Contact sections.`;

window.chatbotIntents = [
    {
        id: 'greeting',
        phrases: ['hello', 'hi', 'hey', 'good morning', 'hola', 'buenas'],
        keywords: ['greetings'],
        responses: {
            en: ["Hello! 👋 Welcome to HealthCare+. How can I help you today? Ask me about our services, departments, or doctors!"],
            es: ["¡Hola! 👋 Bienvenido a HealthCare+. ¿Cómo puedo ayudarle? ¡Pregúnteme sobre servicios, departamentos o médicos!"]
        },
        suggestions: ['services', 'departments']
    },
    {
        id: 'services',
        phrases: ['what services', 'services', 'treatment', 'medical services'],
        keywords: ['services', 'treatment', 'care'],
        responses: {
            en: ["We offer comprehensive <b>Services</b> including diagnostics, emergency care, surgery, rehabilitation, and preventive medicine."],
            es: ["Ofrecemos <b>Servicios</b> completos incluyendo diagnósticos, urgencias, cirugía, rehabilitación y medicina preventiva."]
        },
        suggestions: ['departments', 'contact']
    },
    {
        id: 'departments',
        phrases: ['departments', 'specialties', 'cardiology', 'neurology', 'pediatrics'],
        keywords: ['department', 'specialty', 'cardiology', 'neurology'],
        responses: {
            en: ["Our <b>Departments</b> include Cardiology, Neurology, Hepatology, Pediatrics, and Eye Care. Each is led by world-class specialists."],
            es: ["Nuestros <b>Departamentos</b> incluyen Cardiología, Neurología, Hepatología, Pediatría y Oftalmología."]
        },
        suggestions: ['doctors', 'contact']
    },
    {
        id: 'doctors',
        phrases: ['doctors', 'physicians', 'specialists', 'who are the doctors'],
        keywords: ['doctor', 'physician', 'specialist'],
        responses: {
            en: ["Our team includes Dr. Walter White (CMO), Dr. Sarah Jhonson (Anesthesiologist), Dr. William Anderson (Cardiology), and Dr. Amanda Jepson (Neurosurgeon)."],
            es: ["Nuestro equipo incluye al Dr. Walter White (Director Médico), Dra. Sarah Jhonson, Dr. William Anderson y Dra. Amanda Jepson."]
        },
        suggestions: ['services', 'contact']
    },
    {
        id: 'appointment',
        phrases: ['appointment', 'book', 'schedule', 'cita', 'reservar'],
        keywords: ['appointment', 'book', 'schedule'],
        responses: {
            en: ["You can book an appointment through our <b>Appointment</b> section. Just select a date, department, and doctor!"],
            es: ["Puede reservar una cita en nuestra sección de <b>Citas</b>. ¡Solo seleccione fecha, departamento y médico!"]
        },
        suggestions: ['departments', 'doctors']
    },
    {
        id: 'contact',
        phrases: ['contact', 'phone', 'email', 'location', 'address'],
        keywords: ['contact', 'phone', 'email', 'location'],
        responses: {
            en: ["Reach us via the <b>Contact</b> section. Email: contact@example.com | Phone: +1 5589 55488 55"],
            es: ["Contáctenos en la sección de <b>Contacto</b>. Email: contact@example.com | Tel: +1 5589 55488 55"]
        },
        suggestions: ['services', 'departments']
    },
    {
        id: 'fallback',
        phrases: [], keywords: [],
        responses: {
            en: ["I'm not fully sure about that! Try asking about our Services, Departments, Doctors, or how to book an Appointment."],
            es: ["¡No estoy del todo seguro! Intenta preguntar sobre Servicios, Departamentos, Médicos o Citas."]
        },
        suggestions: ['services', 'departments', 'contact']
    }
];
