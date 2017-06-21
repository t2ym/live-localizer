var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  // storageview scope (subscope of panel)
  var scope = 'storageview';
  var storageview = new Suite(scope, 'live-localizer storageview tests');
  storageview.htmlSuite = 'live-localizer';
  storageview.test = Suite.scopes.panel.classes.SelectStorageView;
  storageview.test = function (base) {
    return function (_base) {
      _inherits(StorageViewBadgeTapTest, _base);

      function StorageViewBadgeTapTest() {
        _classCallCheck(this, StorageViewBadgeTapTest);

        return _possibleConstructorReturn(this, (StorageViewBadgeTapTest.__proto__ || Object.getPrototypeOf(StorageViewBadgeTapTest)).apply(this, arguments));
      }

      _createClass(StorageViewBadgeTapTest, [{
        key: 'operation',
        value: function operation() {
          var self, count;
          return regeneratorRuntime.async(function operation$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  self = this;

                  self.pages = Polymer.dom(self.panel.$.panelarea).querySelector('iron-pages.panel-selector');
                  self.icon = self.storageView.$['locale-icon'];
                  self.badge = self.icon.$.badge;
                  _context.next = 6;
                  return regeneratorRuntime.awrap(self.forEvent(self.pages, 'iron-select', function () {
                    MockInteractions.tap(self.badge);
                  }, function (element, type, event) {
                    return self.pages.selected === 'listview';
                  }));

                case 6:
                  count = 0;
                  _context.next = 9;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return count++ === 1;
                  }, 200, 1));

                case 9:
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
                  assert.equal(this.pages.selected, 'listview', 'listview is shown');

                case 1:
                case 'end':
                  return _context2.stop();
              }
            }
          }, null, this);
        }
      }]);

      return StorageViewBadgeTapTest;
    }(base);
  };
  storageview.test = function (base) {
    return function (_base2) {
      _inherits(StorageViewIconTooltipTest, _base2);

      function StorageViewIconTooltipTest() {
        _classCallCheck(this, StorageViewIconTooltipTest);

        return _possibleConstructorReturn(this, (StorageViewIconTooltipTest.__proto__ || Object.getPrototypeOf(StorageViewIconTooltipTest)).apply(this, arguments));
      }

      _createClass(StorageViewIconTooltipTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  self = this;

                  self.icon = self.storageView.$['locale-icon'];
                  self.tooltip = Polymer.dom(self.icon.root).querySelector('paper-tooltip[for=card]');
                  _context3.next = 5;
                  return regeneratorRuntime.awrap(self.showTooltip(self.icon.$.card, self.tooltip));

                case 5:
                case 'end':
                  return _context3.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  assert.equal(this.tooltip.getAttribute('for'), 'card', 'paper-tooltip should be for card');
                  assert.equal(this.tooltip.textContent.trim(), 'Drag to Save', 'tooltip should be "Drag to Save"');

                case 2:
                case 'end':
                  return _context4.stop();
              }
            }
          }, null, this);
        }
      }]);

      return StorageViewIconTooltipTest;
    }(base);
  };
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