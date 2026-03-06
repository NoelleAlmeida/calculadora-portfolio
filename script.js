const display = document.getElementById("display");
const themeToggle = document.getElementById("themeToggle");

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

function toggleTheme() {
  document.body.classList.toggle("light-theme");

  if (document.body.classList.contains("light-theme")) {
    themeToggle.textContent = "☀️";
    localStorage.setItem("theme", "light");
  } else {
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "dark");
  }
}

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    themeToggle.textContent = "☀️";
  } else {
    themeToggle.textContent = "🌙";
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

loadTheme();
