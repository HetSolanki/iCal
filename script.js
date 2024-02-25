const screen = document.querySelector('.main');
const btn = document.querySelectorAll('BUTTON');    
const screen2 = document.querySelector('.mini');
let buffer = "0";
let runningTotal = 0;
let previousOperator = null;
let miniBuffer = "";
let flag = 0, isEqual = 0, temp = 0;

for (let i = 0; i < btn.length; i++) {
    const element = btn[i];

    element.addEventListener('click', () => {
        if (isNaN(Number(element.value))) {
            handleSymbol(element.value);
        } else {
            handleNumber(element.innerText);
        }

        rerender();
    })
    
}


function handleSymbol(value) {
    switch (value) {
        case 'C':
            buffer = "0";
            miniBuffer = '0';
            runningTotal = 0;
            reMini();

            previousOperator = '';
            runningTotal = 0;
            break;
        case 'back':
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '=':
            let intBuffer = Number(buffer);
            miniBuffer = buffer + "=";
            isEqual = 1;
            reMini();
            flushOperation(intBuffer);
            buffer = "" + runningTotal;
            runningTotal = 0;
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            handleMath(value);
            break;
    }
}

function handleMath(value) {
    let intBuffer = Number(buffer);
    if (runningTotal === 0) {
        temp = intBuffer;
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    miniBuffer = runningTotal + "" + value;
    reMini();
    previousOperator = value;

    flag = 1;

    // buffer = "0";
}

function flushOperation(intBuffer) {
    temp = intBuffer;
    if (previousOperator === "+") {
        runningTotal += intBuffer;
    } else if (previousOperator === "-") {
        runningTotal -= intBuffer;
    } else if (previousOperator === "*") {
        runningTotal *= intBuffer;
    } else if (previousOperator === "/") {
        runningTotal /= intBuffer;
    }
}
function handleNumber(value) {
    if (buffer === "0" || flag == 1) {
        buffer = value;
        flag = 0;
    } else {
        buffer += value;
    }

    // if (previousOperator != '') {
    //     miniBuffer = runningTotal + "" + previousOperator;
    //     reMini();
    // }
}

function rerender() {
    screen.innerText = buffer;
}   

function reMini() {
    if (isEqual && runningTotal !== 0) {
        screen2.innerText += miniBuffer;
        isEqual = 0;    
    } else {
        screen2.innerText = miniBuffer;
    }
}