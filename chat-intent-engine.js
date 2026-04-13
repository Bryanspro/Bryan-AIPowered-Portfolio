/**
 * ============================================
 * Bryan's Portfolio — Smart Chat Intent Engine
 * Shared module for Floating Widget & Standalone Chatbox
 * ============================================
 */

const chatbotIntents = window.chatbotIntents || [
    {
        id: 'greeting',
        phrases: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'hola', 'buenos dias', 'buenas tardes', 'buenas noches', 'que tal'],keywords: ['sup', 'yo', 'greetings', 'howdy', 'saludos'],
        responses: {
            en: [
                "Hey there! 👋 I'm Bryan's AI Portfolio Assistant. Ask me about his experience, skills, AI projects, or anything else — I'm here to help!",
                "Welcome! I'm Bryan's digital assistant. Curious about his tech stack, career journey, or portfolio projects? Just ask!",
                "Hi! Great to have you here. I can tell you about Bryan's 12+ years of experience, his AI work, projects, and more. What interests you?",
                "Hello! I'm Bryan's AI assistant — think of me as his portfolio guide. What would you like to explore?"
            ],
            es: [
                "¡Hola! 👋 Soy el asistente IA del portafolio de Bryan. Pregúntame sobre su experiencia, habilidades, proyectos de IA o lo que necesites.",
                "¡Bienvenido! Soy el asistente digital de Bryan. ¿Quieres saber sobre su stack tecnológico, su carrera o sus proyectos?",
                "¡Hola! Qué bueno tenerte aquí. Puedo contarte sobre los 12+ años de experiencia de Bryan, su trabajo en IA y más. ¿Qué te interesa?",
                "¡Saludos! Soy el asistente IA de Bryan — piensa en mí como su guía de portafolio. ¿Qué te gustaría explorar?"
            ],
            pt: [
                "Olá! 👋 Sou o Assistente de IA do Portfólio do Bryan. Pergunte-me sobre sua experiência, habilidades, projetos de IA ou qualquer outra coisa — estou aqui para ajudar!"],
            de: [
                "Hallo! 👋 Ich bin Bryans KI-Portfolio-Assistent. Frag mich nach seiner Erfahrung, seinen Fähigkeiten, KI-Projekten oder allem anderen — ich bin hier, um zu helfen!"],
            fr: [
                "Bonjour ! 👋 Je suis l'assistant IA du portfolio de Bryan. Posez-moi des questions sur son expérience, ses compétences, ses projets IA ou autre chose — je suis là pour vous aider !"],
            ja: [
                "こんにちは！👋 BryanのAIポートフォリオアシスタントです。彼の経験、スキル、AIプロジェクトなど、何でも聞いてください。お手伝いします！"],
            ko: [
                "안녕하세요! 👋 Bryan의 AI 포트폴리오 어시스턴트입니다. 그의 경험, 기술, AI 프로젝트 등 무엇이든 물어보세요. 도와드리겠습니다!"],
            zh: [
                "你好！👋 我是 Bryan 的 AI 作品集助手。你可以问我关于他的经验、技能、AI 项目等任何问题——我很乐意帮忙！"],
            ar: [
                "مرحباً! 👋 أنا المساعد الذكي لمحفظة برايان. اسألني عن خبرته، مهاراته، مشاريع الذكاء الاصطناعي، أو أي شيء آخر — أنا هنا للمساعدة!"],
            hi: [
                "नमस्ते! 👋 मैं ब्रायन का AI पोर्टफोलियो सहायक हूँ। मुझसे उनके अनुभव, कौशल, जनरेटिव AI प्रोजेक्ट्स या किसी भी अन्य विषय के बारे में पूछें — मैं मदद के लिए तैयार हूँ!"],
            he: [
                "שלום! 👋 אני עוזר ה-AI של תיק העבודות של בריאן. תשאלו אותי על הניסיון שלו, הכישורים שלו, פרויקטים ב-AI או כל דבר אחר — אני כאן כדי לעזור!"]
        },
        suggestions: ['experience', 'skills', 'projects', 'ai']
    },
    {
        id: 'about',
        phrases: ['who is bryan', 'tell me about bryan', 'about bryan', 'introduce bryan', 'who are you', 'about him', 'quien es bryan', 'sobre bryan', 'presentame a bryan'],keywords: ['about', 'who', 'introduce', 'bio', 'himself', 'summary', 'background', 'quien', 'sobre', 'presentar'],
        responses: {
            en: [
                "Bryan Marquez is a Software Engineer with 12+ years of experience. After leading teams as a Technical Lead in Venezuela, he relocated to the US to specialize in AI and Python Development — integrating Generative AI and LLMs with his engineering foundation. Fully bilingual (EN/ES) with 20+ projects.",
                "Bryan has spent over a decade building, managing, and automating complex systems. From database architecture to AI-powered applications, he bridges traditional engineering with modern AI. He's bilingual, certified in GenAI, and passionate about building tech that works smarter.",
                "Meet Bryan — a 12+ year Software Engineer who transitioned from Technical Lead and IT Manager roles into AI and Python Development. He builds intelligent, automated systems and is fully bilingual in English and Spanish."
            ],
            es: [
                "Bryan Márquez es un Ingeniero de Software con más de 12 años de experiencia. Tras liderar equipos como Líder Técnico en Venezuela, se trasladó a EE.UU. para especializarse en IA y desarrollo en Python. Bilingüe completo (EN/ES) con 20+ proyectos.",
                "Bryan ha pasado más de una década construyendo, gestionando y automatizando sistemas complejos. Desde arquitectura de bases de datos hasta aplicaciones de IA, conecta la ingeniería tradicional con la IA moderna.",
                "Conoce a Bryan — un Ingeniero de Software con 12+ años que pasó de roles de Líder Técnico y Gerente de TI a desarrollo de IA y Python. Construye sistemas inteligentes y automatizados."
            ],
            pt: [
                "Bryan Márquez é um Engenheiro de Software com mais de 12 anos de experiência. Após liderar equipes como Líder Técnico na Venezuela, ele se mudou para os EUA para se especializar em Desenvolvimento Python e IA — integrando IA Generativa e LLMs com sua base de engenharia. Totalmente bilíngue (EN/ES) com mais de 20 projetos."],
            de: [
                "Bryan Marquez ist ein Softwareentwickler mit über 12 Jahren Erfahrung. Nachdem er Teams als Technical Lead in Venezuela geleitet hatte, zog er in die USA, um sich auf KI- und Python-Entwicklung zu spezialisieren — und integriert Generative KI und LLMs in sein technisches Fundament. Zweisprachig (EN/ES) mit über 20 Projekten."],
            fr: [
                "Bryan Marquez est un Ingénieur Logiciel avec plus de 12 ans d'expérience. Après avoir dirigé des équipes en tant que Responsable Technique au Venezuela, il s'est installé aux États-Unis pour se spécialiser en IA et en développement Python — intégrant l'IA Générative et les LLMs à ses solides bases d'ingénierie. Bilingue (EN/ES) avec plus de 20 projets."],
            ja: [
                "Bryan Marquezは12年以上の経験を持つソフトウェアエンジニアです。ベネズエラでテクニカルリードとしてチームを率いた後、米国に移住し、AIとPython開発を専門としています。これまでのエンジニアリングの基礎に生成AIとLLMを統合し、バイリンガル（英語/スペイン語）で20以上のプロジェクトを手掛けています。"],
            ko: [
                "Bryan Marquez는 12년 이상의 경험을 가진 소프트웨어 엔지니어입니다. 베네수엘라에서 기술 리드로 팀을 이끈 후 미국으로 이주하여 AI 및 Python 개발을 전문으로 하고 있습니다. 튼튼한 엔지니어링 기반에 생성형 AI와 LLM을 통합하며, 완벽한 이중 언어(영/스페인어) 구사 및 20개 이상의 프로젝트 경력을 자랑합니다."],
            zh: [
                "Bryan Marquez 是一名拥有 12 年以上经验的软件工程师。在委内瑞拉担任技术主管领导团队后，他移居美国，专注于 AI 和 Python 开发——将生成式 AI 和 大语言模型 (LLM) 与他的工程基础相结合。他精通双语（英语/西班牙语），并完成了 20 多个项目。"],
            ar: [
                "برايان ماركيز هو مهندس برمجيات يتمتع بخبرة تزيد عن 12 عاماً. بعد قيادة الفرق كقائد تقني في فنزويلا، انتقل إلى الولايات المتحدة للتخصص في الذكاء الاصطناعي وتطوير بايثون — حيث قام بدمج الذكاء الاصطناعي التوليدي ونماذج LLM مع مؤسستة الهندسية. ثنائي اللغة بالكامل (إنجليزي/إسباني) مع أكثر من 20 مشروعاً."],
            hi: [
                "ब्रायन मार्केज़ 12 से अधिक वर्षों के अनुभव वाले एक सॉफ्टवेयर इंजीनियर हैं। वेनेजुएला में टेक्निकल लीड के रूप में कार्य करने के बाद, वह एआई और पायथन डेवलपमेंट में विशेषज्ञता के लिए अमेरिका चले गए। वह पूरी तरह से द्विभाषी (अंग्रेजी/स्पेनिश) हैं और 20+ प्रोजेक्ट्स पर काम कर चुके हैं।"],
            he: [
                "בריאן מרקס הוא מהנדס תוכנה עם מעל ל-12 שנות ניסיון. לאחר שהוביל צוותים כמוביל טכני בוונצואלה, הוא עבר לארה\"ב כדי להתמחות בפיתוח AI ופייתון — תוך שילוב בינה מלאכותית יוצרת ו-LLMs עם הבסיס ההנדסי שלו. דו-לשוני ברמת שפת אם (אנגלית/ספרדית) עם מעל ל-20 פרויקטים."]
        },
        suggestions: ['experience', 'skills', 'projects']
    },
    {
        id: 'skills',
        phrases: ['tech stack', 'what technologies', 'programming languages', 'what tools', 'stack tecnologico', 'que tecnologias'],keywords: ['tech', 'stack', 'technologies', 'tools', 'programming', 'skill', 'skills', 'abilities', 'capable', 'matrix', 'tecnologia', 'herramientas', 'habilidad', 'habilidades'],
        responses: {
            en: [
                "Bryan's stack: Python · HTML/CSS/JS · SQL · WordPress · Generative AI (LLMs) · AI Agent Automation · Prompt Engineering · FastAPI · REST APIs. Fully bilingual: EN/ES.",
                "His skills span three areas: Languages & Systems (Python, HTML/CSS/JS, SQL, WordPress), AI & Automation (GenAI, LLMs, Prompt Engineering, AI Agents), and Leadership (Project Management, Team Leadership, Cross-Cultural Communication).",
                "Bryan combines traditional engineering with modern AI: Python for backend and AI, JavaScript for frontend, SQL for databases, plus Generative AI, Prompt Engineering, and AI Agent Automation. 12+ years, 20+ projects, fully bilingual."
            ],
            es: [
                "El stack de Bryan: Python · HTML/CSS/JS · SQL · WordPress · IA Generativa (LLMs) · Automatización con Agentes IA · Prompt Engineering · FastAPI · REST APIs. Bilingüe: EN/ES.",
                "Sus habilidades abarcan tres áreas: Lenguajes y Sistemas (Python, HTML/CSS/JS, SQL, WordPress), IA y Automatización (GenAI, LLMs, Prompt Engineering, Agentes IA), y Liderazgo (Gestión de Proyectos, Comunicación Intercultural).",
                "Bryan combina ingeniería tradicional con IA moderna: Python para backend e IA, JavaScript para frontend, SQL para bases de datos, además de IA Generativa y Automatización con Agentes IA."
            ],
            pt: [
                "Stack do Bryan: Python · HTML/CSS/JS · SQL · WordPress · IA Generativa (LLMs) · Automação com Agentes de IA · Prompt Engineering · FastAPI · APIs REST. Totalmente bilíngue: EN/ES."],
            de: [
                "Bryans Stack: Python · HTML/CSS/JS · SQL · WordPress · Generative KI (LLMs) · KI-Agenten-Automatisierung · Prompt Engineering · FastAPI · REST APIs. Zweisprachig: EN/ES."],
            fr: [
                "La stack de Bryan : Python · HTML/CSS/JS · SQL · WordPress · IA Générative (LLMs) · Automatisation d'agents IA · Prompt Engineering · FastAPI · APIs REST. Bilingue : EN/ES."],
            ja: [
                "Bryanのスタック：Python・HTML/CSS/JS・SQL・WordPress・生成AI（LLMs）・AIエージェントの自動化・プロンプトエンジニアリング・FastAPI・REST APIs。バイリンガル：英語/スペイン語。"],
            ko: [
                "Bryan의 기술 스택: Python · HTML/CSS/JS · SQL · WordPress · 생성형 AI(LLM) · AI 에이전트 자동화 · 프롬프트 엔지니어링 · FastAPI · REST API. 완벽한 이중 언어(영어/스페인어)."],
            zh: [
                "Bryan 的技术栈：Python · HTML/CSS/JS · SQL · WordPress · 生成式 AI (LLM) · AI 代理自动化 · 提示工程 · FastAPI · REST API。精通双语：英语/西班牙语。"],
            ar: [
                "مجموعة تقنيات برايان: بايثون · HTML/CSS/JS · SQL · WordPress · الذكاء الاصطناعي التوليدي (LLMs) · أتمتة وكلاء الذكاء الاصطناعي · هندسة الأوامر · واجهات برمجة التطبيقات (REST APIs). ثنائي اللغة."],
            hi: [
                "ब्रायन का टेक स्टैक: पायथन · HTML/CSS/JS · SQL · वर्डप्रेस · जनरेटिव AI (LLMs) · AI एजेंट ऑटोमेशन · प्रॉम्ट इंजीनियरिंग · FastAPI · REST APIs। पूरी तरह द्विभाषी: अंग्रेजी/स्पेनिश।"],
            he: [
                "הטכנולוגיות של בריאן: Python · HTML/CSS/JS · SQL · WordPress · בינה מלאכותית יוצרת (LLMs) · אוטומציה של סוכני AI · הנדסת פרומפטים · FastAPI · REST APIs. דו-לשוני מלא: אנגלית/ספרדית."]
        },
        suggestions: ['ai', 'projects', 'experience']
    },
    {
        id: 'projects',
        phrases: ['show me projects', 'what projects', 'portfolio projects', 'your projects', 'built projects', 'proyectos del portafolio', 'que proyectos'],keywords: ['project', 'projects', 'built', 'showcase', 'compiled', 'output', 'portfolio', 'website', 'site', 'proyecto', 'proyectos', 'portafolio', 'pagina', 'sitio'],
        responses: {
            en: [
                "Bryan's portfolio features 4 main projects: 🎨 Designer Templates Showcase (curated portfolio layouts), 🎮 Interactive Games (JS game development), 📱 Apps Showcase (5 modular web apps), and 🤖 AI-Powered Applications (4 Gemini-powered AI apps). Each demonstrates real-world skills in web dev, UI/UX, and AI.",
                "The portfolio showcases: curated design templates, interactive JavaScript games, a collection of 5 web apps (PlanFlow, ArtVault, BookNest, etc.), and 4 AI-powered applications built with Gemini. Everything was built from scratch!",
                "Four featured projects: Product Designer templates, Interactive Games with HTML5 Canvas, 5 polished Web Apps, and 4 AI Applications including this very chatbot. Each highlights different engineering strengths."
            ],
            es: [
                "El portafolio de Bryan incluye 4 proyectos principales: 🎨 Plantillas de Diseño (layouts curados), 🎮 Juegos Interactivos (desarrollo JS), 📱 Galería de Apps (5 apps web modulares), y 🤖 Aplicaciones de IA (4 apps con Gemini).",
                "El portafolio presenta: plantillas de diseño curadas, juegos interactivos en JavaScript, 5 apps web (PlanFlow, ArtVault, BookNest, etc.), y 4 aplicaciones de IA construidas con Gemini. ¡Todo desde cero!",
                "Cuatro proyectos destacados: Plantillas de diseño, Juegos Interactivos con Canvas, 5 Apps Web pulidas y 4 Aplicaciones de IA incluyendo este chatbot."
            ],
            pt: [
                "O portfólio do Bryan inclui 4 projetos principais: 🎨 Templates de Design, 🎮 Jogos Interativos (desenvolvimento de jogos JS), 📱 Galeria de Apps (5 aplicativos web modulares), e 🤖 Aplicações de IA (4 aplicativos alimentados pela API Gemini). Cada um demonstra habilidades reais em desenvolvimento web, UI/UX e IA."],
            de: [
                "Bryans Portfolio umfasst 4 Hauptprojekte: 🎨 Design-Vorlagen Showcase, 🎮 Interaktive Spiele (JS-Game-Entwicklung), 📱 Apps-Showcase (5 modulare Webanwendungen) und 🤖 KI-gestützte Anwendungen (4 Gemini-basierte KI-Apps). Jedes zeigt praktische Fähigkeiten in Webentwicklung, UI/UX und KI."],
            fr: [
                "Le portfolio de Bryan présente 4 projets principaux : 🎨 Modèles de Design, 🎮 Jeux Interactifs (développement JS), 📱 Vitrine d'Applications (5 applications web modulaires), et 🤖 Applications basées sur l'IA (4 applications avec l'API Gemini). Chacune démontre ses compétences réelles en développement web, UI/UX et IA."],
            ja: [
                "Bryanのポートフォリオには4つの主要プロジェクトがあります：🎨デザインテンプレート、🎮インタラクティブゲーム（JSゲーム）、📱アプリショーケース（5つのモジュール式Webアプリ）、🤖AI搭載アプリケーション（4つのGemini APIアプリ）。それぞれがWeb開発、UI/UX、AIの強力なスキルを示しています。"],
            ko: [
                "Bryan의 포트폴리오에는 4가지 주요 프로젝트가 있습니다: 🎨 디자인 템플릿, 🎮 인터랙티브 게임 (JS 게임), 📱 앱 쇼케이스 (5개의 웹 앱), 🤖 AI 기반 애플리케이션 (4개의 Gemini 기반 AI 앱). 각 프로젝트는 웹 개발, UI/UX 및 AI 기술을 입증합니다."],
            zh: [
                "Bryan 的作品集有 4 个主要项目：🎨 设计师模板展示，🎮 交互式游戏（JS 游戏），📱 应用展示（5 个模块化 Web 应用），以及 🤖 AI 驱动的应用程序（4 个由 Gemini 提供的 AI 应用）。每一个都展示了他在 Web 开发、UI/UX 和 AI 方面的实际技能。"],
            ar: [
                "تتميز محفظة برايان بـ 4 مشاريع رئيسية: 🎨 قوالب التصميم، 🎮 ألعاب تفاعلية (تطوير ألعاب JS)، 📱 معرض التطبيقات (5 تطبيقات ويب)، و 🤖 تطبيقات مدعومة بالذكاء الاصطناعي (4 تطبيقات API Gemini). كل مشروع يثبت مهاراته العملية."],
            hi: [
                "ब्रायन के पोर्टफोलियो में 4 मुख्य प्रोजेक्ट हैं: 🎨 डिज़ाइनर टेम्पलेट्स, 🎮 इंटरएक्टिव गेम्स (JS गेम डेवलपमेंट), 📱 ऐप्स शोकेस (5 वेब ऐप), और 🤖 AI-पावर्ड ऐप्स (4 Gemini AI ऐप्स)।"],
            he: [
                "הפורטפוליו כולל 4 פרויקטים מרכזיים: 🎨 תבניות עיצוב, 🎮 משחקים אינטראקטיביים (פיתוח JS), 📱 אפליקציות ווב (5 אפליקציות מודולריות), ו-🤖 אפליקציות AI (4 אפליקציות מבוססות Gemini). כל פרויקט ממחיש ניסיון מעשי ומיומנויות רבות."]
        },
        suggestions: ['skills', 'ai', 'contact']
    },
    {
        id: 'experience',
        phrases: ['work experience', 'professional experience', 'career history', 'where has bryan worked', 'experiencia profesional', 'donde ha trabajado'],keywords: ['experience', 'work', 'job', 'career', 'background', 'worked', 'history', 'experiencia', 'trabajo', 'carrera', 'empleos'],
        responses: {
            en: [
                "Bryan has 12+ years: Walmart (2024–2025, FL) handling POS systems and bilingual tech support; Ingeniería de Bombas de Venezuela (2015–2022) as Technical Lead & IT Manager automating workflows and managing databases, achieving >90% business goals during a severe crisis; and Francisco de Miranda Park (2018) as Junior Web Developer.",
                "Three key roles define Bryan's career: At Walmart he managed high-volume POS systems. At Ingeniería de Bombas he led IT operations through an industry crisis while automating workflows. He started in web development at Francisco de Miranda Park. His transition to AI is strategic and continuous.",
                "12+ years across three companies — from Junior Web Developer to Technical Lead & IT Manager. Bryan has managed teams, automated critical workflows, handled crisis operations, and now specializes in AI development in the US."
            ],
            es: [
                "Bryan tiene 12+ años: Walmart (2024–2025, FL) en sistemas POS y soporte técnico bilingüe; Ingeniería de Bombas de Venezuela (2015–2022) como Líder Técnico y Gerente de TI automatizando flujos y gestionando bases de datos; y Parque Francisco de Miranda (2018) como Desarrollador Web Junior.",
                "Tres roles clave definen la carrera de Bryan: En Walmart gestionó sistemas POS de alto volumen. En Ingeniería de Bombas lideró operaciones de TI durante una crisis. Se inició en desarrollo web en el Parque Francisco de Miranda.",
                "12+ años en tres empresas — de Desarrollador Web Junior a Líder Técnico y Gerente de TI. Bryan ha liderado equipos, automatizado flujos críticos y ahora se especializa en desarrollo de IA en EE.UU."
            ],
            pt: [
                "Bryan tem mais de 12 anos de experiência: Walmart (2024–2025, FL) gerenciando sistemas POS e suporte; Ingeniería de Bombas de Venezuela (2015–2022) como Líder Técnico e Gerente de TI automatizando fluxos e gerenciando bancos de dados durante uma crise severa; e Parque Francisco de Miranda (2018) como Desenvolvedor Web Júnior."],
            de: [
                "Bryan hat über 12 Jahre Erfahrung: Walmart (2024–2025, FL) (POS-Systeme und Tech-Support); Ingeniería de Bombas de Venezuela (2015–2022) als Technical Lead & IT Manager, der Workflows automatisierte und Datenbanken unter Krisenbedingungen verwaltete; sowie im Francisco de Miranda Park (2018) als Webentwickler."],
            fr: [
                "Bryan a plus de 12 ans d'expérience : Walmart (2024–2025, FL) gestion des systèmes POS et support ; Ingeniería de Bombas de Venezuela (2015–2022) en tant que Responsable Technique et IT qui automatisait les tâches et gérait les bases de données ; et au Parc Francisco de Miranda (2018) comme Développeur Web Junior."],
            ja: [
                "Bryanは12年以上の経験を持ちます：Walmart（2024–2025、フロリダ）でのPOSシステムおよびサポート。Ingeniería de Bombas de Venezuela（2015–2022）でのテクニカルリード兼ITマネージャーとしてデータベースと自動化を統括。そしてFrancisco de Miranda ParkでのWeb開発者。"],
            ko: [
                "Bryan은 12년 이상의 경력을 가지고 있습니다: Walmart (2024–2025, FL) POS 시스템 및 지원 관리; Ingeniería de Bombas de Venezuela (2015–2022) 테크 리드 및 IT 매니저로서 데이터베이스 관리 및 워크플로우 자동화. 그리고 Francisco de Miranda Park 주니어 웹 개발자."],
            zh: [
                "Bryan 有 12 年以上的经验：沃尔玛 (2024–2025, FL) 负责 POS 系统和技术支持；委内瑞拉 Ingeniería de Bombas (2015–2022) 担任技术主管和 IT 经理，负责工作流自动化和数据库管理；以及在 Francisco de Miranda 公园担任初级 Web 开发人员。"],
            ar: [
                "يتمتع برايان بأكثر من 12 عاماً من الخبرة: وول مارت (2024-2025، فلوريدا) للتعامل مع أنظمة نقاط البيع؛ وهندسة المضخات في فنزويلا (2015-2022) كقائد تقني للأتمتة ؛ ومتنزه فرانسيسكو دي ميراندا (2018) كمطور ويب."],
            hi: [
                "ब्रायन के पास 12+ वर्षों का अनुभव है: वॉलमार्ट (2024–2025, फ्लोरिडा) POS सिस्टम और सपोर्ट; Ingeniería de Bombas de Venezuela (2015–2022) टेक्निकल लीड और IT मैनेजर के रूप में डेटाबेस और ऑटोमेशन; और Francisco de Miranda Park में जूनियर वेब डेवलपर।"],
            he: [
                "לבריאן יש מעל ל-12 שנות ניסיון: Walmart (2024–2025, FL) ניהול מערכות קופה ותמיכה טכנית; Ingeniería de Bombas בוונצואלה (2015–2022) כמוביל טכני ומנהל IT שאחראי על אוטומציה ומסדי נתונים במהלך משבר חמור; ופארק תכנות."]
        },
        suggestions: ['skills', 'education', 'ai']
    },
    {
        id: 'ai',
        phrases: ['ai skills', 'artificial intelligence', 'machine learning', 'generative ai', 'ai experience', 'inteligencia artificial', 'experiencia en ia'],keywords: ['ai', 'artificial', 'intelligence', 'machine', 'learning', 'generative', 'genai', 'llm', 'llms', 'prompt', 'agent', 'automation', 'inteligencia', 'ia'],
        responses: {
            en: [
                "Bryan focuses on AI & Python Development: Generative AI, AI Agent Automation, and Prompt Engineering. He holds certifications from Outskill (GenAI Mastermind & GenAI Engineering Mastermind) and is completing Google AI Leader certification. Fun fact: he built this AI assistant!",
                "His AI toolkit includes: Generative AI with LLMs, AI Agent Process Automation, Expert Prompt Engineering, and direct REST API integration with models like Gemini. He's built 4 AI-powered apps in this portfolio alone.",
                "Bryan bridges traditional engineering with AI — using Python, Generative AI, and AI Agents to build smart, automated systems. He's certified through Outskill and pursuing Google AI credentials."
            ],
            es: [
                "Bryan se enfoca en IA y desarrollo en Python: IA Generativa, Automatización con Agentes IA y Prompt Engineering. Tiene certificaciones de Outskill (GenAI Mastermind) y está completando la certificación Google AI Leader. ¡Él construyó este asistente!",
                "Su kit de IA incluye: IA Generativa con LLMs, Automatización de Agentes IA, Prompt Engineering experto e integración REST directa con modelos como Gemini.",
                "Bryan conecta la ingeniería tradicional con la IA — usando Python, IA Generativa y Agentes IA para construir sistemas inteligentes y automatizados."
            ],
            pt: [
                "Bryan tem forte foco em IA Generativa, Automação com Agentes de IA e Prompt Engineering. Ele é oficialmente certificado pela Outskill em IA Generativa e está atualmente concluindo a certificação de Google AI Leader."],
            de: [
                "Bryan konzentriert sich auf Generative KI, KI-Agenten-Automatisierung und Prompt Engineering. Er ist offiziell von Outskill in Generativer KI zertifiziert und schließt derzeit die Google AI Leader-Zertifizierung ab."],
            fr: [
                "Bryan se concentre sur l'IA Générative, l'automatisation d'agents IA et le Prompt Engineering. Il est officiellement certifié par Outskill en IA Générative et termine actuellement la certification Google AI Leader."],
            ja: [
                "Bryanは生成AI、AIエージェントモデ​​ルの自動化、プロンプトエンジニアリングなどの分野に注力しています。Outskillにより公式認定されており、現在Google AI Leader認定を完了しようとしています。"],
            ko: [
                "Bryan은 생성형 AI, AI 에이전트 생성 및 프롬프트 엔지니어링에 중점을 두고 있습니다. Outskill에서 공식 인증을 받았으며 현재 Google AI Leader 교육 과정을 밟고 있습니다."],
            zh: [
                "Bryan 专注于生成式 AI、AI 代理自动化和提示工程。他拥有 Outskill 的生成式 AI 官方认证，目前正在完成 Google AI Leader 认证。"],
            ar: [
                "يركز بشكل كبير على الذكاء الاصطناعي التوليدي، وأتمتة وكلاء الذكاء الاصطناعي، وهندسة الأوامر. وهو معتمد رسمياً من Outskill ويقوم حالياً بإكمال شهادة Google AI Leader."],
            hi: [
                "ब्रायन जनरेटिव AI, AI एजेंट ऑटोमेशन और प्रॉम्ट इंजीनियरिंग पर ध्यान केंद्रित करते हैं। वह ऑटस्किल से प्रमाणित हैं और वर्तमान में Google AI लीडर कोर्स पूरा कर रहे हैं।"],
            he: [
                "בריאן מתמקד בבינה מלאכותית יוצרת, אוטומציה של סוכני AI והנדסת פרומפטים. הוא בעל הסמכה רשמית מ-Outskill ב-AI ומשלים כעת את הסמכת ה-Google AI Leader."]
        },
        suggestions: ['projects', 'skills', 'education']
    },
    {
        id: 'education',
        phrases: ['education', 'certifications', 'degrees', 'what did he study', 'where did he study', 'educacion', 'certificaciones', 'que estudio'],keywords: ['education', 'certif', 'degree', 'school', 'study', 'learn', 'credential', 'educacion', 'estudio', 'universidad', 'titulo'],
        responses: {
            en: [
                "Bryan is a Software Engineer with diverse credentials: US High School Diploma (Penn Foster), Generative AI Mastermind & Gen AI Engineering Mastermind (Outskill), and is currently completing Google AI Leader and Professional certifications. He's a firm believer in continuous learning.",
                "As a Software Engineer, Bryan's education includes a Penn Foster US diploma, dual GenAI certifications from Outskill, and active pursuit of Google AI credentials. He invests heavily in strategic upskilling.",
                "Combining his Software Engineering background with continuous learning, he secured a US High School Diploma from Penn Foster, earned advanced AI certifications from Outskill's Mastermind programs, and is completing Google's AI Leader certification."
            ],
            es: [
                "Bryan es un Ingeniero de Software con credenciales diversas: Diploma de High School de EE.UU. (Penn Foster), Generative AI Mastermind y Gen AI Engineering Mastermind (Outskill), actualmente completando Google AI Leader.",
                "Como Ingeniero de Software, la educación de Bryan incluye un diploma Penn Foster, certificaciones duales de IA de Outskill y está en proceso de certificación Google AI. Bryan invierte continuamente en aprendizaje estratégico.",
                "Combinando su formación como Ingeniero de Software y aprendizaje continuo, obtuvo su diploma de High School de EE.UU. de Penn Foster y certificaciones avanzadas de IA de Outskill."
            ],
            pt: [
                "Bryan possui um diploma de ensino médio nos EUA, várias certificações especializadas em IA Generativa (Outskill) e Desenvolvimento Python, e atualmente está buscando a certificação Google AI Leader para fortalecer suas capacidades estratégicas de IA."],
            de: [
                "Bryan hält ein US-High-School-Diplom, mehrere Fachzertifizierungen in Generativer KI (Outskill) und Python, und verfolgt derzeit die Google AI Leader Zertifizierung."],
            fr: [
                "Bryan détient un diplôme d'études secondaires américain, plusieurs certifications en IA Générative (Outskill) et Python, et poursuit actuellement la certification Google AI Leader pour consolider ses compétences stratégiques."],
            ja: [
                "Bryanは米国の高校卒業資格を持ち、生成AIやPythonの専門的な認定を複数受けています。また戦略的なAI能力をより高めるためGoogle AI Leader認定を取得中です。"],
            ko: [
                "미국 고등학교 졸업장, 생성형 AI 및 Python에서 여러 전문 자격증을 보유하고 있으며 전략적 기능을 강화하기 위해 Google AI Leader 인증을 받고 있습니다."],
            zh: [
                "拥有美国高中文凭、多项生成式 AI (Outskill) 和 Python 的专业认证，目前正在攻读 Google AI Leader 认证，以巩固他的 AI 战略规划能力。"],
            ar: [
                "يحمل دبلوم المدرسة الثانوية الأمريكية، وشهادات متخصصة في الذكاء الاصطناعي وبايثون، ويسعى حالياً للحصول على شهادة Google AI Leader لتعزيز قدراته الإستراتيجية."],
            hi: [
                "ब्रायन के पास यूएस हाई स्कूल डिप्लोमा, जनरेटिव एआई और पायथन में प्रमाणन हैं, और वह अपनी क्षमताओं को मजबूत करने के लिए Google AI लीडर कोर्स पूरा कर रहे हैं।"],
            he: [
                "בריאן בעל תעודת בגרות אמריקאית, מספר הסמכות מיוחדות ב-AI ופייתון, וכעת לומד במסלול Google AI Leader כדי לבסס את היכולות האסטרטגיות שלו ב-AI."]
        },
        suggestions: ['ai', 'experience', 'skills']
    },
    {
        id: 'contact',
        phrases: ['contact bryan', 'how to reach', 'get in touch', 'hire bryan', 'leave a message', 'send a message', 'contactar a bryan', 'como contactar', 'dejar un mensaje'],keywords: ['contact', 'reach', 'email', 'message', 'connect', 'hire', 'linkedin', 'touch', 'talk', 'contacto', 'mensaje', 'contratar', 'correo'],
        responses: {
            en: [
                "You can reach Bryan via the contact form on his portfolio, or connect on LinkedIn. He's always open to new opportunities and typically replies within 24–48 hours!",
                "Best ways to reach Bryan: the contact form right here on his portfolio, or his LinkedIn profile. He's responsive and always interested in new tech challenges!",
                "Bryan is actively open to opportunities! Use the portfolio contact form or LinkedIn to connect. Response time: usually within 24–48 hours."
            ],
            es: [
                "Puedes contactar a Bryan a través del formulario de contacto en su portafolio o conectar en LinkedIn. ¡Siempre está abierto a nuevas oportunidades y responde en 24–48 horas!",
                "Las mejores formas de contactar a Bryan: el formulario de contacto aquí o su perfil de LinkedIn. ¡Es receptivo y siempre interesado en nuevos retos!",
                "¡Bryan está activamente abierto a oportunidades! Usa el formulario de contacto o LinkedIn. Tiempo de respuesta: generalmente 24–48 horas."
            ],
            pt: [
                "Você pode encontrar o Bryan aqui mesmo através do formulário de contato do portfólio, ou conectar-se com ele diretamente pelo LinkedIn. Ele geralmente responde em 24-48 horas e está ativamente em busca de novas oportunidades!"],
            de: [
                "Sie können Bryan hier über das Kontaktformular des Portfolios erreichen oder sich direkt auf LinkedIn vernetzen. Er antwortet in der Regel innerhalb von 24-48 Stunden und sucht aktiv nach neuen Möglichkeiten!"],
            fr: [
                "Vous pouvez contacter Bryan ici via le formulaire du portfolio ou le joindre directement sur LinkedIn. Il répond généralement sous 24 à 48 heures et est activement à la recherche de nouvelles opportunités !"],
            ja: [
                "このポートフォリオの問い合わせフォームから直接Bryanに連絡するか、LinkedInでつながることができます。通常24〜48時間以内に返信があり、新しい機会を積極的に探しています！"],
            ko: [
                "포트폴리오의 문의 폼을 통해 Bryan에게 연락하거나 링크드인에서 직접 소통할 수 있습니다. 일반적으로 24~48시간 이내에 회신하며 새로운 취업 기회를 적극적으로 찾고 있습니다!"],
            zh: [
                "您可以通过这里的联系表单与 Bryan 取得联系，或者直接在 LinkedIn 上联系他。他通常会在 24-48 小时内回复，并且正在积极寻找新的好机会！"],
            ar: [
                "يمكنك الوصول إلى برايان هنا من خلال استمارة الاتصال، أو الاتصال به مباشرة على لينكد إن. عادة ما يرد خلال 24-48 ساعة ويبحث بنشاط عن فرص جديدة!"],
            hi: [
                "आप यहां संपर्क फ़ॉर्म के माध्यम से ब्रायन से संपर्क कर सकते हैं, या सीधे लिंक्डइन पर जुड़ सकते हैं। वह 24 घंटे में उत्तर देते हैं और नए अवसरों की तलाश में हैं!"],
            he: [
                "תוכלו ליצור קשר עם בריאן כאן באמצעות טופס יצירת הקשר, או להתחבר אליו ישירות בלינקדאין. הוא לרוב משיב בתוך 24-48 שעות ומחפש באופן פעיל משרות חדשות!"]
        },
        suggestions: ['experience', 'projects', 'skills'],
        triggerForm: true
    },
    {
        id: 'resume',
        phrases: ['download resume', 'see resume', 'cv', 'curriculum', 'download cv', 'descargar cv', 'ver curriculum'],
            he: [
                "תוכלו ליצור קשר עם בריאן כאן באמצעות טופס יצירת הקשר, או להתחבר אליו ישירות בלינקדאין. הוא לרוב משיב בתוך 24-48 שעות ומחפש באופן פעיל משרות חדשות!"],
            hi: [
                "आप यहां संपर्क फ़ॉर्म के माध्यम से ब्रायन से संपर्क कर सकते हैं, या सीधे लिंक्डइन पर जुड़ सकते हैं। वह 24 घंटे में उत्तर देते हैं और नए अवसरों की तलाश में हैं!"],
            ar: [
                "يمكنك الوصول إلى برايان هنا من خلال استمارة الاتصال، أو الاتصال به مباشرة على لينكد إن. عادة ما يرد خلال 24-48 ساعة ويبحث بنشاط عن فرص جديدة!"],
            zh: [
                "您可以通过这里的联系表单与 Bryan 取得联系，或者直接在 LinkedIn 上联系他。他通常会在 24-48 小时内回复，并且正在积极寻找新的好机会！"],
            ko: [
                "포트폴리오의 문의 폼을 통해 Bryan에게 연락하거나 링크드인에서 직접 소통할 수 있습니다. 일반적으로 24~48시간 이내에 회신하며 새로운 취업 기회를 적극적으로 찾고 있습니다!"],
            ja: [
                "このポートフォリオの問い合わせフォームから直接Bryanに連絡するか、LinkedInでつながることができます。通常24〜48時間以内に返信があり、新しい機会を積極的に探しています！"],
            fr: [
                "Vous pouvez contacter Bryan ici via le formulaire du portfolio ou le joindre directement sur LinkedIn. Il répond généralement sous 24 à 48 heures et est activement à la recherche de nouvelles opportunités !"],
            de: [
                "Sie können Bryan hier über das Kontaktformular des Portfolios erreichen oder sich direkt auf LinkedIn vernetzen. Er antwortet in der Regel innerhalb von 24-48 Stunden und sucht aktiv nach neuen Möglichkeiten!"],
            pt: [
                "Você pode encontrar o Bryan aqui mesmo através do formulário de contato do portfólio, ou conectar-se com ele diretamente pelo LinkedIn. Ele geralmente responde em 24-48 horas e está ativamente em busca de novas oportunidades!"],keywords: ['resume', 'cv', 'curriculum', 'download', 'pdf', 'descargar'],
        responses: {
            en: [
                "Bryan's portfolio serves as his interactive resume! You'll find his full experience timeline, skills matrix, and project showcase all here. For a direct conversation, use the contact form or LinkedIn.",
                "This portfolio IS Bryan's living resume — featuring 12+ years of experience, a skills matrix, project demos, and AI apps. Want specifics? Ask me about any section!",
                "Rather than a static PDF, Bryan built this interactive portfolio to showcase his skills dynamically. Everything you'd find in a resume is here — experience, skills, projects, and more."
            ],
            es: [
                "¡El portafolio de Bryan funciona como su currículum interactivo! Encontrarás su línea de experiencia, matriz de habilidades y galería de proyectos aquí.",
                "Este portafolio ES el currículum de Bryan — con 12+ años de experiencia, matriz de habilidades, demos de proyectos y apps de IA. ¿Quieres detalles? ¡Pregúntame!",
                "En lugar de un PDF estático, Bryan construyó este portafolio interactivo. Todo lo que encontrarías en un CV está aquí — experiencia, habilidades, proyectos y más."
            ],
            pt: [
                "Você pode encontrar o Bryan aqui mesmo através do formulário de contato do portfólio, ou conectar-se com ele diretamente pelo LinkedIn. Ele geralmente responde em 24-48 horas e está ativamente em busca de novas oportunidades!"],
            de: [
                "Sie können Bryan hier über das Kontaktformular des Portfolios erreichen oder sich direkt auf LinkedIn vernetzen. Er antwortet in der Regel innerhalb von 24-48 Stunden und sucht aktiv nach neuen Möglichkeiten!"],
            fr: [
                "Vous pouvez contacter Bryan ici via le formulaire du portfolio ou le joindre directement sur LinkedIn. Il répond généralement sous 24 à 48 heures et est activement à la recherche de nouvelles opportunités !"],
            ja: [
                "このポートフォリオの問い合わせフォームから直接Bryanに連絡するか、LinkedInでつながることができます。通常24〜48時間以内に返信があり、新しい機会を積極的に探しています！"],
            ko: [
                "포트폴리오의 문의 폼을 통해 Bryan에게 연락하거나 링크드인에서 직접 소통할 수 있습니다. 일반적으로 24~48시간 이내에 회신하며 새로운 취업 기회를 적극적으로 찾고 있습니다!"],
            zh: [
                "您可以通过这里的联系表单与 Bryan 取得联系，或者直接在 LinkedIn 上联系他。他通常会在 24-48 小时内回复，并且正在积极寻找新的好机会！"],
            ar: [
                "يمكنك الوصول إلى برايان هنا من خلال استمارة الاتصال، أو الاتصال به مباشرة على لينكد إن. عادة ما يرد خلال 24-48 ساعة ويبحث بنشاط عن فرص جديدة!"],
            hi: [
                "आप यहां संपर्क फ़ॉर्म के माध्यम से ब्रायन से संपर्क कर सकते हैं, या सीधे लिंक्डइन पर जुड़ सकते हैं। वह 24 घंटे में उत्तर देते हैं और नए अवसरों की तलाश में हैं!"],
            he: [
                "תוכלו ליצור קשר עם בריאן כאן באמצעות טופס יצירת הקשר, או להתחבר אליו ישירות בלינקדאין. הוא לרוב משיב בתוך 24-48 שעות ומחפש באופן פעיל משרות חדשות!"]
        },
        suggestions: ['experience', 'skills', 'contact']
    },
    {
        id: 'availability',
        phrases: ['is bryan available', 'is he looking for work', 'open to work', 'available for hire', 'esta disponible', 'busca trabajo'],keywords: ['available', 'availability', 'hire', 'hiring', 'open', 'looking', 'freelance', 'disponible', 'disponibilidad', 'contratar'],
        responses: {
            en: [
                "Yes! Bryan is actively open to new opportunities in AI development, Python engineering, and tech leadership roles. Reach out via the contact form or LinkedIn!",
                "Bryan is currently available and seeking roles in AI/Python development and tech leadership. He's open to full-time, contract, or freelance opportunities.",
                "Absolutely — Bryan is actively exploring new opportunities. He's especially interested in roles involving AI, Python, and technical leadership. Let's connect!"
            ],
            es: [
                "¡Sí! Bryan está activamente abierto a nuevas oportunidades en desarrollo de IA, ingeniería Python y liderazgo técnico. ¡Contáctalo por el formulario o LinkedIn!",
                "Bryan está disponible y busca roles en desarrollo de IA/Python y liderazgo técnico. Está abierto a tiempo completo, contrato o freelance.",
                "¡Por supuesto! Bryan está explorando nuevas oportunidades, especialmente en roles de IA, Python y liderazgo técnico. ¡Conectemos!"
            ],
            pt: [
                "Sim! O Bryan está aberto a novas oportunidades, particularmente em papéis que envolvam Desenvolvimento de IA, Engenharia de Software em Python ou Liderança Técnica. Ele está pronto para aplicar seus 12+ anos de experiência."],
            de: [
                "Ja! Bryan ist offen für neue Chancen, insbesondere in KI-Entwicklung, Python Software Engineering und technischer Führung (Management)."],
            fr: [
                "Oui ! Bryan est très ouvert aux nouvelles opportunités, particulièrement pour des rôles impliquant le développement d'IA, l'ingénierie Python ou la gestion d'équipe technique."],
            ja: [
                "はい！Bryanは、AI開発、Pythonソフトウェアエンジニアリング、主要なテクニカルリーダーシップなど、新たな機会を積極的に受け入れています。12年の経験を最大限に発揮できます。"],
            ko: [
                "네! Bryan은 채용에 열려있으며, 주로 AI 개발, Python 엔지니어링, 기술 리더십 역할을 모색하고 있습니다. 12년 이상의 경험을 바탕으로 기여할 준비가 되어 있습니다."],
            zh: [
                "是的！Bryan 非常期待新的机会，特别是涉及 AI 开发、Python 软件工程或技术主管的角色。他已准备好将他 12 年多的宝贵经验带入团队。"],
            ar: [
                "نعم! برايان منفتح على الفرص الجديدة والمشاركة الفعالة، لا سيما في مجال الذكاء الاصطناعي وبايثون والقيادة. وهو جاهز لتقديم خبرته الطويلة."],
            hi: [
                "हाँ! ब्रायन नए अवसरों के लिए खुले हैं, विशेष रूप से एआई डेवलपमेंट, पायथन इंजीनियरिंग, या तकनीकी नेतृत्व में।"],
            he: [
                "כן! בריאן פתוח להזדמנויות מרתקות, בייחוד לתפקידי פיתוח AI, הנדסת תוכנה בפייתון ומוביל טכני. הוא מוכן להביא את שנות הניסיון שלו בסביבת עבודה חדשה."]
        },
        suggestions: ['contact', 'experience', 'skills']
    },
    {
        id: 'location',
        phrases: ['where is bryan', 'where does bryan live', 'what city', 'donde vive bryan', 'donde esta bryan', 'en que ciudad'],keywords: ['location', 'where', 'city', 'state', 'country', 'florida', 'usa', 'ubicacion', 'donde', 'ciudad'],
        responses: {
            en: [
                "Bryan is based in Florida, USA. He loves the outdoor lifestyle — boating, fishing, basketball, and kayaking. He's open to remote, hybrid, or on-site opportunities.",
                "Currently located in Florida! Bryan enjoys the local lifestyle (boating, fishing, basketball) and is open to remote or on-site tech roles across the US.",
                "Florida, USA — where the sunshine fuels his creativity! Bryan is open to remote work and relocation discussions for the right opportunity."
            ],
            es: [
                "Bryan está en Florida, EE.UU. Le encanta el estilo de vida al aire libre — navegación, pesca, basketball y kayak. Abierto a oportunidades remotas, híbridas o presenciales.",
                "Actualmente en Florida. Bryan disfruta del estilo de vida local y está abierto a roles remotos o presenciales en todo EE.UU.",
                "Florida, EE.UU. — donde el sol alimenta su creatividad. Bryan está abierto a trabajo remoto y a discusiones de reubicación."
            ],
            pt: [
                "O Bryan mora atualmente na Flórida, EUA. Ele está totalmente aberto ao trabalho remoto ou papéis híbridos/presenciais dependendo da oportunidade e do local."],
            de: [
                "Bryan lebt derzeit in Florida, USA. Er ist vollständig offen für Remote-Arbeit oder hybride Vor-Ort-Rollen – je nach Möglichkeit und Standort."],
            fr: [
                "Bryan est actuellement basé en Floride, aux États-Unis. Il est totalement ouvert au travail à distance ou aux rôles hybrides/sur site selon l'opportunité et la localisation."],
            ja: [
                "Bryanは米国フロリダを拠点にしています。機会や場所によっては、リモートワークやハイブリッド/オンサイトに完全に対応しています。"],
            ko: [
                "Bryan은 현재 미국 플로리다에 거주 중입니다. 원격 근무는 물론 기회와 위치에 따라 하이브리드 또는 현장 근무 역할에도 완전히 열려 있습니다."],
            zh: [
                "Bryan 目前定居在美国佛罗里达州。根据具体机会和地点，他完全接受远程工作或混合办公/现场岗位。"],
            ar: [
                "يقيم برايان حالياً في فلوريدا، الولايات المتحدة الأمريكية. وهو منفتح تماماً للعمل عن بعد أو للوظائف الهجينة والميدانية حسب الفرصة والموقع."],
            hi: [
                "ब्रायन वर्तमान में फ्लोरिडा, अमेरिका में रहते हैं। अवसर और स्थान के आधार पर वह दूरस्थ कार्य या हाइब्रिड स्थिति के लिए पूरी तरह तैयार हैं।"],
            he: [
                "בריאן מבוסס כיום בפלורידה, ארצות הברית. הוא פתוח לחלוטין לעבודה מרחוק (Remote) או עבודה במודלים היברידיים בהתבסס על ההזדמנות והמיקום."]
        },
        suggestions: ['availability', 'contact', 'experience']
    },
    {
        id: 'smalltalk',
        phrases: ['how are you', 'whats up', 'what do you do', 'tell me something', 'fun fact', 'como estas', 'que haces', 'un dato curioso'],keywords: ['hobby', 'hobbies', 'fun', 'like', 'enjoy', 'personal', 'interests', 'fact', 'facts', 'curious', 'interesting', 'surprise', 'flaw', 'weakness', 'pasatiempos', 'gustos', 'curiosidad', 'debilidad'],
        responses: {
            en: [
                "Fun facts about Bryan: 🎮 Massive gamer (Resident Evil, Elden Ring), 🎣 loves Florida outdoors (boating, fishing, basketball), 🐕 huge dog lover (Weimaraners + husky), and 🍳 passionate cook who makes homemade food as gifts!",
                "Here's something cool — Bryan built this very AI assistant you're talking to! He's also a big gamer, outdoor enthusiast, dog lover, and foodie who loves carving meats and exploring new restaurants.",
                "Bryan is a tech enthusiast AND a people person — gaming fuels his UI/UX intuition, outdoor activities keep him sharp, and cooking for friends keeps him grounded. He survived major industry crises, making him incredibly resilient.",
                "Did you know? Bryan survived and managed operations through severe industry crises, making him extremely resilient under pressure. He also makes homemade food as gifts for friends! 🍽️"
            ],
            es: [
                "Datos curiosos de Bryan: 🎮 Gran gamer (Resident Evil, Elden Ring), 🎣 ama Florida al aire libre (navegación, pesca, basketball), 🐕 amante de los perros (Weimaraners + husky), y 🍳 cocinero apasionado.",
                "¡Bryan construyó este asistente IA con el que estás hablando! También es gamer, amante del aire libre, de los perros y un foodie que ama cocinar para sus amigos.",
                "Bryan es entusiasta de la tecnología Y una persona sociable — el gaming alimenta su intuición de UI/UX, las actividades al aire libre lo mantienen activo, y cocinar para amigos lo mantiene con los pies en la tierra.",
                "¿Sabías? Bryan sobrevivió y gestionó operaciones durante crisis industriales severas, haciéndolo extremadamente resiliente bajo presión. ¡También prepara comida casera como regalo! 🍽️"
            ],
            pt: [
                "Fatos divertidos sobre o Bryan: Ele é um grande gamer 🎮, um apaixonado por cães 🐕, e quando não está codando ou construindo IA, ele é um cozinheiro criativo e entusiasmado na cozinha 🍳!"],
            de: [
                "Spaßfakt über Bryan: Er ist ein riesiger Gamer 🎮, ein großer Hundeliebhaber 🐕, und wenn er nicht gerade Code schreibt, ist er ein leidenschaftlicher Koch 🍳!"],
            fr: [
                "Anecdotes sur Bryan : C'est un énorme joueur 🎮, il adore les chiens 🐕, et quand il ne code pas ou ne conçoit pas des IA, c'est un cuisinier passionné 🍳 créatif !"],
            ja: [
                "Bryanの豆知識：彼は大のゲーム好き🎮で、犬がとても大好き🐕です。またコードを書いていないときは、情熱的でクリエイティブに料理をしています🍳！"],
            ko: [
                "재미있는 사실: Bryan은 열성적인 게이머🎮이며 대단한 애견인🐕입니다. 또한 코딩이나 AI 관련 업무를 하지 않을 때는 주방에서 매우 창의적인 요리사🍳가 됩니다!"],
            zh: [
                "关于 Bryan 的趣事：他是一个超级游戏迷 🎮，疯狂热爱狗狗 🐕。在不写代码和构建 AI 的时候，他还是厨房里充满热情的创意厨师 🍳！"],
            ar: [
                "حقائق مرحة حول برايان: إنه لاعب متحمس 🎮، ومحب كبير للكلاب 🐕، وعندما لا يكتب التعليمات البرمجية، فهو طباخ شغوف ومبدع في المطبخ 🍳!"],
            hi: [
                "मजेदार तथ्य: ब्रायन एक बहुत बड़े गेमर 🎮 और कुत्तों के प्रेमी 🐕 हैं। जब वह कोडिंग नहीं कर रहे होते हैं, तो एक उत्साही और रचनात्मक रसोइया 🍳 होते हैं!"],
            he: [
                "עובדות מעניינות על בריאן: הוא גיימר עצום 🎮, אוהב כלבים מושבע 🐕, וכשהוא לא כותב קוד או בונה פרויקטי AI, הוא בשלן מלא תשוקה ויצירתיות במטבח 🍳!"]
        },
        suggestions: ['about', 'projects', 'contact']
    },
    {
        id: 'fallback',
        phrases: [],keywords: [],
        responses: {
            en: [
                "Interesting question! I'm best at answering about Bryan's experience, skills, projects, AI work, and background. Try asking about one of those!",
                "I'm not sure I understood that — but I can tell you a lot about Bryan's career, tech stack, AI skills, and portfolio. What would you like to explore?",
                "Hmm, that's outside my specialty. I know Bryan's portfolio inside and out though — ask me about his experience, projects, AI work, or how to contact him!",
                "I might have missed that one! I'm tuned for portfolio-related questions — try asking about Bryan's skills, experience, projects, or AI background."
            ],
            es: [
                "¡Pregunta interesante! Soy mejor respondiendo sobre la experiencia, habilidades, proyectos, trabajo en IA y perfil de Bryan. ¡Intenta preguntar sobre alguno de esos!",
                "No estoy seguro de haber entendido — pero puedo contarte mucho sobre la carrera de Bryan, su stack, habilidades de IA y portafolio. ¿Qué te gustaría explorar?",
                "Eso está fuera de mi especialidad. Pero conozco el portafolio de Bryan a fondo — ¡pregúntame sobre su experiencia, proyectos, IA o cómo contactarlo!",
                "¡Puede que me haya perdido esa! Estoy afinado para preguntas del portafolio — prueba sobre habilidades, experiencia, proyectos o IA de Bryan."
            ],
            pt: [
                "Pergunta bastante interessante! Sou muito melhor respondendo especificamente sobre a experiência do Bryan, suas habilidades, projetos, trabalho com IA e seu currículo geral. Que tal perguntar sobre um desses tópicos?"],
            de: [
                "Interessante Frage! Am besten beantworte ich Fragen direkt zu Bryans Erfahrung, Fähigkeiten, Projekten oder seinem Hintergrund im Bereich KI. Probier es gern!"],
            fr: [
                "Question intéressante ! Je suis le plus performant pour vous répondre sur l'expérience de Bryan, ses projets, ses compétences en IA ou sa formation. Essayez de m'interroger sur l'un de ces sujets !"],
            ja: [
                "興味深い質問です！私の専門は、Bryanの経験、スキル、プロジェクト、AIの専門知識やバックグラウンドに関する情報をお伝えすることです。そういったトピックから質問してみてください！"],
            ko: [
                "흥미로운 질문이네요! 저는 Bryan의 경험, 보유 기술, 진행한 프로젝트, AI 전문 지식 및 포트폴리오에 대한 질문에 가장 잘 대답할 수 있습니다. 해당 분야에 대해 물어봐 주세요!"],
            zh: [
                "很有意思的问题！我最擅长回答关于 Bryan 的个人经验、技术能力、他开发的项目和 AI 背景的问题。您可以试着问我其中一个！"],
            ar: [
                "سؤال مثير للاهتمام! أنا الأفضل في الإجابة عن تجربة برايان، مهاراته، ومشاريع الذكاء الاصطناعي وخبرته. حاول السؤال عن أحد هذه المواضيع!"],
            hi: [
                "बड़ा दिलचस्प सवाल! मैं ब्रायन के करियर का अनुभव, उनके कौशल, प्रोजेक्ट्स, AI में उनका काम, आदि के बारे में सबसे अच्छे से उत्तर दे सकता हूँ। कृपया उनमें से किसी एक के बारे में पूछें!"],
            he: [
                "שאלה מעניינת! אני במיטבי כשאני עונה על שאלות בנושא הניסיון המסחרי של בריאן, כישורים טכניים, פרויקטים ב-AI וקצת רקע על העבר שלו. נסו לשאול אותי על אחד מאלה!"]
        },
        suggestions: ['about', 'skills', 'projects', 'experience']
    }
];

// --- Intent Engine Functions ---

// Track last response index per intent to avoid repetition
const _lastResponseIndex = {};

function normalizeMessage(message) {
    return message
        .toLowerCase()
        .trim()
        .replace(/[^\w\sáéíóúñüàèìòùäëïöüâêîôûçа-яё]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function detectIntent(message) {
    const normalized = normalizeMessage(message);
    let bestIntent = null;
    let bestScore = 0;

    for (const intent of chatbotIntents) {
        if (intent.id === 'fallback') continue;
        let score = 0;

        // Phrase matches score 3 points (stronger signal)
        for (const phrase of intent.phrases) {
            if (normalized.includes(phrase.toLowerCase())) {
                score += 3;
            }
        }

        // Keyword matches score 1 point each
        for (const keyword of intent.keywords) {
            if (normalized.includes(keyword.toLowerCase())) {
                score += 1;
            }
        }

        if (score > bestScore) {
            bestScore = score;
            bestIntent = intent;
        }
    }

    // Require at least score 1 to avoid random matches
    return bestScore >= 1 ? bestIntent : chatbotIntents.find(i => i.id === 'fallback');
}

function getRandomResponse(intentId, lang) {
    const intent = chatbotIntents.find(i => i.id === intentId);
    if (!intent) return null;

    const pool = intent.responses[lang] || intent.responses['en'];
    if (!pool || pool.length === 0) return null;

    // Avoid repeating the last response for this intent
    const lastIdx = _lastResponseIndex[intentId];
    let idx;
    if (pool.length === 1) {
        idx = 0;
    } else {
        do {
            idx = Math.floor(Math.random() * pool.length);
        } while (idx === lastIdx);
    }
    _lastResponseIndex[intentId] = idx;
    return pool[idx];
}

function getSuggestions(intentId) {
    const intent = chatbotIntents.find(i => i.id === intentId);
    return intent ? (intent.suggestions || []) : [];
}

function shouldTriggerForm(intentId) {
    const intent = chatbotIntents.find(i => i.id === intentId);
    return intent ? !!intent.triggerForm : false;
}

// Quick-reply intent labels for UI
// Quick-reply intent labels for UI
// Quick-reply intent labels for UI
const quickReplyIntents = window.quickReplyIntents || {
    experience: { en: '💼 Experience', es: '💼 Experiencia', pt: '💼 Experiência', de: '💼 Erfahrung', fr: '💼 Expérience', ja: '💼 経歴', ko: '💼 경험', zh: '💼 经验', ar: '💼 الخبرة', hi: '💼 अनुभव', he: '💼 ניסיון' },
    skills: { en: '⚙️ Tech Stack', es: '⚙️ Stack Tecnológico', pt: '⚙️ Tecnologias', de: '⚙️ Tech Stack', fr: '⚙️ Compétences', ja: '⚙️ 技術スタック', ko: '⚙️ 기술 스택', zh: '⚙️ 技术栈', ar: '⚙️ المهارات', hi: '⚙️ टेक टूल', he: '⚙️ כישורים טכניים' },
    ai: { en: '🤖 AI & ML', es: '🤖 IA y ML', pt: '🤖 IA e ML', de: '🤖 KI & ML', fr: '🤖 IA & ML', ja: '🤖 AI & ML', ko: '🤖 AI 및 ML', zh: '🤖 AI 与 ML', ar: '🤖 الذكاء الاصطناعي', hi: '🤖 AI और ML', he: '🤖 AI ו-ML' },
    projects: { en: '🚀 Projects', es: '🚀 Proyectos', pt: '🚀 Projetos', de: '🚀 Projekte', fr: '🚀 Projets', ja: '🚀 プロジェクト', ko: '🚀 프로젝트', zh: '🚀 项目', ar: '🚀 المشاريع', hi: '🚀 प्रोजेक्ट्स', he: '🚀 פרויקטים' },
    contact: { en: '✉️ Contact', es: '✉️ Contacto', pt: '✉️ Contato', de: '✉️ Kontakt', fr: '✉️ Contact', ja: '✉️ 連絡先', ko: '✉️ 연락처', zh: '✉️ 联系方式', ar: '✉️ اتصل', hi: '✉️ संपर्क', he: '✉️ יצירת קשר' }
};

// Suggestion chip labels
// Suggestion chip labels
// Suggestion chip labels
const suggestionLabels = window.suggestionLabels || {
    greeting: { en: '👋 Say Hello', es: '👋 Saludar', pt: '👋 Dizer Oi', de: '👋 Hallo', fr: '👋 Bonjour', ja: '👋 挨拶', ko: '👋 인사', zh: '👋 你好', ar: '👋 مرحباً', hi: '👋 नमस्ते', he: '👋 שלום' },
    about: { en: '👤 About Bryan', es: '👤 Sobre Bryan', pt: '👤 Sobre Bryan', de: '👤 Über Bryan', fr: '👤 Sur Bryan', ja: '👤 Bryanについて', ko: '👤 Bryan 정보', zh: '👤 关于 Bryan', ar: '👤 عن برايان', hi: '👤 ब्रायन के बारे में', he: '👤 על בריאן' },
    skills: { en: '⚙️ Tech Stack', es: '⚙️ Stack Técnico', pt: '⚙️ Perfil Técnico', de: '⚙️ Tech Stack', fr: '⚙️ Compétences', ja: '⚙️ 技術集', ko: '⚙️ 기술 스택', zh: '⚙️ 技能树', ar: '⚙️ المهارات', hi: '⚙️ टेक', he: '⚙️ טכנולוגיות' },
    projects: { en: '🚀 Projects', es: '🚀 Proyectos', pt: '🚀 Projetos', de: '🚀 Projekte', fr: '🚀 Projets', ja: '🚀 プロジェクト', ko: '🚀 프로젝트', zh: '🚀 项目展示', ar: '🚀 مشاريع', hi: '🚀 कार्य', he: '🚀 פרויקטים' },
    experience: { en: '💼 Experience', es: '💼 Experiencia', pt: '💼 Experiência', de: '💼 Erfahrung', fr: '💼 Expérience pro', ja: '💼 職務経歴', ko: '💼 경력', zh: '💼 工作经验', ar: '💼 مسيرة', hi: '💼 पिछला अनुभव', he: '💼 ניסיון עבודה' },
    ai: { en: '🤖 AI Skills', es: '🤖 Habilidades IA', pt: '🤖 Habilidades IA', de: '🤖 KI', fr: '🤖 IA', ja: '🤖 AIスキル', ko: '🤖 AI 역량', zh: '🤖 AI 技能', ar: '🤖 الذكاء الآلي', hi: '🤖 AI', he: '🤖 AI' },
    education: { en: '🎓 Education', es: '🎓 Educación', pt: '🎓 Educação', de: '🎓 Bildung', fr: '🎓 Éducation', ja: '🎓 学歴', ko: '🎓 학력', zh: '🎓 教育', ar: '🎓 التعليم', hi: '🎓 शिक्षा', he: '🎓 השכלה' },
    contact: { en: '✉️ Contact', es: '✉️ Contacto', pt: '✉️ Ctt', de: '✉️ Kontakt', fr: '✉️ Con', ja: '✉️ 問合', ko: '✉️ 연락', zh: '✉️ 联系', ar: '✉️ تواصل', hi: '✉️ संपर्क', he: '✉️ קשר' },
    resume: { en: '📄 Resume', es: '📄 Currículum', pt: '📄 Currículo', de: '📄 Lebenslauf', fr: '📄 CV', ja: '📄 履歴書', ko: '📄 이력서', zh: '📄 简历', ar: '📄 سيرة', hi: '📄 रेज़्यूमे', he: '📄 קורות חיים' },
    availability: { en: '✅ Availability', es: '✅ Disponibilidad', pt: '✅ Disponibilidade', de: '✅ Verfügbarkeit', fr: '✅ Dispo', ja: '✅ 可能', ko: '✅ 가능여부', zh: '✅ 求职中', ar: '✅ متاح', hi: '✅ उपलब्ध', he: '✅ זמינות' },
    location: { en: '📍 Location', es: '📍 Ubicación', pt: '📍 Localização', de: '📍 Standort', fr: '📍 Localisation', ja: '📍 場所', ko: '📍 위치', zh: '📍 位置', ar: '📍 الموقع', hi: '📍 स्थान', he: '📍 מיקום' },
    smalltalk: { en: '💬 Fun Facts', es: '💬 Datos Curiosos', pt: '💬 Curiosidades', de: '💬 Trivia', fr: '💬 Anecdotes', ja: '💬 遊び', ko: '💬 흥미', zh: '💬 趣事', ar: '💬 معلومات', hi: '💬 मजेदार', he: '💬 מעניין' }
};

// TTS voice preference — pick softer, more natural voices when available
function pickBestVoice(lang) {
    if (!window.speechSynthesis) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return null;

    const langCode = lang === 'es' ? 'es' : 'en';
    // Prefer these softer/natural sounding voices in order
    const preferred = lang === 'es'
        ? ['Google español', 'Paulina', 'Monica', 'Jorge', 'Microsoft Pablo']
        : ['Google US English', 'Samantha', 'Karen', 'Daniel', 'Microsoft Zira', 'Microsoft David'];

    // Try preferred voices first
    for (const name of preferred) {
        const v = voices.find(v => v.name.includes(name) && v.lang.startsWith(langCode));
        if (v) return v;
    }
    // Fallback: any voice matching the language
    return voices.find(v => v.lang.startsWith(langCode)) || null;
}
