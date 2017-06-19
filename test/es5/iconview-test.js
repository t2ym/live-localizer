var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  // iconview scope (subscope of panel)
  var scope = 'iconview';
  var iconview = new Suite(scope, 'live-localizer iconview tests');
  iconview.htmlSuite = 'live-localizer';
  iconview.test = Suite.scopes.panel.classes.SelectIconView;
  iconview.test = function (base) {
    return function (_base) {
      _inherits(DropareaTooltipTest, _base);

      function DropareaTooltipTest() {
        _classCallCheck(this, DropareaTooltipTest);

        return _possibleConstructorReturn(this, (DropareaTooltipTest.__proto__ || Object.getPrototypeOf(DropareaTooltipTest)).apply(this, arguments));
      }

      _createClass(DropareaTooltipTest, [{
        key: 'operation',
        value: function operation() {
          var self, droparea, tooltip;
          return regeneratorRuntime.async(function operation$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  self = this;
                  droparea = self.iconView.$.droparea;
                  tooltip = Polymer.dom(self.iconView.root).querySelector('paper-tooltip[for=droparea]');
                  _context.next = 5;
                  return regeneratorRuntime.awrap(self.forEvent(tooltip, 'neon-animation-finish', function () {
                    droparea.dispatchEvent(new MouseEvent('mouseenter', {
                      bubbles: true,
                      cancelable: true,
                      clientX: 0,
                      clientY: 0,
                      buttons: 1
                    }));
                  }, function (element, type, event) {
                    self.tooltip = Polymer.dom(event).rootTarget;
                    return self.tooltip.is === 'paper-tooltip' && self.tooltip.for === 'droparea';
                  }));

                case 5:
                  _context.next = 7;
                  return regeneratorRuntime.awrap(self.forEvent(tooltip, 'neon-animation-finish', function () {}, function (element, type, event) {
                    return true;
                  }));

                case 7:
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
                  assert.equal(this.tooltip.getAttribute('for'), 'droparea', 'paper-tooltip should be for droparea');
                  assert.equal(this.tooltip.textContent.trim(), 'Drag and drop XLIFF to load', 'tooltip should be "Drag and drop XLIFF to loadparameters.tooltip"');

                case 2:
                case 'end':
                  return _context2.stop();
              }
            }
          }, null, this);
        }
      }]);

      return DropareaTooltipTest;
    }(base);
  };
  iconview.test = function (base) {
    return function (_base2) {
      _inherits(SelectLocaleIconTest, _base2);

      function SelectLocaleIconTest() {
        _classCallCheck(this, SelectLocaleIconTest);

        return _possibleConstructorReturn(this, (SelectLocaleIconTest.__proto__ || Object.getPrototypeOf(SelectLocaleIconTest)).apply(this, arguments));
      }

      _createClass(SelectLocaleIconTest, [{
        key: 'operation',
        value: function operation() {
          var self, droparea;
          return regeneratorRuntime.async(function operation$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  self = this;
                  droparea = self.iconView.$.droparea;

                  self.icon = Polymer.dom(self.iconView.root).querySelector('live-localizer-locale-icon#locale-icon-de');
                  _context3.next = 5;
                  return regeneratorRuntime.awrap(self.forEvent(self.model, 'html-lang-mutation', function () {
                    MockInteractions.tap(self.icon);
                  }, function (element, type, event) {
                    return self.model.html.lang === 'de';
                  }));

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
                  assert.equal(this.model.html.lang, 'de', 'html.lang should be "de"');
                  assert.isOk(this.icon.selected, 'Selected icon is selected');

                case 2:
                case 'end':
                  return _context4.stop();
              }
            }
          }, null, this);
        }
      }]);

      return SelectLocaleIconTest;
    }(base);
  };
  // Must be after SelectLocaleIconTest
  iconview.test = function (base) {
    return function (_base3) {
      _inherits(MockSaveFileTest, _base3);

      function MockSaveFileTest() {
        _classCallCheck(this, MockSaveFileTest);

        return _possibleConstructorReturn(this, (MockSaveFileTest.__proto__ || Object.getPrototypeOf(MockSaveFileTest)).apply(this, arguments));
      }

      _createClass(MockSaveFileTest, [{
        key: 'operation',
        value: function operation() {
          var self, droparea;
          return regeneratorRuntime.async(function operation$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  self = this;
                  droparea = self.iconView.$.droparea;

                  self.icon = Polymer.dom(self.iconView.root).querySelector('live-localizer-locale-icon#locale-icon-de');
                  self.mockStorage = self.model.storage['file-storage'];
                  self.mockStorage.save = function save(file) {
                    self.savedFile = file;
                  };
                  MockInteractions.tap(self.icon);

                case 6:
                case 'end':
                  return _context5.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  assert.equal(this.savedFile.locale, 'de', 'Saved file locale should be "de"');

                case 1:
                case 'end':
                  return _context6.stop();
              }
            }
          }, null, this);
        }
      }]);

      return MockSaveFileTest;
    }(base);
  };
  iconview.test = function (base) {
    return function (_base4) {
      _inherits(MockDropFileTest, _base4);

      function MockDropFileTest() {
        _classCallCheck(this, MockDropFileTest);

        return _possibleConstructorReturn(this, (MockDropFileTest.__proto__ || Object.getPrototypeOf(MockDropFileTest)).apply(this, arguments));
      }

      _createClass(MockDropFileTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  self = this;

                  self.droparea = self.iconView.$.droparea;
                  self.mockStorage = self.model.storage['file-storage'];
                  self.mockStorage.load = function load(event) {
                    self.loadEvent = event;
                  };
                  _context7.next = 6;
                  return regeneratorRuntime.awrap(self.forEvent(self.droparea, 'dragover', function () {
                    self.droparea.dispatchEvent(new MouseEvent('dragover', {
                      bubbles: true,
                      cancelable: true,
                      clientX: 0,
                      clientY: 0,
                      buttons: 1
                    }));
                  }, function (element, type, event) {
                    return event.type === 'dragover';
                  }));

                case 6:
                  _context7.next = 8;
                  return regeneratorRuntime.awrap(self.forEvent(self.droparea, 'drop', function () {
                    self.droparea.dispatchEvent(new MouseEvent('drop', {
                      bubbles: true,
                      cancelable: true,
                      clientX: 0,
                      clientY: 0,
                      buttons: 1
                    }));
                  }, function (element, type, event) {
                    return event.type === 'drop';
                  }));

                case 8:
                case 'end':
                  return _context7.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  assert.equal(this.mockStorage.selected, true, 'fileStorage.selected is true');
                  assert.equal(this.loadEvent.type, 'drop', 'load file via a "drop" event');

                case 2:
                case 'end':
                  return _context8.stop();
              }
            }
          }, null, this);
        }
      }]);

      return MockDropFileTest;
    }(base);
  };
  iconview.test = function (base) {
    return function (_base5) {
      _inherits(IconViewBadgeTapTest, _base5);

      function IconViewBadgeTapTest() {
        _classCallCheck(this, IconViewBadgeTapTest);

        return _possibleConstructorReturn(this, (IconViewBadgeTapTest.__proto__ || Object.getPrototypeOf(IconViewBadgeTapTest)).apply(this, arguments));
      }

      _createClass(IconViewBadgeTapTest, [{
        key: 'operation',
        value: function operation() {
          var self, droparea;
          return regeneratorRuntime.async(function operation$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  self = this;
                  droparea = self.iconView.$.droparea;

                  self.pages = Polymer.dom(self.panel.$.panelarea).querySelector('iron-pages.panel-selector');
                  self.icon = Polymer.dom(self.iconView.root).querySelector('live-localizer-locale-icon#locale-icon-de');
                  self.badge = self.icon.$.badge;
                  _context9.next = 7;
                  return regeneratorRuntime.awrap(self.forEvent(self.pages, 'iron-select', function () {
                    MockInteractions.tap(self.badge);
                  }, function (element, type, event) {
                    return self.pages.selected === 'listview';
                  }));

                case 7:
                case 'end':
                  return _context9.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  assert.isOk(this.icon.selected, 'de locale icon is selected');
                  assert.equal(this.pages.selected, 'listview', 'listview is shown');

                case 2:
                case 'end':
                  return _context10.stop();
              }
            }
          }, null, this);
        }
      }]);

      return IconViewBadgeTapTest;
    }(base);
  };
  iconview.test = function (base) {
    return function (_base6) {
      _inherits(IconTooltipTest, _base6);

      function IconTooltipTest() {
        _classCallCheck(this, IconTooltipTest);

        return _possibleConstructorReturn(this, (IconTooltipTest.__proto__ || Object.getPrototypeOf(IconTooltipTest)).apply(this, arguments));
      }

      _createClass(IconTooltipTest, [{
        key: 'iteration',
        value: regeneratorRuntime.mark(function iteration() {
          return regeneratorRuntime.wrap(function iteration$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  return _context11.delegateYield([{ icon: 'en', tooltip: 'Save XLIFF' }, { icon: 'de', tooltip: 'Switch Locale' }].map(function (parameters) {
                    parameters.name = 'tooltip for ' + parameters.icon + ' icon is "' + parameters.tooltip + '"';return parameters;
                  }), 't0', 1);

                case 1:
                case 'end':
                  return _context11.stop();
              }
            }
          }, iteration, this);
        })
      }, {
        key: 'operation',
        value: function operation(parameters) {
          var self;
          return regeneratorRuntime.async(function operation$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  self = this;

                  self.icon = Polymer.dom(self.iconView.root).querySelector('live-localizer-locale-icon#locale-icon-' + parameters.icon);
                  self.tooltip = Polymer.dom(self.icon.root).querySelector('paper-tooltip[for=card]');
                  _context12.next = 5;
                  return regeneratorRuntime.awrap(self.showTooltip(self.icon.$.card, self.tooltip));

                case 5:
                case 'end':
                  return _context12.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint(parameters) {
          return regeneratorRuntime.async(function checkpoint$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  assert.equal(this.tooltip.getAttribute('for'), 'card', 'paper-tooltip should be for card');
                  assert.equal(this.tooltip.textContent.trim(), parameters.tooltip, 'tooltip should be "' + parameters.tooltip + '"');

                case 2:
                case 'end':
                  return _context13.stop();
              }
            }
          }, null, this);
        }
      }]);

      return IconTooltipTest;
    }(base);
  };
  iconview.test = function (base) {
    return function (_base7) {
      _inherits(IconFlagUnitTest, _base7);

      function IconFlagUnitTest() {
        _classCallCheck(this, IconFlagUnitTest);

        return _possibleConstructorReturn(this, (IconFlagUnitTest.__proto__ || Object.getPrototypeOf(IconFlagUnitTest)).apply(this, arguments));
      }

      _createClass(IconFlagUnitTest, [{
        key: 'iteration',
        value: regeneratorRuntime.mark(function iteration() {
          return regeneratorRuntime.wrap(function iteration$(_context14) {
            while (1) {
              switch (_context14.prev = _context14.next) {
                case 0:
                  return _context14.delegateYield([{ locale: 'zh-CN', flag: 'CN' }, { locale: 'zh-Hans', flag: 'CN' }, { locale: 'en-GB', flag: 'GB' }, { locale: 'en', flag: 'US' }, { locale: 'ja', flag: 'JP' }, { locale: 'xx', flag: '' }].map(function (parameters) {
                    parameters.name = 'flag for ' + parameters.locale + ' locale icon is "' + parameters.flag + '"';return parameters;
                  }), 't0', 1);

                case 1:
                case 'end':
                  return _context14.stop();
              }
            }
          }, iteration, this);
        })
      }, {
        key: 'operation',
        value: function operation(parameters) {
          var self;
          return regeneratorRuntime.async(function operation$(_context15) {
            while (1) {
              switch (_context15.prev = _context15.next) {
                case 0:
                  self = this;

                  self.icon = Polymer.dom(self.iconView.root).querySelector('live-localizer-locale-icon#locale-icon-en');
                  self.flag = self.icon.flag(parameters.locale);

                case 3:
                case 'end':
                  return _context15.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint(parameters) {
          return regeneratorRuntime.async(function checkpoint$(_context16) {
            while (1) {
              switch (_context16.prev = _context16.next) {
                case 0:
                  assert.equal(this.flag, parameters.flag ? '/components/region-flags/png/' + parameters.flag + '.png' : parameters.flag, 'flag is "' + parameters.flag + '"');

                case 1:
                case 'end':
                  return _context16.stop();
              }
            }
          }, null, this);
        }
      }]);

      return IconFlagUnitTest;
    }(base);
  };
  iconview.test = function (base) {
    return function (_base8) {
      _inherits(IconViewDragIconTest, _base8);

      function IconViewDragIconTest() {
        _classCallCheck(this, IconViewDragIconTest);

        return _possibleConstructorReturn(this, (IconViewDragIconTest.__proto__ || Object.getPrototypeOf(IconViewDragIconTest)).apply(this, arguments));
      }

      _createClass(IconViewDragIconTest, [{
        key: 'iteration',
        value: regeneratorRuntime.mark(function iteration() {
          return regeneratorRuntime.wrap(function iteration$(_context17) {
            while (1) {
              switch (_context17.prev = _context17.next) {
                case 0:
                  return _context17.delegateYield([{ icon: 'en', mode: 'none' }, { icon: 'de', mode: 'none' }].map(function (parameters) {
                    parameters.name = 'dragHandleMode for ' + parameters.icon + ' locale icon is "' + parameters.mode + '"';return parameters;
                  }), 't0', 1);

                case 1:
                case 'end':
                  return _context17.stop();
              }
            }
          }, iteration, this);
        })
      }, {
        key: 'operation',
        value: function operation(parameters) {
          var self;
          return regeneratorRuntime.async(function operation$(_context18) {
            while (1) {
              switch (_context18.prev = _context18.next) {
                case 0:
                  self = this;

                  self.icon = Polymer.dom(self.iconView.root).querySelector('live-localizer-locale-icon#locale-icon-' + parameters.icon);
                  self.icon.dispatchEvent(new MouseEvent('mouseover', {
                    bubbles: true,
                    cancelable: true,
                    clientX: 0,
                    clientY: 0,
                    buttons: 1
                  }));
                  _context18.next = 5;
                  return regeneratorRuntime.awrap(self.forEvent(self.icon, 'track', function () {
                    MockInteractions.track(self.icon, 100, 100);
                  }, function (element, type, event) {
                    return event.detail.state === 'end';
                  }));

                case 5:
                case 'end':
                  return _context18.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint(parameters) {
          return regeneratorRuntime.async(function checkpoint$(_context19) {
            while (1) {
              switch (_context19.prev = _context19.next) {
                case 0:
                  assert.equal(this.icon.dragHandleMode, parameters.mode, 'dragHandleMode for ' + parameters.icon + ' locale icon is "' + parameters.mode + '"');

                case 1:
                case 'end':
                  return _context19.stop();
              }
            }
          }, null, this);
        }
      }]);

      return IconViewDragIconTest;
    }(base);
  };
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