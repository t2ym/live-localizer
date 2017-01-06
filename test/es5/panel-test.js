/*
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  // dialog scope
  var scope = 'panel';
  var panel = new Suite(scope, 'live-localizer panel tests with ' + (window.location.href.indexOf('?dom=shadow') >= 0 ? 'Shadow DOM' : 'Shady DOM'));
  panel.test = Suite.scopes.dialog.classes.OpenDialogTest;
  /*
  panel.test = (base) => class OpenDialogTest extends base {
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
  panel.test = (base) => class DragDialogTest extends base {
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
  panel.test = (base) => class DragFabTest extends base {
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
  panel.test = (base) => class MaximizeDialogTest extends base {
    async operation() {
      let self = this;
      await self.forEvent(self.dialog, 'height-changed', () => { MockInteractions.tap(self.dialog.$.fullscreen); }, true);
    }
    async checkpoint() {
      assert.isOk(this.dialog.opened, 'dialog is opened');
      assert.isOk(this.dialog.fullscreen, 'dialog is in fullscreen');
    }
  }
  panel.test = (base) => class UnmaximizeDialogTest extends base {
    async operation() {
      let self = this;
      await self.forEvent(self.dialog, 'height-changed', () => { MockInteractions.tap(self.dialog.$['fullscreen-exit']); }, true);
    }
    async checkpoint() {
      assert.isOk(this.dialog.opened, 'dialog is opened');
      assert.isNotOk(this.dialog.fullscreen, 'dialog is not in fullscreen');
    }
  }
  panel.test = (base) => class ResetDialogPositionTest extends base {
    * iteration() {
      yield * [
        { name: 'reset fully overlapping dialog', x: -100, y: -100, width: 10000, height: 10000 },
        { name: 'reset patially overlapping dialog', x: window.innerWidth / 2, y: window.innerHeight / 2, width: window.innerWidth * 0.75, height: window.innerHeight * 0.75 }
      ];
    }
    async operation(dimension) {
      let self = this;
      self.dialog.x = dimension.x;
      self.dialog.y = dimension.y;
      self.dialog.width = dimension.width;
      self.dialog.height = dimension.height;
      await self.forEvent(self.dialog, 'resize', () => { self.dialog.fire('resize'); }, true);
    }
    async checkpoint(dimension) {
      let self = this;
      assert.isOk(self.dialog.x >= 0, 'x is non-negative');
      assert.isOk(self.dialog.y >= 0, 'y is non-negative');
      assert.isOk(self.dialog.width <= window.innerWidth, 'width is within innerWidth');
      assert.isOk(self.dialog.height <= window.innerHeight, 'height is within innerHeight');
      [ 'x', 'y', 'width', 'height' ].forEach(function (prop) {
        self.dialog[prop] = self.origin[prop];
      });
    }
  }
  panel.test = (base) => class ResetFabPositionTest extends base {
    * iteration() {
      yield * [
        { name: 'reset fab position from bottom left', x: -100, y: window.innerHeight + 100 },
        { name: 'reset fab position from top right', x: window.innerWidth + 100, y: -100 }
      ];
    }
    async operation(dimension) {
      let self = this;
      self.fab.x = dimension.x;
      self.fab.y = dimension.y;
      await self.forEvent(self.fab, 'resize', () => { self.fab.fire('resize'); }, true);
    }
    async checkpoint(dimension) {
      let self = this;
      assert.isOk(self.fab.x >= 0, 'x is non-negative');
      assert.isOk(self.fab.y >= 0, 'y is non-negative');
      assert.isOk(self.fab.x + 56 <= window.innerWidth, 'width is within innerWidth');
      assert.isOk(self.fab.y + 56 <= window.innerHeight, 'height is within innerHeight');
      self.fab.reset = false;
      self.fab.resetPosition();
    }
  }
  panel.test = (base) => class CloseDialogTest extends base {
    async operation() {
      let self = this;
      await self.forEvent(self.fab, 'neon-animation-finish', () => { MockInteractions.tap(self.dialog.$.close); }, true);
    }
    async checkpoint() {
      assert.isNotOk(this.dialog.opened, 'dialog is not opened');
      assert.isOk(this.fab.opened, 'fab is opened');
    }
  }
  */
  panel.test = {
    // test class mixins
    '': [],
    // test classes
    OpenDialogTest: 'OpenDialogTestAlias'
  };
} // panel scope