/*
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import Suite from 'scenarist/Suite.mjs';
import './panel-test.js';

import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
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
