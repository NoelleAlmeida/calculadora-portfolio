const display = document.getElementById("display");

function appendValue(value) {
  if (display.value === "Erro") {
    display.value = "";
  }

  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    if (display.value.trim() === "") {
      return;
    }

    display.value = eval(display.value);
  } catch {
    display.value = "Erro";
  }
}

document.addEventListener("keydown", function (event) {
  const key = event.key;

  const allowedKeys = "0123456789+-*/.";

  if (allowedKeys.includes(key)) {
    appendValue(key);
  } else if (key === "Enter") {
    event.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
    clearDisplay();
  }
});
