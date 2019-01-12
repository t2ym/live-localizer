/**
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';

import 'scenarist/Suite.min.js';
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
        var count, _count;

        return regeneratorRuntime.async(function setup$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return regeneratorRuntime.awrap(_get(LiveLocalizerSuite.prototype.__proto__ || Object.getPrototypeOf(LiveLocalizerSuite.prototype), 'setup', this).call(this));

              case 2:
                if (HTMLImports.useNative) {
                  _context.next = 6;
                  break;
                }

                count = 1;
                _context.next = 6;
                return regeneratorRuntime.awrap(this.checkInterval(function () {
                  return count-- === 0;
                }, 100, 2));

              case 6:
                this.fixture = document.querySelector(this.target);

                if (HTMLImports.useNative) {
                  _context.next = 11;
                  break;
                }

                _count = 1;
                _context.next = 11;
                return regeneratorRuntime.awrap(this.checkInterval(function () {
                  return _count-- === 0;
                }, 100, 2));

              case 11:
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
        return true;
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
                  self.main = dom(self.element.root).querySelector('live-localizer-main');
                  self.fab = dom(self.main.root).querySelector('live-localizer-fab');
                  self.dialog = dom(self.main.root).querySelector('live-localizer-dialog');
                  self.panel = dom(self.main.root).querySelector('live-localizer-panel');
                  self.model = dom(self.panel.root).querySelector('live-localizer-model');
                  self.iconView = dom(self.panel.root).querySelector('live-localizer-locale-icon-view');
                  self.listView = dom(self.panel.root).querySelector('live-localizer-list-view');
                  self.storageView = dom(self.panel.root).querySelector('live-localizer-storage-view');
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
                  if (self.firebaseStorage) {
                    assert.equal(self.firebaseStorage.is, 'live-localizer-firebase-storage');
                  }
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
      }], [{
        key: 'reconnectable',
        get: function get() {
          return false;
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
} // common scopevar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  // dialog scope
  var scope = 'dialog';
  var dialog = new Suite(scope, 'live-localizer dialog and fab tests');
  dialog.htmlSuite = 'live-localizer-lazy';
  dialog.test = Suite.scopes.common.classes.LiveLocalizerSuite;
  dialog.test = Suite.scopes.common.classes.InstantiateTest;
  dialog.test = function (base) {
    return function (_base) {
      _inherits(OpenDialogTest, _base);

      function OpenDialogTest() {
        _classCallCheck(this, OpenDialogTest);

        return _possibleConstructorReturn(this, (OpenDialogTest.__proto__ || Object.getPrototypeOf(OpenDialogTest)).apply(this, arguments));
      }

      _createClass(OpenDialogTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  self = this;
                  _context.next = 3;
                  return regeneratorRuntime.awrap(self.forEvent(self.dialog, 'neon-animation-finish', function () {
                    MockInteractions.tap(self.fab);
                  }, true));

                case 3:
                case 'end':
                  return _context.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          var self;
          return regeneratorRuntime.async(function checkpoint$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  self = this;

                  assert.isOk(self.dialog.opened, 'dialog is opened');
                  assert.isNotOk(self.fab.opened, 'fab is not opened');
                  // store dialog coordinates
                  self.origin = {};
                  ['x', 'y', 'width', 'height'].forEach(function (prop) {
                    self.origin[prop] = self.dialog[prop];
                  });

                case 5:
                case 'end':
                  return _context2.stop();
              }
            }
          }, null, this);
        }
      }]);

      return OpenDialogTest;
    }(base);
  };
  dialog.test = function (base) {
    return function (_base2) {
      _inherits(DragDialogTest, _base2);

      function DragDialogTest() {
        _classCallCheck(this, DragDialogTest);

        return _possibleConstructorReturn(this, (DragDialogTest.__proto__ || Object.getPrototypeOf(DragDialogTest)).apply(this, arguments));
      }

      _createClass(DragDialogTest, [{
        key: 'iteration',
        value: regeneratorRuntime.mark(function iteration() {
          var dx, dy;
          return regeneratorRuntime.wrap(function iteration$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  dx = 10;
                  dy = 10;
                  return _context3.delegateYield([{ mode: 'position', dx: dx, dy: dy, expected: { x: dx, y: dy, width: 0, height: 0 } }, { mode: 'upper-left', dx: -dx, dy: -dy, expected: { x: -dx, y: -dy, width: dx, height: dy } }, { mode: 'upper', dx: -dx, dy: -dy, expected: { x: 0, y: -dy, width: 0, height: dy } }, { mode: 'upper-right', dx: dx, dy: -dy, expected: { x: 0, y: -dy, width: dx, height: dy } }, { mode: 'middle-left', dx: -dx, dy: dy, expected: { x: -dx, y: 0, width: dx, height: 0 } }, { mode: 'middle-right', dx: dx, dy: dy, expected: { x: 0, y: 0, width: dx, height: 0 } }, { mode: 'lower-left', dx: -dx, dy: dy, expected: { x: -dx, y: 0, width: dx, height: dy } }, { mode: 'lower', dx: dx, dy: dy, expected: { x: 0, y: 0, width: 0, height: dy } }, { mode: 'lower-right', dx: dx, dy: dy, expected: { x: 0, y: 0, width: dx, height: dy } }, { mode: '.title-pad', dx: dx, dy: dy, expected: { x: 0, y: 0, width: 0, height: 0 } }].map(function (parameters) {
                    parameters.name = 'drag dialog by ' + parameters.mode + ' handle';return parameters;
                  }), 't0', 3);

                case 3:
                case 'end':
                  return _context3.stop();
              }
            }
          }, iteration, this);
        })
      }, {
        key: 'operation',
        value: function operation(parameters) {
          var self, handle;
          return regeneratorRuntime.async(function operation$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  self = this;
                  handle = self.dialog.$.handle.querySelector(parameters.mode.match(/^[.]/) ? parameters.mode : '[drag-handle-mode=' + parameters.mode + ']');

                  self.origin = {};
                  ['x', 'y', 'width', 'height'].forEach(function (prop) {
                    self.origin[prop] = self.dialog[prop];
                  });
                  handle.dispatchEvent(new MouseEvent('mouseover', {
                    bubbles: true,
                    cancelable: true,
                    clientX: 0,
                    clientY: 0,
                    buttons: 1
                  }));
                  _context4.next = 7;
                  return regeneratorRuntime.awrap(self.forEvent(self.dialog, 'track', function () {
                    MockInteractions.track(self.dialog, parameters.dx, parameters.dy);
                  }, function (element, type, event) {
                    return event.detail.state === 'end';
                  }));

                case 7:
                case 'end':
                  return _context4.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint(parameters) {
          var prop;
          return regeneratorRuntime.async(function checkpoint$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  for (prop in parameters.expected) {
                    assert.equal(this.dialog[prop], this.origin[prop] + parameters.expected[prop], 'dialog is dragged with ' + parameters.mode + ' handle by ' + parameters.expected[prop] + ' in ' + prop);
                  }

                case 1:
                case 'end':
                  return _context5.stop();
              }
            }
          }, null, this);
        }
      }]);

      return DragDialogTest;
    }(base);
  };
  dialog.test = function (base) {
    return function (_base3) {
      _inherits(DragFabTest, _base3);

      function DragFabTest() {
        _classCallCheck(this, DragFabTest);

        return _possibleConstructorReturn(this, (DragFabTest.__proto__ || Object.getPrototypeOf(DragFabTest)).apply(this, arguments));
      }

      _createClass(DragFabTest, [{
        key: 'iteration',
        value: regeneratorRuntime.mark(function iteration() {
          var dx, dy;
          return regeneratorRuntime.wrap(function iteration$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  dx = 10;
                  dy = 10;
                  return _context6.delegateYield([{ mode: 'position', dx: dx, dy: dy, expected: { x: dx, y: dy, width: 0, height: 0 } }], 't0', 3);

                case 3:
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
                  self = this;

                  self.origin = {};
                  ['x', 'y', 'width', 'height'].forEach(function (prop) {
                    self.origin[prop] = self.fab[prop];
                  });
                  self.fab.dispatchEvent(new MouseEvent('mouseover', {
                    bubbles: true,
                    cancelable: true,
                    clientX: 0,
                    clientY: 0,
                    buttons: 1
                  }));
                  _context7.next = 6;
                  return regeneratorRuntime.awrap(self.forEvent(self.fab, 'track', function () {
                    MockInteractions.track(self.fab, parameters.dx, parameters.dy);
                  }, function (element, type, event) {
                    return event.detail.state === 'end';
                  }));

                case 6:
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
                  for (prop in parameters.expected) {
                    assert.equal(this.fab[prop], this.origin[prop] + parameters.expected[prop], 'fab is dragged with ' + parameters.mode + ' handle by ' + parameters.expected[prop] + ' in ' + prop);
                  }

                case 1:
                case 'end':
                  return _context8.stop();
              }
            }
          }, null, this);
        }
      }]);

      return DragFabTest;
    }(base);
  };
  dialog.test = function (base) {
    return function (_base4) {
      _inherits(MaximizeDialogTest, _base4);

      function MaximizeDialogTest() {
        _classCallCheck(this, MaximizeDialogTest);

        return _possibleConstructorReturn(this, (MaximizeDialogTest.__proto__ || Object.getPrototypeOf(MaximizeDialogTest)).apply(this, arguments));
      }

      _createClass(MaximizeDialogTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  self = this;
                  _context9.next = 3;
                  return regeneratorRuntime.awrap(self.forEvent(self.dialog, 'height-changed', function () {
                    MockInteractions.tap(self.dialog.$.fullscreen);
                  }, true));

                case 3:
                  window.dispatchEvent(new MouseEvent('resize', {
                    bubbles: true,
                    cancelable: true,
                    clientX: 0,
                    clientY: 0,
                    buttons: 1
                  }));

                case 4:
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
                  assert.isOk(this.dialog.opened, 'dialog is opened');
                  assert.isOk(this.dialog.fullscreen, 'dialog is in fullscreen');

                case 2:
                case 'end':
                  return _context10.stop();
              }
            }
          }, null, this);
        }
      }]);

      return MaximizeDialogTest;
    }(base);
  };
  dialog.test = function (base) {
    return function (_base5) {
      _inherits(UnmaximizeDialogTest, _base5);

      function UnmaximizeDialogTest() {
        _classCallCheck(this, UnmaximizeDialogTest);

        return _possibleConstructorReturn(this, (UnmaximizeDialogTest.__proto__ || Object.getPrototypeOf(UnmaximizeDialogTest)).apply(this, arguments));
      }

      _createClass(UnmaximizeDialogTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  self = this;
                  _context11.next = 3;
                  return regeneratorRuntime.awrap(self.forEvent(self.dialog, 'height-changed', function () {
                    MockInteractions.tap(self.dialog.$['fullscreen-exit']);
                  }, true));

                case 3:
                case 'end':
                  return _context11.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  assert.isOk(this.dialog.opened, 'dialog is opened');
                  assert.isNotOk(this.dialog.fullscreen, 'dialog is not in fullscreen');

                case 2:
                case 'end':
                  return _context12.stop();
              }
            }
          }, null, this);
        }
      }]);

      return UnmaximizeDialogTest;
    }(base);
  };
  dialog.test = function (base) {
    return function (_base6) {
      _inherits(ResetDialogPositionTest, _base6);

      function ResetDialogPositionTest() {
        _classCallCheck(this, ResetDialogPositionTest);

        return _possibleConstructorReturn(this, (ResetDialogPositionTest.__proto__ || Object.getPrototypeOf(ResetDialogPositionTest)).apply(this, arguments));
      }

      _createClass(ResetDialogPositionTest, [{
        key: 'iteration',
        value: regeneratorRuntime.mark(function iteration() {
          return regeneratorRuntime.wrap(function iteration$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  return _context13.delegateYield([{ name: 'reset fully overlapping dialog', x: -100, y: -100, width: 10000, height: 10000 }, { name: 'reset patially overlapping dialog', x: window.innerWidth / 2, y: window.innerHeight / 2, width: window.innerWidth * 0.75, height: window.innerHeight * 0.75 }], 't0', 1);

                case 1:
                case 'end':
                  return _context13.stop();
              }
            }
          }, iteration, this);
        })
      }, {
        key: 'operation',
        value: function operation(dimension) {
          var self;
          return regeneratorRuntime.async(function operation$(_context14) {
            while (1) {
              switch (_context14.prev = _context14.next) {
                case 0:
                  self = this;

                  self.dialog.x = dimension.x;
                  self.dialog.y = dimension.y;
                  self.dialog.width = dimension.width;
                  self.dialog.height = dimension.height;
                  _context14.next = 7;
                  return regeneratorRuntime.awrap(self.forEvent(self.dialog, 'resize', function () {
                    self.dialog.fire('resize');
                  }, true));

                case 7:
                case 'end':
                  return _context14.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint(dimension) {
          var self;
          return regeneratorRuntime.async(function checkpoint$(_context15) {
            while (1) {
              switch (_context15.prev = _context15.next) {
                case 0:
                  self = this;

                  assert.isOk(self.dialog.x >= 0, 'x is non-negative');
                  assert.isOk(self.dialog.y >= 0, 'y is non-negative');
                  assert.isOk(self.dialog.width <= window.innerWidth, 'width is within innerWidth');
                  assert.isOk(self.dialog.height <= window.innerHeight, 'height is within innerHeight');
                  ['x', 'y', 'width', 'height'].forEach(function (prop) {
                    self.dialog[prop] = self.origin[prop];
                  });

                case 6:
                case 'end':
                  return _context15.stop();
              }
            }
          }, null, this);
        }
      }]);

      return ResetDialogPositionTest;
    }(base);
  };
  dialog.test = function (base) {
    return function (_base7) {
      _inherits(ResetFabPositionTest, _base7);

      function ResetFabPositionTest() {
        _classCallCheck(this, ResetFabPositionTest);

        return _possibleConstructorReturn(this, (ResetFabPositionTest.__proto__ || Object.getPrototypeOf(ResetFabPositionTest)).apply(this, arguments));
      }

      _createClass(ResetFabPositionTest, [{
        key: 'iteration',
        value: regeneratorRuntime.mark(function iteration() {
          return regeneratorRuntime.wrap(function iteration$(_context16) {
            while (1) {
              switch (_context16.prev = _context16.next) {
                case 0:
                  return _context16.delegateYield([{ name: 'reset fab position from bottom left', x: -100, y: window.innerHeight + 100 }, { name: 'reset fab position from top right', x: window.innerWidth + 100, y: -100 }], 't0', 1);

                case 1:
                case 'end':
                  return _context16.stop();
              }
            }
          }, iteration, this);
        })
      }, {
        key: 'operation',
        value: function operation(dimension) {
          var self;
          return regeneratorRuntime.async(function operation$(_context17) {
            while (1) {
              switch (_context17.prev = _context17.next) {
                case 0:
                  self = this;

                  self.fab.x = dimension.x;
                  self.fab.y = dimension.y;
                  _context17.next = 5;
                  return regeneratorRuntime.awrap(self.forEvent(self.fab, 'resize', function () {
                    self.fab.fire('resize');
                  }, true));

                case 5:
                case 'end':
                  return _context17.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint(dimension) {
          var self;
          return regeneratorRuntime.async(function checkpoint$(_context18) {
            while (1) {
              switch (_context18.prev = _context18.next) {
                case 0:
                  self = this;

                  assert.isOk(self.fab.x >= 0, 'x is non-negative');
                  assert.isOk(self.fab.y >= 0, 'y is non-negative');
                  assert.isOk(self.fab.x + 56 <= window.innerWidth, 'width is within innerWidth');
                  assert.isOk(self.fab.y + 56 <= window.innerHeight, 'height is within innerHeight');
                  self.fab.reset = false;
                  self.fab.resetPosition();

                case 7:
                case 'end':
                  return _context18.stop();
              }
            }
          }, null, this);
        }
      }]);

      return ResetFabPositionTest;
    }(base);
  };
  dialog.test = function (base) {
    return function (_base8) {
      _inherits(CloseDialogTest, _base8);

      function CloseDialogTest() {
        _classCallCheck(this, CloseDialogTest);

        return _possibleConstructorReturn(this, (CloseDialogTest.__proto__ || Object.getPrototypeOf(CloseDialogTest)).apply(this, arguments));
      }

      _createClass(CloseDialogTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context19) {
            while (1) {
              switch (_context19.prev = _context19.next) {
                case 0:
                  self = this;
                  _context19.next = 3;
                  return regeneratorRuntime.awrap(self.forEvent(self.fab, 'neon-animation-finish', function () {
                    MockInteractions.tap(self.dialog.$.close);
                  }, true));

                case 3:
                case 'end':
                  return _context19.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context20) {
            while (1) {
              switch (_context20.prev = _context20.next) {
                case 0:
                  assert.isNotOk(this.dialog.opened, 'dialog is not opened');
                  assert.isOk(this.fab.opened, 'fab is opened');

                case 2:
                case 'end':
                  return _context20.stop();
              }
            }
          }, null, this);
        }
      }]);

      return CloseDialogTest;
    }(base);
  };
  dialog.test = function (base) {
    return function (_base9) {
      _inherits(ReattachTest, _base9);

      function ReattachTest() {
        _classCallCheck(this, ReattachTest);

        return _possibleConstructorReturn(this, (ReattachTest.__proto__ || Object.getPrototypeOf(ReattachTest)).apply(this, arguments));
      }

      _createClass(ReattachTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context21) {
            while (1) {
              switch (_context21.prev = _context21.next) {
                case 0:
                  self = this;

                  self.parent = self.element.parentNode;
                  self.parent.removeChild(self.element);
                  self.parent.appendChild(self.element);

                case 4:
                case 'end':
                  return _context21.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context22) {
            while (1) {
              switch (_context22.prev = _context22.next) {
                case 0:
                  assert.equal(this.element.parentNode, this.parent, 'element is reattached');

                case 1:
                case 'end':
                  return _context22.stop();
              }
            }
          }, null, this);
        }
      }]);

      return ReattachTest;
    }(base);
  };
  dialog.test = function (base) {
    return function (_base10) {
      _inherits(LoadFailureTest, _base10);

      function LoadFailureTest() {
        _classCallCheck(this, LoadFailureTest);

        return _possibleConstructorReturn(this, (LoadFailureTest.__proto__ || Object.getPrototypeOf(LoadFailureTest)).apply(this, arguments));
      }

      _createClass(LoadFailureTest, [{
        key: 'operation',
        value: function operation() {
          var self, mainLink;
          return regeneratorRuntime.async(function operation$(_context23) {
            while (1) {
              switch (_context23.prev = _context23.next) {
                case 0:
                  self = this;
                  mainLink = Array.prototype.filter.call(document.querySelectorAll('link[rel=import]'), function (link) {
                    return link.href.match(/live-localizer-lazy[.]html/);
                  });

                  this.fixture.create();
                  self.element = self.fixture.querySelector('live-localizer');

                  if (!(mainLink.length === 1)) {
                    _context23.next = 10;
                    break;
                  }

                  self.lazy = true;
                  _context23.next = 8;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    var lazyLinks = Array.prototype.filter.call(document.querySelectorAll('link[rel=import][async]'), function (link) {
                      return link.href.match(/live-localizer-main[.]html/);
                    });
                    if (lazyLinks.length === 1) {
                      lazyLinks[0].dispatchEvent(new Event('error'));
                      return true;
                    } else {
                      return false;
                    }
                  }, 1, 2000));

                case 8:
                  _context23.next = 12;
                  break;

                case 10:
                  _context23.next = 12;
                  return regeneratorRuntime.awrap(self.forEvent(self.element, 'bundle-set-fetched'));

                case 12:
                  self.main = dom(self.element.root).querySelector('live-localizer-main');

                case 13:
                case 'end':
                  return _context23.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          var self;
          return regeneratorRuntime.async(function checkpoint$(_context24) {
            while (1) {
              switch (_context24.prev = _context24.next) {
                case 0:
                  self = this;
                  // element existence

                  assert.isOk(self.element, 'live-localizer exists');
                  assert.isOk(self.main, 'live-localizer-main exists');
                  if (self.lazy) {
                    assert.isNotOk(self.main.is, 'live-localizer-main is not imported');
                  } else {
                    assert.equal(self.main.is, 'live-localizer-main', 'live-localizer-main is instantiated');
                  }

                case 4:
                case 'end':
                  return _context24.stop();
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

      return LoadFailureTest;
    }(base);
  };
  dialog.test = {
    // test class mixins
    '': [],
    // test classes
    InstantiateTest: {
      OpenDialogTest: '',
      DragFabTest: {
        OpenDialogTest: 'DragFabAndOpenDialogTest'
      },
      ResetFabPositionTest: '',
      ReattachTest: ''
    },
    OpenDialogTest: {
      CloseDialogTest: 'OpenAndCloseDialogTest',
      DragDialogTest: {
        CloseDialogTest: 'OpenAndDragAndCloseDialogTest'
      },
      MaximizeDialogTest: {
        UnmaximizeDialogTest: {
          DragDialogTest: {
            CloseDialogTest: 'MaxUnmaxDragCloseDialogTest'
          }
        }
      },
      ResetDialogPositionTest: ''
    },
    MaxUnmaxDragCloseDialogTest: {
      DragFabTest: 'MaxUnmaxDragCloseDialogAndDragFabTest'
    },
    LiveLocalizerSuite: {
      LoadFailureTest: 'LazyLoadFailureTest'
    }
  };
} // dialog scopevar _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  // panel scope (subscope of dialog)
  var scope = 'panel';
  var panel = new Suite(scope, 'live-localizer panel tests');
  panel.htmlSuite = 'live-localizer';
  panel.test = Suite.scopes.common.mixins.Reload;
  panel.test = Suite.scopes.common.classes.InstantiateTest;
  panel.test = Suite.scopes.dialog.classes.OpenDialogTest;
  panel.test = function (base) {
    return function (_base) {
      _inherits(PanelTooltipTest, _base);

      function PanelTooltipTest() {
        _classCallCheck(this, PanelTooltipTest);

        return _possibleConstructorReturn(this, (PanelTooltipTest.__proto__ || Object.getPrototypeOf(PanelTooltipTest)).apply(this, arguments));
      }

      _createClass(PanelTooltipTest, [{
        key: 'iteration',
        value: regeneratorRuntime.mark(function iteration() {
          return regeneratorRuntime.wrap(function iteration$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  return _context.delegateYield([{ button: 'iconview-button', tooltip: 'Show Icons' }, { button: 'listview-button', tooltip: 'Show List' }, { button: 'storageview-button', tooltip: 'Show Storage' }, { button: 'load', tooltip: 'Load XLIFF' }, { button: 'locales', tooltip: 'Check Updates on Locales' }, { button: 'reload', tooltip: 'Reload App', serverUpdated: true }].map(function (parameters) {
                    parameters.name = 'tooltip for ' + parameters.button + ' button is "' + parameters.tooltip + '"';return parameters;
                  }), 't0', 1);

                case 1:
                case 'end':
                  return _context.stop();
              }
            }
          }, iteration, this);
        })
      }, {
        key: 'operation',
        value: function operation(parameters) {
          var self, button;
          return regeneratorRuntime.async(function operation$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  self = this;

                  if (!parameters.serverUpdated) {
                    _context2.next = 4;
                    break;
                  }

                  _context2.next = 4;
                  return regeneratorRuntime.awrap(self.forEvent(self.panel, 'dom-change', function () {
                    self.panel.serverUpdated = true;
                  }, function (element, type, event) {
                    return !!dom(self.panel.root).querySelector('paper-icon-button#reload');
                  }));

                case 4:
                  button = self.panel.$[parameters.button] || dom(self.panel.root).querySelector('#' + parameters.button);

                  self.tooltip = dom(self.panel.root).querySelector('paper-tooltip[for=' + parameters.button + ']');
                  _context2.next = 8;
                  return regeneratorRuntime.awrap(self.showTooltip(button, self.tooltip));

                case 8:
                case 'end':
                  return _context2.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint(parameters) {
          return regeneratorRuntime.async(function checkpoint$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  assert.equal(this.tooltip.getAttribute('for'), parameters.button, 'paper-tooltip should be for ' + parameters.button);
                  assert.equal(this.tooltip.textContent.trim(), parameters.tooltip, 'tooltip should be "' + parameters.tooltip + '"');

                case 2:
                case 'end':
                  return _context3.stop();
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

      return PanelTooltipTest;
    }(base);
  };
  // Must be after PanelTooltipTest
  panel.test = function (base) {
    return function (_base2) {
      _inherits(ReloadTooltipTest, _base2);

      function ReloadTooltipTest() {
        _classCallCheck(this, ReloadTooltipTest);

        return _possibleConstructorReturn(this, (ReloadTooltipTest.__proto__ || Object.getPrototypeOf(ReloadTooltipTest)).apply(this, arguments));
      }

      _createClass(ReloadTooltipTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  self = this;

                  self.tooltip = dom(self.panel.root).querySelector('paper-tooltip#updated');

                case 2:
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
                  assert.equal(this.tooltip.getAttribute('for'), 'panelarea', 'paper-tooltip should be for panelarea');
                  assert.equal(this.tooltip.textContent.trim(), 'App has been updated at server', 'tooltip should be "App has been updated at server"');

                case 2:
                case 'end':
                  return _context5.stop();
              }
            }
          }, null, this);
        }
      }]);

      return ReloadTooltipTest;
    }(base);
  };
  panel.test = function (base) {
    return function (_base3) {
      _inherits(ModelAlertTest, _base3);

      function ModelAlertTest() {
        _classCallCheck(this, ModelAlertTest);

        return _possibleConstructorReturn(this, (ModelAlertTest.__proto__ || Object.getPrototypeOf(ModelAlertTest)).apply(this, arguments));
      }

      _createClass(ModelAlertTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  self = this;

                  self.tooltip = dom(self.panel.root).querySelector('paper-tooltip#alert');
                  _context6.next = 4;
                  return regeneratorRuntime.awrap(self.forEvent(self.tooltip, 'neon-animation-finish', function () {
                    self.model.checkXliffConvVersion(undefined);
                  }, function (element, type, event) {
                    self.tooltip = dom(event).rootTarget;
                    return self.tooltip.is === 'paper-tooltip' && self.tooltip.for === 'panelarea';
                  }));

                case 4:
                case 'end':
                  return _context6.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  assert.equal(this.tooltip.getAttribute('for'), 'panelarea', 'paper-tooltip should be for panelarea');
                  assert.equal(this.tooltip.textContent.trim(), 'Incompatible xliff-conv with no version information', 'tooltip should be "Incompatible xliff-conv with no version information"');

                case 2:
                case 'end':
                  return _context7.stop();
              }
            }
          }, null, this);
        }
      }]);

      return ModelAlertTest;
    }(base);
  };
  panel.test = function (base) {
    return function (_base4) {
      _inherits(PanelViewTest, _base4);

      function PanelViewTest() {
        _classCallCheck(this, PanelViewTest);

        return _possibleConstructorReturn(this, (PanelViewTest.__proto__ || Object.getPrototypeOf(PanelViewTest)).apply(this, arguments));
      }

      _createClass(PanelViewTest, [{
        key: 'iteration',
        value: regeneratorRuntime.mark(function iteration() {
          return regeneratorRuntime.wrap(function iteration$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  return _context8.delegateYield([{ button: 'listview-button', view: 'listview' }, { button: 'detailview-button', view: 'detailview', missing: true }, { button: 'storageview-button', view: 'storageview' }, { button: 'iconview-button', view: 'iconview' }].map(function (parameters) {
                    parameters.name = 'view for ' + parameters.button + ' is ' + parameters.view + ' and ' + (parameters.missing ? 'missing' : 'shown');return parameters;
                  }), 't0', 1);

                case 1:
                case 'end':
                  return _context8.stop();
              }
            }
          }, iteration, this);
        })
      }, {
        key: 'operation',
        value: function operation(parameters) {
          var self, button;
          return regeneratorRuntime.async(function operation$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  self = this;
                  button = self.panel.$[parameters.button];

                  self.pages = dom(self.panel.$.panelarea).querySelector('iron-pages.panel-selector');

                  if (!parameters.missing) {
                    _context9.next = 8;
                    break;
                  }

                  _context9.next = 6;
                  return regeneratorRuntime.awrap(self.forEvent(self.pages, 'iron-deselect', function () {
                    MockInteractions.tap(button);
                  }, function (element, type, event) {
                    return self.pages.selected === parameters.view;
                  }));

                case 6:
                  _context9.next = 10;
                  break;

                case 8:
                  _context9.next = 10;
                  return regeneratorRuntime.awrap(self.forEvent(self.pages, 'iron-select', function () {
                    MockInteractions.tap(button);
                  }, function (element, type, event) {
                    return self.pages.selected === parameters.view;
                  }));

                case 10:
                case 'end':
                  return _context9.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint(parameters) {
          var selectedViews;
          return regeneratorRuntime.async(function checkpoint$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  assert.equal(this.pages.selected, parameters.view, parameters.view + ' is selected by ' + parameters.button);
                  selectedViews = dom(this.pages).querySelectorAll('.iron-selected');

                  if (parameters.missing) {
                    assert.equal(selectedViews.length, 0, 'No selected view for ' + parameters.view);
                  } else {
                    assert.equal(selectedViews.length, 1, 'Only 1 selected view for ' + parameters.view);
                    assert.equal(selectedViews[0].getAttribute('name'), parameters.view, parameters.view + ' is selected');
                  }

                case 3:
                case 'end':
                  return _context10.stop();
              }
            }
          }, null, this);
        }
      }]);

      return PanelViewTest;
    }(base);
  };
  panel.test = function (base) {
    return function (_base5) {
      _inherits(SelectIconView, _base5);

      function SelectIconView() {
        _classCallCheck(this, SelectIconView);

        return _possibleConstructorReturn(this, (SelectIconView.__proto__ || Object.getPrototypeOf(SelectIconView)).apply(this, arguments));
      }

      _createClass(SelectIconView, [{
        key: 'operation',
        value: function operation() {
          var self, button;
          return regeneratorRuntime.async(function operation$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  self = this;
                  button = self.panel.$['iconview-button'];

                  self.pages = dom(self.panel.$.panelarea).querySelector('iron-pages.panel-selector');

                  if (!(self.pages.selected !== 'iconview')) {
                    _context11.next = 6;
                    break;
                  }

                  _context11.next = 6;
                  return regeneratorRuntime.awrap(self.forEvent(self.pages, 'iron-select', function () {
                    MockInteractions.tap(button);
                  }, function (element, type, event) {
                    return self.pages.selected === 'iconview';
                  }));

                case 6:
                case 'end':
                  return _context11.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  assert.equal(dom(this.pages).querySelector('.iron-selected').getAttribute('name'), 'iconview', 'iconview is shown');

                case 1:
                case 'end':
                  return _context12.stop();
              }
            }
          }, null, this);
        }
      }]);

      return SelectIconView;
    }(base);
  };
  panel.test = function (base) {
    return function (_base6) {
      _inherits(SelectListView, _base6);

      function SelectListView() {
        _classCallCheck(this, SelectListView);

        return _possibleConstructorReturn(this, (SelectListView.__proto__ || Object.getPrototypeOf(SelectListView)).apply(this, arguments));
      }

      _createClass(SelectListView, [{
        key: 'operation',
        value: function operation() {
          var self, button;
          return regeneratorRuntime.async(function operation$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  self = this;
                  button = self.panel.$['listview-button'];

                  self.pages = dom(self.panel.$.panelarea).querySelector('iron-pages.panel-selector');

                  if (!(self.pages.selected !== 'listview')) {
                    _context13.next = 6;
                    break;
                  }

                  _context13.next = 6;
                  return regeneratorRuntime.awrap(self.forEvent(self.pages, 'iron-select', function () {
                    MockInteractions.tap(button);
                  }, function (element, type, event) {
                    return self.pages.selected === 'listview';
                  }));

                case 6:
                case 'end':
                  return _context13.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context14) {
            while (1) {
              switch (_context14.prev = _context14.next) {
                case 0:
                  assert.equal(dom(this.pages).querySelector('.iron-selected').getAttribute('name'), 'listview', 'listview is shown');

                case 1:
                case 'end':
                  return _context14.stop();
              }
            }
          }, null, this);
        }
      }]);

      return SelectListView;
    }(base);
  };
  panel.test = function (base) {
    return function (_base7) {
      _inherits(SelectStorageView, _base7);

      function SelectStorageView() {
        _classCallCheck(this, SelectStorageView);

        return _possibleConstructorReturn(this, (SelectStorageView.__proto__ || Object.getPrototypeOf(SelectStorageView)).apply(this, arguments));
      }

      _createClass(SelectStorageView, [{
        key: 'operation',
        value: function operation() {
          var self, button;
          return regeneratorRuntime.async(function operation$(_context15) {
            while (1) {
              switch (_context15.prev = _context15.next) {
                case 0:
                  self = this;
                  button = self.panel.$['storageview-button'];

                  self.pages = dom(self.panel.$.panelarea).querySelector('iron-pages.panel-selector');

                  if (!(self.pages.selected !== 'storageview')) {
                    _context15.next = 6;
                    break;
                  }

                  _context15.next = 6;
                  return regeneratorRuntime.awrap(self.forEvent(self.pages, 'iron-select', function () {
                    MockInteractions.tap(button);
                  }, function (element, type, event) {
                    return self.pages.selected === 'storageview';
                  }));

                case 6:
                case 'end':
                  return _context15.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context16) {
            while (1) {
              switch (_context16.prev = _context16.next) {
                case 0:
                  assert.equal(dom(this.pages).querySelector('.iron-selected').getAttribute('name'), 'storageview', 'storageview is shown');

                case 1:
                case 'end':
                  return _context16.stop();
              }
            }
          }, null, this);
        }
      }]);

      return SelectStorageView;
    }(base);
  };
  panel.test = function (base) {
    return function (_base8) {
      _inherits(FileLoadButtonTest, _base8);

      function FileLoadButtonTest() {
        _classCallCheck(this, FileLoadButtonTest);

        return _possibleConstructorReturn(this, (FileLoadButtonTest.__proto__ || Object.getPrototypeOf(FileLoadButtonTest)).apply(this, arguments));
      }

      _createClass(FileLoadButtonTest, [{
        key: 'operation',
        value: function operation() {
          var self, button;
          return regeneratorRuntime.async(function operation$(_context17) {
            while (1) {
              switch (_context17.prev = _context17.next) {
                case 0:
                  self = this;
                  button = self.panel.$.load;

                  self.mockStorage = self.model.storage['file-storage'];
                  self.mockStorage.load = function load(event) {
                    self.loadEvent = event;
                  };
                  MockInteractions.tap(button);

                case 5:
                case 'end':
                  return _context17.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint(parameters) {
          return regeneratorRuntime.async(function checkpoint$(_context18) {
            while (1) {
              switch (_context18.prev = _context18.next) {
                case 0:
                  assert.equal(this.mockStorage.selected, true, 'fileStorage.selected is true');
                  assert.equal(this.loadEvent.type, 'tap', 'load file via a "tap" event');

                case 2:
                case 'end':
                  return _context18.stop();
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

      return FileLoadButtonTest;
    }(base);
  };
  panel.test = function (base) {
    return function (_base9) {
      _inherits(LocalesButtonTest, _base9);

      function LocalesButtonTest() {
        _classCallCheck(this, LocalesButtonTest);

        return _possibleConstructorReturn(this, (LocalesButtonTest.__proto__ || Object.getPrototypeOf(LocalesButtonTest)).apply(this, arguments));
      }

      _createClass(LocalesButtonTest, [{
        key: 'operation',
        value: function operation() {
          var self, button;
          return regeneratorRuntime.async(function operation$(_context19) {
            while (1) {
              switch (_context19.prev = _context19.next) {
                case 0:
                  self = this;
                  button = dom(self.panel.root).querySelector('paper-icon-button#locales');

                  self.mockModel = self.model;
                  self.mockModel.fetch = function fetch() {
                    self.fetched = true;
                  };
                  MockInteractions.tap(button);

                case 5:
                case 'end':
                  return _context19.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint(parameters) {
          return regeneratorRuntime.async(function checkpoint$(_context20) {
            while (1) {
              switch (_context20.prev = _context20.next) {
                case 0:
                  assert.isOk(this.fetched, 'model.fetched() via locales button');

                case 1:
                case 'end':
                  return _context20.stop();
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

      return LocalesButtonTest;
    }(base);
  };
  panel.test = function (base) {
    return function (_base10) {
      _inherits(CleanupSessionStorage, _base10);

      function CleanupSessionStorage() {
        _classCallCheck(this, CleanupSessionStorage);

        return _possibleConstructorReturn(this, (CleanupSessionStorage.__proto__ || Object.getPrototypeOf(CleanupSessionStorage)).apply(this, arguments));
      }

      _createClass(CleanupSessionStorage, [{
        key: 'setup',
        value: function setup() {
          return regeneratorRuntime.async(function setup$(_context21) {
            while (1) {
              switch (_context21.prev = _context21.next) {
                case 0:
                  _context21.next = 2;
                  return regeneratorRuntime.awrap(_get(CleanupSessionStorage.prototype.__proto__ || Object.getPrototypeOf(CleanupSessionStorage.prototype), 'setup', this).call(this));

                case 2:
                  if (!this.hasToSkip) {
                    _context21.next = 5;
                    break;
                  }

                  this.initialReloadUrl = window.sessionStorage.getItem('live-localizer-reload-url');
                  return _context21.abrupt('return');

                case 5:
                  window.sessionStorage.removeItem('live-localizer-reload-url');

                case 6:
                case 'end':
                  return _context21.stop();
              }
            }
          }, null, this);
        }
      }]);

      return CleanupSessionStorage;
    }(base);
  };
  panel.test = function (base) {
    return function (_base11) {
      _inherits(OpenDialogOnReload, _base11);

      function OpenDialogOnReload() {
        _classCallCheck(this, OpenDialogOnReload);

        return _possibleConstructorReturn(this, (OpenDialogOnReload.__proto__ || Object.getPrototypeOf(OpenDialogOnReload)).apply(this, arguments));
      }

      _createClass(OpenDialogOnReload, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context22) {
            while (1) {
              switch (_context22.prev = _context22.next) {
                case 0:
                  self = this;

                  if (!this.hasToSkip) {
                    _context22.next = 5;
                    break;
                  }

                  _context22.next = 4;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return self.dialog.opened;
                  }, 200, 100));

                case 4:
                  return _context22.abrupt('return');

                case 5:
                  _context22.next = 7;
                  return regeneratorRuntime.awrap(self.forEvent(self.dialog, 'neon-animation-finish', function () {
                    MockInteractions.tap(self.fab);
                  }, true));

                case 7:
                  _context22.next = 9;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return self.model.lastModified;
                  }, 200, 100));

                case 9:
                  self.model.lastModified = new Date(0).toUTCString(); // Make the next fetch result updated
                  _context22.next = 12;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return self.model.serverUpdated;
                  }, 1000, 70));

                case 12:
                case 'end':
                  return _context22.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          var self;
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
                  self = this;

                  assert.isOk(self.dialog.opened, 'dialog is opened');
                  assert.isNotOk(self.fab.opened, 'fab is not opened');

                case 5:
                case 'end':
                  return _context23.stop();
              }
            }
          }, null, this);
        }
      }]);

      return OpenDialogOnReload;
    }(base);
  };
  panel.test = function (base) {
    return function (_base12) {
      _inherits(ReloadButtonTest, _base12);

      function ReloadButtonTest() {
        _classCallCheck(this, ReloadButtonTest);

        return _possibleConstructorReturn(this, (ReloadButtonTest.__proto__ || Object.getPrototypeOf(ReloadButtonTest)).apply(this, arguments));
      }

      _createClass(ReloadButtonTest, [{
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

                  self.reloadButton = dom(self.panel.root).querySelector('paper-icon-button#reload');
                  self.reloaded = false;
                  self.mockModel = self.model;
                  self.mockModel._reload = function () {
                    self.reloaded = true;
                    self.reloadUrl = window.sessionStorage.getItem('live-localizer-reload-url');
                  };
                  self.initialReloadUrl = window.sessionStorage.getItem('live-localizer-reload-url');
                  self.currentHref = window.location.href;
                  MockInteractions.tap(self.reloadButton);
                  _context24.next = 12;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return self.reloaded;
                  }, 200, 100));

                case 12:
                case 'end':
                  return _context24.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint(parameters) {
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
                  assert.isOk(this.reloaded, 'model.reload() via reload button');
                  assert.isNotOk(this.initialReloadUrl, 'initial live-localizer-reload-url is empty');
                  assert.equal(this.reloadUrl, this.currentHref, 'sessionStorage live-localizer-reload-url is "' + this.currentHref + '"');

                case 5:
                case 'end':
                  return _context25.stop();
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

      return ReloadButtonTest;
    }(base);
  };
  panel.test = function (base) {
    return function (_base13) {
      _inherits(ReloadButtonTest2, _base13);

      function ReloadButtonTest2() {
        _classCallCheck(this, ReloadButtonTest2);

        return _possibleConstructorReturn(this, (ReloadButtonTest2.__proto__ || Object.getPrototypeOf(ReloadButtonTest2)).apply(this, arguments));
      }

      _createClass(ReloadButtonTest2, [{
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

                  self.currentHref = window.location.href;
                  _context26.next = 6;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return !(self.reloadUrl = window.sessionStorage.getItem('live-localizer-reload-url'));
                  }, 200, 100));

                case 6:
                case 'end':
                  return _context26.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint(parameters) {
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
                  assert.isOk(this.dialog.opened, 'dialog is opened');
                  assert.isNotOk(this.fab.opened, 'fab is not opened');
                  assert.isNotOk(this.reloadUrl, 'sessionStorage live-localizer-reload-url is cleared');
                  assert.equal(this.currentHref, this.initialReloadUrl, 'location.href is "' + this.reloadUrl + '"');

                case 6:
                case 'end':
                  return _context27.stop();
              }
            }
          }, null, this);
        }
      }]);

      return ReloadButtonTest2;
    }(base);
  };
  panel.test = {
    // test class mixins
    '': [],
    // test classes
    OpenDialogTest: {
      PanelTooltipTest: {
        ReloadTooltipTest: {
          ModelAlertTest: 'PanelTooltipTests; Tooltips for panel'
        }
      },
      PanelViewTest: 'PanelViewTests; Views for panel',
      FileLoadButtonTest: 'MockFileLoadButtonTest; File load button test (mock)',
      LocalesButtonTest: 'MockLocalesButtonTest; Locales button test (mock)',
      SelectIconView: '',
      SelectListView: '',
      SelectStorageView: ''
    },
    InstantiateTest: {
      CleanupSessionStorage: {
        OpenDialogOnReload: {
          ReloadButtonTest: {
            Reload: {
              ReloadButtonTest2: 'MockReloadButtonTest_phase_1; Reload button test (mock)'
            }
          }
        }
      }
    }
  };
} // panel scopevar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  // iconview scope (subscope of panel)
  var scope = 'iconview';
  var iconview = new Suite(scope, 'live-localizer iconview tests');
  iconview.htmlSuite = 'live-localizer';
  iconview.test = Suite.scopes.panel.classes.SelectIconView;
  iconview.test = function (base) {
    return function (_base) {
      _inherits(DropareaTooltipTest, _base);

      function DropareaTooltipTest() {
        _classCallCheck(this, DropareaTooltipTest);

        return _possibleConstructorReturn(this, (DropareaTooltipTest.__proto__ || Object.getPrototypeOf(DropareaTooltipTest)).apply(this, arguments));
      }

      _createClass(DropareaTooltipTest, [{
        key: 'operation',
        value: function operation() {
          var self, droparea, tooltip;
          return regeneratorRuntime.async(function operation$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  self = this;
                  droparea = self.iconView.$.droparea;
                  tooltip = dom(self.iconView.root).querySelector('paper-tooltip[for=droparea]');
                  _context.next = 5;
                  return regeneratorRuntime.awrap(self.forEvent(tooltip, 'neon-animation-finish', function () {
                    droparea.dispatchEvent(new MouseEvent('mouseenter', {
                      bubbles: true,
                      cancelable: true,
                      clientX: 0,
                      clientY: 0,
                      buttons: 1
                    }));
                  }, function (element, type, event) {
                    self.tooltip = dom(event).rootTarget;
                    return self.tooltip.is === 'paper-tooltip' && self.tooltip.for === 'droparea';
                  }));

                case 5:
                  _context.next = 7;
                  return regeneratorRuntime.awrap(self.forEvent(tooltip, 'neon-animation-finish', function () {}, function (element, type, event) {
                    return true;
                  }));

                case 7:
                case 'end':
                  return _context.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  assert.equal(this.tooltip.getAttribute('for'), 'droparea', 'paper-tooltip should be for droparea');
                  assert.equal(this.tooltip.textContent.trim(), 'Drag and drop XLIFF to load', 'tooltip should be "Drag and drop XLIFF to loadparameters.tooltip"');

                case 2:
                case 'end':
                  return _context2.stop();
              }
            }
          }, null, this);
        }
      }]);

      return DropareaTooltipTest;
    }(base);
  };
  iconview.test = function (base) {
    return function (_base2) {
      _inherits(SelectLocaleIconTest, _base2);

      function SelectLocaleIconTest() {
        _classCallCheck(this, SelectLocaleIconTest);

        return _possibleConstructorReturn(this, (SelectLocaleIconTest.__proto__ || Object.getPrototypeOf(SelectLocaleIconTest)).apply(this, arguments));
      }

      _createClass(SelectLocaleIconTest, [{
        key: 'operation',
        value: function operation() {
          var self, droparea;
          return regeneratorRuntime.async(function operation$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  self = this;
                  droparea = self.iconView.$.droparea;

                  self.icon = dom(self.iconView.root).querySelector('live-localizer-locale-icon#locale-icon-de');
                  _context3.next = 5;
                  return regeneratorRuntime.awrap(self.forEvent(self.model, 'html-lang-mutation', function () {
                    MockInteractions.tap(self.icon);
                  }, function (element, type, event) {
                    return self.model.html.lang === 'de';
                  }));

                case 5:
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
                  assert.equal(this.model.html.lang, 'de', 'html.lang should be "de"');
                  assert.isOk(this.icon.selected, 'Selected icon is selected');

                case 2:
                case 'end':
                  return _context4.stop();
              }
            }
          }, null, this);
        }
      }]);

      return SelectLocaleIconTest;
    }(base);
  };
  // Must be after SelectLocaleIconTest
  iconview.test = function (base) {
    return function (_base3) {
      _inherits(MockSaveFileTest, _base3);

      function MockSaveFileTest() {
        _classCallCheck(this, MockSaveFileTest);

        return _possibleConstructorReturn(this, (MockSaveFileTest.__proto__ || Object.getPrototypeOf(MockSaveFileTest)).apply(this, arguments));
      }

      _createClass(MockSaveFileTest, [{
        key: 'operation',
        value: function operation() {
          var self, droparea;
          return regeneratorRuntime.async(function operation$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  self = this;
                  droparea = self.iconView.$.droparea;

                  self.icon = dom(self.iconView.root).querySelector('live-localizer-locale-icon#locale-icon-de');
                  self.mockStorage = self.model.storage['file-storage'];
                  self.mockStorage.save = function save(file) {
                    self.savedFile = file;
                  };
                  MockInteractions.tap(self.icon);

                case 6:
                case 'end':
                  return _context5.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  assert.equal(this.savedFile.locale, 'de', 'Saved file locale should be "de"');

                case 1:
                case 'end':
                  return _context6.stop();
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

      return MockSaveFileTest;
    }(base);
  };
  iconview.test = function (base) {
    return function (_base4) {
      _inherits(MockDropFileTest, _base4);

      function MockDropFileTest() {
        _classCallCheck(this, MockDropFileTest);

        return _possibleConstructorReturn(this, (MockDropFileTest.__proto__ || Object.getPrototypeOf(MockDropFileTest)).apply(this, arguments));
      }

      _createClass(MockDropFileTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  self = this;

                  self.droparea = self.iconView.$.droparea;
                  self.mockStorage = self.model.storage['file-storage'];
                  self.mockStorage.load = function load(event) {
                    self.loadEvent = event;
                  };
                  _context7.next = 6;
                  return regeneratorRuntime.awrap(self.forEvent(self.droparea, 'dragover', function () {
                    self.droparea.dispatchEvent(new MouseEvent('dragover', {
                      bubbles: true,
                      cancelable: true,
                      clientX: 0,
                      clientY: 0,
                      buttons: 1
                    }));
                  }, function (element, type, event) {
                    return event.type === 'dragover';
                  }));

                case 6:
                  _context7.next = 8;
                  return regeneratorRuntime.awrap(self.forEvent(self.droparea, 'drop', function () {
                    self.droparea.dispatchEvent(new MouseEvent('drop', {
                      bubbles: true,
                      cancelable: true,
                      clientX: 0,
                      clientY: 0,
                      buttons: 1
                    }));
                  }, function (element, type, event) {
                    return event.type === 'drop';
                  }));

                case 8:
                case 'end':
                  return _context7.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  assert.equal(this.mockStorage.selected, true, 'fileStorage.selected is true');
                  assert.equal(this.loadEvent.type, 'drop', 'load file via a "drop" event');

                case 2:
                case 'end':
                  return _context8.stop();
              }
            }
          }, null, this);
        }
      }]);

      return MockDropFileTest;
    }(base);
  };
  iconview.test = function (base) {
    return function (_base5) {
      _inherits(IconViewBadgeTapTest, _base5);

      function IconViewBadgeTapTest() {
        _classCallCheck(this, IconViewBadgeTapTest);

        return _possibleConstructorReturn(this, (IconViewBadgeTapTest.__proto__ || Object.getPrototypeOf(IconViewBadgeTapTest)).apply(this, arguments));
      }

      _createClass(IconViewBadgeTapTest, [{
        key: 'operation',
        value: function operation() {
          var self, droparea;
          return regeneratorRuntime.async(function operation$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  self = this;
                  droparea = self.iconView.$.droparea;

                  self.pages = dom(self.panel.$.panelarea).querySelector('iron-pages.panel-selector');
                  self.icon = dom(self.iconView.root).querySelector('live-localizer-locale-icon#locale-icon-de');
                  self.badge = self.icon.$.badge;
                  _context9.next = 7;
                  return regeneratorRuntime.awrap(self.forEvent(self.pages, 'iron-select', function () {
                    MockInteractions.tap(self.badge);
                  }, function (element, type, event) {
                    return self.pages.selected === 'listview';
                  }));

                case 7:
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
                  assert.isOk(this.icon.selected, 'de locale icon is selected');
                  assert.equal(this.pages.selected, 'listview', 'listview is shown');

                case 2:
                case 'end':
                  return _context10.stop();
              }
            }
          }, null, this);
        }
      }]);

      return IconViewBadgeTapTest;
    }(base);
  };
  iconview.test = function (base) {
    return function (_base6) {
      _inherits(IconTooltipTest, _base6);

      function IconTooltipTest() {
        _classCallCheck(this, IconTooltipTest);

        return _possibleConstructorReturn(this, (IconTooltipTest.__proto__ || Object.getPrototypeOf(IconTooltipTest)).apply(this, arguments));
      }

      _createClass(IconTooltipTest, [{
        key: 'iteration',
        value: regeneratorRuntime.mark(function iteration() {
          return regeneratorRuntime.wrap(function iteration$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  return _context11.delegateYield([{ icon: 'en', tooltip: 'Save XLIFF' }, { icon: 'de', tooltip: 'Switch Locale' }].map(function (parameters) {
                    parameters.name = 'tooltip for ' + parameters.icon + ' icon is "' + parameters.tooltip + '"';return parameters;
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
                  self = this;

                  self.icon = dom(self.iconView.root).querySelector('live-localizer-locale-icon#locale-icon-' + parameters.icon);
                  self.tooltip = dom(self.icon.root).querySelector('paper-tooltip[for=card]');
                  _context12.next = 5;
                  return regeneratorRuntime.awrap(self.showTooltip(self.icon.$.card, self.tooltip));

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
          return regeneratorRuntime.async(function checkpoint$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  assert.equal(this.tooltip.getAttribute('for'), 'card', 'paper-tooltip should be for card');
                  assert.equal(this.tooltip.textContent.trim(), parameters.tooltip, 'tooltip should be "' + parameters.tooltip + '"');

                case 2:
                case 'end':
                  return _context13.stop();
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

      return IconTooltipTest;
    }(base);
  };
  iconview.test = function (base) {
    return function (_base7) {
      _inherits(IconFlagUnitTest, _base7);

      function IconFlagUnitTest() {
        _classCallCheck(this, IconFlagUnitTest);

        return _possibleConstructorReturn(this, (IconFlagUnitTest.__proto__ || Object.getPrototypeOf(IconFlagUnitTest)).apply(this, arguments));
      }

      _createClass(IconFlagUnitTest, [{
        key: 'iteration',
        value: regeneratorRuntime.mark(function iteration() {
          return regeneratorRuntime.wrap(function iteration$(_context14) {
            while (1) {
              switch (_context14.prev = _context14.next) {
                case 0:
                  return _context14.delegateYield([{ locale: 'zh-CN', flag: 'CN' }, { locale: 'zh-Hans', flag: 'CN' }, { locale: 'en-GB', flag: 'GB' }, { locale: 'en', flag: 'US' }, { locale: 'ja', flag: 'JP' }, { locale: 'xx', flag: '' }].map(function (parameters) {
                    parameters.name = 'flag for ' + parameters.locale + ' locale icon is "' + parameters.flag + '"';return parameters;
                  }), 't0', 1);

                case 1:
                case 'end':
                  return _context14.stop();
              }
            }
          }, iteration, this);
        })
      }, {
        key: 'operation',
        value: function operation(parameters) {
          var self;
          return regeneratorRuntime.async(function operation$(_context15) {
            while (1) {
              switch (_context15.prev = _context15.next) {
                case 0:
                  self = this;

                  self.icon = dom(self.iconView.root).querySelector('live-localizer-locale-icon#locale-icon-en');
                  self.flag = self.icon.flag(parameters.locale);

                case 3:
                case 'end':
                  return _context15.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint(parameters) {
          return regeneratorRuntime.async(function checkpoint$(_context16) {
            while (1) {
              switch (_context16.prev = _context16.next) {
                case 0:
                  assert.equal(this.flag, parameters.flag ? '/components/region-flags/png/' + parameters.flag + '.png' : parameters.flag, 'flag is "' + parameters.flag + '"');

                case 1:
                case 'end':
                  return _context16.stop();
              }
            }
          }, null, this);
        }
      }]);

      return IconFlagUnitTest;
    }(base);
  };
  iconview.test = function (base) {
    return function (_base8) {
      _inherits(IconViewDragIconTest, _base8);

      function IconViewDragIconTest() {
        _classCallCheck(this, IconViewDragIconTest);

        return _possibleConstructorReturn(this, (IconViewDragIconTest.__proto__ || Object.getPrototypeOf(IconViewDragIconTest)).apply(this, arguments));
      }

      _createClass(IconViewDragIconTest, [{
        key: 'iteration',
        value: regeneratorRuntime.mark(function iteration() {
          return regeneratorRuntime.wrap(function iteration$(_context17) {
            while (1) {
              switch (_context17.prev = _context17.next) {
                case 0:
                  return _context17.delegateYield([{ icon: 'en', mode: 'none' }, { icon: 'de', mode: 'none' }].map(function (parameters) {
                    parameters.name = 'dragHandleMode for ' + parameters.icon + ' locale icon is "' + parameters.mode + '"';return parameters;
                  }), 't0', 1);

                case 1:
                case 'end':
                  return _context17.stop();
              }
            }
          }, iteration, this);
        })
      }, {
        key: 'operation',
        value: function operation(parameters) {
          var self;
          return regeneratorRuntime.async(function operation$(_context18) {
            while (1) {
              switch (_context18.prev = _context18.next) {
                case 0:
                  self = this;

                  self.icon = dom(self.iconView.root).querySelector('live-localizer-locale-icon#locale-icon-' + parameters.icon);
                  self.icon.dispatchEvent(new MouseEvent('mouseover', {
                    bubbles: true,
                    cancelable: true,
                    clientX: 0,
                    clientY: 0,
                    buttons: 1
                  }));
                  _context18.next = 5;
                  return regeneratorRuntime.awrap(self.forEvent(self.icon, 'track', function () {
                    MockInteractions.track(self.icon, 100, 100);
                  }, function (element, type, event) {
                    return event.detail.state === 'end';
                  }));

                case 5:
                case 'end':
                  return _context18.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint(parameters) {
          return regeneratorRuntime.async(function checkpoint$(_context19) {
            while (1) {
              switch (_context19.prev = _context19.next) {
                case 0:
                  assert.equal(this.icon.dragHandleMode, parameters.mode, 'dragHandleMode for ' + parameters.icon + ' locale icon is "' + parameters.mode + '"');

                case 1:
                case 'end':
                  return _context19.stop();
              }
            }
          }, null, this);
        }
      }]);

      return IconViewDragIconTest;
    }(base);
  };
  iconview.test = {
    // test class mixins
    '': [],
    // test classes
    SelectIconView: {
      DropareaTooltipTest: 'DropareaTooltipTest; Show tooltip for droparea',
      SelectLocaleIconTest: {
        MockSaveFileTest: 'SelectAndSaveWithLocaleIconTest; Salect a locale and save file (mock)'
      },
      MockDropFileTest: 'MockDropFileTest; Drop file on droparea (mock)',
      IconViewBadgeTapTest: 'IconViewBadgeTapTest; Tap a badge to select locale and switch to listview',
      IconTooltipTest: 'IconTooltipTest; Show tooltips for selected/unselected locale icons',
      IconFlagUnitTest: 'IconFlagUnitTest; Select their proper flags for locales',
      IconViewDragIconTest: 'IconViewDragIconTest; dragHandleMode is "none" for locale icons in iconview'
    }
  };
} // panel scopevar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  // listview scope (subscope of panel)
  var scope = 'listview';
  var listview = new Suite(scope, 'live-localizer listview tests');
  listview.htmlSuite = 'live-localizer-firebase-lazy';
  listview.test = Suite.scopes.panel.classes.SelectListView;
  listview.test = function (base) {
    return function (_base) {
      _inherits(ListViewItemsTest, _base);

      function ListViewItemsTest() {
        _classCallCheck(this, ListViewItemsTest);

        return _possibleConstructorReturn(this, (ListViewItemsTest.__proto__ || Object.getPrototypeOf(ListViewItemsTest)).apply(this, arguments));
      }

      _createClass(ListViewItemsTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  self = this;

                  self.list = self.listView.$.list;
                  _context.next = 4;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return self.list.items.length === 6;
                  }, 100 /* ms */, 20 /* times */));

                case 4:
                case 'end':
                  return _context.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  assert.equal(this.list.items.length, 6, 'list item length is 6');

                case 1:
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

      return ListViewItemsTest;
    }(base);
  };
  listview.test = function (base) {
    return function (_base2) {
      _inherits(ListViewSelectItemTest, _base2);

      function ListViewSelectItemTest() {
        _classCallCheck(this, ListViewSelectItemTest);

        return _possibleConstructorReturn(this, (ListViewSelectItemTest.__proto__ || Object.getPrototypeOf(ListViewSelectItemTest)).apply(this, arguments));
      }

      _createClass(ListViewSelectItemTest, [{
        key: 'iteration',
        value: regeneratorRuntime.mark(function iteration() {
          var i;
          return regeneratorRuntime.wrap(function iteration$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  i = 5;

                case 1:
                  if (!(i >= 0)) {
                    _context3.next = 7;
                    break;
                  }

                  _context3.next = 4;
                  return { i: i, name: 'listItems[' + i + '] is selected' };

                case 4:
                  i--;
                  _context3.next = 1;
                  break;

                case 7:
                case 'end':
                  return _context3.stop();
              }
            }
          }, iteration, this);
        })
      }, {
        key: 'operation',
        value: function operation(parameters) {
          var self;
          return regeneratorRuntime.async(function operation$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  self = this;

                  self.list = self.listView.$.list;
                  _context4.next = 4;
                  return regeneratorRuntime.awrap(self.forEvent(self.model, 'html-lang-mutation', function () {
                    if (self.listView.version1) {
                      self.list.selection.select(parameters.i);
                    }
                    if (self.listView.version2) {
                      self.list.activeItem = self.listView.listItems[parameters.i];
                    }
                  }, function (element, type, event) {
                    return true;
                  }));

                case 4:
                case 'end':
                  return _context4.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint(parameters) {
          return regeneratorRuntime.async(function checkpoint$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  if (this.listView.version1) {
                    assert.equal(this.list.selection.selected().length, 1, 'Only 1 item is selected');
                    assert.equal(this.list.selection.selected()[0], parameters.i, 'Selected item is ' + this.listView.listItems[parameters.i][0]);
                  }
                  if (this.listView.version2) {
                    assert.equal(this.list.selectedItems.length, 1, 'Only 1 item is selected');
                    assert.equal(this.list.selectedItems[0][0], this.listView.listItems[parameters.i][0], 'Selected item is ' + this.listView.listItems[parameters.i][0]);
                  }
                  assert.equal(this.model.html.lang, this.listView.listItems[parameters.i][1], 'Selected locale is ' + this.listView.listItems[parameters.i][1]);

                case 3:
                case 'end':
                  return _context5.stop();
              }
            }
          }, null, this);
        }
      }]);

      return ListViewSelectItemTest;
    }(base);
  };
  listview.test = function (base) {
    return function (_base3) {
      _inherits(ListViewUnsupportedHtmlLangTest, _base3);

      function ListViewUnsupportedHtmlLangTest() {
        _classCallCheck(this, ListViewUnsupportedHtmlLangTest);

        return _possibleConstructorReturn(this, (ListViewUnsupportedHtmlLangTest.__proto__ || Object.getPrototypeOf(ListViewUnsupportedHtmlLangTest)).apply(this, arguments));
      }

      _createClass(ListViewUnsupportedHtmlLangTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  self = this;

                  self.list = self.listView.$.list;
                  _context6.next = 4;
                  return regeneratorRuntime.awrap(self.forEvent(self.model, 'html-lang-mutation', function () {
                    self.model.html.lang = 'ru';
                  }, function (element, type, event) {
                    return true;
                  }));

                case 4:
                case 'end':
                  return _context6.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  if (this.listView.version1) {
                    assert.equal(this.list.selection.selected().length, 0, 'no locale is selected');
                  }
                  if (this.listView.version2) {
                    assert.equal(this.list.selectedItems.length, 0, 'no locale is selected');
                  }

                case 2:
                case 'end':
                  return _context7.stop();
              }
            }
          }, null, this);
        }
      }]);

      return ListViewUnsupportedHtmlLangTest;
    }(base);
  };
  listview.test = function (base) {
    return function (_base4) {
      _inherits(ListViewHtmlLangTest, _base4);

      function ListViewHtmlLangTest() {
        _classCallCheck(this, ListViewHtmlLangTest);

        return _possibleConstructorReturn(this, (ListViewHtmlLangTest.__proto__ || Object.getPrototypeOf(ListViewHtmlLangTest)).apply(this, arguments));
      }

      _createClass(ListViewHtmlLangTest, [{
        key: 'iteration',
        value: regeneratorRuntime.mark(function iteration() {
          var i;
          return regeneratorRuntime.wrap(function iteration$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  i = 5;

                case 1:
                  if (!(i >= 0)) {
                    _context8.next = 7;
                    break;
                  }

                  _context8.next = 4;
                  return { i: i, name: 'listItems[' + i + '] is selected' };

                case 4:
                  i--;
                  _context8.next = 1;
                  break;

                case 7:
                case 'end':
                  return _context8.stop();
              }
            }
          }, iteration, this);
        })
      }, {
        key: 'operation',
        value: function operation(parameters) {
          var self;
          return regeneratorRuntime.async(function operation$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  self = this;

                  self.list = self.listView.$.list;
                  _context9.next = 4;
                  return regeneratorRuntime.awrap(self.forEvent(self.model, 'html-lang-mutation', function () {
                    self.model.html.lang = self.listView.listItems[parameters.i][1];
                  }, function (element, type, event) {
                    return true;
                  }));

                case 4:
                case 'end':
                  return _context9.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint(parameters) {
          return regeneratorRuntime.async(function checkpoint$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  if (this.listView.version1) {
                    assert.equal(this.list.selection.selected().length, 1, 'Only 1 item is selected');
                    assert.equal(this.list.selection.selected()[0], parameters.i, 'Selected item is ' + this.listView.listItems[parameters.i][0]);
                  }
                  if (this.listView.version2) {
                    assert.equal(this.list.selectedItems.length, 1, 'Only 1 item is selected');
                    assert.equal(this.list.selectedItems[0][0], this.listView.listItems[parameters.i][0], 'Selected item is ' + this.listView.listItems[parameters.i][0]);
                  }
                  assert.equal(this.model.html.lang, this.listView.listItems[parameters.i][1], 'Selected locale is ' + this.listView.listItems[parameters.i][1]);

                case 3:
                case 'end':
                  return _context10.stop();
              }
            }
          }, null, this);
        }
      }]);

      return ListViewHtmlLangTest;
    }(base);
  };
  listview.test = {
    // test class mixins
    '': [],
    // test classes
    SelectListView: {
      ListViewItemsTest: {
        ListViewSelectItemTest: 'ListViewSelectItemTest; Select each item in listview',
        ListViewUnsupportedHtmlLangTest: 'ListViewUnsupportedHtmlLangTest; No change on listview for an unsupprted locale',
        ListViewHtmlLangTest: 'ListViewHtmlLangTest; Corresponding item is selected in listview according to html.lang'
      }
    }
  };
} // panel scopevar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  // storageview scope (subscope of panel)
  var scope = 'storageview';
  var storageview = new Suite(scope, 'live-localizer storageview tests');
  storageview.htmlSuite = 'live-localizer';
  storageview.test = Suite.scopes.panel.classes.SelectStorageView;
  storageview.test = function (base) {
    return function (_base) {
      _inherits(StorageViewBadgeTapTest, _base);

      function StorageViewBadgeTapTest() {
        _classCallCheck(this, StorageViewBadgeTapTest);

        return _possibleConstructorReturn(this, (StorageViewBadgeTapTest.__proto__ || Object.getPrototypeOf(StorageViewBadgeTapTest)).apply(this, arguments));
      }

      _createClass(StorageViewBadgeTapTest, [{
        key: 'operation',
        value: function operation() {
          var self, count;
          return regeneratorRuntime.async(function operation$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  self = this;

                  self.pages = dom(self.panel.$.panelarea).querySelector('iron-pages.panel-selector');
                  self.icon = self.storageView.$['locale-icon'];
                  self.badge = self.icon.$.badge;
                  _context.next = 6;
                  return regeneratorRuntime.awrap(self.forEvent(self.pages, 'iron-select', function () {
                    MockInteractions.tap(self.badge);
                  }, function (element, type, event) {
                    return self.pages.selected === 'listview';
                  }));

                case 6:
                  count = 0;
                  _context.next = 9;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return count++ === 1;
                  }, 200, 1));

                case 9:
                case 'end':
                  return _context.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  assert.equal(this.pages.selected, 'listview', 'listview is shown');

                case 1:
                case 'end':
                  return _context2.stop();
              }
            }
          }, null, this);
        }
      }]);

      return StorageViewBadgeTapTest;
    }(base);
  };
  storageview.test = function (base) {
    return function (_base2) {
      _inherits(StorageViewIconTooltipTest, _base2);

      function StorageViewIconTooltipTest() {
        _classCallCheck(this, StorageViewIconTooltipTest);

        return _possibleConstructorReturn(this, (StorageViewIconTooltipTest.__proto__ || Object.getPrototypeOf(StorageViewIconTooltipTest)).apply(this, arguments));
      }

      _createClass(StorageViewIconTooltipTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  self = this;

                  self.icon = self.storageView.$['locale-icon'];
                  self.tooltip = dom(self.icon.root).querySelector('paper-tooltip[for=card]');
                  _context3.next = 5;
                  return regeneratorRuntime.awrap(self.showTooltip(self.icon.$.card, self.tooltip));

                case 5:
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
                  assert.equal(this.tooltip.getAttribute('for'), 'card', 'paper-tooltip should be for card');
                  assert.equal(this.tooltip.textContent.trim(), 'Drag to Save', 'tooltip should be "Drag to Save"');

                case 2:
                case 'end':
                  return _context4.stop();
              }
            }
          }, null, this);
        }
      }]);

      return StorageViewIconTooltipTest;
    }(base);
  };
  storageview.test = {
    // test class mixins
    '': [],
    // test classes
    SelectStorageView: {
      StorageViewIconTooltipTest: {
        StorageViewBadgeTapTest: 'StorageViewBadgeTapTest; Tap badge in storageview to show listview'
      }
    }
  };
} // panel scopevar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
                  self.storageIcon = dom(self.browserStorage.root).querySelector('live-localizer-storage-icon');
                  self.tooltip = self.browserStorage.$.tooltip;
                  self.iconTooltip = dom(self.storageIcon.root).querySelector('paper-tooltip[for=card]');
                  self.checkboxes = Array.prototype.reduce.call(dom(self.browserStorage.root).querySelectorAll('paper-checkbox'), function (acc, curr) {
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

                  self.icon = dom(self.iconView.root).querySelector('live-localizer-locale-icon#locale-icon-de');
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
} // browserstorage scopevar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
  firebasestorage.htmlSuite = 'live-localizer-firebase';
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
                  self.storageIcon = dom(self.firebaseStorage.root).querySelector('live-localizer-storage-icon');
                  self.iconTooltip = dom(self.storageIcon.root).querySelector('paper-tooltip[for=card]');
                  self.tooltip = self.firebaseStorage.$.tooltip;
                  self.checkboxes = Array.prototype.reduce.call(dom(self.firebaseStorage.root).querySelectorAll('paper-checkbox'), function (acc, curr) {
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
      }], [{
        key: 'reconnectable',
        get: function get() {
          return false;
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
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return self.firebaseStorage.isSettingsInitialized;
                  }, 200, 100));

                case 5:
                  _context47.next = 7;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return self.storageIcon.label === 'bundle.de.xlf';
                  }, 200, 100));

                case 7:
                  _context47.next = 9;
                  return regeneratorRuntime.awrap(self.showTooltip(self.storageIcon.$.card, self.iconTooltip));

                case 9:
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
                  }, 200, 1500));

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
                  self.userIcon = dom(self.mockStorage.$.user).querySelector('iron-icon').icon;
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
      }], [{
        key: 'reconnectable',
        get: function get() {
          return false;
        }
      }]);

      return MockSignInTest;
    }(base);
  };
  firebasestorage.test = {
    // test class mixins
    '': [],
    // test classes
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
    },
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
    }
  };
} // firebasestorage scopevar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
                  self.storageIcon = dom(self.fileStorage.root).querySelector('live-localizer-storage-icon');
                  self.iconTooltip = dom(self.storageIcon.root).querySelector('paper-tooltip[for=card]');
                  self.tooltip = self.fileStorage.$.tooltip;
                  self.checkboxes = Array.prototype.reduce.call(dom(self.fileStorage.root).querySelectorAll('paper-checkbox'), function (acc, curr) {
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
      }], [{
        key: 'reconnectable',
        get: function get() {
          return false;
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
      }], [{
        key: 'reconnectable',
        get: function get() {
          return false;
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
      }], [{
        key: 'reconnectable',
        get: function get() {
          return false;
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
                  Object.defineProperty(self.mockDropEvent, 'dataTransfer', { value: { files: [self.mockFile] } });
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
      }], [{
        key: 'reconnectable',
        get: function get() {
          return false;
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
} // filestorage scopevar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
                  self.firebaseStorageIcon = dom(self.firebaseStorage.root).querySelector('live-localizer-storage-icon');
                  self.firebaseIconTooltip = dom(self.storageIcon.root).querySelector('paper-tooltip[for=card]');
                  self.firebaseTooltip = self.firebaseStorage.$.tooltip;
                  self.firebaseCheckboxes = Array.prototype.reduce.call(dom(self.firebaseStorage.root).querySelectorAll('paper-checkbox'), function (acc, curr) {
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
