const seedBooks = [
    {
        id: '1', title: "Dune", author: "Frank Herbert", year: 1965, pages: 412, genre: "Sci-Fi",
        synopsis: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the 'spice' melange.",
        color: "linear-gradient(135deg, #d97706, #78350f)"
    },
    {
        id: '2', title: "Meditations", author: "Marcus Aurelius", year: 180, pages: 254, genre: "Philosophy",
        synopsis: "A series of personal writings by Marcus Aurelius, Roman Emperor from 161 to 180 AD, recording his private notes to himself and ideas on Stoic philosophy.",
        color: "linear-gradient(135deg, #475569, #0f172a)"
    },
    {
        id: '3', title: "1984", author: "George Orwell", year: 1949, pages: 328, genre: "Classic",
        synopsis: "Among the seminal texts of the 20th century, Nineteen Eighty-Four is a rare work that grows more haunting as its futuristic purgatory becomes more real. A totalitarian dystopia classic.",
        color: "linear-gradient(135deg, #dc2626, #7f1d1d)"
    },
    {
        id: '4', title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937, pages: 310, genre: "Fantasy",
        synopsis: "A great modern classic and the prelude to The Lord of the Rings. Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely traveling any farther than his pantry or cellar.",
        color: "linear-gradient(135deg, #16a34a, #14532d)"
    },
    {
        id: '5', title: "The Martian", author: "Andy Weir", year: 2011, pages: 369, genre: "Sci-Fi",
        synopsis: "Six days ago, astronaut Mark Watney became one of the first people to walk on Mars. Now, he's sure he'll be the first person to die there.",
        color: "linear-gradient(135deg, #ea580c, #7c2d12)"
    },
    {
        id: '6', title: "Pride and Prejudice", author: "Jane Austen", year: 1813, pages: 279, genre: "Classic",
        synopsis: "Since its immediate success in 1813, Pride and Prejudice has remained one of the most popular novels in the English language. Jane Austen called this brilliant work 'her own darling child'.",
        color: "linear-gradient(135deg, #c026d3, #701a75)"
    },
    {
        id: '7', title: "The Name of the Wind", author: "Patrick Rothfuss", year: 2007, pages: 662, genre: "Fantasy",
        synopsis: "Told in Kvothe's own voice, this is the tale of the magically gifted young man who grows to be the most notorious wizard his world has ever seen.",
        color: "linear-gradient(135deg, #2563eb, #1e3a8a)"
    },
    {
        id: '8', title: "Man's Search for Meaning", author: "Viktor E. Frankl", year: 1946, pages: 165, genre: "Philosophy",
        synopsis: "Psychiatrist Viktor Frankl's memoir has riveted generations of readers with its descriptions of life in Nazi death camps and its lessons for spiritual survival.",
        color: "linear-gradient(135deg, #52525b, #18181b)"
    }
];

// User State Structure: { bookId: { status: 'reading'|'want'|'completed', progress: int, notes: string, isFav: boolean } }
let userLibrary = JSON.parse(localStorage.getItem('booknest_data')) || {};
let currentView = 'view-library';
let currentLibraryTab = 'reading';
let currentExploreGenre = 'all';
let currentBookId = null;

document.addEventListener('DOMContentLoaded', () => {
    initApp();
    setupEventListeners();
});

function initApp() {
    renderLibrary();
    renderExplore();
    renderStats();
}

function saveData() {
    localStorage.setItem('booknest_data', JSON.stringify(userLibrary));
    renderStats();
}

function setupEventListeners() {
    // Bottom Nav
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const viewId = btn.dataset.view;
            document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
            document.getElementById(viewId).classList.add('active');

            document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentView = viewId;

            if (viewId === 'view-library') renderLibrary();
            if (viewId === 'view-stats') renderStats();
        });
    });

    // Library Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentLibraryTab = e.target.dataset.status;
            renderLibrary();
        });
    });

    // Explore Filters & Search
    document.querySelectorAll('.filter-chip').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentExploreGenre = e.target.dataset.genre;
            renderExplore();
        });
    });

    document.getElementById('explore-search').addEventListener('input', () => {
        renderExplore();
    });

    // Detail Modal Actions
    document.getElementById('close-detail').addEventListener('click', () => {
        document.getElementById('book-detail').classList.add('hidden');
        if (currentView === 'view-library') renderLibrary();
        if (currentView === 'view-stats') renderStats();
    });

    document.getElementById('btn-status').addEventListener('click', cycleBookStatus);
    document.getElementById('btn-favorite').addEventListener('click', toggleFavorite);
    document.getElementById('progress-slider').addEventListener('input', updateProgress);
    document.getElementById('save-notes').addEventListener('click', saveNotes);
}

// Render Functions
function renderLibrary() {
    const listEl = document.getElementById('library-list');
    listEl.innerHTML = '';

    let booksInTab = seedBooks.filter(b => {
        let userData = userLibrary[b.id];
        return userData && userData.status === currentLibraryTab;
    });

    if (booksInTab.length === 0) {
        listEl.innerHTML = `
            <div style="text-align:center; padding: 40px 20px; color: var(--text-secondary);">
                <p>No books here yet.</p>
                <button class="btn btn-outline" style="margin-top:15px; border-radius: 20px;" onclick="document.querySelector('[data-view=view-explore]').click()">Explore Books</button>
            </div>
        `;
        return;
    }

    booksInTab.forEach(b => listEl.appendChild(createListCard(b)));
}

function renderExplore() {
    const gridEl = document.getElementById('explore-grid');
    gridEl.innerHTML = '';

    const term = document.getElementById('explore-search').value.toLowerCase();

    let filtered = seedBooks.filter(b => {
        let matchesGenre = currentExploreGenre === 'all' || b.genre === currentExploreGenre;
        let matchesSearch = b.title.toLowerCase().includes(term) || b.author.toLowerCase().includes(term);
        return matchesGenre && matchesSearch;
    });

    if (filtered.length === 0) {
        gridEl.innerHTML = `<p style="grid-column: span 2; text-align:center; color: var(--text-secondary); padding: 20px;">No matches found.</p>`;
        return;
    }

    filtered.forEach(b => gridEl.appendChild(createGridCard(b)));
}

function renderStats() {
    let readCount = 0;
    let pagesCount = 0;
    let favList = [];

    seedBooks.forEach(b => {
        let u = userLibrary[b.id];
        if (u) {
            if (u.status === 'completed') {
                readCount++;
                pagesCount += b.pages;
            } else if (u.status === 'reading' && u.progress > 0) {
                pagesCount += u.progress;
            }
            if (u.isFav) favList.push(b);
        }
    });

    document.getElementById('stat-books-read').textContent = readCount;
    document.getElementById('stat-pages-read').textContent = pagesCount.toLocaleString();

    const favEl = document.getElementById('stats-favorites');
    favEl.innerHTML = '';

    if (favList.length === 0) {
        favEl.innerHTML = `<p style="color:var(--text-secondary); padding:0 20px;">You haven't favorited any books yet.</p>`;
        return;
    }

    favList.forEach(b => {
        let div = document.createElement('div');
        div.className = 'fav-card';
        div.innerHTML = `
            <div class="book-cover-ph" style="background: ${b.color}; cursor:pointer;">
                <span style="opacity:0.3; font-size: 2rem;">${b.title[0]}</span>
            </div>
            <span class="book-title" style="cursor:pointer;">${b.title}</span>
        `;
        div.addEventListener('click', () => openDetail(b.id));
        favEl.appendChild(div);
    });
}

// UI Creators
function createGridCard(b) {
    const div = document.createElement('div');
    div.className = 'book-card';
    div.onclick = () => openDetail(b.id);
    div.innerHTML = `
        <div class="book-cover-ph" style="background: ${b.color};">
            <span style="line-height:1.2;">${b.title}</span>
        </div>
        <div class="book-info">
            <div class="book-title">${b.title}</div>
            <div class="book-author">${b.author}</div>
            <div class="book-meta-small">${b.genre}</div>
        </div>
    `;
    return div;
}

function createListCard(b) {
    let u = userLibrary[b.id];
    let isReading = u && u.status === 'reading';
    let progressPct = isReading && u.progress ? Math.round((u.progress / b.pages) * 100) : 0;

    const div = document.createElement('div');
    div.className = 'book-list-item';
    div.onclick = () => openDetail(b.id);
    div.innerHTML = `
        <div class="book-cover-ph" style="background: ${b.color};">
            <span style="opacity:0.6">${b.title[0]}</span>
        </div>
        <div class="book-list-info">
            <div class="book-title" style="margin-bottom:0px; font-size:1.1rem;">${b.title}</div>
            <div class="book-author">${b.author}</div>
            ${isReading ? `
                <div class="mini-progress-bar">
                    <div class="mini-progress-fill" style="width: ${progressPct}%"></div>
                </div>
            ` : `<div class="book-meta-small" style="margin-top:6px;">${b.pages} pages • ${b.genre}</div>`}
        </div>
    `;
    return div;
}

// Detail View Interactions
function openDetail(id) {
    currentBookId = id;
    const b = seedBooks.find(x => x.id === id);
    const u = userLibrary[id] || { status: null, progress: 0, notes: '', isFav: false };

    document.getElementById('detail-cover-ph').style.background = b.color;
    document.getElementById('detail-cover-text').textContent = b.title;
    document.getElementById('detail-title').textContent = b.title;
    document.getElementById('detail-author').textContent = b.author;
    document.getElementById('detail-year').textContent = b.year;
    document.getElementById('detail-pages').textContent = `${b.pages} pages`;
    document.getElementById('detail-genre').textContent = b.genre;
    document.getElementById('detail-synopsis').textContent = b.synopsis;

    document.getElementById('detail-notes').value = u.notes || '';

    updateDetailActionButtons(u.status, u.isFav);

    // Progress setup
    const progContainer = document.getElementById('progress-container');
    if (u.status === 'reading') {
        progContainer.classList.remove('hidden');
        document.getElementById('progress-slider').max = b.pages;
        document.getElementById('progress-slider').value = u.progress || 0;
        document.getElementById('progress-value').textContent = u.progress || 0;
        document.getElementById('progress-total').textContent = b.pages;
        document.getElementById('detail-progress-fill').style.width = `${((u.progress || 0) / b.pages) * 100}%`;
    } else {
        progContainer.classList.add('hidden');
    }

    document.getElementById('book-detail').classList.remove('hidden');
}

function updateDetailActionButtons(status, isFav) {
    const statusBtn = document.getElementById('btn-status');
    const favBtn = document.getElementById('btn-favorite');

    if (status === 'reading') {
        statusBtn.textContent = 'Finish Book';
        statusBtn.className = 'btn btn-primary';
        statusBtn.style.background = 'var(--status-completed)';
    } else if (status === 'completed') {
        statusBtn.textContent = 'Read Again';
        statusBtn.className = 'btn btn-outline';
        statusBtn.style.color = 'var(--status-completed)';
        statusBtn.style.borderColor = 'var(--status-completed)';
    } else if (status === 'want') {
        statusBtn.textContent = 'Start Now';
        statusBtn.className = 'btn btn-primary';
        statusBtn.style.background = 'var(--status-reading)';
    } else {
        statusBtn.textContent = 'Add to Library';
        statusBtn.className = 'btn btn-primary';
        statusBtn.style.background = 'var(--text-primary)';
        statusBtn.style.color = 'var(--bg-main)';
    }

    if (isFav) favBtn.classList.add('active');
    else favBtn.classList.remove('active');
}

function cycleBookStatus() {
    if (!currentBookId) return;
    let u = userLibrary[currentBookId] || { status: null, progress: 0, notes: '', isFav: false };

    // Cycle: null -> want -> reading -> completed
    if (!u.status) u.status = 'want';
    else if (u.status === 'want') u.status = 'reading';
    else if (u.status === 'reading') {
        u.status = 'completed';
        const b = seedBooks.find(x => x.id === currentBookId);
        u.progress = b.pages;
    }
    else if (u.status === 'completed') {
        u.status = 'reading';
        u.progress = 0;
    }

    userLibrary[currentBookId] = u;
    saveData();
    openDetail(currentBookId); // refresh
}

function toggleFavorite() {
    if (!currentBookId) return;
    let u = userLibrary[currentBookId] || { status: null, progress: 0, notes: '', isFav: false };
    u.isFav = !u.isFav;
    userLibrary[currentBookId] = u;
    saveData();
    updateDetailActionButtons(u.status, u.isFav);
}

function updateProgress(e) {
    if (!currentBookId) return;
    let val = parseInt(e.target.value);
    document.getElementById('progress-value').textContent = val;

    const b = seedBooks.find(x => x.id === currentBookId);
    document.getElementById('detail-progress-fill').style.width = `${(val / b.pages) * 100}%`;

    let u = userLibrary[currentBookId];
    u.progress = val;
    userLibrary[currentBookId] = u;
    saveData();

    if (val >= b.pages) {
        cycleBookStatus(); // move to completed
    }
}

function saveNotes() {
    if (!currentBookId) return;
    let u = userLibrary[currentBookId] || { status: null, progress: 0, notes: '', isFav: false };
    u.notes = document.getElementById('detail-notes').value;
    userLibrary[currentBookId] = u;
    saveData();

    const btn = document.getElementById('save-notes');
    btn.textContent = "Saved!";
    btn.style.background = "var(--status-completed)";
    btn.style.color = "var(--bg-main)";
    setTimeout(() => {
        btn.textContent = "Save Notes";
        btn.style.background = "transparent";
        btn.style.color = "var(--text-primary)";
    }, 2000);
}
