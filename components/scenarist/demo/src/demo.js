'use strict';
mocha.setup({ slow: 2000 });
// global test classes
class DemoSuite extends Suite {
  static get skipAfterFailure() { return true; }
  async setup() {
    await super.setup();
    this.container = document.querySelector(this.target);
  }
  async teardown() {
    let self = this;
    await super.teardown();
    await self.delay(300);
    await self.forEvent(self.container, 'dom-change', () => { self.container.if = false; }, true);
  }
  delay(ms) {
    return new Promise(resolve => {
      setTimeout(() => resolve(), ms);
    });
  }
  async tap(label) {
    let self = this;
    let button = self.buttons[label];
    if (button) {
      //await self.forEvent(button.getRipple(), 'transitionend', () => { MockInteractions.tap(button); }, (element, type, event) => true);
      MockInteractions.tap(button);
      await self.delay(300);
      button.getRipple().upAction();
      return button;
    }
    else {
      throw new Error('button ' + label + ' is not found');
    }
  }
  state(label) {
    return { tap: label, value: this.element.value, x: this.element.x, y: this.element.y, op: this.element.op, m: this.element.m };
  }
  get check() { return true; }
  set history(value) {
    this._history = this._history || [];
    this._history.push(value);
    console.log(this.history, this._history[this._history.length - 1].value);
  }
  get history() {
    return this._history.map(s => typeof s === 'object' ? s.tap : s).join('');
  }
}
class Connect extends DemoSuite {
  async operation() {
    let self = this;
    await self.forEvent(self.container, 'dom-change', () => { self.container.if = true; }, (element, type, event) => true);
    await self.delay(100);
    self.element = document.querySelector('nano-calc');
    self.buttonList = Array.prototype.map.call(Polymer.dom(self.element.root).querySelectorAll('paper-button'), b => b);
    self.buttons = self.buttonList.reduce((prev, curr) => { prev[curr.id] = curr; return prev; }, {});
  }
  async checkpoint() {
    let self = this;
    assert.equal(self.element.is, 'nano-calc', 'nano-calc is connected');
    assert.equal(self.buttonList.length, 25, 'has 25 buttons');
  }
}
{
  // demo scope
  let scope = 'demo';
  let demo = new Suite(scope, 'Scenarist Demo Suite');
  const labels = {
    // op: [ 'Class', 'id' ]
    '0': [ 'Number0', '0' ],
    '1': [ 'Number1', '1' ],
    '2': [ 'Number2', '2' ],
    '3': [ 'Number3', '3' ],
    '4': [ 'Number4', '4' ],
    '5': [ 'Number5', '5' ],
    '6': [ 'Number6', '6' ],
    '7': [ 'Number7', '7' ],
    '8': [ 'Number8', '8' ],
    '9': [ 'Number9', '9' ],
    'N': [ 'Negate', '+/-' ],
    'R': [ 'Mr', 'MR' ],
    'm': [ 'Mminus', 'M-' ],
    'M': [ 'Mplus', 'M+' ],
    '/': [ 'Divide', '/' ],
    '%': [ 'Percent', '%' ],
    '*': [ 'Multiply', '*' ],
    'S': [ 'Sqrt', 'sqrt' ],
    '+': [ 'Plus', '+' ],
    '-': [ 'Minus', '-' ],
    'C': [ 'Clear', 'C' ],
    '.': [ 'Dot', '.' ],
    '=': [ 'Equal', '=' ],
    'A': [ 'Ac', 'AC' ],
    'B': [ 'Bs', 'BS' ]
  };
  demo.labels = labels;
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

  let match = typeof window === 'object'
    ? decodeURIComponent(window.location.href).match(/^.*[^_a-zA-Z0-9]TestSuites=([_a-zA-Z0-9,]*).*$/)
    : false;

  if (typeof window === 'object') {
    // Browser
    if (match) {
      demo.run(parseInt(match[1]), '#demo');
    }
  }
  else {
    // Node
    for (var i = 0; i < demo.test.length; i++)
      demo.run(i, '#demo');
  }
} // demo scope
