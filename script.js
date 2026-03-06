const display = document.getElementById("display");
const themeToggle = document.getElementById("themeToggle");
const scientificButtons = document.getElementById("scientificButtons");
const scientificToggle = document.getElementById("scientificToggle");

function appendValue(value) {
  if (!display) return;

  if (display.value === "Erro") {
    display.value = "";
  }

  display.value += value;
}

function appendFunction(value) {
  appendValue(value);
}

function clearDisplay() {
  if (!display) return;
  display.value = "";
}

function deleteLast() {
  if (!display) return;
  display.value = display.value.slice(0, -1);
}

function applyPercent() {
  if (!display) return;
  if (display.value === "" || display.value === "Erro") return;

  display.value += "%";
}

function sinDeg(value) {
  return Math.sin((value * Math.PI) / 180);
}

function cosDeg(value) {
  return Math.cos((value * Math.PI) / 180);
}

function tanDeg(value) {
  return Math.tan((value * Math.PI) / 180);
}

function replacePercent(expression) {
  let updatedExpression = expression;
  const percentPattern = /(\d+(\.\d+)?|\([^()]*\))%/;

  while (percentPattern.test(updatedExpression)) {
    updatedExpression = updatedExpression.replace(
      /(\d+(\.\d+)?|\([^()]*\))%/g,
      "($1/100)",
    );
  }

  return updatedExpression;
}

function formatExpression(expression) {
  let formattedExpression = expression
    .replace(/π/g, "Math.PI")
    .replace(/sqrt\(/g, "Math.sqrt(")
    .replace(/log\(/g, "Math.log10(")
    .replace(/ln\(/g, "Math.log(")
    .replace(/abs\(/g, "Math.abs(")
    .replace(/sin\(/g, "sinDeg(")
    .replace(/cos\(/g, "cosDeg(")
    .replace(/tan\(/g, "tanDeg(")
    .replace(/\^/g, "**");

  formattedExpression = replacePercent(formattedExpression);

  return formattedExpression;
}

function calculate() {
  if (!display) return;

  try {
    if (display.value.trim() === "") {
      return;
    }

    const expression = formatExpression(display.value);
    const result = eval(expression);

    if (!Number.isFinite(result) || Number.isNaN(result)) {
      display.value = "Erro";
      return;
    }

    display.value = result;
  } catch {
    display.value = "Erro";
  }
}

function toggleTheme() {
  document.body.classList.toggle("light-theme");

  if (!themeToggle) return;

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

  if (!themeToggle) return;

  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    themeToggle.textContent = "☀️";
  } else {
    themeToggle.textContent = "🌙";
  }
}

function toggleScientificMode() {
  if (!scientificButtons || !scientificToggle) return;

  scientificButtons.classList.toggle("hidden");

  const isVisible = !scientificButtons.classList.contains("hidden");

  if (isVisible) {
    scientificToggle.textContent = "123";
    scientificToggle.title = "Voltar ao modo normal";
    localStorage.setItem("scientificMode", "on");
  } else {
    scientificToggle.textContent = "ƒx";
    scientificToggle.title = "Abrir modo científico";
    localStorage.setItem("scientificMode", "off");
  }
}

function loadScientificMode() {
  if (!scientificButtons || !scientificToggle) return;

  const savedMode = localStorage.getItem("scientificMode");

  if (savedMode === "on") {
    scientificButtons.classList.remove("hidden");
    scientificToggle.textContent = "123";
    scientificToggle.title = "Voltar ao modo normal";
  } else {
    scientificButtons.classList.add("hidden");
    scientificToggle.textContent = "ƒx";
    scientificToggle.title = "Abrir modo científico";
  }
}

document.addEventListener("keydown", function (event) {
  if (!display) return;

  const key = event.key;
  const allowedKeys = "0123456789+-*/.()^%";

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
loadScientificMode();
