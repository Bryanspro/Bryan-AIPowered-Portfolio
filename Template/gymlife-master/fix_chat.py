import os, glob

directory = r'C:\Users\Bryan\.gemini\antigravity\scratch\ai-portfolio\Template\gymlife-master'
html_files = glob.glob(os.path.join(directory, '*.html'))

old_chat_logic = """        fetch('../../chat-widget.html?v=3')
            .then(res => res.text())
            .then(html => {
                document.body.insertAdjacentHTML('beforeend', html);
                const script = document.createElement('script');
                script.id = "chat-widget-init-script";
                script.textContent = `
                    if (typeof initChatWidget === 'function') {
                        initChatWidget();
                    }
                `;
                document.body.appendChild(script);
            })
            .catch(err => console.error('Failed to load chat widget:', err));"""

new_chat_logic = """        fetch('../../chat-widget.html?v=3')
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
            });"""

for f_path in html_files:
    with open(f_path, 'r', encoding='utf-8') as f:
        content = f.read()
    if old_chat_logic in content:
        content = content.replace(old_chat_logic, new_chat_logic)
        with open(f_path, 'w', encoding='utf-8') as f:
            f.write(content)
print('Fixed HTML chat injection in all files')
