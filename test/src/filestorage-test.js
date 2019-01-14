/*
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import Suite from 'scenarist/Suite.mjs';
import './storageview-test.js';

import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
  // filestorage scope (subscope of storageview)
  let scope = 'filestorage';
  let filestorage = new Suite(scope, 'live-localizer local file storage tests');
  filestorage.htmlSuite = 'live-localizer';
  filestorage.test = Suite.scopes.storageview.classes.SelectStorageView;
  filestorage.test = Suite.scopes.panel.classes.SelectIconView;
  filestorage.test = Suite.scopes.panel.mixins.SelectStorageView;
  filestorage.test = Suite.scopes.browserstorage.mixins.SelectLocaleIcon;
  filestorage.test = Suite.scopes.common.mixins.Reload;
  filestorage.test = (base) => class FileStorageSuite extends base {
    async setup() {
      await super.setup();
      if (this.hasToSkip) { return; }
    }
    async operation() {
      let self = this;
      self.localeIcon = self.storageView.$['locale-icon'];
      self.storageIcon = dom(self.fileStorage.root).querySelector('live-localizer-storage-icon');
      self.iconTooltip = dom(self.storageIcon.root).querySelector('paper-tooltip[for=card]');
      self.tooltip = self.fileStorage.$.tooltip;
      self.checkboxes = Array.prototype.reduce.call(dom(self.fileStorage.root).querySelectorAll('paper-checkbox'),
        (acc, curr) => { acc[curr.textContent.trim()] = curr; return acc; }, {});
    }
    async toggleCheckbox(checkbox) {
      let self = this;
      let checkedProperty = {
        'Save with Timestamp': 'prefix',
        'Watch and Load XLIFF': 'watcherEnabled'
      }[checkbox.textContent.trim()];
      let prevChecked = self.fileStorage[checkedProperty];
      await self.forEvent(checkbox, 'checked-changed', () => { MockInteractions.tap(checkbox); }, (element, type, event) => !!prevChecked === !self.fileStorage[checkedProperty]);
      let count = 1;
      await self.checkInterval(() => count-- > 0, 200, 1); // wait for CSS animation (140ms) to finish
    }
  }
  filestorage.test = (base) => class CheckboxTest extends base {
    * iteration() {
      yield *[
        // Initial state: { prefix: false, watcherEnabled: false }
        { label: 'Save with Timestamp', expected: { prefix: true, watcherEnabled: false } },
        { label: 'Watch and Load XLIFF', expected: { prefix: true, watcherEnabled: true } },
        { label: 'Save with Timestamp', expected: { prefix: false, watcherEnabled: true } },
        { label: 'Watch and Load XLIFF', expected: { prefix: false, watcherEnabled: false } }
      ].map((parameters) => { parameters.name = parameters.label + ' checkbox is toggled'; return parameters });
    }
    async operation(parameters) {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.toggleCheckbox(self.checkboxes[parameters.label]);
    }
    async checkpoint(parameters) {
      if (this.hasToSkip) { return; }
      for (let prop in parameters.expected) {
        assert.equal(this.fileStorage[prop], parameters.expected[prop], prop + ' is ' + parameters.expected[prop]);
      }
    }
  }
  filestorage.test = (base) => class EnableTimestampPrefix extends base {
    * iteration() {
      yield *[
        // Initial state: { prefix: false, watcherEnabled: false }
        { label: 'Save with Timestamp', expected: { prefix: true, watcherEnabled: false } }
      ].map((parameters) => { parameters.name = parameters.label + ' checkbox is toggled'; return parameters });
    }
    async operation(parameters) {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.toggleCheckbox(self.checkboxes[parameters.label]);
    }
    async checkpoint(parameters) {
      if (this.hasToSkip) { return; }
      for (let prop in parameters.expected) {
        assert.equal(this.fileStorage[prop], parameters.expected[prop], prop + ' is ' + parameters.expected[prop]);
      }
    }
  }
  filestorage.test = (base) => class EnableWatcherCheckbox extends base {
    * iteration() {
      yield *[
        // Initial state: { prefix: false, watcherEnabled: false }
        { label: 'Watch and Load XLIFF', expected: { prefix: false, watcherEnabled: true } }
      ].map((parameters) => { parameters.name = parameters.label + ' checkbox is toggled'; return parameters });
    }
    async operation(parameters) {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.toggleCheckbox(self.checkboxes[parameters.label]);
    }
    async checkpoint(parameters) {
      if (this.hasToSkip) { return; }
      for (let prop in parameters.expected) {
        assert.equal(this.fileStorage[prop], parameters.expected[prop], prop + ' is ' + parameters.expected[prop]);
      }
    }
  }
  filestorage.test = (base) => class DisableWatcherCheckbox extends base {
    * iteration() {
      yield *[
        // Initial state: { prefix: false, watcherEnabled: true }
        { label: 'Watch and Load XLIFF', expected: { prefix: false, watcherEnabled: false } }
      ].map((parameters) => { parameters.name = parameters.label + ' checkbox is toggled'; return parameters });
    }
    async operation(parameters) {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.toggleCheckbox(self.checkboxes[parameters.label]);
      await self.checkInterval(() => !self.fileStorage.watching, 200, 100);
    }
    async checkpoint(parameters) {
      if (this.hasToSkip) { return; }
      for (let prop in parameters.expected) {
        assert.equal(this.fileStorage[prop], parameters.expected[prop], prop + ' is ' + parameters.expected[prop]);
      }
    }
  }
  filestorage.test = (base) => class FileStorageUnselectedIconTooltipTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.showTooltip(self.storageIcon.$.card, self.iconTooltip);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.iconTooltip.getAttribute('for'), 'card', 'paper-tooltip should be for card');
      assert.equal(this.iconTooltip.textContent.trim(), 'Select XLIFF', 'tooltip should be "Select XLIFF"');
    }
  }
  filestorage.test = (base) => class FileStorageSelectedIconTooltipTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.showTooltip(self.storageIcon.$.card, self.iconTooltip);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.iconTooltip.getAttribute('for'), 'card', 'paper-tooltip should be for card');
      assert.equal(this.iconTooltip.textContent.trim(), 'Drag to Load', 'tooltip should be "Drag to Load"');
    }
  }
  filestorage.test = (base) => class MockFileStorageSaveTest extends base {
    static get reconnectable() { return false; }
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      self.mockAnchor = self.fileStorage.$.anchor;
      self.mockAnchor.click = function () {
        self.downloadFileName = self.mockAnchor.download;
        self.downloadBlobUrl = self.mockAnchor.href;
        self.anchorClicked = true;
      }
      self.anchorClicked = false;
      await self.dragDrop(self.localeIcon, self.storageIcon, 0, 120, 'drop', 'neon-animation-finish', self.localeIcon, (element, type, event) => true);
      await self.checkInterval(() => self.anchorClicked, 200, 100);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.dragDropEvent.detail.src, this.localeIcon, 'drag source is locale icon');
      assert.equal(this.dragDropEvent.detail.dest, this.storageIcon, 'drag destination is local file storage icon');
      assert.equal(this.downloadFileName, 'bundle.de.xlf', 'download file name is "bundle.de.xlf"');
      assert.isOk(this.downloadBlobUrl, 'download blob url is set');
      assert.isOk(this.downloadBlobUrl.match(/^blob:http/), 'download blob url is set');
    }
  }
  filestorage.test = (base) => class MockFileStorageSaveTest2 extends base {
    static get reconnectable() { return false; }
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      self.mockAnchor = self.fileStorage.$.anchor;
      self.mockAnchor.click = function () {
        self.downloadFileName = self.mockAnchor.download;
        self.downloadBlobUrl = self.mockAnchor.href;
        self.anchorClicked = true;
      }
      self.anchorClicked = false;
      await self.dragDrop(self.localeIcon, self.storageIcon, 0, 120, 'drop', 'neon-animation-finish', self.localeIcon, (element, type, event) => true);
      await self.checkInterval(() => self.anchorClicked, 200, 100);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.dragDropEvent.detail.src, this.localeIcon, 'drag source is locale icon');
      assert.equal(this.dragDropEvent.detail.dest, this.storageIcon, 'drag destination is local file storage icon');
      assert.isOk(this.downloadFileName.match(/^[0-9]*-bundle.de.xlf$/), 'download file name is prefixed "[0-9]*-bundle.de.xlf"');
      assert.isOk(this.downloadBlobUrl, 'download blob url is set');
      assert.isOk(this.downloadBlobUrl.match(/^blob:http/), 'download blob url is set');
    }
  }
  filestorage.test = (base) => class FileStorageLoadTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.checkInterval(() => { console.log(self.fileStorage.label); return self.fileStorage.label === 'bundle.de.xlf'; }, 200, 200);
      self.loadEvent = undefined;
      await self.dragDrop(self.storageIcon, self.localeIcon, 0, 120, 'drop', 'load-xliff', self.model, (element, type, event) => {
        self.loadEvent = event; return true;
      });
      await self.checkInterval(() => { console.log(self.dragDropEvent); return self.dragDropEvent }, 200, 150);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.dragDropEvent.detail.src, this.storageIcon, 'drag source is file storage icon');
      assert.equal(this.dragDropEvent.detail.dest, this.localeIcon, 'drag destination is locale icon');
      assert.equal(this.loadEvent.type, 'load-xliff', 'load-xliff event is fired');
      assert.equal(this.loadEvent.detail.locale, 'de', 'load-xliff locale is de');
      assert.equal(this.fileStorage.label, 'Local File', 'file storage icon label is "Local File"');
    }
  }
  filestorage.test = (base) => class FileStorageLoadTest2 extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.checkInterval(() => { console.log(self.fileStorage.label); return !!self.fileStorage.label.match(/^[0-9]*-bundle.de.xlf$/); }, 200, 200);
      self.loadEvent = undefined;
      await self.dragDrop(self.storageIcon, self.localeIcon, 0, 120, 'drop', 'load-xliff', self.model, (element, type, event) => {
        self.loadEvent = event; return true;
      });
      await self.checkInterval(() => { console.log(self.dragDropEvent); return self.dragDropEvent }, 200, 150);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.dragDropEvent.detail.src, this.storageIcon, 'drag source is file storage icon');
      assert.equal(this.dragDropEvent.detail.dest, this.localeIcon, 'drag destination is locale icon');
      assert.equal(this.loadEvent.type, 'load-xliff', 'load-xliff event is fired');
      assert.equal(this.loadEvent.detail.locale, 'de', 'load-xliff locale is de');
      assert.equal(this.fileStorage.label, 'Local File', 'file storage icon label is "Local File"');
    }
  }
  filestorage.test = (base) => class MockFileStorageUploadTest extends base {
    static get reconnectable() { return false; }
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      self.mockFileLoader = self.fileStorage.$.fileLoad;
      self.mockFileLoader.click = function () {
        self.fileLoaderClicked = true;
      }
      self.fileLoaderClicked = false;
      MockInteractions.tap(self.storageIcon);
      await self.checkInterval(() => self.fileLoaderClicked, 200, 100);
      let mockXliffName = 'bundle.de.xlf';
      self._xhr = new XMLHttpRequest();
      await new Promise((resolve, reject) => {
        let onLoad = function (e) {
          self.mockXliff = self._xhr.responseText;
          self._xhr.removeEventListener('load', onLoad);
          self._xhr.removeEventListener('error', onLoad);
          resolve(self.mockXliff);
        }
        let onError = function (e) {
          self.mockXliff = '';
          self._xhr.removeEventListener('load', onLoad);
          self._xhr.removeEventListener('error', onLoad);
          reject(e);
        }
        self._xhr.addEventListener('load', onLoad);
        self._xhr.addEventListener('error', onError);
        self.mockXliffUrl = './xliff/' + mockXliffName;
        self._xhr.open('GET', self.mockXliffUrl);
        self.mockXliff = undefined;
        self._xhr.send();
      });
      delete self._xhr;
      self.mockFile = new Blob([self.mockXliff], { type: 'application/x-xliff+xml' });
      self.mockFile.name = mockXliffName;
      self.mockChangeEvent = {
        type: 'change',
        target: {
          files: [self.mockFile]
        },
        preventDefault: () => {}
      };
      self.fileStorage.onFileChange(self.mockChangeEvent); // Note: input.files = new FileList([self.mockFile]) is illegal
      await self.checkInterval(() => self.fileStorage.label === mockXliffName, 200, 200);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.isOk(this.fileLoaderClicked, 'local file selection dialog is opened (mock)');
      assert.equal(this.fileStorage.label, 'bundle.de.xlf', 'local file is uploaded (mock)');
    }
  }
  filestorage.test = (base) => class FileStorageDropTooltipTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      self.dropTooltip = self.fileStorage.$.droptooltip;
      await self.showTooltip(self.fileStorage.$.droparea, self.dropTooltip);
      self.tooltipMessage = self.dropTooltip.textContent.trim();
      await self.checkInterval(() => self.dropTooltip.$.tooltip.classList.contains('hidden'), 200, 200);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.tooltipMessage, 'Drag and drop XLIFF to select', 'drop tooltip should be "Drag and drop XLIFF to select"');
    }
  }
  filestorage.test = (base) => class MockFileStorageDropTest extends base {
    static get reconnectable() { return false; }
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      let mouseEventInit = {
        bubbles: false,
        cancelable: true,
        clientX: 0,
        clientY: 0,
        buttons: 1
      };
      self.droparea = self.fileStorage.$.droparea;
      self.droparea.dispatchEvent(new MouseEvent('dragover', mouseEventInit));
      let mockXliffName = 'bundle.de.xlf';
      self._xhr = new XMLHttpRequest();
      await new Promise((resolve, reject) => {
        let onLoad = function (e) {
          self.mockXliff = self._xhr.responseText;
          self._xhr.removeEventListener('load', onLoad);
          self._xhr.removeEventListener('error', onLoad);
          resolve(self.mockXliff);
        }
        let onError = function (e) {
          self.mockXliff = '';
          self._xhr.removeEventListener('load', onLoad);
          self._xhr.removeEventListener('error', onLoad);
          reject(e);
        }
        self._xhr.addEventListener('load', onLoad);
        self._xhr.addEventListener('error', onError);
        self.mockXliffUrl = './xliff/' + mockXliffName;
        self._xhr.open('GET', self.mockXliffUrl);
        self.mockXliff = undefined;
        self._xhr.send();
      });
      delete self._xhr;
      self.mockFile = new Blob([self.mockXliff], { type: 'application/x-xliff+xml' });
      self.mockFile.name = mockXliffName;
      self.mockDropEvent = new MouseEvent('drop', mouseEventInit);
      Object.defineProperty(self.mockDropEvent, 'dataTransfer', { value: { files: [self.mockFile] } });
      self.droparea.dispatchEvent(self.mockDropEvent);
      await self.checkInterval(() => self.fileStorage.label === mockXliffName, 200, 200);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.fileStorage.label, 'bundle.de.xlf', 'local file is dropped (mock)');
    }
  }
  filestorage.test = (base) => class FileStorageConfigureWatcher extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      if (window.location.hostname !== 'localhost') {
        return; // Assuming the test host is localhost
      }
      // configure watcher to fetch file from WCT
      self.fileStorage.watchPort = window.location.port;
      self.fileStorage.watchPath = window.location.pathname.replace(/[\/][^\/]*$/, '/') + 'updated-xliff/';
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
    }
  }
  filestorage.test = (base) => class FileStorageConfigureWatcherError extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      if (window.location.hostname !== 'localhost') {
        return; // Assuming the test host is localhost
      }
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
    }
  }
  filestorage.test = (base) => class FileStorageConfigureWatcherIncompleteXliff extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      if (window.location.hostname !== 'localhost') {
        return; // Assuming the test host is localhost
      }
      // configure watcher to fetch file from WCT
      self.fileStorage.watchPort = window.location.port;
      self.fileStorage.watchPath = window.location.pathname.replace(/[\/][^\/]*$/, '/') + 'incomplete-xliff/';
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
    }
  }
  filestorage.test = (base) => class FileStorageConfigureWatcherFileNotFound extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      if (window.location.hostname !== 'localhost') {
        return; // Assuming the test host is localhost
      }
      // configure watcher to fetch file from WCT
      self.fileStorage.watchPort = window.location.port;
      self.fileStorage.watchPath = window.location.pathname.replace(/[\/][^\/]*$/, '/') + 'inexistent-xliff/';
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
    }
  }
  filestorage.test = (base) => class FileStorageWatchingFileTooltip extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      if (window.location.hostname !== 'localhost') {
        return; // Assuming the test host is localhost
      }
      self.tooltipMessage = '';
      await self.forEvent(self.tooltip.$.tooltip, 'animationend'/*'neon-animation-finish'*/, () => {}, (element, type, event) => {
        return self.tooltipMessage = self.tooltip.textContent.trim();
      });
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      if (window.location.hostname !== 'localhost') {
        return; // Assuming the test host is localhost
      }
      assert.isOk(this.tooltipMessage.match(/^Watching http:/), 'tooltip should be "Watching http..."');
    }
  }
  filestorage.test = (base) => class FileStorageWatchingFileTooltip2 extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      if (window.location.hostname !== 'localhost') {
        return; // Assuming the test host is localhost
      }
      self.tooltipMessage = '';
      await self.forEvent(self.tooltip.$.tooltip, 'animationend'/*'neon-animation-finish'*/, () => { self.fileStorage.lastModified = (new Date(0)).toUTCString(); }, (element, type, event) => {
        self.tooltipMessage = self.tooltip.textContent.trim();
        console.log(self.tooltipMessage);
        return self.tooltipMessage && self.tooltipMessage.match(/^Detected Change in /);
      });
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      if (window.location.hostname !== 'localhost') {
        return; // Assuming the test host is localhost
      }
      assert.isOk(this.tooltipMessage.match(/^Detected Change in /), 'tooltip should be "Detected Change in http..."');
    }
  }
  filestorage.test = (base) => class FileStorageWatchingFileTooltip3 extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      if (window.location.hostname !== 'localhost') {
        return; // Assuming the test host is localhost
      }
      self.tooltipMessage = '';
      await self.forEvent(self.tooltip.$.tooltip, 'animationend'/*'neon-animation-finish'*/, () => { self.fileStorage.lastModified = (new Date(0)).toUTCString(); }, (element, type, event) => {
        self.tooltipMessage = self.tooltip.textContent.trim();
        console.log(self.tooltipMessage);
        return self.tooltipMessage && self.tooltipMessage.match(/^Error in watching /);
      });
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      if (window.location.hostname !== 'localhost') {
        return; // Assuming the test host is localhost
      }
      assert.isOk(this.tooltipMessage.match(/^Error in watching /), 'tooltip should be "Error in watching http..."');
    }
  }
  filestorage.test = (base) => class FileStorageWatchingFileTooltip4 extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      if (window.location.hostname !== 'localhost') {
        return; // Assuming the test host is localhost
      }
      self.tooltipMessage = '';
      await self.forEvent(self.tooltip.$.tooltip, 'animationend'/*'neon-animation-finish'*/, () => { self.fileStorage.lastModified = (new Date(0)).toUTCString(); }, (element, type, event) => {
        self.tooltipMessage = self.tooltip.textContent.trim();
        console.log(self.tooltipMessage);
        return self.tooltipMessage && self.tooltipMessage.match(/^Incomplete XLIFF found at /);
      });
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      if (window.location.hostname !== 'localhost') {
        return; // Assuming the test host is localhost
      }
      assert.isOk(this.tooltipMessage.match(/^Incomplete XLIFF found at /), 'tooltip should be "Incomplete XLIFF found at http..."');
    }
  }
  filestorage.test = (base) => class FileStorageWatchingFileTooltip5 extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      if (window.location.hostname !== 'localhost') {
        return; // Assuming the test host is localhost
      }
      self.tooltipMessage = '';
      await self.forEvent(self.tooltip.$.tooltip, 'animationend'/*'neon-animation-finish'*/, () => { self.fileStorage.lastModified = (new Date(0)).toUTCString(); }, (element, type, event) => {
        self.tooltipMessage = self.tooltip.textContent.trim();
        console.log(self.tooltipMessage);
        return self.tooltipMessage && self.tooltipMessage.match(/^File Not Found for /);
      });
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      if (window.location.hostname !== 'localhost') {
        return; // Assuming the test host is localhost
      }
      assert.isOk(this.tooltipMessage.match(/^File Not Found for /), 'tooltip should be "File Not Found for http..."');
    }
  }
  filestorage.test = (base) => class FileStorageBadgeTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      if (window.location.hostname !== 'localhost') {
        return; // Assuming the test host is localhost
      }
      await self.checkInterval(() => self.fileStorage.badgeLabel === '1', 200, 100);
      await self.checkInterval(() => self.localeIcon.$.badge.label === '16', 200, 100);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      if (window.location.hostname !== 'localhost') {
        return; // Assuming the test host is localhost
      }
      assert.equal(this.fileStorage.badgeLabel, '1', 'local file storage icon badge label should be "1"');
      assert.equal(this.fileStorage.badgeColor, 'yellow', 'local file storage icon badge color should be yellow');
      assert.equal(this.localeIcon.$.badge.label, '16', 'locale icon badge label should be "16"');
    }
  }
  filestorage.test = {
    // test class mixins
    '': [],
    // test classes
    SelectStorageView: {
      FileStorageSuite: {
        CheckboxTest: {
          FileStorageUnselectedIconTooltipTest: 'UnselectedIconTooltipTest'
        }
      }
    },
    SelectIconView: {
      FileStorageSuite: {
        SelectLocaleIcon: {
          SelectStorageView: {
            MockFileStorageSaveTest: {
              FileStorageSelectedIconTooltipTest: {
                FileStorageLoadTest: 'FileStorageSaveLoadTest; Save to local file, Load from a copy of the saved file (Mock)'
              }
            },
            EnableTimestampPrefix: {
              MockFileStorageSaveTest2: {
                FileStorageLoadTest2: 'FileStorageSaveLoadTest2; Save to prefixed local file, Load from a copy of the saved file (Mock)'
              }
            },
            MockFileStorageUploadTest: {
              FileStorageLoadTest: 'FileStorageUploadLoadTest; Upload local file, Load from a copy of the uploaded file (Mock)'
            },
            FileStorageDropTooltipTest: {
              MockFileStorageDropTest: {
                FileStorageLoadTest: 'FileStorageDropLoadTest; Drop local file, Load from a copy of the dropped file (Mock)'
              }
            },
            FileStorageConfigureWatcher: {
              EnableWatcherCheckbox: {
                MockFileStorageUploadTest: {
                  FileStorageWatchingFileTooltip: {
                    FileStorageWatchingFileTooltip2: {
                      FileStorageBadgeTest: {
                        DisableWatcherCheckbox: 'FileStorageWatcherTest; Watch local file at localhost'
                      }
                    }
                  }
                }
              }
            },
            FileStorageConfigureWatcherError: {
              EnableWatcherCheckbox: {
                MockFileStorageUploadTest: {
                  FileStorageWatchingFileTooltip3: 'FileStorageWatcherUnresponsiveTest; Unresponsive local file watcher'
                }
              }
            },
            FileStorageConfigureWatcherIncompleteXliff: {
              EnableWatcherCheckbox: {
                MockFileStorageUploadTest: {
                  FileStorageWatchingFileTooltip4: 'FileStorageWatcherIncompleteXliffTest; Incomplete local file XLIFF from watcher'
                }
              }
            },
            FileStorageConfigureWatcherFileNotFound: {
              EnableWatcherCheckbox: {
                MockFileStorageUploadTest: {
                  FileStorageWatchingFileTooltip5: 'FileStorageWatcherFileNotFoundTest; File Not Found from local file watcher'
                }
              }
            }
          }
        }
      }
    }
  };
