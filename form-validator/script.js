const form = document.querySelector("form")
const message = document.getElementById("message")
const password1El = document.getElementById("password")
const password2El = document.getElementById("password2")

let isvalid
let passwordMatch


function validateForm(e){
    e.preventDefault()
    isvalid = form.checkValidity()
    if(!isvalid){
        message.textContent = "Please rill out all fields"
        message.style.color = "red"
        return;
    }
    if(password1El.value == password2El.value){
        passwordMatch = true
        password1El.style.borderColor = "green"
        password2El.style.borderColor = "green"
    }else{
        passwordMatch = false
        message.textContent = "Make sure passwords match."
        password1El.style.borderColor = "red"
        password2El.style.borderColor = "red"
        return;
    }
    if(isvalid && passwordMatch){
        message.textContent = "Succesfully register"
        message.style.color = "green"
    }
    storeValue()
}

function storeValue(){
    const user = {
        name: form.name.value,
        email: form.email.value,
        website: form.website.value,
        phone: form.phone.value,
        password: form.password.value
    }
    return user
}

form.addEventListener("submit", validateForm)