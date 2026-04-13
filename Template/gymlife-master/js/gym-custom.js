/**
 * GymLife Custom Integration
 * Adds Dark/Light Theme Switching and Configures the Gym Chatbot
 */

// 1. Configure the Chatbot Intents for GymLife

// Gym Quick Replies and Chatbot Identity
window.WIDGET_BOT_NAME = "IronFitness Assistant";

window.quickReplyIntents = {
    classes: { en: '🏋️‍♂️ Classes', es: '🏋️‍♂️ Clases', pt: '🏋️‍♂️ Aulas', de: '🏋️‍♂️ Kurse', fr: '🏋️‍♂️ Cours', ja: '🏋️‍♂️ クラス', ko: '🏋️‍♂️ 클래스', zh: '🏋️‍♂️ 课程', ar: '🏋️‍♂️ فصول', hi: '🏋️‍♂️ कक्षाएं', he: '🏋️‍♂️ שיעורים' },
    pricing: { en: '💳 Pricing', es: '💳 Precios', pt: '💳 Preços', de: '💳 Preise', fr: '💳 Prix', ja: '💳 料金', ko: '💳 가격', zh: '💳 价格', ar: '💳 الأسعار', hi: '💳 मूल्य', he: '💳 מחירים' },
    trainers: { en: '🏆 Trainers', es: '🏆 Entrenadores', pt: '🏆 Treinadores', de: '🏆 Trainer', fr: '🏆 Entraîneurs', ja: '🏆 トレーナー', ko: '🏆 트레이너', zh: '🏆 教练', ar: '🏆 المدربين', hi: '🏆 ट्रेनर', he: '🏆 מאמנים' },
    contact: { en: '📍 Contact', es: '📍 Contacto', pt: '📍 Contato', de: '📍 Kontakt', fr: '📍 Contact', ja: '📍 連絡先', ko: '📍 연락처', zh: '📍 联系', ar: '📍 اتصل', hi: '📍 संपर्क', he: '📍 קשר' }
};

window.suggestionLabels = window.quickReplyIntents;

// Initial Greeting Override
window.WIDGET_GREETING = {
    en: "System Online. I'm the IronFitness Assistant! How can I help you crush your goals today?",
    es: "Sistema en línea. ¡Soy el Asistente de IronFitness! ¿Cómo te ayudo a alcanzar tus metas hoy?",
    pt: "Sistema Online. Sou o Assistente IronFitness! Como posso ajudar?",
    de: "System Online. Ich bin der IronFitness-Assistent! Wie kann ich helfen?",
    fr: "Système en ligne. Je suis l'assistant IronFitness ! Comment puis-je vous aider ?",
    ja: "システム稼働中。IronFitness アシスタントです！",
    ko: "시스템 온라인. IronFitness 어시스턴트입니다!",
    zh: "系统在线。我是 IronFitness 助手！",
    ar: "النظام متصل. أنا مساعد IronFitness!",
    hi: "सिस्टम ऑनलाइन। मैं IronFitness सहायक हूँ!",
    he: "מערכת מחוברת. אני עוזר IronFitness!"
};

// System Prompt Override for Gemini API fallback
window.WIDGET_SYSTEM_PROMPT = `Role: You are the IronFitness Gym Assistant frontend chatbot. You act as a friendly, energetic, motivating gym receptionist.
Your limits: Keep it under 2 short paragraphs. Talk ONLY about the gym, our classes (Crossfit, Yoga, Bodybuilding), memberships ($39/mo or $59/mo), trainers (Patrick, Lori, Amanda), and schedule (6:30AM-12:00PM weekdays). 
Tone: Friendly, inviting, motivating.
Address: 333 Middle Winchendon Rd, Rindge, NH 03461. Phone: 125-711-811 or 125-668-886. Email: Support.gymcenter@gmail.com. Mention to find us on social media!
If asked non-gym related info, friendly redirect back to fitness goals. Respond in the language that the user typed in!`;
window.chatbotIntents = [
    {
        id: 'greeting',
        phrases: ['hello', 'hi', 'hey', 'good morning', 'hola', 'buenos dias'],
        keywords: ['sup', 'yo', 'greetings', 'saludos'],
        responses: {
            en: [
                "Hello! 👋 I'm the IronFitness Assistant. How can I help you crush your goals today? Ask me about our classes, memberships, or personal trainers!",
                "Welcome to IronFitness! Ready to sweat? I can give you info on our schedules, pricing, and facilities. What do you need?"
            ],
            es: [
                "¡Hola! 👋 Soy el asistente de IronFitness. ¿Cómo te ayudo a alcanzar tus metas hoy? ¡Pregúntame sobre clases, membresías o entrenadores personales!",
                "¡Bienvenido a IronFitness! ¿Listo para sudar? Puedo darte información de horarios, precios e instalaciones. ¿Qué necesitas?"
            ]
        },
        suggestions: ['classes', 'pricing', 'trainers']
    },
    {
        id: 'classes',
        phrases: ['what classes do you have', 'workout classes', 'crossfit', 'yoga', 'schedule', 'horarios', 'clases'],
        keywords: ['classes', 'schedule', 'crossfit', 'yoga', 'bodybuilding', 'horario', 'clases'],
        responses: {
            en: [
                "We offer a variety of programs to crush your goals!<br><br><b>Available Classes:</b><br>• CrossFit<br>• Yoga<br>• Bodybuilding<br>• Weight Loss<br>• Cardio<br><br>Check out our Classes page for the full timetable!"
            ],
            es: [
                "¡Ofrecemos clases para alcanzar tus metas!<br><br><b>Programas:</b><br>• CrossFit<br>• Yoga<br>• Musculación<br>• Pérdida de Peso<br>• Cardio<br><br>¡Consulta nuestra página de Clases para el horario completo!"
            ]
        },
        suggestions: ['pricing', 'trainers', 'contact']
    },
    {
        id: 'pricing',
        phrases: ['how much is it', 'membership price', 'cost', 'pricing', 'cuanto cuesta', 'precio', 'membresia'],
        keywords: ['price', 'cost', 'membership', 'monthly', 'precio', 'cuesta', 'mensualidad'],
        responses: {
            en: [
                "We have flexible memberships designed for you:<br><br><b>Plans:</b><br>• <b>Basic:</b> $39/month (Weight Room & Cardio)<br>• <b>Pro:</b> $59/month (Full Class Access)<br>• <b>Day Pass:</b> Available!<br><br>Join us today and start your journey."
            ],
            es: [
                "Tenemos membresías flexibles para ti:<br><br><b>Planes:</b><br>• <b>Básico:</b> $39/mes (Pesas y Cardio)<br>• <b>Pro:</b> $59/mes (Acceso Total a Clases)<br>• <b>Pase de 1 Día:</b> ¡Disponible!<br><br>¡Únete hoy y comienza tu viaje!"
            ]
        },
        suggestions: ['classes', 'contact']
    },
    {
        id: 'trainers',
        phrases: ['personal trainer', 'coaches', 'who are the trainers', 'entrenadores', 'entrenador personal'],
        keywords: ['trainer', 'coach', 'coaches', 'entrenador', 'coach'],
        responses: {
            en: [
                "We have World-Class trainers ready to guide you:<br><br><b>Our Team:</b><br>• <b>Patrick Cortez</b> - Bodybuilding<br>• <b>Lori Tyler</b> - CrossFit<br>• <b>Amanda Vance</b> - Yoga<br><br>Ask at the front desk to schedule a session!"
            ],
            es: [
                "Tenemos entrenadores de clase mundial listos para guiarte:<br><br><b>Nuestro Equipo:</b><br>• <b>Patrick Cortez</b> - Musculación<br>• <b>Lori Tyler</b> - CrossFit<br>• <b>Amanda Vance</b> - Yoga<br><br>¡Pregunta en recepción para agendar una sesión!"
            ]
        },
        suggestions: ['schedule', 'pricing']
    },
    {
        id: 'contact',
        phrases: ['where are you located', 'contact', 'address', 'contacto', 'direccion', 'ubicacion'],
        keywords: ['address', 'location', 'phone', 'contact', 'direccion', 'telefono', 'contacto'],
        responses: {
            en: [
                "We are located at 333 Middle Winchendon Rd, Rindge, NH 03461.<br><br><b>Phone:</b><br>125-711-811<br>125-668-886<br><br><b>Email:</b><br>Support.gymcenter@gmail.com<br><br>Find IronFitness on social media to stay motivated!"
            ],
            es: [
                "Estamos ubicados en 333 Middle Winchendon Rd, Rindge, NH 03461.<br><br><b>Teléfono:</b><br>125-711-811<br>125-668-886<br><br><b>Email:</b><br>Support.gymcenter@gmail.com<br><br>¡Encuentra a IronFitness en redes sociales para mantenerte motivado!"
            ]
        },
        suggestions: ['classes', 'pricing']
    },
    {
        id: 'fallback',
        phrases: [], keywords: [],
        responses: {
            en: ["I didn't quite catch that. Try asking about our classes, prices, or trainers constraints!"],
            es: ["No entendí muy bien. ¡Intenta preguntar por nuestras clases, precios o entrenadores!"]
        },
        suggestions: ['classes', 'pricing', 'trainers']
    }
];

window.LOCALES_PATH = 'gym-locales/';

// 2. Setup Theme Toggling
document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (!themeBtn) return;

    // The dark theme is default (no class). Light theme adds [data-theme="light"]
    const savedTheme = localStorage.getItem('gym-theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
        themeBtn.setAttribute('data-theme-state', 'dark');
        themeBtn.innerHTML = '<i class="fa fa-moon-o"></i> <span data-i18n="themeToggleDark">Dark</span>';
    } else {
        themeBtn.setAttribute('data-theme-state', 'light');
        themeBtn.innerHTML = '<i class="fa fa-sun-o"></i> <span data-i18n="themeToggleLight">Light</span>';
    }

    themeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const currentTheme = document.body.getAttribute('data-theme');
        if (currentTheme === 'light') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('gym-theme', 'dark');
            themeBtn.setAttribute('data-theme-state', 'light');
            themeBtn.innerHTML = '<i class="fa fa-sun-o"></i> <span data-i18n="themeToggleLight">Light</span>';
        } else {
            document.body.setAttribute('data-theme', 'light');
            localStorage.setItem('gym-theme', 'light');
            themeBtn.setAttribute('data-theme-state', 'dark');
            themeBtn.innerHTML = '<i class="fa fa-moon-o"></i> <span data-i18n="themeToggleDark">Dark</span>';
        }
        
        // Re-apply translations for the button if translations are loaded
        if (typeof window.currentTranslations !== 'undefined' && window.currentTranslations) {
            const span = themeBtn.querySelector('span');
            const state = themeBtn.getAttribute('data-theme-state');
            const key = state === 'dark' ? 'themeToggleDark' : 'themeToggleLight';
            if (span && window.currentTranslations[key]) {
                span.innerText = window.currentTranslations[key];
            }
        }
    });
});
