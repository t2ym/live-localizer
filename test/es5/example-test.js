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
  // example scope
  var scope = 'example';
  var example = new Suite(scope, 'Description of Example Suite');
  example.test = function (_Suite) {
    _inherits(ExampleSuite, _Suite);

    function ExampleSuite() {
      _classCallCheck(this, ExampleSuite);

      return _possibleConstructorReturn(this, (ExampleSuite.__proto__ || Object.getPrototypeOf(ExampleSuite)).apply(this, arguments));
    }

    _createClass(ExampleSuite, [{
      key: 'setup',
      value: function setup() {
        return regeneratorRuntime.async(function setup$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return regeneratorRuntime.awrap(_get(ExampleSuite.prototype.__proto__ || Object.getPrototypeOf(ExampleSuite.prototype), 'setup', this).call(this));

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: 'teardown',
      value: function teardown() {
        return regeneratorRuntime.async(function teardown$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return regeneratorRuntime.awrap(_get(ExampleSuite.prototype.__proto__ || Object.getPrototypeOf(ExampleSuite.prototype), 'teardown', this).call(this));

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, null, this);
      }
    }]);

    return ExampleSuite;
  }(Suite);
  example.test = function (base) {
    return function (_base) {
      _inherits(TestA, _base);

      function TestA() {
        _classCallCheck(this, TestA);

        return _possibleConstructorReturn(this, (TestA.__proto__ || Object.getPrototypeOf(TestA)).apply(this, arguments));
      }

      _createClass(TestA, [{
        key: 'operation',
        value: function operation() {
          return regeneratorRuntime.async(function operation$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  console.log('Test A operation');

                case 1:
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
                  console.log('Checkpoint for Test A');
                  //assert.isOk(false, 'Failing test A');

                case 1:
                case 'end':
                  return _context4.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'description',
        get: function get() {
          return 'Description of Test A';
        }
      }]);

      return TestA;
    }(base);
  };
  example.test = function (base) {
    return function (_base2) {
      _inherits(TestB, _base2);

      function TestB() {
        _classCallCheck(this, TestB);

        return _possibleConstructorReturn(this, (TestB.__proto__ || Object.getPrototypeOf(TestB)).apply(this, arguments));
      }

      _createClass(TestB, [{
        key: 'operation',
        value: function operation() {
          return regeneratorRuntime.async(function operation$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  console.log('Test B operation');

                case 1:
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
                  console.log('Checkpoint for Test B');

                case 1:
                case 'end':
                  return _context6.stop();
              }
            }
          }, null, this);
        }
      }]);

      return TestB;
    }(base);
  };
  example.test = function (base) {
    return function (_base3) {
      _inherits(Test1, _base3);

      function Test1() {
        _classCallCheck(this, Test1);

        return _possibleConstructorReturn(this, (Test1.__proto__ || Object.getPrototypeOf(Test1)).apply(this, arguments));
      }

      _createClass(Test1, [{
        key: 'operation',
        value: function operation() {
          return regeneratorRuntime.async(function operation$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  console.log('Test 1 operation');

                case 1:
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
                  console.log('Checkpoint for Test 1');

                case 1:
                case 'end':
                  return _context8.stop();
              }
            }
          }, null, this);
        }
      }]);

      return Test1;
    }(base);
  };
  example.test = function (base) {
    return function (_base4) {
      _inherits(Test2, _base4);

      function Test2() {
        _classCallCheck(this, Test2);

        return _possibleConstructorReturn(this, (Test2.__proto__ || Object.getPrototypeOf(Test2)).apply(this, arguments));
      }

      _createClass(Test2, [{
        key: 'operation',
        value: function operation() {
          return regeneratorRuntime.async(function operation$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  console.log('Test 2 operation');

                case 1:
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
                  console.log('Checkpoint for Test 2');

                case 1:
                case 'end':
                  return _context10.stop();
              }
            }
          }, null, this);
        }
      }]);

      return Test2;
    }(base);
  };
  example.test = function (_example$classes$Exam) {
    _inherits(TestC, _example$classes$Exam);

    function TestC() {
      _classCallCheck(this, TestC);

      return _possibleConstructorReturn(this, (TestC.__proto__ || Object.getPrototypeOf(TestC)).apply(this, arguments));
    }

    _createClass(TestC, [{
      key: 'operation',
      value: function operation() {
        return regeneratorRuntime.async(function operation$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                console.log('Test C operation');

              case 1:
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
                console.log('Checkpoint for Test C');

              case 1:
              case 'end':
                return _context12.stop();
            }
          }
        }, null, this);
      }
    }]);

    return TestC;
  }(example.classes.ExampleSuite);
  example.test = function (_example$classes$Exam2) {
    _inherits(TestD, _example$classes$Exam2);

    function TestD() {
      _classCallCheck(this, TestD);

      return _possibleConstructorReturn(this, (TestD.__proto__ || Object.getPrototypeOf(TestD)).apply(this, arguments));
    }

    _createClass(TestD, [{
      key: 'operation',
      value: function operation() {
        return regeneratorRuntime.async(function operation$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                console.log('Test D operation');

              case 1:
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
                console.log('Checkpoint for Test D');

              case 1:
              case 'end':
                return _context14.stop();
            }
          }
        }, null, this);
      }
    }]);

    return TestD;
  }(example.classes.ExampleSuite);
  example.test = function (_example$classes$Exam3) {
    _inherits(TestE, _example$classes$Exam3);

    function TestE() {
      _classCallCheck(this, TestE);

      return _possibleConstructorReturn(this, (TestE.__proto__ || Object.getPrototypeOf(TestE)).apply(this, arguments));
    }

    _createClass(TestE, [{
      key: 'operation',
      value: function operation() {
        return regeneratorRuntime.async(function operation$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                console.log('Test D operation');

              case 1:
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
                console.log('Checkpoint for Test D');

              case 1:
              case 'end':
                return _context16.stop();
            }
          }
        }, null, this);
      }
    }], [{
      key: 'skipAfterFailure',
      get: function get() {
        return true;
      }
    }]);

    return TestE;
  }(example.classes.ExampleSuite);
  example.test = {
    // test class mixins
    '': [{
      TestA: {
        TestB: 'TestAThenB'
      },
      TestB: {
        TestA: 'TestBThenA'
      }
    }, Suite.repeat('TestAThenB', 3, 'TestAB3')],
    // test classes
    TestC: {
      TestAThenB: 'TestCAB'
    },
    TestD: 'TestDAlias',
    DummyTest1: '',
    DummyTest2: 'DummyTest2Alias',
    DummyTest3: '',
    TestE: [{
      TestAThenB: 'TestEAB',
      TestA: {
        TestB: {
          Test1: {
            Test2: 'TestEAB12'
          }
        },
        TestBThenA: 'TestEABA'
      },
      TestB: {
        Test1: ''
      },
      TestAB3: 'TestEAB3; Description of "Test EAB3"'
    }, Suite.permute(['TestA', 'TestB', 'Test1'], function (scenario) {
      return {
        Test2: 'Test_E_' + scenario.map(function (n) {
          return n.replace(/^Test/, '');
        }).join('_') + '_2'
      };
    })]
  };

  // TODO: Refine handlers
  var match = decodeURIComponent(window.location.href).match(/^.*[^_a-zA-Z0-9]TestSuites=([_a-zA-Z0-9,]*).*$/);
  window.testSuites = window.testSuites || {};

  if (match) {
    // Runner
    example.run(match[1], '#example');
  } else {
    // Driver
    testSuites[scope] = Suite.scopes[scope].test;
  }
} // example scope