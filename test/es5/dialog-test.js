var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
                  self.main = Polymer.dom(self.element.root).querySelector('live-localizer-main');

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
} // dialog scope