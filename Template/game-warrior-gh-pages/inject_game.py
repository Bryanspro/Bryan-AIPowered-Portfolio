import os
import glob
import re

target_dir = r'c:\Users\Bryan\.gemini\antigravity\scratch\ai-portfolio\Template\game-warrior-gh-pages'
html_files = glob.glob(os.path.join(target_dir, '*.html'))

head_injection = """
	<!-- Shared Features CSS -->
	<link rel="stylesheet" href="../../accessibility-widget.css?v=11" type="text/css">
	<link rel="stylesheet" href="css/game-features.css?v=5" type="text/css">
</head>"""

nav_search = r'			<div class="user-panel">\s*<a href="#">Login</a> / <a href="#">Register</a>\s*</div>'
nav_replace = """			<div class="user-panel" style="display: flex; align-items: center; gap: 20px;">
				<div><a href="#">Login</a> / <a href="#">Register</a></div>
				
				<!-- Add horizontal switches for Portfolio Native Identity -->
                <div class="nav-features" style="display: flex; align-items: center; gap: 15px;">
                    <div id="lang-selector" class="lang-selector" style="position: relative;">
                        <button class="lang-selector-btn" id="lang-selector-btn" aria-expanded="false" style="background:transparent; border:none; color:white; cursor:pointer; display:flex; align-items:center; gap:5px; padding: 0;">
                            <span id="lang-flag-display">🇺🇸</span>
                            <span class="lang-code-display" id="lang-code-display">EN</span>
                            <i class="fa fa-angle-down" style="font-size: 14px;"></i>
                        </button>
                        <ul class="lang-dropdown" id="lang-dropdown" role="listbox">
                            <!-- Populated via JS -->
                        </ul>
                    </div>
                    
                    <button id="theme-toggle-btn" class="theme-toggle-btn" aria-label="Toggle Theme" style="background:transparent; border:none; color:white; cursor:pointer; display:flex; align-items:center; gap:5px; padding: 0;" data-i18n-aria="themeToggleLight">
                        <i class="fa fa-sun-o" style="color: #ffb320; font-size: 16px;"></i> <span data-i18n="themeToggleLight" data-theme-state="dark" style="display:none;">Light</span>
                    </button>
                </div>
			</div>"""

script_search = r'	<!--====== Javascripts & Jquery ======-->'
script_replace = """	<!-- Portfolio Application Scripts -->
	<script src="../shared-i18n.js?v=6"></script>
	<script src="js/game-custom.js?v=5"></script>
	<script src="../../chat-intent-engine.js?v=11"></script>
	
	<!-- Chat Widget Core -->
	<script>
		fetch('../../chat-widget.html?v=7')
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
	<script src="../../accessibility-widget.js?v=3"></script>

	<!--====== Javascripts & Jquery ======-->"""

footer_search = r'<a href="https://colorlib\.com"\s*target="_blank">Colorlib</a>'
footer_replace = r'<a href="https://colorlib.com" target="_blank">Colorlib</a> | Adapted for portfolio use by <a class="border-bottom" href="https://bryans.tech" target="_blank" style="color: #ffb320; font-weight: 500;">Bryans.tech</a>'

i18n_replacements = {
    '>Home</a>': ' data-i18n="navHome">Home</a>',
    '>Games</a>': ' data-i18n="navGames">Games</a>',
    '>Blog</a>': ' data-i18n="navBlog">Blog</a>',
    '>Forums</a>': ' data-i18n="navForums">Forums</a>',
    '>Contact</a>': ' data-i18n="navContact">Contact</a>'
}

nav_pattern = re.compile(nav_search)
script_pattern = re.compile(script_search)
footer_pattern = re.compile(footer_search)

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
        
    # Prevent duplicate injections securely
    if 'game-custom.js' in content:
        print(f"Skipping {os.path.basename(filepath)} - already injected.")
        continue

    # 1. Apply I18N replacements precisely
    for original, localized in i18n_replacements.items():
        content = content.replace(original, localized)

    # 2. Inject CSS Head Features
    content = content.replace('</head>', head_injection)

    # 3. Inject Navigation Selectors
    content = nav_pattern.sub(nav_replace, content, count=1)

    # 4. Inject Bottom Application Scripts precisely before jquery block
    content = script_pattern.sub(script_replace, content, count=1)

    # 5. Inject Footer attribution
    content = footer_pattern.sub(footer_replace, content, count=1)

    with open(filepath, 'w', encoding='utf-8') as file:
        file.write(content)
    print(f"Processed {os.path.basename(filepath)}")

print("All Game Warrior HTML files successfully injected.")
