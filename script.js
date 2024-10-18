
function rulesMessage(){
    alert("Zasady gry:\n\nKliknij w dzika, jeżeli licznik zawiera wybraną przez Ciebie liczbę lub jest podzielny przez wybraną przez Ciebie liczbę.\n\nJeżeli klikniesz gdy na ekranie będzie liczba niespełniająca tych warunków - przegrywasz!");
}

//Query elements responsible for changing game delay and the divider
let delay = document.querySelector("#delay");
let digit = document.querySelector("#digit");
let delayValue = document.querySelector("#delayValue");
let digitValue = document.querySelector("#digitValue");

//Set default value to be displayed
delayValue.innerHTML = delay.value;
digitValue.innerHTML = digit.value;

//Changed the displayed value on change of the slider position
delay.oninput = function(){
    delayValue.innerHTML = this.value;
}
//Changed the displayed value on change of the slider position
digit.oninput = function(){
    digitValue.innerHTML = this.value;
} 

//Initialize the number counter with a default value
let numberOutput = document.querySelector("#counter");
let resultOutput = document.querySelector("#result");
let counter = 1;
numberOutput.innerHTML = counter;
let clickedInTime = false;
let pointsCounter = 0;

let reactionTimes = [];
let counterUpdateTime = 0;
let totalTime = 0;

function updateCounter(){
    numberOutput.innerHTML = ++counter;
    counterUpdateTime = Date.now();
    clickedInTime = false;
    setTimeout(function(){
        if (validateInput() && !clickedInTime){
            resultOutput.innerHTML = "Nie odpowiedziałeś na czas!"
            document.querySelector("#dzik").style.visibility = "hidden"
            stopGame();
        }
    }, (parseInt(delay.value) * 1000 - 50));
}

function updatePointsOutputList(){
    let pointsOutputList = document.querySelector("#pointsOutputList");
    let listElement = document.createElement('li');
    let date = new Date;
    let minutes = date.getMinutes();
    if (minutes < 10){
        minutes = '0' + minutes;
    } 
    listElement.textContent = `${date.getHours()}:${minutes}: ${pointsCounter} pkt`;
    pointsOutputList.appendChild(listElement);
}

function buttonClick(){
    let clickTime = Date.now();
    let reactionTime =  clickTime - counterUpdateTime;
    reactionTimes.push(reactionTime);
    updateReactionTime();
    if(validateInput()){
        resultOutput.innerHTML = "Prawidłowa odpowiedź!";
        pointsCounter++;
        clickedInTime = true;
    } else {
        resultOutput.innerHTML = "Błędna odpowiedź!";
        document.querySelector("#dzik").style.visibility = "hidden"
        stopGame();
    }
}

function updateReactionTime(){
    totalTime = 0;
    for (let i = 0; i < reactionTimes.length; i++){
        totalTime += reactionTimes[i];
    }
}

function calculateAverageReactionTime(){
    let averageTime = totalTime / reactionTimes.length;
    averageTime = Math.ceil(averageTime);
    let reactionTimeOutputList = document.querySelector("#reactionTimeOutputList");
    let listElement = document.createElement('li');
    listElement.textContent = `${averageTime} ms`;
    reactionTimeOutputList.appendChild(listElement);
}

let numberInterval;
function startGame(){
    pointsCounter = 0;
    counter = 1;
    numberOutput.innerHTML = counter;
    resultOutput.innerHTML = "&nbsp;";
    clearInterval(numberInterval);
    document.querySelector("#start").style.visibility = "hidden"
    let dzikElements = document.querySelectorAll(".dzik");
    for (i = 0; i < dzikElements.length; i++){
        dzikElements[i].style.visibility = "visible";
    }
    numberInterval = setInterval(updateCounter, (parseInt(delay.value) * 1000));
}

function stopGame(){
    document.querySelector("#start").style.visibility = "visible";
    document.querySelector("#start").innerHTML = "Od nowa?";
    clearInterval(numberInterval);
    updatePointsOutputList();
    calculateAverageReactionTime();
}

function validateInput(){
    if (((counter.toString().indexOf(digit.value) > -1)) || counter % parseInt(digit.value) === 0){
        return true;
    }
}


