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
      self.pages = Polymer.dom(self.panel.$.panelarea).querySelector('iron-pages.panel-selector');
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
