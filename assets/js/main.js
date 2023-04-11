// References to DOM Elements
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");

const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");
const paper4 = document.querySelector("#p4");
const paper5 = document.querySelector("#p5");

// Event Listener
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

// Business Logic
let currentLocation = 1;
let numOfPapers = 61;
let maxLocation = numOfPapers + 1;

function openBook() {
    book.style.transform = "translateX(50%)";
    prevBtn.style.transform = "translateX(-180px)";
    nextBtn.style.transform = "translateX(180px)";
}

function closeBook(isAtBeginning) {
    if(isAtBeginning) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(100%)";
    }

    prevBtn.style.transform = "translateX(0px)";
    nextBtn.style.transform = "translateX(0px)";
}

function goNextPage() {
    if(currentLocation < maxLocation) {
        if (currentLocation == 1) {
            openBook();
        
        }
        let page = document.querySelector(`#p${currentLocation}`);
        page.classList.add("flipped");
        page.style.zIndex = currentLocation;
        if (currentLocation == maxLocation) {
            closeBook(false);
        }
    }
    currentLocation ++;
}
    
function goPrevPage() {
    if(currentLocation > 1) {
        if (currentLocation == 2) {
            closeBook(true);
        }
        if (currentLocation == maxLocation) {
            openBook();
        }
        let page = document.querySelector(`#p${currentLocation-1}`);
        page.classList.remove("flipped");
        page.style.zIndex = maxLocation-currentLocation+1;
        currentLocation--;
    }
}


function getPages() {
    fetch('http://localhost:3000/pages').then(async function(response){
        let txt = await response.text();
        console.log(txt);
        let number_of_pages = parseInt(txt);
        console.log("pages " + number_of_pages);
        let book = document.getElementById("book");
        for (let page_num = 1; page_num <= number_of_pages; page_num++) {
            console.log(page_num);
            book.innerHTML += `
            <div id="p${page_num}" class="paper">
                <div class="front">
                    <div id="f${page_num}" class="front-content">
                        <img class="cover-image" src="http://localhost:3000/page/${page_num * 2 - 1}" alt="cover-image">
                    </div>
                </div>
                <div class="back">
                    <div id="b${page_num}" class="back-content">
                        <img class="cover-image" src="http://localhost:3000/page/${page_num * 2}" atl="1st-page">
                    </div>
                </div>
            </div>
            `;
        }
    })
}