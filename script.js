let display = "";
let numbersString = [];
let numbersInt = [];
let operators = [];

//Function saving all pressed buttons and showing them on screen
function button(x){
    display = display + x;
    document.getElementById("monitor").innerHTML = display;
}

//Function sorting user input by numbers and operators
function sortInput(){
    let num = "";
    for (let i = 0; i < display.length; i++){
        const char = display[i];
        if (!isNaN(char)){
            num = num + char;
        } else {
            if (num !== ""){
            numbersString.push(num);
            num = "";
        }
        operators.push(char);
    }
    numbersInt = numbersString.map(Number);
    calculate();
}}

function calculate(){
    

    document.getElementById("monitor").innerHTML = result
}

function printt(){
    console.log(numbersString);
    console.log(numbersInt);
    console.log(operators);
}

function reset(){
    display = "";
    operators = [];
    numbersString = [];
    numbersInt = [];
    result = "";
    document.getElementById("monitor").innerHTML = display;
}

