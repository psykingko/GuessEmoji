emojiJSON = [
    {description: 'smile',emoji:'😊'},
    {description: 'sad',emoji:'😔'},
    {description: 'laughing',emoji:'😂'},
    {description: 'crying',emoji:'😭'},
    {description: 'skull',emoji:'💀'}
]

let currentEmojiIndex = 0;
let score = 0;
let timeLeft = 0;
let timerInterval;

const guessInput = document.getElementById('guess-input');
const resultEl = document.getElementById('result');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const descriptionEl = document.getElementById('description');

function displayEmoji(){
    
    descriptionEl.textContent = emojiJSON[currentEmojiIndex].emoji;
    resetTimer();
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 15;
    timerEl.textContent = `Time left: ${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time left: ${timeLeft}s`;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            resultEl.textContent = 'Time\'s up!';
            nextEmoji();
        }
    }, 1000);
}

function checkGuess(){
    const guess = guessInput.value.trim().toLowerCase();
    const correctEmoji = emojiJSON[currentEmojiIndex].description.trim().toLowerCase();

    if(guess === correctEmoji){
        resultEl.textContent = 'Correct !';
        score++;
        clearInterval(timerInterval);
    } else{
        resultEl.textContent = 'Wrong !';
    }

    scoreEl.textContent = `Score: ${score}`;
    guessInput.value = '';
    guessInput.focus();
    nextEmoji();
}



function nextEmoji(){
    currentEmojiIndex ++;
    if(currentEmojiIndex === emojiJSON.length){
        // currentEmojiIndex = 0;
    descriptionEl.textContent = '🏆';
    guessInput.style.display = 'none';
    resultEl.textContent = 'Quiz Over';
    scoreEl.style.display = 'none';
    timerEl.style.display = 'none';
    
    } else{
        displayEmoji();
    }
    
}

document.getElementById('guess-input').addEventListener('keydown',(event)=> {
    if(event.key === 'Enter'){
        checkGuess();
    }
});

document.addEventListener('DOMContentLoaded', ()=>{displayEmoji()});

