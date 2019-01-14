/*
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import Suite from 'scenarist/Suite.mjs';
import './filestorage-test.js';

import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';

  // multistorage scope (subscope of filestorage)
  let scope = 'multistorage';
  let multistorage = new Suite(scope, 'live-localizer multistorage tests');
  multistorage.htmlSuite = 'live-localizer-multistorage';
  multistorage.test = Suite.scopes.storageview.classes.SelectStorageView;
  multistorage.test = Suite.scopes.panel.classes.SelectIconView;
  multistorage.test = Suite.scopes.panel.mixins.SelectStorageView;
  multistorage.test = Suite.scopes.browserstorage.mixins.SelectLocaleIcon;
  multistorage.test = Suite.scopes.common.mixins.Reload;
  multistorage.test = Suite.scopes.filestorage.mixins.FileStorageSuite;
  multistorage.test = Suite.scopes.filestorage.mixins.FileStorageConfigureWatcher;
  multistorage.test = Suite.scopes.filestorage.mixins.EnableWatcherCheckbox;
  multistorage.test = Suite.scopes.filestorage.mixins.MockFileStorageUploadTest;
  multistorage.test = Suite.scopes.filestorage.mixins.FileStorageWatchingFileTooltip;
  multistorage.test = Suite.scopes.filestorage.mixins.FileStorageWatchingFileTooltip2;
  multistorage.test = Suite.scopes.filestorage.mixins.DisableWatcherCheckbox;
  multistorage.test = (base) => class CleanupFirebaseAuthSuite extends base {
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
      self.firebaseStorageIcon = dom(self.firebaseStorage.root).querySelector('live-localizer-storage-icon');
      self.firebaseIconTooltip = dom(self.storageIcon.root).querySelector('paper-tooltip[for=card]');
      self.firebaseTooltip = self.firebaseStorage.$.tooltip;
      self.firebaseCheckboxes = Array.prototype.reduce.call(dom(self.firebaseStorage.root).querySelectorAll('paper-checkbox'),
        (acc, curr) => { acc[curr.textContent.trim()] = curr; return acc; }, {});
      self.browserTooltip = self.browserStorage.$.tooltip;
    }
  }
  multistorage.test = Suite.scopes.firebasestorage.mixins.SignInAnonymously;
  multistorage.test = Suite.scopes.firebasestorage.mixins.SignOutAnonymousUser;
  multistorage.test = (base) => class MultiStorageLabelTest extends base {
    async operation() {
      if (this.hasToSkip) { return; }
      let self = this;
      if (window.location.hostname !== 'localhost') {
        return; // Assuming the test host is localhost
      }
      await self.checkInterval(() => self.fileStorage.badgeLabel === '1', 200, 100);
      await self.checkInterval(() => self.localeIcon.$.badge.label === '16', 200, 100);
      self.firebaseTooltipMessage = '';
      await self.checkInterval(() => self.firebaseTooltipMessage = self.firebaseTooltip.textContent.trim(), 100, 200);
    }
    async checkpoint() {
      if (this.hasToSkip) { return; }
      if (window.location.hostname !== 'localhost') {
        return; // Assuming the test host is localhost
      }
      assert.equal(this.fileStorage.badgeLabel, '1', 'local file storage icon badge label should be "1"');
      assert.equal(this.fileStorage.badgeColor, 'yellow', 'local file storage icon badge color should be yellow');
      assert.equal(this.localeIcon.$.badge.label, '16', 'locale icon badge label should be "16"');
      assert.equal(this.firebaseTooltipMessage, 'Saved XLIFF for de', 'firebase tooltip is "Saved XLIFF for de"');
    }
  }
  multistorage.test = {
    // test class mixins
    '': [],
    // test classes
    SelectIconView: {
      FileStorageSuite: {
        CleanupFirebaseAuthSuite: {
          SelectLocaleIcon: {
            SelectStorageView: {
              SignInAnonymously: {
                FileStorageConfigureWatcher: {
                  EnableWatcherCheckbox: {
                    MockFileStorageUploadTest: {
                      FileStorageWatchingFileTooltip: {
                        FileStorageWatchingFileTooltip2: {
                          MultiStorageLabelTest: {
                            DisableWatcherCheckbox: {
                              SignOutAnonymousUser: 'MultiStorageAutoSaveTest'
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
