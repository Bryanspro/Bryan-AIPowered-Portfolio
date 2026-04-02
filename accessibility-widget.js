/**
 * Accessibility Widget — Bryans.tech Portfolio
 * A lightweight, reusable, keyboard-accessible widget for customizing the reading
 * and interaction experience. Settings persist via localStorage and are applied
 * through data-attributes on <body>.
 *
 * Settings keys stored in localStorage under "a11y-settings":
 *   fontSizeLarge, lineHeightLarge, textSpacingWide, highContrast,
 *   dyslexiaFont, reduceMotion, highlightLinks, biggerCursor,
 *   textAlignLeft, lowSaturation
 */
(function () {
    'use strict';

    // ── Settings state ──────────────────────────────────────────────────────────
    const STORAGE_KEY = 'a11y-settings';

    const DEFAULTS = {
        fontSizeLarge: false,
        lineHeightLarge: false,
        textSpacingWide: false,
        highContrast: false,
        dyslexiaFont: false,
        reduceMotion: false,
        highlightLinks: false,
        biggerCursor: false,
        textAlignLeft: false,
        lowSaturation: false,
    };

    let settings = loadSettings();

    function loadSettings() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                return { ...DEFAULTS, ...parsed };
            }
        } catch (_) { /* noop */ }
        return { ...DEFAULTS };
    }

    function saveSettings() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        } catch (_) { /* noop */ }
    }

    /** Apply all current settings as data-attributes on <body> */
    function applySettings() {
        const body = document.body;
        Object.keys(settings).forEach(key => {
            const attr = 'data-a11y-' + key.replace(/([A-Z])/g, '-$1').toLowerCase();
            if (settings[key]) {
                body.setAttribute(attr, '');
            } else {
                body.removeAttribute(attr);
            }
        });
        // Sync toggle buttons inside the panel (if already rendered)
        document.querySelectorAll('.a11y-toggle-btn').forEach(btn => {
            const key = btn.dataset.settingKey;
            if (key && key in settings) {
                const active = settings[key];
                btn.classList.toggle('active', active);
                btn.setAttribute('aria-pressed', String(active));
                // Update visual indicator
                const indicator = btn.querySelector('.a11y-toggle-indicator');
                if (indicator) {
                    indicator.textContent = active ? 'ON' : 'OFF';
                }
            }
        });
    }

    /** Toggle a single setting */
    function toggleSetting(key) {
        if (!(key in settings)) return;
        settings[key] = !settings[key];
        saveSettings();
        applySettings();
    }

    /** Reset all settings to default */
    function resetAll() {
        settings = { ...DEFAULTS };
        saveSettings();
        applySettings();
    }

    // ── DOM Creation ────────────────────────────────────────────────────────────

    /** Build the floating trigger button */
    function createTriggerButton() {
        const btn = document.createElement('button');
        btn.id = 'a11y-trigger-btn';
        btn.className = 'a11y-trigger-btn';
        btn.setAttribute('aria-label', 'Open accessibility settings');
        btn.setAttribute('data-i18n-aria', 'a11yOpenSettings');
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-controls', 'a11y-panel');
        btn.title = 'Accessibility Settings';
        btn.setAttribute('data-i18n-title', 'a11yTitle');
        btn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                <circle cx="12" cy="4.5" r="2.5"/>
                <path d="M12 7v5"/>
                <path d="M8 21l2-7"/>
                <path d="M16 21l-2-7"/>
                <path d="M6 11h12"/>
            </svg>`;
        return btn;
    }

    /** Build the settings panel */
    function createPanel() {
        const panel = document.createElement('div');
        panel.id = 'a11y-panel';
        panel.className = 'a11y-panel';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-label', 'Accessibility settings');
        panel.setAttribute('data-i18n-aria', 'a11yTitle');
        panel.setAttribute('aria-modal', 'true');
        panel.hidden = true;

        // Build toggle data
        const toggles = [
            { key: 'fontSizeLarge', icon: 'Aa', labelKey: 'a11yFontSize', label: 'Increase Text Size' },
            { key: 'lineHeightLarge', icon: '☰', labelKey: 'a11yLineHeight', label: 'Increase Line Height' },
            { key: 'textSpacingWide', icon: 'A⟷B', labelKey: 'a11yTextSpacing', label: 'Wider Text Spacing' },
            { key: 'highContrast', icon: '◐', labelKey: 'a11yHighContrast', label: 'High Contrast' },
            { key: 'dyslexiaFont', icon: 'Dy', labelKey: 'a11yDyslexiaFont', label: 'Dyslexia-Friendly Font' },
            { key: 'reduceMotion', icon: '▣', labelKey: 'a11yReduceMotion', label: 'Reduce Animations' },
            { key: 'highlightLinks', icon: '🔗', labelKey: 'a11yHighlightLinks', label: 'Highlight Links' },
            { key: 'biggerCursor', icon: '🖱', labelKey: 'a11yBiggerCursor', label: 'Bigger Cursor' },
            { key: 'textAlignLeft', icon: '≡', labelKey: 'a11yTextAlign', label: 'Align Text Left' },
            { key: 'lowSaturation', icon: '🎨', labelKey: 'a11yLowSaturation', label: 'Low Saturation' },
        ];

        const togglesHTML = toggles.map(t => {
            const active = settings[t.key];
            return `
                <button class="a11y-toggle-btn${active ? ' active' : ''}"
                        data-setting-key="${t.key}"
                        aria-pressed="${active}"
                        title="${t.label}"
                        data-i18n-title="${t.labelKey}">
                    <span class="a11y-toggle-icon" aria-hidden="true">${t.icon}</span>
                    <span class="a11y-toggle-label" data-i18n="${t.labelKey}">${t.label}</span>
                    <span class="a11y-toggle-indicator" aria-hidden="true">${active ? 'ON' : 'OFF'}</span>
                </button>`;
        }).join('');

        panel.innerHTML = `
            <div class="a11y-panel-header">
                <h2 class="a11y-panel-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                         stroke-linecap="round" stroke-linejoin="round" width="20" height="20"
                         aria-hidden="true" focusable="false">
                        <circle cx="12" cy="4.5" r="2.5"/>
                        <path d="M12 7v5"/>
                        <path d="M8 21l2-7"/>
                        <path d="M16 21l-2-7"/>
                        <path d="M6 11h12"/>
                    </svg>
                    <span data-i18n="a11yTitle">Accessibility</span>
                </h2>
                <button class="a11y-close-btn" id="a11y-close-btn" aria-label="Close accessibility settings" data-i18n-aria="a11yCloseSettings">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"
                         aria-hidden="true" focusable="false">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
            <div class="a11y-panel-body" role="group" aria-label="Accessibility options" data-i18n-aria="a11yTitle">
                ${togglesHTML}
            </div>
            <div class="a11y-panel-footer">
                <button class="a11y-reset-btn" id="a11y-reset-btn" aria-label="Reset all accessibility settings" data-i18n-aria="a11yReset">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"
                         aria-hidden="true" focusable="false">
                        <polyline points="1 4 1 10 7 10"/>
                        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
                    </svg>
                    <span data-i18n="a11yReset">Reset All</span>
                </button>
            </div>`;

        return panel;
    }

    // ── Focus Trap ──────────────────────────────────────────────────────────────
    function getFocusableElements(container) {
        return container.querySelectorAll(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
    }

    function trapFocus(e, container) {
        const focusable = getFocusableElements(container);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }
    }

    // ── Initialization ──────────────────────────────────────────────────────────
    let panelOpen = false;
    let triggerBtn, panel;

    function openPanel() {
        panelOpen = true;
        panel.hidden = false;
        // Small delay so CSS transition triggers
        requestAnimationFrame(() => {
            panel.classList.add('open');
        });
        triggerBtn.setAttribute('aria-expanded', 'true');
        // Focus the close button
        const closeBtn = panel.querySelector('#a11y-close-btn');
        if (closeBtn) closeBtn.focus();
    }

    function closePanel() {
        panelOpen = false;
        panel.classList.remove('open');
        triggerBtn.setAttribute('aria-expanded', 'false');
        // After transition, hide
        setTimeout(() => {
            if (!panelOpen) panel.hidden = true;
        }, 300);
        triggerBtn.focus();
    }

    function init() {
        // Apply saved settings immediately (before DOM is fully interactive)
        applySettings();

        // Create elements
        triggerBtn = createTriggerButton();
        panel = createPanel();

        // Append to body
        document.body.appendChild(triggerBtn);
        document.body.appendChild(panel);

        // 5-second intro glow pulsation to draw attention
        triggerBtn.classList.add('intro-glow');
        triggerBtn.addEventListener('animationend', () => {
            triggerBtn.classList.remove('intro-glow');
        }, { once: true });

        // ── Event Listeners ──────────────────────────────────────────────────
        // Trigger button
        triggerBtn.addEventListener('click', () => {
            if (panelOpen) {
                closePanel();
            } else {
                openPanel();
            }
        });

        // Close button
        panel.querySelector('#a11y-close-btn').addEventListener('click', closePanel);

        // Reset button
        panel.querySelector('#a11y-reset-btn').addEventListener('click', () => {
            resetAll();
        });

        // Toggle buttons
        panel.querySelectorAll('.a11y-toggle-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const key = btn.dataset.settingKey;
                if (key) toggleSetting(key);
            });
        });

        // ESC to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && panelOpen) {
                e.preventDefault();
                closePanel();
            }
            if (panelOpen) {
                trapFocus(e, panel);
            }
        });

        // Close if clicking outside
        document.addEventListener('mousedown', (e) => {
            if (panelOpen && !panel.contains(e.target) && e.target !== triggerBtn && !triggerBtn.contains(e.target)) {
                closePanel();
            }
        });
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
