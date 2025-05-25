function getRandomWord(){

    return words[Math.floor(Math.random() * words.length)].toUpperCase();

}

function findIndices(charToCheck){

    let indices = [];

    for(let i = 0; i < randomWord.length; i++){
        if(randomWord[i] === charToCheck){
            indices.push(i);
        }
    }

    return indices;

}

function endGame(){

    gameOver = true;
    document.body.classList.add("game-over");

    const h1 = document.querySelector("h1");
    h1.textContent = `GAME OVER! The word is ${randomWord}`;
    h1.classList.add("end-game");

}

const words = [
    'elephant',
    'sunshine',
    'rainbow',
    'guitar',
    'pizza',
    'galaxy',
    'chocolate',
    'mountain',
    'mobile',
    'laptop',
    'bank',
    'science',
    'butterfly',
    'adventure'
]

const randomWord = getRandomWord();

const container = document.querySelector(".flex-container");

var totalChances = 6;

let gameOver = false;

for(let i = 0; i < randomWord.length; i++){
    const p = document.createElement("p");
    p.textContent = "-";
    container.appendChild(p);
}

console.log(randomWord);

function handleFunction(key){

    let indices = findIndices(key);

    for(let i = 0; i < indices.length; i++){

        document.querySelectorAll("p")[indices[i]].textContent = key;

    }
}

function checkWordGuesses(){

    let allWordsGuessed = true;

    const p = document.querySelector(".flex-container").children;

    for(let i = 0; i < p.length; i++){
        if(p[i].textContent === "-"){
            allWordsGuessed = false;
            return allWordsGuessed;
        }
    }

    return true;
}

document.addEventListener("keydown", function(event){

    if(gameOver) return;

    let key = event.key.toUpperCase();

    const matchedButton = document.querySelector(`button.${key.toLowerCase()}`);

    if(randomWord.includes(key) && totalChances > 0){

        matchedButton.classList.add("right-border");
        handleFunction(key);

        if(checkWordGuesses()){

            gameOver = true;
            document.body.classList.add("game-over");

            const h1 = document.querySelector("h1");
            h1.textContent = "YOU WON!";
            h1.classList.add("end-game");

        }

    } 
    else{
        
        if(!matchedButton.classList.contains("wrong-border")){

            matchedButton.classList.add("wrong-border");
            totalChances--;

        }

        if(totalChances == 0){
            endGame();
        }else{

            document.querySelector("h1").textContent = "Chances Left " + totalChances;
            document.getElementById("hangmanImage").src = "hangman" + (6 - totalChances) + ".png";

        }
    }
    
});

for(var i = 0; i < document.querySelectorAll("button").length; i++){

    document.querySelectorAll("button")[i].addEventListener("click", function(){

        if(gameOver) return;
        
        key = this.textContent;
        const matchedButton = document.querySelector(`button.${key.toLowerCase()}`);

        if(randomWord.includes(key)){

            this.classList.add("right-border");
            handleFunction(key);

            if(checkWordGuesses()){

                gameOver = true;
                document.body.classList.add("game-over");

                const h1 = document.querySelector("h1");
                h1.textContent = "YOU WON!";
                h1.classList.add("end-game");

            }
        }
        else{
            
            if(!matchedButton.classList.contains("wrong-border")){

                matchedButton.classList.add("wrong-border");
                totalChances--;

            }
            
            if(totalChances == 0){
                endGame();
            }else{
                document.querySelector("h1").textContent = "Chances Left " + totalChances;
                document.getElementById("hangmanImage").src = "hangman" + (6 - totalChances) + ".png";
            }
        }
        
    })
}