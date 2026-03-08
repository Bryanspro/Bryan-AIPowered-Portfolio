// State variables
let timerInterval, stopwatchInterval, pomoInterval;
let stopwatchLaps = [];
let stopwatchTime = 0;
let timerTime = 0;
let pomoTime = 1500; // 25 mins
let isPomoRunning = false, isTimerRunning = false, isStopwatchRunning = false;

let alarms = [
    { time: '07:30', label: 'Morning Wake', active: true },
    { time: '12:00', label: 'Lunch Time', active: false }
];

const worldCities = [
    { name: 'London', tz: 'Europe/London' },
    { name: 'New York', tz: 'America/New_York' },
    { name: 'Tokyo', tz: 'Asia/Tokyo' },
    { name: 'Sydney', tz: 'Australia/Sydney' }
];

// Navigation
function openView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');

    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    let navBtn = document.querySelector(`.nav-item[data-view="${viewId}"]`);
    if (navBtn) navBtn.classList.add('active');
}

document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => openView(btn.dataset.view));
});

// Theme Toggle
const html = document.documentElement;
document.getElementById('theme-toggle').addEventListener('click', () => {
    let currentTheme = html.getAttribute('data-theme');
    html.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
});

// Color Scheme Picker
const colorPicker = document.getElementById('accent-color-picker');
colorPicker.addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--accent', e.target.value);
});

// Clock Logic
function updateClock() {
    const now = new Date();

    // Status bar
    document.getElementById('status-time').textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Analog
    const secs = now.getSeconds();
    const mins = now.getMinutes();
    const hrs = now.getHours();

    const secDeg = (secs / 60) * 360;
    const minDeg = ((mins + secs / 60) / 60) * 360;
    const hrDeg = ((hrs % 12 + mins / 60) / 12) * 360;

    document.getElementById('sec-hand').style.transform = `rotate(${secDeg}deg)`;
    document.getElementById('min-hand').style.transform = `rotate(${minDeg}deg)`;
    document.getElementById('hour-hand').style.transform = `rotate(${hrDeg}deg)`;

    // Digital
    document.getElementById('digital-time').textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    document.getElementById('digital-ampm').textContent = hrs >= 12 ? 'PM' : 'AM';

    // Date
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    document.getElementById('current-date').textContent = now.toLocaleDateString(undefined, options);

    // World Clock Render
    renderWorldClocks();

    requestAnimationFrame(updateClock);
}
requestAnimationFrame(updateClock);

// World Clock Render
function renderWorldClocks() {
    const list = document.getElementById('world-list');
    if (!list) return;

    const now = new Date();
    let html = '';

    worldCities.forEach(city => {
        let timeString = now.toLocaleTimeString('en-US', { timeZone: city.tz, hour: '2-digit', minute: '2-digit', hour12: true });
        let parts = timeString.split(' ');

        // Difference from local
        let cityTime = new Date(now.toLocaleString('en-US', { timeZone: city.tz }));
        let diffHours = Math.round((cityTime - now) / 3600000);
        let diffStr = diffHours > 0 ? `+${diffHours}HRS` : (diffHours < 0 ? `${diffHours}HRS` : 'Today');

        html += `
            <div class="city-card">
                <div class="city-info">
                    <h3>${city.name}</h3>
                    <p>${diffStr}</p>
                </div>
                <div class="city-time">
                    ${parts[0]} <span class="city-ampm">${parts[1]}</span>
                </div>
            </div>
        `;
    });
    // Add local as first element
    if (list.innerHTML !== html) list.innerHTML = html;
}

// Alarms
function renderAlarms() {
    const list = document.getElementById('alarm-list');
    list.innerHTML = '';

    alarms.forEach((alarm, idx) => {
        let isAmPm = parseInt(alarm.time.split(':')[0]) >= 12 ? 'PM' : 'AM';
        let formattedTime = alarm.time;

        const card = document.createElement('div');
        card.className = `alarm-card ${alarm.active ? 'active-alarm' : ''}`;
        card.innerHTML = `
            <div>
                <div class="alarm-time">${formattedTime} <span style="font-size:1rem;color:var(--text-muted)">${isAmPm}</span></div>
                <div class="alarm-label">${alarm.label}</div>
            </div>
            <label class="switch">
                <input type="checkbox" ${alarm.active ? 'checked' : ''} onchange="toggleAlarm(${idx}, this.checked)">
                <span class="slider"></span>
            </label>
        `;
        list.appendChild(card);
    });
}
window.toggleAlarm = (idx, active) => {
    alarms[idx].active = active;
    renderAlarms();
};

document.getElementById('add-alarm-btn').addEventListener('click', () => {
    document.getElementById('alarm-modal').classList.add('active');
});
window.closeModal = (id) => document.getElementById(id).classList.remove('active');

document.getElementById('save-alarm-btn').addEventListener('click', () => {
    const time = document.getElementById('new-alarm-time').value;
    const label = document.getElementById('new-alarm-label').value || 'Alarm';
    if (time) {
        alarms.push({ time, label, active: true });
        renderAlarms();
        closeModal('alarm-modal');
    }
});
renderAlarms();

// Tools specific Logic
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tool-content').forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        document.getElementById(btn.dataset.target).classList.add('active');
    });
});

// Stopwatch
function updateStopwatchDisplay() {
    let ms = stopwatchTime % 1000;
    let s = Math.floor((stopwatchTime / 1000) % 60);
    let m = Math.floor((stopwatchTime / 60000) % 60);
    document.getElementById('stopwatch-display').textContent =
        `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${Math.floor(ms / 10).toString().padStart(2, '0')}`;
}

document.getElementById('stopwatch-start').addEventListener('click', () => {
    isStopwatchRunning = true;
    document.getElementById('stopwatch-start').classList.add('hidden');
    document.getElementById('stopwatch-pause').classList.remove('hidden');
    document.getElementById('stopwatch-reset').classList.add('hidden');
    document.getElementById('stopwatch-lap').classList.remove('hidden');

    let lastTime = Date.now();
    stopwatchInterval = setInterval(() => {
        let now = Date.now();
        stopwatchTime += (now - lastTime);
        lastTime = now;
        updateStopwatchDisplay();
    }, 10);
});

document.getElementById('stopwatch-pause').addEventListener('click', () => {
    isStopwatchRunning = false;
    clearInterval(stopwatchInterval);
    document.getElementById('stopwatch-pause').classList.add('hidden');
    document.getElementById('stopwatch-start').classList.remove('hidden');
    document.getElementById('stopwatch-lap').classList.add('hidden');
    document.getElementById('stopwatch-reset').classList.remove('hidden');
});

document.getElementById('stopwatch-reset').addEventListener('click', () => {
    stopwatchTime = 0;
    stopwatchLaps = [];
    document.getElementById('lap-list').innerHTML = '';
    document.getElementById('stopwatch-reset').classList.add('hidden');
    document.getElementById('stopwatch-lap').classList.remove('hidden');
    updateStopwatchDisplay();
});

document.getElementById('stopwatch-lap').addEventListener('click', () => {
    if (stopwatchTime === 0 && !isStopwatchRunning) return;
    let display = document.getElementById('stopwatch-display').textContent;
    stopwatchLaps.push(display);
    let html = '';
    stopwatchLaps.slice().reverse().forEach((lap, idx) => {
        html += `<li class="lap-item"><span>Lap ${stopwatchLaps.length - idx}</span><span>${lap}</span></li>`;
    });
    document.getElementById('lap-list').innerHTML = html;
});

// Timer
function updateTimerDisplay() {
    let h = Math.floor(timerTime / 3600);
    let m = Math.floor((timerTime % 3600) / 60);
    let s = timerTime % 60;
    document.getElementById('timer-display').textContent =
        `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

document.getElementById('timer-start').addEventListener('click', () => {
    if (!isTimerRunning) {
        let h = parseInt(document.getElementById('timer-h').value) || 0;
        let m = parseInt(document.getElementById('timer-m').value) || 0;
        let s = parseInt(document.getElementById('timer-s').value) || 0;

        if (timerTime === 0) timerTime = (h * 3600) + (m * 60) + s;
        if (timerTime <= 0) return;

        document.querySelector('.time-input').classList.add('hidden');
        document.getElementById('timer-display').classList.remove('hidden');

        document.getElementById('timer-start').classList.add('hidden');
        document.getElementById('timer-pause').classList.remove('hidden');

        isTimerRunning = true;
        timerInterval = setInterval(() => {
            if (timerTime > 0) {
                timerTime--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                isTimerRunning = false;
                alert("Timer Finished!");
                document.getElementById('timer-reset').click();
            }
        }, 1000);
    }
});

document.getElementById('timer-pause').addEventListener('click', () => {
    clearInterval(timerInterval);
    isTimerRunning = false;
    document.getElementById('timer-pause').classList.add('hidden');
    document.getElementById('timer-start').classList.remove('hidden');
});

document.getElementById('timer-reset').addEventListener('click', () => {
    clearInterval(timerInterval);
    isTimerRunning = false;
    timerTime = 0;

    document.getElementById('timer-pause').classList.add('hidden');
    document.getElementById('timer-start').classList.remove('hidden');

    document.querySelector('.time-input').classList.remove('hidden');
    document.getElementById('timer-display').classList.add('hidden');
});

// Pomodoro
document.querySelectorAll('.pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (isPomoRunning) return;
        document.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        let mins = parseInt(btn.dataset.time);
        pomoTime = mins * 60;
        let m = Math.floor(pomoTime / 60);
        let s = pomoTime % 60;
        document.getElementById('pomo-display').textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    });
});

document.getElementById('pomo-start').addEventListener('click', () => {
    if (isPomoRunning) {
        clearInterval(pomoInterval);
        isPomoRunning = false;
        document.getElementById('pomo-start').textContent = '▶';
    } else {
        isPomoRunning = true;
        document.getElementById('pomo-start').innerHTML = '⏸';
        pomoInterval = setInterval(() => {
            if (pomoTime > 0) {
                pomoTime--;
                let m = Math.floor(pomoTime / 60);
                let s = pomoTime % 60;
                document.getElementById('pomo-display').textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
            } else {
                clearInterval(pomoInterval);
                isPomoRunning = false;
                alert("Session Complete!");
                document.getElementById('pomo-reset').click();
            }
        }, 1000);
    }
});

document.getElementById('pomo-reset').addEventListener('click', () => {
    clearInterval(pomoInterval);
    isPomoRunning = false;
    document.getElementById('pomo-start').textContent = '▶';
    let btn = document.querySelector('.pill-btn.selected');
    let mins = parseInt(btn.dataset.time);
    pomoTime = mins * 60;
    let m = Math.floor(pomoTime / 60);
    let s = pomoTime % 60;
    document.getElementById('pomo-display').textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
});

// Mock Voice Assistant
const voiceBtn = document.getElementById('voice-assist-btn');
voiceBtn.addEventListener('click', () => {
    voiceBtn.classList.toggle('recording');
    const feedback = document.getElementById('voice-feedback');
    if (voiceBtn.classList.contains('recording')) {
        feedback.textContent = "Listening... Speak now";
        setTimeout(() => {
            voiceBtn.classList.remove('recording');
            feedback.textContent = "✔ Alarm set for 8:00 AM";
            alarms.push({ time: '08:00', label: 'Voice Alarm', active: true });
            renderAlarms();
            setTimeout(() => { feedback.textContent = "Tap mic to speak"; }, 3000);
        }, 2000);
    } else {
        feedback.textContent = "Tap mic to speak";
    }
});

// Calendar Logic
function renderCalendar() {
    const today = new Date();
    const currMonth = today.getMonth();
    const currYear = today.getFullYear();

    document.getElementById('cal-month-year').textContent = today.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

    const firstDay = new Date(currYear, currMonth, 1).getDay();
    const daysInMonth = new Date(currYear, currMonth + 1, 0).getDate();

    let html = '';
    // empty slots
    for (let i = 0; i < firstDay; i++) {
        html += `<div class="cal-day dim"></div>`;
    }
    // days
    for (let i = 1; i <= daysInMonth; i++) {
        const isToday = i === today.getDate() ? 'today' : '';
        html += `<div class="cal-day ${isToday}">${i}</div>`;
    }
    document.getElementById('cal-grid').innerHTML = html;
}
renderCalendar();

// Converter Defaults
const timezones = Intl.supportedValuesOf('timeZone');
const selectFrom = document.getElementById('conv-from-tz');
const selectTo = document.getElementById('conv-to-tz');

timezones.forEach(tz => {
    let opt1 = document.createElement('option');
    opt1.value = tz; opt1.text = tz;
    let opt2 = document.createElement('option');
    opt2.value = tz; opt2.text = tz;
    selectFrom.add(opt1); selectTo.add(opt2);
});

selectFrom.value = Intl.DateTimeFormat().resolvedOptions().timeZone;
selectTo.value = 'UTC';

function updateConversion() {
    let timeVal = document.getElementById('conv-from-time').value;
    if (!timeVal) return;

    let parts = timeVal.split(':');
    let fromTz = selectFrom.value;
    let toTz = selectTo.value;

    // Create date in local assuming the inputs for fromTz
    // Simple mock converter display for UI purposes
    document.getElementById('conv-result').textContent = `${timeVal} ${toTz.split('/')[1] || 'UTC'}`;
}

selectFrom.addEventListener('change', updateConversion);
selectTo.addEventListener('change', updateConversion);
document.getElementById('conv-from-time').addEventListener('input', updateConversion);
updateConversion();
