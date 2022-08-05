const nav = document.getElementById("nav")
const image1 = document.getElementById("image1")
const image2 = document.getElementById("image2")
const image3 = document.getElementById("image3")
const themeBtn = document.querySelector(".switch-btn")
let theme = "light";


function imgSrc(x){
    image1.setAttribute("src", `img/undraw_bitcoin_re_urgq_${x}.svg`)
    image2.setAttribute("src", `img/undraw_good_team_re_hrvm_${x}.svg` )
    image3.setAttribute("src", `img/undraw_engineering_team_a7n2_${x}.svg`)
}

function darkMode(){
    document.documentElement.setAttribute("data-theme", "dark")
    nav.style.background = "rgb(0 0 0 / 20%)"
    imgSrc("dark")
    theme = "dark"
}

function lightMode(){
    document.documentElement.setAttribute("data-theme", "light")
    nav.style.background = "rgb(255 255 255 / 20%)"
    imgSrc("light")
    theme = "light"
}


themeBtn.addEventListener("click", () => {
    if(theme == "light"){
        darkMode()
    }else if(theme == "dark"){
        lightMode()
    }   
})