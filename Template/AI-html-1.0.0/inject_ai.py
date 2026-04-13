import os, glob, re

target_dir = r'c:\Users\Bryan\.gemini\antigravity\scratch\ai-portfolio\Template\AI-html-1.0.0'
html_files = glob.glob(os.path.join(target_dir, '*.html'))

nav_block = """
                    <div class="nav-features d-flex align-items-center ms-auto">
                        <div id="lang-selector" class="lang-selector ms-3" style="position: relative;">
                            <button class="lang-selector-btn btn btn-sm border-0 text-white d-flex align-items-center" id="lang-selector-btn" aria-expanded="false" style="gap:5px; padding: 4px 0;">
                                <span id="lang-flag-display">🇺🇸</span>
                                <span class="lang-code-display" id="lang-code-display">EN</span>
                                <i class="fa fa-chevron-down" style="font-size: 10px;"></i>
                            </button>
                            <ul class="lang-dropdown" id="lang-dropdown" role="listbox">
                                <!-- Populated via JS -->
                            </ul>
                        </div>
                        
                        <button id="theme-toggle-btn" class="theme-toggle-btn btn text-white p-0 ms-3" aria-label="Toggle Theme" data-i18n-aria="themeToggleLight">
                            <i class="fas fa-sun" style="color: #f4b400;"></i> <span data-i18n="themeToggleLight" data-theme-state="dark" style="display:none;">Light</span>
                        </button>
                    </div>
"""

script_block = """
    <!-- Shared I18n Engine & Custom JS (MUST run first) -->
    <script src="../shared-i18n.js?v=10"></script>
    <script src="js/ai-custom.js?v=10"></script>
    
    <!-- Chat Widget Core -->
    <script src="../../chat-intent-engine.js?v=10"></script>
    <script>
        fetch('../../chat-widget.html?v=10')
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
            });
    </script>
    <!-- Accessibility Widget -->
    <script src="../../accessibility-widget.js?v=10"></script>
"""

css_block = """
    <!-- Custom Integration Overrides -->
    <link href="../../accessibility-widget.css?v=10" rel="stylesheet">
    <link href="css/ai-features.css?v=10" rel="stylesheet">
</head>
"""

footer_attribution = r'Designed By <a class="border-bottom" href="https://htmlcodex.com">HTML Codex</a> Distributed By\n\s*<a class="border-bottom" href="https://themewagon.com">ThemeWagon</a> <br class="d-md-none">\| Adapted for portfolio use by <a class="border-bottom" href="https://bryans.tech" target="_blank" style="color: var(--primary); font-weight: 500;">Bryans.tech</a>'
old_footer = r'Designed By <a class="border-bottom" href="https://htmlcodex.com">HTML Codex</a> Distributed By\s*<a class="border-bottom" href="https://themewagon.com">ThemeWagon</a>'

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. DEEP CLEAN: Restore to template state by removing previously injected features
    content = re.sub(r'\s*<!-- Custom Shared Features Nav -->.*?<!-- End Custom Nav -->', '', content, flags=re.DOTALL)
    content = re.sub(r'<div class="nav-features.*?</div>', '', content, flags=re.DOTALL)
    content = re.sub(r'<button id="theme-toggle-btn".*?</button>', '', content, flags=re.DOTALL)

    # 2. PRECISE INJECTION
    if 'nav-features' not in content:
        # Match from <button (or butaton) to its closing tag, and inject right after it,
        # still respecting the final closing </div> of navbarCollapse.
        # Template has <butaton type="button" class="btn text-white p-0 d-none d-lg-block"...><i class="fa fa-search"></i></butaton>
        pattern = r'(<butaton.*?</butaton>)\s*(</div>)'
        if re.search(pattern, content, flags=re.DOTALL):
            content = re.sub(pattern, r'\1\n                    <!-- Custom Shared Features Nav -->' + nav_block + '<!-- End Custom Nav -->\n                \2', content, flags=re.DOTALL)
        else:
            # Fallback
            content = re.sub(r'(<div class="collapse navbar-collapse" id="navbarCollapse">.*?)(</div>)', r'\1\n                    <!-- Custom Shared Features Nav -->' + nav_block + '<!-- End Custom Nav -->\n                \2', content, flags=re.DOTALL)


    # 3. Inject CSS
    if 'ai-features.css' not in content:
        content = content.replace('</head>', css_block)

    # 4. Inject Scripts
    if 'shared-i18n.js' not in content:
        content = content.replace('</body>', script_block + '\n</body>')

    # 5. Inject Footer
    if 'Bryans.tech' not in content:
        content = re.sub(old_footer, footer_attribution.replace(r'\n', '\n').replace(r'\s*', ' ').replace(r'\|', '|'), content, flags=re.IGNORECASE)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Processed {os.path.basename(file)}')
