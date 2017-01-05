var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
// global test classes
var LiveLocalizerSuite = function (_Suite) {
  _inherits(LiveLocalizerSuite, _Suite);

  function LiveLocalizerSuite() {
    _classCallCheck(this, LiveLocalizerSuite);

    return _possibleConstructorReturn(this, (LiveLocalizerSuite.__proto__ || Object.getPrototypeOf(LiveLocalizerSuite)).apply(this, arguments));
  }

  _createClass(LiveLocalizerSuite, [{
    key: 'setup',

    // TODO: Can setup be converted to operation?
    value: function setup() {
      return regeneratorRuntime.async(function setup$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(_get(LiveLocalizerSuite.prototype.__proto__ || Object.getPrototypeOf(LiveLocalizerSuite.prototype), 'setup', this).call(this));

            case 2:
              this.container = document.querySelector(this.target);

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: 'teardown',
    value: function teardown() {
      var self;
      return regeneratorRuntime.async(function teardown$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              self = this;
              _context2.next = 3;
              return regeneratorRuntime.awrap(_get(LiveLocalizerSuite.prototype.__proto__ || Object.getPrototypeOf(LiveLocalizerSuite.prototype), 'teardown', this).call(this));

            case 3:
              _context2.next = 5;
              return regeneratorRuntime.awrap(self.forEvent(self.container, 'dom-change', function () {
                self.container.if = false;
              }, true));

            case 5:
            case 'end':
              return _context2.stop();
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

  return LiveLocalizerSuite;
}(Suite);

var InstantiateTest = function (_LiveLocalizerSuite) {
  _inherits(InstantiateTest, _LiveLocalizerSuite);

  function InstantiateTest() {
    _classCallCheck(this, InstantiateTest);

    return _possibleConstructorReturn(this, (InstantiateTest.__proto__ || Object.getPrototypeOf(InstantiateTest)).apply(this, arguments));
  }

  _createClass(InstantiateTest, [{
    key: 'operation',
    value: function operation() {
      var self;
      return regeneratorRuntime.async(function operation$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              self = this;
              _context3.next = 3;
              return regeneratorRuntime.awrap(self.forEvent(self.container, 'dom-change', function () {
                self.container.if = true;
              }, true));

            case 3:
              self.element = document.querySelector('live-localizer');
              _context3.next = 6;
              return regeneratorRuntime.awrap(self.forEvent(self.element, 'bundle-set-fetched'));

            case 6:
              self.main = Polymer.dom(self.element.root).querySelector('live-localizer-main');
              self.fab = Polymer.dom(self.main.root).querySelector('live-localizer-fab');
              self.dialog = Polymer.dom(self.main.root).querySelector('live-localizer-dialog');
              self.panel = Polymer.dom(self.main.root).querySelector('live-localizer-panel');
              self.model = Polymer.dom(self.panel.root).querySelector('live-localizer-model');
              self.iconView = Polymer.dom(self.panel.root).querySelector('live-localizer-locale-icon-view');
              self.listView = Polymer.dom(self.panel.root).querySelector('live-localizer-list-view');
              self.storageView = Polymer.dom(self.panel.root).querySelector('live-localizer-storage-view');

            case 14:
            case 'end':
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: 'checkpoint',
    value: function checkpoint() {
      var self;
      return regeneratorRuntime.async(function checkpoint$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              self = this;
              // element existence

              assert.isOk(self.element, 'live-localizer exists');
              assert.isOk(self.main, 'live-localizer-main exists');
              assert.isOk(self.fab, 'live-localizer-fab exists');
              assert.isOk(self.dialog, 'live-localizer-dialog exists');
              assert.isOk(self.panel, 'live-localizer-panel exists');
              assert.isOk(self.model, 'live-localizer-model exists');
              assert.isOk(self.iconView, 'live-localizer-locale-icon-view exists');
              assert.isOk(self.listView, 'live-localizer-list-view exists');
              assert.isOk(self.storageView, 'live-localizer-storage-view exists');
              // elements are instantiated
              assert.equal(self.element.is, 'live-localizer');
              assert.equal(self.main.is, 'live-localizer-main');
              assert.equal(self.fab.is, 'live-localizer-fab');
              assert.equal(self.dialog.is, 'live-localizer-dialog');
              assert.equal(self.panel.is, 'live-localizer-panel');
              assert.equal(self.model.is, 'live-localizer-model');
              assert.equal(self.iconView.is, 'live-localizer-locale-icon-view');
              assert.equal(self.listView.is, 'live-localizer-list-view');
              assert.equal(self.storageView.is, 'live-localizer-storage-view');
              // dialog status
              assert.isNotOk(self.dialog.opened, 'dialog is not opened');
              assert.isOk(self.fab.opened, 'fab is opened');

            case 21:
            case 'end':
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }]);

  return InstantiateTest;
}(LiveLocalizerSuite);