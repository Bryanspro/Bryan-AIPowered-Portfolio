import os
import glob
import re

# Navigate to the context of the Template directory
base_dir = os.path.dirname(os.path.abspath(__file__))
html_files = glob.glob(os.path.join(base_dir, '*.html'))

# --- Payload Definitions ---

nav_block = """
            <!-- Custom Shared Features Nav (as li items inside ul.login) -->
            <li class="nav-features-li" style="display: flex; align-items: center; gap: 12px; margin-left: 10px;">
                <!-- Language Selector Custom Dropdown -->
                <div id="lang-selector" class="lang-selector" style="position: relative;">
                    <button class="lang-selector-btn" id="lang-selector-btn" aria-expanded="false" style="background: transparent; border: none; color: white; cursor: pointer; font-weight: 500; font-size: 14px; display: flex; align-items: center; gap: 5px; outline: none; white-space: nowrap;">
                        <span id="lang-flag-display" style="font-size: 16px;">🇺🇸</span>
                        <span class="lang-code-display" id="lang-code-display">EN</span>
                        <i class="fa fa-chevron-down" style="font-size: 10px; margin-left: 2px;"></i>
                    </button>
                    <ul class="lang-dropdown" id="lang-dropdown" role="listbox" style="display: none; position: absolute; right: 0; top: 100%; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); list-style: none; margin: 5px 0 0; padding: 5px 0; min-width: 130px; z-index: 9999;">
                        <!-- Populated via JS -->
                    </ul>
                </div>

                <!-- Theme Toggle -->
                <button id="theme-toggle-btn" style="color: white; padding: 4px 10px; outline: 1px solid rgba(255,255,255,0.4); border-radius: 20px; display: flex; align-items: center; gap: 6px; border: none; background: transparent; cursor: pointer; white-space: nowrap; font-size: 14px; font-weight: bold;">
                    <i class="fa fa-sun-o" style="color: #ffcb05; font-size: 1.1em;"></i>
                    <span>Light</span>
                </button>
            </li>
            <!-- End Custom Nav -->
"""

css_block = """
<!-- Custom Integration Overrides -->
<link href="../../../accessibility-widget.css?v=11" rel="stylesheet">
<link href="css/sports-features.css?v=20" rel="stylesheet">
"""

footer_attribution = r'Distributed by <a href="https://themewagon.com/" target="_blank">ThemeWagon</a> | Adapted for portfolio use by <a class="border-bottom" href="https://bryans.tech" target="_blank" style="color: var(--primary); font-weight: 500;">Bryans.tech</a>'

js_block = """
<!-- Portfolio Application Scripts -->
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dompurify@2.4.0/dist/purify.min.js"></script>
<script src="../../shared-i18n.js?v=4"></script>
<script src="js/sports-custom.js?v=14"></script>
<script src="../../../chat-intent-engine.js?v=11"></script>
<script>
    fetch('../../../chat-widget.html?v=14')
        .then(r => r.text())
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
<script src="../../../accessibility-widget.js?v=11"></script>
</body>
"""

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. DEEP CLEAN: Remove previously injected features (both old div style and new li style)
    content = re.sub(r'\s*<!-- Custom Shared Features Nav.*?<!-- End Custom Nav -->', '', content, flags=re.DOTALL)
    content = re.sub(r'\s*<li class="nav-features-li".*?</li>\s*<!-- End Custom Nav -->', '', content, flags=re.DOTALL)
    content = re.sub(r'<div class="nav-features.*?</div>', '', content, flags=re.DOTALL)

    # 2. PRECISE INJECTION: insert as <li> items inside ul.login, before its closing </ul>
    if 'nav-features-li' not in content:
        # Target the closing </ul> of the button section (ul.login)
        # Pattern: the last </li> before </ul><!-- end button section -->
        pattern = r'(</ul>)(\s*<!-- end button section -->)'
        if re.search(pattern, content):
            content = re.sub(pattern, nav_block + r'\1\2', content)
        else:
            print("Failed to find insertion point for nav features")

    # 3. Inject CSS
    # Add our CSS block right before </head> if not already present
    if 'sports-features.css' not in content:
        content = content.replace('</head>', css_block + '\n</head>')

    # 4. Inject JS Block
    if 'sports-custom.js' not in content:
        # Strip out old injections if they exist in a malformed way
        content = re.sub(r'<!-- Shared Global Chat System Elements -->.*?</body>', '</body>', content, flags=re.DOTALL)
        # Inject standard JS config
        content = content.replace('</body>', js_block)

    # 5. Footer Attribution 
    if 'Bryans.tech' not in content:
        content = re.sub(r'(Distributed by <a href="https://themewagon.com/".*?>ThemeWagon</a>)', 
                         r'\1 | Adapted for portfolio use by <a class="border-bottom" href="https://bryans.tech" target="_blank" style="color: var(--primary); font-weight: 500;">Bryans.tech</a>', content)

    # Write back
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"Processed {os.path.basename(file)}")

print("All Sport's Master HTML files successfully updated.")
