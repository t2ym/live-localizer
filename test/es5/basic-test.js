var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
// TODO: move to a common script file
var Suite = function () {
  _createClass(Suite, null, [{
    key: 'reconnectable',
    get: function get() {
      return true;
    }
  }]);

  function Suite(target) {
    _classCallCheck(this, Suite);

    this.target = target;
  }

  _createClass(Suite, [{
    key: 'uncamel',
    value: function uncamel(name) {
      return name
      // insert a hyphen between lower & upper
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      // space before last upper in a sequence followed by lower
      .replace(/\b([A-Z]+)([A-Z])([a-z0-9])/, '$1 $2$3')
      // lowercase
      .toLowerCase();
    }
  }, {
    key: 'setup',
    value: function setup() {
      return regeneratorRuntime.async(function setup$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case 'end':
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: 'forEvent',
    value: function forEvent(element, type, trigger, condition) {
      return new Promise(function (resolve) {
        element.addEventListener(type, function onEvent(event) {
          if (!condition || typeof condition === 'boolean' && condition && Polymer.dom(event).rootTarget === element || typeof condition === 'function' && condition(element, type, event)) {
            element.removeEventListener(type, onEvent);
            resolve(event);
          }
        });
        if (trigger) {
          trigger();
        }
      });
    }
  }, {
    key: 'append',
    value: function append(array, item) {
      array.push(item);
      return array;
    }
  }, {
    key: 'teardown',
    value: function teardown() {
      return regeneratorRuntime.async(function teardown$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
            case 'end':
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: 'run',
    value: function run() {
      var self;
      return regeneratorRuntime.async(function run$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              self = this;

              suite(self.uncamel(self.constructor.name), function _callee2() {
                return regeneratorRuntime.async(function _callee2$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        suiteSetup(function () {
                          return self.setup();
                        });

                        self.scenario.forEach(function (step) {
                          if (step.operation || step.checkpoint) {
                            test(step.name, function _callee() {
                              return regeneratorRuntime.async(function _callee$(_context3) {
                                while (1) {
                                  switch (_context3.prev = _context3.next) {
                                    case 0:
                                      if (!step.operation) {
                                        _context3.next = 3;
                                        break;
                                      }

                                      _context3.next = 3;
                                      return regeneratorRuntime.awrap(step.operation.bind(self).apply());

                                    case 3:
                                      if (!step.checkpoint) {
                                        _context3.next = 6;
                                        break;
                                      }

                                      _context3.next = 6;
                                      return regeneratorRuntime.awrap(step.checkpoint.bind(self).apply());

                                    case 6:
                                    case 'end':
                                      return _context3.stop();
                                  }
                                }
                              }, null, this);
                            });
                          }
                        });

                        suiteTeardown(function () {
                          return self.teardown();
                        });

                      case 3:
                      case 'end':
                        return _context4.stop();
                    }
                  }
                }, null, this);
              });

            case 2:
            case 'end':
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: 'scenario',
    get: function get() {
      // trick to unveil overridden methods
      var self = this;
      var result = [];
      var proto = Object.getPrototypeOf(this);
      while (proto.constructor.name && proto.constructor.name !== 'Object') {
        result.unshift({
          name: self.uncamel(proto.constructor.name),
          operation: proto.hasOwnProperty('operation') ? proto.operation : undefined,
          checkpoint: proto.hasOwnProperty('checkpoint') ? proto.checkpoint : undefined
        });
        proto = Object.getPrototypeOf(proto);
      }
      return result;
    }
  }]);

  return Suite;
}();

var LiveLocalizerSuite = function (_Suite) {
  _inherits(LiveLocalizerSuite, _Suite);

  function LiveLocalizerSuite() {
    _classCallCheck(this, LiveLocalizerSuite);

    return _possibleConstructorReturn(this, (LiveLocalizerSuite.__proto__ || Object.getPrototypeOf(LiveLocalizerSuite)).apply(this, arguments));
  }

  _createClass(LiveLocalizerSuite, [{
    key: 'setup',

    // TODO: Can setup be converted to operation?
    value: function setup() {
      return regeneratorRuntime.async(function setup$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(_get(LiveLocalizerSuite.prototype.__proto__ || Object.getPrototypeOf(LiveLocalizerSuite.prototype), 'setup', this).call(this));

            case 2:
              this.container = document.querySelector(this.target);

            case 3:
            case 'end':
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: 'teardown',
    value: function teardown() {
      var self;
      return regeneratorRuntime.async(function teardown$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              self = this;
              _context7.next = 3;
              return regeneratorRuntime.awrap(_get(LiveLocalizerSuite.prototype.__proto__ || Object.getPrototypeOf(LiveLocalizerSuite.prototype), 'teardown', this).call(this));

            case 3:
              _context7.next = 5;
              return regeneratorRuntime.awrap(self.forEvent(self.container, 'dom-change', function () {
                self.container.if = false;
              }, true));

            case 5:
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

  return LiveLocalizerSuite;
}(Suite);

var InstantiateTest = function (_LiveLocalizerSuite) {
  _inherits(InstantiateTest, _LiveLocalizerSuite);

  function InstantiateTest() {
    _classCallCheck(this, InstantiateTest);

    return _possibleConstructorReturn(this, (InstantiateTest.__proto__ || Object.getPrototypeOf(InstantiateTest)).apply(this, arguments));
  }

  _createClass(InstantiateTest, [{
    key: 'operation',
    value: function operation() {
      var self;
      return regeneratorRuntime.async(function operation$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              self = this;
              _context8.next = 3;
              return regeneratorRuntime.awrap(self.forEvent(self.container, 'dom-change', function () {
                self.container.if = true;
              }, true));

            case 3:
              self.element = document.querySelector('live-localizer');
              _context8.next = 6;
              return regeneratorRuntime.awrap(self.forEvent(self.element, 'bundle-set-fetched'));

            case 6:
              self.main = Polymer.dom(self.element.root).querySelector('live-localizer-main');
              self.fab = Polymer.dom(self.main.root).querySelector('live-localizer-fab');
              self.dialog = Polymer.dom(self.main.root).querySelector('live-localizer-dialog');
              self.panel = Polymer.dom(self.main.root).querySelector('live-localizer-panel');
              self.model = Polymer.dom(self.panel.root).querySelector('live-localizer-model');
              self.iconView = Polymer.dom(self.panel.root).querySelector('live-localizer-locale-icon-view');
              self.listView = Polymer.dom(self.panel.root).querySelector('live-localizer-list-view');
              self.storageView = Polymer.dom(self.panel.root).querySelector('live-localizer-storage-view');

            case 14:
            case 'end':
              return _context8.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: 'checkpoint',
    value: function checkpoint() {
      var self;
      return regeneratorRuntime.async(function checkpoint$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
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
              // dialog status
              assert.isNotOk(self.dialog.opened, 'dialog is not opened');
              assert.isOk(self.fab.opened, 'fab is opened');

            case 21:
            case 'end':
              return _context9.stop();
          }
        }
      }, null, this);
    }
  }]);

  return InstantiateTest;
}(LiveLocalizerSuite);

var OpenDialogTest = function (_InstantiateTest) {
  _inherits(OpenDialogTest, _InstantiateTest);

  function OpenDialogTest() {
    _classCallCheck(this, OpenDialogTest);

    return _possibleConstructorReturn(this, (OpenDialogTest.__proto__ || Object.getPrototypeOf(OpenDialogTest)).apply(this, arguments));
  }

  _createClass(OpenDialogTest, [{
    key: 'operation',
    value: function operation() {
      var self;
      return regeneratorRuntime.async(function operation$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              self = this;
              _context10.next = 3;
              return regeneratorRuntime.awrap(self.forEvent(self.dialog, 'neon-animation-finish', function () {
                MockInteractions.tap(self.fab);
              }, true));

            case 3:
            case 'end':
              return _context10.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: 'checkpoint',
    value: function checkpoint() {
      var self;
      return regeneratorRuntime.async(function checkpoint$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
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
              return _context11.stop();
          }
        }
      }, null, this);
    }
  }]);

  return OpenDialogTest;
}(InstantiateTest);
// TODO: handle parameters


var DragFabTest = function (_InstantiateTest2) {
  _inherits(DragFabTest, _InstantiateTest2);

  function DragFabTest() {
    _classCallCheck(this, DragFabTest);

    return _possibleConstructorReturn(this, (DragFabTest.__proto__ || Object.getPrototypeOf(DragFabTest)).apply(this, arguments));
  }

  _createClass(DragFabTest, [{
    key: 'operation',
    value: function operation() {
      var self;
      return regeneratorRuntime.async(function operation$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              self = this;

              self.dx = 10;
              self.dy = 10;
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
              _context12.next = 8;
              return regeneratorRuntime.awrap(self.forEvent(self.fab, 'track', function () {
                MockInteractions.track(self.fab, self.dx, self.dy);
              }, function (element, type, event) {
                return event.detail.state === 'end';
              }));

            case 8:
            case 'end':
              return _context12.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: 'checkpoint',
    value: function checkpoint() {
      var self, prop;
      return regeneratorRuntime.async(function checkpoint$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              self = this;

              self.expected = { x: self.dx, y: self.dy, width: 0, height: 0 };
              for (prop in self.expected) {
                assert.equal(self.fab[prop], self.origin[prop] + self.expected[prop], 'fab is dragged with ' + 'position' + ' handle by ' + self.expected[prop] + ' in ' + prop);
              }

            case 3:
            case 'end':
              return _context13.stop();
          }
        }
      }, null, this);
    }
  }]);

  return DragFabTest;
}(InstantiateTest);
// TODO: Refine handlers


var match = window.location.href.match(/^.*[^_a-zA-Z0-9]TestSuites=([_a-zA-Z0-9,]*).*$/);
if (match) {
  // Runner
  testSuites = match[1].split(/,/).map(function (name) {
    // TODO: smarter scheme of conversion from class name to class
    switch (name) {
      case 'OpenDialogTest':
        return OpenDialogTest;
      case 'DragFabTest':
        return DragFabTest;
      default:
        return null;
    }
  });
} else {
  // Driver
  testSuites = window.testSuites || {};
  testSuites.basic = [OpenDialogTest, DragFabTest];
}
suite('live-localizer with ' + (window.location.href.indexOf('?dom=Shadow') >= 0 ? 'Shadow DOM' : 'Shady DOM'), function () {
  if (match) {
    testSuites.forEach(function (suite) {
      if (suite) {
        // TODO: handle parameters
        new suite('template#basic').run();
      }
    });
  }
  return;
  // TODO: convert to classes
  var container;
  var element;
  var main;
  var fab;
  var dialog;
  var panel;
  var model;
  var iconView;
  var listView;
  var storageView;
  var origin;

  suiteSetup(function () {
    return new Promise(function (resolve, reject) {
      container = document.querySelector('template#basic');
      container.addEventListener('dom-change', function onDomChange(event) {
        container.removeEventListener('dom-change', onDomChange);
        element = document.querySelector('live-localizer');
        element.addEventListener('bundle-set-fetched', function onBundleSetFetched(event) {
          element.removeEventListener('bundle-set-fetched', onBundleSetFetched);
          main = Polymer.dom(element.root).querySelector('live-localizer-main');
          fab = Polymer.dom(main.root).querySelector('live-localizer-fab');
          dialog = Polymer.dom(main.root).querySelector('live-localizer-dialog');
          panel = Polymer.dom(main.root).querySelector('live-localizer-panel');
          model = Polymer.dom(panel.root).querySelector('live-localizer-model');
          iconView = Polymer.dom(panel.root).querySelector('live-localizer-locale-icon-view');
          listView = Polymer.dom(panel.root).querySelector('live-localizer-list-view');
          storageView = Polymer.dom(panel.root).querySelector('live-localizer-storage-view');
          resolve();
        });
      });
      container.if = true;
    });
  });

  suite('dialog and fab scenario', function () {

    test('instantiate', function () {
      // element existence
      assert.isOk(element, 'live-localizer exists');
      assert.isOk(main, 'live-localizer-main exists');
      assert.isOk(fab, 'live-localizer-fab exists');
      assert.isOk(dialog, 'live-localizer-dialog exists');
      assert.isOk(panel, 'live-localizer-panel exists');
      assert.isOk(model, 'live-localizer-model exists');
      assert.isOk(iconView, 'live-localizer-locale-icon-view exists');
      assert.isOk(listView, 'live-localizer-list-view exists');
      assert.isOk(storageView, 'live-localizer-storage-view exists');
      // elements are instantiated
      assert.equal(element.is, 'live-localizer');
      assert.equal(main.is, 'live-localizer-main');
      assert.equal(fab.is, 'live-localizer-fab');
      assert.equal(dialog.is, 'live-localizer-dialog');
      assert.equal(panel.is, 'live-localizer-panel');
      assert.equal(model.is, 'live-localizer-model');
      assert.equal(iconView.is, 'live-localizer-locale-icon-view');
      assert.equal(listView.is, 'live-localizer-list-view');
      assert.equal(storageView.is, 'live-localizer-storage-view');
      // dialog status
      assert.isNotOk(dialog.opened, 'dialog is not opened');
      assert.isOk(fab.opened, 'fab is opened');
      return Promise.resolve();
    });

    test('open dialog', function () {
      return new Promise(function (resolve, reject) {
        dialog.addEventListener('neon-animation-finish', function onNeonAnimationFinish(event) {
          if (Polymer.dom(event).rootTarget === dialog) {
            dialog.removeEventListener('neon-animation-finish', onNeonAnimationFinish);
            assert.isOk(dialog.opened, 'dialog is opened');
            assert.isNotOk(fab.opened, 'fab is not opened');
            origin = {};
            ['x', 'y', 'width', 'height'].forEach(function (prop) {
              origin[prop] = dialog[prop];
            });
            resolve();
          }
        });
        MockInteractions.tap(fab);
      });
    });

    test('maximize dialog', function () {
      return new Promise(function (resolve, reject) {
        MockInteractions.tap(dialog.$.fullscreen);
        setTimeout(function () {
          assert.isOk(dialog.opened, 'dialog is opened');
          assert.isOk(dialog.fullscreen, 'dialog is in fullscreen');
          resolve();
        }, 100);
      });
    });

    test('unmaximize dialog', function () {
      return new Promise(function (resolve, reject) {
        MockInteractions.tap(dialog.$['fullscreen-exit']);
        setTimeout(function () {
          assert.isOk(dialog.opened, 'dialog is opened');
          assert.isNotOk(dialog.fullscreen, 'dialog is not in fullscreen');
          resolve();
        }, 100);
      });
    });

    var dx = 10;
    var dy = 10;
    [{ mode: 'position', dx: dx, dy: dy, expected: { x: dx, y: dy, width: 0, height: 0 } }, { mode: 'upper-left', dx: -dx, dy: -dy, expected: { x: -dx, y: -dy, width: dx, height: dy } }, { mode: 'upper', dx: -dx, dy: -dy, expected: { x: 0, y: -dy, width: 0, height: dy } }, { mode: 'upper-right', dx: dx, dy: -dy, expected: { x: 0, y: -dy, width: dx, height: dy } }, { mode: 'middle-left', dx: -dx, dy: dy, expected: { x: -dx, y: 0, width: dx, height: 0 } }, { mode: 'middle-right', dx: dx, dy: dy, expected: { x: 0, y: 0, width: dx, height: 0 } }, { mode: 'lower-left', dx: -dx, dy: dy, expected: { x: -dx, y: 0, width: dx, height: dy } }, { mode: 'lower', dx: dx, dy: dy, expected: { x: 0, y: 0, width: 0, height: dy } }, { mode: 'lower-right', dx: dx, dy: dy, expected: { x: 0, y: 0, width: dx, height: dy } }, { mode: '.title-pad', dx: dx, dy: dy, expected: { x: 0, y: 0, width: 0, height: 0 } }].forEach(function (params) {
      test('drag dialog by ' + params.mode + ' handle', function () {
        return new Promise(function (resolve, reject) {
          var dx = params.dx;
          var dy = params.dy;
          var handle = dialog.$.handle.querySelector(params.mode.match(/^[.]/) ? params.mode : '[drag-handle-mode=' + params.mode + ']');
          ['x', 'y', 'width', 'height'].forEach(function (prop) {
            origin[prop] = dialog[prop];
          });
          dialog.addEventListener('track', function onTrack(event) {
            if (Polymer.dom(event).rootTarget === dialog) {
              if (event.detail.state === 'end') {
                dialog.removeEventListener('track', onTrack);
                for (var prop in params.expected) {
                  assert.equal(dialog[prop], origin[prop] + params.expected[prop], 'dialog is dragged with ' + params.mode + ' handle by ' + params.expected[prop] + ' in ' + prop);
                }
                resolve();
              }
            }
          });
          handle.dispatchEvent(new MouseEvent('mouseover', {
            bubbles: true,
            cancelable: true,
            clientX: 0,
            clientY: 0,
            buttons: 1
          }));
          MockInteractions.track(dialog, dx, dy);
        });
      });
    });

    [{ x: -100, y: -100, width: 10000, height: 10000 }, { x: window.innerWidth / 2, y: window.innerHeight / 2, width: window.innerWidth * 0.75, height: window.innerHeight * 0.75 }].forEach(function (dimension) {
      test('reset dialog position on window resize', function () {
        return new Promise(function (resolve, reject) {
          dialog.x = dimension.x;
          dialog.y = dimension.y;
          dialog.width = dimension.width;
          dialog.height = dimension.height;
          dialog.addEventListener('resize', function onResize(event) {
            if (Polymer.dom(event).rootTarget === dialog) {
              dialog.removeEventListener('resize', onResize);
              setTimeout(function () {
                assert.isOk(dialog.x >= 0, 'x is non-negative');
                assert.isOk(dialog.y >= 0, 'y is non-negative');
                assert.isOk(dialog.width <= window.innerWidth, 'width is within innerWidth');
                assert.isOk(dialog.height <= window.innerHeight, 'height is within innerHeight');
                ['x', 'y', 'width', 'height'].forEach(function (prop) {
                  dialog[prop] = origin[prop];
                });
                resolve();
              }, 100);
            }
          });
          dialog.fire('resize');
        });
      });
    });

    test('close dialog', function () {
      return new Promise(function (resolve, reject) {
        fab.addEventListener('neon-animation-finish', function onNeonAnimationFinish(event) {
          if (Polymer.dom(event).rootTarget === fab) {
            fab.removeEventListener('neon-animation-finish', onNeonAnimationFinish);
            assert.isNotOk(dialog.opened, 'dialog is not opened');
            assert.isOk(fab.opened, 'fab is opened');
            resolve();
          }
        });
        MockInteractions.tap(dialog.$.close);
      });
    });

    [{ mode: 'position', dx: dx, dy: dy, expected: { x: dx, y: dy, width: 0, height: 0 } }].forEach(function (params) {
      test('drag fab', function () {
        return new Promise(function (resolve, reject) {
          var dx = params.dx;
          var dy = params.dy;
          var origin = {};
          ['x', 'y', 'width', 'height'].forEach(function (prop) {
            origin[prop] = fab[prop];
          });
          fab.addEventListener('track', function onTrack(event) {
            if (Polymer.dom(event).rootTarget === fab) {
              if (event.detail.state === 'end') {
                fab.removeEventListener('track', onTrack);
                for (var prop in params.expected) {
                  assert.equal(fab[prop], origin[prop] + params.expected[prop], 'fab is dragged with ' + params.mode + ' handle by ' + params.expected[prop] + ' in ' + prop);
                }
                resolve();
              }
            }
          });
          fab.dispatchEvent(new MouseEvent('mouseover', {
            bubbles: true,
            cancelable: true,
            clientX: 0,
            clientY: 0,
            buttons: 1
          }));
          MockInteractions.track(fab, dx, dy);
        });
      });
    });

    [{ x: -100, y: window.innerHeight + 100 }, { x: window.innerWidth + 100, y: -100 }].forEach(function (dimension) {
      test('reset fab position on window resize', function () {
        return new Promise(function (resolve, reject) {
          fab.x = dimension.x;
          fab.y = dimension.y;
          fab.addEventListener('resize', function onResize(event) {
            if (Polymer.dom(event).rootTarget === fab) {
              fab.removeEventListener('resize', onResize);
              setTimeout(function () {
                assert.isOk(fab.x >= 0, 'x is non-negative');
                assert.isOk(fab.y >= 0, 'y is non-negative');
                assert.isOk(fab.x + 56 <= window.innerWidth, 'width is within innerWidth');
                assert.isOk(fab.y + 56 <= window.innerHeight, 'height is within innerHeight');
                fab.reset = false;
                fab.resetPosition();
                resolve();
              }, 100);
            }
          });
          fab.fire('resize');
        });
      });
    });
  });

  suiteTeardown(function () {
    container.if = false;
    return Promise.resolve();
  });
});