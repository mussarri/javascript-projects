const nav1 = document.querySelector(".navBar1")
const nav2 = document.querySelector(".navBar2")
const nav3 = document.querySelector(".navBar3")
const nav4 = document.querySelector(".navBar4")
const nav5 = document.querySelector(".navBar5")
const menuBtn = document.querySelector(".container")
const navs = [nav1, nav2, nav3, nav4, nav5]

function slide(direction1, direction2){
    navs.forEach((nav, i) => {
        nav.classList.remove(`slide-${direction1}-${i + 1}`)
        nav.classList.add(`slide-${direction2}-${i + 1}`)
    });
}

menuBtn.addEventListener("click", () => {
    if(!menuBtn.classList.contains("change")){
        console.log(menuBtn);
        menuBtn.classList.add("change");
        slide("out","in")
    }else{
        slide("in","out")
        menuBtn.classList.remove("change")
    }
})
