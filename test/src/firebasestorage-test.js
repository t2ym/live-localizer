/*
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import Suite from 'scenarist/Suite.mjs';
import './storageview-test.js';

import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';

  // firebasestorage scope (subscope of storageview)
  let scope = 'firebasestorage';
  let firebasestorage = new Suite(scope, 'live-localizer firebasestorage tests');
  firebasestorage.htmlSuite = 'live-localizer-firebase';
  firebasestorage.test = Suite.scopes.storageview.classes.SelectStorageView;
  firebasestorage.test = Suite.scopes.panel.classes.SelectIconView;
  firebasestorage.test = Suite.scopes.panel.mixins.SelectStorageView;
  firebasestorage.test = Suite.scopes.browserstorage.mixins.SelectLocaleIcon;
  firebasestorage.test = Suite.scopes.common.mixins.Reload;
  firebasestorage.test = (base) => class CleanupFirebaseAuthSuite extends base {
    static get reconnectable() { return false; }
    async setup() {
      await super.setup();
      if (this.hasToSkip) { return; }
      this.cleanup();
    }
    cleanup() {
      for (let key in localStorage) {
        if (key.match(/^firebase:/)) {
          localStorage.removeItem(key);
        }
      }
    }
    async operation() {
      let self = this;
      self.localeIcon = self.storageView.$['locale-icon'];
      self.storageIcon = dom(self.firebaseStorage.root).querySelector('live-localizer-storage-icon');
      self.iconTooltip = dom(self.storageIcon.root).querySelector('paper-tooltip[for=card]');
      self.tooltip = self.firebaseStorage.$.tooltip;
      self.checkboxes = Array.prototype.reduce.call(dom(self.firebaseStorage.root).querySelectorAll('paper-checkbox'),
        (acc, curr) => { acc[curr.textContent.trim()] = curr; return acc; }, {});
    }
    async toggleCheckbox(checkbox) {
      let self = this;
      let flushEvent = {
        'Load': 'firebase-storage-settings-flushed',
        'Save': 'firebase-storage-settings-flushed',
        'Sign in anonymously': ''
      }[checkbox.textContent.trim()];
      if (flushEvent) {
        await self.forEvent(self.firebaseStorage, flushEvent,
          () => { MockInteractions.tap(checkbox); }, (element, type, event) => true);
      }
      else {
        MockInteractions.tap(checkbox);
      }
      let count = 1;
      await self.checkInterval(() => count-- > 0, 200, 1); // wait for CSS animation (140ms) to finish
    }
  }
  firebasestorage.test = (base) => class InitializeFirebaseStorageTest extends base {
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
  firebasestorage.test = (base) => class CheckboxTest extends base {
    * iteration() {
      yield *[
        // Initial state: { autoSave: true, autoLoad: false, anonymous: true }
        { label: 'Sign in anonymously', expected: { autoSave: true, autoLoad: false, anonymous: false } },
        { label: 'Save', expected: { autoSave: false, autoLoad: false, anonymous: false } },
        { label: 'Load', expected: { autoSave: false, autoLoad: true, anonymous: false } },
        { label: 'Save', expected: { autoSave: true, autoLoad: true, anonymous: false } },
        { label: 'Sign in anonymously', expected: { autoSave: true, autoLoad: true, anonymous: true } },
        { label: 'Load', expected: { autoSave: true, autoLoad: false, anonymous: true } },
        { label: 'Load', expected: { autoSave: true, autoLoad: true, anonymous: true } },
        { label: 'Save', expected: { autoSave: false, autoLoad: true, anonymous: true } }
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
  firebasestorage.test = (base) => class DisableAutoSaveCheckbox extends base {
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
  firebasestorage.test = (base) => class EnableAutoLoadCheckbox extends base {
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
  firebasestorage.test = (base) => class DisableAnonymousCheckbox extends base {
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
  firebasestorage.test = (base) => class SignInAnonymously extends base {
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
  firebasestorage.test = (base) => class ShowAuthErrorTooltip extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      if (Suite.isChrome) {
        self.firebaseStorage.$.auth.fire('error', { code: '12345', message: 'error message body' });
      }
      else { // Firefox throws an error on polyfilled dispatchEvent. Resort to call the event handler directly.
        self.firebaseStorage.showError({ type: 'error', detail: { code: '12345', message: 'error message body' }});
      }
      await self.forEvent(self.tooltip.$.tooltip, 'animationend'/*'neon-animation-finish'*/, () => {}, (element, type, event) => {
        return self.errorTooltipMessage = self.tooltip.textContent.trim();
      });
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.errorTooltipMessage, 'Error: 12345 error message body', 'error tooltip is "Error: 12345 error message body"');
    }
  }
  firebasestorage.test = (base) => class EmptyAuthErrorTooltip extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      if (Suite.isChrome) {
        self.firebaseStorage.$.auth.fire('error', { code: '', message: 'error message body' });
      }
      else { // Firefox throws an error on polyfilled dispatchEvent. Resort to call the event handler directly.
        self.firebaseStorage.showError({ type: 'error', detail: { code: '', message: 'error message body' }});
      }
      await self.checkInterval(() => !self.firebaseStorage.tooltip, 200, 100);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.firebaseStorage.tooltip, '', 'error tooltip is empty');
    }
  }
  firebasestorage.test = (base) => class SignOutAnonymousUser extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      let count = 20;
      await self.checkInterval(() => count-- === 0, 100, 20);
      MockInteractions.tap(self.firebaseStorage.$['firebase-storage-icon']);
      await self.checkInterval(() => !self.firebaseStorage.signedIn, 200, 120);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.isNotOk(this.firebaseStorage.signedIn, 'Signed out');
    }
  }
  firebasestorage.test = (base) => class ConfiguredAutoSaveLoadTest extends base {
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
  firebasestorage.test = (base) => class ConfiguredAutoSaveLoadCheckboxTest extends base {
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
  firebasestorage.test = (base) => class FirebaseStorageSignedOutAnonymousIconTooltipTest extends base {
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
  firebasestorage.test = (base) => class FirebaseStorageSignedInAnonymousIconTooltipTest extends base {
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
  firebasestorage.test = (base) => class FirebaseStorageSignedInAnonymousUserTooltipTest extends base {
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
  firebasestorage.test = (base) => class FirebaseStorageIneffectiveSaveTest extends base {
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
  firebasestorage.test = (base) => class FirebaseStorageDefaultLangIneffectiveSaveTest extends base {
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
  firebasestorage.test = (base) => class FirebaseStorageSignedOutDragTest extends base {
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
  firebasestorage.test = (base) => class FirebaseStorageIneffectiveSaveTest2 extends base {
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
  firebasestorage.test = (base) => class FirebaseStorageSaveTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      self.tooltipMessage = '';
      await self.dragDrop(self.localeIcon, self.storageIcon, 0, -120, 'drop', 'animationend'/*'neon-animation-finish'*/, self.tooltip.$.tooltip, self.tooltipMessageGetter);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.dragDropEvent.detail.src, this.localeIcon, 'drag source is locale icon');
      assert.equal(this.dragDropEvent.detail.dest, this.storageIcon, 'drag destination is firebase storage icon');
      assert.equal(this.tooltipMessage, 'Saved XLIFF for de', 'tooltip is "Saved XLIFF for de"');
    }
  }
  firebasestorage.test = (base) => class FirebaseStorageSelectedIconTooltipTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.checkInterval(() => self.firebaseStorage.isSettingsInitialized, 200, 100);
      await self.checkInterval(() => self.storageIcon.label === 'bundle.de.xlf', 200, 100);
      await self.showTooltip(self.storageIcon.$.card, self.iconTooltip);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.iconTooltip.getAttribute('for'), 'card', 'paper-tooltip should be for card');
      assert.equal(this.iconTooltip.textContent.trim(), 'Drag to Load Click to Sign out', 'tooltip should be "Drag to Load Click to Sign out"');
    }
  }
  firebasestorage.test = (base) => class FirebaseStorageInit extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.checkInterval(() => self.firebaseStorage.isSettingsInitialized, 200, 1500);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.isOk(this.firebaseStorage.isSettingsInitialized, 'settings is initialized');
    }
  }
  firebasestorage.test = (base) => class FirebaseStorageLoadTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      await self.checkInterval(() => { console.log(self.firebaseStorage.label); return self.firebaseStorage.label === 'bundle.de.xlf'; }, 200, 200);
      self.tooltipMessage = '';
      await self.dragDrop(self.storageIcon, self.localeIcon, 0, 120, 'drop', 'animationend'/*'neon-animation-finish'*/, self.tooltip.$.tooltip, (element, type, event) => {
        return self.tooltipMessage = self.tooltip.textContent.trim();
      });
      await self.checkInterval(() => { console.log(self.dragDropEvent); return self.dragDropEvent }, 200, 150);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      assert.equal(this.dragDropEvent.detail.src, this.storageIcon, 'drag source is firebase storage icon');
      assert.equal(this.dragDropEvent.detail.dest, this.localeIcon, 'drag destination is locale icon');
      assert.equal(this.tooltipMessage, 'Loaded XLIFF for de', 'tooltip is "Loaded XLIFF for de"');
    }
  }
  firebasestorage.test = (base) => class MockSignInTest extends base {
    static get reconnectable() { return false; }
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
      self.userIcon = dom(self.mockStorage.$.user).querySelector('iron-icon').icon;
      await self.showTooltip(self.mockStorage.$.user, self.mockStorage.$.usertooltip);
      self.userTooltipMessage = self.mockStorage.$.usertooltip.textContent.trim();
      await self.forEvent(self.mockStorage.$.usertooltip.$.tooltip, 'animationend'/*'neon-animation-finish'*/, () => {}, (element, type, event) => true);
      self.mockStorage.user = self.mockStorage._user;
      let count = 20;
      await self.checkInterval(() => count-- === 0, 100, 20);
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
  firebasestorage.test = {
    // test class mixins
    '': [],
    // test classes
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
    },
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
    }
  };
