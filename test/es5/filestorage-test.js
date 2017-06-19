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
  // filestorage scope (subscope of storageview)
  var scope = 'filestorage';
  var filestorage = new Suite(scope, 'live-localizer local file storage tests');
  filestorage.htmlSuite = 'live-localizer';
  filestorage.test = Suite.scopes.storageview.classes.SelectStorageView;
  filestorage.test = Suite.scopes.panel.classes.SelectIconView;
  filestorage.test = Suite.scopes.panel.mixins.SelectStorageView;
  filestorage.test = Suite.scopes.browserstorage.mixins.SelectLocaleIcon;
  filestorage.test = Suite.scopes.common.mixins.Reload;
  filestorage.test = function (base) {
    return function (_base) {
      _inherits(FileStorageSuite, _base);

      function FileStorageSuite() {
        _classCallCheck(this, FileStorageSuite);

        return _possibleConstructorReturn(this, (FileStorageSuite.__proto__ || Object.getPrototypeOf(FileStorageSuite)).apply(this, arguments));
      }

      _createClass(FileStorageSuite, [{
        key: 'setup',
        value: function setup() {
          return regeneratorRuntime.async(function setup$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return regeneratorRuntime.awrap(_get(FileStorageSuite.prototype.__proto__ || Object.getPrototypeOf(FileStorageSuite.prototype), 'setup', this).call(this));

                case 2:
                  if (!this.hasToSkip) {
                    _context.next = 4;
                    break;
                  }

                  return _context.abrupt('return');

                case 4:
                case 'end':
                  return _context.stop();
              }
            }
          }, null, this);
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
                  self.storageIcon = Polymer.dom(self.fileStorage.root).querySelector('live-localizer-storage-icon');
                  self.iconTooltip = Polymer.dom(self.storageIcon.root).querySelector('paper-tooltip[for=card]');
                  self.tooltip = self.fileStorage.$.tooltip;
                  self.checkboxes = Array.prototype.reduce.call(Polymer.dom(self.fileStorage.root).querySelectorAll('paper-checkbox'), function (acc, curr) {
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
          var self, checkedProperty, prevChecked, count;
          return regeneratorRuntime.async(function toggleCheckbox$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  self = this;
                  checkedProperty = {
                    'Save with Timestamp': 'prefix',
                    'Watch and Load XLIFF': 'watcherEnabled'
                  }[checkbox.textContent.trim()];
                  prevChecked = self.fileStorage[checkedProperty];
                  _context3.next = 5;
                  return regeneratorRuntime.awrap(self.forEvent(checkbox, 'checked-changed', function () {
                    MockInteractions.tap(checkbox);
                  }, function (element, type, event) {
                    return !!prevChecked === !self.fileStorage[checkedProperty];
                  }));

                case 5:
                  count = 1;
                  _context3.next = 8;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return count-- > 0;
                  }, 200, 1));

                case 8:
                case 'end':
                  return _context3.stop();
              }
            }
          }, null, this);
        }
      }]);

      return FileStorageSuite;
    }(base);
  };
  filestorage.test = function (base) {
    return function (_base2) {
      _inherits(CheckboxTest, _base2);

      function CheckboxTest() {
        _classCallCheck(this, CheckboxTest);

        return _possibleConstructorReturn(this, (CheckboxTest.__proto__ || Object.getPrototypeOf(CheckboxTest)).apply(this, arguments));
      }

      _createClass(CheckboxTest, [{
        key: 'iteration',
        value: regeneratorRuntime.mark(function iteration() {
          return regeneratorRuntime.wrap(function iteration$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  return _context4.delegateYield([
                  // Initial state: { prefix: false, watcherEnabled: false }
                  { label: 'Save with Timestamp', expected: { prefix: true, watcherEnabled: false } }, { label: 'Watch and Load XLIFF', expected: { prefix: true, watcherEnabled: true } }, { label: 'Save with Timestamp', expected: { prefix: false, watcherEnabled: true } }, { label: 'Watch and Load XLIFF', expected: { prefix: false, watcherEnabled: false } }].map(function (parameters) {
                    parameters.name = parameters.label + ' checkbox is toggled';return parameters;
                  }), 't0', 1);

                case 1:
                case 'end':
                  return _context4.stop();
              }
            }
          }, iteration, this);
        })
      }, {
        key: 'operation',
        value: function operation(parameters) {
          var self;
          return regeneratorRuntime.async(function operation$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context5.next = 2;
                    break;
                  }

                  return _context5.abrupt('return');

                case 2:
                  self = this;
                  _context5.next = 5;
                  return regeneratorRuntime.awrap(self.toggleCheckbox(self.checkboxes[parameters.label]));

                case 5:
                case 'end':
                  return _context5.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint(parameters) {
          var prop;
          return regeneratorRuntime.async(function checkpoint$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context6.next = 2;
                    break;
                  }

                  return _context6.abrupt('return');

                case 2:
                  for (prop in parameters.expected) {
                    assert.equal(this.fileStorage[prop], parameters.expected[prop], prop + ' is ' + parameters.expected[prop]);
                  }

                case 3:
                case 'end':
                  return _context6.stop();
              }
            }
          }, null, this);
        }
      }]);

      return CheckboxTest;
    }(base);
  };
  filestorage.test = function (base) {
    return function (_base3) {
      _inherits(EnableTimestampPrefix, _base3);

      function EnableTimestampPrefix() {
        _classCallCheck(this, EnableTimestampPrefix);

        return _possibleConstructorReturn(this, (EnableTimestampPrefix.__proto__ || Object.getPrototypeOf(EnableTimestampPrefix)).apply(this, arguments));
      }

      _createClass(EnableTimestampPrefix, [{
        key: 'iteration',
        value: regeneratorRuntime.mark(function iteration() {
          return regeneratorRuntime.wrap(function iteration$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  return _context7.delegateYield([
                  // Initial state: { prefix: false, watcherEnabled: false }
                  { label: 'Save with Timestamp', expected: { prefix: true, watcherEnabled: false } }].map(function (parameters) {
                    parameters.name = parameters.label + ' checkbox is toggled';return parameters;
                  }), 't0', 1);

                case 1:
                case 'end':
                  return _context7.stop();
              }
            }
          }, iteration, this);
        })
      }, {
        key: 'operation',
        value: function operation(parameters) {
          var self;
          return regeneratorRuntime.async(function operation$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context8.next = 2;
                    break;
                  }

                  return _context8.abrupt('return');

                case 2:
                  self = this;
                  _context8.next = 5;
                  return regeneratorRuntime.awrap(self.toggleCheckbox(self.checkboxes[parameters.label]));

                case 5:
                case 'end':
                  return _context8.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint(parameters) {
          var prop;
          return regeneratorRuntime.async(function checkpoint$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context9.next = 2;
                    break;
                  }

                  return _context9.abrupt('return');

                case 2:
                  for (prop in parameters.expected) {
                    assert.equal(this.fileStorage[prop], parameters.expected[prop], prop + ' is ' + parameters.expected[prop]);
                  }

                case 3:
                case 'end':
                  return _context9.stop();
              }
            }
          }, null, this);
        }
      }]);

      return EnableTimestampPrefix;
    }(base);
  };
  filestorage.test = function (base) {
    return function (_base4) {
      _inherits(EnableWatcherCheckbox, _base4);

      function EnableWatcherCheckbox() {
        _classCallCheck(this, EnableWatcherCheckbox);

        return _possibleConstructorReturn(this, (EnableWatcherCheckbox.__proto__ || Object.getPrototypeOf(EnableWatcherCheckbox)).apply(this, arguments));
      }

      _createClass(EnableWatcherCheckbox, [{
        key: 'iteration',
        value: regeneratorRuntime.mark(function iteration() {
          return regeneratorRuntime.wrap(function iteration$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  return _context10.delegateYield([
                  // Initial state: { prefix: false, watcherEnabled: false }
                  { label: 'Watch and Load XLIFF', expected: { prefix: false, watcherEnabled: true } }].map(function (parameters) {
                    parameters.name = parameters.label + ' checkbox is toggled';return parameters;
                  }), 't0', 1);

                case 1:
                case 'end':
                  return _context10.stop();
              }
            }
          }, iteration, this);
        })
      }, {
        key: 'operation',
        value: function operation(parameters) {
          var self;
          return regeneratorRuntime.async(function operation$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context11.next = 2;
                    break;
                  }

                  return _context11.abrupt('return');

                case 2:
                  self = this;
                  _context11.next = 5;
                  return regeneratorRuntime.awrap(self.toggleCheckbox(self.checkboxes[parameters.label]));

                case 5:
                case 'end':
                  return _context11.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint(parameters) {
          var prop;
          return regeneratorRuntime.async(function checkpoint$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context12.next = 2;
                    break;
                  }

                  return _context12.abrupt('return');

                case 2:
                  for (prop in parameters.expected) {
                    assert.equal(this.fileStorage[prop], parameters.expected[prop], prop + ' is ' + parameters.expected[prop]);
                  }

                case 3:
                case 'end':
                  return _context12.stop();
              }
            }
          }, null, this);
        }
      }]);

      return EnableWatcherCheckbox;
    }(base);
  };
  filestorage.test = function (base) {
    return function (_base5) {
      _inherits(DisableWatcherCheckbox, _base5);

      function DisableWatcherCheckbox() {
        _classCallCheck(this, DisableWatcherCheckbox);

        return _possibleConstructorReturn(this, (DisableWatcherCheckbox.__proto__ || Object.getPrototypeOf(DisableWatcherCheckbox)).apply(this, arguments));
      }

      _createClass(DisableWatcherCheckbox, [{
        key: 'iteration',
        value: regeneratorRuntime.mark(function iteration() {
          return regeneratorRuntime.wrap(function iteration$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  return _context13.delegateYield([
                  // Initial state: { prefix: false, watcherEnabled: true }
                  { label: 'Watch and Load XLIFF', expected: { prefix: false, watcherEnabled: false } }].map(function (parameters) {
                    parameters.name = parameters.label + ' checkbox is toggled';return parameters;
                  }), 't0', 1);

                case 1:
                case 'end':
                  return _context13.stop();
              }
            }
          }, iteration, this);
        })
      }, {
        key: 'operation',
        value: function operation(parameters) {
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
                  return regeneratorRuntime.awrap(self.toggleCheckbox(self.checkboxes[parameters.label]));

                case 5:
                  _context14.next = 7;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return !self.fileStorage.watching;
                  }, 200, 100));

                case 7:
                case 'end':
                  return _context14.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint(parameters) {
          var prop;
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
                  for (prop in parameters.expected) {
                    assert.equal(this.fileStorage[prop], parameters.expected[prop], prop + ' is ' + parameters.expected[prop]);
                  }

                case 3:
                case 'end':
                  return _context15.stop();
              }
            }
          }, null, this);
        }
      }]);

      return DisableWatcherCheckbox;
    }(base);
  };
  filestorage.test = function (base) {
    return function (_base6) {
      _inherits(FileStorageUnselectedIconTooltipTest, _base6);

      function FileStorageUnselectedIconTooltipTest() {
        _classCallCheck(this, FileStorageUnselectedIconTooltipTest);

        return _possibleConstructorReturn(this, (FileStorageUnselectedIconTooltipTest.__proto__ || Object.getPrototypeOf(FileStorageUnselectedIconTooltipTest)).apply(this, arguments));
      }

      _createClass(FileStorageUnselectedIconTooltipTest, [{
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
                  return regeneratorRuntime.awrap(self.showTooltip(self.storageIcon.$.card, self.iconTooltip));

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
                  assert.equal(this.iconTooltip.getAttribute('for'), 'card', 'paper-tooltip should be for card');
                  assert.equal(this.iconTooltip.textContent.trim(), 'Select XLIFF', 'tooltip should be "Select XLIFF"');

                case 4:
                case 'end':
                  return _context17.stop();
              }
            }
          }, null, this);
        }
      }]);

      return FileStorageUnselectedIconTooltipTest;
    }(base);
  };
  filestorage.test = function (base) {
    return function (_base7) {
      _inherits(FileStorageSelectedIconTooltipTest, _base7);

      function FileStorageSelectedIconTooltipTest() {
        _classCallCheck(this, FileStorageSelectedIconTooltipTest);

        return _possibleConstructorReturn(this, (FileStorageSelectedIconTooltipTest.__proto__ || Object.getPrototypeOf(FileStorageSelectedIconTooltipTest)).apply(this, arguments));
      }

      _createClass(FileStorageSelectedIconTooltipTest, [{
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
                  return regeneratorRuntime.awrap(self.showTooltip(self.storageIcon.$.card, self.iconTooltip));

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
                  assert.equal(this.iconTooltip.getAttribute('for'), 'card', 'paper-tooltip should be for card');
                  assert.equal(this.iconTooltip.textContent.trim(), 'Drag to Load', 'tooltip should be "Drag to Load"');

                case 4:
                case 'end':
                  return _context19.stop();
              }
            }
          }, null, this);
        }
      }]);

      return FileStorageSelectedIconTooltipTest;
    }(base);
  };
  filestorage.test = function (base) {
    return function (_base8) {
      _inherits(MockFileStorageSaveTest, _base8);

      function MockFileStorageSaveTest() {
        _classCallCheck(this, MockFileStorageSaveTest);

        return _possibleConstructorReturn(this, (MockFileStorageSaveTest.__proto__ || Object.getPrototypeOf(MockFileStorageSaveTest)).apply(this, arguments));
      }

      _createClass(MockFileStorageSaveTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context20) {
            while (1) {
              switch (_context20.prev = _context20.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context20.next = 2;
                    break;
                  }

                  return _context20.abrupt('return');

                case 2:
                  self = this;

                  self.mockAnchor = self.fileStorage.$.anchor;
                  self.mockAnchor.click = function () {
                    self.downloadFileName = self.mockAnchor.download;
                    self.downloadBlobUrl = self.mockAnchor.href;
                    self.anchorClicked = true;
                  };
                  self.anchorClicked = false;
                  _context20.next = 8;
                  return regeneratorRuntime.awrap(self.dragDrop(self.localeIcon, self.storageIcon, 0, 120, 'drop', 'neon-animation-finish', self.localeIcon, function (element, type, event) {
                    return true;
                  }));

                case 8:
                  _context20.next = 10;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return self.anchorClicked;
                  }, 200, 100));

                case 10:
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
                  if (!this.hasToSkip) {
                    _context21.next = 2;
                    break;
                  }

                  return _context21.abrupt('return');

                case 2:
                  assert.equal(this.dragDropEvent.detail.src, this.localeIcon, 'drag source is locale icon');
                  assert.equal(this.dragDropEvent.detail.dest, this.storageIcon, 'drag destination is local file storage icon');
                  assert.equal(this.downloadFileName, 'bundle.de.xlf', 'download file name is "bundle.de.xlf"');
                  assert.isOk(this.downloadBlobUrl, 'download blob url is set');
                  assert.isOk(this.downloadBlobUrl.match(/^blob:http/), 'download blob url is set');

                case 7:
                case 'end':
                  return _context21.stop();
              }
            }
          }, null, this);
        }
      }]);

      return MockFileStorageSaveTest;
    }(base);
  };
  filestorage.test = function (base) {
    return function (_base9) {
      _inherits(MockFileStorageSaveTest2, _base9);

      function MockFileStorageSaveTest2() {
        _classCallCheck(this, MockFileStorageSaveTest2);

        return _possibleConstructorReturn(this, (MockFileStorageSaveTest2.__proto__ || Object.getPrototypeOf(MockFileStorageSaveTest2)).apply(this, arguments));
      }

      _createClass(MockFileStorageSaveTest2, [{
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

                  self.mockAnchor = self.fileStorage.$.anchor;
                  self.mockAnchor.click = function () {
                    self.downloadFileName = self.mockAnchor.download;
                    self.downloadBlobUrl = self.mockAnchor.href;
                    self.anchorClicked = true;
                  };
                  self.anchorClicked = false;
                  _context22.next = 8;
                  return regeneratorRuntime.awrap(self.dragDrop(self.localeIcon, self.storageIcon, 0, 120, 'drop', 'neon-animation-finish', self.localeIcon, function (element, type, event) {
                    return true;
                  }));

                case 8:
                  _context22.next = 10;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return self.anchorClicked;
                  }, 200, 100));

                case 10:
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
                  assert.equal(this.dragDropEvent.detail.dest, this.storageIcon, 'drag destination is local file storage icon');
                  assert.isOk(this.downloadFileName.match(/^[0-9]*-bundle.de.xlf$/), 'download file name is prefixed "[0-9]*-bundle.de.xlf"');
                  assert.isOk(this.downloadBlobUrl, 'download blob url is set');
                  assert.isOk(this.downloadBlobUrl.match(/^blob:http/), 'download blob url is set');

                case 7:
                case 'end':
                  return _context23.stop();
              }
            }
          }, null, this);
        }
      }]);

      return MockFileStorageSaveTest2;
    }(base);
  };
  filestorage.test = function (base) {
    return function (_base10) {
      _inherits(FileStorageLoadTest, _base10);

      function FileStorageLoadTest() {
        _classCallCheck(this, FileStorageLoadTest);

        return _possibleConstructorReturn(this, (FileStorageLoadTest.__proto__ || Object.getPrototypeOf(FileStorageLoadTest)).apply(this, arguments));
      }

      _createClass(FileStorageLoadTest, [{
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
                  _context24.next = 5;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    console.log(self.fileStorage.label);return self.fileStorage.label === 'bundle.de.xlf';
                  }, 200, 200));

                case 5:
                  self.loadEvent = undefined;
                  _context24.next = 8;
                  return regeneratorRuntime.awrap(self.dragDrop(self.storageIcon, self.localeIcon, 0, 120, 'drop', 'load-xliff', self.model, function (element, type, event) {
                    self.loadEvent = event;return true;
                  }));

                case 8:
                  _context24.next = 10;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    console.log(self.dragDropEvent);return self.dragDropEvent;
                  }, 200, 150));

                case 10:
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
                  assert.equal(this.dragDropEvent.detail.src, this.storageIcon, 'drag source is file storage icon');
                  assert.equal(this.dragDropEvent.detail.dest, this.localeIcon, 'drag destination is locale icon');
                  assert.equal(this.loadEvent.type, 'load-xliff', 'load-xliff event is fired');
                  assert.equal(this.loadEvent.detail.locale, 'de', 'load-xliff locale is de');
                  assert.equal(this.fileStorage.label, 'Local File', 'file storage icon label is "Local File"');

                case 7:
                case 'end':
                  return _context25.stop();
              }
            }
          }, null, this);
        }
      }]);

      return FileStorageLoadTest;
    }(base);
  };
  filestorage.test = function (base) {
    return function (_base11) {
      _inherits(FileStorageLoadTest2, _base11);

      function FileStorageLoadTest2() {
        _classCallCheck(this, FileStorageLoadTest2);

        return _possibleConstructorReturn(this, (FileStorageLoadTest2.__proto__ || Object.getPrototypeOf(FileStorageLoadTest2)).apply(this, arguments));
      }

      _createClass(FileStorageLoadTest2, [{
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
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    console.log(self.fileStorage.label);return !!self.fileStorage.label.match(/^[0-9]*-bundle.de.xlf$/);
                  }, 200, 200));

                case 5:
                  self.loadEvent = undefined;
                  _context26.next = 8;
                  return regeneratorRuntime.awrap(self.dragDrop(self.storageIcon, self.localeIcon, 0, 120, 'drop', 'load-xliff', self.model, function (element, type, event) {
                    self.loadEvent = event;return true;
                  }));

                case 8:
                  _context26.next = 10;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    console.log(self.dragDropEvent);return self.dragDropEvent;
                  }, 200, 150));

                case 10:
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
                  assert.equal(this.dragDropEvent.detail.src, this.storageIcon, 'drag source is file storage icon');
                  assert.equal(this.dragDropEvent.detail.dest, this.localeIcon, 'drag destination is locale icon');
                  assert.equal(this.loadEvent.type, 'load-xliff', 'load-xliff event is fired');
                  assert.equal(this.loadEvent.detail.locale, 'de', 'load-xliff locale is de');
                  assert.equal(this.fileStorage.label, 'Local File', 'file storage icon label is "Local File"');

                case 7:
                case 'end':
                  return _context27.stop();
              }
            }
          }, null, this);
        }
      }]);

      return FileStorageLoadTest2;
    }(base);
  };
  filestorage.test = function (base) {
    return function (_base12) {
      _inherits(MockFileStorageUploadTest, _base12);

      function MockFileStorageUploadTest() {
        _classCallCheck(this, MockFileStorageUploadTest);

        return _possibleConstructorReturn(this, (MockFileStorageUploadTest.__proto__ || Object.getPrototypeOf(MockFileStorageUploadTest)).apply(this, arguments));
      }

      _createClass(MockFileStorageUploadTest, [{
        key: 'operation',
        value: function operation() {
          var self, mockXliffName;
          return regeneratorRuntime.async(function operation$(_context28) {
            while (1) {
              switch (_context28.prev = _context28.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context28.next = 2;
                    break;
                  }

                  return _context28.abrupt('return');

                case 2:
                  self = this;

                  self.mockFileLoader = self.fileStorage.$.fileLoad;
                  self.mockFileLoader.click = function () {
                    self.fileLoaderClicked = true;
                  };
                  self.fileLoaderClicked = false;
                  MockInteractions.tap(self.storageIcon);
                  _context28.next = 9;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return self.fileLoaderClicked;
                  }, 200, 100));

                case 9:
                  mockXliffName = 'bundle.de.xlf';

                  self._xhr = new XMLHttpRequest();
                  _context28.next = 13;
                  return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
                    var onLoad = function onLoad(e) {
                      self.mockXliff = self._xhr.responseText;
                      self._xhr.removeEventListener('load', onLoad);
                      self._xhr.removeEventListener('error', onLoad);
                      resolve(self.mockXliff);
                    };
                    var onError = function onError(e) {
                      self.mockXliff = '';
                      self._xhr.removeEventListener('load', onLoad);
                      self._xhr.removeEventListener('error', onLoad);
                      reject(e);
                    };
                    self._xhr.addEventListener('load', onLoad);
                    self._xhr.addEventListener('error', onError);
                    self.mockXliffUrl = './xliff/' + mockXliffName;
                    self._xhr.open('GET', self.mockXliffUrl);
                    self.mockXliff = undefined;
                    self._xhr.send();
                  }));

                case 13:
                  delete self._xhr;
                  self.mockFile = new Blob([self.mockXliff], { type: 'application/x-xliff+xml' });
                  self.mockFile.name = mockXliffName;
                  self.mockChangeEvent = {
                    type: 'change',
                    target: {
                      files: [self.mockFile]
                    },
                    preventDefault: function preventDefault() {}
                  };
                  self.fileStorage.onFileChange(self.mockChangeEvent); // Note: input.files = new FileList([self.mockFile]) is illegal
                  _context28.next = 20;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return self.fileStorage.label === mockXliffName;
                  }, 200, 200));

                case 20:
                case 'end':
                  return _context28.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context29) {
            while (1) {
              switch (_context29.prev = _context29.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context29.next = 2;
                    break;
                  }

                  return _context29.abrupt('return');

                case 2:
                  assert.isOk(this.fileLoaderClicked, 'local file selection dialog is opened (mock)');
                  assert.equal(this.fileStorage.label, 'bundle.de.xlf', 'local file is uploaded (mock)');

                case 4:
                case 'end':
                  return _context29.stop();
              }
            }
          }, null, this);
        }
      }]);

      return MockFileStorageUploadTest;
    }(base);
  };
  filestorage.test = function (base) {
    return function (_base13) {
      _inherits(FileStorageDropTooltipTest, _base13);

      function FileStorageDropTooltipTest() {
        _classCallCheck(this, FileStorageDropTooltipTest);

        return _possibleConstructorReturn(this, (FileStorageDropTooltipTest.__proto__ || Object.getPrototypeOf(FileStorageDropTooltipTest)).apply(this, arguments));
      }

      _createClass(FileStorageDropTooltipTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context30) {
            while (1) {
              switch (_context30.prev = _context30.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context30.next = 2;
                    break;
                  }

                  return _context30.abrupt('return');

                case 2:
                  self = this;

                  self.dropTooltip = self.fileStorage.$.droptooltip;
                  _context30.next = 6;
                  return regeneratorRuntime.awrap(self.showTooltip(self.fileStorage.$.droparea, self.dropTooltip));

                case 6:
                  self.tooltipMessage = self.dropTooltip.textContent.trim();
                  _context30.next = 9;
                  return regeneratorRuntime.awrap(self.forEvent(self.dropTooltip, 'neon-animation-finish', function () {}, function (element, type, event) {
                    return true;
                  }));

                case 9:
                case 'end':
                  return _context30.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context31) {
            while (1) {
              switch (_context31.prev = _context31.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context31.next = 2;
                    break;
                  }

                  return _context31.abrupt('return');

                case 2:
                  assert.equal(this.tooltipMessage, 'Drag and drop XLIFF to select', 'drop tooltip should be "Drag and drop XLIFF to select"');

                case 3:
                case 'end':
                  return _context31.stop();
              }
            }
          }, null, this);
        }
      }]);

      return FileStorageDropTooltipTest;
    }(base);
  };
  filestorage.test = function (base) {
    return function (_base14) {
      _inherits(MockFileStorageDropTest, _base14);

      function MockFileStorageDropTest() {
        _classCallCheck(this, MockFileStorageDropTest);

        return _possibleConstructorReturn(this, (MockFileStorageDropTest.__proto__ || Object.getPrototypeOf(MockFileStorageDropTest)).apply(this, arguments));
      }

      _createClass(MockFileStorageDropTest, [{
        key: 'operation',
        value: function operation() {
          var self, mouseEventInit, mockXliffName;
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
                  mouseEventInit = {
                    bubbles: false,
                    cancelable: true,
                    clientX: 0,
                    clientY: 0,
                    buttons: 1
                  };

                  self.droparea = self.fileStorage.$.droparea;
                  self.droparea.dispatchEvent(new MouseEvent('dragover', mouseEventInit));
                  mockXliffName = 'bundle.de.xlf';

                  self._xhr = new XMLHttpRequest();
                  _context32.next = 10;
                  return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
                    var onLoad = function onLoad(e) {
                      self.mockXliff = self._xhr.responseText;
                      self._xhr.removeEventListener('load', onLoad);
                      self._xhr.removeEventListener('error', onLoad);
                      resolve(self.mockXliff);
                    };
                    var onError = function onError(e) {
                      self.mockXliff = '';
                      self._xhr.removeEventListener('load', onLoad);
                      self._xhr.removeEventListener('error', onLoad);
                      reject(e);
                    };
                    self._xhr.addEventListener('load', onLoad);
                    self._xhr.addEventListener('error', onError);
                    self.mockXliffUrl = './xliff/' + mockXliffName;
                    self._xhr.open('GET', self.mockXliffUrl);
                    self.mockXliff = undefined;
                    self._xhr.send();
                  }));

                case 10:
                  delete self._xhr;
                  self.mockFile = new Blob([self.mockXliff], { type: 'application/x-xliff+xml' });
                  self.mockFile.name = mockXliffName;
                  self.mockDropEvent = new MouseEvent('drop', mouseEventInit);
                  self.mockDropEvent.dataTransfer = { files: [self.mockFile] };
                  self.droparea.dispatchEvent(self.mockDropEvent);
                  _context32.next = 18;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return self.fileStorage.label === mockXliffName;
                  }, 200, 200));

                case 18:
                case 'end':
                  return _context32.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
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
                  assert.equal(this.fileStorage.label, 'bundle.de.xlf', 'local file is dropped (mock)');

                case 3:
                case 'end':
                  return _context33.stop();
              }
            }
          }, null, this);
        }
      }]);

      return MockFileStorageDropTest;
    }(base);
  };
  filestorage.test = function (base) {
    return function (_base15) {
      _inherits(FileStorageConfigureWatcher, _base15);

      function FileStorageConfigureWatcher() {
        _classCallCheck(this, FileStorageConfigureWatcher);

        return _possibleConstructorReturn(this, (FileStorageConfigureWatcher.__proto__ || Object.getPrototypeOf(FileStorageConfigureWatcher)).apply(this, arguments));
      }

      _createClass(FileStorageConfigureWatcher, [{
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

                  if (!(window.location.hostname !== 'localhost')) {
                    _context34.next = 5;
                    break;
                  }

                  return _context34.abrupt('return');

                case 5:
                  // configure watcher to fetch file from WCT
                  self.fileStorage.watchPort = window.location.port;
                  self.fileStorage.watchPath = window.location.pathname.replace(/[\/][^\/]*$/, '/') + 'updated-xliff/';

                case 7:
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
                case 'end':
                  return _context35.stop();
              }
            }
          }, null, this);
        }
      }]);

      return FileStorageConfigureWatcher;
    }(base);
  };
  filestorage.test = function (base) {
    return function (_base16) {
      _inherits(FileStorageConfigureWatcherError, _base16);

      function FileStorageConfigureWatcherError() {
        _classCallCheck(this, FileStorageConfigureWatcherError);

        return _possibleConstructorReturn(this, (FileStorageConfigureWatcherError.__proto__ || Object.getPrototypeOf(FileStorageConfigureWatcherError)).apply(this, arguments));
      }

      _createClass(FileStorageConfigureWatcherError, [{
        key: 'operation',
        value: function operation() {
          var self;
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

                  if (!(window.location.hostname !== 'localhost')) {
                    _context36.next = 5;
                    break;
                  }

                  return _context36.abrupt('return');

                case 5:
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
                case 'end':
                  return _context37.stop();
              }
            }
          }, null, this);
        }
      }]);

      return FileStorageConfigureWatcherError;
    }(base);
  };
  filestorage.test = function (base) {
    return function (_base17) {
      _inherits(FileStorageConfigureWatcherIncompleteXliff, _base17);

      function FileStorageConfigureWatcherIncompleteXliff() {
        _classCallCheck(this, FileStorageConfigureWatcherIncompleteXliff);

        return _possibleConstructorReturn(this, (FileStorageConfigureWatcherIncompleteXliff.__proto__ || Object.getPrototypeOf(FileStorageConfigureWatcherIncompleteXliff)).apply(this, arguments));
      }

      _createClass(FileStorageConfigureWatcherIncompleteXliff, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context38) {
            while (1) {
              switch (_context38.prev = _context38.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context38.next = 2;
                    break;
                  }

                  return _context38.abrupt('return');

                case 2:
                  self = this;

                  if (!(window.location.hostname !== 'localhost')) {
                    _context38.next = 5;
                    break;
                  }

                  return _context38.abrupt('return');

                case 5:
                  // configure watcher to fetch file from WCT
                  self.fileStorage.watchPort = window.location.port;
                  self.fileStorage.watchPath = window.location.pathname.replace(/[\/][^\/]*$/, '/') + 'incomplete-xliff/';

                case 7:
                case 'end':
                  return _context38.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context39) {
            while (1) {
              switch (_context39.prev = _context39.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context39.next = 2;
                    break;
                  }

                  return _context39.abrupt('return');

                case 2:
                case 'end':
                  return _context39.stop();
              }
            }
          }, null, this);
        }
      }]);

      return FileStorageConfigureWatcherIncompleteXliff;
    }(base);
  };
  filestorage.test = function (base) {
    return function (_base18) {
      _inherits(FileStorageConfigureWatcherFileNotFound, _base18);

      function FileStorageConfigureWatcherFileNotFound() {
        _classCallCheck(this, FileStorageConfigureWatcherFileNotFound);

        return _possibleConstructorReturn(this, (FileStorageConfigureWatcherFileNotFound.__proto__ || Object.getPrototypeOf(FileStorageConfigureWatcherFileNotFound)).apply(this, arguments));
      }

      _createClass(FileStorageConfigureWatcherFileNotFound, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context40) {
            while (1) {
              switch (_context40.prev = _context40.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context40.next = 2;
                    break;
                  }

                  return _context40.abrupt('return');

                case 2:
                  self = this;

                  if (!(window.location.hostname !== 'localhost')) {
                    _context40.next = 5;
                    break;
                  }

                  return _context40.abrupt('return');

                case 5:
                  // configure watcher to fetch file from WCT
                  self.fileStorage.watchPort = window.location.port;
                  self.fileStorage.watchPath = window.location.pathname.replace(/[\/][^\/]*$/, '/') + 'inexistent-xliff/';

                case 7:
                case 'end':
                  return _context40.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context41) {
            while (1) {
              switch (_context41.prev = _context41.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context41.next = 2;
                    break;
                  }

                  return _context41.abrupt('return');

                case 2:
                case 'end':
                  return _context41.stop();
              }
            }
          }, null, this);
        }
      }]);

      return FileStorageConfigureWatcherFileNotFound;
    }(base);
  };
  filestorage.test = function (base) {
    return function (_base19) {
      _inherits(FileStorageWatchingFileTooltip, _base19);

      function FileStorageWatchingFileTooltip() {
        _classCallCheck(this, FileStorageWatchingFileTooltip);

        return _possibleConstructorReturn(this, (FileStorageWatchingFileTooltip.__proto__ || Object.getPrototypeOf(FileStorageWatchingFileTooltip)).apply(this, arguments));
      }

      _createClass(FileStorageWatchingFileTooltip, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context42) {
            while (1) {
              switch (_context42.prev = _context42.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context42.next = 2;
                    break;
                  }

                  return _context42.abrupt('return');

                case 2:
                  self = this;

                  if (!(window.location.hostname !== 'localhost')) {
                    _context42.next = 5;
                    break;
                  }

                  return _context42.abrupt('return');

                case 5:
                  self.tooltipMessage = '';
                  _context42.next = 8;
                  return regeneratorRuntime.awrap(self.forEvent(self.tooltip, 'neon-animation-finish', function () {}, function (element, type, event) {
                    return self.tooltipMessage = self.tooltip.textContent.trim();
                  }));

                case 8:
                case 'end':
                  return _context42.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context43) {
            while (1) {
              switch (_context43.prev = _context43.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context43.next = 2;
                    break;
                  }

                  return _context43.abrupt('return');

                case 2:
                  if (!(window.location.hostname !== 'localhost')) {
                    _context43.next = 4;
                    break;
                  }

                  return _context43.abrupt('return');

                case 4:
                  assert.isOk(this.tooltipMessage.match(/^Watching http:/), 'tooltip should be "Watching http..."');

                case 5:
                case 'end':
                  return _context43.stop();
              }
            }
          }, null, this);
        }
      }]);

      return FileStorageWatchingFileTooltip;
    }(base);
  };
  filestorage.test = function (base) {
    return function (_base20) {
      _inherits(FileStorageWatchingFileTooltip2, _base20);

      function FileStorageWatchingFileTooltip2() {
        _classCallCheck(this, FileStorageWatchingFileTooltip2);

        return _possibleConstructorReturn(this, (FileStorageWatchingFileTooltip2.__proto__ || Object.getPrototypeOf(FileStorageWatchingFileTooltip2)).apply(this, arguments));
      }

      _createClass(FileStorageWatchingFileTooltip2, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context44) {
            while (1) {
              switch (_context44.prev = _context44.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context44.next = 2;
                    break;
                  }

                  return _context44.abrupt('return');

                case 2:
                  self = this;

                  if (!(window.location.hostname !== 'localhost')) {
                    _context44.next = 5;
                    break;
                  }

                  return _context44.abrupt('return');

                case 5:
                  self.tooltipMessage = '';
                  _context44.next = 8;
                  return regeneratorRuntime.awrap(self.forEvent(self.tooltip, 'neon-animation-finish', function () {
                    self.fileStorage.lastModified = new Date(0).toUTCString();
                  }, function (element, type, event) {
                    self.tooltipMessage = self.tooltip.textContent.trim();
                    console.log(self.tooltipMessage);
                    return self.tooltipMessage && self.tooltipMessage.match(/^Detected Change in /);
                  }));

                case 8:
                case 'end':
                  return _context44.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context45) {
            while (1) {
              switch (_context45.prev = _context45.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context45.next = 2;
                    break;
                  }

                  return _context45.abrupt('return');

                case 2:
                  if (!(window.location.hostname !== 'localhost')) {
                    _context45.next = 4;
                    break;
                  }

                  return _context45.abrupt('return');

                case 4:
                  assert.isOk(this.tooltipMessage.match(/^Detected Change in /), 'tooltip should be "Detected Change in http..."');

                case 5:
                case 'end':
                  return _context45.stop();
              }
            }
          }, null, this);
        }
      }]);

      return FileStorageWatchingFileTooltip2;
    }(base);
  };
  filestorage.test = function (base) {
    return function (_base21) {
      _inherits(FileStorageWatchingFileTooltip3, _base21);

      function FileStorageWatchingFileTooltip3() {
        _classCallCheck(this, FileStorageWatchingFileTooltip3);

        return _possibleConstructorReturn(this, (FileStorageWatchingFileTooltip3.__proto__ || Object.getPrototypeOf(FileStorageWatchingFileTooltip3)).apply(this, arguments));
      }

      _createClass(FileStorageWatchingFileTooltip3, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context46) {
            while (1) {
              switch (_context46.prev = _context46.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context46.next = 2;
                    break;
                  }

                  return _context46.abrupt('return');

                case 2:
                  self = this;

                  if (!(window.location.hostname !== 'localhost')) {
                    _context46.next = 5;
                    break;
                  }

                  return _context46.abrupt('return');

                case 5:
                  self.tooltipMessage = '';
                  _context46.next = 8;
                  return regeneratorRuntime.awrap(self.forEvent(self.tooltip, 'neon-animation-finish', function () {
                    self.fileStorage.lastModified = new Date(0).toUTCString();
                  }, function (element, type, event) {
                    self.tooltipMessage = self.tooltip.textContent.trim();
                    console.log(self.tooltipMessage);
                    return self.tooltipMessage && self.tooltipMessage.match(/^Error in watching /);
                  }));

                case 8:
                case 'end':
                  return _context46.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context47) {
            while (1) {
              switch (_context47.prev = _context47.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context47.next = 2;
                    break;
                  }

                  return _context47.abrupt('return');

                case 2:
                  if (!(window.location.hostname !== 'localhost')) {
                    _context47.next = 4;
                    break;
                  }

                  return _context47.abrupt('return');

                case 4:
                  assert.isOk(this.tooltipMessage.match(/^Error in watching /), 'tooltip should be "Error in watching http..."');

                case 5:
                case 'end':
                  return _context47.stop();
              }
            }
          }, null, this);
        }
      }]);

      return FileStorageWatchingFileTooltip3;
    }(base);
  };
  filestorage.test = function (base) {
    return function (_base22) {
      _inherits(FileStorageWatchingFileTooltip4, _base22);

      function FileStorageWatchingFileTooltip4() {
        _classCallCheck(this, FileStorageWatchingFileTooltip4);

        return _possibleConstructorReturn(this, (FileStorageWatchingFileTooltip4.__proto__ || Object.getPrototypeOf(FileStorageWatchingFileTooltip4)).apply(this, arguments));
      }

      _createClass(FileStorageWatchingFileTooltip4, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context48) {
            while (1) {
              switch (_context48.prev = _context48.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context48.next = 2;
                    break;
                  }

                  return _context48.abrupt('return');

                case 2:
                  self = this;

                  if (!(window.location.hostname !== 'localhost')) {
                    _context48.next = 5;
                    break;
                  }

                  return _context48.abrupt('return');

                case 5:
                  self.tooltipMessage = '';
                  _context48.next = 8;
                  return regeneratorRuntime.awrap(self.forEvent(self.tooltip, 'neon-animation-finish', function () {
                    self.fileStorage.lastModified = new Date(0).toUTCString();
                  }, function (element, type, event) {
                    self.tooltipMessage = self.tooltip.textContent.trim();
                    console.log(self.tooltipMessage);
                    return self.tooltipMessage && self.tooltipMessage.match(/^Incomplete XLIFF found at /);
                  }));

                case 8:
                case 'end':
                  return _context48.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context49) {
            while (1) {
              switch (_context49.prev = _context49.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context49.next = 2;
                    break;
                  }

                  return _context49.abrupt('return');

                case 2:
                  if (!(window.location.hostname !== 'localhost')) {
                    _context49.next = 4;
                    break;
                  }

                  return _context49.abrupt('return');

                case 4:
                  assert.isOk(this.tooltipMessage.match(/^Incomplete XLIFF found at /), 'tooltip should be "Incomplete XLIFF found at http..."');

                case 5:
                case 'end':
                  return _context49.stop();
              }
            }
          }, null, this);
        }
      }]);

      return FileStorageWatchingFileTooltip4;
    }(base);
  };
  filestorage.test = function (base) {
    return function (_base23) {
      _inherits(FileStorageWatchingFileTooltip5, _base23);

      function FileStorageWatchingFileTooltip5() {
        _classCallCheck(this, FileStorageWatchingFileTooltip5);

        return _possibleConstructorReturn(this, (FileStorageWatchingFileTooltip5.__proto__ || Object.getPrototypeOf(FileStorageWatchingFileTooltip5)).apply(this, arguments));
      }

      _createClass(FileStorageWatchingFileTooltip5, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context50) {
            while (1) {
              switch (_context50.prev = _context50.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context50.next = 2;
                    break;
                  }

                  return _context50.abrupt('return');

                case 2:
                  self = this;

                  if (!(window.location.hostname !== 'localhost')) {
                    _context50.next = 5;
                    break;
                  }

                  return _context50.abrupt('return');

                case 5:
                  self.tooltipMessage = '';
                  _context50.next = 8;
                  return regeneratorRuntime.awrap(self.forEvent(self.tooltip, 'neon-animation-finish', function () {
                    self.fileStorage.lastModified = new Date(0).toUTCString();
                  }, function (element, type, event) {
                    self.tooltipMessage = self.tooltip.textContent.trim();
                    console.log(self.tooltipMessage);
                    return self.tooltipMessage && self.tooltipMessage.match(/^File Not Found for /);
                  }));

                case 8:
                case 'end':
                  return _context50.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context51) {
            while (1) {
              switch (_context51.prev = _context51.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context51.next = 2;
                    break;
                  }

                  return _context51.abrupt('return');

                case 2:
                  if (!(window.location.hostname !== 'localhost')) {
                    _context51.next = 4;
                    break;
                  }

                  return _context51.abrupt('return');

                case 4:
                  assert.isOk(this.tooltipMessage.match(/^File Not Found for /), 'tooltip should be "File Not Found for http..."');

                case 5:
                case 'end':
                  return _context51.stop();
              }
            }
          }, null, this);
        }
      }]);

      return FileStorageWatchingFileTooltip5;
    }(base);
  };
  filestorage.test = function (base) {
    return function (_base24) {
      _inherits(FileStorageBadgeTest, _base24);

      function FileStorageBadgeTest() {
        _classCallCheck(this, FileStorageBadgeTest);

        return _possibleConstructorReturn(this, (FileStorageBadgeTest.__proto__ || Object.getPrototypeOf(FileStorageBadgeTest)).apply(this, arguments));
      }

      _createClass(FileStorageBadgeTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context52) {
            while (1) {
              switch (_context52.prev = _context52.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context52.next = 2;
                    break;
                  }

                  return _context52.abrupt('return');

                case 2:
                  self = this;

                  if (!(window.location.hostname !== 'localhost')) {
                    _context52.next = 5;
                    break;
                  }

                  return _context52.abrupt('return');

                case 5:
                  _context52.next = 7;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return self.fileStorage.badgeLabel === '1';
                  }, 200, 100));

                case 7:
                  _context52.next = 9;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return self.localeIcon.$.badge.label === '16';
                  }, 200, 100));

                case 9:
                case 'end':
                  return _context52.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context53) {
            while (1) {
              switch (_context53.prev = _context53.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context53.next = 2;
                    break;
                  }

                  return _context53.abrupt('return');

                case 2:
                  if (!(window.location.hostname !== 'localhost')) {
                    _context53.next = 4;
                    break;
                  }

                  return _context53.abrupt('return');

                case 4:
                  assert.equal(this.fileStorage.badgeLabel, '1', 'local file storage icon badge label should be "1"');
                  assert.equal(this.fileStorage.badgeColor, 'yellow', 'local file storage icon badge color should be yellow');
                  assert.equal(this.localeIcon.$.badge.label, '16', 'locale icon badge label should be "16"');

                case 7:
                case 'end':
                  return _context53.stop();
              }
            }
          }, null, this);
        }
      }]);

      return FileStorageBadgeTest;
    }(base);
  };
  filestorage.test = {
    // test class mixins
    '': [],
    // test classes
    SelectStorageView: {
      FileStorageSuite: {
        CheckboxTest: {
          FileStorageUnselectedIconTooltipTest: 'UnselectedIconTooltipTest'
        }
      }
    },
    SelectIconView: {
      FileStorageSuite: {
        SelectLocaleIcon: {
          SelectStorageView: {
            MockFileStorageSaveTest: {
              FileStorageSelectedIconTooltipTest: {
                FileStorageLoadTest: 'FileStorageSaveLoadTest; Save to local file, Load from a copy of the saved file (Mock)'
              }
            },
            EnableTimestampPrefix: {
              MockFileStorageSaveTest2: {
                FileStorageLoadTest2: 'FileStorageSaveLoadTest2; Save to prefixed local file, Load from a copy of the saved file (Mock)'
              }
            },
            MockFileStorageUploadTest: {
              FileStorageLoadTest: 'FileStorageUploadLoadTest; Upload local file, Load from a copy of the uploaded file (Mock)'
            },
            FileStorageDropTooltipTest: {
              MockFileStorageDropTest: {
                FileStorageLoadTest: 'FileStorageDropLoadTest; Drop local file, Load from a copy of the dropped file (Mock)'
              }
            },
            FileStorageConfigureWatcher: {
              EnableWatcherCheckbox: {
                MockFileStorageUploadTest: {
                  FileStorageWatchingFileTooltip: {
                    FileStorageWatchingFileTooltip2: {
                      FileStorageBadgeTest: {
                        DisableWatcherCheckbox: 'FileStorageWatcherTest; Watch local file at localhost'
                      }
                    }
                  }
                }
              }
            },
            FileStorageConfigureWatcherError: {
              EnableWatcherCheckbox: {
                MockFileStorageUploadTest: {
                  FileStorageWatchingFileTooltip3: 'FileStorageWatcherUnresponsiveTest; Unresponsive local file watcher'
                }
              }
            },
            FileStorageConfigureWatcherIncompleteXliff: {
              EnableWatcherCheckbox: {
                MockFileStorageUploadTest: {
                  FileStorageWatchingFileTooltip4: 'FileStorageWatcherIncompleteXliffTest; Incomplete local file XLIFF from watcher'
                }
              }
            },
            FileStorageConfigureWatcherFileNotFound: {
              EnableWatcherCheckbox: {
                MockFileStorageUploadTest: {
                  FileStorageWatchingFileTooltip5: 'FileStorageWatcherFileNotFoundTest; File Not Found from local file watcher'
                }
              }
            }
          }
        }
      }
    }
  };
} // filestorage scope