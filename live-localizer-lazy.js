/**
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/**

## Lazy Loader for '<live-localier-main>'

@group I18nBehavior
@element live-localizer
@demo demo/index.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import { Polymer as Polymer$0 } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
Polymer$0({
  importMeta: import.meta,

  _template: html`
    <style>
    div.loaderplaceholder {
      position: fixed;
      left: 56px;
      bottom: 56px;
      width: 32px;
      height: 32px;
      padding: 12px;
      color: slategrey;
      background-color: lightgrey;
      border-radius: 50%;
      /* --shadow-elevation-2dp */
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                  0 1px 5px 0 rgba(0, 0, 0, 0.12),
                  0 3px 1px -2px rgba(0, 0, 0, 0.2);
    }
    svg.loadericon {
      width: 100%;
      height: 100%;
    }
    @-webkit-keyframes rotating {
      from {
        -webkit-transform: rotate(0deg);
      }
      to {
        -webkit-transform: rotate(360deg);
      }
    }
    @keyframes rotating {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    svg.rotating {
      -webkit-animation: rotating 2s linear infinite;
      animation: rotating 2s linear infinite;
    }
    </style>
    <div id="placeholder" class="loaderplaceholder">
      <svg id="loadericon" class="loadericon rotating" viewBox="0 0 24 24" fill="slategrey">
        <!--
        Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
        This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
        The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
        The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
        Code distributed by Google as part of the polymer project is also
        subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt

        language icon from iron-icons.html
        -->
        <g id="language"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"></path></g>
      </svg>
    </div>
    <live-localizer-main id="main" hidden="">
      <slot slot="storage-cloud" name="storage-cloud"></slot>
      <slot slot="storage-browser" name="storage-browser"></slot>
      <slot slot="storage-device" name="storage-device"></slot>
    </live-localizer-main>
`,

  is: 'live-localizer',

  /**
   * Created callback
   *
   * Supply slot attributes for source-level compatibility with non-hybrid live-localizer
   */
  created: function () {
    var self = this;
    [ 'cloud', 'browser', 'device' ].forEach(function (storageType) {
      Array.prototype.forEach.call(dom(self).querySelectorAll('.storage.' + storageType) || [], function (cloudStorageElement) {
        if (!cloudStorageElement.getAttribute('slot')) {
          cloudStorageElement.setAttribute('slot', 'storage-' + storageType);
        }
      });
    });
  },

  /**
   * Attached callback
   *
   * Load live-localizer
   */
  attached: function () {
    if (this.$.main.is === 'live-localizer-main') {
      this.$.placeholder.setAttribute('hidden', '');
      this.$.loadericon.classList.remove('rotating');
      this.$.main.removeAttribute('hidden');
    }
    else {
      import('./live-localizer-main.js').then(function (result) {
        this.$.placeholder.setAttribute('hidden', '');
        this.$.loadericon.classList.remove('rotating');
        this.$.main.removeAttribute('hidden');
      }.bind(this)).catch(function (e) {
        this.$.loadericon.classList.remove('rotating');
        this.$.loadericon.setAttribute('fill', 'orangered');
        this.$.placeholder.setAttribute('title', 'Failed to load Live Localizer');
        console.log('Failed to load ', e);
      }.bind(this));
    }
  }
});
