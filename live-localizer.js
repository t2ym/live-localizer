/**
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/**

## Static Loader for `<live-localier-main>`

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

import './live-localizer-main.js';
import { Polymer as Polymer$0 } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
Polymer$0({
  importMeta: import.meta,

  _template: html`
    <live-localizer-main>
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
  }
});
