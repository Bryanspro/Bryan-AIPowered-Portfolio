document.addEventListener('DOMContentLoaded', () => {
    // 1. Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // ========================================================
    // BILINGUAL TRANSLATION SYSTEM
    // ========================================================
    const portfolioDict = {
        en: {
            // Nav
            navAbout: 'About',
            navSkills: 'Skills',
            navExperience: 'Experience',
            navProjects: 'Projects',
            navChangelog: 'Changelog',
            navContact: 'Contact',

            // Hero
            heroSubtitle: 'System Online: Wait for input...',
            typewriter: 'Initializing AI Developer Portfolio v1.0',
            heroDesc: "Hello World! I'm Bryan, a Software Engineer building modern, aesthetically refined software solutions powered by AI. I focus on transforming complex ideas into scalable, intelligent products with real-world impact.",
            ctaView: 'View Systems',
            ctaContact: 'Initialize Contact',
            ctaChangelog: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" style="vertical-align: -2px; margin-right: 4px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg> Changelog',

            // About
            aboutTitle: 'Core Directives <span class="accent">// About</span>',
            aboutP1: "My career as a Software Engineer is built on over 12 years of experience managing complex databases and automating critical workflows. After leading technical teams and driving operational success as a Technical Lead, I relocated to the United States to leverage my expertise in a new, high-growth environment. I've actively validated my journey by securing my official US High School Diploma and certifications, ensuring a seamless integration into the domestic tech market.",
            aboutP2: "Today, I specialize in Artificial Intelligence and <strong>intelligent systems development</strong>, leveraging a versatile stack that includes <strong>Python, PHP, SQL, JavaScript, HTML/CSS, and WordPress</strong> to build robust digital architectures. By integrating <strong>Generative AI and LLMs</strong> with my engineering foundation, I create smart, automated systems that are both efficient and accessible. My goal is to transform complex challenges into intelligent solutions with real-world impact.",
            statYears: 'Years Experience',
            statLanguages: 'Fluent Languages',
            statProjects: 'Projects Implemented',

            // Skills
            skillsTitle: 'Engineering Matrix <span class="accent">// Skills</span>',
            skillCat1: 'Languages & Systems',
            skillCat1Item3: 'SQL & Database Admin',
            skillCat1Item4: 'System Administration',
            skillCat2: 'AI & Automation',
            skillCat2Item1: 'Generative AI (LLMs)',
            skillCat2Item2: 'AI Engineering',
            skillCat2Item3: 'Prompt Engineering',
            skillCat2Item4: 'AI Agent Process Automation',
            skillCat3: 'Leadership & Skills',
            skillCat3Item1: 'Project Management',
            skillCat3Item2: 'Team Leadership',
            skillCat3Item3: 'Strategic Problem Solving',
            skillCat3Item4: 'Cross-Cultural Comm (EN/ES)',

            // Experience
            expTitle: 'Execution Timeline <span class="accent">// Experience</span>',
            expDate1: '2024 - 2025',
            expRole1: 'Customer Service & POS Associate',
            expDesc1: 'First professional experience in the US. Operated and troubleshot high-volume Point of Sale (POS) hardware and software. Ensured continuous, accurate daily transactions and delivered bilingual customer support in a fast-paced environment.',
            expDate2: '2015 - 2022',
            expRole2: 'Technical Lead & IT Manager',
            expDesc2: 'Led the development and maintenance of core web applications and databases. Automated workflows via custom scripts and successfully achieved >90% of business goals while navigating a severe national and industry crisis.',
            expDate3: '2018 - 2019',
            expRole3: 'Web Developer',
            expDesc3: 'Collaborated within an agile team to engineer a comprehensive website guiding visitors through the park\'s local flora and fauna. Programmed responsive and interactive interfaces utilizing WordPress, HTML, CSS, JavaScript, and MySQL.',

            // Projects
            projTitle: 'Compiled Outputs <span class="accent">// Projects</span>',
            proj1Title: 'Product Designer Showcase',
            proj1Desc: 'A curated showcase of modern portfolio layouts designed specifically for product designers, highlighting UX thinking, case studies, and visual storytelling.',
            proj2Title: 'Interactive Games',
            proj2Desc: 'A series of interactive game development projects exploring mechanics, system design, and real-time gameplay experiences.',
            proj3Title: 'Predictive Analytics Dashboard',
            proj3Desc: 'Real-time telemetry dashboard with predictive anomaly detection using time-series forecasting.',
            proj4Title: 'AI-Powered Applications',
            proj4Desc: 'A collection of intelligent applications that integrate artificial intelligence to enhance user interaction, automate tasks, and deliver smarter digital experiences.',
            viewSource: 'View Source ->',
            viewGamesGallery: 'Open Games Gallery ->',
            viewAppsGallery: 'Open Apps Gallery ->',
            viewAIApp: 'Open AI Apps Gallery ->',
            aiAppViewerTitle: 'AI-Powered Applications',

            // Contact
            contactTitle: 'Open Port <span class="accent">// Contact</span>',
            contactDesc: "Interested in building intelligent systems<br>or solving complex tech challenges?<br><br>Send a signal my way and let's start the conversation &mdash; response time: within 24 hours.",
            labelName: 'Your Name',
            labelEmail: 'Your Email',
            labelMessage: 'Message Payload',
            contactSubmit: 'Transmit Data',

            // Footer
            footer: `&copy; <span id="year">${new Date().getFullYear()}</span> Bryan Marquez &mdash; Software Engineer &middot; All rights reserved.`,

            // Viewer
            viewerTitle: 'Template Gallery',
            gameViewerTitle: 'Interactive Games Gallery',
            appViewerTitle: 'Applications Gallery',
            viewerBackBtn: '&larr; Back to Selection'
        },
        es: {
            // Nav
            navAbout: 'Acerca',
            navSkills: 'Habilidades',
            navExperience: 'Experiencia',
            navProjects: 'Proyectos',
            navChangelog: 'Registro',
            navContact: 'Contacto',

            // Hero
            heroSubtitle: 'Sistema en línea: Esperando entrada...',
            typewriter: 'Inicializando Portafolio de Desarrollador IA v1.0',
            heroDesc: '¡Hola Mundo! Soy Bryan, un Ingeniero de Software construyendo soluciones de software modernas y estéticamente refinadas impulsadas por IA. Me enfoco en transformar ideas complejas en productos escalables e inteligentes con impacto en el mundo real.',
            ctaView: 'Ver Sistemas',
            ctaContact: 'Iniciar Contacto',
            ctaChangelog: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" style="vertical-align: -2px; margin-right: 4px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg> Registro',

            // About
            aboutTitle: 'Directivas Base <span class="accent">// Acerca</span>',
            aboutP1: "Mi carrera como Ingeniero de Software se basa en más de 12 años de experiencia gestionando bases de datos complejas y automatizando flujos de trabajo críticos. Después de liderar equipos técnicos y lograr el éxito operativo como Líder Técnico, me mudé a los Estados Unidos para aprovechar mi experiencia en un nuevo entorno de alto crecimiento. He validado activamente mi trayectoria obteniendo mi diploma oficial de High School de EE. UU. y certificaciones, asegurando una integración perfecta en el mercado tecnológico nacional.",
            aboutP2: "Hoy, me especializo en Inteligencia Artificial y <strong>desarrollo de sistemas inteligentes</strong>, aprovechando un stack versátil que incluye <strong>Python, PHP, SQL, JavaScript, HTML/CSS y WordPress</strong> para construir arquitecturas digitales robustas. Al integrar <strong>IA Generativa y LLMs</strong> con mi base de ingeniería, creo sistemas inteligentes y automatizados que son a la vez eficientes y accesibles. Mi objetivo es transformar desafíos complejos en soluciones inteligentes con impacto en el mundo real.",
            statYears: 'Años de Experiencia',
            statLanguages: 'Idiomas Fluidos',
            statProjects: 'Proyectos Implementados',

            // Skills
            skillsTitle: 'Matriz de Ingeniería <span class="accent">// Habilidades</span>',
            skillCat1: 'Lenguajes y Sistemas',
            skillCat1Item3: 'SQL y Admin. de Base de Datos',
            skillCat1Item4: 'Administración de Sistemas',
            skillCat2: 'IA y Automatización',
            skillCat2Item1: 'IA Generativa (LLMs)',
            skillCat2Item2: 'Ingeniería de IA',
            skillCat2Item3: 'Ingeniería de Prompts',
            skillCat2Item4: 'Automatización con Agentes IA',
            skillCat3: 'Liderazgo y Habilidades',
            skillCat3Item1: 'Gestión de Proyectos',
            skillCat3Item2: 'Liderazgo de Equipos',
            skillCat3Item3: 'Resoluciones Estratégicas',
            skillCat3Item4: 'Com. Intercultural (EN/ES)',

            // Experience
            expTitle: 'Línea de Tiempo de Ejecución <span class="accent">// Experiencia</span>',
            expDate1: '2024 - 2025',
            expRole1: 'Asociado de Servicio al Cliente y POS',
            expDesc1: 'Primera experiencia profesional en EE. UU. Operé y resolví problemas de hardware y software de Punto de Venta (POS) de alto volumen. Me aseguré de realizar transacciones diarias continuas y precisas, y brindé atención al cliente bilingüe en un entorno de ritmo rápido.',
            expDate2: '2015 - 2022',
            expRole2: 'Líder Técnico y Gerente de TI',
            expDesc2: 'Lideré el desarrollo y mantenimiento de aplicaciones web centrales y bases de datos. Automaticé flujos de trabajo a través de scripts personalizados y logré con éxito >90% de los objetivos comerciales mientras navegaba por una grave crisis nacional y de la industria.',
            expDate3: '2018 - 2019',
            expRole3: 'Desarrollador Web',
            expDesc3: 'Colaboré dentro de un equipo ágil para diseñar un sitio web integral que guía a los visitantes a través de la flora y fauna local del parque. Programé interfaces responsivas e interactivas utilizando WordPress, HTML, CSS, JavaScript y MySQL.',

            // Projects
            projTitle: 'Resultados Compilados <span class="accent">// Proyectos</span>',
            proj1Title: 'Exhibición para Diseñadores de Producto',
            proj1Desc: 'Una muestra curada de diseños de portafolios modernos diseñados específicamente para diseñadores de producto, destacando el pensamiento UX, casos de estudio y narración visual.',
            proj2Title: 'Juegos Interactivos',
            proj2Desc: 'Una serie de proyectos de desarrollo de juegos interactivos explorando mecánicas, diseño de sistemas y experiencias de juego en tiempo real.',
            proj3Title: 'Dashboard de Analítica Predictiva',
            proj3Desc: 'Dashboard de telemetría en tiempo real con detección de anomalías predictivas usando pronósticos de series temporales.',
            proj4Title: 'Aplicaciones Impulsadas por IA',
            proj4Desc: 'Una colección de aplicaciones inteligentes que integran inteligencia artificial para mejorar la interacción del usuario, automatizar tareas y ofrecer experiencias digitales más inteligentes.',
            viewSource: 'Ver Código ->',
            viewGamesGallery: 'Abrir Galería de Juegos ->',
            viewAppsGallery: 'Abrir Galería de Apps ->',
            viewAIApp: 'Abrir Galería de Apps IA ->',
            aiAppViewerTitle: 'Aplicaciones Impulsadas por IA',

            // Contact
            contactTitle: 'Puerto Abierto <span class="accent">// Contacto</span>',
            contactDesc: "¿Interesado en construir sistemas inteligentes<br>o resolver desafíos tecnológicos complejos?<br><br>Envíame una señal y comencemos la conversación &mdash; tiempo de respuesta: 24 horas.",
            labelName: 'Tu Nombre',
            labelEmail: 'Tu Correo',
            labelMessage: 'Carga Útil del Mensaje',
            contactSubmit: 'Transmitir Datos',

            // Footer
            footer: `&copy; <span id="year">${new Date().getFullYear()}</span> Bryan Marquez &mdash; Ingeniero de Software &middot; Todos los derechos reservados.`,

            // Viewer
            viewerTitle: 'Galería de Plantillas',
            gameViewerTitle: 'Galería de Juegos Interactivos',
            appViewerTitle: 'Galería de Aplicaciones',
            viewerBackBtn: '&larr; Volver a la Selección'
        }
    };

    let currentPortfolioLang = 'en';

    // Apply translations to all data-i18n elements
    function setPortfolioLanguage(lang, fromSync = false) {
        if (currentPortfolioLang === lang && fromSync) return;
        currentPortfolioLang = lang;
        const dict = portfolioDict[lang];
        if (!dict) return;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key] !== undefined) {
                el.innerHTML = dict[key];
            }
        });

        // Update typewriter text and re-trigger animation
        const typeWriterEl = document.getElementById('typewriter');
        if (typeWriterEl) {
            typeWriterEl.textContent = '';
            charIndex = 0;
            textToType = dict.typewriter;
            // Update the glitch-text data attribute too
            const glitchEl = document.querySelector('.glitch-text');
            if (glitchEl) glitchEl.setAttribute('data-text', dict.typewriter);
            type();
        }

        // Update toggle button active states (portfolio)
        const enBtn = document.getElementById('portfolio-lang-en');
        const esBtn = document.getElementById('portfolio-lang-es');
        if (enBtn && esBtn) {
            enBtn.classList.toggle('active', lang === 'en');
            esBtn.classList.toggle('active', lang === 'es');
        }

        // Sync chatbox language if loaded
        if (!fromSync && typeof setLanguage === 'function') {
            setLanguage(lang, true);
        }
    }

    // Expose globally so chatbox can call it
    window.setPortfolioLanguage = setPortfolioLanguage;
    window.currentPortfolioLang = () => currentPortfolioLang;

    // Navbar language toggle listeners
    const portfolioEnBtn = document.getElementById('portfolio-lang-en');
    const portfolioEsBtn = document.getElementById('portfolio-lang-es');

    if (portfolioEnBtn) {
        portfolioEnBtn.addEventListener('click', () => setPortfolioLanguage('en'));
    }
    if (portfolioEsBtn) {
        portfolioEsBtn.addEventListener('click', () => setPortfolioLanguage('es'));
    }

    // ========================================================
    // 2. Typing Effect for Hero Section
    // ========================================================
    const typeWriterElement = document.getElementById('typewriter');
    let textToType = portfolioDict.en.typewriter;
    let charIndex = 0;

    function type() {
        if (charIndex < textToType.length) {
            typeWriterElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        }
    }

    // Start typing after a short delay
    setTimeout(type, 500);

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

    // The YouTube API will call this when it's ready. We define it globally.
    window.onYouTubeIframeAPIReady = function () {
        window.ytPlayer = new YT.Player('youtube-player-container', {
            height: '0',
            width: '0',
            // Video ID from the link "9o0WLOJCHvk"
            videoId: '9o0WLOJCHvk',
            playerVars: {
                'autoplay': 0,
                'controls': 0,
                // Loop the video
                'loop': 1,
                // For looping a single video, the playlist parameter must be set to the video ID
                'playlist': '9o0WLOJCHvk'
            },
            events: {
                'onReady': onPlayerReady
            }
        });
    };

    // Load the YouTube Iframe API asynchronously
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    function onPlayerReady(event) {
        isPlayerReady = true;
        // If the user clicked play before the frame loaded, fulfill their request!
        if (playPending) {
            playPending = false;
            // trigger the click naturally
            musicBtn.click();
        }
    }

    if (musicBtn) {
        musicBtn.addEventListener('click', () => {
            if (!isPlayerReady || !window.ytPlayer) {
                // Silently queue the request instead of throwing an annoying alert
                playPending = true;
                // Give a subtle indication if possible, or just wait
                return;
            }

            if (isPlaying) {
                window.ytPlayer.pauseVideo();
                isPlaying = false;
                musicBtn.classList.remove('active-music');
                document.body.classList.remove('music-active');
                // Change icon back to Play shape/Default music icon
                musicIcon.innerHTML = `
                    <path d="M9 18V5L21 3V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M6 21C7.65685 21 9 19.6569 9 18C9 16.3431 7.65685 15 6 15C4.34315 15 3 16.3431 3 18C3 19.6569 4.34315 21 6 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M18 19C19.6569 19 21 17.6569 21 16C21 14.3431 19.6569 13 18 13C16.3431 13 15 14.3431 15 16C15 17.6569 16.3431 19 18 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                `;
            } else {
                window.ytPlayer.playVideo();
                isPlaying = true;
                musicBtn.classList.add('active-music');
                document.body.classList.add('music-active');
                // Change icon to Stop/Pause shape to indicate it can be clicked to stop
                musicIcon.innerHTML = `
                    <rect x="6" y="4" width="4" height="16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <rect x="14" y="4" width="4" height="16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                `;
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
            carousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
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
            }, 3000);
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
        { id: 'travela', name: 'Wanderlust', type: 'Travel', src: 'Template/travela-1.0.0/travela-1.0.0/index.html', img: 'Template/travela-1.0.0/travela-1.0.0/tourism-website-template.jpg' },
        { id: 'medilab', name: 'HealthCare+', type: 'Medical', src: 'Template/MediLab-1.0.0/MediLab-1.0.0/index.html', img: 'Template/MediLab-1.0.0/MediLab-1.0.0/assets/img/hero-bg.jpg' },
        { id: 'pizza', name: 'Pizza Roma', type: 'Restaurant', src: 'Template/pizza-gh-pages/pizza-gh-pages/index.html', img: 'Template/pizza-gh-pages/pizza-gh-pages/images/bg_1.jpg' },
        { id: 'kelly', name: 'Aurora Studio', type: 'Personal Profile', src: 'Template/Kelly-1.0.0/Kelly-1.0.0/index.html', img: 'Template/Kelly-1.0.0/Kelly-1.0.0/assets/img/hero-bg.jpg' },
        { id: 'game', name: 'GameZone', type: 'Gaming', src: 'Template/game-warrior-gh-pages/index.html', img: 'Template/game-warrior-gh-pages/img/slider-1.jpg' },
        { id: 'sport', name: 'SportsPro', type: 'Competition', src: 'Template/sports-master/sports-master/index.html', img: 'Template/sports-master/sports-master/preview_img/preview.jpg' },
        { id: 'ai', name: 'Nexus.AI', type: 'Tech & AI', src: 'Template/AI-html-1.0.0/index.html', img: 'Template/AI-html-1.0.0/artificial-intelligence-html-template.jpg' },
        { id: 'gym', name: 'IronFitness', type: 'Gym', src: 'Template/gymlife-master/index.html', img: 'Template/gymlife-master/img/banner-bg.jpg' }
    ];

    const proj1Link = document.getElementById('proj1-link');
    const viewerOverlay = document.getElementById('template-viewer');
    const closeViewerBtn = document.getElementById('close-viewer-btn');
    const templateGallery = document.getElementById('template-gallery');

    // Populate gallery
    if (templateGallery) {
        templatesData.forEach(template => {
            const card = document.createElement('div');
            card.className = 'template-card-item glass';
            // Use placeholder if image fails to load
            card.innerHTML = `
                <img src="${template.img}" onerror="this.src=''; this.style.backgroundColor='#0d1117';" alt="${template.name}">
                <div class="item-info">
                    <h4>${template.name}</h4>
                    <span class="tag">${template.type}</span>
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

            let visualHTML = '';
            if (game.emoji) {
                visualHTML = `<div style="width: 100%; height: 150px; background-color: #2d2d2d; display: flex; align-items: center; justify-content: center; font-size: 4rem; border-radius: 8px 8px 0 0;">${game.emoji}</div>`;
            } else {
                visualHTML = `<div style="width: 100%; height: 150px; background-color: #000; background-image: url('${game.icon}'); background-size: contain; background-position: center; background-repeat: no-repeat; border-radius: 8px 8px 0 0;"></div>`;
            }

            card.innerHTML = `
                ${visualHTML}
                <div class="item-info" style="padding: 15px; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start; gap: 10px; flex-grow: 1;">
                    <h4 style="margin: 0; font-size: 1.2rem; display: block; width: 100%; text-align: left;">${game.name}</h4>
                    <p style="font-size: 0.85rem; line-height: 1.4; color: var(--text-muted); margin: 0; text-align: left;">${game.desc}</p>
                    <div class="tech-stack" style="margin: 0; display: flex; flex-wrap: wrap; gap: 5px; margin-top: auto;">
                        ${game.tags.map(t => `<span class="tag" style="font-size: 0.70rem; padding: 0.3rem 0.6rem;">${t}</span>`).join('')}
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
        { id: 'planflow', name: 'PlanFlow', desc: 'A full-stack mobile planner app featuring local CRUD, Pomodoro integration, analytics, and responsive gestures.', tags: ['JavaScript', 'LocalStorage', 'Productivity'], icon: '', emoji: '🗓️', src: 'Apps/planflow/index.html' },
        { id: 'artvault', name: 'ArtVault', desc: 'A curated gallery of 6 famous historical artworks with an elegant dark-theme museum layout and local favorites tracking.', tags: ['JavaScript', 'HTML/CSS', 'History'], icon: '', emoji: '🖼️', src: 'Apps/artvault/index.html' },
        { id: 'booknest', name: 'BookNest', desc: 'A digital library app to track reading progress, manage book statuses, and store personal notes.', tags: ['JavaScript', 'LocalStorage', 'Books'], icon: '', emoji: '📚', src: 'Apps/booknest/index.html' },
        { id: 'chronos-elegance', name: 'Chronos Elegance', desc: 'A sleek, interactive modern watch face built with React, featuring elegant typography and fluid transitions.', tags: ['React', 'Tailwind', 'UI/UX'], icon: '', emoji: '⌚', src: 'Apps/chronos-elegance-(clock-test-watch)/index.html' }
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

            let visualHTML = '';
            if (app.emoji) {
                visualHTML = `<div style="width: 100%; height: 150px; background-color: #1a2332; display: flex; align-items: center; justify-content: center; font-size: 4rem; border-radius: 8px 8px 0 0;">${app.emoji}</div>`;
            } else {
                visualHTML = `<div style="width: 100%; height: 150px; background-color: #000; background-image: url('${app.icon}'); background-size: contain; background-position: center; background-repeat: no-repeat; border-radius: 8px 8px 0 0;"></div>`;
            }

            card.innerHTML = `
                ${visualHTML}
                <div class="item-info" style="padding: 15px; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start; gap: 10px; flex-grow: 1;">
                    <h4 style="margin: 0; font-size: 1.2rem; display: block; width: 100%; text-align: left;">${app.name}</h4>
                    <p style="font-size: 0.85rem; line-height: 1.4; color: var(--text-muted); margin: 0; text-align: left;">${app.desc}</p>
                    <div class="tech-stack" style="margin: 0; display: flex; flex-wrap: wrap; gap: 5px; margin-top: auto;">
                        ${app.tags.map(t => `<span class="tag" style="font-size: 0.70rem; padding: 0.3rem 0.6rem;">${t}</span>`).join('')}
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
        { id: 'ai-chatbox', name: 'AI Chatbox', desc: 'An intelligent conversational AI assistant powered by Gemini with multi-turn context, TTS, and smart fallback answers.', tags: ['Gemini AI', 'JavaScript', 'TTS'], icon: '', emoji: '🤖', src: 'Apps/ai-chatbox/index.html' },
        { id: 'ai-summarizer', name: 'AI Text Summarizer', desc: 'Paste text and get AI-generated summaries, key points extraction, and EN/ES translation.', tags: ['Gemini AI', 'NLP', 'JavaScript'], icon: '', emoji: '📝', src: 'Apps/ai-summarizer/index.html' },
        { id: 'ai-quiz', name: 'AI Quiz Generator', desc: 'Enter any topic and AI generates interactive multiple-choice quizzes with scoring and timed questions.', tags: ['Gemini AI', 'JSON', 'JavaScript'], icon: '', emoji: '🧠', src: 'Apps/ai-quiz/index.html' },
        { id: 'ai-mood-journal', name: 'AI Mood Journal', desc: 'Write journal entries and AI analyzes your mood. Track emotional trends with charts and streaks.', tags: ['Gemini AI', 'Sentiment', 'LocalStorage'], icon: '', emoji: '📓', src: 'Apps/ai-mood-journal/index.html' }
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

            let visualHTML = `<div style="width: 100%; height: 150px; background: linear-gradient(135deg, rgba(0,240,255,0.1), rgba(189,0,255,0.1)); display: flex; align-items: center; justify-content: center; font-size: 4rem; border-radius: 8px 8px 0 0;">${app.emoji}</div>`;

            card.innerHTML = `
                ${visualHTML}
                <div class="item-info" style="padding: 15px; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start; gap: 10px; flex-grow: 1;">
                    <h4 style="margin: 0; font-size: 1.2rem; display: block; width: 100%; text-align: left;">${app.name}</h4>
                    <p style="font-size: 0.85rem; line-height: 1.4; color: var(--text-muted); margin: 0; text-align: left;">${app.desc}</p>
                    <div class="tech-stack" style="margin: 0; display: flex; flex-wrap: wrap; gap: 5px; margin-top: auto;">
                        ${app.tags.map(t => `<span class="tag" style="font-size: 0.70rem; padding: 0.3rem 0.6rem;">${t}</span>`).join('')}
                    </div>
                </div>
            `;

            card.addEventListener('click', () => {
                window.open(app.src, '_blank');
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
            submitBtn.innerHTML = currentPortfolioLang === 'es' ? 'Transmitiendo...' : 'Transmitting...';
            submitBtn.disabled = true;
            contactStatus.style.display = 'none';

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, message })
                });

                if (response.ok) {
                    contactForm.reset();
                    contactStatus.textContent = currentPortfolioLang === 'es' ? '¡Transmisión Exitosa!' : 'Transmission Successful!';
                    contactStatus.style.color = 'var(--accent-cyan)';
                    contactStatus.style.display = 'block';
                } else {
                    contactStatus.textContent = currentPortfolioLang === 'es' ? 'Error en la transmisión.' : 'Transmission failed. Try again.';
                    contactStatus.style.color = '#ff4d4d'; // Red error color
                    contactStatus.style.display = 'block';
                }
            } catch (error) {
                contactStatus.textContent = currentPortfolioLang === 'es' ? 'Error de red. Servidor fuera de línea.' : 'Network error. Server offline.';
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

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
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
