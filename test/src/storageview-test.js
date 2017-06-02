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
  /*
  listview.test = (base) => class ListViewItemsTest extends base {
    async operation() {
      let self = this;
      self.list = self.listView.$.list;
      await self.checkInterval(() => self.list.items.length === 6, 100, 20);
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
  iconview.test = (base) => class DropareaTooltipTest extends base {
    async operation() {
      let self = this;
      let droparea = self.iconView.$.droparea;
      let tooltip = Polymer.dom(self.iconView.root).querySelector('paper-tooltip[for=droparea]');
      await self.forEvent(tooltip, 'neon-animation-finish', () => {
        droparea.dispatchEvent(new MouseEvent('mouseenter', {
          bubbles: true,
          cancelable: true,
          clientX: 0,
          clientY: 0,
          buttons: 1
        }));
      }, (element, type, event) => {
        self.tooltip = Polymer.dom(event).rootTarget;
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
      self.icon = Polymer.dom(self.iconView.root).querySelector('live-localizer-locale-icon#locale-icon-de');
      await self.forEvent(self.model, 'html-lang-mutation', () => { MockInteractions.tap(self.icon); }, (element, type, event) => self.model.html.lang === 'de');
    }
    async checkpoint() {
      assert.equal(this.model.html.lang, 'de', 'html.lang should be "de"');
      assert.isOk(this.icon.selected, 'Selected icon is selected');
    }
  }
  // Must be after SelectLocaleIconTest
  iconview.test = (base) => class MockSaveFileTest extends base {
    async operation() {
      let self = this;
      let droparea = self.iconView.$.droparea;
      self.icon = Polymer.dom(self.iconView.root).querySelector('live-localizer-locale-icon#locale-icon-de');
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
      self.pages = Polymer.dom(self.panel.$.panelarea).querySelector('iron-pages.panel-selector');
      self.icon = Polymer.dom(self.iconView.root).querySelector('live-localizer-locale-icon#locale-icon-de');
      self.badge = self.icon.$.badge;
      await self.forEvent(self.pages, 'iron-select', () => { MockInteractions.tap(self.badge); }, (element, type, event) => self.pages.selected === 'listview');
    }
    async checkpoint() {
      assert.isOk(this.icon.selected, 'de locale icon is selected');
      assert.equal(this.pages.selected, 'listview', 'listview is shown');
    }
  }
  iconview.test = (base) => class IconTooltipTest extends base {
    * iteration() {
      yield *[
        { icon: 'en', tooltip: 'Save XLIFF' },
        { icon: 'de', tooltip: 'Switch Locale' }
      ].map((parameters) => { parameters.name = 'tooltip for ' + parameters.icon + ' icon is "' + parameters.tooltip + '"'; return parameters });
    }
    async operation(parameters) {
      let self = this;
      self.icon = Polymer.dom(self.iconView.root).querySelector('live-localizer-locale-icon#locale-icon-' + parameters.icon);
      self.tooltip = Polymer.dom(self.icon.root).querySelector('paper-tooltip[for=card]');
      await self.forEvent(self.tooltip, 'neon-animation-finish', () => {
        self.icon.$.card.dispatchEvent(new MouseEvent('mouseenter', {
          bubbles: true,
          cancelable: true,
          clientX: 0,
          clientY: 0,
          buttons: 1
        }));
      }, (element, type, event) => {
        self.tooltip = Polymer.dom(event).rootTarget;
        self.icon.$.card.dispatchEvent(new MouseEvent('mouseleave', {
          bubbles: true,
          cancelable: true,
          clientX: 0,
          clientY: 0,
          buttons: 1
        }));
        return self.tooltip.is === 'paper-tooltip' && self.tooltip.for === 'card';
      });
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
      self.icon = Polymer.dom(self.iconView.root).querySelector('live-localizer-locale-icon#locale-icon-en');
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
      self.icon = Polymer.dom(self.iconView.root).querySelector('live-localizer-locale-icon#locale-icon-' + parameters.icon);
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
      let tooltip = Polymer.dom(self.panel.root).querySelector('paper-tooltip[for=' + parameters.button + ']');
      await self.forEvent(tooltip, 'neon-animation-finish', () => {
        button.dispatchEvent(new MouseEvent('mouseenter', {
          bubbles: true,
          cancelable: true,
          clientX: 0,
          clientY: 0,
          buttons: 1
        }));
      }, (element, type, event) => {
        self.tooltip = Polymer.dom(event).rootTarget;
        button.dispatchEvent(new MouseEvent('mouseleave', {
          bubbles: true,
          cancelable: true,
          clientX: 0,
          clientY: 0,
          buttons: 1
        }));
        return self.tooltip.is === 'paper-tooltip' && self.tooltip.for === parameters.button;
      });
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
  storageview.test = {
    // test class mixins
    '': [],
    // test classes
    SelectStorageView: 'SelectStorageViewTest'
  };
} // panel scope