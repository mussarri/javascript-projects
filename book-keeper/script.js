const addBookmark = document.getElementById("open-modal")
const modalContainer = document.querySelector(".modal-container")
const closeModalBtn = document.getElementById("close-modal")
const websiteNameInput = document.getElementById("website-name")
const bookMarkForm = document.getElementById("bookmark-form")
const websietUrl = document.getElementById("website-url")
const itemContainer = document.querySelector(".items-container")
const removeItem = document.getElementById("del-item")

function isUrlValid(userInput) {
    var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if(res == null){
        alert("Please enter valid url")
        return false
    }
    if(!userInput.includes("https://")){
        if(!userInput.includes("www.")){
            userInput = "https://www." + userInput 
        }else userInput = "https://" + userInput
        return userInput
    }
    return userInput
}

function openModal(){
    modalContainer.classList.add("show-modal")
    websiteNameInput.focus()
}

function closeModal(){
    modalContainer.style.animation = "closemodal 1s"
    setTimeout(() => {
        modalContainer.classList.remove("show-modal")
        modalContainer.style.animation = "openmodal 1s"
    }, 900); 
}

function storeBook(e){
    e.preventDefault()
    const nameValue = e.target[0].value 
    let urlValue = e.target[1].value
    urlValue = isUrlValid(urlValue) 
    urlValue && createItem(nameValue, urlValue)
}

function createItem(name, url){
    const item = document.createElement("div")
    item.classList.add("item")
    const itemName = document.createElement("a")
    itemName.setAttribute("class", "item-name")
    itemName.setAttribute("href", url)
    itemName.textContent = name
    const delItem = document.createElement("i")
    delItem.setAttribute("class", "fa-solid fa-times")
    delItem.setAttribute("id", "del-item")
    item.appendChild(itemName)
    item.appendChild(delItem)
    closeModal()
    itemContainer.appendChild(item)
    delItem.onclick = (e) => e.target.parentElement.remove();
}



addBookmark.addEventListener("click", openModal)
closeModalBtn.addEventListener("click", closeModal)
window.addEventListener("click", (e) => (e.target === modalContainer ? closeModal() : false));
bookMarkForm.addEventListener("submit", storeBook)