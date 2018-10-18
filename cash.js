const titleCase = string => string.toLowerCase().replace(/^.| ./g, u => u.toUpperCase()); // eslint-disable-line no-unused-vars
const myFunctions = () => { // eslint-disable-line no-unused-vars
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
        if (
          totalChange === 0 ||
          currencyValue[currency] >= totalChange ||
          availableCurrency === 0
        ) {
          return e;
        }
        while (
          totalChange !== 0 &&
          currencyValue[currency] <= totalChange &&
          availableCurrency !== 0
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

  function rot13(str, shift = 13) {
    // LBH QVQ VG!
    return str
      .toUpperCase()
      .split('')
      .map((e) => {
        if (e.charCodeAt() >= 65 && e.charCodeAt() <= 90) {
          let shiftedCharCode = e.charCodeAt() + parseInt(shift, 10);
          if (shiftedCharCode > 90) {
            shiftedCharCode = ((shiftedCharCode - 65) % 26) + 65;
          } else if (shiftedCharCode < 65) {
            shiftedCharCode = ((shiftedCharCode + 65) % 26) + 65;
          }
          return String.fromCharCode(shiftedCharCode);
        }
        return e;
      })
      .join('');
  } // Change the inputs below to testconsole.log(rot13(\"SERR PBQR PNZC\"));
  function telephoneCheck(str) {
    // Good luck!
    // return str.replace(/(?:^(-\d))?[- ]+/ig, '$1');
    return /(?:^1?\d{10}$)|^(?:1?[(]\d{3}[)]\d{7}$)/.test(str.replace(/(?:^(-\d))?[- ]+/gi, '$1'));
  }

  function convertToRoman(num) {
    if (num > 9999) return 'OOPS! Number greater than 9999\nEnter a number lower than 9999';
    const numArray = num
      .toString()
      .split('')
      .reverse()
      .map(e => parseInt(e, 10));
    const romanize = (digit, I, V, X) => {
      switch (digit) {
        case 1:
        case 2:
        case 3:
          return I.repeat(digit);
        case 4:
          return I + V;
        case 5:
          return V;
        case 6:
        case 7:
        case 8:
          return V + I.repeat(digit - 5);
        case 9:
          return I + X;
        case 10:
          return X;
        default:
          return '';
      }
    };
    return (
      romanize(numArray[3], 'M', 'V', 'X') +
      romanize(numArray[2], 'C', 'D', 'M') +
      romanize(numArray[1], 'X', 'L', 'C') +
      romanize(numArray[0], 'I', 'V', 'X')
    );
  }

  function findLongestWordLength(str) {
    return str
      .replace(/[!,.?/]/, ' ')
      .split(/\s+/)
      .sort((a, b) => (b.length > a.length ? 1 : -1))[0].length;
  }
  return {
    checkCashRegister,
    findLongestWordLength,
    convertToRoman,
    rot13,
    telephoneCheck,
  };
};

class Library {
  constructor(username) {
    this.username = username.replace(/^./, u => u.toUpperCase());
    this.shelf = [];
  }
  save(book) {
    const { shelf } = this;
    const bookIndex = shelf.findIndex(element => element.name === book.name);
    if (bookIndex > -1) {
      return `'${book.name}' already exists in ${this.username}'s Library`;
    }
    this.shelf.push(book);
    return `'${book.name}' has been added to ${this.username}'s Library`;
  }
  delete(book) {
    const { shelf } = this;
    const bookIndex = shelf.findIndex(element => element === book || element.name === book.name);
    if (bookIndex > -1) {
      shelf.splice(bookIndex, 1);
      return `'${book.name}' has been deleted from ${this.username}'s Library`;
    }
    return `'${book.name}' does not exist in ${this.username}'s Library`;
  }

  AddBook(name, author, pages, readStatus) {
    const { username: owner } = this; // to keep username as owner in closure
    const bookIndex = this.shelf.findIndex(element => element.name === name);
    // check if another book with the same name is already in the shelf
    if (bookIndex > -1) {
      throw new Error(`'${name}' already exists in ${this.username}'s Library`);
    }
    const book = {
      name,
      pages,
      author,
      read: titleCase(readStatus),
      // ignore the weird indentation
      details(detail) {
        return detail
          ?
          `${[titleCase(detail)]}: ${this[detail.toLowerCase()]}`
          :
          `Name: ${this.name},
 Author: ${this.author},
 Pages: ${this.pages},
 ${this.read},
 Library: ${owner}`;
      },
      // weird indentation ends, still in book object
      getOwner() {
        return owner;
      },
      toggleRead(status) {
        const validStatus = titleCase(status);
        if (validStatus === 'Read' || validStatus === 'Not Read') {
          this.read = validStatus;
          return this.read;
        }
        this.read = (this.read === 'Read') ? 'Not Read' : 'Read';
        return this.read;
      },
      /*  setOwner(newOwner) {
        owner = newOwner;
        return owner;
      }, // */
    };
    this.shelf.push(book);
    return book;
  }
}

const alice = new Library('Alice');
const paul = new Library('Paul'); // eslint-disable-line no-unused-vars
const wonder = alice.AddBook('Wonder', 'Author1', 250, 'Read'); // eslint-disable-line no-unused-vars
const superman = paul.AddBook('Super', 'Author2', 308, 'Not read'); // eslint-disable-line no-unused-vars
alice.save(superman);
paul.save(wonder);
paul.AddBook('Arrgh', 'Author3', 545, 'not read');
alice.save(paul.shelf[2]);

function Model() {}

// Methods in the instantiated object
Model.prototype = {
  constructor: Model,

  // Note that "delete" is a reserved word, so we need quotes
  delete() {
    return 'delete';
  },

  save() {},
};

// Static methods
Model.all = () => 'all';

Model.find = () => 'find';

Model.create = () => new this();
//   return new Model();

// To be more generic, you can also:
