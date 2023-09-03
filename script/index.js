
const keyboard = document.querySelector(".keyboard")
const hintText = document.querySelector(".hint-text b")
const incorrectGuess = document.querySelector(".incorrectGuess b")
const playAgain = document.querySelector(".playagian")
const gameModel = document.querySelector(".game-model")
const hangmanImg = document.querySelector(".hangmanimg")
const listLetter = document.querySelector(".wordlist")

let currentWord , guessCount=0 , maxGuess = 6;
let correctword = [];

console.log(maxGuess,guessCount)

const resetGame = ()=>{
    correctword =[]
    guessCount=0
    incorrectGuess.innerText = `${guessCount}/${maxGuess}`
    keyboard.querySelectorAll("button").forEach(btn=>btn.disabled=false)
    hangmanImg.src = `images/hangman-${guessCount}.svg`
    gameModel.classList.remove("show");
}

const getRandomWord = ()=>{
    const {word,hint}  =wordList[Math.floor(Math.random()*wordList.length)]
    currentWord = word
    console.log(word,hint)
    resetGame()
    hintText.innerHTML = hint;
    listLetter.innerHTML = word.split("").map(()=>`<li class="letter"></li>`).join("")

}

const gameOver =  (isover)=>{
    setTimeout(()=>{
    gameModel.classList.add("show");
    const text = isover?"you found the word: " : "the correct word was: "
    gameModel.querySelector("img").src = isover?`images/victory.gif`:`images/lost.gif`
    gameModel.querySelector("h1").innerText = isover?`Congrats`:`Game Over!`
    gameModel.querySelector("p").innerText = `${text} ${currentWord}`
    },300)
   
}

const  GameInit = (button , clickedLetter)=>{
    let abc = clickedLetter.toLowerCase();
    if(currentWord.includes(abc)){
        [...currentWord].forEach((letter,index)=>{
            if(letter===abc){
              correctword.push(letter)
                console.log(index)
                listLetter.querySelectorAll("li")[index].innerText = letter
            }
        })
    }else{
        guessCount++
        hangmanImg.src = `images/hangman-${guessCount}.svg`
        console.log(abc,"is in not in  currrent word")
    }
     button.disabled = true
    incorrectGuess.innerText = `${guessCount}/${maxGuess}`
    if(guessCount == maxGuess){
        return gameOver(false)
    }
    if(currentWord.length == correctword.length){
        return gameOver(true)
    }
    console.log(maxGuess,guessCount)

}
for (let i = 97; i < 123; i++) {
    const button = document.createElement("button")
    button.innerText = String.fromCharCode(i)
    keyboard.appendChild(button)
    button.addEventListener("click",(e)=>GameInit(e.target,button.innerText))
    

    
}
getRandomWord()
playAgain.addEventListener("click",getRandomWord)