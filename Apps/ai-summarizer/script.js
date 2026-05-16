// ─── AI Text Summarizer — Script ───
const GEMINI_KEY = 'AIzaSyCUak8HGP8F8aHWaAkE2CknF4bOHPBwYjE';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`;

// ─── DOM ───
const inputText = document.getElementById('input-text');
const charCount = document.getElementById('char-count');
const outputContent = document.getElementById('output-content');
const submitBtn = document.getElementById('submit-btn');
const clearBtn = document.getElementById('clear-btn');
const copyBtn = document.getElementById('copy-btn');
const loading = document.getElementById('loading');
const modeBtns = document.querySelectorAll('.mode-btn');

let currentMode = 'summarize';
let lastResult = '';

// ─── Mode Selection ───
modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentMode = btn.dataset.mode;
    });
});

// ─── Character Count ───
inputText.addEventListener('input', () => {
    charCount.textContent = `${inputText.value.length} characters`;
});

// ─── Clear ───
clearBtn.addEventListener('click', () => {
    inputText.value = '';
    charCount.textContent = '0 characters';
    outputContent.innerHTML = `<div class="placeholder-msg"><span class="placeholder-icon">✨</span><p>Your AI-generated result will appear here</p></div>`;
    lastResult = '';
});

// ─── Copy ───
copyBtn.addEventListener('click', () => {
    if (!lastResult) return;
    navigator.clipboard.writeText(lastResult).then(() => {
        copyBtn.textContent = '✅ Copied!';
        setTimeout(() => copyBtn.textContent = '📋 Copy', 2000);
    });
});

// ─── Prompts by Mode ───
function getPrompt(text) {
    switch (currentMode) {
        case 'summarize':
            return `Summarize the following text in a clear, concise way. Keep it under 150 words. Use markdown formatting with bold for key terms:\n\n${text}`;
        case 'keypoints':
            return `Extract the key points from the following text. Return them as a bullet-point list (use * for bullets). Bold the most important terms. Maximum 7 key points:\n\n${text}`;
        case 'translate':
            return `Detect the language of the following text. If it's in English, translate it to Spanish. If it's in Spanish, translate it to English. If it's another language, translate to English. Format the response as:\n**Original Language:** [language]\n**Translation:**\n[translated text]\n\nText:\n${text}`;
        default:
            return `Summarize: ${text}`;
    }
}

// ─── Prefab Fallbacks ───
function getPrefab(text, mode) {
    const lower = text.toLowerCase();
    if (mode === 'translate') {
        const hasSpanish = /[áéíóúñ¿¡]/.test(text) || lower.includes(' es ') || lower.includes(' de ') || lower.includes(' el ') || lower.includes(' la ');
        if (hasSpanish) {
            return "**Original Language:** Spanish\n**Translation:**\nI detected Spanish text but I'm currently unable to connect to the AI translation service. Please try again in a moment, or use the summarize/key points mode instead!";
        }
        return "**Original Language:** English\n**Translation:**\nDetecté texto en inglés pero actualmente no puedo conectarme al servicio de traducción de IA. ¡Por favor, inténtalo de nuevo en un momento o usa el modo de resumen/puntos clave!";
    }
    if (mode === 'keypoints') {
        const words = text.split(/\s+/);
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
        const points = sentences.slice(0, 5).map(s => `* **${s.trim().split(' ').slice(0, 3).join(' ')}** — ${s.trim()}`);
        if (points.length > 0) return points.join('\n');
        return `* The text contains **${words.length} words** across multiple ideas\n* Key themes appear to involve the topics mentioned\n* AI analysis is temporarily unavailable — please try again shortly`;
    }
    // summarize fallback
    const words = text.split(/\s+/);
    const preview = words.slice(0, 30).join(' ');
    return `**Summary** (AI offline — basic preview):\n\nThe provided text contains **${words.length} words**. It begins with: "${preview}..."\n\nFor a full AI-powered summary, please try again in a moment when the connection is restored.`;
}

// ─── Submit ───
submitBtn.addEventListener('click', async () => {
    const text = inputText.value.trim();
    if (!text) {
        outputContent.innerHTML = `<div class="placeholder-msg"><span class="placeholder-icon">⚠️</span><p>Please enter some text to analyze</p></div>`;
        return;
    }

    loading.classList.remove('hidden');
    submitBtn.disabled = true;

    try {
        const response = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ role: 'user', parts: [{ text: getPrompt(text) }] }],
                generationConfig: { temperature: 0.5, maxOutputTokens: 1024 }
            })
        });

        if (!response.ok) throw new Error(`API ${response.status}`);

        const data = await response.json();
        lastResult = data.candidates?.[0]?.content?.parts?.[0]?.text || getPrefab(text, currentMode);
    } catch (err) {
        console.error('Summarizer API Error:', err);
        lastResult = getPrefab(text, currentMode);
    }

    // Render markdown-like formatting
    let html = lastResult
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/^\* (.+)$/gm, '<li>$1</li>')
        .replace(/\n/g, '<br>');
    if (html.includes('<li>')) html = `<ul>${html}</ul>`;

    outputContent.innerHTML = html;
    loading.classList.add('hidden');
    submitBtn.disabled = false;
});

// ─── Particle Canvas ───
(function () {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let w, h, particles = [];
    function resize() { w = canvas.width = innerWidth; h = canvas.height = innerHeight; }
    window.addEventListener('resize', resize); resize();
    class P {
        constructor() { this.x = Math.random() * w; this.y = Math.random() * h; this.vx = (Math.random() - 0.5) * 0.4; this.vy = (Math.random() - 0.5) * 0.4; this.r = Math.random() * 1.5 + 0.5; }
        update() { this.x += this.vx; this.y += this.vy; if (this.x < 0 || this.x > w) this.vx *= -1; if (this.y < 0 || this.y > h) this.vy *= -1; }
        draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fillStyle = 'rgba(0,240,255,0.4)'; ctx.fill(); }
    }
    for (let i = 0; i < Math.floor(w * h / 20000); i++) particles.push(new P());
    (function animate() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach((p, i) => { p.update(); p.draw(); for (let j = i + 1; j < particles.length; j++) { const dx = p.x - particles[j].x, dy = p.y - particles[j].y, d = Math.sqrt(dx * dx + dy * dy); if (d < 100) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(particles[j].x, particles[j].y); ctx.strokeStyle = `rgba(189,0,255,${(1 - d / 100) * 0.15})`; ctx.stroke(); } } });
        requestAnimationFrame(animate);
    })();
})();
