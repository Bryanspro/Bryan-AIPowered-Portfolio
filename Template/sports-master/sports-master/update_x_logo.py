import os
import glob
import re

base_dir = r"c:\Users\Bryan\.gemini\antigravity\scratch\ai-portfolio\Template\sports-master\sports-master"
html_files = glob.glob(os.path.join(base_dir, '*.html'))

# SVG exactly matching the new X logo
x_svg = '<svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18" style="fill: currentColor; margin-bottom: 2px;"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>'
replacement = f'<i class="fa fa-twitter d-flex align-items-center justify-content-center" style="display: flex !important; align-items: center; justify-content: center; width: 100%; height: 100%;">{x_svg}</i>'

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace <i class="fa fa-twitter"></i> with the SVG inside the same i tag container
    # so we don't break the CSS targets (class="twitter")
    content = re.sub(r'<i class="fa fa-twitter"></i>', replacement, content)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"Updated X icon in {os.path.basename(file)}")
