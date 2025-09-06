const spinnerManager = (status) =>{
if(status==true){
    document.getElementById("spinner").classList.remove("hidden")
    document.getElementById("word-container").classList.add("hidden")
}else{
    document.getElementById("word-container").classList.remove("hidden")
    document.getElementById("spinner").classList.add("hidden")
};
};
const loadData = () => {
    
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then(json => displaylessons(json.data))
};
const removeactive = () => {
    const remove = document.querySelectorAll(".lesson-btn");
    remove.forEach((btn) => btn.classList.remove("activebtn"));
}

const loadlevelword = (id) => {
spinnerManager(true)
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeactive()
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            clickBtn.classList.add("activebtn")
            displayLevelWord(data.data)
        })

};
const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container")
    wordContainer.innerHTML = "";
    if (words.length == 0) {
        wordContainer.innerHTML = `<div class="text-center items-center col-span-full">
    <img class="mx-auto" src="assets/alert-error.png" alt="">
 nothing is here  <br>
    এক্তি লেসসন সিলেক্ট করুন

</div> `
    }
    words.forEach(word => {

        const card = document.createElement("div");
        card.innerHTML = `
        <p> <div class="bg-white rounded-xl shadow-sm text-center py-8 px-5 space-y-4">
        <h2>${word.word}</h2>
        <p>Meaning /Pronounciation</p>
        <div class="bangtext">
            ${word.meaning}/ ${word.pronunciation}
        </div>
        <div class="flex justify-between items-center ">
            <button onclick="loadworddetail(${word.id})" class="btn btn-default"><i class="fa-solid fa-circle-info"></i></button> <button class="btn btn-default"><i class="fa-solid fa-volume-high"></i></button>
        </div>
    </div>`;
        wordContainer.append(card)
      
    });
      spinnerManager(false)
};

const loadworddetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`

    const res = await fetch(url);
    const details = await res.json();
    displayworddetails(details.data)
};
const displayworddetails = (word) => {
    const detailsBox = document.getElementById("details-container");

    document.getElementById("word_modal").showModal();
    detailsBox.innerHTML =
        ` <div>
                    <h2>${word.word}}( <i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
                </div>
                <div>
                    <h2>Meaning</h2>
                    <p>${word.meaning}</p>
                </div>
                <div>
                    <h2>example</h2>
                    <p>${word.sentence}</p>
                </div>
                <div>
                    <h2>synonym</h2>
                    <p>${word.synonyms}</p>
                </div>`;
}
const displaylessons = (lessons) => {

    //    1. get the container which is empty
    const levelContainer = document.getElementById("level-container");
    // get into every lesson
    for (let lesson of lessons) {
        console.log(lesson)
        // create element
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML = `<button onclick="loadlevelword(${lesson.level_no})" id="lesson-btn-${lesson.level_no}" class="lesson-btn btn btn-outline btn-primary"><i class="fa-solid   fa-book-open"></i>Lesson -${lesson.level_no} </button>`

        levelContainer.append(btnDiv);
    }
}
loadData()

