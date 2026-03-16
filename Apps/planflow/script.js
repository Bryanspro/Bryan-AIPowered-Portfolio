// ============================================================
// PlanFlow — Premium Daily Planner Logic
// ============================================================

// ─── State ───
let tasks = [];
let streak = 0;
let lastActiveDate = null;
let currentFilter = 'today';
let calendarDate = new Date();
let pomoInterval = null;
let pomoTime = 25 * 60;
let isPomoRunning = false;
let sessionCount = 0;
let modalSubtasks = [];
let selectedCategory = '';

const CATEGORIES = {
    work: '💼',
    health: '🏃',
    learning: '📚',
    personal: '🏠',
    goals: '🎯'
};

// ─── Initialize ───
function init() {
    loadData();
    updateStreak();
    setupEventListeners();
    renderAll();
    setupConfetti();
    updateGreeting();
}

function loadData() {
    try {
        const saved = localStorage.getItem('planflow_tasks');
        if (saved) tasks = JSON.parse(saved);
        
        const savedStreak = localStorage.getItem('planflow_streak');
        if (savedStreak) streak = parseInt(savedStreak) || 0;
        
        lastActiveDate = localStorage.getItem('planflow_last_date');
        
        const savedSessions = localStorage.getItem('planflow_sessions');
        const savedSessionDate = localStorage.getItem('planflow_session_date');
        const todayStr = new Date().toDateString();
        if (savedSessionDate === todayStr && savedSessions) {
            sessionCount = parseInt(savedSessions) || 0;
        } else {
            sessionCount = 0;
        }
    } catch (e) {
        console.error('Error loading data:', e);
        tasks = [];
        streak = 0;
    }
}

function saveData() {
    try {
        localStorage.setItem('planflow_tasks', JSON.stringify(tasks));
        localStorage.setItem('planflow_streak', streak.toString());
        localStorage.setItem('planflow_last_date', new Date().toDateString());
        localStorage.setItem('planflow_sessions', sessionCount.toString());
        localStorage.setItem('planflow_session_date', new Date().toDateString());
    } catch (e) {
        console.error('Error saving data:', e);
    }
}

// ─── Greeting ───
function updateGreeting() {
    const hour = new Date().getHours();
    let greet = 'Good Evening';
    if (hour < 12) greet = 'Good Morning';
    else if (hour < 17) greet = 'Good Afternoon';
    
    document.getElementById('greeting-text').textContent = `${greet}, Bryan`;
}

// ─── Streak ───
function updateStreak() {
    const todayStr = new Date().toDateString();
    if (lastActiveDate !== todayStr) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastActiveDate === yesterday.toDateString()) {
            // Streak continues
        } else if (lastActiveDate !== null) {
            streak = 0;
        }
        lastActiveDate = todayStr;
        saveData();
    }
}

// ─── Toast Notifications ───
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = { success: '✅', error: '❌', info: 'ℹ️' };
    toast.innerHTML = `
        <span class="toast-icon">${icons[type] || icons.info}</span>
        <span class="toast-message">${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('toast-out');
        setTimeout(() => toast.remove(), 300);
    }, 2800);
}

// ─── Confirmation Modal ───
function showConfirm(title, message, icon = '⚠️') {
    return new Promise((resolve) => {
        const overlay = document.getElementById('confirm-modal');
        document.getElementById('confirm-icon').textContent = icon;
        document.getElementById('confirm-title').textContent = title;
        document.getElementById('confirm-message').textContent = message;
        overlay.classList.add('active');
        
        const okBtn = document.getElementById('confirm-ok');
        const cancelBtn = document.getElementById('confirm-cancel');
        
        function cleanup() {
            overlay.classList.remove('active');
            okBtn.removeEventListener('click', onOk);
            cancelBtn.removeEventListener('click', onCancel);
        }
        
        function onOk() { cleanup(); resolve(true); }
        function onCancel() { cleanup(); resolve(false); }
        
        okBtn.addEventListener('click', onOk);
        cancelBtn.addEventListener('click', onCancel);
    });
}

// ─── Navigation ───
function openView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
    
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    const navBtn = document.querySelector(`.nav-item[data-view="${viewId}"]`);
    if (navBtn) navBtn.classList.add('active');
    
    if (viewId === 'view-calendar') renderCalendar();
    if (viewId === 'view-focus') renderFocusDropdown();
    if (viewId === 'view-settings') renderStats();
}

// ─── Event Listeners ───
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', () => openView(btn.dataset.view));
    });
    
    // FABs
    document.getElementById('fab-add-task').addEventListener('click', () => openTaskModal());
    document.getElementById('fab-add-task-dash').addEventListener('click', () => openTaskModal());
    
    // Modal
    document.getElementById('cancel-task').addEventListener('click', closeTaskModal);
    document.getElementById('save-task').addEventListener('click', saveTask);
    
    // Close modal on overlay click
    document.getElementById('task-modal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeTaskModal();
    });
    
    // Filters
    document.querySelectorAll('.filter-chip').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            renderTasksList();
        });
    });
    
    // Search
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
    
    // Theme
    document.getElementById('theme-toggle').addEventListener('change', (e) => {
        document.documentElement.setAttribute('data-theme', e.target.checked ? 'dark' : 'light');
    });
    
    // Clear data
    document.getElementById('clear-data-btn').addEventListener('click', async () => {
        const confirmed = await showConfirm('Clear All Data', 'This will permanently delete all your tasks, streaks, and settings.', '🗑️');
        if (confirmed) {
            localStorage.clear();
            tasks = [];
            streak = 0;
            sessionCount = 0;
            renderAll();
            showToast('All data has been cleared', 'info');
        }
    });
    
    // Category selector
    document.querySelectorAll('.category-option').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-option').forEach(b => b.classList.remove('selected'));
            if (selectedCategory === btn.dataset.cat) {
                selectedCategory = '';
            } else {
                btn.classList.add('selected');
                selectedCategory = btn.dataset.cat;
            }
        });
    });
    
    // Subtask add
    document.getElementById('add-subtask-btn').addEventListener('click', addSubtaskFromInput);
    document.getElementById('subtask-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') addSubtaskFromInput();
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeTaskModal();
            document.getElementById('confirm-modal').classList.remove('active');
        }
        if (e.key === 'n' && !isInputFocused()) {
            e.preventDefault();
            openTaskModal();
        }
    });
}

function isInputFocused() {
    const el = document.activeElement;
    return el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT');
}

// ─── Render All ───
function renderAll() {
    renderDashboard();
    renderTasksList();
    renderStats();
    renderCalendar();
}

// ─── Dashboard ───
function renderDashboard() {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    document.getElementById('dash-date').textContent = today.toLocaleDateString(undefined, {
        weekday: 'long', month: 'long', day: 'numeric'
    });
    
    const todayTasks = tasks.filter(t => t.date === todayStr);
    const pendingToday = todayTasks.filter(t => !t.completed);
    const completedToday = todayTasks.filter(t => t.completed);
    
    document.getElementById('dash-pending-count').textContent = pendingToday.length;
    document.getElementById('dash-streak-count').innerHTML = `${streak} <span style="font-size:1.2rem">🔥</span>`;
    
    // Progress bar
    const totalToday = todayTasks.length;
    const pct = totalToday > 0 ? Math.round((completedToday.length / totalToday) * 100) : 0;
    document.getElementById('dash-progress-pct').textContent = `${pct}%`;
    document.getElementById('dash-progress-fill').style.width = `${pct}%`;
    
    // Focus suggestion
    const focusTask = pendingToday.find(t => t.priority === 'high') || pendingToday[0];
    const suggEl = document.getElementById('focus-suggestion');
    
    if (focusTask) {
        const catEmoji = focusTask.category ? (CATEGORIES[focusTask.category] || '') + ' ' : '';
        suggEl.innerHTML = `
            <h4>${catEmoji}${escapeHtml(focusTask.title)}</h4>
            <p>
                <span>Today</span>
                <span class="priority-badge priority-${focusTask.priority}">${focusTask.priority.toUpperCase()}</span>
            </p>`;
        suggEl.onclick = () => {
            openView('view-focus');
            setTimeout(() => {
                document.getElementById('pomo-task-dropdown').value = focusTask.id;
            }, 100);
        };
        suggEl.classList.remove('empty-state');
    } else {
        suggEl.innerHTML = `
            <div class="empty-state-icon">🎉</div>
            <p style="text-align:center; font-weight:600;">All caught up for today!</p>`;
        suggEl.onclick = null;
        suggEl.classList.add('empty-state');
    }
    
    // Up Next
    const listEl = document.getElementById('dash-task-list');
    listEl.innerHTML = '';
    if (pendingToday.length === 0) {
        listEl.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📋</div>
                <div class="empty-state-text">No tasks for today</div>
                <div class="empty-state-sub">Tap + to add your first task</div>
            </div>`;
    } else {
        pendingToday.slice(0, 4).forEach(t => listEl.appendChild(createTaskElement(t)));
    }
}

// ─── Task CRUD ───
function openTaskModal(task = null) {
    document.getElementById('task-modal').classList.add('active');
    const today = new Date().toISOString().split('T')[0];
    
    // Reset subtasks
    modalSubtasks = [];
    selectedCategory = '';
    document.querySelectorAll('.category-option').forEach(b => b.classList.remove('selected'));
    
    if (task) {
        document.getElementById('modal-title').textContent = 'Edit Task';
        document.getElementById('task-id').value = task.id;
        document.getElementById('task-title').value = task.title;
        document.getElementById('task-description').value = task.description || '';
        document.getElementById('task-date').value = task.date || today;
        document.getElementById('task-priority').value = task.priority;
        
        if (task.category) {
            selectedCategory = task.category;
            const catBtn = document.querySelector(`.category-option[data-cat="${task.category}"]`);
            if (catBtn) catBtn.classList.add('selected');
        }
        
        if (task.subtasks) {
            modalSubtasks = JSON.parse(JSON.stringify(task.subtasks));
        }
    } else {
        document.getElementById('modal-title').textContent = 'New Task';
        document.getElementById('task-id').value = '';
        document.getElementById('task-title').value = '';
        document.getElementById('task-description').value = '';
        document.getElementById('task-date').value = today;
        document.getElementById('task-priority').value = 'medium';
    }
    
    renderModalSubtasks();
    
    // Focus the title input
    setTimeout(() => document.getElementById('task-title').focus(), 400);
}

function closeTaskModal() {
    document.getElementById('task-modal').classList.remove('active');
}

function saveTask() {
    const id = document.getElementById('task-id').value;
    const title = document.getElementById('task-title').value.trim();
    
    if (!title) {
        showToast('Please enter a task title', 'error');
        document.getElementById('task-title').focus();
        return;
    }
    
    const taskObj = {
        title,
        description: document.getElementById('task-description').value.trim(),
        date: document.getElementById('task-date').value,
        priority: document.getElementById('task-priority').value,
        category: selectedCategory,
        subtasks: [...modalSubtasks],
        completed: false
    };
    
    if (id) {
        const idx = tasks.findIndex(t => t.id == id);
        if (idx !== -1) {
            taskObj.id = id;
            taskObj.completed = tasks[idx].completed;
            tasks[idx] = taskObj;
            showToast('Task updated successfully', 'success');
        }
    } else {
        taskObj.id = Date.now().toString();
        tasks.push(taskObj);
        showToast('Task created! 🚀', 'success');
    }
    
    saveData();
    closeTaskModal();
    renderAll();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id == id);
    if (!task) return;
    
    if (!task.completed) {
        task.completed = true;
        fireConfetti();
        showToast(`"${task.title}" completed! 🎉`, 'success');
        
        // Streak logic: increment on first completion of the day
        const todayStr = new Date().toDateString();
        if (lastActiveDate !== todayStr) {
            streak++;
            lastActiveDate = todayStr;
        } else if (streak === 0) {
            streak = 1;
        }
    } else {
        task.completed = false;
        showToast('Task marked as incomplete', 'info');
    }
    
    saveData();
    renderAll();
}

async function deleteTask(id) {
    const task = tasks.find(t => t.id == id);
    const confirmed = await showConfirm(
        'Delete Task',
        `Delete "${task ? task.title : 'this task'}"? This cannot be undone.`,
        '🗑️'
    );
    
    if (confirmed) {
        tasks = tasks.filter(t => t.id != id);
        saveData();
        renderAll();
        showToast('Task deleted', 'info');
    }
}

// ─── Subtask Management ───
function addSubtaskFromInput() {
    const input = document.getElementById('subtask-input');
    const text = input.value.trim();
    if (!text) return;
    
    modalSubtasks.push({ text, done: false });
    input.value = '';
    renderModalSubtasks();
    input.focus();
}

function toggleModalSubtask(index) {
    modalSubtasks[index].done = !modalSubtasks[index].done;
    renderModalSubtasks();
}

function removeModalSubtask(index) {
    modalSubtasks.splice(index, 1);
    renderModalSubtasks();
}

function renderModalSubtasks() {
    const list = document.getElementById('modal-subtask-list');
    list.innerHTML = '';
    
    modalSubtasks.forEach((st, i) => {
        const item = document.createElement('div');
        item.className = 'subtask-item';
        item.innerHTML = `
            <input type="checkbox" ${st.done ? 'checked' : ''} onchange="toggleModalSubtask(${i})">
            <span class="subtask-text ${st.done ? 'done' : ''}">${escapeHtml(st.text)}</span>
            <button onclick="removeModalSubtask(${i})">×</button>
        `;
        list.appendChild(item);
    });
}

// Toggle subtask directly in task view
function toggleSubtask(taskId, subtaskIndex) {
    const task = tasks.find(t => t.id == taskId);
    if (task && task.subtasks && task.subtasks[subtaskIndex] !== undefined) {
        task.subtasks[subtaskIndex].done = !task.subtasks[subtaskIndex].done;
        saveData();
        renderAll();
    }
}

// ─── Task List & Filters ───
function renderTasksList() {
    const listEl = document.getElementById('main-task-list');
    const search = document.getElementById('task-search').value.toLowerCase();
    const todayStr = new Date().toISOString().split('T')[0];
    
    let filtered = tasks.filter(t =>
        t.title.toLowerCase().includes(search) ||
        (t.description && t.description.toLowerCase().includes(search))
    );
    
    switch (currentFilter) {
        case 'today':
            filtered = filtered.filter(t => t.date === todayStr && !t.completed);
            break;
        case 'upcoming':
            filtered = filtered.filter(t => t.date > todayStr && !t.completed);
            break;
        case 'overdue':
            filtered = filtered.filter(t => t.date < todayStr && !t.completed);
            break;
        case 'completed':
            filtered = filtered.filter(t => t.completed);
            break;
        case 'all':
            // Show all
            break;
    }
    
    // Sort: overdue first, then high → medium → low, then by date
    const priWeight = { high: 1, medium: 2, low: 3 };
    filtered.sort((a, b) => {
        // Overdue first
        const aOverdue = a.date < todayStr && !a.completed ? 0 : 1;
        const bOverdue = b.date < todayStr && !b.completed ? 0 : 1;
        if (aOverdue !== bOverdue) return aOverdue - bOverdue;
        
        // Then priority
        if (priWeight[a.priority] !== priWeight[b.priority]) {
            return priWeight[a.priority] - priWeight[b.priority];
        }
        
        // Then date
        return a.date.localeCompare(b.date);
    });
    
    listEl.innerHTML = '';
    if (filtered.length === 0) {
        const emptyIcons = {
            today: '📋', upcoming: '🗓️', overdue: '✅',
            completed: '🏆', all: '📝'
        };
        const emptyTexts = {
            today: 'No tasks for today',
            upcoming: 'No upcoming tasks',
            overdue: 'No overdue tasks — great job!',
            completed: 'No completed tasks yet',
            all: 'No tasks found'
        };
        listEl.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">${emptyIcons[currentFilter] || '📋'}</div>
                <div class="empty-state-text">${emptyTexts[currentFilter] || 'No tasks found'}</div>
                <div class="empty-state-sub">Tap + to create a task</div>
            </div>`;
    } else {
        filtered.forEach(t => listEl.appendChild(createTaskElement(t)));
    }
}

function createTaskElement(task) {
    const el = document.createElement('div');
    el.className = `task-item ${task.completed ? 'completed' : ''}`;
    
    const todayStr = new Date().toISOString().split('T')[0];
    const isOverdue = task.date < todayStr && !task.completed;
    
    // Format date
    let dateStr = task.date;
    if (task.date === todayStr) {
        dateStr = 'Today';
    } else {
        const d = new Date(task.date + 'T00:00:00');
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        if (task.date === tomorrow.toISOString().split('T')[0]) {
            dateStr = 'Tomorrow';
        } else {
            dateStr = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
        }
    }
    
    // Category info
    const catEmoji = task.category ? CATEGORIES[task.category] || '' : '';
    const catHtml = catEmoji ? `<span class="category-badge">${catEmoji}</span>` : '';
    
    // Subtask progress
    let subtaskHtml = '';
    if (task.subtasks && task.subtasks.length > 0) {
        const done = task.subtasks.filter(s => s.done).length;
        const total = task.subtasks.length;
        const pct = Math.round((done / total) * 100);
        subtaskHtml = `
            <span class="subtask-indicator">
                <span class="subtask-bar"><span class="subtask-bar-fill" style="width:${pct}%"></span></span>
                ${done}/${total}
            </span>`;
    }
    
    // Build safe task data for onclick
    const taskDataAttr = encodeURIComponent(JSON.stringify(task));
    
    el.innerHTML = `
        <div class="task-checkbox-wrap" onclick="toggleTask('${task.id}')">
            <div class="task-checkbox ${task.completed ? 'checked' : ''}"></div>
        </div>
        <div class="task-content" onclick="openTaskModalFromData('${taskDataAttr}')">
            <div class="task-title">${escapeHtml(task.title)}</div>
            <div class="task-meta">
                <span class="task-date ${isOverdue ? 'overdue' : ''}">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    ${dateStr}
                </span>
                <span class="priority-badge priority-${task.priority}">${task.priority.toUpperCase()}</span>
                ${catHtml}
                ${subtaskHtml}
            </div>
        </div>
        <button class="delete-task-btn" onclick="deleteTask('${task.id}')" aria-label="Delete task">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        </button>
    `;
    return el;
}

// Helper to open modal from encoded data attribute
window.openTaskModalFromData = function(encodedData) {
    try {
        const task = JSON.parse(decodeURIComponent(encodedData));
        openTaskModal(task);
    } catch (e) {
        console.error('Error parsing task data:', e);
    }
};

// ─── Calendar ───
function renderCalendar() {
    const monthYear = document.getElementById('cal-month-year');
    const grid = document.getElementById('cal-grid');
    
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    
    monthYear.textContent = calendarDate.toLocaleDateString(undefined, {
        month: 'long', year: 'numeric'
    });
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    
    let html = '';
    for (let i = 0; i < firstDay; i++) {
        html += `<div class="cal-day dim"></div>`;
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
        const dStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
        const hasTask = tasks.some(t => t.date === dStr && !t.completed);
        const indHTML = hasTask ? `<div class="cal-indicator"></div>` : '';
        const isToday = (i === today.getDate() && month === today.getMonth() && year === today.getFullYear());
        const classes = [
            'cal-day',
            isToday ? 'today selected' : ''
        ].filter(Boolean).join(' ');
        
        html += `<div class="${classes}" onclick="selectCalDate('${dStr}', this)">
            ${i}
            ${indHTML}
        </div>`;
    }
    grid.innerHTML = html;
    
    const todayStr = new Date().toISOString().split('T')[0];
    renderCalendarDayTasks(todayStr);
}

window.selectCalDate = function(dateStr, el) {
    document.querySelectorAll('.cal-day').forEach(d => d.classList.remove('selected'));
    el.classList.add('selected');
    renderCalendarDayTasks(dateStr);
};

function renderCalendarDayTasks(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    document.getElementById('cal-selected-date').textContent = d.toLocaleDateString(undefined, {
        weekday: 'short', month: 'short', day: 'numeric'
    });
    
    const listEl = document.getElementById('calendar-task-list');
    listEl.innerHTML = '';
    
    const dayTasks = tasks.filter(t => t.date === dateStr);
    if (dayTasks.length === 0) {
        listEl.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📅</div>
                <div class="empty-state-text">No tasks for this date</div>
            </div>`;
    } else {
        dayTasks.forEach(t => listEl.appendChild(createTaskElement(t)));
    }
}

// ─── Pomodoro ───
function renderFocusDropdown() {
    const select = document.getElementById('pomo-task-dropdown');
    select.innerHTML = '';
    
    const pending = tasks.filter(t => !t.completed);
    if (pending.length === 0) {
        select.innerHTML = `<option value="">No pending tasks</option>`;
        return;
    }
    
    pending.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t.id;
        opt.text = t.title;
        select.add(opt);
    });
    
    document.getElementById('session-count').textContent = sessionCount;
}

function togglePomo() {
    const btn = document.getElementById('pomo-toggle');
    
    if (isPomoRunning) {
        clearInterval(pomoInterval);
        isPomoRunning = false;
        btn.textContent = 'Resume';
        document.getElementById('pomo-status').textContent = 'Paused';
    } else {
        isPomoRunning = true;
        btn.textContent = 'Pause';
        document.getElementById('pomo-status').textContent = 'Focusing...';
        
        pomoInterval = setInterval(() => {
            if (pomoTime > 0) {
                pomoTime--;
                updatePomoDisplay();
            } else {
                clearInterval(pomoInterval);
                isPomoRunning = false;
                btn.textContent = 'Start Focus';
                document.getElementById('pomo-status').textContent = 'Complete!';
                
                sessionCount++;
                saveData();
                document.getElementById('session-count').textContent = sessionCount;
                
                showToast('Focus session complete! Take a break 🧘', 'success');
                fireConfetti();
                resetPomo();
            }
        }, 1000);
    }
}

function resetPomo() {
    clearInterval(pomoInterval);
    isPomoRunning = false;
    const selectedDuration = parseInt(document.getElementById('pomo-duration-dropdown').value) || 25;
    pomoTime = selectedDuration * 60;
    updatePomoDisplay();
    document.getElementById('pomo-toggle').textContent = 'Start Focus';
    document.getElementById('pomo-status').textContent = 'Focus Session';
}

function updatePomoDisplay() {
    const m = Math.floor(pomoTime / 60);
    const s = pomoTime % 60;
    document.getElementById('pomo-display').textContent =
        `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    
    const selectedDuration = parseInt(document.getElementById('pomo-duration-dropdown').value) || 25;
    const total = selectedDuration * 60;
    const percent = pomoTime / total;
    const dashoffset = 283 - (percent * 283);
    document.getElementById('pomo-progress').style.strokeDashoffset = dashoffset;
}

// ─── Stats ───
function renderStats() {
    document.getElementById('stats-streak').innerHTML =
        `${streak} <span style="font-size:1.2rem">🔥</span>`;
    
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    // Weekly completed
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);
    const recentWeekStr = oneWeekAgo.toISOString().split('T')[0];
    const weeklyCompleted = tasks.filter(t => t.completed && t.date >= recentWeekStr).length;
    document.getElementById('stats-weekly').textContent = weeklyCompleted;
    
    // Summary stats
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const rate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    document.getElementById('stats-total').textContent = totalTasks;
    document.getElementById('stats-completed').textContent = completedTasks;
    document.getElementById('stats-rate').textContent = `${rate}%`;
    
    // Weekly chart
    renderWeeklyChart();
}

function renderWeeklyChart() {
    const container = document.getElementById('weekly-chart-bars');
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    
    let dailyCounts = [];
    let maxCount = 0;
    
    for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const dStr = d.toISOString().split('T')[0];
        const count = tasks.filter(t => t.completed && t.date === dStr).length;
        dailyCounts.push({ day: days[d.getDay()], count, isToday: i === 0 });
        if (count > maxCount) maxCount = count;
    }
    
    const maxHeight = 80; // px
    container.innerHTML = '';
    
    dailyCounts.forEach(dc => {
        const barHeight = maxCount > 0 ? Math.max(4, (dc.count / maxCount) * maxHeight) : 4;
        const wrap = document.createElement('div');
        wrap.className = 'chart-bar-wrap';
        wrap.innerHTML = `
            <span class="chart-value">${dc.count || ''}</span>
            <div class="chart-bar ${dc.count === 0 ? 'empty' : ''}" style="height:${barHeight}px"></div>
            <span class="chart-label">${dc.day}</span>
        `;
        container.appendChild(wrap);
    });
}

// ─── Confetti ───
let confettiCtx;
function setupConfetti() {
    const canvas = document.getElementById('confetti');
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    confettiCtx = canvas.getContext('2d');
}

function fireConfetti() {
    const count = 80;
    let particles = [];
    const shapes = ['rect', 'circle'];
    
    for (let i = 0; i < count; i++) {
        particles.push({
            x: window.innerWidth / 2 + (Math.random() - 0.5) * 100,
            y: window.innerHeight / 2,
            vx: (Math.random() - 0.5) * 18,
            vy: (Math.random() - 1) * 22,
            size: Math.random() * 8 + 4,
            color: `hsl(${Math.random() * 360}, 80%, 60%)`,
            life: 1,
            rotation: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 15,
            shape: shapes[Math.floor(Math.random() * shapes.length)]
        });
    }
    
    function animate() {
        confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        let active = false;
        
        particles.forEach(p => {
            if (p.life > 0) {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.5;
                p.life -= 0.018;
                p.rotation += p.rotSpeed;
                
                confettiCtx.save();
                confettiCtx.translate(p.x, p.y);
                confettiCtx.rotate((p.rotation * Math.PI) / 180);
                confettiCtx.fillStyle = p.color;
                confettiCtx.globalAlpha = p.life;
                
                if (p.shape === 'circle') {
                    confettiCtx.beginPath();
                    confettiCtx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                    confettiCtx.fill();
                } else {
                    confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
                }
                
                confettiCtx.restore();
                active = true;
            }
        });
        
        if (active) requestAnimationFrame(animate);
        else confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
    animate();
}

// ─── Helpers ───
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ─── Global References ───
window.toggleTask = toggleTask;
window.deleteTask = deleteTask;
window.openView = openView;
window.openTaskModal = openTaskModal;
window.toggleModalSubtask = toggleModalSubtask;
window.removeModalSubtask = removeModalSubtask;
window.toggleSubtask = toggleSubtask;

// ─── Start ───
init();
