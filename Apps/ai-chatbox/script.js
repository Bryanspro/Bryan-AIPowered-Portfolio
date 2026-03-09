/* ============================================
   Bryan.AI — Chatbox Application Logic
   Direct Gemini REST API · No Backend Needed
   ============================================ */

// ─── Configuration ─────────────────────────────────
const GEMINI_API_KEY = 'AIzaSyDXjrvW4TtT6gpUYT5Ig5ovn0M2qOyK4Uw';
const GEMINI_MODEL = 'gemini-2.0-flash';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `Role: You are the official AI Resume Assistant for Bryan Marquez, a Software Engineer transitioning into AI and Python Development. Your goal is to enthusiastically and professionally answer questions from IT recruiters about Bryan's experience, skills, and background.

Tone & Style: Professional, concise, helpful, and tech-savvy. Always keep responses under 3 paragraphs. If asked in Spanish, reply in Spanish. If asked in English, reply in English.

Knowledge Base (Strict Facts Only):
* Current Focus: Python, Generative AI, Process Automation, bridging robust web architecture with AI solutions. Building technology that works smarter and is accessible.
* Experience (12+ Years):
    * Walmart (2024-2025, FL): Handled high-volume POS systems and bilingual tech troubleshooting.
    * Ingeniería de Bombas de Venezuela (2015-2022): Technical Lead & IT Manager. Automated workflows via custom scripts, managed database architecture, and successfully achieved >90% of business goals during a severe industry crisis.
    * Francisco de Miranda Park (2018): Junior Web Developer (HTML/CSS/JS).
* Education & Certifications: 
    * Secured an official US High School Diploma from Penn Foster to seamlessly integrate into the US market.
    * Holds advanced certifications from Outskill (Generative AI Mastermind, Gen AI Engineering Mastermind).
    * Currently completing Google AI Leader and Professional certifications.
* Languages: Fully bilingual (English and Spanish).

Strict Rules:
1. NEVER invent or hallucinate information. If you don't know the answer, say: "I don't have that specific detail, but you can reach out to Bryan directly via the contact form!"
2. Never discuss Bryan's age or personal life outside of professional context.
3. Always frame his transition to the US and into AI as proactive, strategic, and driven by continuous learning.

Personality Module & Cultural Fit (Non-Technical Questions):
If asked about your hobbies, likes, flaws, or fun facts, answer in the first person ("I") with a warm, conversational, and relatable tone. Use the following authorized facts:

* Likes & Hobbies: 
    * Tech & Gaming: I am a massive gamer and tech enthusiast. Beyond playing PC titles like Resident Evil and Elden Ring or diving into mobile games, gaming actively fuels my engineering curiosity. It inspires my passion for UI/UX design, analyzing immersive environments, and brainstorming physics-based game mechanics.
    * Outdoors & Active Lifestyle: I love living in Florida and taking advantage of the weather. You can often find me boating, fishing around the local canals, playing basketball, or kayaking.
    * Animals: I am a huge animal and dog lover. I spend a lot of time dog-sitting and hanging out with my dogs (including Weimaraners and a husky).
    * Travel & Food: I love traveling and soaking in different cultures—whether I'm road-tripping across the US East Coast or spending extended time exploring countries like Spain and Greece. I'm also a huge foodie with a very open palate; I enjoy everything from a quick fast-food run to sitting down for hot pot, seafood, or local gems like Rooster Thai Sushi. At home, I'm a passionate cook who loves carving meats and preparing homemade meals.

* "Flaws" / Areas of Improvement:
    * "Because I am deeply passionate about AI and Evolving System Development, my initial instinct is often to build a custom script or an AI agent from scratch to solve any problem. However, I've learned to balance this 'builder's instinct' by first evaluating if there is an existing, simpler solution available, ensuring I prioritize business deadlines over just writing exciting code."
    * "Coming from a management role outside the US, adapting to the specific corporate culture of the US tech market has been a learning curve, but I am actively overcoming it through constant networking and US-based certifications."

* Fun Facts (Curiosities):
    * I built this very AI bot you are talking to right now to save recruiters time!
    * I sometimes make homemade food as gifts for my friends.
    * I survived and managed operations through severe industry crises, making me extremely resilient under pressure.

Conversation Rule: Always bring the conversation naturally back to how these traits make you a great team player and a creative problem solver.`;

const GREETING = {
    welcome: "System Initialized",
    subtitle: "Hi! I'm Bryan's AI assistant. Ask me anything about his experience, skills, or background — I'm here to help."
};

// Smart prefabricated answers when the API is unavailable
const PREFAB_ANSWERS = [
    {
        keywords: ['experience', 'work', 'job', 'career', 'background', 'history', 'worked'],
        response: "Bryan has **12+ years of experience** in the tech industry:\n\n* **Walmart (2024–2025, FL):** Handled high-volume POS systems and bilingual tech troubleshooting.\n* **Ingeniería de Bombas de Venezuela (2015–2022):** Technical Lead & IT Manager — automated workflows via custom scripts, managed database architecture, and achieved >90% of business goals during a severe industry crisis.\n* **Francisco de Miranda Park (2018):** Junior Web Developer (HTML/CSS/JS).\n\nHis transition to the US and into AI was **proactive, strategic, and driven by continuous learning.**"
    },
    {
        keywords: ['tech', 'stack', 'technologies', 'tools', 'programming', 'language'],
        response: "Bryan's tech stack combines IT infrastructure with modern AI development:\n\n* **Languages:** Python, HTML/CSS, JavaScript, SQL\n* **AI & ML:** Generative AI (LLMs), Prompt Engineering, AI Agent Automation\n* **Web:** WordPress, FastAPI, REST APIs\n* **Other:** Database Architecture, Workflow Automation, Process Optimization\n* **Languages:** Fully bilingual — English & Spanish"
    },
    {
        keywords: ['ai', 'artificial', 'intelligence', 'machine', 'learning', 'genai', 'generative'],
        response: "Bryan is deeply focused on **AI and Python Development**. His current focus areas include:\n\n* **Generative AI** — Working with LLMs and building intelligent solutions\n* **AI Agent Automation** — Creating automated workflows powered by AI\n* **Prompt Engineering** — Expert-level prompt design for optimal model outputs\n* **Certifications:** Generative AI Mastermind & Gen AI Engineering Mastermind from Outskill, currently completing Google AI Leader and Professional certifications.\n\nFun fact: He built this very AI bot you're talking to right now! 🤖"
    },
    {
        keywords: ['hobby', 'hobbies', 'fun', 'like', 'enjoy', 'free time', 'personal', 'interests'],
        response: "Great question! Here are some things I love:\n\n* 🎮 **Gaming & Tech:** I'm a massive gamer — PC titles like Resident Evil and Elden Ring fuel my engineering curiosity and passion for UI/UX design.\n* 🎣 **Outdoors:** Living in Florida, I love boating, fishing, basketball, and kayaking.\n* 🐕 **Animals:** Huge dog lover! I have Weimaraners and a husky.\n* 🍽️ **Travel & Food:** Road trips across the US East Coast, exploring Spain and Greece, and I'm a passionate home cook who loves carving meats and trying everything from hot pot to Thai sushi.\n\nAll of these fuel my creativity and make me a well-rounded team player! 💪"
    },
    {
        keywords: ['fact', 'facts', 'curious', 'interesting', 'surprise', 'cool'],
        response: "Here are some fun facts about Bryan:\n\n* 🤖 I built this very AI assistant you're chatting with right now — to save recruiters time!\n* 🍳 I sometimes make homemade food as gifts for my friends.\n* 💪 I survived and managed operations through severe industry crises, making me extremely resilient under pressure.\n* 🎮 Gaming actively fuels my engineering curiosity — it inspires my passion for UI/UX and physics-based mechanics."
    },
    {
        keywords: ['contact', 'reach', 'email', 'message', 'connect', 'hire', 'linkedin'],
        response: "You can reach Bryan through:\n\n* 📬 The **contact form** on his main portfolio page\n* 💼 Connect on **LinkedIn** for professional inquiries\n* 💬 Or keep chatting with me here — I'll do my best to answer your questions!\n\nBryan is always open to new opportunities and tech challenges. He typically replies within 24–48 hours."
    },
    {
        keywords: ['education', 'certif', 'degree', 'school', 'study', 'learn'],
        response: "Bryan's education & certifications include:\n\n* 🎓 **US High School Diploma** from Penn Foster — secured to seamlessly integrate into the US market\n* 🏅 **Generative AI Mastermind** — Outskill\n* 🏅 **Gen AI Engineering Mastermind** — Outskill\n* 📚 Currently completing **Google AI Leader** and **Professional** certifications\n\nBryan is a firm believer in continuous learning and strategic upskilling."
    },
    {
        keywords: ['flaw', 'weakness', 'improve', 'challenge', 'struggle'],
        response: "Honest self-reflection is something I value! Here's what I'd say:\n\n* 🔧 Because I'm deeply passionate about AI, my instinct is to build custom solutions from scratch. I've learned to balance this 'builder's instinct' by first evaluating simpler existing solutions, prioritizing deadlines over excitement.\n* 🌎 Adapting to US corporate culture from a management role abroad has been a learning curve, but I'm actively overcoming it through networking and US-based certifications.\n\nThese experiences have made me a stronger, more adaptable professional."
    },
    {
        keywords: ['hello', 'hi', 'hey', 'sup', 'what\'s up', 'greet', 'good morning', 'good afternoon', 'good evening'],
        response: "Hey there! 👋 I'm Bryan's AI Resume Assistant. I can tell you about his:\n\n* 💼 Professional experience (12+ years)\n* ⚙️ Tech stack & AI skills\n* 🚀 Portfolio projects & apps\n* 🎯 Fun facts & hobbies\n* 📬 How to get in touch\n\nJust ask away, or tap one of the quick-reply chips below!"
    },
    {
        keywords: ['portfolio', 'porfolio', 'portfolo', 'portolio', 'website', 'site', 'page', 'web', 'this'],
        response: "This portfolio is Bryan's **professional AI showcase**, built entirely with HTML, CSS, and JavaScript. It features:\n\n* 🏠 **Hero Section** — Animated typewriter intro with holographic ring visual\n* 👤 **About (Core Directives)** — 12+ years experience overview with key stats\n* ⚙️ **Skills (Engineering Matrix)** — Languages & Systems, AI & Automation, Leadership\n* 📅 **Experience (Execution Timeline)** — Interactive timeline with Walmart, Ingeniería de Bombas, and Francisco de Miranda Park\n* 🚀 **Projects (Compiled Outputs)** — Scrollable carousel of 4 projects including Interactive Games, AI Apps & more\n* 📱 **Apps Gallery** — 6 fully functional apps (AI Chatbox, ArtVault, BookNest, Chronos Elegance, Clock, PlanFlow)\n* 📬 **Contact (Open Port)** — Contact form for inquiries\n* 🤖 **AI Chat Widget** — This chatbot you're using right now!\n\nThe entire site uses a dark theme with glassmorphism, cyan/purple accents, and a particle canvas background."
    },
    {
        keywords: ['what can', 'help', 'what do you', 'can you', 'your purpose', 'what are you', 'options', 'menu'],
        response: "I'm Bryan's AI-powered portfolio assistant! Here's what I can help you with:\n\n* 💼 **Experience** — Bryan's 12+ year career history across 3 companies\n* ⚙️ **Tech Stack** — His programming languages, AI tools, and frameworks\n* 🧠 **AI Skills** — Generative AI, Prompt Engineering, AI Agent Automation\n* 🚀 **Portfolio Projects** — 4 showcase projects (Games, Apps, AI Assistant, Designer)\n* 📱 **Apps Gallery** — 6 live apps built from scratch\n* 🎓 **Education & Certifications** — Penn Foster, Outskill, Google\n* 🎯 **Fun Facts & Hobbies** — Gaming, outdoors, cooking, travel\n* 📬 **Contact Info** — How to reach Bryan\n* 🎨 **Design & Theme** — How this portfolio was built\n\nJust type any question or use the quick-reply chips!"
    },
    {
        keywords: ['project', 'projects', 'built', 'showcase', 'compiled', 'output'],
        response: "Bryan's portfolio showcases **4 projects**:\n\n* 🎨 **Product Designer Showcase** — Curated portfolio layouts for product designers with UX case studies (HTML/CSS, GenAI, Templates)\n* 🎮 **Interactive Games** — Game development projects exploring mechanics, system design, and real-time gameplay (JavaScript, HTML5 Canvas)\n* 📱 **Apps Showcase** — Collection of modular web applications exploring complex UI patterns (JavaScript, HTML/CSS, UX/UI)\n* 🤖 **AI-Powered Applications** — 4 intelligent apps: AI Chatbox (conversational assistant), AI Text Summarizer (summaries/key points/translation), AI Quiz Generator (topic-based quizzes), AI Mood Journal (sentiment tracking) — all powered by Gemini AI\n\nEach project demonstrates different aspects of Bryan's engineering capabilities!"
    },
    {
        keywords: ['app', 'apps', 'application', 'applications', 'gallery'],
        response: "Bryan's **Apps Gallery** includes 6 fully functional web applications:\n\n* 🤖 **AI Chatbox** — This conversational AI assistant powered by Gemini, with multi-turn context and smart fallbacks\n* 🎨 **ArtVault** — A curated art gallery application for visual browsing\n* 📚 **BookNest** — A book discovery and management application\n* ⏰ **Chronos Elegance** — A premium clock/stopwatch/timer app with multiple themes, alarms, and display modes\n* 🕐 **Clock App** — A clean, minimal clock application\n* 📋 **PlanFlow** — A task/project planning and workflow management application\n\nAll apps feature modern dark themes, smooth animations, and responsive designs!"
    },
    {
        keywords: ['skill', 'skills', 'abilities', 'capable', 'matrix', 'engineering'],
        response: "Bryan's skills are organized into three categories:\n\n* ⚙️ **Languages & Systems:** HTML/CSS/JS, Python, WordPress/CMS/SaaS, SQL & Database Admin, System Administration\n* 🧠 **AI & Automation:** Generative AI (LLMs), AI Engineering, Prompt Engineering, AI Agent Process Automation\n* 🌐 **Leadership & Skills:** Project Management, Team Leadership, Strategic Problem Solving, Cross-Cultural Communication (EN/ES)\n\nHe has 12+ years of experience, is fully bilingual (English/Spanish), and has completed 10+ projects."
    },
    {
        keywords: ['about', 'who', 'bryan', 'introduce', 'bio', 'himself', 'background', 'summary'],
        response: "Bryan Marquez is a **Software Engineer** with 12+ years of experience managing complex databases and automating critical workflows. After leading technical teams as a **Technical Lead** in Venezuela, he relocated to the **United States** to leverage his expertise in a high-growth environment.\n\nToday, he specializes in **Artificial Intelligence and Evolving System Development** using Python, leveraging a versatile stack including SQL, WordPress, and HTML/CSS/JS. By integrating **Generative AI and LLMs** with his engineering foundation — backed by Outskill's Gen AI Masterminds credentials — he creates smart, automated systems that are efficient and accessible.\n\nHe's fully bilingual (EN 🇺🇸 / ES 🇪🇸) and has completed 10+ professional projects."
    },
    {
        keywords: ['design', 'theme', 'color', 'look', 'aesthetic', 'style', 'dark', 'glow'],
        response: "The portfolio uses a premium **dark theme** with cutting-edge design:\n\n* 🌑 **Color palette:** Deep dark backgrounds (#0a0a0f) with cyan (#00f0ff) and purple (#bd00ff) accents\n* ✨ **Glassmorphism** — Frosted-glass cards with subtle transparency and blur effects\n* 🎆 **Particle canvas** — Animated neural-network-style connected dots in the background\n* 💫 **Animations** — Typewriter hero text, smooth fade-ins, holographic ring visual, glow effects\n* 🔤 **Typography** — Space Grotesk font for a modern, tech-forward feel\n* 📱 **Responsive** — Fully optimized for all screen sizes"
    },
    {
        keywords: ['made', 'build', 'how', 'create', 'developed', 'technology', 'framework'],
        response: "This portfolio was built with a clean, modern stack:\n\n* **Frontend:** Vanilla HTML5, CSS3, and JavaScript — no heavy frameworks\n* **AI Backend:** Gemini 2.0 Flash API via direct REST calls\n* **Design System:** Custom CSS with CSS variables, glassmorphism, and responsive grid\n* **Animations:** Pure CSS animations + JavaScript canvas for the particle background\n* **Chat System:** Custom-built chat widget and standalone chatbox app with TTS support\n* **Hosting:** Can be served by any static file server\n\nBryan built everything from scratch to demonstrate his full-stack engineering capabilities!"
    }
];

const GENERIC_FALLBACK = "Thanks for your question! While I'm having a brief connection issue with my AI brain, here's what I can tell you: Bryan is a **Software Engineer with 12+ years of experience**, specializing in **Python, Generative AI, and Process Automation**. Feel free to ask about his experience, skills, projects, apps, portfolio, hobbies, or how to contact him — I have pre-loaded answers ready! 🚀";

// ─── State ──────────────────────────────────────────
let messages = [];
let conversationHistory = [];
let isWaitingForResponse = false;
let voiceEnabled = false;
let fallbackIndex = 0;

// ─── DOM References ─────────────────────────────────
const chatMessages = document.getElementById('chat-messages');
const typingIndicator = document.getElementById('typing-indicator');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const clearChatBtn = document.getElementById('clear-chat');
const voiceToggle = document.getElementById('voice-toggle');
const avatarOrb = document.getElementById('avatar-orb');
const statusText = document.getElementById('status-text');
const quickRepliesBar = document.getElementById('quick-replies-bar');


// ─── Prefab Answer Matcher ──────────────────────────
function getPrefabAnswer(userInput) {
    const input = userInput.toLowerCase();
    let bestMatch = null;
    let bestScore = 0;

    for (const entry of PREFAB_ANSWERS) {
        let score = 0;
        for (const keyword of entry.keywords) {
            if (input.includes(keyword)) {
                score++;
            }
        }
        if (score > bestScore) {
            bestScore = score;
            bestMatch = entry;
        }
    }

    return bestMatch ? bestMatch.response : GENERIC_FALLBACK;
}


// ─── Initialization ─────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initAmbientCanvas();
    showWelcome();
    bindEvents();
});


// ─── Event Bindings ─────────────────────────────────
function bindEvents() {
    sendBtn.addEventListener('click', handleSend);

    messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    });

    clearChatBtn.addEventListener('click', clearChat);

    voiceToggle.addEventListener('click', () => {
        voiceEnabled = !voiceEnabled;
        voiceToggle.classList.toggle('active', voiceEnabled);
        if (!voiceEnabled && window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
    });

    // Quick reply chips
    quickRepliesBar.addEventListener('click', (e) => {
        const chip = e.target.closest('.chip');
        if (chip && !isWaitingForResponse) {
            const prompt = chip.dataset.prompt;
            messageInput.value = prompt;
            handleSend();
        }
    });
}


// ─── Send Handler (Direct Gemini API) ───────────────
async function handleSend() {
    const text = messageInput.value.trim();
    if (!text || isWaitingForResponse) return;

    // Add user message
    addMessage('user', text);
    messageInput.value = '';
    messageInput.focus();

    // Track conversation for multi-turn context
    conversationHistory.push({ role: 'user', parts: [{ text: text }] });

    // Show typing
    isWaitingForResponse = true;
    showTyping();

    try {
        const requestBody = {
            system_instruction: {
                parts: [{ text: SYSTEM_PROMPT }]
            },
            contents: conversationHistory,
            generationConfig: {
                temperature: 0.7,
                topP: 0.9,
                maxOutputTokens: 1024
            }
        };

        const response = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(`Gemini API ${response.status}: ${errData.error?.message || 'Unknown error'}`);
        }

        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text
            || "I received your message but couldn't generate a response. Try again!";

        // Track assistant reply in conversation history
        conversationHistory.push({ role: 'model', parts: [{ text: reply }] });

        hideTyping();
        addMessage('bot', reply);
        speakText(stripMarkdown(reply));

    } catch (err) {
        console.error('Gemini API Error:', err);
        hideTyping();
        const fallback = getPrefabAnswer(text);
        addMessage('bot', fallback);
        speakText(stripMarkdown(fallback));
    }

    isWaitingForResponse = false;
}


// ─── Message Rendering ─────────────────────────────
function addMessage(sender, text) {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    messages.push({ sender, text, time: timeStr });

    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';

    if (sender === 'bot') {
        bubble.innerHTML = renderMarkdown(text);
    } else {
        bubble.textContent = text;
    }

    const time = document.createElement('div');
    time.className = 'msg-time';
    time.textContent = timeStr;

    msgDiv.appendChild(bubble);
    msgDiv.appendChild(time);

    // Insert before typing indicator
    chatMessages.insertBefore(msgDiv, typingIndicator);
    scrollToBottom();
}

function showWelcome() {
    const welcomeDiv = document.createElement('div');
    welcomeDiv.className = 'message bot';
    welcomeDiv.innerHTML = `
        <div class="welcome-card">
            <h2>${GREETING.welcome}</h2>
            <p>${GREETING.subtitle}</p>
        </div>
        <div class="msg-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
    `;
    chatMessages.insertBefore(welcomeDiv, typingIndicator);
    scrollToBottom();
}


// ─── Typing Indicator ───────────────────────────────
function showTyping() {
    setAvatarState('thinking');
    statusText.textContent = 'Thinking...';
    typingIndicator.classList.add('visible');
    scrollToBottom();
}

function hideTyping() {
    setAvatarState('');
    statusText.textContent = 'Online — Ready';
    typingIndicator.classList.remove('visible');
}


// ─── Avatar State ───────────────────────────────────
function setAvatarState(state) {
    avatarOrb.className = 'avatar-orb' + (state ? ` ${state}` : '');
}


// ─── Clear Chat ─────────────────────────────────────
function clearChat() {
    const allMessages = chatMessages.querySelectorAll('.message');
    allMessages.forEach(m => m.remove());
    messages = [];
    conversationHistory = [];

    if (window.speechSynthesis) window.speechSynthesis.cancel();

    showWelcome();
}


// ─── TTS (Text-to-Speech) ───────────────────────────
function speakText(text) {
    if (!voiceEnabled || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onstart = () => setAvatarState('speaking');
    utterance.onend = () => setAvatarState('');

    window.speechSynthesis.speak(utterance);
}

function stripMarkdown(text) {
    return text
        .replace(/\*\*(.+?)\*\*/g, '$1')
        .replace(/\*(.+?)\*/g, '$1')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/^[\*\-]\s+/gm, '')
        .replace(/#{1,6}\s+/g, '');
}


// ─── Markdown Renderer (Lightweight) ────────────────
function renderMarkdown(text) {
    let html = escapeHtml(text);

    // Bold: **text**
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Italic: *text*
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Inline code: `code`
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Unordered list items: * item or - item (at line start)
    html = html.replace(/^[\*\-]\s+(.+)$/gm, '<li>$1</li>');

    // Wrap consecutive <li> in <ul>
    html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');

    // Paragraphs: double newlines
    html = html.replace(/\n{2,}/g, '</p><p>');

    // Single newlines to <br>
    html = html.replace(/\n/g, '<br>');

    // Wrap in paragraph
    html = '<p>' + html + '</p>';

    // Clean up empty paragraphs
    html = html.replace(/<p>\s*<\/p>/g, '');

    return html;
}

function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}


// ─── Scroll Helper ──────────────────────────────────
function scrollToBottom() {
    requestAnimationFrame(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });
}


// ─── Ambient Canvas Background ──────────────────────
function initAmbientCanvas() {
    const canvas = document.getElementById('ambient-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    const particles = [];
    const PARTICLE_COUNT = 50;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            radius: Math.random() * 1.5 + 0.5,
            alpha: Math.random() * 0.4 + 0.1,
            color: Math.random() > 0.5 ? '0, 240, 255' : '189, 0, 255'
        };
    }

    function init() {
        resize();
        particles.length = 0;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(createParticle());
        }
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        for (const p of particles) {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
            ctx.fill();
        }

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    const alpha = (1 - dist / 120) * 0.08;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    init();
    draw();
}
