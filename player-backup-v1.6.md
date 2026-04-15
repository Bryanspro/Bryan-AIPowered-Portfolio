# B Neon Player — Previous Version Backup (Pre-v1.8)

> **Created:** 2026-04-14
> **Purpose:** Backup of the original YouTube player configuration before the robust pre-loaded rewrite.
> **Restore if:** The new player logic causes issues and you need to roll back.

---

## How to Restore

### 1. In `script.js`
Replace the entire **Section 4** block (search for `// 4. Background Music`) with the JavaScript code below.

### 2. In `style.css`
Find `.music-player-body iframe` and `.music-player-body::after` and replace them with the CSS code below.

### 3. Important Notes
- The old video IDs `cggalVmXlZA` and `9o0WLOJCHvk` are **dead/unavailable** — do NOT restore them.
  Use `zpJk89JJdRk` and `QOaScWimga8` instead.
- The old code has **no error recovery** (no `onError` handler, no retry logic).
- The old code creates the player inside `onYouTubeIframeAPIReady` immediately, even when the modal is hidden.
- The old code uses `musicBtn.click()` (simulated click) instead of direct API calls.

---

## Original JavaScript (script.js — Section 4)

```javascript
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
            height: '100%',
            width: '100%',
            videoId: 'cggalVmXlZA',
            playerVars: {
                'autoplay': 0,
                'controls': 0,
                'loop': 1,
                'playlist': 'cggalVmXlZA,9o0WLOJCHvk,QOaScWimga8'
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    };

    // Array of vertical video IDs (Shorts)
    const verticalVideoIDs = ['cggalVmXlZA'];

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
            if (isPlayerReady && window.ytPlayer) {
                const modal = document.getElementById('music-player-modal');
                if (modal && modal.classList.contains('hidden')) {
                    modal.classList.remove('hidden');
                }

                const playBtnInModal = document.getElementById('btn-play-pause-track');
                if (playBtnInModal) {
                    playBtnInModal.classList.add('blink-action');
                    setTimeout(() => {
                        if (playBtnInModal) playBtnInModal.classList.remove('blink-action');
                    }, 5000);
                }

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
        if (playPending) {
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

    const musicPlayerModal = document.getElementById('music-player-modal');
    const closeMusicPlayerBtn = document.getElementById('close-music-player-btn');
    const playPauseBtn = document.getElementById('btn-play-pause-track');
    const prevTrackBtn = document.getElementById('btn-prev-track');
    const nextTrackBtn = document.getElementById('btn-next-track');

    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', () => {
            playPauseBtn.classList.remove('blink-action');
            if (isPlaying) {
                window.ytPlayer.pauseVideo();
            } else {
                window.ytPlayer.playVideo();
            }
        });
    }

    if (prevTrackBtn) {
        prevTrackBtn.addEventListener('click', () => {
             window.ytPlayer.previousVideo();
        });
    }

    if (nextTrackBtn) {
        nextTrackBtn.addEventListener('click', () => {
             window.ytPlayer.nextVideo();
        });
    }

    if (musicBtn) {
        musicBtn.addEventListener('click', () => {
            if (!isPlayerReady || !window.ytPlayer) {
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
```

---

## Original CSS (style.css — music-player-body iframe)

```css
.music-player-body iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    pointer-events: none;
}
```

> **Note:** The old CSS did NOT have a `.music-player-body::after` pseudo-element.
> The new version adds one to hide YouTube's remaining UI overlays, and scales
> the iframe to 110% to crop the title bar and watermark.

---

## Known Issues With This Old Version

| Issue | Impact |
|-------|--------|
| Video `cggalVmXlZA` has embedding disabled | Player shows "This video is unavailable" |
| Video `9o0WLOJCHvk` is deleted (404) | Poisons entire playlist — all videos fail |
| No `onError` handler | Player silently fails with no recovery |
| Player created while modal is hidden | Can cause intermittent init failures on mobile |
| Uses `musicBtn.click()` in `onPlayerReady` | Fragile simulated click instead of direct API |
| No null guards on control buttons | Prev/Next/Play can throw if player isn't ready |
| No muted background priming | YouTube loading UI flashes when modal first appears |
