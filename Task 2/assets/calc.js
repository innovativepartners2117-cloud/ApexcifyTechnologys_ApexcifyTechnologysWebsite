const output = document.getElementById("output");
const history = document.getElementById("history");
let currentInput = "0";
let historyInput = "";

function updateDisplay() {
  output.textContent = currentInput;
  history.textContent = historyInput;
}

function clearAll() {
  currentInput = "0";
  historyInput = "";
  updateDisplay();
}

function deleteLast() {
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = "0";
  }
  updateDisplay();
}

function appendNumber(num) {
  if (currentInput === "0" && num !== ".") {
    currentInput = num;
  } else {
    currentInput += num;
  }
  updateDisplay();
}

function appendOperator(op) {
  historyInput = currentInput + " " + op;
  currentInput = "0";
  updateDisplay();
}

function calculate() {
  try {
    const expression = historyInput + " " + currentInput;
    const result = eval(expression.replace("÷", "/").replace("×", "*"));
    historyInput = "";
    currentInput = result.toString();
    updateDisplay();
  } catch {
    currentInput = "Error";
    updateDisplay();
  }
}

document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.value;
    const action = btn.dataset.action;

    if (btn.classList.contains("number")) {
      appendNumber(value);
    } else if (btn.classList.contains("operator")) {
      appendOperator(value);
    } else if (action === "clear") {
      clearAll();
    } else if (action === "delete") {
      deleteLast();
    } else if (action === "calculate") {
      calculate();
    }
  });
});

// Keyboard support
window.addEventListener("keydown", (e) => {
  if (!isNaN(e.key) || e.key === ".") {
    appendNumber(e.key);
  } else if (["+", "-", "*", "/"].includes(e.key)) {
    appendOperator(e.key);
  } else if (e.key === "Enter") {
    calculate();
  } else if (e.key === "Backspace") {
    deleteLast();
  } else if (e.key === "Delete") {
    clearAll();
  }
});

updateDisplay();
