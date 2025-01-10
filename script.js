let display = "";
let numbersString = [];
let numbersInt = [];
let operators = [];
let result = 0;
let ansValue = 0;
let bracketSwitch = false;

//Function saving all pressed buttons and showing them on screen
function button(x) {
    const allOperators = ["+", "-", "*", "/"];

    if (isNaN(x)) {
        if (allOperators.includes(display.charAt(display.length - 1))) {
            display = display.slice(0, -1) + x;
        } else {
            display += x;
        }
    } else {
        display += x;
    }
    document.getElementById("monitor").innerHTML = display;
}

function erase() {
    display = display.slice(0, -1)
    document.getElementById("monitor").innerHTML = display;
}

function ans() {
    display += ansValue;
    document.getElementById('monitor').innerHTML = display;
}

function brackets() {
    let bracket;
    if (!bracketSwitch) {
        bracket = "("
    } else {
        bracket = ")"
    };
    bracketSwitch = !bracketSwitch;
    display += bracket;
    document.getElementById('monitor').innerHTML = display;
}


//Function sorting user input by numbers and operators
function sortInput() {
    let num = "";
    for (let i = 0; i < display.length; i++) {
        const char = display[i];
        if (!isNaN(char)) {
            num = num + char;
        } else {
            if (char == ".") {
                num = num + char;
            } else {
                if (num !== "") {
                    numbersString.push(num);
                    num = "";
                }
                operators.push(char);
            }
        }
    }
    if (num !== "") {
        numbersString.push(num);
    }
    numbersInt = numbersString.map(Number);
    calculate();
}

function calculate() {
    if (display[0] == "-") { //calculate beginning with a negative number
        result = numbersInt[0] * -1;
        for (let i = 0; i < operators.length; i++) {
            const operator = operators[i + 1];
            const nextNumber = numbersInt[i + 1];

            switch (operator) {
                case "+":
                    result += nextNumber;
                    break;
                case "-":
                    result -= nextNumber;
                    break;
                case "*":
                    result *= nextNumber;
                    break;
                case "/":
                    if (nextNumber === 0) {
                        document.getElementById("monitor").innerHTML = "Div/0 Fehler";
                        return;
                    }
                    result /= nextNumber;
                    break;
            }
        }

    } else { //calculate beginning with a positiv number   
        result = numbersInt[0];
        for (let i = 0; i < operators.length; i++) {
            const operator = operators[i];
            const nextNumber = numbersInt[i + 1];

            switch (operator) {
                case "+":
                    result += nextNumber;
                    break;

                case "-":
                    result -= nextNumber;
                    break;

                case "*":
                    result *= nextNumber;
                    break;

                case "/":
                    if (nextNumber === 0) {
                        document.getElementById("monitor").innerHTML = "Div/0 Fehler";
                        return;
                    }
                    result /= nextNumber;
                    break;
            }

        }
    }

    if (isNaN(result)) {
        result = "0"
        document.getElementById("monitor").innerHTML = "Syntax Error";
        display = ""
        operators = []; //reset values for new calculation
        numbersString = []; //
        numbersInt = []; //

    } else {
        document.getElementById("monitor").innerHTML = result;
        display = result.toString();
        ansValue = result;
        operators = []; //reset values for new calculation
        numbersString = []; //
        numbersInt = []; //
    }
}

function debug() {
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
    bracketSwitch = false;
}

