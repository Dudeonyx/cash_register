const titleCase = string => string.toLowerCase().replace(/^.| ./g, u => u.toUpperCase()); // eslint-disable-line no-unused-vars
const myFunctions = (() => { // eslint-disable-line no-unused-vars
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
})();

const Lib = (() => {
  const users = [];
  class Library {
    constructor(username) {
      this.username = titleCase(username);
      this.shelf = [];
      this.addToLibraryList();
    }

    static listLibraries() {
      return users.reduce((acc, val) => acc + val.username, '');
    }

    static addToLibraryList(library) {
      if (library.constructor !== Library) throw new Error('Invalid Library');
      const libraryIndex = users.findIndex(entry => entry.username === library.username);
      // check if another book with the same name is already in the shelf
      if (libraryIndex > -1) {
        return `'${library.username}' already exists in Users`;
      }
      users.push(library);
      return `'${library.username}' has been added to Users`;
    }

    addToLibraryList() {
      const libraryIndex = users.findIndex(entry => entry.username === this.username);
      // check if another book with the same name is already in the shelf
      if (libraryIndex > -1) {
        return `'${this.username}' already exists in Users`;
      }
      users.push(this);
      return `'${this.username}' has been added to Users`;
    }

    saveBook(book) {
      const { shelf } = this;
      const bookIndex = shelf.findIndex(entry => entry.title === book.title);
      // check if another book with the same name is already in the shelf
      if (bookIndex > -1) {
        return `'${book.title}' already exists in ${this.username}'s Library`;
      }
      this.shelf.push(book);
      return `'${book.title}' has been added to ${this.username}'s Library`;
    }


    deleteBook(book) {
      const { shelf } = this;
      const bookIndex = shelf.findIndex(entry => entry === book || entry.title === book.title);
      // check if book is in the shelf
      if (bookIndex > -1) {
        shelf.splice(bookIndex, 1);
        return `'${book.title}' has been deleted from ${this.username}'s Library`;
      }
      return `'${book.title}' does not exist in ${this.username}'s Library`;
    }


    CreateBook(title, author, pages, readStatus) {
      const { username: owner } = this; // to keep username as owner in closure
      const bookIndex = this.shelf.findIndex(element => element.name === title);
      // check if another book with the same name is already in the shelf
      if (bookIndex > -1) {
        throw new Error(`'${title}' already exists in ${this.username}'s Library`);
      }
      /* eslint-disable no-use-before-define */
      const details = detail => (detail
        ?
        `${[titleCase(detail)]}: ${book[detail.toLowerCase()]}`
        :
        `Title: ${book.title},
 Author: ${book.author},
 Pages: ${book.pages},
 ${book.read},
 Library: ${owner}`);
      const getOwner = () => owner;
      const toggleRead = (status) => {
        const validStatus = !status || titleCase(status);
        if (status || validStatus === 'Read' || validStatus === 'Not Read') {
          book.read = validStatus;
          return book.read;
        }
        book.read = (book.read === 'Read') ? 'Not Read' : 'Read';
        return book.read;
      };
      const test2 = () => {};
      const saveThis = (library = this) => library.saveBook(book);
      const trashThis = (library = this) => library.deleteBook(book);
      /* eslint-enable no-use-before-define */
      const book = {
        title,
        pages,
        author,
        read: titleCase(readStatus),
        details,
        getOwner,
        toggleRead,
        test1() {},
        test2,
        saveThis,
        trashThis,
      };
      return Object.freeze(book);
    }
  }

  return Object.freeze({
    Library,
  });
})();


const alice = new Lib.Library('Alice');
const paul = new Lib.Library('Paul');
const john = new Lib.Library('John'); // eslint-disable-line no-unused-vars
const wonderwoman = alice.CreateBook('Wonder', 'Author One', 250, 'Read');
wonderwoman.saveThis();
const superman = paul.CreateBook('Super', 'Author Two', 308, 'Not read');
superman.saveThis();
alice.saveBook(superman);
paul.saveBook(wonderwoman);
paul.CreateBook('Arrgh', 'Author Three', 545, 'not read').saveThis();
alice.saveBook(paul.shelf[2]);
alice.deleteBook(paul.shelf[2]);

const t = (function tempf() { // eslint-disable-line no-unused-vars
  const { details } = paul.CreateBook('Biik', 'Author Four', 545, 'not read');
  return {
    details,
  };
}());
