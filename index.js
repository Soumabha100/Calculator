const display = document.getElementById("myDisplay");

display.value = "0";

// Global constants required for the Program
const PI = 3.141592653589793;
const E = Math.E;

// Function to Append the display on clicking the buttons
function appendToDisplay(input) {

    if (display.value == "Math Error" || display.value == "ERROR" || display.value == "Infinity") {
        display.value = input;
    }

    else {
        if (display.value == "0") {
            display.value = input;
        }
        else {
            if (display.value.endsWith(PI.toFixed(5))) {
                display.value = display.value.replace(PI.toFixed(5), "π");
            }
            display.value += input;
        }
    }
}

// Function to clear the display
function clearDisplay() {
    display.value = "0";
}

// Function for power operations
function powerRoot() {
    if (display.value === "0") {
        if (display.value && (/\d$/.test(display.value) || display.value.endsWith("π"))) {
            display.value = "^";
        }
    }
    else {
        if (display.value && (/\d$/.test(display.value) || display.value.endsWith("π"))) {
            display.value += "^";
        }
    }
}

// Function for square root operations
function squareRoot() {

    if (display.value === "0") {
        if (display.value === "0" || /[+\-*/^]$/.test(display.value)) {
            display.value = "√";
        }
    }
    else if (display.value.endsWith("√")) {
        display.value = "√";
    }
    else {
        display.value += "*√";
    }
}

// function for PI operations
function pieValue() {

    if (display.value === "0") {
        if (display.value === "0" || /[+\-*/^]$/.test(display.value)) {
            display.value = "π";
        }
        else if (/\d$/.test(display.value)) {
            display.value += "π";
        }
    }
    else if (display.value.endsWith("^") || display.value.endsWith("+") || display.value.endsWith("-") || display.value.endsWith("*") || display.value.endsWith("/") || display.value.endsWith("log") || display.value.endsWith("ln") || display.value.endsWith("√")){
        display.value += "π";
    }
    else {
        display.value += "*π";
    }
}

// function for log operations
function logFunction() {
    if (display.value === "0") {
        if (display.value === "0" || /[+\-*/^]$/.test(display.value)) {
            display.value = "log";
        }
    }
    else if (display.value.endsWith("log")) {
        display.value = "log";
    }
    else {
        display.value += "*log";
    }
}

// function for natural log operations
function naturalLogFunction() {
    if (display.value === "0") {
        if (display.value === "0" || /[+\-*/^]$/.test(display.value)) {
            display.value = "ln";
        }
    }
    else if(display.value.endsWith("ln")) {
        display.value = "ln";
    }
    else {
        display.value += "*ln";
    }
}

// function for exponential operations
function exponentialFunction() {
    if (display.value === "0") {
        if (display.value === "0" || /[+\-*]$/.test(display.value)) {
            display.value = "e^";
        }
    }
    else if (display.value.endsWith("e^")) {
        display.value = "e^";
    }
    else {
        display.value += "*e^";
    }
}

// function to clear the last element of the string
function clearString() {

    let currentValue = display.value;
    let updatedValue = currentValue.slice(0, -1);

    display.value = updatedValue || "0";
}

// function to calculate user's given equation
function Calculate() {
    try {
        // To Check if any number is added after π like (6π)
        if (/π\d/.test(display.value)) {
            display.value = "Math Error";
            return;
        }

        let expression = display.value.replace(/π/g, PI).replace(/e/g, E);

        if (/log(\d+(\.\d+)?|π|Math\.PI)/.test(display.value)) {
            expression = expression.replace(/log(\d+(\.\d+)?|π|Math\.PI)/g, "Math.log10($1)");
        } else if (/log/.test(display.value) && !/log(\d+(\.\d+)?|π|Math\.PI)/.test(display.value)) {
            display.value = "Math Error";
            return;
        }

        if (/ln(\d+(\.\d+)?|π|Math\.PI)/.test(display.value)) {
            expression = expression.replace(/ln(\d+(\.\d+)?|π|Math\.PI)/g, "Math.log($1)");
        } else if (/ln/.test(display.value)) {
            display.value = "Math Error";
            return;
        }

        if (/√\d+/.test(display.value) || /√π/.test(display.value)) {
            expression = expression.replace(/√(\d+(\.\d+)?|Math\.PI)/g, "Math.sqrt($1)");
        } else if (/√/.test(display.value) && !/√\d+/.test(display.value) && !/√π/.test(display.value)) {
            display.value = "Math Error";
            return;
        }

        if (/e\^(\d+(\.\d+)?|π|Math\.PI)/.test(display.value)) {
            expression = expression.replace(/e\^(\d+(\.\d+)?|π|Math\.PI)/g, "Math.exp($1)");
        } else if (/e/.test(display.value) && !/e\^/.test(display.value)) {
            display.value = "Math Error";
            return;
        }


        expression = expression.replace(/(\d|\))\s*π/g, "$1*π");

        expression = expression.replace(/(\d+(\.\d+)?|Math\.PI)\^(\d+(\.\d+)?|Math\.PI)/g, "Math.pow($1, $3)");

        console.log("Evaluating expression:", expression);

        let result = eval(expression);
        result = parseFloat(result.toFixed(10));

        display.value = isNaN(result) ? "Math Error" : result;

    }
    catch (error) {
        display.value = "ERROR";
    }
}