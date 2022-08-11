const playBtn = document.getElementById("play-btn")
const video = document.querySelector("video")
const volumeRange = document.querySelector(".volume-range")
const volumeBar = document.querySelector(".volume-bar")
const progressRange = document.querySelector(".progress-range")
const progressBar = document.querySelector(".progress-bar")
const timeElapsed = document.querySelector(".time-elapsed")
const timeDuration = document.querySelector(".time-duration")
const volumeIcon = document.querySelector(".volume-icon")

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
    video.volume = rate
}

function mute(e){
    if(e.target.classList.contains("fa-volume-up")){
        e.target.classList.replace("fa-volume-up","fa-volume-off");volumeBar.style.width = `${0}%`
    }else{
        e.target.classList.replace("fa-volume-off","fa-volume-up");
        volumeBar.style.width = `${100}%`
    }
}

function setMute(e){
    console.log(e.target)
}



playBtn.onclick = playPause
video.onclick = playPause
window.addEventListener("keydown", spacePlay)
video.addEventListener("timeupdate" ,updateProgres)
progressRange.addEventListener("click", changeDuration)
volumeIcon.addEventListener("click", mute)
volumeRange.addEventListener("click", showVolume)


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