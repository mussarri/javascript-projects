let apiQuotes = []

const container = document.querySelector(".container")
const text = document.querySelector(".text")
const author = document.querySelector(".author")
const twitter = document.querySelector(".twitter")
const newQuoteBtn = document.querySelector(".new-quote")


function newQuote() {
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    console.log(quote); 

    if(!quote.author){
        author.textContent = "Anonym"
    }

    if(quote.text.length > 120){
        text.classList.add("small-size")
    }

    text.textContent = quote.text
    author.textContent = quote.author
}

async function getQuotes(){
    const apiUrl = "https://type.fit/api/quotes"
    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        newQuote()
    } catch (error) {
        
    }
}

getQuotes()