const themeSwitch = document.getElementById('theme-switch');
const body = document.body;
const textElement = document.querySelector('.display .front');
const numberButtons = document.querySelectorAll('.btn.number');
const clearButton = document.querySelector('.btn.clear');
const deleteButton = document.querySelector('.btn.delete');
const operatorButtons = document.querySelectorAll('.btn.operator');
const equalButton = document.querySelector('.btn.equal');
let currentInput = '';
let previousInput = '';
let operation = undefined;

const updateDisplay = () => {
    if (currentInput === "") {
        textElement.innerText = "0";
    } else {
        textElement.innerText = currentInput;
    }
}


numberButtons.forEach(button => {
    button.addEventListener("click", () => {

        if (button.innerText === ",") {
            let sayilar = currentInput.split(/[+\-x÷%]/);
            let sonSayi = sayilar[sayilar.length - 1];

            if (sonSayi.includes(",")) return;
        }


        if (currentInput === "" && button.innerText === ",") {
            currentInput = "0,";
            updateDisplay();
            return;
        }

        if (currentInput === "0" && button.innerText !== ",") {
            currentInput = button.innerText;
        } else {
            currentInput += button.innerText;
        }

        updateDisplay();
    });
});

operatorButtons.forEach(button => {

    button.addEventListener("click", () => {
        if (currentInput === "") return;
        let lastchar = currentInput.slice(-1);
        if (['+', '-', 'x', '÷', '%'].includes(lastchar)) {
            currentInput = currentInput.slice(0, -1) + button.innerText;
            updateDisplay();
            return;
        }
        currentInput += button.innerText;
        updateDisplay();
    });



});

clearButton.addEventListener("click", () => {
    currentInput = "";
    updateDisplay();
});


deleteButton.addEventListener("click", () => {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
});



themeSwitch.addEventListener("change", () => {
    body.classList.toggle("dark-mode");
});

equalButton.addEventListener("click", () => {
    try {
        let islem = currentInput
            .replace(/x/g, '*')
            .replace(/÷/g, '/')
            .replace(/,/g, '.');

        let sonuc = eval(islem).toString().replace(/\./g, ',');

        currentInput = sonuc;
        updateDisplay();

    } catch (error) {
        currentInput = "Hata";
        updateDisplay();
    }
});