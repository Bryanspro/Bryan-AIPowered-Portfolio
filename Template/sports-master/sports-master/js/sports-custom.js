// JS Override configuration for Sport's Master Chat Widget Persona

// 1. Theme Configuration
// The template defaults to light mode with dark sections, so we'll start with light mode
// The theme toggle will override this based on user interaction stored in localStorage
document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (!themeBtn) return;

    // Restore saved theme; default is 'light' for this template
    const savedTheme = localStorage.getItem('sports-theme') || 'light';
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            themeBtn.innerHTML = '<i class="fa fa-moon-o" style="color: #aee;"></i> <span>Dark</span>';
        } else {
            document.body.removeAttribute('data-theme');
            themeBtn.innerHTML = '<i class="fa fa-sun-o" style="color: #ffcb05;"></i> <span>Light</span>';
        }
    };

    applyTheme(savedTheme);

    themeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('sports-theme', newTheme);
        applyTheme(newTheme);

        // Update translated label if translations are loaded
        if (typeof window.currentTranslations !== 'undefined' && window.currentTranslations) {
            const span = themeBtn.querySelector('span');
            const key = newTheme === 'dark' ? 'themeToggleDark' : 'themeToggleLight';
            if (span && window.currentTranslations[key]) {
                span.innerText = window.currentTranslations[key];
            }
        }
    });
});

// Configure the localization path specific to the sports-master template structure
window.LOCALES_PATH = 'sports-locales/';

// 2. Chat Widget Persona Configuration
window.WIDGET_BOT_NAME = "Sport's Master Assistant";

window.quickReplyIntents = {
    match: { en: '🗓️ Next Match', es: '🗓️ Próximo Partido', pt: '🗓️ Próximo Jogo', de: '🗓️ Nächstes Spiel', fr: '🗓️ Prochain Match', ja: '🗓️ 次の試合', ko: '🗓️ 다음 경기', zh: '🗓️ 下一场比赛', ar: '🗓️ المباراة القادمة', hi: '🗓️ अगला मैच', he: '🗓️ המשחק הבא' },
    table: { en: '🏆 Points Table', es: '🏆 Tabla de Puntos', pt: '🏆 Tabela de Pontos', de: '🏆 Punktetabelle', fr: '🏆 Classement', ja: '🏆 ポイント表', ko: '🏆 순위표', zh: '🏆 积分榜', ar: '🏆 جدول النقاط', hi: '🏆 अंक तालिका', he: '🏆 טבלת ניקוד' },
    team: { en: '👥 Meet the Team', es: '👥 Conoce al Equipo', pt: '👥 Conheça o Time', de: '👥 Das Team', fr: '👥 L\'Équipe', ja: '👥 チーム紹介', ko: '👥 팀 소개', zh: '👥 球队阵容', ar: '👥 الفريق', hi: '👥 टीम से मिलें', he: '👥 הכירו את הקבוצה' },
    contact: { en: '📍 Contact', es: '📍 Contacto', pt: '📍 Contato', de: '📍 Kontakt', fr: '📍 Contact', ja: '📍 連絡先', ko: '📍 연락처', zh: '📍 联系', ar: '📍 اتصل', hi: '📍 संपर्क', he: '📍 קשר' }
};

window.suggestionLabels = window.quickReplyIntents;

window.WIDGET_GREETING = {
    en: "Welcome to Sport's Master! ⚽🏈 Need help finding the Next Match, team lineups, or latest sports headlines?",
    es: "¡Bienvenido a Sport's Master! ⚽🏈 ¿Necesitas ayuda para encontrar el Próximo Partido, alineaciones o noticias?",
    pt: "Bem-vindo ao Sport's Master! ⚽🏈 Precisa de ajuda com o Próximo Jogo, escalações ou notícias?",
    de: "Willkommen bei Sport's Master! ⚽🏈 Brauchen Sie Hilfe beim nächsten Spiel, den Aufstellungen oder Nachrichten?",
    fr: "Bienvenue sur Sport's Master ! ⚽🏈 Besoin d'aide pour le prochain match ou l'actualité sportive ?",
    ja: "Sport's Master へようこそ！⚽🏈 次の試合、チームのラインナップ、最新のニュースを探すお手伝いをしましょうか？",
    ko: "Sport's Master에 오신 것을 환영합니다! ⚽🏈 다음 경기, 팀 라인업 또는 최신 스포츠 뉴스를 찾고 계신가요?",
    zh: "欢迎来到 Sport's Master！⚽🏈 需要查询下一场比赛、球队阵容或最新体育新闻吗？",
    ar: "مرحبًا بك في Sport's Master! ⚽🏈 هل تحتاج مساعدة في العثور على المباراة القادمة أو أخبار الرياضة؟",
    hi: "Sport's Master में आपका स्वागत है! ⚽🏈 अगले मैच, टीम लाइनअप, या खेल समाचार खोजने में मदद चाहिए?",
    he: "ברוכים הבאים ל-Sport's Master! ⚽🏈 זקוקים לעזרה בחיפוש המשחק הבא, הרכבים או חדשות ספורט?"
};

window.WIDGET_SYSTEM_PROMPT = `Role: You are the knowledgeable sports assistant for Sport's Master. Your primary role is to assist visitors in navigating live match analytics, team information, ticketing, and breaking sports news. 

Core Template Features you can guide users to:
1. "Next Match": Users can see a countdown timer on the Home page for major events.
2. "Points Table": A detailed leaderboard of team standings.
3. "Match Fixtures": European and Global team pairings.
4. "Meet Your Team": Defender Charles Wheeler and other squad members showcased in our Team lineup.
5. "Video Section": Watch exclusive post-match interviews.

Tone: Energetic, enthusiastic, deeply analytical, and supportive. Respond in the language that the user typed in!`;

window.chatbotIntents = [
    {
        id: 'greeting',
        phrases: ['hello', 'hi', 'hey', 'good morning', 'hola', 'buenos dias'],
        keywords: ['sup', 'yo', 'greetings', 'saludos'],
        responses: {
            en: ["Hello! 👋 Welcome to Sport's Master. Need info on matches, points, or our team lineups?"],
            es: ["¡Hola! 👋 Bienvenido a Sport's Master. ¿Necesitas info sobre partidos, puntos o nuestro equipo?"]
        },
        suggestions: ['match', 'table', 'team']
    },
    {
        id: 'match',
        phrases: ['next match', 'next game', 'proximo partido', 'partido'],
        keywords: ['match', 'game', 'fixture', 'partido', 'juego'],
        responses: {
            en: ["Our <b>Next Match</b> will be featured on the Home page countdown! <br><br>We also display European and Global fixtures with real-time updates and results."],
            es: ["¡Nuestro <b>Próximo Partido</b> aparecerá en el temporizador de la página de inicio! <br><br>También mostramos partidos europeos y mundiales con resultados en tiempo real."]
        },
        suggestions: ['table', 'team']
    },
    {
        id: 'table',
        phrases: ['points table', 'standings', 'leaderboard', 'tabla de posiciones', 'puntos'],
        keywords: ['points', 'table', 'standings', 'puntos', 'tabla', 'clasificacion'],
        responses: {
            en: ["You can view the full <b>Points Table</b> and team standings right on our main dashboard! We cover major leagues with detailed wins, losses, and goal differences."],
            es: ["¡Puedes ver la <b>Tabla de Puntos</b> completa en nuestro dashboard principal! Cubrimos las ligas principales con detalles de victorias, derrotas y diferencia de goles."]
        },
        suggestions: ['match', 'team']
    },
    {
        id: 'team',
        phrases: ['meet the team', 'players', 'squad', 'equipo', 'jugadores'],
        keywords: ['team', 'players', 'squad', 'roster', 'equipo', 'jugadores'],
        responses: {
            en: ["Our squad is stacked! Be sure to check the <b>Team</b> section to meet key players like our star defender, Charles Wheeler, and the rest of the lineup."],
            es: ["¡Nuestro equipo está listo! Asegúrate de visitar la sección del <b>Equipo</b> para conocer a jugadores clave como nuestro defensa estrella, Charles Wheeler."]
        },
        suggestions: ['match', 'contact']
    },
    {
        id: 'contact',
        phrases: ['contact', 'address', 'tickets', 'contacto', 'direccion', 'entradas'],
        keywords: ['contact', 'location', 'phone', 'contacto', 'telefono'],
        responses: {
            en: ["Need tickets or support? Head over to our <b>Contact</b> page. <br><br><b>Email:</b> sport@master.com<br><b>Location:</b> Main Stadium Blvd."],
            es: ["¿Necesitas entradas o soporte? Visita nuestra página de <b>Contacto</b>.<br><br><b>Email:</b> sport@master.com<br><b>Ubicación:</b> Bulevar del Estadio Principal."]
        },
        suggestions: ['match', 'team']
    },
    {
        id: 'fallback',
        phrases: [], keywords: [],
        responses: {
            en: ["I didn't quite catch that. Try asking about the next match, the points table, or our team!"],
            es: ["No entendí muy bien. ¡Intenta preguntar por el próximo partido, la tabla de puntos o nuestro equipo!"]
        },
        suggestions: ['match', 'table', 'team']
    }
];
