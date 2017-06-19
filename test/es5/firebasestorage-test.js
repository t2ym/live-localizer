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
  // firebasestorage scope (subscope of storageview)
  var scope = 'firebasestorage';
  var firebasestorage = new Suite(scope, 'live-localizer firebasestorage tests');
  firebasestorage.htmlSuite = 'live-localizer';
  firebasestorage.test = Suite.scopes.storageview.classes.SelectStorageView;
  firebasestorage.test = Suite.scopes.panel.classes.SelectIconView;
  firebasestorage.test = Suite.scopes.panel.mixins.SelectStorageView;
  firebasestorage.test = Suite.scopes.browserstorage.mixins.SelectLocaleIcon;
  firebasestorage.test = Suite.scopes.common.mixins.Reload;
  firebasestorage.test = function (base) {
    return function (_base) {
      _inherits(CleanupFirebaseAuthSuite, _base);

      function CleanupFirebaseAuthSuite() {
        _classCallCheck(this, CleanupFirebaseAuthSuite);

        return _possibleConstructorReturn(this, (CleanupFirebaseAuthSuite.__proto__ || Object.getPrototypeOf(CleanupFirebaseAuthSuite)).apply(this, arguments));
      }

      _createClass(CleanupFirebaseAuthSuite, [{
        key: 'setup',
        value: function setup() {
          return regeneratorRuntime.async(function setup$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return regeneratorRuntime.awrap(_get(CleanupFirebaseAuthSuite.prototype.__proto__ || Object.getPrototypeOf(CleanupFirebaseAuthSuite.prototype), 'setup', this).call(this));

                case 2:
                  if (!this.hasToSkip) {
                    _context.next = 4;
                    break;
                  }

                  return _context.abrupt('return');

                case 4:
                  this.cleanup();

                case 5:
                case 'end':
                  return _context.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'cleanup',
        value: function cleanup() {
          for (var key in localStorage) {
            if (key.match(/^firebase:/)) {
              localStorage.removeItem(key);
            }
          }
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
                  self.storageIcon = Polymer.dom(self.firebaseStorage.root).querySelector('live-localizer-storage-icon');
                  self.iconTooltip = Polymer.dom(self.storageIcon.root).querySelector('paper-tooltip[for=card]');
                  self.tooltip = self.firebaseStorage.$.tooltip;
                  self.checkboxes = Array.prototype.reduce.call(Polymer.dom(self.firebaseStorage.root).querySelectorAll('paper-checkbox'), function (acc, curr) {
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
          var self, flushEvent, count;
          return regeneratorRuntime.async(function toggleCheckbox$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  self = this;
                  flushEvent = {
                    'Load': 'firebase-storage-settings-flushed',
                    'Save': 'firebase-storage-settings-flushed',
                    'Sign in anonymously': ''
                  }[checkbox.textContent.trim()];

                  if (!flushEvent) {
                    _context3.next = 7;
                    break;
                  }

                  _context3.next = 5;
                  return regeneratorRuntime.awrap(self.forEvent(self.firebaseStorage, flushEvent, function () {
                    MockInteractions.tap(checkbox);
                  }, function (element, type, event) {
                    return true;
                  }));

                case 5:
                  _context3.next = 8;
                  break;

                case 7:
                  MockInteractions.tap(checkbox);

                case 8:
                  count = 1;
                  _context3.next = 11;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return count-- > 0;
                  }, 200, 1));

                case 11:
                case 'end':
                  return _context3.stop();
              }
            }
          }, null, this);
        }
      }]);

      return CleanupFirebaseAuthSuite;
    }(base);
  };
  firebasestorage.test = function (base) {
    return function (_base2) {
      _inherits(InitializeFirebaseStorageTest, _base2);

      function InitializeFirebaseStorageTest() {
        _classCallCheck(this, InitializeFirebaseStorageTest);

        return _possibleConstructorReturn(this, (InitializeFirebaseStorageTest.__proto__ || Object.getPrototypeOf(InitializeFirebaseStorageTest)).apply(this, arguments));
      }

      _createClass(InitializeFirebaseStorageTest, [{
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
                    return self.firebaseStorage.isModelReady;
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
                  assert.isOk(this.firebaseStorage.isModelReady, 'firebaseStorage is initialized');
                  assert.equal(this.firebaseStorage.autoLoad, false, 'autoLoad is false');
                  assert.equal(this.firebaseStorage.autoSave, true, 'autoSave is true');

                case 5:
                case 'end':
                  return _context5.stop();
              }
            }
          }, null, this);
        }
      }]);

      return InitializeFirebaseStorageTest;
    }(base);
  };
  firebasestorage.test = function (base) {
    return function (_base3) {
      _inherits(CheckboxTest, _base3);

      function CheckboxTest() {
        _classCallCheck(this, CheckboxTest);

        return _possibleConstructorReturn(this, (CheckboxTest.__proto__ || Object.getPrototypeOf(CheckboxTest)).apply(this, arguments));
      }

      _createClass(CheckboxTest, [{
        key: 'iteration',
        value: regeneratorRuntime.mark(function iteration() {
          return regeneratorRuntime.wrap(function iteration$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  return _context6.delegateYield([
                  // Initial state: { autoSave: true, autoLoad: false, anonymous: true }
                  { label: 'Sign in anonymously', expected: { autoSave: true, autoLoad: false, anonymous: false } }, { label: 'Save', expected: { autoSave: false, autoLoad: false, anonymous: false } }, { label: 'Load', expected: { autoSave: false, autoLoad: true, anonymous: false } }, { label: 'Save', expected: { autoSave: true, autoLoad: true, anonymous: false } }, { label: 'Sign in anonymously', expected: { autoSave: true, autoLoad: true, anonymous: true } }, { label: 'Load', expected: { autoSave: true, autoLoad: false, anonymous: true } }, { label: 'Load', expected: { autoSave: true, autoLoad: true, anonymous: true } }, { label: 'Save', expected: { autoSave: false, autoLoad: true, anonymous: true } }].map(function (parameters) {
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
                    assert.equal(this.firebaseStorage[prop], parameters.expected[prop], prop + ' is ' + parameters.expected[prop]);
                  }

                case 3:
                case 'end':
                  return _context8.stop();
              }
            }
          }, null, this);
        }
      }]);

      return CheckboxTest;
    }(base);
  };
  firebasestorage.test = function (base) {
    return function (_base4) {
      _inherits(DisableAutoSaveCheckbox, _base4);

      function DisableAutoSaveCheckbox() {
        _classCallCheck(this, DisableAutoSaveCheckbox);

        return _possibleConstructorReturn(this, (DisableAutoSaveCheckbox.__proto__ || Object.getPrototypeOf(DisableAutoSaveCheckbox)).apply(this, arguments));
      }

      _createClass(DisableAutoSaveCheckbox, [{
        key: 'iteration',
        value: regeneratorRuntime.mark(function iteration() {
          return regeneratorRuntime.wrap(function iteration$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  return _context9.delegateYield([{ label: 'Save', expected: { autoSave: false, autoLoad: false } }].map(function (parameters) {
                    parameters.name = parameters.label + ' checkbox is toggled';return parameters;
                  }), 't0', 1);

                case 1:
                case 'end':
                  return _context9.stop();
              }
            }
          }, iteration, this);
        })
      }, {
        key: 'operation',
        value: function operation(parameters) {
          var self;
          return regeneratorRuntime.async(function operation$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context10.next = 2;
                    break;
                  }

                  return _context10.abrupt('return');

                case 2:
                  self = this;
                  _context10.next = 5;
                  return regeneratorRuntime.awrap(self.toggleCheckbox(self.checkboxes[parameters.label]));

                case 5:
                case 'end':
                  return _context10.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint(parameters) {
          var prop;
          return regeneratorRuntime.async(function checkpoint$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context11.next = 2;
                    break;
                  }

                  return _context11.abrupt('return');

                case 2:
                  for (prop in parameters.expected) {
                    assert.equal(this.firebaseStorage[prop], parameters.expected[prop], prop + ' is ' + parameters.expected[prop]);
                  }

                case 3:
                case 'end':
                  return _context11.stop();
              }
            }
          }, null, this);
        }
      }]);

      return DisableAutoSaveCheckbox;
    }(base);
  };
  firebasestorage.test = function (base) {
    return function (_base5) {
      _inherits(EnableAutoLoadCheckbox, _base5);

      function EnableAutoLoadCheckbox() {
        _classCallCheck(this, EnableAutoLoadCheckbox);

        return _possibleConstructorReturn(this, (EnableAutoLoadCheckbox.__proto__ || Object.getPrototypeOf(EnableAutoLoadCheckbox)).apply(this, arguments));
      }

      _createClass(EnableAutoLoadCheckbox, [{
        key: 'iteration',
        value: regeneratorRuntime.mark(function iteration() {
          return regeneratorRuntime.wrap(function iteration$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  return _context12.delegateYield([{ label: 'Load', expected: { autoSave: false, autoLoad: true } }].map(function (parameters) {
                    parameters.name = parameters.label + ' checkbox is toggled';return parameters;
                  }), 't0', 1);

                case 1:
                case 'end':
                  return _context12.stop();
              }
            }
          }, iteration, this);
        })
      }, {
        key: 'operation',
        value: function operation(parameters) {
          var self;
          return regeneratorRuntime.async(function operation$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context13.next = 2;
                    break;
                  }

                  return _context13.abrupt('return');

                case 2:
                  self = this;
                  _context13.next = 5;
                  return regeneratorRuntime.awrap(self.toggleCheckbox(self.checkboxes[parameters.label]));

                case 5:
                case 'end':
                  return _context13.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint(parameters) {
          var prop;
          return regeneratorRuntime.async(function checkpoint$(_context14) {
            while (1) {
              switch (_context14.prev = _context14.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context14.next = 2;
                    break;
                  }

                  return _context14.abrupt('return');

                case 2:
                  for (prop in parameters.expected) {
                    assert.equal(this.firebaseStorage[prop], parameters.expected[prop], prop + ' is ' + parameters.expected[prop]);
                  }

                case 3:
                case 'end':
                  return _context14.stop();
              }
            }
          }, null, this);
        }
      }]);

      return EnableAutoLoadCheckbox;
    }(base);
  };
  firebasestorage.test = function (base) {
    return function (_base6) {
      _inherits(DisableAnonymousCheckbox, _base6);

      function DisableAnonymousCheckbox() {
        _classCallCheck(this, DisableAnonymousCheckbox);

        return _possibleConstructorReturn(this, (DisableAnonymousCheckbox.__proto__ || Object.getPrototypeOf(DisableAnonymousCheckbox)).apply(this, arguments));
      }

      _createClass(DisableAnonymousCheckbox, [{
        key: 'iteration',
        value: regeneratorRuntime.mark(function iteration() {
          return regeneratorRuntime.wrap(function iteration$(_context15) {
            while (1) {
              switch (_context15.prev = _context15.next) {
                case 0:
                  return _context15.delegateYield([{ label: 'Sign in anonymously', expected: { autoSave: true, autoLoad: false, anonymous: false } }].map(function (parameters) {
                    parameters.name = parameters.label + ' checkbox is toggled';return parameters;
                  }), 't0', 1);

                case 1:
                case 'end':
                  return _context15.stop();
              }
            }
          }, iteration, this);
        })
      }, {
        key: 'operation',
        value: function operation(parameters) {
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
                  return regeneratorRuntime.awrap(self.toggleCheckbox(self.checkboxes[parameters.label]));

                case 5:
                case 'end':
                  return _context16.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint(parameters) {
          var prop;
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
                  for (prop in parameters.expected) {
                    assert.equal(this.firebaseStorage[prop], parameters.expected[prop], prop + ' is ' + parameters.expected[prop]);
                  }

                case 3:
                case 'end':
                  return _context17.stop();
              }
            }
          }, null, this);
        }
      }]);

      return DisableAnonymousCheckbox;
    }(base);
  };
  firebasestorage.test = function (base) {
    return function (_base7) {
      _inherits(SignInAnonymously, _base7);

      function SignInAnonymously() {
        _classCallCheck(this, SignInAnonymously);

        return _possibleConstructorReturn(this, (SignInAnonymously.__proto__ || Object.getPrototypeOf(SignInAnonymously)).apply(this, arguments));
      }

      _createClass(SignInAnonymously, [{
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

                  MockInteractions.tap(self.firebaseStorage.$['firebase-storage-icon']);
                  _context18.next = 6;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return self.firebaseStorage.signedIn;
                  }, 200, 120));

                case 6:
                  _context18.next = 8;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return self.firebaseStorage.isSettingsInitialized;
                  }, 200, 120));

                case 8:
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
                  assert.isOk(this.firebaseStorage.signedIn, 'Signed in');
                  assert.isOk(this.firebaseStorage.user, 'user is configured');
                  assert.isOk(this.firebaseStorage.user.isAnonymous, 'user is anonymous');
                  assert.isOk(this.firebaseStorage.isSettingsInitialized, 'settings is initialized');

                case 6:
                case 'end':
                  return _context19.stop();
              }
            }
          }, null, this);
        }
      }]);

      return SignInAnonymously;
    }(base);
  };
  firebasestorage.test = function (base) {
    return function (_base8) {
      _inherits(ShowAuthErrorTooltip, _base8);

      function ShowAuthErrorTooltip() {
        _classCallCheck(this, ShowAuthErrorTooltip);

        return _possibleConstructorReturn(this, (ShowAuthErrorTooltip.__proto__ || Object.getPrototypeOf(ShowAuthErrorTooltip)).apply(this, arguments));
      }

      _createClass(ShowAuthErrorTooltip, [{
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

                  if (HTMLImports.useNative) {
                    self.firebaseStorage.$.auth.fire('error', { code: '12345', message: 'error message body' });
                  } else {
                    // Firefox throws an error on polyfilled dispatchEvent. Resort to call the event handler directly.
                    self.firebaseStorage.showError({ type: 'error', detail: { code: '12345', message: 'error message body' } });
                  }
                  _context20.next = 6;
                  return regeneratorRuntime.awrap(self.forEvent(self.tooltip, 'neon-animation-finish', function () {}, function (element, type, event) {
                    return self.errorTooltipMessage = self.tooltip.textContent.trim();
                  }));

                case 6:
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
                  assert.equal(this.errorTooltipMessage, 'Error: 12345 error message body', 'error tooltip is "Error: 12345 error message body"');

                case 3:
                case 'end':
                  return _context21.stop();
              }
            }
          }, null, this);
        }
      }]);

      return ShowAuthErrorTooltip;
    }(base);
  };
  firebasestorage.test = function (base) {
    return function (_base9) {
      _inherits(EmptyAuthErrorTooltip, _base9);

      function EmptyAuthErrorTooltip() {
        _classCallCheck(this, EmptyAuthErrorTooltip);

        return _possibleConstructorReturn(this, (EmptyAuthErrorTooltip.__proto__ || Object.getPrototypeOf(EmptyAuthErrorTooltip)).apply(this, arguments));
      }

      _createClass(EmptyAuthErrorTooltip, [{
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

                  if (HTMLImports.useNative) {
                    self.firebaseStorage.$.auth.fire('error', { code: '', message: 'error message body' });
                  } else {
                    // Firefox throws an error on polyfilled dispatchEvent. Resort to call the event handler directly.
                    self.firebaseStorage.showError({ type: 'error', detail: { code: '', message: 'error message body' } });
                  }
                  _context22.next = 6;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return !self.firebaseStorage.tooltip;
                  }, 200, 100));

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
                  assert.equal(this.firebaseStorage.tooltip, '', 'error tooltip is empty');

                case 3:
                case 'end':
                  return _context23.stop();
              }
            }
          }, null, this);
        }
      }]);

      return EmptyAuthErrorTooltip;
    }(base);
  };
  firebasestorage.test = function (base) {
    return function (_base10) {
      _inherits(SignOutAnonymousUser, _base10);

      function SignOutAnonymousUser() {
        _classCallCheck(this, SignOutAnonymousUser);

        return _possibleConstructorReturn(this, (SignOutAnonymousUser.__proto__ || Object.getPrototypeOf(SignOutAnonymousUser)).apply(this, arguments));
      }

      _createClass(SignOutAnonymousUser, [{
        key: 'operation',
        value: function operation() {
          var self, count;
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
                  count = 20;
                  _context24.next = 6;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return count-- === 0;
                  }, 100, 20));

                case 6:
                  MockInteractions.tap(self.firebaseStorage.$['firebase-storage-icon']);
                  _context24.next = 9;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return !self.firebaseStorage.signedIn;
                  }, 200, 120));

                case 9:
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
                  assert.isNotOk(this.firebaseStorage.signedIn, 'Signed out');

                case 3:
                case 'end':
                  return _context25.stop();
              }
            }
          }, null, this);
        }
      }]);

      return SignOutAnonymousUser;
    }(base);
  };
  firebasestorage.test = function (base) {
    return function (_base11) {
      _inherits(ConfiguredAutoSaveLoadTest, _base11);

      function ConfiguredAutoSaveLoadTest() {
        _classCallCheck(this, ConfiguredAutoSaveLoadTest);

        return _possibleConstructorReturn(this, (ConfiguredAutoSaveLoadTest.__proto__ || Object.getPrototypeOf(ConfiguredAutoSaveLoadTest)).apply(this, arguments));
      }

      _createClass(ConfiguredAutoSaveLoadTest, [{
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
                    return self.firebaseStorage.isSettingsInitialized;
                  }, 200, 50));

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
                  assert.isOk(this.firebaseStorage.isModelReady, 'firebaseStorage is configured');
                  assert.isOk(this.firebaseStorage.signedIn, 'firebaseStorage is configured');
                  assert.isOk(this.firebaseStorage.user, 'user signed in');
                  assert.isOk(this.firebaseStorage.user.isAnonymous, 'user is anonymous');
                  assert.isOk(this.firebaseStorage.isSettingsInitialized, 'settings is initialized');
                  assert.equal(this.firebaseStorage.autoLoad, true, 'autoLoad is true');
                  assert.equal(this.firebaseStorage.autoSave, false, 'autoSave is false');

                case 9:
                case 'end':
                  return _context27.stop();
              }
            }
          }, null, this);
        }
      }]);

      return ConfiguredAutoSaveLoadTest;
    }(base);
  };
  firebasestorage.test = function (base) {
    return function (_base12) {
      _inherits(ConfiguredAutoSaveLoadCheckboxTest, _base12);

      function ConfiguredAutoSaveLoadCheckboxTest() {
        _classCallCheck(this, ConfiguredAutoSaveLoadCheckboxTest);

        return _possibleConstructorReturn(this, (ConfiguredAutoSaveLoadCheckboxTest.__proto__ || Object.getPrototypeOf(ConfiguredAutoSaveLoadCheckboxTest)).apply(this, arguments));
      }

      _createClass(ConfiguredAutoSaveLoadCheckboxTest, [{
        key: 'iteration',
        value: regeneratorRuntime.mark(function iteration() {
          return regeneratorRuntime.wrap(function iteration$(_context28) {
            while (1) {
              switch (_context28.prev = _context28.next) {
                case 0:
                  return _context28.delegateYield([{ label: 'Save', expected: { autoSave: true, autoLoad: true } }, { label: 'Load', expected: { autoSave: true, autoLoad: false } }].map(function (parameters) {
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
                    assert.equal(this.firebaseStorage[prop], parameters.expected[prop], prop + ' is ' + parameters.expected[prop]);
                  }

                case 3:
                case 'end':
                  return _context30.stop();
              }
            }
          }, null, this);
        }
      }]);

      return ConfiguredAutoSaveLoadCheckboxTest;
    }(base);
  };
  firebasestorage.test = function (base) {
    return function (_base13) {
      _inherits(FirebaseStorageSignedOutAnonymousIconTooltipTest, _base13);

      function FirebaseStorageSignedOutAnonymousIconTooltipTest() {
        _classCallCheck(this, FirebaseStorageSignedOutAnonymousIconTooltipTest);

        return _possibleConstructorReturn(this, (FirebaseStorageSignedOutAnonymousIconTooltipTest.__proto__ || Object.getPrototypeOf(FirebaseStorageSignedOutAnonymousIconTooltipTest)).apply(this, arguments));
      }

      _createClass(FirebaseStorageSignedOutAnonymousIconTooltipTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context31) {
            while (1) {
              switch (_context31.prev = _context31.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context31.next = 2;
                    break;
                  }

                  return _context31.abrupt('return');

                case 2:
                  self = this;
                  _context31.next = 5;
                  return regeneratorRuntime.awrap(self.showTooltip(self.storageIcon.$.card, self.iconTooltip));

                case 5:
                case 'end':
                  return _context31.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context32) {
            while (1) {
              switch (_context32.prev = _context32.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context32.next = 2;
                    break;
                  }

                  return _context32.abrupt('return');

                case 2:
                  assert.equal(this.iconTooltip.getAttribute('for'), 'card', 'paper-tooltip should be for card');
                  assert.equal(this.iconTooltip.textContent.trim(), 'Sign in anonymously', 'tooltip should be "Sign in anonymously"');

                case 4:
                case 'end':
                  return _context32.stop();
              }
            }
          }, null, this);
        }
      }]);

      return FirebaseStorageSignedOutAnonymousIconTooltipTest;
    }(base);
  };
  firebasestorage.test = function (base) {
    return function (_base14) {
      _inherits(FirebaseStorageSignedInAnonymousIconTooltipTest, _base14);

      function FirebaseStorageSignedInAnonymousIconTooltipTest() {
        _classCallCheck(this, FirebaseStorageSignedInAnonymousIconTooltipTest);

        return _possibleConstructorReturn(this, (FirebaseStorageSignedInAnonymousIconTooltipTest.__proto__ || Object.getPrototypeOf(FirebaseStorageSignedInAnonymousIconTooltipTest)).apply(this, arguments));
      }

      _createClass(FirebaseStorageSignedInAnonymousIconTooltipTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context33) {
            while (1) {
              switch (_context33.prev = _context33.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context33.next = 2;
                    break;
                  }

                  return _context33.abrupt('return');

                case 2:
                  self = this;
                  _context33.next = 5;
                  return regeneratorRuntime.awrap(self.showTooltip(self.storageIcon.$.card, self.iconTooltip));

                case 5:
                case 'end':
                  return _context33.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context34) {
            while (1) {
              switch (_context34.prev = _context34.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context34.next = 2;
                    break;
                  }

                  return _context34.abrupt('return');

                case 2:
                  assert.equal(this.iconTooltip.getAttribute('for'), 'card', 'paper-tooltip should be for card');
                  assert.equal(this.iconTooltip.textContent.trim(), 'Click to Sign out', 'tooltip should be "Click to Sign out"');

                case 4:
                case 'end':
                  return _context34.stop();
              }
            }
          }, null, this);
        }
      }]);

      return FirebaseStorageSignedInAnonymousIconTooltipTest;
    }(base);
  };
  firebasestorage.test = function (base) {
    return function (_base15) {
      _inherits(FirebaseStorageSignedInAnonymousUserTooltipTest, _base15);

      function FirebaseStorageSignedInAnonymousUserTooltipTest() {
        _classCallCheck(this, FirebaseStorageSignedInAnonymousUserTooltipTest);

        return _possibleConstructorReturn(this, (FirebaseStorageSignedInAnonymousUserTooltipTest.__proto__ || Object.getPrototypeOf(FirebaseStorageSignedInAnonymousUserTooltipTest)).apply(this, arguments));
      }

      _createClass(FirebaseStorageSignedInAnonymousUserTooltipTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context35) {
            while (1) {
              switch (_context35.prev = _context35.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context35.next = 2;
                    break;
                  }

                  return _context35.abrupt('return');

                case 2:
                  self = this;

                  self.userTooltip = self.firebaseStorage.$.usertooltip;
                  _context35.next = 6;
                  return regeneratorRuntime.awrap(self.showTooltip(self.firebaseStorage.$.user, self.userTooltip));

                case 6:
                case 'end':
                  return _context35.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context36) {
            while (1) {
              switch (_context36.prev = _context36.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context36.next = 2;
                    break;
                  }

                  return _context36.abrupt('return');

                case 2:
                  assert.equal(this.userTooltip.getAttribute('for'), 'user', 'paper-tooltip should be for user');
                  assert.equal(this.userTooltip.textContent.trim(), 'Storage will be lost on sign out', 'tooltip should be "Storage will be lost on sign out"');

                case 4:
                case 'end':
                  return _context36.stop();
              }
            }
          }, null, this);
        }
      }]);

      return FirebaseStorageSignedInAnonymousUserTooltipTest;
    }(base);
  };
  firebasestorage.test = function (base) {
    return function (_base16) {
      _inherits(FirebaseStorageIneffectiveSaveTest, _base16);

      function FirebaseStorageIneffectiveSaveTest() {
        _classCallCheck(this, FirebaseStorageIneffectiveSaveTest);

        return _possibleConstructorReturn(this, (FirebaseStorageIneffectiveSaveTest.__proto__ || Object.getPrototypeOf(FirebaseStorageIneffectiveSaveTest)).apply(this, arguments));
      }

      _createClass(FirebaseStorageIneffectiveSaveTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context37) {
            while (1) {
              switch (_context37.prev = _context37.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context37.next = 2;
                    break;
                  }

                  return _context37.abrupt('return');

                case 2:
                  self = this;
                  _context37.next = 5;
                  return regeneratorRuntime.awrap(self.dragDrop(self.localeIcon, self.storageIcon, 0, -120, 'drop', 'drag-and-drop'));

                case 5:
                case 'end':
                  return _context37.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context38) {
            while (1) {
              switch (_context38.prev = _context38.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context38.next = 2;
                    break;
                  }

                  return _context38.abrupt('return');

                case 2:
                  assert.equal(this.dragDropEvent.detail.src, this.localeIcon, 'drag source is locale icon');
                  assert.equal(this.dragDropEvent.detail.dest, this.storageIcon, 'drag destination is firebase storage icon');
                  assert.isNotOk(this.storageIcon.selected, 'storage icon is not selected');

                case 5:
                case 'end':
                  return _context38.stop();
              }
            }
          }, null, this);
        }
      }]);

      return FirebaseStorageIneffectiveSaveTest;
    }(base);
  };
  firebasestorage.test = function (base) {
    return function (_base17) {
      _inherits(FirebaseStorageDefaultLangIneffectiveSaveTest, _base17);

      function FirebaseStorageDefaultLangIneffectiveSaveTest() {
        _classCallCheck(this, FirebaseStorageDefaultLangIneffectiveSaveTest);

        return _possibleConstructorReturn(this, (FirebaseStorageDefaultLangIneffectiveSaveTest.__proto__ || Object.getPrototypeOf(FirebaseStorageDefaultLangIneffectiveSaveTest)).apply(this, arguments));
      }

      _createClass(FirebaseStorageDefaultLangIneffectiveSaveTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context39) {
            while (1) {
              switch (_context39.prev = _context39.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context39.next = 2;
                    break;
                  }

                  return _context39.abrupt('return');

                case 2:
                  self = this;
                  _context39.next = 5;
                  return regeneratorRuntime.awrap(self.dragDrop(self.localeIcon, self.storageIcon, 0, -120, 'drop', 'drag-and-drop'));

                case 5:
                case 'end':
                  return _context39.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context40) {
            while (1) {
              switch (_context40.prev = _context40.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context40.next = 2;
                    break;
                  }

                  return _context40.abrupt('return');

                case 2:
                  assert.equal(this.dragDropEvent.detail.src, this.localeIcon, 'drag source is locale icon');
                  assert.equal(this.dragDropEvent.detail.dest, this.storageIcon, 'drag destination is firebase storage icon');
                  assert.isOk(this.storageIcon.selected, 'storage icon is selected');
                  assert.equal(this.firebaseStorage.$.tooltip.textContent.trim(), '', 'tooltip should be empty');

                case 6:
                case 'end':
                  return _context40.stop();
              }
            }
          }, null, this);
        }
      }]);

      return FirebaseStorageDefaultLangIneffectiveSaveTest;
    }(base);
  };
  firebasestorage.test = function (base) {
    return function (_base18) {
      _inherits(FirebaseStorageSignedOutDragTest, _base18);

      function FirebaseStorageSignedOutDragTest() {
        _classCallCheck(this, FirebaseStorageSignedOutDragTest);

        return _possibleConstructorReturn(this, (FirebaseStorageSignedOutDragTest.__proto__ || Object.getPrototypeOf(FirebaseStorageSignedOutDragTest)).apply(this, arguments));
      }

      _createClass(FirebaseStorageSignedOutDragTest, [{
        key: 'operation',
        value: function operation() {
          var self, count;
          return regeneratorRuntime.async(function operation$(_context41) {
            while (1) {
              switch (_context41.prev = _context41.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context41.next = 2;
                    break;
                  }

                  return _context41.abrupt('return');

                case 2:
                  self = this;
                  _context41.next = 5;
                  return regeneratorRuntime.awrap(self.dragDrop(self.storageIcon, self.localeIcon, 0, 120, 'noop'));

                case 5:
                  count = 10;
                  _context41.next = 8;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return count++ >= 10;
                  }, 100, 20));

                case 8:
                case 'end':
                  return _context41.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context42) {
            while (1) {
              switch (_context42.prev = _context42.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context42.next = 2;
                    break;
                  }

                  return _context42.abrupt('return');

                case 2:
                  assert.isNotOk(this.dragDropEvent, 'no drag and drop event');

                case 3:
                case 'end':
                  return _context42.stop();
              }
            }
          }, null, this);
        }
      }]);

      return FirebaseStorageSignedOutDragTest;
    }(base);
  };
  firebasestorage.test = function (base) {
    return function (_base19) {
      _inherits(FirebaseStorageIneffectiveSaveTest2, _base19);

      function FirebaseStorageIneffectiveSaveTest2() {
        _classCallCheck(this, FirebaseStorageIneffectiveSaveTest2);

        return _possibleConstructorReturn(this, (FirebaseStorageIneffectiveSaveTest2.__proto__ || Object.getPrototypeOf(FirebaseStorageIneffectiveSaveTest2)).apply(this, arguments));
      }

      _createClass(FirebaseStorageIneffectiveSaveTest2, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context43) {
            while (1) {
              switch (_context43.prev = _context43.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context43.next = 2;
                    break;
                  }

                  return _context43.abrupt('return');

                case 2:
                  self = this;
                  _context43.next = 5;
                  return regeneratorRuntime.awrap(self.dragDrop(self.localeIcon, self.storageIcon, 150, -150, 'release', 'neon-animation-finish'));

                case 5:
                case 'end':
                  return _context43.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context44) {
            while (1) {
              switch (_context44.prev = _context44.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context44.next = 2;
                    break;
                  }

                  return _context44.abrupt('return');

                case 2:
                  assert.isNotOk(this.storageIcon.selected, 'storage icon is not selected');

                case 3:
                case 'end':
                  return _context44.stop();
              }
            }
          }, null, this);
        }
      }]);

      return FirebaseStorageIneffectiveSaveTest2;
    }(base);
  };
  firebasestorage.test = function (base) {
    return function (_base20) {
      _inherits(FirebaseStorageSaveTest, _base20);

      function FirebaseStorageSaveTest() {
        _classCallCheck(this, FirebaseStorageSaveTest);

        return _possibleConstructorReturn(this, (FirebaseStorageSaveTest.__proto__ || Object.getPrototypeOf(FirebaseStorageSaveTest)).apply(this, arguments));
      }

      _createClass(FirebaseStorageSaveTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context45) {
            while (1) {
              switch (_context45.prev = _context45.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context45.next = 2;
                    break;
                  }

                  return _context45.abrupt('return');

                case 2:
                  self = this;

                  self.tooltipMessage = '';
                  _context45.next = 6;
                  return regeneratorRuntime.awrap(self.dragDrop(self.localeIcon, self.storageIcon, 0, -120, 'drop', 'neon-animation-finish', self.tooltip, self.tooltipMessageGetter));

                case 6:
                case 'end':
                  return _context45.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context46) {
            while (1) {
              switch (_context46.prev = _context46.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context46.next = 2;
                    break;
                  }

                  return _context46.abrupt('return');

                case 2:
                  assert.equal(this.dragDropEvent.detail.src, this.localeIcon, 'drag source is locale icon');
                  assert.equal(this.dragDropEvent.detail.dest, this.storageIcon, 'drag destination is firebase storage icon');
                  assert.equal(this.tooltipMessage, 'Saved XLIFF for de', 'tooltip is "Saved XLIFF for de"');

                case 5:
                case 'end':
                  return _context46.stop();
              }
            }
          }, null, this);
        }
      }]);

      return FirebaseStorageSaveTest;
    }(base);
  };
  firebasestorage.test = function (base) {
    return function (_base21) {
      _inherits(FirebaseStorageSelectedIconTooltipTest, _base21);

      function FirebaseStorageSelectedIconTooltipTest() {
        _classCallCheck(this, FirebaseStorageSelectedIconTooltipTest);

        return _possibleConstructorReturn(this, (FirebaseStorageSelectedIconTooltipTest.__proto__ || Object.getPrototypeOf(FirebaseStorageSelectedIconTooltipTest)).apply(this, arguments));
      }

      _createClass(FirebaseStorageSelectedIconTooltipTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context47) {
            while (1) {
              switch (_context47.prev = _context47.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context47.next = 2;
                    break;
                  }

                  return _context47.abrupt('return');

                case 2:
                  self = this;
                  _context47.next = 5;
                  return regeneratorRuntime.awrap(self.showTooltip(self.storageIcon.$.card, self.iconTooltip));

                case 5:
                case 'end':
                  return _context47.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context48) {
            while (1) {
              switch (_context48.prev = _context48.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context48.next = 2;
                    break;
                  }

                  return _context48.abrupt('return');

                case 2:
                  assert.equal(this.iconTooltip.getAttribute('for'), 'card', 'paper-tooltip should be for card');
                  assert.equal(this.iconTooltip.textContent.trim(), 'Drag to Load Click to Sign out', 'tooltip should be "Drag to Load Click to Sign out"');

                case 4:
                case 'end':
                  return _context48.stop();
              }
            }
          }, null, this);
        }
      }]);

      return FirebaseStorageSelectedIconTooltipTest;
    }(base);
  };
  firebasestorage.test = function (base) {
    return function (_base22) {
      _inherits(FirebaseStorageInit, _base22);

      function FirebaseStorageInit() {
        _classCallCheck(this, FirebaseStorageInit);

        return _possibleConstructorReturn(this, (FirebaseStorageInit.__proto__ || Object.getPrototypeOf(FirebaseStorageInit)).apply(this, arguments));
      }

      _createClass(FirebaseStorageInit, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context49) {
            while (1) {
              switch (_context49.prev = _context49.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context49.next = 2;
                    break;
                  }

                  return _context49.abrupt('return');

                case 2:
                  self = this;
                  _context49.next = 5;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return self.firebaseStorage.isSettingsInitialized;
                  }, 200, 40));

                case 5:
                case 'end':
                  return _context49.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context50) {
            while (1) {
              switch (_context50.prev = _context50.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context50.next = 2;
                    break;
                  }

                  return _context50.abrupt('return');

                case 2:
                  assert.isOk(this.firebaseStorage.isSettingsInitialized, 'settings is initialized');

                case 3:
                case 'end':
                  return _context50.stop();
              }
            }
          }, null, this);
        }
      }]);

      return FirebaseStorageInit;
    }(base);
  };
  firebasestorage.test = function (base) {
    return function (_base23) {
      _inherits(FirebaseStorageLoadTest, _base23);

      function FirebaseStorageLoadTest() {
        _classCallCheck(this, FirebaseStorageLoadTest);

        return _possibleConstructorReturn(this, (FirebaseStorageLoadTest.__proto__ || Object.getPrototypeOf(FirebaseStorageLoadTest)).apply(this, arguments));
      }

      _createClass(FirebaseStorageLoadTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context51) {
            while (1) {
              switch (_context51.prev = _context51.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context51.next = 2;
                    break;
                  }

                  return _context51.abrupt('return');

                case 2:
                  self = this;
                  _context51.next = 5;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    console.log(self.firebaseStorage.label);return self.firebaseStorage.label === 'bundle.de.xlf';
                  }, 200, 200));

                case 5:
                  self.tooltipMessage = '';
                  _context51.next = 8;
                  return regeneratorRuntime.awrap(self.dragDrop(self.storageIcon, self.localeIcon, 0, 120, 'drop', 'neon-animation-finish', self.tooltip, function (element, type, event) {
                    var message = self.tooltip.textContent.trim();
                    if (self.tooltipMessage) {
                      return !message;
                    } else {
                      self.tooltipMessage = message;
                      return false;
                    }
                  }));

                case 8:
                  _context51.next = 10;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    console.log(self.dragDropEvent);return self.dragDropEvent;
                  }, 200, 150));

                case 10:
                case 'end':
                  return _context51.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context52) {
            while (1) {
              switch (_context52.prev = _context52.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context52.next = 2;
                    break;
                  }

                  return _context52.abrupt('return');

                case 2:
                  assert.equal(this.dragDropEvent.detail.src, this.storageIcon, 'drag source is firebase storage icon');
                  assert.equal(this.dragDropEvent.detail.dest, this.localeIcon, 'drag destination is locale icon');
                  assert.equal(this.tooltipMessage, 'Loaded XLIFF for de', 'tooltip is "Loaded XLIFF for de"');

                case 5:
                case 'end':
                  return _context52.stop();
              }
            }
          }, null, this);
        }
      }]);

      return FirebaseStorageLoadTest;
    }(base);
  };
  firebasestorage.test = function (base) {
    return function (_base24) {
      _inherits(MockSignInTest, _base24);

      function MockSignInTest() {
        _classCallCheck(this, MockSignInTest);

        return _possibleConstructorReturn(this, (MockSignInTest.__proto__ || Object.getPrototypeOf(MockSignInTest)).apply(this, arguments));
      }

      _createClass(MockSignInTest, [{
        key: 'iteration',
        value: regeneratorRuntime.mark(function iteration() {
          return regeneratorRuntime.wrap(function iteration$(_context53) {
            while (1) {
              switch (_context53.prev = _context53.next) {
                case 0:
                  return _context53.delegateYield([{
                    authProvider: 'google',
                    expected: {
                      iconTooltip: 'Sign in with Google',
                      userLabel: 'mockuser@gmail.com',
                      userTooltip: 'Signed in with Google',
                      userIcon: 'favicon_google:google'
                    }
                  }, {
                    authProvider: 'twitter',
                    expected: {
                      iconTooltip: 'Sign in with Twitter',
                      userLabel: '@mockuser',
                      userTooltip: 'Signed in with Twitter',
                      userIcon: 'twitter_icon:twitter'
                    }
                  }, {
                    authProvider: 'github',
                    expected: {
                      iconTooltip: 'Sign in with GitHub',
                      userLabel: 'mockuser@gmail.com',
                      userTooltip: 'Signed in with GitHub',
                      userIcon: 'github_icon:github'
                    }
                  }, {
                    authProvider: 'facebook',
                    expected: {
                      iconTooltip: 'Sign in with Facebook',
                      userLabel: 'mockuser@gmail.com',
                      userTooltip: 'Signed in with Facebook',
                      userIcon: 'account_avatar:profile'
                    }
                  }].map(function (parameters) {
                    parameters.name = 'Sign in with ' + parameters.authProvider;return parameters;
                  }), 't0', 1);

                case 1:
                case 'end':
                  return _context53.stop();
              }
            }
          }, iteration, this);
        })
      }, {
        key: 'operation',
        value: function operation(parameters) {
          var self, count;
          return regeneratorRuntime.async(function operation$(_context55) {
            while (1) {
              switch (_context55.prev = _context55.next) {
                case 0:
                  self = this;

                  self.mockStorage = self.firebaseStorage;
                  self.mockAuth = self.mockStorage.$.auth;
                  self.mockAuth.signInWithPopup = function _callee(authProvider) {
                    var user, prop;
                    return regeneratorRuntime.async(function _callee$(_context54) {
                      while (1) {
                        switch (_context54.prev = _context54.next) {
                          case 0:
                            _context54.next = 2;
                            return regeneratorRuntime.awrap(self.mockAuth.signInAnonymously());

                          case 2:
                            _context54.next = 4;
                            return regeneratorRuntime.awrap(self.checkInterval(function () {
                              return self.mockStorage.isSettingsInitialized;
                            }, 200, 100));

                          case 4:
                            user = {
                              email: 'mockuser@gmail.com',
                              displayName: 'mockuser',
                              isAnonymous: false
                            };
                            _context54.t0 = regeneratorRuntime.keys(self.mockStorage.user);

                          case 6:
                            if ((_context54.t1 = _context54.t0()).done) {
                              _context54.next = 16;
                              break;
                            }

                            prop = _context54.t1.value;
                            _context54.t2 = prop;
                            _context54.next = _context54.t2 === 'email' ? 11 : _context54.t2 === 'displayName' ? 11 : _context54.t2 === 'isAnonymous' ? 11 : 12;
                            break;

                          case 11:
                            return _context54.abrupt('break', 14);

                          case 12:
                            user[prop] = self.mockStorage.user[prop];
                            return _context54.abrupt('break', 14);

                          case 14:
                            _context54.next = 6;
                            break;

                          case 16:
                            self.mockStorage._user = self.mockStorage.user;
                            self.mockStorage.user = user;
                            self.mockStorage.anonymous = false;
                            self.setMockUser = true;

                          case 20:
                          case 'end':
                            return _context54.stop();
                        }
                      }
                    }, null, this);
                  };
                  self.setMockUser = false;
                  self.mockStorage.anonymous = false;
                  self.mockStorage.authProvider = parameters.authProvider;
                  _context55.next = 9;
                  return regeneratorRuntime.awrap(self.showTooltip(self.storageIcon.$.card, self.iconTooltip));

                case 9:
                  self.iconTooltipMessage = self.iconTooltip.textContent.trim();
                  MockInteractions.tap(self.storageIcon);
                  _context55.next = 13;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return self.mockStorage.isSettingsInitialized;
                  }, 200, 100));

                case 13:
                  _context55.next = 15;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return self.mockStorage.signedIn;
                  }, 200, 100));

                case 15:
                  _context55.next = 17;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return self.setMockUser;
                  }, 200, 100));

                case 17:
                  self.userLabel = self.mockStorage.$.user.textContent.trim();
                  self.userIcon = Polymer.dom(self.mockStorage.$.user).querySelector('iron-icon').icon;
                  _context55.next = 21;
                  return regeneratorRuntime.awrap(self.showTooltip(self.mockStorage.$.user, self.mockStorage.$.usertooltip));

                case 21:
                  self.userTooltipMessage = self.mockStorage.$.usertooltip.textContent.trim();
                  _context55.next = 24;
                  return regeneratorRuntime.awrap(self.forEvent(self.mockStorage.$.usertooltip, 'neon-animation-finish', function () {}, function (element, type, event) {
                    return true;
                  }));

                case 24:
                  self.mockStorage.user = self.mockStorage._user;
                  count = 20;
                  _context55.next = 28;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return count-- === 0;
                  }, 100, 20));

                case 28:
                  MockInteractions.tap(self.storageIcon);
                  _context55.next = 31;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return !self.mockStorage.signedIn;
                  }, 200, 100));

                case 31:
                case 'end':
                  return _context55.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint(parameters) {
          return regeneratorRuntime.async(function checkpoint$(_context56) {
            while (1) {
              switch (_context56.prev = _context56.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context56.next = 2;
                    break;
                  }

                  return _context56.abrupt('return');

                case 2:
                  assert.equal(this.iconTooltipMessage, parameters.expected.iconTooltip, 'tooltip should be "' + parameters.expected.iconTooltip + '"');
                  assert.equal(this.userLabel, parameters.expected.userLabel, 'user label should be "' + parameters.expected.userLabel + '"');
                  assert.equal(this.userTooltipMessage, parameters.expected.userTooltip, 'user tooltip should be "' + parameters.expected.userTooltip + '"');
                  assert.equal(this.userIcon, parameters.expected.userIcon, 'user icon should be "' + parameters.expected.userIcon + '"');

                case 6:
                case 'end':
                  return _context56.stop();
              }
            }
          }, null, this);
        }
      }]);

      return MockSignInTest;
    }(base);
  };
  firebasestorage.test = {
    // test class mixins
    '': [],
    // test classes
    SelectStorageView: {
      CleanupFirebaseAuthSuite: {
        InitializeFirebaseStorageTest: {
          CheckboxTest: {
            SignInAnonymously: {
              Reload: {
                ConfiguredAutoSaveLoadTest: {
                  FirebaseStorageSignedInAnonymousIconTooltipTest: {
                    FirebaseStorageSignedInAnonymousUserTooltipTest: {
                      FirebaseStorageDefaultLangIneffectiveSaveTest: {
                        ConfiguredAutoSaveLoadCheckboxTest: {
                          SignOutAnonymousUser: 'ConfiguredAutoSaveLoadCheckboxTest_phase_1; Sign in anonymously, Reload, Toggle checkboxes, Sign out'
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          FirebaseStorageSignedOutAnonymousIconTooltipTest: 'SignedOutAnonymousIconTooltipTest',
          FirebaseStorageIneffectiveSaveTest: 'IneffectiveSaveTest',
          DisableAnonymousCheckbox: {
            MockSignInTest: 'SignInWithMockAuthProviderTest; Sign in with auth providers (Mock)'
          },
          ShowAuthErrorTooltip: 'ShowAuthErrorTooltipTest; Show auth error tooltip message (Mock)',
          EmptyAuthErrorTooltip: 'EmptyAuthErrorTooltipTest; Empty auth error tooltip message (Mock)'
        }
      }
    },
    SelectIconView: {
      CleanupFirebaseAuthSuite: {
        InitializeFirebaseStorageTest: {
          SelectLocaleIcon: {
            SelectStorageView: {
              FirebaseStorageSignedOutDragTest: {
                FirebaseStorageIneffectiveSaveTest2: {
                  SignInAnonymously: {
                    FirebaseStorageSaveTest: {
                      Reload: {
                        FirebaseStorageSelectedIconTooltipTest: {
                          DisableAutoSaveCheckbox: {
                            EnableAutoLoadCheckbox: {
                              Reload: {
                                FirebaseStorageInit: {
                                  FirebaseStorageLoadTest: {
                                    SignOutAnonymousUser: 'SaveReloadLoadTest_phase_2; Sign in anonymously, Save, Reload, Load, Sign out'
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
} // firebasestorage scope