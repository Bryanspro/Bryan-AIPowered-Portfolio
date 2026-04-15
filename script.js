document.addEventListener('DOMContentLoaded', () => {
    // 1. Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // ========================================================
    // MULTILINGUAL TRANSLATION SYSTEM
    // ========================================================
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
    let currentPortfolioLang = 'en';
    let currentTranslations = null;

    // Normalize browser locale to supported code (e.g. en-US -> en, pt-BR -> pt)
    function normalizeLocale(locale) {
        if (!locale) return null;
        const base = locale.split('-')[0].toLowerCase();
        return SUPPORTED_LANGUAGES.find(l => l.code === base) ? base : null;
    }

    // Detect language: localStorage -> browser -> fallback to 'en'
    function detectLanguage() {
        // 1. Check localStorage
        const saved = localStorage.getItem('portfolio-lang');
        if (saved && SUPPORTED_LANGUAGES.find(l => l.code === saved)) {
            return saved;
        }
        // 2. Check browser languages
        const browserLangs = navigator.languages || [navigator.language || navigator.userLanguage || 'en'];
        for (const bl of browserLangs) {
            const normalized = normalizeLocale(bl);
            if (normalized) return normalized;
        }
        // 3. Default
        return 'en';
    }

    // Load translations from JSON file (with cache)
    async function loadTranslations(lang) {
        if (translationCache[lang]) return translationCache[lang];
        try {
            const response = await fetch(`locales/${lang}.json?v=${Date.now()}`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            translationCache[lang] = data;
            return data;
        } catch (err) {
            console.error(`Failed to load translations for ${lang}:`, err);
            // Fallback to English if not already English
            if (lang !== 'en') return loadTranslations('en');
            return null;
        }
    }

    // Apply translations to all [data-i18n] elements
    function applyTranslations(dict) {
        if (!dict) return;
        
        // Translate inner HTML
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key] !== undefined) {
                el.innerHTML = dict[key];
            }
        });
        
        // Translate titles (tooltips)
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            if (dict[key] !== undefined) {
                el.setAttribute('title', dict[key]);
            }
        });
        
        // Translate aria-labels
        document.querySelectorAll('[data-i18n-aria]').forEach(el => {
            const key = el.getAttribute('data-i18n-aria');
            if (dict[key] !== undefined) {
                el.setAttribute('aria-label', dict[key]);
            }
        });
    }

    // Apply the ctaChangelog button with its SVG icon prefix
    function applyChangelogButton(dict) {
        if (!dict || !dict.ctaChangelog) return;
        const clBtn = document.querySelector('.changelog-cta-btn');
        if (clBtn) {
            clBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" style="vertical-align: -2px; margin-right: 4px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg> ${dict.ctaChangelog}`;
        }
    }

    // Build or rebuild the dropdown list
    function buildDropdown(activeLang) {
        const dropdown = document.getElementById('lang-dropdown');
        if (!dropdown) return;
        dropdown.innerHTML = '';

        // Sort: active language first, then the rest in original order
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
            li.addEventListener('click', () => setPortfolioLanguage(lang.code));
            li.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setPortfolioLanguage(lang.code);
                }
            });
            dropdown.appendChild(li);

            // Add separator after active language
            if (index === 0) {
                const sep = document.createElement('li');
                sep.className = 'lang-separator';
                sep.setAttribute('role', 'separator');
                dropdown.appendChild(sep);
            }
        });
    }

    // Dropdown toggle behavior
    function initDropdownBehavior() {
        const btn = document.getElementById('lang-selector-btn');
        const dropdown = document.getElementById('lang-dropdown');
        if (!btn || !dropdown) return;

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = dropdown.classList.contains('open');
            if (isOpen) {
                closeDropdown();
            } else {
                openDropdown();
            }
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            const selector = document.getElementById('lang-selector');
            if (selector && !selector.contains(e.target)) {
                closeDropdown();
            }
        });

        // Keyboard navigation
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeDropdown();
                btn.focus();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (!dropdown.classList.contains('open')) openDropdown();
                const firstOption = dropdown.querySelector('.lang-option');
                if (firstOption) firstOption.focus();
            }
        });

        dropdown.addEventListener('keydown', (e) => {
            const options = [...dropdown.querySelectorAll('.lang-option')];
            const focused = document.activeElement;
            const idx = options.indexOf(focused);

            if (e.key === 'Escape') {
                closeDropdown();
                btn.focus();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                const next = options[idx + 1] || options[0];
                next.focus();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prev = options[idx - 1] || options[options.length - 1];
                prev.focus();
            }
        });
    }

    function openDropdown() {
        const btn = document.getElementById('lang-selector-btn');
        const dropdown = document.getElementById('lang-dropdown');
        if (!btn || !dropdown) return;
        dropdown.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
    }

    function closeDropdown() {
        const btn = document.getElementById('lang-selector-btn');
        const dropdown = document.getElementById('lang-dropdown');
        if (!btn || !dropdown) return;
        dropdown.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
    }

    // Main language switching function
    async function setPortfolioLanguage(lang, fromSync = false) {
        if (currentPortfolioLang === lang && fromSync) return;

        const langDef = SUPPORTED_LANGUAGES.find(l => l.code === lang);
        if (!langDef) return;

        const dict = await loadTranslations(lang);
        if (!dict) return;

        currentPortfolioLang = lang;
        currentTranslations = dict;

        // Apply translations to DOM
        applyTranslations(dict);
        applyChangelogButton(dict);

        // Update typewriter text and re-trigger animation
        const versionLabel = document.querySelector('.cl-tab-label');
        const latestVersion = versionLabel ? versionLabel.textContent.trim() : 'v1.5.1';
        // We always use v1.5 for the hero splash text as requested
        const heroVersion = 'v1.7';
        const typewriterKey = lang === 'en'
            ? `Initializing AI Developer Portfolio ${heroVersion}`
            : (dict.typewriter || `Initializing AI Developer Portfolio ${heroVersion}`);

        // Build typewriter text with version
        let typewriterText = typewriterKey;
        if (lang !== 'en' && dict.heroSubtitle) {
            // For non-English, use a custom pattern if available, else default
            // Convention: locales can define a base typewriter text; we append version
            const baseTypewriters = {
                es: `Inicializando Portafolio de Desarrollo IA ${heroVersion}`,
                pt: `Inicializando Portfólio de Desenvolvedor IA ${heroVersion}`,
                de: `Initialisierung des KI-Entwicklerportfolios ${heroVersion}`,
                fr: `Portfolio Développeur IA — Initialisation ${heroVersion}`,
                ja: `AI エンジニアポートフォリオの初期化中 ${heroVersion}`,
                ko: `AI 개발자 포트폴리오 초기화 중 ${heroVersion}`,
                zh: `正在初始化 AI 开发者作品集 ${heroVersion}`,
                ar: `جاري تهيئة ملف مطור الذكاء الاصطناعي ${heroVersion}`,
                hi: `AI डेवलपर पोर्टफोलियो प्रारंभ हो रहा है ${heroVersion}`,
                he: `מאתחל תיק עבודות של מפתח בינה מלאכותית ${heroVersion}`
            };
            typewriterText = baseTypewriters[lang] || typewriterKey;
        }

        const typeWriterEl = document.getElementById('typewriter');
        if (typeWriterEl) {
            typeWriterEl.textContent = '';
            charIndex = 0;
            textToType = typewriterText;
            const glitchEl = document.querySelector('.glitch-text');
            if (glitchEl) glitchEl.setAttribute('data-text', typewriterText);
            type();
        }

        // Update button label
        const codeDisplay = document.getElementById('lang-code-display');
        if (codeDisplay) codeDisplay.textContent = lang.toUpperCase();

        // Update RTL/LTR
        document.documentElement.dir = langDef.dir;
        document.documentElement.lang = lang;

        // Rebuild dropdown with active language on top
        buildDropdown(lang);

        // Close dropdown
        closeDropdown();

        // Save to localStorage
        localStorage.setItem('portfolio-lang', lang);

        // Sync chatbox language if loaded
        if (!fromSync && typeof setLanguage === 'function') {
            setLanguage(lang, true);
        }
    }

    // Expose globally so chatbox can call it
    window.setPortfolioLanguage = setPortfolioLanguage;
    window.currentPortfolioLang = () => currentPortfolioLang;

    // Initialize i18n system
    async function initI18n() {
        const detectedLang = detectLanguage();
        buildDropdown(detectedLang);
        initDropdownBehavior();
        await setPortfolioLanguage(detectedLang);
    }

    // initI18n is called after type() is defined below

    // ========================================================
    // 2. Typing Effect for Hero Section
    // ========================================================
    const typeWriterElement = document.getElementById('typewriter');
    let textToType = 'Initializing AI Developer Portfolio';
    let charIndex = 0;

    function type() {
        if (charIndex < textToType.length) {
            typeWriterElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        }
    }

    // Kick off the i18n system now that type() is defined
    initI18n();

    // ========================================================
    // 3. Scroll Reveal Animations (Intersection Observer)
    // ========================================================
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // ========================================================
    // 4. Background Music (YouTube API)
    // ========================================================
    const musicBtn = document.getElementById('music-toggle-btn');
    const musicIcon = document.getElementById('music-icon');
    let isPlaying = false;
    let isPlayerReady = false;
    let playPending = false;
    let isFallbackMode = false;

    // The YouTube API will call this when it's ready. We define it globally.
    window.onYouTubeIframeAPIReady = function () {
        window.ytPlayer = new YT.Player('youtube-player-container', {
            height: '100%',
            width: '100%',
            // Video ID defaults to the provided track
            videoId: 'zpJk89JJdRk',
            // Load a specific playlist
            playerVars: {
                'autoplay': 0,
                'controls': 0,
                'loop': 1,
                // Commas separated list of video IDs
                'playlist': 'zpJk89JJdRk,9o0WLOJCHvk,QOaScWimga8'
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange,
                'onError': onPlayerError
            }
        });
    };
    
    // Array of vertical video IDs (Shorts)
    const verticalVideoIDs = ['zpJk89JJdRk'];
    
    function updatePlayerOrientation() {
        if (!window.ytPlayer || !window.ytPlayer.getVideoData) return;
        
        try {
            const videoData = window.ytPlayer.getVideoData();
            const currentVidId = videoData.video_id;
            const playerBody = document.querySelector('.music-player-body');
            const modal = document.getElementById('music-player-modal');
            
            if (playerBody && currentVidId) {
                if (verticalVideoIDs.includes(currentVidId)) {
                    playerBody.style.setProperty('--player-aspect', '9 / 16');
                    if (modal) {
                        modal.classList.add('vertical-mode');
                        modal.style.width = window.innerWidth > 600 ? '240px' : ''; 
                    }
                } else {
                    playerBody.style.setProperty('--player-aspect', '16 / 9');
                    if (modal) {
                        modal.classList.remove('vertical-mode');
                        modal.style.width = window.innerWidth > 600 ? '320px' : ''; 
                    }
                }
            }
        } catch (e) {
            console.error('Error fetching video data', e);
        }
    }

    // Start player automatically after 7 seconds
    setTimeout(() => {
        if (!isPlaying) {
            // If already in fallback mode, switchToFallback() handles it
            if (isFallbackMode) return;

            if (isPlayerReady && window.ytPlayer) {
                const modal = document.getElementById('music-player-modal');
                if (modal && modal.classList.contains('hidden')) {
                    modal.classList.remove('hidden');
                }
                
                // Make the modal's play button blink for 5 seconds when it autostarts
                const playBtnInModal = document.getElementById('btn-play-pause-track');
                if (playBtnInModal) {
                    playBtnInModal.classList.add('blink-action');
                    setTimeout(() => {
                        if (playBtnInModal) playBtnInModal.classList.remove('blink-action');
                    }, 5000);
                }
                
                // Direct play call as originally tested
                window.ytPlayer.playVideo();
            } else {
                playPending = true;
            }
        }
    }, 7000);

    // Load the YouTube Iframe API asynchronously
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    function onPlayerReady(event) {
        isPlayerReady = true;
        // If the user clicked play before the frame loaded, fulfill their request!
        if (playPending && !isFallbackMode) {
            playPending = false;
            musicBtn.click();
        }
    }

    function onPlayerStateChange(event) {
        const playPauseBtn = document.getElementById('btn-play-pause-track');
        if (event.data == YT.PlayerState.PLAYING) {
            isPlaying = true;
            document.body.classList.add('music-active');
            if (musicBtn) musicBtn.classList.add('active-music');
            if (playPauseBtn) playPauseBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>';
            updatePlayerOrientation();
        } else if (event.data == YT.PlayerState.PAUSED || event.data == YT.PlayerState.ENDED) {
            isPlaying = false;
            document.body.classList.remove('music-active');
            const modal = document.getElementById('music-player-modal');
            if (modal && modal.classList.contains('hidden') && musicBtn) {
                musicBtn.classList.remove('active-music');
            }
            if (playPauseBtn) playPauseBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg>';
        }
    }

    // ---- YouTube error handler → triggers local MP4 fallback ----
    function onPlayerError(event) {
        // Error codes: 2=invalid ID, 5=HTML5 error, 100=not found/private, 101/150=embedding blocked
        console.warn('[MusicPlayer] YouTube error code:', event.data, '— switching to local fallback.');
        switchToFallback();
    }

    function switchToFallback() {
        if (isFallbackMode) return; // prevent double-trigger
        isFallbackMode = true;

        // Hide the YT iframe container
        const ytContainer = document.getElementById('youtube-player-container');
        if (ytContainer) ytContainer.style.display = 'none';

        // Show the fallback video
        const fallback = document.getElementById('fallback-video-player');
        if (!fallback) return;
        fallback.style.display = 'block';

        // Force 9:16 vertical mode since it's the same short-style video
        const playerBody = document.querySelector('.music-player-body');
        const modal = document.getElementById('music-player-modal');
        if (playerBody) playerBody.style.setProperty('--player-aspect', '9 / 16');
        if (modal) {
            modal.classList.add('vertical-mode');
            modal.style.width = window.innerWidth > 600 ? '240px' : '';
        }

        // Reveal the modal if hidden
        if (musicPlayerModal && musicPlayerModal.classList.contains('hidden')) {
            musicPlayerModal.classList.remove('hidden');
        }

        // Wire fallback video events to keep UI in sync
        fallback.addEventListener('play', () => {
            isPlaying = true;
            document.body.classList.add('music-active');
            if (musicBtn) musicBtn.classList.add('active-music');
            const ppBtn = document.getElementById('btn-play-pause-track');
            if (ppBtn) ppBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>';
        });
        fallback.addEventListener('pause', () => {
            isPlaying = false;
            document.body.classList.remove('music-active');
            const ppBtn = document.getElementById('btn-play-pause-track');
            if (ppBtn) ppBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg>';
        });

        // Attempt autoplay (browser may block without prior interaction)
        fallback.play().then(() => {
            const ppBtn = document.getElementById('btn-play-pause-track');
            if (ppBtn) {
                ppBtn.classList.add('blink-action');
                setTimeout(() => ppBtn.classList.remove('blink-action'), 5000);
            }
        }).catch(() => {
            // Autoplay blocked — user can click play manually
            console.info('[MusicPlayer] Fallback autoplay blocked, awaiting user interaction.');
        });
    }

    const musicPlayerModal = document.getElementById('music-player-modal');
    const closeMusicPlayerBtn = document.getElementById('close-music-player-btn');
    const playPauseBtn = document.getElementById('btn-play-pause-track');
    const prevTrackBtn = document.getElementById('btn-prev-track');
    const nextTrackBtn = document.getElementById('btn-next-track');

    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', () => {
            playPauseBtn.classList.remove('blink-action');
            if (isFallbackMode) {
                const fallback = document.getElementById('fallback-video-player');
                if (fallback) {
                    if (isPlaying) { fallback.pause(); } else { fallback.play().catch(() => {}); }
                }
                return;
            }
            if (isPlaying) {
                window.ytPlayer.pauseVideo();
            } else {
                window.ytPlayer.playVideo();
            }
        });
    }

    if (prevTrackBtn) {
        prevTrackBtn.addEventListener('click', () => {
            if (isFallbackMode) {
                const fallback = document.getElementById('fallback-video-player');
                if (fallback) { fallback.currentTime = 0; fallback.play().catch(() => {}); }
                return;
            }
            window.ytPlayer.previousVideo();
        });
    }

    if (nextTrackBtn) {
        nextTrackBtn.addEventListener('click', () => {
            if (isFallbackMode) {
                const fallback = document.getElementById('fallback-video-player');
                if (fallback) { fallback.currentTime = 0; fallback.play().catch(() => {}); }
                return;
            }
            window.ytPlayer.nextVideo();
        });
    }

    if (musicBtn) {
        musicBtn.addEventListener('click', () => {
            // Fallback video mode
            if (isFallbackMode) {
                const fallback = document.getElementById('fallback-video-player');
                if (musicPlayerModal) {
                    const isHidden = musicPlayerModal.classList.contains('hidden');
                    if (isHidden) {
                        musicPlayerModal.classList.remove('hidden');
                        if (fallback && fallback.paused) fallback.play().catch(() => {});
                        musicBtn.classList.add('active-music');
                    } else {
                        musicPlayerModal.classList.add('hidden');
                        if (!isPlaying) musicBtn.classList.remove('active-music');
                    }
                }
                return;
            }

            if (!isPlayerReady || !window.ytPlayer) {
                // Silently queue the request instead of throwing an annoying alert
                playPending = true;
                return;
            }

            if (musicPlayerModal) {
                const isHidden = musicPlayerModal.classList.contains('hidden');
                if (isHidden) {
                    musicPlayerModal.classList.remove('hidden');
                    window.ytPlayer.playVideo();
                    musicBtn.classList.add('active-music');
                } else {
                    musicPlayerModal.classList.add('hidden');
                    // Do not pause the video when closing the modal, just hide UI
                    if (!isPlaying) {
                        musicBtn.classList.remove('active-music');
                    }
                }
            }
        });
    }

    if (closeMusicPlayerBtn) {
        closeMusicPlayerBtn.addEventListener('click', () => {
            if (musicPlayerModal) {
                musicPlayerModal.classList.add('hidden');
            }
            if (!isPlaying && musicBtn) {
                musicBtn.classList.remove('active-music');
            }
        });
    }

    // ========================================================
    // 5. Neural Network Background Canvas
    // ========================================================
    initCanvas();

    // ========================================================
    // 6. Project Carousel
    // ========================================================
    const carousel = document.getElementById('project-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (carousel && prevBtn && nextBtn) {
        const getScrollAmount = () => {
            const card = carousel.querySelector('.project-card');
            if (!card) return 300;
            const gap = parseFloat(getComputedStyle(carousel).gap) || 32;
            return card.offsetWidth + gap;
        };

        prevBtn.addEventListener('click', () => {
            const scrollAmount = getScrollAmount();
            if (carousel.scrollLeft <= 5) {
                // At the start — jump to the end
                carousel.scrollTo({ left: carousel.scrollWidth, behavior: 'smooth' });
            } else {
                carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        });

        nextBtn.addEventListener('click', () => {
            const scrollAmount = getScrollAmount();
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;
            if (carousel.scrollLeft >= maxScroll - 5) {
                // At the end — jump back to start
                carousel.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        });

        // Auto-scroll: slowly advance every 4 seconds
        let autoScrollInterval = null;
        let isHovering = false;

        function startAutoScroll() {
            if (autoScrollInterval) return;
            autoScrollInterval = setInterval(() => {
                if (isHovering) return;
                const maxScroll = carousel.scrollWidth - carousel.clientWidth;
                if (carousel.scrollLeft >= maxScroll - 5) {
                    // Loop back to the start
                    carousel.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    carousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
                }
            }, 6000);
        }

        // Pause on hover, resume on leave
        const carouselContainer = carousel.closest('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => { isHovering = true; });
            carouselContainer.addEventListener('mouseleave', () => { isHovering = false; });
        }

        startAutoScroll();
    }

    // ========================================================
    // 7. Template Viewer Logic
    // ========================================================
    const templatesData = [
        { id: 'travela', name: 'Wanderlust', type: 'Travel', src: 'Template/travela-1.0.0/travela-1.0.0/index.html', emoji: '✈️' },
        { id: 'medilab', name: 'HealthCare+', type: 'Medical', src: 'Template/MediLab-1.0.0/MediLab-1.0.0/index.html', emoji: '⚕️' },
        { id: 'pizza', name: 'Pizza Roma', type: 'Restaurant', src: 'Template/pizza-gh-pages/pizza-gh-pages/index.html', emoji: '🍕' },
        { id: 'kelly', name: 'Aurora Studio', type: 'Personal Profile', src: 'Template/Kelly-1.0.0/Kelly-1.0.0/index.html', emoji: '💼' },
        { id: 'game', name: 'GameZone', type: 'Gaming', src: 'Template/game-warrior-gh-pages/index.html', emoji: '🎮' },
        { id: 'sport', name: 'SportsPro', type: 'Competition', src: 'Template/sports-master/sports-master/index.html', emoji: '🏆' },
        { id: 'ai', name: 'Nexus.AI', type: 'Tech & AI', src: 'Template/AI-html-1.0.0/index.html', emoji: '🤖' },
        { id: 'gym', name: 'IronFitness', type: 'Gym', src: 'Template/gymlife-master/index.html', emoji: '💪' }
    ];

    const proj1Link = document.getElementById('proj1-link');
    const viewerOverlay = document.getElementById('template-viewer');
    const closeViewerBtn = document.getElementById('close-viewer-btn');
    const templateGallery = document.getElementById('template-gallery');

    // Populate gallery
    if (templateGallery) {
        templateGallery.style.alignContent = 'start';

        const templateGradients = {
            'travela': 'linear-gradient(135deg, #0a1a2e 0%, #0d2a40 40%, #0a1828 100%)',
            'medilab': 'linear-gradient(135deg, #0d1a20 0%, #0a2828 40%, #0d1a1a 100%)',
            'pizza': 'linear-gradient(135deg, #1a0d00 0%, #2e1800 40%, #1a0a00 100%)',
            'kelly': 'linear-gradient(135deg, #1a0a2e 0%, #2a1040 40%, #0d0a1a 100%)',
            'game': 'linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 40%, #0d1a2e 100%)',
            'sport': 'linear-gradient(135deg, #0d1a10 0%, #102818 40%, #0a1a20 100%)',
            'ai': 'linear-gradient(135deg, #0a1a2e 0%, rgba(0,240,255,0.12) 50%, #0d0a1a 100%)',
            'gym': 'linear-gradient(135deg, #1a1000 0%, #2e1800 40%, #1a0808 100%)'
        };

        templatesData.forEach(template => {
            const card = document.createElement('div');
            card.className = 'template-card-item glass';
            const gradient = templateGradients[template.id] || 'linear-gradient(135deg, #0d1117 0%, #1a2332 100%)';

            card.innerHTML = `
                <div class="app-card-icon-area" style="background: ${gradient};">
                    <span class="icon-emoji">${template.emoji}</span>
                </div>
                <div class="card-launch-arrow">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </div>
                <div class="app-card-body">
                    <h4>${template.name}</h4>
                    <div class="app-card-footer">
                        <span class="tag" style="font-size: 0.68rem; padding: 0.2rem 0.5rem;">${template.type}</span>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => {
                // Open template directly in a new tab
                window.open(template.src, '_blank');
            });

            templateGallery.appendChild(card);
        });
    }

    if (proj1Link && viewerOverlay) {
        proj1Link.addEventListener('click', (e) => {
            e.preventDefault();
            viewerOverlay.classList.remove('hidden');
            // Reset to gallery view
            templateGallery.classList.remove('hidden');
        });
    }

    if (closeViewerBtn) {
        closeViewerBtn.addEventListener('click', () => {
            viewerOverlay.classList.add('hidden');
        });
    }

    // Close on click outside modal content
    if (viewerOverlay) {
        viewerOverlay.addEventListener('click', (e) => {
            if (e.target === viewerOverlay) {
                viewerOverlay.classList.add('hidden');
            }
        });
    }

    // ========================================================
    // 8. Game Viewer Logic
    // ========================================================
    const gamesData = [
        { id: 'pacman', name: 'Ms Pacman', desc: 'A fully functional classic written in JS and HTML5 Canvas. Credits: 8tentaculos', tags: ['JavaScript', 'Canvas', 'Game Dev'], icon: 'Games/jsPacman-master/public/android-chrome-256x256.png', src: 'Games/jsPacman-master/src/index.html' },
        { id: 'emoji-match', name: 'Emoji Memory Match', desc: 'A clean interactive memory match game featuring emojis, custom CSS, and JS logic', tags: ['JavaScript', 'CSS', 'Web Game'], icon: '', emoji: '🧠', src: 'Games/emoji-memory/index.html' },
        { id: 'tetris', name: 'Tetris JS', desc: 'A fluid web-based Tetris clone built using pure JavaScript, HTML5 Canvas, and modern CSS3.', tags: ['JavaScript', 'Arcade', 'Game Dev'], icon: '', emoji: '🧩', src: 'Games/tetr.js-master/tetr.js-master/index.html' },
        { id: '2048', name: 'Cyber 2048', desc: 'A sleek, minimalist clone of the classic 2048 game featuring 2D matrix transformations, mobile touch support, and a responsive neon UI.', tags: ['JavaScript', 'Algorithms', 'Logic'], icon: '', emoji: '🧮', src: 'Games/cyber-2048/index.html' }
    ];

    const proj2Link = document.getElementById('proj2-link');
    const gameViewerOverlay = document.getElementById('game-viewer');
    const closeGameViewerBtn = document.getElementById('close-game-viewer-btn');
    const gameGallery = document.getElementById('game-gallery');

    if (gameGallery) {
        gameGallery.style.alignContent = 'start';

        gamesData.forEach(game => {
            const card = document.createElement('div');
            card.className = 'template-card-item glass';

            // Unique gradient per game
            const gameGradients = {
                'pacman': 'linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 40%, #0d1a2e 100%)',
                'emoji-match': 'linear-gradient(135deg, #0a1a0d 0%, #1a2e10 40%, #0d1a20 100%)',
                'tetris': 'linear-gradient(135deg, #0a1a2e 0%, #102040 40%, #1a0a2e 100%)',
                '2048': 'linear-gradient(135deg, #1a1000 0%, #2e2000 40%, #1a0a00 100%)'
            };
            const gradient = gameGradients[game.id] || 'linear-gradient(135deg, #0d1117 0%, #1a2332 100%)';

            const iconDisplay = game.emoji
                ? `<span class="icon-emoji">${game.emoji}</span>`
                : `<div style="width:70px;height:70px;background-image:url('${game.icon}');background-size:contain;background-position:center;background-repeat:no-repeat;"></div>`;

            card.innerHTML = `
                <div class="app-card-icon-area" style="background: ${gradient};">
                    ${iconDisplay}
                </div>
                <div class="card-launch-arrow">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </div>
                <div class="app-card-body">
                    <h4>${game.name}</h4>
                    <p>${game.desc}</p>
                    <div class="app-card-footer">
                        ${game.tags.map(t => `<span class="tag" style="font-size: 0.68rem; padding: 0.2rem 0.5rem;">${t}</span>`).join('')}
                    </div>
                </div>
            `;

            card.addEventListener('click', () => {
                if (game.id === 'pacman' && isPlaying) {
                    musicBtn.click();
                }
                window.open(game.src, '_blank');
            });

            gameGallery.appendChild(card);
        });
    }

    if (proj2Link && gameViewerOverlay) {
        proj2Link.addEventListener('click', (e) => {
            e.preventDefault();
            gameViewerOverlay.classList.remove('hidden');
            gameGallery.classList.remove('hidden');
        });
    }

    if (closeGameViewerBtn) {
        closeGameViewerBtn.addEventListener('click', () => {
            gameViewerOverlay.classList.add('hidden');
        });
    }

    if (gameViewerOverlay) {
        gameViewerOverlay.addEventListener('click', (e) => {
            if (e.target === gameViewerOverlay) {
                gameViewerOverlay.classList.add('hidden');
            }
        });
    }

    // ========================================================
    // 9. App Viewer Logic
    // ========================================================
    const appsData = [
        { id: 'chrono', name: 'Chrono Clock', desc: 'A multifunctional mobile clock with alarms, world times, stopwatches, timers, Pomodoro, and Mock Voice setup.', tags: ['JavaScript', 'HTML/CSS', 'UI/UX'], icon: '', emoji: '⏱️', src: 'Apps/clock-app/index.html' },
        { id: 'planflow', name: 'PlanFlow', desc: 'A full-stack mobile planner app featuring local CRUD, Pomodoro integration, analytics, and responsive gestures.', tags: ['JavaScript', 'Storage', 'Productivity'], icon: '', emoji: '🗓️', src: 'Apps/planflow/index.html' },
        { id: 'artvault', name: 'ArtVault', desc: 'A curated gallery of 6 famous historical artworks with an elegant dark-theme museum layout and local favorites tracking.', tags: ['JavaScript', 'HTML/CSS', 'History'], icon: '', emoji: '🖼️', src: 'Apps/artvault/index.html' },
        { id: 'booknest', name: 'BookNest', desc: 'A digital library app to track reading progress, manage book statuses, and store personal notes.', tags: ['JavaScript', 'Storage', 'Books'], icon: '', emoji: '📚', src: 'Apps/booknest/index.html' },
        { id: 'chronos-elegance', name: 'Chronos Elegance', desc: 'A sleek, interactive modern watch face built with React, featuring elegant typography and fluid transitions.', tags: ['React', 'Tailwind', 'UI/UX'], icon: '', emoji: '⌚', src: 'Apps/chronos-elegance/index.html' }
    ];

    const proj3Link = document.getElementById('proj3-link');
    const appViewerOverlay = document.getElementById('app-viewer');
    const closeAppViewerBtn = document.getElementById('close-app-viewer-btn');
    const appGallery = document.getElementById('app-gallery');

    if (appGallery) {
        appGallery.style.alignContent = 'start';

        appsData.forEach(app => {
            const card = document.createElement('div');
            card.className = 'template-card-item glass';

            // Unique gradient per app
            const appGradients = {
                'chrono': 'linear-gradient(135deg, #0a1a2e 0%, #0d2040 40%, #0a182a 100%)',
                'planflow': 'linear-gradient(135deg, #0d1a10 0%, #102818 40%, #0a1a20 100%)',
                'artvault': 'linear-gradient(135deg, #1a0d2e 0%, #2a1040 40%, #0d0a1a 100%)',
                'booknest': 'linear-gradient(135deg, #1a1000 0%, #2e1800 40%, #1a0808 100%)',
                'chronos-elegance': 'linear-gradient(135deg, #0a0a1a 0%, #101028 40%, #0a1020 100%)'
            };
            const gradient = appGradients[app.id] || 'linear-gradient(135deg, #0d1117 0%, #1a2332 100%)';

            card.innerHTML = `
                <div class="app-card-icon-area" style="background: ${gradient};">
                    <span class="icon-emoji">${app.emoji || '📱'}</span>
                </div>
                <div class="card-launch-arrow">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </div>
                <div class="app-card-body">
                    <h4>${app.name}</h4>
                    <p>${app.desc}</p>
                    <div class="app-card-footer">
                        ${app.tags.map(t => `<span class="tag" style="font-size: 0.68rem; padding: 0.2rem 0.5rem;">${t}</span>`).join('')}
                    </div>
                </div>
            `;

            card.addEventListener('click', () => {
                window.open(app.src, '_blank');
            });

            appGallery.appendChild(card);
        });
    }

    if (proj3Link && appViewerOverlay) {
        proj3Link.addEventListener('click', (e) => {
            e.preventDefault();
            appViewerOverlay.classList.remove('hidden');
            appGallery.classList.remove('hidden');
        });
    }

    if (closeAppViewerBtn) {
        closeAppViewerBtn.addEventListener('click', () => {
            appViewerOverlay.classList.add('hidden');
        });
    }

    if (appViewerOverlay) {
        appViewerOverlay.addEventListener('click', (e) => {
            if (e.target === appViewerOverlay) {
                appViewerOverlay.classList.add('hidden');
            }
        });
    }

    // ========================================================
    // 10. AI Apps Viewer Logic
    // ========================================================
    const aiAppsData = [
        { id: 'ai-chatbox', name: 'AI Chatbox', desc: 'An intelligent conversational AI assistant powered by Gemini with multi-turn context, TTS, and smart fallback answers.', tags: ['GenAI', 'JavaScript', 'TTS'], icon: '', emoji: '🤖', src: 'Apps/ai-chatbox/index.html' },
        { id: 'ai-summarizer', name: 'AI Text Summarizer', desc: 'Paste text and get AI-generated summaries, key points extraction, and EN/ES translation.', tags: ['GenAI', 'NLP', 'JavaScript'], icon: '', emoji: '📝', src: 'Apps/ai-summarizer/index.html' },
        { id: 'ai-quiz', name: 'AI Quiz Generator', desc: 'Enter any topic and AI generates interactive multiple-choice quizzes with scoring and timed questions.', tags: ['GenAI', 'JSON', 'JavaScript'], icon: '', emoji: '🧠', src: 'Apps/ai-quiz/index.html' },
        { id: 'ai-mood-journal', name: 'AI Mood Journal', desc: 'Write journal entries and AI analyzes your mood. Track emotional trends with charts and streaks.', tags: ['GenAI', 'Sentiment', 'Storage'], icon: '', emoji: '📓', src: 'Apps/ai-mood-journal/index.html' }
    ];

    const proj4Link = document.getElementById('proj4-link');
    const aiAppViewerOverlay = document.getElementById('ai-app-viewer');
    const closeAIAppViewerBtn = document.getElementById('close-ai-app-viewer-btn');
    const aiAppGallery = document.getElementById('ai-app-gallery');

    if (aiAppGallery) {
        aiAppGallery.style.alignContent = 'start';

        aiAppsData.forEach(app => {
            const card = document.createElement('div');
            card.className = 'template-card-item glass';

            // AI gradient backgrounds
            const aiGradients = {
                'ai-chatbox': 'linear-gradient(135deg, #0a1a2e 0%, rgba(0,240,255,0.12) 50%, #0d0a1a 100%)',
                'ai-summarizer': 'linear-gradient(135deg, #0d0a1a 0%, rgba(189,0,255,0.12) 50%, #0a1a2e 100%)',
                'ai-quiz': 'linear-gradient(135deg, #0a1a0d 0%, rgba(0,240,255,0.1) 40%, rgba(189,0,255,0.08) 100%)',
                'ai-mood-journal': 'linear-gradient(135deg, #1a0a10 0%, rgba(189,0,255,0.1) 50%, #0a0a1a 100%)'
            };
            const gradient = aiGradients[app.id] || 'linear-gradient(135deg, rgba(0,240,255,0.1), rgba(189,0,255,0.1))';

            card.innerHTML = `
                <div class="app-card-icon-area" style="background: ${gradient};">
                    <span class="icon-emoji">${app.emoji}</span>
                </div>
                <div class="card-launch-arrow">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </div>
                <div class="app-card-body">
                    <h4>${app.name}</h4>
                    <p>${app.desc}</p>
                    <div class="app-card-footer">
                        ${app.tags.map(t => `<span class="tag" style="font-size: 0.68rem; padding: 0.2rem 0.5rem;">${t}</span>`).join('')}
                    </div>
                </div>
            `;

            card.addEventListener('click', () => {
                if (app.id === 'ai-chatbox') {
                    const width = 550;
                    const height = 750;
                    const left = (window.screen.width/2) - (width/2);
                    const top = (window.screen.height/2) - (height/2);
                    window.open(app.src, 'AIChatbox', `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no,status=no`);
                } else {
                    window.open(app.src, '_blank');
                }
            });

            aiAppGallery.appendChild(card);
        });
    }

    if (proj4Link && aiAppViewerOverlay) {
        proj4Link.addEventListener('click', (e) => {
            e.preventDefault();
            aiAppViewerOverlay.classList.remove('hidden');
            aiAppGallery.classList.remove('hidden');
        });
    }

    if (closeAIAppViewerBtn) {
        closeAIAppViewerBtn.addEventListener('click', () => {
            aiAppViewerOverlay.classList.add('hidden');
        });
    }

    if (aiAppViewerOverlay) {
        aiAppViewerOverlay.addEventListener('click', (e) => {
            if (e.target === aiAppViewerOverlay) {
                aiAppViewerOverlay.classList.add('hidden');
            }
        });
    }

    // ========================================================
    // 11. Contact Form Logic
    // ========================================================
    const contactForm = document.getElementById('contact-form');
    const contactStatus = document.getElementById('contact-status');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Change button text while sending
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = (currentTranslations && currentTranslations.contactTransmitting) || 'Transmitting...';
            submitBtn.disabled = true;
            contactStatus.style.display = 'none';

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, message, source: 'Main Portfolio' })
                });

                if (response.ok) {
                    contactForm.reset();
                    contactStatus.textContent = (currentTranslations && currentTranslations.contactSuccess) || 'Transmission Successful!';
                    contactStatus.style.color = 'var(--accent-cyan)';
                    contactStatus.style.display = 'block';
                } else {
                    contactStatus.textContent = (currentTranslations && currentTranslations.contactError) || 'Transmission failed. Try again.';
                    contactStatus.style.color = '#ff4d4d'; // Red error color
                    contactStatus.style.display = 'block';
                }
            } catch (error) {
                contactStatus.textContent = (currentTranslations && currentTranslations.contactNetworkError) || 'Network error. Server offline.';
                contactStatus.style.color = '#ff4d4d';
                contactStatus.style.display = 'block';
            } finally {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});

function initCanvas() {
    const canvas = document.getElementById('neural-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 1.5 + 0.5;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 240, 255, 0.5)';
            ctx.fill();
        }
    }

    const particleCount = Math.floor((width * height) / 15000);
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        const isReduceMotion = document.body.hasAttribute('data-a11y-reduce-motion');

        for (let i = 0; i < particles.length; i++) {
            if (!isReduceMotion) {
                particles[i].update();
            }
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    const opacity = 1 - (distance / 120);
                    ctx.strokeStyle = `rgba(189, 0, 255, ${opacity * 0.2})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}

// ========================================================
// Changelog Toggle (global — used by onclick in HTML)
// ========================================================
function toggleChangelog(btn) {
    const body = btn.nextElementSibling;
    if (!body) return;

    const isOpen = body.classList.contains('open');

    // Toggle open state
    if (isOpen) {
        body.classList.remove('open');
        btn.classList.remove('is-open');
    } else {
        body.classList.add('open');
        btn.classList.add('is-open');
    }
}

// ========================================================
// Changelog Overlay Handlers
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
    const changelogOverlay = document.getElementById('changelog-viewer');
    const navChangelogLink = document.getElementById('nav-changelog-link');
    const closeChangelogBtn = document.getElementById('close-changelog-btn');

    // Nav link opens overlay
    if (navChangelogLink && changelogOverlay) {
        navChangelogLink.addEventListener('click', (e) => {
            e.preventDefault();
            changelogOverlay.classList.remove('hidden');
        });
    }

    // Close button
    if (closeChangelogBtn && changelogOverlay) {
        closeChangelogBtn.addEventListener('click', () => {
            changelogOverlay.classList.add('hidden');
        });
    }

    // Click outside to close
    if (changelogOverlay) {
        changelogOverlay.addEventListener('click', (e) => {
            if (e.target === changelogOverlay) {
                changelogOverlay.classList.add('hidden');
            }
        });
    }
});
