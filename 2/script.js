const submitButton = document.getElementById("convert-btn");
const outputElement = document.getElementById("output");

function numberify(string) {
  return Number(string);
}

function romanNumeral(number) {
  const romanSymbols = [
    { value: 1000, symbol: "M" },
    { value: 900, symbol: "CM" },
    { value: 500, symbol: "D" },
    { value: 400, symbol: "CD" },
    { value: 100, symbol: "C" },
    { value: 90, symbol: "XC" },
    { value: 50, symbol: "L" },
    { value: 40, symbol: "XL" },
    { value: 10, symbol: "X" },
    { value: 9, symbol: "IX" },
    { value: 5, symbol: "V" },
    { value: 4, symbol: "IV" },
    { value: 1, symbol: "I" }
  ];
  
  let result = "";

  for (let i = 0; i < romanSymbols.length; i++) {
    while (number >= romanSymbols[i].value) {
      result += romanSymbols[i].symbol;
      number -= romanSymbols[i].value;
    }
  }

  return result;
}

function process() {
  const textInput = document.querySelector("#number");
  if (textInput.value == "") {
    outputElement.innerHTML = "Please enter a valid number.";
  } else {
    let number = numberify(textInput.value);

    if (number == NaN) {
      outputElement.innerHTML = "Please enter a valid number";
    }

    if (!(number >= 1)) {
      outputElement.innerHTML = "Please enter a number greater than or equal to 1";
    } else if (!(number <= 3999)) {
      outputElement.innerHTML = "Please enter a number less than or equal to 3999";
    } else {
      outputElement.innerHTML = romanNumeral(number);
    }
  }
}

submitButton.addEventListener("click", process);