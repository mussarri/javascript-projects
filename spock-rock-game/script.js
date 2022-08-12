const playerIcons = document.querySelectorAll(".player-container i")
const computerIcons = document.querySelectorAll(".computer-container i")
const playerContainer = document.querySelector(".player-container")
const computerContainer = document.querySelector(".computer-container")
const results = document.querySelector(".results")
const playerScoreEl = document.getElementById("playerScore")
const computerScoreEl = document.getElementById("computerScore")


let playerScore = 0
let computerScore = 0


function userChoice(e){
    return e.target.id; 
}

function computerChoice(){
    const randomIndex = Math.floor(Math.random()*5);
    return randomIndex; 
}

const table = {
    0:{
        beat: [2,3],
        defeat: [1,4]
    },
    1:{
        beat: [0,4],
        defeat: [2,3]
    },
    2:{
        beat: [1,3],
        defeat: [0,4]
    },
    3:{
        beat: [1,4],
        defeat: [0,2]
    },
    4:{
        beat: [0,2],
        defeat: [1,3]
    }
}

function whoWin(user, computer){
    if(table[user].beat.includes(computer)){
        results.textContent = "User Won"
        results.style.color = "green"     
        playerScore++
        playerScoreEl.textContent = `${playerScore}` 
        playerIcons[user].style.color = "green"
        computerIcons[computer].style.color = "red"  
    }
    else if(table[user].defeat.includes(computer)) {
        results.textContent = "Computer Won"
        results.style.color = "red"
        computerScore++
        computerScoreEl.textContent = `${computerScore}`   
        playerIcons[user].style.color = "red"
        computerIcons[computer].style.color = "green"
    }
    else {
        results.textContent = "No Winner"
        results.style.color = "#333"
        playerIcons[user].style.color = "#333"
        computerIcons[computer].style.color = "#333"
    }
    
}

playerIcons.forEach(element => 
    element.addEventListener("click", (e) => {
        playerIcons.forEach(item => item.style.color = "rgb(62, 89, 223)")
        computerIcons.forEach(item => item.style.color = "rgb(62, 89, 223)")
        const user = userChoice(e)
        const computer = computerChoice()
        whoWin(user, computer)
}) )
