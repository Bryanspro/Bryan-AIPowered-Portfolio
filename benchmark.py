import time
import os
import glob
import re

target_dir = r'Template/game-warrior-gh-pages'
html_files = glob.glob(os.path.join(target_dir, '*.html'))

head_injection = """</head>"""

nav_search = r'			<div class="user-panel">\s*<a href="#">Login</a> / <a href="#">Register</a>\s*</div>'
nav_replace = """NAV"""

script_search = r'	<!--====== Javascripts & Jquery ======-->'
script_replace = """SCRIPT"""

footer_search = r'<a href="https://colorlib\.com"\s*target="_blank">Colorlib</a>'
footer_replace = r'FOOTER'

i18n_replacements = {
    '>Home</a>': ' data-i18n="navHome">Home</a>',
}

# Pre-read files into memory to avoid I/O overhead in benchmark
file_contents = {}
for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as file:
        file_contents[filepath] = file.read()

def run_unoptimized(iterations=1000):
    start = time.perf_counter()
    for _ in range(iterations):
        for filepath, content in file_contents.items():
            for original, localized in i18n_replacements.items():
                content = content.replace(original, localized)
            content = content.replace('</head>', head_injection)
            content = re.sub(nav_search, nav_replace, content, count=1)
            content = re.sub(script_search, script_replace, content, count=1)
            content = re.sub(footer_search, footer_replace, content, count=1)
    end = time.perf_counter()
    return end - start

def run_optimized(iterations=1000):
    nav_pattern = re.compile(nav_search)
    script_pattern = re.compile(script_search)
    footer_pattern = re.compile(footer_search)

    start = time.perf_counter()
    for _ in range(iterations):
        for filepath, content in file_contents.items():
            for original, localized in i18n_replacements.items():
                content = content.replace(original, localized)
            content = content.replace('</head>', head_injection)
            content = nav_pattern.sub(nav_replace, content, count=1)
            content = script_pattern.sub(script_replace, content, count=1)
            content = footer_pattern.sub(footer_replace, content, count=1)
    end = time.perf_counter()
    return end - start

unopt = run_unoptimized(1000)
opt = run_optimized(1000)

print(f"Unoptimized: {unopt:.4f}s")
print(f"Optimized: {opt:.4f}s")
print(f"Improvement: {(unopt - opt) / unopt * 100:.2f}%")
