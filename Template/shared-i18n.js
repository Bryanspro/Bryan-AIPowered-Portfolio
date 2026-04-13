/**
 * ============================================
 * Bryan's Portfolio — Shared Templates Localization Engine
 * ============================================
 * Provides consistent language switching, caching, and DOM application
 * across all demo templates without breaking the main portfolio's script.js.
 */

const SUPPORTED_LANGUAGES = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', dir: 'ltr' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷', dir: 'ltr' },
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', dir: 'ltr' },
    { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', dir: 'ltr' },
    { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', dir: 'ltr' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },
    { code: 'he', name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱', dir: 'rtl' }
];

const translationCache = {};
let currentTemplateLang = 'en';
let currentTranslations = null;

function normalizeLocale(locale) {
    if (!locale) return null;
    const base = locale.split('-')[0].toLowerCase();
    return SUPPORTED_LANGUAGES.find(l => l.code === base) ? base : null;
}

function detectLanguage() {
    const saved = localStorage.getItem('portfolio-lang');
    if (saved && SUPPORTED_LANGUAGES.find(l => l.code === saved)) {
        return saved;
    }
    const browserLangs = navigator.languages || [navigator.language || navigator.userLanguage || 'en'];
    for (const bl of browserLangs) {
        const normalized = normalizeLocale(bl);
        if (normalized) return normalized;
    }
    return 'en';
}

function getLocalesPath() {
    return window.LOCALES_PATH || 'locales/';
}

async function loadTranslations(lang) {
    if (translationCache[lang]) return translationCache[lang];
    try {
        const path = getLocalesPath();
        const response = await fetch(`${path}${lang}.json?v=${Date.now()}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        translationCache[lang] = data;
        return data;
    } catch (err) {
        console.error(`Failed to load translations for ${lang}:`, err);
        if (lang !== 'en') return loadTranslations('en');
        return null; // Fallback
    }
}

function applyTranslations(dict) {
    if (!dict) return;
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key] !== undefined) {
            el.innerHTML = dict[key];
        }
    });
    
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        if (dict[key] !== undefined) {
            el.setAttribute('title', dict[key]);
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (dict[key] !== undefined) {
            el.setAttribute('placeholder', dict[key]);
        }
    });
    
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
        const key = el.getAttribute('data-i18n-aria');
        if (dict[key] !== undefined) {
            el.setAttribute('aria-label', dict[key]);
        }
    });
}

function buildDropdown(activeLang) {
    const dropdown = document.getElementById('lang-dropdown');
    if (!dropdown) return;
    dropdown.innerHTML = '';

    const sorted = [
        SUPPORTED_LANGUAGES.find(l => l.code === activeLang),
        ...SUPPORTED_LANGUAGES.filter(l => l.code !== activeLang)
    ];

    sorted.forEach((lang, index) => {
        const li = document.createElement('li');
        li.className = 'lang-option' + (lang.code === activeLang ? ' active' : '');
        li.setAttribute('role', 'option');
        li.setAttribute('aria-selected', lang.code === activeLang ? 'true' : 'false');
        li.setAttribute('tabindex', '0');
        li.setAttribute('data-lang', lang.code);
        li.innerHTML = `
            <span class="lang-flag">${lang.flag}</span>
            <span class="lang-name">${lang.nativeName}</span>
            <span class="lang-option-code">${lang.code.toUpperCase()}</span>
        `;
        li.addEventListener('click', () => setTemplateLanguage(lang.code));
        li.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setTemplateLanguage(lang.code);
            }
        });
        dropdown.appendChild(li);

        if (index === 0) {
            const sep = document.createElement('li');
            sep.className = 'lang-separator';
            sep.setAttribute('role', 'separator');
            dropdown.appendChild(sep);
        }
    });
}

function initDropdownBehavior() {
    const btn = document.getElementById('lang-selector-btn');
    const dropdown = document.getElementById('lang-dropdown');
    if (!btn || !dropdown) return;

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdown.classList.contains('open');
        if (isOpen) {
            dropdown.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
        } else {
            dropdown.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
        }
    });

    document.addEventListener('click', (e) => {
        const selector = document.getElementById('lang-selector');
        if (selector && !selector.contains(e.target)) {
            dropdown.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
        }
    });
}

async function setTemplateLanguage(lang, fromSync = false) {
    if (currentTemplateLang === lang && fromSync) return;

    const langDef = SUPPORTED_LANGUAGES.find(l => l.code === lang);
    if (!langDef) return;

    const dict = await loadTranslations(lang);
    if (!dict) return;

    currentTemplateLang = lang;
    currentTranslations = dict;

    applyTranslations(dict);

    const codeDisplay = document.getElementById('lang-code-display');
    if (codeDisplay) codeDisplay.textContent = lang.toUpperCase();

    const flagDisplay = document.getElementById('lang-flag-display');
    if (flagDisplay) flagDisplay.textContent = langDef.flag;

    document.documentElement.dir = langDef.dir;
    document.documentElement.lang = lang;

    buildDropdown(lang);

    const dropdown = document.getElementById('lang-dropdown');
    const btn = document.getElementById('lang-selector-btn');
    if (dropdown && btn) {
        dropdown.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
    }

    localStorage.setItem('portfolio-lang', lang);

    // Sync chatbox language if loaded with globally expected setLanguage
    if (!fromSync && typeof window.setLanguage === 'function') {
        window.setLanguage(lang, true);
    }
}

// Global Export mapping setLanguage -> setTemplateLanguage to trick Chatbox engine
window.setPortfolioLanguage = setTemplateLanguage;

document.addEventListener('DOMContentLoaded', () => {
    initDropdownBehavior();
    const lang = detectLanguage();
    setTemplateLanguage(lang);
});
