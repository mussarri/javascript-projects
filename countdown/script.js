const inputContainer = document.querySelector(".input-container")
const countdownForm = document.getElementById("countDownForm")
const dateEl = document.getElementById("date-picker")
const countDownContainer = document.querySelector(".countdown")
const title = document.getElementById("countdown-title")
const countdownLi = document.querySelectorAll("span")
const loader = document.querySelector(".loader")

let countDownTitle;
let countDownDate;

const today = new Date()
dateEl.setAttribute("min", today)

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
    setInterval(() => {
        setDOM()        
    }, 1000);
    
}

function setDOM(){
    const difference = Date.parse(countDownDate) - Date.now() 
    for (let i = 0; i < countdownLi.length; i++) {
        if (arrangeDate(difference)) {
            inputContainer.setAttribute("hidden","hidden")
            countdownLi[i].textContent = arrangeDate(difference)[i]                  
            countDownContainer.removeAttribute("hidden") 
         }
    }
}



countdownForm.addEventListener("submit", setCountdown)


