import os
import glob
import re

directory = r"C:\Users\Bryan\.gemini\antigravity\scratch\ai-portfolio\Template\gymlife-master"
html_files = glob.glob(os.path.join(directory, "*.html"))

head_injection = """
    <!-- Shared Features CSS -->
    <link rel="stylesheet" href="../../accessibility-widget.css?v=11" type="text/css">
    <link rel="stylesheet" href="css/gym-features.css?v=2" type="text/css">
</head>"""

navbar_injection = """
                        <div class="top-option" style="display: flex; align-items: center; justify-content: flex-end; gap: 20px;">
                            <div class="to-search search-switch">
                                <i class="fa fa-search"></i>
                            </div>
                            <div class="to-social">
                                <a href="#"><i class="fa fa-facebook"></i></a>
                                <a href="#"><i class="fa fa-twitter"></i></a>
                                <a href="#"><i class="fa fa-youtube-play"></i></a>
                                <a href="#"><i class="fa fa-instagram"></i></a>
                            </div>
                            
                            <!-- Custom Shared Features Nav -->
                            <div class="nav-features">
                                <button id="theme-toggle-btn" class="theme-toggle-btn" aria-label="Toggle Theme" data-i18n-aria="themeToggleDark">
                                    <i class="fa fa-sun-o"></i> <span data-i18n="themeToggleLight">Light Mode</span>
                                </button>
                                
                                <div id="lang-selector" class="lang-selector" style="position: relative;">
                                    <button class="lang-selector-btn" id="lang-selector-btn" aria-expanded="false" style="background: transparent; border: 1px solid rgba(255,255,255,0.3); color: #fff; padding: 5px 10px; border-radius: 4px; cursor: pointer; display:flex; align-items:center; gap:5px;">
                                        <i class="fa fa-globe"></i>
                                        <span class="lang-code-display" id="lang-code-display">EN</span>
                                        <i class="fa fa-chevron-down" style="font-size: 10px;"></i>
                                    </button>
                                    <ul class="lang-dropdown" id="lang-dropdown" role="listbox">
                                        <!-- Populated via JS -->
                                    </ul>
                                </div>
                            </div>
                        </div>
"""

body_injection = """
    <!-- Portfolio Application Scripts -->
    <script src="../shared-i18n.js?v=4"></script>
    <script src="js/gym-custom.js?v=7"></script>
    <script src="../../chat-intent-engine.js"></script>
    
    <!-- Chat Widget Core -->
    <script>
        fetch('../../chat-widget.html?v=5')
            .then(res => res.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                doc.querySelectorAll('style').forEach(s => document.head.appendChild(s.cloneNode(true)));
                doc.body.querySelectorAll(':scope > *:not(script)').forEach(el => document.body.appendChild(el.cloneNode(true)));
                doc.querySelectorAll('body > script').forEach(s => {
                    const ns = document.createElement('script');
                    ns.textContent = s.textContent;
                    document.body.appendChild(ns);
                });
            })
            .catch(err => console.error('Failed to load chat widget:', err));
    </script>
    
    <!-- Accessibility Widget -->
    <script src="../../accessibility-widget.js"></script>
</body>"""

i18n_replacements = {
    '>Home</a>': ' data-i18n="navHome">Home</a>',
    '>About Us</a>': ' data-i18n="navAbout">About Us</a>',
    '>Classes</a>': ' data-i18n="navClasses">Classes</a>',
    '>Services</a>': ' data-i18n="navServices">Services</a>',
    '>Our Team</a>': ' data-i18n="navTeam">Our Team</a>',
    '>Pages</a>': ' data-i18n="navPages">Pages</a>',
    '>Contact</a>': ' data-i18n="navContact">Contact</a>',
    '>Shape your body</span>': ' data-i18n="heroSubtitle">Shape your body</span>',
    '<h1>Be <strong>strong</strong> training hard</h1>': '<h1 data-i18n="heroTitle">Be <strong>strong</strong> training hard</h1>',
    'Welcome to IronFitness,\n                                    where we help you achieve your goals.': 'Welcome to IronFitness,\n                                    where we help you achieve your goals.',
    '>Get info</a>': ' data-i18n="heroBtn">Get info</a>',
}

# The heroText is a bit messy with newlines. We will do a generic replacement for it.

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Inject Head
    if 'gym-features.css' not in content:
        content = content.replace("</head>", head_injection)
    
    # 2. Inject Body Scripts
    if 'chat-intent-engine.js' not in content:
        content = content.replace("</body>", body_injection)
        
    # 3. Replace Navbar
    # The original ends with </div> just before </div> <div class="col-lg-3">
    # We will search for <div class="top-option"> ... </div> replacing it.
    match = re.search(r'(<div class="top-option">[\s\S]*?<div class="to-social">[\s\S]*?</div>\s*</div>)', content)
    if match and 'nav-features' not in match.group():
        content = content.replace(match.group(), navbar_injection.strip())

    # 4. i18n
    for old, new in i18n_replacements.items():
        if new not in content:
            content = content.replace(old, new)
            
    # For Hero Text paragraphs:
    hero_p_pattern = r'<p style="color: white; font-size: 18px; margin-bottom: 20px;">Welcome to IronFitness,[\s\S]*?where we help you achieve your goals.</p>'
    content = re.sub(hero_p_pattern, '<p style="color: white; font-size: 18px; margin-bottom: 20px;" data-i18n="heroText">Welcome to IronFitness,\\n                                    where we help you achieve your goals.</p>', content)
            
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Injection complete.")
