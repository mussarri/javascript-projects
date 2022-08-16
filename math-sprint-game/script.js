const form = document.getElementById("start-form")
const countDown = document.querySelector(".countdown")
const counDownPage = document.getElementById("countdown-page")
const splashPage = document.getElementById("splash-page")
const gamePage = document.getElementById("game-page")
const scorePage = document.getElementById("score-page")
const itemContainer = document.querySelector(".item-container")
const radioContainers = document.querySelectorAll(".radio-container")
const input = document.querySelectorAll("input")
const wrongBtn = document.querySelector(".wrong")
const rigthBtn = document.querySelector(".right")
const finalTime = document.querySelector(".final-time")
const bestTime = document.querySelector(".best-time")
const penaltyTime = document.querySelector(".penalty-time")
const bestScoreValue = document.querySelectorAll(".best-score-value")
const playAgainBtn = document.querySelector(".play-again")


let y = 0
let questionAmount 
let equationsArray = []
let userAnswers = []
let timer = 0
let userPenalty
let bestScore = JSON.parse(localStorage.getItem("BestScore")) || {}

showBestScore()



function shuffle(array) {
    let currentIndex = array.length,  randomIndex;  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }  
    return array;
} 
  

function getRandom(x){
    return Math.ceil(Math.random() * x);
} 

function createEquation(evaluated){
    // Create wrong and right equation
    const firstNumber = getRandom(9)
    const secondNumber = getRandom(9)
    const trueAnswer = firstNumber*secondNumber
    const wrongAnswers = [
        firstNumber*secondNumber - 1,firstNumber*secondNumber -2,firstNumber*secondNumber + 1,firstNumber*secondNumber + 2]
    const rightEquation = {
        equation:`${firstNumber} * ${secondNumber} = ${trueAnswer}`, 
        evaluated: "Right"
    }
    const wrongEquation = {
        equation:`${firstNumber} * ${secondNumber} = ${wrongAnswers[getRandom(3)]}`,
        evaluated: "Wrong"
    }    
    if(evaluated == "Wrong"){
        equationsArray.push(wrongEquation) 
    }else if(evaluated == "Right"){
        equationsArray.push(rightEquation)
    }else{
        alert("Please enter arguments( Right or Wrong )")
    }
} 

function createEquations(x, evaluated){
    // Create multiple equations
    for (let i = 0; i < x ; i++) {
        createEquation(evaluated)        
    }
} 

function createEquationsArray(){
    // Create number of random rights and wrongs equations according to questionAmount that user select
    const rights = getRandom(questionAmount - 1)
    const wrongs = questionAmount -rights
    createEquations(rights, "Right")
    createEquations(wrongs, "Wrong")
    shuffle(equationsArray)
} 


function equationsDOM(item){
    //Create DOM element 
    const div = document.createElement("div")
    div.className = "item"
    const h1 = document.createElement("h1")
    h1.textContent = item.equation
    div.appendChild(h1)
    itemContainer.appendChild(div)
} 

function scrollY(){    
    itemContainer.scroll(0, y);
    y = y + 70;
}

function nextQuestion(answer){
    // Go to the next question with answering 
    const nextElement = document.querySelector(".selected-item").nextElementSibling;
    userAnswers.push(answer)
    if(!nextElement){
        alert("Quiz completed")
        controlResults(equationsArray, userAnswers)
        stopTimer()
    }else{
        nextElement.classList.add("selected-item")
        document.querySelector(".selected-item").classList.remove("selected-item")
        scrollY()
    }
} 



// Below the this line is show resulst

function controlResults(arr1 ,arr2){
    // Compare two array
    let wrongAnswers = 0
    for (let i = 0; i < arr1.length; i++) {
       if(arr1[i]["evaluated"] !== arr2[i]){
         wrongAnswers++
       }    
    }
    userPenalty = wrongAnswers;
}

function showResulstPage(){
    gamePage.hidden = true
    scorePage.hidden = false
}

function startTimer(){
    setInterval(() => {
        timer = timer + 0.1
    }, 100);
}

function setBestScore(){
    // If bestscore for that time and better than current don't change, otherwise add or update
    if(bestScore[`${questionAmount}`] < timer + userPenalty){
        console.log("Time not changed", bestScore);
    }else{
        bestScore[`${questionAmount}`] = timer + userPenalty
        localStorage.setItem("BestScore", JSON.stringify(bestScore))
        console.log("Time updated", bestScore);
    }
    bestTime.firstElementChild.textContent = `${bestScore[`${questionAmount}`].toFixed(1)}`
}

function setPenalty(){
    penaltyTime.firstElementChild.textContent = `${userPenalty}`
}

function stopTimer(){
    clearInterval(timer)
    finalTime.textContent = `${timer.toFixed(2)}s`
    setPenalty()
    setBestScore()
    showResulstPage()  
}

function playAgain(){
    location.reload(); 
}



// Below the this line selecting number of question, counting 3,2,1 and switching gamePage 

function showBestScore() {    
    bestScoreValue.forEach((element) => {
        const value = element.parentElement.previousElementSibling.value
        if(!bestScore[`${value}`]){
            element.firstElementChild.textContent = "0.0"
        }else{
            element.firstElementChild.textContent = bestScore[`${value}`].toFixed(1)
        } 
    })
}

function handleForm(e){
    // When submiting form if user select a choice of number of question countdown starts and inputs reset, equations created and each creation showing DOM after countDownStart and showGamePage runs, these are async functions(settimeout), timer starts,  
    e.preventDefault()    
    questionAmount = Object.values(input).filter(i => i.checked)[0].value; 
    if(questionAmount) {
        showCountDown()
        input.forEach(i => i.checked = false)
        createEquationsArray()
        equationsArray.forEach(item => equationsDOM(item))
    }
    countDownStart()
    showGamePage()
    document.querySelectorAll(".item")[0].classList.add("selected-item"); 
    startTimer()
}

function showCountDown(){
    counDownPage.hidden = false
    splashPage.hidden = true
}
function showGamePage(){
    setTimeout(() => {
        gamePage.hidden = false
        counDownPage.hidden = true         
        itemContainer.scroll(0, 0);
    }, 4000);
}

function countDownStart(){
    countDown.textContent = `3`
    setTimeout(() => {
        countDown.textContent = `2`
        setTimeout(() => {
            countDown.textContent = `1`
            setTimeout(() => {
                countDown.textContent = "GO"
            }, 1000);
        }, 1000);
    }, 1000);    
}



playAgainBtn.addEventListener("click", playAgain)

rigthBtn.addEventListener("click", () => nextQuestion("Right"))
wrongBtn.addEventListener("click", () => nextQuestion("Wrong"))

form.addEventListener("submit", handleForm)

form.addEventListener("click", () => {
    radioContainers.forEach((radioEl) => {
        radioEl.classList.remove("selected-label")
        if(radioEl.children[1].checked){
            radioEl.classList.add("selected-label")
        }
    })
})

