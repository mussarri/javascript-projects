const dragItem = document.querySelectorAll(".drag-item")
const dragItemList = document.querySelectorAll(".drag-item-list")

let currentItem 

dragItem.forEach(item => {
    item.addEventListener("dragstart", (e) => {
        currentItem = e.target
        currentItem.classList.add("current-item")
    })
    
    item.addEventListener("dragend", (e) => {
        e.target.classList.remove("current-item")
        currentItem = null
    })
}) 


dragItemList.forEach(list => {

    const listItemsCount = list.childElementCount
    const listChilds = document.querySelectorAll(".drag-item:not(.current-item)")
    let itemCenter = [] 
    for (let i = 0; i < listItemsCount; i++) {
        let item = list.children[i]
        itemCenter.push((item.getBoundingClientRect().top + item.getBoundingClientRect().bottom) / 2)
    }

    list.addEventListener("dragover", (e) => {
        e.preventDefault()
        let index = itemCenter.findIndex((i) => i > e.clientY)
        list.insertBefore(currentItem, listChilds[index])
    })


    

    list.addEventListener("drop", (e) => {
        e.preventDefault()
        
    })
 
    
})
