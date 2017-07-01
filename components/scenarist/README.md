[![Build Status](https://travis-ci.org/t2ym/scenarist.svg?branch=master)](https://travis-ci.org/t2ym/scenarist)
[![Coverage Status](https://coveralls.io/repos/github/t2ym/scenarist/badge.svg?branch=master)](https://coveralls.io/github/t2ym/scenarist?branch=master)
[![npm](https://img.shields.io/npm/v/scenarist.svg)](https://www.npmjs.com/package/scenarist)
[![Bower](https://img.shields.io/bower/v/scenarist.svg)](https://customelements.io/t2ym/scenarist/)

# scenarist

Class-based branching test scenario runner for mocha

[Demo](https://t2ym.github.io/scenarist/components/scenarist/demo/)

<img src="https://raw.githubusercontent.com/wiki/t2ym/scenarist/scenaristdemo.gif" width="768px">

```javascript
// common-test.js global test classes
class ExampleSuite extends Suite {
  async setup() {
    await super.setup();
    this.container = document.querySelector(this.target);
  }
  async teardown() {
    let self = this;
    await super.teardown();
    await self.forEvent(self.container, 'dom-change', () => { self.container.if = false; }, true);
  }
}
```

```javascript
// example-test.js
{
  // example scope
  let scope = 'example';
  let example = new Suite(scope, 'Description of Example Suite');
  // test class mixin in "example" scope
  example.test = (base) => class TestA extends base {
    get description() { return 'Description of Test A'; }
    async operation() {
      console.log('Test A operation');
      this.element = document.querySelector('#example')
    }
    async checkpoint() {
      console.log('Checkpoint for Test A');
      assert.equal(this.element.is, 'example-element', 'Element is instantiated');
      //assert.isOk(false, 'Failing test A');
    }
  }
  ...
  // test class in "example" scope
  example.test = class TestE extends ExampleSuite {
    static get skipAfterFailure() { return true; }
    async operation() {}
    async checkpoint() {}
  }
  ...
  // scenarios
  example.test = {
    // test class mixins
    '': [
      {
        TestA: {
          TestB: 'TestAThenB'
        },
        TestB: {
          TestA: 'TestBThenA'
        },
      },
      Suite.repeat('TestAThenB', 3, 'TestAB3')
    ],
    // test classes
    TestC: {
      TestAThenB: 'TestCAB'
    },
    TestD: 'TestDAlias',
    TestE: [
      {
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
      },
      Suite.permute([ 'TestA', 'TestB', 'Test1' ], (scenario) => ({
        Test2: 'Test_E_' + scenario.map(n => n.replace(/^Test/,'')).join('_') + '_2'
      }))
    ]
  };

  let match = decodeURIComponent(window.location.href).match(/^.*[^_a-zA-Z0-9]TestSuites=([_a-zA-Z0-9,]*).*$/);

  if (match) {
    // Runner
    // match[1] = '0' for the first round of test suites runnable without reloading
    example.run(match[1], '#example');
  }
} // example scope
```

```javascript
// In Driver page
// example for web-component-tester
var suites = [];
for (var scope in Suite.scopes) {
  Suite.scopes[scope].test.forEach(function (tests, index) {
    suites.push(scope + '-test.html?TestSuites=' + index);
  });
}
WCT.loadSuites(suites);
```

### Design Principles

- Contexts must be explicitly handled in a concise and intuitive way in JavaScript classes
- `suite()` and `test()` in mocha are wrapped for contexts

### Alternative viewpoints for test scenarios with long and branching operations

- Test target systems are a collection of state machines
- Operations for test suites are a series of the branches of states
- Test assertions are targeted "checkpoints" for the expected states

### Depicted test scenarios

```
Initial -(setup op)-> First checkpoint -(op)-> 2nd CP -> ... -> Final CP for scenario A
                                               +--> ... -> Final CP for scenario B 
                                                ...
```

- Initial state is without instances of the target system
- Operations from the initial state set up test fixtures
- The first checkpoint on the first operation asserts the target instances
- Setting up the fixtures may take more steps (operations)
- Successive checkpoints constitute a series of pairs of a (mock) operation and its corresponding test assertion(s)
- Different test suites can share parts of operations and then branch in the latter parts

### Conceptual mappings for JavaScript classes

- Operation: a (mock) operation
- Checkpoint: a collection of test assertions for a checkpoint
- Scenario: a series of Operation and Checkpoint pairs (by a prototype chain of classes)
- Suite: the base class of test scenarios
- Driver: driver of test suites
- Parameters: test parameters handed to constructors of test classes

### Comparison with BDD framework

- "Branching" of test contexts: Shared steps and test assertions for scenarios

## Install

### Browsers

```sh
  bower install --save-dev scenarist
```

### NodeJS

```sh
  npm install --save-dev scenarist
```

## Import

### Browsers

#### Raw ES6 class version

```html
  <script src="path/to/bower_components/scenarist/Suite.js"></script>
```

#### ES5 version

##### Note: `babel-polyfill/browser.js` is required for the ES5 version to work 

```html
  <script src="path/to/node_modules/babel-polyfill/browser.js"></script>
  <script src="path/to/bower_components/scenarist/Suite.min.js"></script>
```

### NodeJS

#### Node 7.x with --harmony_async_await option

##### Command Line
```sh
mocha --harmony_async_await test.js
```

##### Test Script
```javascript
//require('babel-polyfill');
const chai = require('chai');
const assert = chai.assert;
const Suite = require('scenarist/Suite.js');
// test classes...
```

#### Node 4.x - 6.x with Babel es2015 Transpilation

##### Command Line
```sh
mocha test.js
```

##### Test Script
```javascript
require('babel-polyfill');
const chai = require('chai');
const assert = chai.assert;
const Suite = require('scenarist/Suite.min.js');
// test classes...
```

#### Node with Multiple Scopes

##### Command Line
```sh
mocha test.js
```

##### Driver Test Script (test.js)
```javascript
require('babel-polyfill');
const chai = require('chai');
global.assert = chai.assert;
global.Suite = require('scenarist/Suite.min.js');

require('./scope1-test.js');
require('./scope2-test.js');

for (var scope in Suite.scopes) {
  Suite.scopes[scope].test.forEach(function (tests, index) {
    Suite.scopes[scope].run(index); // if run() is not called in scope*-test.js
  });
}
```

##### Test Script 1 (scope1-test.js)
```javascript
let scope1 = new Suite('scope1', 'Scope 1 Suites');
// test classes
scope1.test = ...
```

##### Test Script 2 (scope2-test.js)
```javascript
let scope2 = new Suite('scope2', 'Scope 2 Suites');
// test classes
scope2.test = ...
```

## Compatibility

| Version      | Chrome | Firefox | IE/Edge | Safari | Opera | Node        | ECMAScript           |
|:-------------|:------:|:-------:|:-------:|:------:|:-----:|:-----------:|:--------------------:|
| Suite.js     | 55+    | 52+     | 15+     | 10 TP+ | 42+   | 7+ w/ async | ES6 + async/await    |
| Suite.min.js | 55+    | 50+     | 11+     | 10+    | 42+   | 4+ w/ babel | ES5 + babel-polyfill |

## API

### `Suite` class

- Index
  - [Scope Object as a `Suite` class instance](#scope-object-as-a-suite-class-instance)
  - [Scope Object Instance Properties other than `test` property setter](#scope-object-instance-properties-other-than-test-property-setter)
  - [Test Suite Subclass as a direct or descendent subclass of `Suite` class](#test-suite-subclass-as-a-direct-or-descendent-subclass-of-suite-class)
  - [Test Runner Subclass as a subclass of `Suite` class](#test-runner-subclass-as-a-subclass-of-suite-class)
  - [Utility Instance Methods](#utility-instance-methods)
  - [Utility Static Methods](#utility-static-methods)
  - [Static Properties for `Suite` class](#static-properties-for-suite-class)
  - [Static Properties for subclasses](#static-properties-for-subclasses)

#### Scope Object as a `Suite` class instance

- **constructor(scope: string, description: string = scope + ' suite')** - Create a scope typically in a block scope; The scope object is globally accessible via `Suite.scopes[scope]`

```javascript
    { // "scope1" block scope
      let scope1 = new Suite('scope1', 'Description of scope1 Suite');
      scope1 === Suite.scopes.scope1; // is true
    }
```

- **test** property setter with a class expression - Define a test runner subclass or a test suite subclass in the scope
```javascript
    let scope = 'example';
    let example = new Suite(scope, 'Description of Example Suite');
    // Defined test suite class is accessible via example.classes.ExampleSuite
    example.test = class ExampleSuite extends Suite {
      async setup() { await super.setup(); ... }
      async teardown() { await super.teardown(); ... }
    }
    // Defined test runner class is accessible via example.classes.ExampleTest1
    example.test = class ExampleTest1 extends example.classes.ExampleSuite {
      async operation() { ... }
      async checkpoint() { ... }
    }
```
- **test** property setter with a class expression mixin - Define a test runner class mixin in the scope
```javascript
    // Defined test runner class mixin is accessible via example.mixins.ExampleTestMixin1
    example.test = (base) => class ExampleTestMixin1 extends base {
      async operation() { ... }
      async checkpoint() { ... }
    }
```
- **test** property setter with a test scenario object - Define test scenarios with a scenario object in the scope
  - Arrays in scenarios iterate over their items
  - Description can be optionally specified after ';' of the test class name
  - Default description string is generated by uncamelcasing the test class name, e.g., 'TestAAndB' -> 'test a and b'
```javascript
    example.test = {
      // test class mixins
      '': {
        ExampleTestMixin1: {
          ExampleTestMixin2: 'Test1Then2' // Define Test1Then2 test class mixin
        }
      },
      // test classes
      ExampleTest1: {
        Test1Then2: 'Test1ThenTest1Then2' // Define Test1ThenTest1Then2 test class
      }
    }
```
```javascript
    example.test = {
      // test class mixins
      '': [
        Suite.repeat('ExampleTestMixin1', 3, 'RepeatTest1_3Times'),
        Suite.repeat('ExampleTestMixin2', 4, 'RepeatTest2_4Times')
      ],
      // test classes
      ExampleTest1: {
        Test1Then2: 'Test1ThenTest1Then2; Description of the Test'
      }
    }
```
- **test** property setter with a class from another scope - Define a subscope of a scope

```
    // Meta-depiction of Subscoping as Prototype chaining
    Suite <-- GlobalScope <-- ScopeA <-- SubscopeAB ...
                                      +- SubscopeAC ...
```

```html
    <!-- subscope_ac-test.html -->
    <script src="scenarist/Suite.js"></script>
    <script src="global_scope.js"></script>
    <script src="scope_a.js"></script>
    <script src="subscope_ac.js"></script>
    <script>
      var match = decodeURIComponent(window.location.href).match(/^.*[^_a-zA-Z0-9]TestSuites=([_a-zA-Z0-9,]*).*$/);

      if (match) {
        // Runner
        Suite.scopes.subscope_ac.run(match[1], 'template#container');
      }
    </script>
```

```javascript
    // global_scope.js
    class CommonSuite extends Suite { ... }
    class Instantiate extends CommonSuite { ... }
```

```javascript
    // scope_a.js
    {
      let scope_a = new Suite('scope_a');
      scope_a.test = class ScopeATest1 extends Instantiate { ... }
      scope_a.test = (base) => class ScopeATest2 extends base { ... }
      scope_a.test = {
        ScopeATest1: {
          ScopeATest2: 'ExportedScopeATest' // The exported test name is not necessarily explicit
        }
      }
    }
    // no call of run() in scope_a.js since it will be called in scope_a-test.html
```

```javascript
    // subscope_ac.js
    {
      let subscope_ac = new Suite('subscope_ac');
      // Define a subscope 'subscope_ac' of the scope 'scope_a' via 'ExportedScopeATest'
      subscope_ac.test = Suite.scopes.scope_a.classes.ExportedScopeATest;
      // Tests for subscope_ac
      subscope_ac.test = (base) => class SubscopeACTest1 extends base { ... }
      subscope_ac.test = (base) => class SubscopeACTest2 extends base { ... }
      subscope_ac.test = {
        ExportedScopeATest: {
          // Extend scope_a test
          SubscopeACTest1: 'Instantiate_ScopeATest1_ScopeATest2_SubscopeACTest1_Test',
          SubscopeACTest2: 'Instantiate_ScopeATest1_ScopeATest2_SubscopeACTest2_Test',
          ...
        }
      }
    }
    // no call of run() in subscope_ac.js since it will be called in subscope_ac-test.html
```

- **testClasses(tests)** instance method - Get Array of test classes
  - tests as number - List classes in CSV `this.test[tests]`
  - tests as CSV string - List classes in the CSV
- **async run(classes, target: string)** instance method - Run the specified test classes in the scope; `target` is handed to constructors of target classes
  - classes as number - Target classes are `testClasses(test[classes])`
  - classes as CSV string - Target classes are `testClasses(classes)`
  - classes as Array of string - Target classes are `classes.map((item) => self.classes[item])`
  - classes as Array of classes - Target classes are `classes`
  - classes as object with class properties - Target classes are properties of `classes`
  - it can throw MultiError exception, which has Array property `.errors` as `[ [ 'TestClassName', TestClassInstance, Exception ], ... ]`
```javascript
    async function runner() {
      for (let scope in Suite.scopes) {
        for (let index in Suite.scopes[scope].test) {
          try {
            await Suite.scopes[scope].run(index, '#target');
          }
          catch (errors) {
            errors.message === 'Error: Suite.error5.run(Test1,Test2,...): exception(s) thrown. See .errors for details';
            errors.errors.forEach((item) => {
              item[0] === 'TestClassName';
              item[1] === TestClassInstance;
              item[2] === ErrorOrUndefined; // undefined for successful tests
            });
          }
        }
      }
    }()
```
```javascript
    for (var scope in Suite.scopes) {
      Suite.scopes[scope].test.forEach(function (tests, index) {
        Suite.scopes[scope].run(index, '#target')
          .catch(function(errors) {
            errors.message === 'Error: Suite.error5.run(Test1,Test2,...): exception(s) thrown. See .errors for details';
            errors.errors.forEach((item) => {
              item[0] === 'TestClassName';
              item[1] === TestClassInstance;
              item[2] === ErrorOrUndefined; // undefined for successful tests
            });
          });
      });
    }
```

#### Scope Object Instance Properties other than `test` property setter

- **scope** string property - Scope name set by `new Suite(scope)`
- **description** string property - Default: scope + ' suite'; Scope description set by `new Suite(scope, description)`
- **classes** object property - Object containing the currently defined test classes
- **mixins** object property - Object containing the currently defined test class mixins
- **classSyntaxSupport** boolean property - `true` if ES6 class syntax is natively supported
- **arrowFunctionSupport** boolean property - `true` if ES6 arrow function syntax is natively supported
- **leafClasses** object property - Object containing the current leaf (non-redundant) test classes
- **leafScenarios** object property - Object with CSV strings of leaf test scenarios as its properties
- **branchScenarios** object property - Object with CSV strings of branch test scenarios as its properties
- **test** Array property - Array of CSV strings, each of which constitutes a group of reconnectable tests
```javascript
    Suite.scopes.example.test returns
    [
      'ReconnectableTest1,ReconnectableTest2',
      'NonReconnectableTest1',
      'ReconnectableTest3,ReconnectableTest4',
      ...
    ]
    // Test page has to be reloaded for each reconnectable test group
```
```javascript
    // In Driver page
    // example for web-component-tester
    var suites = [];
    for (var scope in Suite.scopes) {
      Suite.scopes[scope].test.forEach(function (tests, index) {
        suites.push(scope + '-test.html?TestSuites=' + index);
      });
    }
    WCT.loadSuites(suites);
```

#### Test Suite Subclass as a direct or descendent subclass of `Suite` class

- **async setup()** instance method - Overridden methods called once at the beginning of each running test via `suiteSetup()`; Overridden methods in subclasses should call `await super.setup()`
- **async teardown()** instance method - Overridden methods called once at the end of each running test via `suiteTeardown()`; Overridden methods in subclasses should call `await super.teardown()`

```javascript
    // Define a common test suite as a direct subclass of Suite
    class CommonTestSuite extends Suite {
      async setup() { await super.setup(); ... }
      async teardown() { await super.teardown(); ... }
      ... // custom methods
    }
    { // example scope
      let example = new Suite('example', 'Example Subsuite');
      // [Optional] Define a test subsuite class in the 'example' scope 
      example.test = class ExampleSuite extends CommonTestSuite {
        async setup() { await super.setup(); ... }
        async teardown() { ...; await super.teardown(); } // may need teardown operation before super.teardown()
        ... // more custom methods for the subsuite
      }
    }
```

#### Test Runner Subclass as a subclass of `Suite` class

- **constructor(target: string)** - Instantiate a test runner; Optional for overriding
- **async run()** instance method - Run the test; Not for overriding
  - It can throw an exception. See `exception()` instance method section below.
- __* scenario()__ instance generator method - Iterate over tests in the reversed order of the prototype chain of the test; Yield `{ name: string, iteration: function, operation: function, checkpoint: function, ctor: function }` for each test class

```javascript
    // Simplest example without a test suite subclass and a scope
    class TestClass extends Suite {} // Define a test runner class
    let testRunner = new TestClass('#target'); // testRunner.target = '#target'
    testRunner.run(); // run the test
```
```javascript
    // Example with a scope
    class ExampleSuite extends Suite { ... }
    { // example scope
      let example = new Suite('example');
      // Define a test class in the scope
      example.test = class ExampleTest1 extends ExampleSuite {
        async operation() { ... }
        async checkpoint() { ... }
      }
      // run the test
      (new example.classes.ExampleTest1('#target')).run();
    }
```
- **async operation(parameters: optional)** instance method - Perform operations of the test; `parameters` argument is omitted if `*iteration()` is not defined
- **async checkpoint(parameters: optional)** instance method - Perform test assertions of the test; `parameters` argument is omitted if `*iteration()` is not defined
- __*iteration()__ instance generator method - [Optional] Provide parameters to `operation` and `checkpoint` methods
```javascript
    class ExampleTest2 extends ExampleSuite {
      * iteration() { yield * [ 1, 2, 3 ]; }
      // parameters iterate through 1 to 3
      async operation(parameters) { ... }
      async checkpoint(parameters) { ... }
    }
```
- **exception(reject: function, exception: Error)** instance method - [Optional] Exception handler for errors outside of test callback function
  - If it calls `reject()`, it must return non-null to tell the runner not to call `resolve()`
  - The method can be inherited and overridden by subclasses
```javascript
    class ExampleTest3 extends ExampleSuite {
      async operation() { ... }
      async checkpoint() { ... }
      exception(reject, exception) {
        // default action when exception() is not defined
        reject(exception);
        return true;
      }
    }
    try {
      await (new ExampleTest3('#example')).run();
    }
    catch (exception) {
      // Handle exception in runner
      ...
    }
```
```javascript
    class ExampleTest4 extends ExampleSuite {
      async operation() { ... }
      async checkpoint() { ... }
      exception(reject, exception) {
        // Treat the exception as a test failure by mocha
        (typeof test === 'function' ? test : it)('exception on scenario', function() {
          throw exception;
        });
      }
    }
```

#### Utility Instance Methods

- **async forEvent(element: Element, type: string, trigger: function, condition: function)** - Invoke the `trigger()` and wait for the event `type` for the `element` until `condition(element: Element, type: string, event: Event)` returns `true`
```javascript
    async operation(parameters) {
      let self = this;
      // wait for 'track' event until the event state becomes 'end'
      await self.forEvent(self.dialog, 
        'track',
        () => { MockInteractions.track(self.dialog, parameters.dx, parameters.dy); },
        (element, type, event) => event.detail.state === 'end'
      );
    }
```

#### Utility Static Methods

- **Suite.repeat(target: string, count: number, subclass: string/object)** - Repetition operator for scenario objects
```javascript
    Suite.repeat('TargetTest', 3, 'RepeatTarget3Times') returns
    { TargetTest: { TargetTest: { TargetTest: 'RepeatTarget3Times' } } }
```
- **Suite.permute(targets: Array of string, subclass: function (scenario: Array of string))** - Permutation operator for scenario objects
```javascript
    Suite.permute([ 'TestA', 'TestB', 'TestC' ],
      (scenario) => 'Test_' + scenario.map(n => n.replace(/^Test/,'')).join('_')
    ) returns
    {
      TestA: {
        TestB: { TestC: "Test_A_B_C" },
        TestC: { TestB: "Test_A_C_B" }
      },
      TestB: {
        TestA: { TestC: "Test_B_A_C" },
        TestC: { TestA: "Test_B_C_A" }
      },
      TestC: {
        TestB: { TestA: "Test_C_B_A" },
        TestA: { TestB: "Test_C_A_B" }
      }
    }
```

#### Static Properties for `Suite` class

- **Suite.scopes** static object property - Object containing scope objects as `Suite.scopes[scope]` such as `Suite.scopes.example` for `'example'` scope

#### Static Properties for subclasses

- **reconnectable** static boolean read-only property - Default: `true`; Override the value as `false` to treat the test and its subclasses are not reconnectable and need page reloading to perform further tests
```javascript
    class NonReconnectableSuite extends Suite {
      get reconnectable() { return false; }
      ...
    }
```
- **skipAfterFailure** static boolean read-only property - Default: `false`; Override the value as `true` to skip subsequent tests of the suite after an assertion failure
```javascript
    class SkipAfterFailureSuite extends Suite {
      get skipAfterFailure() { return true; }
      ...
    }
```

## Complex Examples

### Test Class Mixin with Parameterized Iterations

```javascript
{
  let example = new Suite('example');
  example.test = (base) => class DragDialogTest extends base {
    * iteration() {
      let dx = 10;
      let dy = 10;
      yield *[
        { mode: 'position', dx: dx, dy: dy, expected: { x: dx, y: dy, width: 0, height: 0 } },
        { mode: 'upper-left', dx: -dx, dy: -dy, expected: { x: -dx, y: -dy, width: dx, height: dy } },
        { mode: 'upper', dx: -dx, dy: -dy, expected: { x: 0, y: -dy, width: 0, height: dy } },
        { mode: 'upper-right', dx: dx, dy: -dy, expected: { x: 0, y: -dy, width: dx, height: dy } },
        { mode: 'middle-left', dx: -dx, dy: dy, expected: { x: -dx, y: 0, width: dx, height: 0 } },
        { mode: 'middle-right', dx: dx, dy: dy, expected: { x: 0, y: 0, width: dx, height: 0 } },
        { mode: 'lower-left', dx: -dx, dy: dy, expected: { x: -dx, y: 0, width: dx, height: dy } },
        { mode: 'lower', dx: dx, dy: dy, expected: { x: 0, y: 0, width: 0, height: dy } },
        { mode: 'lower-right', dx: dx, dy: dy, expected: { x: 0, y: 0, width: dx, height: dy } },
        { mode: '.title-pad', dx: dx, dy: dy, expected: { x: 0, y: 0, width: 0, height: 0 } }
      ].map((parameters) => { parameters.name = 'drag dialog by ' + parameters.mode + ' handle'; return parameters });
    }
    async operation(parameters) {
      let self = this;
      let handle = self.dialog.$.handle.querySelector(parameters.mode.match(/^[.]/) ? parameters.mode : '[drag-handle-mode=' + parameters.mode + ']');
      self.origin = {};
      [ 'x', 'y', 'width', 'height' ].forEach(function (prop) {
        self.origin[prop] = self.dialog[prop];
      });
      handle.dispatchEvent(new MouseEvent('mouseover', {
        bubbles: true,
        cancelable: true,
        clientX: 0,
        clientY: 0,
        buttons: 1
      }));
      await self.forEvent(self.dialog, 'track', () => { MockInteractions.track(self.dialog, parameters.dx, parameters.dy); }, (element, type, event) => event.detail.state === 'end');
    }
    async checkpoint(parameters) {
      for (let prop in parameters.expected) {
        assert.equal(
          this.dialog[prop],
          this.origin[prop] + parameters.expected[prop],
          'dialog is dragged with ' + parameters.mode + ' handle by ' + parameters.expected[prop] + ' in ' + prop);
      }
    }
  }
}
```

### Test Class Mixin Generator for Common Operations and Checkpoints in [demo.js](https://github.com/t2ym/scenarist/blob/master/demo/src/demo.js)

```javascript
let demo = new Suite(scope, 'Scenarist Demo Suite');
const labels = {
  // op: [ 'Class', 'id' ]
  '0': [ 'Number0', '0' ],
  '1': [ 'Number1', '1' ],
  ...
  '=': [ 'Equal', '=' ],
  'A': [ 'Ac', 'AC' ],
  'B': [ 'Bs', 'BS' ]
};
demo.expected = {
  "AC": "0",
  "AC1": "1",
  "AC12": "12",
  "AC12+": "12",
  "AC12+3": "3",
  "AC12+34": "34",
  "AC12+34=": "46",
  ...
};
for (let ex in labels) {
  demo.test = (new Function('demo',
    (function (subclass, label) { // generate ES5 class by manipulating transpiled func.toString()
      return 'return ' +
        ((base) => class __SUBCLASS__ extends base {
          get description() { return '__LABEL__'; }
          async operation() {
            await this.tap('__LABEL__');
            this.history = this.state('__LABEL__');
          }
          async checkpoint() {
            assert.equal(this.element.value, demo.expected[this.history], 'Value for scenario ' + this.history + ' is valid');
          }
        })
        .toString()
        .replace(/__cov_[^. ]*[.][a-z]\[\'[0-9]*\'\](\[[0-9]*\])?\+\+[;,]?/g, '') // trim istanbul coverage counters
        .replace(/__SUBCLASS__/g, subclass)
        .replace(/__LABEL__/g, label);
    })(labels[ex][0], labels[ex][1])))(demo);
}
```

### Custom Test Scenario Object Operator in [demo.js](https://github.com/t2ym/scenarist/blob/master/demo/src/demo.js)

```javascript
function operations(expression, name) {
  let result = null;
  if (!name) {
    let description = [];
    name = [];
    for (let j of expression) {
      name.push(labels[j][0]);
      description.push((' ' + labels[j][1] + ' ').replace(/^ ([0-9]) $/, '$1'));
    }
    name = name.join('_');
    description = description.join('').replace(/  /g, ' ').trim();
    description += (description.match(/=$/) ? ' ' : ' = ') + demo.expected['AC' + description.replace(/ /g, '')];
    name += '; ' + description;
  }
  for (let i = expression.length - 1; i >= 0; i--) {
    let op = expression[i];
    let mixin = labels[op][0];
    if (!mixin) {
      throw new Error('Invalid operation ' + op + ' in "' + expression + '"');
    }
    if (result) {
      result = { [mixin]: result };
    }
    else {
      result = { [mixin]: name };
    }
  }
  return result;
}
demo.test = {
  // test class mixins
  '': [
    operations('12', 'N12'),
    operations('34', 'N34')
  ],
  // test classes
  Connect: {
    Ac: [
      {
        N12: [ '+', '-', '*', '/' ]
          .map((op) => ({ 
            [labels[op][0]]: {
              N34: {
                Equal: '_12_' + labels[op][0] + '_34; 12 ' + op + ' 34 = ' + demo.expected['AC12' + op + '34=']
              }
            }
          }))
      },
      operations('81SSS'),
      operations('5M3M2MR'),
      operations('3*2=M5*4.2=mCR'),
      operations('200*15%'),
      operations('54N+12='),
      operations('1234BB+3*4/12='),
      operations('12**====')
    ]
  }
};
```

## License

[BSD-2-Clause](https://github.com/t2ym/scenarist/blob/master/LICENSE.md)
