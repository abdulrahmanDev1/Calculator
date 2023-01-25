class Calculator {
  // constructor for initializing the calculator
  constructor(prevOpText, currOpText) {
    this.prevOpText = prevOpText;
    this.currOpText = currOpText;
    this.clear();
  }

  // method for clearing the calculator
  clear() {
    this.currOperatorText = "";
    this.prevOperatorText = "";
    this.operation = null;
    this.updateDisplay();
  }

  // method for deleting last character
  delete() {
    this.currOperatorText = this.currOperatorText.slice(0, -1);
    this.updateDisplay();
  }

  // method for appending number to current operand
  appendNumber(number) {
    if (this.currOperatorText.toString().length >= 15) {
      alert("You've Reached The Max Characters Size. ");
      return;
    }
    if (number === "." && this.currOperatorText.includes(".")) return;
    this.currOperatorText = this.currOperatorText + number.toString();
    this.updateDisplay();
  }

  // method for choosing an operation
  chooseOperation(operation) {
    if (this.currOperatorText === "") return;
    if (this.prevOperatorText !== "") {
      this.compute();
    }

    this.operation = operation;
    this.prevOperatorText = this.currOperatorText;
    this.currOperatorText = "";
    this.updateDisplay();
  }

  // method for computing the result
  compute() {
    let computation;
    const prev = parseFloat(this.prevOperatorText);
    const curr = parseFloat(this.currOperatorText);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case "+":
        computation = prev + curr;
        break;
      case "−":
        computation = prev - curr;
        break;
      case "×":
        computation = prev * curr;
        break;
      case "÷":
        computation = prev / curr;
        break;
      case "%":
        computation = prev / 100;
        break;
      default:
        return;
    }
    this.currOperatorText = computation;
    this.operation = null;
    this.prevOperatorText = "";
    this.updateDisplay();
  }

  // method for formatting number to display
  getDisplayNumber(number) {
    if (this.operation === null) {
      this.prevOpText.innerText = "";
    }
    const stringNumber = number.toString();
    const intDigits = parseFloat(stringNumber.split(".")[0]);
    const intdicimal = stringNumber.split(".")[1];
    let intdisplay;
    if (isNaN(intDigits)) {
      intdisplay = "";
    } else {
      intdisplay = intDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (intdicimal != null) {
      return `${intdisplay}.${intdicimal}`;
    } else {
      return intdisplay;
    }
  }

  // method for updating the display
  updateDisplay() {
    this.currOpText.innerText = this.getDisplayNumber(this.currOperatorText);
    if (this.operation !== null) {
      this.prevOpText.innerText = `${this.getDisplayNumber(
        this.prevOperatorText
      )} ${this.operation}`;
    } else {
      this.prevOpText.innerText = "";
    }
  }
}

// selecting the number buttons
const numberButton = document.querySelectorAll("[data-number]");

// selecting the operation buttons
const operationButton = document.querySelectorAll("[data-operation]");

// selecting the equals button
const equalsButton = document.querySelector("[data-equal]");

// selecting the delete button
const deleteButton = document.querySelector("[data-delete]");

// selecting the all clear button
const allClearButton = document.querySelector("[data-all-clear]");

// selecting the previous operand element
const prevOpText = document.querySelector("[data-prev-op]");

// selecting the current operand element
const currOpText = document.querySelector("[data-curr-op]");

// creating the calculator object
const calculator = new Calculator(prevOpText, currOpText);

// adding event listeners to the number buttons
numberButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
  });
});

// adding event listeners to the operation buttons
operationButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
  });
});

// adding event listener to the equals button
equalsButton.addEventListener("click", () => {
  calculator.compute();
});

// adding event listener to the all clear button
allClearButton.addEventListener("click", () => {
  calculator.clear();
});

// adding event listener to the delete button
deleteButton.addEventListener("click", () => {
  calculator.delete();
});
