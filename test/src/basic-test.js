/*
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  // basic scope
  let scope = 'basic';
  let basic = new Suite(scope);
  basic.test = (base) => class OpenDialogTest extends base {
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
  basic.test = (base) => class DragDialogTest extends base {
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
  basic.test = (base) => class DragFabTest extends base {
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
  basic.test = (base) => class CloseDialogTest extends base {
    async operation() {
      let self = this;
      await self.forEvent(self.fab, 'neon-animation-finish', () => { MockInteractions.tap(self.dialog.$.close); }, true);
    }
    async checkpoint() {
      assert.isNotOk(this.dialog.opened, 'dialog is not opened');
      assert.isOk(this.fab.opened, 'fab is opened');
    }
  }
  basic.test = {
    // test class mixins
    '': [],
    // test classes
    InstantiateTest: {
      OpenDialogTest: '',
      DragFabTest: {
        OpenDialogTest: 'DragFabAndOpenDialogTest'
      }
    },
    OpenDialogTest: {
      CloseDialogTest: 'OpenAndCloseDialogTest',
      DragDialogTest: {
        CloseDialogTest: 'OpenAndDragAndTestBAAndCloseDialogTest'
      }
    }
  };

  // TODO: Refine handlers
  let match = decodeURIComponent(window.location.href).match(/^.*[^_a-zA-Z0-9]TestSuites=([_a-zA-Z0-9,]*).*$/);
  window.testSuites = window.testSuites || {};

  if (match) {
    // Runner
    testSuites = Suite.scopes[scope].testClasses(match[1]);
  }
  else {
    // Driver
    testSuites[scope] = Suite.scopes[scope].test;
  }
  (async function () {
    suite('live-localizer with ' + (window.location.href.indexOf('?dom=Shadow') >= 0 ? 'Shadow DOM' : 'Shady DOM'), async function() {
      if (match) {
        testSuites.forEach(async (s) => {
          if (s) {
            // TODO: handle parameters
            await (new s('template#basic')).run();
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
})();
} // basic scope
