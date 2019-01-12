/**
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/**

## live-localizer-storage-view

`<live-localizer-storage-view>` element shows the list of the storage icons and the currently selected locale icon.
The icons can be dragged and dropped to one of other icons so that XLIFF can be saved to or loaded from the target storage.

### Classes for the storage elements

Storage views can be specified in the light DOM with the following storage group classes.

| Storage Group | Class |
|:-------------|:------|
| Cloud Storage        | class="storage cloud" |
| Browser Storage      | class="storage browser" |
| Local Device Storage | class="storage device" |

`<live-localizer-local-file-storage>` and `<live-localizer-browser-storage>` are pre-attached in the local DOM.

@group I18nBehavior
@element live-localizer-storage-view
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
import '@polymer/iron-icons/hardware-icons.js';
import '@polymer/iron-icons/av-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-tooltip/paper-tooltip.js';
import './draggable-behavior.js';
import './live-localizer-locale-icon.js';
import './live-localizer-local-file-storage.js';
import './live-localizer-browser-storage.js';
import './live-localizer-firebase-storage.js';
import { Polymer as Polymer$0 } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer$0({
  importMeta: import.meta,

  _template: html`
    <style include="iron-flex"></style>
    <style include="drag-handle-mode"></style>
    <style include="drag-field"></style>
    <style>
      :host {
        display: block;

        --no-select: {
          -moz-user-select: none;
          -ms-user-select: none;
          -webkit-user-select: none;
          user-select: none;
        }
      }
      div.storage-group {
        display: inline-block;
        width: calc(100% - 32px);
        height: 96px;
        margin: 8px;
        padding: 8px;
        border-radius: 12px;
        @apply(--paper-font-common-base);
        font-size: 12px;
        text-align: left;
        background-color: var(--live-localizer-panel-background-color);
        @apply(--shadow-elevation-4dp);
        @apply(--no-select);
      }
      div.storage-group-header {
        width: 64px;
      }
    </style>
    <div class="layout vertical drag-field">
      <div id="cloud" class="storage-group">
        <div class="layout horizontal">
          <div class="storage-group-header layout vertical">
            <iron-icon icon="cloud"></iron-icon>
            <div>Cloud</div>
            <div class="flex"></div>
          </div>
          <slot name="storage-cloud"></slot>
        </div>
      </div>
      <div id="browser" class="storage-group">
        <div class="layout horizontal">
          <div class="storage-group-header layout vertical">
            <iron-icon icon="av:web-asset"></iron-icon>
            <div>Browser</div>
            <div class="flex"></div>
          </div>
          <live-localizer-locale-icon id="locale-icon" follow-selected="" on-tap="" on-badge-tap="onBadgeTap" model="{{model}}" tooltips="[ &quot;Drag to Save&quot;, &quot;Drag to Save&quot; ]" drag-handle-mode="drag" drag-drop-groups="load-targets" drop-targets="save-targets"></live-localizer-locale-icon>
          <live-localizer-browser-storage id="browser-storage" model="{{model}}"></live-localizer-browser-storage>
          <slot name="storage-browser"></slot>
        </div>
      </div>
      <div id="device" class="storage-group">
        <div class="layout horizontal">
          <div class="storage-group-header layout vertical">
            <iron-icon icon="hardware:computer"></iron-icon>
            <div>Device</div>
            <div class="flex"></div>
          </div>
          <live-localizer-local-file-storage id="file-storage" model="{{model}}"></live-localizer-local-file-storage>
          <slot name="storage-device"></slot>
        </div>
      </div>
    </div>
`,

  is: 'live-localizer-storage-view',

  properties: {
    /**
     * the model object bound to the `<live-localizer-model>` element
     */
    model: {
      type: Object,
      notify: true
    }
  },

  observers: [
    'modelReady(model)'
  ],

  listeners: {
    'drag-and-drop': 'onDragAndDrop'
  },

  /**
   * observer of `this.model`
   *
   * Register storage elements to `model`
   *
   * @param {Object} model `<live-localizer-model>` object
   */
  modelReady: function (model) {
    if (model && !this.isModelReady) {
      [ 'storage-cloud', 'storage-browser', 'storage-device' ].forEach(function (name) {
        this.getContentChildren((PolymerElement ? 'slot' : 'content') + '[name="' + name + '"]').forEach(function (storage) {
          storage.model = this.model;
          this.model.storage[storage.id] = storage;
        }, this);
      }, this);
      [ 'file-storage' ].forEach(function (storageId) {
        this.model.storage[storageId] = this.$[storageId];
      }, this);
      this.isModelReady = true;
    }
  },

  /**
   * `badge-tap` event handler for the `<live-localizer-locale-icon>` icon
   *
   * Stop propagation and fire `locale-badge-tap` event with the locale parameter
   */
  onBadgeTap: function (e) {
    e.stopPropagation();
    this.fire('locale-badge-tap', { locale: this.$['locale-icon'].file.locale });
  },

  /**
   * `drag-and-drop` event handler
   *
   * Dispatch the associated operation to the target storage
   *
   * List of supported operations:
   * - `save(e.detail.src.file)` to the storage of the destination icon
   * - `load(e)` to the storage of the source icon
   */
  onDragAndDrop: function (e) {
    //console.log('drag-and-drop event ', e.detail.src, e.detail.dest);
    e.stopPropagation();
    var op;
    var storage;
    var arg;
    if (e.detail.src === this.$['locale-icon']) {
      op = 'save';
      storage = e.detail.dest.storage;
      arg = e.detail.src.file;
    }
    if (e.detail.dest === this.$['locale-icon']) {
      op = 'load';
      storage = e.detail.src.storage;
      arg = e;
    }
    if (op && storage) {
      storage[op](arg);
    }
  }
});
