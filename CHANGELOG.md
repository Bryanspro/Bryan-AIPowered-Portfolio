# Changelog

Thank you in your interest in my portfolio: Bryans.tech 

All notable changes to this project will be documented in this file.

## [v0.1] - 2026-02-27
### Added
- Initial portfolio concept and base structure created.
- Established core sections for hero, about, projects, and contact.
- Applied the first visual direction for an AI-inspired developer portfolio.

## [v0.2] - 2026-02-28
### Added
- Built the initial landing page layout.
- Added foundational HTML, CSS, and JavaScript structure.
- Introduced the first responsive design system.

### Changed
- Improved spacing, typography, and content flow across main sections.

## [v0.3] - 2026-03-01
### Added
- Introduced the typewriter-style hero initialization effect.
- Added the first version of project showcase cards.
- Implemented smooth scrolling and navigation interactions.

### Changed
- Refined hero messaging to strengthen the futuristic portfolio identity.

## [v0.4] - 2026-03-02
### Added
- Added bilingual support foundation for English and Spanish content.
- Introduced dynamic section labeling and synchronized UI text behavior.
- Expanded portfolio structure with clearer developer-focused sections.

### Fixed
- Resolved early layout inconsistencies between desktop and mobile views.

## [v0.5] - 2026-03-03
### Added
- Added new "Compiled Outputs // Projects" section.
- Added new "Interactive Games" section with dedicated project previews.
- Introduced overlay viewers for portfolio content and template previews.

### Changed
- Improved overall content organization and section hierarchy.
- Replaced temporary placeholders with more polished visual assets.

## [v0.6] - 2026-03-04
### Added
- Integrated AI-powered applications including AI Text Summarizer, AI Quiz Generator, and AI Mood Journal.
- Expanded project presentation with more interactive and embedded experiences.
- Added native in-portfolio app and template viewing functionality.

### Changed
- Improved project cards and gallery presentation for better readability and interaction.

## [v0.7] - 2026-03-05
### Added
- Integrated an AI chatbot powered by Gemini with multi-turn context support.
- Added text-to-speech functionality to the AI assistant.
- Connected the chatbot to a FastAPI backend through `main.py`.

### Changed
- Updated the hero section to reflect the "AI-Powered Developer Portfolio" identity.
- Improved interactive flow between the portfolio and embedded AI systems.

### Fixed
- Resolved backend cleanup issues including duplicate imports and unused structures.

## [v0.8] - 2026-03-06
### Added
- Added a custom background audio toggle powered by the YouTube Iframe API.
- Implemented a responsive project carousel for the portfolio showcase.
- Expanded bilingual synchronization across portfolio sections and AI chat.

### Changed
- Refined glassmorphism, neon glow effects, and responsive styling across all viewports.
- Updated project imagery with custom high-quality assets.

### Fixed
- Resolved language synchronization issues between the chat widget and portfolio toggles.
- Fixed responsive stacking issues affecting smaller screens.

## [v0.9] - 2026-03-07
### Changed
- Performed final interface polish and visual consistency pass.
- Optimized frontend structure and removed unused CSS classes.
- Improved navigation accessibility and mobile readability.
- Eliminated stray console logs across frontend and embedded apps.

### Fixed
- Addressed display and formatting bugs in the integrated `Chronos Elegance` watch app.
- Fixed layout overflow issues to ensure cleaner rendering across devices.

## [v1.0] - 2026-03-07
### Added
- Added navigation buttons on the bottom when using smartphone portrait view
- Added the ability to view the changelog directly from within the portfolio experience.
- Added a favicon with a Neon B
- Finalized AI Apps Gallery, chatbot integration, bilingual system, carousel, changelog viewer, and embedded viewers.
- Completed stable presentation of interactive projects, games, templates, and apps.
- Finalizing for Official public release of the AI-Powered Developer Portfolio.

### Changed
- Finalized the portfolio design language, visual hierarchy, and deployment-ready structure.

### Fixed
- Addressed display and formatting bugs with the portrait smartphone view experience

## [v1.0.1] - 2026-03-09
### Added
- Officially deployed and published the portfolio.
- Secured and connected custom domain (Bryans.tech).
- Configured cloud hosting and backend infrastructure.

### Changed
- Updated internal branding to match the new live domain.

## [v1.1] - 2026-03-13
### Added
- Integrated Vercel Postgres database via Neon for persistent storage of contact form submissions.
- Added support for both `POSTGRES_URL` and `DATABASE_URL` environment variables.
- Updated FastAPI backend to support PostgreSQL natively alongside the local SQLite fallback.
- Created a multi-color customizer panel for the standalone Chrono clock app allowing individual customization of exactly 8 different clock components in real-time.
- Implemented dynamically rotating prefab question prompts for the standalone AI chatbox widget.
- Added logic for the standalone AI chatbox to open as a responsive popup window instead of a fullscreen tab.

### Changed
- Migrated away from ephemeral SQLite database in production to a permanent cloud Postgres database.
- Updated the "Designer Templates Showcase" project title and refined its description.
- Improved AI Chatbox system prompts, strongly separating "Tech Stack" logic strictly for programming and "AI Skills" strictly for AI context.
- Refined the Chrono clock app UI layout by fixing scrollbar overflow, reducing component sizes slightly, and making it fit seamlessly into the viewport.

### Fixed
- Corrected the portfolio's contact form triggering keywords inside the chat widgets to prevent misfiring of the "About" command.

## [v1.2] - 2026-03-14
### Changed
- Overhauled the Applications Gallery, Games Gallery, and AI Apps Gallery modal UI with a premium card design system.
- Each gallery card now features a unique category-specific gradient background per app (e.g., deep blue for Chrono Clock, forest green for PlanFlow, violet for ArtVault, amber-brown for BookNest).
- Replaced generic flat emoji boxes with styled icon display areas using depth gradients and smooth fade overlays.
- Upgraded the gallery modal container with a richer dark background, cyan glow border, and premium layered box shadow.
- Restyled the viewer modal header with an uppercase title, gradient accent strip, and animated cyan underline.
- Improved card hover animation: cards now lift with a scale effect, cyan shimmer line appears at the card top, and a launch arrow icon fades in at the top-right corner.
- Reduced gallery grid column minimum width for a more compact, spacious layout that shows more cards at once.
- Refined the gallery scrollbar to a thinner, subtler style that fits the dark aesthetic.
- Adjusted project carousel: auto-scroll interval increased to 6 seconds, implemented infinite wrap-around navigation (first-to-last/last-to-first), and optimized button size to 54px for better ergonomics.
- Applied `min-height` and `clip-path` to gallery cards to guarantee full content visibility (title, description, tags) at all viewport sizes.
- Rebranded all `Gemini AI` tags to `GenAI` across the portfolio: project carousel card, AI app gallery cards (AI Chatbox, AI Text Summarizer, AI Quiz Generator, AI Mood Journal), and all app footer disclaimers.
- Renamed `LocalStorage` tags to `Storage` across gallery app cards (PlanFlow, BookNest, AI Mood Journal) for a cleaner, more concise UI label.
- Overhauled the **Chronos Elegance** analog clock face with premium watchface cosmetics:
  - Added 60 minute tick marks and 12 bolder hour tick marks around the bezel.
  - Added two subtle decorative inner concentric rings for depth.
  - Applied SVG glow filters to hour and minute hands for a luminous quality.
  - Second hand now features a classic tail counterbalance (30px rear extension) for an haute-horlogerie feel.
  - Enlarged and styled the center pin with a primary-color accent ring.
  - Repositioned the date window from overlapping the "3" numeral to the 4–5 o'clock region with a solid bordered frame.
  - Pulled hour numerals inward to sit cleanly between the tick ring and clock center.
- Fixed the Chronos Elegance layout being clipped: removed `overflow-hidden` from the app shell, removed `flex-1` from the main clock container, and reduced clock size to `w-80/h-80` on medium screens so controls are always fully visible without scrolling.

## [v1.3] - 2026-03-16
### Changed
- Comprehensively overhauled the PlanFlow, ArtVault, and BookNest applications with premium UI/UX enhancements.
- Re-engineered PlanFlow to feature a new frosted glassmorphism dashboard, dynamic task interactions, streak tracking, and interactive modals.
- Transformed ArtVault into an elegant digital museum experience with real high-resolution artwork, detailed history views, and a curated masonry gallery.
- Upgraded BookNest into a modern digital library showcasing accurate book cover images, downloadable PDFs, rich typography, and reading progress indicators.
- Ensured consistent premium styling across all apps using custom CSS variables, refined dark mode palettes, and dynamic hover effects.

### Fixed
- Fixed URL encoding routing issue preventing the Chronos Elegance watch app from loading correctly on cloud deployments.

## [v1.4] - 2026-03-20
### Added
- Added a dynamic 5-second Neon Cyan blinking pulse animation to the play/pause button when the player autostarts, drawing user focus to bypass browser audio limitations.
- Added a contextual kill-switch listener that instantly halts the blinking pulse the moment a user clicks on the play button.

### Changed
- Configured YouTube background player to use a custom vertical AI-generated Short as the primary Lead Video, flowing seamlessly into a secondary ambient playlist.
- Adjusted the player initialization timer to 7 seconds, ensuring a cleaner visual sequence for the hero section before playback.
- Overhauled the background music modal to dynamically detect the playing video's aspect ratio and shape-shift seamlessly between vertical (9:16) and standard landscape (16:9).
- Heavily updated mobile UX logic to enforce strict widths (180px for vertical, 260px for landscape) to ensure the floating modal never intrudes heavily upon mobile viewports.

### Fixed
- Re-engineered the underlying autoplay start mechanism away from simulated clicks to direct YouTube API calls, vastly improving the reliability of the player pop-up execution regardless of browser audio policies.

## [v1.5] - 2026-03-26
### Added
- Expanded multilingual support with improved localization review across 10 languages.
- Better language-specific UX wording for section titles, buttons, and contact areas.
- Improved readability and structure for international visitors.

### Changed
- Refined technical phrasing across localized portfolio versions.
- More natural, recruiter-friendly copy in French, Portuguese, Chinese, German, Arabic, Korean, Hebrew, Japanese, and Hindi.
- Stronger consistency across section headings, CTAs, and project descriptions.
- Better overall global usability for non-English visitors.

### Fixed
- Implemented a CSS webfont polyfill (Twemoji Country Flags) to ensure high-quality color flag emojis render consistently on Windows devices across the language selector and "About" section stats.

### Notes
- **GenAI Localization review scores:** French (8.9/10), Portuguese (8.8/10), Chinese (8.7/10), German (8.6/10), Arabic (8.5/10), Korean (8.4/10), Hebrew (8.3/10), Japanese (7.9/10), Hindi (7.8/10).
- This version moves beyond direct translation and focuses on native-sounding localization, professional tone, and better adaptation for global recruiters and users.

*Initialized port... System ready for deployment.*

## [v1.5.1] - 2026-03-27
### Added
- Implemented an interactive, inline contact form within the **Bryan.AI** standalone chatbox conversational flow.
- Added a `source` tracking field to the unified contact backend to identify submission origins (Main Portfolio, Floating Chat Widget, or Standalone Chatbox).

### Changed
- Unified the contact form backend logic across all entry points (Main, Floating, and Standalone).
- Updated the FastAPI backend (`main.py`) to support the automated SQL schema migration for the new lead tracking fields.
- Refined the Standalone Chatbox UI with custom frosted-glass input components.

### Fixed
- Standardized version labels across the Hero section, Changelog UI, and JavaScript constants to v1.5.1.

*Initialized port... System ready for deployment.*

## [v1.5.2] - 2026-04-01
### Added
- Created a dedicated `scripts/` directory to centralize all Python utility and generation tools, significantly decluttering the project root.
- Integrated a reinforced System Prompt in the FastAPI backend strictly enforcing language matching (EN, ES, FR, PT, DE, JA, KO, ZH, AR, HI, HE) based on the user's active session.
- Added support for Portuguese, German, Japanese, Korean, Chinese, Arabic, Hindi, and Hebrew to the Standalone Chatbox UI.

### Changed
- Synchronized the **Standalone AI Chatbox** with the centralized **Intent Engine** (`chat-intent-engine.js`), ensuring consistent responses across all chat interfaces.
- Finalized a single source of truth for the AI's personality by embedding all logic within the backend, removing the redundant external "System Prompt" text file.
- Updated the Standalone Chatbox UI to dynamically pull translated placeholders, status text, and disclaimer labels for all 11 supported languages.

### Fixed
- Fixed a bug in the Standalone Chatbox where it would ignore the portfolio's language setting and default to English.
- Resolved a "Ghost Connection" server issue (ERR_EMPTY_RESPONSE) through a clean process reset and port 8000 re-initialization.

*Initialized port... System ready for deployment.*

## [v1.6] - 2026-04-02
### Added
- Integrated a comprehensive Accessibility Widget floating symmetrically opposite the AI Assistant chatbox.
- Implemented 10 active accessibility toggles: Increase Text Size, Increase Line Height, Wider Text Spacing, High Contrast, Dyslexia-Friendly Font (Lexend), Reduce Animations, Highlight Links, Bigger Cursor, Align Text Left, and Low Saturation.
- Added an automatic 7-second neon cyan pulse animation (`intro-glow`) to the accessibility button upon initial page load to guide user discovery.
- Fully synchronized the accessibility widget's text, toggles, and ARIA labels with the portfolio's 11-language localization framework.

### Changed
- Symmetrically aligned the accessibility trigger button and the chat widget button across both desktop (`bottom: 20px`) and mobile responsive breakpoints (`bottom: 85px`), unifying their dimensions to exactly `60px`.
- Finetuned the navbar Language Selector button styling by slightly increasing padding, font-size, and icon dimensions for improved legibility without breaking the slim aesthetic.

### Fixed
- Fixed an invisible click-interception bug by correctly applying `pointer-events: none` to the accessibility panel when closed.
- Restructured the CSS logic for the "Low Saturation" feature, moving from a `filter` on the `<body>` element (which catastrophically broke the containing blocks for `position: fixed` elements) to an invisible pseudo-element overlay utilizing `backdrop-filter: saturate(0.4)`.

*Initialized port... System ready for deployment.*

## [v1.7] - 2026-04-13
### Added
- Replaced the static image on the "AI-Powered Applications" project card with a looping autoplay video (`Powered app video 2.mp4`), completing video integration across all four carousel cards.
- Extended the "Reduce Animations" accessibility toggle to pause all project carousel videos when enabled and resume playback when disabled, including on initial page load if the setting is persisted.
- Added a multi-layered neon cyan glow hover effect to the `Bryans.tech` navbar logo.
- Embedded the floating AI Chatbox assistant widget into the portfolio's designer templates, extending the conversational AI experience across template pages.
- Embedded the Accessibility Widget into the portfolio's designer templates, ensuring all 10 accessibility toggles are available across template pages.

### Changed
- Rebranded all project carousel tech-stack tags to recruiter-friendly labels: `HTML/CSS` → `Websites`, `GenAI` → `Frontend`, `JavaScript` → `Gaming`/`Mobile`/`RAG`, `HTML5 Canvas` → `Entertainment`, `REST API` → `AI-enhanced`.
- Replaced all 8 template gallery card images with instant-loading themed emojis (✈️⚕️🍕💼🎮🏆🤖💪) and unique gradient backgrounds, matching the premium card design system used by the Games and Apps galleries.

### Fixed
- Fixed the favicon not displaying by updating HTML references from the old `favicon.png` path to the new `favicon.JPG` file and correcting the MIME type from `image/png` to `image/jpeg`.

*Initialized port... System ready for deployment.*

## [v1.7.1] - 2026-04-15
### Fixed
- Applied technical corrections to the background YouTube player for improved compatibility and playback stability.
- Refined UI formatting and layout consistency across multiple portfolio sections.

*Initialized port... System ready for deployment.*

