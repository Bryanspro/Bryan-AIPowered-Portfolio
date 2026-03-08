// State variables
let tasks = [];
let streak = 0;
let lastActiveDate = null;
let currentFilter = 'today';
let calendarDate = new Date();
let pomoInterval;
let pomoTime = 25 * 60;
let isPomoRunning = false;
let currentFocusTaskId = null;

// Initialize
function init() {
    loadData();
    updateStreak();
    setupEventListeners();
    renderAll();
    setupConfetti();
}

function loadData() {
    const saved = localStorage.getItem('planflow_tasks');
    if (saved) tasks = JSON.parse(saved);

    const savedStreak = localStorage.getItem('planflow_streak');
    if (savedStreak) streak = parseInt(savedStreak);

    lastActiveDate = localStorage.getItem('planflow_last_date');
}

function saveData() {
    localStorage.setItem('planflow_tasks', JSON.stringify(tasks));
    localStorage.setItem('planflow_streak', streak.toString());
    localStorage.setItem('planflow_last_date', new Date().toDateString());
}

function updateStreak() {
    const todayStr = new Date().toDateString();
    if (lastActiveDate !== todayStr) {
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (lastActiveDate === yesterday.toDateString()) {
            // Keep streak
        } else if (lastActiveDate !== todayStr && lastActiveDate !== null) {
            streak = 0; // Reset streak if missed a day
        }
        lastActiveDate = todayStr;
        saveData();
    }
}

// Navigation
function openView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');

    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    let navBtn = document.querySelector(`.nav-item[data-view="${viewId}"]`);
    if (navBtn) navBtn.classList.add('active');

    if (viewId === 'view-calendar') renderCalendar();
    if (viewId === 'view-focus') renderFocusDropdown();
}

function setupEventListeners() {
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', () => openView(btn.dataset.view));
    });

    document.getElementById('fab-add-task').addEventListener('click', () => openTaskModal());
    document.getElementById('fab-add-task-dash').addEventListener('click', () => openTaskModal());
    document.getElementById('cancel-task').addEventListener('click', closeTaskModal);
    document.getElementById('save-task').addEventListener('click', saveTask);

    document.querySelectorAll('.filter-chip').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            renderTasksList();
        });
    });

    document.getElementById('task-search').addEventListener('input', renderTasksList);

    // Calendar
    document.getElementById('cal-prev').addEventListener('click', () => {
        calendarDate.setMonth(calendarDate.getMonth() - 1);
        renderCalendar();
    });
    document.getElementById('cal-next').addEventListener('click', () => {
        calendarDate.setMonth(calendarDate.getMonth() + 1);
        renderCalendar();
    });

    // Pomodoro
    document.getElementById('pomo-toggle').addEventListener('click', togglePomo);
    document.getElementById('pomo-reset').addEventListener('click', resetPomo);
    document.getElementById('pomo-duration-dropdown').addEventListener('change', (e) => {
        if (!isPomoRunning) {
            pomoTime = parseInt(e.target.value) * 60;
            updatePomoDisplay();
        }
    });

    // Settings
    const html = document.documentElement;
    document.getElementById('theme-toggle').addEventListener('change', (e) => {
        html.setAttribute('data-theme', e.target.checked ? 'dark' : 'light');
    });

    document.getElementById('clear-data-btn').addEventListener('click', () => {
        if (confirm("Are you sure you want to wipe all data?")) {
            localStorage.clear();
            tasks = [];
            streak = 0;
            renderAll();
        }
    });
}

function renderAll() {
    renderDashboard();
    renderTasksList();
    renderStats();
    renderCalendar();
}

// Dashboard
function renderDashboard() {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    document.getElementById('dash-date').textContent = today.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });

    let pendingToday = tasks.filter(t => t.date === todayStr && !t.completed);
    document.getElementById('dash-pending-count').textContent = pendingToday.length;
    document.getElementById('dash-streak-count').innerHTML = `${streak}<span style="font-size:1.5rem">🔥</span>`;

    // Focus suggestion (highest priority pending today)
    let focusTask = pendingToday.find(t => t.priority === 'high') || pendingToday[0];
    const suggEl = document.getElementById('focus-suggestion');
    if (focusTask) {
        suggEl.innerHTML = `<h4>${focusTask.title}</h4><p>Today <span class="priority-badge priority-${focusTask.priority}">${focusTask.priority.toUpperCase()}</span></p>`;
        suggEl.onclick = () => {
            openView('view-focus');
            setTimeout(() => {
                document.getElementById('pomo-task-dropdown').value = focusTask.id;
            }, 100);
        };
        suggEl.classList.remove('text-muted');
    } else {
        suggEl.innerHTML = `<p class="text-muted" style="text-align:center; padding: 20px;">All caught up for today!</p>`;
        suggEl.onclick = null;
        suggEl.classList.add('text-muted');
    }

    // Up Next list (max 3 today)
    const listEl = document.getElementById('dash-task-list');
    listEl.innerHTML = '';
    pendingToday.slice(0, 3).forEach(t => listEl.appendChild(createTaskElement(t)));
}

// Task CRUD
function openTaskModal(task = null) {
    document.getElementById('task-modal').classList.add('active');
    const today = new Date().toISOString().split('T')[0];

    if (task) {
        document.getElementById('modal-title').textContent = 'Edit Task';
        document.getElementById('task-id').value = task.id;
        document.getElementById('task-title').value = task.title;
        document.getElementById('task-date').value = task.date || today;
        document.getElementById('task-priority').value = task.priority;
        document.getElementById('task-tags').value = task.tags.join(', ');
    } else {
        document.getElementById('modal-title').textContent = 'New Task';
        document.getElementById('task-id').value = '';
        document.getElementById('task-title').value = '';
        document.getElementById('task-date').value = today;
        document.getElementById('task-priority').value = 'medium';
        document.getElementById('task-tags').value = '';
    }
}

function closeTaskModal() {
    document.getElementById('task-modal').classList.remove('active');
}

function saveTask() {
    const id = document.getElementById('task-id').value;
    const title = document.getElementById('task-title').value.trim();
    if (!title) return alert("Task title required");

    const tagsRaw = document.getElementById('task-tags').value;
    const tags = tagsRaw.split(',').map(t => t.trim()).filter(t => t);

    const taskObj = {
        title,
        date: document.getElementById('task-date').value,
        priority: document.getElementById('task-priority').value,
        tags,
        completed: false
    };

    if (id) {
        const idx = tasks.findIndex(t => t.id == id);
        taskObj.id = id;
        taskObj.completed = tasks[idx].completed;
        tasks[idx] = taskObj;
    } else {
        taskObj.id = Date.now().toString();
        tasks.push(taskObj);
    }

    saveData();
    closeTaskModal();
    renderAll();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id == id);
    if (!task.completed) {
        task.completed = true;
        fireConfetti();
        // Check if streak needs increment (first task of day)
        if (streak === 0 || lastActiveDate !== new Date().toDateString()) {
            streak++;
            lastActiveDate = new Date().toDateString();
        }
    } else {
        task.completed = false;
    }
    saveData();
    renderAll();
}

function deleteTask(id) {
    if (confirm("Delete this task?")) {
        tasks = tasks.filter(t => t.id != id);
        saveData();
        renderAll();
    }
}

// Lists & Filters
function renderTasksList() {
    const listEl = document.getElementById('main-task-list');
    const search = document.getElementById('task-search').value.toLowerCase();
    const todayStr = new Date().toISOString().split('T')[0];

    let filtered = tasks.filter(t => t.title.toLowerCase().includes(search));

    if (currentFilter === 'today') {
        filtered = filtered.filter(t => t.date === todayStr && !t.completed);
    } else if (currentFilter === 'upcoming') {
        filtered = filtered.filter(t => t.date > todayStr && !t.completed);
    } else if (currentFilter === 'overdue') {
        filtered = filtered.filter(t => t.date < todayStr && !t.completed);
    } else if (currentFilter === 'completed') {
        filtered = filtered.filter(t => t.completed);
    }

    // Sort: overdue -> high -> medium -> low -> far future
    const priWeight = { 'high': 1, 'medium': 2, 'low': 3 };
    filtered.sort((a, b) => {
        if (a.date !== b.date) return a.date.localeCompare(b.date);
        return priWeight[a.priority] - priWeight[b.priority];
    });

    listEl.innerHTML = '';
    if (filtered.length === 0) {
        listEl.innerHTML = `<p style="text-align:center;color:var(--text-muted);margin-top:20px;">No tasks found.</p>`;
    } else {
        filtered.forEach(t => listEl.appendChild(createTaskElement(t)));
    }
}

function createTaskElement(task) {
    const el = document.createElement('div');
    el.className = `task-item ${task.completed ? 'completed' : ''}`;

    // Check overdue
    const todayStr = new Date().toISOString().split('T')[0];
    const isOverdue = task.date < todayStr && !task.completed;

    // Format date beautifully
    let dateStr = task.date;
    if (task.date === todayStr) dateStr = 'Today';
    else {
        let d = new Date(task.date + 'T00:00:00');
        dateStr = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }

    el.innerHTML = `
        <div class="task-checkbox-wrap" onclick="toggleTask('${task.id}')">
            <div class="task-checkbox ${task.completed ? 'checked' : ''}"></div>
        </div>
        <div class="task-content" onclick="openTaskModal(${JSON.stringify(task).replace(/"/g, '&quot;')})">
            <div class="task-title">${task.title}</div>
            <div class="task-meta">
                <span class="task-date ${isOverdue ? 'overdue' : ''}">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    ${dateStr}
                </span>
                <span class="priority-badge priority-${task.priority}">${task.priority.toUpperCase()}</span>
                ${task.tags.map(t => `<span class="task-tag">${t}</span>`).join('')}
            </div>
        </div>
        <button class="delete-task-btn" onclick="deleteTask('${task.id}')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        </button>
    `;
    return el;
}

// Calendar
function renderCalendar() {
    const monthYear = document.getElementById('cal-month-year');
    const grid = document.getElementById('cal-grid');

    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();

    monthYear.textContent = calendarDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    let html = '';
    for (let i = 0; i < firstDay; i++) {
        html += `<div class="cal-day dim"></div>`;
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const dStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;

        let hasTask = tasks.some(t => t.date === dStr && !t.completed);
        let indHTML = hasTask ? `<div class="cal-indicator"></div>` : '';

        let isToday = (i === today.getDate() && month === today.getMonth() && year === today.getFullYear());

        html += `<div class="cal-day ${isToday ? 'selected' : ''}" onclick="selectCalDate('${dStr}', this)">
            ${i}
            ${indHTML}
        </div>`;
    }
    grid.innerHTML = html;

    // Select today initially
    const todayStr = new Date().toISOString().split('T')[0];
    renderCalendarDayTasks(todayStr);
}

window.selectCalDate = function (dateStr, el) {
    document.querySelectorAll('.cal-day').forEach(d => d.classList.remove('selected'));
    el.classList.add('selected');
    renderCalendarDayTasks(dateStr);
}

function renderCalendarDayTasks(dateStr) {
    let d = new Date(dateStr + 'T00:00:00');
    document.getElementById('cal-selected-date').textContent = d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });

    const listEl = document.getElementById('calendar-task-list');
    listEl.innerHTML = '';

    let dayTasks = tasks.filter(t => t.date === dateStr);
    if (dayTasks.length === 0) {
        listEl.innerHTML = `<p class="text-muted" style="text-align:center;">No tasks for this date.</p>`;
    } else {
        dayTasks.forEach(t => listEl.appendChild(createTaskElement(t)));
    }
}

// Pomodoro
function renderFocusDropdown() {
    const select = document.getElementById('pomo-task-dropdown');
    select.innerHTML = '';

    let pending = tasks.filter(t => !t.completed);
    if (pending.length === 0) {
        select.innerHTML = `<option value="">No pending tasks</option>`;
        return;
    }

    pending.forEach(t => {
        let opt = document.createElement('option');
        opt.value = t.id;
        opt.text = t.title;
        select.add(opt);
    });
}

function togglePomo() {
    const btn = document.getElementById('pomo-toggle');
    const taskId = document.getElementById('pomo-task-dropdown').value;

    if (isPomoRunning) {
        clearInterval(pomoInterval);
        isPomoRunning = false;
        btn.textContent = "Start Focus";
        document.getElementById('pomo-status').textContent = "Paused";
    } else {
        isPomoRunning = true;
        btn.textContent = "Pause";
        document.getElementById('pomo-status').textContent = "Focusing...";

        pomoInterval = setInterval(() => {
            if (pomoTime > 0) {
                pomoTime--;
                updatePomoDisplay();
            } else {
                clearInterval(pomoInterval);
                isPomoRunning = false;
                btn.textContent = "Start Focus";
                document.getElementById('pomo-status').textContent = "Session Complete!";
                alert("Pomodoro Complete! Take a break.");
                resetPomo();
            }
        }, 1000);
    }
}

function resetPomo() {
    clearInterval(pomoInterval);
    isPomoRunning = false;
    let selectedDuration = parseInt(document.getElementById('pomo-duration-dropdown').value) || 25;
    pomoTime = selectedDuration * 60;
    updatePomoDisplay();
    document.getElementById('pomo-toggle').textContent = "Start Focus";
    document.getElementById('pomo-status').textContent = "Focus Session";
}

function updatePomoDisplay() {
    let m = Math.floor(pomoTime / 60);
    let s = pomoTime % 60;
    document.getElementById('pomo-display').textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

    // Ring progress
    let selectedDuration = parseInt(document.getElementById('pomo-duration-dropdown').value) || 25;
    let total = selectedDuration * 60;
    let percent = pomoTime / total;
    let dashoffset = 283 - (percent * 283);
    document.getElementById('pomo-progress').style.strokeDashoffset = dashoffset;
}

// Stats
function renderStats() {
    document.getElementById('stats-streak').innerHTML = `${streak}<span style="font-size:1.5rem">🔥</span>`;

    // Calculate weekly
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);
    const recentWeekStr = oneWeekAgo.toISOString().split('T')[0];

    let weeklyCompleted = tasks.filter(t => t.completed && t.date >= recentWeekStr).length;
    document.getElementById('stats-weekly').textContent = weeklyCompleted;
}

// Confetti Effect
let confettiCtx;
function setupConfetti() {
    const canvas = document.getElementById('confetti');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    confettiCtx = canvas.getContext('2d');
}

function fireConfetti() {
    const count = 100;
    let particles = [];
    for (let i = 0; i < count; i++) {
        particles.push({
            x: window.innerWidth / 2, y: window.innerHeight / 2,
            vx: (Math.random() - 0.5) * 20, vy: (Math.random() - 1) * 20,
            size: Math.random() * 10 + 5,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            life: 1
        });
    }

    function animate() {
        confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        let active = false;
        particles.forEach(p => {
            if (p.life > 0) {
                p.x += p.vx; p.y += p.vy;
                p.vy += 0.5; // gravity
                p.life -= 0.02;
                confettiCtx.fillStyle = p.color;
                confettiCtx.globalAlpha = p.life;
                confettiCtx.fillRect(p.x, p.y, p.size, p.size);
                active = true;
            }
        });
        if (active) requestAnimationFrame(animate);
        else confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
    animate();
}

// Run
init();
