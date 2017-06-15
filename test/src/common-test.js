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
    static get reconnectable() { return false; }
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
      this.fixture = document.querySelector(this.target);
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
      self.main = Polymer.dom(self.element.root).querySelector('live-localizer-main');
      self.fab = Polymer.dom(self.main.root).querySelector('live-localizer-fab');
      self.dialog = Polymer.dom(self.main.root).querySelector('live-localizer-dialog');
      self.panel = Polymer.dom(self.main.root).querySelector('live-localizer-panel');
      self.model = Polymer.dom(self.panel.root).querySelector('live-localizer-model');
      self.iconView = Polymer.dom(self.panel.root).querySelector('live-localizer-locale-icon-view');
      self.listView = Polymer.dom(self.panel.root).querySelector('live-localizer-list-view');
      self.storageView = Polymer.dom(self.panel.root).querySelector('live-localizer-storage-view');
      self.browserStorage = self.storageView.$['browser-storage'];
      self.firebaseStorage = self.storageView.queryEffectiveChildren('live-localizer-firebase-storage#firebase-storage');
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
      assert.equal(self.firebaseStorage.is, 'live-localizer-firebase-storage');
      // dialog status
      assert.isNotOk(self.dialog.opened, 'dialog is not opened');
      assert.isOk(self.fab.opened, 'fab is opened');
    }
  }
  common.test = (base) => class Reload extends base {
    async operation() {
      this.stepPhase();
    }
  }
  common.test = {
    LiveLocalizerSuite: {
      InstantiateTest: ''
    }
  };
} // common scope