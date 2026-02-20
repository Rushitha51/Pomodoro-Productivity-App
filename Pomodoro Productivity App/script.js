let focusMinutes = 25;
let breakMinutes = 5;
let isRunning = false;
let isFocus = true;
let timer;
let totalSeconds = focusMinutes * 60;
const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const focusRange = document.getElementById("focusRange");
const breakRange = document.getElementById("breakRange");
const focusTimeDisplay = document.getElementById("focusTime");
const breakTimeDisplay = document.getElementById("breakTime");
function updateTimerDisplay() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
}
function startTimer() {
    if(isRunning) return;
    isRunning = true;
    timer = setInterval(() => {
        if(totalSeconds > 0) {
            totalSeconds--;
            updateTimerDisplay();
        } else {
            clearInterval(timer);
            isRunning = false;
            isFocus = !isFocus;
            totalSeconds = isFocus ? focusMinutes*60 : breakMinutes*60;
            alert(isFocus ? "🌟 Focus time starts!" : "☕ Break time!");
            startTimer();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    isFocus = true;
    totalSeconds = focusMinutes * 60;
    updateTimerDisplay();
}
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

focusRange.addEventListener("input", (e)=>{
    focusMinutes = parseInt(e.target.value);
    focusTimeDisplay.textContent = focusMinutes;
    if(isFocus) {
        totalSeconds = focusMinutes * 60;
        updateTimerDisplay();
    }
});

breakRange.addEventListener("input", (e)=>{
    breakMinutes = parseInt(e.target.value);
    breakTimeDisplay.textContent = breakMinutes;
    if(!isFocus){
        totalSeconds = breakMinutes * 60;
        updateTimerDisplay();
    }
});
updateTimerDisplay();
