import os
import re
import json

def check_portfolio():
    print("--- 1. Checking index.html assets ---")
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    matches = re.findall(r'(?:src|href)=["\']([^"\']+)["\']', html)
    missing = []
    for m in matches:
        clean = m.split('?')[0].split('#')[0]
        if not clean or clean.startswith(('http:', 'https:', 'mailto:', '#', 'data:')):
            continue
        if not os.path.exists(clean):
            missing.append(clean)
    print("Missing in index.html:", missing)

    print("\n--- 2. Checking script.js assets & app/game paths ---")
    with open('script.js', 'r', encoding='utf-8') as f:
        js = f.read()

    js_srcs = re.findall(r"src:\s*['\"]([^'\"]+)['\"]", js)
    js_icons = re.findall(r"icon:\s*['\"]([^'\"]+)['\"]", js)
    missing_apps = []
    for p in js_srcs + js_icons:
        clean = p.split('?')[0].split('#')[0]
        if not clean or clean.startswith(('http:', 'https:')):
            continue
        if not os.path.exists(clean):
            missing_apps.append(clean)
    print("Missing in script.js (apps/games/templates):", missing_apps)

    print("\n--- 3. Checking locales ---")
    locales_dir = 'locales'
    if os.path.exists(locales_dir):
        files = os.listdir(locales_dir)
        print("Found locale files:", len(files))
        en_keys = set()
        if 'en.json' in files:
            with open(os.path.join(locales_dir, 'en.json'), 'r', encoding='utf-8') as f:
                en_data = json.load(f)
                en_keys = set(en_data.keys())
                print(f"en.json has {len(en_keys)} translation keys")

        for file in sorted(files):
            if file.endswith('.json') and file != 'en.json':
                with open(os.path.join(locales_dir, file), 'r', encoding='utf-8') as f:
                    try:
                        data = json.load(f)
                        diff = en_keys - set(data.keys())
                        if diff:
                            print(f"{file} missing {len(diff)} keys: {list(diff)[:5]}")
                    except Exception as e:
                        print(f"Error reading {file}: {e}")

    print("\n--- 4. Checking SEO & Open Graph Tags in index.html ---")
    has_og_title = 'og:title' in html
    has_og_desc = 'og:description' in html
    has_og_image = 'og:image' in html
    has_twitter = 'twitter:card' in html
    print(f"OpenGraph: title={has_og_title}, desc={has_og_desc}, image={has_og_image}, twitter={has_twitter}")

if __name__ == '__main__':
    check_portfolio()
