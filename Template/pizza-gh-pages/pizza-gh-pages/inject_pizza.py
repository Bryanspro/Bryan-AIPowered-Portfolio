import os
import glob
import re

target_dir = r"c:\Users\Bryan\.gemini\antigravity\scratch\ai-portfolio\Template\pizza-gh-pages\pizza-gh-pages"
html_files = glob.glob(os.path.join(target_dir, "*.html"))

head_injection = """
  <!-- Shared Features CSS -->
  <link rel="stylesheet" href="../../accessibility-widget.css?v=11" type="text/css">
  <link rel="stylesheet" href="css/pizza-features.css?v=1" type="text/css">
</head>"""

# Replace branding name (Remove 'Bryan's')
brand_search = r'Bryan\'s<br><small>Pizza</small>'
brand_replace = r'Epic<br><small>Pizza</small>'

# Insert controls inside navbar
nav_search = r'(</ul>\s*)(</div>\s*</div>\s*</nav>)'
nav_replace = r"""\1
                <!-- Portfolio Native Identity Switches -->
                <div class="nav-features ml-3 d-flex align-items-center" style="gap: 15px;">
                    <div id="lang-selector" class="lang-selector position-relative">
                        <button class="lang-selector-btn" id="lang-selector-btn" aria-expanded="false" style="background:transparent; border:none; cursor:pointer; display:flex; align-items:center; gap:5px; padding: 0; color: rgba(255,255,255,0.8);">
                            <span id="lang-flag-display" class="lang-flag">🇺🇸</span>
                            <span class="lang-code-display" id="lang-code-display" style="font-weight: 600;">EN</span>
                            <span class="ion-ios-arrow-down" style="font-size: 12px;"></span>
                        </button>
                        <ul class="lang-dropdown" id="lang-dropdown" role="listbox">
                            <!-- Populated via JS -->
                        </ul>
                    </div>
                    
                    <button id="theme-toggle-btn" class="theme-toggle-btn" aria-label="Toggle Theme" style="background:transparent; border:none; cursor:pointer; display:flex; align-items:center; gap:5px; padding: 0; color: rgba(255,255,255,0.8);" data-i18n-aria="themeToggleLight">
                        <span class="icon-sun" style="color: #fac564; font-size: 16px;"></span> <span data-i18n="themeToggleLight" data-theme-state="dark" style="display:none;">Light</span>
                    </button>
                </div>
            \2"""

script_search = r'[\t ]*<script src="js/main\.js"></script>'
script_replace = """  <!-- Portfolio Application Scripts -->
  <script src="../../shared-i18n.js?v=6"></script>
  <script src="js/pizza-custom.js?v=2"></script>
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

  <script src="js/main.js"></script>"""

# i18n Data tags
i18n_replacements = {
    '>Home</a>': ' data-i18n="navHome">Home</a>',
    '>Menu</a>': ' data-i18n="navGames">Menu</a>',
    '>Services</a>': ' data-i18n="navServices">Services</a>',
    '>Blog</a>': ' data-i18n="navBlog">Blog</a>',
    '>About</a>': ' data-i18n="navAbout">About</a>',
    '>Contact</a>': ' data-i18n="navContact">Contact</a>'
}

footer_search = r'(?is)Copyright &copy;\s*<script>document\.write\(new Date\(\)\.getFullYear\(\)\);</script>\s*All rights reserved\s*\|\s*This template is made with\s*<i class="icon-heart" aria-hidden="true"></i>\s*by\s*<a href="https://colorlib\.com"\s*target="_blank">\s*Colorlib\s*</a>'
footer_replace = r"""Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | Template by <a href="https://colorlib.com" target="_blank">Colorlib</a> | Adapted for portfolio use by <a class="border-bottom" href="https://bryans.tech" target="_blank" style="color: #fac564; font-weight: 500;">Bryans.tech</a>"""


for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
        
    if 'pizza-custom.js' in content:
        print(f"Skipping {os.path.basename(filepath)} - already injected.")
        continue

    # Branding Name Replace
    content = re.sub(brand_search, brand_replace, content)

    # Apply I18N replacements precisely
    for original, localized in i18n_replacements.items():
        content = content.replace(original, localized)

    # Injections
    content = content.replace('</head>', head_injection)
    content = re.sub(nav_search, nav_replace, content, flags=re.DOTALL, count=1)
    content = re.sub(script_search, script_replace, content, count=1)
    content = re.sub(footer_search, footer_replace, content, count=1)

    with open(filepath, 'w', encoding='utf-8') as file:
        file.write(content)
    print(f"Processed {os.path.basename(filepath)}")

print("All Pizza HTML files successfully injected.")
