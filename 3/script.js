const clearBtn = document.getElementById("clear-btn");
const checkBtn = document.getElementById("check-btn");

const userInput = document.getElementById("user-input");
const resultsDiv = document.getElementById("results-div");

function clearResult() {
  resultsDiv.innerHTML = "";
}

function parse() {
  console.log(userInput.value);
  console.log(validateNumber(userInput.value))
  if (userInput.value === "") {
    alert("Please provide a phone number");
  } else if (validateNumber(userInput.value)) {
    resultsDiv.innerHTML = `Valid US number: ${userInput.value}`;
  } else {
    resultsDiv.innerHTML = `Invalid US number: ${userInput.value}`;
  }
}

function validateNumber(str) {
  const validFormat = new RegExp('^(1\\s?)?(\\([0-9]{3}\\)|[0-9]{3})[\\s\\-]?[0-9]{3}[\\s\\-]?[0-9]{4}$');

  return validFormat.test(str);
}



checkBtn.addEventListener("click", parse);
clearBtn.addEventListener("click", clearResult)