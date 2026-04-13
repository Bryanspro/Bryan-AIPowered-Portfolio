import os
import glob
import re

target_dir = r"c:\Users\Bryan\.gemini\antigravity\scratch\ai-portfolio\Template\Kelly-1.0.0\Kelly-1.0.0"
html_files = glob.glob(os.path.join(target_dir, "*.html"))

head_injection = """
  <!-- Shared Features CSS -->
  <link rel="stylesheet" href="../../../accessibility-widget.css?v=11" type="text/css">
  <link rel="stylesheet" href="assets/css/kelly-features.css?v=1" type="text/css">
</head>"""

nav_search = r'(<div class="header-social-links">.*?</div>)'
nav_replace = r"""      <div class="header-controls d-flex align-items-center">
        \1
        <!-- Portfolio Native Identity Switches -->
        <div class="nav-features ms-3 d-flex align-items-center" style="gap: 15px; border-left: 1px solid rgba(0,0,0,0.1); padding-left: 15px;">
            <div id="lang-selector" class="lang-selector position-relative">
                <button class="lang-selector-btn" id="lang-selector-btn" aria-expanded="false" style="background:transparent; border:none; cursor:pointer; display:flex; align-items:center; gap:5px; padding: 0;">
                    <span id="lang-flag-display" class="lang-flag">🇺🇸</span>
                    <span class="lang-code-display" id="lang-code-display" style="font-weight: 600;">EN</span>
                    <i class="bi bi-chevron-down" style="font-size: 12px;"></i>
                </button>
                <ul class="lang-dropdown" id="lang-dropdown" role="listbox">
                    <!-- Populated via JS -->
                </ul>
            </div>
            
            <button id="theme-toggle-btn" class="theme-toggle-btn" aria-label="Toggle Theme" style="background:transparent; border:none; cursor:pointer; display:flex; align-items:center; gap:5px; padding: 0;" data-i18n-aria="themeToggleLight">
                <i class="bi bi-sun" style="color: #34b7a7; font-size: 16px;"></i> <span data-i18n="themeToggleLight" data-theme-state="dark" style="display:none;">Light</span>
            </button>
        </div>
      </div>"""

script_search = r'  <!-- Main JS File -->'
script_replace = """  <!-- Portfolio Application Scripts -->
  <script src="../../../shared-i18n.js?v=6"></script>
  <script src="assets/js/kelly-custom.js?v=2"></script>
  <script src="../../../chat-intent-engine.js?v=11"></script>
  
  <!-- Chat Widget Core -->
  <script>
    fetch('../../../chat-widget.html?v=7')
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
  <script src="../../../accessibility-widget.js?v=3"></script>

  <!-- Main JS File -->"""

footer_search = r'(?s)<div class="credits">.*?</div>'
footer_replace = """<div class="credits">
        Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a> | Adapted for portfolio use by <a class="border-bottom" href="https://bryans.tech" target="_blank" style="color: #34b7a7; font-weight: 500;">Bryans.tech</a>
      </div>"""

i18n_replacements = {
    '>Home</a>': ' data-i18n="navHome">Home</a>',
    '>About</a>': ' data-i18n="navAbout">About</a>',
    '>Resume</a>': ' data-i18n="navResume">Resume</a>',
    '>Services</a>': ' data-i18n="navServices">Services</a>',
    '>Portfolio</a>': ' data-i18n="navPortfolio">Portfolio</a>',
    '>Contact</a>': ' data-i18n="navContact">Contact</a>'
}

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
        
    if 'kelly-custom.js' in content:
        print(f"Skipping {os.path.basename(filepath)} - already injected.")
        continue

    for original, localized in i18n_replacements.items():
        content = content.replace(original, localized)

    content = content.replace('</head>', head_injection)
    content = re.sub(nav_search, nav_replace, content, flags=re.DOTALL, count=1)
    content = re.sub(script_search, script_replace, content, count=1)
    content = re.sub(footer_search, footer_replace, content, count=1)

    with open(filepath, 'w', encoding='utf-8') as file:
        file.write(content)
    print(f"Processed {os.path.basename(filepath)}")

print("All Kelly HTML files successfully injected.")
