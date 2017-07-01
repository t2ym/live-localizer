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
  // multistorage scope (subscope of filestorage)
  var scope = 'multistorage';
  var multistorage = new Suite(scope, 'live-localizer multistorage tests');
  multistorage.htmlSuite = 'live-localizer-multistorage';
  multistorage.test = Suite.scopes.storageview.classes.SelectStorageView;
  multistorage.test = Suite.scopes.panel.classes.SelectIconView;
  multistorage.test = Suite.scopes.panel.mixins.SelectStorageView;
  multistorage.test = Suite.scopes.browserstorage.mixins.SelectLocaleIcon;
  multistorage.test = Suite.scopes.common.mixins.Reload;
  multistorage.test = Suite.scopes.filestorage.mixins.FileStorageSuite;
  multistorage.test = Suite.scopes.filestorage.mixins.FileStorageConfigureWatcher;
  multistorage.test = Suite.scopes.filestorage.mixins.EnableWatcherCheckbox;
  multistorage.test = Suite.scopes.filestorage.mixins.MockFileStorageUploadTest;
  multistorage.test = Suite.scopes.filestorage.mixins.FileStorageWatchingFileTooltip;
  multistorage.test = Suite.scopes.filestorage.mixins.FileStorageWatchingFileTooltip2;
  multistorage.test = Suite.scopes.filestorage.mixins.DisableWatcherCheckbox;
  multistorage.test = function (base) {
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
                  self.firebaseStorageIcon = Polymer.dom(self.firebaseStorage.root).querySelector('live-localizer-storage-icon');
                  self.firebaseIconTooltip = Polymer.dom(self.storageIcon.root).querySelector('paper-tooltip[for=card]');
                  self.firebaseTooltip = self.firebaseStorage.$.tooltip;
                  self.firebaseCheckboxes = Array.prototype.reduce.call(Polymer.dom(self.firebaseStorage.root).querySelectorAll('paper-checkbox'), function (acc, curr) {
                    acc[curr.textContent.trim()] = curr;return acc;
                  }, {});
                  self.browserTooltip = self.browserStorage.$.tooltip;

                case 7:
                case 'end':
                  return _context2.stop();
              }
            }
          }, null, this);
        }
      }], [{
        key: 'reconnectable',
        get: function get() {
          return false;
        }
      }]);

      return CleanupFirebaseAuthSuite;
    }(base);
  };
  multistorage.test = Suite.scopes.firebasestorage.mixins.SignInAnonymously;
  multistorage.test = Suite.scopes.firebasestorage.mixins.SignOutAnonymousUser;
  multistorage.test = function (base) {
    return function (_base2) {
      _inherits(MultiStorageLabelTest, _base2);

      function MultiStorageLabelTest() {
        _classCallCheck(this, MultiStorageLabelTest);

        return _possibleConstructorReturn(this, (MultiStorageLabelTest.__proto__ || Object.getPrototypeOf(MultiStorageLabelTest)).apply(this, arguments));
      }

      _createClass(MultiStorageLabelTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context3.next = 2;
                    break;
                  }

                  return _context3.abrupt('return');

                case 2:
                  self = this;

                  if (!(window.location.hostname !== 'localhost')) {
                    _context3.next = 5;
                    break;
                  }

                  return _context3.abrupt('return');

                case 5:
                  _context3.next = 7;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return self.fileStorage.badgeLabel === '1';
                  }, 200, 100));

                case 7:
                  _context3.next = 9;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return self.localeIcon.$.badge.label === '16';
                  }, 200, 100));

                case 9:
                  self.firebaseTooltipMessage = '';
                  _context3.next = 12;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return self.firebaseTooltipMessage = self.firebaseTooltip.textContent.trim();
                  }, 100, 200));

                case 12:
                case 'end':
                  return _context3.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context4.next = 2;
                    break;
                  }

                  return _context4.abrupt('return');

                case 2:
                  if (!(window.location.hostname !== 'localhost')) {
                    _context4.next = 4;
                    break;
                  }

                  return _context4.abrupt('return');

                case 4:
                  assert.equal(this.fileStorage.badgeLabel, '1', 'local file storage icon badge label should be "1"');
                  assert.equal(this.fileStorage.badgeColor, 'yellow', 'local file storage icon badge color should be yellow');
                  assert.equal(this.localeIcon.$.badge.label, '16', 'locale icon badge label should be "16"');
                  assert.equal(this.firebaseTooltipMessage, 'Saved XLIFF for de', 'firebase tooltip is "Saved XLIFF for de"');

                case 8:
                case 'end':
                  return _context4.stop();
              }
            }
          }, null, this);
        }
      }]);

      return MultiStorageLabelTest;
    }(base);
  };
  multistorage.test = {
    // test class mixins
    '': [],
    // test classes
    SelectIconView: {
      FileStorageSuite: {
        CleanupFirebaseAuthSuite: {
          SelectLocaleIcon: {
            SelectStorageView: {
              SignInAnonymously: {
                FileStorageConfigureWatcher: {
                  EnableWatcherCheckbox: {
                    MockFileStorageUploadTest: {
                      FileStorageWatchingFileTooltip: {
                        FileStorageWatchingFileTooltip2: {
                          MultiStorageLabelTest: {
                            DisableWatcherCheckbox: {
                              SignOutAnonymousUser: 'MultiStorageAutoSaveTest'
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
} // multistorage scope