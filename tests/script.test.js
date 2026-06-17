/**
 * @jest-environment jsdom
 */

// Initialize all HTML elements used by script.js
document.head.innerHTML = `<script></script>`;
document.body.innerHTML = `
    <div id="year"></div>
    <canvas id="neural-canvas"></canvas>
    <div class="changelog-cta-btn"></div>
    <div id="lang-dropdown"></div>
    <div id="lang-selector-btn"></div>
    <div id="lang-selector"></div>
    <div id="typewriter"></div>
    <div class="glitch-text"></div>
    <div id="lang-code-display"></div>
    <div class="cl-tab-label"></div>
    <div id="music-toggle-btn"></div>
    <div id="music-icon"></div>
    <div id="music-player-modal"></div>
    <div id="btn-play-pause-track"></div>
    <div id="btn-prev-track"></div>
    <div id="btn-next-track"></div>
    <div id="youtube-player-container"></div>
    <div class="music-player-body"></div>
    <div id="close-music-player-btn"></div>
    <div id="project-carousel"></div>
    <div class="prev-btn"></div>
    <div class="next-btn"></div>
    <div class="carousel-container"></div>
    <div id="template-gallery"></div>
    <div id="proj1-link"></div>
    <div id="template-viewer"></div>
    <div id="close-viewer-btn"></div>
    <div id="game-gallery"></div>
    <div id="proj2-link"></div>
    <div id="game-viewer"></div>
    <div id="close-game-viewer-btn"></div>
    <div id="app-gallery"></div>
    <div id="proj3-link"></div>
    <div id="app-viewer"></div>
    <div id="close-app-viewer-btn"></div>
    <div id="ai-app-gallery"></div>
    <div id="proj4-link"></div>
    <div id="ai-app-viewer"></div>
    <div id="close-ai-app-viewer-btn"></div>
    <div id="contact-form"></div>
    <div id="contact-status"></div>
    <div id="submit-btn"></div>
    <div id="name"></div>
    <div id="email"></div>
    <div id="message"></div>
    <div id="changelog-viewer"></div>
    <div id="nav-changelog-link"></div>
    <div id="close-changelog-btn"></div>
`;

// Mock canvas API
const canvas = document.getElementById('neural-canvas');
canvas.getContext = () => ({
    clearRect: jest.fn(),
    beginPath: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    stroke: jest.fn(),
});

window.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
};

window.fetch = jest.fn(() => Promise.resolve({
    ok: true,
    json: () => Promise.resolve({})
}));

window.YT = {
    Player: class {
        constructor() { this.playVideo = jest.fn(); this.pauseVideo = jest.fn(); }
    },
    PlayerState: { PLAYING: 1, PAUSED: 2, ENDED: 0 }
};

// Require the script. We are testing `normalizeLocale` directly.
// In script.js, the `normalizeLocale` function is declared *inside* the `DOMContentLoaded` listener,
// so the direct export trick `module.exports = { normalizeLocale }` we added only runs inside that callback
// which means `require('../script.js')` will return an empty object until the callback fires.
// BUT `module.exports` inside the callback mutates the *current* module scope of the callback, not `require`.
// To fix this cleanly, we can intercept the module exports.

// Load the file as text and execute it in context of node module
const fs = require('fs');
const path = require('path');
const scriptPath = path.join(__dirname, '../script.js');
const scriptSource = fs.readFileSync(scriptPath, 'utf8');

// We evaluate the script source to attach the listener
eval(scriptSource);

// Fire DOMContentLoaded so script initializes safely without errors
const event = document.createEvent('Event');
event.initEvent('DOMContentLoaded', true, true);
document.dispatchEvent(event);

// Because of `module.exports = { normalizeLocale }` inside the script, our node context's module.exports has been updated.
const { normalizeLocale } = module.exports;

describe('normalizeLocale', () => {

    it('should return null for null/undefined/empty locale', () => {
        expect(normalizeLocale(null)).toBeNull();
        expect(normalizeLocale(undefined)).toBeNull();
        expect(normalizeLocale('')).toBeNull();
    });

    it('should return the exact code if it is in supported languages', () => {
        expect(normalizeLocale('en')).toBe('en');
        expect(normalizeLocale('es')).toBe('es');
        expect(normalizeLocale('pt')).toBe('pt');
    });

    it('should extract the base language code from a locale string', () => {
        expect(normalizeLocale('en-US')).toBe('en');
        expect(normalizeLocale('es-MX')).toBe('es');
        expect(normalizeLocale('pt-BR')).toBe('pt');
        expect(normalizeLocale('zh-TW')).toBe('zh');
        expect(normalizeLocale('zh-CN')).toBe('zh');
    });

    it('should handle uppercase or mixed case inputs', () => {
        expect(normalizeLocale('EN-us')).toBe('en');
        expect(normalizeLocale('Es-mx')).toBe('es');
        expect(normalizeLocale('PT-br')).toBe('pt');
        expect(normalizeLocale('DE')).toBe('de');
    });

    it('should return null if the base language is not supported', () => {
        expect(normalizeLocale('ru-RU')).toBeNull();
        expect(normalizeLocale('it')).toBeNull();
        expect(normalizeLocale('nl-NL')).toBeNull();
    });

    it('should handle locales with multiple dashes', () => {
        expect(normalizeLocale('en-US-POSIX')).toBe('en');
        expect(normalizeLocale('es-419-MX')).toBe('es');
    });
});
