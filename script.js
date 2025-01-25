const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const startButton = document.getElementById('startButton')

let countdown
let timeLeft = 60

startButton.addEventListener('click', () => {
    resetGame()
    startGame()
})


function startGame() {
    quoteInputElement.disabled = false
    quoteInputElement.focus()
    startButton.disabled = true
    renderNewQuote()
    startCountdown()
}

function resetGame() {
    clearInterval(countdown)
    timeLeft = 60
    timerElement.innerText = timeLeft
    quoteInputElement.value = ''
    quoteInputElement.disabled = true
    quoteDisplayElement.innerHTML = ''
    startButton.disabled = false
}

function startCountdown() {
    countdown = setInterval(() => {
        timeLeft--
        timerElement.innerText = timeLeft

        if (timeLeft <= 5) {
            timerElement.classList.add('warning')
        } else {
            timerElement.classList.remove('warning')
        }

        if(timeLeft <= 0 ) {
            timerElement.classList.remove('warning')
            clearInterval(countdown)
            alert('Time is up! Resetting Game.')
            resetGame()
        }
    }, 1000)
}


quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')


    let correct = true
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if (character == null) {
            characterSpan.classList.remove('incorrect')
            characterSpan.classList.remove('correct')
            correct = false
        }
        else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        } else {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false
        }

    })

    if (correct) renderNewQuote()
})

function getRandomQuote()  {
    return fetch(RANDOM_QUOTE_API_URL)
    .then(Response => Response.json())
    .then(data => data.content)
}

async function renderNewQuote() {
    const quote = await getRandomQuote()
    quoteDisplayElement.innerHTML = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    })
    quoteInputElement.value = null
}