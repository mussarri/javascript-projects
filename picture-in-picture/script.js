const video = document.getElementById("video")
const button = document.querySelector("button")

async function selectMediaStream(){

    const mediaOption = {
        video : true,
        audio : false
    }

    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia(mediaOption);
        video.srcObject = mediaStream;
        video.onloadedmetadata = () => {
            video.play()
        }
    } catch (error) {
        console.log("error", error)
    }
}

button.addEventListener("click", async () => {
    button.disabled = true
    await video.requestPictureInPicture()
    button.disabled = false
})


selectMediaStream()