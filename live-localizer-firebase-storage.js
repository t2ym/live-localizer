/**
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/**

## live-localizer-firebase-storage

`<live-localizer-firebase-storage>` element shows the storage icon and its controls for the Firebase storage.
The element handles save and load operations of XLIFF on the Firebase storage.

Example deployment:
```
<live-localizer>
  <live-localizer-firebase-storage id="firebase-storage" class="storage cloud"
    auth-provider="google"
    auth-domain="YOUR_FIREBASE_AUTH_DOMAIN"
    database-url="YOUR_FIREBASE_DATABASE_URL"
    api-key="YOUR_FIREBASE_API_KEY"></live-localizer-firebase-storage>
</live-localizer>
```

Firebase structure:
```
/users/{user.uid}/files/{locale}/locale - locale of the file, e.g., ja
                                /name - file name, e.g., bundle.ja.xlf
                                /stats - statistics object
                                /text - XLIFF content
                 /settings/autoSave - boolean
                          /autoLoad - boolean
```

Security rules:
```
{
  "rules": {
    "users": {
      ".read": "auth.uid === 'xliff-watcher'",
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

@group I18nBehavior
@element live-localizer-firebase-storage
@demo demo/index.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/device-icons.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-ripple/paper-ripple.js';
import '@polymer/paper-tooltip/paper-tooltip.js';
import '@polymer/paper-fab/paper-fab.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import './invalidate-polyfill.js';
import 'polymerfire/polymerfire.js';
import './live-localizer-storage-icon.js';
import './firebase-storage-icons.js';
import './draggable-behavior.js';
import { Polymer as Polymer$0 } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import deepcopy from 'deepcopy/dist/deepcopy.js';

Polymer$0({
  importMeta: import.meta,

  _template: html`
    <style include="iron-flex"></style>
    <style include="drag-handle-mode"></style>
    <style include="drag-field"></style>
    <style>
      :host {
        display: inline-block;
        
        --live-localizer-default-checkbox-color: dimgrey;
        --paper-checkbox-unchecked-color: var(--live-localizer-color,--live-localizer-default-checkbox-color);
        --paper-checkbox-checked-color: var(--live-localizer-color,--live-localizer-default-checkbox-color);
        --paper-checkbox-label-color:var(--live-localizer-color,--live-localizer-default-checkbox-color);
        --paper-checkbox-label-checked-color: var(--live-localizer-color,--live-localizer-default-checkbox-color);
      }
      .control-panel {
        padding-left: 12px;
        padding-right: 12px;
        padding-top: 4px;
        padding-bottom: 4px;
      }
      .control-panel-item {
        margin-bottom: 4px;
      }
      .ruler {
        height: 1px;
        width: 150px;
        margin-left: 2px;
        margin-top: 2px;
        margin-bottom: 4px;
        margin-right: 2px;
        background-color: var(--live-localizer-default-checkbox-color);
        @apply(--shadow-elevation-2dp);
      }
    </style>

    <firebase-app name="livelocalizer" auth-domain="[[authDomain]]" database-url="[[databaseUrl]]" api-key="[[apiKey]]"></firebase-app>

    <firebase-auth id="auth" app-name="livelocalizer" signed-in="{{signedIn}}" user="{{user}}" on-error="showError">
    </firebase-auth>

    <firebase-document id="document" app-name="livelocalizer" data="{{data}}">
    </firebase-document>

    <firebase-document id="settings" app-name="livelocalizer" data="{{settingsData}}">
    </firebase-document>

    <div id="storage-panel" class="layout horizontal">
      <live-localizer-storage-icon id="firebase-storage-icon" selected="{{signedIn}}" icon="{{icon}}" label="{{label}}" badge-label="{{badgeLabel}}" badge-color="{{badgeColor}}" badge-tooltip="Discarded Units" on-tap="onTap" drag-handle-mode="{{getDragHandleMode(file)}}" bound-drag-handle-mode="" drag-drop-groups="save-targets" drop-targets="load-targets" tooltips="{{getTooltips(file,signedIn,authProvider,anonymous)}}" model="{{model}}"></live-localizer-storage-icon>
      <div class="control-panel layout vertical">
        <div class="control-panel-item">Automatic</div>
        <paper-checkbox class="control-panel-item" checked="{{autoSave}}">Save</paper-checkbox>
        <paper-checkbox class="control-panel-item" checked="{{autoLoad}}">Load</paper-checkbox>
        <div class="ruler"></div>
        <paper-checkbox id="anonymous" class="control-panel-item" hidden\$="[[user]]" checked="{{anonymous}}">Sign in anonymously</paper-checkbox>
        <div id="user" class="control-panel-item" hidden\$="[[!user]]">
          <iron-icon icon="{{getUserIcon(user,authProvider,anonymous)}}"></iron-icon> {{getUserLabel(user)}}
        </div>
        <paper-tooltip id="usertooltip" for="user" offset="0">{{getUserTooltip(user,authProvider,anonymous)}}</paper-tooltip>
        <div class="flex"></div>
      </div>
      <paper-tooltip id="tooltip" for="storage-panel" offset="-50" manual-mode="">{{tooltip}}</paper-tooltip>
    </div>
`,

  is: 'live-localizer-firebase-storage',

  properties: {
    /**
     * authentication/authorization provider for Firebase
     *
     * Note: The specified authentication method has to be configured in Firebase console as well.
     *
     * Supported values:
     *
     * | value | auth provider |
     * |:------|:--------------|
     * | anonymous | Anonymous authentication |
     * | google | Google OAuth |
     * | github | GitHub OAuth |
     * | twitter | Twitter OAuth |
     * | facebook | Facebook OAuth |
     */
    authProvider: {
      type: String,
      value: 'anonymous'
    },

    /**
     * true if the user sign in anonymously
     */
    anonymous: {
      type: Boolean,
      value: true
    },

    /**
     * Firebase authentication domain
     */
    authDomain: {
      type: String
    },

    /**
     * Firebase Database URL
     */
    databaseUrl: {
      type: String
    },

    /**
     * Firebase API Key
     */
    apiKey: {
      type: String
    },

    /**
     * name of icon for `<live-localizer-storage-icon>`
     */
    icon: {
      type: String,
      value: 'googleio2016:firebase'
    },

    /**
     * label of icon for `<live-localizer-storage-icon>`
     */
    label: {
      type: String,
      value: 'Firebase'
    },

    /**
     * true if selected
     *
     * Note:
     * - If the user has signed in, it is selected.
     */
    selected: {
      type: Boolean,
      value: false,
      reflectToAttribute: true
    },

    /**
     * the model object bound to the `<live-localizer-model>` element
     */
    model: {
      type: Object,
      notify: true
    },

    /**
     * the file object sync'ed with Firebase
     */
    file: {
      type: Object,
      notify: true
    },

    /**
     * true if auto saving on loading XLIFF to the running app is enabled
     */
    autoSave: {
      type: Boolean,
      value: true,
      notify: true
    },

    /**
     * true if auto loading on the page loading is enabled
     */
    autoLoad: {
      type: Boolean,
      value: false,
      notify: true
    },

    /**
     * store status of auto loading to avoid multiple auto-loading
     */
    autoLoadStatus: {
      type: Object,
      value: function () { return {}; }
    },

    /**
     * user object for Firebase
     */
    user: {
      type: Object,
      value: null
    },

    /**
     * data object bound to Firebase document's /users/{uid}/files/{locale}
     */
    data: {
      type: Object,
      notify: true
    },

    /**
     * data object bound to Firebase document's /users/{uid}/settings
     */
    settingsData: {
      type: Object,
      notify: true
    },

    /**
     * Firebase path to the documents's /users/{uid}/files/{locale}
     */
    path: {
      type: String,
      notify: true
    },

    /**
     * Firebase error object
     */
    error: {
      type: Object,
      value: null
    },

    /**
     * true if the user has signed in
     */
    signedIn: {
      type: Boolean
    },

    /**
     * tooltip for the storage
     */
    tooltip: {
      type: String
    }
  },

  observers: [
    'modelReady(model)',
    'onSignIn(signedIn,user)',
    'updateStats(file)',
    'updateLabel(file)',
    'checkAutoLoad(file,autoLoad)',
    'dataUpdated(data)',
    'updateSettings(user,autoSave,autoLoad)'
  ],

  /**
   * ready callback
   */
  ready: function () {
    this.$['firebase-storage-icon'].storage = this;
  },

  /**
   * attached callback
   */
  attached: function () {
    this.isAttached = true;
  },

  /**
   * observer of `this.model`
   *
   * Initialize event handlers
   */
  modelReady: function (model) {
    if (model && !this.isModelReady) {
      this.onHtmlLangMutationBindThis = this.onHtmlLangMutation.bind(this);
      this.onBundleSetFetchedBindThis = this.onBundleSetFetched.bind(this);
      this.onLoadXliffBindThis = this.onLoadXliff.bind(this);
      this.model.addEventListener('html-lang-mutation', this.onHtmlLangMutationBindThis);
      this.model.addEventListener('bundle-set-fetched', this.onBundleSetFetchedBindThis);
      this.model.addEventListener('load-xliff', this.onLoadXliffBindThis);
      this.isModelReady = true;
    }
  },

  /**
   * detached callback
   *
   * Remove event handlers
   */
  detached: function () {
    if (this.model) {
      this.model.removeEventListener('html-lang-mutation', this.onHtmlLangMutationBindThis);
      this.model.removeEventListener('bundle-set-fetched', this.onBundleSetFetchedBindThis);
      this.model.removeEventListener('load-xliff', this.onLoadXliffBindThis);
    }
  },

  /**
   * observer of `signedIn`, and `user`
   *
   * Fetch file from Firebase
   */
  onSignIn: function (signedIn, user) {
    if (signedIn && user) {
      this.anonymous = user.isAnonymous;
      this.loadFile(null, true);
    }
    else {
      this.file = null;
    }
  },

  /**
   * `error` event handler for `<firebase-auth>`
   *
   * Show the error message in the tooltip
   */
  showError: function (e) {
    this.error = e.detail;
    this.tooltip = this.getErrorTooltip(this.error);
    this.$.tooltip.show();
  },

  /**
   * observer of `user`, `autoSave`, and `autoLoad`
   *
   * Synchronize settings with Firebase
   */
  updateSettings: function (user, autoSave, autoLoad) {
    if (user && this.isAttached) {
      var settingsPath = '/users/' + user.uid + '/settings';
      if (this.isSettingsInitialized) {
        var settings = { autoSave: autoSave, autoLoad: autoLoad };
        this.$.settings.setStoredValue(settingsPath, settings)
          .then(function () {
            this.$.settings.path = settingsPath;
            this.fire('firebase-storage-settings-flushed', { signedIn: this.signedIn });
          }.bind(this));
      }
      else {
        this.$.settings.getStoredValue(settingsPath)
          .then(function (settings) {
            if (typeof settings.autoSave === 'undefined') {
              settings = { autoSave: autoSave, autoLoad: autoLoad };
              this.$.settings.setStoredValue(settingsPath, settings)
                .then(function () {
                  this.isSettingsInitialized = true;
                  this.fire('firebase-storage-settings-flushed', { signedIn: this.signedIn });
                }.bind(this));
            }
            else {
              this.autoSave = settings.autoSave;
              this.autoLoad = settings.autoLoad;
              this.isSettingsInitialized = true;
              this.fire('firebase-storage-settings-flushed', { signedIn: this.signedIn });
            }
          }.bind(this));
      }
    }
    else if (this.isAttached) {
      // Note: Not flushed but an event is required
      this.fire('firebase-storage-settings-flushed', { signedIn: this.signedIn });
    }
  },

  /**
   * `html-lang-mutation` event handler
   *
   * Fetch file from Firebase according to the current locale of the running app
   */
  onHtmlLangMutation: function (e) {
    var file = this.model.selectedFile();
    var noload = true;
    if (file) {
      if (file.locale && file.locale !== this.model.defaultLang) {
        this.loadFile(file, noload)
          .then(function () {
            //console.log('firebase-storage: onHtmlLangMutation loadFile ', file.locale, noload, file.name);
          });
      }
    }
    else {
      var locale = this.model.getNormalizedLocale(this.model.html.lang);
      if (locale && locale !== this.model.defaultLang) {
        this.loadFile({ locale: locale }, noload)
          .then(function () {
            //console.log('firebase-storage: onHtmlLangMutation loadFile ', locale, noload);
          });
      }
    }
    return false;
  },

  /**
   * `bundle-set-fetched` event handler
   *
   * Trigger checking on auto-loading
   */
  onBundleSetFetched: function (e) {
    if (!this.autoLoadStatus.bundleSetFetched) {
      this.autoLoadStatus.bundleSetFetched = true;
      this.checkAutoLoad(this.file, this.autoLoad);
    }
  },

  /**
   * `load-xliff` event handler
   *
   * Auto-save the file if `autoSave` is enabled and `e.detail.stats.json.total.valueUpdated` and/or `todoUpdated` is non-zero
   */
  onLoadXliff: function (e) {
    var locale = e.detail.locale;
    var stats = e.detail.stats;
    if (this.autoSave) {
      if (stats &&
          stats.json &&
          stats.json.total &&
          (stats.json.total.valueUpdated || stats.json.total.todoUpdated)) {
        this.save({ locale: locale });
      }
    }
    return false;
  },

  /**
   * `tap` event handler for the icon
   *
   * Sign in/out with the specified auth provider for Firebase
   */
  onTap: function (e) {
    this.error = null;
    if (this.signedIn) {
      console.log('sign out');
      // Fix #69. Destroy the client documents so that they do not flush client caches after the client signs out
      if (this.$.settings.path) {
        this.$.settings.destroy();
      }
      if (this.$.document.path) {
        this.$.document.destroy();
      }
      this.$.auth.signOut();
    }
    else {
      if (this.anonymous) {
        console.log('sign in anonymously');
        this.$.auth.signInAnonymously();
      }
      else {
        console.log('sign in', this.authProvider);
        switch (this.authProvider) {
        case 'google':
        case 'twitter':
        case 'github':
        case 'facebook':
          this.$.auth.signInWithPopup(this.authProvider);
          break;
        case 'anonymous':
          this.$.auth.signInAnonymously();
          break;
        }
      }
    }
  },

  /**
   * observer of `data` for /users/{uid}/files/{locale}
   *
   * Update `this.file` with the data
   */
  dataUpdated: function (data) {
    if (this.data.locale) {
      this.file = this.data;
    }
    else {
      this.file = null;
    }
  },

  /**
   * observer of `file`
   *
   * Update label of the icon
   *
   * @param {Object} file
   */
  updateLabel: function (file) {
    if (file && file.locale) {
      this.label = file.name;
      this.selected = true;
    }
    else {
      this.label = 'Firebase';
      this.selected = false;
    }
  },

  /**
   * generate user label according to the current user
   *
   * User Labels:
   *
   * | auth provider | label |
   * |:--------------|:------|
   * | anonymous | Anonymous User |
   * | google | {user.email} |
   * | twitter | @{user.displayName} |
   * | github | {user.email} |
   * | facebook | {user.email} |
   *
   * @param {Object} user the user
   */
  getUserLabel: function (user) {
    var userLabel = '';
    if (user) {
      if (user.isAnonymous) {
        userLabel += 'Anonymous User';
      }
      else {
        switch (this.authProvider) {
        case 'google':
          userLabel += user.email;
          break;
        case 'twitter':
          userLabel += '@' + user.displayName;
          break;
        case 'github':
          userLabel += user.email || user.displayName;
          break;
        case 'facebook':
          userLabel += user.email || user.displayName;
          break;
        default:
          userLabel += user.uid;
          break;
        }
      }
    }
    else {
      userLabel = '';
    }
    return userLabel;
  },

  /**
   * get user icon from user status
   *
   * Icons are defined in `firebase-storage-icons.html`
   *
   * @param {Object} user
   * @param {String} authProvider
   * @param {Boolean} anonymous
   */
  getUserIcon: function (user, authProvider, anonymous) {
    var userIcon;
    if (user) {
      if (user.isAnonymous) {
        userIcon = 'account_avatar:profile';
      }
      else {
        switch (authProvider) {
        case 'google':
          userIcon = 'favicon_google:google';
          break;
        case 'twitter':
          userIcon = 'twitter_icon:twitter';
          break;
        case 'github':
          userIcon = 'github_icon:github';
          break;
        case 'facebook':
        default:
          userIcon = 'account_avatar:profile';
          break;
        }
      }
    }
    else {
      userIcon = 'account_avatar:profile';
    }
    return userIcon;
  },

  /**
   * get tooltip for user
   */
  getUserTooltip: function (user, authProvider, anonymous) {
    var userTooltip;
    if (user) {
      if (user.isAnonymous) {
        userTooltip = 'Storage will be lost on sign out';
      }
      else {
        userTooltip = 'Signed in ' + this.authProviderName;
      }
    }
    else {
      userTooltip = 'Signed out';
    }
    return userTooltip;
  },

  /**
   * get error tooltip
   *
   * @param {Object} error Firebase error object
   */
  getErrorTooltip: function (error) {
    var errorTooltip;
    if (error && error.code) {
      errorTooltip = 'Error: ' + error.code + ' ' + error.message;
    }
    else {
      errorTooltip = '';
    }
    return errorTooltip;
  },

  /**
   * get tooltip for the icon
   *
   * @param {Object} file
   * @param {Boolean} signedIn
   * @param {String} authProvider
   * @param {Boolean} anonymous
   */
  getTooltips: function (file, signedIn, authProvider, anonymous) {
    var tooltips = [];
    var authProviderName;
    var signInLabel = 'Sign in ';
    if (file && file.locale && signedIn) {
      tooltips[0] = 'Drag to Load Click to Sign out';
    }
    else if (signedIn && !file) {
      tooltips[0] = 'Click to Sign out';
    }

    if (this.anonymous) {
      authProvider = 'anonymous';
    }

    switch (authProvider) {
    case 'google':
      authProviderName = 'with Google';
      break;
    case 'twitter':
      authProviderName = 'with Twitter';
      break;
    case 'github':
      authProviderName = 'with GitHub';
      break;
    case 'facebook':
      authProviderName = 'with Facebook';
      break;
    case 'anonymous':
      authProviderName = 'anonymously'
      break;
    }

    this.authProviderName = authProviderName;
    tooltips[1] = signInLabel + authProviderName;

    return tooltips;
  },

  /**
   * Return the current drag-handle-mode for the icon with DraggableBehavior
   *
   * @param {Object} file
   * @return {String} drag-handle-mode value for the storage icon
   */
  getDragHandleMode: function (file) {
    var dragHandleMode;
    if (file && file.locale) {
      dragHandleMode = 'drag';
    }
    else {
      dragHandleMode = 'none';
    }
    return dragHandleMode;
  },

  /**
   * observer of `file` and `autoLoad`
   *
   * Check `autoLoad` status and trigger loading of XLIFF
   *
   * @param {Object} file
   * @param {Boolean} autoLoad 
   */
  checkAutoLoad: function (file, autoLoad) {
    if (autoLoad && file && file.locale &&
        file.locale !== this.model.defaultLang && 
        this.autoLoadStatus.bundleSetFetched &&
        !this.autoLoadStatus[file.locale]) {
      this.tooltip = (this.autoSave ? 'Loaded and then Saved XLIFF for ' : 'Loaded XLIFF for ') + file.locale;
      this.autoLoadStatus[file.locale] = true;
      this.loadFile(file)
        .then(function () {
          if (!this.autoSave) {
            this.$.tooltip.show();
            setTimeout(function () {
              this.$.tooltip.hide();
              this.tooltip = '';
            }.bind(this), 3000);
          }
        }.bind(this));
    }
  },

  /**
   * load XLIFF according to the triggering event
   *
   * Events and Operations:
   * | event | origin | operation |
   * |:------|:-------|:----------|
   * | `tap` | `<live-localizer-storage-icon>` | no operation |
   * | `drag-and-drop` | `<live-localizer-storage-view>` | load the file |
   *
   * @param {Event} event the triggering event
   */
  load: function (event) {
    var file;
    switch (event.type) {
    case 'tap':
      break;
    case 'drag-and-drop':
      file = this.file;
      break;
    default:
      break;
    }
    if (file) {
      this.loadFile(file)
        .then(function () {
          this.tooltip = (this.autoSave ? 'Loaded and then Saved XLIFF for ' : 'Loaded XLIFF for ') + file.locale;
          if (!this.autoSave) {
            this.$.tooltip.show();
            setTimeout(function () {
              this.$.tooltip.hide();
              this.tooltip = '';
            }.bind(this), 3000);
          }
        }.bind(this));
    }
  },

  /**
   * load the file
   *
   * @param {Object} file the target file
   * @param {Boolean} noload true if no loading to the running app
   * @param {Boolean} nofetch true if no fetching from IndexedDB
   * @param {Promise} Promise to resolve to the file
   */
  loadFile: function (file, noload, nofetch) {
    var it = this;
    //console.log('loadFile ', file ? file.locale : null, noload, nofetch);
    if (!file) {
      file = it.model.selectedFile();
      //console.log('selectedFile = ', file);
    }
    if (!file) {
      var locale = this.model.getNormalizedLocale(this.model.html.lang);
      if (locale && locale !== this.model.defaultLang) {
        file = { locale: locale };
        //console.log('file from html.lang = ', file);
      }
    }
    return new Promise(function (resolve, reject) {
      if (!file) {
        resolve(null);
      }
      var locale = file.locale;
      if (locale === it.model.defaultLang) {
        locale = '';
      }
      if (!locale) {
        resolve(null);
      }
      if (nofetch) {
        if (it.model.masterBundles[locale] && it.model.masterBundles[locale].bundle) {
          it.model.parseXliff(file.text, {
            bundle: noload
              ? deepcopy(it.model.masterBundles[locale])
              : it.model.masterBundles[locale]
          }, function (output, stats) {
            file.stats = stats;
            resolve(file);
          });
        }
      }
      else {
        //console.log('loadFile signedIn = ', it.signedIn, ' user = ', it.user ? it.user.uid : null);
        if (it.signedIn && it.user && it.user.uid) {
          //console.log('fetching ' + locale);
          it.path = '/users/' + it.user.uid + '/files/' + locale;
          it.$.document.getStoredValue(it.path)
            .then(function (result) {
              it.$.document.path = it.path;
              result = result.locale ? result : null;
              if (result) {
                // found entry
                //console.log('found entry for ' + locale);
                if (it.model.masterBundles[locale] && it.model.masterBundles[locale].bundle) {
                  it.model.parseXliff(result.text, {
                    bundle: noload
                      ? deepcopy(it.model.masterBundles[locale])
                      : it.model.masterBundles[locale]
                  }, function (output, stats) {
                    result.stats = stats;
                    if (!noload) {
                      it.model.updateLocale(locale);
                    }
                    else {
                      it.file = result;
                    }
                    resolve(result);
                  });
                }
                else {
                  // no master bundle for the locale
                  it.file = null;
                  resolve(null);
                }
              }
              else {
                // no entry
                it.file = null;
                resolve(null);
              }
            });
        }
        else {
          // not signed in
          it.file = null;
          resolve(null);
        }
      }
    });
  },

  /**
   * update the badge label and the color according to the file's statistics
   */
  updateStats: function () {
    var badgeColorDiscarded = '';
    var stats = {};
    if (this.file && this.file.stats) {
      stats = this.file.stats.json.total;
      if (stats && stats.discarded > 0) {
        badgeColorDiscarded = 'yellow';
      }
    }

    this.badgeLabel = '' + (stats && stats.discarded > 0 ? stats.discarded : '');
    this.badgeColor = badgeColorDiscarded;
  },

  /**
   * save XLIFF to Firebase
   *
   * Notes:
   * - Only `file.locale` is used in the process
   * - Firebase path is /users/{uid}/files/{locale}
   *
   * @param {Object} file the target file to save to Firebase
   * @return {Promise}
   */
  save: function (file) {
    var it = this;
    file.text = null;
    return new Promise(function (resolve, reject) {
      if (file.locale === it.model.defaultLang) {
        resolve(); // default lang cannot be saved
      }
      else {
        it.model.setXliff(file, function (result) {
          if (result && result.text) {
            it.loadFile(result, true, true)
              .then(function (file) {
                if (it.signedIn && it.user && it.user.uid) {
                  it.path = '/users/' + it.user.uid + '/files/' + file.locale;
                  // It is strange that file instanceof Object is false and file.hasOwnProperty is undefined while typeof file is 'object'
                  it.file = Object.assign({}, file); // make sure file.hasOwnProperty is defined
                  it.$.document.setStoredValue(it.path, it.file)
                    .then(function () {
                      it.$.document.path = it.path;
                      //console.log('Saved document ' + file.locale);
                      if (!it.tooltip) {
                        it.tooltip = 'Saved XLIFF for ' + file.locale;
                      }
                      it.$.tooltip.show();
                      setTimeout(function () {
                        it.$.tooltip.hide();
                        it.tooltip = '';
                      }, 3000);
                    });
                }
              });
          }
        });
      }
    });
  }
});
