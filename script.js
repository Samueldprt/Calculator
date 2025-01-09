let display = "";
let numbersString = [];
let numbersInt = [];
let operators = [];
let result = 0;
let ans = 120;

//Function saving all pressed buttons and showing them on screen
function button(x) {
    display = display + x;
    document.getElementById("monitor").innerHTML = display;
}

//Function sorting user input by numbers and operators
function sortInput() {
    let num = "";
    for (let i = 0; i < display.length; i++) {
        const char = display[i];
        if (!isNaN(char)) {
            num = num + char;
        } else {
            if (num !== "") {
                numbersString.push(num);
                num = "";
            }
            operators.push(char);
        }
        numbersInt = numbersString.map(Number);
        calculate();
    }
}

function calculate() {
    if (display[0] == "-") {
        result = numbersInt[0] * -1;
        for (let i = 0; i < operators.length; i++) {
            const operator = operators[i + 1];
            const nextNumber = numbersInt[i + 1];

            switch (operator) {
                case "+":
                    result += nextNumber;

                case "-":
                    result -= nextNumber;

                case "*":
                    result *= nextNumber;
            }
        }

    } else {
        result = numbersInt[0];
        for (let i = 0; i < operators.length; i++) {
            const operator = operators[i];
            const nextNumber = numbersInt[i + 1];


        }

    }

    document.getElementById("monitor").innerHTML = result;
    ans = result;
}

function printt() {
    console.log(numbersString);
    console.log(numbersInt);
    console.log(operators);
}

function ac() {
    display = "";
    operators = [];
    numbersString = [];
    numbersInt = [];
    result = "";
    document.getElementById("monitor").innerHTML = display;
}

