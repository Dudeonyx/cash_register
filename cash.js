function checkCashRegister(price, cash, cid) {
  const change = [];
  // Here is your change, ma'am.
  const currencyValue = {
    'ONE HUNDRED': 100,
    TWENTY: 20,
    TEN: 10,
    FIVE: 5,
    DOLLAR: 1,
    QUARTER: 0.25,
    DIME: 0.1,
    NICKEL: 0.05,
    PENNY: 0.01,
  };
  let totalChange = cash - price;
  const newCid = cid.reverse().map((e) => {
    const currency = e[0];
    let availableCurrency = e[1];
    let currencyChange = 0;
    if (
      totalChange === 0 ||
      currencyValue[currency] > totalChange ||
      availableCurrency < totalChange
    ) {
      return e;
    }
    while (
      totalChange !== 0 ||
      (currencyValue[currency] < totalChange && availableCurrency > totalChange)
    ) {
      totalChange -= currencyValue[currency];
      availableCurrency -= currencyValue[currency];
      currencyChange += currencyValue[currency];
    }
    change.push([currency, currencyChange]);
    return [currency, availableCurrency];
  });
  if (change.every(e => e[1] === 0)) {
    return {
      status: 'INSUFFICIENT_FUNDS',
      change: [],
    };
  }
  return {
    status: 'OPEN',
    change,
  };
}

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.1],
// ["QUARTER", 4.25],
// ["ONE", 90],
// ["FIVE", 55],
// ["TEN", 20],
// ["TWENTY", 60],
// ["ONE HUNDRED", 100]]
//                  0.5
checkCashRegister(19.5, 20, [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100],
]);
