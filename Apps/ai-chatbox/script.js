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

// ─── State ──────────────────────────────────────────
let messages = [];
let conversationHistory = [];
let isWaitingForResponse = false;
let voiceEnabled = false;
let currentLang = localStorage.getItem('portfolio-lang') || 'en';

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

// ─── Intent-based Fallback (replaces PREFAB_ANSWERS) ────
function getPrefabAnswer(userInput) {
    const detected = detectIntent(userInput);
    return getRandomResponse(detected.id, currentLang) || "I'm Bryan's AI assistant. Ask me about his experience, skills, AI work, or projects!";
}

function getIntentSuggestions(userInput) {
    const detected = detectIntent(userInput);
    return getSuggestions(detected.id);
}


// ─── Initialization ─────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initAmbientCanvas();
    showWelcome();
    bindEvents();
});


// ─── Event Bindings ─────────────────────────────────
function bindEvents() {
    // Translate UI based on currentLang
    const dictUI = {
        en: { place: "Ask me anything about Bryan...", stat: "Online — Ready", dis: "Powered by GenAI · Responses may not always be accurate" },
        es: { place: "Pregúntame sobre Bryan...", stat: "En línea", dis: "Impulsado por GenAI · Respuestas pueden no ser exactas" },
        pt: { place: "Pergunte algo sobre Bryan...", stat: "Online", dis: "Desenvolvido por GenAI" },
        de: { place: "Fragen Sie mich nach Bryan...", stat: "Online", dis: "Unterstützt durch GenAI" },
        fr: { place: "Demandez-moi sur Bryan...", stat: "En ligne", dis: "Propulsé par GenAI" },
        ja: { place: "Bryanについて何でも聞いてください...", stat: "オンライン", dis: "GenAI 搭載" },
        ko: { place: "Bryan에 대해 무엇이든 물어보세요...", stat: "온라인", dis: "GenAI 기반" },
        zh: { place: "问我关于 Bryan 的问题...", stat: "在线", dis: "由 GenAI 提供支持" },
        ar: { place: "اسألني أي شيء عن برايان...", stat: "متصل", dis: "مشغل بواسطة GenAI" },
        hi: { place: "ब्रायन के बारे में कुछ भी पूछें...", stat: "ऑनलाइन", dis: "GenAI द्वारा संचालित" },
        he: { place: "שאל אותי משהו על בריאן...", stat: "מחובר", dis: "מופעל ע״י GenAI" }
    };
    const langDict = dictUI[currentLang] || dictUI['en'];
    messageInput.placeholder = langDict.place;
    statusText.textContent = langDict.stat;
    const disclaimer = document.querySelector('.disclaimer');
    if (disclaimer) disclaimer.textContent = langDict.dis;
    
    // Update Quick Reply Chips from intent engine
    const qrMap = { 'exp': 'experience', 'tech': 'skills', 'ai': 'ai', 'fun': 'smalltalk', 'contact': 'contact' };
    document.querySelectorAll('.chip').forEach(chip => {
        const cat = chip.dataset.cat;
        if (qrMap[cat] && quickReplyIntents[qrMap[cat]] && quickReplyIntents[qrMap[cat]][currentLang]) {
            chip.textContent = quickReplyIntents[qrMap[cat]][currentLang];
        }
    });

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

    // Intent-based quick-reply routing
    const quickReplyIntentMap = {
        'exp': 'experience',
        'tech': 'skills',
        'ai': 'ai',
        'fun': 'smalltalk',
        'contact': 'contact'
    };

    // Rotating prompts for Gemini (keeps variety when API is available)
    const rotatingPrompts = {
        'exp': [
            "Tell me about Bryan's work experience.",
            "Could you detail Bryan's roles at Walmart and Ingeniería de Bombas?",
            "What were Bryan's biggest achievements as a Technical Lead?",
            "Summarize Bryan's 12+ years of professional experience."
        ],
        'tech': [
            "What is Bryan's primary programming tech stack?",
            "Which programming languages and frameworks does Bryan master?",
            "Tell me about Bryan's software engineering skills.",
            "How does Bryan build software architecture?"
        ],
        'ai': [
            "What are Bryan's specific AI skills?",
            "Tell me about Bryan's experience with Generative AI and Prompt Engineering.",
            "What AI certifications does Bryan hold?",
            "How does Bryan use AI for workflow automation?"
        ],
        'fun': [
            "Tell me a fun fact about Bryan.",
            "What are Bryan's hobbies outside of coding?",
            "What games does Bryan like to play?",
            "Share something interesting about Bryan's life in Florida."
        ],
        'contact': [
            "How can I get in touch with Bryan?",
            "What's the best way for a recruiter to reach Bryan?",
            "Can you provide Bryan's contact or LinkedIn details?",
            "I'd like to hire Bryan. How do I contact him?"
        ]
    };

    const promptIndices = { exp: 0, tech: 0, ai: 0, fun: 0, contact: 0 };

    quickRepliesBar.addEventListener('click', (e) => {
        const chip = e.target.closest('.chip');
        if (chip && !isWaitingForResponse) {
            const cat = chip.dataset.cat;
            if (cat && rotatingPrompts[cat]) {
                const arr = rotatingPrompts[cat];
                const prompt = arr[promptIndices[cat] % arr.length];
                promptIndices[cat] = (promptIndices[cat] + 1) % arr.length;
                messageInput.value = prompt;
            } else if (chip.dataset.prompt) {
                messageInput.value = chip.dataset.prompt;
            }

            // Intercept Contact chip to inject form directly
            if (cat === 'contact') {
                const text = messageInput.value || "How can I get in touch with Bryan?";
                messageInput.value = '';
                addMessage('user', text);
                conversationHistory.push({ role: 'user', parts: [{ text: text }] });

                isWaitingForResponse = true;
                showTyping();

                setTimeout(() => {
                    hideTyping();
                    const introMsg = getRandomResponse('contact', currentLang) || "You can reach Bryan right here! Leave your name, email, and a short message below.";
                    conversationHistory.push({ role: 'model', parts: [{ text: introMsg }] });
                    addMessage('bot', introMsg, true);
                    speakText(introMsg);
                    isWaitingForResponse = false;
                }, 800);
                return;
            }

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
        const dynamicPrompt = SYSTEM_PROMPT + "\\nCRITICAL RULE: You MUST answer strictly in the language corresponding to language code '" + currentLang + "'. Adapt any technical terms professionally.";
        
        const requestBody = {
            system_instruction: { parts: [{ text: dynamicPrompt }] },

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
        // Add suggestion chips even on Gemini responses
        const intentSuggestions = getIntentSuggestions(text);
        addMessage('bot', reply, false, intentSuggestions);
        speakText(stripMarkdown(reply));

    } catch (err) {
        console.error('Gemini API Error:', err);
        hideTyping();
        const fallback = getPrefabAnswer(text);
        const intentSuggestions = getIntentSuggestions(text);
        addMessage('bot', fallback, false, intentSuggestions);
        speakText(stripMarkdown(fallback));
    }

    isWaitingForResponse = false;
}


// ─── Message Rendering ─────────────────────────────
function addMessage(sender, text, includeForm = false, intentSuggestions = []) {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    messages.push({ sender, text, time: timeStr });

    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';

    if (sender === 'bot') {
        bubble.innerHTML = renderMarkdown(text);

        if (includeForm) {
            bubble.innerHTML += `
               <form class="chat-form" onsubmit="submitStandaloneForm(event, this)">
                    <input type="text" name="name" placeholder="Your Name" required />
                    <input type="email" name="email" placeholder="Your Email" required />
                    <textarea name="message" rows="3" placeholder="Message Payload" required></textarea>
                    <button type="submit" name="submitBtn">Transmit Data</button>
               </form>
            `;
        }

        // Add inline suggestion chips
        if (intentSuggestions && intentSuggestions.length > 0) {
            let chipsHtml = '<div class="suggestion-chips" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;">';
            for (const sId of intentSuggestions) {
                const label = suggestionLabels[sId];
                if (label) {
                    chipsHtml += `<button class="chip suggestion-chip" onclick="handleSuggestionChip('${sId}')" style="font-size:0.72rem;padding:4px 10px;">${label.en}</button>`;
                }
            }
            chipsHtml += '</div>';
            bubble.innerHTML += chipsHtml;
        }
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

// Handle suggestion chip clicks
window.handleSuggestionChip = function(intentId) {
    const label = suggestionLabels[intentId] ? suggestionLabels[intentId].en : intentId;
    addMessage('user', label);
    conversationHistory.push({ role: 'user', parts: [{ text: label }] });

    isWaitingForResponse = true;
    showTyping();

    setTimeout(() => {
        hideTyping();
        if (shouldTriggerForm(intentId)) {
            const introMsg = getRandomResponse('contact', currentLang) || "Leave your details below!";
            conversationHistory.push({ role: 'model', parts: [{ text: introMsg }] });
            addMessage('bot', introMsg, true);
            speakText(introMsg);
        } else {
            const reply = getRandomResponse(intentId, currentLang);
            const suggestions = getSuggestions(intentId);
            conversationHistory.push({ role: 'model', parts: [{ text: reply }] });
            addMessage('bot', reply, false, suggestions);
            speakText(stripMarkdown(reply));
        }
        isWaitingForResponse = false;
    }, 600 + Math.random() * 400);
};

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
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Try softer, more natural voice
    const bestVoice = pickBestVoice('en');
    if (bestVoice) utterance.voice = bestVoice;

    utterance.onstart = () => setAvatarState('speaking');
    utterance.onend = () => setAvatarState('');

    window.speechSynthesis.speak(utterance);
}

// Pre-load voices
if (window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = () => { /* voices now available */ };
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


// ─── Contact Form Logic ─────────────────────────────
window.submitStandaloneForm = async function(e, form) {
    e.preventDefault();
    const name = form.elements['name'].value;
    const email = form.elements['email'].value;
    const message = form.elements['message'].value;
    const btn = form.elements['submitBtn'];

    const originalBtnText = btn.textContent;
    btn.textContent = 'Transmitting...';
    btn.disabled = true;

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message, source: 'Standalone Chatbox' })
        });

        if (response.ok) {
            form.innerHTML = '<div style="color:var(--accent-cyan); font-weight:bold; margin-top: 10px; border-top: 1px solid rgba(0,240,255,0.2); padding-top: 10px;">Transmission Successful! Bryan will review this shortly.</div>';
        } else {
            btn.textContent = 'Failed. Try again';
            btn.disabled = false;
        }
    } catch (err) {
        btn.textContent = 'Network error';
        btn.disabled = false;
    }
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
