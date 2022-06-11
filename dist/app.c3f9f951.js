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
})({"js/upload.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _openBtn = /*#__PURE__*/new WeakMap();

var _removeBtn = /*#__PURE__*/new WeakMap();

var _input = /*#__PURE__*/new WeakMap();

var _configs = /*#__PURE__*/new WeakMap();

var _fileList = /*#__PURE__*/new WeakMap();

var _inputConfig = /*#__PURE__*/new WeakSet();

var _inputClicker = /*#__PURE__*/new WeakSet();

var _removeBtnCreater = /*#__PURE__*/new WeakSet();

var _removeClicker = /*#__PURE__*/new WeakSet();

var Uploader = /*#__PURE__*/function () {
  function Uploader(selector) {
    var configs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Uploader);

    _classPrivateMethodInitSpec(this, _removeClicker);

    _classPrivateMethodInitSpec(this, _removeBtnCreater);

    _classPrivateMethodInitSpec(this, _inputClicker);

    _classPrivateMethodInitSpec(this, _inputConfig);

    _classPrivateFieldInitSpec(this, _openBtn, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _removeBtn, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _input, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _configs, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _fileList, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _input, document.querySelector(selector));

    _classPrivateFieldSet(this, _configs, configs);
  }

  _createClass(Uploader, [{
    key: "BtnCreater",
    value: function BtnCreater(selector) {
      _classPrivateFieldSet(this, _openBtn, document.createElement("button"));

      _classPrivateFieldGet(this, _openBtn).classList.add("uploader-btn__open", "uploader-btn");

      _classPrivateFieldGet(this, _openBtn).textContent = "Открыть";
      _classPrivateFieldGet(this, _input).style.display = "none";

      _classPrivateFieldGet(this, _input).insertAdjacentHTML("afterend", "\n            <div class=\"uploader-btn__group\">\n            </div>\n        ");

      _classPrivateFieldGet(this, _input).nextElementSibling.append(_classPrivateFieldGet(this, _openBtn));

      _classPrivateMethodGet(this, _inputClicker, _inputClicker2).call(this);

      _classPrivateMethodGet(this, _inputConfig, _inputConfig2).call(this);
    }
  }, {
    key: "PreviewPrinter",
    value: function PreviewPrinter() {
      var _this = this;

      var imgsGroup = document.createElement("div");
      imgsGroup.classList.add("uploader-imgs");
      document.querySelector(".uploader-title").after(imgsGroup);

      var changeHandler = function changeHandler(e) {
        _classPrivateFieldSet(_this, _fileList, Array.from(e.target.files));

        _classPrivateFieldGet(_this, _fileList).forEach(function (file) {
          var reader = new FileReader();

          reader.onload = function (e) {
            var text = file.name.length < 15 ? file.name : file.name.slice(0, 14) + "...";
            var isSafari = isSafari = navigator.userAgent.includes('Safari') ? true : false;

            if (file.type.includes("image") || isSafari && file.type.includes("pdf")) {
              imgsGroup.insertAdjacentHTML('afterbegin', "\n                            <div class=\"uploader-imgs__item-container\" data-file-name=\"".concat(file.name, "\">\n                                <img src=\"").concat(e.target.result, "\" alt=\"").concat(file.name, "\" class=\"uploader-imgs__item\" />\n                                <div class=\"uploader-imgs__item-info\">\n                                    <span>").concat(text, "</span>\n                                    <span>").concat(bytesToSize(file.size), "</span>\n                                </div>\n                            </div>\n                        "));
            } else {
              imgsGroup.insertAdjacentHTML('afterbegin', "\n                            <div class=\"uploader-imgs__item-container\" data-file-name=\"".concat(file.name, "\">\n                                <div class=\"uploader-imgs__item uploader-imgs__file\">\n                                    <span class=\"uploader-imgs__item-text\">").concat(text, "</span>\n                                </div>\n                                <div class=\"uploader-imgs__item-info\">\n                                    <span>").concat(bytesToSize(file.size), "</span>\n                                </div>\n                            </div>\n                        "));
            }
          };

          reader.readAsDataURL(file);
        });

        if (!_classPrivateFieldGet(_this, _removeBtn)) _classPrivateMethodGet(_this, _removeBtnCreater, _removeBtnCreater2).call(_this);
      };

      _classPrivateFieldGet(this, _input).addEventListener("change", changeHandler);
    }
  }]);

  return Uploader;
}();

exports.default = Uploader;

function _inputConfig2() {
  if (_classPrivateFieldGet(this, _configs).multiple) {
    _classPrivateFieldGet(this, _input).setAttribute("multiple", true);
  }

  if (_classPrivateFieldGet(this, _configs).accept && Array.isArray(_classPrivateFieldGet(this, _configs).accept)) {
    var accept = _classPrivateFieldGet(this, _configs).accept.join(", ");

    _classPrivateFieldGet(this, _input).setAttribute("accept", accept);
  }
}

function _inputClicker2() {
  var _this2 = this;

  var clickHandler = function clickHandler() {
    return _classPrivateFieldGet(_this2, _input).click();
  };

  _classPrivateFieldGet(this, _openBtn).addEventListener("click", clickHandler);
}

function _removeBtnCreater2() {
  _classPrivateFieldSet(this, _removeBtn, document.createElement("button"));

  _classPrivateFieldGet(this, _removeBtn).classList.add("uploader-btn__remove", "uploader-btn");

  _classPrivateFieldGet(this, _removeBtn).textContent = "Удалить";
  _classPrivateFieldGet(this, _removeBtn).dataset.status = "inactive";

  _classPrivateFieldGet(this, _openBtn).after(_classPrivateFieldGet(this, _removeBtn));

  _classPrivateMethodGet(this, _removeClicker, _removeClicker2).call(this);
}

function _removeClicker2() {
  var _this3 = this;

  var removeHandler = function removeHandler() {
    var items = document.querySelectorAll(".uploader-imgs__item-container");
    items.forEach(function (item) {
      item.classList.toggle("cursor");
    });

    if (_classPrivateFieldGet(_this3, _removeBtn).dataset.status === "inactive") {
      items.forEach(function (item) {
        item.addEventListener("click", removeAnimation);
      });
      _classPrivateFieldGet(_this3, _removeBtn).textContent = "Готово";
      document.querySelector(".uploader-title").textContent = "Выберите файлы";
      _classPrivateFieldGet(_this3, _removeBtn).dataset.status = "active";
    } else {
      items.forEach(function (item) {
        item.removeEventListener("click", removeAnimation);

        if (item.classList.contains("selected")) {
          _classPrivateFieldSet(_this3, _fileList, _classPrivateFieldGet(_this3, _fileList).filter(function (file) {
            return file.name !== item.dataset.fileName;
          }));

          item.classList.remove("selected");
          item.classList.add("removing");
          setTimeout(function () {
            return item.remove();
          }, 500);
        }
      });

      if (!_classPrivateFieldGet(_this3, _fileList).length) {
        _classPrivateFieldGet(_this3, _removeBtn).remove();

        _classPrivateFieldSet(_this3, _removeBtn, null);

        return;
      }

      _classPrivateFieldGet(_this3, _removeBtn).textContent = "Удалить";
      document.querySelector(".uploader-title").textContent = "Загрузите ваши файлы";
      _classPrivateFieldGet(_this3, _removeBtn).dataset.status = "inactive";
    }
  };

  _classPrivateFieldGet(this, _removeBtn).addEventListener("click", removeHandler);

  function removeAnimation() {
    this.classList.toggle("selected");
  }
}

function bytesToSize(bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (!bytes) return '0 Byte';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
}
},{}],"js/app.js":[function(require,module,exports) {
"use strict";

var _upload = _interopRequireDefault(require("../js/upload.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uploader = new _upload.default("#input", {
  multiple: true,
  accept: [".jpg", ".docx", ".png", ".pdf"]
});
uploader.BtnCreater();
uploader.PreviewPrinter();
},{"../js/upload.js":"js/upload.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49153" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/app.js"], null)
//# sourceMappingURL=/app.c3f9f951.js.map