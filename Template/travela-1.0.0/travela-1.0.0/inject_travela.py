import os, glob, re

target_dir = r"c:\Users\Bryan\.gemini\antigravity\scratch\ai-portfolio\Template\travela-1.0.0\travela-1.0.0"
html_files = glob.glob(os.path.join(target_dir, "*.html"))

# Paths: shared-i18n is at Template/, others at project root
I18N = "../../shared-i18n.js"
ROOT = "../../../"

head_css = f"""
    <!-- Shared Features CSS -->
    <link rel="stylesheet" href="{ROOT}accessibility-widget.css?v=11" type="text/css">
    <link rel="stylesheet" href="css/travela-features.css?v=1" type="text/css">
</head>"""

nav_controls = """
                <!-- Portfolio Controls -->
                <div class="nav-features d-flex align-items-center" style="gap: 15px; margin-left: 15px; padding-left: 15px; border-left: 1px solid rgba(0,0,0,0.1);">
                    <div id="lang-selector" class="lang-selector position-relative">
                        <button class="lang-selector-btn" id="lang-selector-btn" aria-expanded="false" type="button">
                            <span id="lang-flag-display" class="lang-flag">🇺🇸</span>
                            <span class="lang-code-display" id="lang-code-display" style="font-weight: 600;">EN</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg>
                        </button>
                        <ul class="lang-dropdown" id="lang-dropdown" role="listbox"></ul>
                    </div>
                    <button id="theme-toggle-btn" class="theme-toggle-btn" aria-label="Toggle Theme" type="button" data-i18n-aria="themeToggleLight">
                        <i class="bi bi-sun-fill" style="color: #13357B; font-size: 16px;"></i> <span data-i18n="themeToggleLight">Light</span>
                    </button>
                </div>
"""

scripts = f"""    <!-- Portfolio Application Scripts -->
    <script src="{I18N}?v=6"></script>
    <script src="js/travela-custom.js?v=1"></script>
    <script src="{ROOT}chat-intent-engine.js?v=11"></script>
    <script>
      fetch('{ROOT}chat-widget.html?v=7')
        .then(res => res.text())
        .then(html => {{
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          doc.querySelectorAll('style').forEach(s => document.head.appendChild(s.cloneNode(true)));
          doc.body.querySelectorAll(':scope > *:not(script)').forEach(el => document.body.appendChild(el.cloneNode(true)));
          doc.querySelectorAll('body > script').forEach(s => {{
            const ns = document.createElement('script');
            ns.textContent = s.textContent;
            document.body.appendChild(ns);
          }});
        }})
        .catch(err => console.error('Chat widget load error:', err));
    </script>
    <script src="{ROOT}accessibility-widget.js?v=3"></script>

"""

footer_search = r'Designed By <a class="text-white" href="https://htmlcodex\.com">HTML Codex</a>'
footer_replace = 'Designed By <a class="text-white" href="https://htmlcodex.com">HTML Codex</a> | Adapted by <a class="text-white" href="https://bryans.tech" target="_blank" style="font-weight:500;">Bryans.tech</a>'

for fp in html_files:
    with open(fp, 'r', encoding='utf-8') as f:
        content = f.read()
    if 'travela-custom.js' in content:
        print(f"Skip {os.path.basename(fp)}")
        continue

    # 1. CSS injection
    content = content.replace('</head>', head_css)

    # 2. Nav controls — insert before the "Book Now" button
    content = content.replace(
        '<a href="" class="btn btn-primary rounded-pill py-2 px-4 ms-lg-4">Book Now</a>',
        nav_controls + '                <a href="" class="btn btn-primary rounded-pill py-2 px-4 ms-lg-4">Book Now</a>'
    )

    # 3. Scripts — insert before template JS
    content = content.replace(
        '    <!-- Template Javascript -->',
        scripts + '    <!-- Template Javascript -->'
    )

    # 4. Footer
    content = re.sub(footer_search, footer_replace, content, count=1)

    with open(fp, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"OK {os.path.basename(fp)}")

print("All Travela HTMLs injected.")
