/* ============================================================
   ArtVault — Premium Museum App Logic
   ============================================================ */

// ─── Artwork Data with Real Images ───
const artworks = [
    {
        id: '1',
        title: "The Starry Night",
        artistId: "vangogh",
        artistName: "Vincent van Gogh",
        year: "1889",
        medium: "Oil on canvas",
        dimensions: "73.7 cm × 92.1 cm",
        location: "Museum of Modern Art, New York",
        movement: "Post-Impressionism",
        image: "../../assets/Art pictures/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg.webp",
        description: "A spectacularly swirling night sky dominates this landscape, reflecting Van Gogh's tumultuous state of mind while painting it at the Saint-Paul-de-Mausole asylum.",
        history: "Created in June 1889, it depicts the view from the east-facing window of his asylum room at Saint-Rémy-de-Provence, just before sunrise, with the addition of an idealized village.",
        significance: "It is one of the most recognized paintings in Western culture, celebrated for its emotional intensity, bold colors, and rhythmic, expressive brushstrokes that broke away from strict realism.",
        color: "linear-gradient(135deg, #1A237E, #FFC107)"
    },
    {
        id: '2',
        title: "Mona Lisa",
        artistId: "davinci",
        artistName: "Leonardo da Vinci",
        year: "1503",
        medium: "Oil on poplar panel",
        dimensions: "77 cm × 53 cm",
        location: "Louvre Museum, Paris",
        movement: "Renaissance",
        image: "../../assets/Art pictures/Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg.webp",
        description: "A half-length portrait painting believed to be Lisa Gherardini, the wife of Francesco del Giocondo. She is famous for her enigmatic smile.",
        history: "Leonardo began painting the Mona Lisa in 1503 or 1504 in Florence, Italy, and carried it with him when he relocated to France. It was later acquired by King Francis I.",
        significance: "Considered an archetypal masterpiece of the Italian Renaissance, it has been described as 'the best known, the most visited, the most written about... work of art in the world.'",
        color: "linear-gradient(135deg, #4E342E, #8D6E63)"
    },
    {
        id: '3',
        title: "The Persistence of Memory",
        artistId: "dali",
        artistName: "Salvador Dalí",
        year: "1931",
        medium: "Oil on canvas",
        dimensions: "24 cm × 33 cm",
        location: "Museum of Modern Art, New York",
        movement: "Surrealism",
        image: "../../assets/Art pictures/Blog-Headline-Image-2.webp",
        description: "Featuring a desolate landscape with melting pocket watches draped over various objects, this painting explores the fluidity of time and the unconscious mind.",
        history: "Epitomizing Dalí's theory of 'softness' and 'hardness', this surrealistic classic was famously inspired by watching Camembert cheese melting in the sun.",
        significance: "It remains the most famous painting of the Surrealist movement, permanently altering visual culture and establishing the aesthetic tropes of dream psychology.",
        color: "linear-gradient(135deg, #5D4037, #FFAB91)"
    },
    {
        id: '4',
        title: "The Great Wave off Kanagawa",
        artistId: "hokusai",
        artistName: "Katsushika Hokusai",
        year: "1831",
        medium: "Color woodblock print",
        dimensions: "25.7 cm × 37.8 cm",
        location: "Various (Metropolitan Museum of Art, British Museum, etc.)",
        movement: "Ukiyo-e",
        image: "../../assets/Art pictures/The Great Wave off Kanagawa.jpg",
        description: "A massive rogue wave threatens three boats off the coast of the town of Kanagawa while Mount Fuji rises in the background.",
        history: "This is the first print in Hokusai's series 'Thirty-six Views of Mount Fuji'. It utilized Prussian blue, a synthetic dye that had recently become affordable.",
        significance: "It is incredibly influential in global art, playing a major role in sparking Japonisme in Europe and influencing artists like Monet and Van Gogh.",
        color: "linear-gradient(135deg, #01579B, #B3E5FC)"
    },
    {
        id: '5',
        title: "Guernica",
        artistId: "picasso",
        artistName: "Pablo Picasso",
        year: "1937",
        medium: "Oil on canvas",
        dimensions: "3.49 m × 7.76 m",
        location: "Museo Reina Sofía, Madrid",
        movement: "Cubism",
        image: "../../assets/Art pictures/PicassoGuernica.jpg",
        description: "A massive, monochromatic mural showing the tragedies of war and the suffering it inflicts upon individuals, particularly innocent civilians.",
        history: "Created in response to the bombing of the Basque town of Guernica by Nazi German and Fascist Italian warplanes at the request of the Spanish Nationalists.",
        significance: "Guernica has become a universal and powerful symbol warning humanity against the suffering and devastation of conflict.",
        color: "linear-gradient(135deg, #212121, #9E9E9E)"
    },
    {
        id: '6',
        title: "Girl with a Pearl Earring",
        artistId: "vermeer",
        artistName: "Johannes Vermeer",
        year: "1665",
        medium: "Oil on canvas",
        dimensions: "44.5 cm × 39 cm",
        location: "Mauritshuis, The Hague",
        movement: "Dutch Baroque",
        image: "../../assets/Art pictures/1665_Girl_with_a_Pearl_Earring.jpg",
        zoomImage: "../../assets/Art pictures/Girl_with_a_Pearl_Earring Zoomed.jpg",
        description: "A tronie — a painting of an idealized or exaggerated facial expression — featuring a European girl wearing an exotic dress, an oriental turban, and a large pearl earring.",
        history: "Relatively obscure for centuries, this painting was rediscovered in the late 19th century and has since exploded in popularity, often called the 'Mona Lisa of the North'.",
        significance: "It demonstrates Vermeer's absolute mastery of light and color, especially in the luminous qualities of the pearl and the shimmering lips of the subject.",
        color: "linear-gradient(135deg, #000000, #FFD54F)"
    }
];

// ─── Artist Data ───
const artists = {
    "vangogh": {
        name: "Vincent van Gogh", lifespan: "1853 – 1890",
        bio: "A Dutch Post-Impressionist painter who posthumously became one of the most famous and influential figures in Western art history. In a decade, he created about 2,100 artworks, including around 860 oil paintings, most of which date from the last two years of his life.",
        timeline: [
            { year: "1853", event: "Born in Groot-Zundert, Netherlands." },
            { year: "1880", event: "Decides to become an artist, begins studying drawing." },
            { year: "1888", event: "Moves to Arles, France, creating some of his most famous brightly colored works." },
            { year: "1889", event: "Voluntarily admits himself to the psychiatric hospital in Saint-Rémy-de-Provence." },
            { year: "1890", event: "Passes away at the age of 37 in Auvers-sur-Oise." }
        ]
    },
    "davinci": {
        name: "Leonardo da Vinci", lifespan: "1452 – 1519",
        bio: "An Italian polymath of the High Renaissance who was active as a painter, draughtsman, engineer, scientist, theorist, sculptor, and architect. He is widely considered one of the greatest painters of all time.",
        timeline: [
            { year: "1452", event: "Born in Vinci, Republic of Florence." },
            { year: "1466", event: "Apprenticed to the artist Andrea del Verrocchio." },
            { year: "1495", event: "Begins painting 'The Last Supper' in Milan." },
            { year: "1503", event: "Begins work on the 'Mona Lisa'." },
            { year: "1519", event: "Dies in Amboise, France at age 67." }
        ]
    },
    "dali": {
        name: "Salvador Dalí", lifespan: "1904 – 1989",
        bio: "A Spanish surrealist artist renowned for his technical skill, precise draftsmanship, and the striking and bizarre images in his work. He was highly imaginative and enjoyed indulging in unusual and grandiose behavior.",
        timeline: [
            { year: "1904", event: "Born in Figueres, Catalonia, Spain." },
            { year: "1922", event: "Moves to Madrid to study at the Royal Academy of Fine Arts." },
            { year: "1929", event: "Joins the Surrealist group in the Montparnasse quarter of Paris." },
            { year: "1931", event: "Paints his masterpiece, 'The Persistence of Memory'." },
            { year: "1989", event: "Passes away of heart failure at age 84." }
        ]
    },
    "hokusai": {
        name: "Katsushika Hokusai", lifespan: "1760 – 1849",
        bio: "A Japanese artist, ukiyo-e painter, and printmaker of the Edo period. He is best known as author of the woodblock print series Thirty-six Views of Mount Fuji, which includes the internationally iconic print 'The Great Wave off Kanagawa'.",
        timeline: [
            { year: "1760", event: "Born in Edo (modern-day Tokyo), Japan." },
            { year: "1778", event: "Apprenticed to woodblock engraver Katsukawa Shunshō." },
            { year: "1814", event: "Publishes the first volume of 'Hokusai Manga'." },
            { year: "1831", event: "Publishes 'The Great Wave off Kanagawa'." },
            { year: "1849", event: "Dies at the age of 88 in Edo." }
        ]
    },
    "picasso": {
        name: "Pablo Picasso", lifespan: "1881 – 1973",
        bio: "A Spanish painter, sculptor, printmaker, ceramicist and theatre designer who spent most of his adult life in France. Regarded as one of the most influential artists of the 20th century, he is known for co-founding the Cubist movement.",
        timeline: [
            { year: "1881", event: "Born in Málaga, Spain." },
            { year: "1901", event: "His 'Blue Period' begins, characterized by somber blue-toned paintings." },
            { year: "1907", event: "Paints 'Les Demoiselles d'Avignon', a seminal work in Cubism." },
            { year: "1937", event: "Creates the anti-war mural 'Guernica'." },
            { year: "1973", event: "Dies in Mougins, France at age 91." }
        ]
    },
    "vermeer": {
        name: "Johannes Vermeer", lifespan: "1632 – 1675",
        bio: "A Dutch Baroque Period painter who specialized in domestic interior scenes of middle-class life. He was a moderately successful provincial genre painter in his lifetime but is now acknowledged as one of the greatest painters of the Dutch Golden Age.",
        timeline: [
            { year: "1632", event: "Born in Delft, Dutch Republic." },
            { year: "1653", event: "Marries Catharina Bolnes and joins the Guild of Saint Luke." },
            { year: "1665", event: "Paints 'Girl with a Pearl Earring'." },
            { year: "1675", event: "Dies in Delft at age 43, leaving his family in debt." }
        ]
    }
};

// ─── State ───
let favorites = JSON.parse(localStorage.getItem('artvault_favorites') || '[]');
let currentFilter = 'all';
let currentSearch = '';
let currentArtworkId = null;

// ─── SVG Icons ───
const heartSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;

// ─── Initialization ───
document.addEventListener('DOMContentLoaded', () => {
    renderGallery();
    updateFavBadge();

    // Search
    document.getElementById('search-input').addEventListener('input', (e) => {
        currentSearch = e.target.value.toLowerCase();
        renderGallery();
    });

    // Filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            renderGallery();
        });
    });

    // Navigation
    document.getElementById('logo-btn').addEventListener('click', () => showView('view-gallery'));
    document.getElementById('fav-nav-btn').addEventListener('click', () => {
        showView('view-favorites');
        renderFavorites();
    });

    // Close detail
    document.getElementById('close-detail').addEventListener('click', closeDetail);

    // Close artist profile on backdrop click
    document.getElementById('artist-profile').addEventListener('click', (e) => {
        if (e.target.id === 'artist-profile') closeArtistProfile();
    });

    // Detail favorite toggle
    document.getElementById('detail-fav-btn').addEventListener('click', () => {
        if (currentArtworkId) {
            toggleFavorite(currentArtworkId);
            updateDetailFavIcon(currentArtworkId);
        }
    });

    // Image zoom
    document.getElementById('detail-img-container').addEventListener('click', () => {
        const art = artworks.find(a => a.id === currentArtworkId);
        if (art) openZoom(art);
    });

    document.getElementById('zoom-overlay').addEventListener('click', (e) => {
        if (e.target.id === 'zoom-overlay' || e.target.id === 'zoom-close') closeZoom();
    });

    document.getElementById('zoom-close').addEventListener('click', closeZoom);

    // Keyboard
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (document.getElementById('zoom-overlay').classList.contains('active')) {
                closeZoom();
            } else if (!document.getElementById('artwork-detail').classList.contains('hidden')) {
                closeDetail();
            } else if (!document.getElementById('artist-profile').classList.contains('hidden')) {
                closeArtistProfile();
            }
        }
    });
});

// ─── Views ───
function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
}

// ─── Gallery Rendering ───
function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    grid.innerHTML = '';

    let filtered = artworks.filter(art => {
        const matchesFilter = currentFilter === 'all' || art.movement === currentFilter;
        const matchesSearch = art.title.toLowerCase().includes(currentSearch) ||
            art.artistName.toLowerCase().includes(currentSearch) ||
            art.movement.toLowerCase().includes(currentSearch);
        return matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="column-span: all;">
                <div class="empty-state-icon">🔍</div>
                <p class="empty-state-text">No artworks found</p>
                <p class="empty-state-sub">Try a different search or filter.</p>
            </div>`;
        return;
    }

    filtered.forEach((art, index) => {
        grid.appendChild(createArtCard(art, index * 0.06));
    });
}

// ─── Favorites Rendering ───
function renderFavorites() {
    const grid = document.getElementById('favorites-grid');
    grid.innerHTML = '';

    let favArts = artworks.filter(a => favorites.includes(a.id));

    if (favArts.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="column-span: all;">
                <div class="empty-state-icon">🖤</div>
                <p class="empty-state-text">Your collection is empty</p>
                <p class="empty-state-sub">Tap the heart on any artwork to save it here.</p>
            </div>`;
        return;
    }

    favArts.forEach((art, index) => {
        grid.appendChild(createArtCard(art, index * 0.06));
    });
}

// ─── Art Card ───
function createArtCard(art, delay) {
    const div = document.createElement('div');
    div.className = 'art-card fade-in';
    div.style.animationDelay = `${delay}s`;

    const isFav = favorites.includes(art.id);

    div.innerHTML = `
        <div class="art-card-img loading">
            <img src="${art.image}" alt="${art.title} by ${art.artistName}" loading="lazy">
            <button class="card-fav-btn ${isFav ? 'active' : ''}" data-id="${art.id}" aria-label="Toggle favorite">
                ${heartSVG}
            </button>
        </div>
        <div class="art-card-info">
            <h3 class="art-card-title">${art.title}</h3>
            <p class="art-card-artist">${art.artistName}</p>
            <p class="art-card-year">${art.year} · ${art.movement}</p>
        </div>
    `;

    // Image load handler
    const img = div.querySelector('img');
    const imgContainer = div.querySelector('.art-card-img');

    img.onload = () => {
        imgContainer.classList.remove('loading');
        img.classList.add('loaded');
    };

    img.onerror = () => {
        imgContainer.classList.remove('loading');
        imgContainer.style.background = art.color;
        imgContainer.style.minHeight = '200px';
        img.style.display = 'none';
    };

    // Card click -> detail
    div.addEventListener('click', (e) => {
        if (e.target.closest('.card-fav-btn')) return;
        openDetail(art);
    });

    // Quick fav button
    const favBtn = div.querySelector('.card-fav-btn');
    favBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(art.id);
        favBtn.classList.toggle('active');
        if (document.getElementById('view-favorites').classList.contains('active')) {
            renderFavorites();
        }
    });

    return div;
}

// ─── Detail View ───
function openDetail(art) {
    currentArtworkId = art.id;

    document.getElementById('detail-title').textContent = art.title;
    document.getElementById('detail-artist').textContent = art.artistName;
    document.getElementById('detail-year').textContent = art.year;
    document.getElementById('detail-movement').textContent = art.movement;
    document.getElementById('detail-desc').textContent = art.description;
    document.getElementById('detail-history').textContent = art.history;
    document.getElementById('detail-significance').textContent = art.significance;
    document.getElementById('detail-medium').textContent = art.medium;
    document.getElementById('detail-dims').textContent = art.dimensions;
    document.getElementById('detail-location').textContent = art.location;

    // Set image
    const imgContainer = document.getElementById('detail-img-placeholder');
    imgContainer.innerHTML = `<img src="${art.image}" alt="${art.title}" style="width:100%;height:100%;object-fit:contain;">`;

    updateDetailFavIcon(art.id);

    const overlay = document.getElementById('artwork-detail');
    overlay.classList.remove('hidden');
    overlay.scrollTop = 0;
    document.body.style.overflow = 'hidden';
}

function closeDetail() {
    document.getElementById('artwork-detail').classList.add('hidden');
    document.body.style.overflow = 'auto';
    currentArtworkId = null;
}

function updateDetailFavIcon(id) {
    const btn = document.getElementById('detail-fav-btn');
    if (favorites.includes(id)) {
        btn.classList.add('active');
    } else {
        btn.classList.remove('active');
    }
}

// ─── Favorites ───
function toggleFavorite(id) {
    const wasFav = favorites.includes(id);
    if (wasFav) {
        favorites = favorites.filter(fid => fid !== id);
        showToast('Removed from collection', '💔');
    } else {
        favorites.push(id);
        showToast('Added to collection', '❤️');

        // Animate heart
        const btn = document.getElementById('detail-fav-btn');
        if (btn) {
            btn.classList.add('pop');
            setTimeout(() => btn.classList.remove('pop'), 300);
        }
    }
    localStorage.setItem('artvault_favorites', JSON.stringify(favorites));
    updateFavBadge();
}

function updateFavBadge() {
    const badge = document.getElementById('fav-badge');
    if (favorites.length > 0) {
        badge.textContent = favorites.length;
        badge.classList.add('visible');
    } else {
        badge.classList.remove('visible');
    }
}

// ─── Image Zoom ───
function openZoom(art) {
    const img = document.getElementById('zoom-img');
    img.src = art.zoomImage || art.image;
    img.alt = art.title;
    document.getElementById('zoom-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeZoom() {
    document.getElementById('zoom-overlay').classList.remove('active');
    if (!document.getElementById('artwork-detail').classList.contains('hidden')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// ─── Artist Profile ───
window.openArtistProfile = function () {
    const art = artworks.find(a => a.id === currentArtworkId);
    if (!art) return;

    const artistData = artists[art.artistId];
    if (!artistData) return;

    document.getElementById('artist-name-title').textContent = artistData.name;
    document.getElementById('artist-lifespan').textContent = artistData.lifespan;
    document.getElementById('artist-bio').textContent = artistData.bio;

    const timelineEl = document.getElementById('artist-timeline');
    timelineEl.innerHTML = '';
    artistData.timeline.forEach(item => {
        timelineEl.innerHTML += `
            <li>
                <span class="time-year">${item.year}</span>
                <span class="time-event">${item.event}</span>
            </li>
        `;
    });

    document.getElementById('artist-profile').classList.remove('hidden');
};

function closeArtistProfile() {
    document.getElementById('artist-profile').classList.add('hidden');
}

// ─── Toast Notifications ───
function showToast(message, icon = 'ℹ️') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('toast-out');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}
