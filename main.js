const slider = document.getElementById("study");
const output = document.getElementById("output");
const kesulitan = document.getElementById("kesulitan");
function updateDisplay(minutes){
    let hours = Math.floor(minutes / 60);
    let mins = minutes % 60;
    if(hours >0 && mins >0) {
        output.textContent = `${hours} hour ${mins} minutes`;
    } else if (hours > 0){
        output.textContent = `${hours} hour`;
    }else{
        output.textContent = `${mins} minutes`;
    }
}
if(slider && output){
    slider.addEventListener("input",function(){
        updateDisplay(parseInt(slider.value));
    });
}
if(kesulitan && slider){
    kesulitan.addEventListener("change", function () {
        slider.value = this.value;
        updateDisplay(parseInt(this.value));
    });
}
if(slider){
    updateDisplay(parseInt(slider.value));
}
const mapelSelect = document.querySelector("select");
const aturBtn = document.querySelector(".goal button");
const mapelDisplay = document.getElementById("mapelDisplay");
const totalDisplay = document.getElementById("totalDisplay");
const statusIcon = document.getElementById("statusIcon");
const timerDisplay = document.getElementById("timer");
const stopBtn = document.getElementById("stopTimer");

let countdown;
let totalSeconds = 0;

if(aturBtn){
aturBtn.addEventListener("click", function(e){
    e.preventDefault();
    initialTotal = totalSeconds;
    const selectedMapel = mapelSelect.value;
    const selectedMinutes = parseInt(slider.value);

    if(!selectedMapel || isNaN(selectedMinutes)){
        alert("Pilih mapel dan waktu dulu!");
        return;
    }

    mapelDisplay.textContent = selectedMapel;
    totalDisplay.textContent = selectedMinutes + " minutes";
    statusIcon.textContent = "ACTIVE";

    totalSeconds = selectedMinutes * 60;
    const endTime = Date.now() + (selectedMinutes * 60 * 1000);
    localStorage.setItem("focusEndTime", endTime);
    localStorage.setItem("focusMapel", selectedMapel);
    startTimer();
    document.getElementById("focus").scrollIntoView({ behavior: "smooth" });
});
}

function startTimer(){
    document.querySelector(".focus-card")?.classList.add("active");

    clearInterval(countdown);
    
    countdown = setInterval(function(){
        let percent = ((initialTotal - totalSeconds) / initialTotal) * 100;
        if(progressBar) progressBar.style.width = percent + "%";
        if(totalSeconds <= 0){
            clearInterval(countdown);
            statusIcon.textContent = "OFF";
            return;
        }

        totalSeconds--;

        let hrs = Math.floor(totalSeconds / 3600);
        let mins = Math.floor((totalSeconds % 3600) / 60);
        let secs = totalSeconds % 60;

        timerDisplay.textContent =
            String(hrs).padStart(2,'0') + ":" +
            String(mins).padStart(2,'0') + ":" +
            String(secs).padStart(2,'0');

    },1000);
}

if(stopBtn){
stopBtn.addEventListener("click", function(){
    let confirmStop = confirm("Apakah yakin ingin menghentikan fokus mode? Anda akan gagal menyelesaikan tantangan!!");

if(confirmStop){
    clearInterval(countdown);

    localStorage.removeItem("focusEndTime");
    localStorage.removeItem("focusMapel");

    document.querySelector(".focus-card")?.classList.remove("active");
    if(mapelDisplay) mapelDisplay.textContent = "-";
    if(totalDisplay) totalDisplay.textContent = "-";
    if(statusIcon) statusIcon.textContent = "OFF";
    if(timerDisplay) timerDisplay.textContent = "00:00:00";
    if(progressBar) progressBar.style.width = "0%";
}
});
}
const progressBar = document.getElementById("progressBar");
let initialTotal = 0;
if(statusIcon){
    statusIcon.textContent = "ACTIVE";
    statusIcon.classList.remove("off");
    statusIcon.classList.add("active");
    statusIcon.textContent = "OFF";
    statusIcon.classList.remove("active");
    statusIcon.classList.add("off");
}
const focusBtn = document.getElementById("focusBtn");
const popup = document.getElementById("popupFocus");
const closePopup = document.getElementById("closePopup");

if(focusBtn && popup){
focusBtn.addEventListener("click", () => {
    popup.classList.add("active");
});
}

if(closePopup && popup){
closePopup.addEventListener("click", () => {
    popup.classList.remove("active");
});
}
const navLinks = document.querySelectorAll(".list ul li a");

navLinks.forEach(link => {
    link.addEventListener("click", function(){

        navLinks.forEach(el => el.classList.remove("active"));

        this.classList.add("active");

    });
});
// Hamburger toggle
const hamburger = document.querySelector('.hamburger');
const list = document.querySelector('.list');
hamburger?.addEventListener('click', () => {
    list.classList.toggle('open');
});
const savedEndTime = localStorage.getItem("focusEndTime");
const savedMapel = localStorage.getItem("focusMapel");

if(savedEndTime){

    const now = Date.now();
    const remaining = Math.floor((savedEndTime - now) / 1000);

    if(remaining > 0){

        totalSeconds = remaining;
        initialTotal = remaining;

        if(mapelDisplay) mapelDisplay.textContent = savedMapel;
        if(totalDisplay) totalDisplay.textContent = Math.floor(remaining/60) + " minutes";
        if(statusIcon) statusIcon.textContent = "ACTIVE";

        startTimer();

    } else {
        localStorage.removeItem("focusEndTime");
        localStorage.removeItem("focusMapel");
    }
}