const inputContainer = document.querySelector(".input-container")
const countdownForm = document.getElementById("countDownForm")
const dateEl = document.getElementById("date-picker")
const countDownContainer = document.querySelector(".countdown")
const title = document.getElementById("countdown-title")
const countdownLi = document.querySelectorAll("span")
const loader = document.querySelector(".loader")
const resetBtn = document.getElementById("reset-button")
const completeContainer = document.querySelector(".complete")
const countdownInfo = document.getElementById("countdown-info")
const newBtn = document.getElementById("new-button")

let countDownTitle;
let countDownDate;
let interval;

dateEl.min = new Date().toISOString().split("T")[0];

function arrangeDate(x){
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const year = day * 365;    
    return [(x%year)/day,(x%day)/hour,(x%hour)/minute, (x%minute)/second].map(item => Math.floor(item))
}

function setCountdown(e){
    e.preventDefault()
    countDownTitle= e.target[0].value;
    countDownDate= e.target[1].value;
    title.textContent = countDownTitle
    interval = setInterval(() => {
        setDOM()
    }, 1000);    
}

function setDOM(){
    const difference = Date.parse(countDownDate) - Date.now() 
    for (let i = 0; i < countdownLi.length; i++) {
        if (arrangeDate(difference)) {
            if(arrangeDate(difference)[0] < 1){
                countdownLi[0].parentElement.style.color = "red";
            }
            inputContainer.hidden = true
            countdownLi[i].textContent = arrangeDate(difference)[i]                  
            countDownContainer.hidden = false 
        }
    }
    if(difference < 1000) complete()
}

function reset(){
    clearInterval(interval)
    countDownContainer.hidden = true
    completeContainer.hidden = true
    inputContainer.hidden = false
    countdownForm[0].value = "";
    countdownForm[1].value = ""
}

function complete(){
    countDownContainer.hidden = true
    completeContainer.hidden = false
    countdownInfo.textContent = `Countdown Finished on ${countDownDate}`
}


countdownForm.addEventListener("submit", setCountdown)
resetBtn.addEventListener("click", reset)
newBtn.addEventListener("click", reset)

