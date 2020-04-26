// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"ez-read.js":[function(require,module,exports) {
'use strict';

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var ezRead = {
  any: function any(callback, array) {
    if (typeof callback === 'function' && Array.isArray(array)) {
      return array.some(callback);
    } else {
      return "Expected: (function, array)\n Actual: (".concat(_typeof(callback), ", ").concat(_typeof(array), ")");
    }
  },
  average: function average(arr) {
    var summedArray = arr.reduce(function (acc, current) {
      return acc + current;
    }, 0);
    var result = summedArray / arr.length;
    return result;
  },
  cond: function cond() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    for (var i = 0; i < args.length; i++) {
      if (i % 2 === 0) {
        if (i === args.length - 1 && typeof args[i] === 'function') {
          return args[i]();
        } else if (i === args.length - 1) {
          return args[i];
        } else if (args[i] && typeof args[i + 1] === 'function') {
          return args[i + 1]();
        } else if (args[i]) {
          return args[i + 1];
        }
      }
    }
  },
  digit: function digit(char) {
    var digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var isDigit = digits.includes(char);
    return isDigit;
  },
  drop: function drop(num, item) {
    if (typeof num === 'number' && (typeof item === 'string' || Array.isArray(item))) {
      return item.slice(num);
    } else {
      throw new TypeError("Expected: (number, (string or array))\n Actual: (".concat(_typeof(num), ", ").concat(_typeof(item), ")"));
    }
  },
  empty: function empty(item) {
    var isEmpty = item.length === 0;

    if (typeof item === 'string' || Array.isArray(item)) {
      return isEmpty;
    } else if (_typeof(item) === 'object') {
      for (prop in item) {
        if (item.hasOwnProperty(prop)) {
          return false;
        }
      }

      return true;
    } else {
      throw new TypeError("Expected a string, array, or object.\n Actual: ".concat(_typeof(item)));
    }
  },
  even: function even(num) {
    if (typeof num === 'number') {
      return num % 2 === 0;
    } else if (Array.isArray(num)) {
      throw new TypeError('Expected: number.\n Actual: array');
    } else {
      throw new TypeError("Expected: number.\n Actual: ".concat(_typeof(num)));
    }
  },
  flattenAll: function flattenAll() {
    var levelArray = [];

    for (var _len2 = arguments.length, arrays = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      arrays[_key2] = arguments[_key2];
    }

    for (var i = 0; i < arrays.length; i++) {
      if (!Array.isArray(arrays[i])) {
        levelArray.push(arrays[i]);
        continue;
      }

      var newArray = arrays[i].flat(Infinity);
      levelArray.push(newArray);
    }

    var flatArray = levelArray.flat();
    return flatArray;
  },
  freeze: function freeze(item) {
    if (item === null) {
      throw new TypeError('Expected: object or array.\n Cannot freeze null value');
    } else if (_typeof(item) === 'object' || Array.isArray(item)) {
      Object.freeze(item);
      Object.getOwnPropertyNames(item).forEach(function (prop) {
        if (item.hasOwnProperty(prop) && item[prop] !== null && (_typeof(item[prop]) === "object" || typeof item[prop] === "function") && !Object.isFrozen(item[prop])) {
          Object.freeze(item[prop]);
        }
      });
      return item;
    } else {
      throw new TypeError("Can only freeze objects.\n Expected: 'object'\n Actual ".concat(_typeof(item)));
    }
  },
  frozen: function frozen(item) {
    if (_typeof(item) === 'object') {
      return Object.isFrozen(item);
    } else {
      throw new TypeError("Expected: object or array\n Actual: ".concat(_typeof(item)));
    }
  },
  head: function head(item) {
    if ((typeof item === 'string' || Array.isArray(item)) && item !== '' && item !== []) {
      return item[0];
    } else if ((typeof item === 'string' || Array.isArray(item)) && (item === '' || item === [])) {
      throw new Error("Empty input:\nCannot retrieve head of empty string or array");
    } else {
      throw new TypeError("Expected: string or array\n Actual: ".concat(_typeof(item)));
    }
  },
  ifThen: function ifThen(cond, callback) {
    if (cond && typeof callback === 'function') {
      return callback();
    } else if (cond) {
      return callback;
    } else {
      return null;
    }
  },
  ifThenElse: function ifThenElse(cond, callback, elseCallback) {
    if (cond && typeof callback === 'function') {
      return callback();
    } else if (cond) {
      return callback;
    } else if (!cond && typeof elseCallback === 'function') {
      return elseCallback();
    } else {
      return elseCallback;
    }
  },
  init: function init(item) {
    if ((typeof item === 'string' || Array.isArray(item)) && item !== '' && item !== []) {
      return item.slice(0, item.length - 1);
    } else if ((typeof item === 'string' || Array.isArray(item)) && (item === '' || item === [])) {
      throw new Error("Empty input:\nCannot retrieve init of empty string or array");
    } else {
      throw new TypeError("Expected: string or array\n Actual: ".concat(_typeof(item)));
    }
  },
  input: function input(prompt) {
    var userInput = readlineSync.question(prompt);
    return userInput;
  },
  integer: function integer(item) {
    return Number.isInteger(item);
  },
  is: function is(item) {
    return item;
  },
  last: function last(item) {
    if ((typeof item === 'string' || Array.isArray(item)) && item !== '' && item !== []) {
      return item[item.length - 1];
    } else if ((typeof item === 'string' || Array.isArray(item)) && (item === '' || item === [])) {
      throw new Error("Empty input:\nCannot retrieve last of empty string or array");
    } else {
      throw new TypeError("Expected: string or array\n Actual: ".concat(_typeof(item)));
    }
  },
  nil: function nil(item) {
    var isNil = item === null || item === undefined;
    return isNil;
  },
  not: function not(bool) {
    if (typeof bool === 'boolean') {
      return !bool;
    } else {
      throw new TypeError("Expected: boolean\n Actual: ".concat(_typeof(bool)));
    }
  },
  number: function number(item) {
    var isNumber = typeof item === 'number' && !isNaN(item);
    return isNumber;
  },
  odd: function odd(num) {
    if (typeof num === 'number') {
      return num % 2 !== 0;
    } else if (Array.isArray(num)) {
      throw new TypeError('Expected: number.\n Actual: array');
    } else {
      throw new TypeError("Expected: number.\n Actual: ".concat(_typeof(num)));
    }
  },
  onlyDigits: function onlyDigits(string) {
    if (typeof string === 'string') {
      var digitsOnly = string.replace(/[^\d]/g, '');
      return digitsOnly;
    } else if (Array.isArray(string)) {
      throw new TypeError('Expected: number.\n Actual: array');
    } else {
      throw new TypeError("@onlyDigits\nExpected: string\n Actual: ".concat(_typeof(string)));
    }
  },
  onlyLetters: function onlyLetters(string) {
    if (typeof string === 'string') {
      var newString = string.replace(/[^a-zA-z]/g, '');
      return newString;
    } else if (Array.isArray(string)) {
      throw new TypeError('Expected: number.\n Actual: array');
    } else {
      throw new TypeError("@onlyLetters\nExpected: string\n Actual: ".concat(_typeof(string)));
    }
  },
  print: function print(item) {
    console.log(item);
  },
  randomInt: function randomInt(min, max) {
    if (typeof min === 'number' && typeof max === 'number') {
      return Math.floor(Math.random() * (max - min + 1) + min);
    } else {
      throw new TypeError("Expected: (number, number)\n Actual: (".concat(_typeof(min), ", ").concat(_typeof(max), ")"));
    }
  },
  randomChoice: function randomChoice(array) {
    if (Array.isArray(array)) {
      var chosenInt = Math.floor(Math.random() * array.length);
      return array[chosenInt];
    } else {
      throw new TypeError("Expected array:\n Actual: ".concat(_typeof(array)));
    }
  },
  range: function range(firstNumber, secondNumber) {
    if (typeof firstNumber !== 'number' || typeof secondNumber !== 'number') {
      throw new TypeError("Expected: (number, number)\n Actual: (".concat(_typeof(firstNumber), ", ").concat(_typeof(secondNumber), ")"));
    }

    if (firstNumber < 0 && secondNumber === undefined) {
      secondNumber = 0;
      return makeArray(firstNumber, secondNumber);
    } else if (secondNumber === undefined) {
      secondNumber = firstNumber;
      firstNumber = 0;
      return makeArray(firstNumber, secondNumber);
    } else if (firstNumber <= secondNumber) {
      return makeArray(firstNumber, secondNumber);
    } else if (firstNumber >= secondNumber) {
      return makeReverseArray(firstNumber, secondNumber);
    }

    return rangeArray;
  },
  reverse: function reverse(item) {
    if (Array.isArray(item)) {
      return item.reverse();
    } else if (typeof item === 'string') {
      var newWord = item.split('').reverse().join('');
      return newWord;
    } else {
      throw new TypeError("Expected: string or array\n Actual: ".concat(_typeof(item)));
    }
  },
  seal: function seal(item) {
    if (item === null) {
      throw new TypeError('Expected: object or array.\n Cannot seal null value');
    } else if (_typeof(item) === 'object' || Array.isArray(item)) {
      return Object.seal(item);
    } else {
      throw new TypeError("Can only seal objects.\n Expected: 'object'\n Actual ".concat(_typeof(item)));
    }
  },
  shuffle: function shuffle(array) {
    if (Array.isArray(array)) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var _ref = [array[j], array[i]];
        array[i] = _ref[0];
        array[j] = _ref[1];
      }

      return array;
    } else {
      throw new TypeError("Expected: array\n Actual: ".concat(_typeof(array)));
    }
  },
  splitEvery: function splitEvery(num, array) {
    if (typeof num === 'number' && Array.isArray(array)) {
      var splitArray = [];
      var currentArray = [];

      for (var i = 1; i < array.length + 1; i++) {
        currentArray.push(array[i - 1]);

        if (i % num === 0) {
          splitArray.push(currentArray);
          currentArray = [];
        } else if (i === array.length) {
          splitArray.push(currentArray);
        }
      }

      return splitArray;
    } else if (Array.isArray(num), Array.isArray(array)) {
      return "Expected: (number, array)\n Actual: (array, array)";
    } else if (!Array.isArray(num), Array.isArray(array)) {
      return "Expected: (number, array)\n Actual: (".concat(_typeof(num), ", array)");
    } else {
      return "Expected: (number, array)\n Actual: (".concat(_typeof(num), ", ").concat(_typeof(array), ")");
    }
  },
  sum: function sum() {
    for (var _len3 = arguments.length, numbers = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      numbers[_key3] = arguments[_key3];
    }

    var numbersFlattened = numbers.reduce(function (accumulator, currentValue) {
      return accumulator.concat(currentValue);
    }, []);
    var numbersToBeSummed = numbersFlattened.map(function (item) {
      return Number(item);
    });
    var sum = numbersToBeSummed.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;
    });
    return sum;
  },
  tail: function tail(item) {
    if ((typeof item === 'string' || Array.isArray(item)) && item !== '' && item !== []) {
      return item.slice(1, item.length);
    } else if ((typeof item === 'string' || Array.isArray(item)) && (item === '' || item === [])) {
      throw new Error("Empty input:\nCannot retrieve init of empty string or array");
    } else {
      throw new TypeError("Expected: string or array\n Actual: ".concat(_typeof(item)));
    }
  },
  take: function take(number, item) {
    var result = item.slice(0, number);
    return result;
  },
  unique: function unique(arr) {
    if (Array.isArray(arr)) {
      var uniques = [];

      var _iterator = _createForOfIteratorHelper(arr),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          item = _step.value;

          if (uniques.indexOf(item) === -1) {
            uniques.push(item);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return uniques;
    } else {
      throw new TypeError("Expected: array\n Actual: ".concat(arr));
    }
  }
}; // Helper functions
// Range helper -------------------------------------------------------------------------------

function makeArray(firstNumber, secondNumber) {
  var rangeArray = [];

  for (var i = firstNumber; i <= secondNumber; i++) {
    rangeArray.push(i);
  }

  return rangeArray;
}

function makeReverseArray(firstNumber, secondNumber) {
  var rangeArray = [];

  for (var i = firstNumber; i >= secondNumber; i--) {
    rangeArray.push(i);
  }

  return rangeArray;
} // ------------------------------------------------------------------------------------------


module.exports = ezRead;
},{}],"sprites/front-1.png":[function(require,module,exports) {
module.exports = "/front-1.1ec382ce.png";
},{}],"sprites/front-2.png":[function(require,module,exports) {
module.exports = "/front-2.014b3b98.png";
},{}],"sprites/front-3.png":[function(require,module,exports) {
module.exports = "/front-3.fd82b02a.png";
},{}],"sprites/front-4.png":[function(require,module,exports) {
module.exports = "/front-4.4b109f51.png";
},{}],"sprites/front-5.png":[function(require,module,exports) {
module.exports = "/front-5.92f5cdb0.png";
},{}],"sprites/card-back.png":[function(require,module,exports) {
module.exports = "/card-back.d677e786.png";
},{}],"model.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.winMessage = exports.scoreBoard = exports.back = exports.shuffledCardFronts = exports.newGameButton = exports.cardContainer = void 0;

var _ezRead = require("./ez-read");

var front1 = require('./sprites/front-1.png');

var front2 = require('./sprites/front-2.png');

var front3 = require('./sprites/front-3.png');

var front4 = require('./sprites/front-4.png');

var front5 = require('./sprites/front-5.png');

var back = require('./sprites/card-back.png');

exports.back = back;
var cardContainer = document.querySelector('.card-container');
exports.cardContainer = cardContainer;
var newGameButton = document.querySelector('.new-game');
exports.newGameButton = newGameButton;
var scoreBoard = document.querySelector('.score');
exports.scoreBoard = scoreBoard;
var winMessage = document.querySelector('.win-message');
exports.winMessage = winMessage;
var cardFrontArray = (0, _ezRead.seal)([front1, front1, front2, front2, front3, front3, front4, front4, front5, front5]);
var shuffledCardFronts = (0, _ezRead.shuffle)(cardFrontArray);
exports.shuffledCardFronts = shuffledCardFronts;
},{"./ez-read":"ez-read.js","./sprites/front-1.png":"sprites/front-1.png","./sprites/front-2.png":"sprites/front-2.png","./sprites/front-3.png":"sprites/front-3.png","./sprites/front-4.png":"sprites/front-4.png","./sprites/front-5.png":"sprites/front-5.png","./sprites/card-back.png":"sprites/card-back.png"}],"flip-card.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _model = require("./model");

function maybeFlip(cardId, cardNum, source) {
  console.log(1);

  if (source === 'http://localhost:1234/card-back.d677e786.png') {
    flipCard(cardId, cardNum);
    return true;
  }

  return false;
}

function flipCard(cardId, cardNum) {
  document.querySelector("#".concat(cardId)).src = _model.shuffledCardFronts[cardNum];
}

var _default = maybeFlip;
exports.default = _default;
},{"./model":"model.js"}],"check-match.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function maybeCheckMatch(lastTwoSources) {
  if (lastTwoSources.length === 2) {
    return checkForMatch(lastTwoSources);
  } else {
    return null;
  }
}

function checkForMatch(lastTwoSources) {
  var isMatch = lastTwoSources[0] === lastTwoSources[1];
  return isMatch;
}

var _default = maybeCheckMatch;
exports.default = _default;
},{}],"index.js":[function(require,module,exports) {
'use strict';

var _ezRead = require("./ez-read");

var _model = require("./model");

var _flipCard = _interopRequireDefault(require("./flip-card"));

var _checkMatch = _interopRequireDefault(require("./check-match"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_model.cardContainer.addEventListener('click', runGame);

_model.newGameButton.addEventListener('click', resetGame);

var lastTwoSources = [];
var lastTwoIds = [];
var score = 0;

function runGame(event) {
  var cardId = event.target.id;
  var cardNum = Number((0, _ezRead.drop)(5, cardId));
  var source = event.target.src;
  var isFlipped = (0, _flipCard.default)(cardId, cardNum, source);

  if (isFlipped) {
    lastTwoSources.push(event.target.src);
    lastTwoIds.push(cardId);
    var isMatch = (0, _checkMatch.default)(lastTwoSources);
    runMatchLogic(isMatch);

    if (score === 5) {
      _model.winMessage.innerHTML = "You won!";
    }
  }
}

function runMatchLogic(isMatch) {
  if (isMatch === null) {
    return;
  } else if (isMatch === true) {
    score++;
    updateDisplayScore();
    clearTwoArrays();
  } else {
    resetlastTwoCards();
    clearTwoArrays();
  }
}

function updateDisplayScore() {
  _model.scoreBoard.innerHTML = "Score: ".concat(score);
}

function clearTwoArrays() {
  lastTwoSources = [];
  lastTwoIds = [];
}

function resetlastTwoCards() {
  var card1 = document.querySelector("#".concat(lastTwoIds[0]));
  var card2 = document.querySelector("#".concat(lastTwoIds[1]));
  setTimeout(function () {
    card1.src = _model.back;
    card2.src = _model.back;
  }, 500);
}

function resetGame() {
  resetCards();
  score = 0;
  _model.scoreBoard.innerHTML = 'Score: 0';
  _model.winMessage.innerHTML = '';
}

function resetCards() {
  for (var i = 0; i <= 9; i++) {
    var img = document.querySelector("#card-".concat(i));
    img.src = _model.back;
  }
}
},{"./ez-read":"ez-read.js","./model":"model.js","./flip-card":"flip-card.js","./check-match":"check-match.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "35439" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/mgame.e31bb0bc.js.map