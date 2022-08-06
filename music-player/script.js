import { songs } from "./songList.js"

const music = document.querySelector("audio")
const prevBtn = document.getElementById("prev")
const playBtn = document.getElementById("play")
const nextBtn = document.getElementById("next")
const title = document.getElementById("title")
const artist = document.getElementById("artist")
const img = document.querySelector("img")
const progressContainer = document.querySelector(".progress-container")
const progress = document.querySelector(".progress")
const currentTimeEl = document.getElementById("current-time")
const durationEl = document.getElementById("duration")
const volumeContainer = document.querySelector(".volume-container")
const volumeEl = document.querySelector(".volume")

let isPlaying = false
let currentIndex = 1

loadSong()

function play(){
    isPlaying = true
    playBtn.classList.replace("fa-play", "fa-pause")
    music.play()
}

function pause(){
    isPlaying = false
    playBtn.classList.replace("fa-pause", "fa-play")
    music.pause()
}

function loadSong(){
    title.textContent = songs[currentIndex].title
    artist.textContent = songs[currentIndex].artist
    img.setAttribute("src", `${songs[currentIndex].imgSrc}`)
    music.setAttribute("src", `${songs[currentIndex].audioUrl}`)
    setVolumeBar()
}


function updateProgressbar(e){
    const secondNumber = (x) => x < 10 ? `0${x}` : x
    const isTrue = (x) => x ? x : 0 

    let {currentTime, duration} = e.target
    progress.style.width = `${currentTime/duration * 100}%`

    let minute = Math.floor(duration/60);
    minute = isTrue(minute)
    let second = Math.floor(duration%60);
    second = secondNumber(second)
    second = isTrue(second)
    let currentMinute = Math.floor(currentTime/60);
    currentMinute = isTrue(currentMinute)
    let currentSecond = Math.floor(currentTime%60);
    currentSecond = secondNumber(currentSecond)
    currentSecond = isTrue(currentSecond)

    durationEl.innerText = `${minute}:${second}`
    currentTimeEl.innerText = `${currentMinute}:${currentSecond}`
}

function setTime(e){
    const clickPoint = e.offsetX
    const width = this.clientWidth
    const {duration} = music
    music.currentTime = (clickPoint/width) * duration;
}

function setVolumeBar(){
    volumeEl.style.width = `${music.volume * 100}%`
}

function setVolume(e){
    const clickPoint = e.offsetX
    const width = this.clientWidth
    music.volume = clickPoint/width;
    volumeEl.style.width = `${(clickPoint/width)*100}%`
}

playBtn.addEventListener("click", () => isPlaying ? pause() : play())
nextBtn.addEventListener("click", () => {
    currentIndex++
    if(currentIndex > songs.length -1){
        currentIndex = 0
    }
    loadSong()
    isPlaying && music.play()
})
prevBtn.addEventListener("click", () => {
    currentIndex--
    if (currentIndex < 0) {
        currentIndex = songs.length -1
    }
    loadSong()
}
)
music.addEventListener("timeupdate", updateProgressbar)
progressContainer.addEventListener("click", setTime)
volumeContainer.addEventListener("click", setVolume)
