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
