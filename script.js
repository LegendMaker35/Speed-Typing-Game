const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');
const startButton = document.getElementById('startButton');
const accuracyBox = document.getElementById('accuracyBox'); // Correct reference

let countdown;
let timeLeft = 60;
let totalCharactersTyped = 0;
let totalMistakes = 0;
let gameRunning = false;

startButton.addEventListener('click', () => {
    if (gameRunning) {
        resetGame();
        startButton.innerText = 'Start';
        gameRunning = false;
    } else {
        resetGame();
        startGame();
        startButton.innerText = 'Reset';
        gameRunning = true;
    }
});

function startGame() {
    quoteInputElement.disabled = false;
    quoteInputElement.focus();
    renderNewQuote();
    startCountdown();
}

function resetGame() {
    clearInterval(countdown);
    timeLeft = 60;
    timerElement.innerText = timeLeft;
    quoteInputElement.value = '';
    quoteInputElement.disabled = true;
    quoteDisplayElement.innerHTML = '';
    startButton.disabled = false;
    totalCharactersTyped = 0;
    totalMistakes = 0;

    // Reset accuracy display
    accuracyBox.innerText = 'Accuracy: N/A';
}

function showAccuracy() {
    const accuracy = ((totalCharactersTyped - totalMistakes) / totalCharactersTyped) * 100 || 0;
    accuracyBox.innerText = `Accuracy: ${accuracy.toFixed(2)}%`;
}

function startCountdown() {
    countdown = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;

        if (timeLeft <= 5) {
            timerElement.classList.add('warning');
        } else {
            timerElement.classList.remove('warning');
        }

        if (timeLeft <= 0) {
            clearInterval(countdown);
            timerElement.classList.remove('warning');
            quoteInputElement.disabled = true;
            showAccuracy(); // Update accuracy when time runs out
            startButton.innerText = 'Start';
            gameRunning = false;
        }
    }, 1000);
}

quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('');

    totalCharactersTyped++;

    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index];
        if (character == null) {
            characterSpan.classList.remove('incorrect');
            characterSpan.classList.remove('correct');
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
        } else {
            characterSpan.classList.remove('correct');
            characterSpan.classList.add('incorrect');
            totalMistakes++;
        }
    });

    if (arrayValue.length === arrayQuote.length) {
        renderNewQuote();
    }
});

async function renderNewQuote() {
    const quote = await getRandomQuote();
    quoteDisplayElement.innerHTML = '';
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        quoteDisplayElement.appendChild(characterSpan);
    });
    quoteInputElement.value = null;
}

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content);
}
