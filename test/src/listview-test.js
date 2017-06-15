/*
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  // listview scope (subscope of panel)
  let scope = 'listview';
  let listview = new Suite(scope, 'live-localizer listview tests');
  listview.htmlSuite = 'live-localizer';
  listview.test = Suite.scopes.panel.classes.SelectListView;
  listview.test = (base) => class ListViewItemsTest extends base {
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
