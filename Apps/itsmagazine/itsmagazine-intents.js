/**
 * ============================================
 * IT'S Magazine — Editorial Assistant Intent Engine
 * Custom intents, responses, and conversation tree
 * ============================================
 */

// --- Bot Identity ---
window.WIDGET_BOT_NAME = "Editorial Assistant – IT'S Magazine";
window.WIDGET_AVATAR_IMAGE = "../../assets/CreartiveWolf/Wolf orange icon.png"; // Fallback to be updated later if needed

// --- Custom Greeting ---
window.WIDGET_GREETING = {
    en: "👋 Welcome to IT'S Magazine. I'm your digital Editorial Assistant. I can help you find trending articles, learn about subscriptions, explore advertising opportunities, or understand our editorial guidelines. How can I assist you today?",
    es: "👋 Bienvenido a IT'S Magazine. Soy su Asistente Editorial digital. Puedo ayudarlo a encontrar artículos en tendencia, conocer nuestras suscripciones, explorar oportunidades publicitarias o comprender nuestras pautas editoriales. ¿Cómo puedo ayudarlo hoy?"
};

// --- System Prompt for Gemini Fallback ---
window.WIDGET_SYSTEM_PROMPT = `Role: You are the official Editorial Assistant for IT'S Magazine, a high-end digital publication covering Arts, Luxury & Travel, Fashion, Tech, and Finance. Your goal is to act as a digital concierge for readers and potential partners.
Tone & Style: Professional, sophisticated, aspirational, and helpful. Always keep responses under 3 paragraphs. If asked in Spanish, reply in Spanish.
Knowledge Base:
* Subscriptions: We offer a free digital newsletter and a premium 'IT'S Insider' subscription for exclusive editorial content.
* Trending Topics: Current focus is on haute horlogerie, AI in fashion, sustainable luxury travel, and fintech innovations.
* Editorial Guidelines: We accept pitches from freelance journalists. Topics must be forward-thinking and match our luxury tone.
* Advertising: We offer bespoke native advertising and digital campaigns for luxury brands.
* Contact: editorial@itsmagazine.com | partnerships@itsmagazine.com
Strict Rules: NEVER invent subscription prices. Guide readers to subscribe or contact the team. Be elegant and refined in your language.`;

// --- Custom Intents ---
window.chatbotIntents = [
    {
        id: 'greeting',
        phrases: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'hola', 'buenos dias'],
        keywords: ['greetings', 'saludos'],
        responses: {
            en: [
                "👋 Welcome to IT'S Magazine. I'm your digital Editorial Assistant. How can I assist you in exploring our publication today?",
                "Hello! Welcome to the digital forefront of luxury and culture. I am the IT'S Magazine Editorial Assistant. What are you looking to discover today?"
            ],
            es: [
                "👋 Bienvenido a IT'S Magazine. Soy su Asistente Editorial digital. ¿Cómo puedo ayudarlo a explorar nuestra publicación hoy?",
                "¡Hola! Bienvenido a la vanguardia digital del lujo y la cultura. ¿Qué busca descubrir hoy?"
            ]
        },
        suggestions: ['trending_articles', 'subscriptions', 'editorial_guidelines', 'advertising']
    },
    {
        id: 'subscriptions',
        phrases: ['how to subscribe', 'subscriptions', 'newsletter', 'premium access', 'suscripciones'],
        keywords: ['subscribe', 'newsletter', 'insider', 'premium', 'suscribirse'],
        responses: {
            en: [
                "📬 IT'S Magazine offers a free weekly digital newsletter delivering the best of Arts, Luxury, and Tech straight to your inbox.\n\nFor readers seeking deeper insights, our **'IT'S Insider' Premium Subscription** grants exclusive access to behind-the-scenes editorial content, private event invitations, and ad-free reading.\n\nWould you like to sign up for our newsletter today?"
            ],
            es: [
                "📬 IT'S Magazine ofrece un boletín digital semanal gratuito con lo mejor del Arte, el Lujo y la Tecnología.\n\nPara los lectores que buscan un análisis más profundo, nuestra **Suscripción Premium 'IT'S Insider'** otorga acceso exclusivo a contenido editorial, invitaciones a eventos privados y lectura sin publicidad.\n\n¿Le gustaría inscribirse en nuestro boletín hoy?"
            ]
        },
        suggestions: ['subscribe_newsletter', 'trending_articles', 'contact_us']
    },
    {
        id: 'trending_articles',
        phrases: ['trending articles', 'what to read', 'latest news', 'top stories', 'artículos en tendencia'],
        keywords: ['trending', 'articles', 'read', 'latest', 'news', 'tendencia', 'noticias'],
        responses: {
            en: [
                "📰 Our current trending editorial pieces cover the intersection of tradition and innovation:\n\n• **The Future of Smart Horology:** How AI is redefining luxury watchmaking.\n• **Sustainable Haute Couture:** Fashion houses pivoting to eco-friendly materials.\n• **The Rise of Electric Supercars:** Ferrari and Lamborghini's new silent power.\n\nWhich sector interests you the most: Tech, Fashion, or Luxury Travel?"
            ],
            es: [
                "📰 Nuestros artículos editoriales en tendencia actuales cubren la intersección de la tradición y la innovación:\n\n• **El Futuro de la Alta Relojería Inteligente**\n• **Alta Costura Sostenible**\n• **El Ascenso de los Superdeportivos Eléctricos**\n\n¿Qué sector le interesa más: Tecnología, Moda o Viajes de Lujo?"
            ]
        },
        suggestions: ['read_tech', 'read_fashion', 'read_luxury']
    },
    {
        id: 'editorial_guidelines',
        phrases: ['write for you', 'pitch an article', 'editorial guidelines', 'freelance writer', 'pautas editoriales'],
        keywords: ['pitch', 'write', 'guidelines', 'freelance', 'journalist', 'escribir', 'artículo'],
        responses: {
            en: [
                "✒️ We are always looking for visionary freelance journalists to contribute to IT'S Magazine.\n\nOur editorial focus is on forward-thinking, aspirational content across Arts, Luxury, Fashion, Tech, and Finance. Pitches should include a clear angle, potential interviewees, and a brief writing sample.\n\nYou can submit your pitches to: editorial@itsmagazine.com."
            ],
            es: [
                "✒️ Siempre estamos buscando periodistas independientes visionarios para contribuir a IT'S Magazine.\n\nNuestro enfoque editorial está en el contenido aspiracional y de vanguardia. Las propuestas deben incluir un enfoque claro y una breve muestra de escritura.\n\nPuede enviar sus propuestas a: editorial@itsmagazine.com."
            ]
        },
        suggestions: ['contact_us', 'trending_articles', 'advertising']
    },
    {
        id: 'advertising',
        phrases: ['advertise', 'media kit', 'partnerships', 'sponsor', 'publicidad'],
        keywords: ['advertise', 'advertising', 'media', 'kit', 'partner', 'sponsor', 'publicidad', 'patrocinio'],
        responses: {
            en: [
                "🤝 IT'S Magazine offers bespoke native advertising and digital campaign partnerships for luxury brands.\n\nWe craft tailored editorial experiences that integrate your brand seamlessly into our high-end content, reaching a highly engaged, affluent demographic.\n\nTo request our current Media Kit, please contact our commercial team at partnerships@itsmagazine.com or provide your details below."
            ],
            es: [
                "🤝 IT'S Magazine ofrece asociaciones de campañas digitales y publicidad nativa a medida para marcas de lujo.\n\nPara solicitar nuestro Media Kit actual, comuníquese con nuestro equipo comercial en partnerships@itsmagazine.com o proporcione sus datos a continuación."
            ]
        },
        suggestions: ['contact_us', 'editorial_guidelines', 'subscriptions'],
        triggerForm: true
    },
    {
        id: 'subscribe_newsletter',
        phrases: ['yes i want to subscribe', 'sign me up', 'subscribe to newsletter', 'inscribirme'],
        keywords: ['signup', 'register', 'inscribir'],
        responses: {
            en: [
                "✨ Excellent choice. Please provide your name and email address, and our Concierge team will add you to our exclusive distribution list."
            ],
            es: [
                "✨ Excelente elección. Proporcione su nombre y dirección de correo electrónico, y nuestro equipo de Conserjería lo agregará a nuestra lista de distribución exclusiva."
            ]
        },
        suggestions: ['contact_us'],
        triggerForm: true
    },
    {
        id: 'read_tech',
        phrases: ['tech', 'technology', 'innovation', 'tecnologia'],
        keywords: ['tech', 'technology', 'innovation'],
        responses: {
            en: [
                "💻 Our Tech editorial explores how AI, web3, and advanced engineering are reshaping our world. I recommend our latest piece on the integration of biometric sensors in classic mechanical timepieces."
            ],
            es: [
                "💻 Nuestro editorial de Tecnología explora cómo la IA, la web3 y la ingeniería avanzada están remodelando nuestro mundo."
            ]
        },
        suggestions: ['trending_articles', 'subscriptions']
    },
    {
        id: 'read_fashion',
        phrases: ['fashion', 'style', 'haute couture', 'moda'],
        keywords: ['fashion', 'style', 'couture'],
        responses: {
            en: [
                "👗 Our Fashion section covers the avant-garde. We are currently featuring exclusive interviews with creative directors leading the sustainable revolution in Paris and Milan."
            ],
            es: [
                "👗 Nuestra sección de Moda cubre la vanguardia. Actualmente presentamos entrevistas exclusivas con directores creativos."
            ]
        },
        suggestions: ['trending_articles', 'subscriptions']
    },
    {
        id: 'read_luxury',
        phrases: ['luxury', 'travel', 'lifestyle', 'lujo', 'viajes'],
        keywords: ['luxury', 'travel', 'destinations'],
        responses: {
            en: [
                "✈️ From zero-emission private aviation to hidden bespoke resorts in the Mediterranean, our Luxury & Travel section curates the ultimate aspirational experiences."
            ],
            es: [
                "✈️ Desde la aviación privada sin emisiones hasta resorts exclusivos ocultos en el Mediterráneo, seleccionamos las mejores experiencias."
            ]
        },
        suggestions: ['trending_articles', 'subscriptions']
    },
    {
        id: 'contact_us',
        phrases: ['contact', 'email', 'get in touch', 'contactar'],
        keywords: ['contact', 'email', 'touch', 'contacto'],
        responses: {
            en: [
                "📬 You can reach the IT'S Magazine team at:\n\n• Editorial: editorial@itsmagazine.com\n• Partnerships: partnerships@itsmagazine.com\n\nAlternatively, you can leave your information with me and I will ensure it reaches the correct desk."
            ],
            es: [
                "📬 Puede comunicarse con el equipo de IT'S Magazine en:\n\n• Editorial: editorial@itsmagazine.com\n• Asociaciones: partnerships@itsmagazine.com"
            ]
        },
        suggestions: ['subscriptions', 'advertising'],
        triggerForm: true
    },
    {
        id: 'fallback',
        phrases: [],
        keywords: [],
        responses: {
            en: [
                "🤔 That is an intriguing topic, but my expertise lies in IT'S Magazine's subscriptions, editorial content, and advertising opportunities. How can I assist you with those?",
                "I appreciate the inquiry, though I'm specifically trained to assist with IT'S Magazine services. Would you like to hear about our trending articles or subscription tiers?"
            ],
            es: [
                "🤔 Es un tema intrigante, pero mi experiencia radica en las suscripciones, el contenido editorial y la publicidad de IT'S Magazine. ¿Cómo puedo ayudarlo con eso?"
            ]
        },
        suggestions: ['trending_articles', 'subscriptions', 'editorial_guidelines', 'contact_us']
    }
];

// --- Quick Reply Buttons (shown on greeting) ---
window.quickReplyIntents = {
    trending_articles:    { en: '📰 Trending Articles', es: '📰 Artículos en Tendencia' },
    subscriptions:        { en: '💎 Premium Subscriptions', es: '💎 Suscripciones Premium' },
    editorial_guidelines: { en: '✒️ Editorial Pitch', es: '✒️ Propuesta Editorial' },
    advertising:          { en: '🤝 Partnerships & Ads', es: '🤝 Asociaciones y Anuncios' }
};

// --- Suggestion Chip Labels ---
window.suggestionLabels = {
    trending_articles:    { en: '📰 Trending Articles', es: '📰 Artículos en Tendencia' },
    subscriptions:        { en: '💎 Subscriptions', es: '💎 Suscripciones' },
    editorial_guidelines: { en: '✒️ Pitch an Article', es: '✒️ Proponer un Artículo' },
    advertising:          { en: '🤝 Partnerships', es: '🤝 Asociaciones' },
    contact_us:           { en: '📬 Contact Us', es: '📬 Contáctenos' },
    subscribe_newsletter: { en: '✨ Subscribe Now', es: '✨ Suscribirse Ahora' },
    read_tech:            { en: '💻 Tech News', es: '💻 Tecnología' },
    read_fashion:         { en: '👗 Fashion Insights', es: '👗 Moda' },
    read_luxury:          { en: '✈️ Luxury Travel', es: '✈️ Viajes de Lujo' }
};
