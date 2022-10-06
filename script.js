const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number){
      if(awaitingNextValue){
            calculatorDisplay.textContent = number;
            awaitingNextValue = false;
      }else{
            const displayValue = calculatorDisplay.textContent;
            calculatorDisplay.textContent = displayValue === '0' ? number : 
            displayValue + number;
      }     
}

function addDecimal(){
      // If operator pressed, dont add decimal
      if(awaitingNextValue) return;
   if(!calculatorDisplay.textContent.includes('.')){
      calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
   }
}

// Calculator first, second value depending on operator 
const calculate = {
   '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

   '*': (firstNumber, secondNumber) => firstNumber * secondNumber,

   '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

   '+': (firstNumber, secondNumber) => firstNumber + secondNumber,

   '=': (firstNumber, secondNumber) => secondNumber,
};

function useOperator(operator){
  const currentValue = Number(calculatorDisplay.textContent);
  // Prevent mutiple operators
  if(operatorValue && awaitingNextValue){
      operatorValue = operator;
      return;
  }
  // Assign first value 
  if(!firstValue){
      firstValue = currentValue;
  } else{
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  //   Store operator
  awaitingNextValue = true;
  operatorValue = operator;
}

// Event Listeners 
inputBtns.forEach((inputBtn) => {
  if(inputBtn.classList.length === 0){
      inputBtn.addEventListener('click',() => sendNumberValue(inputBtn.value))
  }else if(inputBtn.classList.contains('operator')){
      inputBtn.addEventListener('click',() => useOperator(inputBtn.value))
  }else if(inputBtn.classList.contains('decimal')){
      inputBtn.addEventListener('click',() => addDecimal());
  }
});

// Reset all value
function resetAll(){
      firstValue = 0;
      operatorValue = '';
      awaitingNextValue = false;   
      calculatorDisplay.textContent = '0';
}
// Event listener 
clearBtn.addEventListener('click', resetAll);