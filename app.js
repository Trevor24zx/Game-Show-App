// Get the element with the ID of qwerty an save it to a variable.
const qwerty = document.getElementById("qwerty");

// Get the element with the ID of phrase and save it to a variable.
const phrase = document.getElementById("phrase");
// Create a missed variable, initialized at 0.
let missed = 0;
const tries = document.getElementsByClassName('tries');

// Attach an event listener to the "Start Game" button to hide the start screen overlay.
const startButton = document.querySelector(".btn__reset");
startButton.addEventListener('click', (e) => {
    let overlay = document.getElementById("overlay");
    overlay.style.display = "none";
});

startButton.addEventListener('mouseover', (e) => {
    startButton.style.cursor = 'pointer';
});

// Create a phrases array that contains at least 5 different phrases as strings.
var phrases = [
    "i did this",
    "javascript is so much fun",
    "coding never stops",
    "further your knowledge",
    "this is a phrase"
];

// Create a getRandomPhraseAsArray function.
function getRandomPhraseArray(arr) {
    let randomArr = Math.floor(Math.random()* arr.length);
    let randomPhrase = arr[randomArr];
    return randomPhrase.split('');
};
let randomPhrase = getRandomPhraseArray(phrases);

// Create an addPhraseToDisplay function that loops through an array of characters.
const phraseUl = document.querySelector("#phrase ul");

function addPhraseToDisplay(arr) {
    for(let i = 0; i < arr.length; i++) {
        let li = document.createElement("li");
        if(arr[i] === ' ') {
            li.classList.add('space');
        } else {
            li.classList.add('letter');
        }
        li.textContent = randomPhrase[i];
        phraseUl.appendChild(li);
    }
};

const addPhrase = addPhraseToDisplay(randomPhrase);

// Create a checkletter function
const letter = document.querySelectorAll('.letter');
function checkLetter(button) {
    let correctLetters = null;
    for(let i = 0; i < letter.length; i++){
        if(letter[i].textContent == button.textContent){
            letter[i].classList.add('show');
            correctLetters = true;
        } 
    }
    return correctLetters;
};

// Add an event listener to the keyboard.
qwerty.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON') {
        btn = e.target;
        btn.className = 'chosen';
        btn.disabled = true;
        const letterFound = checkLetter(e.target);
        if(letterFound === null) {
            tries[missed].getElementsByTagName('img')[0].src = 'images/lostHeart.png';
            missed += 1;
        }
    }
    checkWin();
});

const show = document.getElementsByClassName('show');
function checkWin() {
    let title = document.querySelector('.title');
    if(show.length === letter.length){
        overlay.style.display = 'flex';
        title.textContent = "You\'ve Won!!";
        startButton.style.display = 'none';
    } else if(missed === 5) {
        overlay.style.display = 'flex';
        overlay.className = 'lose';
        title.textContent = "You\'ve lost! Refresh the page and try again."
        startButton.style.display = 'none';
    }
};