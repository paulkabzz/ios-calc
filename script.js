const numbers = document.querySelectorAll('.number');
const multiply = document.getElementById('multiply');
const minus = document.getElementById('minus');
const plus = document.getElementById('plus');
const divide = document.getElementById('divide');
const period = document.getElementById('period');
const screen = document.querySelector('.val');
const percentage = document.querySelector('#percentage');
const clear = document.getElementById('clear');
const integer = document.querySelector('#intergers');
const equal = document.getElementById('equals');
const signs = document.querySelectorAll('.operands');
const colors = document.querySelectorAll('.color');
const extras = document.querySelectorAll('.extras');
let pendingValue = '';
let firstValue = '';
let isFirstValue = false;
let secondValue = '';
let isSecondValue = false;
let sign = '';
let resultValue = 0;
let defaultValue = 0;
let main = document.getElementsByTagName('main')[0];
let container = document.querySelector('.container');
screen.textContent = defaultValue;

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', () => {
    let value = numbers[i].textContent;

    if (isFirstValue === false) {
      getFirstValue(value);
    }

    if (isSecondValue === false) {
      getSecondValue(value);
    }
  });
}

const getFirstValue = (value) => {
  screen.textContent = '';
  if (pendingValue !== '') {
    firstValue = calculate(pendingValue, firstValue, sign);
    pendingValue = '';
  }
  firstValue += value;
  screen.textContent = firstValue;
  firstValue = +firstValue;
};

const getSecondValue = (value) => {
  if (firstValue !== '' && sign !== '') {
    if (pendingValue !== '') {
      secondValue = calculate(pendingValue, secondValue, sign);
      pendingValue = '';
    }
    secondValue += value;
    screen.textContent = secondValue;
    secondValue = +secondValue;
  }
};

const getSign = () => {
  for (let i = 0; i < signs.length; i++) {
    signs[i].onclick = () => {
      isFirstValue = true;
      sign = signs[i].textContent;
    };
  }
};

getSign();

const calculate = (operand1, operand2, operator) => {
  switch (operator) {
    case '+':
      return operand1 + operand2;
    case '-':
      return operand1 - operand2;
    case '×':
      return operand1 * operand2;
    case '÷':
      return operand1 / operand2;
    default:
      return 0;
  }
};

equal.onclick = () => {
  if (firstValue !== '' && secondValue !== '' && sign !== '') {
    let result;

    // Perform multiplication and division first
    if (sign === '×' || sign === '÷') {
      result = calculate(firstValue, secondValue, sign);
      if (result !== undefined) {
        firstValue = result;
        secondValue = '';
        sign = '';
        screen.textContent = formatNumber(firstValue);
      }
    }
	

    // Perform addition and subtraction next
    if (sign === '+' || sign === '-') {
      result = calculate(firstValue, secondValue, sign);
      if (result !== undefined) {
        firstValue = result;
        secondValue = '';
        sign = '';
        screen.textContent = formatNumber(firstValue);
      }
    }
  }

  checkResultValue();
};

const checkResultValue = () => {
  resultValue = JSON.stringify(resultValue);

  if (resultValue.length >= 8) {
    resultValue = JSON.parse(resultValue);
    screen.textContent = formatNumber(resultValue);
  }
};

integer.onclick = () => {
  resultValue.textContent = '';
  if (firstValue !== '') {
    resultValue = -firstValue;
    firstValue = resultValue;
  }

  if (firstValue !== '' && secondValue !== '' && sign != '') {
    resultValue = -resultValue;
  }

  screen.textContent = formatNumber(resultValue);
};

percentage.onclick = () => {
  resultValue.textContent = '';
  if (firstValue !== '') {
    resultValue = firstValue / 100;
    firstValue = resultValue;
  }

  if (firstValue !== '' && secondValue !== '' && sign != '') {
    resultValue = resultValue / 100;
  }

  screen.textContent = formatNumber(resultValue);
};

clear.onclick = () => {
  isFirstValue = false;
  firstValue = '';
  isSecondValue = false;
  secondValue = '';
  sign = '';
  secondValue = '';
  screen.textContent = defaultValue;
};

const formatNumber = (number) => {
  if (number.toString().includes('.')) {
    const parts = number.toString().split('.');
    if (parts[0].length >= 7) {
      return `${parseFloat(parts[0]).toExponential()}*10^${parts[0].length - 1}`;
    } else {
      return number;
    }
  } else {
    if (number.toString().length >= 9) {
      return `${parseFloat(number).toExponential()}*10^${number.toString().length - 1}`;
    } else {
      return number;
    }
  }
};
