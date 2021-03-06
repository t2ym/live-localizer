/**
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/**

## Live Localizer widget for Polymer i18n-behavior

`<live-localizer>` element is a wrapper for live-localizer sub-components and handles opened status of the widget.

```html
<body>
  ...
  <live-localizer>
    ... Live Localizer storage elements ...
  </live-localizer>
</body>
```

### Classes for the storage elements

| Storage Type | Class |
|:-------------|:------|
| Cloud Storage        | class="storage cloud" |
| Browser Storage      | class="storage browser" |
| Local Device Storage | class="storage device" |

### Example:
```html
<body>
  ...
  <live-localizer>
    <live-localizer-firebase-storage id="firebase-storage" class="storage cloud"
      auth-provider="google"
      auth-domain="live-localizer-demo.firebaseapp.com"
      database-url="https://live-localizer-demo.firebaseio.com"
      api-key="AIzaSyCjrlPhl0cLSZVRsDvuajq16vkerhcu_UM">
    </live-localizer-firebase-storage>
  </live-localizer>
</body>
```

### Notes:
- The `<live-localizer>` element is a singleton element and should be attached as the last direct child of the `<body>` element of the top HTML.
- `<live-localizer-local-file-storage>` and `<live-localizer-browser-storage>` are pre-attached and need no explicit attachments in the light DOM.

@group I18nBehavior
@element live-localizer-main
@demo demo/index.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

//import 'web-animations-js/web-animations.min.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/paper-card/paper-card.js';
import './live-localizer-fab.js';
import './live-localizer-dialog.js';
import './live-localizer-panel.js';
import { Polymer as Polymer$0 } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer$0({
  importMeta: import.meta,

  _template: html`
    <style>
      :host {
        display: fixed;

        /* Specify fonts to mask the styles of the target app */
        font-family: 'Roboto', 'Noto', sans-serif;
        font-size: 16px;
        line-height: normal;

        --live-localizer-color: dimgrey;
        --live-localizer-fab-color: slategrey;
        --live-localizer-background-color: lightgrey;
        --live-localizer-border-color: lightgrey;
        --live-localizer-panel-background-color: whitesmoke;

        --live-localizer-dialog-content-div: {
          background-color: var(--live-localizer-panel-background-color);
          color: var(--live-localizer-color);
          box-shadow: 1px 1px 1px rgba(0,0,0,0.4) inset;
        }
      }
      a.hidden {
        display: node;
      }
    </style>
    <live-localizer-fab id="fab" on-tap="_fabTapped"></live-localizer-fab>
    <live-localizer-dialog id="dialog" on-iron-overlay-closed="_dialogClosed">
      <live-localizer-panel slot="dialog-content">
        <slot slot="storage-cloud" name="storage-cloud"></slot>
        <slot slot="storage-browser" name="storage-browser"></slot>
        <slot slot="storage-device" name="storage-device"></slot>
      </live-localizer-panel>
    </live-localizer-dialog>
    <a id="hiddenLink" class="hidden"></a>
`,

  is: 'live-localizer-main',

  properties: {
    /**
     * Opened status of Live Localizer widget - `true` if opened
     */
    opened: {
      type: Boolean,
      value: false,
      observer: '_openedChanged'
    }
  },

  /**
   * Attached callback
   *
   * Initialize `this.fab`, `this.dialog`, and `this.opened`
   */
  attached: function () {
    if (!this.fab) {
      this.fab = this.$.fab;
      this.fab.open();
      this.opened = false;
    }
    if (!this.dialog) {
      this.dialog = this.$.dialog;
      this.dialog.originElement = this.fab;
    }
    var reloadUrl = window.sessionStorage.getItem('live-localizer-reload-url');
    if (reloadUrl) {
      this.dialog.addEventListener('neon-animation-finish', function onNeonAnimationFinish(e) {
        this.dialog.removeEventListener('neon-animation-finish', onNeonAnimationFinish);
        this.dialog.fire('height-changed');
      }.bind(this));
      this.opened = true;
      setTimeout(function () {
        this.$.hiddenLink.href = reloadUrl;
        this.$.hiddenLink.click();
      }.bind(this), 1);
    }
    window.sessionStorage.removeItem('live-localizer-reload-url');
  },

  /**
   * Observer of `this.opened` changes
   *
   * Open or close Live Localizer widget according to the new value of `this.opened`
   *
   * @param {boolean} opened new value
   */
  _openedChanged: function (opened) {
    if (opened) {
      if (this.fab) {
        this.fab.close();
      }
      if (this.dialog) {
        this.dialog.resetPosition();
        this.dialog.open();
      }
    }
    else {
      if (this.dialog && this.dialog.opened) {
        this.dialog.close();
      }
      if (this.fab) {
        this.fab.open();
      }
    }
  },

  /**
   * Tap event handler for `<live-localizer-fab>`
   *
   * Open Live Localizer widget
   *
   * @param {Object} e The tap event
   */
  _fabTapped: function (e) {
    this.opened = true;
    e.stopPropagation();
  },

  /**
   * `iron-overlay-closed` event handler for `<live-localizer-dialog>`
   *
   * Close Live Localizer widget
   *
   * @param {Object} e The `iron-overlay-closed` event
   */
  _dialogClosed: function (e) {
    this.opened = false;
    e.stopPropagation();
  }
});
