/**
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';

import 'scenarist/Suite.js';
/*
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  // common scope
  let scope = 'common';
  let common = new Suite(scope, 'live-localizer common scope');
  common.htmlSuite = '*'; // Only inherited scopes are executed
  // common test classes
  common.test = class LiveLocalizerSuite extends Suite {
    static get reconnectable() { return true; }
    get currentPhase() {
      this.href = this.href || window.location.href;
      let match = this.href.match(/^[^#]*#TestSuites=[^&]*&Scope=[a-zA-Z0-9_-]*&Phase=([0-9]*).*$/);
      return match ? Number.parseInt(match[1]) : 0;
    }
    get operationPhase() {
      return typeof this.phase === 'number' ? this.phase : 0;
    }
    get hasToSkip() {
      return this.currentPhase !== this.operationPhase;
    }
    stepPhase() {
      this.phase = typeof this.phase === 'number' ? this.phase + 1 : 1;
    }
    // TODO: Can setup be converted to operation?
    async setup() {
      await super.setup();
      if (!HTMLImports.useNative) {
        let count = 1;
        await this.checkInterval(() => count-- === 0, 100, 2);
      }
      this.fixture = document.querySelector(this.target);
      if (!HTMLImports.useNative) {
        let count = 1;
        await this.checkInterval(() => count-- === 0, 100, 2);
      }
    }
    async teardown() {
      let self = this;
      await super.teardown();
      self.fixture.restore();
    }
    /* async */ checkInterval(condition, interval, maxCount) {
      return new Promise((resolve, reject) => {
        if (condition()) {
          resolve();
        }
        else {
          let count = 0;
          let intervalId = setInterval(() => {
            if (condition()) {
              clearInterval(intervalId);
              resolve();
            }
            else if (++count >= maxCount) {
              clearInterval(intervalId);
              reject(new Error('condition = ' + condition.toString() + ' count = ' + count + ' maxCount = ' + maxCount));
            }
          }, interval);
        }
      });
    }
    async showTooltip(tooltipFor, tooltip) {
      let self = this;
      let mouseEventInit = {
        bubbles: false,
        cancelable: true,
        clientX: 0,
        clientY: 0,
        buttons: 1
      };
      await self.forEvent(tooltip, 'neon-animation-finish', () => {
        tooltipFor.dispatchEvent(new MouseEvent('mouseenter', mouseEventInit));
      }, (element, type, event) => {
        tooltipFor.dispatchEvent(new MouseEvent('mouseleave', mouseEventInit));
        return true;
      });
    }
    get tooltipMessageGetter() {
      let self = this;
      return (element, type, event) => {
        let message = self.tooltip.textContent.trim();
        if (self.tooltipMessage) {
          return !message;
        }
        else {
          self.tooltipMessage = message;
          return false;
        }
      }
    }
    async dragDrop(src, dest, dx, dy, action, waitFor, eventTarget, eventCondition) {
      let self = this;
      let mouseEventInit = {
        bubbles: false,
        cancelable: true,
        clientX: 0,
        clientY: 0,
        buttons: 1
      };
      self.dragDropEvent = null;
      let onDragAndDrop = (e) => {
        self.dragDropEvent = e;
        console.log('self.dragDropEvent = ', e);
        src.removeEventListener('drag-and-drop', onDragAndDrop);
      };
      switch (action) {
      case 'release':
        break;
      case 'drop':
      default:
        src.addEventListener('drag-and-drop', onDragAndDrop);
        break;
      }
      src.dispatchEvent(new MouseEvent('mouseover', mouseEventInit));
      let step = 0;
      let steps;
      switch (action) {
      case 'noop':
        steps = [];
        break;
      case 'release':
        steps = [ [ 'mouseenter' ], [ 'mouseout', 'mouseleave' ] ];
        break;
      case 'drop':
      default:
        steps = [ [ 'mouseenter' ], [ 'mouseup' ] ];
        break;
      }
      await self.forEvent(src, 'track', () => {
        MockInteractions.track(src, dx, dy);
      }, (element, type, event) => {
        if (event.detail.state !== 'end') {
          if (step < steps.length) {
            steps[step].forEach((event) => {
              dest.dispatchEvent(new MouseEvent(event, mouseEventInit));
            });
            step++;
          }
        }
        return event.detail.state === 'end';
      });
      switch (waitFor) {
      case 'drag-and-drop':
      case 'neon-animation-finish':
      case 'load-xliff':
        await self.forEvent(eventTarget || src, waitFor, () => {}, eventCondition || ((element, type, event) => true));
        break;
      default:
        break;
      }
    }
  }
  common.test = (base) => class InstantiateTest extends base {
    async operation() {
      let self = this;
      this.fixture.create();
      self.element = self.fixture.querySelector('live-localizer');
      await self.forEvent(self.element, 'bundle-set-fetched');
      self.main = dom(self.element.root).querySelector('live-localizer-main');
      self.fab = dom(self.main.root).querySelector('live-localizer-fab');
      self.dialog = dom(self.main.root).querySelector('live-localizer-dialog');
      self.panel = dom(self.main.root).querySelector('live-localizer-panel');
      self.model = dom(self.panel.root).querySelector('live-localizer-model');
      self.iconView = dom(self.panel.root).querySelector('live-localizer-locale-icon-view');
      self.listView = dom(self.panel.root).querySelector('live-localizer-list-view');
      self.storageView = dom(self.panel.root).querySelector('live-localizer-storage-view');
      self.browserStorage = self.storageView.$['browser-storage'];
      self.firebaseStorage = self.storageView.queryEffectiveChildren('live-localizer-firebase-storage#firebase-storage');
      self.fileStorage = self.storageView.$['file-storage'];
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
      assert.equal(self.browserStorage.is, 'live-localizer-browser-storage');
      if (self.firebaseStorage) { assert.equal(self.firebaseStorage.is, 'live-localizer-firebase-storage'); }
      assert.equal(self.fileStorage.is, 'live-localizer-local-file-storage');
    }
  }
  common.test = (base) => class Reload extends base {
    static get reconnectable() { return false; }
    async operation() {
      this.stepPhase();
    }
  }
  common.test = {
    LiveLocalizerSuite: {
      InstantiateTest: ''
    }
  };
} // common scope/*
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  // dialog scope
  let scope = 'dialog';
  let dialog = new Suite(scope, 'live-localizer dialog and fab tests');
  dialog.htmlSuite = 'live-localizer-lazy';
  dialog.test = Suite.scopes.common.classes.LiveLocalizerSuite;
  dialog.test = Suite.scopes.common.classes.InstantiateTest;
  dialog.test = (base) => class OpenDialogTest extends base {
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
  dialog.test = (base) => class DragDialogTest extends base {
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
  dialog.test = (base) => class DragFabTest extends base {
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
  dialog.test = (base) => class MaximizeDialogTest extends base {
    async operation() {
      let self = this;
      await self.forEvent(self.dialog, 'height-changed', () => { MockInteractions.tap(self.dialog.$.fullscreen); }, true);
      window.dispatchEvent(new MouseEvent('resize', {
        bubbles: true,
        cancelable: true,
        clientX: 0,
        clientY: 0,
        buttons: 1
      }));
    }
    async checkpoint() {
      assert.isOk(this.dialog.opened, 'dialog is opened');
      assert.isOk(this.dialog.fullscreen, 'dialog is in fullscreen');
    }
  }
  dialog.test = (base) => class UnmaximizeDialogTest extends base {
    async operation() {
      let self = this;
      await self.forEvent(self.dialog, 'height-changed', () => { MockInteractions.tap(self.dialog.$['fullscreen-exit']); }, true);
    }
    async checkpoint() {
      assert.isOk(this.dialog.opened, 'dialog is opened');
      assert.isNotOk(this.dialog.fullscreen, 'dialog is not in fullscreen');
    }
  }
  dialog.test = (base) => class ResetDialogPositionTest extends base {
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
  dialog.test = (base) => class ResetFabPositionTest extends base {
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
  dialog.test = (base) => class CloseDialogTest extends base {
    async operation() {
      let self = this;
      await self.forEvent(self.fab, 'neon-animation-finish', () => { MockInteractions.tap(self.dialog.$.close); }, true);
    }
    async checkpoint() {
      assert.isNotOk(this.dialog.opened, 'dialog is not opened');
      assert.isOk(this.fab.opened, 'fab is opened');
    }
  }
  dialog.test = (base) => class ReattachTest extends base {
    async operation() {
      let self = this;
      self.parent = self.element.parentNode;
      self.parent.removeChild(self.element);
      self.parent.appendChild(self.element);
    }
    async checkpoint() {
      assert.equal(this.element.parentNode, this.parent, 'element is reattached');
    }
  }
  dialog.test = (base) => class LoadFailureTest extends base {
    static get reconnectable() { return false; }
    async operation() {
      let self = this;
      let mainLink = Array.prototype.filter.call(document.querySelectorAll('link[rel=import]'), (link) => link.href.match(/live-localizer-lazy[.]html/));
      this.fixture.create();
      self.element = self.fixture.querySelector('live-localizer');
      if (mainLink.length === 1) {
        self.lazy = true;
        await self.checkInterval(() => {
          let lazyLinks = Array.prototype.filter.call(document.querySelectorAll('link[rel=import][async]'), (link) => link.href.match(/live-localizer-main[.]html/));
          if (lazyLinks.length === 1) {
            lazyLinks[0].dispatchEvent(new Event('error'));
            return true;
          }
          else {
            return false;
          }
        }, 1, 2000);
      }
      else {
        await self.forEvent(self.element, 'bundle-set-fetched');
      }
      self.main = dom(self.element.root).querySelector('live-localizer-main');
    }
    async checkpoint() {
      let self = this;
      // element existence
      assert.isOk(self.element, 'live-localizer exists');
      assert.isOk(self.main, 'live-localizer-main exists');
      if (self.lazy) {
        assert.isNotOk(self.main.is, 'live-localizer-main is not imported');
      }
      else {
        assert.equal(self.main.is, 'live-localizer-main', 'live-localizer-main is instantiated');
      }
    }
  }
  dialog.test = {
    // test class mixins
    '': [],
    // test classes
    InstantiateTest: {
      OpenDialogTest: '',
      DragFabTest: {
        OpenDialogTest: 'DragFabAndOpenDialogTest'
      },
      ResetFabPositionTest: '',
      ReattachTest: ''
    },
    OpenDialogTest: {
      CloseDialogTest: 'OpenAndCloseDialogTest',
      DragDialogTest: {
        CloseDialogTest: 'OpenAndDragAndCloseDialogTest'
      },
      MaximizeDialogTest: {
        UnmaximizeDialogTest: {
          DragDialogTest: {
            CloseDialogTest: 'MaxUnmaxDragCloseDialogTest'
          }
        }
      },
      ResetDialogPositionTest: ''
    },
    MaxUnmaxDragCloseDialogTest: {
      DragFabTest: 'MaxUnmaxDragCloseDialogAndDragFabTest'
    },
    LiveLocalizerSuite: {
      LoadFailureTest: 'LazyLoadFailureTest'
    }
  };
} // dialog scope
/*
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  // panel scope (subscope of dialog)
  let scope = 'panel';
  let panel = new Suite(scope, 'live-localizer panel tests');
  panel.htmlSuite = 'live-localizer';
  panel.test = Suite.scopes.common.mixins.Reload;
  panel.test = Suite.scopes.common.classes.InstantiateTest;
  panel.test = Suite.scopes.dialog.classes.OpenDialogTest;
  panel.test = (base) => class PanelTooltipTest extends base {
    static get reconnectable() { return false; }
    * iteration() {
      yield *[
        { button: 'iconview-button', tooltip: 'Show Icons' },
        { button: 'listview-button', tooltip: 'Show List' },
        { button: 'storageview-button', tooltip: 'Show Storage' },
        { button: 'load', tooltip: 'Load XLIFF' },
        { button: 'locales', tooltip: 'Check Updates on Locales' },
        { button: 'reload', tooltip: 'Reload App', serverUpdated: true }
      ].map((parameters) => { parameters.name = 'tooltip for ' + parameters.button + ' button is "' + parameters.tooltip + '"'; return parameters });
    }
    async operation(parameters) {
      let self = this;
      if (parameters.serverUpdated) {
        await self.forEvent(self.panel, 'dom-change', () => { self.panel.serverUpdated = true; },
          (element, type, event) => !!dom(self.panel.root).querySelector('paper-icon-button#reload'));
      }
      let button = self.panel.$[parameters.button] || dom(self.panel.root).querySelector('#' + parameters.button);
      self.tooltip = dom(self.panel.root).querySelector('paper-tooltip[for=' + parameters.button + ']');
      await self.showTooltip(button, self.tooltip);
    }
    async checkpoint(parameters) {
      assert.equal(this.tooltip.getAttribute('for'), parameters.button, 'paper-tooltip should be for ' + parameters.button);
      assert.equal(this.tooltip.textContent.trim(), parameters.tooltip, 'tooltip should be "' + parameters.tooltip + '"');
    }
  }
  // Must be after PanelTooltipTest
  panel.test = (base) => class ReloadTooltipTest extends base {
    async operation() {
      let self = this;
      self.tooltip = dom(self.panel.root).querySelector('paper-tooltip#updated');
    }
    async checkpoint() {
      assert.equal(this.tooltip.getAttribute('for'), 'panelarea', 'paper-tooltip should be for panelarea');
      assert.equal(this.tooltip.textContent.trim(), 'App has been updated at server', 'tooltip should be "App has been updated at server"');
    }
  }
  panel.test = (base) => class ModelAlertTest extends base {
    async operation() {
      let self = this;
      self.tooltip = dom(self.panel.root).querySelector('paper-tooltip#alert');
      await self.forEvent(self.tooltip, 'neon-animation-finish', () => {
        self.model.checkXliffConvVersion(undefined);
      }, (element, type, event) => {
        self.tooltip = dom(event).rootTarget;
        return self.tooltip.is === 'paper-tooltip' && self.tooltip.for === 'panelarea';
      });
    }
    async checkpoint() {
      assert.equal(this.tooltip.getAttribute('for'), 'panelarea', 'paper-tooltip should be for panelarea');
      assert.equal(this.tooltip.textContent.trim(), 'Incompatible xliff-conv with no version information', 'tooltip should be "Incompatible xliff-conv with no version information"');
    }
  }
  panel.test = (base) => class PanelViewTest extends base {
    * iteration() {
      yield *[
        { button: 'listview-button', view: 'listview' },
        { button: 'detailview-button', view: 'detailview', missing: true },
        { button: 'storageview-button', view: 'storageview' },
        { button: 'iconview-button', view: 'iconview' }
      ].map((parameters) => { parameters.name = 'view for ' + parameters.button + ' is ' + parameters.view + ' and ' + (parameters.missing ? 'missing' : 'shown'); return parameters });
    }
    async operation(parameters) {
      let self = this;
      let button = self.panel.$[parameters.button];
      self.pages = dom(self.panel.$.panelarea).querySelector('iron-pages.panel-selector');
      if (parameters.missing) {
        await self.forEvent(self.pages, 'iron-deselect', () => { MockInteractions.tap(button); }, (element, type, event) => self.pages.selected === parameters.view);
      }
      else {
        await self.forEvent(self.pages, 'iron-select', () => { MockInteractions.tap(button); }, (element, type, event) => self.pages.selected === parameters.view);
      }
    }
    async checkpoint(parameters) {
      assert.equal(this.pages.selected, parameters.view, parameters.view + ' is selected by ' + parameters.button);
      let selectedViews = dom(this.pages).querySelectorAll('.iron-selected');
      if (parameters.missing) {
        assert.equal(selectedViews.length, 0, 'No selected view for ' + parameters.view);
      }
      else {
        assert.equal(selectedViews.length, 1, 'Only 1 selected view for ' + parameters.view);
        assert.equal(selectedViews[0].getAttribute('name'), parameters.view, parameters.view + ' is selected');
      }
    }
  }
  panel.test = (base) => class SelectIconView extends base {
    async operation() {
      let self = this;
      let button = self.panel.$['iconview-button'];
      self.pages = dom(self.panel.$.panelarea).querySelector('iron-pages.panel-selector');
      if (self.pages.selected !== 'iconview') {
        await self.forEvent(self.pages, 'iron-select', () => { MockInteractions.tap(button); }, (element, type, event) => self.pages.selected === 'iconview');
      }
    }
    async checkpoint() {
      assert.equal(dom(this.pages).querySelector('.iron-selected').getAttribute('name'), 'iconview', 'iconview is shown');
    }
  }
  panel.test = (base) => class SelectListView extends base {
    async operation() {
      let self = this;
      let button = self.panel.$['listview-button'];
      self.pages = dom(self.panel.$.panelarea).querySelector('iron-pages.panel-selector');
      if (self.pages.selected !== 'listview') {
        await self.forEvent(self.pages, 'iron-select', () => { MockInteractions.tap(button); }, (element, type, event) => self.pages.selected === 'listview');
      }
    }
    async checkpoint() {
      assert.equal(dom(this.pages).querySelector('.iron-selected').getAttribute('name'), 'listview', 'listview is shown');
    }
  }
  panel.test = (base) => class SelectStorageView extends base {
    async operation() {
      let self = this;
      let button = self.panel.$['storageview-button'];
      self.pages = dom(self.panel.$.panelarea).querySelector('iron-pages.panel-selector');
      if (self.pages.selected !== 'storageview') {
        await self.forEvent(self.pages, 'iron-select', () => { MockInteractions.tap(button); }, (element, type, event) => self.pages.selected === 'storageview');
      }
    }
    async checkpoint() {
      assert.equal(dom(this.pages).querySelector('.iron-selected').getAttribute('name'), 'storageview', 'storageview is shown');
    }
  }
  panel.test = (base) => class FileLoadButtonTest extends base {
    static get reconnectable() { return false; }
    async operation() {
      let self = this;
      let button = self.panel.$.load;
      self.mockStorage = self.model.storage['file-storage'];
      self.mockStorage.load = function load (event) {
        self.loadEvent = event;
      }
      MockInteractions.tap(button);
    }
    async checkpoint(parameters) {
      assert.equal(this.mockStorage.selected, true, 'fileStorage.selected is true');
      assert.equal(this.loadEvent.type, 'tap', 'load file via a "tap" event');
    }
  }
  panel.test = (base) => class LocalesButtonTest extends base {
    static get reconnectable() { return false; }
    async operation() {
      let self = this;
      let button = dom(self.panel.root).querySelector('paper-icon-button#locales');
      self.mockModel = self.model
      self.mockModel.fetch = function fetch () {
        self.fetched = true;
      }
      MockInteractions.tap(button);
    }
    async checkpoint(parameters) {
      assert.isOk(this.fetched, 'model.fetched() via locales button');
    }
  }
  panel.test = (base) => class CleanupSessionStorage extends base {
    async setup() {
      await super.setup();
      if (this.hasToSkip) {
        this.initialReloadUrl = window.sessionStorage.getItem('live-localizer-reload-url');
        return;
      }
      window.sessionStorage.removeItem('live-localizer-reload-url');
    }
  }
  panel.test = (base) => class OpenDialogOnReload extends base {
    async operation() {
      let self = this;
      if (this.hasToSkip) {
        await self.checkInterval(() => self.dialog.opened, 200, 100);
        return;
      }
      await self.forEvent(self.dialog, 'neon-animation-finish', () => { MockInteractions.tap(self.fab); }, true);
      await self.checkInterval(() => self.model.lastModified, 200, 100);
      self.model.lastModified = (new Date(0)).toUTCString(); // Make the next fetch result updated
      await self.checkInterval(() => self.model.serverUpdated, 1000, 70);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      let self = this;
      assert.isOk(self.dialog.opened, 'dialog is opened');
      assert.isNotOk(self.fab.opened, 'fab is not opened');
    }
  }
  panel.test = (base) => class ReloadButtonTest extends base {
    static get reconnectable() { return false; }
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      self.reloadButton = dom(self.panel.root).querySelector('paper-icon-button#reload');
      self.reloaded = false;
      self.mockModel = self.model;
      self.mockModel._reload = function () {
        self.reloaded = true;
        self.reloadUrl = window.sessionStorage.getItem('live-localizer-reload-url');
      }
      self.initialReloadUrl = window.sessionStorage.getItem('live-localizer-reload-url');
      self.currentHref = window.location.href;
      MockInteractions.tap(self.reloadButton);
      await self.checkInterval(() => self.reloaded, 200, 100);
    }
    async checkpoint(parameters) {
      if (this.hasToSkip) { return; }
      assert.isOk(this.reloaded, 'model.reload() via reload button');
      assert.isNotOk(this.initialReloadUrl, 'initial live-localizer-reload-url is empty');
      assert.equal(this.reloadUrl, this.currentHref, 'sessionStorage live-localizer-reload-url is "' + this.currentHref + '"');
    }
  }
  panel.test = (base) => class ReloadButtonTest2 extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      self.currentHref = window.location.href;
      await self.checkInterval(() => !(self.reloadUrl = window.sessionStorage.getItem('live-localizer-reload-url')), 200, 100);
    }
    async checkpoint(parameters) {
      if (this.hasToSkip) { return; }
      assert.isOk(this.dialog.opened, 'dialog is opened');
      assert.isNotOk(this.fab.opened, 'fab is not opened');
      assert.isNotOk(this.reloadUrl, 'sessionStorage live-localizer-reload-url is cleared');
      assert.equal(this.currentHref, this.initialReloadUrl, 'location.href is "' + this.reloadUrl + '"');
    }
  }
  panel.test = {
    // test class mixins
    '': [],
    // test classes
    OpenDialogTest: {
      PanelTooltipTest: {
        ReloadTooltipTest: {
          ModelAlertTest: 'PanelTooltipTests; Tooltips for panel'
        }
      },
      PanelViewTest: 'PanelViewTests; Views for panel',
      FileLoadButtonTest: 'MockFileLoadButtonTest; File load button test (mock)',
      LocalesButtonTest: 'MockLocalesButtonTest; Locales button test (mock)',
      SelectIconView: '',
      SelectListView: '',
      SelectStorageView: ''
    },
    InstantiateTest: {
      CleanupSessionStorage: {
        OpenDialogOnReload: {
          ReloadButtonTest: {
            Reload: {
              ReloadButtonTest2: 'MockReloadButtonTest_phase_1; Reload button test (mock)'
            }
          }
        }
      }
    }
  };
} // panel scope
/*
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  // iconview scope (subscope of panel)
  let scope = 'iconview';
  let iconview = new Suite(scope, 'live-localizer iconview tests');
  iconview.htmlSuite = 'live-localizer';
  iconview.test = Suite.scopes.panel.classes.SelectIconView;
  iconview.test = (base) => class DropareaTooltipTest extends base {
    async operation() {
      let self = this;
      let droparea = self.iconView.$.droparea;
      let tooltip = dom(self.iconView.root).querySelector('paper-tooltip[for=droparea]');
      await self.forEvent(tooltip, 'neon-animation-finish', () => {
        droparea.dispatchEvent(new MouseEvent('mouseenter', {
          bubbles: true,
          cancelable: true,
          clientX: 0,
          clientY: 0,
          buttons: 1
        }));
      }, (element, type, event) => {
        self.tooltip = dom(event).rootTarget;
        return self.tooltip.is === 'paper-tooltip' && self.tooltip.for === 'droparea';
      });
      await self.forEvent(tooltip, 'neon-animation-finish', () => {}, (element, type, event) => true);
    }
    async checkpoint() {
      assert.equal(this.tooltip.getAttribute('for'), 'droparea', 'paper-tooltip should be for droparea');
      assert.equal(this.tooltip.textContent.trim(), 'Drag and drop XLIFF to load', 'tooltip should be "Drag and drop XLIFF to loadparameters.tooltip"');
    }
  }
  iconview.test = (base) => class SelectLocaleIconTest extends base {
    async operation() {
      let self = this;
      let droparea = self.iconView.$.droparea;
      self.icon = dom(self.iconView.root).querySelector('live-localizer-locale-icon#locale-icon-de');
      await self.forEvent(self.model, 'html-lang-mutation', () => { MockInteractions.tap(self.icon); }, (element, type, event) => self.model.html.lang === 'de');
    }
    async checkpoint() {
      assert.equal(this.model.html.lang, 'de', 'html.lang should be "de"');
      assert.isOk(this.icon.selected, 'Selected icon is selected');
    }
  }
  // Must be after SelectLocaleIconTest
  iconview.test = (base) => class MockSaveFileTest extends base {
    static get reconnectable() { return false; }
    async operation() {
      let self = this;
      let droparea = self.iconView.$.droparea;
      self.icon = dom(self.iconView.root).querySelector('live-localizer-locale-icon#locale-icon-de');
      self.mockStorage = self.model.storage['file-storage'];
      self.mockStorage.save = function save(file) {
        self.savedFile = file;
      }
      MockInteractions.tap(self.icon);
    }
    async checkpoint() {
      assert.equal(this.savedFile.locale, 'de', 'Saved file locale should be "de"');
    }
  }
  iconview.test = (base) => class MockDropFileTest extends base {
    async operation() {
      let self = this;
      self.droparea = self.iconView.$.droparea;
      self.mockStorage = self.model.storage['file-storage'];
      self.mockStorage.load = function load (event) {
        self.loadEvent = event;
      }
      await self.forEvent(self.droparea, 'dragover', () => {
        self.droparea.dispatchEvent(new MouseEvent('dragover', {
          bubbles: true,
          cancelable: true,
          clientX: 0,
          clientY: 0,
          buttons: 1
        }));
      }, (element, type, event) => event.type === 'dragover');
      await self.forEvent(self.droparea, 'drop', () => {
        self.droparea.dispatchEvent(new MouseEvent('drop', {
          bubbles: true,
          cancelable: true,
          clientX: 0,
          clientY: 0,
          buttons: 1
        }));
      }, (element, type, event) => event.type === 'drop');
    }
    async checkpoint() {
      assert.equal(this.mockStorage.selected, true, 'fileStorage.selected is true');
      assert.equal(this.loadEvent.type, 'drop', 'load file via a "drop" event');
    }
  }
  iconview.test = (base) => class IconViewBadgeTapTest extends base {
    async operation() {
      let self = this;
      let droparea = self.iconView.$.droparea;
      self.pages = dom(self.panel.$.panelarea).querySelector('iron-pages.panel-selector');
      self.icon = dom(self.iconView.root).querySelector('live-localizer-locale-icon#locale-icon-de');
      self.badge = self.icon.$.badge;
      await self.forEvent(self.pages, 'iron-select', () => { MockInteractions.tap(self.badge); }, (element, type, event) => self.pages.selected === 'listview');
    }
    async checkpoint() {
      assert.isOk(this.icon.selected, 'de locale icon is selected');
      assert.equal(this.pages.selected, 'listview', 'listview is shown');
    }
  }
  iconview.test = (base) => class IconTooltipTest extends base {
    static get reconnectable() { return false; }
    * iteration() {
      yield *[
        { icon: 'en', tooltip: 'Save XLIFF' },
        { icon: 'de', tooltip: 'Switch Locale' }
      ].map((parameters) => { parameters.name = 'tooltip for ' + parameters.icon + ' icon is "' + parameters.tooltip + '"'; return parameters });
    }
    async operation(parameters) {
      let self = this;
      self.icon = dom(self.iconView.root).querySelector('live-localizer-locale-icon#locale-icon-' + parameters.icon);
      self.tooltip = dom(self.icon.root).querySelector('paper-tooltip[for=card]');
      await self.showTooltip(self.icon.$.card, self.tooltip);
    }
    async checkpoint(parameters) {
      assert.equal(this.tooltip.getAttribute('for'), 'card', 'paper-tooltip should be for card');
      assert.equal(this.tooltip.textContent.trim(), parameters.tooltip, 'tooltip should be "' + parameters.tooltip + '"');
    }
  }
  iconview.test = (base) => class IconFlagUnitTest extends base {
    * iteration() {
      yield *[
        { locale: 'zh-CN', flag: 'CN' },
        { locale: 'zh-Hans', flag: 'CN' },
        { locale: 'en-GB', flag: 'GB' },
        { locale: 'en', flag: 'US' },
        { locale: 'ja', flag: 'JP' },
        { locale: 'xx', flag: '' }
      ].map((parameters) => { parameters.name = 'flag for ' + parameters.locale + ' locale icon is "' + parameters.flag + '"'; return parameters });
    }
    async operation(parameters) {
      let self = this;
      self.icon = dom(self.iconView.root).querySelector('live-localizer-locale-icon#locale-icon-en');
      self.flag = self.icon.flag(parameters.locale)
    }
    async checkpoint(parameters) {
      assert.equal(this.flag, (parameters.flag ? '/components/region-flags/png/' + parameters.flag + '.png' : parameters.flag), 'flag is "' + parameters.flag + '"');
    }
  }
  iconview.test = (base) => class IconViewDragIconTest extends base {
    * iteration() {
      yield *[
        { icon: 'en', mode: 'none' },
        { icon: 'de', mode: 'none' }
      ].map((parameters) => { parameters.name = 'dragHandleMode for ' + parameters.icon + ' locale icon is "' + parameters.mode + '"'; return parameters });
    }
    async operation(parameters) {
      let self = this;
      self.icon = dom(self.iconView.root).querySelector('live-localizer-locale-icon#locale-icon-' + parameters.icon);
      self.icon.dispatchEvent(new MouseEvent('mouseover', {
        bubbles: true,
        cancelable: true,
        clientX: 0,
        clientY: 0,
        buttons: 1
      }));
      await self.forEvent(self.icon, 'track', () => { MockInteractions.track(self.icon, 100, 100); }, (element, type, event) => event.detail.state === 'end');
    }
    async checkpoint(parameters) {
      assert.equal(this.icon.dragHandleMode, parameters.mode, 'dragHandleMode for ' + parameters.icon + ' locale icon is "' + parameters.mode + '"');
    }
  }
  iconview.test = {
    // test class mixins
    '': [],
    // test classes
    SelectIconView: {
      DropareaTooltipTest: 'DropareaTooltipTest; Show tooltip for droparea',
      SelectLocaleIconTest: {
        MockSaveFileTest: 'SelectAndSaveWithLocaleIconTest; Salect a locale and save file (mock)'
      },
      MockDropFileTest: 'MockDropFileTest; Drop file on droparea (mock)',
      IconViewBadgeTapTest: 'IconViewBadgeTapTest; Tap a badge to select locale and switch to listview',
      IconTooltipTest: 'IconTooltipTest; Show tooltips for selected/unselected locale icons',
      IconFlagUnitTest: 'IconFlagUnitTest; Select their proper flags for locales',
      IconViewDragIconTest: 'IconViewDragIconTest; dragHandleMode is "none" for locale icons in iconview'
    }
  };
} // panel scope
/*
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  // listview scope (subscope of panel)
  let scope = 'listview';
  let listview = new Suite(scope, 'live-localizer listview tests');
  listview.htmlSuite = 'live-localizer-firebase-lazy';
  listview.test = Suite.scopes.panel.classes.SelectListView;
  listview.test = (base) => class ListViewItemsTest extends base {
    static get reconnectable() { return false; }
    async operation() {
      let self = this;
      self.list = self.listView.$.list;
      await self.checkInterval(() => self.list.items.length === 6, 100 /* ms */, 20 /* times */);
    }
    async checkpoint() {
      assert.equal(this.list.items.length, 6, 'list item length is 6');
    }
  }
  listview.test = (base) => class ListViewSelectItemTest extends base {
    * iteration() {
      for (let i = 5; i >= 0; i--) {
        yield { i: i, name: 'listItems[' + i + '] is selected' }
      }
    }
    async operation(parameters) {
      let self = this;
      self.list = self.listView.$.list;
      await self.forEvent(self.model, 'html-lang-mutation',
        () => {
          if (self.listView.version1) {
            self.list.selection.select(parameters.i);
          }
          if (self.listView.version2) {
            self.list.activeItem = self.listView.listItems[parameters.i];
          }
        },
        (element, type, event) => true);
    }
    async checkpoint(parameters) {
      if (this.listView.version1) {
        assert.equal(this.list.selection.selected().length, 1, 'Only 1 item is selected');
        assert.equal(this.list.selection.selected()[0], parameters.i, 'Selected item is ' + this.listView.listItems[parameters.i][0]);
      }
      if (this.listView.version2) {
        assert.equal(this.list.selectedItems.length, 1, 'Only 1 item is selected');
        assert.equal(this.list.selectedItems[0][0], this.listView.listItems[parameters.i][0], 'Selected item is ' + this.listView.listItems[parameters.i][0]);
      }
      assert.equal(this.model.html.lang, this.listView.listItems[parameters.i][1], 'Selected locale is ' + this.listView.listItems[parameters.i][1]);
    }
  }
  listview.test = (base) => class ListViewUnsupportedHtmlLangTest extends base {
    async operation() {
      let self = this;
      self.list = self.listView.$.list;
      await self.forEvent(self.model, 'html-lang-mutation',
        () => { self.model.html.lang = 'ru' },
        (element, type, event) => true);
    }
    async checkpoint() {
      if (this.listView.version1) {
        assert.equal(this.list.selection.selected().length, 0, 'no locale is selected');
      }
      if (this.listView.version2) {
        assert.equal(this.list.selectedItems.length, 0, 'no locale is selected');
      }
    }
  }
  listview.test = (base) => class ListViewHtmlLangTest extends base {
    * iteration() {
      for (let i = 5; i >= 0; i--) {
        yield { i: i, name: 'listItems[' + i + '] is selected' }
      }
    }
    async operation(parameters) {
      let self = this;
      self.list = self.listView.$.list;
      await self.forEvent(self.model, 'html-lang-mutation',
        () => { self.model.html.lang = self.listView.listItems[parameters.i][1]; },
        (element, type, event) => true);
    }
    async checkpoint(parameters) {
      if (this.listView.version1) {
        assert.equal(this.list.selection.selected().length, 1, 'Only 1 item is selected');
        assert.equal(this.list.selection.selected()[0], parameters.i, 'Selected item is ' + this.listView.listItems[parameters.i][0]);
      }
      if (this.listView.version2) {
        assert.equal(this.list.selectedItems.length, 1, 'Only 1 item is selected');
        assert.equal(this.list.selectedItems[0][0], this.listView.listItems[parameters.i][0], 'Selected item is ' + this.listView.listItems[parameters.i][0]);
      }
      assert.equal(this.model.html.lang, this.listView.listItems[parameters.i][1], 'Selected locale is ' + this.listView.listItems[parameters.i][1]);
    }
  }
  listview.test = {
    // test class mixins
    '': [],
    // test classes
    SelectListView: {
      ListViewItemsTest: {
        ListViewSelectItemTest: 'ListViewSelectItemTest; Select each item in listview',
        ListViewUnsupportedHtmlLangTest: 'ListViewUnsupportedHtmlLangTest; No change on listview for an unsupprted locale',
        ListViewHtmlLangTest: 'ListViewHtmlLangTest; Corresponding item is selected in listview according to html.lang'
      }
    }
  };
} // panel scope
/*
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  // storageview scope (subscope of panel)
  let scope = 'storageview';
  let storageview = new Suite(scope, 'live-localizer storageview tests');
  storageview.htmlSuite = 'live-localizer';
  storageview.test = Suite.scopes.panel.classes.SelectStorageView;
  storageview.test = (base) => class StorageViewBadgeTapTest extends base {
    async operation() {
      let self = this;
      self.pages = dom(self.panel.$.panelarea).querySelector('iron-pages.panel-selector');
      self.icon = self.storageView.$['locale-icon'];
      self.badge = self.icon.$.badge;
      await self.forEvent(self.pages, 'iron-select', () => { MockInteractions.tap(self.badge); }, (element, type, event) => self.pages.selected === 'listview');
      let count = 0;
      await self.checkInterval(() => count++ === 1, 200, 1); // let listview show all items
    }
    async checkpoint() {
      assert.equal(this.pages.selected, 'listview', 'listview is shown');
    }
  }
  storageview.test = (base) => class StorageViewIconTooltipTest extends base {
    async operation() {
      let self = this;
      self.icon = self.storageView.$['locale-icon'];
      self.tooltip = dom(self.icon.root).querySelector('paper-tooltip[for=card]');
      await self.showTooltip(self.icon.$.card, self.tooltip);
    }
    async checkpoint() {
      assert.equal(this.tooltip.getAttribute('for'), 'card', 'paper-tooltip should be for card');
      assert.equal(this.tooltip.textContent.trim(), 'Drag to Save', 'tooltip should be "Drag to Save"');
    }
  }
  storageview.test = {
    // test class mixins
    '': [],
    // test classes
    SelectStorageView: {
      StorageViewIconTooltipTest: {
        StorageViewBadgeTapTest: 'StorageViewBadgeTapTest; Tap badge in storageview to show listview'
      }
    }
  };
} // panel scope
/*
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  // browserstorage scope (subscope of storageview)
  let scope = 'browserstorage';
  let browserstorage = new Suite(scope, 'live-localizer browserstorage tests');
  browserstorage.htmlSuite = 'live-localizer';
  browserstorage.test = Suite.scopes.storageview.classes.SelectStorageView;
  browserstorage.test = Suite.scopes.panel.classes.SelectIconView;
  browserstorage.test = Suite.scopes.panel.mixins.SelectStorageView;
  browserstorage.test = Suite.scopes.common.mixins.Reload;
  browserstorage.test = (base) => class CleanupBrowserStorageSuite extends base {
    async setup() {
      await super.setup();
      if (this.hasToSkip) { return; }
      await this.cleanup();
    }
    /* async */ cleanup() {
      return new Promise((resolve, reject) => {
        let match = window.location.pathname.match(/^(\/components\/live-localizer\/.*\/)[^\/]*$/);
        if (!match) {
          reject(new Error('Unrecognizable pathname ' + window.location.pathname));
        }
        let databaseName = 'LiveLocalizer' + match[1];
        let req = indexedDB.deleteDatabase(databaseName);
        req.onsuccess = () => resolve();
        req.onerror = (e) => reject(e);
        req.onblocked = (e) => reject(e);
      });
    }
    async operation() {
      let self = this;
      self.localeIcon = self.storageView.$['locale-icon'];
      self.storageIcon = dom(self.browserStorage.root).querySelector('live-localizer-storage-icon');
      self.tooltip = self.browserStorage.$.tooltip;
      self.iconTooltip = dom(self.storageIcon.root).querySelector('paper-tooltip[for=card]');
      self.checkboxes = Array.prototype.reduce.call(dom(self.browserStorage.root).querySelectorAll('paper-checkbox'),
        (acc, curr) => { acc[curr.textContent.trim()] = curr; return acc; }, {});
    }
    async toggleCheckbox(checkbox) {
      let self = this;
      await self.forEvent(self.browserStorage,
        (checkbox.textContent.trim() === 'Load' ? 'browser-storage-autoload-flushed' : 'browser-storage-autosave-flushed'),
        () => { MockInteractions.tap(checkbox); }, (element, type, event) => true);
    }
  }
  browserstorage.test = (base) => class InitializeBrowserStorageTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.checkInterval(() => self.browserStorage.isModelReady, 200, 10); // wait for isModelReady
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.isOk(this.browserStorage.isModelReady, 'browserStorage is initialized');
      assert.equal(this.browserStorage.autoLoad, true, 'autoLoad is true');
      assert.equal(this.browserStorage.autoSave, true, 'autoSave is true');
    }
  }
  browserstorage.test = (base) => class AutoSaveLoadCheckboxTest extends base {
    * iteration() {
      yield *[
        { label: 'Save', expected: { autoSave: false, autoLoad: true } },
        { label: 'Load', expected: { autoSave: false, autoLoad: false } },
        { label: 'Save', expected: { autoSave: true, autoLoad: false } },
        { label: 'Load', expected: { autoSave: true, autoLoad: true } },
        { label: 'Load', expected: { autoSave: true, autoLoad: false } },
        { label: 'Save', expected: { autoSave: false, autoLoad: false } }
      ].map((parameters) => { parameters.name = parameters.label + ' checkbox is toggled'; return parameters });
    }
    async operation(parameters) {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.toggleCheckbox(self.checkboxes[parameters.label]);
    }
    async checkpoint(parameters) {
      if (this.hasToSkip) { return; }
      for (let prop in parameters.expected) {
        assert.equal(this.browserStorage[prop], parameters.expected[prop], prop + ' is ' + parameters.expected[prop]);
      }
    }
  }
  browserstorage.test = (base) => class ConfiguredAutoSaveLoadTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.checkInterval(() => self.browserStorage.isModelReady, 200, 10); // wait for isModelReady
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.isOk(this.browserStorage.isModelReady, 'browserStorage is configured');
      assert.equal(this.browserStorage.autoLoad, false, 'autoLoad is false');
      assert.equal(this.browserStorage.autoSave, false, 'autoSave is false');
    }
  }
  browserstorage.test = (base) => class ConfiguredAutoSaveLoadCheckboxTest extends base {
    * iteration() {
      yield *[
        { label: 'Save', expected: { autoSave: true, autoLoad: false } },
        { label: 'Load', expected: { autoSave: true, autoLoad: true } }
      ].map((parameters) => { parameters.name = parameters.label + ' checkbox is toggled'; return parameters });
    }
    async operation(parameters) {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.toggleCheckbox(self.checkboxes[parameters.label]);
    }
    async checkpoint(parameters) {
      if (this.hasToSkip) { return; }
      for (let prop in parameters.expected) {
        assert.equal(this.browserStorage[prop], parameters.expected[prop], prop + ' is ' + parameters.expected[prop]);
      }
    }
  }
  browserstorage.test = (base) => class BrowserStorageUnselectedIconTooltipTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.showTooltip(self.storageIcon.$.card, self.iconTooltip);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.iconTooltip.getAttribute('for'), 'card', 'paper-tooltip should be for card');
      assert.equal(this.iconTooltip.textContent.trim(), 'Drop to Save', 'tooltip should be "Drop to Save"');
    }
  }
  browserstorage.test = (base) => class BrowserStorageIneffectiveSaveTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.dragDrop(self.localeIcon, self.storageIcon, 80, 0, 'drop', 'drag-and-drop');
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.dragDropEvent.detail.src, this.localeIcon, 'drag source is locale icon');
      assert.equal(this.dragDropEvent.detail.dest, this.storageIcon, 'drag destination is browser storage icon');
      assert.isNotOk(this.storageIcon.selected, 'storage icon is not selected');
    }
  }
  browserstorage.test = (base) => class BrowserStorageIneffectiveSaveTest2 extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.dragDrop(self.localeIcon, self.storageIcon, 200, 0, 'release', 'neon-animation-finish');
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.isNotOk(this.storageIcon.selected, 'storage icon is not selected');
    }
  }
  browserstorage.test = (base) => class SelectLocaleIcon extends base {
    async operation() {
      let self = this;
      let droparea = self.iconView.$.droparea;
      self.icon = dom(self.iconView.root).querySelector('live-localizer-locale-icon#locale-icon-de');
      await self.forEvent(self.model, 'html-lang-mutation', () => { MockInteractions.tap(self.icon); }, (element, type, event) => self.model.html.lang === 'de');
    }
    async checkpoint() {
      assert.equal(this.model.html.lang, 'de', 'html.lang should be "de"');
      assert.isOk(this.icon.selected, 'Selected icon is selected');
    }
  }
  browserstorage.test = (base) => class BrowserStorageSaveTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      self.tooltipMessage = '';
      await self.dragDrop(self.localeIcon, self.storageIcon, 80, 0, 'drop', 'neon-animation-finish', self.tooltip, self.tooltipMessageGetter);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.dragDropEvent.detail.src, this.localeIcon, 'drag source is locale icon');
      assert.equal(this.dragDropEvent.detail.dest, this.storageIcon, 'drag destination is browser storage icon');
      assert.equal(this.tooltipMessage, 'Loaded and then Saved XLIFF for de', 'tooltip is "Loaded and then Saved XLIFF for de"');
    }
  }
  browserstorage.test = (base) => class BrowserStorageSaveTest2 extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      if (self.tooltip.textContent.trim()) {
        await self.forEvent(self.tooltip, 'neon-animation-finish', () => {}, (element, type, event) => {
          return !self.tooltip.textContent.trim();
        });
      }
      self.tooltipMessage = '';
      await self.dragDrop(self.localeIcon, self.storageIcon, 80, 0, 'drop', 'neon-animation-finish', self.tooltip, self.tooltipMessageGetter);
      await self.checkInterval(() => self.dragDropEvent, 100, 20);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.dragDropEvent.detail.src, this.localeIcon, 'drag source is locale icon');
      assert.equal(this.dragDropEvent.detail.dest, this.storageIcon, 'drag destination is browser storage icon');
      assert.equal(this.tooltipMessage, 'Saved XLIFF for de', 'tooltip is "Saved XLIFF for de"');
    }
  }
  browserstorage.test = (base) => class BrowserStorageSelectedIconTooltipTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.showTooltip(self.storageIcon.$.card, self.iconTooltip);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.iconTooltip.getAttribute('for'), 'card', 'paper-tooltip should be for card');
      assert.equal(this.iconTooltip.textContent.trim(), 'Drag to Load', 'tooltip should be "Drag to Load"');
    }
  }
  browserstorage.test = (base) => class DisableAutoSaveCheckbox extends base {
    * iteration() {
      yield *[
        { label: 'Save', expected: { autoSave: false, autoLoad: true } }
      ].map((parameters) => { parameters.name = parameters.label + ' checkbox is toggled'; return parameters });
    }
    async operation(parameters) {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.toggleCheckbox(self.checkboxes[parameters.label]);
    }
    async checkpoint(parameters) {
      if (this.hasToSkip) { return; }
      for (let prop in parameters.expected) {
        assert.equal(this.browserStorage[prop], parameters.expected[prop], prop + ' is ' + parameters.expected[prop]);
      }
    }
  }
  browserstorage.test = (base) => class DisableAutoLoadCheckbox extends base {
    * iteration() {
      yield *[
        { label: 'Load', expected: { autoSave: false, autoLoad: false } }
      ].map((parameters) => { parameters.name = parameters.label + ' checkbox is toggled'; return parameters });
    }
    async operation(parameters) {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.toggleCheckbox(self.checkboxes[parameters.label]);
    }
    async checkpoint(parameters) {
      if (this.hasToSkip) { return; }
      for (let prop in parameters.expected) {
        assert.equal(this.browserStorage[prop], parameters.expected[prop], prop + ' is ' + parameters.expected[prop]);
      }
    }
  }
  browserstorage.test = (base) => class BrowserStorageLoadTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      self.tooltipMessage = '';
      await self.dragDrop(self.storageIcon, self.localeIcon, -80, 0, 'drop', 'neon-animation-finish', self.tooltip, (element, type, event) => {
        let message = self.tooltip.textContent.trim();
        if (self.tooltipMessage) {
          return !message;
        }
        else {
          self.tooltipMessage = message;
          return false;
        }
      });
      await self.checkInterval(() => self.dragDropEvent, 100, 20);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.dragDropEvent.detail.src, this.storageIcon, 'drag source is browser storage icon');
      assert.equal(this.dragDropEvent.detail.dest, this.localeIcon, 'drag destination is locale icon');
      assert.equal(this.tooltipMessage, 'Loaded XLIFF for de', 'tooltip is "Loaded XLIFF for de"');
    }
  }
  browserstorage.test = (base) => class BrowserStorageUnselectedDragTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      MockInteractions.tap(self.storageIcon);
      await self.dragDrop(self.storageIcon, self.localeIcon, -80, 0, 'noop');
      let count = 10;
      await self.checkInterval(() => count++ >= 10, 100, 20);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.isNotOk(this.dragDropEvent, 'no drag and drop event');
    }
  }
  browserstorage.test = {
    // test class mixins
    '': [],
    // test classes
    SelectStorageView: {
      CleanupBrowserStorageSuite: {
        InitializeBrowserStorageTest: {
          AutoSaveLoadCheckboxTest: {
            Reload: {
              ConfiguredAutoSaveLoadTest: {
                ConfiguredAutoSaveLoadCheckboxTest: 'ConfiguredAutoSaveLoadCheckboxTest_phase_1; Toggle configured Auto Save/Load checkboxes (2 phases)'
              }
            }
          },
          BrowserStorageUnselectedIconTooltipTest: 'BrowserStorageUnselectedIconTooltipTest; Tooltip for unselected browser storage icon is "Drop to Save"',
          BrowserStorageIneffectiveSaveTest: 'BrowserStorageIneffectiveSaveTest; Saving default locale is ineffective'
        }
      }
    },
    SelectIconView: {
      CleanupBrowserStorageSuite: {
        InitializeBrowserStorageTest: {
          SelectLocaleIcon: {
            SelectStorageView: {
              BrowserStorageUnselectedIconTooltipTest: {
                BrowserStorageUnselectedDragTest: {
                  BrowserStorageIneffectiveSaveTest2: {
                    BrowserStorageSaveTest: {
                      Reload: {
                        BrowserStorageSelectedIconTooltipTest: {
                          DisableAutoSaveCheckbox: {
                            Reload: {
                              DisableAutoLoadCheckbox: {
                                BrowserStorageSaveTest2: {
                                  Reload: {
                                    BrowserStorageLoadTest: 'BrowserStorageLoadTest_phase_3; Save to browser storage, Reload, and Load from browser storage'
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
} // browserstorage scope
/*
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  // firebasestorage scope (subscope of storageview)
  let scope = 'firebasestorage';
  let firebasestorage = new Suite(scope, 'live-localizer firebasestorage tests');
  firebasestorage.htmlSuite = 'live-localizer-firebase';
  firebasestorage.test = Suite.scopes.storageview.classes.SelectStorageView;
  firebasestorage.test = Suite.scopes.panel.classes.SelectIconView;
  firebasestorage.test = Suite.scopes.panel.mixins.SelectStorageView;
  firebasestorage.test = Suite.scopes.browserstorage.mixins.SelectLocaleIcon;
  firebasestorage.test = Suite.scopes.common.mixins.Reload;
  firebasestorage.test = (base) => class CleanupFirebaseAuthSuite extends base {
    static get reconnectable() { return false; }
    async setup() {
      await super.setup();
      if (this.hasToSkip) { return; }
      this.cleanup();
    }
    cleanup() {
      for (let key in localStorage) {
        if (key.match(/^firebase:/)) {
          localStorage.removeItem(key);
        }
      }
    }
    async operation() {
      let self = this;
      self.localeIcon = self.storageView.$['locale-icon'];
      self.storageIcon = dom(self.firebaseStorage.root).querySelector('live-localizer-storage-icon');
      self.iconTooltip = dom(self.storageIcon.root).querySelector('paper-tooltip[for=card]');
      self.tooltip = self.firebaseStorage.$.tooltip;
      self.checkboxes = Array.prototype.reduce.call(dom(self.firebaseStorage.root).querySelectorAll('paper-checkbox'),
        (acc, curr) => { acc[curr.textContent.trim()] = curr; return acc; }, {});
    }
    async toggleCheckbox(checkbox) {
      let self = this;
      let flushEvent = {
        'Load': 'firebase-storage-settings-flushed',
        'Save': 'firebase-storage-settings-flushed',
        'Sign in anonymously': ''
      }[checkbox.textContent.trim()];
      if (flushEvent) {
        await self.forEvent(self.firebaseStorage, flushEvent,
          () => { MockInteractions.tap(checkbox); }, (element, type, event) => true);
      }
      else {
        MockInteractions.tap(checkbox);
      }
      let count = 1;
      await self.checkInterval(() => count-- > 0, 200, 1); // wait for CSS animation (140ms) to finish
    }
  }
  firebasestorage.test = (base) => class InitializeFirebaseStorageTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.checkInterval(() => self.firebaseStorage.isModelReady, 200, 10); // wait for isModelReady
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.isOk(this.firebaseStorage.isModelReady, 'firebaseStorage is initialized');
      assert.equal(this.firebaseStorage.autoLoad, false, 'autoLoad is false');
      assert.equal(this.firebaseStorage.autoSave, true, 'autoSave is true');
    }
  }
  firebasestorage.test = (base) => class CheckboxTest extends base {
    * iteration() {
      yield *[
        // Initial state: { autoSave: true, autoLoad: false, anonymous: true }
        { label: 'Sign in anonymously', expected: { autoSave: true, autoLoad: false, anonymous: false } },
        { label: 'Save', expected: { autoSave: false, autoLoad: false, anonymous: false } },
        { label: 'Load', expected: { autoSave: false, autoLoad: true, anonymous: false } },
        { label: 'Save', expected: { autoSave: true, autoLoad: true, anonymous: false } },
        { label: 'Sign in anonymously', expected: { autoSave: true, autoLoad: true, anonymous: true } },
        { label: 'Load', expected: { autoSave: true, autoLoad: false, anonymous: true } },
        { label: 'Load', expected: { autoSave: true, autoLoad: true, anonymous: true } },
        { label: 'Save', expected: { autoSave: false, autoLoad: true, anonymous: true } }
      ].map((parameters) => { parameters.name = parameters.label + ' checkbox is toggled'; return parameters });
    }
    async operation(parameters) {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.toggleCheckbox(self.checkboxes[parameters.label]);
    }
    async checkpoint(parameters) {
      if (this.hasToSkip) { return; }
      for (let prop in parameters.expected) {
        assert.equal(this.firebaseStorage[prop], parameters.expected[prop], prop + ' is ' + parameters.expected[prop]);
      }
    }
  }
  firebasestorage.test = (base) => class DisableAutoSaveCheckbox extends base {
    * iteration() {
      yield *[
        { label: 'Save', expected: { autoSave: false, autoLoad: false } }
      ].map((parameters) => { parameters.name = parameters.label + ' checkbox is toggled'; return parameters });
    }
    async operation(parameters) {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.toggleCheckbox(self.checkboxes[parameters.label]);
    }
    async checkpoint(parameters) {
      if (this.hasToSkip) { return; }
      for (let prop in parameters.expected) {
        assert.equal(this.firebaseStorage[prop], parameters.expected[prop], prop + ' is ' + parameters.expected[prop]);
      }
    }
  }
  firebasestorage.test = (base) => class EnableAutoLoadCheckbox extends base {
    * iteration() {
      yield *[
        { label: 'Load', expected: { autoSave: false, autoLoad: true } }
      ].map((parameters) => { parameters.name = parameters.label + ' checkbox is toggled'; return parameters });
    }
    async operation(parameters) {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.toggleCheckbox(self.checkboxes[parameters.label]);
    }
    async checkpoint(parameters) {
      if (this.hasToSkip) { return; }
      for (let prop in parameters.expected) {
        assert.equal(this.firebaseStorage[prop], parameters.expected[prop], prop + ' is ' + parameters.expected[prop]);
      }
    }
  }
  firebasestorage.test = (base) => class DisableAnonymousCheckbox extends base {
    * iteration() {
      yield *[
        { label: 'Sign in anonymously', expected: { autoSave: true, autoLoad: false, anonymous: false } },
      ].map((parameters) => { parameters.name = parameters.label + ' checkbox is toggled'; return parameters });
    }
    async operation(parameters) {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.toggleCheckbox(self.checkboxes[parameters.label]);
    }
    async checkpoint(parameters) {
      if (this.hasToSkip) { return; }
      for (let prop in parameters.expected) {
        assert.equal(this.firebaseStorage[prop], parameters.expected[prop], prop + ' is ' + parameters.expected[prop]);
      }
    }
  }
  firebasestorage.test = (base) => class SignInAnonymously extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      MockInteractions.tap(self.firebaseStorage.$['firebase-storage-icon']);
      await self.checkInterval(() => self.firebaseStorage.signedIn, 200, 120);
      await self.checkInterval(() => self.firebaseStorage.isSettingsInitialized, 200, 120);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.isOk(this.firebaseStorage.signedIn, 'Signed in');
      assert.isOk(this.firebaseStorage.user, 'user is configured');
      assert.isOk(this.firebaseStorage.user.isAnonymous, 'user is anonymous');
      assert.isOk(this.firebaseStorage.isSettingsInitialized, 'settings is initialized');
    }
  }
  firebasestorage.test = (base) => class ShowAuthErrorTooltip extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      if (HTMLImports.useNative) {
        self.firebaseStorage.$.auth.fire('error', { code: '12345', message: 'error message body' });
      }
      else { // Firefox throws an error on polyfilled dispatchEvent. Resort to call the event handler directly.
        self.firebaseStorage.showError({ type: 'error', detail: { code: '12345', message: 'error message body' }});
      }
      await self.forEvent(self.tooltip, 'neon-animation-finish', () => {}, (element, type, event) => {
        return self.errorTooltipMessage = self.tooltip.textContent.trim();
      });
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.errorTooltipMessage, 'Error: 12345 error message body', 'error tooltip is "Error: 12345 error message body"');
    }
  }
  firebasestorage.test = (base) => class EmptyAuthErrorTooltip extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      if (HTMLImports.useNative) {
        self.firebaseStorage.$.auth.fire('error', { code: '', message: 'error message body' });
      }
      else { // Firefox throws an error on polyfilled dispatchEvent. Resort to call the event handler directly.
        self.firebaseStorage.showError({ type: 'error', detail: { code: '', message: 'error message body' }});
      }
      await self.checkInterval(() => !self.firebaseStorage.tooltip, 200, 100);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.firebaseStorage.tooltip, '', 'error tooltip is empty');
    }
  }
  firebasestorage.test = (base) => class SignOutAnonymousUser extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      let count = 20;
      await self.checkInterval(() => count-- === 0, 100, 20);
      MockInteractions.tap(self.firebaseStorage.$['firebase-storage-icon']);
      await self.checkInterval(() => !self.firebaseStorage.signedIn, 200, 120);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.isNotOk(this.firebaseStorage.signedIn, 'Signed out');
    }
  }
  firebasestorage.test = (base) => class ConfiguredAutoSaveLoadTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.checkInterval(() => self.firebaseStorage.isSettingsInitialized, 200, 50); // wait for settings
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.isOk(this.firebaseStorage.isModelReady, 'firebaseStorage is configured');
      assert.isOk(this.firebaseStorage.signedIn, 'firebaseStorage is configured');
      assert.isOk(this.firebaseStorage.user, 'user signed in');
      assert.isOk(this.firebaseStorage.user.isAnonymous, 'user is anonymous');
      assert.isOk(this.firebaseStorage.isSettingsInitialized, 'settings is initialized');
      assert.equal(this.firebaseStorage.autoLoad, true, 'autoLoad is true');
      assert.equal(this.firebaseStorage.autoSave, false, 'autoSave is false');
    }
  }
  firebasestorage.test = (base) => class ConfiguredAutoSaveLoadCheckboxTest extends base {
    * iteration() {
      yield *[
        { label: 'Save', expected: { autoSave: true, autoLoad: true } },
        { label: 'Load', expected: { autoSave: true, autoLoad: false } }
      ].map((parameters) => { parameters.name = parameters.label + ' checkbox is toggled'; return parameters });
    }
    async operation(parameters) {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.toggleCheckbox(self.checkboxes[parameters.label]);
    }
    async checkpoint(parameters) {
      if (this.hasToSkip) { return; }
      for (let prop in parameters.expected) {
        assert.equal(this.firebaseStorage[prop], parameters.expected[prop], prop + ' is ' + parameters.expected[prop]);
      }
    }
  }
  firebasestorage.test = (base) => class FirebaseStorageSignedOutAnonymousIconTooltipTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.showTooltip(self.storageIcon.$.card, self.iconTooltip);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.iconTooltip.getAttribute('for'), 'card', 'paper-tooltip should be for card');
      assert.equal(this.iconTooltip.textContent.trim(), 'Sign in anonymously', 'tooltip should be "Sign in anonymously"');
    }
  }
  firebasestorage.test = (base) => class FirebaseStorageSignedInAnonymousIconTooltipTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.showTooltip(self.storageIcon.$.card, self.iconTooltip);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.iconTooltip.getAttribute('for'), 'card', 'paper-tooltip should be for card');
      assert.equal(this.iconTooltip.textContent.trim(), 'Click to Sign out', 'tooltip should be "Click to Sign out"');
    }
  }
  firebasestorage.test = (base) => class FirebaseStorageSignedInAnonymousUserTooltipTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      self.userTooltip = self.firebaseStorage.$.usertooltip;
      await self.showTooltip(self.firebaseStorage.$.user, self.userTooltip);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.userTooltip.getAttribute('for'), 'user', 'paper-tooltip should be for user');
      assert.equal(this.userTooltip.textContent.trim(), 'Storage will be lost on sign out', 'tooltip should be "Storage will be lost on sign out"');
    }
  }
  firebasestorage.test = (base) => class FirebaseStorageIneffectiveSaveTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.dragDrop(self.localeIcon, self.storageIcon, 0, -120, 'drop', 'drag-and-drop');
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.dragDropEvent.detail.src, this.localeIcon, 'drag source is locale icon');
      assert.equal(this.dragDropEvent.detail.dest, this.storageIcon, 'drag destination is firebase storage icon');
      assert.isNotOk(this.storageIcon.selected, 'storage icon is not selected');
    }
  }
  firebasestorage.test = (base) => class FirebaseStorageDefaultLangIneffectiveSaveTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.dragDrop(self.localeIcon, self.storageIcon, 0, -120, 'drop', 'drag-and-drop');
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.dragDropEvent.detail.src, this.localeIcon, 'drag source is locale icon');
      assert.equal(this.dragDropEvent.detail.dest, this.storageIcon, 'drag destination is firebase storage icon');
      assert.isOk(this.storageIcon.selected, 'storage icon is selected');
      assert.equal(this.firebaseStorage.$.tooltip.textContent.trim(), '', 'tooltip should be empty');
    }
  }
  firebasestorage.test = (base) => class FirebaseStorageSignedOutDragTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.dragDrop(self.storageIcon, self.localeIcon, 0, 120, 'noop');
      let count = 10;
      await self.checkInterval(() => count++ >= 10, 100, 20);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.isNotOk(this.dragDropEvent, 'no drag and drop event');
    }
  }
  firebasestorage.test = (base) => class FirebaseStorageIneffectiveSaveTest2 extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.dragDrop(self.localeIcon, self.storageIcon, 150, -150, 'release', 'neon-animation-finish');
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.isNotOk(this.storageIcon.selected, 'storage icon is not selected');
    }
  }
  firebasestorage.test = (base) => class FirebaseStorageSaveTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      self.tooltipMessage = '';
      await self.dragDrop(self.localeIcon, self.storageIcon, 0, -120, 'drop', 'neon-animation-finish', self.tooltip, self.tooltipMessageGetter);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.dragDropEvent.detail.src, this.localeIcon, 'drag source is locale icon');
      assert.equal(this.dragDropEvent.detail.dest, this.storageIcon, 'drag destination is firebase storage icon');
      assert.equal(this.tooltipMessage, 'Saved XLIFF for de', 'tooltip is "Saved XLIFF for de"');
    }
  }
  firebasestorage.test = (base) => class FirebaseStorageSelectedIconTooltipTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.checkInterval(() => self.firebaseStorage.isSettingsInitialized, 200, 100);
      await self.checkInterval(() => self.storageIcon.label === 'bundle.de.xlf', 200, 100);
      await self.showTooltip(self.storageIcon.$.card, self.iconTooltip);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.iconTooltip.getAttribute('for'), 'card', 'paper-tooltip should be for card');
      assert.equal(this.iconTooltip.textContent.trim(), 'Drag to Load Click to Sign out', 'tooltip should be "Drag to Load Click to Sign out"');
    }
  }
  firebasestorage.test = (base) => class FirebaseStorageInit extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.checkInterval(() => self.firebaseStorage.isSettingsInitialized, 200, 1500);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.isOk(this.firebaseStorage.isSettingsInitialized, 'settings is initialized');
    }
  }
  firebasestorage.test = (base) => class FirebaseStorageLoadTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.checkInterval(() => { console.log(self.firebaseStorage.label); return self.firebaseStorage.label === 'bundle.de.xlf'; }, 200, 200);
      self.tooltipMessage = '';
      await self.dragDrop(self.storageIcon, self.localeIcon, 0, 120, 'drop', 'neon-animation-finish', self.tooltip, (element, type, event) => {
        let message = self.tooltip.textContent.trim();
        if (self.tooltipMessage) {
          return !message;
        }
        else {
          self.tooltipMessage = message;
          return false;
        }
      });
      await self.checkInterval(() => { console.log(self.dragDropEvent); return self.dragDropEvent }, 200, 150);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.dragDropEvent.detail.src, this.storageIcon, 'drag source is firebase storage icon');
      assert.equal(this.dragDropEvent.detail.dest, this.localeIcon, 'drag destination is locale icon');
      assert.equal(this.tooltipMessage, 'Loaded XLIFF for de', 'tooltip is "Loaded XLIFF for de"');
    }
  }
  firebasestorage.test = (base) => class MockSignInTest extends base {
    static get reconnectable() { return false; }
    * iteration() {
      yield *[
        {
          authProvider: 'google',
          expected: {
            iconTooltip: 'Sign in with Google',
            userLabel: 'mockuser@gmail.com',
            userTooltip: 'Signed in with Google',
            userIcon: 'favicon_google:google'
          }
        },
        {
          authProvider: 'twitter',
          expected: {
            iconTooltip: 'Sign in with Twitter',
            userLabel: '@mockuser',
            userTooltip: 'Signed in with Twitter',
            userIcon: 'twitter_icon:twitter'
          }
        },
        {
          authProvider: 'github',
          expected: {
            iconTooltip: 'Sign in with GitHub',
            userLabel: 'mockuser@gmail.com',
            userTooltip: 'Signed in with GitHub',
            userIcon: 'github_icon:github'
          }
        },
        {
          authProvider: 'facebook',
          expected: {
            iconTooltip: 'Sign in with Facebook',
            userLabel: 'mockuser@gmail.com',
            userTooltip: 'Signed in with Facebook',
            userIcon: 'account_avatar:profile'
          }
        }
      ].map((parameters) => { parameters.name = 'Sign in with ' + parameters.authProvider; return parameters });
    }
    async operation(parameters) {
      let self = this;
      self.mockStorage = self.firebaseStorage;
      self.mockAuth = self.mockStorage.$.auth;
      self.mockAuth.signInWithPopup = async function (authProvider) {
        await self.mockAuth.signInAnonymously();
        await self.checkInterval(() => self.mockStorage.isSettingsInitialized, 200, 100);
        let user = {
          email: 'mockuser@gmail.com',
          displayName: 'mockuser',
          isAnonymous: false
        };
        for (let prop in self.mockStorage.user) {
          switch (prop) {
          case 'email':
          case 'displayName':
          case 'isAnonymous':
            break;
          default:
            user[prop] = self.mockStorage.user[prop];
            break;
          }
        }
        self.mockStorage._user = self.mockStorage.user;
        self.mockStorage.user = user;
        self.mockStorage.anonymous = false;
        self.setMockUser = true;
      }
      self.setMockUser = false;
      self.mockStorage.anonymous = false;
      self.mockStorage.authProvider = parameters.authProvider;
      await self.showTooltip(self.storageIcon.$.card, self.iconTooltip);
      self.iconTooltipMessage = self.iconTooltip.textContent.trim();
      MockInteractions.tap(self.storageIcon);
      await self.checkInterval(() => self.mockStorage.isSettingsInitialized, 200, 100);
      await self.checkInterval(() => self.mockStorage.signedIn, 200, 100);
      await self.checkInterval(() => self.setMockUser, 200, 100);
      self.userLabel = self.mockStorage.$.user.textContent.trim();
      self.userIcon = dom(self.mockStorage.$.user).querySelector('iron-icon').icon;
      await self.showTooltip(self.mockStorage.$.user, self.mockStorage.$.usertooltip);
      self.userTooltipMessage = self.mockStorage.$.usertooltip.textContent.trim();
      await self.forEvent(self.mockStorage.$.usertooltip, 'neon-animation-finish', () => {}, (element, type, event) => true);
      self.mockStorage.user = self.mockStorage._user;
      let count = 20;
      await self.checkInterval(() => count-- === 0, 100, 20);
      MockInteractions.tap(self.storageIcon);
      await self.checkInterval(() => !self.mockStorage.signedIn, 200, 100);
    }
    async checkpoint(parameters) {
      if (this.hasToSkip) { return; }
      assert.equal(this.iconTooltipMessage, parameters.expected.iconTooltip, 'tooltip should be "' + parameters.expected.iconTooltip + '"');
      assert.equal(this.userLabel, parameters.expected.userLabel, 'user label should be "' + parameters.expected.userLabel + '"');
      assert.equal(this.userTooltipMessage, parameters.expected.userTooltip, 'user tooltip should be "' + parameters.expected.userTooltip + '"');
      assert.equal(this.userIcon, parameters.expected.userIcon, 'user icon should be "' + parameters.expected.userIcon + '"');
    }
  }
  firebasestorage.test = {
    // test class mixins
    '': [],
    // test classes
    SelectIconView: {
      CleanupFirebaseAuthSuite: {
        InitializeFirebaseStorageTest: {
          SelectLocaleIcon: {
            SelectStorageView: {
              FirebaseStorageSignedOutDragTest: {
                FirebaseStorageIneffectiveSaveTest2: {
                  SignInAnonymously: {
                    FirebaseStorageSaveTest: {
                      Reload: {
                        FirebaseStorageSelectedIconTooltipTest: {
                          DisableAutoSaveCheckbox: {
                            EnableAutoLoadCheckbox: {
                              Reload: {
                                FirebaseStorageInit: {
                                  FirebaseStorageLoadTest: {
                                    SignOutAnonymousUser: 'SaveReloadLoadTest_phase_2; Sign in anonymously, Save, Reload, Load, Sign out'
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    SelectStorageView: {
      CleanupFirebaseAuthSuite: {
        InitializeFirebaseStorageTest: {
          CheckboxTest: {
            SignInAnonymously: {
              Reload: {
                ConfiguredAutoSaveLoadTest: {
                  FirebaseStorageSignedInAnonymousIconTooltipTest: {
                    FirebaseStorageSignedInAnonymousUserTooltipTest: {
                      FirebaseStorageDefaultLangIneffectiveSaveTest: {
                        ConfiguredAutoSaveLoadCheckboxTest: {
                          SignOutAnonymousUser: 'ConfiguredAutoSaveLoadCheckboxTest_phase_1; Sign in anonymously, Reload, Toggle checkboxes, Sign out'
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          FirebaseStorageSignedOutAnonymousIconTooltipTest: 'SignedOutAnonymousIconTooltipTest',
          FirebaseStorageIneffectiveSaveTest: 'IneffectiveSaveTest',
          DisableAnonymousCheckbox: {
            MockSignInTest: 'SignInWithMockAuthProviderTest; Sign in with auth providers (Mock)'
          },
          ShowAuthErrorTooltip: 'ShowAuthErrorTooltipTest; Show auth error tooltip message (Mock)',
          EmptyAuthErrorTooltip: 'EmptyAuthErrorTooltipTest; Empty auth error tooltip message (Mock)'
        }
      }
    }
  };
} // firebasestorage scope
/*
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  // filestorage scope (subscope of storageview)
  let scope = 'filestorage';
  let filestorage = new Suite(scope, 'live-localizer local file storage tests');
  filestorage.htmlSuite = 'live-localizer';
  filestorage.test = Suite.scopes.storageview.classes.SelectStorageView;
  filestorage.test = Suite.scopes.panel.classes.SelectIconView;
  filestorage.test = Suite.scopes.panel.mixins.SelectStorageView;
  filestorage.test = Suite.scopes.browserstorage.mixins.SelectLocaleIcon;
  filestorage.test = Suite.scopes.common.mixins.Reload;
  filestorage.test = (base) => class FileStorageSuite extends base {
    async setup() {
      await super.setup();
      if (this.hasToSkip) { return; }
    }
    async operation() {
      let self = this;
      self.localeIcon = self.storageView.$['locale-icon'];
      self.storageIcon = dom(self.fileStorage.root).querySelector('live-localizer-storage-icon');
      self.iconTooltip = dom(self.storageIcon.root).querySelector('paper-tooltip[for=card]');
      self.tooltip = self.fileStorage.$.tooltip;
      self.checkboxes = Array.prototype.reduce.call(dom(self.fileStorage.root).querySelectorAll('paper-checkbox'),
        (acc, curr) => { acc[curr.textContent.trim()] = curr; return acc; }, {});
    }
    async toggleCheckbox(checkbox) {
      let self = this;
      let checkedProperty = {
        'Save with Timestamp': 'prefix',
        'Watch and Load XLIFF': 'watcherEnabled'
      }[checkbox.textContent.trim()];
      let prevChecked = self.fileStorage[checkedProperty];
      await self.forEvent(checkbox, 'checked-changed', () => { MockInteractions.tap(checkbox); }, (element, type, event) => !!prevChecked === !self.fileStorage[checkedProperty]);
      let count = 1;
      await self.checkInterval(() => count-- > 0, 200, 1); // wait for CSS animation (140ms) to finish
    }
  }
  filestorage.test = (base) => class CheckboxTest extends base {
    * iteration() {
      yield *[
        // Initial state: { prefix: false, watcherEnabled: false }
        { label: 'Save with Timestamp', expected: { prefix: true, watcherEnabled: false } },
        { label: 'Watch and Load XLIFF', expected: { prefix: true, watcherEnabled: true } },
        { label: 'Save with Timestamp', expected: { prefix: false, watcherEnabled: true } },
        { label: 'Watch and Load XLIFF', expected: { prefix: false, watcherEnabled: false } }
      ].map((parameters) => { parameters.name = parameters.label + ' checkbox is toggled'; return parameters });
    }
    async operation(parameters) {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.toggleCheckbox(self.checkboxes[parameters.label]);
    }
    async checkpoint(parameters) {
      if (this.hasToSkip) { return; }
      for (let prop in parameters.expected) {
        assert.equal(this.fileStorage[prop], parameters.expected[prop], prop + ' is ' + parameters.expected[prop]);
      }
    }
  }
  filestorage.test = (base) => class EnableTimestampPrefix extends base {
    * iteration() {
      yield *[
        // Initial state: { prefix: false, watcherEnabled: false }
        { label: 'Save with Timestamp', expected: { prefix: true, watcherEnabled: false } }
      ].map((parameters) => { parameters.name = parameters.label + ' checkbox is toggled'; return parameters });
    }
    async operation(parameters) {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.toggleCheckbox(self.checkboxes[parameters.label]);
    }
    async checkpoint(parameters) {
      if (this.hasToSkip) { return; }
      for (let prop in parameters.expected) {
        assert.equal(this.fileStorage[prop], parameters.expected[prop], prop + ' is ' + parameters.expected[prop]);
      }
    }
  }
  filestorage.test = (base) => class EnableWatcherCheckbox extends base {
    * iteration() {
      yield *[
        // Initial state: { prefix: false, watcherEnabled: false }
        { label: 'Watch and Load XLIFF', expected: { prefix: false, watcherEnabled: true } }
      ].map((parameters) => { parameters.name = parameters.label + ' checkbox is toggled'; return parameters });
    }
    async operation(parameters) {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.toggleCheckbox(self.checkboxes[parameters.label]);
    }
    async checkpoint(parameters) {
      if (this.hasToSkip) { return; }
      for (let prop in parameters.expected) {
        assert.equal(this.fileStorage[prop], parameters.expected[prop], prop + ' is ' + parameters.expected[prop]);
      }
    }
  }
  filestorage.test = (base) => class DisableWatcherCheckbox extends base {
    * iteration() {
      yield *[
        // Initial state: { prefix: false, watcherEnabled: true }
        { label: 'Watch and Load XLIFF', expected: { prefix: false, watcherEnabled: false } }
      ].map((parameters) => { parameters.name = parameters.label + ' checkbox is toggled'; return parameters });
    }
    async operation(parameters) {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.toggleCheckbox(self.checkboxes[parameters.label]);
      await self.checkInterval(() => !self.fileStorage.watching, 200, 100);
    }
    async checkpoint(parameters) {
      if (this.hasToSkip) { return; }
      for (let prop in parameters.expected) {
        assert.equal(this.fileStorage[prop], parameters.expected[prop], prop + ' is ' + parameters.expected[prop]);
      }
    }
  }
  filestorage.test = (base) => class FileStorageUnselectedIconTooltipTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.showTooltip(self.storageIcon.$.card, self.iconTooltip);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.iconTooltip.getAttribute('for'), 'card', 'paper-tooltip should be for card');
      assert.equal(this.iconTooltip.textContent.trim(), 'Select XLIFF', 'tooltip should be "Select XLIFF"');
    }
  }
  filestorage.test = (base) => class FileStorageSelectedIconTooltipTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.showTooltip(self.storageIcon.$.card, self.iconTooltip);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.iconTooltip.getAttribute('for'), 'card', 'paper-tooltip should be for card');
      assert.equal(this.iconTooltip.textContent.trim(), 'Drag to Load', 'tooltip should be "Drag to Load"');
    }
  }
  filestorage.test = (base) => class MockFileStorageSaveTest extends base {
    static get reconnectable() { return false; }
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      self.mockAnchor = self.fileStorage.$.anchor;
      self.mockAnchor.click = function () {
        self.downloadFileName = self.mockAnchor.download;
        self.downloadBlobUrl = self.mockAnchor.href;
        self.anchorClicked = true;
      }
      self.anchorClicked = false;
      await self.dragDrop(self.localeIcon, self.storageIcon, 0, 120, 'drop', 'neon-animation-finish', self.localeIcon, (element, type, event) => true);
      await self.checkInterval(() => self.anchorClicked, 200, 100);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.dragDropEvent.detail.src, this.localeIcon, 'drag source is locale icon');
      assert.equal(this.dragDropEvent.detail.dest, this.storageIcon, 'drag destination is local file storage icon');
      assert.equal(this.downloadFileName, 'bundle.de.xlf', 'download file name is "bundle.de.xlf"');
      assert.isOk(this.downloadBlobUrl, 'download blob url is set');
      assert.isOk(this.downloadBlobUrl.match(/^blob:http/), 'download blob url is set');
    }
  }
  filestorage.test = (base) => class MockFileStorageSaveTest2 extends base {
    static get reconnectable() { return false; }
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      self.mockAnchor = self.fileStorage.$.anchor;
      self.mockAnchor.click = function () {
        self.downloadFileName = self.mockAnchor.download;
        self.downloadBlobUrl = self.mockAnchor.href;
        self.anchorClicked = true;
      }
      self.anchorClicked = false;
      await self.dragDrop(self.localeIcon, self.storageIcon, 0, 120, 'drop', 'neon-animation-finish', self.localeIcon, (element, type, event) => true);
      await self.checkInterval(() => self.anchorClicked, 200, 100);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.dragDropEvent.detail.src, this.localeIcon, 'drag source is locale icon');
      assert.equal(this.dragDropEvent.detail.dest, this.storageIcon, 'drag destination is local file storage icon');
      assert.isOk(this.downloadFileName.match(/^[0-9]*-bundle.de.xlf$/), 'download file name is prefixed "[0-9]*-bundle.de.xlf"');
      assert.isOk(this.downloadBlobUrl, 'download blob url is set');
      assert.isOk(this.downloadBlobUrl.match(/^blob:http/), 'download blob url is set');
    }
  }
  filestorage.test = (base) => class FileStorageLoadTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.checkInterval(() => { console.log(self.fileStorage.label); return self.fileStorage.label === 'bundle.de.xlf'; }, 200, 200);
      self.loadEvent = undefined;
      await self.dragDrop(self.storageIcon, self.localeIcon, 0, 120, 'drop', 'load-xliff', self.model, (element, type, event) => {
        self.loadEvent = event; return true;
      });
      await self.checkInterval(() => { console.log(self.dragDropEvent); return self.dragDropEvent }, 200, 150);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.dragDropEvent.detail.src, this.storageIcon, 'drag source is file storage icon');
      assert.equal(this.dragDropEvent.detail.dest, this.localeIcon, 'drag destination is locale icon');
      assert.equal(this.loadEvent.type, 'load-xliff', 'load-xliff event is fired');
      assert.equal(this.loadEvent.detail.locale, 'de', 'load-xliff locale is de');
      assert.equal(this.fileStorage.label, 'Local File', 'file storage icon label is "Local File"');
    }
  }
  filestorage.test = (base) => class FileStorageLoadTest2 extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.checkInterval(() => { console.log(self.fileStorage.label); return !!self.fileStorage.label.match(/^[0-9]*-bundle.de.xlf$/); }, 200, 200);
      self.loadEvent = undefined;
      await self.dragDrop(self.storageIcon, self.localeIcon, 0, 120, 'drop', 'load-xliff', self.model, (element, type, event) => {
        self.loadEvent = event; return true;
      });
      await self.checkInterval(() => { console.log(self.dragDropEvent); return self.dragDropEvent }, 200, 150);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.dragDropEvent.detail.src, this.storageIcon, 'drag source is file storage icon');
      assert.equal(this.dragDropEvent.detail.dest, this.localeIcon, 'drag destination is locale icon');
      assert.equal(this.loadEvent.type, 'load-xliff', 'load-xliff event is fired');
      assert.equal(this.loadEvent.detail.locale, 'de', 'load-xliff locale is de');
      assert.equal(this.fileStorage.label, 'Local File', 'file storage icon label is "Local File"');
    }
  }
  filestorage.test = (base) => class MockFileStorageUploadTest extends base {
    static get reconnectable() { return false; }
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      self.mockFileLoader = self.fileStorage.$.fileLoad;
      self.mockFileLoader.click = function () {
        self.fileLoaderClicked = true;
      }
      self.fileLoaderClicked = false;
      MockInteractions.tap(self.storageIcon);
      await self.checkInterval(() => self.fileLoaderClicked, 200, 100);
      let mockXliffName = 'bundle.de.xlf';
      self._xhr = new XMLHttpRequest();
      await new Promise((resolve, reject) => {
        let onLoad = function (e) {
          self.mockXliff = self._xhr.responseText;
          self._xhr.removeEventListener('load', onLoad);
          self._xhr.removeEventListener('error', onLoad);
          resolve(self.mockXliff);
        }
        let onError = function (e) {
          self.mockXliff = '';
          self._xhr.removeEventListener('load', onLoad);
          self._xhr.removeEventListener('error', onLoad);
          reject(e);
        }
        self._xhr.addEventListener('load', onLoad);
        self._xhr.addEventListener('error', onError);
        self.mockXliffUrl = './xliff/' + mockXliffName;
        self._xhr.open('GET', self.mockXliffUrl);
        self.mockXliff = undefined;
        self._xhr.send();
      });
      delete self._xhr;
      self.mockFile = new Blob([self.mockXliff], { type: 'application/x-xliff+xml' });
      self.mockFile.name = mockXliffName;
      self.mockChangeEvent = {
        type: 'change',
        target: {
          files: [self.mockFile]
        },
        preventDefault: () => {}
      };
      self.fileStorage.onFileChange(self.mockChangeEvent); // Note: input.files = new FileList([self.mockFile]) is illegal
      await self.checkInterval(() => self.fileStorage.label === mockXliffName, 200, 200);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.isOk(this.fileLoaderClicked, 'local file selection dialog is opened (mock)');
      assert.equal(this.fileStorage.label, 'bundle.de.xlf', 'local file is uploaded (mock)');
    }
  }
  filestorage.test = (base) => class FileStorageDropTooltipTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      self.dropTooltip = self.fileStorage.$.droptooltip;
      await self.showTooltip(self.fileStorage.$.droparea, self.dropTooltip);
      self.tooltipMessage = self.dropTooltip.textContent.trim();
      await self.forEvent(self.dropTooltip, 'neon-animation-finish', () => {}, (element, type, event) => true);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.tooltipMessage, 'Drag and drop XLIFF to select', 'drop tooltip should be "Drag and drop XLIFF to select"');
    }
  }
  filestorage.test = (base) => class MockFileStorageDropTest extends base {
    static get reconnectable() { return false; }
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      let mouseEventInit = {
        bubbles: false,
        cancelable: true,
        clientX: 0,
        clientY: 0,
        buttons: 1
      };
      self.droparea = self.fileStorage.$.droparea;
      self.droparea.dispatchEvent(new MouseEvent('dragover', mouseEventInit));
      let mockXliffName = 'bundle.de.xlf';
      self._xhr = new XMLHttpRequest();
      await new Promise((resolve, reject) => {
        let onLoad = function (e) {
          self.mockXliff = self._xhr.responseText;
          self._xhr.removeEventListener('load', onLoad);
          self._xhr.removeEventListener('error', onLoad);
          resolve(self.mockXliff);
        }
        let onError = function (e) {
          self.mockXliff = '';
          self._xhr.removeEventListener('load', onLoad);
          self._xhr.removeEventListener('error', onLoad);
          reject(e);
        }
        self._xhr.addEventListener('load', onLoad);
        self._xhr.addEventListener('error', onError);
        self.mockXliffUrl = './xliff/' + mockXliffName;
        self._xhr.open('GET', self.mockXliffUrl);
        self.mockXliff = undefined;
        self._xhr.send();
      });
      delete self._xhr;
      self.mockFile = new Blob([self.mockXliff], { type: 'application/x-xliff+xml' });
      self.mockFile.name = mockXliffName;
      self.mockDropEvent = new MouseEvent('drop', mouseEventInit);
      Object.defineProperty(self.mockDropEvent, 'dataTransfer', { value: { files: [self.mockFile] } });
      self.droparea.dispatchEvent(self.mockDropEvent);
      await self.checkInterval(() => self.fileStorage.label === mockXliffName, 200, 200);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.fileStorage.label, 'bundle.de.xlf', 'local file is dropped (mock)');
    }
  }
  filestorage.test = (base) => class FileStorageConfigureWatcher extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      if (window.location.hostname !== 'localhost') {
        return; // Assuming the test host is localhost
      }
      // configure watcher to fetch file from WCT
      self.fileStorage.watchPort = window.location.port;
      self.fileStorage.watchPath = window.location.pathname.replace(/[\/][^\/]*$/, '/') + 'updated-xliff/';
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
    }
  }
  filestorage.test = (base) => class FileStorageConfigureWatcherError extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      if (window.location.hostname !== 'localhost') {
        return; // Assuming the test host is localhost
      }
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
    }
  }
  filestorage.test = (base) => class FileStorageConfigureWatcherIncompleteXliff extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      if (window.location.hostname !== 'localhost') {
        return; // Assuming the test host is localhost
      }
      // configure watcher to fetch file from WCT
      self.fileStorage.watchPort = window.location.port;
      self.fileStorage.watchPath = window.location.pathname.replace(/[\/][^\/]*$/, '/') + 'incomplete-xliff/';
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
    }
  }
  filestorage.test = (base) => class FileStorageConfigureWatcherFileNotFound extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      if (window.location.hostname !== 'localhost') {
        return; // Assuming the test host is localhost
      }
      // configure watcher to fetch file from WCT
      self.fileStorage.watchPort = window.location.port;
      self.fileStorage.watchPath = window.location.pathname.replace(/[\/][^\/]*$/, '/') + 'inexistent-xliff/';
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
    }
  }
  filestorage.test = (base) => class FileStorageWatchingFileTooltip extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      if (window.location.hostname !== 'localhost') {
        return; // Assuming the test host is localhost
      }
      self.tooltipMessage = '';
      await self.forEvent(self.tooltip, 'neon-animation-finish', () => {}, (element, type, event) => {
        return self.tooltipMessage = self.tooltip.textContent.trim();
      });
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      if (window.location.hostname !== 'localhost') {
        return; // Assuming the test host is localhost
      }
      assert.isOk(this.tooltipMessage.match(/^Watching http:/), 'tooltip should be "Watching http..."');
    }
  }
  filestorage.test = (base) => class FileStorageWatchingFileTooltip2 extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      if (window.location.hostname !== 'localhost') {
        return; // Assuming the test host is localhost
      }
      self.tooltipMessage = '';
      await self.forEvent(self.tooltip, 'neon-animation-finish', () => { self.fileStorage.lastModified = (new Date(0)).toUTCString(); }, (element, type, event) => {
        self.tooltipMessage = self.tooltip.textContent.trim();
        console.log(self.tooltipMessage);
        return self.tooltipMessage && self.tooltipMessage.match(/^Detected Change in /);
      });
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      if (window.location.hostname !== 'localhost') {
        return; // Assuming the test host is localhost
      }
      assert.isOk(this.tooltipMessage.match(/^Detected Change in /), 'tooltip should be "Detected Change in http..."');
    }
  }
  filestorage.test = (base) => class FileStorageWatchingFileTooltip3 extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      if (window.location.hostname !== 'localhost') {
        return; // Assuming the test host is localhost
      }
      self.tooltipMessage = '';
      await self.forEvent(self.tooltip, 'neon-animation-finish', () => { self.fileStorage.lastModified = (new Date(0)).toUTCString(); }, (element, type, event) => {
        self.tooltipMessage = self.tooltip.textContent.trim();
        console.log(self.tooltipMessage);
        return self.tooltipMessage && self.tooltipMessage.match(/^Error in watching /);
      });
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      if (window.location.hostname !== 'localhost') {
        return; // Assuming the test host is localhost
      }
      assert.isOk(this.tooltipMessage.match(/^Error in watching /), 'tooltip should be "Error in watching http..."');
    }
  }
  filestorage.test = (base) => class FileStorageWatchingFileTooltip4 extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      if (window.location.hostname !== 'localhost') {
        return; // Assuming the test host is localhost
      }
      self.tooltipMessage = '';
      await self.forEvent(self.tooltip, 'neon-animation-finish', () => { self.fileStorage.lastModified = (new Date(0)).toUTCString(); }, (element, type, event) => {
        self.tooltipMessage = self.tooltip.textContent.trim();
        console.log(self.tooltipMessage);
        return self.tooltipMessage && self.tooltipMessage.match(/^Incomplete XLIFF found at /);
      });
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      if (window.location.hostname !== 'localhost') {
        return; // Assuming the test host is localhost
      }
      assert.isOk(this.tooltipMessage.match(/^Incomplete XLIFF found at /), 'tooltip should be "Incomplete XLIFF found at http..."');
    }
  }
  filestorage.test = (base) => class FileStorageWatchingFileTooltip5 extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      if (window.location.hostname !== 'localhost') {
        return; // Assuming the test host is localhost
      }
      self.tooltipMessage = '';
      await self.forEvent(self.tooltip, 'neon-animation-finish', () => { self.fileStorage.lastModified = (new Date(0)).toUTCString(); }, (element, type, event) => {
        self.tooltipMessage = self.tooltip.textContent.trim();
        console.log(self.tooltipMessage);
        return self.tooltipMessage && self.tooltipMessage.match(/^File Not Found for /);
      });
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      if (window.location.hostname !== 'localhost') {
        return; // Assuming the test host is localhost
      }
      assert.isOk(this.tooltipMessage.match(/^File Not Found for /), 'tooltip should be "File Not Found for http..."');
    }
  }
  filestorage.test = (base) => class FileStorageBadgeTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      if (window.location.hostname !== 'localhost') {
        return; // Assuming the test host is localhost
      }
      await self.checkInterval(() => self.fileStorage.badgeLabel === '1', 200, 100);
      await self.checkInterval(() => self.localeIcon.$.badge.label === '16', 200, 100);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      if (window.location.hostname !== 'localhost') {
        return; // Assuming the test host is localhost
      }
      assert.equal(this.fileStorage.badgeLabel, '1', 'local file storage icon badge label should be "1"');
      assert.equal(this.fileStorage.badgeColor, 'yellow', 'local file storage icon badge color should be yellow');
      assert.equal(this.localeIcon.$.badge.label, '16', 'locale icon badge label should be "16"');
    }
  }
  filestorage.test = {
    // test class mixins
    '': [],
    // test classes
    SelectStorageView: {
      FileStorageSuite: {
        CheckboxTest: {
          FileStorageUnselectedIconTooltipTest: 'UnselectedIconTooltipTest'
        }
      }
    },
    SelectIconView: {
      FileStorageSuite: {
        SelectLocaleIcon: {
          SelectStorageView: {
            MockFileStorageSaveTest: {
              FileStorageSelectedIconTooltipTest: {
                FileStorageLoadTest: 'FileStorageSaveLoadTest; Save to local file, Load from a copy of the saved file (Mock)'
              }
            },
            EnableTimestampPrefix: {
              MockFileStorageSaveTest2: {
                FileStorageLoadTest2: 'FileStorageSaveLoadTest2; Save to prefixed local file, Load from a copy of the saved file (Mock)'
              }
            },
            MockFileStorageUploadTest: {
              FileStorageLoadTest: 'FileStorageUploadLoadTest; Upload local file, Load from a copy of the uploaded file (Mock)'
            },
            FileStorageDropTooltipTest: {
              MockFileStorageDropTest: {
                FileStorageLoadTest: 'FileStorageDropLoadTest; Drop local file, Load from a copy of the dropped file (Mock)'
              }
            },
            FileStorageConfigureWatcher: {
              EnableWatcherCheckbox: {
                MockFileStorageUploadTest: {
                  FileStorageWatchingFileTooltip: {
                    FileStorageWatchingFileTooltip2: {
                      FileStorageBadgeTest: {
                        DisableWatcherCheckbox: 'FileStorageWatcherTest; Watch local file at localhost'
                      }
                    }
                  }
                }
              }
            },
            FileStorageConfigureWatcherError: {
              EnableWatcherCheckbox: {
                MockFileStorageUploadTest: {
                  FileStorageWatchingFileTooltip3: 'FileStorageWatcherUnresponsiveTest; Unresponsive local file watcher'
                }
              }
            },
            FileStorageConfigureWatcherIncompleteXliff: {
              EnableWatcherCheckbox: {
                MockFileStorageUploadTest: {
                  FileStorageWatchingFileTooltip4: 'FileStorageWatcherIncompleteXliffTest; Incomplete local file XLIFF from watcher'
                }
              }
            },
            FileStorageConfigureWatcherFileNotFound: {
              EnableWatcherCheckbox: {
                MockFileStorageUploadTest: {
                  FileStorageWatchingFileTooltip5: 'FileStorageWatcherFileNotFoundTest; File Not Found from local file watcher'
                }
              }
            }
          }
        }
      }
    }
  };
} // filestorage scope
/*
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  // multistorage scope (subscope of filestorage)
  let scope = 'multistorage';
  let multistorage = new Suite(scope, 'live-localizer multistorage tests');
  multistorage.htmlSuite = 'live-localizer-multistorage';
  multistorage.test = Suite.scopes.storageview.classes.SelectStorageView;
  multistorage.test = Suite.scopes.panel.classes.SelectIconView;
  multistorage.test = Suite.scopes.panel.mixins.SelectStorageView;
  multistorage.test = Suite.scopes.browserstorage.mixins.SelectLocaleIcon;
  multistorage.test = Suite.scopes.common.mixins.Reload;
  multistorage.test = Suite.scopes.filestorage.mixins.FileStorageSuite;
  multistorage.test = Suite.scopes.filestorage.mixins.FileStorageConfigureWatcher;
  multistorage.test = Suite.scopes.filestorage.mixins.EnableWatcherCheckbox;
  multistorage.test = Suite.scopes.filestorage.mixins.MockFileStorageUploadTest;
  multistorage.test = Suite.scopes.filestorage.mixins.FileStorageWatchingFileTooltip;
  multistorage.test = Suite.scopes.filestorage.mixins.FileStorageWatchingFileTooltip2;
  multistorage.test = Suite.scopes.filestorage.mixins.DisableWatcherCheckbox;
  multistorage.test = (base) => class CleanupFirebaseAuthSuite extends base {
    static get reconnectable() { return false; }
    async setup() {
      await super.setup();
      if (this.hasToSkip) { return; }
      this.cleanup();
    }
    cleanup() {
      for (let key in localStorage) {
        if (key.match(/^firebase:/)) {
          localStorage.removeItem(key);
        }
      }
    }
    async operation() {
      let self = this;
      self.localeIcon = self.storageView.$['locale-icon'];
      self.firebaseStorageIcon = dom(self.firebaseStorage.root).querySelector('live-localizer-storage-icon');
      self.firebaseIconTooltip = dom(self.storageIcon.root).querySelector('paper-tooltip[for=card]');
      self.firebaseTooltip = self.firebaseStorage.$.tooltip;
      self.firebaseCheckboxes = Array.prototype.reduce.call(dom(self.firebaseStorage.root).querySelectorAll('paper-checkbox'),
        (acc, curr) => { acc[curr.textContent.trim()] = curr; return acc; }, {});
      self.browserTooltip = self.browserStorage.$.tooltip;
    }
  }
  multistorage.test = Suite.scopes.firebasestorage.mixins.SignInAnonymously;
  multistorage.test = Suite.scopes.firebasestorage.mixins.SignOutAnonymousUser;
  multistorage.test = (base) => class MultiStorageLabelTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      if (window.location.hostname !== 'localhost') {
        return; // Assuming the test host is localhost
      }
      await self.checkInterval(() => self.fileStorage.badgeLabel === '1', 200, 100);
      await self.checkInterval(() => self.localeIcon.$.badge.label === '16', 200, 100);
      self.firebaseTooltipMessage = '';
      await self.checkInterval(() => self.firebaseTooltipMessage = self.firebaseTooltip.textContent.trim(), 100, 200);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      if (window.location.hostname !== 'localhost') {
        return; // Assuming the test host is localhost
      }
      assert.equal(this.fileStorage.badgeLabel, '1', 'local file storage icon badge label should be "1"');
      assert.equal(this.fileStorage.badgeColor, 'yellow', 'local file storage icon badge color should be yellow');
      assert.equal(this.localeIcon.$.badge.label, '16', 'locale icon badge label should be "16"');
      assert.equal(this.firebaseTooltipMessage, 'Saved XLIFF for de', 'firebase tooltip is "Saved XLIFF for de"');
    }
  }
  multistorage.test = {
    // test class mixins
    '': [],
    // test classes
    SelectIconView: {
      FileStorageSuite: {
        CleanupFirebaseAuthSuite: {
          SelectLocaleIcon: {
            SelectStorageView: {
              SignInAnonymously: {
                FileStorageConfigureWatcher: {
                  EnableWatcherCheckbox: {
                    MockFileStorageUploadTest: {
                      FileStorageWatchingFileTooltip: {
                        FileStorageWatchingFileTooltip2: {
                          MultiStorageLabelTest: {
                            DisableWatcherCheckbox: {
                              SignOutAnonymousUser: 'MultiStorageAutoSaveTest'
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
} // multistorage scope
