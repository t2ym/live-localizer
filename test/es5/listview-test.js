var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  // listview scope (subscope of panel)
  var scope = 'listview';
  var listview = new Suite(scope, 'live-localizer listview tests');
  listview.htmlSuite = 'live-localizer';
  listview.test = Suite.scopes.panel.classes.SelectListView;
  listview.test = function (base) {
    return function (_base) {
      _inherits(ListViewItemsTest, _base);

      function ListViewItemsTest() {
        _classCallCheck(this, ListViewItemsTest);

        return _possibleConstructorReturn(this, (ListViewItemsTest.__proto__ || Object.getPrototypeOf(ListViewItemsTest)).apply(this, arguments));
      }

      _createClass(ListViewItemsTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  self = this;

                  self.list = self.listView.$.list;
                  _context.next = 4;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return self.list.items.length === 6;
                  }, 100 /* ms */, 20 /* times */));

                case 4:
                case 'end':
                  return _context.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  assert.equal(this.list.items.length, 6, 'list item length is 6');

                case 1:
                case 'end':
                  return _context2.stop();
              }
            }
          }, null, this);
        }
      }]);

      return ListViewItemsTest;
    }(base);
  };
  listview.test = function (base) {
    return function (_base2) {
      _inherits(ListViewSelectItemTest, _base2);

      function ListViewSelectItemTest() {
        _classCallCheck(this, ListViewSelectItemTest);

        return _possibleConstructorReturn(this, (ListViewSelectItemTest.__proto__ || Object.getPrototypeOf(ListViewSelectItemTest)).apply(this, arguments));
      }

      _createClass(ListViewSelectItemTest, [{
        key: 'iteration',
        value: regeneratorRuntime.mark(function iteration() {
          var i;
          return regeneratorRuntime.wrap(function iteration$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  i = 5;

                case 1:
                  if (!(i >= 0)) {
                    _context3.next = 7;
                    break;
                  }

                  _context3.next = 4;
                  return { i: i, name: 'listItems[' + i + '] is selected' };

                case 4:
                  i--;
                  _context3.next = 1;
                  break;

                case 7:
                case 'end':
                  return _context3.stop();
              }
            }
          }, iteration, this);
        })
      }, {
        key: 'operation',
        value: function operation(parameters) {
          var self;
          return regeneratorRuntime.async(function operation$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  self = this;

                  self.list = self.listView.$.list;
                  _context4.next = 4;
                  return regeneratorRuntime.awrap(self.forEvent(self.model, 'html-lang-mutation', function () {
                    if (self.listView.version1) {
                      self.list.selection.select(parameters.i);
                    }
                    if (self.listView.version2) {
                      self.list.activeItem = self.listView.listItems[parameters.i];
                    }
                  }, function (element, type, event) {
                    return true;
                  }));

                case 4:
                case 'end':
                  return _context4.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint(parameters) {
          return regeneratorRuntime.async(function checkpoint$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  if (this.listView.version1) {
                    assert.equal(this.list.selection.selected().length, 1, 'Only 1 item is selected');
                    assert.equal(this.list.selection.selected()[0], parameters.i, 'Selected item is ' + this.listView.listItems[parameters.i][0]);
                  }
                  if (this.listView.version2) {
                    assert.equal(this.list.selectedItems.length, 1, 'Only 1 item is selected');
                    assert.equal(this.list.selectedItems[0][0], this.listView.listItems[parameters.i][0], 'Selected item is ' + this.listView.listItems[parameters.i][0]);
                  }
                  assert.equal(this.model.html.lang, this.listView.listItems[parameters.i][1], 'Selected locale is ' + this.listView.listItems[parameters.i][1]);

                case 3:
                case 'end':
                  return _context5.stop();
              }
            }
          }, null, this);
        }
      }]);

      return ListViewSelectItemTest;
    }(base);
  };
  listview.test = function (base) {
    return function (_base3) {
      _inherits(ListViewUnsupportedHtmlLangTest, _base3);

      function ListViewUnsupportedHtmlLangTest() {
        _classCallCheck(this, ListViewUnsupportedHtmlLangTest);

        return _possibleConstructorReturn(this, (ListViewUnsupportedHtmlLangTest.__proto__ || Object.getPrototypeOf(ListViewUnsupportedHtmlLangTest)).apply(this, arguments));
      }

      _createClass(ListViewUnsupportedHtmlLangTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  self = this;

                  self.list = self.listView.$.list;
                  _context6.next = 4;
                  return regeneratorRuntime.awrap(self.forEvent(self.model, 'html-lang-mutation', function () {
                    self.model.html.lang = 'ru';
                  }, function (element, type, event) {
                    return true;
                  }));

                case 4:
                case 'end':
                  return _context6.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  if (this.listView.version1) {
                    assert.equal(this.list.selection.selected().length, 0, 'no locale is selected');
                  }
                  if (this.listView.version2) {
                    assert.equal(this.list.selectedItems.length, 0, 'no locale is selected');
                  }

                case 2:
                case 'end':
                  return _context7.stop();
              }
            }
          }, null, this);
        }
      }]);

      return ListViewUnsupportedHtmlLangTest;
    }(base);
  };
  listview.test = function (base) {
    return function (_base4) {
      _inherits(ListViewHtmlLangTest, _base4);

      function ListViewHtmlLangTest() {
        _classCallCheck(this, ListViewHtmlLangTest);

        return _possibleConstructorReturn(this, (ListViewHtmlLangTest.__proto__ || Object.getPrototypeOf(ListViewHtmlLangTest)).apply(this, arguments));
      }

      _createClass(ListViewHtmlLangTest, [{
        key: 'iteration',
        value: regeneratorRuntime.mark(function iteration() {
          var i;
          return regeneratorRuntime.wrap(function iteration$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  i = 5;

                case 1:
                  if (!(i >= 0)) {
                    _context8.next = 7;
                    break;
                  }

                  _context8.next = 4;
                  return { i: i, name: 'listItems[' + i + '] is selected' };

                case 4:
                  i--;
                  _context8.next = 1;
                  break;

                case 7:
                case 'end':
                  return _context8.stop();
              }
            }
          }, iteration, this);
        })
      }, {
        key: 'operation',
        value: function operation(parameters) {
          var self;
          return regeneratorRuntime.async(function operation$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  self = this;

                  self.list = self.listView.$.list;
                  _context9.next = 4;
                  return regeneratorRuntime.awrap(self.forEvent(self.model, 'html-lang-mutation', function () {
                    self.model.html.lang = self.listView.listItems[parameters.i][1];
                  }, function (element, type, event) {
                    return true;
                  }));

                case 4:
                case 'end':
                  return _context9.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint(parameters) {
          return regeneratorRuntime.async(function checkpoint$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  if (this.listView.version1) {
                    assert.equal(this.list.selection.selected().length, 1, 'Only 1 item is selected');
                    assert.equal(this.list.selection.selected()[0], parameters.i, 'Selected item is ' + this.listView.listItems[parameters.i][0]);
                  }
                  if (this.listView.version2) {
                    assert.equal(this.list.selectedItems.length, 1, 'Only 1 item is selected');
                    assert.equal(this.list.selectedItems[0][0], this.listView.listItems[parameters.i][0], 'Selected item is ' + this.listView.listItems[parameters.i][0]);
                  }
                  assert.equal(this.model.html.lang, this.listView.listItems[parameters.i][1], 'Selected locale is ' + this.listView.listItems[parameters.i][1]);

                case 3:
                case 'end':
                  return _context10.stop();
              }
            }
          }, null, this);
        }
      }]);

      return ListViewHtmlLangTest;
    }(base);
  };
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