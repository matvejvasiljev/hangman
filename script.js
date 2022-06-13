import { ruswords } from "./words.js"

let singleplayer = document.getElementById("singleplayer")
let multiplayer = document.getElementById("multiplayer")
let settingsButton = document.getElementById("settingsButton")
let usedLetters = document.getElementById("usedLetters")
let resetButton = document.getElementById("resetButton")
let testButton = document.getElementById("testButton")
let wordSubmit = document.getElementById("wordSubmit")
let wordInput = document.getElementById("wordInput")
let modeTitle = document.getElementById("modeTitle")
let newLetter = document.getElementById("newLetter")
let settingsMenu = document.getElementById("modal")
let wordMenu = document.getElementById("wordModal")
let picture = document.getElementById("picture")
let winText = document.getElementById("winText")
let shifr = document.getElementById("shifr")
let title = document.getElementById("title")

let mode = "singleplayer"
let words = ["рассольник", "камыш", "компьютер", "облепиха", "виселица"]
words = ruswords
let secret = words[Math.floor(Math.random() * words.length)]
shifr.innerHTML = "*".repeat(secret.length)
let letters = []
let imgNumber = 0
newLetter.select()

testButton.onclick = function (event) {
    event.preventDefault();

    if (!letters.includes(newLetter.value)) {
        letters.push(newLetter.value)
        usedLetters.innerHTML = "Использованные буквы: " + letters
    }
    if (secret.includes(newLetter.value)) {
        console.log("буква есть");
        let newShifr = ""
        for (let i = 0; i < secret.length; i++) {
            // console.log(secret[i]);
            if (newLetter.value == secret[i]) {
                newShifr = newShifr + newLetter.value
            }
            else {
                newShifr = newShifr + shifr.innerHTML[i]
            }
        }
        shifr.innerHTML = newShifr
        if (newShifr == secret) {
            console.log("Ты выиграл");
            testButton.disabled = true
            winText.innerHTML = "Ты выиграл."
            winText.style.transform = "translate(-50%, -50%) scale(1)"
        }
    }
    else {
        console.log("буквы нет");
        imgNumber += 1
        if (imgNumber == 6) {
            console.log("Ты проиграл");
            testButton.disabled = true
            winText.innerHTML = "Ты проиграл. Слово было " + secret + "."
            winText.style.transform = "translate(-50%, -50%) scale(1)"
        }
        picture.src = "hangman" + imgNumber + ".png"
    }
    newLetter.select()
}
resetButton.onclick = function () {
    winText.style.transform = "translate(-50%, -50%) scale(0)"
    if (mode=="multiplayer") {
        wordMenu.style.transform = "scale(1)"
    }
    else{
        secret = words[Math.floor(Math.random() * words.length)]
        newGame()
    }
}

settingsButton.onclick = function () {
    winText.style.transform = "translate(-50%, -50%) scale(0)"
    settingsMenu.style.transform = "scale(1)"
}

singleplayer.onclick = function () {
    settingsMenu.style.transform = "scale(0)"
    modeTitle.innerHTML = "ㅤ"
    secret = words[Math.floor(Math.random() * words.length)]
    newGame()
    mode = "singleplayer"
    // title.innerHTML = "Виселица"
}

multiplayer.onclick = function () {
    settingsMenu.style.transform = "scale(0)"
    modeTitle.innerHTML = "Мультиплеер"
    newGame()
    wordMenu.style.transform = "scale(1)"
    mode = "multiplayer"
    // title.innerHTML = "Виселица. Мультиплеер"
}

function newGame() {
    console.log("Новая игра");
    // secret = words[Math.floor(Math.random() * words.length)]
    letters = []
    imgNumber = 0
    picture.src = "hangman" + imgNumber + ".png"
    usedLetters.innerHTML = "Использованные буквы: "
    testButton.disabled = false
    shifr.innerHTML = "*".repeat(secret.length)
}

wordSubmit.onclick = function (event) {
    event.preventDefault()
    wordMenu.style.transform = "scale(0)"
    secret = wordInput.value
    newGame()
    wordInput.value = ""
}