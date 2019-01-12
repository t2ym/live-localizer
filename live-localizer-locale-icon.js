/**
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/**

## live-localizer-locale-icon

`<live-localizer-locale-icon>` element shows an iconized flag for the locale specified in `file.locale`.

The element is used in `<live-localizer-locale-icon-view>` and `<live-localizer-storage-view>`.
It is draggable and droppable in `<live-localizer-storage-view>`.

It shows a badge and a tooltip if necessary.

Note:
- If the locale does not contain a country code, the flag icon is selected in a best-effort manner.

@group I18nBehavior
@element live-localizer-locale-icon
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
import '@polymer/iron-image/iron-image.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-ripple/paper-ripple.js';
import '@polymer/paper-tooltip/paper-tooltip.js';
import '@polymer/paper-fab/paper-fab.js';
import './draggable-behavior.js';
import { Polymer as Polymer$0 } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { NeonAnimationRunnerBehavior } from '@polymer/neon-animation/neon-animation-runner-behavior.js';
var lang2country = {
  'af': 'ZA',
  'ak': 'GH',
  'ar': 'SA',
  'az': 'AZ',
  'az-Latn': 'AZ',
  'be': 'BY',
  'bem': 'ZM',
  'bg': 'BG',
  'bm': 'ML',
  'bn': 'BD',
  'bs': 'BA',
  'bs-Latn': 'BA',
  'ckb': 'IQ',
  'cs': 'CZ',
  'da': 'DK',
  'de': 'DE',
  'dyo': 'SN',
  'dz': 'BT',
  'ee': 'GH',
  'el': 'GR',
  'en': 'US',
  'es': 'ES',
  'et': 'EE',
  'fa': 'IR',
  'fi': 'FI',
  'fil': 'PH',
  'fo': 'FO',
  'fr': 'FR',
  'ga': 'IE',
  'gv': 'IM',
  'ha': 'NG',
  'he': 'IL',
  'hi': 'IN',
  'hr': 'HR',
  'hu': 'HU',
  'hy': 'AM',
  'id': 'ID',
  'ig': 'NG',
  'is': 'IS',
  'it': 'IT',
  'ja': 'JP',
  'kab': 'DZ',
  'kam': 'KE',
  'kea': 'CV',
  'khq': 'ML',
  'ki': 'KE',
  'kk': 'KZ',
  'kl': 'GL',
  'kln': 'KE',
  'km': 'KH',
  'ko': 'KR',
  'lb': 'LU',
  'lo': 'LA',
  'lrc': 'IR',
  'lt': 'LT',
  'lu': 'CD',
  'lv': 'LV',
  'mfe': 'MU',
  'mg': 'MG',
  'mgh': 'MZ',
  'mk': 'MK',
  'mn': 'MN',
  'ms': 'MY',
  'mt': 'MT',
  'my': 'MM',
  'naq': 'NA',
  'nb': 'NO',
  'ne': 'NP',
  'nl': 'NL',
  'nn': 'NO',
  'no': 'NO',
  'nus': 'SS',
  'pl': 'PL',
  'ps': 'AF',
  'pt': 'BR',
  'qu': 'PE',
  'rm': 'CH',
  'rn': 'BI',
  'ro': 'RO',
  'ru': 'RU',
  'rw': 'RW',
  'se': 'NO',
  'seh': 'MZ',
  'ses': 'ML',
  'sg': 'CF',
  'si': 'LK',
  'sk': 'SK',
  'sl': 'SI',
  'so': 'SO',
  'sq': 'AL',
  'th': 'TH',
  'tk': 'TM',
  'to': 'TO',
  'tr': 'TR',
  'ur': 'PK',
  'uz': 'UZ',
  'uz-Latn': 'UZ',
  'vai': 'LR',
  'vai-Vaii': 'LR',
  'vi': 'VN',
  'wae': 'CH',
  'zh': 'CN',
  'zh-Hans': 'CN',
  'zh-Hant': 'TW',
  'zu': 'ZA'
};

/**
 * Convert locale to country code
 *
 * Note:
 * - If the target locale does not contain a country code, the converted country code
 *   should be suitable but may not be strictly accurate as a language cannot strictly
 *   be mapped to a specific country.
 *
 * @param {string} locale locale to convert
 * @return {string} converted country code
 */
function locale2country (locale) {
  var match = locale.match(/^(.*)-([A-Z][A-Z])$/);
  if (match) {
    return match[2];
  }
  else if (lang2country[locale]) {
    return lang2country[locale];
  }
  else {
    return '';
  }
}

Polymer$0({
  importMeta: import.meta,

  _template: html`
    <style>
      :host {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
        margin: 8px;

        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        user-select: none;

        --paper-tooltip: {
          padding: 4px;
        }

        --paper-fab-background: lightgrey;
        --paper-fab-keyboard-focus-background: lightgrey;
        --paper-fab-iron-icon: {
          color: white;
          width: 16px;
          height: 16px;
        }
      }
      .download-link {
        display: inline-block;
        width: 100%;
        height: 100%;
        padding: 8px;
        border-radius: 12px;
        @apply(--paper-font-common-base);
        font-size: 12px;
        text-align: center;
        background-color: lightgrey;
        @apply(--shadow-elevation-4dp);
      }
      .download-icon {
        display: block;
        text-align: center;
        margin: auto;
        width: 48px;
        height: 48px;
      }
      paper-card.download-link:not(.selected) {
        color: black;
        opacity: 0.35;
      }
      .file-name {
        text-align: center;
        display: block;
      }
      paper-fab.badge {
        position: relative;
        font-size: 9pt;
        padding: 1px;
        top: -84px;
        left: 60px;
        width: 32px;
        height: 32px;
      }
      paper-fab.badge:not(.selected) {
        color: black;
        opacity: 0.35;
      }
      paper-fab.badge.blue {
        visibility: visible;
        background-color: blue;
      }
      paper-fab.badge.orangered {
        visibility: visible;
        background-color: orangered;
      }
      paper-fab.badge.yellow {
        visibility: visible;
        color: slategrey;
        background-color: yellow;
      }
      paper-fab.badge {
        visibility: hidden;
      }
    </style>
    <paper-card id="card" class="download-link layout vertical">
      <iron-image class="download-icon" src="{{flag(file.locale)}}" alt="{{file.locale}}" sizing="contain"></iron-image>
      <div class="flex"></div>
      <div class="file-name">{{file.locale}}</div>
      <paper-ripple></paper-ripple>
    </paper-card>
    <paper-fab id="badge" mini="" class="badge" on-tap="onBadgeTap"></paper-fab>
    <paper-tooltip for="card" offset="-10">{{tooltip(selected,tooltips)}}</paper-tooltip>
`,

  is: 'live-localizer-locale-icon',

  behaviors: [
    NeonAnimationRunnerBehavior,
    BehaviorsStore.DraggableBehavior
  ],

  properties: {

    /**
     * File object
     *
     * `file.locale` - locale to show
     * `file.tasks` - number of taskes to show in the badge; 0 to hide the badge
     */
    file: {
      type: Object
    },

    /**
     * true if the icon is selected
     *
     * The icon is shown dimly by its opacity when it is not selected.
     */
    selected: {
      type: Boolean,
      value: false,
      reflectToAttribute: true,
      observer: 'selectedChanged'
    },

    /**
     * `follow-selected` attribute to follow the currently selected locale of the app
     */
    followSelected: {
      type: Boolean,
      value: false,
      reflectToAttribute: true
    },

    /**
     * List of tooltips for selected and unselected status, respectively
     */
    tooltips: {
      type: Array,
      value: function () {
        return [ 'Save XLIFF', 'Switch Locale' ];
      }
    },

    /**
     * `<live-localizer-model>` object
     */
    model: {
      type: Object,
      notify: true
    }
  },

  observers: [
    'modelReady(model)',
    'updateSelected(file,model)',
    'updateTasks(file.tasks)'
  ],

  /**
   * ready callback
   *
   * Initialize `this.onHtmlLangMutationBindThis`
   */
  ready: function () {
    this.onHtmlLangMutationBindThis = this.onHtmlLangMutation.bind(this);
  },

  /**
   * attached callback
   *
   * Initialize `html-lang-mutation` event listener for `this.model`
   */
  attached: function () {
    if (this.model) {
      this.model.addEventListener('html-lang-mutation', this.onHtmlLangMutationBindThis);
      this.model.addEventListener('bundle-set-fetched', this.onHtmlLangMutationBindThis);
      this.isModelReady = true;
    }
  },

  /**
   * observer of `this.model`
   *
   * Initialize `html-lang-mutation` event listener for `this.model`
   *
   * @param {Object} model `<live-localizer-model>` object
   */
  modelReady: function (model) {
    if (model && !this.isModelReady) {
      this.model.addEventListener('html-lang-mutation', this.onHtmlLangMutationBindThis);
      this.model.addEventListener('bundle-set-fetched', this.onHtmlLangMutationBindThis);
      this.isModelReady = true;
    }
    if (!model) {
      this.isModelReady = false;
    }
  },

  /**
   * detached callback
   *
   * Uninitialize `html-lang-mutation` event listener for `this.model`
   */
  detached: function () {
    if (this.model) {
      this.model.removeEventListener('html-lang-mutation', this.onHtmlLangMutationBindThis);
      this.model.removeEventListener('bundle-set-fetched', this.onHtmlLangMutationBindThis);
      this.isModelReady = false;
    }
  },

  /**
   * `html-lang-mutation` event listener
   *
   * If `follow-selected`, replace the `file` object with the selected one
   */
  onHtmlLangMutation: function (e) {
    if (this.followSelected) {
      var tmpFile = this.model.selectedFile();
      if (tmpFile) {
        this.file = tmpFile;
      }
    }
    if (this.file) {
      this.updateSelected(this.file, this.model);
    }
    return false;
  },

  /**
   * observer of `file` and `model`
   *
   * Update `selected` value according to `file` and `model`
   *
   * @param {Object} file File object
   * @param {Object} model `<live-localizer-model>` object
   */
  updateSelected: function (file, model) {
    if (model && file && file.locale) {
      this.selected = model.isSelected(file.locale);
    }
  },

  /**
   * observer of `selected`
   *
   * Update classes for set dimness in unselected status
   *
   * @param {Boolean} value the new value for `selected`
   */
  selectedChanged: function (value) {
    this.toggleClass('selected', this.selected, this.$.card);
    this.toggleClass('selected', this.selected, this.$.badge);
  },

  /**
   * observer of `file.tasks`
   *
   * Update the badge color and its visibility
   *
   * @param {Number} tasks `file.task`
   */
  updateTasks: function (tasks) {
    var badgeColor = '';
    if (tasks > 0) {
      badgeColor = 'orangered';
    }

    this.$.badge.label = '' + this.file.tasks;
    [ 'blue', 'orangered', 'yellow' ].forEach(function (color) {
      if (color === badgeColor) {
        this.$.badge.classList.add(color);
      }
      else {
        this.$.badge.classList.remove(color);
      }
    }, this);
  },

  /**
   * `tap` event handler for the badge
   *
   * Fire `badge-tap` event with the locale as a parameter
   */
  onBadgeTap: function (e) {
    e.stopPropagation();
    this.fire('badge-tap', { locale: this.file.locale });
  },

  /**
   * get the flag image URL for the locale
   *
   * @param {string} locale the target locale
   * @return {string} URL to the flag image from the `region-flags` package
   */
  flag: function (locale) {
    var flag;
    if (locale) {
      flag = locale2country(locale);
    }
    if (flag) {
      var url = document.createElement('a');
      var pngRelPath = '../region-flags/png/';
      var resolvedPngRelPath = this.resolveUrl(pngRelPath);
      url.href = resolvedPngRelPath;
      if (resolvedPngRelPath === pngRelPath ||
          url.pathname === pngRelPath.substring(2)) {
        // Fix #41 and #44: avoid bug in polymer-build bundler with corrupted assetpath
        var top = document.querySelector('live-localizer');
        url.href = top.resolveUrl(pngRelPath + flag + '.png');
      }
      else {
        url.href = this.resolveUrl(pngRelPath + flag + '.png');
      }
      return ('/' + url.pathname).replace(/^\/\//, '/');
    }
    else {
      return '';
    }
  },

  /**
   * get a tooltip message for the current selected status
   *
   * @param {Boolean} selected selected status
   * @param {Array} tooltips `this.tooltips`
   * @return {String} tooltip
   */
  tooltip: function (selected, tooltips) {
    if (tooltips) {
      if (selected) {
        return tooltips[0];
      }
      else {
        return tooltips[1];
      }
    }
    else {
      return '';
    }
  },

  /**
   * Return the current drag-handle-mode as DraggableBehavior
   *
   * The icon is draggable if it is selected and follow-selected
   *
   * Override the method in DraggableBehavior
   */
  getDragHandleMode: function (e) {
    var mode;
    if (this.selected && this.followSelected) {
      mode = 'drag';
    }
    else {
      mode = 'none';
    }
    return mode;
  }
});
