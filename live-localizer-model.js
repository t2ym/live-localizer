/**
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/**

## Live Localizer model

`<live-localizer-model>` element is contained by `<live-localizer-panel>` and
provides Live Localizer panel elements with the interface to the i18n-behavior variable manipulations.

@group I18nBehavior
@element live-localizer-model
@demo demo/index.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import '@polymer/iron-ajax/iron-ajax.js';
import 'i18n-behavior/i18n-controller-behavior.js';
import { Polymer as Polymer$0 } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import XliffConv from 'xliff-conv/esm/xliff-conv.js';
import deepcopy from 'deepcopy/dist/deepcopy.js';
Polymer$0({
  importMeta: import.meta,

  _template: html`
    <style>
      :host {
        display: none;
      }
    </style>
    <iron-ajax id="ajax" handle-as="json" url="{{startUrl}}bundle.json" on-response="handleBundleResponse" on-error="handleBundleError">
    </iron-ajax>
`,

  is: 'live-localizer-model',

  behaviors: [
    BehaviorsStore.I18nControllerBehavior,
    BehaviorsStore.I18nBehavior
  ],

  properties: {

    /**
     * list of files
     */
    filelist: {
      type: Array,
      value: function () { return []; },
      notify: true
    },

    /**
     * list of stats items
     */
    listItems: {
      type: Array,
      value: function () { return []; },
      notify: true
    },

    /**
     * map of storage elements
     */
    storage: {
      type: Object,
      value: function () { return {}; }
    },

    /**
     * default bundle object from bundle.json
     */
    defaultBundle: {
      type: Object
    },

    /**
     * list of non-default locales
     */
    bundleLocales: {
      type: Array
    },

    /**
     * true if the server has been updated
     */
    serverUpdated: {
      type: Boolean,
      value: false,
      notify: true
    },

    /**
     * alert message to show
     */
    modelAlert: {
      type: String,
      value: '',
      notify: true
    }
  },

  observers: [
    'fileAddedOrRemoved(filelist.splices)'
  ],

  listeners: {
    'default-bundle-fetched': 'onDefaultBundleFetched',
    'bundle-set-fetched': 'onBundleSetFetched'
  },

  /**
   * attached callback
   */
  attached: function () {
    setTimeout(function () {
      this.fetch();
    }.bind(this), 1000);
  },

  /**
   * start fetching bundle.json, followed by non-default bundle JSONs
   */
  fetch: function () {
    if (this.lastModified) {
      this.$.ajax.headers['If-Modified-Since'] = this.lastModified;
    }
    this.$.ajax.generateRequest();
  },

  /**
   * parse XLIFF and load the contents into JSON
   *
   * `load-xliff` event is fired on load
   *
   * @param {string} xliff XLIFF content
   * @param {Object} options { bundle: bundle } to set target JSON object
   * @param {Function} callback Callback on finish with XliffConv.parseXliff callback arguments
   */
  parseXliff: function (xliff, options, callback) {
    var it = this;
    var xliffConv = new XliffConv();
    this.checkXliffConvVersion(xliffConv);
    xliffConv.parseXliff(xliff, options, function (output, stats) {
      callback(output, stats);
      for (var locale in it.masterBundles) {
        if (locale && locale !== it.defaultLang &&
            it.masterBundles[locale] && it.masterBundles[locale].bundle) {
          if (output === it.masterBundles[locale]) {
            console.log('load-xliff', locale);
            it.fire('load-xliff', { locale: locale, stats: stats });
          }
        }
      }
    });
  },

  /**
   * update the locale of the app
   *
   * @param {string} locale the target locale to switch
   */
  updateLocale: function (locale) {
    //console.log('updateLocale ' + locale);
    var option = {};
    var file = this.selectedFile(option);
    var ext = '-x-transitional';
    if ((!file && this.html.getAttribute('lang') !== locale) ||
        (file && file.locale !== locale)) {
      this.html.setAttribute('lang', locale);
    }
    else {
      if (file && file.locale) {
        this.masterBundles[file.locale + ext] = deepcopy(this.masterBundles[file.locale]);
        this.masterBundles[file.locale + ext].bundle = Date.now();
        this.html.setAttribute('lang', file.locale + ext);
      }
      else {
        this.html.setAttribute('lang', this.defaultLang);
      }
      this.async(function () {
        this.html.setAttribute('lang', locale);
        if (typeof option.index === 'number') {
          this.splice('filelist', option.index, 1, { locale: file.locale });
        }
        else {
          this.fetchBundleSet();
        }
        var intervalID = setInterval(function () {
          if (file && file.locale && this.masterBundles[file.locale + ext]) {
            if (Date.now() - this.masterBundles[file.locale + ext].bundle >= 1000) {
              delete this.masterBundles[file.locale + ext];
              clearInterval(intervalID);
            }
          }
          else {
            clearInterval(intervalID);
          }
        }.bind(this), 100);
      }, 1);
    }
  },

  /**
   * `response` event handler for fetching bundle.json
   *
   * Fire `default-bundle-fetched` event
   *
   * @param {Object} event The `response` event
   */
  handleBundleResponse: function (event) {
    if (this.lastModified) {
      // bundle.json has been updated on the server
      this.serverUpdated = true;
    }
    else {
      // initialize defaultBundle only once
      this.defaultBundle = event.detail.response;
      this.lastModified = event.detail.xhr.getResponseHeader('Last-Modified');
    }
    this.fire('default-bundle-fetched', { success: !this.serverUpdated });
    return false;
  },

  /**
   * `error` event handler for fetching bundle.json
   *
   * Fire `default-bundle-fetched` event
   *
   * @param {Object} event The `error` event
   */
  handleBundleError: function (event) {
    this.fire('default-bundle-fetched', { success: false }); // including 304 Not Modified
    return false;
  },

  /**
   * `default-bundle-fetched` event handler
   *
   * Trigger fetching non-defult bundle JSONs
   *
   * @param {Object} event The `default-bundle-fetched` event
   */
  onDefaultBundleFetched: function (event) {
    //console.log('onDefaultBundleFetched', event.detail);
    if (event.detail.success) {
      if (!this.fetchingFilelist) {
        this.fetchBundleSet();
      }
    }
    else {
      if (!this.serverUpdated) {
        this.scheduleFetch();
      }
    }
    return false;
  },

  /**
   * `bundle-set-fetched` event handler
   */
  onBundleSetFetched: function (event) {
    this.scheduleFetch();
  },

  /**
   * schedule `fetch()` after 60sec
   */
  scheduleFetch: function () {
    if (!this.scheduled) {
      this.scheduled = true;
      setTimeout(function () {
        this.scheduled = false;
        if (!this.serverUpdated) {
          this.fetch();
        }
      }.bind(this), 60000);
    }
  },

  /**
   * get the list of locales
   *
   * @return {Array} list of locales
   */
  getLocaleList: function () {
    var locales = [];
    if (this.defaultBundle) {
      for (var module in this.defaultBundle) {
        if (this.defaultBundle[module].meta &&
            this.defaultBundle[module].meta.locales) {
          for (var i = 0; i < this.defaultBundle[module].meta.locales.length; i++) {
            if (locales.indexOf(this.defaultBundle[module].meta.locales[i]) < 0) {
              locales.push(this.defaultBundle[module].meta.locales[i]);
            }
          }
        }
      }
    }
    return locales;
  },

  /**
   * fetch non-default bundle JSONs
   *
   * @return {Promise} Promise for the list of fetched bundles
   */
  fetchBundleSet: function () {
    var it = this;
    it.bundleLocales = it.getLocaleList();
    console.log('bundleLocales = ', it.bundleLocales);
    it.fetchingFilelist = it.bundleLocales.map(function (locale) {
      var file = Object.create(null);
      file.locale = locale;
      return file;
    });

    while (it.shift('filelist')) {} // clean up filelist

    // default lang
    var defaultFile = Object.create(null);
    defaultFile.locale = it.defaultLang;
    console.log('push ' + defaultFile.locale + ' to filelist');
    it.push('filelist', defaultFile);

    // fetch non-default
    it.map(it.fetchingFilelist, function (file) {
      return new Promise(function (resolve, reject) {
        var langUpdated = function (e) {
          console.log('lang-updated', e.detail);
          it.removeEventListener('lang-updated', langUpdated);
          if (it.masterBundles[file.locale] &&
              it.masterBundles[file.locale].bundle &&
              Object.keys(it.masterBundles[file.locale]).length > 1) {
            resolve(file);
          }
          else {
            reject(new Error('Could not fetch bundle for ' + file.locale));
          }
        };
        it.addEventListener('lang-updated', langUpdated);
        console.log('fetching bundle for locale = ' + file.locale);
        it.lang = file.locale;
      })
      .then(function (file) {
        console.log('push ' + file.locale + ' to filelist');
        it.push('filelist', file);
        return file;
      });
    })
    .then(function (result) {
      console.log('fetched bundles', result);
      it.fetchingFilelist = null;
      it.lang = '';
      it.fire('bundle-set-fetched', result);
    });
  },

  /**
   * convert JSON to XLIFF
   *
   * Output `file` object:
   * ```
   * {
   *   name: 'bundle.{locale}.xlf',
   *   text: '{XLIFF in string}',
   *   stats: stats object,
   *   locale: '{locale}'
   * }
   *
   * @param {Object} file file.locale to specify the locale of the target bundle
   * @param {Function} callback Callback funtion with file argument
   */
  setXliff: function (file, callback) {
    if (this.defaultLang) {
      var xliffConv = new XliffConv();
      var locale = file.locale;
      this.checkXliffConvVersion(xliffConv);
      if (locale) {
        (function (destLanguage) {
          var bundles = { '': this.defaultBundle };
          bundles[destLanguage] = deepcopy(locale === this.defaultLang
                                            ? this.defaultBundle
                                            : this.masterBundles[destLanguage]);
          xliffConv.parseJSON(bundles, {
            srcLanguage: this.defaultLang,
            destLanguage: destLanguage
          }, function (output, stats) {
            var file = Object.create(null);
            file.name = 'bundle.' + destLanguage + '.xlf';
            file.text = output;
            file.stats = stats;
            file.locale = destLanguage;
            //console.log(file.name, JSON.stringify(stats, null, 2));
            callback(file);
          }.bind(this));
        }.bind(this))(locale);
      }
      else {
        callback();
      }
    }
    else {
      callback();
    }
  },

  /**
   * splices event handler for filelist
   *
   * Update listItems with new statistics
   *
   * @param {Object} changeRecord splices object
   */
  fileAddedOrRemoved: function (changeRecord) {
    var it = this;
    if (changeRecord && changeRecord.indexSplices) {
      it.map(changeRecord.indexSplices, function (splice) {
        return new Promise(function (resolve, reject) {
          it.splice('listItems', splice.index, splice.removed.length);
          var added = [];
          for (var i = 0; i < splice.addedCount; i++) {
            added.push(splice.object[splice.index + i]);
          }
          it.map(added, function (file, index, array) {
            return new Promise(function (resolveAdded, rejectAdded) {
              it.setXliff(file, function (result) {
                if (result && result.stats) {
                  var stats = result.stats.xliff;
                  /*
                    <th>Name</th>
                    <th>Locale</th>
                    <th>Total Units</th>
                    <th>Translated</th>
                    <th>Needs Review</th>
                    <th>Needs Translation</th>
                    <th>New</th>
                    */
                  var value = [
                    result.name,
                    result.locale,
                    stats.total.units || 0,
                    stats.total.states.translated || 0,
                    stats.total.states['needs-review-translation'] || 0,
                    stats.total.states['needs-translation'] || 0,
                    stats.total.states.new || 0
                  ];
                  it.splice('listItems', splice.index + index, 0, value);
                  file.tasks = value[2] - value[3]; // remaining units
                  it.fire('list-item-added', { locale: result.locale, index: splice.index + index });
                  resolveAdded(file);
                }
                else {
                  file.tasks = 0;
                  rejectAdded(file);
                }
              });
            });
          })
          .then(function (value) {
            resolve(splice);
          });
        });
      })
      .then(function (result) {
        //console.log('fileAddedOrRemoved', result);
      });
    }
  },

  /**
   * check if the target locale is currently selected
   *
   * @param {string} locale the target locale
   * @return {Boolean} true if the target locale is selected
   */
  isSelected: function (locale) {
    var lang;
    var fallbackLanguages = this._enumerateFallbackLanguages(this.html.lang);
    locale = this._enumerateFallbackLanguages(locale).shift();
    if (this.bundleLocales) {
      for (var i = 0; !lang && i < fallbackLanguages.length; i++) {
        for (var j = 0; !lang && j < this.bundleLocales.length; j++) {
          if (this.bundleLocales[j] === fallbackLanguages[i]) {
            lang = this.bundleLocales[j];
            break;
          }
        }
      }
    }
    return locale === lang ||
           (!lang && locale === this.defaultLang);
  },

  /**
   * get the currently selected file
   *
   * @param {Object} option output option.index for index in filelist
   * @return {Object} the currently selected file
   */
  selectedFile: function (option) {
    var lang;
    var fallbackLanguages = this._enumerateFallbackLanguages(this.html.lang);
    option = option || {};
    if (this.bundleLocales && this.filelist) {
      for (var i = 0; !lang && i < fallbackLanguages.length; i++) {
        for (var j = 0; !lang && j < this.bundleLocales.length; j++) {
          if (this.bundleLocales[j] === fallbackLanguages[i]) {
            lang = this.bundleLocales[j];
            break;
          }
        }
      }
      for (var k = 0; k < this.filelist.length; k++) {
        if (this.filelist[k].locale === lang) {
          option.index = k;
          return this.filelist[k];
        }
        else if (!lang && this.filelist[k].locale === this.defaultLang) {
          option.index = k;
          return this.filelist[k];
        }
      }
    }
    return null;
  },

  /**
   * get the normalized locale name
   *
   * @return {string} the normalized locale name
   */
  getNormalizedLocale: function (locale) {
    return this._enumerateFallbackLanguages(locale).shift();
  },

  /**
   * <html lang> attribute mutation observer
   *
   * Override I18nBehavior._handleHtmlLangChange and fire `html-lang-mutation` events
   *
   * @param {Array} mutations list of Mutation objects
   */
  _handleHtmlLangChange: function (mutations) {
    mutations.forEach(function(mutation) {
      switch (mutation.type) {
      case 'attributes':
        if (mutation.attributeName === 'lang') {
          this.fire('html-lang-mutation');
        }
        break;
      default:
        break;
      }
    }, this);
  },

  /**
   * Reload the app at `startUrl`
   */
  reload: function () {
    window.sessionStorage.setItem('live-localizer-reload-url', window.location.href); // interpreted by live-localizer.attach()
    window.history.pushState({}, '', this.startUrl);
    (this._reload || window.location.reload).call(window.location, true);
  },

  /**
   * check XliffConv version
   *
   * @param {Object} xliffConv xliffConv.toolVersion contain semver with 'a.b.c' format
   * @return {Boolean} true if the version is satisfied
   */
  checkXliffConvVersion: function (xliffConv) {
    if (xliffConv && xliffConv.toolVersion) {
      if ([ (xliffConv.toolVersion + '.0.0').split(/[.]/).splice(0, 3).join('.'),
              this.expectedXliffConvVersion
        ].map(function (semver) {
          var n = 0;
          return semver.split(/[.]/).map(function (str) {
            return Number(str);
          }).reduce(function (curr, prev) {
            return curr * 1000 + prev;
          }, 0);
        }).reduce(function (curr, prev) {
          return curr >= prev;
        })
      ) {
        this.modelAlert = '';
      }
      else {
        this.modelAlert = 'Incompatible xliff-conv ' + xliffConv.toolVersion + ' (' + this.expectedXliffConvVersion + ' expected)';
      }
    }
    else {
      this.modelAlert = 'Incompatible xliff-conv with no version information';
    }
    return !this.modelAlert;
  },

  /**
   * expected xliff-conv version
   */
  expectedXliffConvVersion: '1.0.12',

  /**
   * async map for Array
   *
   * Note: The original Array is replaced. No new Array is generated.
   *
   * @return {Promise} mapped array
   */
  map: function (array, fn, assign) {
    assign = assign || function (value, index, array) {
      array[index] = value;
      return index + 1;
    };
    return (function wrapper (array, index) {
      function next (value) {
        return wrapper(array, assign(value, index, array));
      }
      return index < array.length ? fn(array[index], index, array).then(next).catch(next) : array;
    })(array, 0);
  }
});
