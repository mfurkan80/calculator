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
    textElement.innerText = currentInput;
}


numberButtons.forEach(button => {
    

    button.addEventListener("click", () => { 
        if (button.innerText === "," && currentInput.includes(",")) {
            return;
        }
        if (button.innerText === operatorButtons && currentInput.includes(operatorButtons)) {
            return;
        }
        currentInput += button.innerText;
        updateDisplay();
        
    }); 

}); 

operatorButtons.forEach(button => {

    button.addEventListener("click", () => {
        if (currentInput === "") return;
        let lastchar = currentInput.slice(-1);
        if(['+', '-', 'x', '÷', '%'].includes(lastchar)) {
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
        let islem = currentInput.replace(/x/g, '*').replace(/÷/g, '/');
        
        currentInput = eval(islem).toString();
        updateDisplay();
        
    } catch (error) {
        currentInput = "Hata";
        updateDisplay();
    }
});