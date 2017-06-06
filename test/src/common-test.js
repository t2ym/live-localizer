/*
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
mocha.setup({ slow: 8000, timeout: 15000 });
// global test classes
class LiveLocalizerSuite extends Suite {
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
            reject();
          }
        }, interval);
      }
    });
  }
}
class InstantiateTest extends LiveLocalizerSuite {
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
