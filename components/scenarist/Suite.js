/*
@license https://github.com/t2ym/scenarist/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/

(function (root, factory) {

  'use strict';

  /* istanbul ignore if: AMD is not tested */
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], function () {
      return (root.Suite = root.Suite || factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
    try {
      new Function('return class $$A$$ {}');
      if (!module.exports.toString().match(/^class /)) {
        throw new Error('Suite.min.js requires babel-runtime');
      }
    }
    catch (e) {
      // Supply Babel runtime helpers
      module.exports._createClass = module.exports._createClass || require('babel-runtime/helpers/_create-class.js').default;
      module.exports._classCallCheck = module.exports._classCallCheck || require('babel-runtime/helpers/_class-call-check.js').default;
      module.exports._possibleConstructorReturn = module.exports._possibleConstructorReturn || require('babel-runtime/helpers/_possible-constructor-return.js').default;
      module.exports._inherits = module.exports._inherits || require('babel-runtime/helpers/_inherits.js').default;
    }
  } else {
    // Browser globals
    root.Suite = root.Suite || factory();
  }

}(this, function () {
// UMD Definition above, do not remove this line
  'use strict';

class Suite {
  static get reconnectable() { return true; }
  static get skipAfterFailure() { return false; }
  constructor(target, description = target + ' suite') {
    if (Suite._name(this.constructor) === 'Suite') {
      // suite instance
      this.scope = target || '';
      this.description = description;
      this.classes = {};
      this.leafClasses = {};
      this.leafScenarios = {};
      this.branchScenarios = {};
      this.mixins = {};
      this.constructor.scopes = this.constructor.scopes || {};
      this.constructor.scopes[this.scope] = this;
      this.classSyntaxSupport = true;
      this.arrowFunctionSupport = true;
      try {
        new Function('return class A {}');
      }
      catch (e) {
        /* istanbul ignore next: only for ES6 */
        this.classSyntaxSupport = false;
      }
      if (!Suite.toString().match(/^class /)) {
        /* istanbul ignore next: only for ES6 */
        this.classSyntaxSupport = false; // Running as Suite.min.js
      }
      try {
        new Function('return () => 1');
      }
      catch (e) {
        /* istanbul ignore next: only for ES6 */
        this.arrowFunctionSupport = false;
      }
    }
    else {
      // test instance
      this.target = target;
    }
  }
  uncamel(name) {
    return name.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').replace(/[ ]{1,}/g, ' ').replace(/^ /, '').toLowerCase();
  }
  static _name(func) {
    return (func.hasOwnProperty('name')
      ? func.name
      : func.toString().replace(/^[\S\s]*?function\s*/, "").replace(/[\s\(\/][\S\s]+$/, "")).replace(/^_?class$/, '');
  }
  _checkIdentifier(name) {
    try {
      let f = (new Function('return function ' + name + ' () {}'))();
      if (f.name !== name || (!this.constructor.allowUnicodeNames && !f.name.match(/^[$\w]*$/))) {
        throw new Error(name + ' is defined as ' + f.name);
      }
    }
    catch (e) {
      throw new Error(this.constructor.name + '.' + this.scope + ':_checkIdentifier ' + name + ' is not a valid identifier ' + e.message);
    }
  }
  set test(value) {
    if (typeof value === 'function') {
      let name = Suite._name(value);
      if (name) {
        // test class
        if (this.classes[name]) {
          // test class with the name already exists
          throw new Error(this.constructor.name + '.' + this.scope + ': class ' + name + ' already exists');
        }
        else {
          // register a new test class with the name
          this.classes[name] = value;
          this.updateLeafClasses(value);
        }
      }
      else {
        // test class mixin
        name = Suite._name(value(null));
        if (name) {
          if (this.mixins[name]) {
            // test class mixin with the name already exists
            throw new Error(this.constructor.name + '.' + this.scope + ': class mixin ' + name + ' already exists');
          }
          else {
            // register a new test class mixin with the name
            this.mixins[name] = value;
          }
        }
        else {
          // no name for the test class mixin
          throw new Error(this.constructor.name + '.' + this.scope + ': class mixin has no name ' + value.toString());
        }
      }
    }
    else if (typeof value === 'object') {
      if (value) {
        // branch object
        this.generateClasses(value, []);
      }
      else {
        throw new Error(this.constructor.name + '.' + this.scope + ': null object is not expected');
      }
    }
  }
  get test() {
    let last;
    // [ 'UnreconnectableTest', 'ReconnectableTest,ReconnectableTest,...', 'UnreconnectableTest', ...]
    return (o => Object.keys(o).map(n => o[n]))(this.leafClasses)
      .reduce((l, c) => ((c.reconnectable && last && last[0].reconnectable ? last.push(c) : l.push(last = [c])), l), [])
      .map(l => l.map(c => Suite._name(c)).join(','));
  }
  testClasses(tests) {
    let self = this;
    return (typeof tests === 'number' || tests.match(/^[0-9]$/) ? self.test[parseInt(tests)] : tests).split(/,/).map((name) => {
      if (!self.classes[name]) {
        throw new Error('Suite.' + self.scope + ': Test ' + name + ' is not defined');
      }
      return self.classes[name];
    });
  }
  updateLeafClasses(value) {
    let name = Suite._name(value);
    let isLeaf = true;
    let scenario = '';
    function getChain(proto) {
      let chain = [];
      while (Suite._name(proto) && Suite._name(proto) !== 'Suite') {
        chain.unshift(Suite._name(proto));
        proto = Object.getPrototypeOf(proto);
      }
      return chain;
    }
    let chain = getChain(value);
    for (let i in chain) {
      scenario = scenario ? scenario + ',' + chain[i] : chain[i];
      if (i < chain.length - 1) {
        if (!this.branchScenarios[scenario]) {
          this.branchScenarios[scenario] = true;
        }
        if (this.leafClasses[chain[i]] &&
            this.leafScenarios[chain[i]] === scenario) {
          if (this.constructor.debug) { console.log('updateLeafClasses ' + name + ': trim a non-leaf class ' + chain[i] + ' with scenario ' + scenario); }
          delete this.leafClasses[chain[i]];
          delete this.leafScenarios[chain[i]];
        }
      }
      else {
        if (this.branchScenarios[scenario]) {
          if (this.constructor.debug) { console.log('updateLeafClasses ' + name + ': ' + scenario + ' is not a leaf'); }
          isLeaf = false;
        }
      }
    }
    if (isLeaf) {
      this.leafClasses[name] = value;
      this.leafScenarios[name] = scenario;
    }
  }
  generateClasses(branch, chain) {
    if (typeof branch === 'string') {
      let description = branch.split(/;/);
      if (description.length > 1) {
        branch = description.shift();
        description = description.join(';').replace(/^[\s]*/, '');
      }
      else {
        description = '';
      }
      if (this.constructor.debug) { console.log('string', branch || chain[chain.length - 1], chain, description); }
      this.generateClass(branch, chain, description);
    }
    else if (typeof branch === 'object' && !Array.isArray(branch)) {
      if (branch) {
        for (let prop in branch) {
          chain.push(prop);
          this.generateClasses(branch[prop], chain);
          chain.pop();
        }
      }
      else {
        if (this.constructor.debug) { console.log('null', branch, chain); }
        this.generateClass(branch, chain);
      }
    }
    else if (typeof branch === 'object' && Array.isArray(branch)) {
      branch.forEach((item) => {
        this.generateClasses(item, chain);
      });
    }
    else {
      throw new Error(this.constructor.name + '.' + this.scope + ': unknown branch type ' + typeof branch + branch);
    }
  }
  generateClass(name, chain, description) {
    let self = this;
    let expression;
    if (!(chain.length >= (chain[0] ? 1 : 2))) {
      throw new Error(this.constructor.name + '.' + this.scope + ':generateClass invalid chain.length ' + chain.length);
    }
    if (!name) {
      name = chain[chain.length - 1];
    }
    this._checkIdentifier(name);
    if (!chain[0]) {
      // class mixin
      if (self.mixins[name]) {
        throw new Error(this.constructor.name + '.' + this.scope + ':generateClass mixin ' + name + ' already exists');
      }
      if (!self.constructor.allowLooseNaming && self.classes[name]) {
        throw new Error(this.constructor.name + '.' + this.scope + ':generateClass class ' + name + ' already exists');        
      }
      chain.forEach((c, i) => {
        self._checkIdentifier(c);
        if (i === 0) {
          expression = 'base';
        }
        else if (self.mixins[c]) {
          expression = 'self.mixins.' + c + '(' + expression + ')';
        }
        else {
          throw new Error(this.constructor.name + '.' + this.scope + ':generateClass mixin ' + c + ' does not exist');
        }
      });
      expression = self.arrowFunctionSupport
        ? 'return (base) => ' + expression
        : 'return function (base) { return ' + expression + '; }';
      self.mixins[name] = (new Function('self', expression))(self);
      if (self.constructor.debug) { console.log('generateClass mixins.' + name + ' = ' + expression); }
    }
    else {
      // class
      if (this.classes[name]) {
        throw new Error(this.constructor.name + '.' + this.scope + ':generateClass class ' + name + ' already exists');
      }
      if (!self.constructor.allowLooseNaming && this.mixins[name] && chain[chain.length - 1] !== name) {
        throw new Error(this.constructor.name + '.' + this.scope + ':generateClass mixin ' + name + ' already exists');
      }
      chain.forEach((c, i) => {
        self._checkIdentifier(c);
        if (i === 0) {
          if (self.classes[c]) {
            expression = 'self.classes.' + c;
          }
          else if ((new Function(self.constructor.name, 'return (typeof ' + c + ' === "function" && (new ' + c + '()) instanceof ' + self.constructor.name + ')'))(self.constructor)) {
            expression = c;
          }
          else {
            throw new Error(this.constructor.name + '.' + this.scope + ':generateClass global test class ' + c + ' does not exist');
          }
        }
        else if (self.mixins[c]) {
          expression = 'self.mixins.' + c + '(' + expression + ')';
        }
        else {
          throw new Error(this.constructor.name + '.' + this.scope + ':generateClass mixin ' + c + ' does not exist');
        }
      });
      if (description) {
        description = description.replace(/"/g,'\\"').replace(/\n/g, ' ');
      }
      let prefix = !this.classSyntaxSupport && typeof Suite._createClass === 'function' && typeof window !== 'object' ? 'self.constructor.' : '';
      expression = chain.length === 1 && name === expression
        ? 'return ' + name
        : name === chain[chain.length - 1]
          ? 'return ' + expression
          : self.classSyntaxSupport
            ? 'return class ' + name + ' extends ' + expression + (description ? ' { get description() { return "' + description + '"; } }' : ' {}')
            : (function (subclass, base, description) { // generate ES5 class by manipulating transpiled func.toString()
                return 'return (' +
                  (() => { /* istanbul ignore next */
                    return description
                    ? function (__BASE_CLASS__) { return class __SUBCLASS__ extends __BASE_CLASS__ { get description() { return 314159265358; } } }
                    : function (__BASE_CLASS__) { return class __SUBCLASS__ extends __BASE_CLASS__ {} }
                  })().toString()
                    .replace(/__cov_[^. ]*[.][a-z]\[\'[0-9]*\'\](\[[0-9]*\])?\+\+[;,]?/g, '') // trim istanbul coverage counters
                    .replace(/__SUBCLASS__/g, subclass)
                    .replace(/_inherits|_classCallCheck|_createClass|_possibleConstructorReturn/g, prefix + '$&')
                    .replace(/ 314159265358;?/g, ' "' + description + '";')
                  + ')(' + base + ');'
              })(name, expression, description);
      self.classes[name] = (new Function('self', expression))(self);
      self.updateLeafClasses(self.classes[name]);
      if (self.constructor.debug) { console.log('generateClass classes.' + name + ' = ' + expression); }
    }
  }
  static repeat(target, count, subclass) {
    let scenario = {};
    if (count < 1) {
      scenario = subclass;
    }
    else {
      scenario[target] = subclass;
      count--;
      while (count-- > 0) {
        scenario = {
          [target]: scenario
        };
      }
    }
    return scenario;
  }
  static * _permute(targets, i = 0, result = {}, subclass = (list) => list.join('Then')) {
    let len = targets.length;
    let j;
    function swap() {
      if (j !== i) {
        let tmp = targets[i];
        targets[i] = targets[j];
        targets[j] = tmp;
      }
    }
    function append() {
      // TODO: cache cursor
      let cursor = result;
      for (let k = 0; k < len; k++) {
        if (!cursor[targets[k]]) {
          if (k >= len - 1) {
            cursor[targets[k]] = subclass(targets);
          }
          else {
            cursor[targets[k]] = {};
          }
        }
        cursor = cursor[targets[k]];
      }
    }
    if (i >= len - 1) {
      yield targets;
      append();
    }
    else {
      for (j = i; j < len; j++) {
        swap();
        for (let sub of this._permute(targets, i + 1, result)) {
          yield targets;
          append();
        }
        swap();
      }
    }
  }
  static permute(targets, subclass) {
    let result = {};
    for (let chain of this._permute(targets, 0, result, subclass)) {}
    return result;
  }
  async setup() {
  }
  forEvent(element, type, trigger, condition) {
    return new Promise(resolve => {
      element.addEventListener(type, function onEvent(event) {
        if (!condition ||
            (typeof condition === 'boolean' && condition && Polymer.dom(event).rootTarget === element) ||
            (typeof condition === 'function' && condition(element, type, event))) {
          element.removeEventListener(type, onEvent);
          resolve(event);
        }
      });
      if (trigger) {
        trigger();
      }
    })
  }
  * scenario() {
    // trick to unveil overridden methods
    let steps = [];
    let proto = Object.getPrototypeOf(this);
    while (proto.constructor.name && proto.constructor.name !== 'Object') {
      steps.unshift({
        name: proto.hasOwnProperty('description') ? proto.description : this.uncamel(Suite._name(proto.constructor)),
        iteration: proto.hasOwnProperty('iteration') ? proto.iteration : undefined,
        operation: proto.hasOwnProperty('operation') ? proto.operation : undefined,
        checkpoint: proto.hasOwnProperty('checkpoint') ? proto.checkpoint: undefined,
        ctor: proto.constructor
      });
      proto = Object.getPrototypeOf(proto);
    }
    yield * steps;
  }
  async teardown() {
  }
  run(classes, target) { // async method
    let self = this;
    if (Suite._name(self.constructor) === 'Suite') {
      return new Promise((resolve, reject) => {
        try {
          // Suite Runner
          let testSuites = [];
          if (typeof classes === 'number' || typeof classes === 'string') {
            // Number 0
            // Number string '0'
            // CSV string 'Test1,Test2'
            testSuites = self.testClasses(classes);
          }
          else if (typeof classes === 'object' && Array.isArray(classes)) {
            // String Array [ 'Test1', 'Test2' ]
            // Class Array [ Test1, Test2 ]
            // TODO: handle errors if item is neither a string nor a class
            testSuites = classes.map((item) => typeof item === 'string' ? self.classes[item] : item);
          }
          else if (typeof classes === 'object' && !Array.isArray(classes) && classes) {
            // Object { Test1: Test1, Test2: Test2 } - property names are discarded
            for (let c in classes) {
              testSuites.push(classes[c]);
            }
          }
          (typeof suite === 'function' ? suite : describe)(self.description || (self.scope + ' suite'), function() {
            let testInstances = testSuites.map(s => [ Suite._name(s), new s(target) ]);
            Promise.all(testInstances.map(async (instance, index) => instance[1].run()
                .then(v => testInstances[index][2] = v)
                .catch(e => testInstances[index][2] = e)))
              .then(results => {
                if (results.filter(i => i instanceof Error).length > 0) {
                  class MultiError extends Error {
                    constructor(message, errors) {
                      super(message);
                      this.errors = errors;
                    }
                  }
                  let errors = new MultiError(self.constructor.name + '.' + self.scope +
                    '.run(' + testInstances.map(item => item[0]).join(',') + '): ' +
                    'exception(s) thrown. See .errors for details', testInstances);
                  if (self.constructor.debug) { console.log(self.description + ': exception(s) thrown for ', classes, errors, errors.errors); }
                  reject(errors); // reject the promise for run()
                }
                else {
                  if (self.constructor.debug) { console.log(self.description + ': loaded for ', classes); }
                  resolve(); // resolve the promise for run()
                }
              });
              // no rejections to catch as they have been caught
          });
        }
        catch (e) {
          // catch exceptions outside of the Promise.all()
          reject(e); // reject the promise for run()
        }
      })
    }
    else {
      return new Promise((resolve, reject) => {
        let exception;
        let checkExceptionHandler = (reject, exception) => typeof self.exception === 'function' ? self.exception(reject, exception) : (reject(exception), true);
        try {
          // Scenario Runner
          let overrideToString = (func, ctor) => { func.toString = () => ctor.toString(); return func; };
          (typeof suite === 'function' ? suite : describe)(Object.getOwnPropertyDescriptor(Object.getPrototypeOf(self), 'description') ? self.description : self.uncamel(Suite._name(self.constructor)), async function () {
            (typeof suiteSetup === 'function' ? suiteSetup : before)(async function () {
              await self.setup();
            });

            try {
              for (let step of self.scenario()) {
                if (step.operation || step.checkpoint) {
                  if (step.iteration) {
                    for (let parameters of step.iteration.apply(self)) {
                      (typeof test === 'function' ? test : it)(parameters.name ?
                            (typeof parameters.name === 'function' ? parameters.name(parameters) : parameters.name)
                            : step.name, overrideToString(async function() {
                        if (self.constructor.skipAfterFailure && self.__failed) {
                          return this.skip();
                        }
                        else {
                          self.__failed = true;
                          if (step.operation) {
                            await step.operation.call(self, parameters);
                          }
                          if (step.checkpoint) {
                            await step.checkpoint.call(self, parameters);
                          }
                          self.__failed = false;
                        }
                      }, step.ctor));
                    }
                  }
                  else {
                    (typeof test === 'function' ? test : it)(step.name, overrideToString(async function() {
                      if (self.constructor.skipAfterFailure && self.__failed) {
                        return this.skip();
                      }
                      else {
                        self.__failed = true;
                        if (step.operation) {
                          await step.operation.call(self);
                        }
                        if (step.checkpoint) {
                          await step.checkpoint.call(self);
                        }
                        self.__failed = false;
                      }
                    }, step.ctor));
                  }
                }
              }
            }
            catch (e) {
              // catch exceptions within suite callback but outside of test callbacks
              exception = checkExceptionHandler(reject, e);
            }

            (typeof suiteTeardown === 'function' ? suiteTeardown : after)(async function () {
              await self.teardown();
            });
          });

          if (!exception) {
            resolve(); // resolve the promise for run()
          }
        }
        catch (e) {
          // catch exceptions outside of suite() callback
          exception = checkExceptionHandler(reject, e);
        }
      });
    }
  }
}

  return Suite;
})); // UMD Definition
