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
})({"node_modules/ez-read/ez-read.js":[function(require,module,exports) {
'use strict'

const ezRead = {
  any: function(callback, array) {
    if (typeof callback === 'function' && Array.isArray(array)) {
      return array.some(callback);
    }
    else {
      return `Expected: (function, array)\n Actual: (${typeof callback}, ${typeof array})`;
    }
    
  },

  average: function(arr) {
    const summedArray =  arr.reduce((acc, current) => acc + current, 0);
    const result = summedArray / arr.length;
    return result;
  },

  cond: function(...args) {
    for (let i = 0; i < args.length; i++) {
      if (i % 2 === 0) {
        if (i === args.length - 1 && (typeof args[i] === 'function')) {
          return args[i]();
        } 
        else if (i === args.length - 1) {
          return args[i];
        }
        else if (args[i] && (typeof args[i + 1] === 'function')) {
          return args[i + 1]();
        } 
        else if (args[i]) {
          return args[i + 1];
        } 
      }
    }
  },

  digit: function(char) {
    const digits = [0,1,2,3,4,5,6,7,8,9];
    const isDigit = digits.includes(char);
    return isDigit;
  },

  drop: function(num, item) {
      if (typeof num === 'number' && (typeof item === 'string' || Array.isArray(item))) {
        return item.slice(num)
      }
      else {
          throw new TypeError(`Expected: (number, (string or array))\n Actual: (${typeof num}, ${typeof item})`)
      }
  },

  empty: function(item) {
    const isEmpty = item.length === 0
    if (typeof item === 'string' || Array.isArray(item)) {
      return isEmpty;
    }
    else if (typeof item === 'object') {
      for (prop in item) {
        if (item.hasOwnProperty(prop)) {
          return false;
        }
      }
      return true;
    }
    else {
      throw new TypeError(`Expected a string, array, or object.\n Actual: ${typeof item}`);
    }
  },

  even: function(num) {
    if (typeof num === 'number') {
      return num % 2 === 0;
    }
    else if (Array.isArray(num)) {
      throw new TypeError('Expected: number.\n Actual: array');
    }
    else {
      throw new TypeError(`Expected: number.\n Actual: ${typeof num}`);
    }
  },

  flattenAll: function(...arrays) {
    let levelArray = [];
    for (let i = 0; i < arrays.length; i++) {
        if(!Array.isArray(arrays[i])) {
            levelArray.push(arrays[i]);
            continue;
        }
        let newArray = arrays[i].flat(Infinity);
        levelArray.push(newArray);
    }
    let flatArray = levelArray.flat();
    return flatArray;
  },

  freeze: function(item) {
    if (item === null) {
      throw new TypeError('Expected: object or array.\n Cannot freeze null value');
    }
    else if (typeof item === 'object' || Array.isArray(item)) {
      Object.freeze(item);

      Object.getOwnPropertyNames(item).forEach(prop => {
        if (item.hasOwnProperty(prop)
        && item[prop] !== null
        && (typeof item[prop] === "object" || typeof item[prop] === "function")
        && !Object.isFrozen(item[prop])) {
          Object.freeze(item[prop]);
        }
      });
      
      return item;
    }
    else {
      throw new TypeError(`Can only freeze objects.\n Expected: 'object'\n Actual ${typeof item}`);
    }
  },

  frozen: function(item) {
    if (typeof item === 'object') {
      return Object.isFrozen(item);
    }
    else {
      throw new TypeError(`Expected: object or array\n Actual: ${typeof item}`)
    }
  },

  head: function(item) {
      if ((typeof item === 'string' || Array.isArray(item)) && item !== '' && item !== []) {
        return item[0]
      }
      else if ((typeof item === 'string' || Array.isArray(item)) && (item === '' || item === [])) {
          throw new Error(`Empty input:\nCannot retrieve head of empty string or array`);
      }
      else {
          throw new TypeError(`Expected: string or array\n Actual: ${typeof item}`);
      }
  },

  ifThen: function(cond, callback) {
    if (cond && (typeof callback === 'function')) {
      return callback();
    } else if (cond) {
      return callback;
    } else {
      return null;
    }
  },

  ifThenElse: function(cond, callback, elseCallback) {
    if (cond && (typeof callback === 'function')) {
      return callback();
    } else if (cond) {
      return callback;
    } else if (!cond && (typeof elseCallback === 'function')) {
        return elseCallback();
    } else {
      return elseCallback;
    }
  },

  init: function(item) {
    if ((typeof item === 'string' || Array.isArray(item)) && item !== '' && item !== []) {
      return item.slice(0, item.length - 1);
    }
    else if ((typeof item === 'string' || Array.isArray(item)) && (item === '' || item === [])) {
        throw new Error(`Empty input:\nCannot retrieve init of empty string or array`);
    }
    else {
        throw new TypeError(`Expected: string or array\n Actual: ${typeof item}`);
    }
  },

  input: function(prompt) {
    const userInput = readlineSync.question(prompt);
    return userInput;
  },

  integer: function(item) {
    return Number.isInteger(item);
  },

  is: function(item) {
    return item;
  },

  last: function(item) {
    if ((typeof item === 'string' || Array.isArray(item)) && item !== '' && item !== []) {
      return item[item.length - 1];
    }
    else if ((typeof item === 'string' || Array.isArray(item)) && (item === '' || item === [])) {
        throw new Error(`Empty input:\nCannot retrieve last of empty string or array`);
    }
    else {
        throw new TypeError(`Expected: string or array\n Actual: ${typeof item}`);
    }
    },

  nil: function(item) {
    const isNil = item === null || item === undefined;
    return isNil;
  },

  not: function(bool) {
    if (typeof bool === 'boolean') {
      return !bool;
    }
    else {
      throw new TypeError(`Expected: boolean\n Actual: ${typeof bool}`);
    }
  },

  number: function(item) {
    const isNumber = typeof item === 'number' && !isNaN(item);
    return isNumber;
  },

  odd: function(num) {
    if (typeof num === 'number') {
      return num % 2 !== 0;
    }
    else if (Array.isArray(num)) {
      throw new TypeError('Expected: number.\n Actual: array');
    }
    else {
      throw new TypeError(`Expected: number.\n Actual: ${typeof num}`);
    }
  },

  onlyDigits: function (string) {
    if (typeof string === 'string') {
      let digitsOnly = string.replace(/[^\d]/g, '');
      return digitsOnly;
    }
    else if (Array.isArray(string)) {
      throw new TypeError('Expected: number.\n Actual: array');
    }
    else {
      throw new TypeError(`@onlyDigits\nExpected: string\n Actual: ${typeof string}`);
    }
  },

  onlyLetters: function (string) {
    if (typeof string === 'string') {
      let newString = string.replace(/[^a-zA-z]/g, '');
      return newString;
    }
    else if (Array.isArray(string)) {
      throw new TypeError('Expected: number.\n Actual: array');
    }
    else {
      throw new TypeError(`@onlyLetters\nExpected: string\n Actual: ${typeof string}`);
    }
  },

  print: function(item) {
    console.log(item);
  },
  
  randomInt: function(min, max) {
    if (typeof min === 'number' && typeof max === 'number') {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    else {
      throw new TypeError(`Expected: (number, number)\n Actual: (${typeof min}, ${typeof max})`);
    }
  },

  randomChoice: function(array) {
    if (Array.isArray(array)) {
      let chosenInt = Math.floor(Math.random() * array.length);
      return array[chosenInt];
    }
    else {
      throw new TypeError(`Expected array:\n Actual: ${typeof array}`);
    }
  },

  range: function(firstNumber, secondNumber) {
    if (typeof firstNumber !== 'number' || typeof secondNumber !== 'number') {
      throw new TypeError(`Expected: (number, number)\n Actual: (${typeof firstNumber}, ${typeof secondNumber})`);
    }
 
    if (firstNumber < 0 && secondNumber === undefined) {
      secondNumber = 0;
      return makeArray(firstNumber, secondNumber);
    } 
    
    else if (secondNumber === undefined) {
      secondNumber = firstNumber;
      firstNumber = 0;
      return makeArray(firstNumber, secondNumber);
    } 
    
    else if (firstNumber <= secondNumber) {
      return makeArray(firstNumber, secondNumber);
    } 
    
    else if (firstNumber >= secondNumber) {
      return makeReverseArray(firstNumber, secondNumber);
    }

    return rangeArray;
  },


  reverse: function(item) {
    if (Array.isArray(item)) {
      return item.reverse();
    } 
    else if (typeof item === 'string') {
      let newWord = item.split('').reverse().join('');
      return newWord;
    }
    else {
      throw new TypeError(`Expected: string or array\n Actual: ${typeof item}`);
    }
  },


  seal: function(item) {
    if (item === null) {
      throw new TypeError('Expected: object or array.\n Cannot seal null value');
    }
    else if (typeof item === 'object' || Array.isArray(item)) {
      return Object.seal(item);
    }
    else {
      throw new TypeError(`Can only seal objects.\n Expected: 'object'\n Actual ${typeof item}`);
    }
  },

  shuffle: function(array) {
    if (Array.isArray(array)) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    return array;
    }
    else {
      throw new TypeError(`Expected: array\n Actual: ${typeof array}`);
    }
  },

  splitEvery: function(num, array) {
      if (typeof num === 'number' && Array.isArray(array)) {
        let splitArray = []
        let currentArray = []
        for (let i = 1; i < array.length + 1; i++) {
          currentArray.push(array[i - 1])
          if (i % num === 0) {
              splitArray.push(currentArray)
              currentArray = []
          } 
          else if (i === array.length) {
              splitArray.push(currentArray)
          }
        }
        return splitArray
      }
      else if (Array.isArray(num), Array.isArray(array)){
          return `Expected: (number, array)\n Actual: (array, array)`
      }
      else if (!Array.isArray(num), Array.isArray(array)) {
        return `Expected: (number, array)\n Actual: (${typeof num}, array)`
      }
      else {
        return `Expected: (number, array)\n Actual: (${typeof num}, ${typeof array})`
      }
  },

  sum: function(...numbers) {
    let numbersFlattened = numbers.reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);

    let numbersToBeSummed = numbersFlattened.map((item) => Number(item));

    let sum = numbersToBeSummed.reduce((accumulator, currentValue) => accumulator + currentValue);
    return sum;
  },

  tail: function(item) {
    if ((typeof item === 'string' || Array.isArray(item)) && item !== '' && item !== []) {
      return item.slice(1, item.length);
    }
    else if ((typeof item === 'string' || Array.isArray(item)) && (item === '' || item === [])) {
        throw new Error(`Empty input:\nCannot retrieve init of empty string or array`);
    }
    else {
        throw new TypeError(`Expected: string or array\n Actual: ${typeof item}`);
    }
  },

  take: function(number, item) {
      const result = item.slice(0, number);
      return result;
  },

  unique: function(arr) {
    if (Array.isArray(arr)) {
      let uniques = [];
      for (item of arr) {
        if(uniques.indexOf(item) === -1) {
          uniques.push(item);
        }
      }
      return uniques;
    }
    else {
      throw new TypeError(`Expected: array\n Actual: ${arr}`);
    }
  },
}



// Helper functions

// Range helper -------------------------------------------------------------------------------
function makeArray (firstNumber, secondNumber) {
  let rangeArray = [];
  for (let i = firstNumber; i <= secondNumber; i++) {
      rangeArray.push(i);
  }   
  return rangeArray;
}

function makeReverseArray(firstNumber, secondNumber) {
  let rangeArray = [];
  for (let i = firstNumber; i >= secondNumber; i--) {
      rangeArray.push(i);
  }
  return rangeArray;
}

// ------------------------------------------------------------------------------------------

module.exports = ezRead
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

var _ezRead = require("ez-read");

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
},{"ez-read":"node_modules/ez-read/ez-read.js","./sprites/front-1.png":"sprites/front-1.png","./sprites/front-2.png":"sprites/front-2.png","./sprites/front-3.png":"sprites/front-3.png","./sprites/front-4.png":"sprites/front-4.png","./sprites/front-5.png":"sprites/front-5.png","./sprites/card-back.png":"sprites/card-back.png"}],"flip-card.js":[function(require,module,exports) {
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

var _ezRead = require("ez-read");

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
},{"ez-read":"node_modules/ez-read/ez-read.js","./model":"model.js","./flip-card":"flip-card.js","./check-match":"check-match.js"}],"../../../.npm/_npx/335255/lib/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "43045" + '/');

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
},{}]},{},["../../../.npm/_npx/335255/lib/node_modules/parcel/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/mgame.e31bb0bc.js.map