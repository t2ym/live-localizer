/*
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
{
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
      self.storageIcon = Polymer.dom(self.fileStorage.root).querySelector('live-localizer-storage-icon');
      self.iconTooltip = Polymer.dom(self.storageIcon.root).querySelector('paper-tooltip[for=card]');
      self.tooltip = self.fileStorage.$.tooltip;
      self.checkboxes = Array.prototype.reduce.call(Polymer.dom(self.fileStorage.root).querySelectorAll('paper-checkbox'),
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
      await self.forEvent(self.dropTooltip, 'neon-animation-finish', () => {}, (element, type, event) => true);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.tooltipMessage, 'Drag and drop XLIFF to select', 'drop tooltip should be "Drag and drop XLIFF to select"');
    }
  }
  filestorage.test = (base) => class MockFileStorageDropTest extends base {
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
      /*
      self.mockChangeEvent = {
        type: 'change',
        target: {
          files: [self.mockFile]
        },
        preventDefault: () => {}
      };
      self.fileStorage.onFileChange(self.mockChangeEvent); // Note: input.files = new FileList([self.mockFile]) is illegal
      */
      self.mockDropEvent = new MouseEvent('drop', mouseEventInit);
      self.mockDropEvent.dataTransfer = { files: [self.mockFile] };
      self.droparea.dispatchEvent(self.mockDropEvent);
      await self.checkInterval(() => self.fileStorage.label === mockXliffName, 200, 200);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.fileStorage.label, 'bundle.de.xlf', 'local file is dropped (mock)');
    }
  }
  /*
  filestorage.test = (base) => class InitializeFirebaseStorageTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.checkInterval(() => self.firebaseStorage.isModelReady, 200, 10); // wait for isModelReady
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.isOk(this.firebaseStorage.isModelReady, 'firebaseStorage is initialized');
      assert.equal(this.firebaseStorage.autoLoad, false, 'autoLoad is false');
      assert.equal(this.firebaseStorage.autoSave, true, 'autoSave is true');
    }
  }
  filestorage.test = (base) => class DisableAutoSaveCheckbox extends base {
    * iteration() {
      yield *[
        { label: 'Save', expected: { autoSave: false, autoLoad: false } }
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
        assert.equal(this.firebaseStorage[prop], parameters.expected[prop], prop + ' is ' + parameters.expected[prop]);
      }
    }
  }
  filestorage.test = (base) => class EnableAutoLoadCheckbox extends base {
    * iteration() {
      yield *[
        { label: 'Load', expected: { autoSave: false, autoLoad: true } }
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
        assert.equal(this.firebaseStorage[prop], parameters.expected[prop], prop + ' is ' + parameters.expected[prop]);
      }
    }
  }
  filestorage.test = (base) => class DisableAnonymousCheckbox extends base {
    * iteration() {
      yield *[
        { label: 'Sign in anonymously', expected: { autoSave: true, autoLoad: false, anonymous: false } },
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
        assert.equal(this.firebaseStorage[prop], parameters.expected[prop], prop + ' is ' + parameters.expected[prop]);
      }
    }
  }
  filestorage.test = (base) => class SignInAnonymously extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      MockInteractions.tap(self.firebaseStorage.$['firebase-storage-icon']);
      await self.checkInterval(() => self.firebaseStorage.signedIn, 200, 120);
      await self.checkInterval(() => self.firebaseStorage.isSettingsInitialized, 200, 120);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.isOk(this.firebaseStorage.signedIn, 'Signed in');
      assert.isOk(this.firebaseStorage.user, 'user is configured');
      assert.isOk(this.firebaseStorage.user.isAnonymous, 'user is anonymous');
      assert.isOk(this.firebaseStorage.isSettingsInitialized, 'settings is initialized');
    }
  }
  filestorage.test = (base) => class ShowAuthErrorTooltip extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      self.firebaseStorage.$.auth.fire('error', { code: '12345', message: 'error message body' });
      await self.forEvent(self.tooltip, 'neon-animation-finish', () => {}, (element, type, event) => {
        return self.errorTooltipMessage = self.tooltip.textContent.trim();
      });
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.errorTooltipMessage, 'Error: 12345 error message body', 'error tooltip is "Error: 12345 error message body"');
    }
  }
  filestorage.test = (base) => class EmptyAuthErrorTooltip extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      self.firebaseStorage.$.auth.fire('error', { code: '', message: 'error message body' });
      await self.checkInterval(() => !self.firebaseStorage.tooltip, 200, 100);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.firebaseStorage.tooltip, '', 'error tooltip is empty');
    }
  }
  filestorage.test = (base) => class SignOutAnonymousUser extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      MockInteractions.tap(self.firebaseStorage.$['firebase-storage-icon']);
      await self.checkInterval(() => !self.firebaseStorage.signedIn, 200, 120);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.isNotOk(this.firebaseStorage.signedIn, 'Signed out');
    }
  }
  filestorage.test = (base) => class ConfiguredAutoSaveLoadTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.checkInterval(() => self.firebaseStorage.isSettingsInitialized, 200, 50); // wait for settings
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.isOk(this.firebaseStorage.isModelReady, 'firebaseStorage is configured');
      assert.isOk(this.firebaseStorage.signedIn, 'firebaseStorage is configured');
      assert.isOk(this.firebaseStorage.user, 'user signed in');
      assert.isOk(this.firebaseStorage.user.isAnonymous, 'user is anonymous');
      assert.isOk(this.firebaseStorage.isSettingsInitialized, 'settings is initialized');
      assert.equal(this.firebaseStorage.autoLoad, true, 'autoLoad is true');
      assert.equal(this.firebaseStorage.autoSave, false, 'autoSave is false');
    }
  }
  filestorage.test = (base) => class ConfiguredAutoSaveLoadCheckboxTest extends base {
    * iteration() {
      yield *[
        { label: 'Save', expected: { autoSave: true, autoLoad: true } },
        { label: 'Load', expected: { autoSave: true, autoLoad: false } }
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
        assert.equal(this.firebaseStorage[prop], parameters.expected[prop], prop + ' is ' + parameters.expected[prop]);
      }
    }
  }
  filestorage.test = (base) => class FirebaseStorageSignedOutAnonymousIconTooltipTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.showTooltip(self.storageIcon.$.card, self.iconTooltip);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.iconTooltip.getAttribute('for'), 'card', 'paper-tooltip should be for card');
      assert.equal(this.iconTooltip.textContent.trim(), 'Sign in anonymously', 'tooltip should be "Sign in anonymously"');
    }
  }
  filestorage.test = (base) => class FirebaseStorageSignedInAnonymousIconTooltipTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.showTooltip(self.storageIcon.$.card, self.iconTooltip);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.iconTooltip.getAttribute('for'), 'card', 'paper-tooltip should be for card');
      assert.equal(this.iconTooltip.textContent.trim(), 'Click to Sign out', 'tooltip should be "Click to Sign out"');
    }
  }
  filestorage.test = (base) => class FirebaseStorageSignedInAnonymousUserTooltipTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      self.userTooltip = self.firebaseStorage.$.usertooltip;
      await self.showTooltip(self.firebaseStorage.$.user, self.userTooltip);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.userTooltip.getAttribute('for'), 'user', 'paper-tooltip should be for user');
      assert.equal(this.userTooltip.textContent.trim(), 'Storage will be lost on sign out', 'tooltip should be "Storage will be lost on sign out"');
    }
  }
  filestorage.test = (base) => class FirebaseStorageIneffectiveSaveTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.dragDrop(self.localeIcon, self.storageIcon, 0, -120, 'drop', 'drag-and-drop');
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.dragDropEvent.detail.src, this.localeIcon, 'drag source is locale icon');
      assert.equal(this.dragDropEvent.detail.dest, this.storageIcon, 'drag destination is firebase storage icon');
      assert.isNotOk(this.storageIcon.selected, 'storage icon is not selected');
    }
  }
  filestorage.test = (base) => class FirebaseStorageDefaultLangIneffectiveSaveTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.dragDrop(self.localeIcon, self.storageIcon, 0, -120, 'drop', 'drag-and-drop');
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.dragDropEvent.detail.src, this.localeIcon, 'drag source is locale icon');
      assert.equal(this.dragDropEvent.detail.dest, this.storageIcon, 'drag destination is firebase storage icon');
      assert.isOk(this.storageIcon.selected, 'storage icon is selected');
      assert.equal(this.firebaseStorage.$.tooltip.textContent.trim(), '', 'tooltip should be empty');
    }
  }
  filestorage.test = (base) => class FirebaseStorageSignedOutDragTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.dragDrop(self.storageIcon, self.localeIcon, 0, 120, 'noop');
      let count = 10;
      await self.checkInterval(() => count++ >= 10, 100, 20);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.isNotOk(this.dragDropEvent, 'no drag and drop event');
    }
  }
  filestorage.test = (base) => class FirebaseStorageIneffectiveSaveTest2 extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.dragDrop(self.localeIcon, self.storageIcon, 150, -150, 'release', 'neon-animation-finish');
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.isNotOk(this.storageIcon.selected, 'storage icon is not selected');
    }
  }
  filestorage.test = (base) => class FirebaseStorageSelectedIconTooltipTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.showTooltip(self.storageIcon.$.card, self.iconTooltip);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.iconTooltip.getAttribute('for'), 'card', 'paper-tooltip should be for card');
      assert.equal(this.iconTooltip.textContent.trim(), 'Drag to Load Click to Sign out', 'tooltip should be "Drag to Load Click to Sign out"');
    }
  }
  filestorage.test = (base) => class FirebaseStorageInit extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.checkInterval(() => self.firebaseStorage.isSettingsInitialized, 200, 40);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.isOk(this.firebaseStorage.isSettingsInitialized, 'settings is initialized');
    }
  }
  filestorage.test = (base) => class MockSignInTest extends base {
    * iteration() {
      yield *[
        {
          authProvider: 'google',
          expected: {
            iconTooltip: 'Sign in with Google',
            userLabel: 'mockuser@gmail.com',
            userTooltip: 'Signed in with Google',
            userIcon: 'favicon_google:google'
          }
        },
        {
          authProvider: 'twitter',
          expected: {
            iconTooltip: 'Sign in with Twitter',
            userLabel: '@mockuser',
            userTooltip: 'Signed in with Twitter',
            userIcon: 'twitter_icon:twitter'
          }
        },
        {
          authProvider: 'github',
          expected: {
            iconTooltip: 'Sign in with GitHub',
            userLabel: 'mockuser@gmail.com',
            userTooltip: 'Signed in with GitHub',
            userIcon: 'github_icon:github'
          }
        },
        {
          authProvider: 'facebook',
          expected: {
            iconTooltip: 'Sign in with Facebook',
            userLabel: 'mockuser@gmail.com',
            userTooltip: 'Signed in with Facebook',
            userIcon: 'account_avatar:profile'
          }
        }
      ].map((parameters) => { parameters.name = 'Sign in with ' + parameters.authProvider; return parameters });
    }
    async operation(parameters) {
      let self = this;
      self.mockStorage = self.firebaseStorage;
      self.mockAuth = self.mockStorage.$.auth;
      self.mockAuth.signInWithPopup = async function (authProvider) {
        await self.mockAuth.signInAnonymously();
        await self.checkInterval(() => self.mockStorage.isSettingsInitialized, 200, 100);
        let user = {
          email: 'mockuser@gmail.com',
          displayName: 'mockuser',
          isAnonymous: false
        };
        for (let prop in self.mockStorage.user) {
          switch (prop) {
          case 'email':
          case 'displayName':
          case 'isAnonymous':
            break;
          default:
            user[prop] = self.mockStorage.user[prop];
            break;
          }
        }
        self.mockStorage._user = self.mockStorage.user;
        self.mockStorage.user = user;
        self.mockStorage.anonymous = false;
        self.setMockUser = true;
      }
      self.setMockUser = false;
      self.mockStorage.anonymous = false;
      self.mockStorage.authProvider = parameters.authProvider;
      await self.showTooltip(self.storageIcon.$.card, self.iconTooltip);
      self.iconTooltipMessage = self.iconTooltip.textContent.trim();
      MockInteractions.tap(self.storageIcon);
      await self.checkInterval(() => self.mockStorage.isSettingsInitialized, 200, 100);
      await self.checkInterval(() => self.mockStorage.signedIn, 200, 100);
      await self.checkInterval(() => self.setMockUser, 200, 100);
      self.userLabel = self.mockStorage.$.user.textContent.trim();
      self.userIcon = Polymer.dom(self.mockStorage.$.user).querySelector('iron-icon').icon;
      await self.showTooltip(self.mockStorage.$.user, self.mockStorage.$.usertooltip);
      self.userTooltipMessage = self.mockStorage.$.usertooltip.textContent.trim();
      await self.forEvent(self.mockStorage.$.usertooltip, 'neon-animation-finish', () => {}, (element, type, event) => true);
      self.mockStorage.user = self.mockStorage._user;
      MockInteractions.tap(self.storageIcon);
      await self.checkInterval(() => !self.mockStorage.signedIn, 200, 100);
    }
    async checkpoint(parameters) {
      if (this.hasToSkip) { return; }
      assert.equal(this.iconTooltipMessage, parameters.expected.iconTooltip, 'tooltip should be "' + parameters.expected.iconTooltip + '"');
      assert.equal(this.userLabel, parameters.expected.userLabel, 'user label should be "' + parameters.expected.userLabel + '"');
      assert.equal(this.userTooltipMessage, parameters.expected.userTooltip, 'user tooltip should be "' + parameters.expected.userTooltip + '"');
      assert.equal(this.userIcon, parameters.expected.userIcon, 'user icon should be "' + parameters.expected.userIcon + '"');
    }
  }
  filestorage.test = {
    // test class mixins
    '': [],
    // test classes
    SelectStorageView: {
      CleanupFirebaseAuthSuite: {
        InitializeFirebaseStorageTest: {
          CheckboxTest: {
            SignInAnonymously: {
              Reload: {
                ConfiguredAutoSaveLoadTest: {
                  FirebaseStorageSignedInAnonymousIconTooltipTest: {
                    FirebaseStorageSignedInAnonymousUserTooltipTest: {
                      FirebaseStorageDefaultLangIneffectiveSaveTest: {
                        ConfiguredAutoSaveLoadCheckboxTest: {
                          SignOutAnonymousUser: 'ConfiguredAutoSaveLoadCheckboxTest_phase_1; Sign in anonymously, Reload, Toggle checkboxes, Sign out'
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          FirebaseStorageSignedOutAnonymousIconTooltipTest: 'SignedOutAnonymousIconTooltipTest',
          FirebaseStorageIneffectiveSaveTest: 'IneffectiveSaveTest',
          DisableAnonymousCheckbox: {
            MockSignInTest: 'SignInWithMockAuthProviderTest; Sign in with auth providers (Mock)'
          },
          ShowAuthErrorTooltip: 'ShowAuthErrorTooltipTest; Show auth error tooltip message (Mock)',
          EmptyAuthErrorTooltip: 'EmptyAuthErrorTooltipTest; Empty auth error tooltip message (Mock)'
        }
      }
    },
    SelectIconView: {
      CleanupFirebaseAuthSuite: {
        InitializeFirebaseStorageTest: {
          SelectLocaleIcon: {
            SelectStorageView: {
              FirebaseStorageSignedOutDragTest: {
                FirebaseStorageIneffectiveSaveTest2: {
                  SignInAnonymously: {
                    FirebaseStorageSaveTest: {
                      Reload: {
                        FirebaseStorageSelectedIconTooltipTest: {
                          DisableAutoSaveCheckbox: {
                            EnableAutoLoadCheckbox: {
                              Reload: {
                                FirebaseStorageInit: {
                                  FirebaseStorageLoadTest: {
                                    SignOutAnonymousUser: 'SaveReloadLoadTest_phase_2; Sign in anonymously, Save, Reload, Load, Sign out'
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  */
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
            EnableWatcherCheckbox: ''
          }
        }
      }
    }
  };
} // filestorage scope
