const RANDOM_QUOTE_API_URL = 'https://zenquotes.io/api/random';
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');
const startButton = document.getElementById('startButton');
const accuracyBox = document.getElementById('accuracyBox'); // Correct reference
const quoteCompletedBox = document.getElementById('quoteCompletedBox');
const scoreBox = document.getElementById('scoreBox');

let countdown;
let timeLeft = 60; // Change back to 60
let totalCharactersTyped = 0;
let totalMistakes = 0;
let correctCharactersTyped = 0;
let quoteCompleted = 0;
let score = 0;
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
    //quoteCompletedBox.innerText = `Quotes Completed: ${quoteCompleted}`;
    score = (accuracy/100) * correctCharactersTyped + (quoteCompleted*1000);
    scoreBox.innerText = `Score: ${score.toFixed(0)}`;
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
            correctCharactersTyped++; //(Not correct placement. Adds 1, then 2, then 3, and so on...)
        } else {
            characterSpan.classList.remove('correct');
            characterSpan.classList.add('incorrect');
            totalMistakes++;
        }
    });

    if (arrayValue.length === arrayQuote.length) {
        renderNewQuote();
        quoteCompleted++;
        quoteCompletedBox.innerText = `Quotes Completed: ${quoteCompleted}`;
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

//backend integration for score submission and display//

const submitScoreBtn = document.getElementById('submitScore');
const playerNameInput = document.getElementById('playerName');
const showScoresBtn = document.getElementById('showScores');
const highScoresDiv = document.getElementById('highScores');

submitScoreBtn.addEventListener('click', async () => {
    const playerName = playerNameInput.value.trim();
    if (!playerName) {
        alert('Please enter your name.');
        return;
        
    } 

    playerNameInput.value = ''; // Clear input after submission

    const scoreData = {
        name: playerName,
        score: Math.round(score), // Ensure score is a number
    };

    try {
        const response = await fetch('/savescore', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(scoreData),
        });
        
        const result = await response.json();
        alert(result.message); // Show success message
playerNameInput.value = ''; // Clear input after submission
    }
    catch (error) {
        console.error('Error submitting score:', error);
            alert('Error submitting score. Please try again.');
        }
    });

    showScoresBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('/api/highscores');
            const scores = await response.json();
            highScoresDiv.innerHTML = '<h2>High Scores</h2>' +
             scores.map((entry, i) => `<p>${i + 1}. ${entry.name}: ${entry.score}</p>`).join('');
        } catch (error) {
            console.error('Error fetching high scores:', error);
            alert('Error fetching high scores. Please try again.');
        }
});

fetch('/auth/user')
  .then(res => {
    if (!res.ok) throw new Error();
    return res.json();
  })
  .then(data => {
    console.log('Signed in as:', data.displayName);
    document.getElementById('playerName').value = data.displayName;
    document.getElementById('playerName').disabled = true;
  })
  .catch(() => {
    console.log('Not signed in. User will input their name manually.');
  });

