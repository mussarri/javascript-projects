const playBtn = document.getElementById("play-btn")
const player = document.querySelector(".player")
const video = document.querySelector("video")
const volumeRange = document.querySelector(".volume-range")
const volumeBar = document.querySelector(".volume-bar")
const progressRange = document.querySelector(".progress-range")
const progressBar = document.querySelector(".progress-bar")
const timeElapsed = document.querySelector(".time-elapsed")
const timeDuration = document.querySelector(".time-duration")
const volumeIcon = document.querySelector(".volume-icon")
const fullScreenEl = document.querySelector(".fullscreen")
const speed = document.querySelector(".player-speed")

let lastVolume
let isFullscreen

function playPause() {
        if(!video.paused) {
            video.pause()
            playBtn.classList.replace("fa-pause", "fa-play")
        }else{
            video.play()
            playBtn.classList.replace("fa-play", "fa-pause")
        }
}

function displayTime(x){
    const second = x % 60
    const minute = x/60
    const hour = x/3600
    function addZero(x){
        if(x < 10) return `0${x}`
        else return `${x}`
    }
    return [second, minute, hour].map(x => addZero(Math.floor(x)))
}

function updateProgres(e){
    const {duration , currentTime} = e.target
    progressBar.style.width = `${(currentTime/duration)*100}%`
    // if hour is there show hour:minute:second
    if(displayTime[2]){
        timeElapsed.textContent = `${displayTime(currentTime)[2]}:${displayTime(currentTime)[1]}:${displayTime(currentTime)[0]}`
        timeDuration.textContent = `${displayTime(duration)[2]}:${displayTime(duration)[1]}:${displayTime(duration)[0]}` 
    }else{
        timeElapsed.textContent = `${displayTime(currentTime)[1]}:${displayTime(currentTime)[0]}` 
        timeDuration.textContent = `${displayTime(duration)[1]}:${displayTime(duration)[0]}` 
    }

}

function changeDuration(e){
    const {duration} = video
    const newTime = (e.offsetX / progressRange.offsetWidth) * duration; /* use progressRange instead of e.target because when ticked progress bar e.target is progresBar but we want progressRange */
    progressBar.style.width = `${(e.offsetX / progressRange.offsetWidth)*100}%` 
    video.currentTime = newTime
}

function spacePlay(e){
    if(e.keyCode == 32) playPause()
}

function showVolume(e){
    const rate =  (e.offsetX/volumeRange.offsetWidth);
    volumeBar.style.width = `${rate*100}%`
    if(volumeIcon.firstElementChild.classList.contains("fa-volume-xmark")){
        volumeIcon.firstElementChild.classList.replace("fa-volume-xmark","fa-volume-up");
    }   
        
    video.volume = rate
}

function muteToggle(e){
    if(e.target.classList.contains("fa-volume-up")){
        e.target.classList.replace("fa-volume-up","fa-volume-xmark");lastVolume = volumeBar.style.width; 
        volumeBar.style.width = `0%`
    }else{
        e.target.classList.replace("fa-volume-xmark","fa-volume-up");
        volumeBar.style.width = `${lastVolume}`
    }
}

function openFullScreen(elem){
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.mozRequestFullscreen) { /* Mozilla */
      elem.mozRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
      }
    video.classList.add("video-fulscreen")
}

function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
    video.classList.remove("video-fulscreen")
}

function toggleFullScreen(){
    if(!isFullscreen){
        openFullScreen(player)
    }else{
        closeFullscreen()
    }
    isFullscreen = !isFullscreen
}


function setSpeed(){
    video.playbackRate = speed.value;
}

function close(e){
    if(e.keyCodey == 27 && isFullscreen){
        closeFullscreen()
        console.log(isFullscreen);
    }
}


playBtn.onclick = playPause
video.onclick = playPause
window.addEventListener("keydown", spacePlay)
window.addEventListener("keydown", close)
video.addEventListener("timeupdate" ,updateProgres)
progressRange.addEventListener("click", changeDuration)
volumeIcon.addEventListener("click", muteToggle)
volumeRange.addEventListener("click", showVolume)
fullScreenEl.addEventListener("click", toggleFullScreen)
speed.addEventListener("change", setSpeed)


// progressRange.addEventListener("mousemove", progressHover)
// progressRange.addEventListener("mouseleave", progressHoverEnd)


// function progressHover(e){
//     progressBar.style.width = `${(e.layerX/progressRange.offsetWidth)*100}%`
// }

// function progressHoverEnd(){
//     const rate = (video.currentTime/video.duration)*100;
//     console.log(rate);
//     progressBar.style.width = `${rate}%`
// } 