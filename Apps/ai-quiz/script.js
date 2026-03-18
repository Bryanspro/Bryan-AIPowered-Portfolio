// ─── AI Quiz Generator — Script ───
const GEMINI_URL = '/api/chat';

// ─── DOM ───
const setupScreen = document.getElementById('setup-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const topicInput = document.getElementById('topic-input');
const startBtn = document.getElementById('start-btn');
const questionCounter = document.getElementById('question-counter');
const scoreDisplay = document.getElementById('score-display');
const timerFill = document.getElementById('timer-fill');
const questionText = document.getElementById('question-text');
const optionsGrid = document.getElementById('options-grid');
const nextBtn = document.getElementById('next-btn');
const retryBtn = document.getElementById('retry-btn');
const newBtn = document.getElementById('new-btn');
const loading = document.getElementById('loading');
const diffBtns = document.querySelectorAll('.diff-btn');

let currentDifficulty = 'easy';
let questions = [];
let currentQ = 0;
let score = 0;
let userAnswers = [];
let timerInterval = null;
let timeLeft = 20;
let currentTopic = '';

// ─── Difficulty ───
diffBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        diffBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentDifficulty = btn.dataset.diff;
    });
});

// ─── Show Screen ───
function showScreen(screen) {
    [setupScreen, quizScreen, resultsScreen].forEach(s => s.classList.add('hidden'));
    screen.classList.remove('hidden');
}

// ─── Prefab Quiz Data ───
function getPrefabQuiz(topic) {
    const t = topic.toLowerCase();
    if (t.includes('javascript') || t.includes('js') || t.includes('programming') || t.includes('code')) {
        return [
            { question: "What keyword is used to declare a constant in JavaScript?", options: ["var", "let", "const", "define"], correct: 2 },
            { question: "Which method converts a JSON string into a JavaScript object?", options: ["JSON.stringify()", "JSON.parse()", "JSON.convert()", "JSON.toObject()"], correct: 1 },
            { question: "What does 'DOM' stand for?", options: ["Document Object Model", "Data Object Method", "Digital Output Mode", "Document Oriented Markup"], correct: 0 },
            { question: "Which array method creates a new array with filtered elements?", options: [".map()", ".forEach()", ".filter()", ".reduce()"], correct: 2 },
            { question: "What is the output of typeof null in JavaScript?", options: ["'null'", "'undefined'", "'object'", "'boolean'"], correct: 2 }
        ];
    }
    if (t.includes('ai') || t.includes('artificial') || t.includes('machine') || t.includes('learning')) {
        return [
            { question: "What does 'LLM' stand for in AI?", options: ["Large Language Model", "Linear Learning Machine", "Logical Language Module", "Low-Level Memory"], correct: 0 },
            { question: "Which company developed the GPT series of models?", options: ["Google", "Meta", "OpenAI", "Microsoft"], correct: 2 },
            { question: "What is 'prompt engineering'?", options: ["Building AI hardware", "Designing inputs for AI models", "Training neural networks", "Debugging AI code"], correct: 1 },
            { question: "What type of AI model is commonly used for image generation?", options: ["RNN", "Diffusion Model", "Decision Tree", "K-Means"], correct: 1 },
            { question: "What is the Turing Test designed to evaluate?", options: ["Processing speed", "Memory capacity", "Machine intelligence", "Data accuracy"], correct: 2 }
        ];
    }
    // Generic fallback
    return [
        { question: `What is a key characteristic of ${topic}?`, options: ["It's purely theoretical", "It has real-world applications", "It only exists in fiction", "It was invented in 2024"], correct: 1 },
        { question: `Which field is most closely related to ${topic}?`, options: ["Agriculture", "Technology & Science", "Ancient History", "Marine Biology"], correct: 1 },
        { question: `What skill is most useful when studying ${topic}?`, options: ["Critical thinking", "Swimming", "Cooking", "Singing"], correct: 0 },
        { question: `How has ${topic} evolved in recent years?`, options: ["It hasn't changed", "It has become more advanced", "It has been abandoned", "It was just discovered"], correct: 1 },
        { question: `Why is ${topic} important to learn about?`, options: ["It's not important", "It shapes modern innovation", "Only for entertainment", "It's required by law"], correct: 1 }
    ];
}

// ─── Generate Quiz ───
startBtn.addEventListener('click', async () => {
    currentTopic = topicInput.value.trim();
    if (!currentTopic) { topicInput.style.borderColor = '#ff5252'; setTimeout(() => topicInput.style.borderColor = '', 2000); return; }

    loading.classList.remove('hidden');
    currentQ = 0; score = 0; userAnswers = [];

    try {
        const prompt = `Generate exactly 5 ${currentDifficulty}-difficulty multiple-choice quiz questions about "${currentTopic}".
Return ONLY valid JSON in this exact format (no markdown, no code fences, just raw JSON):
[{"question":"...","options":["A","B","C","D"],"correct":0}]
where "correct" is the 0-based index of the correct answer. Make questions engaging and educational.`;

        const response = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
                generationConfig: { temperature: 0.8, maxOutputTokens: 2048 }
            })
        });

        if (!response.ok) throw new Error(`API ${response.status}`);

        const data = await response.json();
        let text = data.reply || '';
        // Strip markdown code fences if present
        text = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
        questions = JSON.parse(text);

        if (!Array.isArray(questions) || questions.length === 0) throw new Error('Invalid response');

    } catch (err) {
        console.error('Quiz API Error:', err);
        questions = getPrefabQuiz(currentTopic);
    }

    loading.classList.add('hidden');
    showScreen(quizScreen);
    renderQuestion();
});

// ─── Render Question ───
function renderQuestion() {
    const q = questions[currentQ];
    questionCounter.textContent = `Question ${currentQ + 1}/${questions.length}`;
    scoreDisplay.textContent = `Score: ${score}`;
    questionText.textContent = q.question;
    nextBtn.classList.add('hidden');

    optionsGrid.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];
    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `<span class="option-letter">${letters[i]}</span><span>${opt}</span>`;
        btn.addEventListener('click', () => selectAnswer(i));
        optionsGrid.appendChild(btn);
    });

    startTimer();
}

// ─── Select Answer ───
function selectAnswer(index) {
    clearInterval(timerInterval);
    const q = questions[currentQ];
    const btns = optionsGrid.querySelectorAll('.option-btn');

    btns.forEach(b => b.classList.add('disabled'));
    btns[q.correct].classList.add('correct');

    if (index === q.correct) {
        score++;
        userAnswers.push({ correct: true, question: q.question, userAnswer: q.options[index], correctAnswer: q.options[q.correct] });
    } else {
        if (index >= 0) btns[index].classList.add('wrong');
        userAnswers.push({ correct: false, question: q.question, userAnswer: index >= 0 ? q.options[index] : 'Time expired', correctAnswer: q.options[q.correct] });
    }

    scoreDisplay.textContent = `Score: ${score}`;
    nextBtn.classList.remove('hidden');
}

// ─── Timer ───
function startTimer() {
    timeLeft = currentDifficulty === 'easy' ? 25 : currentDifficulty === 'medium' ? 20 : 15;
    timerFill.style.width = '100%';
    timerFill.style.transition = 'none';

    setTimeout(() => {
        timerFill.style.transition = `width ${timeLeft}s linear`;
        timerFill.style.width = '0%';
    }, 50);

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            selectAnswer(-1); // Time expired
        }
    }, 1000);
}

// ─── Next / Results ───
nextBtn.addEventListener('click', () => {
    currentQ++;
    if (currentQ < questions.length) {
        renderQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    showScreen(resultsScreen);
    const pct = Math.round((score / questions.length) * 100);

    document.getElementById('results-icon').textContent = pct >= 80 ? '🏆' : pct >= 60 ? '⭐' : pct >= 40 ? '📚' : '💪';
    document.getElementById('results-title').textContent = pct >= 80 ? 'Excellent!' : pct >= 60 ? 'Good Job!' : pct >= 40 ? 'Not Bad!' : 'Keep Learning!';
    document.getElementById('results-score').textContent = `You scored ${score}/${questions.length} (${pct}%)`;

    const breakdown = document.getElementById('results-breakdown');
    breakdown.innerHTML = '';
    userAnswers.forEach((a, i) => {
        const div = document.createElement('div');
        div.className = `result-item ${a.correct ? 'correct' : 'wrong'}`;
        div.innerHTML = `<strong>Q${i + 1}:</strong> ${a.question}<br>
            Your answer: ${a.userAnswer} ${a.correct ? '✅' : `❌ → <span class="correct-answer">${a.correctAnswer}</span>`}`;
        breakdown.appendChild(div);
    });
}

// ─── Retry / New ───
retryBtn.addEventListener('click', () => {
    currentQ = 0; score = 0; userAnswers = [];
    showScreen(quizScreen);
    renderQuestion();
});

newBtn.addEventListener('click', () => {
    topicInput.value = '';
    showScreen(setupScreen);
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
