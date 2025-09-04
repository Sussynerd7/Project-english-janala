 const loadData = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) =>res.json())
    .then(json => displaylessons(json.data))
 }
const displaylessons =(lessons)=> {
//    1. get the container which is empty
const levelContaainer = document.getElementById("level-container");
// get into every lesson
for( let lesson of lessons){

    // create element
    const btnDiv= document.createElement("div")
    btnDiv.innerHTML = '<button class=""><i class="fa-solid fa-book-open">Lesson</i></button>'
        
    
}
}
 loadData()