/*
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  // panel scope (subscope of dialog)
  let scope = 'panel';
  let panel = new Suite(scope, 'live-localizer panel tests');
  panel.htmlSuite = 'live-localizer';
  panel.test = Suite.scopes.dialog.classes.OpenDialogTest;
  panel.test = (base) => class PanelTooltipTest extends base {
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
          (element, type, event) => !!Polymer.dom(self.panel.root).querySelector('paper-icon-button#reload'));
      }
      let button = self.panel.$[parameters.button] || Polymer.dom(self.panel.root).querySelector('#' + parameters.button);
      self.tooltip = Polymer.dom(self.panel.root).querySelector('paper-tooltip[for=' + parameters.button + ']');
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
      self.tooltip = Polymer.dom(self.panel.root).querySelector('paper-tooltip#updated');
    }
    async checkpoint() {
      assert.equal(this.tooltip.getAttribute('for'), 'panelarea', 'paper-tooltip should be for panelarea');
      assert.equal(this.tooltip.textContent.trim(), 'App has been updated at server', 'tooltip should be "App has been updated at server"');
    }
  }
  panel.test = (base) => class ModelAlertTest extends base {
    async operation() {
      let self = this;
      self.tooltip = Polymer.dom(self.panel.root).querySelector('paper-tooltip#alert');
      await self.forEvent(self.tooltip, 'neon-animation-finish', () => {
        self.model.checkXliffConvVersion(undefined);
      }, (element, type, event) => {
        self.tooltip = Polymer.dom(event).rootTarget;
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
      self.pages = Polymer.dom(self.panel.$.panelarea).querySelector('iron-pages.panel-selector');
      if (parameters.missing) {
        await self.forEvent(self.pages, 'iron-deselect', () => { MockInteractions.tap(button); }, (element, type, event) => self.pages.selected === parameters.view);
      }
      else {
        await self.forEvent(self.pages, 'iron-select', () => { MockInteractions.tap(button); }, (element, type, event) => self.pages.selected === parameters.view);
      }
    }
    async checkpoint(parameters) {
      assert.equal(this.pages.selected, parameters.view, parameters.view + ' is selected by ' + parameters.button);
      let selectedViews = Polymer.dom(this.pages).querySelectorAll('.iron-selected');
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
      self.pages = Polymer.dom(self.panel.$.panelarea).querySelector('iron-pages.panel-selector');
      if (self.pages.selected !== 'iconview') {
        await self.forEvent(self.pages, 'iron-select', () => { MockInteractions.tap(button); }, (element, type, event) => self.pages.selected === 'iconview');
      }
    }
    async checkpoint() {
      assert.equal(Polymer.dom(this.pages).querySelector('.iron-selected').getAttribute('name'), 'iconview', 'iconview is shown');
    }
  }
  panel.test = (base) => class SelectListView extends base {
    async operation() {
      let self = this;
      let button = self.panel.$['listview-button'];
      self.pages = Polymer.dom(self.panel.$.panelarea).querySelector('iron-pages.panel-selector');
      if (self.pages.selected !== 'listview') {
        await self.forEvent(self.pages, 'iron-select', () => { MockInteractions.tap(button); }, (element, type, event) => self.pages.selected === 'listview');
      }
    }
    async checkpoint() {
      assert.equal(Polymer.dom(this.pages).querySelector('.iron-selected').getAttribute('name'), 'listview', 'listview is shown');
    }
  }
  panel.test = (base) => class SelectStorageView extends base {
    async operation() {
      let self = this;
      let button = self.panel.$['storageview-button'];
      self.pages = Polymer.dom(self.panel.$.panelarea).querySelector('iron-pages.panel-selector');
      if (self.pages.selected !== 'storageview') {
        await self.forEvent(self.pages, 'iron-select', () => { MockInteractions.tap(button); }, (element, type, event) => self.pages.selected === 'storageview');
      }
    }
    async checkpoint() {
      assert.equal(Polymer.dom(this.pages).querySelector('.iron-selected').getAttribute('name'), 'storageview', 'storageview is shown');
    }
  }
  panel.test = (base) => class FileLoadButtonTest extends base {
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
    async operation() {
      let self = this;
      let button = Polymer.dom(self.panel.root).querySelector('paper-icon-button#locales');
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
  panel.test = (base) => class ReloadButtonTest extends base {
    async operation() {
      let self = this;
      await self.forEvent(self.panel, 'dom-change', () => { self.panel.serverUpdated = true; },
        (element, type, event) => !!Polymer.dom(self.panel.root).querySelector('paper-icon-button#reload'));
      let button = Polymer.dom(self.panel.root).querySelector('paper-icon-button#reload');
      self.mockModel = self.model
      self.mockModel.reload = function fetch () {
        self.reloaded = true;
      }
      MockInteractions.tap(button);
    }
    async checkpoint(parameters) {
      assert.isOk(this.reloaded, 'model.reload() via reload button');
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
      ReloadButtonTest: 'MockReloadButtonTest; Reload button test (mock)',
      SelectIconView: '',
      SelectListView: '',
      SelectStorageView: ''
    }
  };
} // panel scope
