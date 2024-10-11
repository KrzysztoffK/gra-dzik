
function rulesMessage(){
    alert("Zasady gry:\n\nKliknij w dzika, jeżeli liczba zawiera 7 lub jest podzielna przez 7.\n\nJeżeli klikniesz gdy na ekranie będzie liczba niezawierająca 7 i niepodzielna przez 7 - przegrywasz!");
}

let gameModes = {
    "easy": 6000,
    "mid": 3000,
    "hard": 1000
}

function setDifficulty(difficultyLevel){
    window.gameDifficulty = gameModes[difficultyLevel];
    document.querySelector("#start").style.visibility = "visible";
}

function startGame(){
    //console.log(window.gameDifficulty);
    document.querySelector("#message").innerHTML = "Przygotuj się!";
    setTimeout(text(),3000);
}

function text(){
    document.querySelector("#message").innerHTML = "Graj!";
}