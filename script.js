// script.js
let startTime, updatedTime, difference, tInterval, running = false, paused = false;

const timeDisplay = document.getElementById('time');
const lapsList = document.getElementById('laps');

document.getElementById('start').addEventListener('click', start);
document.getElementById('pause').addEventListener('click', pause);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('lap').addEventListener('click', recordLap);

function start() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 1);
        paused = false;
        running = true;
    }
}

function pause() {
    if (!paused && running) {
        clearInterval(tInterval);
        paused = true;
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    timeDisplay.innerHTML = '00:00:00.000';
    lapsList.innerHTML = '';
    running = false;
    paused = false;
    difference = 0;
}

function recordLap() {
    if (running) {
        const lapTime = document.createElement('div');
        lapTime.classList.add('lap-card');
        lapTime.textContent = timeDisplay.innerHTML;
        lapsList.appendChild(lapTime);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000));

    timeDisplay.innerHTML = 
        (hours < 10 ? '0' : '') + hours + ':' + 
        (minutes < 10 ? '0' : '') + minutes + ':' + 
        (seconds < 10 ? '0' : '') + seconds + '.' + 
        (milliseconds < 100 ? (milliseconds < 10 ? '00' : '0') : '') + milliseconds;
}
