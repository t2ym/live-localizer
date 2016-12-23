var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  // basic scope
  var scope = 'basic';
  var basic = new Suite(scope, 'live-localizer with ' + (window.location.href.indexOf('?dom=shadow') >= 0 ? 'Shadow DOM' : 'Shady DOM'));
  basic.test = function (base) {
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
  basic.test = function (base) {
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
  basic.test = function (base) {
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
  basic.test = function (base) {
    return function (_base4) {
      _inherits(CloseDialogTest, _base4);

      function CloseDialogTest() {
        _classCallCheck(this, CloseDialogTest);

        return _possibleConstructorReturn(this, (CloseDialogTest.__proto__ || Object.getPrototypeOf(CloseDialogTest)).apply(this, arguments));
      }

      _createClass(CloseDialogTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  self = this;
                  _context9.next = 3;
                  return regeneratorRuntime.awrap(self.forEvent(self.fab, 'neon-animation-finish', function () {
                    MockInteractions.tap(self.dialog.$.close);
                  }, true));

                case 3:
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
                  assert.isNotOk(this.dialog.opened, 'dialog is not opened');
                  assert.isOk(this.fab.opened, 'fab is opened');

                case 2:
                case 'end':
                  return _context10.stop();
              }
            }
          }, null, this);
        }
      }]);

      return CloseDialogTest;
    }(base);
  };
  basic.test = {
    // test class mixins
    '': [],
    // test classes
    InstantiateTest: {
      OpenDialogTest: '',
      DragFabTest: {
        OpenDialogTest: 'DragFabAndOpenDialogTest'
      }
    },
    OpenDialogTest: {
      CloseDialogTest: 'OpenAndCloseDialogTest',
      DragDialogTest: {
        CloseDialogTest: 'OpenAndDragAndCloseDialogTest'
      }
    }
  };

  // TODO: Refine handlers
  var match = decodeURIComponent(window.location.href).match(/^.*[^_a-zA-Z0-9]TestSuites=([_a-zA-Z0-9,]*).*$/);
  window.testSuites = window.testSuites || {};

  if (match) {
    // Runner
    basic.run(match[1], 'template#basic');
  } else {
    // Driver
    testSuites[scope] = Suite.scopes[scope].test;
  }
  (function _callee() {
    var container, element, main, fab, dialog, panel, model, iconView, listView, storageView, origin;
    return regeneratorRuntime.async(function _callee$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            return _context11.abrupt('return');

          case 4:
          case 'end':
            return _context11.stop();
        }
      }
    }, null, this);
  })();
} // basic scope