
let result = '';
let operation = '';

function addNumber(number) {
    result = number;
    document.getElementById('result').value = result;
}

function clearResult() {
    result = '';
    document.getElementById('result').value = result;
}

function performOperation(op) {
    operation = op;
    result = op;
    document.getElementById('result').value = result;
}

function calculateResult() {
    let finalResult = eval(result);
    document.getElementById('result').value = finalResult;
    result = finalResult;
}

function calculateSquare() {
    let num = parseFloat(result);
    let square = num * num;
    document.getElementById('result').value = square;
    result = square;
}

function calculateSquareRoot() {
    let num = parseFloat(result);
    let squareRoot = Math.sqrt(num);
    document.getElementById('result').value = squareRoot;
    result = squareRoot;
}

// Keyboard Input Handling
document.addEventListener('keydown', function (event) {
    const key = event.key;

    // Numbers
    if (key >= '0' && key <= '9') {
        addNumber(key);
    }
    // Decimal Point
    else if (key === '.') {
        addNumber('.');
    }
    // Operators
    else if (key === '' || key === '-' || key === '*' || key === '/') {
        performOperation(key);
    }
    // Equals
    else if (key === 'Enter') {
        calculateResult();
    }
    // Clear
    else if (key === 'c' || key === 'C') {
        clearResult();
    }
    // Backspace
    else if (key === 'Backspace') {
        result = result.slice(0, -1); // Remove the last character
        document.getElementById('result').value = result;
    }
});