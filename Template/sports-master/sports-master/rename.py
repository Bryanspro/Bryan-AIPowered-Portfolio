import os
import glob
import re

base_dir = r"c:\Users\Bryan\.gemini\antigravity\scratch\ai-portfolio\Template\sports-master\sports-master"

html_files = glob.glob(os.path.join(base_dir, '*.html'))

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Change "Bryan's Sports" to "Sport's Master"
    # In index.html it is formatted as:
    # <a href="index.html" style="...">Bryan's
    #                        Sports</a>
    content = re.sub(r"Bryan's\s*Sports", "Sport's Master", content)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"Renamed logo in {os.path.basename(file)}")
