'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

mocha.setup({ slow: 2000 });
// global test classes

var DemoSuite = function (_Suite) {
  _inherits(DemoSuite, _Suite);

  function DemoSuite() {
    _classCallCheck(this, DemoSuite);

    return _possibleConstructorReturn(this, (DemoSuite.__proto__ || Object.getPrototypeOf(DemoSuite)).apply(this, arguments));
  }

  _createClass(DemoSuite, [{
    key: 'setup',
    value: function setup() {
      return regeneratorRuntime.async(function setup$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(_get(DemoSuite.prototype.__proto__ || Object.getPrototypeOf(DemoSuite.prototype), 'setup', this).call(this));

            case 2:
              this.container = document.querySelector(this.target);

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
              return regeneratorRuntime.awrap(_get(DemoSuite.prototype.__proto__ || Object.getPrototypeOf(DemoSuite.prototype), 'teardown', this).call(this));

            case 3:
              _context2.next = 5;
              return regeneratorRuntime.awrap(self.delay(300));

            case 5:
              _context2.next = 7;
              return regeneratorRuntime.awrap(self.forEvent(self.container, 'dom-change', function () {
                self.container.if = false;
              }, true));

            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: 'delay',
    value: function delay(ms) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          return resolve();
        }, ms);
      });
    }
  }, {
    key: 'tap',
    value: function tap(label) {
      var self, button;
      return regeneratorRuntime.async(function tap$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              self = this;
              button = self.buttons[label];

              if (!button) {
                _context3.next = 10;
                break;
              }

              //await self.forEvent(button.getRipple(), 'transitionend', () => { MockInteractions.tap(button); }, (element, type, event) => true);
              MockInteractions.tap(button);
              _context3.next = 6;
              return regeneratorRuntime.awrap(self.delay(300));

            case 6:
              button.getRipple().upAction();
              return _context3.abrupt('return', button);

            case 10:
              throw new Error('button ' + label + ' is not found');

            case 11:
            case 'end':
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: 'state',
    value: function state(label) {
      return { tap: label, value: this.element.value, x: this.element.x, y: this.element.y, op: this.element.op, m: this.element.m };
    }
  }, {
    key: 'check',
    get: function get() {
      return true;
    }
  }, {
    key: 'history',
    set: function set(value) {
      this._history = this._history || [];
      this._history.push(value);
      console.log(this.history, this._history[this._history.length - 1].value);
    },
    get: function get() {
      return this._history.map(function (s) {
        return (typeof s === 'undefined' ? 'undefined' : _typeof(s)) === 'object' ? s.tap : s;
      }).join('');
    }
  }], [{
    key: 'skipAfterFailure',
    get: function get() {
      return true;
    }
  }]);

  return DemoSuite;
}(Suite);

var Connect = function (_DemoSuite) {
  _inherits(Connect, _DemoSuite);

  function Connect() {
    _classCallCheck(this, Connect);

    return _possibleConstructorReturn(this, (Connect.__proto__ || Object.getPrototypeOf(Connect)).apply(this, arguments));
  }

  _createClass(Connect, [{
    key: 'operation',
    value: function operation() {
      var self;
      return regeneratorRuntime.async(function operation$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              self = this;
              _context4.next = 3;
              return regeneratorRuntime.awrap(self.forEvent(self.container, 'dom-change', function () {
                self.container.if = true;
              }, function (element, type, event) {
                return true;
              }));

            case 3:
              _context4.next = 5;
              return regeneratorRuntime.awrap(self.delay(100));

            case 5:
              self.element = document.querySelector('nano-calc');
              self.buttonList = Array.prototype.map.call(Polymer.dom(self.element.root).querySelectorAll('paper-button'), function (b) {
                return b;
              });
              self.buttons = self.buttonList.reduce(function (prev, curr) {
                prev[curr.id] = curr;return prev;
              }, {});

            case 8:
            case 'end':
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: 'checkpoint',
    value: function checkpoint() {
      var self;
      return regeneratorRuntime.async(function checkpoint$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              self = this;

              assert.equal(self.element.is, 'nano-calc', 'nano-calc is connected');
              assert.equal(self.buttonList.length, 25, 'has 25 buttons');

            case 3:
            case 'end':
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }]);

  return Connect;
}(DemoSuite);

{
  var i;

  (function () {
    var operations = function operations(expression, name) {
      var result = null;
      if (!name) {
        var description = [];
        name = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = expression[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var j = _step.value;

            name.push(labels[j][0]);
            description.push((' ' + labels[j][1] + ' ').replace(/^ ([0-9]) $/, '$1'));
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        name = name.join('_');
        description = description.join('').replace(/  /g, ' ').trim();
        description += (description.match(/=$/) ? ' ' : ' = ') + demo.expected['AC' + description.replace(/ /g, '')];
        name += '; ' + description;
      }
      for (var _i = expression.length - 1; _i >= 0; _i--) {
        var op = expression[_i];
        var mixin = labels[op][0];
        if (!mixin) {
          throw new Error('Invalid operation ' + op + ' in "' + expression + '"');
        }
        if (result) {
          result = _defineProperty({}, mixin, result);
        } else {
          result = _defineProperty({}, mixin, name);
        }
      }
      return result;
    };

    // demo scope
    var scope = 'demo';
    var demo = new Suite(scope, 'Scenarist Demo Suite');
    var labels = {
      // op: [ 'Class', 'id' ]
      '0': ['Number0', '0'],
      '1': ['Number1', '1'],
      '2': ['Number2', '2'],
      '3': ['Number3', '3'],
      '4': ['Number4', '4'],
      '5': ['Number5', '5'],
      '6': ['Number6', '6'],
      '7': ['Number7', '7'],
      '8': ['Number8', '8'],
      '9': ['Number9', '9'],
      'N': ['Negate', '+/-'],
      'R': ['Mr', 'MR'],
      'm': ['Mminus', 'M-'],
      'M': ['Mplus', 'M+'],
      '/': ['Divide', '/'],
      '%': ['Percent', '%'],
      '*': ['Multiply', '*'],
      'S': ['Sqrt', 'sqrt'],
      '+': ['Plus', '+'],
      '-': ['Minus', '-'],
      'C': ['Clear', 'C'],
      '.': ['Dot', '.'],
      '=': ['Equal', '='],
      'A': ['Ac', 'AC'],
      'B': ['Bs', 'BS']
    };
    demo.labels = labels;
    for (var ex in labels) {
      demo.test = new Function('demo', function (subclass, label) {
        // generate ES5 class by manipulating transpiled func.toString()
        return 'return ' + function (base) {
          return function (_base) {
            _inherits(__SUBCLASS__, _base);

            function __SUBCLASS__() {
              _classCallCheck(this, __SUBCLASS__);

              return _possibleConstructorReturn(this, (__SUBCLASS__.__proto__ || Object.getPrototypeOf(__SUBCLASS__)).apply(this, arguments));
            }

            _createClass(__SUBCLASS__, [{
              key: 'operation',
              value: function operation() {
                return regeneratorRuntime.async(function operation$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.next = 2;
                        return regeneratorRuntime.awrap(this.tap('__LABEL__'));

                      case 2:
                        this.history = this.state('__LABEL__');

                      case 3:
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
                        assert.equal(this.element.value, demo.expected[this.history], 'Value for scenario ' + this.history + ' is valid');

                      case 1:
                      case 'end':
                        return _context7.stop();
                    }
                  }
                }, null, this);
              }
            }, {
              key: 'description',
              get: function get() {
                return '__LABEL__';
              }
            }]);

            return __SUBCLASS__;
          }(base);
        }.toString().replace(/__cov_[^. ]*[.][a-z]\[\'[0-9]*\'\](\[[0-9]*\])?\+\+[;,]?/g, '') // trim istanbul coverage counters
        .replace(/__SUBCLASS__/g, subclass).replace(/__LABEL__/g, label);
      }(labels[ex][0], labels[ex][1]))(demo);
    }


    demo.expected = {
      "AC": "0",
      "AC1": "1",
      "AC12": "12",
      "AC12+": "12",
      "AC12+3": "3",
      "AC12+34": "34",
      "AC12+34=": "46",
      "AC12-": "12",
      "AC12-3": "3",
      "AC12-34": "34",
      "AC12-34=": "-22",
      "AC12*": "12",
      "AC12*3": "3",
      "AC12*34": "34",
      "AC12*34=": "408",
      "AC12/": "12",
      "AC12/3": "3",
      "AC12/34": "34",
      "AC12/34=": "0.352941176470588",
      "AC8": "8",
      "AC81": "81",
      "AC81sqrt": "9",
      "AC81sqrtsqrt": "3",
      "AC81sqrtsqrtsqrt": "1.73205080756888",
      "AC5": "5",
      "AC5M+": "5",
      "AC5M+3": "3",
      "AC5M+3M+": "3",
      "AC5M+3M+2": "2",
      "AC5M+3M+2M+": "2",
      "AC5M+3M+2M+MR": "10",
      "AC3": "3",
      "AC3*": "3",
      "AC3*2": "2",
      "AC3*2=": "6",
      "AC3*2=M+": "6",
      "AC3*2=M+5": "5",
      "AC3*2=M+5*": "5",
      "AC3*2=M+5*4": "4",
      "AC3*2=M+5*4.": "4",
      "AC3*2=M+5*4.2": "4.2",
      "AC3*2=M+5*4.2=": "21",
      "AC3*2=M+5*4.2=M-": "21",
      "AC3*2=M+5*4.2=M-C": "0",
      "AC3*2=M+5*4.2=M-CMR": "-15",
      "AC2": "2",
      "AC20": "20",
      "AC200": "200",
      "AC200*": "200",
      "AC200*1": "1",
      "AC200*15": "15",
      "AC200*15%": "30",
      "AC54": "54",
      "AC54+/-": "-54",
      "AC54+/-+": "-54",
      "AC54+/-+1": "1",
      "AC54+/-+12": "12",
      "AC54+/-+12=": "-42",
      "AC123": "123",
      "AC1234": "1,234",
      "AC1234BS": "123",
      "AC1234BSBS": "12",
      "AC1234BSBS+": "12",
      "AC1234BSBS+3": "3",
      "AC1234BSBS+3*": "15",
      "AC1234BSBS+3*4": "4",
      "AC1234BSBS+3*4/": "60",
      "AC1234BSBS+3*4/1": "1",
      "AC1234BSBS+3*4/12": "12",
      "AC1234BSBS+3*4/12=": "5",
      "AC12**": "12",
      "AC12**=": "144",
      "AC12**==": "1,728",
      "AC12**===": "20,736",
      "AC12**====": "248,832"
    };

    demo.test = {
      // test class mixins
      '': [operations('12', 'N12'), operations('34', 'N34')],
      // test classes
      Connect: {
        Ac: [{
          N12: ['+', '-', '*', '/'].map(function (op) {
            return _defineProperty({}, labels[op][0], {
              N34: {
                Equal: '_12_' + labels[op][0] + '_34; 12 ' + op + ' 34 = ' + demo.expected['AC12' + op + '34=']
              }
            });
          })
        }, operations('81SSS'), operations('5M3M2MR'), operations('3*2=M5*4.2=mCR'), operations('200*15%'), operations('54N+12='), operations('1234BB+3*4/12='), operations('12**====')]
      }
    };

    var match = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' ? decodeURIComponent(window.location.href).match(/^.*[^_a-zA-Z0-9]TestSuites=([_a-zA-Z0-9,]*).*$/) : false;

    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
      // Browser
      if (match) {
        demo.run(parseInt(match[1]), '#demo');
      }
    } else {
      // Node
      for (i = 0; i < demo.test.length; i++) {
        demo.run(i, '#demo');
      }
    }
  })();
} // demo scope