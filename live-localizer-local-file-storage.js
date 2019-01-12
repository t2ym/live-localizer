/**
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/**

## live-localizer-local-file-storage

`<live-localizer-local-file-storage>` element shows the storage icon and its controls for local file storage.
The element handles save and load operations of XLIFF on local file storage.

@group I18nBehavior
@element live-localizer-local-file-storage
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
import '@polymer/paper-checkbox/paper-checkbox.js';
import './live-localizer-storage-icon.js';
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
        padding: 12px;
      }
      .control-panel-item {
        margin-bottom: 4px;
      }
      .hidden-anchor {
        display: none;
      }
      .hidden-input {
        display: none;
      }
    </style>
    <div id="droparea" class="droparea layout horizontal" on-dragover="onDragOver" on-drop="onDrop" on-mouseenter="onDropAreaMouseenter">
      <live-localizer-storage-icon id="file-storage-icon" selected="{{selected}}" icon="{{icon}}" label="{{label}}" badge-label="{{badgeLabel}}" badge-color="{{badgeColor}}" badge-tooltip="Discarded Units" on-tap="onTap" drag-handle-mode="drag" drag-drop-groups="save-targets" drop-targets="load-targets" tooltips="[ &quot;Drag to Load&quot;, &quot;Select XLIFF&quot; ]" model="{{model}}"></live-localizer-storage-icon>
      <div class="control-panel layout vertical">
        <paper-checkbox class="control-panel-item" checked="{{prefix}}">Save with Timestamp</paper-checkbox>
        <paper-checkbox class="control-panel-item" checked="{{watcherEnabled}}">Watch and Load XLIFF</paper-checkbox>
        <div class="flex"></div>
      </div>
    </div>
    <paper-tooltip id="droptooltip" for="droparea" offset="-1" manual-mode="">Drag and drop XLIFF to select</paper-tooltip>
    <paper-tooltip id="tooltip" for="droparea" offset="-40" manual-mode="">{{tooltip}}</paper-tooltip>
    <a id="anchor" class="hidden-anchor" target="_blank"></a>
    <input id="fileLoad" type="file" class="hidden-input" on-change="onFileChange">
`,

  is: 'live-localizer-local-file-storage',

  properties: {
    /**
     * name of icon for `<live-localizer-storage-icon>`
     */
    icon: {
      type: String,
      value: 'folder'
    },

    /**
     * label of icon for `<live-localizer-storage-icon>`
     */
    label: {
      type: String,
      value: 'Local File'
    },

    /**
     * true if selected
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
      type: Object
    },

    /**
     * list of files
     *
     * Note:
     * - Only 1 file is stored in a normal usage.
     * - Multiple files are stored when multiple files are dropped in the drop area.
     */
    files: {
      type: Array,
      value: function () { return []; },
      notify: true
    },

    /**
     * true if XLIFF file name is prefixed with timestamp on saving
     */
    prefix: {
      type: Boolean,
      value: false
    },

    /**
     * true if local XLIFF file at http://localhost:{{watchPort}}/{{files.0.name}} has to be watched
     */
    watcherEnabled: {
      type: Boolean,
      value: false
    },

    /**
     * true if local XLIFF file at http://localhost:{{watchPort}}/{{files.0.name}} is being watched
     */
    watching: {
      type: Boolean,
      value: false
    },

    /**
     * watch port number for localhost
     */
    watchPort: {
      type: Number,
      value: 8887
    },

    /**
     * watch URL path for localhost
     */
    watchPath: {
      type: String,
      value: '/'
    },

    /**
     * tooltip
     */
    tooltip: {
      type: String,
      value: ''
    }
  },

  observers: [
    'updateStats(files.splices)',
    'updateLabel(selected,files.splices)',
    'updateWatcher(selected,watcherEnabled,watchPort,watchPath)'
  ],

  /**
   * ready callback
   *
   * Initialize `storage` property for file-storage-icon
   */
  ready: function () {
    this.$['file-storage-icon'].storage = this;
    this.watcherBindThis = this.watcher.bind(this);
  },

  /**
   * `tap` event handler of the storage icon
   *
   * Load a file
   */
  onTap: function (e) {
    this.load(e);
  },

  /**
   * `dragover` event handler for the drop area
   *
   * Prevent the default action to enable dropping of files
   */
  onDragOver: function (e) {
    e.preventDefault();
  },

  /**
   * `drop` event handler for the drop area
   *
   * Load a file
   */
  onDrop: function (e) {
    e.preventDefault();
    this.selected = false;
    this.load(e);
  },

  /**
   * `mouseenter` event handler for the drop area
   *
   * Show the tooptip for the drop area for 3 seconds
   */
  onDropAreaMouseenter: function (e) {
    this.$.droptooltip.show();
    setTimeout(function () {
      this.$.droptooltip.hide();
    }.bind(this), 3000);
  },

  /**
   * trigger `click` event on the hidden input element for loading files
   */
  loadFile: function () {
    this.$.fileLoad.click();
  },

  /**
   * `change` event handler for the hidden input element for loading files
   *
   * Update `files` property by the updated list of the files in the hidden input element
   */
  onFileChange: function (e) {
    e.preventDefault();
    this.updateFiles(this.selected, e.target.files);
    if (e.target.files.length === 0) {
      this.selected = false;
    }
    this.load(e);
  },

  /**
   * update `label` of the icon according to the `selected` status and the `files`
   *
   * 'Local File' is shown if unselected
   */
  updateLabel: function () {
    if (this.selected && this.files && this.files.length > 0) {
      this.label = this.files[0].name;
    }
    else {
      this.label = 'Local File';
    }
  },

  /**
   * load XLIFF according to the triggering event
   *
   * Events and Operations:
   * | event | origin | operation |
   * |:------|:-------|:----------|
   * | `change` | `<input type="file">` | load the file |
   * | `drop` | `<div id="droparea">` | load the file if selected |
   * | `tap` | `<live-localizer-storage-icon>` | open file selection dialog |
   * | `tap` | upload icon on panel toolbar | open file selection dialog |
   * | `drag-and-drop` | `<live-localizer-storage-view>` | load the file |
   *
   * @param {Event} event the triggering event
   */
  load: function (event) {
    var files;
    var noload = false;
    switch (event.type) {
    case 'change':
      if (event.target.files && event.target.files.length > 0) {
        files = event.target.files;
      }
      break;
    case 'drop':
      if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
        files = event.dataTransfer.files;
        this.updateFiles(this.selected, files, true);
      }
      break;
    case 'tap':
      if (this.files && this.files.length > 0 &&
          event.target !== this.$['file-storage-icon']) {
        files = this.files;
      }
      else {
        this.updateFiles(this.selected);
        if (event.target === this.$['file-storage-icon']) {
          this.selected = false;
        }
        this.loadFile();
      }
      break;
    case 'drag-and-drop':
      if (this.files && this.files.length > 0) {
        files = this.files;
      }
      else {
        // should not happen
        this.selected = false;
        this.loadFile();
      }
      break;
    default:
      break;
    }
    if (files) {
      if (!this.selected) {
        noload = true;
        this.selected = true;
      }
      this.processFiles(files, noload, function (file, output, stats) {
        file.stats = stats;
        this.updateStats();
      }.bind(this));
      if (!noload) {
        this.selected = false;
      }
    }
  },

  /**
   * update `this.files` and `this.selected`
   *
   * @param {Boolean} selected the new selected status
   * @param {Array} files the files
   * @param {Boolean} clear true if the hidden input files should be cleared
   */
  updateFiles: function (selected, files, clear) {
    if (!files || clear) {
      this.$.fileLoad.value = '';
    }
    while (this.shift('files')) {}
    if (files) {
      for (var i = 0; i < files.length; i++) {
        this.push('files', files[i]);
      }
    }
    this.selected = !!selected;
  },

  /**
   * process files
   *
   * @param {Array} files the target files
   * @param {Boolean} noload true if no loading to the running app
   * @param {Function} callback callback function called with `file`, `outputs`, `stats`
   * @param {Boolean} noclear true if files are not cleared after loading
   */
  processFiles: function (files, noload, callback, noclear) {
    var it = this;
    for (var i = 0; i < files.length; i++) {
      var f = files[i];
      console.log('f.name:' + f.name + 'f.type:' + f.type + 'f.size:' + (f.size / 1000) + ' KB ');
      var reader = new FileReader();
      reader.onload = (function(f) {
        return function(e) {
          var match = f.name.match(/.*[.]([a-zA-Z0-9-]*)[.](xlf|xliff|sdlxliff)$/);
          var locale = '';
          if (match && match[1] !== it.model.defaultLang) {
            locale = match[1];
          }
          else {
            console.log('processFiles: incorrect locale');
          }
          if (locale && it.model.masterBundles[locale] && it.model.masterBundles[locale].bundle) {
            try {
              it.model.parseXliff(e.target.result, {
                bundle: noload 
                  ? deepcopy(it.model.masterBundles[locale])
                  : it.model.masterBundles[locale]
              }, function (output, stats) {
                if (!noload) {
                  it.model.updateLocale(locale);
                }
                if (callback) {
                  callback(f, output, stats);
                }
              });
            }
            catch (e) {
              console.log(e);
              callback(f, noload
                ? deepcopy(it.model.masterBundles[locale])
                : it.model.masterBundles[locale],
                null);
            }
          }
          var file;
          for (var i = 0; i < it.model.filelist.length; i++) {
            if (it.model.filelist[i].locale === locale) {
              file = it.model.filelist[i];
              file.text = e.target.result;
            }
          }
          if (!noload && !noclear) {
            it.updateFiles();
          }
        };
      })(f);
      reader.readAsText(f);
    }
  },

  /**
   * update statistics badge
   *
   * yellow badge if any translation units are to be discarded on loading
   */
  updateStats: function () {
    var badgeColorDiscarded = '';
    var stats = {};
    if (this.files && this.files.length > 0) {
      if (this.files[0].stats) {
        stats = this.files[0].stats.json.total;
        if (stats.discarded > 0) {
          badgeColorDiscarded = 'yellow';
        }
        this.badgeLabel = '' + (stats.discarded > 0 ? stats.discarded : '');
      }
      else {
        badgeColorDiscarded = 'orangered';
        this.badgeLabel = 'Err';
      }
    }

    this.badgeColor = badgeColorDiscarded;
  },

  /**
   * observer of `selected`, `watch`, `watchPort`, and `watchPath`
   *
   * update local file watcher
   *
   * @param {Boolean} selected
   * @param {Boolean} watcherEnabled
   * @param {Number} watchPort
   * @param {String} watchPath
   */
  updateWatcher: function (selected, watcherEnabled, watchPort, watchPath)
  {
    console.log('updateWatcher ', selected, watcherEnabled, watchPort, this.files[0] ? this.files[0].name : '');
    if (selected && watcherEnabled) {
    }
    else {
      if (this.watching) {
        if (this.xhr) {
          this.xhr.removeEventListener('load', this.watcherBindThis);
          this.xhr.removeEventListener('error', this.watcherBindThis);
          this.lastModified = undefined;
        }
        if (typeof this.timeoutID === 'number') {
          clearTimeout(this.timeoutID);
          this.timeoutID = undefined;
        }
        this.xhr = undefined;
        this.watching = false;
      }
    }
    if (selected && watcherEnabled) {
      if (!this.xhr) {
        this.xhr = new XMLHttpRequest();
        this.xhr.addEventListener('load', this.watcherBindThis);
        this.xhr.addEventListener('error', this.watcherBindThis);
      }
      this.lastModified = undefined;
      this.watcher({ type: 'start' });
      this.watching = true;
    }
  },

  /**
   * 'load' and 'error' event handler for this.xhr
   *
   * local file watcher via http://localhost:{{watchPort}}/{{files.0.name}}
   *
   * How to start the watcher in the translator's local host:
   * ```
   * npm install -g http-server # if not installed
   * cd FOLDER_FOR_UPLOADED_XLIFF
   * http-server -d false -c-1 -r -a localhost -p 8887 --cors=If-Modified-Since
   * ```
   *
   * @param {Event} e XMLHttpRequest event
   */
  watcher: function (e) {
    var timeout = 5000;
    var blob;
    switch (e.type) {
    case 'load':
      if (this.xhr.responseText && this.xhr.status < 400) {
        if (this.lastModified) {
          if (this.xhr.responseText.match(/<\/xliff>\s*$/g)) {
            blob = new Blob([this.xhr.responseText], { type: 'application/x-xliff+xml' });
            blob.name = this.files[0].name;
            this.files[0] = blob;
            this.tooltip = 'Detected Change in ' + this.url;                
          }
          else {
            this.tooltip = 'Incomplete XLIFF found at ' + this.url;
            break;
          }
        }
        else {
          this.tooltip = 'Watching ' + this.url;
        }
        /* Load the file */
        this.processFiles(this.files, false, function (file, output, stats) {
          file.stats = stats;
          this.updateStats();
        }.bind(this), true);
        this.lastModified = this.xhr.getResponseHeader('Last-Modified');
      }
      else if (this.xhr.status === 404) {
        this.tooltip = 'File Not Found for ' + this.url;
      }
      else {
        this.tooltip = '';
        timeout = 1000;
      }
      break;
    case 'error':
      this.tooltip = 'Error in watching ' + this.url +
                    '  Be sure to launch HTTP server at http://localhost:' + this.watchPort +
                    ' with the uploaded XLIFF in the HTTP root folder';
      if (window.location.protocol === 'http:') {
        this.watcherProtocolHttps = !this.watcherProtocolHttps;
      }
      timeout = 10000;
      break;
    case 'start':
      timeout = 1;
      break;
    default:
      break;
    }

    if (this.tooltip) {
      this.$.tooltip.show();
      setTimeout(function () {
        this.$.tooltip.hide();
      }.bind(this), timeout);
    }

    this.timeoutID = setTimeout(function () {
      this.url = (this.watcherProtocolHttps ? 'https:' : window.location.protocol) + '//localhost:' + this.watchPort + this.watchPath + this.files[0].name;
      this.xhr.open('GET', this.url);
      if (this.lastModified) {
        this.xhr.setRequestHeader('If-Modified-Since', this.lastModified);
      }
      this.xhr.send();
    }.bind(this), timeout);

    return false;
  },

  /**
   * save XLIFF as a local file
   *
   * Timestamp is prefixed to the local XLIFF file name if `this.prefix` is true
   *
   * Notes:
   * - Only `file.locale` is used in the process
   * - On Safari, the XLIFF content is opened in a blank tab as a plain/text file due to the Safari limitation
   * - On Edge and IE, native API is used for saving the XLIFF file
   *
   * @param {Object} file the target file to save to a local file
   */
  save: function (file) {
    var it = this;
    file.text = null;
    it.model.setXliff(file, function (result) {
      if (result && result.text) {
        var type = /constructor/i.test(HTMLElement) ? 'text/plain' : 'application/x-xliff+xml';
        var blob = new Blob([result.text], { type: type });
        blob.name = it.prefix 
                      ? (new Date()).toISOString().replace(/[.][0-9]*Z$/g, '').replace(/[-T:.]/g, '') + '-' + result.name
                      : result.name;
        if (window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob, blob.name);
        }
        else {
          it.$.anchor.target = navigator.vendor.match(/^Apple/) ? '' : '_blank';
          it.$.anchor.download = blob.name;
          it.$.anchor.href = URL.createObjectURL(blob);
          it.$.anchor.click();
        }
        it.updateFiles(true, [ blob ], true);
        it.processFiles(it.files, true, function (file, output, stats) {
          file.stats = stats;
          it.updateStats();
        });
      }
    });
  }
});
