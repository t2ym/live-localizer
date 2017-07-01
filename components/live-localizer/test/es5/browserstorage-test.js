var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  // browserstorage scope (subscope of storageview)
  var scope = 'browserstorage';
  var browserstorage = new Suite(scope, 'live-localizer browserstorage tests');
  browserstorage.htmlSuite = 'live-localizer';
  browserstorage.test = Suite.scopes.storageview.classes.SelectStorageView;
  browserstorage.test = Suite.scopes.panel.classes.SelectIconView;
  browserstorage.test = Suite.scopes.panel.mixins.SelectStorageView;
  browserstorage.test = Suite.scopes.common.mixins.Reload;
  browserstorage.test = function (base) {
    return function (_base) {
      _inherits(CleanupBrowserStorageSuite, _base);

      function CleanupBrowserStorageSuite() {
        _classCallCheck(this, CleanupBrowserStorageSuite);

        return _possibleConstructorReturn(this, (CleanupBrowserStorageSuite.__proto__ || Object.getPrototypeOf(CleanupBrowserStorageSuite)).apply(this, arguments));
      }

      _createClass(CleanupBrowserStorageSuite, [{
        key: 'setup',
        value: function setup() {
          return regeneratorRuntime.async(function setup$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return regeneratorRuntime.awrap(_get(CleanupBrowserStorageSuite.prototype.__proto__ || Object.getPrototypeOf(CleanupBrowserStorageSuite.prototype), 'setup', this).call(this));

                case 2:
                  if (!this.hasToSkip) {
                    _context.next = 4;
                    break;
                  }

                  return _context.abrupt('return');

                case 4:
                  _context.next = 6;
                  return regeneratorRuntime.awrap(this.cleanup());

                case 6:
                case 'end':
                  return _context.stop();
              }
            }
          }, null, this);
        }
        /* async */
      }, {
        key: 'cleanup',
        value: function cleanup() {
          return new Promise(function (resolve, reject) {
            var match = window.location.pathname.match(/^(\/components\/live-localizer\/.*\/)[^\/]*$/);
            if (!match) {
              reject(new Error('Unrecognizable pathname ' + window.location.pathname));
            }
            var databaseName = 'LiveLocalizer' + match[1];
            var req = indexedDB.deleteDatabase(databaseName);
            req.onsuccess = function () {
              return resolve();
            };
            req.onerror = function (e) {
              return reject(e);
            };
            req.onblocked = function (e) {
              return reject(e);
            };
          });
        }
      }, {
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  self = this;

                  self.localeIcon = self.storageView.$['locale-icon'];
                  self.storageIcon = Polymer.dom(self.browserStorage.root).querySelector('live-localizer-storage-icon');
                  self.tooltip = self.browserStorage.$.tooltip;
                  self.iconTooltip = Polymer.dom(self.storageIcon.root).querySelector('paper-tooltip[for=card]');
                  self.checkboxes = Array.prototype.reduce.call(Polymer.dom(self.browserStorage.root).querySelectorAll('paper-checkbox'), function (acc, curr) {
                    acc[curr.textContent.trim()] = curr;return acc;
                  }, {});

                case 6:
                case 'end':
                  return _context2.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'toggleCheckbox',
        value: function toggleCheckbox(checkbox) {
          var self;
          return regeneratorRuntime.async(function toggleCheckbox$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  self = this;
                  _context3.next = 3;
                  return regeneratorRuntime.awrap(self.forEvent(self.browserStorage, checkbox.textContent.trim() === 'Load' ? 'browser-storage-autoload-flushed' : 'browser-storage-autosave-flushed', function () {
                    MockInteractions.tap(checkbox);
                  }, function (element, type, event) {
                    return true;
                  }));

                case 3:
                case 'end':
                  return _context3.stop();
              }
            }
          }, null, this);
        }
      }]);

      return CleanupBrowserStorageSuite;
    }(base);
  };
  browserstorage.test = function (base) {
    return function (_base2) {
      _inherits(InitializeBrowserStorageTest, _base2);

      function InitializeBrowserStorageTest() {
        _classCallCheck(this, InitializeBrowserStorageTest);

        return _possibleConstructorReturn(this, (InitializeBrowserStorageTest.__proto__ || Object.getPrototypeOf(InitializeBrowserStorageTest)).apply(this, arguments));
      }

      _createClass(InitializeBrowserStorageTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context4.next = 2;
                    break;
                  }

                  return _context4.abrupt('return');

                case 2:
                  self = this;
                  _context4.next = 5;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return self.browserStorage.isModelReady;
                  }, 200, 10));

                case 5:
                case 'end':
                  return _context4.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context5.next = 2;
                    break;
                  }

                  return _context5.abrupt('return');

                case 2:
                  assert.isOk(this.browserStorage.isModelReady, 'browserStorage is initialized');
                  assert.equal(this.browserStorage.autoLoad, true, 'autoLoad is true');
                  assert.equal(this.browserStorage.autoSave, true, 'autoSave is true');

                case 5:
                case 'end':
                  return _context5.stop();
              }
            }
          }, null, this);
        }
      }]);

      return InitializeBrowserStorageTest;
    }(base);
  };
  browserstorage.test = function (base) {
    return function (_base3) {
      _inherits(AutoSaveLoadCheckboxTest, _base3);

      function AutoSaveLoadCheckboxTest() {
        _classCallCheck(this, AutoSaveLoadCheckboxTest);

        return _possibleConstructorReturn(this, (AutoSaveLoadCheckboxTest.__proto__ || Object.getPrototypeOf(AutoSaveLoadCheckboxTest)).apply(this, arguments));
      }

      _createClass(AutoSaveLoadCheckboxTest, [{
        key: 'iteration',
        value: regeneratorRuntime.mark(function iteration() {
          return regeneratorRuntime.wrap(function iteration$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  return _context6.delegateYield([{ label: 'Save', expected: { autoSave: false, autoLoad: true } }, { label: 'Load', expected: { autoSave: false, autoLoad: false } }, { label: 'Save', expected: { autoSave: true, autoLoad: false } }, { label: 'Load', expected: { autoSave: true, autoLoad: true } }, { label: 'Load', expected: { autoSave: true, autoLoad: false } }, { label: 'Save', expected: { autoSave: false, autoLoad: false } }].map(function (parameters) {
                    parameters.name = parameters.label + ' checkbox is toggled';return parameters;
                  }), 't0', 1);

                case 1:
                case 'end':
                  return _context6.stop();
              }
            }
          }, iteration, this);
        })
      }, {
        key: 'operation',
        value: function operation(parameters) {
          var self;
          return regeneratorRuntime.async(function operation$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context7.next = 2;
                    break;
                  }

                  return _context7.abrupt('return');

                case 2:
                  self = this;
                  _context7.next = 5;
                  return regeneratorRuntime.awrap(self.toggleCheckbox(self.checkboxes[parameters.label]));

                case 5:
                case 'end':
                  return _context7.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint(parameters) {
          var prop;
          return regeneratorRuntime.async(function checkpoint$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context8.next = 2;
                    break;
                  }

                  return _context8.abrupt('return');

                case 2:
                  for (prop in parameters.expected) {
                    assert.equal(this.browserStorage[prop], parameters.expected[prop], prop + ' is ' + parameters.expected[prop]);
                  }

                case 3:
                case 'end':
                  return _context8.stop();
              }
            }
          }, null, this);
        }
      }]);

      return AutoSaveLoadCheckboxTest;
    }(base);
  };
  browserstorage.test = function (base) {
    return function (_base4) {
      _inherits(ConfiguredAutoSaveLoadTest, _base4);

      function ConfiguredAutoSaveLoadTest() {
        _classCallCheck(this, ConfiguredAutoSaveLoadTest);

        return _possibleConstructorReturn(this, (ConfiguredAutoSaveLoadTest.__proto__ || Object.getPrototypeOf(ConfiguredAutoSaveLoadTest)).apply(this, arguments));
      }

      _createClass(ConfiguredAutoSaveLoadTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context9.next = 2;
                    break;
                  }

                  return _context9.abrupt('return');

                case 2:
                  self = this;
                  _context9.next = 5;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return self.browserStorage.isModelReady;
                  }, 200, 10));

                case 5:
                case 'end':
                  return _context9.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context10.next = 2;
                    break;
                  }

                  return _context10.abrupt('return');

                case 2:
                  assert.isOk(this.browserStorage.isModelReady, 'browserStorage is configured');
                  assert.equal(this.browserStorage.autoLoad, false, 'autoLoad is false');
                  assert.equal(this.browserStorage.autoSave, false, 'autoSave is false');

                case 5:
                case 'end':
                  return _context10.stop();
              }
            }
          }, null, this);
        }
      }]);

      return ConfiguredAutoSaveLoadTest;
    }(base);
  };
  browserstorage.test = function (base) {
    return function (_base5) {
      _inherits(ConfiguredAutoSaveLoadCheckboxTest, _base5);

      function ConfiguredAutoSaveLoadCheckboxTest() {
        _classCallCheck(this, ConfiguredAutoSaveLoadCheckboxTest);

        return _possibleConstructorReturn(this, (ConfiguredAutoSaveLoadCheckboxTest.__proto__ || Object.getPrototypeOf(ConfiguredAutoSaveLoadCheckboxTest)).apply(this, arguments));
      }

      _createClass(ConfiguredAutoSaveLoadCheckboxTest, [{
        key: 'iteration',
        value: regeneratorRuntime.mark(function iteration() {
          return regeneratorRuntime.wrap(function iteration$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  return _context11.delegateYield([{ label: 'Save', expected: { autoSave: true, autoLoad: false } }, { label: 'Load', expected: { autoSave: true, autoLoad: true } }].map(function (parameters) {
                    parameters.name = parameters.label + ' checkbox is toggled';return parameters;
                  }), 't0', 1);

                case 1:
                case 'end':
                  return _context11.stop();
              }
            }
          }, iteration, this);
        })
      }, {
        key: 'operation',
        value: function operation(parameters) {
          var self;
          return regeneratorRuntime.async(function operation$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context12.next = 2;
                    break;
                  }

                  return _context12.abrupt('return');

                case 2:
                  self = this;
                  _context12.next = 5;
                  return regeneratorRuntime.awrap(self.toggleCheckbox(self.checkboxes[parameters.label]));

                case 5:
                case 'end':
                  return _context12.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint(parameters) {
          var prop;
          return regeneratorRuntime.async(function checkpoint$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context13.next = 2;
                    break;
                  }

                  return _context13.abrupt('return');

                case 2:
                  for (prop in parameters.expected) {
                    assert.equal(this.browserStorage[prop], parameters.expected[prop], prop + ' is ' + parameters.expected[prop]);
                  }

                case 3:
                case 'end':
                  return _context13.stop();
              }
            }
          }, null, this);
        }
      }]);

      return ConfiguredAutoSaveLoadCheckboxTest;
    }(base);
  };
  browserstorage.test = function (base) {
    return function (_base6) {
      _inherits(BrowserStorageUnselectedIconTooltipTest, _base6);

      function BrowserStorageUnselectedIconTooltipTest() {
        _classCallCheck(this, BrowserStorageUnselectedIconTooltipTest);

        return _possibleConstructorReturn(this, (BrowserStorageUnselectedIconTooltipTest.__proto__ || Object.getPrototypeOf(BrowserStorageUnselectedIconTooltipTest)).apply(this, arguments));
      }

      _createClass(BrowserStorageUnselectedIconTooltipTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context14) {
            while (1) {
              switch (_context14.prev = _context14.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context14.next = 2;
                    break;
                  }

                  return _context14.abrupt('return');

                case 2:
                  self = this;
                  _context14.next = 5;
                  return regeneratorRuntime.awrap(self.showTooltip(self.storageIcon.$.card, self.iconTooltip));

                case 5:
                case 'end':
                  return _context14.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context15) {
            while (1) {
              switch (_context15.prev = _context15.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context15.next = 2;
                    break;
                  }

                  return _context15.abrupt('return');

                case 2:
                  assert.equal(this.iconTooltip.getAttribute('for'), 'card', 'paper-tooltip should be for card');
                  assert.equal(this.iconTooltip.textContent.trim(), 'Drop to Save', 'tooltip should be "Drop to Save"');

                case 4:
                case 'end':
                  return _context15.stop();
              }
            }
          }, null, this);
        }
      }]);

      return BrowserStorageUnselectedIconTooltipTest;
    }(base);
  };
  browserstorage.test = function (base) {
    return function (_base7) {
      _inherits(BrowserStorageIneffectiveSaveTest, _base7);

      function BrowserStorageIneffectiveSaveTest() {
        _classCallCheck(this, BrowserStorageIneffectiveSaveTest);

        return _possibleConstructorReturn(this, (BrowserStorageIneffectiveSaveTest.__proto__ || Object.getPrototypeOf(BrowserStorageIneffectiveSaveTest)).apply(this, arguments));
      }

      _createClass(BrowserStorageIneffectiveSaveTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context16) {
            while (1) {
              switch (_context16.prev = _context16.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context16.next = 2;
                    break;
                  }

                  return _context16.abrupt('return');

                case 2:
                  self = this;
                  _context16.next = 5;
                  return regeneratorRuntime.awrap(self.dragDrop(self.localeIcon, self.storageIcon, 80, 0, 'drop', 'drag-and-drop'));

                case 5:
                case 'end':
                  return _context16.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context17) {
            while (1) {
              switch (_context17.prev = _context17.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context17.next = 2;
                    break;
                  }

                  return _context17.abrupt('return');

                case 2:
                  assert.equal(this.dragDropEvent.detail.src, this.localeIcon, 'drag source is locale icon');
                  assert.equal(this.dragDropEvent.detail.dest, this.storageIcon, 'drag destination is browser storage icon');
                  assert.isNotOk(this.storageIcon.selected, 'storage icon is not selected');

                case 5:
                case 'end':
                  return _context17.stop();
              }
            }
          }, null, this);
        }
      }]);

      return BrowserStorageIneffectiveSaveTest;
    }(base);
  };
  browserstorage.test = function (base) {
    return function (_base8) {
      _inherits(BrowserStorageIneffectiveSaveTest2, _base8);

      function BrowserStorageIneffectiveSaveTest2() {
        _classCallCheck(this, BrowserStorageIneffectiveSaveTest2);

        return _possibleConstructorReturn(this, (BrowserStorageIneffectiveSaveTest2.__proto__ || Object.getPrototypeOf(BrowserStorageIneffectiveSaveTest2)).apply(this, arguments));
      }

      _createClass(BrowserStorageIneffectiveSaveTest2, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context18) {
            while (1) {
              switch (_context18.prev = _context18.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context18.next = 2;
                    break;
                  }

                  return _context18.abrupt('return');

                case 2:
                  self = this;
                  _context18.next = 5;
                  return regeneratorRuntime.awrap(self.dragDrop(self.localeIcon, self.storageIcon, 200, 0, 'release', 'neon-animation-finish'));

                case 5:
                case 'end':
                  return _context18.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context19) {
            while (1) {
              switch (_context19.prev = _context19.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context19.next = 2;
                    break;
                  }

                  return _context19.abrupt('return');

                case 2:
                  assert.isNotOk(this.storageIcon.selected, 'storage icon is not selected');

                case 3:
                case 'end':
                  return _context19.stop();
              }
            }
          }, null, this);
        }
      }]);

      return BrowserStorageIneffectiveSaveTest2;
    }(base);
  };
  browserstorage.test = function (base) {
    return function (_base9) {
      _inherits(SelectLocaleIcon, _base9);

      function SelectLocaleIcon() {
        _classCallCheck(this, SelectLocaleIcon);

        return _possibleConstructorReturn(this, (SelectLocaleIcon.__proto__ || Object.getPrototypeOf(SelectLocaleIcon)).apply(this, arguments));
      }

      _createClass(SelectLocaleIcon, [{
        key: 'operation',
        value: function operation() {
          var self, droparea;
          return regeneratorRuntime.async(function operation$(_context20) {
            while (1) {
              switch (_context20.prev = _context20.next) {
                case 0:
                  self = this;
                  droparea = self.iconView.$.droparea;

                  self.icon = Polymer.dom(self.iconView.root).querySelector('live-localizer-locale-icon#locale-icon-de');
                  _context20.next = 5;
                  return regeneratorRuntime.awrap(self.forEvent(self.model, 'html-lang-mutation', function () {
                    MockInteractions.tap(self.icon);
                  }, function (element, type, event) {
                    return self.model.html.lang === 'de';
                  }));

                case 5:
                case 'end':
                  return _context20.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context21) {
            while (1) {
              switch (_context21.prev = _context21.next) {
                case 0:
                  assert.equal(this.model.html.lang, 'de', 'html.lang should be "de"');
                  assert.isOk(this.icon.selected, 'Selected icon is selected');

                case 2:
                case 'end':
                  return _context21.stop();
              }
            }
          }, null, this);
        }
      }]);

      return SelectLocaleIcon;
    }(base);
  };
  browserstorage.test = function (base) {
    return function (_base10) {
      _inherits(BrowserStorageSaveTest, _base10);

      function BrowserStorageSaveTest() {
        _classCallCheck(this, BrowserStorageSaveTest);

        return _possibleConstructorReturn(this, (BrowserStorageSaveTest.__proto__ || Object.getPrototypeOf(BrowserStorageSaveTest)).apply(this, arguments));
      }

      _createClass(BrowserStorageSaveTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context22) {
            while (1) {
              switch (_context22.prev = _context22.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context22.next = 2;
                    break;
                  }

                  return _context22.abrupt('return');

                case 2:
                  self = this;

                  self.tooltipMessage = '';
                  _context22.next = 6;
                  return regeneratorRuntime.awrap(self.dragDrop(self.localeIcon, self.storageIcon, 80, 0, 'drop', 'neon-animation-finish', self.tooltip, self.tooltipMessageGetter));

                case 6:
                case 'end':
                  return _context22.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context23) {
            while (1) {
              switch (_context23.prev = _context23.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context23.next = 2;
                    break;
                  }

                  return _context23.abrupt('return');

                case 2:
                  assert.equal(this.dragDropEvent.detail.src, this.localeIcon, 'drag source is locale icon');
                  assert.equal(this.dragDropEvent.detail.dest, this.storageIcon, 'drag destination is browser storage icon');
                  assert.equal(this.tooltipMessage, 'Loaded and then Saved XLIFF for de', 'tooltip is "Loaded and then Saved XLIFF for de"');

                case 5:
                case 'end':
                  return _context23.stop();
              }
            }
          }, null, this);
        }
      }]);

      return BrowserStorageSaveTest;
    }(base);
  };
  browserstorage.test = function (base) {
    return function (_base11) {
      _inherits(BrowserStorageSaveTest2, _base11);

      function BrowserStorageSaveTest2() {
        _classCallCheck(this, BrowserStorageSaveTest2);

        return _possibleConstructorReturn(this, (BrowserStorageSaveTest2.__proto__ || Object.getPrototypeOf(BrowserStorageSaveTest2)).apply(this, arguments));
      }

      _createClass(BrowserStorageSaveTest2, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context24) {
            while (1) {
              switch (_context24.prev = _context24.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context24.next = 2;
                    break;
                  }

                  return _context24.abrupt('return');

                case 2:
                  self = this;

                  if (!self.tooltip.textContent.trim()) {
                    _context24.next = 6;
                    break;
                  }

                  _context24.next = 6;
                  return regeneratorRuntime.awrap(self.forEvent(self.tooltip, 'neon-animation-finish', function () {}, function (element, type, event) {
                    return !self.tooltip.textContent.trim();
                  }));

                case 6:
                  self.tooltipMessage = '';
                  _context24.next = 9;
                  return regeneratorRuntime.awrap(self.dragDrop(self.localeIcon, self.storageIcon, 80, 0, 'drop', 'neon-animation-finish', self.tooltip, self.tooltipMessageGetter));

                case 9:
                  _context24.next = 11;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return self.dragDropEvent;
                  }, 100, 20));

                case 11:
                case 'end':
                  return _context24.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context25) {
            while (1) {
              switch (_context25.prev = _context25.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context25.next = 2;
                    break;
                  }

                  return _context25.abrupt('return');

                case 2:
                  assert.equal(this.dragDropEvent.detail.src, this.localeIcon, 'drag source is locale icon');
                  assert.equal(this.dragDropEvent.detail.dest, this.storageIcon, 'drag destination is browser storage icon');
                  assert.equal(this.tooltipMessage, 'Saved XLIFF for de', 'tooltip is "Saved XLIFF for de"');

                case 5:
                case 'end':
                  return _context25.stop();
              }
            }
          }, null, this);
        }
      }]);

      return BrowserStorageSaveTest2;
    }(base);
  };
  browserstorage.test = function (base) {
    return function (_base12) {
      _inherits(BrowserStorageSelectedIconTooltipTest, _base12);

      function BrowserStorageSelectedIconTooltipTest() {
        _classCallCheck(this, BrowserStorageSelectedIconTooltipTest);

        return _possibleConstructorReturn(this, (BrowserStorageSelectedIconTooltipTest.__proto__ || Object.getPrototypeOf(BrowserStorageSelectedIconTooltipTest)).apply(this, arguments));
      }

      _createClass(BrowserStorageSelectedIconTooltipTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context26) {
            while (1) {
              switch (_context26.prev = _context26.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context26.next = 2;
                    break;
                  }

                  return _context26.abrupt('return');

                case 2:
                  self = this;
                  _context26.next = 5;
                  return regeneratorRuntime.awrap(self.showTooltip(self.storageIcon.$.card, self.iconTooltip));

                case 5:
                case 'end':
                  return _context26.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context27) {
            while (1) {
              switch (_context27.prev = _context27.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context27.next = 2;
                    break;
                  }

                  return _context27.abrupt('return');

                case 2:
                  assert.equal(this.iconTooltip.getAttribute('for'), 'card', 'paper-tooltip should be for card');
                  assert.equal(this.iconTooltip.textContent.trim(), 'Drag to Load', 'tooltip should be "Drag to Load"');

                case 4:
                case 'end':
                  return _context27.stop();
              }
            }
          }, null, this);
        }
      }]);

      return BrowserStorageSelectedIconTooltipTest;
    }(base);
  };
  browserstorage.test = function (base) {
    return function (_base13) {
      _inherits(DisableAutoSaveCheckbox, _base13);

      function DisableAutoSaveCheckbox() {
        _classCallCheck(this, DisableAutoSaveCheckbox);

        return _possibleConstructorReturn(this, (DisableAutoSaveCheckbox.__proto__ || Object.getPrototypeOf(DisableAutoSaveCheckbox)).apply(this, arguments));
      }

      _createClass(DisableAutoSaveCheckbox, [{
        key: 'iteration',
        value: regeneratorRuntime.mark(function iteration() {
          return regeneratorRuntime.wrap(function iteration$(_context28) {
            while (1) {
              switch (_context28.prev = _context28.next) {
                case 0:
                  return _context28.delegateYield([{ label: 'Save', expected: { autoSave: false, autoLoad: true } }].map(function (parameters) {
                    parameters.name = parameters.label + ' checkbox is toggled';return parameters;
                  }), 't0', 1);

                case 1:
                case 'end':
                  return _context28.stop();
              }
            }
          }, iteration, this);
        })
      }, {
        key: 'operation',
        value: function operation(parameters) {
          var self;
          return regeneratorRuntime.async(function operation$(_context29) {
            while (1) {
              switch (_context29.prev = _context29.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context29.next = 2;
                    break;
                  }

                  return _context29.abrupt('return');

                case 2:
                  self = this;
                  _context29.next = 5;
                  return regeneratorRuntime.awrap(self.toggleCheckbox(self.checkboxes[parameters.label]));

                case 5:
                case 'end':
                  return _context29.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint(parameters) {
          var prop;
          return regeneratorRuntime.async(function checkpoint$(_context30) {
            while (1) {
              switch (_context30.prev = _context30.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context30.next = 2;
                    break;
                  }

                  return _context30.abrupt('return');

                case 2:
                  for (prop in parameters.expected) {
                    assert.equal(this.browserStorage[prop], parameters.expected[prop], prop + ' is ' + parameters.expected[prop]);
                  }

                case 3:
                case 'end':
                  return _context30.stop();
              }
            }
          }, null, this);
        }
      }]);

      return DisableAutoSaveCheckbox;
    }(base);
  };
  browserstorage.test = function (base) {
    return function (_base14) {
      _inherits(DisableAutoLoadCheckbox, _base14);

      function DisableAutoLoadCheckbox() {
        _classCallCheck(this, DisableAutoLoadCheckbox);

        return _possibleConstructorReturn(this, (DisableAutoLoadCheckbox.__proto__ || Object.getPrototypeOf(DisableAutoLoadCheckbox)).apply(this, arguments));
      }

      _createClass(DisableAutoLoadCheckbox, [{
        key: 'iteration',
        value: regeneratorRuntime.mark(function iteration() {
          return regeneratorRuntime.wrap(function iteration$(_context31) {
            while (1) {
              switch (_context31.prev = _context31.next) {
                case 0:
                  return _context31.delegateYield([{ label: 'Load', expected: { autoSave: false, autoLoad: false } }].map(function (parameters) {
                    parameters.name = parameters.label + ' checkbox is toggled';return parameters;
                  }), 't0', 1);

                case 1:
                case 'end':
                  return _context31.stop();
              }
            }
          }, iteration, this);
        })
      }, {
        key: 'operation',
        value: function operation(parameters) {
          var self;
          return regeneratorRuntime.async(function operation$(_context32) {
            while (1) {
              switch (_context32.prev = _context32.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context32.next = 2;
                    break;
                  }

                  return _context32.abrupt('return');

                case 2:
                  self = this;
                  _context32.next = 5;
                  return regeneratorRuntime.awrap(self.toggleCheckbox(self.checkboxes[parameters.label]));

                case 5:
                case 'end':
                  return _context32.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint(parameters) {
          var prop;
          return regeneratorRuntime.async(function checkpoint$(_context33) {
            while (1) {
              switch (_context33.prev = _context33.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context33.next = 2;
                    break;
                  }

                  return _context33.abrupt('return');

                case 2:
                  for (prop in parameters.expected) {
                    assert.equal(this.browserStorage[prop], parameters.expected[prop], prop + ' is ' + parameters.expected[prop]);
                  }

                case 3:
                case 'end':
                  return _context33.stop();
              }
            }
          }, null, this);
        }
      }]);

      return DisableAutoLoadCheckbox;
    }(base);
  };
  browserstorage.test = function (base) {
    return function (_base15) {
      _inherits(BrowserStorageLoadTest, _base15);

      function BrowserStorageLoadTest() {
        _classCallCheck(this, BrowserStorageLoadTest);

        return _possibleConstructorReturn(this, (BrowserStorageLoadTest.__proto__ || Object.getPrototypeOf(BrowserStorageLoadTest)).apply(this, arguments));
      }

      _createClass(BrowserStorageLoadTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context34) {
            while (1) {
              switch (_context34.prev = _context34.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context34.next = 2;
                    break;
                  }

                  return _context34.abrupt('return');

                case 2:
                  self = this;

                  self.tooltipMessage = '';
                  _context34.next = 6;
                  return regeneratorRuntime.awrap(self.dragDrop(self.storageIcon, self.localeIcon, -80, 0, 'drop', 'neon-animation-finish', self.tooltip, function (element, type, event) {
                    var message = self.tooltip.textContent.trim();
                    if (self.tooltipMessage) {
                      return !message;
                    } else {
                      self.tooltipMessage = message;
                      return false;
                    }
                  }));

                case 6:
                  _context34.next = 8;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return self.dragDropEvent;
                  }, 100, 20));

                case 8:
                case 'end':
                  return _context34.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context35) {
            while (1) {
              switch (_context35.prev = _context35.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context35.next = 2;
                    break;
                  }

                  return _context35.abrupt('return');

                case 2:
                  assert.equal(this.dragDropEvent.detail.src, this.storageIcon, 'drag source is browser storage icon');
                  assert.equal(this.dragDropEvent.detail.dest, this.localeIcon, 'drag destination is locale icon');
                  assert.equal(this.tooltipMessage, 'Loaded XLIFF for de', 'tooltip is "Loaded XLIFF for de"');

                case 5:
                case 'end':
                  return _context35.stop();
              }
            }
          }, null, this);
        }
      }]);

      return BrowserStorageLoadTest;
    }(base);
  };
  browserstorage.test = function (base) {
    return function (_base16) {
      _inherits(BrowserStorageUnselectedDragTest, _base16);

      function BrowserStorageUnselectedDragTest() {
        _classCallCheck(this, BrowserStorageUnselectedDragTest);

        return _possibleConstructorReturn(this, (BrowserStorageUnselectedDragTest.__proto__ || Object.getPrototypeOf(BrowserStorageUnselectedDragTest)).apply(this, arguments));
      }

      _createClass(BrowserStorageUnselectedDragTest, [{
        key: 'operation',
        value: function operation() {
          var self, count;
          return regeneratorRuntime.async(function operation$(_context36) {
            while (1) {
              switch (_context36.prev = _context36.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context36.next = 2;
                    break;
                  }

                  return _context36.abrupt('return');

                case 2:
                  self = this;

                  MockInteractions.tap(self.storageIcon);
                  _context36.next = 6;
                  return regeneratorRuntime.awrap(self.dragDrop(self.storageIcon, self.localeIcon, -80, 0, 'noop'));

                case 6:
                  count = 10;
                  _context36.next = 9;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return count++ >= 10;
                  }, 100, 20));

                case 9:
                case 'end':
                  return _context36.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context37) {
            while (1) {
              switch (_context37.prev = _context37.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context37.next = 2;
                    break;
                  }

                  return _context37.abrupt('return');

                case 2:
                  assert.isNotOk(this.dragDropEvent, 'no drag and drop event');

                case 3:
                case 'end':
                  return _context37.stop();
              }
            }
          }, null, this);
        }
      }]);

      return BrowserStorageUnselectedDragTest;
    }(base);
  };
  browserstorage.test = {
    // test class mixins
    '': [],
    // test classes
    SelectStorageView: {
      CleanupBrowserStorageSuite: {
        InitializeBrowserStorageTest: {
          AutoSaveLoadCheckboxTest: {
            Reload: {
              ConfiguredAutoSaveLoadTest: {
                ConfiguredAutoSaveLoadCheckboxTest: 'ConfiguredAutoSaveLoadCheckboxTest_phase_1; Toggle configured Auto Save/Load checkboxes (2 phases)'
              }
            }
          },
          BrowserStorageUnselectedIconTooltipTest: 'BrowserStorageUnselectedIconTooltipTest; Tooltip for unselected browser storage icon is "Drop to Save"',
          BrowserStorageIneffectiveSaveTest: 'BrowserStorageIneffectiveSaveTest; Saving default locale is ineffective'
        }
      }
    },
    SelectIconView: {
      CleanupBrowserStorageSuite: {
        InitializeBrowserStorageTest: {
          SelectLocaleIcon: {
            SelectStorageView: {
              BrowserStorageUnselectedIconTooltipTest: {
                BrowserStorageUnselectedDragTest: {
                  BrowserStorageIneffectiveSaveTest2: {
                    BrowserStorageSaveTest: {
                      Reload: {
                        BrowserStorageSelectedIconTooltipTest: {
                          DisableAutoSaveCheckbox: {
                            Reload: {
                              DisableAutoLoadCheckbox: {
                                BrowserStorageSaveTest2: {
                                  Reload: {
                                    BrowserStorageLoadTest: 'BrowserStorageLoadTest_phase_3; Save to browser storage, Reload, and Load from browser storage'
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
} // browserstorage scope