let price = 19.5;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const cashElement = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeSpan = document.getElementById("change-due");

const getChange = (changeDue, cid) => {
  const changeArr = [];
  let totalCashInDrawer = 0;
  let temp = changeDue;
  
  // Calculate total cash in drawer
  for (let i = 0; i < cid.length; i++) {
    totalCashInDrawer += cid[i][1];
  }

  // If change due is more than the total cash in drawer, return insufficient funds
  if (changeDue > totalCashInDrawer) {
    return "Status: INSUFFICIENT_FUNDS";
  }

  // Loop through the coins/bills to calculate the change
  for (let i = cid.length - 1; i >= 0; i--) {
    const coinValue = getCoinValue(cid[i][0]);
    let coinAmount = cid[i][1];
    let coinCount = 0;

    // Check how many coins/bills can be used for change
    while (changeDue >= coinValue && coinAmount > 0) {
      changeDue -= coinValue;
      coinAmount -= coinValue;
      coinCount++;
      changeDue = Math.round(changeDue * 100) / 100; // Round to avoid floating point precision issues
    }

    // If coins/bills were used, push them into the result array
    if (coinCount > 0) {
      changeArr.push([cid[i][0], coinCount * coinValue]);
    }
  }

  // If there is still change due, return insufficient funds
  if (changeDue > 0) {
    return "Status: INSUFFICIENT_FUNDS";
  }

  // If the change is exactly equal to the total cash in the drawer, return the exact change in the required format
  if (changeArr.length === 0) {
    return "Status: CLOSED";
  }

  // Otherwise, return the change as an OPEN status with the denominations
  let changeText = "Status: OPEN";

  // If the changeDue (temp) is equal to the total amount of cash in the register, close the register
  const left = cid.reduce((acc, item) => acc + item[1], 0) - temp;
  if (left === 0) {
    changeText = "Status: CLOSED";
  }
  for (let change of changeArr) {
    changeText += ` ${change[0]}: \$${change[1]}`;
  }

  return changeText;
};

const getCoinValue = (denomination) => {
  const values = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
  };
  return values[denomination];
};

const pay = () => {
  const cashNum = parseFloat(cashElement.value);
  if (isNaN(cashNum)) {
    alert("Enter a number.");
  }
  if (cashNum < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (cashNum === price) {
    changeSpan.innerText = "No change due - customer paid with exact cash"
  } else {
    let changeDue = cashNum - price;
    console.log(changeDue == cid.reduce((acc, item) => item[1] + acc, 0));
    const changeResult = getChange(changeDue, cid);
    changeSpan.innerText = changeResult;
  }
};

purchaseBtn.addEventListener("click", pay);




