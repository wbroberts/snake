/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/localforage/dist/localforage.js":
/*!******************************************************!*\
  !*** ./node_modules/localforage/dist/localforage.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var require;var require;/*!
    localForage -- Offline Storage, Improved
    Version 1.7.3
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/
(function(f){if(true){module.exports=f()}else { var g; }})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw (f.code="MODULE_NOT_FOUND", f)}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
'use strict';
var Mutation = global.MutationObserver || global.WebKitMutationObserver;

var scheduleDrain;

{
  if (Mutation) {
    var called = 0;
    var observer = new Mutation(nextTick);
    var element = global.document.createTextNode('');
    observer.observe(element, {
      characterData: true
    });
    scheduleDrain = function () {
      element.data = (called = ++called % 2);
    };
  } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
    var channel = new global.MessageChannel();
    channel.port1.onmessage = nextTick;
    scheduleDrain = function () {
      channel.port2.postMessage(0);
    };
  } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
    scheduleDrain = function () {

      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
      var scriptEl = global.document.createElement('script');
      scriptEl.onreadystatechange = function () {
        nextTick();

        scriptEl.onreadystatechange = null;
        scriptEl.parentNode.removeChild(scriptEl);
        scriptEl = null;
      };
      global.document.documentElement.appendChild(scriptEl);
    };
  } else {
    scheduleDrain = function () {
      setTimeout(nextTick, 0);
    };
  }
}

var draining;
var queue = [];
//named nextTick for less confusing stack traces
function nextTick() {
  draining = true;
  var i, oldQueue;
  var len = queue.length;
  while (len) {
    oldQueue = queue;
    queue = [];
    i = -1;
    while (++i < len) {
      oldQueue[i]();
    }
    len = queue.length;
  }
  draining = false;
}

module.exports = immediate;
function immediate(task) {
  if (queue.push(task) === 1 && !draining) {
    scheduleDrain();
  }
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(_dereq_,module,exports){
'use strict';
var immediate = _dereq_(1);

/* istanbul ignore next */
function INTERNAL() {}

var handlers = {};

var REJECTED = ['REJECTED'];
var FULFILLED = ['FULFILLED'];
var PENDING = ['PENDING'];

module.exports = Promise;

function Promise(resolver) {
  if (typeof resolver !== 'function') {
    throw new TypeError('resolver must be a function');
  }
  this.state = PENDING;
  this.queue = [];
  this.outcome = void 0;
  if (resolver !== INTERNAL) {
    safelyResolveThenable(this, resolver);
  }
}

Promise.prototype["catch"] = function (onRejected) {
  return this.then(null, onRejected);
};
Promise.prototype.then = function (onFulfilled, onRejected) {
  if (typeof onFulfilled !== 'function' && this.state === FULFILLED ||
    typeof onRejected !== 'function' && this.state === REJECTED) {
    return this;
  }
  var promise = new this.constructor(INTERNAL);
  if (this.state !== PENDING) {
    var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
    unwrap(promise, resolver, this.outcome);
  } else {
    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
  }

  return promise;
};
function QueueItem(promise, onFulfilled, onRejected) {
  this.promise = promise;
  if (typeof onFulfilled === 'function') {
    this.onFulfilled = onFulfilled;
    this.callFulfilled = this.otherCallFulfilled;
  }
  if (typeof onRejected === 'function') {
    this.onRejected = onRejected;
    this.callRejected = this.otherCallRejected;
  }
}
QueueItem.prototype.callFulfilled = function (value) {
  handlers.resolve(this.promise, value);
};
QueueItem.prototype.otherCallFulfilled = function (value) {
  unwrap(this.promise, this.onFulfilled, value);
};
QueueItem.prototype.callRejected = function (value) {
  handlers.reject(this.promise, value);
};
QueueItem.prototype.otherCallRejected = function (value) {
  unwrap(this.promise, this.onRejected, value);
};

function unwrap(promise, func, value) {
  immediate(function () {
    var returnValue;
    try {
      returnValue = func(value);
    } catch (e) {
      return handlers.reject(promise, e);
    }
    if (returnValue === promise) {
      handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
    } else {
      handlers.resolve(promise, returnValue);
    }
  });
}

handlers.resolve = function (self, value) {
  var result = tryCatch(getThen, value);
  if (result.status === 'error') {
    return handlers.reject(self, result.value);
  }
  var thenable = result.value;

  if (thenable) {
    safelyResolveThenable(self, thenable);
  } else {
    self.state = FULFILLED;
    self.outcome = value;
    var i = -1;
    var len = self.queue.length;
    while (++i < len) {
      self.queue[i].callFulfilled(value);
    }
  }
  return self;
};
handlers.reject = function (self, error) {
  self.state = REJECTED;
  self.outcome = error;
  var i = -1;
  var len = self.queue.length;
  while (++i < len) {
    self.queue[i].callRejected(error);
  }
  return self;
};

function getThen(obj) {
  // Make sure we only access the accessor once as required by the spec
  var then = obj && obj.then;
  if (obj && (typeof obj === 'object' || typeof obj === 'function') && typeof then === 'function') {
    return function appyThen() {
      then.apply(obj, arguments);
    };
  }
}

function safelyResolveThenable(self, thenable) {
  // Either fulfill, reject or reject with error
  var called = false;
  function onError(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.reject(self, value);
  }

  function onSuccess(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.resolve(self, value);
  }

  function tryToUnwrap() {
    thenable(onSuccess, onError);
  }

  var result = tryCatch(tryToUnwrap);
  if (result.status === 'error') {
    onError(result.value);
  }
}

function tryCatch(func, value) {
  var out = {};
  try {
    out.value = func(value);
    out.status = 'success';
  } catch (e) {
    out.status = 'error';
    out.value = e;
  }
  return out;
}

Promise.resolve = resolve;
function resolve(value) {
  if (value instanceof this) {
    return value;
  }
  return handlers.resolve(new this(INTERNAL), value);
}

Promise.reject = reject;
function reject(reason) {
  var promise = new this(INTERNAL);
  return handlers.reject(promise, reason);
}

Promise.all = all;
function all(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var values = new Array(len);
  var resolved = 0;
  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    allResolver(iterable[i], i);
  }
  return promise;
  function allResolver(value, i) {
    self.resolve(value).then(resolveFromAll, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
    function resolveFromAll(outValue) {
      values[i] = outValue;
      if (++resolved === len && !called) {
        called = true;
        handlers.resolve(promise, values);
      }
    }
  }
}

Promise.race = race;
function race(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    resolver(iterable[i]);
  }
  return promise;
  function resolver(value) {
    self.resolve(value).then(function (response) {
      if (!called) {
        called = true;
        handlers.resolve(promise, response);
      }
    }, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
  }
}

},{"1":1}],3:[function(_dereq_,module,exports){
(function (global){
'use strict';
if (typeof global.Promise !== 'function') {
  global.Promise = _dereq_(2);
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"2":2}],4:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getIDB() {
    /* global indexedDB,webkitIndexedDB,mozIndexedDB,OIndexedDB,msIndexedDB */
    try {
        if (typeof indexedDB !== 'undefined') {
            return indexedDB;
        }
        if (typeof webkitIndexedDB !== 'undefined') {
            return webkitIndexedDB;
        }
        if (typeof mozIndexedDB !== 'undefined') {
            return mozIndexedDB;
        }
        if (typeof OIndexedDB !== 'undefined') {
            return OIndexedDB;
        }
        if (typeof msIndexedDB !== 'undefined') {
            return msIndexedDB;
        }
    } catch (e) {
        return;
    }
}

var idb = getIDB();

function isIndexedDBValid() {
    try {
        // Initialize IndexedDB; fall back to vendor-prefixed versions
        // if needed.
        if (!idb) {
            return false;
        }
        // We mimic PouchDB here;
        //
        // We test for openDatabase because IE Mobile identifies itself
        // as Safari. Oh the lulz...
        var isSafari = typeof openDatabase !== 'undefined' && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);

        var hasFetch = typeof fetch === 'function' && fetch.toString().indexOf('[native code') !== -1;

        // Safari <10.1 does not meet our requirements for IDB support (#5572)
        // since Safari 10.1 shipped with fetch, we can use that to detect it
        return (!isSafari || hasFetch) && typeof indexedDB !== 'undefined' &&
        // some outdated implementations of IDB that appear on Samsung
        // and HTC Android devices <4.4 are missing IDBKeyRange
        // See: https://github.com/mozilla/localForage/issues/128
        // See: https://github.com/mozilla/localForage/issues/272
        typeof IDBKeyRange !== 'undefined';
    } catch (e) {
        return false;
    }
}

// Abstracts constructing a Blob object, so it also works in older
// browsers that don't support the native Blob constructor. (i.e.
// old QtWebKit versions, at least).
// Abstracts constructing a Blob object, so it also works in older
// browsers that don't support the native Blob constructor. (i.e.
// old QtWebKit versions, at least).
function createBlob(parts, properties) {
    /* global BlobBuilder,MSBlobBuilder,MozBlobBuilder,WebKitBlobBuilder */
    parts = parts || [];
    properties = properties || {};
    try {
        return new Blob(parts, properties);
    } catch (e) {
        if (e.name !== 'TypeError') {
            throw e;
        }
        var Builder = typeof BlobBuilder !== 'undefined' ? BlobBuilder : typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder : typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder : WebKitBlobBuilder;
        var builder = new Builder();
        for (var i = 0; i < parts.length; i += 1) {
            builder.append(parts[i]);
        }
        return builder.getBlob(properties.type);
    }
}

// This is CommonJS because lie is an external dependency, so Rollup
// can just ignore it.
if (typeof Promise === 'undefined') {
    // In the "nopromises" build this will just throw if you don't have
    // a global promise object, but it would throw anyway later.
    _dereq_(3);
}
var Promise$1 = Promise;

function executeCallback(promise, callback) {
    if (callback) {
        promise.then(function (result) {
            callback(null, result);
        }, function (error) {
            callback(error);
        });
    }
}

function executeTwoCallbacks(promise, callback, errorCallback) {
    if (typeof callback === 'function') {
        promise.then(callback);
    }

    if (typeof errorCallback === 'function') {
        promise["catch"](errorCallback);
    }
}

function normalizeKey(key) {
    // Cast the key to a string, as that's all we can set as a key.
    if (typeof key !== 'string') {
        console.warn(key + ' used as a key, but it is not a string.');
        key = String(key);
    }

    return key;
}

function getCallback() {
    if (arguments.length && typeof arguments[arguments.length - 1] === 'function') {
        return arguments[arguments.length - 1];
    }
}

// Some code originally from async_storage.js in
// [Gaia](https://github.com/mozilla-b2g/gaia).

var DETECT_BLOB_SUPPORT_STORE = 'local-forage-detect-blob-support';
var supportsBlobs = void 0;
var dbContexts = {};
var toString = Object.prototype.toString;

// Transaction Modes
var READ_ONLY = 'readonly';
var READ_WRITE = 'readwrite';

// Transform a binary string to an array buffer, because otherwise
// weird stuff happens when you try to work with the binary string directly.
// It is known.
// From http://stackoverflow.com/questions/14967647/ (continues on next line)
// encode-decode-image-with-base64-breaks-image (2013-04-21)
function _binStringToArrayBuffer(bin) {
    var length = bin.length;
    var buf = new ArrayBuffer(length);
    var arr = new Uint8Array(buf);
    for (var i = 0; i < length; i++) {
        arr[i] = bin.charCodeAt(i);
    }
    return buf;
}

//
// Blobs are not supported in all versions of IndexedDB, notably
// Chrome <37 and Android <5. In those versions, storing a blob will throw.
//
// Various other blob bugs exist in Chrome v37-42 (inclusive).
// Detecting them is expensive and confusing to users, and Chrome 37-42
// is at very low usage worldwide, so we do a hacky userAgent check instead.
//
// content-type bug: https://code.google.com/p/chromium/issues/detail?id=408120
// 404 bug: https://code.google.com/p/chromium/issues/detail?id=447916
// FileReader bug: https://code.google.com/p/chromium/issues/detail?id=447836
//
// Code borrowed from PouchDB. See:
// https://github.com/pouchdb/pouchdb/blob/master/packages/node_modules/pouchdb-adapter-idb/src/blobSupport.js
//
function _checkBlobSupportWithoutCaching(idb) {
    return new Promise$1(function (resolve) {
        var txn = idb.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
        var blob = createBlob(['']);
        txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, 'key');

        txn.onabort = function (e) {
            // If the transaction aborts now its due to not being able to
            // write to the database, likely due to the disk being full
            e.preventDefault();
            e.stopPropagation();
            resolve(false);
        };

        txn.oncomplete = function () {
            var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
            var matchedEdge = navigator.userAgent.match(/Edge\//);
            // MS Edge pretends to be Chrome 42:
            // https://msdn.microsoft.com/en-us/library/hh869301%28v=vs.85%29.aspx
            resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
        };
    })["catch"](function () {
        return false; // error, so assume unsupported
    });
}

function _checkBlobSupport(idb) {
    if (typeof supportsBlobs === 'boolean') {
        return Promise$1.resolve(supportsBlobs);
    }
    return _checkBlobSupportWithoutCaching(idb).then(function (value) {
        supportsBlobs = value;
        return supportsBlobs;
    });
}

function _deferReadiness(dbInfo) {
    var dbContext = dbContexts[dbInfo.name];

    // Create a deferred object representing the current database operation.
    var deferredOperation = {};

    deferredOperation.promise = new Promise$1(function (resolve, reject) {
        deferredOperation.resolve = resolve;
        deferredOperation.reject = reject;
    });

    // Enqueue the deferred operation.
    dbContext.deferredOperations.push(deferredOperation);

    // Chain its promise to the database readiness.
    if (!dbContext.dbReady) {
        dbContext.dbReady = deferredOperation.promise;
    } else {
        dbContext.dbReady = dbContext.dbReady.then(function () {
            return deferredOperation.promise;
        });
    }
}

function _advanceReadiness(dbInfo) {
    var dbContext = dbContexts[dbInfo.name];

    // Dequeue a deferred operation.
    var deferredOperation = dbContext.deferredOperations.pop();

    // Resolve its promise (which is part of the database readiness
    // chain of promises).
    if (deferredOperation) {
        deferredOperation.resolve();
        return deferredOperation.promise;
    }
}

function _rejectReadiness(dbInfo, err) {
    var dbContext = dbContexts[dbInfo.name];

    // Dequeue a deferred operation.
    var deferredOperation = dbContext.deferredOperations.pop();

    // Reject its promise (which is part of the database readiness
    // chain of promises).
    if (deferredOperation) {
        deferredOperation.reject(err);
        return deferredOperation.promise;
    }
}

function _getConnection(dbInfo, upgradeNeeded) {
    return new Promise$1(function (resolve, reject) {
        dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext();

        if (dbInfo.db) {
            if (upgradeNeeded) {
                _deferReadiness(dbInfo);
                dbInfo.db.close();
            } else {
                return resolve(dbInfo.db);
            }
        }

        var dbArgs = [dbInfo.name];

        if (upgradeNeeded) {
            dbArgs.push(dbInfo.version);
        }

        var openreq = idb.open.apply(idb, dbArgs);

        if (upgradeNeeded) {
            openreq.onupgradeneeded = function (e) {
                var db = openreq.result;
                try {
                    db.createObjectStore(dbInfo.storeName);
                    if (e.oldVersion <= 1) {
                        // Added when support for blob shims was added
                        db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
                    }
                } catch (ex) {
                    if (ex.name === 'ConstraintError') {
                        console.warn('The database "' + dbInfo.name + '"' + ' has been upgraded from version ' + e.oldVersion + ' to version ' + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
                    } else {
                        throw ex;
                    }
                }
            };
        }

        openreq.onerror = function (e) {
            e.preventDefault();
            reject(openreq.error);
        };

        openreq.onsuccess = function () {
            resolve(openreq.result);
            _advanceReadiness(dbInfo);
        };
    });
}

function _getOriginalConnection(dbInfo) {
    return _getConnection(dbInfo, false);
}

function _getUpgradedConnection(dbInfo) {
    return _getConnection(dbInfo, true);
}

function _isUpgradeNeeded(dbInfo, defaultVersion) {
    if (!dbInfo.db) {
        return true;
    }

    var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
    var isDowngrade = dbInfo.version < dbInfo.db.version;
    var isUpgrade = dbInfo.version > dbInfo.db.version;

    if (isDowngrade) {
        // If the version is not the default one
        // then warn for impossible downgrade.
        if (dbInfo.version !== defaultVersion) {
            console.warn('The database "' + dbInfo.name + '"' + " can't be downgraded from version " + dbInfo.db.version + ' to version ' + dbInfo.version + '.');
        }
        // Align the versions to prevent errors.
        dbInfo.version = dbInfo.db.version;
    }

    if (isUpgrade || isNewStore) {
        // If the store is new then increment the version (if needed).
        // This will trigger an "upgradeneeded" event which is required
        // for creating a store.
        if (isNewStore) {
            var incVersion = dbInfo.db.version + 1;
            if (incVersion > dbInfo.version) {
                dbInfo.version = incVersion;
            }
        }

        return true;
    }

    return false;
}

// encode a blob for indexeddb engines that don't support blobs
function _encodeBlob(blob) {
    return new Promise$1(function (resolve, reject) {
        var reader = new FileReader();
        reader.onerror = reject;
        reader.onloadend = function (e) {
            var base64 = btoa(e.target.result || '');
            resolve({
                __local_forage_encoded_blob: true,
                data: base64,
                type: blob.type
            });
        };
        reader.readAsBinaryString(blob);
    });
}

// decode an encoded blob
function _decodeBlob(encodedBlob) {
    var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));
    return createBlob([arrayBuff], { type: encodedBlob.type });
}

// is this one of our fancy encoded blobs?
function _isEncodedBlob(value) {
    return value && value.__local_forage_encoded_blob;
}

// Specialize the default `ready()` function by making it dependent
// on the current database operations. Thus, the driver will be actually
// ready when it's been initialized (default) *and* there are no pending
// operations on the database (initiated by some other instances).
function _fullyReady(callback) {
    var self = this;

    var promise = self._initReady().then(function () {
        var dbContext = dbContexts[self._dbInfo.name];

        if (dbContext && dbContext.dbReady) {
            return dbContext.dbReady;
        }
    });

    executeTwoCallbacks(promise, callback, callback);
    return promise;
}

// Try to establish a new db connection to replace the
// current one which is broken (i.e. experiencing
// InvalidStateError while creating a transaction).
function _tryReconnect(dbInfo) {
    _deferReadiness(dbInfo);

    var dbContext = dbContexts[dbInfo.name];
    var forages = dbContext.forages;

    for (var i = 0; i < forages.length; i++) {
        var forage = forages[i];
        if (forage._dbInfo.db) {
            forage._dbInfo.db.close();
            forage._dbInfo.db = null;
        }
    }
    dbInfo.db = null;

    return _getOriginalConnection(dbInfo).then(function (db) {
        dbInfo.db = db;
        if (_isUpgradeNeeded(dbInfo)) {
            // Reopen the database for upgrading.
            return _getUpgradedConnection(dbInfo);
        }
        return db;
    }).then(function (db) {
        // store the latest db reference
        // in case the db was upgraded
        dbInfo.db = dbContext.db = db;
        for (var i = 0; i < forages.length; i++) {
            forages[i]._dbInfo.db = db;
        }
    })["catch"](function (err) {
        _rejectReadiness(dbInfo, err);
        throw err;
    });
}

// FF doesn't like Promises (micro-tasks) and IDDB store operations,
// so we have to do it with callbacks
function createTransaction(dbInfo, mode, callback, retries) {
    if (retries === undefined) {
        retries = 1;
    }

    try {
        var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
        callback(null, tx);
    } catch (err) {
        if (retries > 0 && (!dbInfo.db || err.name === 'InvalidStateError' || err.name === 'NotFoundError')) {
            return Promise$1.resolve().then(function () {
                if (!dbInfo.db || err.name === 'NotFoundError' && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) {
                    // increase the db version, to create the new ObjectStore
                    if (dbInfo.db) {
                        dbInfo.version = dbInfo.db.version + 1;
                    }
                    // Reopen the database for upgrading.
                    return _getUpgradedConnection(dbInfo);
                }
            }).then(function () {
                return _tryReconnect(dbInfo).then(function () {
                    createTransaction(dbInfo, mode, callback, retries - 1);
                });
            })["catch"](callback);
        }

        callback(err);
    }
}

function createDbContext() {
    return {
        // Running localForages sharing a database.
        forages: [],
        // Shared database.
        db: null,
        // Database readiness (promise).
        dbReady: null,
        // Deferred operations on the database.
        deferredOperations: []
    };
}

// Open the IndexedDB database (automatically creates one if one didn't
// previously exist), using any options set in the config.
function _initStorage(options) {
    var self = this;
    var dbInfo = {
        db: null
    };

    if (options) {
        for (var i in options) {
            dbInfo[i] = options[i];
        }
    }

    // Get the current context of the database;
    var dbContext = dbContexts[dbInfo.name];

    // ...or create a new context.
    if (!dbContext) {
        dbContext = createDbContext();
        // Register the new context in the global container.
        dbContexts[dbInfo.name] = dbContext;
    }

    // Register itself as a running localForage in the current context.
    dbContext.forages.push(self);

    // Replace the default `ready()` function with the specialized one.
    if (!self._initReady) {
        self._initReady = self.ready;
        self.ready = _fullyReady;
    }

    // Create an array of initialization states of the related localForages.
    var initPromises = [];

    function ignoreErrors() {
        // Don't handle errors here,
        // just makes sure related localForages aren't pending.
        return Promise$1.resolve();
    }

    for (var j = 0; j < dbContext.forages.length; j++) {
        var forage = dbContext.forages[j];
        if (forage !== self) {
            // Don't wait for itself...
            initPromises.push(forage._initReady()["catch"](ignoreErrors));
        }
    }

    // Take a snapshot of the related localForages.
    var forages = dbContext.forages.slice(0);

    // Initialize the connection process only when
    // all the related localForages aren't pending.
    return Promise$1.all(initPromises).then(function () {
        dbInfo.db = dbContext.db;
        // Get the connection or open a new one without upgrade.
        return _getOriginalConnection(dbInfo);
    }).then(function (db) {
        dbInfo.db = db;
        if (_isUpgradeNeeded(dbInfo, self._defaultConfig.version)) {
            // Reopen the database for upgrading.
            return _getUpgradedConnection(dbInfo);
        }
        return db;
    }).then(function (db) {
        dbInfo.db = dbContext.db = db;
        self._dbInfo = dbInfo;
        // Share the final connection amongst related localForages.
        for (var k = 0; k < forages.length; k++) {
            var forage = forages[k];
            if (forage !== self) {
                // Self is already up-to-date.
                forage._dbInfo.db = dbInfo.db;
                forage._dbInfo.version = dbInfo.version;
            }
        }
    });
}

function getItem(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.get(key);

                    req.onsuccess = function () {
                        var value = req.result;
                        if (value === undefined) {
                            value = null;
                        }
                        if (_isEncodedBlob(value)) {
                            value = _decodeBlob(value);
                        }
                        resolve(value);
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Iterate over all items stored in database.
function iterate(iterator, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.openCursor();
                    var iterationNumber = 1;

                    req.onsuccess = function () {
                        var cursor = req.result;

                        if (cursor) {
                            var value = cursor.value;
                            if (_isEncodedBlob(value)) {
                                value = _decodeBlob(value);
                            }
                            var result = iterator(value, cursor.key, iterationNumber++);

                            // when the iterator callback retuns any
                            // (non-`undefined`) value, then we stop
                            // the iteration immediately
                            if (result !== void 0) {
                                resolve(result);
                            } else {
                                cursor["continue"]();
                            }
                        } else {
                            resolve();
                        }
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);

    return promise;
}

function setItem(key, value, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        var dbInfo;
        self.ready().then(function () {
            dbInfo = self._dbInfo;
            if (toString.call(value) === '[object Blob]') {
                return _checkBlobSupport(dbInfo.db).then(function (blobSupport) {
                    if (blobSupport) {
                        return value;
                    }
                    return _encodeBlob(value);
                });
            }
            return value;
        }).then(function (value) {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);

                    // The reason we don't _save_ null is because IE 10 does
                    // not support saving the `null` type in IndexedDB. How
                    // ironic, given the bug below!
                    // See: https://github.com/mozilla/localForage/issues/161
                    if (value === null) {
                        value = undefined;
                    }

                    var req = store.put(value, key);

                    transaction.oncomplete = function () {
                        // Cast to undefined so the value passed to
                        // callback/promise is the same as what one would get out
                        // of `getItem()` later. This leads to some weirdness
                        // (setItem('foo', undefined) will return `null`), but
                        // it's not my fault localStorage is our baseline and that
                        // it's weird.
                        if (value === undefined) {
                            value = null;
                        }

                        resolve(value);
                    };
                    transaction.onabort = transaction.onerror = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function removeItem(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    // We use a Grunt task to make this safe for IE and some
                    // versions of Android (including those used by Cordova).
                    // Normally IE won't like `.delete()` and will insist on
                    // using `['delete']()`, but we have a build step that
                    // fixes this for us now.
                    var req = store["delete"](key);
                    transaction.oncomplete = function () {
                        resolve();
                    };

                    transaction.onerror = function () {
                        reject(req.error);
                    };

                    // The request will be also be aborted if we've exceeded our storage
                    // space.
                    transaction.onabort = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function clear(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.clear();

                    transaction.oncomplete = function () {
                        resolve();
                    };

                    transaction.onabort = transaction.onerror = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function length(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.count();

                    req.onsuccess = function () {
                        resolve(req.result);
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function key(n, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        if (n < 0) {
            resolve(null);

            return;
        }

        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var advanced = false;
                    var req = store.openCursor();

                    req.onsuccess = function () {
                        var cursor = req.result;
                        if (!cursor) {
                            // this means there weren't enough keys
                            resolve(null);

                            return;
                        }

                        if (n === 0) {
                            // We have the first key, return it if that's what they
                            // wanted.
                            resolve(cursor.key);
                        } else {
                            if (!advanced) {
                                // Otherwise, ask the cursor to skip ahead n
                                // records.
                                advanced = true;
                                cursor.advance(n);
                            } else {
                                // When we get here, we've got the nth key.
                                resolve(cursor.key);
                            }
                        }
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function keys(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.openCursor();
                    var keys = [];

                    req.onsuccess = function () {
                        var cursor = req.result;

                        if (!cursor) {
                            resolve(keys);
                            return;
                        }

                        keys.push(cursor.key);
                        cursor["continue"]();
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function dropInstance(options, callback) {
    callback = getCallback.apply(this, arguments);

    var currentConfig = this.config();
    options = typeof options !== 'function' && options || {};
    if (!options.name) {
        options.name = options.name || currentConfig.name;
        options.storeName = options.storeName || currentConfig.storeName;
    }

    var self = this;
    var promise;
    if (!options.name) {
        promise = Promise$1.reject('Invalid arguments');
    } else {
        var isCurrentDb = options.name === currentConfig.name && self._dbInfo.db;

        var dbPromise = isCurrentDb ? Promise$1.resolve(self._dbInfo.db) : _getOriginalConnection(options).then(function (db) {
            var dbContext = dbContexts[options.name];
            var forages = dbContext.forages;
            dbContext.db = db;
            for (var i = 0; i < forages.length; i++) {
                forages[i]._dbInfo.db = db;
            }
            return db;
        });

        if (!options.storeName) {
            promise = dbPromise.then(function (db) {
                _deferReadiness(options);

                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;

                db.close();
                for (var i = 0; i < forages.length; i++) {
                    var forage = forages[i];
                    forage._dbInfo.db = null;
                }

                var dropDBPromise = new Promise$1(function (resolve, reject) {
                    var req = idb.deleteDatabase(options.name);

                    req.onerror = req.onblocked = function (err) {
                        var db = req.result;
                        if (db) {
                            db.close();
                        }
                        reject(err);
                    };

                    req.onsuccess = function () {
                        var db = req.result;
                        if (db) {
                            db.close();
                        }
                        resolve(db);
                    };
                });

                return dropDBPromise.then(function (db) {
                    dbContext.db = db;
                    for (var i = 0; i < forages.length; i++) {
                        var _forage = forages[i];
                        _advanceReadiness(_forage._dbInfo);
                    }
                })["catch"](function (err) {
                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                    throw err;
                });
            });
        } else {
            promise = dbPromise.then(function (db) {
                if (!db.objectStoreNames.contains(options.storeName)) {
                    return;
                }

                var newVersion = db.version + 1;

                _deferReadiness(options);

                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;

                db.close();
                for (var i = 0; i < forages.length; i++) {
                    var forage = forages[i];
                    forage._dbInfo.db = null;
                    forage._dbInfo.version = newVersion;
                }

                var dropObjectPromise = new Promise$1(function (resolve, reject) {
                    var req = idb.open(options.name, newVersion);

                    req.onerror = function (err) {
                        var db = req.result;
                        db.close();
                        reject(err);
                    };

                    req.onupgradeneeded = function () {
                        var db = req.result;
                        db.deleteObjectStore(options.storeName);
                    };

                    req.onsuccess = function () {
                        var db = req.result;
                        db.close();
                        resolve(db);
                    };
                });

                return dropObjectPromise.then(function (db) {
                    dbContext.db = db;
                    for (var j = 0; j < forages.length; j++) {
                        var _forage2 = forages[j];
                        _forage2._dbInfo.db = db;
                        _advanceReadiness(_forage2._dbInfo);
                    }
                })["catch"](function (err) {
                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                    throw err;
                });
            });
        }
    }

    executeCallback(promise, callback);
    return promise;
}

var asyncStorage = {
    _driver: 'asyncStorage',
    _initStorage: _initStorage,
    _support: isIndexedDBValid(),
    iterate: iterate,
    getItem: getItem,
    setItem: setItem,
    removeItem: removeItem,
    clear: clear,
    length: length,
    key: key,
    keys: keys,
    dropInstance: dropInstance
};

function isWebSQLValid() {
    return typeof openDatabase === 'function';
}

// Sadly, the best way to save binary data in WebSQL/localStorage is serializing
// it to Base64, so this is how we store it to prevent very strange errors with less
// verbose ways of binary <-> string data storage.
var BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

var BLOB_TYPE_PREFIX = '~~local_forage_type~';
var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;

var SERIALIZED_MARKER = '__lfsc__:';
var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;

// OMG the serializations!
var TYPE_ARRAYBUFFER = 'arbf';
var TYPE_BLOB = 'blob';
var TYPE_INT8ARRAY = 'si08';
var TYPE_UINT8ARRAY = 'ui08';
var TYPE_UINT8CLAMPEDARRAY = 'uic8';
var TYPE_INT16ARRAY = 'si16';
var TYPE_INT32ARRAY = 'si32';
var TYPE_UINT16ARRAY = 'ur16';
var TYPE_UINT32ARRAY = 'ui32';
var TYPE_FLOAT32ARRAY = 'fl32';
var TYPE_FLOAT64ARRAY = 'fl64';
var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;

var toString$1 = Object.prototype.toString;

function stringToBuffer(serializedString) {
    // Fill the string into a ArrayBuffer.
    var bufferLength = serializedString.length * 0.75;
    var len = serializedString.length;
    var i;
    var p = 0;
    var encoded1, encoded2, encoded3, encoded4;

    if (serializedString[serializedString.length - 1] === '=') {
        bufferLength--;
        if (serializedString[serializedString.length - 2] === '=') {
            bufferLength--;
        }
    }

    var buffer = new ArrayBuffer(bufferLength);
    var bytes = new Uint8Array(buffer);

    for (i = 0; i < len; i += 4) {
        encoded1 = BASE_CHARS.indexOf(serializedString[i]);
        encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
        encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
        encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);

        /*jslint bitwise: true */
        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }
    return buffer;
}

// Converts a buffer to a string to store, serialized, in the backend
// storage library.
function bufferToString(buffer) {
    // base64-arraybuffer
    var bytes = new Uint8Array(buffer);
    var base64String = '';
    var i;

    for (i = 0; i < bytes.length; i += 3) {
        /*jslint bitwise: true */
        base64String += BASE_CHARS[bytes[i] >> 2];
        base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
        base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
        base64String += BASE_CHARS[bytes[i + 2] & 63];
    }

    if (bytes.length % 3 === 2) {
        base64String = base64String.substring(0, base64String.length - 1) + '=';
    } else if (bytes.length % 3 === 1) {
        base64String = base64String.substring(0, base64String.length - 2) + '==';
    }

    return base64String;
}

// Serialize a value, afterwards executing a callback (which usually
// instructs the `setItem()` callback/promise to be executed). This is how
// we store binary data with localStorage.
function serialize(value, callback) {
    var valueType = '';
    if (value) {
        valueType = toString$1.call(value);
    }

    // Cannot use `value instanceof ArrayBuffer` or such here, as these
    // checks fail when running the tests using casper.js...
    //
    // TODO: See why those tests fail and use a better solution.
    if (value && (valueType === '[object ArrayBuffer]' || value.buffer && toString$1.call(value.buffer) === '[object ArrayBuffer]')) {
        // Convert binary arrays to a string and prefix the string with
        // a special marker.
        var buffer;
        var marker = SERIALIZED_MARKER;

        if (value instanceof ArrayBuffer) {
            buffer = value;
            marker += TYPE_ARRAYBUFFER;
        } else {
            buffer = value.buffer;

            if (valueType === '[object Int8Array]') {
                marker += TYPE_INT8ARRAY;
            } else if (valueType === '[object Uint8Array]') {
                marker += TYPE_UINT8ARRAY;
            } else if (valueType === '[object Uint8ClampedArray]') {
                marker += TYPE_UINT8CLAMPEDARRAY;
            } else if (valueType === '[object Int16Array]') {
                marker += TYPE_INT16ARRAY;
            } else if (valueType === '[object Uint16Array]') {
                marker += TYPE_UINT16ARRAY;
            } else if (valueType === '[object Int32Array]') {
                marker += TYPE_INT32ARRAY;
            } else if (valueType === '[object Uint32Array]') {
                marker += TYPE_UINT32ARRAY;
            } else if (valueType === '[object Float32Array]') {
                marker += TYPE_FLOAT32ARRAY;
            } else if (valueType === '[object Float64Array]') {
                marker += TYPE_FLOAT64ARRAY;
            } else {
                callback(new Error('Failed to get type for BinaryArray'));
            }
        }

        callback(marker + bufferToString(buffer));
    } else if (valueType === '[object Blob]') {
        // Conver the blob to a binaryArray and then to a string.
        var fileReader = new FileReader();

        fileReader.onload = function () {
            // Backwards-compatible prefix for the blob type.
            var str = BLOB_TYPE_PREFIX + value.type + '~' + bufferToString(this.result);

            callback(SERIALIZED_MARKER + TYPE_BLOB + str);
        };

        fileReader.readAsArrayBuffer(value);
    } else {
        try {
            callback(JSON.stringify(value));
        } catch (e) {
            console.error("Couldn't convert value into a JSON string: ", value);

            callback(null, e);
        }
    }
}

// Deserialize data we've inserted into a value column/field. We place
// special markers into our strings to mark them as encoded; this isn't
// as nice as a meta field, but it's the only sane thing we can do whilst
// keeping localStorage support intact.
//
// Oftentimes this will just deserialize JSON content, but if we have a
// special marker (SERIALIZED_MARKER, defined above), we will extract
// some kind of arraybuffer/binary data/typed array out of the string.
function deserialize(value) {
    // If we haven't marked this string as being specially serialized (i.e.
    // something other than serialized JSON), we can just return it and be
    // done with it.
    if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
        return JSON.parse(value);
    }

    // The following code deals with deserializing some kind of Blob or
    // TypedArray. First we separate out the type of data we're dealing
    // with from the data itself.
    var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
    var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);

    var blobType;
    // Backwards-compatible blob type serialization strategy.
    // DBs created with older versions of localForage will simply not have the blob type.
    if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
        var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
        blobType = matcher[1];
        serializedString = serializedString.substring(matcher[0].length);
    }
    var buffer = stringToBuffer(serializedString);

    // Return the right type based on the code/type set during
    // serialization.
    switch (type) {
        case TYPE_ARRAYBUFFER:
            return buffer;
        case TYPE_BLOB:
            return createBlob([buffer], { type: blobType });
        case TYPE_INT8ARRAY:
            return new Int8Array(buffer);
        case TYPE_UINT8ARRAY:
            return new Uint8Array(buffer);
        case TYPE_UINT8CLAMPEDARRAY:
            return new Uint8ClampedArray(buffer);
        case TYPE_INT16ARRAY:
            return new Int16Array(buffer);
        case TYPE_UINT16ARRAY:
            return new Uint16Array(buffer);
        case TYPE_INT32ARRAY:
            return new Int32Array(buffer);
        case TYPE_UINT32ARRAY:
            return new Uint32Array(buffer);
        case TYPE_FLOAT32ARRAY:
            return new Float32Array(buffer);
        case TYPE_FLOAT64ARRAY:
            return new Float64Array(buffer);
        default:
            throw new Error('Unkown type: ' + type);
    }
}

var localforageSerializer = {
    serialize: serialize,
    deserialize: deserialize,
    stringToBuffer: stringToBuffer,
    bufferToString: bufferToString
};

/*
 * Includes code from:
 *
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */

function createDbTable(t, dbInfo, callback, errorCallback) {
    t.executeSql('CREATE TABLE IF NOT EXISTS ' + dbInfo.storeName + ' ' + '(id INTEGER PRIMARY KEY, key unique, value)', [], callback, errorCallback);
}

// Open the WebSQL database (automatically creates one if one didn't
// previously exist), using any options set in the config.
function _initStorage$1(options) {
    var self = this;
    var dbInfo = {
        db: null
    };

    if (options) {
        for (var i in options) {
            dbInfo[i] = typeof options[i] !== 'string' ? options[i].toString() : options[i];
        }
    }

    var dbInfoPromise = new Promise$1(function (resolve, reject) {
        // Open the database; the openDatabase API will automatically
        // create it for us if it doesn't exist.
        try {
            dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
        } catch (e) {
            return reject(e);
        }

        // Create our key/value table if it doesn't exist.
        dbInfo.db.transaction(function (t) {
            createDbTable(t, dbInfo, function () {
                self._dbInfo = dbInfo;
                resolve();
            }, function (t, error) {
                reject(error);
            });
        }, reject);
    });

    dbInfo.serializer = localforageSerializer;
    return dbInfoPromise;
}

function tryExecuteSql(t, dbInfo, sqlStatement, args, callback, errorCallback) {
    t.executeSql(sqlStatement, args, callback, function (t, error) {
        if (error.code === error.SYNTAX_ERR) {
            t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name = ?", [dbInfo.storeName], function (t, results) {
                if (!results.rows.length) {
                    // if the table is missing (was deleted)
                    // re-create it table and retry
                    createDbTable(t, dbInfo, function () {
                        t.executeSql(sqlStatement, args, callback, errorCallback);
                    }, errorCallback);
                } else {
                    errorCallback(t, error);
                }
            }, errorCallback);
        } else {
            errorCallback(t, error);
        }
    }, errorCallback);
}

function getItem$1(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName + ' WHERE key = ? LIMIT 1', [key], function (t, results) {
                    var result = results.rows.length ? results.rows.item(0).value : null;

                    // Check to see if this is serialized content we need to
                    // unpack.
                    if (result) {
                        result = dbInfo.serializer.deserialize(result);
                    }

                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function iterate$1(iterator, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;

            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName, [], function (t, results) {
                    var rows = results.rows;
                    var length = rows.length;

                    for (var i = 0; i < length; i++) {
                        var item = rows.item(i);
                        var result = item.value;

                        // Check to see if this is serialized content
                        // we need to unpack.
                        if (result) {
                            result = dbInfo.serializer.deserialize(result);
                        }

                        result = iterator(result, item.key, i + 1);

                        // void(0) prevents problems with redefinition
                        // of `undefined`.
                        if (result !== void 0) {
                            resolve(result);
                            return;
                        }
                    }

                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function _setItem(key, value, callback, retriesLeft) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            // The localStorage API doesn't return undefined values in an
            // "expected" way, so undefined is always cast to null in all
            // drivers. See: https://github.com/mozilla/localForage/pull/42
            if (value === undefined) {
                value = null;
            }

            // Save the original value to pass to the callback.
            var originalValue = value;

            var dbInfo = self._dbInfo;
            dbInfo.serializer.serialize(value, function (value, error) {
                if (error) {
                    reject(error);
                } else {
                    dbInfo.db.transaction(function (t) {
                        tryExecuteSql(t, dbInfo, 'INSERT OR REPLACE INTO ' + dbInfo.storeName + ' ' + '(key, value) VALUES (?, ?)', [key, value], function () {
                            resolve(originalValue);
                        }, function (t, error) {
                            reject(error);
                        });
                    }, function (sqlError) {
                        // The transaction failed; check
                        // to see if it's a quota error.
                        if (sqlError.code === sqlError.QUOTA_ERR) {
                            // We reject the callback outright for now, but
                            // it's worth trying to re-run the transaction.
                            // Even if the user accepts the prompt to use
                            // more storage on Safari, this error will
                            // be called.
                            //
                            // Try to re-run the transaction.
                            if (retriesLeft > 0) {
                                resolve(_setItem.apply(self, [key, originalValue, callback, retriesLeft - 1]));
                                return;
                            }
                            reject(sqlError);
                        }
                    });
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function setItem$1(key, value, callback) {
    return _setItem.apply(this, [key, value, callback, 1]);
}

function removeItem$1(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName + ' WHERE key = ?', [key], function () {
                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Deletes every item in the table.
// TODO: Find out if this resets the AUTO_INCREMENT number.
function clear$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName, [], function () {
                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Does a simple `COUNT(key)` to get the number of items stored in
// localForage.
function length$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                // Ahhh, SQL makes this one soooooo easy.
                tryExecuteSql(t, dbInfo, 'SELECT COUNT(key) as c FROM ' + dbInfo.storeName, [], function (t, results) {
                    var result = results.rows.item(0).c;
                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Return the key located at key index X; essentially gets the key from a
// `WHERE id = ?`. This is the most efficient way I can think to implement
// this rarely-used (in my experience) part of the API, but it can seem
// inconsistent, because we do `INSERT OR REPLACE INTO` on `setItem()`, so
// the ID of each key will change every time it's updated. Perhaps a stored
// procedure for the `setItem()` SQL would solve this problem?
// TODO: Don't change ID on `setItem()`.
function key$1(n, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName + ' WHERE id = ? LIMIT 1', [n + 1], function (t, results) {
                    var result = results.rows.length ? results.rows.item(0).key : null;
                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function keys$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName, [], function (t, results) {
                    var keys = [];

                    for (var i = 0; i < results.rows.length; i++) {
                        keys.push(results.rows.item(i).key);
                    }

                    resolve(keys);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// https://www.w3.org/TR/webdatabase/#databases
// > There is no way to enumerate or delete the databases available for an origin from this API.
function getAllStoreNames(db) {
    return new Promise$1(function (resolve, reject) {
        db.transaction(function (t) {
            t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function (t, results) {
                var storeNames = [];

                for (var i = 0; i < results.rows.length; i++) {
                    storeNames.push(results.rows.item(i).name);
                }

                resolve({
                    db: db,
                    storeNames: storeNames
                });
            }, function (t, error) {
                reject(error);
            });
        }, function (sqlError) {
            reject(sqlError);
        });
    });
}

function dropInstance$1(options, callback) {
    callback = getCallback.apply(this, arguments);

    var currentConfig = this.config();
    options = typeof options !== 'function' && options || {};
    if (!options.name) {
        options.name = options.name || currentConfig.name;
        options.storeName = options.storeName || currentConfig.storeName;
    }

    var self = this;
    var promise;
    if (!options.name) {
        promise = Promise$1.reject('Invalid arguments');
    } else {
        promise = new Promise$1(function (resolve) {
            var db;
            if (options.name === currentConfig.name) {
                // use the db reference of the current instance
                db = self._dbInfo.db;
            } else {
                db = openDatabase(options.name, '', '', 0);
            }

            if (!options.storeName) {
                // drop all database tables
                resolve(getAllStoreNames(db));
            } else {
                resolve({
                    db: db,
                    storeNames: [options.storeName]
                });
            }
        }).then(function (operationInfo) {
            return new Promise$1(function (resolve, reject) {
                operationInfo.db.transaction(function (t) {
                    function dropTable(storeName) {
                        return new Promise$1(function (resolve, reject) {
                            t.executeSql('DROP TABLE IF EXISTS ' + storeName, [], function () {
                                resolve();
                            }, function (t, error) {
                                reject(error);
                            });
                        });
                    }

                    var operations = [];
                    for (var i = 0, len = operationInfo.storeNames.length; i < len; i++) {
                        operations.push(dropTable(operationInfo.storeNames[i]));
                    }

                    Promise$1.all(operations).then(function () {
                        resolve();
                    })["catch"](function (e) {
                        reject(e);
                    });
                }, function (sqlError) {
                    reject(sqlError);
                });
            });
        });
    }

    executeCallback(promise, callback);
    return promise;
}

var webSQLStorage = {
    _driver: 'webSQLStorage',
    _initStorage: _initStorage$1,
    _support: isWebSQLValid(),
    iterate: iterate$1,
    getItem: getItem$1,
    setItem: setItem$1,
    removeItem: removeItem$1,
    clear: clear$1,
    length: length$1,
    key: key$1,
    keys: keys$1,
    dropInstance: dropInstance$1
};

function isLocalStorageValid() {
    try {
        return typeof localStorage !== 'undefined' && 'setItem' in localStorage &&
        // in IE8 typeof localStorage.setItem === 'object'
        !!localStorage.setItem;
    } catch (e) {
        return false;
    }
}

function _getKeyPrefix(options, defaultConfig) {
    var keyPrefix = options.name + '/';

    if (options.storeName !== defaultConfig.storeName) {
        keyPrefix += options.storeName + '/';
    }
    return keyPrefix;
}

// Check if localStorage throws when saving an item
function checkIfLocalStorageThrows() {
    var localStorageTestKey = '_localforage_support_test';

    try {
        localStorage.setItem(localStorageTestKey, true);
        localStorage.removeItem(localStorageTestKey);

        return false;
    } catch (e) {
        return true;
    }
}

// Check if localStorage is usable and allows to save an item
// This method checks if localStorage is usable in Safari Private Browsing
// mode, or in any other case where the available quota for localStorage
// is 0 and there wasn't any saved items yet.
function _isLocalStorageUsable() {
    return !checkIfLocalStorageThrows() || localStorage.length > 0;
}

// Config the localStorage backend, using options set in the config.
function _initStorage$2(options) {
    var self = this;
    var dbInfo = {};
    if (options) {
        for (var i in options) {
            dbInfo[i] = options[i];
        }
    }

    dbInfo.keyPrefix = _getKeyPrefix(options, self._defaultConfig);

    if (!_isLocalStorageUsable()) {
        return Promise$1.reject();
    }

    self._dbInfo = dbInfo;
    dbInfo.serializer = localforageSerializer;

    return Promise$1.resolve();
}

// Remove all keys from the datastore, effectively destroying all data in
// the app's key/value store!
function clear$2(callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var keyPrefix = self._dbInfo.keyPrefix;

        for (var i = localStorage.length - 1; i >= 0; i--) {
            var key = localStorage.key(i);

            if (key.indexOf(keyPrefix) === 0) {
                localStorage.removeItem(key);
            }
        }
    });

    executeCallback(promise, callback);
    return promise;
}

// Retrieve an item from the store. Unlike the original async_storage
// library in Gaia, we don't modify return values at all. If a key's value
// is `undefined`, we pass that value to the callback function.
function getItem$2(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var result = localStorage.getItem(dbInfo.keyPrefix + key);

        // If a result was found, parse it from the serialized
        // string into a JS object. If result isn't truthy, the key
        // is likely undefined and we'll pass it straight to the
        // callback.
        if (result) {
            result = dbInfo.serializer.deserialize(result);
        }

        return result;
    });

    executeCallback(promise, callback);
    return promise;
}

// Iterate over all items in the store.
function iterate$2(iterator, callback) {
    var self = this;

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var keyPrefix = dbInfo.keyPrefix;
        var keyPrefixLength = keyPrefix.length;
        var length = localStorage.length;

        // We use a dedicated iterator instead of the `i` variable below
        // so other keys we fetch in localStorage aren't counted in
        // the `iterationNumber` argument passed to the `iterate()`
        // callback.
        //
        // See: github.com/mozilla/localForage/pull/435#discussion_r38061530
        var iterationNumber = 1;

        for (var i = 0; i < length; i++) {
            var key = localStorage.key(i);
            if (key.indexOf(keyPrefix) !== 0) {
                continue;
            }
            var value = localStorage.getItem(key);

            // If a result was found, parse it from the serialized
            // string into a JS object. If result isn't truthy, the
            // key is likely undefined and we'll pass it straight
            // to the iterator.
            if (value) {
                value = dbInfo.serializer.deserialize(value);
            }

            value = iterator(value, key.substring(keyPrefixLength), iterationNumber++);

            if (value !== void 0) {
                return value;
            }
        }
    });

    executeCallback(promise, callback);
    return promise;
}

// Same as localStorage's key() method, except takes a callback.
function key$2(n, callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var result;
        try {
            result = localStorage.key(n);
        } catch (error) {
            result = null;
        }

        // Remove the prefix from the key, if a key is found.
        if (result) {
            result = result.substring(dbInfo.keyPrefix.length);
        }

        return result;
    });

    executeCallback(promise, callback);
    return promise;
}

function keys$2(callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var length = localStorage.length;
        var keys = [];

        for (var i = 0; i < length; i++) {
            var itemKey = localStorage.key(i);
            if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {
                keys.push(itemKey.substring(dbInfo.keyPrefix.length));
            }
        }

        return keys;
    });

    executeCallback(promise, callback);
    return promise;
}

// Supply the number of keys in the datastore to the callback function.
function length$2(callback) {
    var self = this;
    var promise = self.keys().then(function (keys) {
        return keys.length;
    });

    executeCallback(promise, callback);
    return promise;
}

// Remove an item from the store, nice and simple.
function removeItem$2(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        localStorage.removeItem(dbInfo.keyPrefix + key);
    });

    executeCallback(promise, callback);
    return promise;
}

// Set a key's value and run an optional callback once the value is set.
// Unlike Gaia's implementation, the callback function is passed the value,
// in case you want to operate on that value only after you're sure it
// saved, or something like that.
function setItem$2(key, value, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        // Convert undefined values to null.
        // https://github.com/mozilla/localForage/pull/42
        if (value === undefined) {
            value = null;
        }

        // Save the original value to pass to the callback.
        var originalValue = value;

        return new Promise$1(function (resolve, reject) {
            var dbInfo = self._dbInfo;
            dbInfo.serializer.serialize(value, function (value, error) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        localStorage.setItem(dbInfo.keyPrefix + key, value);
                        resolve(originalValue);
                    } catch (e) {
                        // localStorage capacity exceeded.
                        // TODO: Make this a specific error/event.
                        if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                            reject(e);
                        }
                        reject(e);
                    }
                }
            });
        });
    });

    executeCallback(promise, callback);
    return promise;
}

function dropInstance$2(options, callback) {
    callback = getCallback.apply(this, arguments);

    options = typeof options !== 'function' && options || {};
    if (!options.name) {
        var currentConfig = this.config();
        options.name = options.name || currentConfig.name;
        options.storeName = options.storeName || currentConfig.storeName;
    }

    var self = this;
    var promise;
    if (!options.name) {
        promise = Promise$1.reject('Invalid arguments');
    } else {
        promise = new Promise$1(function (resolve) {
            if (!options.storeName) {
                resolve(options.name + '/');
            } else {
                resolve(_getKeyPrefix(options, self._defaultConfig));
            }
        }).then(function (keyPrefix) {
            for (var i = localStorage.length - 1; i >= 0; i--) {
                var key = localStorage.key(i);

                if (key.indexOf(keyPrefix) === 0) {
                    localStorage.removeItem(key);
                }
            }
        });
    }

    executeCallback(promise, callback);
    return promise;
}

var localStorageWrapper = {
    _driver: 'localStorageWrapper',
    _initStorage: _initStorage$2,
    _support: isLocalStorageValid(),
    iterate: iterate$2,
    getItem: getItem$2,
    setItem: setItem$2,
    removeItem: removeItem$2,
    clear: clear$2,
    length: length$2,
    key: key$2,
    keys: keys$2,
    dropInstance: dropInstance$2
};

var sameValue = function sameValue(x, y) {
    return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
};

var includes = function includes(array, searchElement) {
    var len = array.length;
    var i = 0;
    while (i < len) {
        if (sameValue(array[i], searchElement)) {
            return true;
        }
        i++;
    }

    return false;
};

var isArray = Array.isArray || function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
};

// Drivers are stored here when `defineDriver()` is called.
// They are shared across all instances of localForage.
var DefinedDrivers = {};

var DriverSupport = {};

var DefaultDrivers = {
    INDEXEDDB: asyncStorage,
    WEBSQL: webSQLStorage,
    LOCALSTORAGE: localStorageWrapper
};

var DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];

var OptionalDriverMethods = ['dropInstance'];

var LibraryMethods = ['clear', 'getItem', 'iterate', 'key', 'keys', 'length', 'removeItem', 'setItem'].concat(OptionalDriverMethods);

var DefaultConfig = {
    description: '',
    driver: DefaultDriverOrder.slice(),
    name: 'localforage',
    // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
    // we can use without a prompt.
    size: 4980736,
    storeName: 'keyvaluepairs',
    version: 1.0
};

function callWhenReady(localForageInstance, libraryMethod) {
    localForageInstance[libraryMethod] = function () {
        var _args = arguments;
        return localForageInstance.ready().then(function () {
            return localForageInstance[libraryMethod].apply(localForageInstance, _args);
        });
    };
}

function extend() {
    for (var i = 1; i < arguments.length; i++) {
        var arg = arguments[i];

        if (arg) {
            for (var _key in arg) {
                if (arg.hasOwnProperty(_key)) {
                    if (isArray(arg[_key])) {
                        arguments[0][_key] = arg[_key].slice();
                    } else {
                        arguments[0][_key] = arg[_key];
                    }
                }
            }
        }
    }

    return arguments[0];
}

var LocalForage = function () {
    function LocalForage(options) {
        _classCallCheck(this, LocalForage);

        for (var driverTypeKey in DefaultDrivers) {
            if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
                var driver = DefaultDrivers[driverTypeKey];
                var driverName = driver._driver;
                this[driverTypeKey] = driverName;

                if (!DefinedDrivers[driverName]) {
                    // we don't need to wait for the promise,
                    // since the default drivers can be defined
                    // in a blocking manner
                    this.defineDriver(driver);
                }
            }
        }

        this._defaultConfig = extend({}, DefaultConfig);
        this._config = extend({}, this._defaultConfig, options);
        this._driverSet = null;
        this._initDriver = null;
        this._ready = false;
        this._dbInfo = null;

        this._wrapLibraryMethodsWithReady();
        this.setDriver(this._config.driver)["catch"](function () {});
    }

    // Set any config values for localForage; can be called anytime before
    // the first API call (e.g. `getItem`, `setItem`).
    // We loop through options so we don't overwrite existing config
    // values.


    LocalForage.prototype.config = function config(options) {
        // If the options argument is an object, we use it to set values.
        // Otherwise, we return either a specified config value or all
        // config values.
        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
            // If localforage is ready and fully initialized, we can't set
            // any new configuration values. Instead, we return an error.
            if (this._ready) {
                return new Error("Can't call config() after localforage " + 'has been used.');
            }

            for (var i in options) {
                if (i === 'storeName') {
                    options[i] = options[i].replace(/\W/g, '_');
                }

                if (i === 'version' && typeof options[i] !== 'number') {
                    return new Error('Database version must be a number.');
                }

                this._config[i] = options[i];
            }

            // after all config options are set and
            // the driver option is used, try setting it
            if ('driver' in options && options.driver) {
                return this.setDriver(this._config.driver);
            }

            return true;
        } else if (typeof options === 'string') {
            return this._config[options];
        } else {
            return this._config;
        }
    };

    // Used to define a custom driver, shared across all instances of
    // localForage.


    LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
        var promise = new Promise$1(function (resolve, reject) {
            try {
                var driverName = driverObject._driver;
                var complianceError = new Error('Custom driver not compliant; see ' + 'https://mozilla.github.io/localForage/#definedriver');

                // A driver name should be defined and not overlap with the
                // library-defined, default drivers.
                if (!driverObject._driver) {
                    reject(complianceError);
                    return;
                }

                var driverMethods = LibraryMethods.concat('_initStorage');
                for (var i = 0, len = driverMethods.length; i < len; i++) {
                    var driverMethodName = driverMethods[i];

                    // when the property is there,
                    // it should be a method even when optional
                    var isRequired = !includes(OptionalDriverMethods, driverMethodName);
                    if ((isRequired || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== 'function') {
                        reject(complianceError);
                        return;
                    }
                }

                var configureMissingMethods = function configureMissingMethods() {
                    var methodNotImplementedFactory = function methodNotImplementedFactory(methodName) {
                        return function () {
                            var error = new Error('Method ' + methodName + ' is not implemented by the current driver');
                            var promise = Promise$1.reject(error);
                            executeCallback(promise, arguments[arguments.length - 1]);
                            return promise;
                        };
                    };

                    for (var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {
                        var optionalDriverMethod = OptionalDriverMethods[_i];
                        if (!driverObject[optionalDriverMethod]) {
                            driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);
                        }
                    }
                };

                configureMissingMethods();

                var setDriverSupport = function setDriverSupport(support) {
                    if (DefinedDrivers[driverName]) {
                        console.info('Redefining LocalForage driver: ' + driverName);
                    }
                    DefinedDrivers[driverName] = driverObject;
                    DriverSupport[driverName] = support;
                    // don't use a then, so that we can define
                    // drivers that have simple _support methods
                    // in a blocking manner
                    resolve();
                };

                if ('_support' in driverObject) {
                    if (driverObject._support && typeof driverObject._support === 'function') {
                        driverObject._support().then(setDriverSupport, reject);
                    } else {
                        setDriverSupport(!!driverObject._support);
                    }
                } else {
                    setDriverSupport(true);
                }
            } catch (e) {
                reject(e);
            }
        });

        executeTwoCallbacks(promise, callback, errorCallback);
        return promise;
    };

    LocalForage.prototype.driver = function driver() {
        return this._driver || null;
    };

    LocalForage.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
        var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error('Driver not found.'));

        executeTwoCallbacks(getDriverPromise, callback, errorCallback);
        return getDriverPromise;
    };

    LocalForage.prototype.getSerializer = function getSerializer(callback) {
        var serializerPromise = Promise$1.resolve(localforageSerializer);
        executeTwoCallbacks(serializerPromise, callback);
        return serializerPromise;
    };

    LocalForage.prototype.ready = function ready(callback) {
        var self = this;

        var promise = self._driverSet.then(function () {
            if (self._ready === null) {
                self._ready = self._initDriver();
            }

            return self._ready;
        });

        executeTwoCallbacks(promise, callback, callback);
        return promise;
    };

    LocalForage.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
        var self = this;

        if (!isArray(drivers)) {
            drivers = [drivers];
        }

        var supportedDrivers = this._getSupportedDrivers(drivers);

        function setDriverToConfig() {
            self._config.driver = self.driver();
        }

        function extendSelfWithDriver(driver) {
            self._extend(driver);
            setDriverToConfig();

            self._ready = self._initStorage(self._config);
            return self._ready;
        }

        function initDriver(supportedDrivers) {
            return function () {
                var currentDriverIndex = 0;

                function driverPromiseLoop() {
                    while (currentDriverIndex < supportedDrivers.length) {
                        var driverName = supportedDrivers[currentDriverIndex];
                        currentDriverIndex++;

                        self._dbInfo = null;
                        self._ready = null;

                        return self.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
                    }

                    setDriverToConfig();
                    var error = new Error('No available storage method found.');
                    self._driverSet = Promise$1.reject(error);
                    return self._driverSet;
                }

                return driverPromiseLoop();
            };
        }

        // There might be a driver initialization in progress
        // so wait for it to finish in order to avoid a possible
        // race condition to set _dbInfo
        var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function () {
            return Promise$1.resolve();
        }) : Promise$1.resolve();

        this._driverSet = oldDriverSetDone.then(function () {
            var driverName = supportedDrivers[0];
            self._dbInfo = null;
            self._ready = null;

            return self.getDriver(driverName).then(function (driver) {
                self._driver = driver._driver;
                setDriverToConfig();
                self._wrapLibraryMethodsWithReady();
                self._initDriver = initDriver(supportedDrivers);
            });
        })["catch"](function () {
            setDriverToConfig();
            var error = new Error('No available storage method found.');
            self._driverSet = Promise$1.reject(error);
            return self._driverSet;
        });

        executeTwoCallbacks(this._driverSet, callback, errorCallback);
        return this._driverSet;
    };

    LocalForage.prototype.supports = function supports(driverName) {
        return !!DriverSupport[driverName];
    };

    LocalForage.prototype._extend = function _extend(libraryMethodsAndProperties) {
        extend(this, libraryMethodsAndProperties);
    };

    LocalForage.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
        var supportedDrivers = [];
        for (var i = 0, len = drivers.length; i < len; i++) {
            var driverName = drivers[i];
            if (this.supports(driverName)) {
                supportedDrivers.push(driverName);
            }
        }
        return supportedDrivers;
    };

    LocalForage.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
        // Add a stub for each driver API method that delays the call to the
        // corresponding driver method until localForage is ready. These stubs
        // will be replaced by the driver methods as soon as the driver is
        // loaded, so there is no performance impact.
        for (var i = 0, len = LibraryMethods.length; i < len; i++) {
            callWhenReady(this, LibraryMethods[i]);
        }
    };

    LocalForage.prototype.createInstance = function createInstance(options) {
        return new LocalForage(options);
    };

    return LocalForage;
}();

// The actual localForage object that we expose as a module or via a
// global. It's extended by pulling in one of our other libraries.


var localforage_js = new LocalForage();

module.exports = localforage_js;

},{"3":3}]},{},[4])(4)
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/controller/controller.ts":
/*!**************************************!*\
  !*** ./src/controller/controller.ts ***!
  \**************************************/
/*! exports provided: Controller */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Controller", function() { return Controller; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Controller =
/*#__PURE__*/
function () {
  function Controller() {
    var _this = this;

    _classCallCheck(this, Controller);

    _defineProperty(this, "keys", {
      ArrowUp: false,
      ArrowDown: false,
      ArrowRight: false,
      ArrowLeft: false
    });

    document.addEventListener('keydown', function (e) {
      return _this.onKeyDown(e);
    });
    document.addEventListener('keyup', function (e) {
      return _this.onKeyUp(e);
    });
  }

  _createClass(Controller, [{
    key: "onKeyDown",
    value: function onKeyDown(event) {
      this.keys[event.key] = true;
    }
  }, {
    key: "onKeyUp",
    value: function onKeyUp(event) {
      this.keys[event.key] = false;
    }
  }, {
    key: "up",
    get: function get() {
      return this.keys.ArrowUp;
    },
    set: function set(change) {
      this.keys.ArrowUp = change;
    }
  }, {
    key: "down",
    get: function get() {
      return this.keys.ArrowDown;
    },
    set: function set(change) {
      this.keys.ArrowDown = change;
    }
  }, {
    key: "right",
    get: function get() {
      return this.keys.ArrowRight;
    },
    set: function set(change) {
      this.keys.ArrowRight = change;
    }
  }, {
    key: "left",
    get: function get() {
      return this.keys.ArrowLeft;
    },
    set: function set(change) {
      this.keys.ArrowLeft = change;
    }
  }]);

  return Controller;
}();

/***/ }),

/***/ "./src/game/apple/apple.ts":
/*!*********************************!*\
  !*** ./src/game/apple/apple.ts ***!
  \*********************************/
/*! exports provided: Apple */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Apple", function() { return Apple; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Apple =
/*#__PURE__*/
function () {
  function Apple() {
    _classCallCheck(this, Apple);
  }

  _createClass(Apple, null, [{
    key: "addApple",
    value: function addApple(array) {
      var col = Math.floor(Math.random() * 20);
      var row = Math.floor(Math.random() * 20);
      var apple = [col, row];

      if (array[apple[0]][apple[1]] === 1) {
        console.log('apple hit snake');
        return this.addApple(array);
      } else if ((col || row) >= 20) {
        return this.addApple(array);
      }

      array[apple[0]][apple[1]] = 2;
      return apple;
    }
  }]);

  return Apple;
}();

/***/ }),

/***/ "./src/game/canvas/canvas.ts":
/*!***********************************!*\
  !*** ./src/game/canvas/canvas.ts ***!
  \***********************************/
/*! exports provided: Canvas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Canvas", function() { return Canvas; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Canvas =
/*#__PURE__*/
function () {
  function Canvas(color) {
    _classCallCheck(this, Canvas);

    this.color = color;

    _defineProperty(this, "canvas", document.createElement('canvas'));

    _defineProperty(this, "x", 0);

    _defineProperty(this, "y", 0);

    this.canvas.height = window.innerHeight * 0.8;
    this.canvas.width = this.canvas.height;
  }

  _createClass(Canvas, [{
    key: "render",
    value: function render(ctx) {
      this.canvas.id = 'canvas';
      ctx.fillStyle = this.color || 'transparent';
      ctx.fillRect(this.x, this.y, this.canvas.width, this.canvas.height);
    }
  }, {
    key: "background",
    set: function set(color) {
      this.color = color;
    }
  }]);

  return Canvas;
}();

/***/ }),

/***/ "./src/game/game-state/game-state.ts":
/*!*******************************************!*\
  !*** ./src/game/game-state/game-state.ts ***!
  \*******************************************/
/*! exports provided: GameState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameState", function() { return GameState; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GameState =
/*#__PURE__*/
function () {
  function GameState(storage) {
    _classCallCheck(this, GameState);

    this.storage = storage;

    _defineProperty(this, "highScore", void 0);

    _defineProperty(this, "oldHighScore", void 0);

    _defineProperty(this, "isPlaying", true);

    _defineProperty(this, "score", 0);

    _defineProperty(this, "actualScore", 0);

    _defineProperty(this, "points", 20);

    _defineProperty(this, "storageKey", 'snakeHighScore');

    this.getStoredScore();
  }

  _createClass(GameState, [{
    key: "addPoints",
    value: function addPoints(el) {
      this.actualScore += this.points;
      this.incrementScore(el);
    }
  }, {
    key: "gameOver",
    value: function gameOver() {
      this.isPlaying = false;
      this.updateHighScore(this.actualScore);
    }
  }, {
    key: "incrementScore",
    value: function incrementScore(el) {
      var _this = this;

      var interval = setInterval(function () {
        if (_this.score < _this.actualScore) {
          _this.score++;

          _this.updateScore(el);
        } else {
          clearInterval(interval);
        }
      }, 50);
    }
  }, {
    key: "reset",
    value: function reset(el) {
      this.actualScore = 0;
      this.score = 0;
      this.updateScore(el);
    }
  }, {
    key: "startGame",
    value: function startGame() {
      this.isPlaying = true;
    }
  }, {
    key: "getStoredScore",
    value: function getStoredScore() {
      var _this2 = this;

      if (this.storage.isReady) {
        this.storage.getItem(this.storageKey).then(function (score) {
          _this2.highScore = score;
        });
      } else {
        setTimeout(function () {
          return _this2.getStoredScore();
        }, 500);
      }
    }
  }, {
    key: "isHigher",
    value: function isHigher(num) {
      return num > this.highScore;
    }
  }, {
    key: "updateHighScore",
    value: function updateHighScore(num) {
      if (this.isHigher(num)) {
        this.oldHighScore = this.highScore;
        this.highScore = num;
        this.updateStorage(num);
      }
    }
  }, {
    key: "updateScore",
    value: function updateScore(el) {
      el.innerHTML = this.score.toString();
    }
  }, {
    key: "updateStorage",
    value: function updateStorage(num) {
      var _this3 = this;

      this.storage.remove(this.storageKey).then(function () {
        return _this3.storage.setItem(_this3.storageKey, num);
      });
    }
  }]);

  return GameState;
}();

/***/ }),

/***/ "./src/game/grid/grid.ts":
/*!*******************************!*\
  !*** ./src/game/grid/grid.ts ***!
  \*******************************/
/*! exports provided: Grid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Grid", function() { return Grid; });
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Grid =
/*#__PURE__*/
function () {
  function Grid(colsAndRows, ctx) {
    _classCallCheck(this, Grid);

    this.colsAndRows = colsAndRows;
    this.ctx = ctx;

    _defineProperty(this, "map", []);

    _defineProperty(this, "width", void 0);

    _defineProperty(this, "background", void 0);

    _defineProperty(this, "snake", void 0);

    _defineProperty(this, "apple", void 0);

    this.width = ctx.canvas.width;

    for (var i = 0; i < colsAndRows; i++) {
      this.map[i] = new Array(colsAndRows).fill(0);
    }
  }

  _createClass(Grid, [{
    key: "render",
    value: function render(ctx) {
      var size = this.size;

      var map = _toConsumableArray(this.map);

      for (var col = 0; col < this.cols; col++) {
        for (var row = 0; row < this.rows; row++) {
          if (map[col][row] === 0) {
            ctx.fillStyle = this.background;
            ctx.fillRect(col * size, row * size, size, size);
          } else if (this.map[col][row] === 1) {
            ctx.fillStyle = this.snake;
            ctx.fillRect(col * size + 1, row * size + 1, size - 2, size - 2);
          } else if (this.map[col][row] === 2) {
            ctx.fillStyle = this.apple;
            ctx.fillRect(col * size + 2, row * size + 2, size - 4, size - 4);
          }
        }
      }

      this.map = map;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.map = [];

      for (var i = 0; i < this.colsAndRows; i++) {
        this.map[i] = new Array(this.colsAndRows).fill(0);
      }
    }
  }, {
    key: "updateWidth",
    value: function updateWidth(canvas) {
      this.width = canvas.width;
    }
  }, {
    key: "cols",
    get: function get() {
      return this.colsAndRows;
    }
  }, {
    key: "rows",
    get: function get() {
      return this.colsAndRows;
    }
  }, {
    key: "size",
    get: function get() {
      return this.width / this.colsAndRows;
    }
  }, {
    key: "colors",
    set: function set(_ref) {
      var args = _extends({}, _ref);

      this.background = args.dark;
      this.snake = args.light;
      this.apple = args.apple;
    }
  }]);

  return Grid;
}();

/***/ }),

/***/ "./src/game/index.ts":
/*!***************************!*\
  !*** ./src/game/index.ts ***!
  \***************************/
/*! exports provided: GameState, Canvas, Grid, Snake, Apple */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _canvas_canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas/canvas */ "./src/game/canvas/canvas.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Canvas", function() { return _canvas_canvas__WEBPACK_IMPORTED_MODULE_0__["Canvas"]; });

/* harmony import */ var _grid_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./grid/grid */ "./src/game/grid/grid.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Grid", function() { return _grid_grid__WEBPACK_IMPORTED_MODULE_1__["Grid"]; });

/* harmony import */ var _snake_snake__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./snake/snake */ "./src/game/snake/snake.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Snake", function() { return _snake_snake__WEBPACK_IMPORTED_MODULE_2__["Snake"]; });

/* harmony import */ var _apple_apple__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./apple/apple */ "./src/game/apple/apple.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Apple", function() { return _apple_apple__WEBPACK_IMPORTED_MODULE_3__["Apple"]; });

/* harmony import */ var _game_state_game_state__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./game-state/game-state */ "./src/game/game-state/game-state.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GameState", function() { return _game_state_game_state__WEBPACK_IMPORTED_MODULE_4__["GameState"]; });







/***/ }),

/***/ "./src/game/snake/snake.ts":
/*!*********************************!*\
  !*** ./src/game/snake/snake.ts ***!
  \*********************************/
/*! exports provided: Snake */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Snake", function() { return Snake; });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Snake =
/*#__PURE__*/
function () {
  function Snake(size) {
    _classCallCheck(this, Snake);

    this.size = size;

    _defineProperty(this, "body", void 0);

    _defineProperty(this, "head", void 0);

    _defineProperty(this, "tail", void 0);

    _defineProperty(this, "bodyStart", [[10, 10], [9, 10]]);

    _defineProperty(this, "dir", {
      up: false,
      down: false,
      left: false,
      right: true
    });

    _defineProperty(this, "velocity", 1);

    this.head = this.bodyStart[0];
    this.tail = this.bodyStart[1];
    this.body = this.bodyStart;
  }

  _createClass(Snake, [{
    key: "eat",
    value: function eat() {
      this.body = [].concat(_toConsumableArray(this.body), [this.tail]);
    }
  }, {
    key: "move",
    value: function move() {
      if (this.dir.up) {
        this.updateSnake('y', 'up');
      }

      if (this.dir.down) {
        this.updateSnake('y', 'down');
      }

      if (this.dir.right) {
        this.updateSnake('x', 'right');
      }

      if (this.dir.left) {
        this.updateSnake('x', 'left');
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      this.head = this.bodyStart[0];
      this.tail = this.bodyStart[1];
      this.body = this.bodyStart;
      this.changeDirection('right');
    }
  }, {
    key: "setDir",
    value: function setDir(controller) {
      if (controller.up && !this.dir.down) {
        this.changeDirection('up');
      }

      if (controller.down && !this.dir.up) {
        this.changeDirection('down');
      }

      if (controller.right && !this.dir.left) {
        this.changeDirection('right');
      }

      if (controller.left && !this.dir.right) {
        this.changeDirection('left');
      }
    }
  }, {
    key: "changeDirection",
    value: function changeDirection(direction) {
      var _this = this;

      Object.keys(this.dir).map(function (key) {
        key === direction ? _this.dir[direction] = true : _this.dir[key] = false;
      });
    }
  }, {
    key: "updateSnake",
    value: function updateSnake(axis, dir) {
      var index = axis === 'y' ? 1 : 0;
      var direction = dir === 'right' || dir === 'down' ? this.velocity : -this.velocity;

      var newBody = _toConsumableArray(this.body);

      this.tail = newBody.pop();

      var newHead = _toConsumableArray(this.head);

      newHead[index] += direction;
      this.head = _toConsumableArray(newHead);
      this.body = [this.head].concat(_toConsumableArray(newBody));
    }
  }]);

  return Snake;
}();

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_game_state_game_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game/game-state/game-state */ "./src/game/game-state/game-state.ts");
/* harmony import */ var _controller_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controller/controller */ "./src/controller/controller.ts");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game */ "./src/game/index.ts");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./storage */ "./src/storage/index.ts");
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./themes */ "./src/themes/index.ts");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }






var storage = new _storage__WEBPACK_IMPORTED_MODULE_3__["Storage"]('__snake_game');
var c = new _game__WEBPACK_IMPORTED_MODULE_2__["Canvas"](_themes__WEBPACK_IMPORTED_MODULE_4__["blue"].dark);
var ctx = c.canvas.getContext('2d');
var controller = new _controller_controller__WEBPACK_IMPORTED_MODULE_1__["Controller"]();
var state = new _game_game_state_game_state__WEBPACK_IMPORTED_MODULE_0__["GameState"](storage);
var cols = 20;
var maxTimeStep = 4;
var startingTimeStep = 30;
var grid = new _game__WEBPACK_IMPORTED_MODULE_2__["Grid"](cols, ctx);
var snake = new _game__WEBPACK_IMPORTED_MODULE_2__["Snake"](grid.size);
var gameTime = 0;
var fps = startingTimeStep;
var timeStep = 1000 / fps;
var apple;
var score;
var menu;
var startBtn;
var settings;
var highScore;
var loop;

var draw = function draw() {
  c.render(ctx);
  grid.render(ctx);
};

var updateTimeStep = function updateTimeStep(fps) {
  if (timeStep >= maxTimeStep) {
    timeStep = 1000 / fps;
  }
};

var updateHighScore = function updateHighScore(score) {
  highScore.innerText = score.toString();
};

var gameOver = function gameOver() {
  state.gameOver();
  cancelAnimationFrame(loop);
  menu.className = 'menu slide-in';
  updateHighScore(state.highScore);
};

var startGame = function startGame() {
  grid.reset();
  snake.reset();
  state.reset(score);
  apple = null;
  state.startGame();
  menu.className = 'menu slide-out';
  fps = startingTimeStep;
  updateTimeStep(fps);
  gameTime = 0;
  gameLoop();
};

var gameLoop = function gameLoop() {
  if (!state.isPlaying) {
    return;
  } // Update game if enough time has ellapsed


  if (gameTime >= timeStep) {
    snake.move(); // Make the tail's index the background color

    grid.map[snake.tail[0]][snake.tail[1]] = 0; // If any of these fail, GAME OVER!

    try {
      // Check if snake hits itself
      if (grid.map[snake.head[0]][snake.head[1]] === 1 || snake.head[1] < 0 || snake.head[1] >= 20) {
        throw Error();
      } // Check if snake eats apple


      if (grid.map[snake.head[0]][snake.head[1]] === 2) {
        state.addPoints(score);
        snake.eat();
        apple = null;
        updateTimeStep(fps += 4);
      } // Check if snake hits itself


      if (grid.map[snake.head[0]][snake.head[1]] === 1) {
        throw Error();
      } // Draw the snake


      for (var i = 0; i < snake.body.length; i++) {
        var col = snake.body[i][0];
        var row = snake.body[i][1];
        grid.map[col][row] = 1;
      }
    } catch (e) {
      gameOver();
    } // Add a new apple if it's gone


    if (!apple) {
      apple = _game__WEBPACK_IMPORTED_MODULE_2__["Apple"].addApple(grid.map);
    }

    gameTime = 0;
  }

  gameTime++;
  snake.setDir(controller);
  draw();
  requestAnimationFrame(gameLoop);
};

var getTheme = function getTheme() {
  storage.getItem('theme').then(function (theme) {
    if (theme) {
      setTheme(theme);
    } else {
      setTheme(_themes__WEBPACK_IMPORTED_MODULE_4__["green"]);
    }
  });
};

var showButtons = function showButtons() {
  var div = document.querySelector('.mobile-controls');
  div.style.opacity = '1';
};

var hideButtons = function hideButtons() {
  var div = document.querySelector('.mobile-controls');
  div.style.opacity = '0';
};

var resizeCanvas = function resizeCanvas() {
  var h = window.innerHeight * 0.85;
  var innerW = window.innerWidth;

  if (h >= innerW) {
    c.canvas.height = innerW * 0.9;
    showButtons();
  } else {
    c.canvas.height = window.innerHeight * 0.85;
    hideButtons();
  }

  c.canvas.width = c.canvas.height;
  ctx.canvas.height = c.canvas.height;
  ctx.canvas.width = c.canvas.width;
  grid.updateWidth(c.canvas);
  c.render(ctx);
};

var setTheme = function setTheme(_ref) {
  var args = _extends({}, _ref);

  var dark = args.dark,
      light = args.light;
  storage.remove('theme').then(function () {
    return storage.setItem('theme', args);
  });
  grid.colors = args;
  c.background = dark;
  document.body.style.background = light;
  menu.style.background = light;
  score.style.color = dark;
  startBtn.style.background = dark;
  c.render(ctx);
};

var storageReady = function storageReady() {
  if (storage.isReady) {
    menu.className = 'menu slide-in';
    storage.getItem('snakeHighScore').then(function (score) {
      updateHighScore(score);
    });
  } else {
    setTimeout(function () {
      return storageReady();
    }, 300);
  }
};

window.onload = function () {
  storage.setup();
  resizeCanvas();
  document.body.appendChild(c.canvas);
  score = document.querySelector('.score');
  score.innerHTML = state.score.toString();
  menu = document.querySelector('.menu');
  storageReady();
  highScore = document.querySelector('span');
  settings = document.querySelector('.settings');
  Object(_themes__WEBPACK_IMPORTED_MODULE_4__["addThemes"])(settings, setTheme, _themes__WEBPACK_IMPORTED_MODULE_4__["blue"], _themes__WEBPACK_IMPORTED_MODULE_4__["green"], _themes__WEBPACK_IMPORTED_MODULE_4__["purple"]);
  startBtn = document.querySelector('button');
  startBtn.addEventListener('click', function () {
    return startGame();
  });
  window.addEventListener('resize', resizeCanvas);
  touchControls('up');
  touchControls('down');
  touchControls('right');
  touchControls('left');
  getTheme();
  c.render(ctx);
  loop = gameLoop;
};

var touchControls = function touchControls(direction) {
  var control = document.getElementById(direction);
  control.addEventListener('touchstart', function () {
    controller[direction] = true;
  });
  control.addEventListener('touchend', function () {
    controller[direction] = false;
  });
};

/***/ }),

/***/ "./src/storage/index.ts":
/*!******************************!*\
  !*** ./src/storage/index.ts ***!
  \******************************/
/*! exports provided: Storage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ "./src/storage/storage.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Storage", function() { return _storage__WEBPACK_IMPORTED_MODULE_0__["Storage"]; });



/***/ }),

/***/ "./src/storage/storage.ts":
/*!********************************!*\
  !*** ./src/storage/storage.ts ***!
  \********************************/
/*! exports provided: Storage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Storage", function() { return Storage; });
/* harmony import */ var localforage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! localforage */ "./node_modules/localforage/dist/localforage.js");
/* harmony import */ var localforage__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(localforage__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var Storage =
/*#__PURE__*/
function () {
  function Storage(_name) {
    _classCallCheck(this, Storage);

    this._name = _name;

    _defineProperty(this, "isReady", false);

    _defineProperty(this, "config", {
      name: 'Snake',
      version: 1.0,
      storeName: null
    });

    _defineProperty(this, "storage", localforage__WEBPACK_IMPORTED_MODULE_0___default.a);

    this.config.storeName = _name;
  }

  _createClass(Storage, [{
    key: "setItem",
    value: function setItem(key, value) {
      return this.storage.setItem(key, value);
    }
  }, {
    key: "getItem",
    value: function getItem(key) {
      return this.storage.getItem(key);
    }
  }, {
    key: "remove",
    value: function remove(key) {
      return this.storage.removeItem(key);
    }
  }, {
    key: "keys",
    value: function keys() {
      return this.storage.keys();
    }
  }, {
    key: "all",
    value: function all() {
      var store = [];
      return this.storage.iterate(function (value) {
        store.push(value);
      }).then(function () {
        return store;
      });
    }
  }, {
    key: "setup",
    value: function setup() {
      var _this = this;

      this.storage.config(this.config);

      try {
        this.storage.ready().then(function () {
          return _this.storage.setDriver([_this.storage.INDEXEDDB, _this.storage.WEBSQL]);
        }).then(function () {
          return _this.isReady = true;
        }).catch(function () {
          throw Error('Could not initialize storage');
        });
      } catch (e) {
        console.log(e);
      }
    }
  }]);

  return Storage;
}();

/***/ }),

/***/ "./src/themes/index.ts":
/*!*****************************!*\
  !*** ./src/themes/index.ts ***!
  \*****************************/
/*! exports provided: green, blue, purple, addThemes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./themes */ "./src/themes/themes.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "green", function() { return _themes__WEBPACK_IMPORTED_MODULE_0__["green"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "blue", function() { return _themes__WEBPACK_IMPORTED_MODULE_0__["blue"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "purple", function() { return _themes__WEBPACK_IMPORTED_MODULE_0__["purple"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "addThemes", function() { return _themes__WEBPACK_IMPORTED_MODULE_0__["addThemes"]; });



/***/ }),

/***/ "./src/themes/themes.ts":
/*!******************************!*\
  !*** ./src/themes/themes.ts ***!
  \******************************/
/*! exports provided: green, blue, purple, addThemes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "green", function() { return green; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blue", function() { return blue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "purple", function() { return purple; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addThemes", function() { return addThemes; });
var green = {
  name: 'green',
  dark: '#002011',
  light: '#007A3F',
  apple: '#AF2D00'
};
var blue = {
  name: 'blue',
  dark: '#00121E',
  light: '#024570',
  apple: '#AF2D00'
};
var purple = {
  name: 'purple',
  dark: '#16001F',
  light: '#530174',
  apple: '#A4AD00'
};
var addThemes = function addThemes(el, listener) {
  for (var _len = arguments.length, themes = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    themes[_key - 2] = arguments[_key];
  }

  themes.forEach(function (theme) {
    var div = document.createElement('div');
    div.style.background = theme.light;
    div.style.width = '25px';
    div.setAttribute('name', theme.name);
    div.addEventListener('click', function () {
      return listener(theme);
    });
    el.appendChild(div);
  });
};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvY2FsZm9yYWdlL2Rpc3QvbG9jYWxmb3JhZ2UuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udHJvbGxlci9jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9nYW1lL2FwcGxlL2FwcGxlLnRzIiwid2VicGFjazovLy8uL3NyYy9nYW1lL2NhbnZhcy9jYW52YXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvZ2FtZS1zdGF0ZS9nYW1lLXN0YXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9nYW1lL2dyaWQvZ3JpZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9zbmFrZS9zbmFrZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JhZ2UvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JhZ2Uvc3RvcmFnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdGhlbWVzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy90aGVtZXMvdGhlbWVzLnRzIl0sIm5hbWVzIjpbIkNvbnRyb2xsZXIiLCJBcnJvd1VwIiwiQXJyb3dEb3duIiwiQXJyb3dSaWdodCIsIkFycm93TGVmdCIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJvbktleURvd24iLCJvbktleVVwIiwiZXZlbnQiLCJrZXlzIiwia2V5IiwiY2hhbmdlIiwiQXBwbGUiLCJhcnJheSIsImNvbCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInJvdyIsImFwcGxlIiwiY29uc29sZSIsImxvZyIsImFkZEFwcGxlIiwiQ2FudmFzIiwiY29sb3IiLCJjcmVhdGVFbGVtZW50IiwiY2FudmFzIiwiaGVpZ2h0Iiwid2luZG93IiwiaW5uZXJIZWlnaHQiLCJ3aWR0aCIsImN0eCIsImlkIiwiZmlsbFN0eWxlIiwiZmlsbFJlY3QiLCJ4IiwieSIsIkdhbWVTdGF0ZSIsInN0b3JhZ2UiLCJnZXRTdG9yZWRTY29yZSIsImVsIiwiYWN0dWFsU2NvcmUiLCJwb2ludHMiLCJpbmNyZW1lbnRTY29yZSIsImlzUGxheWluZyIsInVwZGF0ZUhpZ2hTY29yZSIsImludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJzY29yZSIsInVwZGF0ZVNjb3JlIiwiY2xlYXJJbnRlcnZhbCIsImlzUmVhZHkiLCJnZXRJdGVtIiwic3RvcmFnZUtleSIsInRoZW4iLCJoaWdoU2NvcmUiLCJzZXRUaW1lb3V0IiwibnVtIiwiaXNIaWdoZXIiLCJvbGRIaWdoU2NvcmUiLCJ1cGRhdGVTdG9yYWdlIiwiaW5uZXJIVE1MIiwidG9TdHJpbmciLCJyZW1vdmUiLCJzZXRJdGVtIiwiR3JpZCIsImNvbHNBbmRSb3dzIiwiaSIsIm1hcCIsIkFycmF5IiwiZmlsbCIsInNpemUiLCJjb2xzIiwicm93cyIsImJhY2tncm91bmQiLCJzbmFrZSIsImFyZ3MiLCJkYXJrIiwibGlnaHQiLCJTbmFrZSIsInVwIiwiZG93biIsImxlZnQiLCJyaWdodCIsImhlYWQiLCJib2R5U3RhcnQiLCJ0YWlsIiwiYm9keSIsImRpciIsInVwZGF0ZVNuYWtlIiwiY2hhbmdlRGlyZWN0aW9uIiwiY29udHJvbGxlciIsImRpcmVjdGlvbiIsIk9iamVjdCIsImF4aXMiLCJpbmRleCIsInZlbG9jaXR5IiwibmV3Qm9keSIsInBvcCIsIm5ld0hlYWQiLCJTdG9yYWdlIiwiYyIsImJsdWUiLCJnZXRDb250ZXh0Iiwic3RhdGUiLCJtYXhUaW1lU3RlcCIsInN0YXJ0aW5nVGltZVN0ZXAiLCJncmlkIiwiZ2FtZVRpbWUiLCJmcHMiLCJ0aW1lU3RlcCIsIm1lbnUiLCJzdGFydEJ0biIsInNldHRpbmdzIiwibG9vcCIsImRyYXciLCJyZW5kZXIiLCJ1cGRhdGVUaW1lU3RlcCIsImlubmVyVGV4dCIsImdhbWVPdmVyIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJjbGFzc05hbWUiLCJzdGFydEdhbWUiLCJyZXNldCIsImdhbWVMb29wIiwibW92ZSIsIkVycm9yIiwiYWRkUG9pbnRzIiwiZWF0IiwibGVuZ3RoIiwic2V0RGlyIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiZ2V0VGhlbWUiLCJ0aGVtZSIsInNldFRoZW1lIiwiZ3JlZW4iLCJzaG93QnV0dG9ucyIsImRpdiIsInF1ZXJ5U2VsZWN0b3IiLCJzdHlsZSIsIm9wYWNpdHkiLCJoaWRlQnV0dG9ucyIsInJlc2l6ZUNhbnZhcyIsImgiLCJpbm5lclciLCJpbm5lcldpZHRoIiwidXBkYXRlV2lkdGgiLCJjb2xvcnMiLCJzdG9yYWdlUmVhZHkiLCJvbmxvYWQiLCJzZXR1cCIsImFwcGVuZENoaWxkIiwiYWRkVGhlbWVzIiwicHVycGxlIiwidG91Y2hDb250cm9scyIsImNvbnRyb2wiLCJnZXRFbGVtZW50QnlJZCIsIl9uYW1lIiwibmFtZSIsInZlcnNpb24iLCJzdG9yZU5hbWUiLCJsb2NhbEZvcmFnZSIsImNvbmZpZyIsInZhbHVlIiwicmVtb3ZlSXRlbSIsInN0b3JlIiwiaXRlcmF0ZSIsInB1c2giLCJyZWFkeSIsInNldERyaXZlciIsIklOREVYRUREQiIsIldFQlNRTCIsImNhdGNoIiwibGlzdGVuZXIiLCJ0aGVtZXMiLCJmb3JFYWNoIiwic2V0QXR0cmlidXRlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxHQUFHLElBQXNELEVBQUUsbUJBQW1CLEtBQUssVUFBb08sQ0FBQyxhQUFhLDBCQUEwQiwwQkFBMEIsZ0JBQWdCLFVBQVUsVUFBVSwwQ0FBMEMsZ0JBQWdCLE9BQUMsT0FBTyxvQkFBb0IsOENBQThDLHFDQUFxQyxZQUFZLFlBQVksbUNBQW1DLGlCQUFpQixnQkFBZ0Isc0JBQXNCLG9CQUFvQiwwQ0FBMEMsWUFBWSxXQUFXLFlBQVksU0FBUyxHQUFHO0FBQ2x6QjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUEsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyxxSUFBcUk7QUFDdEksQ0FBQyxHQUFHO0FBQ0o7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBLENBQUMsRUFBRSxNQUFNO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLHFJQUFxSTtBQUN0SSxDQUFDLEVBQUUsTUFBTTtBQUNUOztBQUVBLG9HQUFvRyxtQkFBbUIsRUFBRSxtQkFBbUIsOEhBQThIOztBQUUxUSxpREFBaUQsMENBQTBDLDBEQUEwRCxFQUFFOztBQUV2SjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGtCQUFrQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixZQUFZO0FBQy9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wscUJBQXFCO0FBQ3JCLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1QsS0FBSzs7QUFFTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVCxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVCxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNB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Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0REFBNEQ7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLGlCQUFpQjtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLFlBQVk7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsWUFBWTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsaURBQWlELFFBQVE7QUFDekQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsc0JBQXNCO0FBQ3pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1Q0FBdUM7QUFDdkMsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUVBQW1FO0FBQ25FOztBQUVBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkVBQTZFOztBQUU3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyREFBMkQsU0FBUztBQUNwRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx5RUFBeUUsV0FBVztBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNB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WSxDQUFkO0FBT0EsSUFBTW1GLElBQUksR0FBRztBQUNsQndELE1BQUksRUFBRSxNQURZO0FBRWxCakYsTUFBSSxFQUFFLFNBRlk7QUFHbEJDLE9BQUssRUFBRSxTQUhXO0FBSWxCM0QsT0FBSyxFQUFFO0FBSlcsQ0FBYjtBQU9BLElBQU1zSSxNQUFNLEdBQUc7QUFDcEJLLE1BQUksRUFBRSxRQURjO0FBRXBCakYsTUFBSSxFQUFFLFNBRmM7QUFHcEJDLE9BQUssRUFBRSxTQUhhO0FBSXBCM0QsT0FBSyxFQUFFO0FBSmEsQ0FBZjtBQU9BLElBQU1xSSxTQUFTLEdBQUcsU0FBWkEsU0FBWSxDQUFDaEgsRUFBRCxFQUFrQnFJLFFBQWxCLEVBQTBDO0FBQUEsb0NBQVhDLE1BQVc7QUFBWEEsVUFBVztBQUFBOztBQUNqRUEsUUFBTSxDQUFDQyxPQUFQLENBQWUsVUFBQTFDLEtBQUssRUFBSTtBQUN0QixRQUFNSSxHQUFHLEdBQUd0SSxRQUFRLENBQUNzQixhQUFULENBQXVCLEtBQXZCLENBQVo7QUFFQWdILE9BQUcsQ0FBQ0UsS0FBSixDQUFVakUsVUFBVixHQUF1QjJELEtBQUssQ0FBQ3ZELEtBQTdCO0FBQ0EyRCxPQUFHLENBQUNFLEtBQUosQ0FBVTdHLEtBQVYsR0FBa0IsTUFBbEI7QUFDQTJHLE9BQUcsQ0FBQ3VDLFlBQUosQ0FBaUIsTUFBakIsRUFBeUIzQyxLQUFLLENBQUN5QixJQUEvQjtBQUNBckIsT0FBRyxDQUFDckksZ0JBQUosQ0FBcUIsT0FBckIsRUFBOEI7QUFBQSxhQUFNeUssUUFBUSxDQUFDeEMsS0FBRCxDQUFkO0FBQUEsS0FBOUI7QUFFQTdGLE1BQUUsQ0FBQytHLFdBQUgsQ0FBZWQsR0FBZjtBQUNELEdBVEQ7QUFVRCxDQVhNLEMiLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCIvKiFcbiAgICBsb2NhbEZvcmFnZSAtLSBPZmZsaW5lIFN0b3JhZ2UsIEltcHJvdmVkXG4gICAgVmVyc2lvbiAxLjcuM1xuICAgIGh0dHBzOi8vbG9jYWxmb3JhZ2UuZ2l0aHViLmlvL2xvY2FsRm9yYWdlXG4gICAgKGMpIDIwMTMtMjAxNyBNb3ppbGxhLCBBcGFjaGUgTGljZW5zZSAyLjBcbiovXG4oZnVuY3Rpb24oZil7aWYodHlwZW9mIGV4cG9ydHM9PT1cIm9iamVjdFwiJiZ0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIil7bW9kdWxlLmV4cG9ydHM9ZigpfWVsc2UgaWYodHlwZW9mIGRlZmluZT09PVwiZnVuY3Rpb25cIiYmZGVmaW5lLmFtZCl7ZGVmaW5lKFtdLGYpfWVsc2V7dmFyIGc7aWYodHlwZW9mIHdpbmRvdyE9PVwidW5kZWZpbmVkXCIpe2c9d2luZG93fWVsc2UgaWYodHlwZW9mIGdsb2JhbCE9PVwidW5kZWZpbmVkXCIpe2c9Z2xvYmFsfWVsc2UgaWYodHlwZW9mIHNlbGYhPT1cInVuZGVmaW5lZFwiKXtnPXNlbGZ9ZWxzZXtnPXRoaXN9Zy5sb2NhbGZvcmFnZSA9IGYoKX19KShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyAoZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLCBmKX12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcbnZhciBNdXRhdGlvbiA9IGdsb2JhbC5NdXRhdGlvbk9ic2VydmVyIHx8IGdsb2JhbC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyO1xuXG52YXIgc2NoZWR1bGVEcmFpbjtcblxue1xuICBpZiAoTXV0YXRpb24pIHtcbiAgICB2YXIgY2FsbGVkID0gMDtcbiAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb24obmV4dFRpY2spO1xuICAgIHZhciBlbGVtZW50ID0gZ2xvYmFsLmRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgICBvYnNlcnZlci5vYnNlcnZlKGVsZW1lbnQsIHtcbiAgICAgIGNoYXJhY3RlckRhdGE6IHRydWVcbiAgICB9KTtcbiAgICBzY2hlZHVsZURyYWluID0gZnVuY3Rpb24gKCkge1xuICAgICAgZWxlbWVudC5kYXRhID0gKGNhbGxlZCA9ICsrY2FsbGVkICUgMik7XG4gICAgfTtcbiAgfSBlbHNlIGlmICghZ2xvYmFsLnNldEltbWVkaWF0ZSAmJiB0eXBlb2YgZ2xvYmFsLk1lc3NhZ2VDaGFubmVsICE9PSAndW5kZWZpbmVkJykge1xuICAgIHZhciBjaGFubmVsID0gbmV3IGdsb2JhbC5NZXNzYWdlQ2hhbm5lbCgpO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbmV4dFRpY2s7XG4gICAgc2NoZWR1bGVEcmFpbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoMCk7XG4gICAgfTtcbiAgfSBlbHNlIGlmICgnZG9jdW1lbnQnIGluIGdsb2JhbCAmJiAnb25yZWFkeXN0YXRlY2hhbmdlJyBpbiBnbG9iYWwuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0JykpIHtcbiAgICBzY2hlZHVsZURyYWluID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAvLyBDcmVhdGUgYSA8c2NyaXB0PiBlbGVtZW50OyBpdHMgcmVhZHlzdGF0ZWNoYW5nZSBldmVudCB3aWxsIGJlIGZpcmVkIGFzeW5jaHJvbm91c2x5IG9uY2UgaXQgaXMgaW5zZXJ0ZWRcbiAgICAgIC8vIGludG8gdGhlIGRvY3VtZW50LiBEbyBzbywgdGh1cyBxdWV1aW5nIHVwIHRoZSB0YXNrLiBSZW1lbWJlciB0byBjbGVhbiB1cCBvbmNlIGl0J3MgYmVlbiBjYWxsZWQuXG4gICAgICB2YXIgc2NyaXB0RWwgPSBnbG9iYWwuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICBzY3JpcHRFbC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG5leHRUaWNrKCk7XG5cbiAgICAgICAgc2NyaXB0RWwub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcbiAgICAgICAgc2NyaXB0RWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHRFbCk7XG4gICAgICAgIHNjcmlwdEVsID0gbnVsbDtcbiAgICAgIH07XG4gICAgICBnbG9iYWwuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFwcGVuZENoaWxkKHNjcmlwdEVsKTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHNjaGVkdWxlRHJhaW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICBzZXRUaW1lb3V0KG5leHRUaWNrLCAwKTtcbiAgICB9O1xuICB9XG59XG5cbnZhciBkcmFpbmluZztcbnZhciBxdWV1ZSA9IFtdO1xuLy9uYW1lZCBuZXh0VGljayBmb3IgbGVzcyBjb25mdXNpbmcgc3RhY2sgdHJhY2VzXG5mdW5jdGlvbiBuZXh0VGljaygpIHtcbiAgZHJhaW5pbmcgPSB0cnVlO1xuICB2YXIgaSwgb2xkUXVldWU7XG4gIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gIHdoaWxlIChsZW4pIHtcbiAgICBvbGRRdWV1ZSA9IHF1ZXVlO1xuICAgIHF1ZXVlID0gW107XG4gICAgaSA9IC0xO1xuICAgIHdoaWxlICgrK2kgPCBsZW4pIHtcbiAgICAgIG9sZFF1ZXVlW2ldKCk7XG4gICAgfVxuICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgfVxuICBkcmFpbmluZyA9IGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGltbWVkaWF0ZTtcbmZ1bmN0aW9uIGltbWVkaWF0ZSh0YXNrKSB7XG4gIGlmIChxdWV1ZS5wdXNoKHRhc2spID09PSAxICYmICFkcmFpbmluZykge1xuICAgIHNjaGVkdWxlRHJhaW4oKTtcbiAgfVxufVxuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbn0se31dLDI6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xudmFyIGltbWVkaWF0ZSA9IF9kZXJlcV8oMSk7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5mdW5jdGlvbiBJTlRFUk5BTCgpIHt9XG5cbnZhciBoYW5kbGVycyA9IHt9O1xuXG52YXIgUkVKRUNURUQgPSBbJ1JFSkVDVEVEJ107XG52YXIgRlVMRklMTEVEID0gWydGVUxGSUxMRUQnXTtcbnZhciBQRU5ESU5HID0gWydQRU5ESU5HJ107XG5cbm1vZHVsZS5leHBvcnRzID0gUHJvbWlzZTtcblxuZnVuY3Rpb24gUHJvbWlzZShyZXNvbHZlcikge1xuICBpZiAodHlwZW9mIHJlc29sdmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncmVzb2x2ZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gIH1cbiAgdGhpcy5zdGF0ZSA9IFBFTkRJTkc7XG4gIHRoaXMucXVldWUgPSBbXTtcbiAgdGhpcy5vdXRjb21lID0gdm9pZCAwO1xuICBpZiAocmVzb2x2ZXIgIT09IElOVEVSTkFMKSB7XG4gICAgc2FmZWx5UmVzb2x2ZVRoZW5hYmxlKHRoaXMsIHJlc29sdmVyKTtcbiAgfVxufVxuXG5Qcm9taXNlLnByb3RvdHlwZVtcImNhdGNoXCJdID0gZnVuY3Rpb24gKG9uUmVqZWN0ZWQpIHtcbiAgcmV0dXJuIHRoaXMudGhlbihudWxsLCBvblJlamVjdGVkKTtcbn07XG5Qcm9taXNlLnByb3RvdHlwZS50aGVuID0gZnVuY3Rpb24gKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG4gIGlmICh0eXBlb2Ygb25GdWxmaWxsZWQgIT09ICdmdW5jdGlvbicgJiYgdGhpcy5zdGF0ZSA9PT0gRlVMRklMTEVEIHx8XG4gICAgdHlwZW9mIG9uUmVqZWN0ZWQgIT09ICdmdW5jdGlvbicgJiYgdGhpcy5zdGF0ZSA9PT0gUkVKRUNURUQpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICB2YXIgcHJvbWlzZSA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKElOVEVSTkFMKTtcbiAgaWYgKHRoaXMuc3RhdGUgIT09IFBFTkRJTkcpIHtcbiAgICB2YXIgcmVzb2x2ZXIgPSB0aGlzLnN0YXRlID09PSBGVUxGSUxMRUQgPyBvbkZ1bGZpbGxlZCA6IG9uUmVqZWN0ZWQ7XG4gICAgdW53cmFwKHByb21pc2UsIHJlc29sdmVyLCB0aGlzLm91dGNvbWUpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMucXVldWUucHVzaChuZXcgUXVldWVJdGVtKHByb21pc2UsIG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSk7XG4gIH1cblxuICByZXR1cm4gcHJvbWlzZTtcbn07XG5mdW5jdGlvbiBRdWV1ZUl0ZW0ocHJvbWlzZSwgb25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcbiAgdGhpcy5wcm9taXNlID0gcHJvbWlzZTtcbiAgaWYgKHR5cGVvZiBvbkZ1bGZpbGxlZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHRoaXMub25GdWxmaWxsZWQgPSBvbkZ1bGZpbGxlZDtcbiAgICB0aGlzLmNhbGxGdWxmaWxsZWQgPSB0aGlzLm90aGVyQ2FsbEZ1bGZpbGxlZDtcbiAgfVxuICBpZiAodHlwZW9mIG9uUmVqZWN0ZWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICB0aGlzLm9uUmVqZWN0ZWQgPSBvblJlamVjdGVkO1xuICAgIHRoaXMuY2FsbFJlamVjdGVkID0gdGhpcy5vdGhlckNhbGxSZWplY3RlZDtcbiAgfVxufVxuUXVldWVJdGVtLnByb3RvdHlwZS5jYWxsRnVsZmlsbGVkID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIGhhbmRsZXJzLnJlc29sdmUodGhpcy5wcm9taXNlLCB2YWx1ZSk7XG59O1xuUXVldWVJdGVtLnByb3RvdHlwZS5vdGhlckNhbGxGdWxmaWxsZWQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgdW53cmFwKHRoaXMucHJvbWlzZSwgdGhpcy5vbkZ1bGZpbGxlZCwgdmFsdWUpO1xufTtcblF1ZXVlSXRlbS5wcm90b3R5cGUuY2FsbFJlamVjdGVkID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIGhhbmRsZXJzLnJlamVjdCh0aGlzLnByb21pc2UsIHZhbHVlKTtcbn07XG5RdWV1ZUl0ZW0ucHJvdG90eXBlLm90aGVyQ2FsbFJlamVjdGVkID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHVud3JhcCh0aGlzLnByb21pc2UsIHRoaXMub25SZWplY3RlZCwgdmFsdWUpO1xufTtcblxuZnVuY3Rpb24gdW53cmFwKHByb21pc2UsIGZ1bmMsIHZhbHVlKSB7XG4gIGltbWVkaWF0ZShmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJldHVyblZhbHVlO1xuICAgIHRyeSB7XG4gICAgICByZXR1cm5WYWx1ZSA9IGZ1bmModmFsdWUpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBoYW5kbGVycy5yZWplY3QocHJvbWlzZSwgZSk7XG4gICAgfVxuICAgIGlmIChyZXR1cm5WYWx1ZSA9PT0gcHJvbWlzZSkge1xuICAgICAgaGFuZGxlcnMucmVqZWN0KHByb21pc2UsIG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCByZXNvbHZlIHByb21pc2Ugd2l0aCBpdHNlbGYnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhhbmRsZXJzLnJlc29sdmUocHJvbWlzZSwgcmV0dXJuVmFsdWUpO1xuICAgIH1cbiAgfSk7XG59XG5cbmhhbmRsZXJzLnJlc29sdmUgPSBmdW5jdGlvbiAoc2VsZiwgdmFsdWUpIHtcbiAgdmFyIHJlc3VsdCA9IHRyeUNhdGNoKGdldFRoZW4sIHZhbHVlKTtcbiAgaWYgKHJlc3VsdC5zdGF0dXMgPT09ICdlcnJvcicpIHtcbiAgICByZXR1cm4gaGFuZGxlcnMucmVqZWN0KHNlbGYsIHJlc3VsdC52YWx1ZSk7XG4gIH1cbiAgdmFyIHRoZW5hYmxlID0gcmVzdWx0LnZhbHVlO1xuXG4gIGlmICh0aGVuYWJsZSkge1xuICAgIHNhZmVseVJlc29sdmVUaGVuYWJsZShzZWxmLCB0aGVuYWJsZSk7XG4gIH0gZWxzZSB7XG4gICAgc2VsZi5zdGF0ZSA9IEZVTEZJTExFRDtcbiAgICBzZWxmLm91dGNvbWUgPSB2YWx1ZTtcbiAgICB2YXIgaSA9IC0xO1xuICAgIHZhciBsZW4gPSBzZWxmLnF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZSAoKytpIDwgbGVuKSB7XG4gICAgICBzZWxmLnF1ZXVlW2ldLmNhbGxGdWxmaWxsZWQodmFsdWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc2VsZjtcbn07XG5oYW5kbGVycy5yZWplY3QgPSBmdW5jdGlvbiAoc2VsZiwgZXJyb3IpIHtcbiAgc2VsZi5zdGF0ZSA9IFJFSkVDVEVEO1xuICBzZWxmLm91dGNvbWUgPSBlcnJvcjtcbiAgdmFyIGkgPSAtMTtcbiAgdmFyIGxlbiA9IHNlbGYucXVldWUubGVuZ3RoO1xuICB3aGlsZSAoKytpIDwgbGVuKSB7XG4gICAgc2VsZi5xdWV1ZVtpXS5jYWxsUmVqZWN0ZWQoZXJyb3IpO1xuICB9XG4gIHJldHVybiBzZWxmO1xufTtcblxuZnVuY3Rpb24gZ2V0VGhlbihvYmopIHtcbiAgLy8gTWFrZSBzdXJlIHdlIG9ubHkgYWNjZXNzIHRoZSBhY2Nlc3NvciBvbmNlIGFzIHJlcXVpcmVkIGJ5IHRoZSBzcGVjXG4gIHZhciB0aGVuID0gb2JqICYmIG9iai50aGVuO1xuICBpZiAob2JqICYmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyB8fCB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nKSAmJiB0eXBlb2YgdGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBmdW5jdGlvbiBhcHB5VGhlbigpIHtcbiAgICAgIHRoZW4uYXBwbHkob2JqLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cbn1cblxuZnVuY3Rpb24gc2FmZWx5UmVzb2x2ZVRoZW5hYmxlKHNlbGYsIHRoZW5hYmxlKSB7XG4gIC8vIEVpdGhlciBmdWxmaWxsLCByZWplY3Qgb3IgcmVqZWN0IHdpdGggZXJyb3JcbiAgdmFyIGNhbGxlZCA9IGZhbHNlO1xuICBmdW5jdGlvbiBvbkVycm9yKHZhbHVlKSB7XG4gICAgaWYgKGNhbGxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjYWxsZWQgPSB0cnVlO1xuICAgIGhhbmRsZXJzLnJlamVjdChzZWxmLCB2YWx1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBvblN1Y2Nlc3ModmFsdWUpIHtcbiAgICBpZiAoY2FsbGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNhbGxlZCA9IHRydWU7XG4gICAgaGFuZGxlcnMucmVzb2x2ZShzZWxmLCB2YWx1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiB0cnlUb1Vud3JhcCgpIHtcbiAgICB0aGVuYWJsZShvblN1Y2Nlc3MsIG9uRXJyb3IpO1xuICB9XG5cbiAgdmFyIHJlc3VsdCA9IHRyeUNhdGNoKHRyeVRvVW53cmFwKTtcbiAgaWYgKHJlc3VsdC5zdGF0dXMgPT09ICdlcnJvcicpIHtcbiAgICBvbkVycm9yKHJlc3VsdC52YWx1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdHJ5Q2F0Y2goZnVuYywgdmFsdWUpIHtcbiAgdmFyIG91dCA9IHt9O1xuICB0cnkge1xuICAgIG91dC52YWx1ZSA9IGZ1bmModmFsdWUpO1xuICAgIG91dC5zdGF0dXMgPSAnc3VjY2Vzcyc7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBvdXQuc3RhdHVzID0gJ2Vycm9yJztcbiAgICBvdXQudmFsdWUgPSBlO1xuICB9XG4gIHJldHVybiBvdXQ7XG59XG5cblByb21pc2UucmVzb2x2ZSA9IHJlc29sdmU7XG5mdW5jdGlvbiByZXNvbHZlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIHRoaXMpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIGhhbmRsZXJzLnJlc29sdmUobmV3IHRoaXMoSU5URVJOQUwpLCB2YWx1ZSk7XG59XG5cblByb21pc2UucmVqZWN0ID0gcmVqZWN0O1xuZnVuY3Rpb24gcmVqZWN0KHJlYXNvbikge1xuICB2YXIgcHJvbWlzZSA9IG5ldyB0aGlzKElOVEVSTkFMKTtcbiAgcmV0dXJuIGhhbmRsZXJzLnJlamVjdChwcm9taXNlLCByZWFzb24pO1xufVxuXG5Qcm9taXNlLmFsbCA9IGFsbDtcbmZ1bmN0aW9uIGFsbChpdGVyYWJsZSkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaXRlcmFibGUpICE9PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgcmV0dXJuIHRoaXMucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ211c3QgYmUgYW4gYXJyYXknKSk7XG4gIH1cblxuICB2YXIgbGVuID0gaXRlcmFibGUubGVuZ3RoO1xuICB2YXIgY2FsbGVkID0gZmFsc2U7XG4gIGlmICghbGVuKSB7XG4gICAgcmV0dXJuIHRoaXMucmVzb2x2ZShbXSk7XG4gIH1cblxuICB2YXIgdmFsdWVzID0gbmV3IEFycmF5KGxlbik7XG4gIHZhciByZXNvbHZlZCA9IDA7XG4gIHZhciBpID0gLTE7XG4gIHZhciBwcm9taXNlID0gbmV3IHRoaXMoSU5URVJOQUwpO1xuXG4gIHdoaWxlICgrK2kgPCBsZW4pIHtcbiAgICBhbGxSZXNvbHZlcihpdGVyYWJsZVtpXSwgaSk7XG4gIH1cbiAgcmV0dXJuIHByb21pc2U7XG4gIGZ1bmN0aW9uIGFsbFJlc29sdmVyKHZhbHVlLCBpKSB7XG4gICAgc2VsZi5yZXNvbHZlKHZhbHVlKS50aGVuKHJlc29sdmVGcm9tQWxsLCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIGlmICghY2FsbGVkKSB7XG4gICAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICAgIGhhbmRsZXJzLnJlamVjdChwcm9taXNlLCBlcnJvcik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgZnVuY3Rpb24gcmVzb2x2ZUZyb21BbGwob3V0VmFsdWUpIHtcbiAgICAgIHZhbHVlc1tpXSA9IG91dFZhbHVlO1xuICAgICAgaWYgKCsrcmVzb2x2ZWQgPT09IGxlbiAmJiAhY2FsbGVkKSB7XG4gICAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICAgIGhhbmRsZXJzLnJlc29sdmUocHJvbWlzZSwgdmFsdWVzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuUHJvbWlzZS5yYWNlID0gcmFjZTtcbmZ1bmN0aW9uIHJhY2UoaXRlcmFibGUpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGl0ZXJhYmxlKSAhPT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgIHJldHVybiB0aGlzLnJlamVjdChuZXcgVHlwZUVycm9yKCdtdXN0IGJlIGFuIGFycmF5JykpO1xuICB9XG5cbiAgdmFyIGxlbiA9IGl0ZXJhYmxlLmxlbmd0aDtcbiAgdmFyIGNhbGxlZCA9IGZhbHNlO1xuICBpZiAoIWxlbikge1xuICAgIHJldHVybiB0aGlzLnJlc29sdmUoW10pO1xuICB9XG5cbiAgdmFyIGkgPSAtMTtcbiAgdmFyIHByb21pc2UgPSBuZXcgdGhpcyhJTlRFUk5BTCk7XG5cbiAgd2hpbGUgKCsraSA8IGxlbikge1xuICAgIHJlc29sdmVyKGl0ZXJhYmxlW2ldKTtcbiAgfVxuICByZXR1cm4gcHJvbWlzZTtcbiAgZnVuY3Rpb24gcmVzb2x2ZXIodmFsdWUpIHtcbiAgICBzZWxmLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICBpZiAoIWNhbGxlZCkge1xuICAgICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgICBoYW5kbGVycy5yZXNvbHZlKHByb21pc2UsIHJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIGlmICghY2FsbGVkKSB7XG4gICAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICAgIGhhbmRsZXJzLnJlamVjdChwcm9taXNlLCBlcnJvcik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxufSx7XCIxXCI6MX1dLDM6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuaWYgKHR5cGVvZiBnbG9iYWwuUHJvbWlzZSAhPT0gJ2Z1bmN0aW9uJykge1xuICBnbG9iYWwuUHJvbWlzZSA9IF9kZXJlcV8oMik7XG59XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxufSx7XCIyXCI6Mn1dLDQ6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIGdldElEQigpIHtcbiAgICAvKiBnbG9iYWwgaW5kZXhlZERCLHdlYmtpdEluZGV4ZWREQixtb3pJbmRleGVkREIsT0luZGV4ZWREQixtc0luZGV4ZWREQiAqL1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgaW5kZXhlZERCICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuIGluZGV4ZWREQjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHdlYmtpdEluZGV4ZWREQiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybiB3ZWJraXRJbmRleGVkREI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBtb3pJbmRleGVkREIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm4gbW96SW5kZXhlZERCO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgT0luZGV4ZWREQiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybiBPSW5kZXhlZERCO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgbXNJbmRleGVkREIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm4gbXNJbmRleGVkREI7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG59XG5cbnZhciBpZGIgPSBnZXRJREIoKTtcblxuZnVuY3Rpb24gaXNJbmRleGVkREJWYWxpZCgpIHtcbiAgICB0cnkge1xuICAgICAgICAvLyBJbml0aWFsaXplIEluZGV4ZWREQjsgZmFsbCBiYWNrIHRvIHZlbmRvci1wcmVmaXhlZCB2ZXJzaW9uc1xuICAgICAgICAvLyBpZiBuZWVkZWQuXG4gICAgICAgIGlmICghaWRiKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLy8gV2UgbWltaWMgUG91Y2hEQiBoZXJlO1xuICAgICAgICAvL1xuICAgICAgICAvLyBXZSB0ZXN0IGZvciBvcGVuRGF0YWJhc2UgYmVjYXVzZSBJRSBNb2JpbGUgaWRlbnRpZmllcyBpdHNlbGZcbiAgICAgICAgLy8gYXMgU2FmYXJpLiBPaCB0aGUgbHVsei4uLlxuICAgICAgICB2YXIgaXNTYWZhcmkgPSB0eXBlb2Ygb3BlbkRhdGFiYXNlICE9PSAndW5kZWZpbmVkJyAmJiAvKFNhZmFyaXxpUGhvbmV8aVBhZHxpUG9kKS8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSAmJiAhL0Nocm9tZS8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSAmJiAhL0JsYWNrQmVycnkvLnRlc3QobmF2aWdhdG9yLnBsYXRmb3JtKTtcblxuICAgICAgICB2YXIgaGFzRmV0Y2ggPSB0eXBlb2YgZmV0Y2ggPT09ICdmdW5jdGlvbicgJiYgZmV0Y2gudG9TdHJpbmcoKS5pbmRleE9mKCdbbmF0aXZlIGNvZGUnKSAhPT0gLTE7XG5cbiAgICAgICAgLy8gU2FmYXJpIDwxMC4xIGRvZXMgbm90IG1lZXQgb3VyIHJlcXVpcmVtZW50cyBmb3IgSURCIHN1cHBvcnQgKCM1NTcyKVxuICAgICAgICAvLyBzaW5jZSBTYWZhcmkgMTAuMSBzaGlwcGVkIHdpdGggZmV0Y2gsIHdlIGNhbiB1c2UgdGhhdCB0byBkZXRlY3QgaXRcbiAgICAgICAgcmV0dXJuICghaXNTYWZhcmkgfHwgaGFzRmV0Y2gpICYmIHR5cGVvZiBpbmRleGVkREIgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIC8vIHNvbWUgb3V0ZGF0ZWQgaW1wbGVtZW50YXRpb25zIG9mIElEQiB0aGF0IGFwcGVhciBvbiBTYW1zdW5nXG4gICAgICAgIC8vIGFuZCBIVEMgQW5kcm9pZCBkZXZpY2VzIDw0LjQgYXJlIG1pc3NpbmcgSURCS2V5UmFuZ2VcbiAgICAgICAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS9sb2NhbEZvcmFnZS9pc3N1ZXMvMTI4XG4gICAgICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvbG9jYWxGb3JhZ2UvaXNzdWVzLzI3MlxuICAgICAgICB0eXBlb2YgSURCS2V5UmFuZ2UgIT09ICd1bmRlZmluZWQnO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuLy8gQWJzdHJhY3RzIGNvbnN0cnVjdGluZyBhIEJsb2Igb2JqZWN0LCBzbyBpdCBhbHNvIHdvcmtzIGluIG9sZGVyXG4vLyBicm93c2VycyB0aGF0IGRvbid0IHN1cHBvcnQgdGhlIG5hdGl2ZSBCbG9iIGNvbnN0cnVjdG9yLiAoaS5lLlxuLy8gb2xkIFF0V2ViS2l0IHZlcnNpb25zLCBhdCBsZWFzdCkuXG4vLyBBYnN0cmFjdHMgY29uc3RydWN0aW5nIGEgQmxvYiBvYmplY3QsIHNvIGl0IGFsc28gd29ya3MgaW4gb2xkZXJcbi8vIGJyb3dzZXJzIHRoYXQgZG9uJ3Qgc3VwcG9ydCB0aGUgbmF0aXZlIEJsb2IgY29uc3RydWN0b3IuIChpLmUuXG4vLyBvbGQgUXRXZWJLaXQgdmVyc2lvbnMsIGF0IGxlYXN0KS5cbmZ1bmN0aW9uIGNyZWF0ZUJsb2IocGFydHMsIHByb3BlcnRpZXMpIHtcbiAgICAvKiBnbG9iYWwgQmxvYkJ1aWxkZXIsTVNCbG9iQnVpbGRlcixNb3pCbG9iQnVpbGRlcixXZWJLaXRCbG9iQnVpbGRlciAqL1xuICAgIHBhcnRzID0gcGFydHMgfHwgW107XG4gICAgcHJvcGVydGllcyA9IHByb3BlcnRpZXMgfHwge307XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIG5ldyBCbG9iKHBhcnRzLCBwcm9wZXJ0aWVzKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChlLm5hbWUgIT09ICdUeXBlRXJyb3InKSB7XG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBCdWlsZGVyID0gdHlwZW9mIEJsb2JCdWlsZGVyICE9PSAndW5kZWZpbmVkJyA/IEJsb2JCdWlsZGVyIDogdHlwZW9mIE1TQmxvYkJ1aWxkZXIgIT09ICd1bmRlZmluZWQnID8gTVNCbG9iQnVpbGRlciA6IHR5cGVvZiBNb3pCbG9iQnVpbGRlciAhPT0gJ3VuZGVmaW5lZCcgPyBNb3pCbG9iQnVpbGRlciA6IFdlYktpdEJsb2JCdWlsZGVyO1xuICAgICAgICB2YXIgYnVpbGRlciA9IG5ldyBCdWlsZGVyKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGJ1aWxkZXIuYXBwZW5kKHBhcnRzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVpbGRlci5nZXRCbG9iKHByb3BlcnRpZXMudHlwZSk7XG4gICAgfVxufVxuXG4vLyBUaGlzIGlzIENvbW1vbkpTIGJlY2F1c2UgbGllIGlzIGFuIGV4dGVybmFsIGRlcGVuZGVuY3ksIHNvIFJvbGx1cFxuLy8gY2FuIGp1c3QgaWdub3JlIGl0LlxuaWYgKHR5cGVvZiBQcm9taXNlID09PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEluIHRoZSBcIm5vcHJvbWlzZXNcIiBidWlsZCB0aGlzIHdpbGwganVzdCB0aHJvdyBpZiB5b3UgZG9uJ3QgaGF2ZVxuICAgIC8vIGEgZ2xvYmFsIHByb21pc2Ugb2JqZWN0LCBidXQgaXQgd291bGQgdGhyb3cgYW55d2F5IGxhdGVyLlxuICAgIF9kZXJlcV8oMyk7XG59XG52YXIgUHJvbWlzZSQxID0gUHJvbWlzZTtcblxuZnVuY3Rpb24gZXhlY3V0ZUNhbGxiYWNrKHByb21pc2UsIGNhbGxiYWNrKSB7XG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBleGVjdXRlVHdvQ2FsbGJhY2tzKHByb21pc2UsIGNhbGxiYWNrLCBlcnJvckNhbGxiYWNrKSB7XG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwcm9taXNlLnRoZW4oY2FsbGJhY2spO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZXJyb3JDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwcm9taXNlW1wiY2F0Y2hcIl0oZXJyb3JDYWxsYmFjayk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBub3JtYWxpemVLZXkoa2V5KSB7XG4gICAgLy8gQ2FzdCB0aGUga2V5IHRvIGEgc3RyaW5nLCBhcyB0aGF0J3MgYWxsIHdlIGNhbiBzZXQgYXMgYSBrZXkuXG4gICAgaWYgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihrZXkgKyAnIHVzZWQgYXMgYSBrZXksIGJ1dCBpdCBpcyBub3QgYSBzdHJpbmcuJyk7XG4gICAgICAgIGtleSA9IFN0cmluZyhrZXkpO1xuICAgIH1cblxuICAgIHJldHVybiBrZXk7XG59XG5cbmZ1bmN0aW9uIGdldENhbGxiYWNrKCkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoICYmIHR5cGVvZiBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aCAtIDFdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aCAtIDFdO1xuICAgIH1cbn1cblxuLy8gU29tZSBjb2RlIG9yaWdpbmFsbHkgZnJvbSBhc3luY19zdG9yYWdlLmpzIGluXG4vLyBbR2FpYV0oaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEtYjJnL2dhaWEpLlxuXG52YXIgREVURUNUX0JMT0JfU1VQUE9SVF9TVE9SRSA9ICdsb2NhbC1mb3JhZ2UtZGV0ZWN0LWJsb2Itc3VwcG9ydCc7XG52YXIgc3VwcG9ydHNCbG9icyA9IHZvaWQgMDtcbnZhciBkYkNvbnRleHRzID0ge307XG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vLyBUcmFuc2FjdGlvbiBNb2Rlc1xudmFyIFJFQURfT05MWSA9ICdyZWFkb25seSc7XG52YXIgUkVBRF9XUklURSA9ICdyZWFkd3JpdGUnO1xuXG4vLyBUcmFuc2Zvcm0gYSBiaW5hcnkgc3RyaW5nIHRvIGFuIGFycmF5IGJ1ZmZlciwgYmVjYXVzZSBvdGhlcndpc2Vcbi8vIHdlaXJkIHN0dWZmIGhhcHBlbnMgd2hlbiB5b3UgdHJ5IHRvIHdvcmsgd2l0aCB0aGUgYmluYXJ5IHN0cmluZyBkaXJlY3RseS5cbi8vIEl0IGlzIGtub3duLlxuLy8gRnJvbSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE0OTY3NjQ3LyAoY29udGludWVzIG9uIG5leHQgbGluZSlcbi8vIGVuY29kZS1kZWNvZGUtaW1hZ2Utd2l0aC1iYXNlNjQtYnJlYWtzLWltYWdlICgyMDEzLTA0LTIxKVxuZnVuY3Rpb24gX2JpblN0cmluZ1RvQXJyYXlCdWZmZXIoYmluKSB7XG4gICAgdmFyIGxlbmd0aCA9IGJpbi5sZW5ndGg7XG4gICAgdmFyIGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcihsZW5ndGgpO1xuICAgIHZhciBhcnIgPSBuZXcgVWludDhBcnJheShidWYpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYXJyW2ldID0gYmluLmNoYXJDb2RlQXQoaSk7XG4gICAgfVxuICAgIHJldHVybiBidWY7XG59XG5cbi8vXG4vLyBCbG9icyBhcmUgbm90IHN1cHBvcnRlZCBpbiBhbGwgdmVyc2lvbnMgb2YgSW5kZXhlZERCLCBub3RhYmx5XG4vLyBDaHJvbWUgPDM3IGFuZCBBbmRyb2lkIDw1LiBJbiB0aG9zZSB2ZXJzaW9ucywgc3RvcmluZyBhIGJsb2Igd2lsbCB0aHJvdy5cbi8vXG4vLyBWYXJpb3VzIG90aGVyIGJsb2IgYnVncyBleGlzdCBpbiBDaHJvbWUgdjM3LTQyIChpbmNsdXNpdmUpLlxuLy8gRGV0ZWN0aW5nIHRoZW0gaXMgZXhwZW5zaXZlIGFuZCBjb25mdXNpbmcgdG8gdXNlcnMsIGFuZCBDaHJvbWUgMzctNDJcbi8vIGlzIGF0IHZlcnkgbG93IHVzYWdlIHdvcmxkd2lkZSwgc28gd2UgZG8gYSBoYWNreSB1c2VyQWdlbnQgY2hlY2sgaW5zdGVhZC5cbi8vXG4vLyBjb250ZW50LXR5cGUgYnVnOiBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDA4MTIwXG4vLyA0MDQgYnVnOiBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDQ3OTE2XG4vLyBGaWxlUmVhZGVyIGJ1ZzogaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ0NzgzNlxuLy9cbi8vIENvZGUgYm9ycm93ZWQgZnJvbSBQb3VjaERCLiBTZWU6XG4vLyBodHRwczovL2dpdGh1Yi5jb20vcG91Y2hkYi9wb3VjaGRiL2Jsb2IvbWFzdGVyL3BhY2thZ2VzL25vZGVfbW9kdWxlcy9wb3VjaGRiLWFkYXB0ZXItaWRiL3NyYy9ibG9iU3VwcG9ydC5qc1xuLy9cbmZ1bmN0aW9uIF9jaGVja0Jsb2JTdXBwb3J0V2l0aG91dENhY2hpbmcoaWRiKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlJDEoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgdmFyIHR4biA9IGlkYi50cmFuc2FjdGlvbihERVRFQ1RfQkxPQl9TVVBQT1JUX1NUT1JFLCBSRUFEX1dSSVRFKTtcbiAgICAgICAgdmFyIGJsb2IgPSBjcmVhdGVCbG9iKFsnJ10pO1xuICAgICAgICB0eG4ub2JqZWN0U3RvcmUoREVURUNUX0JMT0JfU1VQUE9SVF9TVE9SRSkucHV0KGJsb2IsICdrZXknKTtcblxuICAgICAgICB0eG4ub25hYm9ydCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgdHJhbnNhY3Rpb24gYWJvcnRzIG5vdyBpdHMgZHVlIHRvIG5vdCBiZWluZyBhYmxlIHRvXG4gICAgICAgICAgICAvLyB3cml0ZSB0byB0aGUgZGF0YWJhc2UsIGxpa2VseSBkdWUgdG8gdGhlIGRpc2sgYmVpbmcgZnVsbFxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHR4bi5vbmNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG1hdGNoZWRDaHJvbWUgPSBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9DaHJvbWVcXC8oXFxkKykvKTtcbiAgICAgICAgICAgIHZhciBtYXRjaGVkRWRnZSA9IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0VkZ2VcXC8vKTtcbiAgICAgICAgICAgIC8vIE1TIEVkZ2UgcHJldGVuZHMgdG8gYmUgQ2hyb21lIDQyOlxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9oaDg2OTMwMSUyOHY9dnMuODUlMjkuYXNweFxuICAgICAgICAgICAgcmVzb2x2ZShtYXRjaGVkRWRnZSB8fCAhbWF0Y2hlZENocm9tZSB8fCBwYXJzZUludChtYXRjaGVkQ2hyb21lWzFdLCAxMCkgPj0gNDMpO1xuICAgICAgICB9O1xuICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7IC8vIGVycm9yLCBzbyBhc3N1bWUgdW5zdXBwb3J0ZWRcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gX2NoZWNrQmxvYlN1cHBvcnQoaWRiKSB7XG4gICAgaWYgKHR5cGVvZiBzdXBwb3J0c0Jsb2JzID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UkMS5yZXNvbHZlKHN1cHBvcnRzQmxvYnMpO1xuICAgIH1cbiAgICByZXR1cm4gX2NoZWNrQmxvYlN1cHBvcnRXaXRob3V0Q2FjaGluZyhpZGIpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHN1cHBvcnRzQmxvYnMgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHN1cHBvcnRzQmxvYnM7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIF9kZWZlclJlYWRpbmVzcyhkYkluZm8pIHtcbiAgICB2YXIgZGJDb250ZXh0ID0gZGJDb250ZXh0c1tkYkluZm8ubmFtZV07XG5cbiAgICAvLyBDcmVhdGUgYSBkZWZlcnJlZCBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBjdXJyZW50IGRhdGFiYXNlIG9wZXJhdGlvbi5cbiAgICB2YXIgZGVmZXJyZWRPcGVyYXRpb24gPSB7fTtcblxuICAgIGRlZmVycmVkT3BlcmF0aW9uLnByb21pc2UgPSBuZXcgUHJvbWlzZSQxKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZGVmZXJyZWRPcGVyYXRpb24ucmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICAgIGRlZmVycmVkT3BlcmF0aW9uLnJlamVjdCA9IHJlamVjdDtcbiAgICB9KTtcblxuICAgIC8vIEVucXVldWUgdGhlIGRlZmVycmVkIG9wZXJhdGlvbi5cbiAgICBkYkNvbnRleHQuZGVmZXJyZWRPcGVyYXRpb25zLnB1c2goZGVmZXJyZWRPcGVyYXRpb24pO1xuXG4gICAgLy8gQ2hhaW4gaXRzIHByb21pc2UgdG8gdGhlIGRhdGFiYXNlIHJlYWRpbmVzcy5cbiAgICBpZiAoIWRiQ29udGV4dC5kYlJlYWR5KSB7XG4gICAgICAgIGRiQ29udGV4dC5kYlJlYWR5ID0gZGVmZXJyZWRPcGVyYXRpb24ucHJvbWlzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBkYkNvbnRleHQuZGJSZWFkeSA9IGRiQ29udGV4dC5kYlJlYWR5LnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkT3BlcmF0aW9uLnByb21pc2U7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gX2FkdmFuY2VSZWFkaW5lc3MoZGJJbmZvKSB7XG4gICAgdmFyIGRiQ29udGV4dCA9IGRiQ29udGV4dHNbZGJJbmZvLm5hbWVdO1xuXG4gICAgLy8gRGVxdWV1ZSBhIGRlZmVycmVkIG9wZXJhdGlvbi5cbiAgICB2YXIgZGVmZXJyZWRPcGVyYXRpb24gPSBkYkNvbnRleHQuZGVmZXJyZWRPcGVyYXRpb25zLnBvcCgpO1xuXG4gICAgLy8gUmVzb2x2ZSBpdHMgcHJvbWlzZSAod2hpY2ggaXMgcGFydCBvZiB0aGUgZGF0YWJhc2UgcmVhZGluZXNzXG4gICAgLy8gY2hhaW4gb2YgcHJvbWlzZXMpLlxuICAgIGlmIChkZWZlcnJlZE9wZXJhdGlvbikge1xuICAgICAgICBkZWZlcnJlZE9wZXJhdGlvbi5yZXNvbHZlKCk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZE9wZXJhdGlvbi5wcm9taXNlO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gX3JlamVjdFJlYWRpbmVzcyhkYkluZm8sIGVycikge1xuICAgIHZhciBkYkNvbnRleHQgPSBkYkNvbnRleHRzW2RiSW5mby5uYW1lXTtcblxuICAgIC8vIERlcXVldWUgYSBkZWZlcnJlZCBvcGVyYXRpb24uXG4gICAgdmFyIGRlZmVycmVkT3BlcmF0aW9uID0gZGJDb250ZXh0LmRlZmVycmVkT3BlcmF0aW9ucy5wb3AoKTtcblxuICAgIC8vIFJlamVjdCBpdHMgcHJvbWlzZSAod2hpY2ggaXMgcGFydCBvZiB0aGUgZGF0YWJhc2UgcmVhZGluZXNzXG4gICAgLy8gY2hhaW4gb2YgcHJvbWlzZXMpLlxuICAgIGlmIChkZWZlcnJlZE9wZXJhdGlvbikge1xuICAgICAgICBkZWZlcnJlZE9wZXJhdGlvbi5yZWplY3QoZXJyKTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkT3BlcmF0aW9uLnByb21pc2U7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBfZ2V0Q29ubmVjdGlvbihkYkluZm8sIHVwZ3JhZGVOZWVkZWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UkMShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGRiQ29udGV4dHNbZGJJbmZvLm5hbWVdID0gZGJDb250ZXh0c1tkYkluZm8ubmFtZV0gfHwgY3JlYXRlRGJDb250ZXh0KCk7XG5cbiAgICAgICAgaWYgKGRiSW5mby5kYikge1xuICAgICAgICAgICAgaWYgKHVwZ3JhZGVOZWVkZWQpIHtcbiAgICAgICAgICAgICAgICBfZGVmZXJSZWFkaW5lc3MoZGJJbmZvKTtcbiAgICAgICAgICAgICAgICBkYkluZm8uZGIuY2xvc2UoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoZGJJbmZvLmRiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkYkFyZ3MgPSBbZGJJbmZvLm5hbWVdO1xuXG4gICAgICAgIGlmICh1cGdyYWRlTmVlZGVkKSB7XG4gICAgICAgICAgICBkYkFyZ3MucHVzaChkYkluZm8udmVyc2lvbik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgb3BlbnJlcSA9IGlkYi5vcGVuLmFwcGx5KGlkYiwgZGJBcmdzKTtcblxuICAgICAgICBpZiAodXBncmFkZU5lZWRlZCkge1xuICAgICAgICAgICAgb3BlbnJlcS5vbnVwZ3JhZGVuZWVkZWQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHZhciBkYiA9IG9wZW5yZXEucmVzdWx0O1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGRiLmNyZWF0ZU9iamVjdFN0b3JlKGRiSW5mby5zdG9yZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZS5vbGRWZXJzaW9uIDw9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFkZGVkIHdoZW4gc3VwcG9ydCBmb3IgYmxvYiBzaGltcyB3YXMgYWRkZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIGRiLmNyZWF0ZU9iamVjdFN0b3JlKERFVEVDVF9CTE9CX1NVUFBPUlRfU1RPUkUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4Lm5hbWUgPT09ICdDb25zdHJhaW50RXJyb3InKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1RoZSBkYXRhYmFzZSBcIicgKyBkYkluZm8ubmFtZSArICdcIicgKyAnIGhhcyBiZWVuIHVwZ3JhZGVkIGZyb20gdmVyc2lvbiAnICsgZS5vbGRWZXJzaW9uICsgJyB0byB2ZXJzaW9uICcgKyBlLm5ld1ZlcnNpb24gKyAnLCBidXQgdGhlIHN0b3JhZ2UgXCInICsgZGJJbmZvLnN0b3JlTmFtZSArICdcIiBhbHJlYWR5IGV4aXN0cy4nKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGV4O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wZW5yZXEub25lcnJvciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICByZWplY3Qob3BlbnJlcS5lcnJvcik7XG4gICAgICAgIH07XG5cbiAgICAgICAgb3BlbnJlcS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXNvbHZlKG9wZW5yZXEucmVzdWx0KTtcbiAgICAgICAgICAgIF9hZHZhbmNlUmVhZGluZXNzKGRiSW5mbyk7XG4gICAgICAgIH07XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIF9nZXRPcmlnaW5hbENvbm5lY3Rpb24oZGJJbmZvKSB7XG4gICAgcmV0dXJuIF9nZXRDb25uZWN0aW9uKGRiSW5mbywgZmFsc2UpO1xufVxuXG5mdW5jdGlvbiBfZ2V0VXBncmFkZWRDb25uZWN0aW9uKGRiSW5mbykge1xuICAgIHJldHVybiBfZ2V0Q29ubmVjdGlvbihkYkluZm8sIHRydWUpO1xufVxuXG5mdW5jdGlvbiBfaXNVcGdyYWRlTmVlZGVkKGRiSW5mbywgZGVmYXVsdFZlcnNpb24pIHtcbiAgICBpZiAoIWRiSW5mby5kYikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YXIgaXNOZXdTdG9yZSA9ICFkYkluZm8uZGIub2JqZWN0U3RvcmVOYW1lcy5jb250YWlucyhkYkluZm8uc3RvcmVOYW1lKTtcbiAgICB2YXIgaXNEb3duZ3JhZGUgPSBkYkluZm8udmVyc2lvbiA8IGRiSW5mby5kYi52ZXJzaW9uO1xuICAgIHZhciBpc1VwZ3JhZGUgPSBkYkluZm8udmVyc2lvbiA+IGRiSW5mby5kYi52ZXJzaW9uO1xuXG4gICAgaWYgKGlzRG93bmdyYWRlKSB7XG4gICAgICAgIC8vIElmIHRoZSB2ZXJzaW9uIGlzIG5vdCB0aGUgZGVmYXVsdCBvbmVcbiAgICAgICAgLy8gdGhlbiB3YXJuIGZvciBpbXBvc3NpYmxlIGRvd25ncmFkZS5cbiAgICAgICAgaWYgKGRiSW5mby52ZXJzaW9uICE9PSBkZWZhdWx0VmVyc2lvbikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdUaGUgZGF0YWJhc2UgXCInICsgZGJJbmZvLm5hbWUgKyAnXCInICsgXCIgY2FuJ3QgYmUgZG93bmdyYWRlZCBmcm9tIHZlcnNpb24gXCIgKyBkYkluZm8uZGIudmVyc2lvbiArICcgdG8gdmVyc2lvbiAnICsgZGJJbmZvLnZlcnNpb24gKyAnLicpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFsaWduIHRoZSB2ZXJzaW9ucyB0byBwcmV2ZW50IGVycm9ycy5cbiAgICAgICAgZGJJbmZvLnZlcnNpb24gPSBkYkluZm8uZGIudmVyc2lvbjtcbiAgICB9XG5cbiAgICBpZiAoaXNVcGdyYWRlIHx8IGlzTmV3U3RvcmUpIHtcbiAgICAgICAgLy8gSWYgdGhlIHN0b3JlIGlzIG5ldyB0aGVuIGluY3JlbWVudCB0aGUgdmVyc2lvbiAoaWYgbmVlZGVkKS5cbiAgICAgICAgLy8gVGhpcyB3aWxsIHRyaWdnZXIgYW4gXCJ1cGdyYWRlbmVlZGVkXCIgZXZlbnQgd2hpY2ggaXMgcmVxdWlyZWRcbiAgICAgICAgLy8gZm9yIGNyZWF0aW5nIGEgc3RvcmUuXG4gICAgICAgIGlmIChpc05ld1N0b3JlKSB7XG4gICAgICAgICAgICB2YXIgaW5jVmVyc2lvbiA9IGRiSW5mby5kYi52ZXJzaW9uICsgMTtcbiAgICAgICAgICAgIGlmIChpbmNWZXJzaW9uID4gZGJJbmZvLnZlcnNpb24pIHtcbiAgICAgICAgICAgICAgICBkYkluZm8udmVyc2lvbiA9IGluY1ZlcnNpb247XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbi8vIGVuY29kZSBhIGJsb2IgZm9yIGluZGV4ZWRkYiBlbmdpbmVzIHRoYXQgZG9uJ3Qgc3VwcG9ydCBibG9ic1xuZnVuY3Rpb24gX2VuY29kZUJsb2IoYmxvYikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSQxKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgIHJlYWRlci5vbmVycm9yID0gcmVqZWN0O1xuICAgICAgICByZWFkZXIub25sb2FkZW5kID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciBiYXNlNjQgPSBidG9hKGUudGFyZ2V0LnJlc3VsdCB8fCAnJyk7XG4gICAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICBfX2xvY2FsX2ZvcmFnZV9lbmNvZGVkX2Jsb2I6IHRydWUsXG4gICAgICAgICAgICAgICAgZGF0YTogYmFzZTY0LFxuICAgICAgICAgICAgICAgIHR5cGU6IGJsb2IudHlwZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHJlYWRlci5yZWFkQXNCaW5hcnlTdHJpbmcoYmxvYik7XG4gICAgfSk7XG59XG5cbi8vIGRlY29kZSBhbiBlbmNvZGVkIGJsb2JcbmZ1bmN0aW9uIF9kZWNvZGVCbG9iKGVuY29kZWRCbG9iKSB7XG4gICAgdmFyIGFycmF5QnVmZiA9IF9iaW5TdHJpbmdUb0FycmF5QnVmZmVyKGF0b2IoZW5jb2RlZEJsb2IuZGF0YSkpO1xuICAgIHJldHVybiBjcmVhdGVCbG9iKFthcnJheUJ1ZmZdLCB7IHR5cGU6IGVuY29kZWRCbG9iLnR5cGUgfSk7XG59XG5cbi8vIGlzIHRoaXMgb25lIG9mIG91ciBmYW5jeSBlbmNvZGVkIGJsb2JzP1xuZnVuY3Rpb24gX2lzRW5jb2RlZEJsb2IodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgJiYgdmFsdWUuX19sb2NhbF9mb3JhZ2VfZW5jb2RlZF9ibG9iO1xufVxuXG4vLyBTcGVjaWFsaXplIHRoZSBkZWZhdWx0IGByZWFkeSgpYCBmdW5jdGlvbiBieSBtYWtpbmcgaXQgZGVwZW5kZW50XG4vLyBvbiB0aGUgY3VycmVudCBkYXRhYmFzZSBvcGVyYXRpb25zLiBUaHVzLCB0aGUgZHJpdmVyIHdpbGwgYmUgYWN0dWFsbHlcbi8vIHJlYWR5IHdoZW4gaXQncyBiZWVuIGluaXRpYWxpemVkIChkZWZhdWx0KSAqYW5kKiB0aGVyZSBhcmUgbm8gcGVuZGluZ1xuLy8gb3BlcmF0aW9ucyBvbiB0aGUgZGF0YWJhc2UgKGluaXRpYXRlZCBieSBzb21lIG90aGVyIGluc3RhbmNlcykuXG5mdW5jdGlvbiBfZnVsbHlSZWFkeShjYWxsYmFjaykge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHZhciBwcm9taXNlID0gc2VsZi5faW5pdFJlYWR5KCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkYkNvbnRleHQgPSBkYkNvbnRleHRzW3NlbGYuX2RiSW5mby5uYW1lXTtcblxuICAgICAgICBpZiAoZGJDb250ZXh0ICYmIGRiQ29udGV4dC5kYlJlYWR5KSB7XG4gICAgICAgICAgICByZXR1cm4gZGJDb250ZXh0LmRiUmVhZHk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4ZWN1dGVUd29DYWxsYmFja3MocHJvbWlzZSwgY2FsbGJhY2ssIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbn1cblxuLy8gVHJ5IHRvIGVzdGFibGlzaCBhIG5ldyBkYiBjb25uZWN0aW9uIHRvIHJlcGxhY2UgdGhlXG4vLyBjdXJyZW50IG9uZSB3aGljaCBpcyBicm9rZW4gKGkuZS4gZXhwZXJpZW5jaW5nXG4vLyBJbnZhbGlkU3RhdGVFcnJvciB3aGlsZSBjcmVhdGluZyBhIHRyYW5zYWN0aW9uKS5cbmZ1bmN0aW9uIF90cnlSZWNvbm5lY3QoZGJJbmZvKSB7XG4gICAgX2RlZmVyUmVhZGluZXNzKGRiSW5mbyk7XG5cbiAgICB2YXIgZGJDb250ZXh0ID0gZGJDb250ZXh0c1tkYkluZm8ubmFtZV07XG4gICAgdmFyIGZvcmFnZXMgPSBkYkNvbnRleHQuZm9yYWdlcztcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZm9yYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZm9yYWdlID0gZm9yYWdlc1tpXTtcbiAgICAgICAgaWYgKGZvcmFnZS5fZGJJbmZvLmRiKSB7XG4gICAgICAgICAgICBmb3JhZ2UuX2RiSW5mby5kYi5jbG9zZSgpO1xuICAgICAgICAgICAgZm9yYWdlLl9kYkluZm8uZGIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRiSW5mby5kYiA9IG51bGw7XG5cbiAgICByZXR1cm4gX2dldE9yaWdpbmFsQ29ubmVjdGlvbihkYkluZm8pLnRoZW4oZnVuY3Rpb24gKGRiKSB7XG4gICAgICAgIGRiSW5mby5kYiA9IGRiO1xuICAgICAgICBpZiAoX2lzVXBncmFkZU5lZWRlZChkYkluZm8pKSB7XG4gICAgICAgICAgICAvLyBSZW9wZW4gdGhlIGRhdGFiYXNlIGZvciB1cGdyYWRpbmcuXG4gICAgICAgICAgICByZXR1cm4gX2dldFVwZ3JhZGVkQ29ubmVjdGlvbihkYkluZm8pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYjtcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChkYikge1xuICAgICAgICAvLyBzdG9yZSB0aGUgbGF0ZXN0IGRiIHJlZmVyZW5jZVxuICAgICAgICAvLyBpbiBjYXNlIHRoZSBkYiB3YXMgdXBncmFkZWRcbiAgICAgICAgZGJJbmZvLmRiID0gZGJDb250ZXh0LmRiID0gZGI7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZm9yYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZm9yYWdlc1tpXS5fZGJJbmZvLmRiID0gZGI7XG4gICAgICAgIH1cbiAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgX3JlamVjdFJlYWRpbmVzcyhkYkluZm8sIGVycik7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9KTtcbn1cblxuLy8gRkYgZG9lc24ndCBsaWtlIFByb21pc2VzIChtaWNyby10YXNrcykgYW5kIElEREIgc3RvcmUgb3BlcmF0aW9ucyxcbi8vIHNvIHdlIGhhdmUgdG8gZG8gaXQgd2l0aCBjYWxsYmFja3NcbmZ1bmN0aW9uIGNyZWF0ZVRyYW5zYWN0aW9uKGRiSW5mbywgbW9kZSwgY2FsbGJhY2ssIHJldHJpZXMpIHtcbiAgICBpZiAocmV0cmllcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHJpZXMgPSAxO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIHZhciB0eCA9IGRiSW5mby5kYi50cmFuc2FjdGlvbihkYkluZm8uc3RvcmVOYW1lLCBtb2RlKTtcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgdHgpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBpZiAocmV0cmllcyA+IDAgJiYgKCFkYkluZm8uZGIgfHwgZXJyLm5hbWUgPT09ICdJbnZhbGlkU3RhdGVFcnJvcicgfHwgZXJyLm5hbWUgPT09ICdOb3RGb3VuZEVycm9yJykpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlJDEucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICghZGJJbmZvLmRiIHx8IGVyci5uYW1lID09PSAnTm90Rm91bmRFcnJvcicgJiYgIWRiSW5mby5kYi5vYmplY3RTdG9yZU5hbWVzLmNvbnRhaW5zKGRiSW5mby5zdG9yZU5hbWUpICYmIGRiSW5mby52ZXJzaW9uIDw9IGRiSW5mby5kYi52ZXJzaW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGluY3JlYXNlIHRoZSBkYiB2ZXJzaW9uLCB0byBjcmVhdGUgdGhlIG5ldyBPYmplY3RTdG9yZVxuICAgICAgICAgICAgICAgICAgICBpZiAoZGJJbmZvLmRiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYkluZm8udmVyc2lvbiA9IGRiSW5mby5kYi52ZXJzaW9uICsgMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBSZW9wZW4gdGhlIGRhdGFiYXNlIGZvciB1cGdyYWRpbmcuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfZ2V0VXBncmFkZWRDb25uZWN0aW9uKGRiSW5mbyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90cnlSZWNvbm5lY3QoZGJJbmZvKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlVHJhbnNhY3Rpb24oZGJJbmZvLCBtb2RlLCBjYWxsYmFjaywgcmV0cmllcyAtIDEpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShjYWxsYmFjayk7XG4gICAgICAgIH1cblxuICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlRGJDb250ZXh0KCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIC8vIFJ1bm5pbmcgbG9jYWxGb3JhZ2VzIHNoYXJpbmcgYSBkYXRhYmFzZS5cbiAgICAgICAgZm9yYWdlczogW10sXG4gICAgICAgIC8vIFNoYXJlZCBkYXRhYmFzZS5cbiAgICAgICAgZGI6IG51bGwsXG4gICAgICAgIC8vIERhdGFiYXNlIHJlYWRpbmVzcyAocHJvbWlzZSkuXG4gICAgICAgIGRiUmVhZHk6IG51bGwsXG4gICAgICAgIC8vIERlZmVycmVkIG9wZXJhdGlvbnMgb24gdGhlIGRhdGFiYXNlLlxuICAgICAgICBkZWZlcnJlZE9wZXJhdGlvbnM6IFtdXG4gICAgfTtcbn1cblxuLy8gT3BlbiB0aGUgSW5kZXhlZERCIGRhdGFiYXNlIChhdXRvbWF0aWNhbGx5IGNyZWF0ZXMgb25lIGlmIG9uZSBkaWRuJ3Rcbi8vIHByZXZpb3VzbHkgZXhpc3QpLCB1c2luZyBhbnkgb3B0aW9ucyBzZXQgaW4gdGhlIGNvbmZpZy5cbmZ1bmN0aW9uIF9pbml0U3RvcmFnZShvcHRpb25zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBkYkluZm8gPSB7XG4gICAgICAgIGRiOiBudWxsXG4gICAgfTtcblxuICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgIGZvciAodmFyIGkgaW4gb3B0aW9ucykge1xuICAgICAgICAgICAgZGJJbmZvW2ldID0gb3B0aW9uc1tpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEdldCB0aGUgY3VycmVudCBjb250ZXh0IG9mIHRoZSBkYXRhYmFzZTtcbiAgICB2YXIgZGJDb250ZXh0ID0gZGJDb250ZXh0c1tkYkluZm8ubmFtZV07XG5cbiAgICAvLyAuLi5vciBjcmVhdGUgYSBuZXcgY29udGV4dC5cbiAgICBpZiAoIWRiQ29udGV4dCkge1xuICAgICAgICBkYkNvbnRleHQgPSBjcmVhdGVEYkNvbnRleHQoKTtcbiAgICAgICAgLy8gUmVnaXN0ZXIgdGhlIG5ldyBjb250ZXh0IGluIHRoZSBnbG9iYWwgY29udGFpbmVyLlxuICAgICAgICBkYkNvbnRleHRzW2RiSW5mby5uYW1lXSA9IGRiQ29udGV4dDtcbiAgICB9XG5cbiAgICAvLyBSZWdpc3RlciBpdHNlbGYgYXMgYSBydW5uaW5nIGxvY2FsRm9yYWdlIGluIHRoZSBjdXJyZW50IGNvbnRleHQuXG4gICAgZGJDb250ZXh0LmZvcmFnZXMucHVzaChzZWxmKTtcblxuICAgIC8vIFJlcGxhY2UgdGhlIGRlZmF1bHQgYHJlYWR5KClgIGZ1bmN0aW9uIHdpdGggdGhlIHNwZWNpYWxpemVkIG9uZS5cbiAgICBpZiAoIXNlbGYuX2luaXRSZWFkeSkge1xuICAgICAgICBzZWxmLl9pbml0UmVhZHkgPSBzZWxmLnJlYWR5O1xuICAgICAgICBzZWxmLnJlYWR5ID0gX2Z1bGx5UmVhZHk7XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIGFuIGFycmF5IG9mIGluaXRpYWxpemF0aW9uIHN0YXRlcyBvZiB0aGUgcmVsYXRlZCBsb2NhbEZvcmFnZXMuXG4gICAgdmFyIGluaXRQcm9taXNlcyA9IFtdO1xuXG4gICAgZnVuY3Rpb24gaWdub3JlRXJyb3JzKCkge1xuICAgICAgICAvLyBEb24ndCBoYW5kbGUgZXJyb3JzIGhlcmUsXG4gICAgICAgIC8vIGp1c3QgbWFrZXMgc3VyZSByZWxhdGVkIGxvY2FsRm9yYWdlcyBhcmVuJ3QgcGVuZGluZy5cbiAgICAgICAgcmV0dXJuIFByb21pc2UkMS5yZXNvbHZlKCk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBkYkNvbnRleHQuZm9yYWdlcy5sZW5ndGg7IGorKykge1xuICAgICAgICB2YXIgZm9yYWdlID0gZGJDb250ZXh0LmZvcmFnZXNbal07XG4gICAgICAgIGlmIChmb3JhZ2UgIT09IHNlbGYpIHtcbiAgICAgICAgICAgIC8vIERvbid0IHdhaXQgZm9yIGl0c2VsZi4uLlxuICAgICAgICAgICAgaW5pdFByb21pc2VzLnB1c2goZm9yYWdlLl9pbml0UmVhZHkoKVtcImNhdGNoXCJdKGlnbm9yZUVycm9ycykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gVGFrZSBhIHNuYXBzaG90IG9mIHRoZSByZWxhdGVkIGxvY2FsRm9yYWdlcy5cbiAgICB2YXIgZm9yYWdlcyA9IGRiQ29udGV4dC5mb3JhZ2VzLnNsaWNlKDApO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSB0aGUgY29ubmVjdGlvbiBwcm9jZXNzIG9ubHkgd2hlblxuICAgIC8vIGFsbCB0aGUgcmVsYXRlZCBsb2NhbEZvcmFnZXMgYXJlbid0IHBlbmRpbmcuXG4gICAgcmV0dXJuIFByb21pc2UkMS5hbGwoaW5pdFByb21pc2VzKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZGJJbmZvLmRiID0gZGJDb250ZXh0LmRiO1xuICAgICAgICAvLyBHZXQgdGhlIGNvbm5lY3Rpb24gb3Igb3BlbiBhIG5ldyBvbmUgd2l0aG91dCB1cGdyYWRlLlxuICAgICAgICByZXR1cm4gX2dldE9yaWdpbmFsQ29ubmVjdGlvbihkYkluZm8pO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKGRiKSB7XG4gICAgICAgIGRiSW5mby5kYiA9IGRiO1xuICAgICAgICBpZiAoX2lzVXBncmFkZU5lZWRlZChkYkluZm8sIHNlbGYuX2RlZmF1bHRDb25maWcudmVyc2lvbikpIHtcbiAgICAgICAgICAgIC8vIFJlb3BlbiB0aGUgZGF0YWJhc2UgZm9yIHVwZ3JhZGluZy5cbiAgICAgICAgICAgIHJldHVybiBfZ2V0VXBncmFkZWRDb25uZWN0aW9uKGRiSW5mbyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRiO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKGRiKSB7XG4gICAgICAgIGRiSW5mby5kYiA9IGRiQ29udGV4dC5kYiA9IGRiO1xuICAgICAgICBzZWxmLl9kYkluZm8gPSBkYkluZm87XG4gICAgICAgIC8vIFNoYXJlIHRoZSBmaW5hbCBjb25uZWN0aW9uIGFtb25nc3QgcmVsYXRlZCBsb2NhbEZvcmFnZXMuXG4gICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgZm9yYWdlcy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgdmFyIGZvcmFnZSA9IGZvcmFnZXNba107XG4gICAgICAgICAgICBpZiAoZm9yYWdlICE9PSBzZWxmKSB7XG4gICAgICAgICAgICAgICAgLy8gU2VsZiBpcyBhbHJlYWR5IHVwLXRvLWRhdGUuXG4gICAgICAgICAgICAgICAgZm9yYWdlLl9kYkluZm8uZGIgPSBkYkluZm8uZGI7XG4gICAgICAgICAgICAgICAgZm9yYWdlLl9kYkluZm8udmVyc2lvbiA9IGRiSW5mby52ZXJzaW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldEl0ZW0oa2V5LCBjYWxsYmFjaykge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIGtleSA9IG5vcm1hbGl6ZUtleShrZXkpO1xuXG4gICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSQxKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgc2VsZi5yZWFkeSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY3JlYXRlVHJhbnNhY3Rpb24oc2VsZi5fZGJJbmZvLCBSRUFEX09OTFksIGZ1bmN0aW9uIChlcnIsIHRyYW5zYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUoc2VsZi5fZGJJbmZvLnN0b3JlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXEgPSBzdG9yZS5nZXQoa2V5KTtcblxuICAgICAgICAgICAgICAgICAgICByZXEub25zdWNjZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gcmVxLnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9pc0VuY29kZWRCbG9iKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gX2RlY29kZUJsb2IodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgcmVxLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QocmVxLmVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlbXCJjYXRjaFwiXShyZWplY3QpO1xuICAgIH0pO1xuXG4gICAgZXhlY3V0ZUNhbGxiYWNrKHByb21pc2UsIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbn1cblxuLy8gSXRlcmF0ZSBvdmVyIGFsbCBpdGVtcyBzdG9yZWQgaW4gZGF0YWJhc2UuXG5mdW5jdGlvbiBpdGVyYXRlKGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UkMShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHNlbGYucmVhZHkoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNyZWF0ZVRyYW5zYWN0aW9uKHNlbGYuX2RiSW5mbywgUkVBRF9PTkxZLCBmdW5jdGlvbiAoZXJyLCB0cmFuc2FjdGlvbikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdG9yZSA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHNlbGYuX2RiSW5mby5zdG9yZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVxID0gc3RvcmUub3BlbkN1cnNvcigpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlcmF0aW9uTnVtYmVyID0gMTtcblxuICAgICAgICAgICAgICAgICAgICByZXEub25zdWNjZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnNvciA9IHJlcS5yZXN1bHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJzb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBjdXJzb3IudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9pc0VuY29kZWRCbG9iKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IF9kZWNvZGVCbG9iKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGl0ZXJhdG9yKHZhbHVlLCBjdXJzb3Iua2V5LCBpdGVyYXRpb25OdW1iZXIrKyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3aGVuIHRoZSBpdGVyYXRvciBjYWxsYmFjayByZXR1bnMgYW55XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gKG5vbi1gdW5kZWZpbmVkYCkgdmFsdWUsIHRoZW4gd2Ugc3RvcFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBpdGVyYXRpb24gaW1tZWRpYXRlbHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvcltcImNvbnRpbnVlXCJdKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgcmVxLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QocmVxLmVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlbXCJjYXRjaFwiXShyZWplY3QpO1xuICAgIH0pO1xuXG4gICAgZXhlY3V0ZUNhbGxiYWNrKHByb21pc2UsIGNhbGxiYWNrKTtcblxuICAgIHJldHVybiBwcm9taXNlO1xufVxuXG5mdW5jdGlvbiBzZXRJdGVtKGtleSwgdmFsdWUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAga2V5ID0gbm9ybWFsaXplS2V5KGtleSk7XG5cbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlJDEoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgZGJJbmZvO1xuICAgICAgICBzZWxmLnJlYWR5KCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkYkluZm8gPSBzZWxmLl9kYkluZm87XG4gICAgICAgICAgICBpZiAodG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IEJsb2JdJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBfY2hlY2tCbG9iU3VwcG9ydChkYkluZm8uZGIpLnRoZW4oZnVuY3Rpb24gKGJsb2JTdXBwb3J0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChibG9iU3VwcG9ydCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfZW5jb2RlQmxvYih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBjcmVhdGVUcmFuc2FjdGlvbihzZWxmLl9kYkluZm8sIFJFQURfV1JJVEUsIGZ1bmN0aW9uIChlcnIsIHRyYW5zYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUoc2VsZi5fZGJJbmZvLnN0b3JlTmFtZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlIHJlYXNvbiB3ZSBkb24ndCBfc2F2ZV8gbnVsbCBpcyBiZWNhdXNlIElFIDEwIGRvZXNcbiAgICAgICAgICAgICAgICAgICAgLy8gbm90IHN1cHBvcnQgc2F2aW5nIHRoZSBgbnVsbGAgdHlwZSBpbiBJbmRleGVkREIuIEhvd1xuICAgICAgICAgICAgICAgICAgICAvLyBpcm9uaWMsIGdpdmVuIHRoZSBidWcgYmVsb3chXG4gICAgICAgICAgICAgICAgICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvbG9jYWxGb3JhZ2UvaXNzdWVzLzE2MVxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlcSA9IHN0b3JlLnB1dCh2YWx1ZSwga2V5KTtcblxuICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbi5vbmNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2FzdCB0byB1bmRlZmluZWQgc28gdGhlIHZhbHVlIHBhc3NlZCB0b1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FsbGJhY2svcHJvbWlzZSBpcyB0aGUgc2FtZSBhcyB3aGF0IG9uZSB3b3VsZCBnZXQgb3V0XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvZiBgZ2V0SXRlbSgpYCBsYXRlci4gVGhpcyBsZWFkcyB0byBzb21lIHdlaXJkbmVzc1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gKHNldEl0ZW0oJ2ZvbycsIHVuZGVmaW5lZCkgd2lsbCByZXR1cm4gYG51bGxgKSwgYnV0XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpdCdzIG5vdCBteSBmYXVsdCBsb2NhbFN0b3JhZ2UgaXMgb3VyIGJhc2VsaW5lIGFuZCB0aGF0XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpdCdzIHdlaXJkLlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbi5vbmFib3J0ID0gdHJhbnNhY3Rpb24ub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlcnIgPSByZXEuZXJyb3IgPyByZXEuZXJyb3IgOiByZXEudHJhbnNhY3Rpb24uZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlbXCJjYXRjaFwiXShyZWplY3QpO1xuICAgIH0pO1xuXG4gICAgZXhlY3V0ZUNhbGxiYWNrKHByb21pc2UsIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlSXRlbShrZXksIGNhbGxiYWNrKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAga2V5ID0gbm9ybWFsaXplS2V5KGtleSk7XG5cbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlJDEoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBzZWxmLnJlYWR5KCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjcmVhdGVUcmFuc2FjdGlvbihzZWxmLl9kYkluZm8sIFJFQURfV1JJVEUsIGZ1bmN0aW9uIChlcnIsIHRyYW5zYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUoc2VsZi5fZGJJbmZvLnN0b3JlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIHVzZSBhIEdydW50IHRhc2sgdG8gbWFrZSB0aGlzIHNhZmUgZm9yIElFIGFuZCBzb21lXG4gICAgICAgICAgICAgICAgICAgIC8vIHZlcnNpb25zIG9mIEFuZHJvaWQgKGluY2x1ZGluZyB0aG9zZSB1c2VkIGJ5IENvcmRvdmEpLlxuICAgICAgICAgICAgICAgICAgICAvLyBOb3JtYWxseSBJRSB3b24ndCBsaWtlIGAuZGVsZXRlKClgIGFuZCB3aWxsIGluc2lzdCBvblxuICAgICAgICAgICAgICAgICAgICAvLyB1c2luZyBgWydkZWxldGUnXSgpYCwgYnV0IHdlIGhhdmUgYSBidWlsZCBzdGVwIHRoYXRcbiAgICAgICAgICAgICAgICAgICAgLy8gZml4ZXMgdGhpcyBmb3IgdXMgbm93LlxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVxID0gc3RvcmVbXCJkZWxldGVcIl0oa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNhY3Rpb24ub25jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbi5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlcS5lcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlIHJlcXVlc3Qgd2lsbCBiZSBhbHNvIGJlIGFib3J0ZWQgaWYgd2UndmUgZXhjZWVkZWQgb3VyIHN0b3JhZ2VcbiAgICAgICAgICAgICAgICAgICAgLy8gc3BhY2UuXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uLm9uYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXJyID0gcmVxLmVycm9yID8gcmVxLmVycm9yIDogcmVxLnRyYW5zYWN0aW9uLmVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0ocmVqZWN0KTtcbiAgICB9KTtcblxuICAgIGV4ZWN1dGVDYWxsYmFjayhwcm9taXNlLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5cbmZ1bmN0aW9uIGNsZWFyKGNhbGxiYWNrKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSQxKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgc2VsZi5yZWFkeSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY3JlYXRlVHJhbnNhY3Rpb24oc2VsZi5fZGJJbmZvLCBSRUFEX1dSSVRFLCBmdW5jdGlvbiAoZXJyLCB0cmFuc2FjdGlvbikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdG9yZSA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHNlbGYuX2RiSW5mby5zdG9yZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVxID0gc3RvcmUuY2xlYXIoKTtcblxuICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbi5vbmNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uLm9uYWJvcnQgPSB0cmFuc2FjdGlvbi5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVyciA9IHJlcS5lcnJvciA/IHJlcS5lcnJvciA6IHJlcS50cmFuc2FjdGlvbi5lcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVtcImNhdGNoXCJdKHJlamVjdCk7XG4gICAgfSk7XG5cbiAgICBleGVjdXRlQ2FsbGJhY2socHJvbWlzZSwgY2FsbGJhY2spO1xuICAgIHJldHVybiBwcm9taXNlO1xufVxuXG5mdW5jdGlvbiBsZW5ndGgoY2FsbGJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlJDEoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBzZWxmLnJlYWR5KCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjcmVhdGVUcmFuc2FjdGlvbihzZWxmLl9kYkluZm8sIFJFQURfT05MWSwgZnVuY3Rpb24gKGVyciwgdHJhbnNhY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZShzZWxmLl9kYkluZm8uc3RvcmVOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlcSA9IHN0b3JlLmNvdW50KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVxLnJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgcmVxLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QocmVxLmVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlbXCJjYXRjaFwiXShyZWplY3QpO1xuICAgIH0pO1xuXG4gICAgZXhlY3V0ZUNhbGxiYWNrKHByb21pc2UsIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbn1cblxuZnVuY3Rpb24ga2V5KG4sIGNhbGxiYWNrKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSQxKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgaWYgKG4gPCAwKSB7XG4gICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLnJlYWR5KCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjcmVhdGVUcmFuc2FjdGlvbihzZWxmLl9kYkluZm8sIFJFQURfT05MWSwgZnVuY3Rpb24gKGVyciwgdHJhbnNhY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZShzZWxmLl9kYkluZm8uc3RvcmVOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFkdmFuY2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXEgPSBzdG9yZS5vcGVuQ3Vyc29yKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdXJzb3IgPSByZXEucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjdXJzb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIG1lYW5zIHRoZXJlIHdlcmVuJ3QgZW5vdWdoIGtleXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobiA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGhhdmUgdGhlIGZpcnN0IGtleSwgcmV0dXJuIGl0IGlmIHRoYXQncyB3aGF0IHRoZXlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3YW50ZWQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShjdXJzb3Iua2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhZHZhbmNlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UsIGFzayB0aGUgY3Vyc29yIHRvIHNraXAgYWhlYWQgblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZWNvcmRzLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZHZhbmNlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvci5hZHZhbmNlKG4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdoZW4gd2UgZ2V0IGhlcmUsIHdlJ3ZlIGdvdCB0aGUgbnRoIGtleS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShjdXJzb3Iua2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgcmVxLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QocmVxLmVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlbXCJjYXRjaFwiXShyZWplY3QpO1xuICAgIH0pO1xuXG4gICAgZXhlY3V0ZUNhbGxiYWNrKHByb21pc2UsIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbn1cblxuZnVuY3Rpb24ga2V5cyhjYWxsYmFjaykge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UkMShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHNlbGYucmVhZHkoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNyZWF0ZVRyYW5zYWN0aW9uKHNlbGYuX2RiSW5mbywgUkVBRF9PTkxZLCBmdW5jdGlvbiAoZXJyLCB0cmFuc2FjdGlvbikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdG9yZSA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHNlbGYuX2RiSW5mby5zdG9yZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVxID0gc3RvcmUub3BlbkN1cnNvcigpO1xuICAgICAgICAgICAgICAgICAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgICAgIHJlcS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3Vyc29yID0gcmVxLnJlc3VsdDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjdXJzb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGtleXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAga2V5cy5wdXNoKGN1cnNvci5rZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yW1wiY29udGludWVcIl0oKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICByZXEub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChyZXEuZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVtcImNhdGNoXCJdKHJlamVjdCk7XG4gICAgfSk7XG5cbiAgICBleGVjdXRlQ2FsbGJhY2socHJvbWlzZSwgY2FsbGJhY2spO1xuICAgIHJldHVybiBwcm9taXNlO1xufVxuXG5mdW5jdGlvbiBkcm9wSW5zdGFuY2Uob3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICBjYWxsYmFjayA9IGdldENhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB2YXIgY3VycmVudENvbmZpZyA9IHRoaXMuY29uZmlnKCk7XG4gICAgb3B0aW9ucyA9IHR5cGVvZiBvcHRpb25zICE9PSAnZnVuY3Rpb24nICYmIG9wdGlvbnMgfHwge307XG4gICAgaWYgKCFvcHRpb25zLm5hbWUpIHtcbiAgICAgICAgb3B0aW9ucy5uYW1lID0gb3B0aW9ucy5uYW1lIHx8IGN1cnJlbnRDb25maWcubmFtZTtcbiAgICAgICAgb3B0aW9ucy5zdG9yZU5hbWUgPSBvcHRpb25zLnN0b3JlTmFtZSB8fCBjdXJyZW50Q29uZmlnLnN0b3JlTmFtZTtcbiAgICB9XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIHByb21pc2U7XG4gICAgaWYgKCFvcHRpb25zLm5hbWUpIHtcbiAgICAgICAgcHJvbWlzZSA9IFByb21pc2UkMS5yZWplY3QoJ0ludmFsaWQgYXJndW1lbnRzJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGlzQ3VycmVudERiID0gb3B0aW9ucy5uYW1lID09PSBjdXJyZW50Q29uZmlnLm5hbWUgJiYgc2VsZi5fZGJJbmZvLmRiO1xuXG4gICAgICAgIHZhciBkYlByb21pc2UgPSBpc0N1cnJlbnREYiA/IFByb21pc2UkMS5yZXNvbHZlKHNlbGYuX2RiSW5mby5kYikgOiBfZ2V0T3JpZ2luYWxDb25uZWN0aW9uKG9wdGlvbnMpLnRoZW4oZnVuY3Rpb24gKGRiKSB7XG4gICAgICAgICAgICB2YXIgZGJDb250ZXh0ID0gZGJDb250ZXh0c1tvcHRpb25zLm5hbWVdO1xuICAgICAgICAgICAgdmFyIGZvcmFnZXMgPSBkYkNvbnRleHQuZm9yYWdlcztcbiAgICAgICAgICAgIGRiQ29udGV4dC5kYiA9IGRiO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmb3JhZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yYWdlc1tpXS5fZGJJbmZvLmRiID0gZGI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGI7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghb3B0aW9ucy5zdG9yZU5hbWUpIHtcbiAgICAgICAgICAgIHByb21pc2UgPSBkYlByb21pc2UudGhlbihmdW5jdGlvbiAoZGIpIHtcbiAgICAgICAgICAgICAgICBfZGVmZXJSZWFkaW5lc3Mob3B0aW9ucyk7XG5cbiAgICAgICAgICAgICAgICB2YXIgZGJDb250ZXh0ID0gZGJDb250ZXh0c1tvcHRpb25zLm5hbWVdO1xuICAgICAgICAgICAgICAgIHZhciBmb3JhZ2VzID0gZGJDb250ZXh0LmZvcmFnZXM7XG5cbiAgICAgICAgICAgICAgICBkYi5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZm9yYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZm9yYWdlID0gZm9yYWdlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yYWdlLl9kYkluZm8uZGIgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBkcm9wREJQcm9taXNlID0gbmV3IFByb21pc2UkMShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXEgPSBpZGIuZGVsZXRlRGF0YWJhc2Uob3B0aW9ucy5uYW1lKTtcblxuICAgICAgICAgICAgICAgICAgICByZXEub25lcnJvciA9IHJlcS5vbmJsb2NrZWQgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGIgPSByZXEucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGIuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIHJlcS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGIgPSByZXEucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGIuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGIpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRyb3BEQlByb21pc2UudGhlbihmdW5jdGlvbiAoZGIpIHtcbiAgICAgICAgICAgICAgICAgICAgZGJDb250ZXh0LmRiID0gZGI7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZm9yYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9mb3JhZ2UgPSBmb3JhZ2VzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2FkdmFuY2VSZWFkaW5lc3MoX2ZvcmFnZS5fZGJJbmZvKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAoX3JlamVjdFJlYWRpbmVzcyhvcHRpb25zLCBlcnIpIHx8IFByb21pc2UkMS5yZXNvbHZlKCkpW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKCkge30pO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb21pc2UgPSBkYlByb21pc2UudGhlbihmdW5jdGlvbiAoZGIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWRiLm9iamVjdFN0b3JlTmFtZXMuY29udGFpbnMob3B0aW9ucy5zdG9yZU5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgbmV3VmVyc2lvbiA9IGRiLnZlcnNpb24gKyAxO1xuXG4gICAgICAgICAgICAgICAgX2RlZmVyUmVhZGluZXNzKG9wdGlvbnMpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGRiQ29udGV4dCA9IGRiQ29udGV4dHNbb3B0aW9ucy5uYW1lXTtcbiAgICAgICAgICAgICAgICB2YXIgZm9yYWdlcyA9IGRiQ29udGV4dC5mb3JhZ2VzO1xuXG4gICAgICAgICAgICAgICAgZGIuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZvcmFnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvcmFnZSA9IGZvcmFnZXNbaV07XG4gICAgICAgICAgICAgICAgICAgIGZvcmFnZS5fZGJJbmZvLmRiID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgZm9yYWdlLl9kYkluZm8udmVyc2lvbiA9IG5ld1ZlcnNpb247XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGRyb3BPYmplY3RQcm9taXNlID0gbmV3IFByb21pc2UkMShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXEgPSBpZGIub3BlbihvcHRpb25zLm5hbWUsIG5ld1ZlcnNpb24pO1xuXG4gICAgICAgICAgICAgICAgICAgIHJlcS5vbmVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRiID0gcmVxLnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRiLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICByZXEub251cGdyYWRlbmVlZGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRiID0gcmVxLnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRiLmRlbGV0ZU9iamVjdFN0b3JlKG9wdGlvbnMuc3RvcmVOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICByZXEub25zdWNjZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRiID0gcmVxLnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRiLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRiKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBkcm9wT2JqZWN0UHJvbWlzZS50aGVuKGZ1bmN0aW9uIChkYikge1xuICAgICAgICAgICAgICAgICAgICBkYkNvbnRleHQuZGIgPSBkYjtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBmb3JhZ2VzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2ZvcmFnZTIgPSBmb3JhZ2VzW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2ZvcmFnZTIuX2RiSW5mby5kYiA9IGRiO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2FkdmFuY2VSZWFkaW5lc3MoX2ZvcmFnZTIuX2RiSW5mbyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgKF9yZWplY3RSZWFkaW5lc3Mob3B0aW9ucywgZXJyKSB8fCBQcm9taXNlJDEucmVzb2x2ZSgpKVtcImNhdGNoXCJdKGZ1bmN0aW9uICgpIHt9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleGVjdXRlQ2FsbGJhY2socHJvbWlzZSwgY2FsbGJhY2spO1xuICAgIHJldHVybiBwcm9taXNlO1xufVxuXG52YXIgYXN5bmNTdG9yYWdlID0ge1xuICAgIF9kcml2ZXI6ICdhc3luY1N0b3JhZ2UnLFxuICAgIF9pbml0U3RvcmFnZTogX2luaXRTdG9yYWdlLFxuICAgIF9zdXBwb3J0OiBpc0luZGV4ZWREQlZhbGlkKCksXG4gICAgaXRlcmF0ZTogaXRlcmF0ZSxcbiAgICBnZXRJdGVtOiBnZXRJdGVtLFxuICAgIHNldEl0ZW06IHNldEl0ZW0sXG4gICAgcmVtb3ZlSXRlbTogcmVtb3ZlSXRlbSxcbiAgICBjbGVhcjogY2xlYXIsXG4gICAgbGVuZ3RoOiBsZW5ndGgsXG4gICAga2V5OiBrZXksXG4gICAga2V5czoga2V5cyxcbiAgICBkcm9wSW5zdGFuY2U6IGRyb3BJbnN0YW5jZVxufTtcblxuZnVuY3Rpb24gaXNXZWJTUUxWYWxpZCgpIHtcbiAgICByZXR1cm4gdHlwZW9mIG9wZW5EYXRhYmFzZSA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuLy8gU2FkbHksIHRoZSBiZXN0IHdheSB0byBzYXZlIGJpbmFyeSBkYXRhIGluIFdlYlNRTC9sb2NhbFN0b3JhZ2UgaXMgc2VyaWFsaXppbmdcbi8vIGl0IHRvIEJhc2U2NCwgc28gdGhpcyBpcyBob3cgd2Ugc3RvcmUgaXQgdG8gcHJldmVudCB2ZXJ5IHN0cmFuZ2UgZXJyb3JzIHdpdGggbGVzc1xuLy8gdmVyYm9zZSB3YXlzIG9mIGJpbmFyeSA8LT4gc3RyaW5nIGRhdGEgc3RvcmFnZS5cbnZhciBCQVNFX0NIQVJTID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nO1xuXG52YXIgQkxPQl9UWVBFX1BSRUZJWCA9ICd+fmxvY2FsX2ZvcmFnZV90eXBlfic7XG52YXIgQkxPQl9UWVBFX1BSRUZJWF9SRUdFWCA9IC9efn5sb2NhbF9mb3JhZ2VfdHlwZX4oW15+XSspfi87XG5cbnZhciBTRVJJQUxJWkVEX01BUktFUiA9ICdfX2xmc2NfXzonO1xudmFyIFNFUklBTElaRURfTUFSS0VSX0xFTkdUSCA9IFNFUklBTElaRURfTUFSS0VSLmxlbmd0aDtcblxuLy8gT01HIHRoZSBzZXJpYWxpemF0aW9ucyFcbnZhciBUWVBFX0FSUkFZQlVGRkVSID0gJ2FyYmYnO1xudmFyIFRZUEVfQkxPQiA9ICdibG9iJztcbnZhciBUWVBFX0lOVDhBUlJBWSA9ICdzaTA4JztcbnZhciBUWVBFX1VJTlQ4QVJSQVkgPSAndWkwOCc7XG52YXIgVFlQRV9VSU5UOENMQU1QRURBUlJBWSA9ICd1aWM4JztcbnZhciBUWVBFX0lOVDE2QVJSQVkgPSAnc2kxNic7XG52YXIgVFlQRV9JTlQzMkFSUkFZID0gJ3NpMzInO1xudmFyIFRZUEVfVUlOVDE2QVJSQVkgPSAndXIxNic7XG52YXIgVFlQRV9VSU5UMzJBUlJBWSA9ICd1aTMyJztcbnZhciBUWVBFX0ZMT0FUMzJBUlJBWSA9ICdmbDMyJztcbnZhciBUWVBFX0ZMT0FUNjRBUlJBWSA9ICdmbDY0JztcbnZhciBUWVBFX1NFUklBTElaRURfTUFSS0VSX0xFTkdUSCA9IFNFUklBTElaRURfTUFSS0VSX0xFTkdUSCArIFRZUEVfQVJSQVlCVUZGRVIubGVuZ3RoO1xuXG52YXIgdG9TdHJpbmckMSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbmZ1bmN0aW9uIHN0cmluZ1RvQnVmZmVyKHNlcmlhbGl6ZWRTdHJpbmcpIHtcbiAgICAvLyBGaWxsIHRoZSBzdHJpbmcgaW50byBhIEFycmF5QnVmZmVyLlxuICAgIHZhciBidWZmZXJMZW5ndGggPSBzZXJpYWxpemVkU3RyaW5nLmxlbmd0aCAqIDAuNzU7XG4gICAgdmFyIGxlbiA9IHNlcmlhbGl6ZWRTdHJpbmcubGVuZ3RoO1xuICAgIHZhciBpO1xuICAgIHZhciBwID0gMDtcbiAgICB2YXIgZW5jb2RlZDEsIGVuY29kZWQyLCBlbmNvZGVkMywgZW5jb2RlZDQ7XG5cbiAgICBpZiAoc2VyaWFsaXplZFN0cmluZ1tzZXJpYWxpemVkU3RyaW5nLmxlbmd0aCAtIDFdID09PSAnPScpIHtcbiAgICAgICAgYnVmZmVyTGVuZ3RoLS07XG4gICAgICAgIGlmIChzZXJpYWxpemVkU3RyaW5nW3NlcmlhbGl6ZWRTdHJpbmcubGVuZ3RoIC0gMl0gPT09ICc9Jykge1xuICAgICAgICAgICAgYnVmZmVyTGVuZ3RoLS07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKGJ1ZmZlckxlbmd0aCk7XG4gICAgdmFyIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyKTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgICAgICBlbmNvZGVkMSA9IEJBU0VfQ0hBUlMuaW5kZXhPZihzZXJpYWxpemVkU3RyaW5nW2ldKTtcbiAgICAgICAgZW5jb2RlZDIgPSBCQVNFX0NIQVJTLmluZGV4T2Yoc2VyaWFsaXplZFN0cmluZ1tpICsgMV0pO1xuICAgICAgICBlbmNvZGVkMyA9IEJBU0VfQ0hBUlMuaW5kZXhPZihzZXJpYWxpemVkU3RyaW5nW2kgKyAyXSk7XG4gICAgICAgIGVuY29kZWQ0ID0gQkFTRV9DSEFSUy5pbmRleE9mKHNlcmlhbGl6ZWRTdHJpbmdbaSArIDNdKTtcblxuICAgICAgICAvKmpzbGludCBiaXR3aXNlOiB0cnVlICovXG4gICAgICAgIGJ5dGVzW3ArK10gPSBlbmNvZGVkMSA8PCAyIHwgZW5jb2RlZDIgPj4gNDtcbiAgICAgICAgYnl0ZXNbcCsrXSA9IChlbmNvZGVkMiAmIDE1KSA8PCA0IHwgZW5jb2RlZDMgPj4gMjtcbiAgICAgICAgYnl0ZXNbcCsrXSA9IChlbmNvZGVkMyAmIDMpIDw8IDYgfCBlbmNvZGVkNCAmIDYzO1xuICAgIH1cbiAgICByZXR1cm4gYnVmZmVyO1xufVxuXG4vLyBDb252ZXJ0cyBhIGJ1ZmZlciB0byBhIHN0cmluZyB0byBzdG9yZSwgc2VyaWFsaXplZCwgaW4gdGhlIGJhY2tlbmRcbi8vIHN0b3JhZ2UgbGlicmFyeS5cbmZ1bmN0aW9uIGJ1ZmZlclRvU3RyaW5nKGJ1ZmZlcikge1xuICAgIC8vIGJhc2U2NC1hcnJheWJ1ZmZlclxuICAgIHZhciBieXRlcyA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlcik7XG4gICAgdmFyIGJhc2U2NFN0cmluZyA9ICcnO1xuICAgIHZhciBpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSArPSAzKSB7XG4gICAgICAgIC8qanNsaW50IGJpdHdpc2U6IHRydWUgKi9cbiAgICAgICAgYmFzZTY0U3RyaW5nICs9IEJBU0VfQ0hBUlNbYnl0ZXNbaV0gPj4gMl07XG4gICAgICAgIGJhc2U2NFN0cmluZyArPSBCQVNFX0NIQVJTWyhieXRlc1tpXSAmIDMpIDw8IDQgfCBieXRlc1tpICsgMV0gPj4gNF07XG4gICAgICAgIGJhc2U2NFN0cmluZyArPSBCQVNFX0NIQVJTWyhieXRlc1tpICsgMV0gJiAxNSkgPDwgMiB8IGJ5dGVzW2kgKyAyXSA+PiA2XTtcbiAgICAgICAgYmFzZTY0U3RyaW5nICs9IEJBU0VfQ0hBUlNbYnl0ZXNbaSArIDJdICYgNjNdO1xuICAgIH1cblxuICAgIGlmIChieXRlcy5sZW5ndGggJSAzID09PSAyKSB7XG4gICAgICAgIGJhc2U2NFN0cmluZyA9IGJhc2U2NFN0cmluZy5zdWJzdHJpbmcoMCwgYmFzZTY0U3RyaW5nLmxlbmd0aCAtIDEpICsgJz0nO1xuICAgIH0gZWxzZSBpZiAoYnl0ZXMubGVuZ3RoICUgMyA9PT0gMSkge1xuICAgICAgICBiYXNlNjRTdHJpbmcgPSBiYXNlNjRTdHJpbmcuc3Vic3RyaW5nKDAsIGJhc2U2NFN0cmluZy5sZW5ndGggLSAyKSArICc9PSc7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJhc2U2NFN0cmluZztcbn1cblxuLy8gU2VyaWFsaXplIGEgdmFsdWUsIGFmdGVyd2FyZHMgZXhlY3V0aW5nIGEgY2FsbGJhY2sgKHdoaWNoIHVzdWFsbHlcbi8vIGluc3RydWN0cyB0aGUgYHNldEl0ZW0oKWAgY2FsbGJhY2svcHJvbWlzZSB0byBiZSBleGVjdXRlZCkuIFRoaXMgaXMgaG93XG4vLyB3ZSBzdG9yZSBiaW5hcnkgZGF0YSB3aXRoIGxvY2FsU3RvcmFnZS5cbmZ1bmN0aW9uIHNlcmlhbGl6ZSh2YWx1ZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgdmFsdWVUeXBlID0gJyc7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHZhbHVlVHlwZSA9IHRvU3RyaW5nJDEuY2FsbCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLy8gQ2Fubm90IHVzZSBgdmFsdWUgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcmAgb3Igc3VjaCBoZXJlLCBhcyB0aGVzZVxuICAgIC8vIGNoZWNrcyBmYWlsIHdoZW4gcnVubmluZyB0aGUgdGVzdHMgdXNpbmcgY2FzcGVyLmpzLi4uXG4gICAgLy9cbiAgICAvLyBUT0RPOiBTZWUgd2h5IHRob3NlIHRlc3RzIGZhaWwgYW5kIHVzZSBhIGJldHRlciBzb2x1dGlvbi5cbiAgICBpZiAodmFsdWUgJiYgKHZhbHVlVHlwZSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJyB8fCB2YWx1ZS5idWZmZXIgJiYgdG9TdHJpbmckMS5jYWxsKHZhbHVlLmJ1ZmZlcikgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXScpKSB7XG4gICAgICAgIC8vIENvbnZlcnQgYmluYXJ5IGFycmF5cyB0byBhIHN0cmluZyBhbmQgcHJlZml4IHRoZSBzdHJpbmcgd2l0aFxuICAgICAgICAvLyBhIHNwZWNpYWwgbWFya2VyLlxuICAgICAgICB2YXIgYnVmZmVyO1xuICAgICAgICB2YXIgbWFya2VyID0gU0VSSUFMSVpFRF9NQVJLRVI7XG5cbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICAgIGJ1ZmZlciA9IHZhbHVlO1xuICAgICAgICAgICAgbWFya2VyICs9IFRZUEVfQVJSQVlCVUZGRVI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBidWZmZXIgPSB2YWx1ZS5idWZmZXI7XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZVR5cGUgPT09ICdbb2JqZWN0IEludDhBcnJheV0nKSB7XG4gICAgICAgICAgICAgICAgbWFya2VyICs9IFRZUEVfSU5UOEFSUkFZO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZVR5cGUgPT09ICdbb2JqZWN0IFVpbnQ4QXJyYXldJykge1xuICAgICAgICAgICAgICAgIG1hcmtlciArPSBUWVBFX1VJTlQ4QVJSQVk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlVHlwZSA9PT0gJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJykge1xuICAgICAgICAgICAgICAgIG1hcmtlciArPSBUWVBFX1VJTlQ4Q0xBTVBFREFSUkFZO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZVR5cGUgPT09ICdbb2JqZWN0IEludDE2QXJyYXldJykge1xuICAgICAgICAgICAgICAgIG1hcmtlciArPSBUWVBFX0lOVDE2QVJSQVk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlVHlwZSA9PT0gJ1tvYmplY3QgVWludDE2QXJyYXldJykge1xuICAgICAgICAgICAgICAgIG1hcmtlciArPSBUWVBFX1VJTlQxNkFSUkFZO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZVR5cGUgPT09ICdbb2JqZWN0IEludDMyQXJyYXldJykge1xuICAgICAgICAgICAgICAgIG1hcmtlciArPSBUWVBFX0lOVDMyQVJSQVk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlVHlwZSA9PT0gJ1tvYmplY3QgVWludDMyQXJyYXldJykge1xuICAgICAgICAgICAgICAgIG1hcmtlciArPSBUWVBFX1VJTlQzMkFSUkFZO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZVR5cGUgPT09ICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nKSB7XG4gICAgICAgICAgICAgICAgbWFya2VyICs9IFRZUEVfRkxPQVQzMkFSUkFZO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZVR5cGUgPT09ICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nKSB7XG4gICAgICAgICAgICAgICAgbWFya2VyICs9IFRZUEVfRkxPQVQ2NEFSUkFZO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhuZXcgRXJyb3IoJ0ZhaWxlZCB0byBnZXQgdHlwZSBmb3IgQmluYXJ5QXJyYXknKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjYWxsYmFjayhtYXJrZXIgKyBidWZmZXJUb1N0cmluZyhidWZmZXIpKTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlVHlwZSA9PT0gJ1tvYmplY3QgQmxvYl0nKSB7XG4gICAgICAgIC8vIENvbnZlciB0aGUgYmxvYiB0byBhIGJpbmFyeUFycmF5IGFuZCB0aGVuIHRvIGEgc3RyaW5nLlxuICAgICAgICB2YXIgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cbiAgICAgICAgZmlsZVJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBCYWNrd2FyZHMtY29tcGF0aWJsZSBwcmVmaXggZm9yIHRoZSBibG9iIHR5cGUuXG4gICAgICAgICAgICB2YXIgc3RyID0gQkxPQl9UWVBFX1BSRUZJWCArIHZhbHVlLnR5cGUgKyAnficgKyBidWZmZXJUb1N0cmluZyh0aGlzLnJlc3VsdCk7XG5cbiAgICAgICAgICAgIGNhbGxiYWNrKFNFUklBTElaRURfTUFSS0VSICsgVFlQRV9CTE9CICsgc3RyKTtcbiAgICAgICAgfTtcblxuICAgICAgICBmaWxlUmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY2FsbGJhY2soSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNvdWxkbid0IGNvbnZlcnQgdmFsdWUgaW50byBhIEpTT04gc3RyaW5nOiBcIiwgdmFsdWUpO1xuXG4gICAgICAgICAgICBjYWxsYmFjayhudWxsLCBlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8gRGVzZXJpYWxpemUgZGF0YSB3ZSd2ZSBpbnNlcnRlZCBpbnRvIGEgdmFsdWUgY29sdW1uL2ZpZWxkLiBXZSBwbGFjZVxuLy8gc3BlY2lhbCBtYXJrZXJzIGludG8gb3VyIHN0cmluZ3MgdG8gbWFyayB0aGVtIGFzIGVuY29kZWQ7IHRoaXMgaXNuJ3Rcbi8vIGFzIG5pY2UgYXMgYSBtZXRhIGZpZWxkLCBidXQgaXQncyB0aGUgb25seSBzYW5lIHRoaW5nIHdlIGNhbiBkbyB3aGlsc3Rcbi8vIGtlZXBpbmcgbG9jYWxTdG9yYWdlIHN1cHBvcnQgaW50YWN0LlxuLy9cbi8vIE9mdGVudGltZXMgdGhpcyB3aWxsIGp1c3QgZGVzZXJpYWxpemUgSlNPTiBjb250ZW50LCBidXQgaWYgd2UgaGF2ZSBhXG4vLyBzcGVjaWFsIG1hcmtlciAoU0VSSUFMSVpFRF9NQVJLRVIsIGRlZmluZWQgYWJvdmUpLCB3ZSB3aWxsIGV4dHJhY3Rcbi8vIHNvbWUga2luZCBvZiBhcnJheWJ1ZmZlci9iaW5hcnkgZGF0YS90eXBlZCBhcnJheSBvdXQgb2YgdGhlIHN0cmluZy5cbmZ1bmN0aW9uIGRlc2VyaWFsaXplKHZhbHVlKSB7XG4gICAgLy8gSWYgd2UgaGF2ZW4ndCBtYXJrZWQgdGhpcyBzdHJpbmcgYXMgYmVpbmcgc3BlY2lhbGx5IHNlcmlhbGl6ZWQgKGkuZS5cbiAgICAvLyBzb21ldGhpbmcgb3RoZXIgdGhhbiBzZXJpYWxpemVkIEpTT04pLCB3ZSBjYW4ganVzdCByZXR1cm4gaXQgYW5kIGJlXG4gICAgLy8gZG9uZSB3aXRoIGl0LlxuICAgIGlmICh2YWx1ZS5zdWJzdHJpbmcoMCwgU0VSSUFMSVpFRF9NQVJLRVJfTEVOR1RIKSAhPT0gU0VSSUFMSVpFRF9NQVJLRVIpIHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodmFsdWUpO1xuICAgIH1cblxuICAgIC8vIFRoZSBmb2xsb3dpbmcgY29kZSBkZWFscyB3aXRoIGRlc2VyaWFsaXppbmcgc29tZSBraW5kIG9mIEJsb2Igb3JcbiAgICAvLyBUeXBlZEFycmF5LiBGaXJzdCB3ZSBzZXBhcmF0ZSBvdXQgdGhlIHR5cGUgb2YgZGF0YSB3ZSdyZSBkZWFsaW5nXG4gICAgLy8gd2l0aCBmcm9tIHRoZSBkYXRhIGl0c2VsZi5cbiAgICB2YXIgc2VyaWFsaXplZFN0cmluZyA9IHZhbHVlLnN1YnN0cmluZyhUWVBFX1NFUklBTElaRURfTUFSS0VSX0xFTkdUSCk7XG4gICAgdmFyIHR5cGUgPSB2YWx1ZS5zdWJzdHJpbmcoU0VSSUFMSVpFRF9NQVJLRVJfTEVOR1RILCBUWVBFX1NFUklBTElaRURfTUFSS0VSX0xFTkdUSCk7XG5cbiAgICB2YXIgYmxvYlR5cGU7XG4gICAgLy8gQmFja3dhcmRzLWNvbXBhdGlibGUgYmxvYiB0eXBlIHNlcmlhbGl6YXRpb24gc3RyYXRlZ3kuXG4gICAgLy8gREJzIGNyZWF0ZWQgd2l0aCBvbGRlciB2ZXJzaW9ucyBvZiBsb2NhbEZvcmFnZSB3aWxsIHNpbXBseSBub3QgaGF2ZSB0aGUgYmxvYiB0eXBlLlxuICAgIGlmICh0eXBlID09PSBUWVBFX0JMT0IgJiYgQkxPQl9UWVBFX1BSRUZJWF9SRUdFWC50ZXN0KHNlcmlhbGl6ZWRTdHJpbmcpKSB7XG4gICAgICAgIHZhciBtYXRjaGVyID0gc2VyaWFsaXplZFN0cmluZy5tYXRjaChCTE9CX1RZUEVfUFJFRklYX1JFR0VYKTtcbiAgICAgICAgYmxvYlR5cGUgPSBtYXRjaGVyWzFdO1xuICAgICAgICBzZXJpYWxpemVkU3RyaW5nID0gc2VyaWFsaXplZFN0cmluZy5zdWJzdHJpbmcobWF0Y2hlclswXS5sZW5ndGgpO1xuICAgIH1cbiAgICB2YXIgYnVmZmVyID0gc3RyaW5nVG9CdWZmZXIoc2VyaWFsaXplZFN0cmluZyk7XG5cbiAgICAvLyBSZXR1cm4gdGhlIHJpZ2h0IHR5cGUgYmFzZWQgb24gdGhlIGNvZGUvdHlwZSBzZXQgZHVyaW5nXG4gICAgLy8gc2VyaWFsaXphdGlvbi5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBUWVBFX0FSUkFZQlVGRkVSOlxuICAgICAgICAgICAgcmV0dXJuIGJ1ZmZlcjtcbiAgICAgICAgY2FzZSBUWVBFX0JMT0I6XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlQmxvYihbYnVmZmVyXSwgeyB0eXBlOiBibG9iVHlwZSB9KTtcbiAgICAgICAgY2FzZSBUWVBFX0lOVDhBUlJBWTpcbiAgICAgICAgICAgIHJldHVybiBuZXcgSW50OEFycmF5KGJ1ZmZlcik7XG4gICAgICAgIGNhc2UgVFlQRV9VSU5UOEFSUkFZOlxuICAgICAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGJ1ZmZlcik7XG4gICAgICAgIGNhc2UgVFlQRV9VSU5UOENMQU1QRURBUlJBWTpcbiAgICAgICAgICAgIHJldHVybiBuZXcgVWludDhDbGFtcGVkQXJyYXkoYnVmZmVyKTtcbiAgICAgICAgY2FzZSBUWVBFX0lOVDE2QVJSQVk6XG4gICAgICAgICAgICByZXR1cm4gbmV3IEludDE2QXJyYXkoYnVmZmVyKTtcbiAgICAgICAgY2FzZSBUWVBFX1VJTlQxNkFSUkFZOlxuICAgICAgICAgICAgcmV0dXJuIG5ldyBVaW50MTZBcnJheShidWZmZXIpO1xuICAgICAgICBjYXNlIFRZUEVfSU5UMzJBUlJBWTpcbiAgICAgICAgICAgIHJldHVybiBuZXcgSW50MzJBcnJheShidWZmZXIpO1xuICAgICAgICBjYXNlIFRZUEVfVUlOVDMyQVJSQVk6XG4gICAgICAgICAgICByZXR1cm4gbmV3IFVpbnQzMkFycmF5KGJ1ZmZlcik7XG4gICAgICAgIGNhc2UgVFlQRV9GTE9BVDMyQVJSQVk6XG4gICAgICAgICAgICByZXR1cm4gbmV3IEZsb2F0MzJBcnJheShidWZmZXIpO1xuICAgICAgICBjYXNlIFRZUEVfRkxPQVQ2NEFSUkFZOlxuICAgICAgICAgICAgcmV0dXJuIG5ldyBGbG9hdDY0QXJyYXkoYnVmZmVyKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rb3duIHR5cGU6ICcgKyB0eXBlKTtcbiAgICB9XG59XG5cbnZhciBsb2NhbGZvcmFnZVNlcmlhbGl6ZXIgPSB7XG4gICAgc2VyaWFsaXplOiBzZXJpYWxpemUsXG4gICAgZGVzZXJpYWxpemU6IGRlc2VyaWFsaXplLFxuICAgIHN0cmluZ1RvQnVmZmVyOiBzdHJpbmdUb0J1ZmZlcixcbiAgICBidWZmZXJUb1N0cmluZzogYnVmZmVyVG9TdHJpbmdcbn07XG5cbi8qXG4gKiBJbmNsdWRlcyBjb2RlIGZyb206XG4gKlxuICogYmFzZTY0LWFycmF5YnVmZmVyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbmlrbGFzdmgvYmFzZTY0LWFycmF5YnVmZmVyXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEyIE5pa2xhcyB2b24gSGVydHplblxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICovXG5cbmZ1bmN0aW9uIGNyZWF0ZURiVGFibGUodCwgZGJJbmZvLCBjYWxsYmFjaywgZXJyb3JDYWxsYmFjaykge1xuICAgIHQuZXhlY3V0ZVNxbCgnQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgJyArIGRiSW5mby5zdG9yZU5hbWUgKyAnICcgKyAnKGlkIElOVEVHRVIgUFJJTUFSWSBLRVksIGtleSB1bmlxdWUsIHZhbHVlKScsIFtdLCBjYWxsYmFjaywgZXJyb3JDYWxsYmFjayk7XG59XG5cbi8vIE9wZW4gdGhlIFdlYlNRTCBkYXRhYmFzZSAoYXV0b21hdGljYWxseSBjcmVhdGVzIG9uZSBpZiBvbmUgZGlkbid0XG4vLyBwcmV2aW91c2x5IGV4aXN0KSwgdXNpbmcgYW55IG9wdGlvbnMgc2V0IGluIHRoZSBjb25maWcuXG5mdW5jdGlvbiBfaW5pdFN0b3JhZ2UkMShvcHRpb25zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBkYkluZm8gPSB7XG4gICAgICAgIGRiOiBudWxsXG4gICAgfTtcblxuICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgIGZvciAodmFyIGkgaW4gb3B0aW9ucykge1xuICAgICAgICAgICAgZGJJbmZvW2ldID0gdHlwZW9mIG9wdGlvbnNbaV0gIT09ICdzdHJpbmcnID8gb3B0aW9uc1tpXS50b1N0cmluZygpIDogb3B0aW9uc1tpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBkYkluZm9Qcm9taXNlID0gbmV3IFByb21pc2UkMShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIC8vIE9wZW4gdGhlIGRhdGFiYXNlOyB0aGUgb3BlbkRhdGFiYXNlIEFQSSB3aWxsIGF1dG9tYXRpY2FsbHlcbiAgICAgICAgLy8gY3JlYXRlIGl0IGZvciB1cyBpZiBpdCBkb2Vzbid0IGV4aXN0LlxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZGJJbmZvLmRiID0gb3BlbkRhdGFiYXNlKGRiSW5mby5uYW1lLCBTdHJpbmcoZGJJbmZvLnZlcnNpb24pLCBkYkluZm8uZGVzY3JpcHRpb24sIGRiSW5mby5zaXplKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWF0ZSBvdXIga2V5L3ZhbHVlIHRhYmxlIGlmIGl0IGRvZXNuJ3QgZXhpc3QuXG4gICAgICAgIGRiSW5mby5kYi50cmFuc2FjdGlvbihmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgY3JlYXRlRGJUYWJsZSh0LCBkYkluZm8sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLl9kYkluZm8gPSBkYkluZm87XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHQsIGVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCByZWplY3QpO1xuICAgIH0pO1xuXG4gICAgZGJJbmZvLnNlcmlhbGl6ZXIgPSBsb2NhbGZvcmFnZVNlcmlhbGl6ZXI7XG4gICAgcmV0dXJuIGRiSW5mb1Byb21pc2U7XG59XG5cbmZ1bmN0aW9uIHRyeUV4ZWN1dGVTcWwodCwgZGJJbmZvLCBzcWxTdGF0ZW1lbnQsIGFyZ3MsIGNhbGxiYWNrLCBlcnJvckNhbGxiYWNrKSB7XG4gICAgdC5leGVjdXRlU3FsKHNxbFN0YXRlbWVudCwgYXJncywgY2FsbGJhY2ssIGZ1bmN0aW9uICh0LCBlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3IuY29kZSA9PT0gZXJyb3IuU1lOVEFYX0VSUikge1xuICAgICAgICAgICAgdC5leGVjdXRlU3FsKCdTRUxFQ1QgbmFtZSBGUk9NIHNxbGl0ZV9tYXN0ZXIgJyArIFwiV0hFUkUgdHlwZT0ndGFibGUnIEFORCBuYW1lID0gP1wiLCBbZGJJbmZvLnN0b3JlTmFtZV0sIGZ1bmN0aW9uICh0LCByZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHRzLnJvd3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSB0YWJsZSBpcyBtaXNzaW5nICh3YXMgZGVsZXRlZClcbiAgICAgICAgICAgICAgICAgICAgLy8gcmUtY3JlYXRlIGl0IHRhYmxlIGFuZCByZXRyeVxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVEYlRhYmxlKHQsIGRiSW5mbywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdC5leGVjdXRlU3FsKHNxbFN0YXRlbWVudCwgYXJncywgY2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spO1xuICAgICAgICAgICAgICAgICAgICB9LCBlcnJvckNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlcnJvckNhbGxiYWNrKHQsIGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBlcnJvckNhbGxiYWNrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVycm9yQ2FsbGJhY2sodCwgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfSwgZXJyb3JDYWxsYmFjayk7XG59XG5cbmZ1bmN0aW9uIGdldEl0ZW0kMShrZXksIGNhbGxiYWNrKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAga2V5ID0gbm9ybWFsaXplS2V5KGtleSk7XG5cbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlJDEoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBzZWxmLnJlYWR5KCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZGJJbmZvID0gc2VsZi5fZGJJbmZvO1xuICAgICAgICAgICAgZGJJbmZvLmRiLnRyYW5zYWN0aW9uKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICAgICAgdHJ5RXhlY3V0ZVNxbCh0LCBkYkluZm8sICdTRUxFQ1QgKiBGUk9NICcgKyBkYkluZm8uc3RvcmVOYW1lICsgJyBXSEVSRSBrZXkgPSA/IExJTUlUIDEnLCBba2V5XSwgZnVuY3Rpb24gKHQsIHJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHJlc3VsdHMucm93cy5sZW5ndGggPyByZXN1bHRzLnJvd3MuaXRlbSgwKS52YWx1ZSA6IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHRoaXMgaXMgc2VyaWFsaXplZCBjb250ZW50IHdlIG5lZWQgdG9cbiAgICAgICAgICAgICAgICAgICAgLy8gdW5wYWNrLlxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBkYkluZm8uc2VyaWFsaXplci5kZXNlcmlhbGl6ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICh0LCBlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0ocmVqZWN0KTtcbiAgICB9KTtcblxuICAgIGV4ZWN1dGVDYWxsYmFjayhwcm9taXNlLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5cbmZ1bmN0aW9uIGl0ZXJhdGUkMShpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlJDEoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBzZWxmLnJlYWR5KCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZGJJbmZvID0gc2VsZi5fZGJJbmZvO1xuXG4gICAgICAgICAgICBkYkluZm8uZGIudHJhbnNhY3Rpb24oZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgICAgICB0cnlFeGVjdXRlU3FsKHQsIGRiSW5mbywgJ1NFTEVDVCAqIEZST00gJyArIGRiSW5mby5zdG9yZU5hbWUsIFtdLCBmdW5jdGlvbiAodCwgcmVzdWx0cykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcm93cyA9IHJlc3VsdHMucm93cztcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxlbmd0aCA9IHJvd3MubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gcm93cy5pdGVtKGkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGl0ZW0udmFsdWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiB0aGlzIGlzIHNlcmlhbGl6ZWQgY29udGVudFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2UgbmVlZCB0byB1bnBhY2suXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZGJJbmZvLnNlcmlhbGl6ZXIuZGVzZXJpYWxpemUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gaXRlcmF0b3IocmVzdWx0LCBpdGVtLmtleSwgaSArIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB2b2lkKDApIHByZXZlbnRzIHByb2JsZW1zIHdpdGggcmVkZWZpbml0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvZiBgdW5kZWZpbmVkYC5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHQsIGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlbXCJjYXRjaFwiXShyZWplY3QpO1xuICAgIH0pO1xuXG4gICAgZXhlY3V0ZUNhbGxiYWNrKHByb21pc2UsIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbn1cblxuZnVuY3Rpb24gX3NldEl0ZW0oa2V5LCB2YWx1ZSwgY2FsbGJhY2ssIHJldHJpZXNMZWZ0KSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAga2V5ID0gbm9ybWFsaXplS2V5KGtleSk7XG5cbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlJDEoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBzZWxmLnJlYWR5KCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBUaGUgbG9jYWxTdG9yYWdlIEFQSSBkb2Vzbid0IHJldHVybiB1bmRlZmluZWQgdmFsdWVzIGluIGFuXG4gICAgICAgICAgICAvLyBcImV4cGVjdGVkXCIgd2F5LCBzbyB1bmRlZmluZWQgaXMgYWx3YXlzIGNhc3QgdG8gbnVsbCBpbiBhbGxcbiAgICAgICAgICAgIC8vIGRyaXZlcnMuIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvbG9jYWxGb3JhZ2UvcHVsbC80MlxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFNhdmUgdGhlIG9yaWdpbmFsIHZhbHVlIHRvIHBhc3MgdG8gdGhlIGNhbGxiYWNrLlxuICAgICAgICAgICAgdmFyIG9yaWdpbmFsVmFsdWUgPSB2YWx1ZTtcblxuICAgICAgICAgICAgdmFyIGRiSW5mbyA9IHNlbGYuX2RiSW5mbztcbiAgICAgICAgICAgIGRiSW5mby5zZXJpYWxpemVyLnNlcmlhbGl6ZSh2YWx1ZSwgZnVuY3Rpb24gKHZhbHVlLCBlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRiSW5mby5kYi50cmFuc2FjdGlvbihmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5RXhlY3V0ZVNxbCh0LCBkYkluZm8sICdJTlNFUlQgT1IgUkVQTEFDRSBJTlRPICcgKyBkYkluZm8uc3RvcmVOYW1lICsgJyAnICsgJyhrZXksIHZhbHVlKSBWQUxVRVMgKD8sID8pJywgW2tleSwgdmFsdWVdLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShvcmlnaW5hbFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICh0LCBlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHNxbEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgdHJhbnNhY3Rpb24gZmFpbGVkOyBjaGVja1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG8gc2VlIGlmIGl0J3MgYSBxdW90YSBlcnJvci5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcWxFcnJvci5jb2RlID09PSBzcWxFcnJvci5RVU9UQV9FUlIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSByZWplY3QgdGhlIGNhbGxiYWNrIG91dHJpZ2h0IGZvciBub3csIGJ1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGl0J3Mgd29ydGggdHJ5aW5nIHRvIHJlLXJ1biB0aGUgdHJhbnNhY3Rpb24uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRXZlbiBpZiB0aGUgdXNlciBhY2NlcHRzIHRoZSBwcm9tcHQgdG8gdXNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbW9yZSBzdG9yYWdlIG9uIFNhZmFyaSwgdGhpcyBlcnJvciB3aWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYmUgY2FsbGVkLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJ5IHRvIHJlLXJ1biB0aGUgdHJhbnNhY3Rpb24uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldHJpZXNMZWZ0ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKF9zZXRJdGVtLmFwcGx5KHNlbGYsIFtrZXksIG9yaWdpbmFsVmFsdWUsIGNhbGxiYWNrLCByZXRyaWVzTGVmdCAtIDFdKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHNxbEVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0ocmVqZWN0KTtcbiAgICB9KTtcblxuICAgIGV4ZWN1dGVDYWxsYmFjayhwcm9taXNlLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5cbmZ1bmN0aW9uIHNldEl0ZW0kMShrZXksIHZhbHVlLCBjYWxsYmFjaykge1xuICAgIHJldHVybiBfc2V0SXRlbS5hcHBseSh0aGlzLCBba2V5LCB2YWx1ZSwgY2FsbGJhY2ssIDFdKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlSXRlbSQxKGtleSwgY2FsbGJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBrZXkgPSBub3JtYWxpemVLZXkoa2V5KTtcblxuICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UkMShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHNlbGYucmVhZHkoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBkYkluZm8gPSBzZWxmLl9kYkluZm87XG4gICAgICAgICAgICBkYkluZm8uZGIudHJhbnNhY3Rpb24oZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgICAgICB0cnlFeGVjdXRlU3FsKHQsIGRiSW5mbywgJ0RFTEVURSBGUk9NICcgKyBkYkluZm8uc3RvcmVOYW1lICsgJyBXSEVSRSBrZXkgPSA/JywgW2tleV0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICh0LCBlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0ocmVqZWN0KTtcbiAgICB9KTtcblxuICAgIGV4ZWN1dGVDYWxsYmFjayhwcm9taXNlLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5cbi8vIERlbGV0ZXMgZXZlcnkgaXRlbSBpbiB0aGUgdGFibGUuXG4vLyBUT0RPOiBGaW5kIG91dCBpZiB0aGlzIHJlc2V0cyB0aGUgQVVUT19JTkNSRU1FTlQgbnVtYmVyLlxuZnVuY3Rpb24gY2xlYXIkMShjYWxsYmFjaykge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UkMShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHNlbGYucmVhZHkoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBkYkluZm8gPSBzZWxmLl9kYkluZm87XG4gICAgICAgICAgICBkYkluZm8uZGIudHJhbnNhY3Rpb24oZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgICAgICB0cnlFeGVjdXRlU3FsKHQsIGRiSW5mbywgJ0RFTEVURSBGUk9NICcgKyBkYkluZm8uc3RvcmVOYW1lLCBbXSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHQsIGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlbXCJjYXRjaFwiXShyZWplY3QpO1xuICAgIH0pO1xuXG4gICAgZXhlY3V0ZUNhbGxiYWNrKHByb21pc2UsIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbn1cblxuLy8gRG9lcyBhIHNpbXBsZSBgQ09VTlQoa2V5KWAgdG8gZ2V0IHRoZSBudW1iZXIgb2YgaXRlbXMgc3RvcmVkIGluXG4vLyBsb2NhbEZvcmFnZS5cbmZ1bmN0aW9uIGxlbmd0aCQxKGNhbGxiYWNrKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSQxKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgc2VsZi5yZWFkeSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGRiSW5mbyA9IHNlbGYuX2RiSW5mbztcbiAgICAgICAgICAgIGRiSW5mby5kYi50cmFuc2FjdGlvbihmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgICAgIC8vIEFoaGgsIFNRTCBtYWtlcyB0aGlzIG9uZSBzb29vb29vIGVhc3kuXG4gICAgICAgICAgICAgICAgdHJ5RXhlY3V0ZVNxbCh0LCBkYkluZm8sICdTRUxFQ1QgQ09VTlQoa2V5KSBhcyBjIEZST00gJyArIGRiSW5mby5zdG9yZU5hbWUsIFtdLCBmdW5jdGlvbiAodCwgcmVzdWx0cykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gcmVzdWx0cy5yb3dzLml0ZW0oMCkuYztcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICh0LCBlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0ocmVqZWN0KTtcbiAgICB9KTtcblxuICAgIGV4ZWN1dGVDYWxsYmFjayhwcm9taXNlLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5cbi8vIFJldHVybiB0aGUga2V5IGxvY2F0ZWQgYXQga2V5IGluZGV4IFg7IGVzc2VudGlhbGx5IGdldHMgdGhlIGtleSBmcm9tIGFcbi8vIGBXSEVSRSBpZCA9ID9gLiBUaGlzIGlzIHRoZSBtb3N0IGVmZmljaWVudCB3YXkgSSBjYW4gdGhpbmsgdG8gaW1wbGVtZW50XG4vLyB0aGlzIHJhcmVseS11c2VkIChpbiBteSBleHBlcmllbmNlKSBwYXJ0IG9mIHRoZSBBUEksIGJ1dCBpdCBjYW4gc2VlbVxuLy8gaW5jb25zaXN0ZW50LCBiZWNhdXNlIHdlIGRvIGBJTlNFUlQgT1IgUkVQTEFDRSBJTlRPYCBvbiBgc2V0SXRlbSgpYCwgc29cbi8vIHRoZSBJRCBvZiBlYWNoIGtleSB3aWxsIGNoYW5nZSBldmVyeSB0aW1lIGl0J3MgdXBkYXRlZC4gUGVyaGFwcyBhIHN0b3JlZFxuLy8gcHJvY2VkdXJlIGZvciB0aGUgYHNldEl0ZW0oKWAgU1FMIHdvdWxkIHNvbHZlIHRoaXMgcHJvYmxlbT9cbi8vIFRPRE86IERvbid0IGNoYW5nZSBJRCBvbiBgc2V0SXRlbSgpYC5cbmZ1bmN0aW9uIGtleSQxKG4sIGNhbGxiYWNrKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSQxKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgc2VsZi5yZWFkeSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGRiSW5mbyA9IHNlbGYuX2RiSW5mbztcbiAgICAgICAgICAgIGRiSW5mby5kYi50cmFuc2FjdGlvbihmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgICAgIHRyeUV4ZWN1dGVTcWwodCwgZGJJbmZvLCAnU0VMRUNUIGtleSBGUk9NICcgKyBkYkluZm8uc3RvcmVOYW1lICsgJyBXSEVSRSBpZCA9ID8gTElNSVQgMScsIFtuICsgMV0sIGZ1bmN0aW9uICh0LCByZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSByZXN1bHRzLnJvd3MubGVuZ3RoID8gcmVzdWx0cy5yb3dzLml0ZW0oMCkua2V5IDogbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICh0LCBlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0ocmVqZWN0KTtcbiAgICB9KTtcblxuICAgIGV4ZWN1dGVDYWxsYmFjayhwcm9taXNlLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5cbmZ1bmN0aW9uIGtleXMkMShjYWxsYmFjaykge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UkMShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHNlbGYucmVhZHkoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBkYkluZm8gPSBzZWxmLl9kYkluZm87XG4gICAgICAgICAgICBkYkluZm8uZGIudHJhbnNhY3Rpb24oZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgICAgICB0cnlFeGVjdXRlU3FsKHQsIGRiSW5mbywgJ1NFTEVDVCBrZXkgRlJPTSAnICsgZGJJbmZvLnN0b3JlTmFtZSwgW10sIGZ1bmN0aW9uICh0LCByZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBrZXlzID0gW107XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHRzLnJvd3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXMucHVzaChyZXN1bHRzLnJvd3MuaXRlbShpKS5rZXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShrZXlzKTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAodCwgZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVtcImNhdGNoXCJdKHJlamVjdCk7XG4gICAgfSk7XG5cbiAgICBleGVjdXRlQ2FsbGJhY2socHJvbWlzZSwgY2FsbGJhY2spO1xuICAgIHJldHVybiBwcm9taXNlO1xufVxuXG4vLyBodHRwczovL3d3dy53My5vcmcvVFIvd2ViZGF0YWJhc2UvI2RhdGFiYXNlc1xuLy8gPiBUaGVyZSBpcyBubyB3YXkgdG8gZW51bWVyYXRlIG9yIGRlbGV0ZSB0aGUgZGF0YWJhc2VzIGF2YWlsYWJsZSBmb3IgYW4gb3JpZ2luIGZyb20gdGhpcyBBUEkuXG5mdW5jdGlvbiBnZXRBbGxTdG9yZU5hbWVzKGRiKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlJDEoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBkYi50cmFuc2FjdGlvbihmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgdC5leGVjdXRlU3FsKCdTRUxFQ1QgbmFtZSBGUk9NIHNxbGl0ZV9tYXN0ZXIgJyArIFwiV0hFUkUgdHlwZT0ndGFibGUnIEFORCBuYW1lIDw+ICdfX1dlYktpdERhdGFiYXNlSW5mb1RhYmxlX18nXCIsIFtdLCBmdW5jdGlvbiAodCwgcmVzdWx0cykge1xuICAgICAgICAgICAgICAgIHZhciBzdG9yZU5hbWVzID0gW107XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3VsdHMucm93cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBzdG9yZU5hbWVzLnB1c2gocmVzdWx0cy5yb3dzLml0ZW0oaSkubmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgIGRiOiBkYixcbiAgICAgICAgICAgICAgICAgICAgc3RvcmVOYW1lczogc3RvcmVOYW1lc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHQsIGVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBmdW5jdGlvbiAoc3FsRXJyb3IpIHtcbiAgICAgICAgICAgIHJlamVjdChzcWxFcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBkcm9wSW5zdGFuY2UkMShvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIGNhbGxiYWNrID0gZ2V0Q2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHZhciBjdXJyZW50Q29uZmlnID0gdGhpcy5jb25maWcoKTtcbiAgICBvcHRpb25zID0gdHlwZW9mIG9wdGlvbnMgIT09ICdmdW5jdGlvbicgJiYgb3B0aW9ucyB8fCB7fTtcbiAgICBpZiAoIW9wdGlvbnMubmFtZSkge1xuICAgICAgICBvcHRpb25zLm5hbWUgPSBvcHRpb25zLm5hbWUgfHwgY3VycmVudENvbmZpZy5uYW1lO1xuICAgICAgICBvcHRpb25zLnN0b3JlTmFtZSA9IG9wdGlvbnMuc3RvcmVOYW1lIHx8IGN1cnJlbnRDb25maWcuc3RvcmVOYW1lO1xuICAgIH1cblxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgcHJvbWlzZTtcbiAgICBpZiAoIW9wdGlvbnMubmFtZSkge1xuICAgICAgICBwcm9taXNlID0gUHJvbWlzZSQxLnJlamVjdCgnSW52YWxpZCBhcmd1bWVudHMnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBwcm9taXNlID0gbmV3IFByb21pc2UkMShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgdmFyIGRiO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMubmFtZSA9PT0gY3VycmVudENvbmZpZy5uYW1lKSB7XG4gICAgICAgICAgICAgICAgLy8gdXNlIHRoZSBkYiByZWZlcmVuY2Ugb2YgdGhlIGN1cnJlbnQgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICBkYiA9IHNlbGYuX2RiSW5mby5kYjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGIgPSBvcGVuRGF0YWJhc2Uob3B0aW9ucy5uYW1lLCAnJywgJycsIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMuc3RvcmVOYW1lKSB7XG4gICAgICAgICAgICAgICAgLy8gZHJvcCBhbGwgZGF0YWJhc2UgdGFibGVzXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShnZXRBbGxTdG9yZU5hbWVzKGRiKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICBkYjogZGIsXG4gICAgICAgICAgICAgICAgICAgIHN0b3JlTmFtZXM6IFtvcHRpb25zLnN0b3JlTmFtZV1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAob3BlcmF0aW9uSW5mbykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlJDEoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIG9wZXJhdGlvbkluZm8uZGIudHJhbnNhY3Rpb24oZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gZHJvcFRhYmxlKHN0b3JlTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlJDEoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQuZXhlY3V0ZVNxbCgnRFJPUCBUQUJMRSBJRiBFWElTVFMgJyArIHN0b3JlTmFtZSwgW10sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICh0LCBlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB2YXIgb3BlcmF0aW9ucyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gb3BlcmF0aW9uSW5mby5zdG9yZU5hbWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25zLnB1c2goZHJvcFRhYmxlKG9wZXJhdGlvbkluZm8uc3RvcmVOYW1lc1tpXSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgUHJvbWlzZSQxLmFsbChvcGVyYXRpb25zKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoc3FsRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHNxbEVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBleGVjdXRlQ2FsbGJhY2socHJvbWlzZSwgY2FsbGJhY2spO1xuICAgIHJldHVybiBwcm9taXNlO1xufVxuXG52YXIgd2ViU1FMU3RvcmFnZSA9IHtcbiAgICBfZHJpdmVyOiAnd2ViU1FMU3RvcmFnZScsXG4gICAgX2luaXRTdG9yYWdlOiBfaW5pdFN0b3JhZ2UkMSxcbiAgICBfc3VwcG9ydDogaXNXZWJTUUxWYWxpZCgpLFxuICAgIGl0ZXJhdGU6IGl0ZXJhdGUkMSxcbiAgICBnZXRJdGVtOiBnZXRJdGVtJDEsXG4gICAgc2V0SXRlbTogc2V0SXRlbSQxLFxuICAgIHJlbW92ZUl0ZW06IHJlbW92ZUl0ZW0kMSxcbiAgICBjbGVhcjogY2xlYXIkMSxcbiAgICBsZW5ndGg6IGxlbmd0aCQxLFxuICAgIGtleToga2V5JDEsXG4gICAga2V5czoga2V5cyQxLFxuICAgIGRyb3BJbnN0YW5jZTogZHJvcEluc3RhbmNlJDFcbn07XG5cbmZ1bmN0aW9uIGlzTG9jYWxTdG9yYWdlVmFsaWQoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBsb2NhbFN0b3JhZ2UgIT09ICd1bmRlZmluZWQnICYmICdzZXRJdGVtJyBpbiBsb2NhbFN0b3JhZ2UgJiZcbiAgICAgICAgLy8gaW4gSUU4IHR5cGVvZiBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSA9PT0gJ29iamVjdCdcbiAgICAgICAgISFsb2NhbFN0b3JhZ2Uuc2V0SXRlbTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIF9nZXRLZXlQcmVmaXgob3B0aW9ucywgZGVmYXVsdENvbmZpZykge1xuICAgIHZhciBrZXlQcmVmaXggPSBvcHRpb25zLm5hbWUgKyAnLyc7XG5cbiAgICBpZiAob3B0aW9ucy5zdG9yZU5hbWUgIT09IGRlZmF1bHRDb25maWcuc3RvcmVOYW1lKSB7XG4gICAgICAgIGtleVByZWZpeCArPSBvcHRpb25zLnN0b3JlTmFtZSArICcvJztcbiAgICB9XG4gICAgcmV0dXJuIGtleVByZWZpeDtcbn1cblxuLy8gQ2hlY2sgaWYgbG9jYWxTdG9yYWdlIHRocm93cyB3aGVuIHNhdmluZyBhbiBpdGVtXG5mdW5jdGlvbiBjaGVja0lmTG9jYWxTdG9yYWdlVGhyb3dzKCkge1xuICAgIHZhciBsb2NhbFN0b3JhZ2VUZXN0S2V5ID0gJ19sb2NhbGZvcmFnZV9zdXBwb3J0X3Rlc3QnO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0obG9jYWxTdG9yYWdlVGVzdEtleSwgdHJ1ZSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGxvY2FsU3RvcmFnZVRlc3RLZXkpO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cblxuLy8gQ2hlY2sgaWYgbG9jYWxTdG9yYWdlIGlzIHVzYWJsZSBhbmQgYWxsb3dzIHRvIHNhdmUgYW4gaXRlbVxuLy8gVGhpcyBtZXRob2QgY2hlY2tzIGlmIGxvY2FsU3RvcmFnZSBpcyB1c2FibGUgaW4gU2FmYXJpIFByaXZhdGUgQnJvd3Npbmdcbi8vIG1vZGUsIG9yIGluIGFueSBvdGhlciBjYXNlIHdoZXJlIHRoZSBhdmFpbGFibGUgcXVvdGEgZm9yIGxvY2FsU3RvcmFnZVxuLy8gaXMgMCBhbmQgdGhlcmUgd2Fzbid0IGFueSBzYXZlZCBpdGVtcyB5ZXQuXG5mdW5jdGlvbiBfaXNMb2NhbFN0b3JhZ2VVc2FibGUoKSB7XG4gICAgcmV0dXJuICFjaGVja0lmTG9jYWxTdG9yYWdlVGhyb3dzKCkgfHwgbG9jYWxTdG9yYWdlLmxlbmd0aCA+IDA7XG59XG5cbi8vIENvbmZpZyB0aGUgbG9jYWxTdG9yYWdlIGJhY2tlbmQsIHVzaW5nIG9wdGlvbnMgc2V0IGluIHRoZSBjb25maWcuXG5mdW5jdGlvbiBfaW5pdFN0b3JhZ2UkMihvcHRpb25zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBkYkluZm8gPSB7fTtcbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgICBmb3IgKHZhciBpIGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGRiSW5mb1tpXSA9IG9wdGlvbnNbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkYkluZm8ua2V5UHJlZml4ID0gX2dldEtleVByZWZpeChvcHRpb25zLCBzZWxmLl9kZWZhdWx0Q29uZmlnKTtcblxuICAgIGlmICghX2lzTG9jYWxTdG9yYWdlVXNhYmxlKCkpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UkMS5yZWplY3QoKTtcbiAgICB9XG5cbiAgICBzZWxmLl9kYkluZm8gPSBkYkluZm87XG4gICAgZGJJbmZvLnNlcmlhbGl6ZXIgPSBsb2NhbGZvcmFnZVNlcmlhbGl6ZXI7XG5cbiAgICByZXR1cm4gUHJvbWlzZSQxLnJlc29sdmUoKTtcbn1cblxuLy8gUmVtb3ZlIGFsbCBrZXlzIGZyb20gdGhlIGRhdGFzdG9yZSwgZWZmZWN0aXZlbHkgZGVzdHJveWluZyBhbGwgZGF0YSBpblxuLy8gdGhlIGFwcCdzIGtleS92YWx1ZSBzdG9yZSFcbmZ1bmN0aW9uIGNsZWFyJDIoY2FsbGJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIHByb21pc2UgPSBzZWxmLnJlYWR5KCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBrZXlQcmVmaXggPSBzZWxmLl9kYkluZm8ua2V5UHJlZml4O1xuXG4gICAgICAgIGZvciAodmFyIGkgPSBsb2NhbFN0b3JhZ2UubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBsb2NhbFN0b3JhZ2Uua2V5KGkpO1xuXG4gICAgICAgICAgICBpZiAoa2V5LmluZGV4T2Yoa2V5UHJlZml4KSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4ZWN1dGVDYWxsYmFjayhwcm9taXNlLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5cbi8vIFJldHJpZXZlIGFuIGl0ZW0gZnJvbSB0aGUgc3RvcmUuIFVubGlrZSB0aGUgb3JpZ2luYWwgYXN5bmNfc3RvcmFnZVxuLy8gbGlicmFyeSBpbiBHYWlhLCB3ZSBkb24ndCBtb2RpZnkgcmV0dXJuIHZhbHVlcyBhdCBhbGwuIElmIGEga2V5J3MgdmFsdWVcbi8vIGlzIGB1bmRlZmluZWRgLCB3ZSBwYXNzIHRoYXQgdmFsdWUgdG8gdGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxuZnVuY3Rpb24gZ2V0SXRlbSQyKGtleSwgY2FsbGJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBrZXkgPSBub3JtYWxpemVLZXkoa2V5KTtcblxuICAgIHZhciBwcm9taXNlID0gc2VsZi5yZWFkeSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGJJbmZvID0gc2VsZi5fZGJJbmZvO1xuICAgICAgICB2YXIgcmVzdWx0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oZGJJbmZvLmtleVByZWZpeCArIGtleSk7XG5cbiAgICAgICAgLy8gSWYgYSByZXN1bHQgd2FzIGZvdW5kLCBwYXJzZSBpdCBmcm9tIHRoZSBzZXJpYWxpemVkXG4gICAgICAgIC8vIHN0cmluZyBpbnRvIGEgSlMgb2JqZWN0LiBJZiByZXN1bHQgaXNuJ3QgdHJ1dGh5LCB0aGUga2V5XG4gICAgICAgIC8vIGlzIGxpa2VseSB1bmRlZmluZWQgYW5kIHdlJ2xsIHBhc3MgaXQgc3RyYWlnaHQgdG8gdGhlXG4gICAgICAgIC8vIGNhbGxiYWNrLlxuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICByZXN1bHQgPSBkYkluZm8uc2VyaWFsaXplci5kZXNlcmlhbGl6ZShyZXN1bHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9KTtcblxuICAgIGV4ZWN1dGVDYWxsYmFjayhwcm9taXNlLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5cbi8vIEl0ZXJhdGUgb3ZlciBhbGwgaXRlbXMgaW4gdGhlIHN0b3JlLlxuZnVuY3Rpb24gaXRlcmF0ZSQyKGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHZhciBwcm9taXNlID0gc2VsZi5yZWFkeSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGJJbmZvID0gc2VsZi5fZGJJbmZvO1xuICAgICAgICB2YXIga2V5UHJlZml4ID0gZGJJbmZvLmtleVByZWZpeDtcbiAgICAgICAgdmFyIGtleVByZWZpeExlbmd0aCA9IGtleVByZWZpeC5sZW5ndGg7XG4gICAgICAgIHZhciBsZW5ndGggPSBsb2NhbFN0b3JhZ2UubGVuZ3RoO1xuXG4gICAgICAgIC8vIFdlIHVzZSBhIGRlZGljYXRlZCBpdGVyYXRvciBpbnN0ZWFkIG9mIHRoZSBgaWAgdmFyaWFibGUgYmVsb3dcbiAgICAgICAgLy8gc28gb3RoZXIga2V5cyB3ZSBmZXRjaCBpbiBsb2NhbFN0b3JhZ2UgYXJlbid0IGNvdW50ZWQgaW5cbiAgICAgICAgLy8gdGhlIGBpdGVyYXRpb25OdW1iZXJgIGFyZ3VtZW50IHBhc3NlZCB0byB0aGUgYGl0ZXJhdGUoKWBcbiAgICAgICAgLy8gY2FsbGJhY2suXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFNlZTogZ2l0aHViLmNvbS9tb3ppbGxhL2xvY2FsRm9yYWdlL3B1bGwvNDM1I2Rpc2N1c3Npb25fcjM4MDYxNTMwXG4gICAgICAgIHZhciBpdGVyYXRpb25OdW1iZXIgPSAxO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBsb2NhbFN0b3JhZ2Uua2V5KGkpO1xuICAgICAgICAgICAgaWYgKGtleS5pbmRleE9mKGtleVByZWZpeCkgIT09IDApIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG5cbiAgICAgICAgICAgIC8vIElmIGEgcmVzdWx0IHdhcyBmb3VuZCwgcGFyc2UgaXQgZnJvbSB0aGUgc2VyaWFsaXplZFxuICAgICAgICAgICAgLy8gc3RyaW5nIGludG8gYSBKUyBvYmplY3QuIElmIHJlc3VsdCBpc24ndCB0cnV0aHksIHRoZVxuICAgICAgICAgICAgLy8ga2V5IGlzIGxpa2VseSB1bmRlZmluZWQgYW5kIHdlJ2xsIHBhc3MgaXQgc3RyYWlnaHRcbiAgICAgICAgICAgIC8vIHRvIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gZGJJbmZvLnNlcmlhbGl6ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YWx1ZSA9IGl0ZXJhdG9yKHZhbHVlLCBrZXkuc3Vic3RyaW5nKGtleVByZWZpeExlbmd0aCksIGl0ZXJhdGlvbk51bWJlcisrKTtcblxuICAgICAgICAgICAgaWYgKHZhbHVlICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4ZWN1dGVDYWxsYmFjayhwcm9taXNlLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5cbi8vIFNhbWUgYXMgbG9jYWxTdG9yYWdlJ3Mga2V5KCkgbWV0aG9kLCBleGNlcHQgdGFrZXMgYSBjYWxsYmFjay5cbmZ1bmN0aW9uIGtleSQyKG4sIGNhbGxiYWNrKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBwcm9taXNlID0gc2VsZi5yZWFkeSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGJJbmZvID0gc2VsZi5fZGJJbmZvO1xuICAgICAgICB2YXIgcmVzdWx0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzdWx0ID0gbG9jYWxTdG9yYWdlLmtleShuKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZW1vdmUgdGhlIHByZWZpeCBmcm9tIHRoZSBrZXksIGlmIGEga2V5IGlzIGZvdW5kLlxuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuc3Vic3RyaW5nKGRiSW5mby5rZXlQcmVmaXgubGVuZ3RoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSk7XG5cbiAgICBleGVjdXRlQ2FsbGJhY2socHJvbWlzZSwgY2FsbGJhY2spO1xuICAgIHJldHVybiBwcm9taXNlO1xufVxuXG5mdW5jdGlvbiBrZXlzJDIoY2FsbGJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIHByb21pc2UgPSBzZWxmLnJlYWR5KCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkYkluZm8gPSBzZWxmLl9kYkluZm87XG4gICAgICAgIHZhciBsZW5ndGggPSBsb2NhbFN0b3JhZ2UubGVuZ3RoO1xuICAgICAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBpdGVtS2V5ID0gbG9jYWxTdG9yYWdlLmtleShpKTtcbiAgICAgICAgICAgIGlmIChpdGVtS2V5LmluZGV4T2YoZGJJbmZvLmtleVByZWZpeCkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBrZXlzLnB1c2goaXRlbUtleS5zdWJzdHJpbmcoZGJJbmZvLmtleVByZWZpeC5sZW5ndGgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBrZXlzO1xuICAgIH0pO1xuXG4gICAgZXhlY3V0ZUNhbGxiYWNrKHByb21pc2UsIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbn1cblxuLy8gU3VwcGx5IHRoZSBudW1iZXIgb2Yga2V5cyBpbiB0aGUgZGF0YXN0b3JlIHRvIHRoZSBjYWxsYmFjayBmdW5jdGlvbi5cbmZ1bmN0aW9uIGxlbmd0aCQyKGNhbGxiYWNrKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBwcm9taXNlID0gc2VsZi5rZXlzKCkudGhlbihmdW5jdGlvbiAoa2V5cykge1xuICAgICAgICByZXR1cm4ga2V5cy5sZW5ndGg7XG4gICAgfSk7XG5cbiAgICBleGVjdXRlQ2FsbGJhY2socHJvbWlzZSwgY2FsbGJhY2spO1xuICAgIHJldHVybiBwcm9taXNlO1xufVxuXG4vLyBSZW1vdmUgYW4gaXRlbSBmcm9tIHRoZSBzdG9yZSwgbmljZSBhbmQgc2ltcGxlLlxuZnVuY3Rpb24gcmVtb3ZlSXRlbSQyKGtleSwgY2FsbGJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBrZXkgPSBub3JtYWxpemVLZXkoa2V5KTtcblxuICAgIHZhciBwcm9taXNlID0gc2VsZi5yZWFkeSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGJJbmZvID0gc2VsZi5fZGJJbmZvO1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShkYkluZm8ua2V5UHJlZml4ICsga2V5KTtcbiAgICB9KTtcblxuICAgIGV4ZWN1dGVDYWxsYmFjayhwcm9taXNlLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5cbi8vIFNldCBhIGtleSdzIHZhbHVlIGFuZCBydW4gYW4gb3B0aW9uYWwgY2FsbGJhY2sgb25jZSB0aGUgdmFsdWUgaXMgc2V0LlxuLy8gVW5saWtlIEdhaWEncyBpbXBsZW1lbnRhdGlvbiwgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGlzIHBhc3NlZCB0aGUgdmFsdWUsXG4vLyBpbiBjYXNlIHlvdSB3YW50IHRvIG9wZXJhdGUgb24gdGhhdCB2YWx1ZSBvbmx5IGFmdGVyIHlvdSdyZSBzdXJlIGl0XG4vLyBzYXZlZCwgb3Igc29tZXRoaW5nIGxpa2UgdGhhdC5cbmZ1bmN0aW9uIHNldEl0ZW0kMihrZXksIHZhbHVlLCBjYWxsYmFjaykge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIGtleSA9IG5vcm1hbGl6ZUtleShrZXkpO1xuXG4gICAgdmFyIHByb21pc2UgPSBzZWxmLnJlYWR5KCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIENvbnZlcnQgdW5kZWZpbmVkIHZhbHVlcyB0byBudWxsLlxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS9sb2NhbEZvcmFnZS9wdWxsLzQyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTYXZlIHRoZSBvcmlnaW5hbCB2YWx1ZSB0byBwYXNzIHRvIHRoZSBjYWxsYmFjay5cbiAgICAgICAgdmFyIG9yaWdpbmFsVmFsdWUgPSB2YWx1ZTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UkMShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICB2YXIgZGJJbmZvID0gc2VsZi5fZGJJbmZvO1xuICAgICAgICAgICAgZGJJbmZvLnNlcmlhbGl6ZXIuc2VyaWFsaXplKHZhbHVlLCBmdW5jdGlvbiAodmFsdWUsIGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGRiSW5mby5rZXlQcmVmaXggKyBrZXksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUob3JpZ2luYWxWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxvY2FsU3RvcmFnZSBjYXBhY2l0eSBleGNlZWRlZC5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IE1ha2UgdGhpcyBhIHNwZWNpZmljIGVycm9yL2V2ZW50LlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUubmFtZSA9PT0gJ1F1b3RhRXhjZWVkZWRFcnJvcicgfHwgZS5uYW1lID09PSAnTlNfRVJST1JfRE9NX1FVT1RBX1JFQUNIRUQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZXhlY3V0ZUNhbGxiYWNrKHByb21pc2UsIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbn1cblxuZnVuY3Rpb24gZHJvcEluc3RhbmNlJDIob3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICBjYWxsYmFjayA9IGdldENhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICBvcHRpb25zID0gdHlwZW9mIG9wdGlvbnMgIT09ICdmdW5jdGlvbicgJiYgb3B0aW9ucyB8fCB7fTtcbiAgICBpZiAoIW9wdGlvbnMubmFtZSkge1xuICAgICAgICB2YXIgY3VycmVudENvbmZpZyA9IHRoaXMuY29uZmlnKCk7XG4gICAgICAgIG9wdGlvbnMubmFtZSA9IG9wdGlvbnMubmFtZSB8fCBjdXJyZW50Q29uZmlnLm5hbWU7XG4gICAgICAgIG9wdGlvbnMuc3RvcmVOYW1lID0gb3B0aW9ucy5zdG9yZU5hbWUgfHwgY3VycmVudENvbmZpZy5zdG9yZU5hbWU7XG4gICAgfVxuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBwcm9taXNlO1xuICAgIGlmICghb3B0aW9ucy5uYW1lKSB7XG4gICAgICAgIHByb21pc2UgPSBQcm9taXNlJDEucmVqZWN0KCdJbnZhbGlkIGFyZ3VtZW50cycpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHByb21pc2UgPSBuZXcgUHJvbWlzZSQxKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMuc3RvcmVOYW1lKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShvcHRpb25zLm5hbWUgKyAnLycpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKF9nZXRLZXlQcmVmaXgob3B0aW9ucywgc2VsZi5fZGVmYXVsdENvbmZpZykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChrZXlQcmVmaXgpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBsb2NhbFN0b3JhZ2UubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0gbG9jYWxTdG9yYWdlLmtleShpKTtcblxuICAgICAgICAgICAgICAgIGlmIChrZXkuaW5kZXhPZihrZXlQcmVmaXgpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBleGVjdXRlQ2FsbGJhY2socHJvbWlzZSwgY2FsbGJhY2spO1xuICAgIHJldHVybiBwcm9taXNlO1xufVxuXG52YXIgbG9jYWxTdG9yYWdlV3JhcHBlciA9IHtcbiAgICBfZHJpdmVyOiAnbG9jYWxTdG9yYWdlV3JhcHBlcicsXG4gICAgX2luaXRTdG9yYWdlOiBfaW5pdFN0b3JhZ2UkMixcbiAgICBfc3VwcG9ydDogaXNMb2NhbFN0b3JhZ2VWYWxpZCgpLFxuICAgIGl0ZXJhdGU6IGl0ZXJhdGUkMixcbiAgICBnZXRJdGVtOiBnZXRJdGVtJDIsXG4gICAgc2V0SXRlbTogc2V0SXRlbSQyLFxuICAgIHJlbW92ZUl0ZW06IHJlbW92ZUl0ZW0kMixcbiAgICBjbGVhcjogY2xlYXIkMixcbiAgICBsZW5ndGg6IGxlbmd0aCQyLFxuICAgIGtleToga2V5JDIsXG4gICAga2V5czoga2V5cyQyLFxuICAgIGRyb3BJbnN0YW5jZTogZHJvcEluc3RhbmNlJDJcbn07XG5cbnZhciBzYW1lVmFsdWUgPSBmdW5jdGlvbiBzYW1lVmFsdWUoeCwgeSkge1xuICAgIHJldHVybiB4ID09PSB5IHx8IHR5cGVvZiB4ID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgeSA9PT0gJ251bWJlcicgJiYgaXNOYU4oeCkgJiYgaXNOYU4oeSk7XG59O1xuXG52YXIgaW5jbHVkZXMgPSBmdW5jdGlvbiBpbmNsdWRlcyhhcnJheSwgc2VhcmNoRWxlbWVudCkge1xuICAgIHZhciBsZW4gPSBhcnJheS5sZW5ndGg7XG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICAgIGlmIChzYW1lVmFsdWUoYXJyYXlbaV0sIHNlYXJjaEVsZW1lbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpKys7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChhcmcpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG4vLyBEcml2ZXJzIGFyZSBzdG9yZWQgaGVyZSB3aGVuIGBkZWZpbmVEcml2ZXIoKWAgaXMgY2FsbGVkLlxuLy8gVGhleSBhcmUgc2hhcmVkIGFjcm9zcyBhbGwgaW5zdGFuY2VzIG9mIGxvY2FsRm9yYWdlLlxudmFyIERlZmluZWREcml2ZXJzID0ge307XG5cbnZhciBEcml2ZXJTdXBwb3J0ID0ge307XG5cbnZhciBEZWZhdWx0RHJpdmVycyA9IHtcbiAgICBJTkRFWEVEREI6IGFzeW5jU3RvcmFnZSxcbiAgICBXRUJTUUw6IHdlYlNRTFN0b3JhZ2UsXG4gICAgTE9DQUxTVE9SQUdFOiBsb2NhbFN0b3JhZ2VXcmFwcGVyXG59O1xuXG52YXIgRGVmYXVsdERyaXZlck9yZGVyID0gW0RlZmF1bHREcml2ZXJzLklOREVYRUREQi5fZHJpdmVyLCBEZWZhdWx0RHJpdmVycy5XRUJTUUwuX2RyaXZlciwgRGVmYXVsdERyaXZlcnMuTE9DQUxTVE9SQUdFLl9kcml2ZXJdO1xuXG52YXIgT3B0aW9uYWxEcml2ZXJNZXRob2RzID0gWydkcm9wSW5zdGFuY2UnXTtcblxudmFyIExpYnJhcnlNZXRob2RzID0gWydjbGVhcicsICdnZXRJdGVtJywgJ2l0ZXJhdGUnLCAna2V5JywgJ2tleXMnLCAnbGVuZ3RoJywgJ3JlbW92ZUl0ZW0nLCAnc2V0SXRlbSddLmNvbmNhdChPcHRpb25hbERyaXZlck1ldGhvZHMpO1xuXG52YXIgRGVmYXVsdENvbmZpZyA9IHtcbiAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgZHJpdmVyOiBEZWZhdWx0RHJpdmVyT3JkZXIuc2xpY2UoKSxcbiAgICBuYW1lOiAnbG9jYWxmb3JhZ2UnLFxuICAgIC8vIERlZmF1bHQgREIgc2l6ZSBpcyBfSlVTVCBVTkRFUl8gNU1CLCBhcyBpdCdzIHRoZSBoaWdoZXN0IHNpemVcbiAgICAvLyB3ZSBjYW4gdXNlIHdpdGhvdXQgYSBwcm9tcHQuXG4gICAgc2l6ZTogNDk4MDczNixcbiAgICBzdG9yZU5hbWU6ICdrZXl2YWx1ZXBhaXJzJyxcbiAgICB2ZXJzaW9uOiAxLjBcbn07XG5cbmZ1bmN0aW9uIGNhbGxXaGVuUmVhZHkobG9jYWxGb3JhZ2VJbnN0YW5jZSwgbGlicmFyeU1ldGhvZCkge1xuICAgIGxvY2FsRm9yYWdlSW5zdGFuY2VbbGlicmFyeU1ldGhvZF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgcmV0dXJuIGxvY2FsRm9yYWdlSW5zdGFuY2UucmVhZHkoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBsb2NhbEZvcmFnZUluc3RhbmNlW2xpYnJhcnlNZXRob2RdLmFwcGx5KGxvY2FsRm9yYWdlSW5zdGFuY2UsIF9hcmdzKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZXh0ZW5kKCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBhcmcgPSBhcmd1bWVudHNbaV07XG5cbiAgICAgICAgaWYgKGFyZykge1xuICAgICAgICAgICAgZm9yICh2YXIgX2tleSBpbiBhcmcpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXJnLmhhc093blByb3BlcnR5KF9rZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0FycmF5KGFyZ1tfa2V5XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3VtZW50c1swXVtfa2V5XSA9IGFyZ1tfa2V5XS5zbGljZSgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJndW1lbnRzWzBdW19rZXldID0gYXJnW19rZXldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGFyZ3VtZW50c1swXTtcbn1cblxudmFyIExvY2FsRm9yYWdlID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExvY2FsRm9yYWdlKG9wdGlvbnMpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIExvY2FsRm9yYWdlKTtcblxuICAgICAgICBmb3IgKHZhciBkcml2ZXJUeXBlS2V5IGluIERlZmF1bHREcml2ZXJzKSB7XG4gICAgICAgICAgICBpZiAoRGVmYXVsdERyaXZlcnMuaGFzT3duUHJvcGVydHkoZHJpdmVyVHlwZUtleSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZHJpdmVyID0gRGVmYXVsdERyaXZlcnNbZHJpdmVyVHlwZUtleV07XG4gICAgICAgICAgICAgICAgdmFyIGRyaXZlck5hbWUgPSBkcml2ZXIuX2RyaXZlcjtcbiAgICAgICAgICAgICAgICB0aGlzW2RyaXZlclR5cGVLZXldID0gZHJpdmVyTmFtZTtcblxuICAgICAgICAgICAgICAgIGlmICghRGVmaW5lZERyaXZlcnNbZHJpdmVyTmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gd2UgZG9uJ3QgbmVlZCB0byB3YWl0IGZvciB0aGUgcHJvbWlzZSxcbiAgICAgICAgICAgICAgICAgICAgLy8gc2luY2UgdGhlIGRlZmF1bHQgZHJpdmVycyBjYW4gYmUgZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICAvLyBpbiBhIGJsb2NraW5nIG1hbm5lclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmluZURyaXZlcihkcml2ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2RlZmF1bHRDb25maWcgPSBleHRlbmQoe30sIERlZmF1bHRDb25maWcpO1xuICAgICAgICB0aGlzLl9jb25maWcgPSBleHRlbmQoe30sIHRoaXMuX2RlZmF1bHRDb25maWcsIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9kcml2ZXJTZXQgPSBudWxsO1xuICAgICAgICB0aGlzLl9pbml0RHJpdmVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcmVhZHkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZGJJbmZvID0gbnVsbDtcblxuICAgICAgICB0aGlzLl93cmFwTGlicmFyeU1ldGhvZHNXaXRoUmVhZHkoKTtcbiAgICAgICAgdGhpcy5zZXREcml2ZXIodGhpcy5fY29uZmlnLmRyaXZlcilbXCJjYXRjaFwiXShmdW5jdGlvbiAoKSB7fSk7XG4gICAgfVxuXG4gICAgLy8gU2V0IGFueSBjb25maWcgdmFsdWVzIGZvciBsb2NhbEZvcmFnZTsgY2FuIGJlIGNhbGxlZCBhbnl0aW1lIGJlZm9yZVxuICAgIC8vIHRoZSBmaXJzdCBBUEkgY2FsbCAoZS5nLiBgZ2V0SXRlbWAsIGBzZXRJdGVtYCkuXG4gICAgLy8gV2UgbG9vcCB0aHJvdWdoIG9wdGlvbnMgc28gd2UgZG9uJ3Qgb3ZlcndyaXRlIGV4aXN0aW5nIGNvbmZpZ1xuICAgIC8vIHZhbHVlcy5cblxuXG4gICAgTG9jYWxGb3JhZ2UucHJvdG90eXBlLmNvbmZpZyA9IGZ1bmN0aW9uIGNvbmZpZyhvcHRpb25zKSB7XG4gICAgICAgIC8vIElmIHRoZSBvcHRpb25zIGFyZ3VtZW50IGlzIGFuIG9iamVjdCwgd2UgdXNlIGl0IHRvIHNldCB2YWx1ZXMuXG4gICAgICAgIC8vIE90aGVyd2lzZSwgd2UgcmV0dXJuIGVpdGhlciBhIHNwZWNpZmllZCBjb25maWcgdmFsdWUgb3IgYWxsXG4gICAgICAgIC8vIGNvbmZpZyB2YWx1ZXMuXG4gICAgICAgIGlmICgodHlwZW9mIG9wdGlvbnMgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKG9wdGlvbnMpKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIC8vIElmIGxvY2FsZm9yYWdlIGlzIHJlYWR5IGFuZCBmdWxseSBpbml0aWFsaXplZCwgd2UgY2FuJ3Qgc2V0XG4gICAgICAgICAgICAvLyBhbnkgbmV3IGNvbmZpZ3VyYXRpb24gdmFsdWVzLiBJbnN0ZWFkLCB3ZSByZXR1cm4gYW4gZXJyb3IuXG4gICAgICAgICAgICBpZiAodGhpcy5fcmVhZHkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKFwiQ2FuJ3QgY2FsbCBjb25maWcoKSBhZnRlciBsb2NhbGZvcmFnZSBcIiArICdoYXMgYmVlbiB1c2VkLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gJ3N0b3JlTmFtZScpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1tpXSA9IG9wdGlvbnNbaV0ucmVwbGFjZSgvXFxXL2csICdfJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGkgPT09ICd2ZXJzaW9uJyAmJiB0eXBlb2Ygb3B0aW9uc1tpXSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignRGF0YWJhc2UgdmVyc2lvbiBtdXN0IGJlIGEgbnVtYmVyLicpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbmZpZ1tpXSA9IG9wdGlvbnNbaV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGFmdGVyIGFsbCBjb25maWcgb3B0aW9ucyBhcmUgc2V0IGFuZFxuICAgICAgICAgICAgLy8gdGhlIGRyaXZlciBvcHRpb24gaXMgdXNlZCwgdHJ5IHNldHRpbmcgaXRcbiAgICAgICAgICAgIGlmICgnZHJpdmVyJyBpbiBvcHRpb25zICYmIG9wdGlvbnMuZHJpdmVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0RHJpdmVyKHRoaXMuX2NvbmZpZy5kcml2ZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb25maWdbb3B0aW9uc107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIFVzZWQgdG8gZGVmaW5lIGEgY3VzdG9tIGRyaXZlciwgc2hhcmVkIGFjcm9zcyBhbGwgaW5zdGFuY2VzIG9mXG4gICAgLy8gbG9jYWxGb3JhZ2UuXG5cblxuICAgIExvY2FsRm9yYWdlLnByb3RvdHlwZS5kZWZpbmVEcml2ZXIgPSBmdW5jdGlvbiBkZWZpbmVEcml2ZXIoZHJpdmVyT2JqZWN0LCBjYWxsYmFjaywgZXJyb3JDYWxsYmFjaykge1xuICAgICAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlJDEoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB2YXIgZHJpdmVyTmFtZSA9IGRyaXZlck9iamVjdC5fZHJpdmVyO1xuICAgICAgICAgICAgICAgIHZhciBjb21wbGlhbmNlRXJyb3IgPSBuZXcgRXJyb3IoJ0N1c3RvbSBkcml2ZXIgbm90IGNvbXBsaWFudDsgc2VlICcgKyAnaHR0cHM6Ly9tb3ppbGxhLmdpdGh1Yi5pby9sb2NhbEZvcmFnZS8jZGVmaW5lZHJpdmVyJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBBIGRyaXZlciBuYW1lIHNob3VsZCBiZSBkZWZpbmVkIGFuZCBub3Qgb3ZlcmxhcCB3aXRoIHRoZVxuICAgICAgICAgICAgICAgIC8vIGxpYnJhcnktZGVmaW5lZCwgZGVmYXVsdCBkcml2ZXJzLlxuICAgICAgICAgICAgICAgIGlmICghZHJpdmVyT2JqZWN0Ll9kcml2ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGNvbXBsaWFuY2VFcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgZHJpdmVyTWV0aG9kcyA9IExpYnJhcnlNZXRob2RzLmNvbmNhdCgnX2luaXRTdG9yYWdlJyk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGRyaXZlck1ldGhvZHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRyaXZlck1ldGhvZE5hbWUgPSBkcml2ZXJNZXRob2RzW2ldO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHdoZW4gdGhlIHByb3BlcnR5IGlzIHRoZXJlLFxuICAgICAgICAgICAgICAgICAgICAvLyBpdCBzaG91bGQgYmUgYSBtZXRob2QgZXZlbiB3aGVuIG9wdGlvbmFsXG4gICAgICAgICAgICAgICAgICAgIHZhciBpc1JlcXVpcmVkID0gIWluY2x1ZGVzKE9wdGlvbmFsRHJpdmVyTWV0aG9kcywgZHJpdmVyTWV0aG9kTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoaXNSZXF1aXJlZCB8fCBkcml2ZXJPYmplY3RbZHJpdmVyTWV0aG9kTmFtZV0pICYmIHR5cGVvZiBkcml2ZXJPYmplY3RbZHJpdmVyTWV0aG9kTmFtZV0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChjb21wbGlhbmNlRXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGNvbmZpZ3VyZU1pc3NpbmdNZXRob2RzID0gZnVuY3Rpb24gY29uZmlndXJlTWlzc2luZ01ldGhvZHMoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtZXRob2ROb3RJbXBsZW1lbnRlZEZhY3RvcnkgPSBmdW5jdGlvbiBtZXRob2ROb3RJbXBsZW1lbnRlZEZhY3RvcnkobWV0aG9kTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoJ01ldGhvZCAnICsgbWV0aG9kTmFtZSArICcgaXMgbm90IGltcGxlbWVudGVkIGJ5IHRoZSBjdXJyZW50IGRyaXZlcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9taXNlID0gUHJvbWlzZSQxLnJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhlY3V0ZUNhbGxiYWNrKHByb21pc2UsIGFyZ3VtZW50c1thcmd1bWVudHMubGVuZ3RoIC0gMV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9sZW4gPSBPcHRpb25hbERyaXZlck1ldGhvZHMubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb25hbERyaXZlck1ldGhvZCA9IE9wdGlvbmFsRHJpdmVyTWV0aG9kc1tfaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWRyaXZlck9iamVjdFtvcHRpb25hbERyaXZlck1ldGhvZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcml2ZXJPYmplY3Rbb3B0aW9uYWxEcml2ZXJNZXRob2RdID0gbWV0aG9kTm90SW1wbGVtZW50ZWRGYWN0b3J5KG9wdGlvbmFsRHJpdmVyTWV0aG9kKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBjb25maWd1cmVNaXNzaW5nTWV0aG9kcygpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHNldERyaXZlclN1cHBvcnQgPSBmdW5jdGlvbiBzZXREcml2ZXJTdXBwb3J0KHN1cHBvcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKERlZmluZWREcml2ZXJzW2RyaXZlck5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ1JlZGVmaW5pbmcgTG9jYWxGb3JhZ2UgZHJpdmVyOiAnICsgZHJpdmVyTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgRGVmaW5lZERyaXZlcnNbZHJpdmVyTmFtZV0gPSBkcml2ZXJPYmplY3Q7XG4gICAgICAgICAgICAgICAgICAgIERyaXZlclN1cHBvcnRbZHJpdmVyTmFtZV0gPSBzdXBwb3J0O1xuICAgICAgICAgICAgICAgICAgICAvLyBkb24ndCB1c2UgYSB0aGVuLCBzbyB0aGF0IHdlIGNhbiBkZWZpbmVcbiAgICAgICAgICAgICAgICAgICAgLy8gZHJpdmVycyB0aGF0IGhhdmUgc2ltcGxlIF9zdXBwb3J0IG1ldGhvZHNcbiAgICAgICAgICAgICAgICAgICAgLy8gaW4gYSBibG9ja2luZyBtYW5uZXJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAoJ19zdXBwb3J0JyBpbiBkcml2ZXJPYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRyaXZlck9iamVjdC5fc3VwcG9ydCAmJiB0eXBlb2YgZHJpdmVyT2JqZWN0Ll9zdXBwb3J0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcml2ZXJPYmplY3QuX3N1cHBvcnQoKS50aGVuKHNldERyaXZlclN1cHBvcnQsIHJlamVjdCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXREcml2ZXJTdXBwb3J0KCEhZHJpdmVyT2JqZWN0Ll9zdXBwb3J0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNldERyaXZlclN1cHBvcnQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZXhlY3V0ZVR3b0NhbGxiYWNrcyhwcm9taXNlLCBjYWxsYmFjaywgZXJyb3JDYWxsYmFjayk7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH07XG5cbiAgICBMb2NhbEZvcmFnZS5wcm90b3R5cGUuZHJpdmVyID0gZnVuY3Rpb24gZHJpdmVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZHJpdmVyIHx8IG51bGw7XG4gICAgfTtcblxuICAgIExvY2FsRm9yYWdlLnByb3RvdHlwZS5nZXREcml2ZXIgPSBmdW5jdGlvbiBnZXREcml2ZXIoZHJpdmVyTmFtZSwgY2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGdldERyaXZlclByb21pc2UgPSBEZWZpbmVkRHJpdmVyc1tkcml2ZXJOYW1lXSA/IFByb21pc2UkMS5yZXNvbHZlKERlZmluZWREcml2ZXJzW2RyaXZlck5hbWVdKSA6IFByb21pc2UkMS5yZWplY3QobmV3IEVycm9yKCdEcml2ZXIgbm90IGZvdW5kLicpKTtcblxuICAgICAgICBleGVjdXRlVHdvQ2FsbGJhY2tzKGdldERyaXZlclByb21pc2UsIGNhbGxiYWNrLCBlcnJvckNhbGxiYWNrKTtcbiAgICAgICAgcmV0dXJuIGdldERyaXZlclByb21pc2U7XG4gICAgfTtcblxuICAgIExvY2FsRm9yYWdlLnByb3RvdHlwZS5nZXRTZXJpYWxpemVyID0gZnVuY3Rpb24gZ2V0U2VyaWFsaXplcihjYWxsYmFjaykge1xuICAgICAgICB2YXIgc2VyaWFsaXplclByb21pc2UgPSBQcm9taXNlJDEucmVzb2x2ZShsb2NhbGZvcmFnZVNlcmlhbGl6ZXIpO1xuICAgICAgICBleGVjdXRlVHdvQ2FsbGJhY2tzKHNlcmlhbGl6ZXJQcm9taXNlLCBjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiBzZXJpYWxpemVyUHJvbWlzZTtcbiAgICB9O1xuXG4gICAgTG9jYWxGb3JhZ2UucHJvdG90eXBlLnJlYWR5ID0gZnVuY3Rpb24gcmVhZHkoY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHZhciBwcm9taXNlID0gc2VsZi5fZHJpdmVyU2V0LnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHNlbGYuX3JlYWR5ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5fcmVhZHkgPSBzZWxmLl9pbml0RHJpdmVyKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBzZWxmLl9yZWFkeTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZXhlY3V0ZVR3b0NhbGxiYWNrcyhwcm9taXNlLCBjYWxsYmFjaywgY2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9O1xuXG4gICAgTG9jYWxGb3JhZ2UucHJvdG90eXBlLnNldERyaXZlciA9IGZ1bmN0aW9uIHNldERyaXZlcihkcml2ZXJzLCBjYWxsYmFjaywgZXJyb3JDYWxsYmFjaykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCFpc0FycmF5KGRyaXZlcnMpKSB7XG4gICAgICAgICAgICBkcml2ZXJzID0gW2RyaXZlcnNdO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHN1cHBvcnRlZERyaXZlcnMgPSB0aGlzLl9nZXRTdXBwb3J0ZWREcml2ZXJzKGRyaXZlcnMpO1xuXG4gICAgICAgIGZ1bmN0aW9uIHNldERyaXZlclRvQ29uZmlnKCkge1xuICAgICAgICAgICAgc2VsZi5fY29uZmlnLmRyaXZlciA9IHNlbGYuZHJpdmVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBleHRlbmRTZWxmV2l0aERyaXZlcihkcml2ZXIpIHtcbiAgICAgICAgICAgIHNlbGYuX2V4dGVuZChkcml2ZXIpO1xuICAgICAgICAgICAgc2V0RHJpdmVyVG9Db25maWcoKTtcblxuICAgICAgICAgICAgc2VsZi5fcmVhZHkgPSBzZWxmLl9pbml0U3RvcmFnZShzZWxmLl9jb25maWcpO1xuICAgICAgICAgICAgcmV0dXJuIHNlbGYuX3JlYWR5O1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaW5pdERyaXZlcihzdXBwb3J0ZWREcml2ZXJzKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50RHJpdmVySW5kZXggPSAwO1xuXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZHJpdmVyUHJvbWlzZUxvb3AoKSB7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChjdXJyZW50RHJpdmVySW5kZXggPCBzdXBwb3J0ZWREcml2ZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRyaXZlck5hbWUgPSBzdXBwb3J0ZWREcml2ZXJzW2N1cnJlbnREcml2ZXJJbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50RHJpdmVySW5kZXgrKztcblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fZGJJbmZvID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX3JlYWR5ID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuZ2V0RHJpdmVyKGRyaXZlck5hbWUpLnRoZW4oZXh0ZW5kU2VsZldpdGhEcml2ZXIpW1wiY2F0Y2hcIl0oZHJpdmVyUHJvbWlzZUxvb3ApO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgc2V0RHJpdmVyVG9Db25maWcoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKCdObyBhdmFpbGFibGUgc3RvcmFnZSBtZXRob2QgZm91bmQuJyk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2RyaXZlclNldCA9IFByb21pc2UkMS5yZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5fZHJpdmVyU2V0O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBkcml2ZXJQcm9taXNlTG9vcCgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoZXJlIG1pZ2h0IGJlIGEgZHJpdmVyIGluaXRpYWxpemF0aW9uIGluIHByb2dyZXNzXG4gICAgICAgIC8vIHNvIHdhaXQgZm9yIGl0IHRvIGZpbmlzaCBpbiBvcmRlciB0byBhdm9pZCBhIHBvc3NpYmxlXG4gICAgICAgIC8vIHJhY2UgY29uZGl0aW9uIHRvIHNldCBfZGJJbmZvXG4gICAgICAgIHZhciBvbGREcml2ZXJTZXREb25lID0gdGhpcy5fZHJpdmVyU2V0ICE9PSBudWxsID8gdGhpcy5fZHJpdmVyU2V0W1wiY2F0Y2hcIl0oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UkMS5yZXNvbHZlKCk7XG4gICAgICAgIH0pIDogUHJvbWlzZSQxLnJlc29sdmUoKTtcblxuICAgICAgICB0aGlzLl9kcml2ZXJTZXQgPSBvbGREcml2ZXJTZXREb25lLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGRyaXZlck5hbWUgPSBzdXBwb3J0ZWREcml2ZXJzWzBdO1xuICAgICAgICAgICAgc2VsZi5fZGJJbmZvID0gbnVsbDtcbiAgICAgICAgICAgIHNlbGYuX3JlYWR5ID0gbnVsbDtcblxuICAgICAgICAgICAgcmV0dXJuIHNlbGYuZ2V0RHJpdmVyKGRyaXZlck5hbWUpLnRoZW4oZnVuY3Rpb24gKGRyaXZlcikge1xuICAgICAgICAgICAgICAgIHNlbGYuX2RyaXZlciA9IGRyaXZlci5fZHJpdmVyO1xuICAgICAgICAgICAgICAgIHNldERyaXZlclRvQ29uZmlnKCk7XG4gICAgICAgICAgICAgICAgc2VsZi5fd3JhcExpYnJhcnlNZXRob2RzV2l0aFJlYWR5KCk7XG4gICAgICAgICAgICAgICAgc2VsZi5faW5pdERyaXZlciA9IGluaXREcml2ZXIoc3VwcG9ydGVkRHJpdmVycyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZXREcml2ZXJUb0NvbmZpZygpO1xuICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKCdObyBhdmFpbGFibGUgc3RvcmFnZSBtZXRob2QgZm91bmQuJyk7XG4gICAgICAgICAgICBzZWxmLl9kcml2ZXJTZXQgPSBQcm9taXNlJDEucmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLl9kcml2ZXJTZXQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGV4ZWN1dGVUd29DYWxsYmFja3ModGhpcy5fZHJpdmVyU2V0LCBjYWxsYmFjaywgZXJyb3JDYWxsYmFjayk7XG4gICAgICAgIHJldHVybiB0aGlzLl9kcml2ZXJTZXQ7XG4gICAgfTtcblxuICAgIExvY2FsRm9yYWdlLnByb3RvdHlwZS5zdXBwb3J0cyA9IGZ1bmN0aW9uIHN1cHBvcnRzKGRyaXZlck5hbWUpIHtcbiAgICAgICAgcmV0dXJuICEhRHJpdmVyU3VwcG9ydFtkcml2ZXJOYW1lXTtcbiAgICB9O1xuXG4gICAgTG9jYWxGb3JhZ2UucHJvdG90eXBlLl9leHRlbmQgPSBmdW5jdGlvbiBfZXh0ZW5kKGxpYnJhcnlNZXRob2RzQW5kUHJvcGVydGllcykge1xuICAgICAgICBleHRlbmQodGhpcywgbGlicmFyeU1ldGhvZHNBbmRQcm9wZXJ0aWVzKTtcbiAgICB9O1xuXG4gICAgTG9jYWxGb3JhZ2UucHJvdG90eXBlLl9nZXRTdXBwb3J0ZWREcml2ZXJzID0gZnVuY3Rpb24gX2dldFN1cHBvcnRlZERyaXZlcnMoZHJpdmVycykge1xuICAgICAgICB2YXIgc3VwcG9ydGVkRHJpdmVycyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gZHJpdmVycy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgdmFyIGRyaXZlck5hbWUgPSBkcml2ZXJzW2ldO1xuICAgICAgICAgICAgaWYgKHRoaXMuc3VwcG9ydHMoZHJpdmVyTmFtZSkpIHtcbiAgICAgICAgICAgICAgICBzdXBwb3J0ZWREcml2ZXJzLnB1c2goZHJpdmVyTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1cHBvcnRlZERyaXZlcnM7XG4gICAgfTtcblxuICAgIExvY2FsRm9yYWdlLnByb3RvdHlwZS5fd3JhcExpYnJhcnlNZXRob2RzV2l0aFJlYWR5ID0gZnVuY3Rpb24gX3dyYXBMaWJyYXJ5TWV0aG9kc1dpdGhSZWFkeSgpIHtcbiAgICAgICAgLy8gQWRkIGEgc3R1YiBmb3IgZWFjaCBkcml2ZXIgQVBJIG1ldGhvZCB0aGF0IGRlbGF5cyB0aGUgY2FsbCB0byB0aGVcbiAgICAgICAgLy8gY29ycmVzcG9uZGluZyBkcml2ZXIgbWV0aG9kIHVudGlsIGxvY2FsRm9yYWdlIGlzIHJlYWR5LiBUaGVzZSBzdHVic1xuICAgICAgICAvLyB3aWxsIGJlIHJlcGxhY2VkIGJ5IHRoZSBkcml2ZXIgbWV0aG9kcyBhcyBzb29uIGFzIHRoZSBkcml2ZXIgaXNcbiAgICAgICAgLy8gbG9hZGVkLCBzbyB0aGVyZSBpcyBubyBwZXJmb3JtYW5jZSBpbXBhY3QuXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBMaWJyYXJ5TWV0aG9kcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgY2FsbFdoZW5SZWFkeSh0aGlzLCBMaWJyYXJ5TWV0aG9kc1tpXSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgTG9jYWxGb3JhZ2UucHJvdG90eXBlLmNyZWF0ZUluc3RhbmNlID0gZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2Uob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gbmV3IExvY2FsRm9yYWdlKG9wdGlvbnMpO1xuICAgIH07XG5cbiAgICByZXR1cm4gTG9jYWxGb3JhZ2U7XG59KCk7XG5cbi8vIFRoZSBhY3R1YWwgbG9jYWxGb3JhZ2Ugb2JqZWN0IHRoYXQgd2UgZXhwb3NlIGFzIGEgbW9kdWxlIG9yIHZpYSBhXG4vLyBnbG9iYWwuIEl0J3MgZXh0ZW5kZWQgYnkgcHVsbGluZyBpbiBvbmUgb2Ygb3VyIG90aGVyIGxpYnJhcmllcy5cblxuXG52YXIgbG9jYWxmb3JhZ2VfanMgPSBuZXcgTG9jYWxGb3JhZ2UoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBsb2NhbGZvcmFnZV9qcztcblxufSx7XCIzXCI6M31dfSx7fSxbNF0pKDQpXG59KTtcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsImludGVyZmFjZSBLZXlzIHtcbiAgW2tleTogc3RyaW5nXTogYm9vbGVhbjtcbiAgQXJyb3dVcDogYm9vbGVhbjtcbiAgQXJyb3dEb3duOiBib29sZWFuO1xuICBBcnJvd1JpZ2h0OiBib29sZWFuO1xuICBBcnJvd0xlZnQ6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBDb250cm9sbGVyIHtcbiAgcHJpdmF0ZSBrZXlzOiBLZXlzID0ge1xuICAgIEFycm93VXA6IGZhbHNlLFxuICAgIEFycm93RG93bjogZmFsc2UsXG4gICAgQXJyb3dSaWdodDogZmFsc2UsXG4gICAgQXJyb3dMZWZ0OiBmYWxzZVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlID0+IHRoaXMub25LZXlEb3duKGUpKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGUgPT4gdGhpcy5vbktleVVwKGUpKTtcbiAgfVxuXG4gIGdldCB1cCgpIHtcbiAgICByZXR1cm4gdGhpcy5rZXlzLkFycm93VXA7XG4gIH1cblxuICBnZXQgZG93bigpIHtcbiAgICByZXR1cm4gdGhpcy5rZXlzLkFycm93RG93bjtcbiAgfVxuXG4gIGdldCByaWdodCgpIHtcbiAgICByZXR1cm4gdGhpcy5rZXlzLkFycm93UmlnaHQ7XG4gIH1cblxuICBnZXQgbGVmdCgpIHtcbiAgICByZXR1cm4gdGhpcy5rZXlzLkFycm93TGVmdDtcbiAgfVxuXG4gIHNldCB1cChjaGFuZ2U6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmtleXMuQXJyb3dVcCA9IGNoYW5nZTtcbiAgfVxuXG4gIHNldCBkb3duKGNoYW5nZTogYm9vbGVhbikge1xuICAgIHRoaXMua2V5cy5BcnJvd0Rvd24gPSBjaGFuZ2U7XG4gIH1cblxuICBzZXQgcmlnaHQoY2hhbmdlOiBib29sZWFuKSB7XG4gICAgdGhpcy5rZXlzLkFycm93UmlnaHQgPSBjaGFuZ2U7XG4gIH1cblxuICBzZXQgbGVmdChjaGFuZ2U6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmtleXMuQXJyb3dMZWZ0ID0gY2hhbmdlO1xuICB9XG5cbiAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5rZXlzW2V2ZW50LmtleV0gPSB0cnVlO1xuICB9XG5cbiAgb25LZXlVcChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIHRoaXMua2V5c1tldmVudC5rZXldID0gZmFsc2U7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBBcHBsZSB7XG4gIHB1YmxpYyBzdGF0aWMgYWRkQXBwbGUoYXJyYXk6IEFycmF5PGFueT4pOiBudW1iZXJbXSB7XG4gICAgY29uc3QgY29sOiBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyMCk7XG4gICAgY29uc3Qgcm93OiBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyMCk7XG4gICAgY29uc3QgYXBwbGUgPSBbY29sLCByb3ddO1xuXG4gICAgaWYgKGFycmF5W2FwcGxlWzBdXVthcHBsZVsxXV0gPT09IDEpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdhcHBsZSBoaXQgc25ha2UnKTtcbiAgICAgIHJldHVybiB0aGlzLmFkZEFwcGxlKGFycmF5KTtcbiAgICB9IGVsc2UgaWYgKChjb2wgfHwgcm93KSA+PSAyMCkge1xuICAgICAgcmV0dXJuIHRoaXMuYWRkQXBwbGUoYXJyYXkpO1xuICAgIH1cblxuICAgIGFycmF5W2FwcGxlWzBdXVthcHBsZVsxXV0gPSAyO1xuICAgIHJldHVybiBhcHBsZTtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIENhbnZhcyB7XG4gIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblxuICBwcml2YXRlIHg6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgeTogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29sb3I/OiBzdHJpbmcpIHtcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgKiAwLjg7XG4gICAgdGhpcy5jYW52YXMud2lkdGggPSB0aGlzLmNhbnZhcy5oZWlnaHQ7XG4gIH1cblxuICBzZXQgYmFja2dyb3VuZChjb2xvcikge1xuICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgfVxuXG4gIHJlbmRlcihjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkge1xuICAgIHRoaXMuY2FudmFzLmlkID0gJ2NhbnZhcyc7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvciB8fCAndHJhbnNwYXJlbnQnO1xuICAgIGN0eC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICcuLi8uLi9zdG9yYWdlJztcblxuZXhwb3J0IGNsYXNzIEdhbWVTdGF0ZSB7XG4gIGhpZ2hTY29yZTogbnVtYmVyO1xuICBvbGRIaWdoU2NvcmU6IG51bWJlcjtcbiAgaXNQbGF5aW5nOiBib29sZWFuID0gdHJ1ZTtcbiAgc2NvcmU6IG51bWJlciA9IDA7XG5cbiAgcHJpdmF0ZSBhY3R1YWxTY29yZTogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBwb2ludHM6IG51bWJlciA9IDIwO1xuICBwcml2YXRlIHN0b3JhZ2VLZXk6IHN0cmluZyA9ICdzbmFrZUhpZ2hTY29yZSc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHN0b3JhZ2U6IFN0b3JhZ2UpIHtcbiAgICB0aGlzLmdldFN0b3JlZFNjb3JlKCk7XG4gIH1cblxuICBhZGRQb2ludHMoZWw6IEVsZW1lbnQpIHtcbiAgICB0aGlzLmFjdHVhbFNjb3JlICs9IHRoaXMucG9pbnRzO1xuICAgIHRoaXMuaW5jcmVtZW50U2NvcmUoZWwpO1xuICB9XG5cbiAgZ2FtZU92ZXIoKSB7XG4gICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnVwZGF0ZUhpZ2hTY29yZSh0aGlzLmFjdHVhbFNjb3JlKTtcbiAgfVxuXG4gIGluY3JlbWVudFNjb3JlKGVsOiBFbGVtZW50KTogdm9pZCB7XG4gICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5zY29yZSA8IHRoaXMuYWN0dWFsU2NvcmUpIHtcbiAgICAgICAgdGhpcy5zY29yZSsrO1xuICAgICAgICB0aGlzLnVwZGF0ZVNjb3JlKGVsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgfVxuICAgIH0sIDUwKTtcbiAgfVxuXG4gIHJlc2V0KGVsOiBFbGVtZW50KSB7XG4gICAgdGhpcy5hY3R1YWxTY29yZSA9IDA7XG4gICAgdGhpcy5zY29yZSA9IDA7XG4gICAgdGhpcy51cGRhdGVTY29yZShlbCk7XG4gIH1cblxuICBzdGFydEdhbWUoKSB7XG4gICAgdGhpcy5pc1BsYXlpbmcgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRTdG9yZWRTY29yZSgpIHtcbiAgICBpZiAodGhpcy5zdG9yYWdlLmlzUmVhZHkpIHtcbiAgICAgIHRoaXMuc3RvcmFnZS5nZXRJdGVtKHRoaXMuc3RvcmFnZUtleSkudGhlbihzY29yZSA9PiB7XG4gICAgICAgIHRoaXMuaGlnaFNjb3JlID0gc2NvcmU7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmdldFN0b3JlZFNjb3JlKCksIDUwMCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpc0hpZ2hlcihudW06IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBudW0gPiB0aGlzLmhpZ2hTY29yZTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlSGlnaFNjb3JlKG51bTogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNIaWdoZXIobnVtKSkge1xuICAgICAgdGhpcy5vbGRIaWdoU2NvcmUgPSB0aGlzLmhpZ2hTY29yZTtcbiAgICAgIHRoaXMuaGlnaFNjb3JlID0gbnVtO1xuICAgICAgdGhpcy51cGRhdGVTdG9yYWdlKG51bSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVTY29yZShlbDogRWxlbWVudCk6IHZvaWQge1xuICAgIGVsLmlubmVySFRNTCA9IHRoaXMuc2NvcmUudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlU3RvcmFnZShudW06IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuc3RvcmFnZVxuICAgICAgLnJlbW92ZSh0aGlzLnN0b3JhZ2VLZXkpXG4gICAgICAudGhlbigoKSA9PiB0aGlzLnN0b3JhZ2Uuc2V0SXRlbSh0aGlzLnN0b3JhZ2VLZXksIG51bSkpO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgR3JpZCB7XG4gIG1hcDogQXJyYXk8bnVtYmVyW10+ID0gW107XG4gIHdpZHRoOiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBiYWNrZ3JvdW5kOiBzdHJpbmc7XG4gIHByaXZhdGUgc25ha2U6IHN0cmluZztcbiAgcHJpdmF0ZSBhcHBsZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb2xzQW5kUm93czogbnVtYmVyLCBwdWJsaWMgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcbiAgICB0aGlzLndpZHRoID0gY3R4LmNhbnZhcy53aWR0aDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbHNBbmRSb3dzOyBpKyspIHtcbiAgICAgIHRoaXMubWFwW2ldID0gbmV3IEFycmF5KGNvbHNBbmRSb3dzKS5maWxsKDApO1xuICAgIH1cbiAgfVxuXG4gIGdldCBjb2xzKCkge1xuICAgIHJldHVybiB0aGlzLmNvbHNBbmRSb3dzO1xuICB9XG5cbiAgZ2V0IHJvd3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29sc0FuZFJvd3M7XG4gIH1cblxuICBnZXQgc2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy53aWR0aCAvIHRoaXMuY29sc0FuZFJvd3M7XG4gIH1cblxuICBzZXQgY29sb3JzKHsgLi4uYXJncyB9KSB7XG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gYXJncy5kYXJrO1xuICAgIHRoaXMuc25ha2UgPSBhcmdzLmxpZ2h0O1xuICAgIHRoaXMuYXBwbGUgPSBhcmdzLmFwcGxlO1xuICB9XG5cbiAgcmVuZGVyKGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSB7XG4gICAgY29uc3Qgc2l6ZSA9IHRoaXMuc2l6ZTtcbiAgICBjb25zdCBtYXAgPSBbLi4udGhpcy5tYXBdO1xuXG4gICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgdGhpcy5jb2xzOyBjb2wrKykge1xuICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgdGhpcy5yb3dzOyByb3crKykge1xuICAgICAgICBpZiAobWFwW2NvbF1bcm93XSA9PT0gMCkge1xuICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmJhY2tncm91bmQ7XG4gICAgICAgICAgY3R4LmZpbGxSZWN0KGNvbCAqIHNpemUsIHJvdyAqIHNpemUsIHNpemUsIHNpemUpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubWFwW2NvbF1bcm93XSA9PT0gMSkge1xuICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLnNuYWtlO1xuICAgICAgICAgIGN0eC5maWxsUmVjdChjb2wgKiBzaXplICsgMSwgcm93ICogc2l6ZSArIDEsIHNpemUgLSAyLCBzaXplIC0gMik7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5tYXBbY29sXVtyb3ddID09PSAyKSB7XG4gICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuYXBwbGU7XG4gICAgICAgICAgY3R4LmZpbGxSZWN0KGNvbCAqIHNpemUgKyAyLCByb3cgKiBzaXplICsgMiwgc2l6ZSAtIDQsIHNpemUgLSA0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMubWFwID0gbWFwO1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5tYXAgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29sc0FuZFJvd3M7IGkrKykge1xuICAgICAgdGhpcy5tYXBbaV0gPSBuZXcgQXJyYXkodGhpcy5jb2xzQW5kUm93cykuZmlsbCgwKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVXaWR0aChjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSB7XG4gICAgdGhpcy53aWR0aCA9IGNhbnZhcy53aWR0aDtcbiAgfVxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9jYW52YXMvY2FudmFzJztcbmV4cG9ydCAqIGZyb20gJy4vZ3JpZC9ncmlkJztcbmV4cG9ydCAqIGZyb20gJy4vc25ha2Uvc25ha2UnO1xuZXhwb3J0ICogZnJvbSAnLi9hcHBsZS9hcHBsZSc7XG5leHBvcnQgKiBmcm9tICcuL2dhbWUtc3RhdGUvZ2FtZS1zdGF0ZSc7XG4iLCJleHBvcnQgY2xhc3MgU25ha2Uge1xuICBib2R5OiBBcnJheTxudW1iZXJbXT47XG4gIGhlYWQ6IG51bWJlcltdO1xuICB0YWlsOiBudW1iZXJbXTtcblxuICBwcml2YXRlIGJvZHlTdGFydDogQXJyYXk8bnVtYmVyW10+ID0gW1sxMCwgMTBdLCBbOSwgMTBdXTtcbiAgcHJpdmF0ZSBkaXIgPSB7IHVwOiBmYWxzZSwgZG93bjogZmFsc2UsIGxlZnQ6IGZhbHNlLCByaWdodDogdHJ1ZSB9O1xuICBwcml2YXRlIHZlbG9jaXR5OiBudW1iZXIgPSAxO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzaXplOiBudW1iZXIpIHtcbiAgICB0aGlzLmhlYWQgPSB0aGlzLmJvZHlTdGFydFswXTtcbiAgICB0aGlzLnRhaWwgPSB0aGlzLmJvZHlTdGFydFsxXTtcbiAgICB0aGlzLmJvZHkgPSB0aGlzLmJvZHlTdGFydDtcbiAgfVxuXG4gIGVhdCgpOiB2b2lkIHtcbiAgICB0aGlzLmJvZHkgPSBbLi4udGhpcy5ib2R5LCB0aGlzLnRhaWxdO1xuICB9XG5cbiAgbW92ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXIudXApIHtcbiAgICAgIHRoaXMudXBkYXRlU25ha2UoJ3knLCAndXAnKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5kaXIuZG93bikge1xuICAgICAgdGhpcy51cGRhdGVTbmFrZSgneScsICdkb3duJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZGlyLnJpZ2h0KSB7XG4gICAgICB0aGlzLnVwZGF0ZVNuYWtlKCd4JywgJ3JpZ2h0Jyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZGlyLmxlZnQpIHtcbiAgICAgIHRoaXMudXBkYXRlU25ha2UoJ3gnLCAnbGVmdCcpO1xuICAgIH1cbiAgfVxuXG4gIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuaGVhZCA9IHRoaXMuYm9keVN0YXJ0WzBdO1xuICAgIHRoaXMudGFpbCA9IHRoaXMuYm9keVN0YXJ0WzFdO1xuICAgIHRoaXMuYm9keSA9IHRoaXMuYm9keVN0YXJ0O1xuICAgIHRoaXMuY2hhbmdlRGlyZWN0aW9uKCdyaWdodCcpO1xuICB9XG5cbiAgc2V0RGlyKGNvbnRyb2xsZXIpOiB2b2lkIHtcbiAgICBpZiAoY29udHJvbGxlci51cCAmJiAhdGhpcy5kaXIuZG93bikge1xuICAgICAgdGhpcy5jaGFuZ2VEaXJlY3Rpb24oJ3VwJyk7XG4gICAgfVxuXG4gICAgaWYgKGNvbnRyb2xsZXIuZG93biAmJiAhdGhpcy5kaXIudXApIHtcbiAgICAgIHRoaXMuY2hhbmdlRGlyZWN0aW9uKCdkb3duJyk7XG4gICAgfVxuXG4gICAgaWYgKGNvbnRyb2xsZXIucmlnaHQgJiYgIXRoaXMuZGlyLmxlZnQpIHtcbiAgICAgIHRoaXMuY2hhbmdlRGlyZWN0aW9uKCdyaWdodCcpO1xuICAgIH1cblxuICAgIGlmIChjb250cm9sbGVyLmxlZnQgJiYgIXRoaXMuZGlyLnJpZ2h0KSB7XG4gICAgICB0aGlzLmNoYW5nZURpcmVjdGlvbignbGVmdCcpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2hhbmdlRGlyZWN0aW9uKGRpcmVjdGlvbjogc3RyaW5nKTogdm9pZCB7XG4gICAgT2JqZWN0LmtleXModGhpcy5kaXIpLm1hcChrZXkgPT4ge1xuICAgICAga2V5ID09PSBkaXJlY3Rpb24gPyAodGhpcy5kaXJbZGlyZWN0aW9uXSA9IHRydWUpIDogKHRoaXMuZGlyW2tleV0gPSBmYWxzZSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVNuYWtlKGF4aXM6IHN0cmluZywgZGlyOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBpbmRleCA9IGF4aXMgPT09ICd5JyA/IDEgOiAwO1xuICAgIGNvbnN0IGRpcmVjdGlvbiA9IGRpciA9PT0gJ3JpZ2h0JyB8fCBkaXIgPT09ICdkb3duJyA/IHRoaXMudmVsb2NpdHkgOiAtdGhpcy52ZWxvY2l0eTtcblxuICAgIGNvbnN0IG5ld0JvZHkgPSBbLi4udGhpcy5ib2R5XTtcbiAgICB0aGlzLnRhaWwgPSBuZXdCb2R5LnBvcCgpO1xuXG4gICAgY29uc3QgbmV3SGVhZCA9IFsuLi50aGlzLmhlYWRdO1xuICAgIG5ld0hlYWRbaW5kZXhdICs9IGRpcmVjdGlvbjtcblxuICAgIHRoaXMuaGVhZCA9IFsuLi5uZXdIZWFkXTtcbiAgICB0aGlzLmJvZHkgPSBbdGhpcy5oZWFkLCAuLi5uZXdCb2R5XTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgR2FtZVN0YXRlIH0gZnJvbSAnLi9nYW1lL2dhbWUtc3RhdGUvZ2FtZS1zdGF0ZSc7XG5pbXBvcnQgeyBDb250cm9sbGVyIH0gZnJvbSAnLi9jb250cm9sbGVyL2NvbnRyb2xsZXInO1xuaW1wb3J0IHsgQ2FudmFzLCBHcmlkLCBTbmFrZSwgQXBwbGUgfSBmcm9tICcuL2dhbWUnO1xuaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gJy4vc3RvcmFnZSc7XG5pbXBvcnQgeyBibHVlLCBncmVlbiwgcHVycGxlLCBhZGRUaGVtZXMsIFRoZW1lIH0gZnJvbSAnLi90aGVtZXMnO1xuXG5jb25zdCBzdG9yYWdlID0gbmV3IFN0b3JhZ2UoJ19fc25ha2VfZ2FtZScpO1xuY29uc3QgYyA9IG5ldyBDYW52YXMoYmx1ZS5kYXJrKTtcblxuY29uc3QgY3R4ID0gYy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbmNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQ29udHJvbGxlcigpO1xuY29uc3Qgc3RhdGUgPSBuZXcgR2FtZVN0YXRlKHN0b3JhZ2UpO1xuY29uc3QgY29scyA9IDIwO1xuY29uc3QgbWF4VGltZVN0ZXAgPSA0O1xuY29uc3Qgc3RhcnRpbmdUaW1lU3RlcCA9IDMwO1xuY29uc3QgZ3JpZCA9IG5ldyBHcmlkKGNvbHMsIGN0eCk7XG5jb25zdCBzbmFrZSA9IG5ldyBTbmFrZShncmlkLnNpemUpO1xuXG5sZXQgZ2FtZVRpbWUgPSAwO1xubGV0IGZwcyA9IHN0YXJ0aW5nVGltZVN0ZXA7XG5sZXQgdGltZVN0ZXAgPSAxMDAwIC8gZnBzO1xubGV0IGFwcGxlOiBudW1iZXJbXTtcbmxldCBzY29yZTogSFRNTEVsZW1lbnQ7XG5sZXQgbWVudTogSFRNTEVsZW1lbnQ7XG5sZXQgc3RhcnRCdG46IEhUTUxFbGVtZW50O1xubGV0IHNldHRpbmdzOiBIVE1MRWxlbWVudDtcbmxldCBoaWdoU2NvcmU6IEhUTUxFbGVtZW50O1xubGV0IGxvb3A7XG5cbmNvbnN0IGRyYXcgPSAoKSA9PiB7XG4gIGMucmVuZGVyKGN0eCk7XG4gIGdyaWQucmVuZGVyKGN0eCk7XG59O1xuXG5jb25zdCB1cGRhdGVUaW1lU3RlcCA9IGZwcyA9PiB7XG4gIGlmICh0aW1lU3RlcCA+PSBtYXhUaW1lU3RlcCkge1xuICAgIHRpbWVTdGVwID0gMTAwMCAvIGZwcztcbiAgfVxufTtcblxuY29uc3QgdXBkYXRlSGlnaFNjb3JlID0gKHNjb3JlOiBudW1iZXIpID0+IHtcbiAgaGlnaFNjb3JlLmlubmVyVGV4dCA9IHNjb3JlLnRvU3RyaW5nKCk7XG59O1xuXG5jb25zdCBnYW1lT3ZlciA9ICgpID0+IHtcbiAgc3RhdGUuZ2FtZU92ZXIoKTtcbiAgY2FuY2VsQW5pbWF0aW9uRnJhbWUobG9vcCk7XG4gIG1lbnUuY2xhc3NOYW1lID0gJ21lbnUgc2xpZGUtaW4nO1xuICB1cGRhdGVIaWdoU2NvcmUoc3RhdGUuaGlnaFNjb3JlKTtcbn07XG5cbmNvbnN0IHN0YXJ0R2FtZSA9ICgpID0+IHtcbiAgZ3JpZC5yZXNldCgpO1xuICBzbmFrZS5yZXNldCgpO1xuICBzdGF0ZS5yZXNldChzY29yZSk7XG4gIGFwcGxlID0gbnVsbDtcbiAgc3RhdGUuc3RhcnRHYW1lKCk7XG4gIG1lbnUuY2xhc3NOYW1lID0gJ21lbnUgc2xpZGUtb3V0JztcbiAgZnBzID0gc3RhcnRpbmdUaW1lU3RlcDtcbiAgdXBkYXRlVGltZVN0ZXAoZnBzKTtcbiAgZ2FtZVRpbWUgPSAwO1xuICBnYW1lTG9vcCgpO1xufTtcblxuY29uc3QgZ2FtZUxvb3AgPSAoKSA9PiB7XG4gIGlmICghc3RhdGUuaXNQbGF5aW5nKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gVXBkYXRlIGdhbWUgaWYgZW5vdWdoIHRpbWUgaGFzIGVsbGFwc2VkXG4gIGlmIChnYW1lVGltZSA+PSB0aW1lU3RlcCkge1xuICAgIHNuYWtlLm1vdmUoKTtcblxuICAgIC8vIE1ha2UgdGhlIHRhaWwncyBpbmRleCB0aGUgYmFja2dyb3VuZCBjb2xvclxuICAgIGdyaWQubWFwW3NuYWtlLnRhaWxbMF1dW3NuYWtlLnRhaWxbMV1dID0gMDtcblxuICAgIC8vIElmIGFueSBvZiB0aGVzZSBmYWlsLCBHQU1FIE9WRVIhXG4gICAgdHJ5IHtcbiAgICAgIC8vIENoZWNrIGlmIHNuYWtlIGhpdHMgaXRzZWxmXG4gICAgICBpZiAoXG4gICAgICAgIGdyaWQubWFwW3NuYWtlLmhlYWRbMF1dW3NuYWtlLmhlYWRbMV1dID09PSAxIHx8XG4gICAgICAgIHNuYWtlLmhlYWRbMV0gPCAwIHx8XG4gICAgICAgIHNuYWtlLmhlYWRbMV0gPj0gMjBcbiAgICAgICkge1xuICAgICAgICB0aHJvdyBFcnJvcigpO1xuICAgICAgfVxuXG4gICAgICAvLyBDaGVjayBpZiBzbmFrZSBlYXRzIGFwcGxlXG4gICAgICBpZiAoZ3JpZC5tYXBbc25ha2UuaGVhZFswXV1bc25ha2UuaGVhZFsxXV0gPT09IDIpIHtcbiAgICAgICAgc3RhdGUuYWRkUG9pbnRzKHNjb3JlKTtcbiAgICAgICAgc25ha2UuZWF0KCk7XG4gICAgICAgIGFwcGxlID0gbnVsbDtcbiAgICAgICAgdXBkYXRlVGltZVN0ZXAoKGZwcyArPSA0KSk7XG4gICAgICB9XG5cbiAgICAgIC8vIENoZWNrIGlmIHNuYWtlIGhpdHMgaXRzZWxmXG4gICAgICBpZiAoZ3JpZC5tYXBbc25ha2UuaGVhZFswXV1bc25ha2UuaGVhZFsxXV0gPT09IDEpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoKTtcbiAgICAgIH1cblxuICAgICAgLy8gRHJhdyB0aGUgc25ha2VcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc25ha2UuYm9keS5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjb2wgPSBzbmFrZS5ib2R5W2ldWzBdO1xuICAgICAgICBjb25zdCByb3cgPSBzbmFrZS5ib2R5W2ldWzFdO1xuXG4gICAgICAgIGdyaWQubWFwW2NvbF1bcm93XSA9IDE7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZ2FtZU92ZXIoKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgYSBuZXcgYXBwbGUgaWYgaXQncyBnb25lXG4gICAgaWYgKCFhcHBsZSkge1xuICAgICAgYXBwbGUgPSBBcHBsZS5hZGRBcHBsZShncmlkLm1hcCk7XG4gICAgfVxuXG4gICAgZ2FtZVRpbWUgPSAwO1xuICB9XG5cbiAgZ2FtZVRpbWUrKztcbiAgc25ha2Uuc2V0RGlyKGNvbnRyb2xsZXIpO1xuICBkcmF3KCk7XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShnYW1lTG9vcCk7XG59O1xuXG5jb25zdCBnZXRUaGVtZSA9ICgpID0+IHtcbiAgc3RvcmFnZS5nZXRJdGVtKCd0aGVtZScpLnRoZW4odGhlbWUgPT4ge1xuICAgIGlmICh0aGVtZSkge1xuICAgICAgc2V0VGhlbWUodGhlbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXRUaGVtZShncmVlbik7XG4gICAgfVxuICB9KTtcbn07XG5cbmNvbnN0IHNob3dCdXR0b25zID0gKCkgPT4ge1xuICBjb25zdCBkaXY6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vYmlsZS1jb250cm9scycpO1xuICBkaXYuc3R5bGUub3BhY2l0eSA9ICcxJztcbn07XG5cbmNvbnN0IGhpZGVCdXR0b25zID0gKCkgPT4ge1xuICBjb25zdCBkaXY6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vYmlsZS1jb250cm9scycpO1xuICBkaXYuc3R5bGUub3BhY2l0eSA9ICcwJztcbn07XG5cbmNvbnN0IHJlc2l6ZUNhbnZhcyA9ICgpID0+IHtcbiAgY29uc3QgaCA9IHdpbmRvdy5pbm5lckhlaWdodCAqIDAuODU7XG4gIGNvbnN0IGlubmVyVyA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXG4gIGlmIChoID49IGlubmVyVykge1xuICAgIGMuY2FudmFzLmhlaWdodCA9IGlubmVyVyAqIDAuOTtcbiAgICBzaG93QnV0dG9ucygpO1xuICB9IGVsc2Uge1xuICAgIGMuY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAqIDAuODU7XG4gICAgaGlkZUJ1dHRvbnMoKTtcbiAgfVxuXG4gIGMuY2FudmFzLndpZHRoID0gYy5jYW52YXMuaGVpZ2h0O1xuICBjdHguY2FudmFzLmhlaWdodCA9IGMuY2FudmFzLmhlaWdodDtcbiAgY3R4LmNhbnZhcy53aWR0aCA9IGMuY2FudmFzLndpZHRoO1xuICBncmlkLnVwZGF0ZVdpZHRoKGMuY2FudmFzKTtcbiAgYy5yZW5kZXIoY3R4KTtcbn07XG5cbmNvbnN0IHNldFRoZW1lID0gKHsgLi4uYXJncyB9KSA9PiB7XG4gIGNvbnN0IHsgZGFyaywgbGlnaHQgfSA9IGFyZ3M7XG5cbiAgc3RvcmFnZS5yZW1vdmUoJ3RoZW1lJykudGhlbigoKSA9PiBzdG9yYWdlLnNldEl0ZW0oJ3RoZW1lJywgYXJncykpO1xuXG4gIGdyaWQuY29sb3JzID0gYXJncztcbiAgYy5iYWNrZ3JvdW5kID0gZGFyaztcbiAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kID0gbGlnaHQ7XG4gIG1lbnUuc3R5bGUuYmFja2dyb3VuZCA9IGxpZ2h0O1xuICBzY29yZS5zdHlsZS5jb2xvciA9IGRhcms7XG4gIHN0YXJ0QnRuLnN0eWxlLmJhY2tncm91bmQgPSBkYXJrO1xuXG4gIGMucmVuZGVyKGN0eCk7XG59O1xuXG5jb25zdCBzdG9yYWdlUmVhZHkgPSAoKSA9PiB7XG4gIGlmIChzdG9yYWdlLmlzUmVhZHkpIHtcbiAgICBtZW51LmNsYXNzTmFtZSA9ICdtZW51IHNsaWRlLWluJztcbiAgICBzdG9yYWdlLmdldEl0ZW0oJ3NuYWtlSGlnaFNjb3JlJykudGhlbihzY29yZSA9PiB7XG4gICAgICB1cGRhdGVIaWdoU2NvcmUoc2NvcmUpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHNldFRpbWVvdXQoKCkgPT4gc3RvcmFnZVJlYWR5KCksIDMwMCk7XG4gIH1cbn07XG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gIHN0b3JhZ2Uuc2V0dXAoKTtcbiAgcmVzaXplQ2FudmFzKCk7XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjLmNhbnZhcyk7XG5cbiAgc2NvcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2NvcmUnKTtcbiAgc2NvcmUuaW5uZXJIVE1MID0gc3RhdGUuc2NvcmUudG9TdHJpbmcoKTtcblxuICBtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUnKTtcbiAgc3RvcmFnZVJlYWR5KCk7XG5cbiAgaGlnaFNjb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc3BhbicpO1xuXG4gIHNldHRpbmdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNldHRpbmdzJyk7XG4gIGFkZFRoZW1lcyhzZXR0aW5ncywgc2V0VGhlbWUsIGJsdWUsIGdyZWVuLCBwdXJwbGUpO1xuXG4gIHN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uJyk7XG4gIHN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gc3RhcnRHYW1lKCkpO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplQ2FudmFzKTtcblxuICB0b3VjaENvbnRyb2xzKCd1cCcpO1xuICB0b3VjaENvbnRyb2xzKCdkb3duJyk7XG4gIHRvdWNoQ29udHJvbHMoJ3JpZ2h0Jyk7XG4gIHRvdWNoQ29udHJvbHMoJ2xlZnQnKTtcblxuICBnZXRUaGVtZSgpO1xuICBjLnJlbmRlcihjdHgpO1xuXG4gIGxvb3AgPSBnYW1lTG9vcDtcbn07XG5cbmNvbnN0IHRvdWNoQ29udHJvbHMgPSAoZGlyZWN0aW9uOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgY29uc3QgY29udHJvbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRpcmVjdGlvbik7XG5cbiAgY29udHJvbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgKCkgPT4ge1xuICAgIGNvbnRyb2xsZXJbZGlyZWN0aW9uXSA9IHRydWU7XG4gIH0pO1xuXG4gIGNvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCAoKSA9PiB7XG4gICAgY29udHJvbGxlcltkaXJlY3Rpb25dID0gZmFsc2U7XG4gIH0pO1xufTtcbiIsImV4cG9ydCAqIGZyb20gJy4vc3RvcmFnZSc7XG4iLCJpbXBvcnQgbG9jYWxGb3JhZ2UgZnJvbSAnbG9jYWxmb3JhZ2UnO1xuXG5leHBvcnQgY2xhc3MgU3RvcmFnZSB7XG4gIGlzUmVhZHk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIGNvbmZpZzogTG9jYWxGb3JhZ2VPcHRpb25zID0ge1xuICAgIG5hbWU6ICdTbmFrZScsXG4gICAgdmVyc2lvbjogMS4wLFxuICAgIHN0b3JlTmFtZTogbnVsbFxuICB9O1xuXG4gIHByaXZhdGUgc3RvcmFnZTogTG9jYWxGb3JhZ2UgPSBsb2NhbEZvcmFnZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9uYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLmNvbmZpZy5zdG9yZU5hbWUgPSBfbmFtZTtcbiAgfVxuXG4gIHNldEl0ZW0oa2V5LCB2YWx1ZSk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xuICB9XG5cbiAgZ2V0SXRlbShrZXkpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICB9XG5cbiAgcmVtb3ZlKGtleSk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gIH1cblxuICBrZXlzKCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5rZXlzKCk7XG4gIH1cblxuICBhbGwoKTogUHJvbWlzZTxhbnlbXT4ge1xuICAgIGNvbnN0IHN0b3JlID0gW107XG5cbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlXG4gICAgICAuaXRlcmF0ZSh2YWx1ZSA9PiB7XG4gICAgICAgIHN0b3JlLnB1c2godmFsdWUpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKCgpID0+IHN0b3JlKTtcbiAgfVxuXG4gIHNldHVwKCk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmFnZS5jb25maWcodGhpcy5jb25maWcpO1xuXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuc3RvcmFnZVxuICAgICAgICAucmVhZHkoKVxuICAgICAgICAudGhlbigoKSA9PiB0aGlzLnN0b3JhZ2Uuc2V0RHJpdmVyKFt0aGlzLnN0b3JhZ2UuSU5ERVhFRERCLCB0aGlzLnN0b3JhZ2UuV0VCU1FMXSkpXG4gICAgICAgIC50aGVuKCgpID0+ICh0aGlzLmlzUmVhZHkgPSB0cnVlKSlcbiAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICB0aHJvdyBFcnJvcignQ291bGQgbm90IGluaXRpYWxpemUgc3RvcmFnZScpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vdGhlbWVzJztcbiIsImV4cG9ydCBpbnRlcmZhY2UgVGhlbWUge1xuICBuYW1lOiBzdHJpbmc7XG4gIGRhcms6IHN0cmluZztcbiAgbGlnaHQ6IHN0cmluZztcbiAgYXBwbGU6IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IGdyZWVuID0ge1xuICBuYW1lOiAnZ3JlZW4nLFxuICBkYXJrOiAnIzAwMjAxMScsXG4gIGxpZ2h0OiAnIzAwN0EzRicsXG4gIGFwcGxlOiAnI0FGMkQwMCdcbn07XG5cbmV4cG9ydCBjb25zdCBibHVlID0ge1xuICBuYW1lOiAnYmx1ZScsXG4gIGRhcms6ICcjMDAxMjFFJyxcbiAgbGlnaHQ6ICcjMDI0NTcwJyxcbiAgYXBwbGU6ICcjQUYyRDAwJ1xufTtcblxuZXhwb3J0IGNvbnN0IHB1cnBsZSA9IHtcbiAgbmFtZTogJ3B1cnBsZScsXG4gIGRhcms6ICcjMTYwMDFGJyxcbiAgbGlnaHQ6ICcjNTMwMTc0JyxcbiAgYXBwbGU6ICcjQTRBRDAwJ1xufTtcblxuZXhwb3J0IGNvbnN0IGFkZFRoZW1lcyA9IChlbDogSFRNTEVsZW1lbnQsIGxpc3RlbmVyLCAuLi50aGVtZXMpID0+IHtcbiAgdGhlbWVzLmZvckVhY2godGhlbWUgPT4ge1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgZGl2LnN0eWxlLmJhY2tncm91bmQgPSB0aGVtZS5saWdodDtcbiAgICBkaXYuc3R5bGUud2lkdGggPSAnMjVweCc7XG4gICAgZGl2LnNldEF0dHJpYnV0ZSgnbmFtZScsIHRoZW1lLm5hbWUpO1xuICAgIGRpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGxpc3RlbmVyKHRoZW1lKSk7XG5cbiAgICBlbC5hcHBlbmRDaGlsZChkaXYpO1xuICB9KTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9