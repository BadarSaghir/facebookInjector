// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
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
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"8iMmq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _webextensionPolyfill = require("webextension-polyfill");
var _webextensionPolyfillDefault = parcelHelpers.interopDefault(_webextensionPolyfill);
console.log("background.ts");
let previousUrl;
//execute content script when url is equal to facebook.com in PWA mode
const onHistoryStateUpdatedListener = (0, _webextensionPolyfillDefault.default).webNavigation.onHistoryStateUpdated.addListener((details)=>{
    // if (details.url.includes('facebook.com')) {
    //     browser.tabs.executeScript(details.tabId, {
    //         file: 'content.js'
    //     });
    // }
    const re = /(https:\/\/.*facebook.com\/groups\/treatearly\/?.*)|(https:\/\/.*facebook.com\/groups\/984165912191143\/?.*)|((https:\/\/.*facebook.com\/?)(home.php)?(?:\s|$))/ig;
    console.log(details.url.match(re));
    if (details.url.match(re)) {
        console.log("url changed", details.url);
        // browser.runtime.reload()
        // reload the current tab without infinite loop of reloading
        if (details.url != previousUrl) {
            console.log(details, previousUrl);
            (0, _webextensionPolyfillDefault.default).tabs.reload(details.tabId, {
                bypassCache: true
            });
            previousUrl = details.url;
        }
    }
}); // browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
 //     if (changeInfo.status === 'complete') {
 //         browser.tabs.executeScript(tabId, {
 //             file: 'content.js'
 //         });
 //     }
 // }
 // );

},{"webextension-polyfill":"kPFTQ","@parcel/transformer-js/src/esmodule-helpers.js":"8ISrk"}],"kPFTQ":[function(require,module,exports) {
(function(global, factory) {
    if (typeof define === "function" && define.amd) define("webextension-polyfill", [
        "module"
    ], factory);
    else {
        var mod;
        factory(module);
    }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function(module) {
    /* webextension-polyfill - v0.9.0 - Fri Mar 25 2022 17:00:23 */ /* -*- Mode: indent-tabs-mode: nil; js-indent-level: 2 -*- */ /* vim: set sts=2 sw=2 et tw=80: */ /* This Source Code Form is subject to the terms of the Mozilla Public
   * License, v. 2.0. If a copy of the MPL was not distributed with this
   * file, You can obtain one at http://mozilla.org/MPL/2.0/. */ "use strict";
    if (typeof globalThis != "object" || typeof chrome != "object" || !chrome || !chrome.runtime || !chrome.runtime.id) throw new Error("This script should only be loaded in a browser extension.");
    if (typeof globalThis.browser === "undefined" || Object.getPrototypeOf(globalThis.browser) !== Object.prototype) {
        const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";
        const SEND_RESPONSE_DEPRECATION_WARNING = "Returning a Promise is the preferred way to send a reply from an onMessage/onMessageExternal listener, as the sendResponse will be removed from the specs (See https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)"; // Wrapping the bulk of this polyfill in a one-time-use function is a minor
        // optimization for Firefox. Since Spidermonkey does not fully parse the
        // contents of a function until the first time it's called, and since it will
        // never actually need to be called, this allows the polyfill to be included
        // in Firefox nearly for free.
        const wrapAPIs = (extensionAPIs)=>{
            // NOTE: apiMetadata is associated to the content of the api-metadata.json file
            // at build time by replacing the following "include" with the content of the
            // JSON file.
            const apiMetadata = {
                "alarms": {
                    "clear": {
                        "minArgs": 0,
                        "maxArgs": 1
                    },
                    "clearAll": {
                        "minArgs": 0,
                        "maxArgs": 0
                    },
                    "get": {
                        "minArgs": 0,
                        "maxArgs": 1
                    },
                    "getAll": {
                        "minArgs": 0,
                        "maxArgs": 0
                    }
                },
                "bookmarks": {
                    "create": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "get": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "getChildren": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "getRecent": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "getSubTree": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "getTree": {
                        "minArgs": 0,
                        "maxArgs": 0
                    },
                    "move": {
                        "minArgs": 2,
                        "maxArgs": 2
                    },
                    "remove": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "removeTree": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "search": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "update": {
                        "minArgs": 2,
                        "maxArgs": 2
                    }
                },
                "browserAction": {
                    "disable": {
                        "minArgs": 0,
                        "maxArgs": 1,
                        "fallbackToNoCallback": true
                    },
                    "enable": {
                        "minArgs": 0,
                        "maxArgs": 1,
                        "fallbackToNoCallback": true
                    },
                    "getBadgeBackgroundColor": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "getBadgeText": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "getPopup": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "getTitle": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "openPopup": {
                        "minArgs": 0,
                        "maxArgs": 0
                    },
                    "setBadgeBackgroundColor": {
                        "minArgs": 1,
                        "maxArgs": 1,
                        "fallbackToNoCallback": true
                    },
                    "setBadgeText": {
                        "minArgs": 1,
                        "maxArgs": 1,
                        "fallbackToNoCallback": true
                    },
                    "setIcon": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "setPopup": {
                        "minArgs": 1,
                        "maxArgs": 1,
                        "fallbackToNoCallback": true
                    },
                    "setTitle": {
                        "minArgs": 1,
                        "maxArgs": 1,
                        "fallbackToNoCallback": true
                    }
                },
                "browsingData": {
                    "remove": {
                        "minArgs": 2,
                        "maxArgs": 2
                    },
                    "removeCache": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "removeCookies": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "removeDownloads": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "removeFormData": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "removeHistory": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "removeLocalStorage": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "removePasswords": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "removePluginData": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "settings": {
                        "minArgs": 0,
                        "maxArgs": 0
                    }
                },
                "commands": {
                    "getAll": {
                        "minArgs": 0,
                        "maxArgs": 0
                    }
                },
                "contextMenus": {
                    "remove": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "removeAll": {
                        "minArgs": 0,
                        "maxArgs": 0
                    },
                    "update": {
                        "minArgs": 2,
                        "maxArgs": 2
                    }
                },
                "cookies": {
                    "get": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "getAll": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "getAllCookieStores": {
                        "minArgs": 0,
                        "maxArgs": 0
                    },
                    "remove": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "set": {
                        "minArgs": 1,
                        "maxArgs": 1
                    }
                },
                "devtools": {
                    "inspectedWindow": {
                        "eval": {
                            "minArgs": 1,
                            "maxArgs": 2,
                            "singleCallbackArg": false
                        }
                    },
                    "panels": {
                        "create": {
                            "minArgs": 3,
                            "maxArgs": 3,
                            "singleCallbackArg": true
                        },
                        "elements": {
                            "createSidebarPane": {
                                "minArgs": 1,
                                "maxArgs": 1
                            }
                        }
                    }
                },
                "downloads": {
                    "cancel": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "download": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "erase": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "getFileIcon": {
                        "minArgs": 1,
                        "maxArgs": 2
                    },
                    "open": {
                        "minArgs": 1,
                        "maxArgs": 1,
                        "fallbackToNoCallback": true
                    },
                    "pause": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "removeFile": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "resume": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "search": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "show": {
                        "minArgs": 1,
                        "maxArgs": 1,
                        "fallbackToNoCallback": true
                    }
                },
                "extension": {
                    "isAllowedFileSchemeAccess": {
                        "minArgs": 0,
                        "maxArgs": 0
                    },
                    "isAllowedIncognitoAccess": {
                        "minArgs": 0,
                        "maxArgs": 0
                    }
                },
                "history": {
                    "addUrl": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "deleteAll": {
                        "minArgs": 0,
                        "maxArgs": 0
                    },
                    "deleteRange": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "deleteUrl": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "getVisits": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "search": {
                        "minArgs": 1,
                        "maxArgs": 1
                    }
                },
                "i18n": {
                    "detectLanguage": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "getAcceptLanguages": {
                        "minArgs": 0,
                        "maxArgs": 0
                    }
                },
                "identity": {
                    "launchWebAuthFlow": {
                        "minArgs": 1,
                        "maxArgs": 1
                    }
                },
                "idle": {
                    "queryState": {
                        "minArgs": 1,
                        "maxArgs": 1
                    }
                },
                "management": {
                    "get": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "getAll": {
                        "minArgs": 0,
                        "maxArgs": 0
                    },
                    "getSelf": {
                        "minArgs": 0,
                        "maxArgs": 0
                    },
                    "setEnabled": {
                        "minArgs": 2,
                        "maxArgs": 2
                    },
                    "uninstallSelf": {
                        "minArgs": 0,
                        "maxArgs": 1
                    }
                },
                "notifications": {
                    "clear": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "create": {
                        "minArgs": 1,
                        "maxArgs": 2
                    },
                    "getAll": {
                        "minArgs": 0,
                        "maxArgs": 0
                    },
                    "getPermissionLevel": {
                        "minArgs": 0,
                        "maxArgs": 0
                    },
                    "update": {
                        "minArgs": 2,
                        "maxArgs": 2
                    }
                },
                "pageAction": {
                    "getPopup": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "getTitle": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "hide": {
                        "minArgs": 1,
                        "maxArgs": 1,
                        "fallbackToNoCallback": true
                    },
                    "setIcon": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "setPopup": {
                        "minArgs": 1,
                        "maxArgs": 1,
                        "fallbackToNoCallback": true
                    },
                    "setTitle": {
                        "minArgs": 1,
                        "maxArgs": 1,
                        "fallbackToNoCallback": true
                    },
                    "show": {
                        "minArgs": 1,
                        "maxArgs": 1,
                        "fallbackToNoCallback": true
                    }
                },
                "permissions": {
                    "contains": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "getAll": {
                        "minArgs": 0,
                        "maxArgs": 0
                    },
                    "remove": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "request": {
                        "minArgs": 1,
                        "maxArgs": 1
                    }
                },
                "runtime": {
                    "getBackgroundPage": {
                        "minArgs": 0,
                        "maxArgs": 0
                    },
                    "getPlatformInfo": {
                        "minArgs": 0,
                        "maxArgs": 0
                    },
                    "openOptionsPage": {
                        "minArgs": 0,
                        "maxArgs": 0
                    },
                    "requestUpdateCheck": {
                        "minArgs": 0,
                        "maxArgs": 0
                    },
                    "sendMessage": {
                        "minArgs": 1,
                        "maxArgs": 3
                    },
                    "sendNativeMessage": {
                        "minArgs": 2,
                        "maxArgs": 2
                    },
                    "setUninstallURL": {
                        "minArgs": 1,
                        "maxArgs": 1
                    }
                },
                "sessions": {
                    "getDevices": {
                        "minArgs": 0,
                        "maxArgs": 1
                    },
                    "getRecentlyClosed": {
                        "minArgs": 0,
                        "maxArgs": 1
                    },
                    "restore": {
                        "minArgs": 0,
                        "maxArgs": 1
                    }
                },
                "storage": {
                    "local": {
                        "clear": {
                            "minArgs": 0,
                            "maxArgs": 0
                        },
                        "get": {
                            "minArgs": 0,
                            "maxArgs": 1
                        },
                        "getBytesInUse": {
                            "minArgs": 0,
                            "maxArgs": 1
                        },
                        "remove": {
                            "minArgs": 1,
                            "maxArgs": 1
                        },
                        "set": {
                            "minArgs": 1,
                            "maxArgs": 1
                        }
                    },
                    "managed": {
                        "get": {
                            "minArgs": 0,
                            "maxArgs": 1
                        },
                        "getBytesInUse": {
                            "minArgs": 0,
                            "maxArgs": 1
                        }
                    },
                    "sync": {
                        "clear": {
                            "minArgs": 0,
                            "maxArgs": 0
                        },
                        "get": {
                            "minArgs": 0,
                            "maxArgs": 1
                        },
                        "getBytesInUse": {
                            "minArgs": 0,
                            "maxArgs": 1
                        },
                        "remove": {
                            "minArgs": 1,
                            "maxArgs": 1
                        },
                        "set": {
                            "minArgs": 1,
                            "maxArgs": 1
                        }
                    }
                },
                "tabs": {
                    "captureVisibleTab": {
                        "minArgs": 0,
                        "maxArgs": 2
                    },
                    "create": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "detectLanguage": {
                        "minArgs": 0,
                        "maxArgs": 1
                    },
                    "discard": {
                        "minArgs": 0,
                        "maxArgs": 1
                    },
                    "duplicate": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "executeScript": {
                        "minArgs": 1,
                        "maxArgs": 2
                    },
                    "get": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "getCurrent": {
                        "minArgs": 0,
                        "maxArgs": 0
                    },
                    "getZoom": {
                        "minArgs": 0,
                        "maxArgs": 1
                    },
                    "getZoomSettings": {
                        "minArgs": 0,
                        "maxArgs": 1
                    },
                    "goBack": {
                        "minArgs": 0,
                        "maxArgs": 1
                    },
                    "goForward": {
                        "minArgs": 0,
                        "maxArgs": 1
                    },
                    "highlight": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "insertCSS": {
                        "minArgs": 1,
                        "maxArgs": 2
                    },
                    "move": {
                        "minArgs": 2,
                        "maxArgs": 2
                    },
                    "query": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "reload": {
                        "minArgs": 0,
                        "maxArgs": 2
                    },
                    "remove": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "removeCSS": {
                        "minArgs": 1,
                        "maxArgs": 2
                    },
                    "sendMessage": {
                        "minArgs": 2,
                        "maxArgs": 3
                    },
                    "setZoom": {
                        "minArgs": 1,
                        "maxArgs": 2
                    },
                    "setZoomSettings": {
                        "minArgs": 1,
                        "maxArgs": 2
                    },
                    "update": {
                        "minArgs": 1,
                        "maxArgs": 2
                    }
                },
                "topSites": {
                    "get": {
                        "minArgs": 0,
                        "maxArgs": 0
                    }
                },
                "webNavigation": {
                    "getAllFrames": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "getFrame": {
                        "minArgs": 1,
                        "maxArgs": 1
                    }
                },
                "webRequest": {
                    "handlerBehaviorChanged": {
                        "minArgs": 0,
                        "maxArgs": 0
                    }
                },
                "windows": {
                    "create": {
                        "minArgs": 0,
                        "maxArgs": 1
                    },
                    "get": {
                        "minArgs": 1,
                        "maxArgs": 2
                    },
                    "getAll": {
                        "minArgs": 0,
                        "maxArgs": 1
                    },
                    "getCurrent": {
                        "minArgs": 0,
                        "maxArgs": 1
                    },
                    "getLastFocused": {
                        "minArgs": 0,
                        "maxArgs": 1
                    },
                    "remove": {
                        "minArgs": 1,
                        "maxArgs": 1
                    },
                    "update": {
                        "minArgs": 2,
                        "maxArgs": 2
                    }
                }
            };
            if (Object.keys(apiMetadata).length === 0) throw new Error("api-metadata.json has not been included in browser-polyfill");
            /**
       * A WeakMap subclass which creates and stores a value for any key which does
       * not exist when accessed, but behaves exactly as an ordinary WeakMap
       * otherwise.
       *
       * @param {function} createItem
       *        A function which will be called in order to create the value for any
       *        key which does not exist, the first time it is accessed. The
       *        function receives, as its only argument, the key being created.
       */ class DefaultWeakMap extends WeakMap {
                constructor(createItem, items){
                    super(items);
                    this.createItem = createItem;
                }
                get(key) {
                    if (!this.has(key)) this.set(key, this.createItem(key));
                    return super.get(key);
                }
            }
            /**
       * Returns true if the given object is an object with a `then` method, and can
       * therefore be assumed to behave as a Promise.
       *
       * @param {*} value The value to test.
       * @returns {boolean} True if the value is thenable.
       */ const isThenable = (value)=>{
                return value && typeof value === "object" && typeof value.then === "function";
            };
            /**
       * Creates and returns a function which, when called, will resolve or reject
       * the given promise based on how it is called:
       *
       * - If, when called, `chrome.runtime.lastError` contains a non-null object,
       *   the promise is rejected with that value.
       * - If the function is called with exactly one argument, the promise is
       *   resolved to that value.
       * - Otherwise, the promise is resolved to an array containing all of the
       *   function's arguments.
       *
       * @param {object} promise
       *        An object containing the resolution and rejection functions of a
       *        promise.
       * @param {function} promise.resolve
       *        The promise's resolution function.
       * @param {function} promise.reject
       *        The promise's rejection function.
       * @param {object} metadata
       *        Metadata about the wrapped method which has created the callback.
       * @param {boolean} metadata.singleCallbackArg
       *        Whether or not the promise is resolved with only the first
       *        argument of the callback, alternatively an array of all the
       *        callback arguments is resolved. By default, if the callback
       *        function is invoked with only a single argument, that will be
       *        resolved to the promise, while all arguments will be resolved as
       *        an array if multiple are given.
       *
       * @returns {function}
       *        The generated callback function.
       */ const makeCallback = (promise, metadata)=>{
                return (...callbackArgs)=>{
                    if (extensionAPIs.runtime.lastError) promise.reject(new Error(extensionAPIs.runtime.lastError.message));
                    else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) promise.resolve(callbackArgs[0]);
                    else promise.resolve(callbackArgs);
                };
            };
            const pluralizeArguments = (numArgs)=>numArgs == 1 ? "argument" : "arguments";
            /**
       * Creates a wrapper function for a method with the given name and metadata.
       *
       * @param {string} name
       *        The name of the method which is being wrapped.
       * @param {object} metadata
       *        Metadata about the method being wrapped.
       * @param {integer} metadata.minArgs
       *        The minimum number of arguments which must be passed to the
       *        function. If called with fewer than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {integer} metadata.maxArgs
       *        The maximum number of arguments which may be passed to the
       *        function. If called with more than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {boolean} metadata.singleCallbackArg
       *        Whether or not the promise is resolved with only the first
       *        argument of the callback, alternatively an array of all the
       *        callback arguments is resolved. By default, if the callback
       *        function is invoked with only a single argument, that will be
       *        resolved to the promise, while all arguments will be resolved as
       *        an array if multiple are given.
       *
       * @returns {function(object, ...*)}
       *       The generated wrapper function.
       */ const wrapAsyncFunction = (name, metadata)=>{
                return function asyncFunctionWrapper(target, ...args) {
                    if (args.length < metadata.minArgs) throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
                    if (args.length > metadata.maxArgs) throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
                    return new Promise((resolve, reject)=>{
                        if (metadata.fallbackToNoCallback) // This API method has currently no callback on Chrome, but it return a promise on Firefox,
                        // and so the polyfill will try to call it with a callback first, and it will fallback
                        // to not passing the callback if the first call fails.
                        try {
                            target[name](...args, makeCallback({
                                resolve,
                                reject
                            }, metadata));
                        } catch (cbError) {
                            console.warn(`${name} API method doesn't seem to support the callback parameter, ` + "falling back to call it without a callback: ", cbError);
                            target[name](...args); // Update the API method metadata, so that the next API calls will not try to
                            // use the unsupported callback anymore.
                            metadata.fallbackToNoCallback = false;
                            metadata.noCallback = true;
                            resolve();
                        }
                        else if (metadata.noCallback) {
                            target[name](...args);
                            resolve();
                        } else target[name](...args, makeCallback({
                            resolve,
                            reject
                        }, metadata));
                    });
                };
            };
            /**
       * Wraps an existing method of the target object, so that calls to it are
       * intercepted by the given wrapper function. The wrapper function receives,
       * as its first argument, the original `target` object, followed by each of
       * the arguments passed to the original method.
       *
       * @param {object} target
       *        The original target object that the wrapped method belongs to.
       * @param {function} method
       *        The method being wrapped. This is used as the target of the Proxy
       *        object which is created to wrap the method.
       * @param {function} wrapper
       *        The wrapper function which is called in place of a direct invocation
       *        of the wrapped method.
       *
       * @returns {Proxy<function>}
       *        A Proxy object for the given method, which invokes the given wrapper
       *        method in its place.
       */ const wrapMethod = (target, method, wrapper)=>{
                return new Proxy(method, {
                    apply (targetMethod, thisObj, args) {
                        return wrapper.call(thisObj, target, ...args);
                    }
                });
            };
            let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
            /**
       * Wraps an object in a Proxy which intercepts and wraps certain methods
       * based on the given `wrappers` and `metadata` objects.
       *
       * @param {object} target
       *        The target object to wrap.
       *
       * @param {object} [wrappers = {}]
       *        An object tree containing wrapper functions for special cases. Any
       *        function present in this object tree is called in place of the
       *        method in the same location in the `target` object tree. These
       *        wrapper methods are invoked as described in {@see wrapMethod}.
       *
       * @param {object} [metadata = {}]
       *        An object tree containing metadata used to automatically generate
       *        Promise-based wrapper functions for asynchronous. Any function in
       *        the `target` object tree which has a corresponding metadata object
       *        in the same location in the `metadata` tree is replaced with an
       *        automatically-generated wrapper function, as described in
       *        {@see wrapAsyncFunction}
       *
       * @returns {Proxy<object>}
       */ const wrapObject = (target, wrappers = {}, metadata = {})=>{
                let cache = Object.create(null);
                let handlers = {
                    has (proxyTarget, prop) {
                        return prop in target || prop in cache;
                    },
                    get (proxyTarget, prop, receiver) {
                        if (prop in cache) return cache[prop];
                        if (!(prop in target)) return undefined;
                        let value1 = target[prop];
                        if (typeof value1 === "function") {
                            // This is a method on the underlying object. Check if we need to do
                            // any wrapping.
                            if (typeof wrappers[prop] === "function") // We have a special-case wrapper for this method.
                            value1 = wrapMethod(target, target[prop], wrappers[prop]);
                            else if (hasOwnProperty(metadata, prop)) {
                                // This is an async method that we have metadata for. Create a
                                // Promise wrapper for it.
                                let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                                value1 = wrapMethod(target, target[prop], wrapper);
                            } else // This is a method that we don't know or care about. Return the
                            // original method, bound to the underlying object.
                            value1 = value1.bind(target);
                        } else if (typeof value1 === "object" && value1 !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) // This is an object that we need to do some wrapping for the children
                        // of. Create a sub-object wrapper for it with the appropriate child
                        // metadata.
                        value1 = wrapObject(value1, wrappers[prop], metadata[prop]);
                        else if (hasOwnProperty(metadata, "*")) // Wrap all properties in * namespace.
                        value1 = wrapObject(value1, wrappers[prop], metadata["*"]);
                        else {
                            // We don't need to do any wrapping for this property,
                            // so just forward all access to the underlying object.
                            Object.defineProperty(cache, prop, {
                                configurable: true,
                                enumerable: true,
                                get () {
                                    return target[prop];
                                },
                                set (value) {
                                    target[prop] = value;
                                }
                            });
                            return value1;
                        }
                        cache[prop] = value1;
                        return value1;
                    },
                    set (proxyTarget, prop, value, receiver) {
                        if (prop in cache) cache[prop] = value;
                        else target[prop] = value;
                        return true;
                    },
                    defineProperty (proxyTarget, prop, desc) {
                        return Reflect.defineProperty(cache, prop, desc);
                    },
                    deleteProperty (proxyTarget, prop) {
                        return Reflect.deleteProperty(cache, prop);
                    }
                }; // Per contract of the Proxy API, the "get" proxy handler must return the
                // original value of the target if that value is declared read-only and
                // non-configurable. For this reason, we create an object with the
                // prototype set to `target` instead of using `target` directly.
                // Otherwise we cannot return a custom object for APIs that
                // are declared read-only and non-configurable, such as `chrome.devtools`.
                //
                // The proxy handlers themselves will still use the original `target`
                // instead of the `proxyTarget`, so that the methods and properties are
                // dereferenced via the original targets.
                let proxyTarget = Object.create(target);
                return new Proxy(proxyTarget, handlers);
            };
            /**
       * Creates a set of wrapper functions for an event object, which handles
       * wrapping of listener functions that those messages are passed.
       *
       * A single wrapper is created for each listener function, and stored in a
       * map. Subsequent calls to `addListener`, `hasListener`, or `removeListener`
       * retrieve the original wrapper, so that  attempts to remove a
       * previously-added listener work as expected.
       *
       * @param {DefaultWeakMap<function, function>} wrapperMap
       *        A DefaultWeakMap object which will create the appropriate wrapper
       *        for a given listener function when one does not exist, and retrieve
       *        an existing one when it does.
       *
       * @returns {object}
       */ const wrapEvent = (wrapperMap)=>({
                    addListener (target, listener, ...args) {
                        target.addListener(wrapperMap.get(listener), ...args);
                    },
                    hasListener (target, listener) {
                        return target.hasListener(wrapperMap.get(listener));
                    },
                    removeListener (target, listener) {
                        target.removeListener(wrapperMap.get(listener));
                    }
                });
            const onRequestFinishedWrappers = new DefaultWeakMap((listener)=>{
                if (typeof listener !== "function") return listener;
                /**
         * Wraps an onRequestFinished listener function so that it will return a
         * `getContent()` property which returns a `Promise` rather than using a
         * callback API.
         *
         * @param {object} req
         *        The HAR entry object representing the network request.
         */ return function onRequestFinished(req) {
                    const wrappedReq = wrapObject(req, {}, {
                        getContent: {
                            minArgs: 0,
                            maxArgs: 0
                        }
                    });
                    listener(wrappedReq);
                };
            }); // Keep track if the deprecation warning has been logged at least once.
            let loggedSendResponseDeprecationWarning = false;
            const onMessageWrappers = new DefaultWeakMap((listener)=>{
                if (typeof listener !== "function") return listener;
                /**
         * Wraps a message listener function so that it may send responses based on
         * its return value, rather than by returning a sentinel value and calling a
         * callback. If the listener function returns a Promise, the response is
         * sent when the promise either resolves or rejects.
         *
         * @param {*} message
         *        The message sent by the other end of the channel.
         * @param {object} sender
         *        Details about the sender of the message.
         * @param {function(*)} sendResponse
         *        A callback which, when called with an arbitrary argument, sends
         *        that value as a response.
         * @returns {boolean}
         *        True if the wrapped listener returned a Promise, which will later
         *        yield a response. False otherwise.
         */ return function onMessage(message1, sender, sendResponse) {
                    let didCallSendResponse = false;
                    let wrappedSendResponse;
                    let sendResponsePromise = new Promise((resolve)=>{
                        wrappedSendResponse = function(response) {
                            if (!loggedSendResponseDeprecationWarning) {
                                console.warn(SEND_RESPONSE_DEPRECATION_WARNING, new Error().stack);
                                loggedSendResponseDeprecationWarning = true;
                            }
                            didCallSendResponse = true;
                            resolve(response);
                        };
                    });
                    let result;
                    try {
                        result = listener(message1, sender, wrappedSendResponse);
                    } catch (err1) {
                        result = Promise.reject(err1);
                    }
                    const isResultThenable = result !== true && isThenable(result); // If the listener didn't returned true or a Promise, or called
                    // wrappedSendResponse synchronously, we can exit earlier
                    // because there will be no response sent from this listener.
                    if (result !== true && !isResultThenable && !didCallSendResponse) return false;
                     // A small helper to send the message if the promise resolves
                    // and an error if the promise rejects (a wrapped sendMessage has
                    // to translate the message into a resolved promise or a rejected
                    // promise).
                    const sendPromisedResult = (promise)=>{
                        promise.then((msg)=>{
                            // send the message value.
                            sendResponse(msg);
                        }, (error)=>{
                            // Send a JSON representation of the error if the rejected value
                            // is an instance of error, or the object itself otherwise.
                            let message;
                            if (error && (error instanceof Error || typeof error.message === "string")) message = error.message;
                            else message = "An unexpected error occurred";
                            sendResponse({
                                __mozWebExtensionPolyfillReject__: true,
                                message
                            });
                        }).catch((err)=>{
                            // Print an error on the console if unable to send the response.
                            console.error("Failed to send onMessage rejected reply", err);
                        });
                    }; // If the listener returned a Promise, send the resolved value as a
                    // result, otherwise wait the promise related to the wrappedSendResponse
                    // callback to resolve and send it as a response.
                    if (isResultThenable) sendPromisedResult(result);
                    else sendPromisedResult(sendResponsePromise);
                     // Let Chrome know that the listener is replying.
                    return true;
                };
            });
            const wrappedSendMessageCallback = ({ reject , resolve  }, reply)=>{
                if (extensionAPIs.runtime.lastError) {
                    // Detect when none of the listeners replied to the sendMessage call and resolve
                    // the promise to undefined as in Firefox.
                    // See https://github.com/mozilla/webextension-polyfill/issues/130
                    if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) resolve();
                    else reject(new Error(extensionAPIs.runtime.lastError.message));
                } else if (reply && reply.__mozWebExtensionPolyfillReject__) // Convert back the JSON representation of the error into
                // an Error instance.
                reject(new Error(reply.message));
                else resolve(reply);
            };
            const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args)=>{
                if (args.length < metadata.minArgs) throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
                if (args.length > metadata.maxArgs) throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
                return new Promise((resolve, reject)=>{
                    const wrappedCb = wrappedSendMessageCallback.bind(null, {
                        resolve,
                        reject
                    });
                    args.push(wrappedCb);
                    apiNamespaceObj.sendMessage(...args);
                });
            };
            const staticWrappers = {
                devtools: {
                    network: {
                        onRequestFinished: wrapEvent(onRequestFinishedWrappers)
                    }
                },
                runtime: {
                    onMessage: wrapEvent(onMessageWrappers),
                    onMessageExternal: wrapEvent(onMessageWrappers),
                    sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                        minArgs: 1,
                        maxArgs: 3
                    })
                },
                tabs: {
                    sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                        minArgs: 2,
                        maxArgs: 3
                    })
                }
            };
            const settingMetadata = {
                clear: {
                    minArgs: 1,
                    maxArgs: 1
                },
                get: {
                    minArgs: 1,
                    maxArgs: 1
                },
                set: {
                    minArgs: 1,
                    maxArgs: 1
                }
            };
            apiMetadata.privacy = {
                network: {
                    "*": settingMetadata
                },
                services: {
                    "*": settingMetadata
                },
                websites: {
                    "*": settingMetadata
                }
            };
            return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
        }; // The build process adds a UMD wrapper around this file, which makes the
        // `module` variable available.
        module.exports = wrapAPIs(chrome);
    } else module.exports = globalThis.browser;
});

},{}],"8ISrk":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["8iMmq"], "8iMmq", "parcelRequire94c2")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUssWUFBWSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQ3ZFLE9BQU87UUFHVCxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7WUFDL0IsVUFBVSxFQUFFLElBQUk7WUFDaEIsR0FBRyxFQUFFLFdBQVk7Z0JBQ2YsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDcEI7U0FDRixDQUFDLENBQUM7S0FDSixDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztDQUNiLENBQUM7QUFFRixPQUFPLENBQUMsTUFBTSxHQUFHLFNBQVUsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUU7SUFDOUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO1FBQ3BDLFVBQVUsRUFBRSxJQUFJO1FBQ2hCLEdBQUcsRUFBRSxHQUFHO0tBQ1QsQ0FBQyxDQUFDO0NBQ0osQ0FBQyIsInNvdXJjZXMiOlsic291cmNlL2JhY2tncm91bmQudHMiLCJub2RlX21vZHVsZXMvd2ViZXh0ZW5zaW9uLXBvbHlmaWxsL2Rpc3QvYnJvd3Nlci1wb2x5ZmlsbC5qcyIsIm5vZGVfbW9kdWxlcy9AcGFyY2VsL3RyYW5zZm9ybWVyLWpzL3NyYy9lc21vZHVsZS1oZWxwZXJzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBicm93c2VyIGZyb20gJ3dlYmV4dGVuc2lvbi1wb2x5ZmlsbCc7XG5jb25zb2xlLmxvZygnYmFja2dyb3VuZC50cycpO1xuXG5cbmxldCBwcmV2aW91c1VybDpzdHJpbmc7XHRcbi8vZXhlY3V0ZSBjb250ZW50IHNjcmlwdCB3aGVuIHVybCBpcyBlcXVhbCB0byBmYWNlYm9vay5jb20gaW4gUFdBIG1vZGVcbiBjb25zdCBvbkhpc3RvcnlTdGF0ZVVwZGF0ZWRMaXN0ZW5lcj0gYnJvd3Nlci53ZWJOYXZpZ2F0aW9uLm9uSGlzdG9yeVN0YXRlVXBkYXRlZC5hZGRMaXN0ZW5lcigoZGV0YWlscykgPT4ge1xuICAgIC8vIGlmIChkZXRhaWxzLnVybC5pbmNsdWRlcygnZmFjZWJvb2suY29tJykpIHtcbiAgICAvLyAgICAgYnJvd3Nlci50YWJzLmV4ZWN1dGVTY3JpcHQoZGV0YWlscy50YWJJZCwge1xuICAgIC8vICAgICAgICAgZmlsZTogJ2NvbnRlbnQuanMnXG4gICAgLy8gICAgIH0pO1xuICAgIC8vIH1cbiAgICBjb25zdCByZSA9LyhodHRwczpcXC9cXC8uKmZhY2Vib29rLmNvbVxcL2dyb3Vwc1xcL3RyZWF0ZWFybHlcXC8/LiopfChodHRwczpcXC9cXC8uKmZhY2Vib29rLmNvbVxcL2dyb3Vwc1xcLzk4NDE2NTkxMjE5MTE0M1xcLz8uKil8KChodHRwczpcXC9cXC8uKmZhY2Vib29rLmNvbVxcLz8pKGhvbWUucGhwKT8oPzpcXHN8JCkpL2lnXG4gICAgY29uc29sZS5sb2coZGV0YWlscy51cmwubWF0Y2gocmUpKTtcblxuICAgIGlmIChkZXRhaWxzLnVybC5tYXRjaChyZSkpIHtcbiAgICAgICAgXG4gICAgY29uc29sZS5sb2coXCJ1cmwgY2hhbmdlZFwiLGRldGFpbHMudXJsKTtcbiAgICAvLyBicm93c2VyLnJ1bnRpbWUucmVsb2FkKClcbiAgLy8gcmVsb2FkIHRoZSBjdXJyZW50IHRhYiB3aXRob3V0IGluZmluaXRlIGxvb3Agb2YgcmVsb2FkaW5nXG4gIGlmKGRldGFpbHMudXJsIT1wcmV2aW91c1VybCl7XG4gICAgY29uc29sZS5sb2coZGV0YWlscyxwcmV2aW91c1VybClcbiAgICBicm93c2VyLnRhYnMucmVsb2FkKGRldGFpbHMudGFiSWQsIHtieXBhc3NDYWNoZTogdHJ1ZX0pO1xuICAgIHByZXZpb3VzVXJsPWRldGFpbHMudXJsO1xuICB9XG4gIFxuICAgIH1cbn1cbik7XG5cbi8vIGJyb3dzZXIudGFicy5vblVwZGF0ZWQuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKHRhYklkLCBjaGFuZ2VJbmZvLCB0YWIpIHtcbi8vICAgICBpZiAoY2hhbmdlSW5mby5zdGF0dXMgPT09ICdjb21wbGV0ZScpIHtcbi8vICAgICAgICAgYnJvd3Nlci50YWJzLmV4ZWN1dGVTY3JpcHQodGFiSWQsIHtcbi8vICAgICAgICAgICAgIGZpbGU6ICdjb250ZW50LmpzJ1xuLy8gICAgICAgICB9KTtcbi8vICAgICB9XG4vLyB9XG4vLyApOyIsIi8qIHdlYmV4dGVuc2lvbi1wb2x5ZmlsbCAtIHYwLjkuMCAtIEZyaSBNYXIgMjUgMjAyMiAxNzowMDoyMyAqL1xuLyogLSotIE1vZGU6IGluZGVudC10YWJzLW1vZGU6IG5pbDsganMtaW5kZW50LWxldmVsOiAyIC0qLSAqL1xuLyogdmltOiBzZXQgc3RzPTIgc3c9MiBldCB0dz04MDogKi9cbi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uICovXG5cInVzZSBzdHJpY3RcIjtcblxuaWYgKHR5cGVvZiBnbG9iYWxUaGlzICE9IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNocm9tZSAhPSBcIm9iamVjdFwiIHx8ICFjaHJvbWUgfHwgIWNocm9tZS5ydW50aW1lIHx8ICFjaHJvbWUucnVudGltZS5pZCkge1xuICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIHNjcmlwdCBzaG91bGQgb25seSBiZSBsb2FkZWQgaW4gYSBicm93c2VyIGV4dGVuc2lvbi5cIik7XG59XG5cbmlmICh0eXBlb2YgZ2xvYmFsVGhpcy5icm93c2VyID09PSBcInVuZGVmaW5lZFwiIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihnbG9iYWxUaGlzLmJyb3dzZXIpICE9PSBPYmplY3QucHJvdG90eXBlKSB7XG4gIGNvbnN0IENIUk9NRV9TRU5EX01FU1NBR0VfQ0FMTEJBQ0tfTk9fUkVTUE9OU0VfTUVTU0FHRSA9IFwiVGhlIG1lc3NhZ2UgcG9ydCBjbG9zZWQgYmVmb3JlIGEgcmVzcG9uc2Ugd2FzIHJlY2VpdmVkLlwiO1xuICBjb25zdCBTRU5EX1JFU1BPTlNFX0RFUFJFQ0FUSU9OX1dBUk5JTkcgPSBcIlJldHVybmluZyBhIFByb21pc2UgaXMgdGhlIHByZWZlcnJlZCB3YXkgdG8gc2VuZCBhIHJlcGx5IGZyb20gYW4gb25NZXNzYWdlL29uTWVzc2FnZUV4dGVybmFsIGxpc3RlbmVyLCBhcyB0aGUgc2VuZFJlc3BvbnNlIHdpbGwgYmUgcmVtb3ZlZCBmcm9tIHRoZSBzcGVjcyAoU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2RvY3MvTW96aWxsYS9BZGQtb25zL1dlYkV4dGVuc2lvbnMvQVBJL3J1bnRpbWUvb25NZXNzYWdlKVwiO1xuXG4gIC8vIFdyYXBwaW5nIHRoZSBidWxrIG9mIHRoaXMgcG9seWZpbGwgaW4gYSBvbmUtdGltZS11c2UgZnVuY3Rpb24gaXMgYSBtaW5vclxuICAvLyBvcHRpbWl6YXRpb24gZm9yIEZpcmVmb3guIFNpbmNlIFNwaWRlcm1vbmtleSBkb2VzIG5vdCBmdWxseSBwYXJzZSB0aGVcbiAgLy8gY29udGVudHMgb2YgYSBmdW5jdGlvbiB1bnRpbCB0aGUgZmlyc3QgdGltZSBpdCdzIGNhbGxlZCwgYW5kIHNpbmNlIGl0IHdpbGxcbiAgLy8gbmV2ZXIgYWN0dWFsbHkgbmVlZCB0byBiZSBjYWxsZWQsIHRoaXMgYWxsb3dzIHRoZSBwb2x5ZmlsbCB0byBiZSBpbmNsdWRlZFxuICAvLyBpbiBGaXJlZm94IG5lYXJseSBmb3IgZnJlZS5cbiAgY29uc3Qgd3JhcEFQSXMgPSBleHRlbnNpb25BUElzID0+IHtcbiAgICAvLyBOT1RFOiBhcGlNZXRhZGF0YSBpcyBhc3NvY2lhdGVkIHRvIHRoZSBjb250ZW50IG9mIHRoZSBhcGktbWV0YWRhdGEuanNvbiBmaWxlXG4gICAgLy8gYXQgYnVpbGQgdGltZSBieSByZXBsYWNpbmcgdGhlIGZvbGxvd2luZyBcImluY2x1ZGVcIiB3aXRoIHRoZSBjb250ZW50IG9mIHRoZVxuICAgIC8vIEpTT04gZmlsZS5cbiAgICBjb25zdCBhcGlNZXRhZGF0YSA9IHtcbiAgICAgIFwiYWxhcm1zXCI6IHtcbiAgICAgICAgXCJjbGVhclwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJjbGVhckFsbFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgfSxcbiAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJib29rbWFya3NcIjoge1xuICAgICAgICBcImNyZWF0ZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2V0Q2hpbGRyZW5cIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2V0UmVjZW50XCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImdldFN1YlRyZWVcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2V0VHJlZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgfSxcbiAgICAgICAgXCJtb3ZlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICB9LFxuICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJyZW1vdmVUcmVlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcInNlYXJjaFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcImJyb3dzZXJBY3Rpb25cIjoge1xuICAgICAgICBcImRpc2FibGVcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBcImVuYWJsZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2V0QmFkZ2VCYWNrZ3JvdW5kQ29sb3JcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2V0QmFkZ2VUZXh0XCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImdldFBvcHVwXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImdldFRpdGxlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcIm9wZW5Qb3B1cFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgfSxcbiAgICAgICAgXCJzZXRCYWRnZUJhY2tncm91bmRDb2xvclwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIFwic2V0QmFkZ2VUZXh0XCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgXCJzZXRJY29uXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcInNldFBvcHVwXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgXCJzZXRUaXRsZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcImJyb3dzaW5nRGF0YVwiOiB7XG4gICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICB9LFxuICAgICAgICBcInJlbW92ZUNhY2hlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcInJlbW92ZUNvb2tpZXNcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwicmVtb3ZlRG93bmxvYWRzXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcInJlbW92ZUZvcm1EYXRhXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcInJlbW92ZUhpc3RvcnlcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwicmVtb3ZlTG9jYWxTdG9yYWdlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcInJlbW92ZVBhc3N3b3Jkc1wiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJyZW1vdmVQbHVnaW5EYXRhXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcInNldHRpbmdzXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJjb21tYW5kc1wiOiB7XG4gICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJjb250ZXh0TWVudXNcIjoge1xuICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJyZW1vdmVBbGxcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgIH0sXG4gICAgICAgIFwidXBkYXRlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJjb29raWVzXCI6IHtcbiAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImdldEFsbENvb2tpZVN0b3Jlc1wiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgfSxcbiAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwic2V0XCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJkZXZ0b29sc1wiOiB7XG4gICAgICAgIFwiaW5zcGVjdGVkV2luZG93XCI6IHtcbiAgICAgICAgICBcImV2YWxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMixcbiAgICAgICAgICAgIFwic2luZ2xlQ2FsbGJhY2tBcmdcIjogZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwicGFuZWxzXCI6IHtcbiAgICAgICAgICBcImNyZWF0ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMyxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAzLFxuICAgICAgICAgICAgXCJzaW5nbGVDYWxsYmFja0FyZ1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImVsZW1lbnRzXCI6IHtcbiAgICAgICAgICAgIFwiY3JlYXRlU2lkZWJhclBhbmVcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcImRvd25sb2Fkc1wiOiB7XG4gICAgICAgIFwiY2FuY2VsXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImRvd25sb2FkXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImVyYXNlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImdldEZpbGVJY29uXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICB9LFxuICAgICAgICBcIm9wZW5cIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBcInBhdXNlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcInJlbW92ZUZpbGVcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwicmVzdW1lXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcInNlYXJjaFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJzaG93XCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwiZXh0ZW5zaW9uXCI6IHtcbiAgICAgICAgXCJpc0FsbG93ZWRGaWxlU2NoZW1lQWNjZXNzXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICB9LFxuICAgICAgICBcImlzQWxsb3dlZEluY29nbml0b0FjY2Vzc1wiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwiaGlzdG9yeVwiOiB7XG4gICAgICAgIFwiYWRkVXJsXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImRlbGV0ZUFsbFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgfSxcbiAgICAgICAgXCJkZWxldGVSYW5nZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJkZWxldGVVcmxcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2V0VmlzaXRzXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcInNlYXJjaFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwiaTE4blwiOiB7XG4gICAgICAgIFwiZGV0ZWN0TGFuZ3VhZ2VcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2V0QWNjZXB0TGFuZ3VhZ2VzXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJpZGVudGl0eVwiOiB7XG4gICAgICAgIFwibGF1bmNoV2ViQXV0aEZsb3dcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcImlkbGVcIjoge1xuICAgICAgICBcInF1ZXJ5U3RhdGVcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcIm1hbmFnZW1lbnRcIjoge1xuICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2V0U2VsZlwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgfSxcbiAgICAgICAgXCJzZXRFbmFibGVkXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICB9LFxuICAgICAgICBcInVuaW5zdGFsbFNlbGZcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcIm5vdGlmaWNhdGlvbnNcIjoge1xuICAgICAgICBcImNsZWFyXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImNyZWF0ZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgfSxcbiAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2V0UGVybWlzc2lvbkxldmVsXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICB9LFxuICAgICAgICBcInVwZGF0ZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwicGFnZUFjdGlvblwiOiB7XG4gICAgICAgIFwiZ2V0UG9wdXBcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2V0VGl0bGVcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiaGlkZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIFwic2V0SWNvblwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJzZXRQb3B1cFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIFwic2V0VGl0bGVcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBcInNob3dcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJwZXJtaXNzaW9uc1wiOiB7XG4gICAgICAgIFwiY29udGFpbnNcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICB9LFxuICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJyZXF1ZXN0XCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJydW50aW1lXCI6IHtcbiAgICAgICAgXCJnZXRCYWNrZ3JvdW5kUGFnZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgfSxcbiAgICAgICAgXCJnZXRQbGF0Zm9ybUluZm9cIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgIH0sXG4gICAgICAgIFwib3Blbk9wdGlvbnNQYWdlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICB9LFxuICAgICAgICBcInJlcXVlc3RVcGRhdGVDaGVja1wiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgfSxcbiAgICAgICAgXCJzZW5kTWVzc2FnZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDNcbiAgICAgICAgfSxcbiAgICAgICAgXCJzZW5kTmF0aXZlTWVzc2FnZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgfSxcbiAgICAgICAgXCJzZXRVbmluc3RhbGxVUkxcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcInNlc3Npb25zXCI6IHtcbiAgICAgICAgXCJnZXREZXZpY2VzXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImdldFJlY2VudGx5Q2xvc2VkXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcInJlc3RvcmVcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcInN0b3JhZ2VcIjoge1xuICAgICAgICBcImxvY2FsXCI6IHtcbiAgICAgICAgICBcImNsZWFyXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0Qnl0ZXNJblVzZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIm1hbmFnZWRcIjoge1xuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0Qnl0ZXNJblVzZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInN5bmNcIjoge1xuICAgICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRCeXRlc0luVXNlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcInRhYnNcIjoge1xuICAgICAgICBcImNhcHR1cmVWaXNpYmxlVGFiXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICB9LFxuICAgICAgICBcImNyZWF0ZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJkZXRlY3RMYW5ndWFnZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJkaXNjYXJkXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImR1cGxpY2F0ZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJleGVjdXRlU2NyaXB0XCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICB9LFxuICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJnZXRDdXJyZW50XCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICB9LFxuICAgICAgICBcImdldFpvb21cIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2V0Wm9vbVNldHRpbmdzXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImdvQmFja1wiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJnb0ZvcndhcmRcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiaGlnaGxpZ2h0XCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImluc2VydENTU1wiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgfSxcbiAgICAgICAgXCJtb3ZlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICB9LFxuICAgICAgICBcInF1ZXJ5XCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcInJlbG9hZFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgfSxcbiAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwicmVtb3ZlQ1NTXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICB9LFxuICAgICAgICBcInNlbmRNZXNzYWdlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICBcIm1heEFyZ3NcIjogM1xuICAgICAgICB9LFxuICAgICAgICBcInNldFpvb21cIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgIH0sXG4gICAgICAgIFwic2V0Wm9vbVNldHRpbmdzXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICB9LFxuICAgICAgICBcInVwZGF0ZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwidG9wU2l0ZXNcIjoge1xuICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwid2ViTmF2aWdhdGlvblwiOiB7XG4gICAgICAgIFwiZ2V0QWxsRnJhbWVzXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImdldEZyYW1lXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJ3ZWJSZXF1ZXN0XCI6IHtcbiAgICAgICAgXCJoYW5kbGVyQmVoYXZpb3JDaGFuZ2VkXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJ3aW5kb3dzXCI6IHtcbiAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICB9LFxuICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJnZXRDdXJyZW50XCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImdldExhc3RGb2N1c2VkXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKE9iamVjdC5rZXlzKGFwaU1ldGFkYXRhKS5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImFwaS1tZXRhZGF0YS5qc29uIGhhcyBub3QgYmVlbiBpbmNsdWRlZCBpbiBicm93c2VyLXBvbHlmaWxsXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgV2Vha01hcCBzdWJjbGFzcyB3aGljaCBjcmVhdGVzIGFuZCBzdG9yZXMgYSB2YWx1ZSBmb3IgYW55IGtleSB3aGljaCBkb2VzXG4gICAgICogbm90IGV4aXN0IHdoZW4gYWNjZXNzZWQsIGJ1dCBiZWhhdmVzIGV4YWN0bHkgYXMgYW4gb3JkaW5hcnkgV2Vha01hcFxuICAgICAqIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNyZWF0ZUl0ZW1cbiAgICAgKiAgICAgICAgQSBmdW5jdGlvbiB3aGljaCB3aWxsIGJlIGNhbGxlZCBpbiBvcmRlciB0byBjcmVhdGUgdGhlIHZhbHVlIGZvciBhbnlcbiAgICAgKiAgICAgICAga2V5IHdoaWNoIGRvZXMgbm90IGV4aXN0LCB0aGUgZmlyc3QgdGltZSBpdCBpcyBhY2Nlc3NlZC4gVGhlXG4gICAgICogICAgICAgIGZ1bmN0aW9uIHJlY2VpdmVzLCBhcyBpdHMgb25seSBhcmd1bWVudCwgdGhlIGtleSBiZWluZyBjcmVhdGVkLlxuICAgICAqL1xuICAgIGNsYXNzIERlZmF1bHRXZWFrTWFwIGV4dGVuZHMgV2Vha01hcCB7XG4gICAgICBjb25zdHJ1Y3RvcihjcmVhdGVJdGVtLCBpdGVtcyA9IHVuZGVmaW5lZCkge1xuICAgICAgICBzdXBlcihpdGVtcyk7XG4gICAgICAgIHRoaXMuY3JlYXRlSXRlbSA9IGNyZWF0ZUl0ZW07XG4gICAgICB9XG5cbiAgICAgIGdldChrZXkpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgdGhpcy5zZXQoa2V5LCB0aGlzLmNyZWF0ZUl0ZW0oa2V5KSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3VwZXIuZ2V0KGtleSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBvYmplY3QgaXMgYW4gb2JqZWN0IHdpdGggYSBgdGhlbmAgbWV0aG9kLCBhbmQgY2FuXG4gICAgICogdGhlcmVmb3JlIGJlIGFzc3VtZWQgdG8gYmVoYXZlIGFzIGEgUHJvbWlzZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHRoZW5hYmxlLlxuICAgICAqL1xuICAgIGNvbnN0IGlzVGhlbmFibGUgPSB2YWx1ZSA9PiB7XG4gICAgICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSBcImZ1bmN0aW9uXCI7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSBmdW5jdGlvbiB3aGljaCwgd2hlbiBjYWxsZWQsIHdpbGwgcmVzb2x2ZSBvciByZWplY3RcbiAgICAgKiB0aGUgZ2l2ZW4gcHJvbWlzZSBiYXNlZCBvbiBob3cgaXQgaXMgY2FsbGVkOlxuICAgICAqXG4gICAgICogLSBJZiwgd2hlbiBjYWxsZWQsIGBjaHJvbWUucnVudGltZS5sYXN0RXJyb3JgIGNvbnRhaW5zIGEgbm9uLW51bGwgb2JqZWN0LFxuICAgICAqICAgdGhlIHByb21pc2UgaXMgcmVqZWN0ZWQgd2l0aCB0aGF0IHZhbHVlLlxuICAgICAqIC0gSWYgdGhlIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aXRoIGV4YWN0bHkgb25lIGFyZ3VtZW50LCB0aGUgcHJvbWlzZSBpc1xuICAgICAqICAgcmVzb2x2ZWQgdG8gdGhhdCB2YWx1ZS5cbiAgICAgKiAtIE90aGVyd2lzZSwgdGhlIHByb21pc2UgaXMgcmVzb2x2ZWQgdG8gYW4gYXJyYXkgY29udGFpbmluZyBhbGwgb2YgdGhlXG4gICAgICogICBmdW5jdGlvbidzIGFyZ3VtZW50cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9taXNlXG4gICAgICogICAgICAgIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSByZXNvbHV0aW9uIGFuZCByZWplY3Rpb24gZnVuY3Rpb25zIG9mIGFcbiAgICAgKiAgICAgICAgcHJvbWlzZS5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcm9taXNlLnJlc29sdmVcbiAgICAgKiAgICAgICAgVGhlIHByb21pc2UncyByZXNvbHV0aW9uIGZ1bmN0aW9uLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHByb21pc2UucmVqZWN0XG4gICAgICogICAgICAgIFRoZSBwcm9taXNlJ3MgcmVqZWN0aW9uIGZ1bmN0aW9uLlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtZXRhZGF0YVxuICAgICAqICAgICAgICBNZXRhZGF0YSBhYm91dCB0aGUgd3JhcHBlZCBtZXRob2Qgd2hpY2ggaGFzIGNyZWF0ZWQgdGhlIGNhbGxiYWNrLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWV0YWRhdGEuc2luZ2xlQ2FsbGJhY2tBcmdcbiAgICAgKiAgICAgICAgV2hldGhlciBvciBub3QgdGhlIHByb21pc2UgaXMgcmVzb2x2ZWQgd2l0aCBvbmx5IHRoZSBmaXJzdFxuICAgICAqICAgICAgICBhcmd1bWVudCBvZiB0aGUgY2FsbGJhY2ssIGFsdGVybmF0aXZlbHkgYW4gYXJyYXkgb2YgYWxsIHRoZVxuICAgICAqICAgICAgICBjYWxsYmFjayBhcmd1bWVudHMgaXMgcmVzb2x2ZWQuIEJ5IGRlZmF1bHQsIGlmIHRoZSBjYWxsYmFja1xuICAgICAqICAgICAgICBmdW5jdGlvbiBpcyBpbnZva2VkIHdpdGggb25seSBhIHNpbmdsZSBhcmd1bWVudCwgdGhhdCB3aWxsIGJlXG4gICAgICogICAgICAgIHJlc29sdmVkIHRvIHRoZSBwcm9taXNlLCB3aGlsZSBhbGwgYXJndW1lbnRzIHdpbGwgYmUgcmVzb2x2ZWQgYXNcbiAgICAgKiAgICAgICAgYW4gYXJyYXkgaWYgbXVsdGlwbGUgYXJlIGdpdmVuLlxuICAgICAqXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufVxuICAgICAqICAgICAgICBUaGUgZ2VuZXJhdGVkIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgICAqL1xuICAgIGNvbnN0IG1ha2VDYWxsYmFjayA9IChwcm9taXNlLCBtZXRhZGF0YSkgPT4ge1xuICAgICAgcmV0dXJuICguLi5jYWxsYmFja0FyZ3MpID0+IHtcbiAgICAgICAgaWYgKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IpIHtcbiAgICAgICAgICBwcm9taXNlLnJlamVjdChuZXcgRXJyb3IoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvci5tZXNzYWdlKSk7XG4gICAgICAgIH0gZWxzZSBpZiAobWV0YWRhdGEuc2luZ2xlQ2FsbGJhY2tBcmcgfHxcbiAgICAgICAgICAgICAgICAgICAoY2FsbGJhY2tBcmdzLmxlbmd0aCA8PSAxICYmIG1ldGFkYXRhLnNpbmdsZUNhbGxiYWNrQXJnICE9PSBmYWxzZSkpIHtcbiAgICAgICAgICBwcm9taXNlLnJlc29sdmUoY2FsbGJhY2tBcmdzWzBdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm9taXNlLnJlc29sdmUoY2FsbGJhY2tBcmdzKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgY29uc3QgcGx1cmFsaXplQXJndW1lbnRzID0gKG51bUFyZ3MpID0+IG51bUFyZ3MgPT0gMSA/IFwiYXJndW1lbnRcIiA6IFwiYXJndW1lbnRzXCI7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgd3JhcHBlciBmdW5jdGlvbiBmb3IgYSBtZXRob2Qgd2l0aCB0aGUgZ2l2ZW4gbmFtZSBhbmQgbWV0YWRhdGEuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqICAgICAgICBUaGUgbmFtZSBvZiB0aGUgbWV0aG9kIHdoaWNoIGlzIGJlaW5nIHdyYXBwZWQuXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1ldGFkYXRhXG4gICAgICogICAgICAgIE1ldGFkYXRhIGFib3V0IHRoZSBtZXRob2QgYmVpbmcgd3JhcHBlZC5cbiAgICAgKiBAcGFyYW0ge2ludGVnZXJ9IG1ldGFkYXRhLm1pbkFyZ3NcbiAgICAgKiAgICAgICAgVGhlIG1pbmltdW0gbnVtYmVyIG9mIGFyZ3VtZW50cyB3aGljaCBtdXN0IGJlIHBhc3NlZCB0byB0aGVcbiAgICAgKiAgICAgICAgZnVuY3Rpb24uIElmIGNhbGxlZCB3aXRoIGZld2VyIHRoYW4gdGhpcyBudW1iZXIgb2YgYXJndW1lbnRzLCB0aGVcbiAgICAgKiAgICAgICAgd3JhcHBlciB3aWxsIHJhaXNlIGFuIGV4Y2VwdGlvbi5cbiAgICAgKiBAcGFyYW0ge2ludGVnZXJ9IG1ldGFkYXRhLm1heEFyZ3NcbiAgICAgKiAgICAgICAgVGhlIG1heGltdW0gbnVtYmVyIG9mIGFyZ3VtZW50cyB3aGljaCBtYXkgYmUgcGFzc2VkIHRvIHRoZVxuICAgICAqICAgICAgICBmdW5jdGlvbi4gSWYgY2FsbGVkIHdpdGggbW9yZSB0aGFuIHRoaXMgbnVtYmVyIG9mIGFyZ3VtZW50cywgdGhlXG4gICAgICogICAgICAgIHdyYXBwZXIgd2lsbCByYWlzZSBhbiBleGNlcHRpb24uXG4gICAgICogQHBhcmFtIHtib29sZWFufSBtZXRhZGF0YS5zaW5nbGVDYWxsYmFja0FyZ1xuICAgICAqICAgICAgICBXaGV0aGVyIG9yIG5vdCB0aGUgcHJvbWlzZSBpcyByZXNvbHZlZCB3aXRoIG9ubHkgdGhlIGZpcnN0XG4gICAgICogICAgICAgIGFyZ3VtZW50IG9mIHRoZSBjYWxsYmFjaywgYWx0ZXJuYXRpdmVseSBhbiBhcnJheSBvZiBhbGwgdGhlXG4gICAgICogICAgICAgIGNhbGxiYWNrIGFyZ3VtZW50cyBpcyByZXNvbHZlZC4gQnkgZGVmYXVsdCwgaWYgdGhlIGNhbGxiYWNrXG4gICAgICogICAgICAgIGZ1bmN0aW9uIGlzIGludm9rZWQgd2l0aCBvbmx5IGEgc2luZ2xlIGFyZ3VtZW50LCB0aGF0IHdpbGwgYmVcbiAgICAgKiAgICAgICAgcmVzb2x2ZWQgdG8gdGhlIHByb21pc2UsIHdoaWxlIGFsbCBhcmd1bWVudHMgd2lsbCBiZSByZXNvbHZlZCBhc1xuICAgICAqICAgICAgICBhbiBhcnJheSBpZiBtdWx0aXBsZSBhcmUgZ2l2ZW4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb24ob2JqZWN0LCAuLi4qKX1cbiAgICAgKiAgICAgICBUaGUgZ2VuZXJhdGVkIHdyYXBwZXIgZnVuY3Rpb24uXG4gICAgICovXG4gICAgY29uc3Qgd3JhcEFzeW5jRnVuY3Rpb24gPSAobmFtZSwgbWV0YWRhdGEpID0+IHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiBhc3luY0Z1bmN0aW9uV3JhcHBlcih0YXJnZXQsIC4uLmFyZ3MpIHtcbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoIDwgbWV0YWRhdGEubWluQXJncykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgYXQgbGVhc3QgJHttZXRhZGF0YS5taW5BcmdzfSAke3BsdXJhbGl6ZUFyZ3VtZW50cyhtZXRhZGF0YS5taW5BcmdzKX0gZm9yICR7bmFtZX0oKSwgZ290ICR7YXJncy5sZW5ndGh9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXJncy5sZW5ndGggPiBtZXRhZGF0YS5tYXhBcmdzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhdCBtb3N0ICR7bWV0YWRhdGEubWF4QXJnc30gJHtwbHVyYWxpemVBcmd1bWVudHMobWV0YWRhdGEubWF4QXJncyl9IGZvciAke25hbWV9KCksIGdvdCAke2FyZ3MubGVuZ3RofWApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBpZiAobWV0YWRhdGEuZmFsbGJhY2tUb05vQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIC8vIFRoaXMgQVBJIG1ldGhvZCBoYXMgY3VycmVudGx5IG5vIGNhbGxiYWNrIG9uIENocm9tZSwgYnV0IGl0IHJldHVybiBhIHByb21pc2Ugb24gRmlyZWZveCxcbiAgICAgICAgICAgIC8vIGFuZCBzbyB0aGUgcG9seWZpbGwgd2lsbCB0cnkgdG8gY2FsbCBpdCB3aXRoIGEgY2FsbGJhY2sgZmlyc3QsIGFuZCBpdCB3aWxsIGZhbGxiYWNrXG4gICAgICAgICAgICAvLyB0byBub3QgcGFzc2luZyB0aGUgY2FsbGJhY2sgaWYgdGhlIGZpcnN0IGNhbGwgZmFpbHMuXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0oLi4uYXJncywgbWFrZUNhbGxiYWNrKHtyZXNvbHZlLCByZWplY3R9LCBtZXRhZGF0YSkpO1xuICAgICAgICAgICAgfSBjYXRjaCAoY2JFcnJvcikge1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7bmFtZX0gQVBJIG1ldGhvZCBkb2Vzbid0IHNlZW0gdG8gc3VwcG9ydCB0aGUgY2FsbGJhY2sgcGFyYW1ldGVyLCBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZmFsbGluZyBiYWNrIHRvIGNhbGwgaXQgd2l0aG91dCBhIGNhbGxiYWNrOiBcIiwgY2JFcnJvcik7XG5cbiAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdKC4uLmFyZ3MpO1xuXG4gICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgQVBJIG1ldGhvZCBtZXRhZGF0YSwgc28gdGhhdCB0aGUgbmV4dCBBUEkgY2FsbHMgd2lsbCBub3QgdHJ5IHRvXG4gICAgICAgICAgICAgIC8vIHVzZSB0aGUgdW5zdXBwb3J0ZWQgY2FsbGJhY2sgYW55bW9yZS5cbiAgICAgICAgICAgICAgbWV0YWRhdGEuZmFsbGJhY2tUb05vQ2FsbGJhY2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgbWV0YWRhdGEubm9DYWxsYmFjayA9IHRydWU7XG5cbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAobWV0YWRhdGEubm9DYWxsYmFjaykge1xuICAgICAgICAgICAgdGFyZ2V0W25hbWVdKC4uLmFyZ3MpO1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0YXJnZXRbbmFtZV0oLi4uYXJncywgbWFrZUNhbGxiYWNrKHtyZXNvbHZlLCByZWplY3R9LCBtZXRhZGF0YSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBXcmFwcyBhbiBleGlzdGluZyBtZXRob2Qgb2YgdGhlIHRhcmdldCBvYmplY3QsIHNvIHRoYXQgY2FsbHMgdG8gaXQgYXJlXG4gICAgICogaW50ZXJjZXB0ZWQgYnkgdGhlIGdpdmVuIHdyYXBwZXIgZnVuY3Rpb24uIFRoZSB3cmFwcGVyIGZ1bmN0aW9uIHJlY2VpdmVzLFxuICAgICAqIGFzIGl0cyBmaXJzdCBhcmd1bWVudCwgdGhlIG9yaWdpbmFsIGB0YXJnZXRgIG9iamVjdCwgZm9sbG93ZWQgYnkgZWFjaCBvZlxuICAgICAqIHRoZSBhcmd1bWVudHMgcGFzc2VkIHRvIHRoZSBvcmlnaW5hbCBtZXRob2QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0XG4gICAgICogICAgICAgIFRoZSBvcmlnaW5hbCB0YXJnZXQgb2JqZWN0IHRoYXQgdGhlIHdyYXBwZWQgbWV0aG9kIGJlbG9uZ3MgdG8uXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gbWV0aG9kXG4gICAgICogICAgICAgIFRoZSBtZXRob2QgYmVpbmcgd3JhcHBlZC4gVGhpcyBpcyB1c2VkIGFzIHRoZSB0YXJnZXQgb2YgdGhlIFByb3h5XG4gICAgICogICAgICAgIG9iamVjdCB3aGljaCBpcyBjcmVhdGVkIHRvIHdyYXAgdGhlIG1ldGhvZC5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSB3cmFwcGVyXG4gICAgICogICAgICAgIFRoZSB3cmFwcGVyIGZ1bmN0aW9uIHdoaWNoIGlzIGNhbGxlZCBpbiBwbGFjZSBvZiBhIGRpcmVjdCBpbnZvY2F0aW9uXG4gICAgICogICAgICAgIG9mIHRoZSB3cmFwcGVkIG1ldGhvZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtQcm94eTxmdW5jdGlvbj59XG4gICAgICogICAgICAgIEEgUHJveHkgb2JqZWN0IGZvciB0aGUgZ2l2ZW4gbWV0aG9kLCB3aGljaCBpbnZva2VzIHRoZSBnaXZlbiB3cmFwcGVyXG4gICAgICogICAgICAgIG1ldGhvZCBpbiBpdHMgcGxhY2UuXG4gICAgICovXG4gICAgY29uc3Qgd3JhcE1ldGhvZCA9ICh0YXJnZXQsIG1ldGhvZCwgd3JhcHBlcikgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBQcm94eShtZXRob2QsIHtcbiAgICAgICAgYXBwbHkodGFyZ2V0TWV0aG9kLCB0aGlzT2JqLCBhcmdzKSB7XG4gICAgICAgICAgcmV0dXJuIHdyYXBwZXIuY2FsbCh0aGlzT2JqLCB0YXJnZXQsIC4uLmFyZ3MpO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGxldCBoYXNPd25Qcm9wZXJ0eSA9IEZ1bmN0aW9uLmNhbGwuYmluZChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KTtcblxuICAgIC8qKlxuICAgICAqIFdyYXBzIGFuIG9iamVjdCBpbiBhIFByb3h5IHdoaWNoIGludGVyY2VwdHMgYW5kIHdyYXBzIGNlcnRhaW4gbWV0aG9kc1xuICAgICAqIGJhc2VkIG9uIHRoZSBnaXZlbiBgd3JhcHBlcnNgIGFuZCBgbWV0YWRhdGFgIG9iamVjdHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0XG4gICAgICogICAgICAgIFRoZSB0YXJnZXQgb2JqZWN0IHRvIHdyYXAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW3dyYXBwZXJzID0ge31dXG4gICAgICogICAgICAgIEFuIG9iamVjdCB0cmVlIGNvbnRhaW5pbmcgd3JhcHBlciBmdW5jdGlvbnMgZm9yIHNwZWNpYWwgY2FzZXMuIEFueVxuICAgICAqICAgICAgICBmdW5jdGlvbiBwcmVzZW50IGluIHRoaXMgb2JqZWN0IHRyZWUgaXMgY2FsbGVkIGluIHBsYWNlIG9mIHRoZVxuICAgICAqICAgICAgICBtZXRob2QgaW4gdGhlIHNhbWUgbG9jYXRpb24gaW4gdGhlIGB0YXJnZXRgIG9iamVjdCB0cmVlLiBUaGVzZVxuICAgICAqICAgICAgICB3cmFwcGVyIG1ldGhvZHMgYXJlIGludm9rZWQgYXMgZGVzY3JpYmVkIGluIHtAc2VlIHdyYXBNZXRob2R9LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFttZXRhZGF0YSA9IHt9XVxuICAgICAqICAgICAgICBBbiBvYmplY3QgdHJlZSBjb250YWluaW5nIG1ldGFkYXRhIHVzZWQgdG8gYXV0b21hdGljYWxseSBnZW5lcmF0ZVxuICAgICAqICAgICAgICBQcm9taXNlLWJhc2VkIHdyYXBwZXIgZnVuY3Rpb25zIGZvciBhc3luY2hyb25vdXMuIEFueSBmdW5jdGlvbiBpblxuICAgICAqICAgICAgICB0aGUgYHRhcmdldGAgb2JqZWN0IHRyZWUgd2hpY2ggaGFzIGEgY29ycmVzcG9uZGluZyBtZXRhZGF0YSBvYmplY3RcbiAgICAgKiAgICAgICAgaW4gdGhlIHNhbWUgbG9jYXRpb24gaW4gdGhlIGBtZXRhZGF0YWAgdHJlZSBpcyByZXBsYWNlZCB3aXRoIGFuXG4gICAgICogICAgICAgIGF1dG9tYXRpY2FsbHktZ2VuZXJhdGVkIHdyYXBwZXIgZnVuY3Rpb24sIGFzIGRlc2NyaWJlZCBpblxuICAgICAqICAgICAgICB7QHNlZSB3cmFwQXN5bmNGdW5jdGlvbn1cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtQcm94eTxvYmplY3Q+fVxuICAgICAqL1xuICAgIGNvbnN0IHdyYXBPYmplY3QgPSAodGFyZ2V0LCB3cmFwcGVycyA9IHt9LCBtZXRhZGF0YSA9IHt9KSA9PiB7XG4gICAgICBsZXQgY2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgbGV0IGhhbmRsZXJzID0ge1xuICAgICAgICBoYXMocHJveHlUYXJnZXQsIHByb3ApIHtcbiAgICAgICAgICByZXR1cm4gcHJvcCBpbiB0YXJnZXQgfHwgcHJvcCBpbiBjYWNoZTtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXQocHJveHlUYXJnZXQsIHByb3AsIHJlY2VpdmVyKSB7XG4gICAgICAgICAgaWYgKHByb3AgaW4gY2FjaGUpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWNoZVtwcm9wXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIShwcm9wIGluIHRhcmdldCkpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGV0IHZhbHVlID0gdGFyZ2V0W3Byb3BdO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAvLyBUaGlzIGlzIGEgbWV0aG9kIG9uIHRoZSB1bmRlcmx5aW5nIG9iamVjdC4gQ2hlY2sgaWYgd2UgbmVlZCB0byBkb1xuICAgICAgICAgICAgLy8gYW55IHdyYXBwaW5nLlxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHdyYXBwZXJzW3Byb3BdID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgLy8gV2UgaGF2ZSBhIHNwZWNpYWwtY2FzZSB3cmFwcGVyIGZvciB0aGlzIG1ldGhvZC5cbiAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwTWV0aG9kKHRhcmdldCwgdGFyZ2V0W3Byb3BdLCB3cmFwcGVyc1twcm9wXSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGhhc093blByb3BlcnR5KG1ldGFkYXRhLCBwcm9wKSkge1xuICAgICAgICAgICAgICAvLyBUaGlzIGlzIGFuIGFzeW5jIG1ldGhvZCB0aGF0IHdlIGhhdmUgbWV0YWRhdGEgZm9yLiBDcmVhdGUgYVxuICAgICAgICAgICAgICAvLyBQcm9taXNlIHdyYXBwZXIgZm9yIGl0LlxuICAgICAgICAgICAgICBsZXQgd3JhcHBlciA9IHdyYXBBc3luY0Z1bmN0aW9uKHByb3AsIG1ldGFkYXRhW3Byb3BdKTtcbiAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwTWV0aG9kKHRhcmdldCwgdGFyZ2V0W3Byb3BdLCB3cmFwcGVyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIFRoaXMgaXMgYSBtZXRob2QgdGhhdCB3ZSBkb24ndCBrbm93IG9yIGNhcmUgYWJvdXQuIFJldHVybiB0aGVcbiAgICAgICAgICAgICAgLy8gb3JpZ2luYWwgbWV0aG9kLCBib3VuZCB0byB0aGUgdW5kZXJseWluZyBvYmplY3QuXG4gICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuYmluZCh0YXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAoaGFzT3duUHJvcGVydHkod3JhcHBlcnMsIHByb3ApIHx8XG4gICAgICAgICAgICAgICAgICAgICAgaGFzT3duUHJvcGVydHkobWV0YWRhdGEsIHByb3ApKSkge1xuICAgICAgICAgICAgLy8gVGhpcyBpcyBhbiBvYmplY3QgdGhhdCB3ZSBuZWVkIHRvIGRvIHNvbWUgd3JhcHBpbmcgZm9yIHRoZSBjaGlsZHJlblxuICAgICAgICAgICAgLy8gb2YuIENyZWF0ZSBhIHN1Yi1vYmplY3Qgd3JhcHBlciBmb3IgaXQgd2l0aCB0aGUgYXBwcm9wcmlhdGUgY2hpbGRcbiAgICAgICAgICAgIC8vIG1ldGFkYXRhLlxuICAgICAgICAgICAgdmFsdWUgPSB3cmFwT2JqZWN0KHZhbHVlLCB3cmFwcGVyc1twcm9wXSwgbWV0YWRhdGFbcHJvcF0pO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzT3duUHJvcGVydHkobWV0YWRhdGEsIFwiKlwiKSkge1xuICAgICAgICAgICAgLy8gV3JhcCBhbGwgcHJvcGVydGllcyBpbiAqIG5hbWVzcGFjZS5cbiAgICAgICAgICAgIHZhbHVlID0gd3JhcE9iamVjdCh2YWx1ZSwgd3JhcHBlcnNbcHJvcF0sIG1ldGFkYXRhW1wiKlwiXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFdlIGRvbid0IG5lZWQgdG8gZG8gYW55IHdyYXBwaW5nIGZvciB0aGlzIHByb3BlcnR5LFxuICAgICAgICAgICAgLy8gc28ganVzdCBmb3J3YXJkIGFsbCBhY2Nlc3MgdG8gdGhlIHVuZGVybHlpbmcgb2JqZWN0LlxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNhY2hlLCBwcm9wLCB7XG4gICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXRbcHJvcF07XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtwcm9wXSA9IHZhbHVlO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjYWNoZVtwcm9wXSA9IHZhbHVlO1xuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXQocHJveHlUYXJnZXQsIHByb3AsIHZhbHVlLCByZWNlaXZlcikge1xuICAgICAgICAgIGlmIChwcm9wIGluIGNhY2hlKSB7XG4gICAgICAgICAgICBjYWNoZVtwcm9wXSA9IHZhbHVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVmaW5lUHJvcGVydHkocHJveHlUYXJnZXQsIHByb3AsIGRlc2MpIHtcbiAgICAgICAgICByZXR1cm4gUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShjYWNoZSwgcHJvcCwgZGVzYyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVsZXRlUHJvcGVydHkocHJveHlUYXJnZXQsIHByb3ApIHtcbiAgICAgICAgICByZXR1cm4gUmVmbGVjdC5kZWxldGVQcm9wZXJ0eShjYWNoZSwgcHJvcCk7XG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICAvLyBQZXIgY29udHJhY3Qgb2YgdGhlIFByb3h5IEFQSSwgdGhlIFwiZ2V0XCIgcHJveHkgaGFuZGxlciBtdXN0IHJldHVybiB0aGVcbiAgICAgIC8vIG9yaWdpbmFsIHZhbHVlIG9mIHRoZSB0YXJnZXQgaWYgdGhhdCB2YWx1ZSBpcyBkZWNsYXJlZCByZWFkLW9ubHkgYW5kXG4gICAgICAvLyBub24tY29uZmlndXJhYmxlLiBGb3IgdGhpcyByZWFzb24sIHdlIGNyZWF0ZSBhbiBvYmplY3Qgd2l0aCB0aGVcbiAgICAgIC8vIHByb3RvdHlwZSBzZXQgdG8gYHRhcmdldGAgaW5zdGVhZCBvZiB1c2luZyBgdGFyZ2V0YCBkaXJlY3RseS5cbiAgICAgIC8vIE90aGVyd2lzZSB3ZSBjYW5ub3QgcmV0dXJuIGEgY3VzdG9tIG9iamVjdCBmb3IgQVBJcyB0aGF0XG4gICAgICAvLyBhcmUgZGVjbGFyZWQgcmVhZC1vbmx5IGFuZCBub24tY29uZmlndXJhYmxlLCBzdWNoIGFzIGBjaHJvbWUuZGV2dG9vbHNgLlxuICAgICAgLy9cbiAgICAgIC8vIFRoZSBwcm94eSBoYW5kbGVycyB0aGVtc2VsdmVzIHdpbGwgc3RpbGwgdXNlIHRoZSBvcmlnaW5hbCBgdGFyZ2V0YFxuICAgICAgLy8gaW5zdGVhZCBvZiB0aGUgYHByb3h5VGFyZ2V0YCwgc28gdGhhdCB0aGUgbWV0aG9kcyBhbmQgcHJvcGVydGllcyBhcmVcbiAgICAgIC8vIGRlcmVmZXJlbmNlZCB2aWEgdGhlIG9yaWdpbmFsIHRhcmdldHMuXG4gICAgICBsZXQgcHJveHlUYXJnZXQgPSBPYmplY3QuY3JlYXRlKHRhcmdldCk7XG4gICAgICByZXR1cm4gbmV3IFByb3h5KHByb3h5VGFyZ2V0LCBoYW5kbGVycyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBzZXQgb2Ygd3JhcHBlciBmdW5jdGlvbnMgZm9yIGFuIGV2ZW50IG9iamVjdCwgd2hpY2ggaGFuZGxlc1xuICAgICAqIHdyYXBwaW5nIG9mIGxpc3RlbmVyIGZ1bmN0aW9ucyB0aGF0IHRob3NlIG1lc3NhZ2VzIGFyZSBwYXNzZWQuXG4gICAgICpcbiAgICAgKiBBIHNpbmdsZSB3cmFwcGVyIGlzIGNyZWF0ZWQgZm9yIGVhY2ggbGlzdGVuZXIgZnVuY3Rpb24sIGFuZCBzdG9yZWQgaW4gYVxuICAgICAqIG1hcC4gU3Vic2VxdWVudCBjYWxscyB0byBgYWRkTGlzdGVuZXJgLCBgaGFzTGlzdGVuZXJgLCBvciBgcmVtb3ZlTGlzdGVuZXJgXG4gICAgICogcmV0cmlldmUgdGhlIG9yaWdpbmFsIHdyYXBwZXIsIHNvIHRoYXQgIGF0dGVtcHRzIHRvIHJlbW92ZSBhXG4gICAgICogcHJldmlvdXNseS1hZGRlZCBsaXN0ZW5lciB3b3JrIGFzIGV4cGVjdGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtEZWZhdWx0V2Vha01hcDxmdW5jdGlvbiwgZnVuY3Rpb24+fSB3cmFwcGVyTWFwXG4gICAgICogICAgICAgIEEgRGVmYXVsdFdlYWtNYXAgb2JqZWN0IHdoaWNoIHdpbGwgY3JlYXRlIHRoZSBhcHByb3ByaWF0ZSB3cmFwcGVyXG4gICAgICogICAgICAgIGZvciBhIGdpdmVuIGxpc3RlbmVyIGZ1bmN0aW9uIHdoZW4gb25lIGRvZXMgbm90IGV4aXN0LCBhbmQgcmV0cmlldmVcbiAgICAgKiAgICAgICAgYW4gZXhpc3Rpbmcgb25lIHdoZW4gaXQgZG9lcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9XG4gICAgICovXG4gICAgY29uc3Qgd3JhcEV2ZW50ID0gd3JhcHBlck1hcCA9PiAoe1xuICAgICAgYWRkTGlzdGVuZXIodGFyZ2V0LCBsaXN0ZW5lciwgLi4uYXJncykge1xuICAgICAgICB0YXJnZXQuYWRkTGlzdGVuZXIod3JhcHBlck1hcC5nZXQobGlzdGVuZXIpLCAuLi5hcmdzKTtcbiAgICAgIH0sXG5cbiAgICAgIGhhc0xpc3RlbmVyKHRhcmdldCwgbGlzdGVuZXIpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldC5oYXNMaXN0ZW5lcih3cmFwcGVyTWFwLmdldChsaXN0ZW5lcikpO1xuICAgICAgfSxcblxuICAgICAgcmVtb3ZlTGlzdGVuZXIodGFyZ2V0LCBsaXN0ZW5lcikge1xuICAgICAgICB0YXJnZXQucmVtb3ZlTGlzdGVuZXIod3JhcHBlck1hcC5nZXQobGlzdGVuZXIpKTtcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCBvblJlcXVlc3RGaW5pc2hlZFdyYXBwZXJzID0gbmV3IERlZmF1bHRXZWFrTWFwKGxpc3RlbmVyID0+IHtcbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gbGlzdGVuZXI7XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogV3JhcHMgYW4gb25SZXF1ZXN0RmluaXNoZWQgbGlzdGVuZXIgZnVuY3Rpb24gc28gdGhhdCBpdCB3aWxsIHJldHVybiBhXG4gICAgICAgKiBgZ2V0Q29udGVudCgpYCBwcm9wZXJ0eSB3aGljaCByZXR1cm5zIGEgYFByb21pc2VgIHJhdGhlciB0aGFuIHVzaW5nIGFcbiAgICAgICAqIGNhbGxiYWNrIEFQSS5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVxXG4gICAgICAgKiAgICAgICAgVGhlIEhBUiBlbnRyeSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBuZXR3b3JrIHJlcXVlc3QuXG4gICAgICAgKi9cbiAgICAgIHJldHVybiBmdW5jdGlvbiBvblJlcXVlc3RGaW5pc2hlZChyZXEpIHtcbiAgICAgICAgY29uc3Qgd3JhcHBlZFJlcSA9IHdyYXBPYmplY3QocmVxLCB7fSAvKiB3cmFwcGVycyAqLywge1xuICAgICAgICAgIGdldENvbnRlbnQ6IHtcbiAgICAgICAgICAgIG1pbkFyZ3M6IDAsXG4gICAgICAgICAgICBtYXhBcmdzOiAwLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICBsaXN0ZW5lcih3cmFwcGVkUmVxKTtcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICAvLyBLZWVwIHRyYWNrIGlmIHRoZSBkZXByZWNhdGlvbiB3YXJuaW5nIGhhcyBiZWVuIGxvZ2dlZCBhdCBsZWFzdCBvbmNlLlxuICAgIGxldCBsb2dnZWRTZW5kUmVzcG9uc2VEZXByZWNhdGlvbldhcm5pbmcgPSBmYWxzZTtcblxuICAgIGNvbnN0IG9uTWVzc2FnZVdyYXBwZXJzID0gbmV3IERlZmF1bHRXZWFrTWFwKGxpc3RlbmVyID0+IHtcbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gbGlzdGVuZXI7XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogV3JhcHMgYSBtZXNzYWdlIGxpc3RlbmVyIGZ1bmN0aW9uIHNvIHRoYXQgaXQgbWF5IHNlbmQgcmVzcG9uc2VzIGJhc2VkIG9uXG4gICAgICAgKiBpdHMgcmV0dXJuIHZhbHVlLCByYXRoZXIgdGhhbiBieSByZXR1cm5pbmcgYSBzZW50aW5lbCB2YWx1ZSBhbmQgY2FsbGluZyBhXG4gICAgICAgKiBjYWxsYmFjay4gSWYgdGhlIGxpc3RlbmVyIGZ1bmN0aW9uIHJldHVybnMgYSBQcm9taXNlLCB0aGUgcmVzcG9uc2UgaXNcbiAgICAgICAqIHNlbnQgd2hlbiB0aGUgcHJvbWlzZSBlaXRoZXIgcmVzb2x2ZXMgb3IgcmVqZWN0cy5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0geyp9IG1lc3NhZ2VcbiAgICAgICAqICAgICAgICBUaGUgbWVzc2FnZSBzZW50IGJ5IHRoZSBvdGhlciBlbmQgb2YgdGhlIGNoYW5uZWwuXG4gICAgICAgKiBAcGFyYW0ge29iamVjdH0gc2VuZGVyXG4gICAgICAgKiAgICAgICAgRGV0YWlscyBhYm91dCB0aGUgc2VuZGVyIG9mIHRoZSBtZXNzYWdlLlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbigqKX0gc2VuZFJlc3BvbnNlXG4gICAgICAgKiAgICAgICAgQSBjYWxsYmFjayB3aGljaCwgd2hlbiBjYWxsZWQgd2l0aCBhbiBhcmJpdHJhcnkgYXJndW1lbnQsIHNlbmRzXG4gICAgICAgKiAgICAgICAgdGhhdCB2YWx1ZSBhcyBhIHJlc3BvbnNlLlxuICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgKiAgICAgICAgVHJ1ZSBpZiB0aGUgd3JhcHBlZCBsaXN0ZW5lciByZXR1cm5lZCBhIFByb21pc2UsIHdoaWNoIHdpbGwgbGF0ZXJcbiAgICAgICAqICAgICAgICB5aWVsZCBhIHJlc3BvbnNlLiBGYWxzZSBvdGhlcndpc2UuXG4gICAgICAgKi9cbiAgICAgIHJldHVybiBmdW5jdGlvbiBvbk1lc3NhZ2UobWVzc2FnZSwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcbiAgICAgICAgbGV0IGRpZENhbGxTZW5kUmVzcG9uc2UgPSBmYWxzZTtcblxuICAgICAgICBsZXQgd3JhcHBlZFNlbmRSZXNwb25zZTtcbiAgICAgICAgbGV0IHNlbmRSZXNwb25zZVByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICB3cmFwcGVkU2VuZFJlc3BvbnNlID0gZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGlmICghbG9nZ2VkU2VuZFJlc3BvbnNlRGVwcmVjYXRpb25XYXJuaW5nKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUud2FybihTRU5EX1JFU1BPTlNFX0RFUFJFQ0FUSU9OX1dBUk5JTkcsIG5ldyBFcnJvcigpLnN0YWNrKTtcbiAgICAgICAgICAgICAgbG9nZ2VkU2VuZFJlc3BvbnNlRGVwcmVjYXRpb25XYXJuaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRpZENhbGxTZW5kUmVzcG9uc2UgPSB0cnVlO1xuICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IHJlc3VsdDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXN1bHQgPSBsaXN0ZW5lcihtZXNzYWdlLCBzZW5kZXIsIHdyYXBwZWRTZW5kUmVzcG9uc2UpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICByZXN1bHQgPSBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaXNSZXN1bHRUaGVuYWJsZSA9IHJlc3VsdCAhPT0gdHJ1ZSAmJiBpc1RoZW5hYmxlKHJlc3VsdCk7XG5cbiAgICAgICAgLy8gSWYgdGhlIGxpc3RlbmVyIGRpZG4ndCByZXR1cm5lZCB0cnVlIG9yIGEgUHJvbWlzZSwgb3IgY2FsbGVkXG4gICAgICAgIC8vIHdyYXBwZWRTZW5kUmVzcG9uc2Ugc3luY2hyb25vdXNseSwgd2UgY2FuIGV4aXQgZWFybGllclxuICAgICAgICAvLyBiZWNhdXNlIHRoZXJlIHdpbGwgYmUgbm8gcmVzcG9uc2Ugc2VudCBmcm9tIHRoaXMgbGlzdGVuZXIuXG4gICAgICAgIGlmIChyZXN1bHQgIT09IHRydWUgJiYgIWlzUmVzdWx0VGhlbmFibGUgJiYgIWRpZENhbGxTZW5kUmVzcG9uc2UpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBIHNtYWxsIGhlbHBlciB0byBzZW5kIHRoZSBtZXNzYWdlIGlmIHRoZSBwcm9taXNlIHJlc29sdmVzXG4gICAgICAgIC8vIGFuZCBhbiBlcnJvciBpZiB0aGUgcHJvbWlzZSByZWplY3RzIChhIHdyYXBwZWQgc2VuZE1lc3NhZ2UgaGFzXG4gICAgICAgIC8vIHRvIHRyYW5zbGF0ZSB0aGUgbWVzc2FnZSBpbnRvIGEgcmVzb2x2ZWQgcHJvbWlzZSBvciBhIHJlamVjdGVkXG4gICAgICAgIC8vIHByb21pc2UpLlxuICAgICAgICBjb25zdCBzZW5kUHJvbWlzZWRSZXN1bHQgPSAocHJvbWlzZSkgPT4ge1xuICAgICAgICAgIHByb21pc2UudGhlbihtc2cgPT4ge1xuICAgICAgICAgICAgLy8gc2VuZCB0aGUgbWVzc2FnZSB2YWx1ZS5cbiAgICAgICAgICAgIHNlbmRSZXNwb25zZShtc2cpO1xuICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIC8vIFNlbmQgYSBKU09OIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBlcnJvciBpZiB0aGUgcmVqZWN0ZWQgdmFsdWVcbiAgICAgICAgICAgIC8vIGlzIGFuIGluc3RhbmNlIG9mIGVycm9yLCBvciB0aGUgb2JqZWN0IGl0c2VsZiBvdGhlcndpc2UuXG4gICAgICAgICAgICBsZXQgbWVzc2FnZTtcbiAgICAgICAgICAgIGlmIChlcnJvciAmJiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciB8fFxuICAgICAgICAgICAgICAgIHR5cGVvZiBlcnJvci5tZXNzYWdlID09PSBcInN0cmluZ1wiKSkge1xuICAgICAgICAgICAgICBtZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG1lc3NhZ2UgPSBcIkFuIHVuZXhwZWN0ZWQgZXJyb3Igb2NjdXJyZWRcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHtcbiAgICAgICAgICAgICAgX19tb3pXZWJFeHRlbnNpb25Qb2x5ZmlsbFJlamVjdF9fOiB0cnVlLFxuICAgICAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIC8vIFByaW50IGFuIGVycm9yIG9uIHRoZSBjb25zb2xlIGlmIHVuYWJsZSB0byBzZW5kIHRoZSByZXNwb25zZS5cbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gc2VuZCBvbk1lc3NhZ2UgcmVqZWN0ZWQgcmVwbHlcIiwgZXJyKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBJZiB0aGUgbGlzdGVuZXIgcmV0dXJuZWQgYSBQcm9taXNlLCBzZW5kIHRoZSByZXNvbHZlZCB2YWx1ZSBhcyBhXG4gICAgICAgIC8vIHJlc3VsdCwgb3RoZXJ3aXNlIHdhaXQgdGhlIHByb21pc2UgcmVsYXRlZCB0byB0aGUgd3JhcHBlZFNlbmRSZXNwb25zZVxuICAgICAgICAvLyBjYWxsYmFjayB0byByZXNvbHZlIGFuZCBzZW5kIGl0IGFzIGEgcmVzcG9uc2UuXG4gICAgICAgIGlmIChpc1Jlc3VsdFRoZW5hYmxlKSB7XG4gICAgICAgICAgc2VuZFByb21pc2VkUmVzdWx0KHJlc3VsdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VuZFByb21pc2VkUmVzdWx0KHNlbmRSZXNwb25zZVByb21pc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTGV0IENocm9tZSBrbm93IHRoYXQgdGhlIGxpc3RlbmVyIGlzIHJlcGx5aW5nLlxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICBjb25zdCB3cmFwcGVkU2VuZE1lc3NhZ2VDYWxsYmFjayA9ICh7cmVqZWN0LCByZXNvbHZlfSwgcmVwbHkpID0+IHtcbiAgICAgIGlmIChleHRlbnNpb25BUElzLnJ1bnRpbWUubGFzdEVycm9yKSB7XG4gICAgICAgIC8vIERldGVjdCB3aGVuIG5vbmUgb2YgdGhlIGxpc3RlbmVycyByZXBsaWVkIHRvIHRoZSBzZW5kTWVzc2FnZSBjYWxsIGFuZCByZXNvbHZlXG4gICAgICAgIC8vIHRoZSBwcm9taXNlIHRvIHVuZGVmaW5lZCBhcyBpbiBGaXJlZm94LlxuICAgICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvd2ViZXh0ZW5zaW9uLXBvbHlmaWxsL2lzc3Vlcy8xMzBcbiAgICAgICAgaWYgKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZSA9PT0gQ0hST01FX1NFTkRfTUVTU0FHRV9DQUxMQkFDS19OT19SRVNQT05TRV9NRVNTQUdFKSB7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvci5tZXNzYWdlKSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocmVwbHkgJiYgcmVwbHkuX19tb3pXZWJFeHRlbnNpb25Qb2x5ZmlsbFJlamVjdF9fKSB7XG4gICAgICAgIC8vIENvbnZlcnQgYmFjayB0aGUgSlNPTiByZXByZXNlbnRhdGlvbiBvZiB0aGUgZXJyb3IgaW50b1xuICAgICAgICAvLyBhbiBFcnJvciBpbnN0YW5jZS5cbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihyZXBseS5tZXNzYWdlKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKHJlcGx5KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgd3JhcHBlZFNlbmRNZXNzYWdlID0gKG5hbWUsIG1ldGFkYXRhLCBhcGlOYW1lc3BhY2VPYmosIC4uLmFyZ3MpID0+IHtcbiAgICAgIGlmIChhcmdzLmxlbmd0aCA8IG1ldGFkYXRhLm1pbkFyZ3MpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhdCBsZWFzdCAke21ldGFkYXRhLm1pbkFyZ3N9ICR7cGx1cmFsaXplQXJndW1lbnRzKG1ldGFkYXRhLm1pbkFyZ3MpfSBmb3IgJHtuYW1lfSgpLCBnb3QgJHthcmdzLmxlbmd0aH1gKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGFyZ3MubGVuZ3RoID4gbWV0YWRhdGEubWF4QXJncykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IG1vc3QgJHttZXRhZGF0YS5tYXhBcmdzfSAke3BsdXJhbGl6ZUFyZ3VtZW50cyhtZXRhZGF0YS5tYXhBcmdzKX0gZm9yICR7bmFtZX0oKSwgZ290ICR7YXJncy5sZW5ndGh9YCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHdyYXBwZWRDYiA9IHdyYXBwZWRTZW5kTWVzc2FnZUNhbGxiYWNrLmJpbmQobnVsbCwge3Jlc29sdmUsIHJlamVjdH0pO1xuICAgICAgICBhcmdzLnB1c2god3JhcHBlZENiKTtcbiAgICAgICAgYXBpTmFtZXNwYWNlT2JqLnNlbmRNZXNzYWdlKC4uLmFyZ3MpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IHN0YXRpY1dyYXBwZXJzID0ge1xuICAgICAgZGV2dG9vbHM6IHtcbiAgICAgICAgbmV0d29yazoge1xuICAgICAgICAgIG9uUmVxdWVzdEZpbmlzaGVkOiB3cmFwRXZlbnQob25SZXF1ZXN0RmluaXNoZWRXcmFwcGVycyksXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcnVudGltZToge1xuICAgICAgICBvbk1lc3NhZ2U6IHdyYXBFdmVudChvbk1lc3NhZ2VXcmFwcGVycyksXG4gICAgICAgIG9uTWVzc2FnZUV4dGVybmFsOiB3cmFwRXZlbnQob25NZXNzYWdlV3JhcHBlcnMpLFxuICAgICAgICBzZW5kTWVzc2FnZTogd3JhcHBlZFNlbmRNZXNzYWdlLmJpbmQobnVsbCwgXCJzZW5kTWVzc2FnZVwiLCB7bWluQXJnczogMSwgbWF4QXJnczogM30pLFxuICAgICAgfSxcbiAgICAgIHRhYnM6IHtcbiAgICAgICAgc2VuZE1lc3NhZ2U6IHdyYXBwZWRTZW5kTWVzc2FnZS5iaW5kKG51bGwsIFwic2VuZE1lc3NhZ2VcIiwge21pbkFyZ3M6IDIsIG1heEFyZ3M6IDN9KSxcbiAgICAgIH0sXG4gICAgfTtcbiAgICBjb25zdCBzZXR0aW5nTWV0YWRhdGEgPSB7XG4gICAgICBjbGVhcjoge21pbkFyZ3M6IDEsIG1heEFyZ3M6IDF9LFxuICAgICAgZ2V0OiB7bWluQXJnczogMSwgbWF4QXJnczogMX0sXG4gICAgICBzZXQ6IHttaW5BcmdzOiAxLCBtYXhBcmdzOiAxfSxcbiAgICB9O1xuICAgIGFwaU1ldGFkYXRhLnByaXZhY3kgPSB7XG4gICAgICBuZXR3b3JrOiB7XCIqXCI6IHNldHRpbmdNZXRhZGF0YX0sXG4gICAgICBzZXJ2aWNlczoge1wiKlwiOiBzZXR0aW5nTWV0YWRhdGF9LFxuICAgICAgd2Vic2l0ZXM6IHtcIipcIjogc2V0dGluZ01ldGFkYXRhfSxcbiAgICB9O1xuXG4gICAgcmV0dXJuIHdyYXBPYmplY3QoZXh0ZW5zaW9uQVBJcywgc3RhdGljV3JhcHBlcnMsIGFwaU1ldGFkYXRhKTtcbiAgfTtcblxuICAvLyBUaGUgYnVpbGQgcHJvY2VzcyBhZGRzIGEgVU1EIHdyYXBwZXIgYXJvdW5kIHRoaXMgZmlsZSwgd2hpY2ggbWFrZXMgdGhlXG4gIC8vIGBtb2R1bGVgIHZhcmlhYmxlIGF2YWlsYWJsZS5cbiAgbW9kdWxlLmV4cG9ydHMgPSB3cmFwQVBJcyhjaHJvbWUpO1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxUaGlzLmJyb3dzZXI7XG59XG4iLCJleHBvcnRzLmludGVyb3BEZWZhdWx0ID0gZnVuY3Rpb24gKGEpIHtcbiAgcmV0dXJuIGEgJiYgYS5fX2VzTW9kdWxlID8gYSA6IHtkZWZhdWx0OiBhfTtcbn07XG5cbmV4cG9ydHMuZGVmaW5lSW50ZXJvcEZsYWcgPSBmdW5jdGlvbiAoYSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYSwgJ19fZXNNb2R1bGUnLCB7dmFsdWU6IHRydWV9KTtcbn07XG5cbmV4cG9ydHMuZXhwb3J0QWxsID0gZnVuY3Rpb24gKHNvdXJjZSwgZGVzdCkge1xuICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIGlmIChrZXkgPT09ICdkZWZhdWx0JyB8fCBrZXkgPT09ICdfX2VzTW9kdWxlJyB8fCBkZXN0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZGVzdCwga2V5LCB7XG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2Vba2V5XTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBkZXN0O1xufTtcblxuZXhwb3J0cy5leHBvcnQgPSBmdW5jdGlvbiAoZGVzdCwgZGVzdE5hbWUsIGdldCkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZGVzdCwgZGVzdE5hbWUsIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZ2V0LFxuICB9KTtcbn07XG4iXSwibmFtZXMiOlsiZ2xvYmFsVGhpcyIsImNocm9tZSIsInJ1bnRpbWUiLCJpZCIsIkVycm9yIiwiYnJvd3NlciIsIk9iamVjdCIsImdldFByb3RvdHlwZU9mIiwicHJvdG90eXBlIiwiQ0hST01FX1NFTkRfTUVTU0FHRV9DQUxMQkFDS19OT19SRVNQT05TRV9NRVNTQUdFIiwiU0VORF9SRVNQT05TRV9ERVBSRUNBVElPTl9XQVJOSU5HIiwid3JhcEFQSXMiLCJleHRlbnNpb25BUElzIiwiYXBpTWV0YWRhdGEiLCJrZXlzIiwibGVuZ3RoIiwiRGVmYXVsdFdlYWtNYXAiLCJXZWFrTWFwIiwiY29uc3RydWN0b3IiLCJjcmVhdGVJdGVtIiwiaXRlbXMiLCJ1bmRlZmluZWQiLCJnZXQiLCJrZXkiLCJoYXMiLCJzZXQiLCJpc1RoZW5hYmxlIiwidmFsdWUiLCJ0aGVuIiwibWFrZUNhbGxiYWNrIiwicHJvbWlzZSIsIm1ldGFkYXRhIiwiY2FsbGJhY2tBcmdzIiwibGFzdEVycm9yIiwicmVqZWN0IiwibWVzc2FnZSIsInNpbmdsZUNhbGxiYWNrQXJnIiwicmVzb2x2ZSIsInBsdXJhbGl6ZUFyZ3VtZW50cyIsIm51bUFyZ3MiLCJ3cmFwQXN5bmNGdW5jdGlvbiIsIm5hbWUiLCJhc3luY0Z1bmN0aW9uV3JhcHBlciIsInRhcmdldCIsImFyZ3MiLCJtaW5BcmdzIiwibWF4QXJncyIsIlByb21pc2UiLCJmYWxsYmFja1RvTm9DYWxsYmFjayIsImNiRXJyb3IiLCJjb25zb2xlIiwid2FybiIsIm5vQ2FsbGJhY2siLCJ3cmFwTWV0aG9kIiwibWV0aG9kIiwid3JhcHBlciIsIlByb3h5IiwiYXBwbHkiLCJ0YXJnZXRNZXRob2QiLCJ0aGlzT2JqIiwiY2FsbCIsImhhc093blByb3BlcnR5IiwiRnVuY3Rpb24iLCJiaW5kIiwid3JhcE9iamVjdCIsIndyYXBwZXJzIiwiY2FjaGUiLCJjcmVhdGUiLCJoYW5kbGVycyIsInByb3h5VGFyZ2V0IiwicHJvcCIsInJlY2VpdmVyIiwiZGVmaW5lUHJvcGVydHkiLCJjb25maWd1cmFibGUiLCJlbnVtZXJhYmxlIiwiZGVzYyIsIlJlZmxlY3QiLCJkZWxldGVQcm9wZXJ0eSIsIndyYXBFdmVudCIsIndyYXBwZXJNYXAiLCJhZGRMaXN0ZW5lciIsImxpc3RlbmVyIiwiaGFzTGlzdGVuZXIiLCJyZW1vdmVMaXN0ZW5lciIsIm9uUmVxdWVzdEZpbmlzaGVkV3JhcHBlcnMiLCJvblJlcXVlc3RGaW5pc2hlZCIsInJlcSIsIndyYXBwZWRSZXEiLCJnZXRDb250ZW50IiwibG9nZ2VkU2VuZFJlc3BvbnNlRGVwcmVjYXRpb25XYXJuaW5nIiwib25NZXNzYWdlV3JhcHBlcnMiLCJvbk1lc3NhZ2UiLCJzZW5kZXIiLCJzZW5kUmVzcG9uc2UiLCJkaWRDYWxsU2VuZFJlc3BvbnNlIiwid3JhcHBlZFNlbmRSZXNwb25zZSIsInNlbmRSZXNwb25zZVByb21pc2UiLCJyZXNwb25zZSIsInN0YWNrIiwicmVzdWx0IiwiZXJyIiwiaXNSZXN1bHRUaGVuYWJsZSIsInNlbmRQcm9taXNlZFJlc3VsdCIsIm1zZyIsImVycm9yIiwiX19tb3pXZWJFeHRlbnNpb25Qb2x5ZmlsbFJlamVjdF9fIiwiY2F0Y2giLCJ3cmFwcGVkU2VuZE1lc3NhZ2VDYWxsYmFjayIsInJlcGx5Iiwid3JhcHBlZFNlbmRNZXNzYWdlIiwiYXBpTmFtZXNwYWNlT2JqIiwid3JhcHBlZENiIiwicHVzaCIsInNlbmRNZXNzYWdlIiwic3RhdGljV3JhcHBlcnMiLCJkZXZ0b29scyIsIm5ldHdvcmsiLCJvbk1lc3NhZ2VFeHRlcm5hbCIsInRhYnMiLCJzZXR0aW5nTWV0YWRhdGEiLCJjbGVhciIsInByaXZhY3kiLCJzZXJ2aWNlcyIsIndlYnNpdGVzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5mNmQ3MzZiNy5qcy5tYXAifQ==
