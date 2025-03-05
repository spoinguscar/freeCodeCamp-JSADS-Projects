const submitButton = document.getElementById("check-btn");
const outputElement = document.getElementById("result");

function cleanInput(inputString) {
  return inputString.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}

function process() {
  const textInput = document.querySelector("#text-input");
  if (textInput.value == "") {
    alert("Please input a value");
  } else {
    let palindrome = palindromeCheck(textInput.value);
    let outputString = textInput.value;
    if (palindrome) {
      outputString += " is a palindrome";
    } else {
      outputString += " is not a palindrome"
    }

    outputElement.innerHTML = outputString;
  }
}

function palindromeCheck(inputString) {
  const cleanedString = inputString.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const reversedString = cleanedString.split('').reverse().join('');
  return cleanedString === reversedString;
}

submitButton.addEventListener("click", process);