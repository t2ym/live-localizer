var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
  // panel scope (subscope of dialog)
  var scope = 'panel';
  var panel = new Suite(scope, 'live-localizer panel tests');
  panel.htmlSuite = 'live-localizer';
  panel.test = Suite.scopes.common.mixins.Reload;
  panel.test = Suite.scopes.common.classes.InstantiateTest;
  panel.test = Suite.scopes.dialog.classes.OpenDialogTest;
  panel.test = function (base) {
    return function (_base) {
      _inherits(PanelTooltipTest, _base);

      function PanelTooltipTest() {
        _classCallCheck(this, PanelTooltipTest);

        return _possibleConstructorReturn(this, (PanelTooltipTest.__proto__ || Object.getPrototypeOf(PanelTooltipTest)).apply(this, arguments));
      }

      _createClass(PanelTooltipTest, [{
        key: 'iteration',
        value: regeneratorRuntime.mark(function iteration() {
          return regeneratorRuntime.wrap(function iteration$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  return _context.delegateYield([{ button: 'iconview-button', tooltip: 'Show Icons' }, { button: 'listview-button', tooltip: 'Show List' }, { button: 'storageview-button', tooltip: 'Show Storage' }, { button: 'load', tooltip: 'Load XLIFF' }, { button: 'locales', tooltip: 'Check Updates on Locales' }, { button: 'reload', tooltip: 'Reload App', serverUpdated: true }].map(function (parameters) {
                    parameters.name = 'tooltip for ' + parameters.button + ' button is "' + parameters.tooltip + '"';return parameters;
                  }), 't0', 1);

                case 1:
                case 'end':
                  return _context.stop();
              }
            }
          }, iteration, this);
        })
      }, {
        key: 'operation',
        value: function operation(parameters) {
          var self, button;
          return regeneratorRuntime.async(function operation$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  self = this;

                  if (!parameters.serverUpdated) {
                    _context2.next = 4;
                    break;
                  }

                  _context2.next = 4;
                  return regeneratorRuntime.awrap(self.forEvent(self.panel, 'dom-change', function () {
                    self.panel.serverUpdated = true;
                  }, function (element, type, event) {
                    return !!Polymer.dom(self.panel.root).querySelector('paper-icon-button#reload');
                  }));

                case 4:
                  button = self.panel.$[parameters.button] || Polymer.dom(self.panel.root).querySelector('#' + parameters.button);

                  self.tooltip = Polymer.dom(self.panel.root).querySelector('paper-tooltip[for=' + parameters.button + ']');
                  _context2.next = 8;
                  return regeneratorRuntime.awrap(self.showTooltip(button, self.tooltip));

                case 8:
                case 'end':
                  return _context2.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint(parameters) {
          return regeneratorRuntime.async(function checkpoint$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  assert.equal(this.tooltip.getAttribute('for'), parameters.button, 'paper-tooltip should be for ' + parameters.button);
                  assert.equal(this.tooltip.textContent.trim(), parameters.tooltip, 'tooltip should be "' + parameters.tooltip + '"');

                case 2:
                case 'end':
                  return _context3.stop();
              }
            }
          }, null, this);
        }
      }], [{
        key: 'reconnectable',
        get: function get() {
          return false;
        }
      }]);

      return PanelTooltipTest;
    }(base);
  };
  // Must be after PanelTooltipTest
  panel.test = function (base) {
    return function (_base2) {
      _inherits(ReloadTooltipTest, _base2);

      function ReloadTooltipTest() {
        _classCallCheck(this, ReloadTooltipTest);

        return _possibleConstructorReturn(this, (ReloadTooltipTest.__proto__ || Object.getPrototypeOf(ReloadTooltipTest)).apply(this, arguments));
      }

      _createClass(ReloadTooltipTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  self = this;

                  self.tooltip = Polymer.dom(self.panel.root).querySelector('paper-tooltip#updated');

                case 2:
                case 'end':
                  return _context4.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  assert.equal(this.tooltip.getAttribute('for'), 'panelarea', 'paper-tooltip should be for panelarea');
                  assert.equal(this.tooltip.textContent.trim(), 'App has been updated at server', 'tooltip should be "App has been updated at server"');

                case 2:
                case 'end':
                  return _context5.stop();
              }
            }
          }, null, this);
        }
      }]);

      return ReloadTooltipTest;
    }(base);
  };
  panel.test = function (base) {
    return function (_base3) {
      _inherits(ModelAlertTest, _base3);

      function ModelAlertTest() {
        _classCallCheck(this, ModelAlertTest);

        return _possibleConstructorReturn(this, (ModelAlertTest.__proto__ || Object.getPrototypeOf(ModelAlertTest)).apply(this, arguments));
      }

      _createClass(ModelAlertTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  self = this;

                  self.tooltip = Polymer.dom(self.panel.root).querySelector('paper-tooltip#alert');
                  _context6.next = 4;
                  return regeneratorRuntime.awrap(self.forEvent(self.tooltip, 'neon-animation-finish', function () {
                    self.model.checkXliffConvVersion(undefined);
                  }, function (element, type, event) {
                    self.tooltip = Polymer.dom(event).rootTarget;
                    return self.tooltip.is === 'paper-tooltip' && self.tooltip.for === 'panelarea';
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
                  assert.equal(this.tooltip.getAttribute('for'), 'panelarea', 'paper-tooltip should be for panelarea');
                  assert.equal(this.tooltip.textContent.trim(), 'Incompatible xliff-conv with no version information', 'tooltip should be "Incompatible xliff-conv with no version information"');

                case 2:
                case 'end':
                  return _context7.stop();
              }
            }
          }, null, this);
        }
      }]);

      return ModelAlertTest;
    }(base);
  };
  panel.test = function (base) {
    return function (_base4) {
      _inherits(PanelViewTest, _base4);

      function PanelViewTest() {
        _classCallCheck(this, PanelViewTest);

        return _possibleConstructorReturn(this, (PanelViewTest.__proto__ || Object.getPrototypeOf(PanelViewTest)).apply(this, arguments));
      }

      _createClass(PanelViewTest, [{
        key: 'iteration',
        value: regeneratorRuntime.mark(function iteration() {
          return regeneratorRuntime.wrap(function iteration$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  return _context8.delegateYield([{ button: 'listview-button', view: 'listview' }, { button: 'detailview-button', view: 'detailview', missing: true }, { button: 'storageview-button', view: 'storageview' }, { button: 'iconview-button', view: 'iconview' }].map(function (parameters) {
                    parameters.name = 'view for ' + parameters.button + ' is ' + parameters.view + ' and ' + (parameters.missing ? 'missing' : 'shown');return parameters;
                  }), 't0', 1);

                case 1:
                case 'end':
                  return _context8.stop();
              }
            }
          }, iteration, this);
        })
      }, {
        key: 'operation',
        value: function operation(parameters) {
          var self, button;
          return regeneratorRuntime.async(function operation$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  self = this;
                  button = self.panel.$[parameters.button];

                  self.pages = Polymer.dom(self.panel.$.panelarea).querySelector('iron-pages.panel-selector');

                  if (!parameters.missing) {
                    _context9.next = 8;
                    break;
                  }

                  _context9.next = 6;
                  return regeneratorRuntime.awrap(self.forEvent(self.pages, 'iron-deselect', function () {
                    MockInteractions.tap(button);
                  }, function (element, type, event) {
                    return self.pages.selected === parameters.view;
                  }));

                case 6:
                  _context9.next = 10;
                  break;

                case 8:
                  _context9.next = 10;
                  return regeneratorRuntime.awrap(self.forEvent(self.pages, 'iron-select', function () {
                    MockInteractions.tap(button);
                  }, function (element, type, event) {
                    return self.pages.selected === parameters.view;
                  }));

                case 10:
                case 'end':
                  return _context9.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint(parameters) {
          var selectedViews;
          return regeneratorRuntime.async(function checkpoint$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  assert.equal(this.pages.selected, parameters.view, parameters.view + ' is selected by ' + parameters.button);
                  selectedViews = Polymer.dom(this.pages).querySelectorAll('.iron-selected');

                  if (parameters.missing) {
                    assert.equal(selectedViews.length, 0, 'No selected view for ' + parameters.view);
                  } else {
                    assert.equal(selectedViews.length, 1, 'Only 1 selected view for ' + parameters.view);
                    assert.equal(selectedViews[0].getAttribute('name'), parameters.view, parameters.view + ' is selected');
                  }

                case 3:
                case 'end':
                  return _context10.stop();
              }
            }
          }, null, this);
        }
      }]);

      return PanelViewTest;
    }(base);
  };
  panel.test = function (base) {
    return function (_base5) {
      _inherits(SelectIconView, _base5);

      function SelectIconView() {
        _classCallCheck(this, SelectIconView);

        return _possibleConstructorReturn(this, (SelectIconView.__proto__ || Object.getPrototypeOf(SelectIconView)).apply(this, arguments));
      }

      _createClass(SelectIconView, [{
        key: 'operation',
        value: function operation() {
          var self, button;
          return regeneratorRuntime.async(function operation$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  self = this;
                  button = self.panel.$['iconview-button'];

                  self.pages = Polymer.dom(self.panel.$.panelarea).querySelector('iron-pages.panel-selector');

                  if (!(self.pages.selected !== 'iconview')) {
                    _context11.next = 6;
                    break;
                  }

                  _context11.next = 6;
                  return regeneratorRuntime.awrap(self.forEvent(self.pages, 'iron-select', function () {
                    MockInteractions.tap(button);
                  }, function (element, type, event) {
                    return self.pages.selected === 'iconview';
                  }));

                case 6:
                case 'end':
                  return _context11.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  assert.equal(Polymer.dom(this.pages).querySelector('.iron-selected').getAttribute('name'), 'iconview', 'iconview is shown');

                case 1:
                case 'end':
                  return _context12.stop();
              }
            }
          }, null, this);
        }
      }]);

      return SelectIconView;
    }(base);
  };
  panel.test = function (base) {
    return function (_base6) {
      _inherits(SelectListView, _base6);

      function SelectListView() {
        _classCallCheck(this, SelectListView);

        return _possibleConstructorReturn(this, (SelectListView.__proto__ || Object.getPrototypeOf(SelectListView)).apply(this, arguments));
      }

      _createClass(SelectListView, [{
        key: 'operation',
        value: function operation() {
          var self, button;
          return regeneratorRuntime.async(function operation$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  self = this;
                  button = self.panel.$['listview-button'];

                  self.pages = Polymer.dom(self.panel.$.panelarea).querySelector('iron-pages.panel-selector');

                  if (!(self.pages.selected !== 'listview')) {
                    _context13.next = 6;
                    break;
                  }

                  _context13.next = 6;
                  return regeneratorRuntime.awrap(self.forEvent(self.pages, 'iron-select', function () {
                    MockInteractions.tap(button);
                  }, function (element, type, event) {
                    return self.pages.selected === 'listview';
                  }));

                case 6:
                case 'end':
                  return _context13.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context14) {
            while (1) {
              switch (_context14.prev = _context14.next) {
                case 0:
                  assert.equal(Polymer.dom(this.pages).querySelector('.iron-selected').getAttribute('name'), 'listview', 'listview is shown');

                case 1:
                case 'end':
                  return _context14.stop();
              }
            }
          }, null, this);
        }
      }]);

      return SelectListView;
    }(base);
  };
  panel.test = function (base) {
    return function (_base7) {
      _inherits(SelectStorageView, _base7);

      function SelectStorageView() {
        _classCallCheck(this, SelectStorageView);

        return _possibleConstructorReturn(this, (SelectStorageView.__proto__ || Object.getPrototypeOf(SelectStorageView)).apply(this, arguments));
      }

      _createClass(SelectStorageView, [{
        key: 'operation',
        value: function operation() {
          var self, button;
          return regeneratorRuntime.async(function operation$(_context15) {
            while (1) {
              switch (_context15.prev = _context15.next) {
                case 0:
                  self = this;
                  button = self.panel.$['storageview-button'];

                  self.pages = Polymer.dom(self.panel.$.panelarea).querySelector('iron-pages.panel-selector');

                  if (!(self.pages.selected !== 'storageview')) {
                    _context15.next = 6;
                    break;
                  }

                  _context15.next = 6;
                  return regeneratorRuntime.awrap(self.forEvent(self.pages, 'iron-select', function () {
                    MockInteractions.tap(button);
                  }, function (element, type, event) {
                    return self.pages.selected === 'storageview';
                  }));

                case 6:
                case 'end':
                  return _context15.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context16) {
            while (1) {
              switch (_context16.prev = _context16.next) {
                case 0:
                  assert.equal(Polymer.dom(this.pages).querySelector('.iron-selected').getAttribute('name'), 'storageview', 'storageview is shown');

                case 1:
                case 'end':
                  return _context16.stop();
              }
            }
          }, null, this);
        }
      }]);

      return SelectStorageView;
    }(base);
  };
  panel.test = function (base) {
    return function (_base8) {
      _inherits(FileLoadButtonTest, _base8);

      function FileLoadButtonTest() {
        _classCallCheck(this, FileLoadButtonTest);

        return _possibleConstructorReturn(this, (FileLoadButtonTest.__proto__ || Object.getPrototypeOf(FileLoadButtonTest)).apply(this, arguments));
      }

      _createClass(FileLoadButtonTest, [{
        key: 'operation',
        value: function operation() {
          var self, button;
          return regeneratorRuntime.async(function operation$(_context17) {
            while (1) {
              switch (_context17.prev = _context17.next) {
                case 0:
                  self = this;
                  button = self.panel.$.load;

                  self.mockStorage = self.model.storage['file-storage'];
                  self.mockStorage.load = function load(event) {
                    self.loadEvent = event;
                  };
                  MockInteractions.tap(button);

                case 5:
                case 'end':
                  return _context17.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint(parameters) {
          return regeneratorRuntime.async(function checkpoint$(_context18) {
            while (1) {
              switch (_context18.prev = _context18.next) {
                case 0:
                  assert.equal(this.mockStorage.selected, true, 'fileStorage.selected is true');
                  assert.equal(this.loadEvent.type, 'tap', 'load file via a "tap" event');

                case 2:
                case 'end':
                  return _context18.stop();
              }
            }
          }, null, this);
        }
      }], [{
        key: 'reconnectable',
        get: function get() {
          return false;
        }
      }]);

      return FileLoadButtonTest;
    }(base);
  };
  panel.test = function (base) {
    return function (_base9) {
      _inherits(LocalesButtonTest, _base9);

      function LocalesButtonTest() {
        _classCallCheck(this, LocalesButtonTest);

        return _possibleConstructorReturn(this, (LocalesButtonTest.__proto__ || Object.getPrototypeOf(LocalesButtonTest)).apply(this, arguments));
      }

      _createClass(LocalesButtonTest, [{
        key: 'operation',
        value: function operation() {
          var self, button;
          return regeneratorRuntime.async(function operation$(_context19) {
            while (1) {
              switch (_context19.prev = _context19.next) {
                case 0:
                  self = this;
                  button = Polymer.dom(self.panel.root).querySelector('paper-icon-button#locales');

                  self.mockModel = self.model;
                  self.mockModel.fetch = function fetch() {
                    self.fetched = true;
                  };
                  MockInteractions.tap(button);

                case 5:
                case 'end':
                  return _context19.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint(parameters) {
          return regeneratorRuntime.async(function checkpoint$(_context20) {
            while (1) {
              switch (_context20.prev = _context20.next) {
                case 0:
                  assert.isOk(this.fetched, 'model.fetched() via locales button');

                case 1:
                case 'end':
                  return _context20.stop();
              }
            }
          }, null, this);
        }
      }], [{
        key: 'reconnectable',
        get: function get() {
          return false;
        }
      }]);

      return LocalesButtonTest;
    }(base);
  };
  panel.test = function (base) {
    return function (_base10) {
      _inherits(CleanupSessionStorage, _base10);

      function CleanupSessionStorage() {
        _classCallCheck(this, CleanupSessionStorage);

        return _possibleConstructorReturn(this, (CleanupSessionStorage.__proto__ || Object.getPrototypeOf(CleanupSessionStorage)).apply(this, arguments));
      }

      _createClass(CleanupSessionStorage, [{
        key: 'setup',
        value: function setup() {
          return regeneratorRuntime.async(function setup$(_context21) {
            while (1) {
              switch (_context21.prev = _context21.next) {
                case 0:
                  _context21.next = 2;
                  return regeneratorRuntime.awrap(_get(CleanupSessionStorage.prototype.__proto__ || Object.getPrototypeOf(CleanupSessionStorage.prototype), 'setup', this).call(this));

                case 2:
                  if (!this.hasToSkip) {
                    _context21.next = 5;
                    break;
                  }

                  this.initialReloadUrl = window.sessionStorage.getItem('live-localizer-reload-url');
                  return _context21.abrupt('return');

                case 5:
                  window.sessionStorage.removeItem('live-localizer-reload-url');

                case 6:
                case 'end':
                  return _context21.stop();
              }
            }
          }, null, this);
        }
      }]);

      return CleanupSessionStorage;
    }(base);
  };
  panel.test = function (base) {
    return function (_base11) {
      _inherits(OpenDialogOnReload, _base11);

      function OpenDialogOnReload() {
        _classCallCheck(this, OpenDialogOnReload);

        return _possibleConstructorReturn(this, (OpenDialogOnReload.__proto__ || Object.getPrototypeOf(OpenDialogOnReload)).apply(this, arguments));
      }

      _createClass(OpenDialogOnReload, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context22) {
            while (1) {
              switch (_context22.prev = _context22.next) {
                case 0:
                  self = this;

                  if (!this.hasToSkip) {
                    _context22.next = 5;
                    break;
                  }

                  _context22.next = 4;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return self.dialog.opened;
                  }, 200, 100));

                case 4:
                  return _context22.abrupt('return');

                case 5:
                  _context22.next = 7;
                  return regeneratorRuntime.awrap(self.forEvent(self.dialog, 'neon-animation-finish', function () {
                    MockInteractions.tap(self.fab);
                  }, true));

                case 7:
                  _context22.next = 9;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return self.model.lastModified;
                  }, 200, 100));

                case 9:
                  self.model.lastModified = new Date(0).toUTCString(); // Make the next fetch result updated
                  _context22.next = 12;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return self.model.serverUpdated;
                  }, 1000, 70));

                case 12:
                case 'end':
                  return _context22.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          var self;
          return regeneratorRuntime.async(function checkpoint$(_context23) {
            while (1) {
              switch (_context23.prev = _context23.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context23.next = 2;
                    break;
                  }

                  return _context23.abrupt('return');

                case 2:
                  self = this;

                  assert.isOk(self.dialog.opened, 'dialog is opened');
                  assert.isNotOk(self.fab.opened, 'fab is not opened');

                case 5:
                case 'end':
                  return _context23.stop();
              }
            }
          }, null, this);
        }
      }]);

      return OpenDialogOnReload;
    }(base);
  };
  panel.test = function (base) {
    return function (_base12) {
      _inherits(ReloadButtonTest, _base12);

      function ReloadButtonTest() {
        _classCallCheck(this, ReloadButtonTest);

        return _possibleConstructorReturn(this, (ReloadButtonTest.__proto__ || Object.getPrototypeOf(ReloadButtonTest)).apply(this, arguments));
      }

      _createClass(ReloadButtonTest, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context24) {
            while (1) {
              switch (_context24.prev = _context24.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context24.next = 2;
                    break;
                  }

                  return _context24.abrupt('return');

                case 2:
                  self = this;

                  self.reloadButton = Polymer.dom(self.panel.root).querySelector('paper-icon-button#reload');
                  self.reloaded = false;
                  self.mockModel = self.model;
                  self.mockModel._reload = function () {
                    self.reloaded = true;
                    self.reloadUrl = window.sessionStorage.getItem('live-localizer-reload-url');
                  };
                  self.initialReloadUrl = window.sessionStorage.getItem('live-localizer-reload-url');
                  self.currentHref = window.location.href;
                  MockInteractions.tap(self.reloadButton);
                  _context24.next = 12;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return self.reloaded;
                  }, 200, 100));

                case 12:
                case 'end':
                  return _context24.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint(parameters) {
          return regeneratorRuntime.async(function checkpoint$(_context25) {
            while (1) {
              switch (_context25.prev = _context25.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context25.next = 2;
                    break;
                  }

                  return _context25.abrupt('return');

                case 2:
                  assert.isOk(this.reloaded, 'model.reload() via reload button');
                  assert.isNotOk(this.initialReloadUrl, 'initial live-localizer-reload-url is empty');
                  assert.equal(this.reloadUrl, this.currentHref, 'sessionStorage live-localizer-reload-url is "' + this.currentHref + '"');

                case 5:
                case 'end':
                  return _context25.stop();
              }
            }
          }, null, this);
        }
      }], [{
        key: 'reconnectable',
        get: function get() {
          return false;
        }
      }]);

      return ReloadButtonTest;
    }(base);
  };
  panel.test = function (base) {
    return function (_base13) {
      _inherits(ReloadButtonTest2, _base13);

      function ReloadButtonTest2() {
        _classCallCheck(this, ReloadButtonTest2);

        return _possibleConstructorReturn(this, (ReloadButtonTest2.__proto__ || Object.getPrototypeOf(ReloadButtonTest2)).apply(this, arguments));
      }

      _createClass(ReloadButtonTest2, [{
        key: 'operation',
        value: function operation() {
          var self;
          return regeneratorRuntime.async(function operation$(_context26) {
            while (1) {
              switch (_context26.prev = _context26.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context26.next = 2;
                    break;
                  }

                  return _context26.abrupt('return');

                case 2:
                  self = this;

                  self.currentHref = window.location.href;
                  _context26.next = 6;
                  return regeneratorRuntime.awrap(self.checkInterval(function () {
                    return !(self.reloadUrl = window.sessionStorage.getItem('live-localizer-reload-url'));
                  }, 200, 100));

                case 6:
                case 'end':
                  return _context26.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint(parameters) {
          return regeneratorRuntime.async(function checkpoint$(_context27) {
            while (1) {
              switch (_context27.prev = _context27.next) {
                case 0:
                  if (!this.hasToSkip) {
                    _context27.next = 2;
                    break;
                  }

                  return _context27.abrupt('return');

                case 2:
                  assert.isOk(this.dialog.opened, 'dialog is opened');
                  assert.isNotOk(this.fab.opened, 'fab is not opened');
                  assert.isNotOk(this.reloadUrl, 'sessionStorage live-localizer-reload-url is cleared');
                  assert.equal(this.currentHref, this.initialReloadUrl, 'location.href is "' + this.reloadUrl + '"');

                case 6:
                case 'end':
                  return _context27.stop();
              }
            }
          }, null, this);
        }
      }]);

      return ReloadButtonTest2;
    }(base);
  };
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
      SelectIconView: '',
      SelectListView: '',
      SelectStorageView: ''
    },
    InstantiateTest: {
      CleanupSessionStorage: {
        OpenDialogOnReload: {
          ReloadButtonTest: {
            Reload: {
              ReloadButtonTest2: 'MockReloadButtonTest_phase_1; Reload button test (mock)'
            }
          }
        }
      }
    }
  };
} // panel scope