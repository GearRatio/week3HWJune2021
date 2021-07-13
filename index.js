//Select cards in HTML File to allow selection
const cards = document.querySelectorAll('.memory-card')

//track cards clicked
let firstCardPair = true
let firstCard = null;

// 1. flipCard is invoked
// 2. check length of flippedCards.length, if  flippedCards.length === 0,
// 3. then push 'this' (currentCardElement)
// 4. flipCard is invoked again
// 5 check the length of flippedCards.length, if flippedCard.length === 0, it's not
// 6.else if flippedCard.length === 1, it is! 
// 7. check if 'this' (currentCardElement) has a class of flip
// 7a. if yes, DO NOTHING
// 7b. if no, implement this.classList.toggle('flip') 
// 7b1. push this into flippedCards 

// 'click' to allow card to flip
function flipCard() {
    // if flippedCards.length === 0
    console.log(this)
    if (firstCardPair === true) {
        console.log("im the first card")
            // push "this" into flipCards array
            // flippedCards.push(this);
        this.classList.toggle('flip');
        firstCard = this
        firstCardPair = false;
        // else if flippedCard.length === 1 
    } else if (firstCardPair === false) {
        console.log("im the second card")
            // check if classlist does not contain the class 'flip'
            // if (!this.classList.contains('flip')) {
            // 7b, implement this.classlist.toggle('flip')
        this.classList.toggle('flip')
            // 7b1. push this into flippedCards
            // flippedCards.push(this);
        if (this.children[0].alt === firstCard.children[0].alt) {
            firstCard.removeEventListener('click', flipCard);
            this.removeEventListener('click', flipCard);
            if (checkForWin() == true) openModal();
        } else {
            setTimeout(() => {
                // for (let i = 0; i < flippedCards.length; i++) {
                //     flippedCards[i].classList.toggle('flip');
                // }
                // flippedCards = [];
                this.classList.toggle('flip');
                firstCard.classList.toggle('flip')
            }, 600);

        }
        firstCardPair = true;
        // }
    }
}

function checkForWin() {
    console.log("checking")
    var remainingCards = 16 - document.querySelectorAll('.flip').length;
    if (remainingCards > 0) return false;
    return true;
}

//add event listner to execute card flip when clicked on.
cards.forEach(card => card.addEventListener('click', flipCard));



//opens Modal
function openModal() {
    let modal = document.getElementById("modal");
    // console.log("Kind of working")
    modal.style = "visibility:visible";
}

//function to close modal using the "X" in upper left corner of modal
function closeModal() {
    let modal = document.getElementById("modal");
    // console.log("Kind of working")
    modal.style = "visibility:hidden";
}


//create a function to restart the game and allow the player to continue
function playAgain() {
    let oneMoreRound = document.getElementsByClassName('btn play-again-btn')
        //click button, remove modal and schuffle the cards.
    const flippedCards = document.querySelectorAll(".flip")
    for (let i = 0; i < flippedCards.length; i++) {
        flippedCards[i].addEventListener('click', flipCard);
        flippedCards[i].classList.toggle('flip');
    }
    modal.style = "visibility:hidden";
    schuffleCards();
}

//card deck schuffle
function schuffleCards() {
    cards.forEach(card => {
        let randomSelect = Math.floor(Math.random() * 12)
        card.style.order = randomSelect
    })
}

schuffleCards();