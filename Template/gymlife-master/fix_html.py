import glob, io, os

directory = r'C:\Users\Bryan\.gemini\antigravity\scratch\ai-portfolio\Template\gymlife-master'
files = glob.glob(os.path.join(directory, '*.html'))

old_scripts = """    <!-- Shared I18n Engine & Gym Custom JS -->
    <script src="../shared-i18n.js"></script>
    <script src="js/gym-custom.js"></script>"""

old_chat_block = """    <!-- Chat Widget Core -->
    <script src="../../chat-intent-engine.js"></script>"""

new_chat_block = """    <!-- Shared I18n Engine & Gym Custom JS (MUST run first) -->
    <script src="../shared-i18n.js"></script>
    <script src="js/gym-custom.js"></script>
    
    <!-- Chat Widget Core -->
    <script src="../../chat-intent-engine.js"></script>"""

for f_path in files:
    with io.open(f_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if old_scripts in content:
        content = content.replace(old_scripts, '')
    
    if old_chat_block in content:
        content = content.replace(old_chat_block, new_chat_block)
    
    # Fix the Globe to Flag inside the lang-selector button html
    globe_html = '<i class="fa fa-globe"></i>\n                                        <span class="lang-code-display" id="lang-code-display">EN</span>'
    flag_html = '<span id="lang-flag-display">🇺🇸</span>\n                                        <span class="lang-code-display" id="lang-code-display" style="margin-left: 5px;">EN</span>'
    
    if globe_html in content:
        content = content.replace(globe_html, flag_html)
        
    with io.open(f_path, 'w', encoding='utf-8') as f:
        f.write(content)

print('Updated scripts order and globe icon.')
