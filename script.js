let display = "";
let numbersString = [];
let numbersInt = [];
let operators = [];
let result = 0;
let ansValue = 0;
let bracketSwitch = false;
let active = true;

//Showing pressed buttons on screen & saving them in a variable
function button(x) {
    const allOperators = ["+", "-", "*", "/"];

    if (isNaN(x)) { // Prevents the multiple use of operators next to each other
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

// Erase last char shown on display
function erase() {
    display = display.slice(0, -1)
    document.getElementById("monitor").innerHTML = display;
}

// Shows the last calculation result on display
function ans() {
    display += ansValue;
    document.getElementById('monitor').innerHTML = display;
}

// Sorting user input by numbers and operators
function sortInput() {
    let num = "";
    for (let i = 0; i < display.length; i++) {
        const char = display[i];
        if (!isNaN(char)) {
            num += char;
        } else {
            if (char == ".") {
                num += char;
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
    if (display[0] == "-") {
        numbersInt[0] *= -1; // Directly consider the negative sign
        operators.splice(0, 1);
    }

    // Point calculation first (multiplication/division)
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === "*" || operators[i] === "/") {
            const left = numbersInt[i];
            const right = numbersInt[i + 1];
            let intermediateResult;

            if (operators[i] === "*") {
                intermediateResult = left * right;
            } else {
                if (right === 0) {
                    document.getElementById("monitor").innerHTML = "Div/0 Error";
                    return;
                }
                intermediateResult = left / right;
            }

            // Save the result and adjust arrays
            numbersInt.splice(i, 2, intermediateResult); // Replace left and right number with the result
            operators.splice(i, 1); // Remove the already used operator
            i--;
        }
    }

    // Strichrechnung (Addition/Subtraktion)
    result = numbersInt[0];
    for (let i = 0; i < operators.length; i++) {
        const nextNumber = numbersInt[i + 1];
        if (operators[i] === "+") {
            result += nextNumber;
        } else if (operators[i] === "-") {
            result -= nextNumber;
        }
    }

    if (isNaN(result)) {
        result = 0
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

// Show/Unshow Disclaimer Box
function help() {
    if (active) {
        document.getElementById("help-wrapper").style.display = "block";
        active = false;
    } else {
        document.getElementById("help-wrapper").style.display = "none";
        active = true;
    }
}
