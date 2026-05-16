// ─── AI Editorial Assistant — Script ───
const GEMINI_KEY = 'AIzaSyCUak8HGP8F8aHWaAkE2CknF4bOHPBwYjE';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`;

// ─── DOM Elements ───
const inputHeadline = document.getElementById('input-headline');
const inputCategory = document.getElementById('input-category');
const inputBody = document.getElementById('input-body');
const outputContent = document.getElementById('output-content');
const submitBtn = document.getElementById('submit-btn');
const clearBtn = document.getElementById('clear-btn');
const copyBtn = document.getElementById('copy-json-btn');
const loading = document.getElementById('loading');

let rawJsonResult = '';

// ─── Char Counter ───
const charCountEl = document.getElementById('char-count');
const inputBody = document.getElementById('input-body');
if (inputBody && charCountEl) {
    inputBody.addEventListener('input', () => {
        charCountEl.textContent = inputBody.value.length.toLocaleString();
    });
}

// ─── Clear Inputs ───
clearBtn.addEventListener('click', () => {
    inputHeadline.value = '';
    inputCategory.selectedIndex = 0;
    inputBody.value = '';
    outputContent.innerHTML = `<div class="placeholder-msg"><span class="placeholder-icon">✒️</span><p>Your distribution kit will be crafted here</p></div>`;
    rawJsonResult = '';
});

// ─── Copy JSON ───
copyBtn.addEventListener('click', () => {
    if (!rawJsonResult) return;
    navigator.clipboard.writeText(rawJsonResult).then(() => {
        copyBtn.textContent = '✅ Copied!';
        setTimeout(() => copyBtn.textContent = '📋 Copy JSON', 2000);
    });
});

// ─── Generate Prompt ───
function buildPrompt(headline, category, bodyText) {
    return `You are the "AI Editorial & Growth Lead" for IT'S Magazine. Your goal is to transform article drafts into a complete digital publishing and distribution kit, maintaining a tone of luxury, sophistication, and modern lifestyle.

BRAND CONTEXT:
IT'S Magazine is a high-end digital publication covering sectors such as Arts, Luxury & Travel, Fashion, Tech, and Finance. The tone is professional, aspirational, and forward-thinking.

ARTICLE DATA:
Headline: ${headline}
Category: ${category}
Body Text: ${bodyText}

YOUR TASK:
Analyze the provided article data and generate the following elements:
1. SEO Optimization: A highly clickable, SEO-friendly title and meta description.
2. Editorial Summary: A 2-3 sentence executive summary for the reader.
3. Social Media Kit:
   - Instagram: A captivating caption with visual hooks and niche hashtags.
   - X (Twitter): A cohesive 3-post thread summarizing key points.
   - LinkedIn: A professional post focused on industry trends and business impact.
4. Multilingual: A Spanish translation of the editorial summary.

OUTPUT RULES:
- You MUST output ONLY a valid JSON object.
- Do not include any introductory or concluding text.
- Do not wrap the output in markdown blocks like \`\`\`json ... \`\`\`. Just return the raw JSON object.
- Strictly adhere to the following JSON schema:

{
  "seo_title": "string",
  "meta_description": "string",
  "short_summary": "string",
  "instagram_caption": "string",
  "twitter_thread": ["string", "string", "string"],
  "linkedin_post": "string",
  "spanish_summary": "string"
}`;
}

// ─── Render JSON Result to UI ───
function renderResult(jsonStr) {
    try {
        const data = JSON.parse(jsonStr);
        let html = '';

        const block = (cssClass, icon, label, value) => {
            if (!value) return;
            html += `<div class="result-block ${cssClass}">
                        <div class="result-label">${icon} ${label}</div>
                        <div class="result-value">${value}</div>
                     </div>`;
        };

        block('block-seo',     '🔍', 'SEO Title',          data.seo_title);
        block('block-meta',    '📄', 'Meta Description',    data.meta_description);
        block('block-summary', '📰', 'Editorial Summary',   data.short_summary);
        block('block-spanish', '🌐', 'Spanish Summary',     data.spanish_summary);

        if (data.instagram_caption) {
            block('block-ig', '📸', 'Instagram Caption', data.instagram_caption.replace(/\n/g, '<br>'));
        }

        if (Array.isArray(data.twitter_thread) && data.twitter_thread.length > 0) {
            let threadHtml = '<ul class="result-list">';
            data.twitter_thread.forEach(t => { threadHtml += `<li>${t}</li>`; });
            threadHtml += '</ul>';
            block('block-twitter', '𝕏', 'X (Twitter) Thread', threadHtml);
        }

        block('block-li', '💼', 'LinkedIn Post', data.linkedin_post);

        outputContent.innerHTML = html;

    } catch (e) {
        console.error('Failed to parse JSON:', e);
        outputContent.innerHTML = `<div class="result-block"><div class="result-label">Raw Output</div><div class="result-value" style="white-space:pre-wrap">${jsonStr}</div></div>`;
    }
}

// ─── Mock Fallback for local testing if API fails ───
const mockFallback = `{
  "seo_title": "The Future of Smart Horology: When Luxury Meets AI",
  "meta_description": "Discover how artificial intelligence is redefining the luxury watch industry. Explore the seamless blend of haute horlogerie and next-generation tech.",
  "short_summary": "The luxury watchmaking industry is embracing artificial intelligence, seamlessly blending centuries-old craftsmanship with cutting-edge technology. This intersection of haute horlogerie and modern innovation is redefining high-end timepieces.",
  "instagram_caption": "Centuries of craftsmanship meet the future of technology. ⌚✨ Artificial intelligence is slowly making its mark on haute horlogerie... Link in bio.\\n\\n#HauteHorlogerie #LuxuryWatches #TechAndStyle #ITSMagazine",
  "twitter_thread": [
    "1/3 Can tradition and innovation coexist on your wrist? The luxury watch industry is finally embracing AI, blending centuries-old mechanical craftsmanship with next-gen smart features. 🧵👇",
    "2/3 High-end brands are exploring discreet integrations—think biometric sensors and AI-driven precision tuning—without compromising the mechanical heart.",
    "3/3 This new era of \\"smart horology\\" proves that luxury doesn't have to be stuck in the past. Read our full analysis on how AI is reshaping the future: [Link]"
  ],
  "linkedin_post": "The intersection of haute horlogerie and AI is creating a fascinating new sector in the luxury market. Legacy watchmakers are integrating discreet AI-driven sensors while preserving mechanical mastery. How do you see AI impacting traditional luxury goods?",
  "spanish_summary": "La industria relojera de lujo está adoptando la inteligencia artificial, combinando a la perfección siglos de artesanía con tecnología de vanguardia."
}`;

// ─── Submit Handler ───
submitBtn.addEventListener('click', async () => {
    const headline = inputHeadline.value.trim();
    const category = inputCategory.value;
    const bodyText = inputBody.value.trim();

    if (!headline || !bodyText) {
        alert("Please provide both a Headline and Body Text for the article draft.");
        return;
    }

    loading.classList.remove('hidden');
    submitBtn.disabled = true;

    const promptStr = buildPrompt(headline, category, bodyText);

    try {
        const response = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ role: 'user', parts: [{ text: promptStr }] }],
                generationConfig: { 
                    temperature: 0.7, 
                    maxOutputTokens: 2048
                }
            })
        });

        if (!response.ok) throw new Error(`API ${response.status}`);

        const data = await response.json();
        let resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (resultText) {
            // Strip potential markdown block if the model ignored the instruction
            resultText = resultText.replace(/^\`\`\`json/m, '').replace(/\`\`\`$/m, '').trim();
            rawJsonResult = resultText;
            renderResult(resultText);
        } else {
            rawJsonResult = mockFallback;
            renderResult(mockFallback);
        }

    } catch (err) {
        console.error('API Error:', err);
        // Alert the user so they know it's not a bug!
        alert(`API Request Failed: ${err.message}. \n\nThe API key may have hit a rate limit (429). Loading mock demo data instead.`);
        rawJsonResult = mockFallback;
        renderResult(mockFallback);
    }

    loading.classList.add('hidden');
    submitBtn.disabled = false;
});

// ─── Luxury Particle Canvas ───
(function () {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let w, h, particles = [];
    
    function resize() { 
        w = canvas.width = innerWidth; 
        h = canvas.height = innerHeight; 
    }
    window.addEventListener('resize', resize); 
    resize();
    
    class P {
        constructor() { 
            this.x = Math.random() * w; 
            this.y = Math.random() * h; 
            this.vx = (Math.random() - 0.5) * 0.2; 
            this.vy = (Math.random() - 0.5) * 0.2; 
            this.r = Math.random() * 1.5 + 0.5; 
        }
        update() { 
            this.x += this.vx; 
            this.y += this.vy; 
            if (this.x < 0 || this.x > w) this.vx *= -1; 
            if (this.y < 0 || this.y > h) this.vy *= -1; 
        }
        draw() { 
            ctx.beginPath(); 
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); 
            ctx.fillStyle = 'rgba(212, 175, 55, 0.3)'; // Gold particles
            ctx.fill(); 
        }
    }
    
    for (let i = 0; i < Math.floor(w * h / 25000); i++) particles.push(new P());
    
    (function animate() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach((p, i) => { 
            p.update(); 
            p.draw(); 
            for (let j = i + 1; j < particles.length; j++) { 
                const dx = p.x - particles[j].x, dy = p.y - particles[j].y, d = Math.sqrt(dx * dx + dy * dy); 
                if (d < 120) { 
                    ctx.beginPath(); 
                    ctx.moveTo(p.x, p.y); 
                    ctx.lineTo(particles[j].x, particles[j].y); 
                    ctx.strokeStyle = `rgba(212, 175, 55, ${(1 - d / 120) * 0.1})`; 
                    ctx.stroke(); 
                } 
            } 
        });
        requestAnimationFrame(animate);
    })();
})();
