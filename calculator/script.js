const display = document.querySelector("h1")
const buttons = document.querySelectorAll("button")
const clearBtn = document.getElementById("clear-btn")

let firstValue
let secondValue
let operatorValue
let awaitingNextValue

const operatorValues = {
    "+" : (a, b)  => a + b,
    "-" : (a, b) => a - b,
    "/" : (a, b) => a / b,
    "*" : (a, b) => a * b
}

function sendValue(number){
    if(awaitingNextValue){
        display.textContent = number
        awaitingNextValue = false
        secondValue = number
    }else{
        const displayValue = display.textContent
        display.textContent = displayValue === "0" ? number : displayValue + number
    }

}

function reset(){
    display.textContent = "0"
    firstValue = "0"
    operatorValue = null
    awaitingNextValue = false
}

function addDecimal(){
    if(awaitingNextValue) return  
    if(!display.textContent.includes(".")){
        display.textContent = `${display.textContent}.`
    }
}

function useOperator(operator){
    const currentValue = Number(display.textContent)
    if(!firstValue) {
        firstValue = currentValue
    }      
    awaitingNextValue = true
    operatorValue = operator
    console.log(operatorValue);
}

function calculate(first, second, operator){
    const result = operatorValues[operator](+first, +second)
    display.textContent = result
    firstValue = result
}



buttons.forEach((button) => {
    if(button.classList.length === 0){
        button.addEventListener("click", () => sendValue(button.value))
    }else if(button.classList.contains("operator")){
        button.addEventListener("click", () => useOperator(button.value))
    }else if(button.classList.contains("decimal"))
        button.addEventListener("click", () => addDecimal())
    else if(button.classList.contains("equal")){
        button.addEventListener("click", () => calculate(firstValue, secondValue, operatorValue))
    }
})

clearBtn.addEventListener("click", reset)

