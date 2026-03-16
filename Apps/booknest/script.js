/* ============================================================
   BookNest — Premium Digital Library App Logic
   ============================================================ */

// ─── Book Data with Real Covers & PDFs ───
const seedBooks = [
    {
        id: '1',
        title: "1984",
        author: "George Orwell",
        year: 1949,
        pages: 328,
        genre: "Classic",
        cover: "../../assets/Books/Book-Cover-1984.png",
        pdf: "../../assets/Books/1984.pdf",
        synopsis: "Among the seminal texts of the 20th century, Nineteen Eighty-Four is a rare work that grows more haunting as its futuristic purgatory becomes more real. Published in 1949, this dystopian novel explores a totalitarian society under the rule of the omnipresent Big Brother, where individuality and independent thinking are crimes.",
        color: "linear-gradient(135deg, #dc2626, #7f1d1d)"
    },
    {
        id: '2',
        title: "Alice's Adventures in Wonderland",
        author: "Lewis Carroll",
        year: 1865,
        pages: 200,
        genre: "Classic",
        cover: "../../assets/Books/Book-Cover-Alices-Adventures-in-Wonderland.png",
        pdf: "../../assets/Books/alices-adventures-in-wonderland.pdf",
        synopsis: "Alice's Adventures in Wonderland follows young Alice as she falls down a rabbit hole into a fantastical underground world populated by peculiar anthropomorphic creatures. It is considered a masterpiece of literary nonsense and one of the best examples of the genre, playing with logic and language in imaginative ways.",
        color: "linear-gradient(135deg, #7c3aed, #4c1d95)"
    },
    {
        id: '3',
        title: "Tender Is the Night",
        author: "F. Scott Fitzgerald",
        year: 1934,
        pages: 315,
        genre: "Fiction",
        cover: "../../assets/Books/Book-Cover-Tender-is-the-Night.png",
        pdf: "../../assets/Books/tender-is-the-night.pdf",
        synopsis: "Between the first two World Wars, on the glamorous French Riviera, a group of American expatriates lead a fascinatingly decadent lifestyle. At the center is Dick Diver, a brilliant and charming young psychiatrist, and his beautiful wife Nicole, whose troubled past has shaped their relationship and destiny.",
        color: "linear-gradient(135deg, #0891b2, #164e63)"
    },
    {
        id: '4',
        title: "Adventures of Huckleberry Finn",
        author: "Mark Twain",
        year: 1884,
        pages: 366,
        genre: "Adventure",
        cover: "../../assets/Books/Book-Cover-The-Adventures-of-Huckleberry-Finn.png",
        pdf: "../../assets/Books/the-adventures-of-huckleberry-finn.pdf",
        synopsis: "Commonly named among the Great American Novels, the work is among the first in major American literature to be written throughout in vernacular English. Huck Finn escapes his abusive father and, with his companion Jim, a runaway enslaved person, makes a long and frequently interrupted voyage down the Mississippi River on a raft.",
        color: "linear-gradient(135deg, #d97706, #78350f)"
    },
    {
        id: '5',
        title: "The Adventures of Tom Sawyer",
        author: "Mark Twain",
        year: 1876,
        pages: 274,
        genre: "Adventure",
        cover: "../../assets/Books/Book-Cover-The-Adventures-of-Tom-Sawyer.png",
        pdf: "../../assets/Books/the-adventures-of-tom-sawyer.pdf",
        synopsis: "The story of a young boy growing up along the Mississippi River, the novel is set in the town of St. Petersburg, inspired by Hannibal, Missouri, where Twain lived as a boy. Tom Sawyer's mischievous adventures with his friend Huckleberry Finn have captivated readers for generations.",
        color: "linear-gradient(135deg, #16a34a, #14532d)"
    },
    {
        id: '6',
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        year: 1925,
        pages: 180,
        genre: "Fiction",
        cover: "../../assets/Books/Book-Cover-The-Great-Gatsby.png",
        pdf: "../../assets/Books/the-great-gatsby.pdf",
        synopsis: "The Great Gatsby is a 1925 novel that follows a cast of characters living in the fictional towns of West Egg and East Egg on Long Island in the summer of 1922. It explores themes of decadence, idealism, resistance to change, social upheaval, and excess, creating a portrait of the Jazz Age that has been described as a cautionary tale regarding the American Dream.",
        color: "linear-gradient(135deg, #eab308, #854d0e)"
    },
    {
        id: '7',
        title: "The Odyssey",
        author: "Homer",
        year: -800,
        pages: 541,
        genre: "Epic",
        cover: "../../assets/Books/Book-Cover-The-Odyssey-1.png",
        pdf: "../../assets/Books/the-odyssey.pdf",
        synopsis: "One of two major ancient Greek epic poems attributed to Homer, The Odyssey follows the Greek hero Odysseus and his journey home after the fall of Troy. It takes Odysseus ten years to reach Ithaca after the ten-year Trojan War, during which he encounters many perils and all his crewmates are lost.",
        color: "linear-gradient(135deg, #2563eb, #1e3a8a)"
    }
];

// ─── State ───
let userLibrary = JSON.parse(localStorage.getItem('booknest_data') || '{}');
let currentView = 'view-library';
let currentLibraryTab = 'reading';
let currentExploreGenre = 'all';
let currentBookId = null;

// ─── Init ───
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

// ─── Event Listeners ───
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

    // Detail Modal
    document.getElementById('close-detail').addEventListener('click', closeDetail);
    document.getElementById('btn-status').addEventListener('click', cycleBookStatus);
    document.getElementById('btn-favorite').addEventListener('click', toggleFavorite);
    document.getElementById('progress-slider').addEventListener('input', updateProgress);
    document.getElementById('save-notes').addEventListener('click', saveNotes);

    // Read PDF
    document.getElementById('btn-read-pdf').addEventListener('click', () => {
        const book = seedBooks.find(x => x.id === currentBookId);
        if (book && book.pdf) {
            window.open(book.pdf, '_blank');
        }
    });

    // Keyboard
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDetail();
    });
}

// ─── Render Library ───
function renderLibrary() {
    const listEl = document.getElementById('library-list');
    listEl.innerHTML = '';

    let booksInTab = seedBooks.filter(b => {
        let userData = userLibrary[b.id];
        return userData && userData.status === currentLibraryTab;
    });

    if (booksInTab.length === 0) {
        const tabNames = { reading: 'reading', want: 'your wishlist', completed: 'completed' };
        listEl.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📚</div>
                <p class="empty-state-text">No books ${tabNames[currentLibraryTab] || 'here'} yet</p>
                <p class="empty-state-sub">Explore and add books to get started.</p>
                <button class="btn btn-outline" style="display:inline-block; width:auto; border-radius:20px; padding:10px 24px; margin-top:4px;" onclick="document.querySelector('[data-view=view-explore]').click()">Explore Books</button>
            </div>
        `;
        return;
    }

    booksInTab.forEach((b, i) => {
        const card = createListCard(b);
        card.style.animationDelay = `${i * 0.05}s`;
        card.classList.add('fade-in');
        listEl.appendChild(card);
    });
}

// ─── Render Explore ───
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
        gridEl.innerHTML = `
            <div class="empty-state" style="grid-column: span 2;">
                <div class="empty-state-icon">🔍</div>
                <p class="empty-state-text">No matches found</p>
                <p class="empty-state-sub">Try a different search or filter.</p>
            </div>`;
        return;
    }

    filtered.forEach((b, i) => {
        const card = createGridCard(b);
        card.style.animationDelay = `${i * 0.06}s`;
        card.classList.add('fade-in');
        gridEl.appendChild(card);
    });
}

// ─── Render Stats ───
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
        favEl.innerHTML = `
            <div class="empty-state" style="width:100%; padding: 20px;">
                <p class="empty-state-sub">You haven't favorited any books yet.</p>
            </div>`;
        return;
    }

    favList.forEach(b => {
        let div = document.createElement('div');
        div.className = 'fav-card';
        div.innerHTML = `
            <div class="book-cover-wrap">
                <img src="${b.cover}" alt="${b.title}" loading="lazy">
            </div>
            <span class="book-title">${b.title}</span>
        `;
        div.addEventListener('click', () => openDetail(b.id));
        favEl.appendChild(div);
    });
}

// ─── Grid Card ───
function createGridCard(b) {
    const div = document.createElement('div');
    div.className = 'book-card';
    div.onclick = () => openDetail(b.id);

    div.innerHTML = `
        <div class="book-cover-wrap loading">
            <img src="${b.cover}" alt="${b.title}" loading="lazy">
            <span class="card-genre-badge">${b.genre}</span>
        </div>
        <div class="book-info">
            <div class="book-title">${b.title}</div>
            <div class="book-author">${b.author}</div>
            <div class="book-meta-small">${b.year < 0 ? Math.abs(b.year) + ' BC' : b.year} · ${b.pages} pages</div>
        </div>
    `;

    // Image load handler
    const img = div.querySelector('img');
    const wrap = div.querySelector('.book-cover-wrap');
    img.onload = () => { wrap.classList.remove('loading'); img.classList.add('loaded'); };
    img.onerror = () => { wrap.classList.remove('loading'); wrap.style.background = b.color; img.style.display = 'none'; };

    return div;
}

// ─── List Card ───
function createListCard(b) {
    let u = userLibrary[b.id];
    let isReading = u && u.status === 'reading';
    let progressPct = isReading && u.progress ? Math.round((u.progress / b.pages) * 100) : 0;

    const div = document.createElement('div');
    div.className = 'book-list-item';
    div.onclick = () => openDetail(b.id);

    div.innerHTML = `
        <div class="book-cover-wrap">
            <img src="${b.cover}" alt="${b.title}" loading="lazy">
        </div>
        <div class="book-list-info">
            <div class="book-title">${b.title}</div>
            <div class="book-author">${b.author}</div>
            ${isReading ? `
                <div class="mini-progress-bar">
                    <div class="mini-progress-fill" style="width: ${progressPct}%"></div>
                </div>
            ` : `<div class="book-meta-small" style="margin-top:6px;">${b.pages} pages · ${b.genre}</div>`}
        </div>
    `;

    // Image load
    const img = div.querySelector('img');
    const wrap = div.querySelector('.book-cover-wrap');
    img.onload = () => { wrap.classList.remove('loading'); img.classList.add('loaded'); };
    img.onerror = () => { wrap.classList.remove('loading'); wrap.style.background = b.color; img.style.display = 'none'; };

    return div;
}

// ─── Detail View ───
function openDetail(id) {
    currentBookId = id;
    const b = seedBooks.find(x => x.id === id);
    const u = userLibrary[id] || { status: null, progress: 0, notes: '', isFav: false };

    // Cover
    const coverEl = document.getElementById('detail-cover');
    coverEl.innerHTML = `<img src="${b.cover}" alt="${b.title}">`;

    // Info
    document.getElementById('detail-title').textContent = b.title;
    document.getElementById('detail-author').textContent = b.author;
    document.getElementById('detail-year').textContent = b.year < 0 ? Math.abs(b.year) + ' BC' : b.year;
    document.getElementById('detail-pages').textContent = `${b.pages} pages`;
    document.getElementById('detail-genre').textContent = b.genre;
    document.getElementById('detail-synopsis').textContent = b.synopsis;
    document.getElementById('detail-notes').value = u.notes || '';

    updateDetailActionButtons(u.status, u.isFav);

    // Progress
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

    // PDF button
    const pdfContainer = document.getElementById('pdf-container');
    if (b.pdf) {
        pdfContainer.classList.remove('hidden');
    } else {
        pdfContainer.classList.add('hidden');
    }

    const overlay = document.getElementById('book-detail');
    overlay.classList.remove('hidden');
    overlay.scrollTop = 0;
    document.body.style.overflow = 'hidden';
}

function closeDetail() {
    document.getElementById('book-detail').classList.add('hidden');
    document.body.style.overflow = 'auto';
    if (currentView === 'view-library') renderLibrary();
    if (currentView === 'view-stats') renderStats();
    currentBookId = null;
}

function updateDetailActionButtons(status, isFav) {
    const statusBtn = document.getElementById('btn-status');

    // Reset inline styles
    statusBtn.removeAttribute('style');
    statusBtn.className = 'btn';

    if (status === 'reading') {
        statusBtn.textContent = '✅ Mark Complete';
        statusBtn.classList.add('btn-primary');
        statusBtn.style.background = `linear-gradient(135deg, ${getComputedStyle(document.documentElement).getPropertyValue('--status-completed').trim()}, #059669)`;
    } else if (status === 'completed') {
        statusBtn.textContent = '🔄 Read Again';
        statusBtn.classList.add('btn-outline');
        statusBtn.style.borderColor = 'var(--status-completed)';
        statusBtn.style.color = 'var(--status-completed)';
    } else if (status === 'want') {
        statusBtn.textContent = '📖 Start Reading';
        statusBtn.classList.add('btn-primary');
        statusBtn.style.background = `linear-gradient(135deg, ${getComputedStyle(document.documentElement).getPropertyValue('--status-reading').trim()}, #d97706)`;
    } else {
        statusBtn.textContent = '📚 Add to Library';
        statusBtn.classList.add('btn-primary');
    }

    const favBtn = document.getElementById('btn-favorite');
    if (isFav) {
        favBtn.classList.add('active');
    } else {
        favBtn.classList.remove('active');
    }
}

// ─── Status Cycling ───
function cycleBookStatus() {
    if (!currentBookId) return;
    let u = userLibrary[currentBookId] || { status: null, progress: 0, notes: '', isFav: false };

    if (!u.status) {
        u.status = 'want';
        showToast('Added to your wishlist', '✨');
    } else if (u.status === 'want') {
        u.status = 'reading';
        showToast('Happy reading!', '📖');
    } else if (u.status === 'reading') {
        u.status = 'completed';
        const b = seedBooks.find(x => x.id === currentBookId);
        u.progress = b.pages;
        showToast('Book completed! 🎉', '✅');
    } else if (u.status === 'completed') {
        u.status = 'reading';
        u.progress = 0;
        showToast('Starting a re-read!', '🔄');
    }

    userLibrary[currentBookId] = u;
    saveData();
    openDetail(currentBookId);
}

// ─── Favorites ───
function toggleFavorite() {
    if (!currentBookId) return;
    let u = userLibrary[currentBookId] || { status: null, progress: 0, notes: '', isFav: false };
    u.isFav = !u.isFav;
    userLibrary[currentBookId] = u;
    saveData();
    updateDetailActionButtons(u.status, u.isFav);

    const favBtn = document.getElementById('btn-favorite');
    favBtn.classList.add('pop');
    setTimeout(() => favBtn.classList.remove('pop'), 300);

    if (u.isFav) {
        showToast('Added to favorites', '❤️');
    } else {
        showToast('Removed from favorites', '💔');
    }
}

// ─── Progress ───
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
        cycleBookStatus();
    }
}

// ─── Notes ───
function saveNotes() {
    if (!currentBookId) return;
    let u = userLibrary[currentBookId] || { status: null, progress: 0, notes: '', isFav: false };
    u.notes = document.getElementById('detail-notes').value;
    userLibrary[currentBookId] = u;
    saveData();

    showToast('Notes saved!', '💾');
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
