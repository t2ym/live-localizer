var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  // common scope
  var scope = 'common';
  var common = new Suite(scope, 'live-localizer common scope');
  common.htmlSuite = '*'; // Only inherited scopes are executed
  // common test classes
  common.test = function (_Suite) {
    _inherits(LiveLocalizerSuite, _Suite);

    function LiveLocalizerSuite() {
      _classCallCheck(this, LiveLocalizerSuite);

      return _possibleConstructorReturn(this, (LiveLocalizerSuite.__proto__ || Object.getPrototypeOf(LiveLocalizerSuite)).apply(this, arguments));
    }

    _createClass(LiveLocalizerSuite, [{
      key: 'stepPhase',
      value: function stepPhase() {
        this.phase = typeof this.phase === 'number' ? this.phase + 1 : 1;
      }
      // TODO: Can setup be converted to operation?

    }, {
      key: 'setup',
      value: function setup() {
        return regeneratorRuntime.async(function setup$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return regeneratorRuntime.awrap(_get(LiveLocalizerSuite.prototype.__proto__ || Object.getPrototypeOf(LiveLocalizerSuite.prototype), 'setup', this).call(this));

              case 2:
                this.fixture = document.querySelector(this.target);

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: 'teardown',
      value: function teardown() {
        var self;
        return regeneratorRuntime.async(function teardown$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                self = this;
                _context2.next = 3;
                return regeneratorRuntime.awrap(_get(LiveLocalizerSuite.prototype.__proto__ || Object.getPrototypeOf(LiveLocalizerSuite.prototype), 'teardown', this).call(this));

              case 3:
                self.fixture.restore();

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, null, this);
      }
      /* async */
    }, {
      key: 'checkInterval',
      value: function checkInterval(condition, interval, maxCount) {
        return new Promise(function (resolve, reject) {
          if (condition()) {
            resolve();
          } else {
            var count = 0;
            var intervalId = setInterval(function () {
              if (condition()) {
                clearInterval(intervalId);
                resolve();
              } else if (++count >= maxCount) {
                clearInterval(intervalId);
                reject(new Error('condition = ' + condition.toString() + ' count = ' + count + ' maxCount = ' + maxCount));
              }
            }, interval);
          }
        });
      }
    }, {
      key: 'showTooltip',
      value: function showTooltip(tooltipFor, tooltip) {
        var self, mouseEventInit;
        return regeneratorRuntime.async(function showTooltip$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                self = this;
                mouseEventInit = {
                  bubbles: false,
                  cancelable: true,
                  clientX: 0,
                  clientY: 0,
                  buttons: 1
                };
                _context3.next = 4;
                return regeneratorRuntime.awrap(self.forEvent(tooltip, 'neon-animation-finish', function () {
                  tooltipFor.dispatchEvent(new MouseEvent('mouseenter', mouseEventInit));
                }, function (element, type, event) {
                  tooltipFor.dispatchEvent(new MouseEvent('mouseleave', mouseEventInit));
                  return true;
                }));

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: 'dragDrop',
      value: function dragDrop(src, dest, dx, dy, action, waitFor, eventTarget, eventCondition) {
        var self, mouseEventInit, onDragAndDrop, step, steps;
        return regeneratorRuntime.async(function dragDrop$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                self = this;
                mouseEventInit = {
                  bubbles: false,
                  cancelable: true,
                  clientX: 0,
                  clientY: 0,
                  buttons: 1
                };

                self.dragDropEvent = null;

                onDragAndDrop = function onDragAndDrop(e) {
                  self.dragDropEvent = e;
                  console.log('self.dragDropEvent = ', e);
                  src.removeEventListener('drag-and-drop', onDragAndDrop);
                };

                _context4.t0 = action;
                _context4.next = _context4.t0 === 'release' ? 7 : _context4.t0 === 'drop' ? 8 : 8;
                break;

              case 7:
                return _context4.abrupt('break', 10);

              case 8:
                src.addEventListener('drag-and-drop', onDragAndDrop);
                return _context4.abrupt('break', 10);

              case 10:
                src.dispatchEvent(new MouseEvent('mouseover', mouseEventInit));
                step = 0;
                steps = void 0;
                _context4.t1 = action;
                _context4.next = _context4.t1 === 'noop' ? 16 : _context4.t1 === 'release' ? 18 : _context4.t1 === 'drop' ? 20 : 20;
                break;

              case 16:
                steps = [];
                return _context4.abrupt('break', 22);

              case 18:
                steps = [['mouseenter'], ['mouseout', 'mouseleave']];
                return _context4.abrupt('break', 22);

              case 20:
                steps = [['mouseenter'], ['mouseup']];
                return _context4.abrupt('break', 22);

              case 22:
                _context4.next = 24;
                return regeneratorRuntime.awrap(self.forEvent(src, 'track', function () {
                  MockInteractions.track(src, dx, dy);
                }, function (element, type, event) {
                  if (event.detail.state !== 'end') {
                    if (step < steps.length) {
                      steps[step].forEach(function (event) {
                        dest.dispatchEvent(new MouseEvent(event, mouseEventInit));
                      });
                      step++;
                    }
                  }
                  return event.detail.state === 'end';
                }));

              case 24:
                _context4.t2 = waitFor;
                _context4.next = _context4.t2 === 'drag-and-drop' ? 27 : _context4.t2 === 'neon-animation-finish' ? 27 : _context4.t2 === 'load-xliff' ? 27 : 30;
                break;

              case 27:
                _context4.next = 29;
                return regeneratorRuntime.awrap(self.forEvent(eventTarget || src, waitFor, function () {}, eventCondition || function (element, type, event) {
                  return true;
                }));

              case 29:
                return _context4.abrupt('break', 31);

              case 30:
                return _context4.abrupt('break', 31);

              case 31:
              case 'end':
                return _context4.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: 'currentPhase',
      get: function get() {
        this.href = this.href || window.location.href;
        var match = this.href.match(/^[^#]*#TestSuites=[^&]*&Scope=[a-zA-Z0-9_-]*&Phase=([0-9]*).*$/);
        return match ? Number.parseInt(match[1]) : 0;
      }
    }, {
      key: 'operationPhase',
      get: function get() {
        return typeof this.phase === 'number' ? this.phase : 0;
      }
    }, {
      key: 'hasToSkip',
      get: function get() {
        return this.currentPhase !== this.operationPhase;
      }
    }, {
      key: 'tooltipMessageGetter',
      get: function get() {
        var self = this;
        return function (element, type, event) {
          var message = self.tooltip.textContent.trim();
          if (self.tooltipMessage) {
            return !message;
          } else {
            self.tooltipMessage = message;
            return false;
          }
        };
      }
    }], [{
      key: 'reconnectable',
      get: function get() {
        return false;
      }
    }]);

    return LiveLocalizerSuite;
  }(Suite);
  common.test = function (base) {
    return function (_base) {
      _inherits(InstantiateTest, _base);

      function InstantiateTest() {
        _classCallCheck(this, InstantiateTest);

        return _possibleConstructorReturn(this, (InstantiateTest.__proto__ || Object.getPrototypeOf(InstantiateTest)).apply(this, arguments));
      }

      _createClass(InstantiateTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  self = this;

                  this.fixture.create();
                  self.element = self.fixture.querySelector('live-localizer');
                  _context5.next = 5;
                  return regeneratorRuntime.awrap(self.forEvent(self.element, 'bundle-set-fetched'));

                case 5:
                  self.main = Polymer.dom(self.element.root).querySelector('live-localizer-main');
                  self.fab = Polymer.dom(self.main.root).querySelector('live-localizer-fab');
                  self.dialog = Polymer.dom(self.main.root).querySelector('live-localizer-dialog');
                  self.panel = Polymer.dom(self.main.root).querySelector('live-localizer-panel');
                  self.model = Polymer.dom(self.panel.root).querySelector('live-localizer-model');
                  self.iconView = Polymer.dom(self.panel.root).querySelector('live-localizer-locale-icon-view');
                  self.listView = Polymer.dom(self.panel.root).querySelector('live-localizer-list-view');
                  self.storageView = Polymer.dom(self.panel.root).querySelector('live-localizer-storage-view');
                  self.browserStorage = self.storageView.$['browser-storage'];
                  self.firebaseStorage = self.storageView.queryEffectiveChildren('live-localizer-firebase-storage#firebase-storage');
                  self.fileStorage = self.storageView.$['file-storage'];

                case 16:
                case 'end':
                  return _context5.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          var self;
          return regeneratorRuntime.async(function checkpoint$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  self = this;
                  // element existence

                  assert.isOk(self.element, 'live-localizer exists');
                  assert.isOk(self.main, 'live-localizer-main exists');
                  assert.isOk(self.fab, 'live-localizer-fab exists');
                  assert.isOk(self.dialog, 'live-localizer-dialog exists');
                  assert.isOk(self.panel, 'live-localizer-panel exists');
                  assert.isOk(self.model, 'live-localizer-model exists');
                  assert.isOk(self.iconView, 'live-localizer-locale-icon-view exists');
                  assert.isOk(self.listView, 'live-localizer-list-view exists');
                  assert.isOk(self.storageView, 'live-localizer-storage-view exists');
                  // elements are instantiated
                  assert.equal(self.element.is, 'live-localizer');
                  assert.equal(self.main.is, 'live-localizer-main');
                  assert.equal(self.fab.is, 'live-localizer-fab');
                  assert.equal(self.dialog.is, 'live-localizer-dialog');
                  assert.equal(self.panel.is, 'live-localizer-panel');
                  assert.equal(self.model.is, 'live-localizer-model');
                  assert.equal(self.iconView.is, 'live-localizer-locale-icon-view');
                  assert.equal(self.listView.is, 'live-localizer-list-view');
                  assert.equal(self.storageView.is, 'live-localizer-storage-view');
                  assert.equal(self.browserStorage.is, 'live-localizer-browser-storage');
                  assert.equal(self.firebaseStorage.is, 'live-localizer-firebase-storage');
                  assert.equal(self.fileStorage.is, 'live-localizer-local-file-storage');

                case 22:
                case 'end':
                  return _context6.stop();
              }
            }
          }, null, this);
        }
      }]);

      return InstantiateTest;
    }(base);
  };
  common.test = function (base) {
    return function (_base2) {
      _inherits(Reload, _base2);

      function Reload() {
        _classCallCheck(this, Reload);

        return _possibleConstructorReturn(this, (Reload.__proto__ || Object.getPrototypeOf(Reload)).apply(this, arguments));
      }

      _createClass(Reload, [{
        key: 'operation',
        value: function operation() {
          return regeneratorRuntime.async(function operation$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  this.stepPhase();

                case 1:
                case 'end':
                  return _context7.stop();
              }
            }
          }, null, this);
        }
      }]);

      return Reload;
    }(base);
  };
  common.test = {
    LiveLocalizerSuite: {
      InstantiateTest: ''
    }
  };
} // common scope