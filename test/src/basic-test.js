/*
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
// TODO: move to a common script file
class Suite {
  static get reconnectable() { return true; }
  constructor(target) {
    this.target = target;
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
  append(array, item) {
    array.push(item);
    return array;
  }
  * scenario() {
    // trick to unveil overridden methods
    let steps = [];
    let proto = Object.getPrototypeOf(this);
    while (proto.constructor.name && proto.constructor.name !== 'Object') {
      steps.unshift({
        name: this.uncamel(proto.constructor.name),
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
    suite(self.uncamel(self.constructor.name), async function () {
      suiteSetup(function () {
        return self.setup();
      });

      for (let step of self.scenario()) {
        if (step.operation || step.checkpoint) {
          if (step.iteration) {
            suite(step.name + ' iterations', async function () {
              for (let parameters of step.iteration.apply(self)) {
                test(parameters.name ? parameters.name(parameters) : step.name, async function() {
                  if (step.operation) {
                    await step.operation.call(self, parameters);
                  }
                  if (step.checkpoint) {
                    await step.checkpoint.call(self, parameters);
                  }
                });
              }
            });
          }
          else {
            test(step.name, async function() {
              if (step.operation) {
                await step.operation.call(self);
              }
              if (step.checkpoint) {
                await step.checkpoint.call(self);
              }
            });
          }
        }
      }

      suiteTeardown(function () {
        return self.teardown();
      });
    });
  }
}
class LiveLocalizerSuite extends Suite {
  static get reconnectable() { return false; }
  // TODO: Can setup be converted to operation?
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
class InstantiateTest extends LiveLocalizerSuite {
  async operation() {
    let self = this;
    await self.forEvent(self.container, 'dom-change', () => { self.container.if = true; }, true);
    self.element = document.querySelector('live-localizer');
    await self.forEvent(self.element, 'bundle-set-fetched');
    self.main = Polymer.dom(self.element.root).querySelector('live-localizer-main');
    self.fab = Polymer.dom(self.main.root).querySelector('live-localizer-fab');
    self.dialog = Polymer.dom(self.main.root).querySelector('live-localizer-dialog');
    self.panel = Polymer.dom(self.main.root).querySelector('live-localizer-panel');
    self.model = Polymer.dom(self.panel.root).querySelector('live-localizer-model');
    self.iconView = Polymer.dom(self.panel.root).querySelector('live-localizer-locale-icon-view');
    self.listView = Polymer.dom(self.panel.root).querySelector('live-localizer-list-view');
    self.storageView = Polymer.dom(self.panel.root).querySelector('live-localizer-storage-view');
  }
  async checkpoint() {
    let self = this;
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
  }
}
class OpenDialogTest extends InstantiateTest {
  async operation() {
    let self = this;
    await self.forEvent(self.dialog, 'neon-animation-finish', () => { MockInteractions.tap(self.fab); }, true);
  }
  async checkpoint() {
    let self = this;
    assert.isOk(self.dialog.opened, 'dialog is opened');
    assert.isNotOk(self.fab.opened, 'fab is not opened');
    // store dialog coordinates
    self.origin = {};
    [ 'x', 'y', 'width', 'height' ].forEach(function (prop) {
      self.origin[prop] = self.dialog[prop];
    });
  }
}
class DragDialogTest extends OpenDialogTest {
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
    ].map((parameters) => { parameters.name = (p) => 'drag dialog by ' + p.mode + ' handle'; return parameters });
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
class DragFabTest extends InstantiateTest {
  * iteration() {
    let dx = 10;
    let dy = 10;
    yield *[
      { mode: 'position', dx: dx, dy: dy, expected: { x: dx, y: dy, width: 0, height: 0 } }
    ];
  }
  async operation(parameters) {
    let self = this;
    self.origin = {};
    [ 'x', 'y', 'width', 'height' ].forEach(function (prop) {
      self.origin[prop] = self.fab[prop];
    });
    self.fab.dispatchEvent(new MouseEvent('mouseover', {
      bubbles: true,
      cancelable: true,
      clientX: 0,
      clientY: 0,
      buttons: 1
    }));
    await self.forEvent(self.fab, 'track', () => { MockInteractions.track(self.fab, parameters.dx, parameters.dy); }, (element, type, event) => event.detail.state === 'end');
  }
  async checkpoint(parameters) {
    for (let prop in parameters.expected) {
      assert.equal(
        this.fab[prop],
        this.origin[prop] + parameters.expected[prop],
        'fab is dragged with ' + parameters.mode + ' handle by ' + parameters.expected[prop] + ' in ' + prop);
    }
  }
}
// TODO: Refine handlers
var match = window.location.href.match(/^.*[^_a-zA-Z0-9]TestSuites=([_a-zA-Z0-9,]*).*$/);
if (match) {
  // Runner
  testSuites = match[1].split(/,/).map((name) => {
    // TODO: smarter scheme of conversion from class name to class
    switch (name) {
    case 'OpenDialogTest':
      return OpenDialogTest;
    case 'DragDialogTest':
      return DragDialogTest;
    case 'DragFabTest':
      return DragFabTest;
    default:
      return null;
    }
  });
}
else {
  // Driver
  testSuites = window.testSuites || {};
  testSuites.basic = [ DragDialogTest, DragFabTest ];
}
suite('live-localizer with ' + (window.location.href.indexOf('?dom=Shadow') >= 0 ? 'Shadow DOM' : 'Shady DOM'), function() {
  if (match) {
    testSuites.forEach((suite) => {
      if (suite) {
        // TODO: handle parameters
        (new suite('template#basic')).run();
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
      container.addEventListener('dom-change', function onDomChange (event) {
        container.removeEventListener('dom-change', onDomChange);
        element = document.querySelector('live-localizer');
        element.addEventListener('bundle-set-fetched', function onBundleSetFetched (event) {
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

  suite('dialog and fab scenario', function() {

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
        dialog.addEventListener('neon-animation-finish', function onNeonAnimationFinish (event) {
          if (Polymer.dom(event).rootTarget === dialog) {
            dialog.removeEventListener('neon-animation-finish', onNeonAnimationFinish);
            assert.isOk(dialog.opened, 'dialog is opened');
            assert.isNotOk(fab.opened, 'fab is not opened');
            origin = {};
            [ 'x', 'y', 'width', 'height' ].forEach(function (prop) {
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
    [
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
    ].forEach(function (params) {
      test('drag dialog by ' + params.mode + ' handle', function() {
        return new Promise(function (resolve, reject) {
          var dx = params.dx;
          var dy = params.dy;
          var handle = dialog.$.handle.querySelector(params.mode.match(/^[.]/) ? params.mode : '[drag-handle-mode=' + params.mode + ']');
          [ 'x', 'y', 'width', 'height' ].forEach(function (prop) {
            origin[prop] = dialog[prop];
          });
          dialog.addEventListener('track', function onTrack (event) {
            if (Polymer.dom(event).rootTarget === dialog) {
              if (event.detail.state === 'end') {
                dialog.removeEventListener('track', onTrack);
                for (var prop in params.expected) {
                  assert.equal(
                    dialog[prop],
                    origin[prop] + params.expected[prop],
                    'dialog is dragged with ' + params.mode + ' handle by ' + params.expected[prop] + ' in ' + prop);
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

    [
      { x: -100, y: -100, width: 10000, height: 10000 },
      { x: window.innerWidth / 2, y: window.innerHeight / 2, width: window.innerWidth * 0.75, height: window.innerHeight * 0.75 }
    ].forEach(function (dimension) {
      test('reset dialog position on window resize', function() {
        return new Promise(function (resolve, reject) {
          dialog.x = dimension.x;
          dialog.y = dimension.y;
          dialog.width = dimension.width;
          dialog.height = dimension.height;
          dialog.addEventListener('resize', function onResize (event) {
            if (Polymer.dom(event).rootTarget === dialog) {
              dialog.removeEventListener('resize', onResize);
              setTimeout(function () {
                assert.isOk(dialog.x >= 0, 'x is non-negative');
                assert.isOk(dialog.y >= 0, 'y is non-negative');
                assert.isOk(dialog.width <= window.innerWidth, 'width is within innerWidth');
                assert.isOk(dialog.height <= window.innerHeight, 'height is within innerHeight');
                [ 'x', 'y', 'width', 'height' ].forEach(function (prop) {
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
        fab.addEventListener('neon-animation-finish', function onNeonAnimationFinish (event) {
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

    [
      { mode: 'position', dx: dx, dy: dy, expected: { x: dx, y: dy, width: 0, height: 0 } }
    ].forEach(function (params) {
      test('drag fab', function() {
        return new Promise(function (resolve, reject) {
          var dx = params.dx;
          var dy = params.dy;
          var origin = {};
          [ 'x', 'y', 'width', 'height' ].forEach(function (prop) {
            origin[prop] = fab[prop];
          });
          fab.addEventListener('track', function onTrack (event) {
            if (Polymer.dom(event).rootTarget === fab) {
              if (event.detail.state === 'end') {
                fab.removeEventListener('track', onTrack);
                for (var prop in params.expected) {
                  assert.equal(
                    fab[prop],
                    origin[prop] + params.expected[prop],
                    'fab is dragged with ' + params.mode + ' handle by ' + params.expected[prop] + ' in ' + prop);
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

    [
      { x: -100, y: window.innerHeight + 100 },
      { x: window.innerWidth + 100, y: -100 }
    ].forEach(function (dimension) {
      test('reset fab position on window resize', function() {
        return new Promise(function (resolve, reject) {
          fab.x = dimension.x;
          fab.y = dimension.y;
          fab.addEventListener('resize', function onResize (event) {
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
