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
      self.storageIcon = Polymer.dom(self.browserStorage.root).querySelector('live-localizer-storage-icon');
      self.tooltip = self.browserStorage.$.tooltip;
      self.iconTooltip = Polymer.dom(self.storageIcon.root).querySelector('paper-tooltip[for=card]');
      self.checkboxes = Array.prototype.reduce.call(Polymer.dom(self.browserStorage.root).querySelectorAll('paper-checkbox'),
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
      self.icon = Polymer.dom(self.iconView.root).querySelector('live-localizer-locale-icon#locale-icon-de');
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
