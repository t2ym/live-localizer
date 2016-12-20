/*
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
class Suite {
  static get reconnectable() { return true; }
  static get skipAfterFailure() { return false; }
  constructor(target) {
    if (this.constructor.name === 'Suite') {
      // suite instance
      this.scope = target || '';
      this.classes = {};
      this.leafClasses = {};
      this.branchScenarios = {};
      this.mixins = {};
      this.constructor.scopes = this.constructor.scopes || {};
      this.constructor.scopes[this.scope] = this;
    }
    else {
      // test instance
      this.target = target;
    }
  }
  uncamel(name) {
    return name
      // insert a hyphen between lower & upper
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      // space before last upper in a sequence followed by lower
      .replace(/\b([A-Z]+)([A-Z])([a-z0-9])/, '$1 $2$3')
      // lowercase
      .toLowerCase();
  }
  set test(value) {
    if (typeof value === 'function') {
      if (value.name) {
        // test class
        if (this.classes[value.name]) {
          // test class with the name already exists
          throw new Error(this.constructor.name + '.' + this.scope + ': class ' + value.name + ' already exists');
        }
        else {
          // register a new test class with the name
          this.classes[value.name] = value;
          this.updateLeafClasses(value);
        }
      }
      else {
        // test class mixin
        let name = value(null).name;
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
    let list = [];
    for (let c in this.leafClasses) {
      list.push(this.leafClasses[c]);
    }
    let reconnectableList = [];
    for (let i in list) {
      if (list[i].reconnectable) {
        if (reconnectableList.length === 0) {
          reconnectableList.push([list[i]]);
        }
        else {
          let last = reconnectableList[reconnectableList.length - 1];
          if (last.length === 0) {
            last.push(list[i]);
          }
          else {
            if (last[last.length - 1].reconnectable) {
              last.push(list[i]);
            }
            else {
              reconnectableList.push([list[i]]);
            }
          }
        }
      }
      else {
        reconnectableList.push([list[i]]);
      }
    }
    // [ 'UnreconnectableTest', 'ReconnectableTest,ReconnectableTest,...', 'UnreconnectableTest', ...]
    return reconnectableList.map(l => l.map(c => c.name).join(','));
  }
  testClasses(tests) {
    let self = this;
    return (tests.match(/^[0-9]$/) ? self.test[tests] : tests).split(/,/).map((name) => {
      if (!self.classes[name]) {
        throw new Error('Suite.' + self.scope + ': Test ' + name + ' is not defined');
      }
      return self.classes[name];
    });
  }
  updateLeafClasses(value) {
    let proto = value;
    let chain = [];
    let name = proto.name;
    let isLeaf = true;
    let scenario = '';
    while (proto.name && proto.name !== 'Suite') {
      chain.unshift(proto.name);
      proto = Object.getPrototypeOf(proto);
    }
    for (let i in chain) {
      scenario = scenario ? scenario + ',' + chain[i] : chain[i];
      if (i < chain.length - 1) {
        if (!this.branchScenarios[scenario]) {
          this.branchScenarios[scenario] = true;
        }
        if (this.leafClasses[chain[i]]) {
          delete this.leafClasses[chain[i]];
        }
      }
      else {
        if (this.branchScenarios[scenario]) {
          isLeaf = false;
        }
      }
    }
    if (isLeaf) {
      this.leafClasses[name] = value;
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
      console.log('string', branch || chain[chain.length - 1], chain, description);
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
        console.log('null', branch, chain);
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
    if (!chain[0]) {
      // class mixin
      if (self.mixins[name]) {
        throw new Error(this.constructor.name + '.' + this.scope + ':generateClass mixin ' + name + ' already exists');
      }
      chain.forEach((c, i) => {
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
      expression = 'return (base) => ' + expression;
      self.mixins[name] = (new Function('self', expression))(self);
      console.log('generateClass mixins.' + name + ' = ' + expression);
    }
    else {
      // class
      if (this.classes[name]) {
        throw new Error(this.constructor.name + '.' + this.scope + ':generateClass class ' + name + ' already exists');
      }
      chain.forEach((c, i) => {
        if (i === 0) {
          if (self.classes[c]) {
            expression = 'self.classes.' + c;
          }
          else if ((new Function('return (typeof ' + c + ' === "function" && (new ' + c + '()) instanceof ' + self.constructor.name + ')'))()) {
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
      expression = chain.length === 1 && name === expression
        ? 'return ' + name
        : name === chain[chain.length - 1]
          ? 'return ' + expression
          : 'return class ' + name + ' extends ' + expression + (description ? ' { get description() { return "' + description.replace(/"/g,'\\"') + '"; } }' : ' {}');
      self.classes[name] = (new Function('self', expression))(self);
      self.updateLeafClasses(self.classes[name]);
      console.log('generateClass classes.' + name + ' = ' + expression);
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
        name: proto.hasOwnProperty('description') ? proto.description : this.uncamel(proto.constructor.name),
        iteration: proto.hasOwnProperty('iteration') ? proto.iteration : undefined,
        operation: proto.hasOwnProperty('operation') ? proto.operation : undefined,
        checkpoint: proto.hasOwnProperty('checkpoint') ? proto.checkpoint: undefined
      });
      proto = Object.getPrototypeOf(proto);
    }
    yield * steps;
  }
  async teardown() {
  }
  async run() {
    let self = this;
    suite(Object.getOwnPropertyDescriptor(Object.getPrototypeOf(self), 'description') ? self.description : self.uncamel(self.constructor.name), async function () {
      suiteSetup(async function () {
        await self.setup();
      });

      for (let step of self.scenario()) {
        if (step.operation || step.checkpoint) {
          if (step.iteration) {
            // suite() has to be commented out since subsuites are executed after all the other sibling tests
            //suite(step.name + ' iterations', async function () {
              for (let parameters of step.iteration.apply(self)) {
                test(parameters.name ?
                      (typeof parameters.name === 'function' ? parameters.name(parameters) : parameters.name)
                      : step.name, async function() {
                  if (self.constructor.skipAfterFailure && self.__failed) {
                    this.skip();
                    return;
                  }
                  self.__failed = true;
                  if (step.operation) {
                    await step.operation.call(self, parameters);
                  }
                  if (step.checkpoint) {
                    await step.checkpoint.call(self, parameters);
                  }
                  self.__failed = false;
                });
              }
            //});
          }
          else {
            test(step.name, async function() {
              if (self.constructor.skipAfterFailure && self.__failed) {
                this.skip();
                return;
              }
              self.__failed = true;
              if (step.operation) {
                await step.operation.call(self);
              }
              if (step.checkpoint) {
                await step.checkpoint.call(self);
              }
              self.__failed = false;
            });
          }
        }
      }

      suiteTeardown(async function () {
        await self.teardown();
      });
    });
  }
}
