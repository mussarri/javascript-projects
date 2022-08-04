import { API_KEY } from "./config.js";

const count = 10;
const container = document.querySelector(".container")

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${count}`

async function getPhoto(){
    try {
       const response = await fetch(apiUrl) 
       const data = await response.json()
    //    console.log(data[0].urls.full)
       data.forEach(element => {
         createAndDisplayImg(element)
       });
    } catch (error) {
      console.log(error)
    }
}

function createAndDisplayImg(photo){
    const img = document.createElement("img")
    img.setAttribute("src", photo.urls.regular)
    container.appendChild(img)
}

getPhoto()