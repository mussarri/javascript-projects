const button = document.querySelector("button")
const audio = document.querySelector("audio")
const body = document.querySelector("body")
var synth = window.speechSynthesis;

let data;

async function getJoke() {
    try {
        const response = await fetch("https://v2.jokeapi.dev/joke/Any") 
        data = await response.json()
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

getJoke()

button.addEventListener("click", () => {
    let text;
    if(data.joke){
        text = data.joke
    }else{
        text = data.setup + data.delivery
    } 

    button.disabled = true    
    var utterThis = new SpeechSynthesisUtterance(text);
    var voices = synth.getVoices();
    utterThis.voice = voices[3]  
    synth.speak(utterThis);
    utterThis.onend = () => button.disabled = false
    getJoke()
})



