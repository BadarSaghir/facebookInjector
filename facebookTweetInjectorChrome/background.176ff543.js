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
})({"2aATt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
// import Browser from "webextension-polyfill";
var _webextensionPolyfill = require("webextension-polyfill");
var _webextensionPolyfillDefault = parcelHelpers.interopDefault(_webextensionPolyfill);
console.log("background.ts");
let previousUrl = "https://web.facebook.com";
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
            previousUrl = details.url;
            (0, _webextensionPolyfillDefault.default).tabs.reload(details.tabId);
        }
    }
});
// import { IRecentweet } from "./content";
console.log("background");
// Browser.tabs.sendMessage(tabId, "get-ids").then(results => {
//     processResults(results);
//   });
// Browser.runtime.onMessage.addListener(async(message, sender) => {
//     const { type, data } = message;
//   	let res = await axios.get<IRecentweet>(message.url,{
// 					timeout:30000,
// 			})
//     console.log(data,res)
//     return res
//   });
chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
    let is_async = true;
    console.log("getting req");
    var url = request.url;
    fetch(url).then((res)=>{
        console.log(res);
        return res.json();
    }).then((json)=>{
        console.log("getting json :", json);
        sendResponse(json);
    }).catch((e)=>{
        console.log("error due to ", e);
    });
    console.log("finish req");
    return is_async;
});

},{"webextension-polyfill":"6iF6D","@parcel/transformer-js/src/esmodule-helpers.js":"eqUf2"}],"6iF6D":[function(require,module,exports) {
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

},{}],"eqUf2":[function(require,module,exports) {
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

},{}]},["2aATt"], "2aATt", "parcelRequire94c2")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TyxJQUFJLENBQUM7Q0FDYixDQUFDO0FBRUYsT0FBTyxDQUFDLE1BQU0sR0FBRyxTQUFVLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFO0lBQzlDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtRQUNwQyxVQUFVLEVBQUUsSUFBSTtRQUNoQixHQUFHLEVBQUUsR0FBRztLQUNULENBQUMsQ0FBQztDQUNKLENBQUMiLCJzb3VyY2VzIjpbInNvdXJjZV9jaHJvbWUvYmFja2dyb3VuZC50cyIsIm5vZGVfbW9kdWxlcy93ZWJleHRlbnNpb24tcG9seWZpbGwvZGlzdC9icm93c2VyLXBvbHlmaWxsLmpzIiwibm9kZV9tb2R1bGVzL0BwYXJjZWwvdHJhbnNmb3JtZXItanMvc3JjL2VzbW9kdWxlLWhlbHBlcnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuLy8gaW1wb3J0IEJyb3dzZXIgZnJvbSBcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiO1xuaW1wb3J0IGJyb3dzZXIgZnJvbSAnd2ViZXh0ZW5zaW9uLXBvbHlmaWxsJztcbmNvbnNvbGUubG9nKCdiYWNrZ3JvdW5kLnRzJyk7XG5cblxubGV0IHByZXZpb3VzVXJsOnN0cmluZz1cImh0dHBzOi8vd2ViLmZhY2Vib29rLmNvbVwiO1x0XG4vL2V4ZWN1dGUgY29udGVudCBzY3JpcHQgd2hlbiB1cmwgaXMgZXF1YWwgdG8gZmFjZWJvb2suY29tIGluIFBXQSBtb2RlXG4gY29uc3Qgb25IaXN0b3J5U3RhdGVVcGRhdGVkTGlzdGVuZXI9IGJyb3dzZXIud2ViTmF2aWdhdGlvbi5vbkhpc3RvcnlTdGF0ZVVwZGF0ZWQuYWRkTGlzdGVuZXIoKGRldGFpbHMpID0+IHtcbiAgICAvLyBpZiAoZGV0YWlscy51cmwuaW5jbHVkZXMoJ2ZhY2Vib29rLmNvbScpKSB7XG4gICAgLy8gICAgIGJyb3dzZXIudGFicy5leGVjdXRlU2NyaXB0KGRldGFpbHMudGFiSWQsIHtcbiAgICAvLyAgICAgICAgIGZpbGU6ICdjb250ZW50LmpzJ1xuICAgIC8vICAgICB9KTtcbiAgICAvLyB9XG4gICAgY29uc3QgcmUgPS8oaHR0cHM6XFwvXFwvLipmYWNlYm9vay5jb21cXC9ncm91cHNcXC90cmVhdGVhcmx5XFwvPy4qKXwoaHR0cHM6XFwvXFwvLipmYWNlYm9vay5jb21cXC9ncm91cHNcXC85ODQxNjU5MTIxOTExNDNcXC8/LiopfCgoaHR0cHM6XFwvXFwvLipmYWNlYm9vay5jb21cXC8/KShob21lLnBocCk/KD86XFxzfCQpKS9pZ1xuICAgIGNvbnNvbGUubG9nKGRldGFpbHMudXJsLm1hdGNoKHJlKSk7XG5cbiAgICBpZiAoZGV0YWlscy51cmwubWF0Y2gocmUpKSB7XG4gICAgICAgIFxuICAgIGNvbnNvbGUubG9nKFwidXJsIGNoYW5nZWRcIixkZXRhaWxzLnVybCk7XG4gICAgLy8gYnJvd3Nlci5ydW50aW1lLnJlbG9hZCgpXG4gIC8vIHJlbG9hZCB0aGUgY3VycmVudCB0YWIgd2l0aG91dCBpbmZpbml0ZSBsb29wIG9mIHJlbG9hZGluZ1xuICBpZihkZXRhaWxzLnVybCE9cHJldmlvdXNVcmwpe1xuICAgIGNvbnNvbGUubG9nKGRldGFpbHMscHJldmlvdXNVcmwpXG4gICAgcHJldmlvdXNVcmw9ZGV0YWlscy51cmw7XG4gICAgYnJvd3Nlci50YWJzLnJlbG9hZChkZXRhaWxzLnRhYklkKTtcbiAgIFxuICB9XG4gIFxuICAgIH1cbn1cbik7XG5cblxuLy8gaW1wb3J0IHsgSVJlY2VudHdlZXQgfSBmcm9tIFwiLi9jb250ZW50XCI7XG5jb25zb2xlLmxvZygnYmFja2dyb3VuZCcpXG4vLyBCcm93c2VyLnRhYnMuc2VuZE1lc3NhZ2UodGFiSWQsIFwiZ2V0LWlkc1wiKS50aGVuKHJlc3VsdHMgPT4ge1xuLy8gICAgIHByb2Nlc3NSZXN1bHRzKHJlc3VsdHMpO1xuLy8gICB9KTtcblxuLy8gQnJvd3Nlci5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihhc3luYyhtZXNzYWdlLCBzZW5kZXIpID0+IHtcbi8vICAgICBjb25zdCB7IHR5cGUsIGRhdGEgfSA9IG1lc3NhZ2U7XG4vLyAgIFx0bGV0IHJlcyA9IGF3YWl0IGF4aW9zLmdldDxJUmVjZW50d2VldD4obWVzc2FnZS51cmwse1xuLy8gXHRcdFx0XHRcdHRpbWVvdXQ6MzAwMDAsXG4vLyBcdFx0XHR9KVxuLy8gICAgIGNvbnNvbGUubG9nKGRhdGEscmVzKVxuLy8gICAgIHJldHVybiByZXNcbi8vICAgfSk7XG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoIChyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkgPT57ICAgXG5sZXQgaXNfYXN5bmM9dHJ1ZTtcbiAgY29uc29sZS5sb2coXCJnZXR0aW5nIHJlcVwiKVxuICAgICAgICB2YXIgdXJsID0gcmVxdWVzdC51cmw7XG4gICAgICAgICBmZXRjaCh1cmwpLnRoZW4oKHJlcyk9PntcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIHJldHVybiAgIHJlcy5qc29uKClcbiAgICAgIFxuICAgICAgfVxuXG4gICAgICAgICBcbiAgICAgICAgICkudGhlbigoanNvbik9PnsgXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZ2V0dGluZyBqc29uIDonLGpzb24pXG4gICAgICAgICAgICBzZW5kUmVzcG9uc2UoanNvbil9KS5jYXRjaCgoZSk9PntcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvciBkdWUgdG8gJyxlKVxuICAgICAgICAgfSlcblxuICAgICAgICAgY29uc29sZS5sb2coXCJmaW5pc2ggcmVxXCIpXG4gICByZXR1cm4gaXNfYXN5bmNcbiAgIFxuICAgIFxufSk7XG4iLCIvKiB3ZWJleHRlbnNpb24tcG9seWZpbGwgLSB2MC45LjAgLSBGcmkgTWFyIDI1IDIwMjIgMTc6MDA6MjMgKi9cbi8qIC0qLSBNb2RlOiBpbmRlbnQtdGFicy1tb2RlOiBuaWw7IGpzLWluZGVudC1sZXZlbDogMiAtKi0gKi9cbi8qIHZpbTogc2V0IHN0cz0yIHN3PTIgZXQgdHc9ODA6ICovXG4vKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmlmICh0eXBlb2YgZ2xvYmFsVGhpcyAhPSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjaHJvbWUgIT0gXCJvYmplY3RcIiB8fCAhY2hyb21lIHx8ICFjaHJvbWUucnVudGltZSB8fCAhY2hyb21lLnJ1bnRpbWUuaWQpIHtcbiAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBzY3JpcHQgc2hvdWxkIG9ubHkgYmUgbG9hZGVkIGluIGEgYnJvd3NlciBleHRlbnNpb24uXCIpO1xufVxuXG5pZiAodHlwZW9mIGdsb2JhbFRoaXMuYnJvd3NlciA9PT0gXCJ1bmRlZmluZWRcIiB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZ2xvYmFsVGhpcy5icm93c2VyKSAhPT0gT2JqZWN0LnByb3RvdHlwZSkge1xuICBjb25zdCBDSFJPTUVfU0VORF9NRVNTQUdFX0NBTExCQUNLX05PX1JFU1BPTlNFX01FU1NBR0UgPSBcIlRoZSBtZXNzYWdlIHBvcnQgY2xvc2VkIGJlZm9yZSBhIHJlc3BvbnNlIHdhcyByZWNlaXZlZC5cIjtcbiAgY29uc3QgU0VORF9SRVNQT05TRV9ERVBSRUNBVElPTl9XQVJOSU5HID0gXCJSZXR1cm5pbmcgYSBQcm9taXNlIGlzIHRoZSBwcmVmZXJyZWQgd2F5IHRvIHNlbmQgYSByZXBseSBmcm9tIGFuIG9uTWVzc2FnZS9vbk1lc3NhZ2VFeHRlcm5hbCBsaXN0ZW5lciwgYXMgdGhlIHNlbmRSZXNwb25zZSB3aWxsIGJlIHJlbW92ZWQgZnJvbSB0aGUgc3BlY3MgKFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9kb2NzL01vemlsbGEvQWRkLW9ucy9XZWJFeHRlbnNpb25zL0FQSS9ydW50aW1lL29uTWVzc2FnZSlcIjtcblxuICAvLyBXcmFwcGluZyB0aGUgYnVsayBvZiB0aGlzIHBvbHlmaWxsIGluIGEgb25lLXRpbWUtdXNlIGZ1bmN0aW9uIGlzIGEgbWlub3JcbiAgLy8gb3B0aW1pemF0aW9uIGZvciBGaXJlZm94LiBTaW5jZSBTcGlkZXJtb25rZXkgZG9lcyBub3QgZnVsbHkgcGFyc2UgdGhlXG4gIC8vIGNvbnRlbnRzIG9mIGEgZnVuY3Rpb24gdW50aWwgdGhlIGZpcnN0IHRpbWUgaXQncyBjYWxsZWQsIGFuZCBzaW5jZSBpdCB3aWxsXG4gIC8vIG5ldmVyIGFjdHVhbGx5IG5lZWQgdG8gYmUgY2FsbGVkLCB0aGlzIGFsbG93cyB0aGUgcG9seWZpbGwgdG8gYmUgaW5jbHVkZWRcbiAgLy8gaW4gRmlyZWZveCBuZWFybHkgZm9yIGZyZWUuXG4gIGNvbnN0IHdyYXBBUElzID0gZXh0ZW5zaW9uQVBJcyA9PiB7XG4gICAgLy8gTk9URTogYXBpTWV0YWRhdGEgaXMgYXNzb2NpYXRlZCB0byB0aGUgY29udGVudCBvZiB0aGUgYXBpLW1ldGFkYXRhLmpzb24gZmlsZVxuICAgIC8vIGF0IGJ1aWxkIHRpbWUgYnkgcmVwbGFjaW5nIHRoZSBmb2xsb3dpbmcgXCJpbmNsdWRlXCIgd2l0aCB0aGUgY29udGVudCBvZiB0aGVcbiAgICAvLyBKU09OIGZpbGUuXG4gICAgY29uc3QgYXBpTWV0YWRhdGEgPSB7XG4gICAgICBcImFsYXJtc1wiOiB7XG4gICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiY2xlYXJBbGxcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwiYm9va21hcmtzXCI6IHtcbiAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImdldENoaWxkcmVuXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImdldFJlY2VudFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJnZXRTdWJUcmVlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImdldFRyZWVcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgIH0sXG4gICAgICAgIFwibW92ZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgfSxcbiAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwicmVtb3ZlVHJlZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJzZWFyY2hcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwidXBkYXRlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJicm93c2VyQWN0aW9uXCI6IHtcbiAgICAgICAgXCJkaXNhYmxlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgXCJlbmFibGVcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBcImdldEJhZGdlQmFja2dyb3VuZENvbG9yXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImdldEJhZGdlVGV4dFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJnZXRQb3B1cFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJnZXRUaXRsZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJvcGVuUG9wdXBcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgIH0sXG4gICAgICAgIFwic2V0QmFkZ2VCYWNrZ3JvdW5kQ29sb3JcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBcInNldEJhZGdlVGV4dFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIFwic2V0SWNvblwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJzZXRQb3B1cFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIFwic2V0VGl0bGVcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJicm93c2luZ0RhdGFcIjoge1xuICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgfSxcbiAgICAgICAgXCJyZW1vdmVDYWNoZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJyZW1vdmVDb29raWVzXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcInJlbW92ZURvd25sb2Fkc1wiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJyZW1vdmVGb3JtRGF0YVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJyZW1vdmVIaXN0b3J5XCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcInJlbW92ZUxvY2FsU3RvcmFnZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJyZW1vdmVQYXNzd29yZHNcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwicmVtb3ZlUGx1Z2luRGF0YVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJzZXR0aW5nc1wiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwiY29tbWFuZHNcIjoge1xuICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwiY29udGV4dE1lbnVzXCI6IHtcbiAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwicmVtb3ZlQWxsXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICB9LFxuICAgICAgICBcInVwZGF0ZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwiY29va2llc1wiOiB7XG4gICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJnZXRBbGxDb29raWVTdG9yZXNcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgIH0sXG4gICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcInNldFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwiZGV2dG9vbHNcIjoge1xuICAgICAgICBcImluc3BlY3RlZFdpbmRvd1wiOiB7XG4gICAgICAgICAgXCJldmFsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDIsXG4gICAgICAgICAgICBcInNpbmdsZUNhbGxiYWNrQXJnXCI6IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInBhbmVsc1wiOiB7XG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDMsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMyxcbiAgICAgICAgICAgIFwic2luZ2xlQ2FsbGJhY2tBcmdcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJlbGVtZW50c1wiOiB7XG4gICAgICAgICAgICBcImNyZWF0ZVNpZGViYXJQYW5lXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJkb3dubG9hZHNcIjoge1xuICAgICAgICBcImNhbmNlbFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJkb3dubG9hZFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJlcmFzZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJnZXRGaWxlSWNvblwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgfSxcbiAgICAgICAgXCJvcGVuXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgXCJwYXVzZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJyZW1vdmVGaWxlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcInJlc3VtZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJzZWFyY2hcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwic2hvd1wiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcImV4dGVuc2lvblwiOiB7XG4gICAgICAgIFwiaXNBbGxvd2VkRmlsZVNjaGVtZUFjY2Vzc1wiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgfSxcbiAgICAgICAgXCJpc0FsbG93ZWRJbmNvZ25pdG9BY2Nlc3NcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcImhpc3RvcnlcIjoge1xuICAgICAgICBcImFkZFVybFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJkZWxldGVBbGxcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgIH0sXG4gICAgICAgIFwiZGVsZXRlUmFuZ2VcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiZGVsZXRlVXJsXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImdldFZpc2l0c1wiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJzZWFyY2hcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcImkxOG5cIjoge1xuICAgICAgICBcImRldGVjdExhbmd1YWdlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImdldEFjY2VwdExhbmd1YWdlc1wiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwiaWRlbnRpdHlcIjoge1xuICAgICAgICBcImxhdW5jaFdlYkF1dGhGbG93XCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJpZGxlXCI6IHtcbiAgICAgICAgXCJxdWVyeVN0YXRlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJtYW5hZ2VtZW50XCI6IHtcbiAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICB9LFxuICAgICAgICBcImdldFNlbGZcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgIH0sXG4gICAgICAgIFwic2V0RW5hYmxlZFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgfSxcbiAgICAgICAgXCJ1bmluc3RhbGxTZWxmXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJub3RpZmljYXRpb25zXCI6IHtcbiAgICAgICAgXCJjbGVhclwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICB9LFxuICAgICAgICBcImdldFBlcm1pc3Npb25MZXZlbFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgfSxcbiAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcInBhZ2VBY3Rpb25cIjoge1xuICAgICAgICBcImdldFBvcHVwXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImdldFRpdGxlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImhpZGVcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBcInNldEljb25cIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwic2V0UG9wdXBcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBcInNldFRpdGxlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgXCJzaG93XCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwicGVybWlzc2lvbnNcIjoge1xuICAgICAgICBcImNvbnRhaW5zXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgfSxcbiAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwicmVxdWVzdFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwicnVudGltZVwiOiB7XG4gICAgICAgIFwiZ2V0QmFja2dyb3VuZFBhZ2VcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2V0UGxhdGZvcm1JbmZvXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICB9LFxuICAgICAgICBcIm9wZW5PcHRpb25zUGFnZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgfSxcbiAgICAgICAgXCJyZXF1ZXN0VXBkYXRlQ2hlY2tcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgIH0sXG4gICAgICAgIFwic2VuZE1lc3NhZ2VcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAzXG4gICAgICAgIH0sXG4gICAgICAgIFwic2VuZE5hdGl2ZU1lc3NhZ2VcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgIH0sXG4gICAgICAgIFwic2V0VW5pbnN0YWxsVVJMXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJzZXNzaW9uc1wiOiB7XG4gICAgICAgIFwiZ2V0RGV2aWNlc1wiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJnZXRSZWNlbnRseUNsb3NlZFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJyZXN0b3JlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJzdG9yYWdlXCI6IHtcbiAgICAgICAgXCJsb2NhbFwiOiB7XG4gICAgICAgICAgXCJjbGVhclwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEJ5dGVzSW5Vc2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJtYW5hZ2VkXCI6IHtcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEJ5dGVzSW5Vc2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJzeW5jXCI6IHtcbiAgICAgICAgICBcImNsZWFyXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0Qnl0ZXNJblVzZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJ0YWJzXCI6IHtcbiAgICAgICAgXCJjYXB0dXJlVmlzaWJsZVRhYlwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgfSxcbiAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiZGV0ZWN0TGFuZ3VhZ2VcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiZGlzY2FyZFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJkdXBsaWNhdGVcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiZXhlY3V0ZVNjcmlwdFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgfSxcbiAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2V0Q3VycmVudFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgfSxcbiAgICAgICAgXCJnZXRab29tXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImdldFpvb21TZXR0aW5nc1wiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJnb0JhY2tcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ29Gb3J3YXJkXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImhpZ2hsaWdodFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJpbnNlcnRDU1NcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgIH0sXG4gICAgICAgIFwibW92ZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgfSxcbiAgICAgICAgXCJxdWVyeVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJyZWxvYWRcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgIH0sXG4gICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcInJlbW92ZUNTU1wiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgfSxcbiAgICAgICAgXCJzZW5kTWVzc2FnZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDNcbiAgICAgICAgfSxcbiAgICAgICAgXCJzZXRab29tXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICB9LFxuICAgICAgICBcInNldFpvb21TZXR0aW5nc1wiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgfSxcbiAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcInRvcFNpdGVzXCI6IHtcbiAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcIndlYk5hdmlnYXRpb25cIjoge1xuICAgICAgICBcImdldEFsbEZyYW1lc1wiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJnZXRGcmFtZVwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwid2ViUmVxdWVzdFwiOiB7XG4gICAgICAgIFwiaGFuZGxlckJlaGF2aW9yQ2hhbmdlZFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwid2luZG93c1wiOiB7XG4gICAgICAgIFwiY3JlYXRlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICB9LFxuICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgfSxcbiAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2V0Q3VycmVudFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJnZXRMYXN0Rm9jdXNlZFwiOiB7XG4gICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgIH0sXG4gICAgICAgIFwidXBkYXRlXCI6IHtcbiAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChPYmplY3Qua2V5cyhhcGlNZXRhZGF0YSkubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhcGktbWV0YWRhdGEuanNvbiBoYXMgbm90IGJlZW4gaW5jbHVkZWQgaW4gYnJvd3Nlci1wb2x5ZmlsbFwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBIFdlYWtNYXAgc3ViY2xhc3Mgd2hpY2ggY3JlYXRlcyBhbmQgc3RvcmVzIGEgdmFsdWUgZm9yIGFueSBrZXkgd2hpY2ggZG9lc1xuICAgICAqIG5vdCBleGlzdCB3aGVuIGFjY2Vzc2VkLCBidXQgYmVoYXZlcyBleGFjdGx5IGFzIGFuIG9yZGluYXJ5IFdlYWtNYXBcbiAgICAgKiBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjcmVhdGVJdGVtXG4gICAgICogICAgICAgIEEgZnVuY3Rpb24gd2hpY2ggd2lsbCBiZSBjYWxsZWQgaW4gb3JkZXIgdG8gY3JlYXRlIHRoZSB2YWx1ZSBmb3IgYW55XG4gICAgICogICAgICAgIGtleSB3aGljaCBkb2VzIG5vdCBleGlzdCwgdGhlIGZpcnN0IHRpbWUgaXQgaXMgYWNjZXNzZWQuIFRoZVxuICAgICAqICAgICAgICBmdW5jdGlvbiByZWNlaXZlcywgYXMgaXRzIG9ubHkgYXJndW1lbnQsIHRoZSBrZXkgYmVpbmcgY3JlYXRlZC5cbiAgICAgKi9cbiAgICBjbGFzcyBEZWZhdWx0V2Vha01hcCBleHRlbmRzIFdlYWtNYXAge1xuICAgICAgY29uc3RydWN0b3IoY3JlYXRlSXRlbSwgaXRlbXMgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgc3VwZXIoaXRlbXMpO1xuICAgICAgICB0aGlzLmNyZWF0ZUl0ZW0gPSBjcmVhdGVJdGVtO1xuICAgICAgfVxuXG4gICAgICBnZXQoa2V5KSB7XG4gICAgICAgIGlmICghdGhpcy5oYXMoa2V5KSkge1xuICAgICAgICAgIHRoaXMuc2V0KGtleSwgdGhpcy5jcmVhdGVJdGVtKGtleSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN1cGVyLmdldChrZXkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gb2JqZWN0IGlzIGFuIG9iamVjdCB3aXRoIGEgYHRoZW5gIG1ldGhvZCwgYW5kIGNhblxuICAgICAqIHRoZXJlZm9yZSBiZSBhc3N1bWVkIHRvIGJlaGF2ZSBhcyBhIFByb21pc2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB0aGVuYWJsZS5cbiAgICAgKi9cbiAgICBjb25zdCBpc1RoZW5hYmxlID0gdmFsdWUgPT4ge1xuICAgICAgcmV0dXJuIHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gXCJmdW5jdGlvblwiO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuZCByZXR1cm5zIGEgZnVuY3Rpb24gd2hpY2gsIHdoZW4gY2FsbGVkLCB3aWxsIHJlc29sdmUgb3IgcmVqZWN0XG4gICAgICogdGhlIGdpdmVuIHByb21pc2UgYmFzZWQgb24gaG93IGl0IGlzIGNhbGxlZDpcbiAgICAgKlxuICAgICAqIC0gSWYsIHdoZW4gY2FsbGVkLCBgY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yYCBjb250YWlucyBhIG5vbi1udWxsIG9iamVjdCxcbiAgICAgKiAgIHRoZSBwcm9taXNlIGlzIHJlamVjdGVkIHdpdGggdGhhdCB2YWx1ZS5cbiAgICAgKiAtIElmIHRoZSBmdW5jdGlvbiBpcyBjYWxsZWQgd2l0aCBleGFjdGx5IG9uZSBhcmd1bWVudCwgdGhlIHByb21pc2UgaXNcbiAgICAgKiAgIHJlc29sdmVkIHRvIHRoYXQgdmFsdWUuXG4gICAgICogLSBPdGhlcndpc2UsIHRoZSBwcm9taXNlIGlzIHJlc29sdmVkIHRvIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9mIHRoZVxuICAgICAqICAgZnVuY3Rpb24ncyBhcmd1bWVudHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcHJvbWlzZVxuICAgICAqICAgICAgICBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgcmVzb2x1dGlvbiBhbmQgcmVqZWN0aW9uIGZ1bmN0aW9ucyBvZiBhXG4gICAgICogICAgICAgIHByb21pc2UuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gcHJvbWlzZS5yZXNvbHZlXG4gICAgICogICAgICAgIFRoZSBwcm9taXNlJ3MgcmVzb2x1dGlvbiBmdW5jdGlvbi5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcm9taXNlLnJlamVjdFxuICAgICAqICAgICAgICBUaGUgcHJvbWlzZSdzIHJlamVjdGlvbiBmdW5jdGlvbi5cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbWV0YWRhdGFcbiAgICAgKiAgICAgICAgTWV0YWRhdGEgYWJvdXQgdGhlIHdyYXBwZWQgbWV0aG9kIHdoaWNoIGhhcyBjcmVhdGVkIHRoZSBjYWxsYmFjay5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1ldGFkYXRhLnNpbmdsZUNhbGxiYWNrQXJnXG4gICAgICogICAgICAgIFdoZXRoZXIgb3Igbm90IHRoZSBwcm9taXNlIGlzIHJlc29sdmVkIHdpdGggb25seSB0aGUgZmlyc3RcbiAgICAgKiAgICAgICAgYXJndW1lbnQgb2YgdGhlIGNhbGxiYWNrLCBhbHRlcm5hdGl2ZWx5IGFuIGFycmF5IG9mIGFsbCB0aGVcbiAgICAgKiAgICAgICAgY2FsbGJhY2sgYXJndW1lbnRzIGlzIHJlc29sdmVkLiBCeSBkZWZhdWx0LCBpZiB0aGUgY2FsbGJhY2tcbiAgICAgKiAgICAgICAgZnVuY3Rpb24gaXMgaW52b2tlZCB3aXRoIG9ubHkgYSBzaW5nbGUgYXJndW1lbnQsIHRoYXQgd2lsbCBiZVxuICAgICAqICAgICAgICByZXNvbHZlZCB0byB0aGUgcHJvbWlzZSwgd2hpbGUgYWxsIGFyZ3VtZW50cyB3aWxsIGJlIHJlc29sdmVkIGFzXG4gICAgICogICAgICAgIGFuIGFycmF5IGlmIG11bHRpcGxlIGFyZSBnaXZlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAgICAgKiAgICAgICAgVGhlIGdlbmVyYXRlZCBjYWxsYmFjayBmdW5jdGlvbi5cbiAgICAgKi9cbiAgICBjb25zdCBtYWtlQ2FsbGJhY2sgPSAocHJvbWlzZSwgbWV0YWRhdGEpID0+IHtcbiAgICAgIHJldHVybiAoLi4uY2FsbGJhY2tBcmdzKSA9PiB7XG4gICAgICAgIGlmIChleHRlbnNpb25BUElzLnJ1bnRpbWUubGFzdEVycm9yKSB7XG4gICAgICAgICAgcHJvbWlzZS5yZWplY3QobmV3IEVycm9yKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZSkpO1xuICAgICAgICB9IGVsc2UgaWYgKG1ldGFkYXRhLnNpbmdsZUNhbGxiYWNrQXJnIHx8XG4gICAgICAgICAgICAgICAgICAgKGNhbGxiYWNrQXJncy5sZW5ndGggPD0gMSAmJiBtZXRhZGF0YS5zaW5nbGVDYWxsYmFja0FyZyAhPT0gZmFsc2UpKSB7XG4gICAgICAgICAgcHJvbWlzZS5yZXNvbHZlKGNhbGxiYWNrQXJnc1swXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvbWlzZS5yZXNvbHZlKGNhbGxiYWNrQXJncyk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcblxuICAgIGNvbnN0IHBsdXJhbGl6ZUFyZ3VtZW50cyA9IChudW1BcmdzKSA9PiBudW1BcmdzID09IDEgPyBcImFyZ3VtZW50XCIgOiBcImFyZ3VtZW50c1wiO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHdyYXBwZXIgZnVuY3Rpb24gZm9yIGEgbWV0aG9kIHdpdGggdGhlIGdpdmVuIG5hbWUgYW5kIG1ldGFkYXRhLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiAgICAgICAgVGhlIG5hbWUgb2YgdGhlIG1ldGhvZCB3aGljaCBpcyBiZWluZyB3cmFwcGVkLlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtZXRhZGF0YVxuICAgICAqICAgICAgICBNZXRhZGF0YSBhYm91dCB0aGUgbWV0aG9kIGJlaW5nIHdyYXBwZWQuXG4gICAgICogQHBhcmFtIHtpbnRlZ2VyfSBtZXRhZGF0YS5taW5BcmdzXG4gICAgICogICAgICAgIFRoZSBtaW5pbXVtIG51bWJlciBvZiBhcmd1bWVudHMgd2hpY2ggbXVzdCBiZSBwYXNzZWQgdG8gdGhlXG4gICAgICogICAgICAgIGZ1bmN0aW9uLiBJZiBjYWxsZWQgd2l0aCBmZXdlciB0aGFuIHRoaXMgbnVtYmVyIG9mIGFyZ3VtZW50cywgdGhlXG4gICAgICogICAgICAgIHdyYXBwZXIgd2lsbCByYWlzZSBhbiBleGNlcHRpb24uXG4gICAgICogQHBhcmFtIHtpbnRlZ2VyfSBtZXRhZGF0YS5tYXhBcmdzXG4gICAgICogICAgICAgIFRoZSBtYXhpbXVtIG51bWJlciBvZiBhcmd1bWVudHMgd2hpY2ggbWF5IGJlIHBhc3NlZCB0byB0aGVcbiAgICAgKiAgICAgICAgZnVuY3Rpb24uIElmIGNhbGxlZCB3aXRoIG1vcmUgdGhhbiB0aGlzIG51bWJlciBvZiBhcmd1bWVudHMsIHRoZVxuICAgICAqICAgICAgICB3cmFwcGVyIHdpbGwgcmFpc2UgYW4gZXhjZXB0aW9uLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWV0YWRhdGEuc2luZ2xlQ2FsbGJhY2tBcmdcbiAgICAgKiAgICAgICAgV2hldGhlciBvciBub3QgdGhlIHByb21pc2UgaXMgcmVzb2x2ZWQgd2l0aCBvbmx5IHRoZSBmaXJzdFxuICAgICAqICAgICAgICBhcmd1bWVudCBvZiB0aGUgY2FsbGJhY2ssIGFsdGVybmF0aXZlbHkgYW4gYXJyYXkgb2YgYWxsIHRoZVxuICAgICAqICAgICAgICBjYWxsYmFjayBhcmd1bWVudHMgaXMgcmVzb2x2ZWQuIEJ5IGRlZmF1bHQsIGlmIHRoZSBjYWxsYmFja1xuICAgICAqICAgICAgICBmdW5jdGlvbiBpcyBpbnZva2VkIHdpdGggb25seSBhIHNpbmdsZSBhcmd1bWVudCwgdGhhdCB3aWxsIGJlXG4gICAgICogICAgICAgIHJlc29sdmVkIHRvIHRoZSBwcm9taXNlLCB3aGlsZSBhbGwgYXJndW1lbnRzIHdpbGwgYmUgcmVzb2x2ZWQgYXNcbiAgICAgKiAgICAgICAgYW4gYXJyYXkgaWYgbXVsdGlwbGUgYXJlIGdpdmVuLlxuICAgICAqXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9uKG9iamVjdCwgLi4uKil9XG4gICAgICogICAgICAgVGhlIGdlbmVyYXRlZCB3cmFwcGVyIGZ1bmN0aW9uLlxuICAgICAqL1xuICAgIGNvbnN0IHdyYXBBc3luY0Z1bmN0aW9uID0gKG5hbWUsIG1ldGFkYXRhKSA9PiB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gYXN5bmNGdW5jdGlvbldyYXBwZXIodGFyZ2V0LCAuLi5hcmdzKSB7XG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA8IG1ldGFkYXRhLm1pbkFyZ3MpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IGxlYXN0ICR7bWV0YWRhdGEubWluQXJnc30gJHtwbHVyYWxpemVBcmd1bWVudHMobWV0YWRhdGEubWluQXJncyl9IGZvciAke25hbWV9KCksIGdvdCAke2FyZ3MubGVuZ3RofWApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID4gbWV0YWRhdGEubWF4QXJncykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgYXQgbW9zdCAke21ldGFkYXRhLm1heEFyZ3N9ICR7cGx1cmFsaXplQXJndW1lbnRzKG1ldGFkYXRhLm1heEFyZ3MpfSBmb3IgJHtuYW1lfSgpLCBnb3QgJHthcmdzLmxlbmd0aH1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgaWYgKG1ldGFkYXRhLmZhbGxiYWNrVG9Ob0NhbGxiYWNrKSB7XG4gICAgICAgICAgICAvLyBUaGlzIEFQSSBtZXRob2QgaGFzIGN1cnJlbnRseSBubyBjYWxsYmFjayBvbiBDaHJvbWUsIGJ1dCBpdCByZXR1cm4gYSBwcm9taXNlIG9uIEZpcmVmb3gsXG4gICAgICAgICAgICAvLyBhbmQgc28gdGhlIHBvbHlmaWxsIHdpbGwgdHJ5IHRvIGNhbGwgaXQgd2l0aCBhIGNhbGxiYWNrIGZpcnN0LCBhbmQgaXQgd2lsbCBmYWxsYmFja1xuICAgICAgICAgICAgLy8gdG8gbm90IHBhc3NpbmcgdGhlIGNhbGxiYWNrIGlmIHRoZSBmaXJzdCBjYWxsIGZhaWxzLlxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdKC4uLmFyZ3MsIG1ha2VDYWxsYmFjayh7cmVzb2x2ZSwgcmVqZWN0fSwgbWV0YWRhdGEpKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGNiRXJyb3IpIHtcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKGAke25hbWV9IEFQSSBtZXRob2QgZG9lc24ndCBzZWVtIHRvIHN1cHBvcnQgdGhlIGNhbGxiYWNrIHBhcmFtZXRlciwgYCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBcImZhbGxpbmcgYmFjayB0byBjYWxsIGl0IHdpdGhvdXQgYSBjYWxsYmFjazogXCIsIGNiRXJyb3IpO1xuXG4gICAgICAgICAgICAgIHRhcmdldFtuYW1lXSguLi5hcmdzKTtcblxuICAgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIEFQSSBtZXRob2QgbWV0YWRhdGEsIHNvIHRoYXQgdGhlIG5leHQgQVBJIGNhbGxzIHdpbGwgbm90IHRyeSB0b1xuICAgICAgICAgICAgICAvLyB1c2UgdGhlIHVuc3VwcG9ydGVkIGNhbGxiYWNrIGFueW1vcmUuXG4gICAgICAgICAgICAgIG1ldGFkYXRhLmZhbGxiYWNrVG9Ob0NhbGxiYWNrID0gZmFsc2U7XG4gICAgICAgICAgICAgIG1ldGFkYXRhLm5vQ2FsbGJhY2sgPSB0cnVlO1xuXG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKG1ldGFkYXRhLm5vQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRhcmdldFtuYW1lXSguLi5hcmdzKTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0W25hbWVdKC4uLmFyZ3MsIG1ha2VDYWxsYmFjayh7cmVzb2x2ZSwgcmVqZWN0fSwgbWV0YWRhdGEpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogV3JhcHMgYW4gZXhpc3RpbmcgbWV0aG9kIG9mIHRoZSB0YXJnZXQgb2JqZWN0LCBzbyB0aGF0IGNhbGxzIHRvIGl0IGFyZVxuICAgICAqIGludGVyY2VwdGVkIGJ5IHRoZSBnaXZlbiB3cmFwcGVyIGZ1bmN0aW9uLiBUaGUgd3JhcHBlciBmdW5jdGlvbiByZWNlaXZlcyxcbiAgICAgKiBhcyBpdHMgZmlyc3QgYXJndW1lbnQsIHRoZSBvcmlnaW5hbCBgdGFyZ2V0YCBvYmplY3QsIGZvbGxvd2VkIGJ5IGVhY2ggb2ZcbiAgICAgKiB0aGUgYXJndW1lbnRzIHBhc3NlZCB0byB0aGUgb3JpZ2luYWwgbWV0aG9kLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHRhcmdldFxuICAgICAqICAgICAgICBUaGUgb3JpZ2luYWwgdGFyZ2V0IG9iamVjdCB0aGF0IHRoZSB3cmFwcGVkIG1ldGhvZCBiZWxvbmdzIHRvLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IG1ldGhvZFxuICAgICAqICAgICAgICBUaGUgbWV0aG9kIGJlaW5nIHdyYXBwZWQuIFRoaXMgaXMgdXNlZCBhcyB0aGUgdGFyZ2V0IG9mIHRoZSBQcm94eVxuICAgICAqICAgICAgICBvYmplY3Qgd2hpY2ggaXMgY3JlYXRlZCB0byB3cmFwIHRoZSBtZXRob2QuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gd3JhcHBlclxuICAgICAqICAgICAgICBUaGUgd3JhcHBlciBmdW5jdGlvbiB3aGljaCBpcyBjYWxsZWQgaW4gcGxhY2Ugb2YgYSBkaXJlY3QgaW52b2NhdGlvblxuICAgICAqICAgICAgICBvZiB0aGUgd3JhcHBlZCBtZXRob2QuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7UHJveHk8ZnVuY3Rpb24+fVxuICAgICAqICAgICAgICBBIFByb3h5IG9iamVjdCBmb3IgdGhlIGdpdmVuIG1ldGhvZCwgd2hpY2ggaW52b2tlcyB0aGUgZ2l2ZW4gd3JhcHBlclxuICAgICAqICAgICAgICBtZXRob2QgaW4gaXRzIHBsYWNlLlxuICAgICAqL1xuICAgIGNvbnN0IHdyYXBNZXRob2QgPSAodGFyZ2V0LCBtZXRob2QsIHdyYXBwZXIpID0+IHtcbiAgICAgIHJldHVybiBuZXcgUHJveHkobWV0aG9kLCB7XG4gICAgICAgIGFwcGx5KHRhcmdldE1ldGhvZCwgdGhpc09iaiwgYXJncykge1xuICAgICAgICAgIHJldHVybiB3cmFwcGVyLmNhbGwodGhpc09iaiwgdGFyZ2V0LCAuLi5hcmdzKTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBsZXQgaGFzT3duUHJvcGVydHkgPSBGdW5jdGlvbi5jYWxsLmJpbmQoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSk7XG5cbiAgICAvKipcbiAgICAgKiBXcmFwcyBhbiBvYmplY3QgaW4gYSBQcm94eSB3aGljaCBpbnRlcmNlcHRzIGFuZCB3cmFwcyBjZXJ0YWluIG1ldGhvZHNcbiAgICAgKiBiYXNlZCBvbiB0aGUgZ2l2ZW4gYHdyYXBwZXJzYCBhbmQgYG1ldGFkYXRhYCBvYmplY3RzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHRhcmdldFxuICAgICAqICAgICAgICBUaGUgdGFyZ2V0IG9iamVjdCB0byB3cmFwLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFt3cmFwcGVycyA9IHt9XVxuICAgICAqICAgICAgICBBbiBvYmplY3QgdHJlZSBjb250YWluaW5nIHdyYXBwZXIgZnVuY3Rpb25zIGZvciBzcGVjaWFsIGNhc2VzLiBBbnlcbiAgICAgKiAgICAgICAgZnVuY3Rpb24gcHJlc2VudCBpbiB0aGlzIG9iamVjdCB0cmVlIGlzIGNhbGxlZCBpbiBwbGFjZSBvZiB0aGVcbiAgICAgKiAgICAgICAgbWV0aG9kIGluIHRoZSBzYW1lIGxvY2F0aW9uIGluIHRoZSBgdGFyZ2V0YCBvYmplY3QgdHJlZS4gVGhlc2VcbiAgICAgKiAgICAgICAgd3JhcHBlciBtZXRob2RzIGFyZSBpbnZva2VkIGFzIGRlc2NyaWJlZCBpbiB7QHNlZSB3cmFwTWV0aG9kfS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbbWV0YWRhdGEgPSB7fV1cbiAgICAgKiAgICAgICAgQW4gb2JqZWN0IHRyZWUgY29udGFpbmluZyBtZXRhZGF0YSB1c2VkIHRvIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVcbiAgICAgKiAgICAgICAgUHJvbWlzZS1iYXNlZCB3cmFwcGVyIGZ1bmN0aW9ucyBmb3IgYXN5bmNocm9ub3VzLiBBbnkgZnVuY3Rpb24gaW5cbiAgICAgKiAgICAgICAgdGhlIGB0YXJnZXRgIG9iamVjdCB0cmVlIHdoaWNoIGhhcyBhIGNvcnJlc3BvbmRpbmcgbWV0YWRhdGEgb2JqZWN0XG4gICAgICogICAgICAgIGluIHRoZSBzYW1lIGxvY2F0aW9uIGluIHRoZSBgbWV0YWRhdGFgIHRyZWUgaXMgcmVwbGFjZWQgd2l0aCBhblxuICAgICAqICAgICAgICBhdXRvbWF0aWNhbGx5LWdlbmVyYXRlZCB3cmFwcGVyIGZ1bmN0aW9uLCBhcyBkZXNjcmliZWQgaW5cbiAgICAgKiAgICAgICAge0BzZWUgd3JhcEFzeW5jRnVuY3Rpb259XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7UHJveHk8b2JqZWN0Pn1cbiAgICAgKi9cbiAgICBjb25zdCB3cmFwT2JqZWN0ID0gKHRhcmdldCwgd3JhcHBlcnMgPSB7fSwgbWV0YWRhdGEgPSB7fSkgPT4ge1xuICAgICAgbGV0IGNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgIGxldCBoYW5kbGVycyA9IHtcbiAgICAgICAgaGFzKHByb3h5VGFyZ2V0LCBwcm9wKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3AgaW4gdGFyZ2V0IHx8IHByb3AgaW4gY2FjaGU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0KHByb3h5VGFyZ2V0LCBwcm9wLCByZWNlaXZlcikge1xuICAgICAgICAgIGlmIChwcm9wIGluIGNhY2hlKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVbcHJvcF07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCEocHJvcCBpbiB0YXJnZXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxldCB2YWx1ZSA9IHRhcmdldFtwcm9wXTtcblxuICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgLy8gVGhpcyBpcyBhIG1ldGhvZCBvbiB0aGUgdW5kZXJseWluZyBvYmplY3QuIENoZWNrIGlmIHdlIG5lZWQgdG8gZG9cbiAgICAgICAgICAgIC8vIGFueSB3cmFwcGluZy5cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB3cmFwcGVyc1twcm9wXSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgIC8vIFdlIGhhdmUgYSBzcGVjaWFsLWNhc2Ugd3JhcHBlciBmb3IgdGhpcyBtZXRob2QuXG4gICAgICAgICAgICAgIHZhbHVlID0gd3JhcE1ldGhvZCh0YXJnZXQsIHRhcmdldFtwcm9wXSwgd3JhcHBlcnNbcHJvcF0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNPd25Qcm9wZXJ0eShtZXRhZGF0YSwgcHJvcCkpIHtcbiAgICAgICAgICAgICAgLy8gVGhpcyBpcyBhbiBhc3luYyBtZXRob2QgdGhhdCB3ZSBoYXZlIG1ldGFkYXRhIGZvci4gQ3JlYXRlIGFcbiAgICAgICAgICAgICAgLy8gUHJvbWlzZSB3cmFwcGVyIGZvciBpdC5cbiAgICAgICAgICAgICAgbGV0IHdyYXBwZXIgPSB3cmFwQXN5bmNGdW5jdGlvbihwcm9wLCBtZXRhZGF0YVtwcm9wXSk7XG4gICAgICAgICAgICAgIHZhbHVlID0gd3JhcE1ldGhvZCh0YXJnZXQsIHRhcmdldFtwcm9wXSwgd3JhcHBlcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBUaGlzIGlzIGEgbWV0aG9kIHRoYXQgd2UgZG9uJ3Qga25vdyBvciBjYXJlIGFib3V0LiBSZXR1cm4gdGhlXG4gICAgICAgICAgICAgIC8vIG9yaWdpbmFsIG1ldGhvZCwgYm91bmQgdG8gdGhlIHVuZGVybHlpbmcgb2JqZWN0LlxuICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLmJpbmQodGFyZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZSAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgKGhhc093blByb3BlcnR5KHdyYXBwZXJzLCBwcm9wKSB8fFxuICAgICAgICAgICAgICAgICAgICAgIGhhc093blByb3BlcnR5KG1ldGFkYXRhLCBwcm9wKSkpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgYW4gb2JqZWN0IHRoYXQgd2UgbmVlZCB0byBkbyBzb21lIHdyYXBwaW5nIGZvciB0aGUgY2hpbGRyZW5cbiAgICAgICAgICAgIC8vIG9mLiBDcmVhdGUgYSBzdWItb2JqZWN0IHdyYXBwZXIgZm9yIGl0IHdpdGggdGhlIGFwcHJvcHJpYXRlIGNoaWxkXG4gICAgICAgICAgICAvLyBtZXRhZGF0YS5cbiAgICAgICAgICAgIHZhbHVlID0gd3JhcE9iamVjdCh2YWx1ZSwgd3JhcHBlcnNbcHJvcF0sIG1ldGFkYXRhW3Byb3BdKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc093blByb3BlcnR5KG1ldGFkYXRhLCBcIipcIikpIHtcbiAgICAgICAgICAgIC8vIFdyYXAgYWxsIHByb3BlcnRpZXMgaW4gKiBuYW1lc3BhY2UuXG4gICAgICAgICAgICB2YWx1ZSA9IHdyYXBPYmplY3QodmFsdWUsIHdyYXBwZXJzW3Byb3BdLCBtZXRhZGF0YVtcIipcIl0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBXZSBkb24ndCBuZWVkIHRvIGRvIGFueSB3cmFwcGluZyBmb3IgdGhpcyBwcm9wZXJ0eSxcbiAgICAgICAgICAgIC8vIHNvIGp1c3QgZm9yd2FyZCBhbGwgYWNjZXNzIHRvIHRoZSB1bmRlcmx5aW5nIG9iamVjdC5cbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjYWNoZSwgcHJvcCwge1xuICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0W3Byb3BdO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY2FjaGVbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0KHByb3h5VGFyZ2V0LCBwcm9wLCB2YWx1ZSwgcmVjZWl2ZXIpIHtcbiAgICAgICAgICBpZiAocHJvcCBpbiBjYWNoZSkge1xuICAgICAgICAgICAgY2FjaGVbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0W3Byb3BdID0gdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuXG4gICAgICAgIGRlZmluZVByb3BlcnR5KHByb3h5VGFyZ2V0LCBwcm9wLCBkZXNjKSB7XG4gICAgICAgICAgcmV0dXJuIFJlZmxlY3QuZGVmaW5lUHJvcGVydHkoY2FjaGUsIHByb3AsIGRlc2MpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGRlbGV0ZVByb3BlcnR5KHByb3h5VGFyZ2V0LCBwcm9wKSB7XG4gICAgICAgICAgcmV0dXJuIFJlZmxlY3QuZGVsZXRlUHJvcGVydHkoY2FjaGUsIHByb3ApO1xuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgLy8gUGVyIGNvbnRyYWN0IG9mIHRoZSBQcm94eSBBUEksIHRoZSBcImdldFwiIHByb3h5IGhhbmRsZXIgbXVzdCByZXR1cm4gdGhlXG4gICAgICAvLyBvcmlnaW5hbCB2YWx1ZSBvZiB0aGUgdGFyZ2V0IGlmIHRoYXQgdmFsdWUgaXMgZGVjbGFyZWQgcmVhZC1vbmx5IGFuZFxuICAgICAgLy8gbm9uLWNvbmZpZ3VyYWJsZS4gRm9yIHRoaXMgcmVhc29uLCB3ZSBjcmVhdGUgYW4gb2JqZWN0IHdpdGggdGhlXG4gICAgICAvLyBwcm90b3R5cGUgc2V0IHRvIGB0YXJnZXRgIGluc3RlYWQgb2YgdXNpbmcgYHRhcmdldGAgZGlyZWN0bHkuXG4gICAgICAvLyBPdGhlcndpc2Ugd2UgY2Fubm90IHJldHVybiBhIGN1c3RvbSBvYmplY3QgZm9yIEFQSXMgdGhhdFxuICAgICAgLy8gYXJlIGRlY2xhcmVkIHJlYWQtb25seSBhbmQgbm9uLWNvbmZpZ3VyYWJsZSwgc3VjaCBhcyBgY2hyb21lLmRldnRvb2xzYC5cbiAgICAgIC8vXG4gICAgICAvLyBUaGUgcHJveHkgaGFuZGxlcnMgdGhlbXNlbHZlcyB3aWxsIHN0aWxsIHVzZSB0aGUgb3JpZ2luYWwgYHRhcmdldGBcbiAgICAgIC8vIGluc3RlYWQgb2YgdGhlIGBwcm94eVRhcmdldGAsIHNvIHRoYXQgdGhlIG1ldGhvZHMgYW5kIHByb3BlcnRpZXMgYXJlXG4gICAgICAvLyBkZXJlZmVyZW5jZWQgdmlhIHRoZSBvcmlnaW5hbCB0YXJnZXRzLlxuICAgICAgbGV0IHByb3h5VGFyZ2V0ID0gT2JqZWN0LmNyZWF0ZSh0YXJnZXQpO1xuICAgICAgcmV0dXJuIG5ldyBQcm94eShwcm94eVRhcmdldCwgaGFuZGxlcnMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgc2V0IG9mIHdyYXBwZXIgZnVuY3Rpb25zIGZvciBhbiBldmVudCBvYmplY3QsIHdoaWNoIGhhbmRsZXNcbiAgICAgKiB3cmFwcGluZyBvZiBsaXN0ZW5lciBmdW5jdGlvbnMgdGhhdCB0aG9zZSBtZXNzYWdlcyBhcmUgcGFzc2VkLlxuICAgICAqXG4gICAgICogQSBzaW5nbGUgd3JhcHBlciBpcyBjcmVhdGVkIGZvciBlYWNoIGxpc3RlbmVyIGZ1bmN0aW9uLCBhbmQgc3RvcmVkIGluIGFcbiAgICAgKiBtYXAuIFN1YnNlcXVlbnQgY2FsbHMgdG8gYGFkZExpc3RlbmVyYCwgYGhhc0xpc3RlbmVyYCwgb3IgYHJlbW92ZUxpc3RlbmVyYFxuICAgICAqIHJldHJpZXZlIHRoZSBvcmlnaW5hbCB3cmFwcGVyLCBzbyB0aGF0ICBhdHRlbXB0cyB0byByZW1vdmUgYVxuICAgICAqIHByZXZpb3VzbHktYWRkZWQgbGlzdGVuZXIgd29yayBhcyBleHBlY3RlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RGVmYXVsdFdlYWtNYXA8ZnVuY3Rpb24sIGZ1bmN0aW9uPn0gd3JhcHBlck1hcFxuICAgICAqICAgICAgICBBIERlZmF1bHRXZWFrTWFwIG9iamVjdCB3aGljaCB3aWxsIGNyZWF0ZSB0aGUgYXBwcm9wcmlhdGUgd3JhcHBlclxuICAgICAqICAgICAgICBmb3IgYSBnaXZlbiBsaXN0ZW5lciBmdW5jdGlvbiB3aGVuIG9uZSBkb2VzIG5vdCBleGlzdCwgYW5kIHJldHJpZXZlXG4gICAgICogICAgICAgIGFuIGV4aXN0aW5nIG9uZSB3aGVuIGl0IGRvZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxuICAgICAqL1xuICAgIGNvbnN0IHdyYXBFdmVudCA9IHdyYXBwZXJNYXAgPT4gKHtcbiAgICAgIGFkZExpc3RlbmVyKHRhcmdldCwgbGlzdGVuZXIsIC4uLmFyZ3MpIHtcbiAgICAgICAgdGFyZ2V0LmFkZExpc3RlbmVyKHdyYXBwZXJNYXAuZ2V0KGxpc3RlbmVyKSwgLi4uYXJncyk7XG4gICAgICB9LFxuXG4gICAgICBoYXNMaXN0ZW5lcih0YXJnZXQsIGxpc3RlbmVyKSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQuaGFzTGlzdGVuZXIod3JhcHBlck1hcC5nZXQobGlzdGVuZXIpKTtcbiAgICAgIH0sXG5cbiAgICAgIHJlbW92ZUxpc3RlbmVyKHRhcmdldCwgbGlzdGVuZXIpIHtcbiAgICAgICAgdGFyZ2V0LnJlbW92ZUxpc3RlbmVyKHdyYXBwZXJNYXAuZ2V0KGxpc3RlbmVyKSk7XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgY29uc3Qgb25SZXF1ZXN0RmluaXNoZWRXcmFwcGVycyA9IG5ldyBEZWZhdWx0V2Vha01hcChsaXN0ZW5lciA9PiB7XG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGxpc3RlbmVyO1xuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIFdyYXBzIGFuIG9uUmVxdWVzdEZpbmlzaGVkIGxpc3RlbmVyIGZ1bmN0aW9uIHNvIHRoYXQgaXQgd2lsbCByZXR1cm4gYVxuICAgICAgICogYGdldENvbnRlbnQoKWAgcHJvcGVydHkgd2hpY2ggcmV0dXJucyBhIGBQcm9taXNlYCByYXRoZXIgdGhhbiB1c2luZyBhXG4gICAgICAgKiBjYWxsYmFjayBBUEkuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IHJlcVxuICAgICAgICogICAgICAgIFRoZSBIQVIgZW50cnkgb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgbmV0d29yayByZXF1ZXN0LlxuICAgICAgICovXG4gICAgICByZXR1cm4gZnVuY3Rpb24gb25SZXF1ZXN0RmluaXNoZWQocmVxKSB7XG4gICAgICAgIGNvbnN0IHdyYXBwZWRSZXEgPSB3cmFwT2JqZWN0KHJlcSwge30gLyogd3JhcHBlcnMgKi8sIHtcbiAgICAgICAgICBnZXRDb250ZW50OiB7XG4gICAgICAgICAgICBtaW5BcmdzOiAwLFxuICAgICAgICAgICAgbWF4QXJnczogMCxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgbGlzdGVuZXIod3JhcHBlZFJlcSk7XG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgLy8gS2VlcCB0cmFjayBpZiB0aGUgZGVwcmVjYXRpb24gd2FybmluZyBoYXMgYmVlbiBsb2dnZWQgYXQgbGVhc3Qgb25jZS5cbiAgICBsZXQgbG9nZ2VkU2VuZFJlc3BvbnNlRGVwcmVjYXRpb25XYXJuaW5nID0gZmFsc2U7XG5cbiAgICBjb25zdCBvbk1lc3NhZ2VXcmFwcGVycyA9IG5ldyBEZWZhdWx0V2Vha01hcChsaXN0ZW5lciA9PiB7XG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGxpc3RlbmVyO1xuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIFdyYXBzIGEgbWVzc2FnZSBsaXN0ZW5lciBmdW5jdGlvbiBzbyB0aGF0IGl0IG1heSBzZW5kIHJlc3BvbnNlcyBiYXNlZCBvblxuICAgICAgICogaXRzIHJldHVybiB2YWx1ZSwgcmF0aGVyIHRoYW4gYnkgcmV0dXJuaW5nIGEgc2VudGluZWwgdmFsdWUgYW5kIGNhbGxpbmcgYVxuICAgICAgICogY2FsbGJhY2suIElmIHRoZSBsaXN0ZW5lciBmdW5jdGlvbiByZXR1cm5zIGEgUHJvbWlzZSwgdGhlIHJlc3BvbnNlIGlzXG4gICAgICAgKiBzZW50IHdoZW4gdGhlIHByb21pc2UgZWl0aGVyIHJlc29sdmVzIG9yIHJlamVjdHMuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHsqfSBtZXNzYWdlXG4gICAgICAgKiAgICAgICAgVGhlIG1lc3NhZ2Ugc2VudCBieSB0aGUgb3RoZXIgZW5kIG9mIHRoZSBjaGFubmVsLlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IHNlbmRlclxuICAgICAgICogICAgICAgIERldGFpbHMgYWJvdXQgdGhlIHNlbmRlciBvZiB0aGUgbWVzc2FnZS5cbiAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oKil9IHNlbmRSZXNwb25zZVxuICAgICAgICogICAgICAgIEEgY2FsbGJhY2sgd2hpY2gsIHdoZW4gY2FsbGVkIHdpdGggYW4gYXJiaXRyYXJ5IGFyZ3VtZW50LCBzZW5kc1xuICAgICAgICogICAgICAgIHRoYXQgdmFsdWUgYXMgYSByZXNwb25zZS5cbiAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICogICAgICAgIFRydWUgaWYgdGhlIHdyYXBwZWQgbGlzdGVuZXIgcmV0dXJuZWQgYSBQcm9taXNlLCB3aGljaCB3aWxsIGxhdGVyXG4gICAgICAgKiAgICAgICAgeWllbGQgYSByZXNwb25zZS4gRmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAgICovXG4gICAgICByZXR1cm4gZnVuY3Rpb24gb25NZXNzYWdlKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSB7XG4gICAgICAgIGxldCBkaWRDYWxsU2VuZFJlc3BvbnNlID0gZmFsc2U7XG5cbiAgICAgICAgbGV0IHdyYXBwZWRTZW5kUmVzcG9uc2U7XG4gICAgICAgIGxldCBzZW5kUmVzcG9uc2VQcm9taXNlID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgd3JhcHBlZFNlbmRSZXNwb25zZSA9IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBpZiAoIWxvZ2dlZFNlbmRSZXNwb25zZURlcHJlY2F0aW9uV2FybmluZykge1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oU0VORF9SRVNQT05TRV9ERVBSRUNBVElPTl9XQVJOSU5HLCBuZXcgRXJyb3IoKS5zdGFjayk7XG4gICAgICAgICAgICAgIGxvZ2dlZFNlbmRSZXNwb25zZURlcHJlY2F0aW9uV2FybmluZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkaWRDYWxsU2VuZFJlc3BvbnNlID0gdHJ1ZTtcbiAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmVzdWx0ID0gbGlzdGVuZXIobWVzc2FnZSwgc2VuZGVyLCB3cmFwcGVkU2VuZFJlc3BvbnNlKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgcmVzdWx0ID0gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGlzUmVzdWx0VGhlbmFibGUgPSByZXN1bHQgIT09IHRydWUgJiYgaXNUaGVuYWJsZShyZXN1bHQpO1xuXG4gICAgICAgIC8vIElmIHRoZSBsaXN0ZW5lciBkaWRuJ3QgcmV0dXJuZWQgdHJ1ZSBvciBhIFByb21pc2UsIG9yIGNhbGxlZFxuICAgICAgICAvLyB3cmFwcGVkU2VuZFJlc3BvbnNlIHN5bmNocm9ub3VzbHksIHdlIGNhbiBleGl0IGVhcmxpZXJcbiAgICAgICAgLy8gYmVjYXVzZSB0aGVyZSB3aWxsIGJlIG5vIHJlc3BvbnNlIHNlbnQgZnJvbSB0aGlzIGxpc3RlbmVyLlxuICAgICAgICBpZiAocmVzdWx0ICE9PSB0cnVlICYmICFpc1Jlc3VsdFRoZW5hYmxlICYmICFkaWRDYWxsU2VuZFJlc3BvbnNlKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQSBzbWFsbCBoZWxwZXIgdG8gc2VuZCB0aGUgbWVzc2FnZSBpZiB0aGUgcHJvbWlzZSByZXNvbHZlc1xuICAgICAgICAvLyBhbmQgYW4gZXJyb3IgaWYgdGhlIHByb21pc2UgcmVqZWN0cyAoYSB3cmFwcGVkIHNlbmRNZXNzYWdlIGhhc1xuICAgICAgICAvLyB0byB0cmFuc2xhdGUgdGhlIG1lc3NhZ2UgaW50byBhIHJlc29sdmVkIHByb21pc2Ugb3IgYSByZWplY3RlZFxuICAgICAgICAvLyBwcm9taXNlKS5cbiAgICAgICAgY29uc3Qgc2VuZFByb21pc2VkUmVzdWx0ID0gKHByb21pc2UpID0+IHtcbiAgICAgICAgICBwcm9taXNlLnRoZW4obXNnID0+IHtcbiAgICAgICAgICAgIC8vIHNlbmQgdGhlIG1lc3NhZ2UgdmFsdWUuXG4gICAgICAgICAgICBzZW5kUmVzcG9uc2UobXNnKTtcbiAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAvLyBTZW5kIGEgSlNPTiByZXByZXNlbnRhdGlvbiBvZiB0aGUgZXJyb3IgaWYgdGhlIHJlamVjdGVkIHZhbHVlXG4gICAgICAgICAgICAvLyBpcyBhbiBpbnN0YW5jZSBvZiBlcnJvciwgb3IgdGhlIG9iamVjdCBpdHNlbGYgb3RoZXJ3aXNlLlxuICAgICAgICAgICAgbGV0IG1lc3NhZ2U7XG4gICAgICAgICAgICBpZiAoZXJyb3IgJiYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgfHxcbiAgICAgICAgICAgICAgICB0eXBlb2YgZXJyb3IubWVzc2FnZSA9PT0gXCJzdHJpbmdcIikpIHtcbiAgICAgICAgICAgICAgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBtZXNzYWdlID0gXCJBbiB1bmV4cGVjdGVkIGVycm9yIG9jY3VycmVkXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbmRSZXNwb25zZSh7XG4gICAgICAgICAgICAgIF9fbW96V2ViRXh0ZW5zaW9uUG9seWZpbGxSZWplY3RfXzogdHJ1ZSxcbiAgICAgICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAvLyBQcmludCBhbiBlcnJvciBvbiB0aGUgY29uc29sZSBpZiB1bmFibGUgdG8gc2VuZCB0aGUgcmVzcG9uc2UuXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHNlbmQgb25NZXNzYWdlIHJlamVjdGVkIHJlcGx5XCIsIGVycik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gSWYgdGhlIGxpc3RlbmVyIHJldHVybmVkIGEgUHJvbWlzZSwgc2VuZCB0aGUgcmVzb2x2ZWQgdmFsdWUgYXMgYVxuICAgICAgICAvLyByZXN1bHQsIG90aGVyd2lzZSB3YWl0IHRoZSBwcm9taXNlIHJlbGF0ZWQgdG8gdGhlIHdyYXBwZWRTZW5kUmVzcG9uc2VcbiAgICAgICAgLy8gY2FsbGJhY2sgdG8gcmVzb2x2ZSBhbmQgc2VuZCBpdCBhcyBhIHJlc3BvbnNlLlxuICAgICAgICBpZiAoaXNSZXN1bHRUaGVuYWJsZSkge1xuICAgICAgICAgIHNlbmRQcm9taXNlZFJlc3VsdChyZXN1bHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbmRQcm9taXNlZFJlc3VsdChzZW5kUmVzcG9uc2VQcm9taXNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIExldCBDaHJvbWUga25vdyB0aGF0IHRoZSBsaXN0ZW5lciBpcyByZXBseWluZy5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgY29uc3Qgd3JhcHBlZFNlbmRNZXNzYWdlQ2FsbGJhY2sgPSAoe3JlamVjdCwgcmVzb2x2ZX0sIHJlcGx5KSA9PiB7XG4gICAgICBpZiAoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvcikge1xuICAgICAgICAvLyBEZXRlY3Qgd2hlbiBub25lIG9mIHRoZSBsaXN0ZW5lcnMgcmVwbGllZCB0byB0aGUgc2VuZE1lc3NhZ2UgY2FsbCBhbmQgcmVzb2x2ZVxuICAgICAgICAvLyB0aGUgcHJvbWlzZSB0byB1bmRlZmluZWQgYXMgaW4gRmlyZWZveC5cbiAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL3dlYmV4dGVuc2lvbi1wb2x5ZmlsbC9pc3N1ZXMvMTMwXG4gICAgICAgIGlmIChleHRlbnNpb25BUElzLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UgPT09IENIUk9NRV9TRU5EX01FU1NBR0VfQ0FMTEJBQ0tfTk9fUkVTUE9OU0VfTUVTU0FHRSkge1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZSkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHJlcGx5ICYmIHJlcGx5Ll9fbW96V2ViRXh0ZW5zaW9uUG9seWZpbGxSZWplY3RfXykge1xuICAgICAgICAvLyBDb252ZXJ0IGJhY2sgdGhlIEpTT04gcmVwcmVzZW50YXRpb24gb2YgdGhlIGVycm9yIGludG9cbiAgICAgICAgLy8gYW4gRXJyb3IgaW5zdGFuY2UuXG4gICAgICAgIHJlamVjdChuZXcgRXJyb3IocmVwbHkubWVzc2FnZSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZShyZXBseSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IHdyYXBwZWRTZW5kTWVzc2FnZSA9IChuYW1lLCBtZXRhZGF0YSwgYXBpTmFtZXNwYWNlT2JqLCAuLi5hcmdzKSA9PiB7XG4gICAgICBpZiAoYXJncy5sZW5ndGggPCBtZXRhZGF0YS5taW5BcmdzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgYXQgbGVhc3QgJHttZXRhZGF0YS5taW5BcmdzfSAke3BsdXJhbGl6ZUFyZ3VtZW50cyhtZXRhZGF0YS5taW5BcmdzKX0gZm9yICR7bmFtZX0oKSwgZ290ICR7YXJncy5sZW5ndGh9YCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChhcmdzLmxlbmd0aCA+IG1ldGFkYXRhLm1heEFyZ3MpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhdCBtb3N0ICR7bWV0YWRhdGEubWF4QXJnc30gJHtwbHVyYWxpemVBcmd1bWVudHMobWV0YWRhdGEubWF4QXJncyl9IGZvciAke25hbWV9KCksIGdvdCAke2FyZ3MubGVuZ3RofWApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zdCB3cmFwcGVkQ2IgPSB3cmFwcGVkU2VuZE1lc3NhZ2VDYWxsYmFjay5iaW5kKG51bGwsIHtyZXNvbHZlLCByZWplY3R9KTtcbiAgICAgICAgYXJncy5wdXNoKHdyYXBwZWRDYik7XG4gICAgICAgIGFwaU5hbWVzcGFjZU9iai5zZW5kTWVzc2FnZSguLi5hcmdzKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCBzdGF0aWNXcmFwcGVycyA9IHtcbiAgICAgIGRldnRvb2xzOiB7XG4gICAgICAgIG5ldHdvcms6IHtcbiAgICAgICAgICBvblJlcXVlc3RGaW5pc2hlZDogd3JhcEV2ZW50KG9uUmVxdWVzdEZpbmlzaGVkV3JhcHBlcnMpLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJ1bnRpbWU6IHtcbiAgICAgICAgb25NZXNzYWdlOiB3cmFwRXZlbnQob25NZXNzYWdlV3JhcHBlcnMpLFxuICAgICAgICBvbk1lc3NhZ2VFeHRlcm5hbDogd3JhcEV2ZW50KG9uTWVzc2FnZVdyYXBwZXJzKSxcbiAgICAgICAgc2VuZE1lc3NhZ2U6IHdyYXBwZWRTZW5kTWVzc2FnZS5iaW5kKG51bGwsIFwic2VuZE1lc3NhZ2VcIiwge21pbkFyZ3M6IDEsIG1heEFyZ3M6IDN9KSxcbiAgICAgIH0sXG4gICAgICB0YWJzOiB7XG4gICAgICAgIHNlbmRNZXNzYWdlOiB3cmFwcGVkU2VuZE1lc3NhZ2UuYmluZChudWxsLCBcInNlbmRNZXNzYWdlXCIsIHttaW5BcmdzOiAyLCBtYXhBcmdzOiAzfSksXG4gICAgICB9LFxuICAgIH07XG4gICAgY29uc3Qgc2V0dGluZ01ldGFkYXRhID0ge1xuICAgICAgY2xlYXI6IHttaW5BcmdzOiAxLCBtYXhBcmdzOiAxfSxcbiAgICAgIGdldDoge21pbkFyZ3M6IDEsIG1heEFyZ3M6IDF9LFxuICAgICAgc2V0OiB7bWluQXJnczogMSwgbWF4QXJnczogMX0sXG4gICAgfTtcbiAgICBhcGlNZXRhZGF0YS5wcml2YWN5ID0ge1xuICAgICAgbmV0d29yazoge1wiKlwiOiBzZXR0aW5nTWV0YWRhdGF9LFxuICAgICAgc2VydmljZXM6IHtcIipcIjogc2V0dGluZ01ldGFkYXRhfSxcbiAgICAgIHdlYnNpdGVzOiB7XCIqXCI6IHNldHRpbmdNZXRhZGF0YX0sXG4gICAgfTtcblxuICAgIHJldHVybiB3cmFwT2JqZWN0KGV4dGVuc2lvbkFQSXMsIHN0YXRpY1dyYXBwZXJzLCBhcGlNZXRhZGF0YSk7XG4gIH07XG5cbiAgLy8gVGhlIGJ1aWxkIHByb2Nlc3MgYWRkcyBhIFVNRCB3cmFwcGVyIGFyb3VuZCB0aGlzIGZpbGUsIHdoaWNoIG1ha2VzIHRoZVxuICAvLyBgbW9kdWxlYCB2YXJpYWJsZSBhdmFpbGFibGUuXG4gIG1vZHVsZS5leHBvcnRzID0gd3JhcEFQSXMoY2hyb21lKTtcbn0gZWxzZSB7XG4gIG1vZHVsZS5leHBvcnRzID0gZ2xvYmFsVGhpcy5icm93c2VyO1xufVxuIiwiZXhwb3J0cy5pbnRlcm9wRGVmYXVsdCA9IGZ1bmN0aW9uIChhKSB7XG4gIHJldHVybiBhICYmIGEuX19lc01vZHVsZSA/IGEgOiB7ZGVmYXVsdDogYX07XG59O1xuXG5leHBvcnRzLmRlZmluZUludGVyb3BGbGFnID0gZnVuY3Rpb24gKGEpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGEsICdfX2VzTW9kdWxlJywge3ZhbHVlOiB0cnVlfSk7XG59O1xuXG5leHBvcnRzLmV4cG9ydEFsbCA9IGZ1bmN0aW9uIChzb3VyY2UsIGRlc3QpIHtcbiAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoa2V5ID09PSAnZGVmYXVsdCcgfHwga2V5ID09PSAnX19lc01vZHVsZScgfHwgZGVzdC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRlc3QsIGtleSwge1xuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gc291cmNlW2tleV07XG4gICAgICB9LFxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gZGVzdDtcbn07XG5cbmV4cG9ydHMuZXhwb3J0ID0gZnVuY3Rpb24gKGRlc3QsIGRlc3ROYW1lLCBnZXQpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRlc3QsIGRlc3ROYW1lLCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGdldCxcbiAgfSk7XG59O1xuIl0sIm5hbWVzIjpbImdsb2JhbFRoaXMiLCJjaHJvbWUiLCJydW50aW1lIiwiaWQiLCJFcnJvciIsImJyb3dzZXIiLCJPYmplY3QiLCJnZXRQcm90b3R5cGVPZiIsInByb3RvdHlwZSIsIkNIUk9NRV9TRU5EX01FU1NBR0VfQ0FMTEJBQ0tfTk9fUkVTUE9OU0VfTUVTU0FHRSIsIlNFTkRfUkVTUE9OU0VfREVQUkVDQVRJT05fV0FSTklORyIsIndyYXBBUElzIiwiZXh0ZW5zaW9uQVBJcyIsImFwaU1ldGFkYXRhIiwia2V5cyIsImxlbmd0aCIsIkRlZmF1bHRXZWFrTWFwIiwiV2Vha01hcCIsImNvbnN0cnVjdG9yIiwiY3JlYXRlSXRlbSIsIml0ZW1zIiwidW5kZWZpbmVkIiwiZ2V0Iiwia2V5IiwiaGFzIiwic2V0IiwiaXNUaGVuYWJsZSIsInZhbHVlIiwidGhlbiIsIm1ha2VDYWxsYmFjayIsInByb21pc2UiLCJtZXRhZGF0YSIsImNhbGxiYWNrQXJncyIsImxhc3RFcnJvciIsInJlamVjdCIsIm1lc3NhZ2UiLCJzaW5nbGVDYWxsYmFja0FyZyIsInJlc29sdmUiLCJwbHVyYWxpemVBcmd1bWVudHMiLCJudW1BcmdzIiwid3JhcEFzeW5jRnVuY3Rpb24iLCJuYW1lIiwiYXN5bmNGdW5jdGlvbldyYXBwZXIiLCJ0YXJnZXQiLCJhcmdzIiwibWluQXJncyIsIm1heEFyZ3MiLCJQcm9taXNlIiwiZmFsbGJhY2tUb05vQ2FsbGJhY2siLCJjYkVycm9yIiwiY29uc29sZSIsIndhcm4iLCJub0NhbGxiYWNrIiwid3JhcE1ldGhvZCIsIm1ldGhvZCIsIndyYXBwZXIiLCJQcm94eSIsImFwcGx5IiwidGFyZ2V0TWV0aG9kIiwidGhpc09iaiIsImNhbGwiLCJoYXNPd25Qcm9wZXJ0eSIsIkZ1bmN0aW9uIiwiYmluZCIsIndyYXBPYmplY3QiLCJ3cmFwcGVycyIsImNhY2hlIiwiY3JlYXRlIiwiaGFuZGxlcnMiLCJwcm94eVRhcmdldCIsInByb3AiLCJyZWNlaXZlciIsImRlZmluZVByb3BlcnR5IiwiY29uZmlndXJhYmxlIiwiZW51bWVyYWJsZSIsImRlc2MiLCJSZWZsZWN0IiwiZGVsZXRlUHJvcGVydHkiLCJ3cmFwRXZlbnQiLCJ3cmFwcGVyTWFwIiwiYWRkTGlzdGVuZXIiLCJsaXN0ZW5lciIsImhhc0xpc3RlbmVyIiwicmVtb3ZlTGlzdGVuZXIiLCJvblJlcXVlc3RGaW5pc2hlZFdyYXBwZXJzIiwib25SZXF1ZXN0RmluaXNoZWQiLCJyZXEiLCJ3cmFwcGVkUmVxIiwiZ2V0Q29udGVudCIsImxvZ2dlZFNlbmRSZXNwb25zZURlcHJlY2F0aW9uV2FybmluZyIsIm9uTWVzc2FnZVdyYXBwZXJzIiwib25NZXNzYWdlIiwic2VuZGVyIiwic2VuZFJlc3BvbnNlIiwiZGlkQ2FsbFNlbmRSZXNwb25zZSIsIndyYXBwZWRTZW5kUmVzcG9uc2UiLCJzZW5kUmVzcG9uc2VQcm9taXNlIiwicmVzcG9uc2UiLCJzdGFjayIsInJlc3VsdCIsImVyciIsImlzUmVzdWx0VGhlbmFibGUiLCJzZW5kUHJvbWlzZWRSZXN1bHQiLCJtc2ciLCJlcnJvciIsIl9fbW96V2ViRXh0ZW5zaW9uUG9seWZpbGxSZWplY3RfXyIsImNhdGNoIiwid3JhcHBlZFNlbmRNZXNzYWdlQ2FsbGJhY2siLCJyZXBseSIsIndyYXBwZWRTZW5kTWVzc2FnZSIsImFwaU5hbWVzcGFjZU9iaiIsIndyYXBwZWRDYiIsInB1c2giLCJzZW5kTWVzc2FnZSIsInN0YXRpY1dyYXBwZXJzIiwiZGV2dG9vbHMiLCJuZXR3b3JrIiwib25NZXNzYWdlRXh0ZXJuYWwiLCJ0YWJzIiwic2V0dGluZ01ldGFkYXRhIiwiY2xlYXIiLCJwcml2YWN5Iiwic2VydmljZXMiLCJ3ZWJzaXRlcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwidmVyc2lvbiI6MywiZmlsZSI6ImJhY2tncm91bmQuMTc2ZmY1NDMuanMubWFwIn0=
