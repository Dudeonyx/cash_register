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
console.time('lib');
const Lib = (() => {
  const users = [];
  function listLibraries() {
    return users.reduce((acc, val) => `${acc}'${val.getUsername()}', `, '').replace(/, $/, '');
  }

  function addToLibraryList(library = this) {
    // if (library.constructor !== Library) throw new Error('Invalid Library');
    const libraryIndex = users.findIndex(entry => entry.getUsername() === library.getUsername());
    // check if another book with the same name is already in the shelf
    if (libraryIndex > -1) {
      return `'${library.getUsername()}' already exists in Users`;
    }
    users.push(library);
    return `'${library.getUsername()}' has been added to Users`;
  }

  function Library(user) {
    const username = titleCase(user);
    const shelf = [];
    function getUsername() {
      return `${username}`;
    }

    function listBooks() {
      return shelf.reduce((acc, val) => `${acc}'${val.getTitle()}', `, '').replace(/, $/, '');
    }

    function displayShelf() {
      return shelf.concat();
    }

    function saveBook(book) {
      // const { shelf } = this;
      const bookIndex = shelf.findIndex(entry => entry.getTitle() === book.getTitle());
      // check if another book with the same name is already in the shelf
      if (bookIndex > -1) {
        return `'${book.getTitle()}' already exists in ${username}'s Library`;
      }
      shelf.push(book);
      return `'${book.getTitle()}' has been added to ${username}'s Library`;
    }

    function deleteBook(book) {
      // const { shelf } = this;
      const bookIndex = shelf
        .findIndex(entry => entry === book || entry.getTitle() === book.getTitle());
      // check if book is in the shelf
      if (bookIndex > -1) {
        shelf.splice(bookIndex, 1);
        return `'${book.getTitle()}' has been deleted from ${username}'s Library`;
      }
      return `'${book.getTitle()}' does not exist in ${username}'s Library`;
    }

    function CreateBook(bookObject) {
      const { title, author, pages } = bookObject;
      let status = titleCase(bookObject.status);
      const owner = username; // to keep username as owner in closure
      const bookIndex = shelf.findIndex(element => element.getTitle() === title);
      // check if another book with the same name is already in the shelf
      if (bookIndex > -1) {
        throw new Error(`'${title}' already exists in ${username}'s Library`);
      }
      function details(detail) {
        const allDetails = {
          Title: title,
          Author: author,
          Pages: pages,
          Status: status,
          Library: owner,
        };
        return (detail
          ?
          { [titleCase(detail)]: allDetails[titleCase(detail)] }
          :
          allDetails);
      }
      const getOwner = () => owner;
      const toggleRead = (newStatus) => {
        const validStatus = !newStatus || titleCase(newStatus);
        if (newStatus || validStatus === 'Read' || validStatus === 'Not Read') {
          status = validStatus;
          return this.status;
        }
        status = (status === 'Read') ? 'Not Read' : 'Read';
        return status;
      };
      const parent = () => this;
      function test3() { return this; }
      function saveThis(library = parent()) { return library.saveBook(this); }
      function deleteThis(library = parent()) { return library.deleteBook(this); }
      const book = {
        getTitle() { return title; },
        details,
        getOwner,
        toggleRead,
        saveThis,
        deleteThis,
        test1() { return this; },
        // test2,
        test3,
        test4: () => this,
      };
      console.log(saveBook(book));
      return Object.freeze(book);
    }

    const userLibrary = {
      getUsername,
      saveBook,
      deleteBook,
      CreateBook,
      listBooks,
      addToLibraryList,
      displayShelf,
    };

    addToLibraryList(userLibrary);

    return Object.freeze(userLibrary);
  }

  Library.listLibraries = listLibraries;

  Library.addToLibraryList = addToLibraryList;


  return {
    Library,
  };
})();

const { Library } = Lib;
const alice = Library('Alice');
const paul = Library('Paul');
const john = Library('John'); // eslint-disable-line no-unused-vars
const wonderwoman = alice.CreateBook({
  title: 'Wonder',
  author: 'Author One',
  pages: 250,
  status: 'Read',
});
wonderwoman.saveThis();

const superman = paul.CreateBook({
  title: 'Super',
  author: 'Author Two',
  pages: 308,
  status: 'Not read',
});
superman.saveThis();
alice.saveBook(superman);
paul.saveBook(wonderwoman);
paul.CreateBook({
  title: 'Arrgh',
  author: 'Author Three',
  pages: 545,
  status: 'not read',
}).saveThis();
alice.saveBook((paul.displayShelf())[2]);
alice.deleteBook(paul.displayShelf()[2]);
console.timeEnd('lib');
(paul.displayShelf())[2].details();

/* function Tempf() { // eslint-disable-line no-unused-vars
  const { details } = paul.CreateBook('Biik', 'Author Four', 545, 'not read');
  const lol = 'lol';
  return {
    details,
    lol,
  };
}

const v = new Tempf(); // eslint-disable-line no-unused-vars
const t = Tempf(); // eslint-disable-line no-unused-vars
*/
