const imagesContainer = document.querySelector(".images-container")

const date = "2022-08-11"
const count = 5
const API_KEY = "RTdUvNVaZuJMA6Amrlv7ucgamhNVhsexr0FR0aoc"
const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=${count}`

let resultsArray = []

function createCard(item){
    const div = document.createElement("div")
    div.className = "card"
    div.innerHTML = `
    <a href="#" title="View Full Image">
        <img src="${item.hdurl}" alt="NASA picture of day" class="card-img-top">
    </a>
    <div class="card-body">
        <h5 class="card-title">${item.title}</h5>
        <p class="clickable addFavorites">Add to favorites</p>
        <p class="card-text">${item.explanation}</p>
        <small class="text-muted">
            <strong>${item.date}</strong>
            <span>${item.copyright}</span>
        </small>
    </div>
`   
    imagesContainer.appendChild(div)
    
}


async function getNasaData(){
    try {
        const response = await fetch(url)
        resultsArray = await response.json()
        resultsArray.forEach(element => {
            createCard(element)            
        });

    } catch (error) {

    }
}

getNasaData()