var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

    if (this.constructor.name === 'Suite') {
      // suite instance
      this.scope = target || '';
      this.classes = {};
      this.leafClasses = {};
      this.branchScenarios = {};
      this.mixins = {};
      this.constructor.scopes = this.constructor.scopes || {};
      this.constructor.scopes[this.scope] = this;
    } else {
      // test instance
      this.target = target;
    }
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
    key: 'testClasses',
    value: function testClasses(csv) {
      var self = this;
      return csv.split(/,/).map(function (name) {
        if (!self.classes[name]) {
          throw new Error('Suite.' + self.scope + ': Test ' + name + ' is not defined');
        }
        return self.classes[name];
      });
    }
  }, {
    key: 'updateLeafClasses',
    value: function updateLeafClasses(value) {
      var proto = value;
      var chain = [];
      var name = proto.name;
      var isLeaf = true;
      var scenario = '';
      while (proto.name && proto.name !== 'Suite') {
        chain.unshift(proto.name);
        proto = Object.getPrototypeOf(proto);
      }
      for (var i in chain) {
        scenario = scenario ? scenario + ',' + chain[i] : chain[i];
        if (i < chain.length - 1) {
          if (!this.branchScenarios[scenario]) {
            this.branchScenarios[scenario] = true;
          }
          if (this.leafClasses[chain[i]]) {
            delete this.leafClasses[chain[i]];
          }
        } else {
          if (this.branchScenarios[scenario]) {
            isLeaf = false;
          }
        }
      }
      if (isLeaf) {
        this.leafClasses[name] = value;
      }
    }
  }, {
    key: 'generateClasses',
    value: function generateClasses(branch, chain) {
      if (typeof branch === 'string') {
        console.log('string', branch || chain[chain.length - 1], chain);
        this.generateClass(branch, chain);
      } else if ((typeof branch === 'undefined' ? 'undefined' : _typeof(branch)) === 'object') {
        if (branch) {
          for (var prop in branch) {
            chain.push(prop);
            this.generateClasses(branch[prop], chain);
            chain.pop();
          }
        } else {
          console.log('null', branch, chain);
          this.generateClass(branch, chain);
        }
      } else {
        throw new Error(this.constructor.name + '.' + this.scope + ': unknown branch type ' + (typeof branch === 'undefined' ? 'undefined' : _typeof(branch)) + branch);
      }
    }
  }, {
    key: 'generateClass',
    value: function generateClass(name, chain) {
      var _this = this;

      var self = this;
      var expression = void 0;
      if (!(chain.length >= (chain[0] ? 1 : 2))) {
        throw new Error(this.constructor.name + '.' + this.scope + ':generateClass invalid chain.length ' + chain.length);
      }
      if (!name) {
        name = chain[chain.length - 1];
      }
      if (!chain[0]) {
        // class mixin
        if (self.mixins[name]) {
          throw new Error(this.constructor.name + '.' + this.scope + ':generateClass mixin ' + name + ' already exists');
        }
        chain.forEach(function (c, i) {
          if (i === 0) {
            expression = 'base';
          } else if (self.mixins[c]) {
            expression = 'self.mixins.' + c + '(' + expression + ')';
          } else {
            throw new Error(_this.constructor.name + '.' + _this.scope + ':generateClass mixin ' + c + ' does not exist');
          }
        });
        expression = 'return (base) => ' + expression;
        self.mixins[name] = new Function('self', expression)(self);
        console.log('generateClass mixins.' + name + ' = ' + expression);
      } else {
        // class
        if (this.classes[name]) {
          throw new Error(this.constructor.name + '.' + this.scope + ':generateClass class ' + name + ' already exists');
        }
        chain.forEach(function (c, i) {
          if (i === 0) {
            if (self.classes[c]) {
              expression = 'self.classes.' + c;
            } else if (new Function('return (typeof ' + c + ' === "function" && (new ' + c + '()) instanceof ' + self.constructor.name + ')')()) {
              expression = c;
            } else {
              throw new Error(_this.constructor.name + '.' + _this.scope + ':generateClass global test class ' + c + ' does not exist');
            }
          } else if (self.mixins[c]) {
            expression = 'self.mixins.' + c + '(' + expression + ')';
          } else {
            throw new Error(_this.constructor.name + '.' + _this.scope + ':generateClass mixin ' + c + ' does not exist');
          }
        });
        expression = chain.length === 1 && name === expression ? 'return ' + name : name === chain[chain.length - 1] ? 'return ' + expression : 'return class ' + name + ' extends ' + expression + ' {}';
        self.classes[name] = new Function('self', expression)(self);
        self.updateLeafClasses(self.classes[name]);
        console.log('generateClass classes.' + name + ' = ' + expression);
      }
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
    key: 'scenario',
    value: regeneratorRuntime.mark(function scenario() {
      var steps, proto;
      return regeneratorRuntime.wrap(function scenario$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // trick to unveil overridden methods
              steps = [];
              proto = Object.getPrototypeOf(this);

              while (proto.constructor.name && proto.constructor.name !== 'Object') {
                steps.unshift({
                  name: this.uncamel(proto.constructor.name),
                  iteration: proto.hasOwnProperty('iteration') ? proto.iteration : undefined,
                  operation: proto.hasOwnProperty('operation') ? proto.operation : undefined,
                  checkpoint: proto.hasOwnProperty('checkpoint') ? proto.checkpoint : undefined
                });
                proto = Object.getPrototypeOf(proto);
              }
              return _context2.delegateYield(steps, 't0', 4);

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, scenario, this);
    })
  }, {
    key: 'teardown',
    value: function teardown() {
      return regeneratorRuntime.async(function teardown$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
            case 'end':
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: 'run',
    value: function run() {
      var self;
      return regeneratorRuntime.async(function run$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              self = this;

              suite(self.uncamel(self.constructor.name), function _callee5() {
                var _loop, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, step;

                return regeneratorRuntime.async(function _callee5$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        suiteSetup(function _callee() {
                          return regeneratorRuntime.async(function _callee$(_context4) {
                            while (1) {
                              switch (_context4.prev = _context4.next) {
                                case 0:
                                  _context4.next = 2;
                                  return regeneratorRuntime.awrap(self.setup());

                                case 2:
                                case 'end':
                                  return _context4.stop();
                              }
                            }
                          }, null, this);
                        });

                        _loop = function _loop(step) {
                          if (step.operation || step.checkpoint) {
                            if (step.iteration) {
                              var _loop2 = function _loop2(parameters) {
                                test(parameters.name ? typeof parameters.name === 'function' ? parameters.name(parameters) : parameters.name : step.name, function _callee3() {
                                  return regeneratorRuntime.async(function _callee3$(_context6) {
                                    while (1) {
                                      switch (_context6.prev = _context6.next) {
                                        case 0:
                                          if (!step.operation) {
                                            _context6.next = 3;
                                            break;
                                          }

                                          _context6.next = 3;
                                          return regeneratorRuntime.awrap(step.operation.call(self, parameters));

                                        case 3:
                                          if (!step.checkpoint) {
                                            _context6.next = 6;
                                            break;
                                          }

                                          _context6.next = 6;
                                          return regeneratorRuntime.awrap(step.checkpoint.call(self, parameters));

                                        case 6:
                                        case 'end':
                                          return _context6.stop();
                                      }
                                    }
                                  }, null, this);
                                });
                              };

                              // suite() has to be commented out since subsuites are executed after all the other sibling tests
                              //suite(step.name + ' iterations', async function () {
                              var _iteratorNormalCompletion2 = true;
                              var _didIteratorError2 = false;
                              var _iteratorError2 = undefined;

                              try {
                                for (var _iterator2 = step.iteration.apply(self)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                  var parameters = _step2.value;

                                  _loop2(parameters);
                                }
                                //});
                              } catch (err) {
                                _didIteratorError2 = true;
                                _iteratorError2 = err;
                              } finally {
                                try {
                                  if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                    _iterator2.return();
                                  }
                                } finally {
                                  if (_didIteratorError2) {
                                    throw _iteratorError2;
                                  }
                                }
                              }
                            } else {
                              test(step.name, function _callee4() {
                                return regeneratorRuntime.async(function _callee4$(_context7) {
                                  while (1) {
                                    switch (_context7.prev = _context7.next) {
                                      case 0:
                                        if (!step.operation) {
                                          _context7.next = 3;
                                          break;
                                        }

                                        _context7.next = 3;
                                        return regeneratorRuntime.awrap(step.operation.call(self));

                                      case 3:
                                        if (!step.checkpoint) {
                                          _context7.next = 6;
                                          break;
                                        }

                                        _context7.next = 6;
                                        return regeneratorRuntime.awrap(step.checkpoint.call(self));

                                      case 6:
                                      case 'end':
                                        return _context7.stop();
                                    }
                                  }
                                }, null, this);
                              });
                            }
                          }
                        };

                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context8.prev = 5;
                        for (_iterator = self.scenario()[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                          step = _step.value;

                          _loop(step);
                        }

                        _context8.next = 13;
                        break;

                      case 9:
                        _context8.prev = 9;
                        _context8.t0 = _context8['catch'](5);
                        _didIteratorError = true;
                        _iteratorError = _context8.t0;

                      case 13:
                        _context8.prev = 13;
                        _context8.prev = 14;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                          _iterator.return();
                        }

                      case 16:
                        _context8.prev = 16;

                        if (!_didIteratorError) {
                          _context8.next = 19;
                          break;
                        }

                        throw _iteratorError;

                      case 19:
                        return _context8.finish(16);

                      case 20:
                        return _context8.finish(13);

                      case 21:
                        suiteTeardown(function _callee2() {
                          return regeneratorRuntime.async(function _callee2$(_context5) {
                            while (1) {
                              switch (_context5.prev = _context5.next) {
                                case 0:
                                  _context5.next = 2;
                                  return regeneratorRuntime.awrap(self.teardown());

                                case 2:
                                case 'end':
                                  return _context5.stop();
                              }
                            }
                          }, null, this);
                        });

                      case 22:
                      case 'end':
                        return _context8.stop();
                    }
                  }
                }, null, this, [[5, 9, 13, 21], [14,, 16, 20]]);
              });

            case 2:
            case 'end':
              return _context9.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: 'test',
    set: function set(value) {
      if (typeof value === 'function') {
        if (value.name) {
          // test class
          if (this.classes[value.name]) {
            // test class with the name already exists
            throw new Error(this.constructor.name + '.' + this.scope + ': class ' + value.name + ' already exists');
          } else {
            // register a new test class with the name
            this.classes[value.name] = value;
            this.updateLeafClasses(value);
          }
        } else {
          // test class mixin
          var name = value(null).name;
          if (name) {
            if (this.mixins[name]) {
              // test class mixin with the name already exists
              throw new Error(this.constructor.name + '.' + this.scope + ': class mixin ' + name + ' already exists');
            } else {
              // register a new test class mixin with the name
              this.mixins[name] = value;
            }
          } else {
            // no name for the test class mixin
            throw new Error(this.constructor.name + '.' + this.scope + ': class mixin has no name ' + value.toString());
          }
        }
      } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
        if (value) {
          // branch object
          this.generateClasses(value, []);
        } else {
          throw new Error(this.constructor.name + '.' + this.scope + ': null object is not expected');
        }
      }
    },
    get: function get() {
      var list = [];
      for (var c in this.leafClasses) {
        list.push(this.leafClasses[c]);
      }
      var reconnectableList = [];
      for (var i in list) {
        if (list[i].reconnectable) {
          if (reconnectableList.length === 0) {
            reconnectableList.push([list[i]]);
          } else {
            var last = reconnectableList[reconnectableList.length - 1];
            if (last.length === 0) {
              last.push(list[i]);
            } else {
              if (last[last.length - 1].reconnectable) {
                last.push(list[i]);
              } else {
                reconnectableList.push([list[i]]);
              }
            }
          }
        } else {
          reconnectableList.push([list[i]]);
        }
      }
      // [ 'UnreconnectableTest', 'ReconnectableTest,ReconnectableTest,...', 'UnreconnectableTest', ...]
      return reconnectableList.map(function (l) {
        return l.map(function (c) {
          return c.name;
        }).join(',');
      });
    }
  }]);

  return Suite;
}();

// global test classes


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
      return regeneratorRuntime.async(function setup$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return regeneratorRuntime.awrap(_get(LiveLocalizerSuite.prototype.__proto__ || Object.getPrototypeOf(LiveLocalizerSuite.prototype), 'setup', this).call(this));

            case 2:
              this.container = document.querySelector(this.target);

            case 3:
            case 'end':
              return _context10.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: 'teardown',
    value: function teardown() {
      var self;
      return regeneratorRuntime.async(function teardown$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              self = this;
              _context11.next = 3;
              return regeneratorRuntime.awrap(_get(LiveLocalizerSuite.prototype.__proto__ || Object.getPrototypeOf(LiveLocalizerSuite.prototype), 'teardown', this).call(this));

            case 3:
              _context11.next = 5;
              return regeneratorRuntime.awrap(self.forEvent(self.container, 'dom-change', function () {
                self.container.if = false;
              }, true));

            case 5:
            case 'end':
              return _context11.stop();
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
      return regeneratorRuntime.async(function operation$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              self = this;
              _context12.next = 3;
              return regeneratorRuntime.awrap(self.forEvent(self.container, 'dom-change', function () {
                self.container.if = true;
              }, true));

            case 3:
              self.element = document.querySelector('live-localizer');
              _context12.next = 6;
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
              return _context12.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: 'checkpoint',
    value: function checkpoint() {
      var self;
      return regeneratorRuntime.async(function checkpoint$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
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
              return _context13.stop();
          }
        }
      }, null, this);
    }
  }]);

  return InstantiateTest;
}(LiveLocalizerSuite);

var DummyTest1 = function (_Suite2) {
  _inherits(DummyTest1, _Suite2);

  function DummyTest1() {
    _classCallCheck(this, DummyTest1);

    return _possibleConstructorReturn(this, (DummyTest1.__proto__ || Object.getPrototypeOf(DummyTest1)).apply(this, arguments));
  }

  _createClass(DummyTest1, [{
    key: 'operation',
    value: function operation() {
      return regeneratorRuntime.async(function operation$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              console.log('DummyTest 1 operation');

            case 1:
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
              console.log('Checkpoint for DummyTest 1');

            case 1:
            case 'end':
              return _context15.stop();
          }
        }
      }, null, this);
    }
  }]);

  return DummyTest1;
}(Suite);

var DummyTest2 = function (_Suite3) {
  _inherits(DummyTest2, _Suite3);

  function DummyTest2() {
    _classCallCheck(this, DummyTest2);

    return _possibleConstructorReturn(this, (DummyTest2.__proto__ || Object.getPrototypeOf(DummyTest2)).apply(this, arguments));
  }

  _createClass(DummyTest2, [{
    key: 'operation',
    value: function operation() {
      return regeneratorRuntime.async(function operation$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              console.log('DummyTest 2 operation');

            case 1:
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
              console.log('Checkpoint for DummyTest 2');

            case 1:
            case 'end':
              return _context17.stop();
          }
        }
      }, null, this);
    }
  }]);

  return DummyTest2;
}(Suite);

var DummyTest3 = function (_DummyTest) {
  _inherits(DummyTest3, _DummyTest);

  function DummyTest3() {
    _classCallCheck(this, DummyTest3);

    return _possibleConstructorReturn(this, (DummyTest3.__proto__ || Object.getPrototypeOf(DummyTest3)).apply(this, arguments));
  }

  _createClass(DummyTest3, [{
    key: 'operation',
    value: function operation() {
      return regeneratorRuntime.async(function operation$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              console.log('DummyTest 3 operation');

            case 1:
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
              console.log('Checkpoint for DummyTest 3');

            case 1:
            case 'end':
              return _context19.stop();
          }
        }
      }, null, this);
    }
  }]);

  return DummyTest3;
}(DummyTest2);

{
  (function () {
    // basic scope
    var scope = 'basic';
    var basic = new Suite(scope);
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
            return regeneratorRuntime.async(function operation$(_context20) {
              while (1) {
                switch (_context20.prev = _context20.next) {
                  case 0:
                    self = this;
                    _context20.next = 3;
                    return regeneratorRuntime.awrap(self.forEvent(self.dialog, 'neon-animation-finish', function () {
                      MockInteractions.tap(self.fab);
                    }, true));

                  case 3:
                  case 'end':
                    return _context20.stop();
                }
              }
            }, null, this);
          }
        }, {
          key: 'checkpoint',
          value: function checkpoint() {
            var self;
            return regeneratorRuntime.async(function checkpoint$(_context21) {
              while (1) {
                switch (_context21.prev = _context21.next) {
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
                    return _context21.stop();
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
            return regeneratorRuntime.wrap(function iteration$(_context22) {
              while (1) {
                switch (_context22.prev = _context22.next) {
                  case 0:
                    dx = 10;
                    dy = 10;
                    return _context22.delegateYield([{ mode: 'position', dx: dx, dy: dy, expected: { x: dx, y: dy, width: 0, height: 0 } }, { mode: 'upper-left', dx: -dx, dy: -dy, expected: { x: -dx, y: -dy, width: dx, height: dy } }, { mode: 'upper', dx: -dx, dy: -dy, expected: { x: 0, y: -dy, width: 0, height: dy } }, { mode: 'upper-right', dx: dx, dy: -dy, expected: { x: 0, y: -dy, width: dx, height: dy } }, { mode: 'middle-left', dx: -dx, dy: dy, expected: { x: -dx, y: 0, width: dx, height: 0 } }, { mode: 'middle-right', dx: dx, dy: dy, expected: { x: 0, y: 0, width: dx, height: 0 } }, { mode: 'lower-left', dx: -dx, dy: dy, expected: { x: -dx, y: 0, width: dx, height: dy } }, { mode: 'lower', dx: dx, dy: dy, expected: { x: 0, y: 0, width: 0, height: dy } }, { mode: 'lower-right', dx: dx, dy: dy, expected: { x: 0, y: 0, width: dx, height: dy } }, { mode: '.title-pad', dx: dx, dy: dy, expected: { x: 0, y: 0, width: 0, height: 0 } }].map(function (parameters) {
                      parameters.name = 'drag dialog by ' + parameters.mode + ' handle';return parameters;
                    }), 't0', 3);

                  case 3:
                  case 'end':
                    return _context22.stop();
                }
              }
            }, iteration, this);
          })
        }, {
          key: 'operation',
          value: function operation(parameters) {
            var self, handle;
            return regeneratorRuntime.async(function operation$(_context23) {
              while (1) {
                switch (_context23.prev = _context23.next) {
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
                    _context23.next = 7;
                    return regeneratorRuntime.awrap(self.forEvent(self.dialog, 'track', function () {
                      MockInteractions.track(self.dialog, parameters.dx, parameters.dy);
                    }, function (element, type, event) {
                      return event.detail.state === 'end';
                    }));

                  case 7:
                  case 'end':
                    return _context23.stop();
                }
              }
            }, null, this);
          }
        }, {
          key: 'checkpoint',
          value: function checkpoint(parameters) {
            var prop;
            return regeneratorRuntime.async(function checkpoint$(_context24) {
              while (1) {
                switch (_context24.prev = _context24.next) {
                  case 0:
                    for (prop in parameters.expected) {
                      assert.equal(this.dialog[prop], this.origin[prop] + parameters.expected[prop], 'dialog is dragged with ' + parameters.mode + ' handle by ' + parameters.expected[prop] + ' in ' + prop);
                    }

                  case 1:
                  case 'end':
                    return _context24.stop();
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
            return regeneratorRuntime.wrap(function iteration$(_context25) {
              while (1) {
                switch (_context25.prev = _context25.next) {
                  case 0:
                    dx = 10;
                    dy = 10;
                    return _context25.delegateYield([{ mode: 'position', dx: dx, dy: dy, expected: { x: dx, y: dy, width: 0, height: 0 } }], 't0', 3);

                  case 3:
                  case 'end':
                    return _context25.stop();
                }
              }
            }, iteration, this);
          })
        }, {
          key: 'operation',
          value: function operation(parameters) {
            var self;
            return regeneratorRuntime.async(function operation$(_context26) {
              while (1) {
                switch (_context26.prev = _context26.next) {
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
                    _context26.next = 6;
                    return regeneratorRuntime.awrap(self.forEvent(self.fab, 'track', function () {
                      MockInteractions.track(self.fab, parameters.dx, parameters.dy);
                    }, function (element, type, event) {
                      return event.detail.state === 'end';
                    }));

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
            var prop;
            return regeneratorRuntime.async(function checkpoint$(_context27) {
              while (1) {
                switch (_context27.prev = _context27.next) {
                  case 0:
                    for (prop in parameters.expected) {
                      assert.equal(this.fab[prop], this.origin[prop] + parameters.expected[prop], 'fab is dragged with ' + parameters.mode + ' handle by ' + parameters.expected[prop] + ' in ' + prop);
                    }

                  case 1:
                  case 'end':
                    return _context27.stop();
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
            return regeneratorRuntime.async(function operation$(_context28) {
              while (1) {
                switch (_context28.prev = _context28.next) {
                  case 0:
                    self = this;
                    _context28.next = 3;
                    return regeneratorRuntime.awrap(self.forEvent(self.fab, 'neon-animation-finish', function () {
                      MockInteractions.tap(self.dialog.$.close);
                    }, true));

                  case 3:
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
                    assert.isNotOk(this.dialog.opened, 'dialog is not opened');
                    assert.isOk(this.fab.opened, 'fab is opened');

                  case 2:
                  case 'end':
                    return _context29.stop();
                }
              }
            }, null, this);
          }
        }]);

        return CloseDialogTest;
      }(base);
    };
    basic.test = function (base) {
      return function (_base5) {
        _inherits(TestA, _base5);

        function TestA() {
          _classCallCheck(this, TestA);

          return _possibleConstructorReturn(this, (TestA.__proto__ || Object.getPrototypeOf(TestA)).apply(this, arguments));
        }

        _createClass(TestA, [{
          key: 'operation',
          value: function operation() {
            return regeneratorRuntime.async(function operation$(_context30) {
              while (1) {
                switch (_context30.prev = _context30.next) {
                  case 0:
                    console.log('Test A operation');

                  case 1:
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
                    console.log('Checkpoint for Test A');

                  case 1:
                  case 'end':
                    return _context31.stop();
                }
              }
            }, null, this);
          }
        }]);

        return TestA;
      }(base);
    };
    basic.test = function (base) {
      return function (_base6) {
        _inherits(TestB, _base6);

        function TestB() {
          _classCallCheck(this, TestB);

          return _possibleConstructorReturn(this, (TestB.__proto__ || Object.getPrototypeOf(TestB)).apply(this, arguments));
        }

        _createClass(TestB, [{
          key: 'operation',
          value: function operation() {
            return regeneratorRuntime.async(function operation$(_context32) {
              while (1) {
                switch (_context32.prev = _context32.next) {
                  case 0:
                    console.log('Test B operation');

                  case 1:
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
                    console.log('Checkpoint for Test B');

                  case 1:
                  case 'end':
                    return _context33.stop();
                }
              }
            }, null, this);
          }
        }]);

        return TestB;
      }(base);
    };
    basic.test = function (base) {
      return function (_base7) {
        _inherits(Test1, _base7);

        function Test1() {
          _classCallCheck(this, Test1);

          return _possibleConstructorReturn(this, (Test1.__proto__ || Object.getPrototypeOf(Test1)).apply(this, arguments));
        }

        _createClass(Test1, [{
          key: 'operation',
          value: function operation() {
            return regeneratorRuntime.async(function operation$(_context34) {
              while (1) {
                switch (_context34.prev = _context34.next) {
                  case 0:
                    console.log('Test 1 operation');

                  case 1:
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
                    console.log('Checkpoint for Test 1');

                  case 1:
                  case 'end':
                    return _context35.stop();
                }
              }
            }, null, this);
          }
        }]);

        return Test1;
      }(base);
    };
    basic.test = function (base) {
      return function (_base8) {
        _inherits(Test2, _base8);

        function Test2() {
          _classCallCheck(this, Test2);

          return _possibleConstructorReturn(this, (Test2.__proto__ || Object.getPrototypeOf(Test2)).apply(this, arguments));
        }

        _createClass(Test2, [{
          key: 'operation',
          value: function operation() {
            return regeneratorRuntime.async(function operation$(_context36) {
              while (1) {
                switch (_context36.prev = _context36.next) {
                  case 0:
                    console.log('Test 2 operation');

                  case 1:
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
                    console.log('Checkpoint for Test 2');

                  case 1:
                  case 'end':
                    return _context37.stop();
                }
              }
            }, null, this);
          }
        }]);

        return Test2;
      }(base);
    };
    basic.test = function (_InstantiateTest) {
      _inherits(TestC, _InstantiateTest);

      function TestC() {
        _classCallCheck(this, TestC);

        return _possibleConstructorReturn(this, (TestC.__proto__ || Object.getPrototypeOf(TestC)).apply(this, arguments));
      }

      _createClass(TestC, [{
        key: 'operation',
        value: function operation() {
          return regeneratorRuntime.async(function operation$(_context38) {
            while (1) {
              switch (_context38.prev = _context38.next) {
                case 0:
                  console.log('Test C operation');

                case 1:
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
                  console.log('Checkpoint for Test C');

                case 1:
                case 'end':
                  return _context39.stop();
              }
            }
          }, null, this);
        }
      }]);

      return TestC;
    }(InstantiateTest);
    basic.test = function (_Suite4) {
      _inherits(TestD, _Suite4);

      function TestD() {
        _classCallCheck(this, TestD);

        return _possibleConstructorReturn(this, (TestD.__proto__ || Object.getPrototypeOf(TestD)).apply(this, arguments));
      }

      _createClass(TestD, [{
        key: 'operation',
        value: function operation() {
          return regeneratorRuntime.async(function operation$(_context40) {
            while (1) {
              switch (_context40.prev = _context40.next) {
                case 0:
                  console.log('Test D operation');

                case 1:
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
                  console.log('Checkpoint for Test D');

                case 1:
                case 'end':
                  return _context41.stop();
              }
            }
          }, null, this);
        }
      }]);

      return TestD;
    }(Suite);
    basic.test = function (_Suite5) {
      _inherits(TestE, _Suite5);

      function TestE() {
        _classCallCheck(this, TestE);

        return _possibleConstructorReturn(this, (TestE.__proto__ || Object.getPrototypeOf(TestE)).apply(this, arguments));
      }

      _createClass(TestE, [{
        key: 'operation',
        value: function operation() {
          return regeneratorRuntime.async(function operation$(_context42) {
            while (1) {
              switch (_context42.prev = _context42.next) {
                case 0:
                  console.log('Test D operation');

                case 1:
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
                  console.log('Checkpoint for Test D');

                case 1:
                case 'end':
                  return _context43.stop();
              }
            }
          }, null, this);
        }
      }]);

      return TestE;
    }(Suite);
    basic.test = {
      // test class mixins
      '': {
        TestA: {
          TestB: 'TestAThenB'
        },
        TestB: {
          TestA: 'TestBThenA'
        }
      },
      // test classes
      InstantiateTest: {
        TestAThenB: 'TestABAtInitial',
        OpenDialogTest: '',
        DragFabTest: {
          OpenDialogTest: 'DragFabAndOpenDialogTest'
        }
      },
      OpenDialogTest: {
        CloseDialogTest: 'OpenAndCloseDialogTest',
        DragDialogTest: {
          TestBThenA: {
            CloseDialogTest: 'OpenAndDragAndTestBAAndCloseDialogTest'
          }
        }
      },
      TestC: {
        TestAThenB: 'TestCAB'
      },
      TestD: 'TestDAlias',
      DummyTest1: '',
      DummyTest2: 'DummyTest2Alias',
      DummyTest3: '',
      TestE: {
        TestA: {
          TestB: {
            Test1: {
              Test2: 'TestEAB12'
            }
          }
        },
        TestB: {
          Test1: ''
        }
      }
    };

    // TODO: Refine handlers
    var match = decodeURIComponent(window.location.href).match(/^.*[^_a-zA-Z0-9]TestSuites=([_a-zA-Z0-9,]*).*$/);
    window.testSuites = window.testSuites || {};

    if (match) {
      // Runner
      testSuites = Suite.scopes[scope].testClasses(match[1]);
    } else {
      // Driver
      testSuites[scope] = Suite.scopes[scope].test;
    }
    (function _callee8() {
      return regeneratorRuntime.async(function _callee8$(_context46) {
        while (1) {
          switch (_context46.prev = _context46.next) {
            case 0:
              suite('live-localizer with ' + (window.location.href.indexOf('?dom=Shadow') >= 0 ? 'Shadow DOM' : 'Shady DOM'), function _callee7() {
                var _this18 = this;

                var container, element, main, fab, dialog, panel, model, iconView, listView, storageView, origin;
                return regeneratorRuntime.async(function _callee7$(_context45) {
                  while (1) {
                    switch (_context45.prev = _context45.next) {
                      case 0:
                        if (match) {
                          testSuites.forEach(function _callee6(s) {
                            return regeneratorRuntime.async(function _callee6$(_context44) {
                              while (1) {
                                switch (_context44.prev = _context44.next) {
                                  case 0:
                                    if (!s) {
                                      _context44.next = 3;
                                      break;
                                    }

                                    _context44.next = 3;
                                    return regeneratorRuntime.awrap(new s('template#basic').run());

                                  case 3:
                                  case 'end':
                                    return _context44.stop();
                                }
                              }
                            }, null, _this18);
                          });
                        }
                        return _context45.abrupt('return');

                      case 5:
                      case 'end':
                        return _context45.stop();
                    }
                  }
                }, null, this);
              });

            case 1:
            case 'end':
              return _context46.stop();
          }
        }
      }, null, this);
    })();
  })();
} // basic scope