import re

file_path = r"c:\Users\Bryan\.gemini\antigravity\scratch\ai-portfolio\Apps\itsmagazine\index.html"

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update Hero Section background
html = re.sub(
    r'\.hero-section\s*{[^}]*}',
    r'''.hero-section {
            padding-top: 150px;
            padding-bottom: 150px;
            background: linear-gradient(135deg, rgba(5,5,5,0.85) 0%, rgba(10,10,10,0.7) 100%), url('../../assets/itsmagazine/hero_bg.png') no-repeat center center;
            background-size: cover;
            min-height: 100vh;
            display: flex;
            align-items: center;
            position: relative;
            overflow: hidden;
        }''',
    html
)

# 2. Update Typography and global elements
custom_styles = """
        /* General Editorial Typography */
        body {
            font-family: 'Muli', sans-serif;
            font-weight: 300;
            line-height: 1.8;
            color: #d0d0d0;
            background: #050505;
        }
        h1, h2, h3, h4, h5, h6 {
            font-family: 'Playfair Display', serif;
            font-weight: 400;
            letter-spacing: 1px;
            color: #ffffff;
        }
        p {
            font-family: 'Muli', sans-serif;
            font-weight: 300;
            letter-spacing: 0.5px;
        }
"""
# Insert general typography just after :root { ... }
html = re.sub(r'(:root\s*{[^}]*})', r'\1\n' + custom_styles, html)

# 3. Update Buttons (ghost buttons)
html = re.sub(
    r'\.primary-btn\s*{[^}]*}',
    r'''.primary-btn {
            background: transparent;
            color: var(--cw-gold);
            font-weight: 400;
            padding: 12px 35px;
            display: inline-block;
            text-transform: uppercase;
            letter-spacing: 3px;
            transition: all 0.4s ease;
            border: 1px solid var(--cw-gold);
            font-family: 'Muli', sans-serif;
            font-size: 13px;
        }''',
    html
)
html = re.sub(
    r'\.primary-btn:hover\s*{[^}]*}',
    r'''.primary-btn:hover {
            background: var(--cw-gold);
            color: #050505;
        }''',
    html
)

html = re.sub(
    r'\.secondary-btn\s*{[^}]*}',
    r'''.secondary-btn {
            background: transparent;
            color: #ffffff;
            font-weight: 400;
            padding: 12px 35px;
            display: inline-block;
            text-transform: uppercase;
            letter-spacing: 3px;
            transition: all 0.4s ease;
            border: 1px solid rgba(255, 255, 255, 0.4);
            margin-left: 15px;
            font-family: 'Muli', sans-serif;
            font-size: 13px;
        }''',
    html
)
html = re.sub(
    r'\.secondary-btn:hover\s*{[^}]*}',
    r'''.secondary-btn:hover {
            border-color: #ffffff;
            background: rgba(255,255,255,0.05);
        }''',
    html
)

# 4. Update Cards (Info and Tech)
html = re.sub(
    r'\.info-card\s*{[^}]*}',
    r'''.info-card {
            background: transparent;
            padding: 30px 20px;
            height: 100%;
            transition: transform 0.4s ease, opacity 0.4s ease;
            border-left: 1px solid rgba(212, 175, 55, 0.3);
        }''',
    html
)
html = re.sub(
    r'\.info-card:hover\s*{[^}]*}',
    r'''.info-card:hover {
            transform: translateY(-5px);
            border-left-color: var(--cw-gold);
            background: rgba(212, 175, 55, 0.02);
        }''',
    html
)

html = re.sub(
    r'\.tech-card\s*{[^}]*}',
    r'''.tech-card {
            background: transparent;
            padding: 20px 0;
            text-align: left;
            margin-bottom: 40px;
            transition: all 0.4s ease;
            position: relative;
            height: auto;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }''',
    html
)
html = re.sub(r'\.tech-card::before\s*{[^}]*}', '', html)
html = re.sub(r'\.tech-card:hover::before\s*{[^}]*}', '', html)
html = re.sub(
    r'\.tech-card:hover\s*{[^}]*}',
    r'''.tech-card:hover {
            border-bottom-color: var(--cw-gold);
            transform: translateY(-3px);
        }''',
    html
)
html = re.sub(
    r'\.tech-icon\s*{[^}]*}',
    r'''.tech-icon {
            font-size: 24px;
            color: var(--cw-gold);
            margin-bottom: 15px;
        }''',
    html
)

# 5. Backgrounds
html = re.sub(r'\.problem-solution-section\s*{[^}]*}', r'.problem-solution-section { padding: 120px 0; background: #050505; }', html)
html = re.sub(r'\.demo-section\s*{[^}]*}', r'.demo-section { padding: 120px 0; background: #080808; text-align: center; }', html)
html = re.sub(r'\.tech-stack-section\s*{[^}]*}', r'.tech-stack-section { padding: 120px 0; background: #050505; }', html)
html = re.sub(r'\.video-section\s*{[^}]*}', r'.video-section { padding: 120px 0; background: #080808; text-align: center; }', html)

# 6. AI Demo Button Animation
html = re.sub(
    r'\.pulse-ring\s*{[^}]*}',
    r'''.pulse-ring {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
            animation: breathe 4s ease-in-out infinite;
        }''',
    html
)
html = re.sub(
    r'\.pulse-ring-2\s*{[^}]*}',
    r'''.pulse-ring-2 {
            position: absolute;
            width: 110%;
            height: 110%;
            border-radius: 50%;
            border: 1px solid rgba(212, 175, 55, 0.2);
            animation: breathe 4s ease-in-out infinite 2s;
        }''',
    html
)
html = re.sub(
    r'@keyframes pulse\s*{[^}]*}',
    r'''@keyframes breathe {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.1); opacity: 0.3; }
        }''',
    html
)

# 7. Remove Light Mode CSS completely
html = re.sub(r'/\* ===== LIGHT MODE ===== \*/.*?(?=</style>)', '', html, flags=re.DOTALL)

# 8. Remove Theme Toggle HTML & Script
html = re.sub(r'<div class="header-controls">.*?</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</header>', '</div></div></div></div></header>', html, flags=re.DOTALL)
html = re.sub(r'<!-- Theme Toggle & Language Selector -->.*?(?=<!-- Custom CreativeWolf Chat Intents)', '', html, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("Redesign complete.")
