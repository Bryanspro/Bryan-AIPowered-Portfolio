import os
import glob
import re

target_dir = r"c:\Users\Bryan\.gemini\antigravity\scratch\ai-portfolio\Template\MediLab-1.0.0\MediLab-1.0.0"
html_files = glob.glob(os.path.join(target_dir, "*.html"))

# The path from MediLab-1.0.0/MediLab-1.0.0/ to project root is ../../../
ROOT = "../../../"

head_injection = f"""
  <!-- Shared Features CSS -->
  <link rel="stylesheet" href="{ROOT}accessibility-widget.css?v=11" type="text/css">
  <link rel="stylesheet" href="assets/css/medilab-features.css?v=1" type="text/css">
</head>"""

# Insert controls into the branding bar, right before the CTA button
nav_controls = """
        <!-- Portfolio Native Identity Switches -->
        <div class="nav-features d-flex align-items-center" style="gap: 15px; margin-right: 15px;">
            <div id="lang-selector" class="lang-selector position-relative">
                <button class="lang-selector-btn" id="lang-selector-btn" aria-expanded="false">
                    <span id="lang-flag-display" class="lang-flag">🇺🇸</span>
                    <span class="lang-code-display" id="lang-code-display" style="font-weight: 600;">EN</span>
                    <i class="bi bi-chevron-down" style="font-size: 10px;"></i>
                </button>
                <ul class="lang-dropdown" id="lang-dropdown" role="listbox">
                    <!-- Populated via JS -->
                </ul>
            </div>
            
            <button id="theme-toggle-btn" class="theme-toggle-btn" aria-label="Toggle Theme" data-i18n-aria="themeToggleLight">
                <i class="bi bi-sun-fill" style="color: #1977cc; font-size: 16px;"></i> <span data-i18n="themeToggleLight">Light</span>
            </button>
        </div>
"""

# Script injection before main.js
script_injection = f"""  <!-- Portfolio Application Scripts -->
  <script src="{ROOT}shared-i18n.js?v=6"></script>
  <script src="assets/js/medilab-custom.js?v=1"></script>
  <script src="{ROOT}chat-intent-engine.js?v=11"></script>
  
  <!-- Chat Widget Core -->
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
      .catch(err => console.error('Failed to load chat widget:', err));
  </script>
  
  <!-- Accessibility Widget -->
  <script src="{ROOT}accessibility-widget.js?v=3"></script>

"""

# Footer update
footer_search = r'Designed by <a href="https://bootstrapmade\.com/">BootstrapMade</a>'
footer_replace = 'Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a> | Adapted for portfolio use by <a href="https://bryans.tech" target="_blank" style="color: #1977cc; font-weight: 500;">Bryans.tech</a>'


for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
        
    if 'medilab-custom.js' in content:
        print(f"Skipping {os.path.basename(filepath)} - already injected.")
        continue

    # 1. Head injection
    content = content.replace('</head>', head_injection)

    # 2. Nav controls - insert before the CTA button
    content = content.replace(
        '<a class="cta-btn d-none d-sm-block" href="#appointment">Make an Appointment</a>',
        nav_controls + '        <a class="cta-btn d-none d-sm-block" href="#appointment">Make an Appointment</a>'
    )
    
    # For starter-page which may not have the CTA button, insert before </nav> closing
    if 'nav-features' not in content:
        content = content.replace(
            '</nav>',
            nav_controls + '        </nav>',
            1
        )

    # 3. Script injection before main.js
    content = content.replace(
        '  <!-- Main JS File -->',
        script_injection + '  <!-- Main JS File -->'
    )

    # 4. Footer branding
    content = re.sub(footer_search, footer_replace, content, count=1)

    with open(filepath, 'w', encoding='utf-8') as file:
        file.write(content)
    print(f"Processed {os.path.basename(filepath)}")

print("All MediLab HTML files successfully injected.")
