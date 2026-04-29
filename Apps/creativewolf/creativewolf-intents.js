/**
 * ============================================
 * CreativeWolf — Wolfai Chat Intent Engine
 * Custom intents, responses, and conversation tree
 * ============================================
 */

// --- Bot Identity ---
window.WIDGET_BOT_NAME = "Wolfai – Pack AI Assistant";
window.WIDGET_AVATAR_IMAGE = "../../assets/CreartiveWolf/Wolf orange icon.png";

// --- Custom Greeting ---
window.WIDGET_GREETING = {
    en: "👋 Hi, I'm Wolfai. I help visitors understand CreativeWolf's services, AI solutions, automation systems, and growth strategies. How can I help you today?",
    es: "👋 Hola, soy Wolfai. Ayudo a los visitantes a comprender los servicios de CreativeWolf, soluciones de IA, sistemas de automatización y estrategias de crecimiento. ¿Cómo puedo ayudarte hoy?"
};

// --- System Prompt for Gemini Fallback ---
window.WIDGET_SYSTEM_PROMPT = `Role: You are Wolfai, the official AI Assistant for CreativeWolf, a modern marketing agency based in Hudson, FL. Your goal is to help visitors understand CreativeWolf's services, recommend solutions, capture leads, and guide them toward taking action.
Tone & Style: Professional, warm, knowledgeable, and helpful. Always keep responses under 3 paragraphs. If asked in Spanish, reply in Spanish.
Knowledge Base:
* Services: Modern marketing, branding, web development, automation, AI-powered business solutions, multimedia & brand experiences.
* AI Solutions: Custom AI assistants, chatbots, lead qualification tools, automated follow-ups, workflow automation, internal productivity tools.
* Digital Presence: Professional websites, landing pages, app development, SEO, social media, paid advertising.
* Marketing & Sales: Sales funnels, content marketing, email nurture campaigns, CRM support, customer journey optimization.
* Branding: Brand identity, messaging, visual direction, storytelling, campaign strategy, creative assets.
* Multimedia: Video production, podcast production, live events, cinematic content, AR/VR experiences.
* Contact: Email: awooo@creativewolf.com | Phone: 813-999-6049
* Built by Bryan Marquez as a custom AI concept using structured backend approach.
Strict Rules: NEVER invent services not listed. Always guide visitors toward contacting CreativeWolf. Be enthusiastic about AI solutions.`;

// --- Custom Intents ---
window.chatbotIntents = [
    {
        id: 'greeting',
        phrases: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'hola', 'buenos dias'],
        keywords: ['sup', 'yo', 'greetings', 'howdy', 'saludos'],
        responses: {
            en: [
                "👋 Hi, I'm Wolfai. I help visitors understand CreativeWolf's services, AI solutions, automation systems, and growth strategies. How can I help you today?",
                "Hey there! 🐺 Welcome to CreativeWolf. I'm Wolfai, your Pack AI Assistant. Ask me about our services, AI solutions, or how we can help grow your business!",
                "Hello! I'm Wolfai — CreativeWolf's AI Assistant. I can guide you through our services, recommend solutions, and help you take the next step. What are you looking for?"
            ],
            es: [
                "👋 Hola, soy Wolfai. Ayudo a los visitantes a comprender los servicios de CreativeWolf, soluciones de IA, sistemas de automatización y estrategias de crecimiento. ¿Cómo puedo ayudarte hoy?",
                "¡Hola! 🐺 Bienvenido a CreativeWolf. Soy Wolfai, tu Asistente IA. Pregúntame sobre nuestros servicios, soluciones de IA o cómo podemos ayudar a crecer tu negocio."
            ]
        },
        suggestions: ['services', 'ai_help', 'marketing_help', 'custom_ai', 'cw_contact']
    },
    {
        id: 'services',
        phrases: ['what services', 'services does creativewolf offer', 'what do you offer', 'your services', 'que servicios'],
        keywords: ['services', 'offer', 'provide', 'servicios', 'ofrecer'],
        responses: {
            en: [
                "🛠️ CreativeWolf offers modern marketing, branding, web development, automation, and AI-powered business solutions designed to help companies grow with smarter systems.\n\nCreativeWolf helps businesses build a complete digital ecosystem: a strong brand, a professional online presence, intelligent automation, and marketing systems designed to attract, nurture, and convert leads.\n\n💡 Which service area would you like to explore?"
            ],
            es: [
                "🛠️ CreativeWolf ofrece marketing moderno, branding, desarrollo web, automatización y soluciones empresariales impulsadas por IA diseñadas para ayudar a las empresas a crecer con sistemas más inteligentes.\n\nCreativeWolf ayuda a las empresas a construir un ecosistema digital completo: una marca sólida, presencia online profesional, automatización inteligente y sistemas de marketing.\n\n💡 ¿Qué área de servicio te gustaría explorar?"
            ]
        },
        suggestions: ['ai_automation', 'digital_presence', 'marketing_sales', 'branding_creative', 'multimedia_brand', 'help_choose']
    },
    {
        id: 'ai_automation',
        phrases: ['ai and automation', 'ai automation', 'automation services', 'ai services'],
        keywords: ['automation', 'automate', 'chatbot', 'workflow', 'automatizar'],
        responses: {
            en: [
                "🤖 CreativeWolf can help businesses use AI and automation to save time, improve customer communication, and create smarter workflows.\n\nThis can include custom AI assistants, AI chatbots, lead qualification tools, automated follow-ups, workflow automation, internal productivity tools, and AI-powered business systems.\n\nThese solutions are designed to help your business respond faster, reduce repetitive work, and convert more opportunities with less manual effort. ⚡"
            ],
            es: [
                "🤖 CreativeWolf puede ayudar a las empresas a usar IA y automatización para ahorrar tiempo, mejorar la comunicación con clientes y crear flujos de trabajo más inteligentes.\n\nEsto puede incluir asistentes de IA personalizados, chatbots, herramientas de calificación de prospectos, seguimientos automatizados y sistemas empresariales impulsados por IA. ⚡"
            ]
        },
        suggestions: ['services', 'custom_ai', 'cw_contact']
    },
    {
        id: 'digital_presence',
        phrases: ['digital presence', 'website', 'web development', 'online presence', 'presencia digital'],
        keywords: ['website', 'web', 'landing', 'seo', 'social', 'pagina', 'sitio'],
        responses: {
            en: [
                "🌐 CreativeWolf helps businesses build a strong digital presence through professional websites, landing pages, app development, SEO, social media, and paid advertising.\n\nA strong digital presence helps your brand look credible, explain your services clearly, and guide visitors toward action.\n\nThe goal is not only to look good online, but to create an online experience that builds trust and supports business growth. 📈"
            ],
            es: [
                "🌐 CreativeWolf ayuda a las empresas a construir una fuerte presencia digital a través de sitios web profesionales, landing pages, desarrollo de apps, SEO, redes sociales y publicidad pagada.\n\nEl objetivo no es solo verse bien en línea, sino crear una experiencia que genere confianza y apoye el crecimiento del negocio. 📈"
            ]
        },
        suggestions: ['services', 'marketing_sales', 'cw_contact']
    },
    {
        id: 'marketing_sales',
        phrases: ['marketing and sales', 'sales systems', 'lead generation', 'marketing systems', 'sistemas de marketing'],
        keywords: ['marketing', 'sales', 'funnel', 'leads', 'crm', 'email', 'ventas', 'prospectos'],
        responses: {
            en: [
                "📊 CreativeWolf helps businesses move beyond random marketing efforts by building structured systems for visibility, lead generation, follow-up, and sales conversion.\n\nThis can include sales funnels, content marketing, email nurture campaigns, paid advertising strategies, CRM support, and customer journey optimization.\n\nThe goal is to help your business attract better leads, stay connected with prospects, and turn more opportunities into customers. 🎯"
            ],
            es: [
                "📊 CreativeWolf ayuda a las empresas a ir más allá del marketing aleatorio construyendo sistemas estructurados para visibilidad, generación de prospectos, seguimiento y conversión de ventas.\n\nEl objetivo es ayudar a tu negocio a atraer mejores prospectos y convertir más oportunidades en clientes. 🎯"
            ]
        },
        suggestions: ['services', 'ai_automation', 'cw_contact']
    },
    {
        id: 'branding_creative',
        phrases: ['branding', 'creative strategy', 'brand identity', 'visual direction', 'estrategia creativa'],
        keywords: ['brand', 'branding', 'identity', 'messaging', 'storytelling', 'marca', 'identidad'],
        responses: {
            en: [
                "🎨 CreativeWolf helps businesses define how they look, sound, and position themselves in the market.\n\nThis can include brand identity, messaging, visual direction, storytelling, campaign strategy, and creative assets that help your business stand out from competitors.\n\nA strong brand makes your business easier to recognize, easier to trust, and easier to remember. ✨"
            ],
            es: [
                "🎨 CreativeWolf ayuda a las empresas a definir cómo se ven, suenan y se posicionan en el mercado.\n\nUna marca sólida hace que tu negocio sea más fácil de reconocer, de confiar y de recordar. ✨"
            ]
        },
        suggestions: ['services', 'multimedia_brand', 'cw_contact']
    },
    {
        id: 'multimedia_brand',
        phrases: ['multimedia', 'brand experiences', 'video production', 'experiencias de marca'],
        keywords: ['video', 'podcast', 'events', 'cinematic', 'ar', 'vr', 'multimedia', 'inmersivo'],
        responses: {
            en: [
                "🎬 CreativeWolf creates multimedia and immersive brand experiences that help businesses connect with their audience in a stronger way.\n\nThis may include video production, podcast production, live events, cinematic content, AR/VR experiences, and interactive brand activations.\n\nThese experiences help your brand feel more memorable, emotional, and engaging. 🔥"
            ],
            es: [
                "🎬 CreativeWolf crea experiencias multimedia e inmersivas de marca que ayudan a las empresas a conectarse con su audiencia de una manera más fuerte.\n\nEstas experiencias ayudan a que tu marca se sienta más memorable, emocional y atractiva. 🔥"
            ]
        },
        suggestions: ['services', 'branding_creative', 'cw_contact']
    },
    {
        id: 'help_choose',
        phrases: ['help me choose', 'which service', 'what do i need', 'recommend a service', 'ayudame a elegir'],
        keywords: ['choose', 'recommend', 'right', 'best', 'need', 'elegir', 'recomendar', 'mejor'],
        responses: {
            en: [
                "🧭 No problem. I can help you identify the best CreativeWolf service based on your business goals.\n\nTo guide you better, what are you trying to improve right now?"
            ],
            es: [
                "🧭 Sin problema. Puedo ayudarte a identificar el mejor servicio de CreativeWolf según tus objetivos de negocio.\n\nPara guiarte mejor, ¿qué estás tratando de mejorar ahora mismo?"
            ]
        },
        suggestions: ['want_leads', 'need_website', 'automate_tasks', 'need_branding', 'need_marketing', 'want_ai']
    },
    {
        id: 'want_leads',
        phrases: ['i want more leads', 'more leads', 'generate leads', 'quiero más prospectos'],
        keywords: ['leads', 'prospectos', 'clientes'],
        responses: {
            en: [
                "🎯 Great goal! CreativeWolf can help you build a lead generation system using AI-powered tools, sales funnels, and automated follow-ups to bring in more qualified leads consistently.\n\nWould you like to learn more about our AI & Automation or Marketing & Sales Systems?"
            ],
            es: [
                "🎯 ¡Gran objetivo! CreativeWolf puede ayudarte a construir un sistema de generación de prospectos usando herramientas de IA, embudos de venta y seguimientos automatizados."
            ]
        },
        suggestions: ['ai_automation', 'marketing_sales', 'cw_contact']
    },
    {
        id: 'need_website',
        phrases: ['i need a better website', 'new website', 'website redesign', 'necesito un sitio web'],
        keywords: ['website', 'redesign', 'sitio', 'pagina'],
        responses: {
            en: [
                "🌐 A professional website is the foundation of your digital presence. CreativeWolf builds websites that don't just look great — they guide visitors toward action and support business growth.\n\nWant to explore our Digital Presence services?"
            ],
            es: [
                "🌐 Un sitio web profesional es la base de tu presencia digital. CreativeWolf construye sitios web que no solo se ven bien — guían a los visitantes hacia la acción."
            ]
        },
        suggestions: ['digital_presence', 'services', 'cw_contact']
    },
    {
        id: 'automate_tasks',
        phrases: ['automate tasks', 'automation help', 'save time', 'automatizar tareas'],
        keywords: ['automate', 'repetitive', 'manual', 'efficiency', 'automatizar'],
        responses: {
            en: [
                "⚡ CreativeWolf specializes in workflow automation and AI-powered tools that eliminate repetitive work and help your team focus on what matters most.\n\nWant to learn about our AI & Automation capabilities?"
            ],
            es: [
                "⚡ CreativeWolf se especializa en automatización de flujos de trabajo y herramientas de IA que eliminan el trabajo repetitivo."
            ]
        },
        suggestions: ['ai_automation', 'custom_ai', 'cw_contact']
    },
    {
        id: 'need_branding',
        phrases: ['i need help with branding', 'brand help', 'brand identity', 'necesito branding'],
        keywords: ['branding', 'rebrand', 'logo', 'visual', 'marca'],
        responses: {
            en: [
                "🎨 A strong brand is the foundation of everything. CreativeWolf can help you define your brand identity, messaging, visual direction, and creative strategy to stand out in your market."
            ],
            es: [
                "🎨 Una marca sólida es la base de todo. CreativeWolf puede ayudarte a definir tu identidad de marca, mensajes, dirección visual y estrategia creativa."
            ]
        },
        suggestions: ['branding_creative', 'services', 'cw_contact']
    },
    {
        id: 'need_marketing',
        phrases: ['i need better marketing', 'marketing help', 'help with marketing', 'necesito marketing'],
        keywords: ['marketing', 'advertising', 'campaign', 'publicidad', 'campaña'],
        responses: {
            en: [
                "📢 CreativeWolf can help you build a marketing strategy designed to make your business more visible, more consistent, and more effective at converting leads.\n\nThis may include social media content, paid advertising, email campaigns, SEO, branding, lead generation systems, and AI-powered tools that support your marketing workflow.\n\nInstead of running disconnected campaigns, the goal is to create a complete marketing system that helps your brand get seen, build trust, and turn attention into real business opportunities.\n\n💬 Would you like to share your business type so I can guide you toward the best option?"
            ],
            es: [
                "📢 CreativeWolf puede ayudarte a construir una estrategia de marketing diseñada para hacer tu negocio más visible, consistente y efectivo en convertir prospectos.\n\n💬 ¿Te gustaría compartir tu tipo de negocio para guiarte hacia la mejor opción?"
            ]
        },
        suggestions: ['marketing_sales', 'services', 'cw_contact']
    },
    {
        id: 'want_ai',
        phrases: ['i want an ai assistant', 'ai assistant for my business', 'quiero un asistente ia'],
        keywords: ['assistant', 'asistente'],
        responses: {
            en: [
                "🤖 CreativeWolf can help you explore custom AI assistant solutions for your business."
            ],
            es: [
                "🤖 CreativeWolf puede ayudarte a explorar soluciones de asistentes de IA personalizados para tu negocio."
            ]
        },
        suggestions: ['custom_ai', 'ai_automation', 'cw_contact']
    },
    {
        id: 'ai_help',
        phrases: ['how can ai help', 'ai for my business', 'can ai help me', 'como puede la ia ayudarme'],
        keywords: ['ai', 'artificial', 'intelligence', 'ia', 'inteligencia'],
        responses: {
            en: [
                "🧠 CreativeWolf helps businesses grow by building smarter systems around visibility, lead generation, automation, and conversion.\n\nInstead of focusing only on one piece of marketing, CreativeWolf looks at the full customer journey: how people discover your brand, how they understand your offer, how they become leads, and how they are nurtured into clients.\n\nThis can include AI-powered assistants, optimized websites, automated follow-up systems, paid advertising, content strategy, and sales funnels designed to help your business attract better leads and convert more opportunities. 🚀"
            ],
            es: [
                "🧠 CreativeWolf ayuda a las empresas a crecer construyendo sistemas más inteligentes alrededor de visibilidad, generación de prospectos, automatización y conversión.\n\nEsto puede incluir asistentes de IA, sitios web optimizados, sistemas de seguimiento automatizado, publicidad pagada, estrategia de contenido y embudos de venta. 🚀"
            ]
        },
        suggestions: ['services', 'ai_automation', 'custom_ai', 'cw_contact']
    },
    {
        id: 'marketing_help',
        phrases: ['i need marketing support', 'marketing support', 'help with marketing', 'necesito apoyo de marketing'],
        keywords: ['support', 'help', 'apoyo', 'ayuda'],
        responses: {
            en: [
                "📢 CreativeWolf can help you build a marketing strategy designed to make your business more visible, more consistent, and more effective at converting leads.\n\nThis may include social media content, paid advertising, email campaigns, SEO, branding, lead generation systems, and AI-powered tools that support your marketing workflow.\n\nInstead of running disconnected campaigns, the goal is to create a complete marketing system that helps your brand get seen, build trust, and turn attention into real business opportunities.\n\n💬 Would you like to share your business type so I can guide you toward the best option?"
            ],
            es: [
                "📢 CreativeWolf puede ayudarte a construir una estrategia de marketing diseñada para hacer tu negocio más visible y efectivo.\n\n💬 ¿Te gustaría compartir tu tipo de negocio para guiarte hacia la mejor opción?"
            ]
        },
        suggestions: ['marketing_sales', 'services', 'cw_contact']
    },
    {
        id: 'custom_ai',
        phrases: ['custom ai assistant', 'i want a custom ai', 'build me an ai', 'quiero un asistente personalizado'],
        keywords: ['custom', 'build', 'chatbot', 'personalizado', 'construir'],
        responses: {
            en: [
                "🐺 You are speaking to one right now.\n\nWolfAI is an example of how a custom AI assistant can help a business answer questions, guide visitors, recommend services, and capture potential leads directly from a website.\n\nA custom AI assistant can be designed around your brand, services, tone, business goals, and customer journey. It can support lead generation, customer support, service recommendations, appointment requests, and automated follow-ups.\n\nFor this demo, WolfAI was developed as a custom AI concept by Bryan Marquez, using a structured backend approach designed to support real-world business use cases.\n\nCreativeWolf can use this type of AI-powered system to help businesses communicate smarter, respond faster, and convert more visitors into qualified leads. 🚀"
            ],
            es: [
                "🐺 Estás hablando con uno ahora mismo.\n\nWolfAI es un ejemplo de cómo un asistente de IA personalizado puede ayudar a un negocio a responder preguntas, guiar visitantes, recomendar servicios y capturar prospectos directamente desde un sitio web.\n\nCreativeWolf puede usar este tipo de sistema impulsado por IA para ayudar a las empresas a comunicarse de manera más inteligente y convertir más visitantes en prospectos calificados. 🚀"
            ]
        },
        suggestions: ['ai_automation', 'services', 'cw_contact']
    },
    {
        id: 'cw_contact',
        phrases: ['contact creativewolf', 'how to contact', 'get in touch', 'reach out', 'contactar creativewolf', 'como contactar'],
        keywords: ['contact', 'email', 'phone', 'reach', 'touch', 'contacto', 'correo', 'telefono'],
        responses: {
            en: [
                "📬 You can contact CreativeWolf directly:\n\n📧 Email: awooo@creativewolf.com\n📞 Phone: 813-999-6049\n\nYou can also submit your information through the website contact form, and the CreativeWolf team can follow up with you about your business goals, project needs, or AI solution.\n\n💡 If you would like, I can help you identify which service may be the best fit before you reach out."
            ],
            es: [
                "📬 Puedes contactar a CreativeWolf directamente:\n\n📧 Email: awooo@creativewolf.com\n📞 Teléfono: 813-999-6049\n\nTambién puedes enviar tu información a través del formulario de contacto del sitio web.\n\n💡 Si deseas, puedo ayudarte a identificar qué servicio puede ser el mejor para ti."
            ]
        },
        suggestions: ['services', 'help_choose', 'custom_ai'],
        triggerForm: true
    },
    {
        id: 'fallback',
        phrases: [],
        keywords: [],
        responses: {
            en: [
                "🤔 Interesting question! I'm best at answering about CreativeWolf's services, AI solutions, marketing systems, and how we can help grow your business. Try asking about one of those!",
                "I'm not sure I understood that — but I can tell you a lot about CreativeWolf's services, AI-powered solutions, branding, and growth strategies. What would you like to explore?",
                "Hmm, that's outside my specialty. I know CreativeWolf's offerings inside and out though — ask me about services, AI solutions, or how to contact us! 🐺"
            ],
            es: [
                "🤔 ¡Pregunta interesante! Soy mejor respondiendo sobre los servicios de CreativeWolf, soluciones de IA y estrategias de crecimiento. ¡Intenta preguntar sobre alguno de esos!",
                "No estoy seguro de haber entendido — pero puedo contarte mucho sobre los servicios de CreativeWolf. ¿Qué te gustaría explorar?"
            ]
        },
        suggestions: ['services', 'ai_help', 'custom_ai', 'cw_contact']
    }
];

// --- Quick Reply Buttons (shown on greeting) ---
window.quickReplyIntents = {
    services:       { en: '🛠️ What services does CreativeWolf offer?', es: '🛠️ ¿Qué servicios ofrece CreativeWolf?' },
    ai_help:        { en: '🧠 How can AI help my business?', es: '🧠 ¿Cómo puede la IA ayudar a mi negocio?' },
    marketing_help: { en: '📢 I need marketing support', es: '📢 Necesito apoyo de marketing' },
    custom_ai:      { en: '🤖 I want a custom AI assistant', es: '🤖 Quiero un asistente IA personalizado' },
    cw_contact:     { en: '📬 How can I contact CreativeWolf?', es: '📬 ¿Cómo puedo contactar a CreativeWolf?' }
};

// --- Suggestion Chip Labels ---
window.suggestionLabels = {
    services:         { en: '🛠️ Services', es: '🛠️ Servicios' },
    ai_help:          { en: '🧠 AI for Business', es: '🧠 IA para Negocios' },
    ai_automation:    { en: '🤖 AI & Automation', es: '🤖 IA y Automatización' },
    digital_presence: { en: '🌐 Digital Presence', es: '🌐 Presencia Digital' },
    marketing_sales:  { en: '📊 Marketing & Sales', es: '📊 Marketing y Ventas' },
    branding_creative:{ en: '🎨 Branding & Creative', es: '🎨 Branding y Creatividad' },
    multimedia_brand: { en: '🎬 Multimedia', es: '🎬 Multimedia' },
    help_choose:      { en: '🧭 Help Me Choose', es: '🧭 Ayúdame a Elegir' },
    marketing_help:   { en: '📢 Marketing Support', es: '📢 Apoyo de Marketing' },
    custom_ai:        { en: '🐺 Custom AI Assistant', es: '🐺 Asistente IA Personalizado' },
    cw_contact:       { en: '📬 Contact', es: '📬 Contacto' },
    want_leads:       { en: '🎯 I want more leads', es: '🎯 Quiero más prospectos' },
    need_website:     { en: '🌐 I need a better website', es: '🌐 Necesito un mejor sitio web' },
    automate_tasks:   { en: '⚡ I want to automate tasks', es: '⚡ Quiero automatizar tareas' },
    need_branding:    { en: '🎨 I need help with branding', es: '🎨 Necesito ayuda con branding' },
    need_marketing:   { en: '📢 I need better marketing', es: '📢 Necesito mejor marketing' },
    want_ai:          { en: '🤖 I want an AI assistant', es: '🤖 Quiero un asistente IA' }
};
