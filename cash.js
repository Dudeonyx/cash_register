function checkCashRegister(price, cash, cid) {
  const change = [];
  const changeObject = {};
  // Here is your change, ma'am.
  const currencyValue = {
    'ONE HUNDRED': 100,
    TWENTY: 20,
    TEN: 10,
    FIVE: 5,
    ONE: 1,
    QUARTER: 0.25,
    DIME: 0.1,
    NICKEL: 0.05,
    PENNY: 0.01,
  };
  let totalChange = cash - price;

  const newCid = cid
    .concat()
    .reverse()
    .map((e) => {
      const currency = e[0];
      let availableCurrency = e[1];
      let currencyChange = 0;
      if (totalChange === 0 || currencyValue[currency] >= totalChange || availableCurrency === 0) {
        return e;
      }
      while (
        totalChange !== 0 &&
        (currencyValue[currency] <= totalChange && availableCurrency !== 0)
      ) {
        totalChange -= currencyValue[currency];
        totalChange = Math.round(totalChange * 100) / 100;
        availableCurrency -= currencyValue[currency];
        availableCurrency = Math.round(availableCurrency * 100) / 100;
        currencyChange += currencyValue[currency];
        currencyChange = Math.round(currencyChange * 100) / 100;
      }
      change.push([currency, currencyChange]);
      changeObject[currency] = currencyChange;
      return [currency, availableCurrency];
    });
  if (change.every(e => e[1] === 0) || change[0] === undefined || totalChange > 0) {
    return {
      status: 'INSUFFICIENT_FUNDS',
      change: [],
    };
  } else if (newCid.every(e => e[1] <= 0)) {
    return {
      status: 'CLOSED',
      change: newCid
        .concat()
        .reverse()
        .map(e => [e[0], changeObject[e[0]] || 0]),
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
