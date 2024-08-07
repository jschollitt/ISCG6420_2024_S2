window.onload = function () {
    // ignore this for now
    consoleRedirect();

    // Add your code below this line

    let element = document.getElementById("sampleSentance");
    element.innerText = "This is a new string.";

    let elements = Array.from(document.getElementsByClassName("sampleData"));

    for (let i = 0; i < elements.length; i++) {
        console.log(elements[i].innerText);
    }

    // Add your code above this line



    
    
    // Add click event listeners to each of the calculator operation buttons,
    // and add a function to the events. 
    document.getElementById("btnAdd").addEventListener("click", add);
    document.getElementById("btnSubtract").addEventListener("click", subtract);
    document.getElementById("btnMultiply").addEventListener("click", multiply);
    document.getElementById("btnDivide").addEventListener("click", divide);

    // Save reference to the calculator input/output fields
    const calcField1 = document.getElementById("calcNum1");
    const calcField2 = document.getElementById("calcNum2");
    const calcResult = document.getElementById("calcResult");

    // Calculator operator functions. Each function will read the values from
    // the user input, convert the values to numbers, apply an operation to
    // the numbers, and store the output value in the result field. 
    function add() {
        calcResult.innerHTML = Number(calcField1.value) + Number(calcField2.value);
        console.log(`${calcField1.value} + ${calcField2.value} = ${calcResult.innerText}`);
    }

    function subtract() {
        calcResult.innerHTML = Number(calcField1.value) - Number(calcField2.value);
        console.log(`${calcField1.value} - ${calcField2.value} = ${calcResult.innerText}`);
    }

    function multiply() {
        calcResult.innerHTML = Number(calcField1.value) * Number(calcField2.value);
        console.log(`${calcField1.value} x ${calcField2.value} = ${calcResult.innerText}`);
    }

    function divide() {
        calcResult.innerHTML = Number(calcField1.value) / Number(calcField2.value);
        console.log(`${calcField1.value} / ${calcField2.value} = ${calcResult.innerText}`);
    }


}

function consoleRedirect() {
    // This code redirects console log information and prints
    // it to a textarea on the web page instead.
    const printField = document.getElementById("printField");
    console.stdlog = console.log.bind(console);
    window.onerror = function(msg, url, line) {
        console.error(`Error line ${line}: ${msg}`);
    }
    function log(content, status) {
        if (Array.isArray(content)) {
            let s = "";
            for (let i = 0; i < content.length; i++) {
                s = s.concat(content[i], ", ");
            }
            content = `array: [ ${s.substring(0, s.length - 2)} ]`;
        }
        let line = document.createElement("div");
        line.classList.add(status !== "error" ? "consoleLog" : "consoleError");
        line.innerText = content;
        printField.appendChild(line);
        printField.scrollTop = printField.scrollHeight;
    }
    console.log = function (content) {
        if (content.length > 17 && (content.substring(0, 13) === "[Five Server]" || content.substring(0, 17) === "Socket is closed.")) {
            console.stdlog(content);
            return;
        }
        log(content, "log");
    }
    console.error = function (content) {
        log(content, "error");
    }
}

