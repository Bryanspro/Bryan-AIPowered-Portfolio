// ─── AI Mood Journal — Script ───
const GEMINI_KEY = 'AIzaSyCEDIoVJhOzzapf4p2TD601nhapJyhvz9Q';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`;

const STORAGE_KEY = 'bryan-ai-mood-journal';

// ─── Mood Config ───
const MOOD_MAP = {
    great: { emoji: '😄', label: 'Great', score: 5, color: '#00e676' },
    good: { emoji: '🙂', label: 'Good', score: 4, color: '#69f0ae' },
    neutral: { emoji: '😐', label: 'Neutral', score: 3, color: '#ffd740' },
    sad: { emoji: '😔', label: 'Sad', score: 2, color: '#ff8a65' },
    stressed: { emoji: '😰', label: 'Stressed', score: 1, color: '#ff5252' }
};

// ─── DOM ───
const journalInput = document.getElementById('journal-input');
const saveBtn = document.getElementById('save-btn');
const aiAnalysis = document.getElementById('ai-analysis');
const analysisContent = document.getElementById('analysis-content');
const dateDisplay = document.getElementById('date-display');
const loading = document.getElementById('loading');
const entriesList = document.getElementById('entries-list');
const chartRow = document.getElementById('chart-row');
const totalEntries = document.getElementById('total-entries');
const avgMood = document.getElementById('avg-mood');
const streakCount = document.getElementById('streak-count');
const clearHistoryBtn = document.getElementById('clear-history-btn');
const moodEmojis = document.querySelectorAll('.mood-emoji');

let selectedMood = null;
let entries = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

// ─── Init ───
dateDisplay.textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

// ─── Mood Picker ───
moodEmojis.forEach(btn => {
    btn.addEventListener('click', () => {
        moodEmojis.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedMood = btn.dataset.mood;
    });
});

// ─── Sentiment Analysis via AI ───
async function analyzeMood(text) {
    try {
        const prompt = `Analyze the mood and sentiment of this journal entry. Return a brief (2-3 sentence) empathetic analysis. Include:
1. The detected mood (one word: great/good/neutral/sad/stressed)
2. A supportive observation
3. A gentle suggestion or affirmation

Format: **Mood: [mood]** — [analysis]

Journal entry: "${text}"`;

        const response = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
                generationConfig: { temperature: 0.7, maxOutputTokens: 256 }
            })
        });

        if (!response.ok) throw new Error(`API ${response.status}`);

        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

        // Extract mood from AI response
        const moodMatch = reply.match(/mood:\s*(great|good|neutral|sad|stressed)/i);
        const detectedMood = moodMatch ? moodMatch[1].toLowerCase() : null;

        return { analysis: reply, detectedMood };

    } catch (err) {
        console.error('Mood API Error:', err);
        return getPrefabAnalysis(text);
    }
}

// ─── Prefab Fallback ───
function getPrefabAnalysis(text) {
    const lower = text.toLowerCase();
    const positive = ['happy', 'great', 'awesome', 'love', 'excited', 'wonderful', 'amazing', 'good', 'fantastic', 'joy', 'grateful', 'blessed'];
    const negative = ['sad', 'angry', 'frustrated', 'tired', 'stressed', 'anxious', 'worried', 'overwhelmed', 'bad', 'terrible', 'upset', 'hate'];
    const neutral = ['okay', 'fine', 'normal', 'regular', 'usual', 'nothing', 'same'];

    let posScore = 0, negScore = 0, neuScore = 0;
    positive.forEach(w => { if (lower.includes(w)) posScore++; });
    negative.forEach(w => { if (lower.includes(w)) negScore++; });
    neutral.forEach(w => { if (lower.includes(w)) neuScore++; });

    let mood, analysis;
    if (posScore > negScore && posScore > neuScore) {
        mood = posScore >= 3 ? 'great' : 'good';
        analysis = `**Mood: ${mood === 'great' ? 'Great' : 'Good'}** — Your entry radiates positive energy! It's wonderful that you're experiencing these good feelings. Keep nurturing what brings you joy — you deserve it! 🌟`;
    } else if (negScore > posScore) {
        mood = negScore >= 3 ? 'stressed' : 'sad';
        analysis = `**Mood: ${mood === 'stressed' ? 'Stressed' : 'Sad'}** — It sounds like you're going through a tough time. Remember that these feelings are valid and temporary. Consider taking a short break, going for a walk, or talking to someone you trust. 💙`;
    } else {
        mood = 'neutral';
        analysis = `**Mood: Neutral** — Your entry has a balanced, steady tone. Sometimes being in a neutral state is perfectly okay — it can be a moment of calm before excitement. Take this stability as a foundation to build on! ✨`;
    }

    return { analysis, detectedMood: mood };
}

// ─── Save Entry ───
saveBtn.addEventListener('click', async () => {
    const text = journalInput.value.trim();
    if (!text) { journalInput.style.borderColor = '#ff5252'; setTimeout(() => journalInput.style.borderColor = '', 2000); return; }

    loading.classList.remove('hidden');

    const { analysis, detectedMood } = await analyzeMood(text);
    const finalMood = selectedMood || detectedMood || 'neutral';

    const entry = {
        id: Date.now(),
        date: new Date().toISOString(),
        text: text,
        mood: finalMood,
        analysis: analysis
    };

    entries.unshift(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));

    // Show analysis
    let html = analysis
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');
    analysisContent.innerHTML = html;
    aiAnalysis.classList.remove('hidden');

    // Reset
    journalInput.value = '';
    selectedMood = null;
    moodEmojis.forEach(b => b.classList.remove('selected'));

    loading.classList.add('hidden');
    renderHistory();
    renderChart();
    renderStats();
});

// ─── Render History ───
function renderHistory() {
    if (entries.length === 0) {
        entriesList.innerHTML = '<p class="empty-msg">No entries yet. Start writing!</p>';
        return;
    }

    entriesList.innerHTML = '';
    entries.slice(0, 15).forEach(entry => {
        const moodInfo = MOOD_MAP[entry.mood] || MOOD_MAP.neutral;
        const date = new Date(entry.date);
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

        const div = document.createElement('div');
        div.className = 'entry-item';
        div.innerHTML = `
            <span class="entry-mood">${moodInfo.emoji}</span>
            <div class="entry-details">
                <div class="entry-date">${dateStr}</div>
                <div class="entry-preview">${entry.text}</div>
                <div class="entry-sentiment">Mood: ${moodInfo.label}</div>
            </div>
        `;
        entriesList.appendChild(div);
    });
}

// ─── Render Chart ───
function renderChart() {
    chartRow.innerHTML = '';
    const last7 = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dayStr = d.toISOString().split('T')[0];

        const dayEntries = entries.filter(e => e.date.split('T')[0] === dayStr);
        if (dayEntries.length > 0) {
            const avgScore = dayEntries.reduce((sum, e) => sum + (MOOD_MAP[e.mood]?.score || 3), 0) / dayEntries.length;
            last7.push({ score: avgScore, date: d, count: dayEntries.length });
        } else {
            last7.push({ score: 0, date: d, count: 0 });
        }
    }

    last7.forEach(day => {
        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        const pct = day.count > 0 ? (day.score / 5) * 100 : 8;
        bar.style.height = `${pct}%`;

        let color = 'rgba(255,255,255,0.1)';
        if (day.count > 0) {
            if (day.score >= 4.5) color = MOOD_MAP.great.color;
            else if (day.score >= 3.5) color = MOOD_MAP.good.color;
            else if (day.score >= 2.5) color = MOOD_MAP.neutral.color;
            else if (day.score >= 1.5) color = MOOD_MAP.sad.color;
            else color = MOOD_MAP.stressed.color;
        }
        bar.style.background = color;

        const dayName = day.date.toLocaleDateString('en-US', { weekday: 'short' });
        bar.setAttribute('data-tooltip', day.count > 0 ? `${dayName}: ${day.score.toFixed(1)}/5` : `${dayName}: No entry`);

        chartRow.appendChild(bar);
    });
}

// ─── Render Stats ───
function renderStats() {
    totalEntries.textContent = entries.length;

    if (entries.length > 0) {
        const avg = entries.reduce((sum, e) => sum + (MOOD_MAP[e.mood]?.score || 3), 0) / entries.length;
        const moodKeys = Object.keys(MOOD_MAP);
        const closest = moodKeys.reduce((prev, curr) =>
            Math.abs(MOOD_MAP[curr].score - avg) < Math.abs(MOOD_MAP[prev].score - avg) ? curr : prev
        );
        avgMood.textContent = MOOD_MAP[closest].emoji;
    } else {
        avgMood.textContent = '—';
    }

    // Streak
    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    for (let i = 0; i < 365; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dayStr = d.toISOString().split('T')[0];
        if (entries.some(e => e.date.split('T')[0] === dayStr)) {
            streak++;
        } else {
            break;
        }
    }
    streakCount.textContent = streak;
}

// ─── Clear History ───
clearHistoryBtn.addEventListener('click', () => {
    if (confirm('Clear all journal entries? This cannot be undone.')) {
        entries = [];
        localStorage.removeItem(STORAGE_KEY);
        renderHistory();
        renderChart();
        renderStats();
        aiAnalysis.classList.add('hidden');
    }
});

// ─── Initial Render ───
renderHistory();
renderChart();
renderStats();

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
