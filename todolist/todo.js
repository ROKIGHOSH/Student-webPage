document.addEventListener('DOMContentLoaded', () => {
    // Task list functionality
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');

    // Add Task
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const li = document.createElement('li');
            li.innerHTML = `
                ${taskText} <button class="remove-task">Remove</button>
            `;
            taskList.appendChild(li);
            taskInput.value = '';
        }
    });

    // Remove Task
    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-task')) {
            e.target.parentElement.remove();
        }
    });

    // Clock functionality
    const clockElement = document.getElementById('clock');

    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }

    setInterval(updateClock, 1000);

    // Stopwatch functionality
    const startStopwatchButton = document.getElementById('start-stopwatch');
    const stopStopwatchButton = document.getElementById('stop-stopwatch');
    const resetStopwatchButton = document.getElementById('reset-stopwatch');
    let stopwatchInterval;
    let elapsedTime = 0;

    function formatTime(ms) {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function updateStopwatch() {
        elapsedTime += 1000;
        const timeDisplay = formatTime(elapsedTime);
        startStopwatchButton.textContent = timeDisplay;
    }

    startStopwatchButton.addEventListener('click', () => {
        if (!stopwatchInterval) {
            stopwatchInterval = setInterval(updateStopwatch, 1000);
        }
    });

    stopStopwatchButton.addEventListener('click', () => {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
    });

    resetStopwatchButton.addEventListener('click', () => {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
        elapsedTime = 0;
        startStopwatchButton.textContent = 'Start Stopwatch';
    });

    // Reminder functionality
    const reminderTimeInput = document.getElementById('reminder-time');
    const setReminderButton = document.getElementById('set-reminder');

    setReminderButton.addEventListener('click', () => {
        const reminderTime = new Date(reminderTimeInput.value);
        const now = new Date();

        if (reminderTime > now) {
            const timeUntilReminder = reminderTime - now;
            setTimeout(() => {
                alert('Reminder!');
            }, timeUntilReminder);
        } else {
            alert('Please select a future time.');
        }
    });
});
