/**
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/**

## Live Localizer panel

`<live-localizer-panel>` element is contained by `<live-localizer-dialog>` and 
shows the toolbar and the selected view of the panel contents.

The element also contains the model element `<live-localizer-model>`, which does not have a view.

### Views:
| view |
|:-----|
| `<live-localizer-locale-icon-view>` |
| `<live-localizer-list-view>` |
| `<live-localizer-storage-view>` |

@group I18nBehavior
@element live-localizer-panel
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
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import { IronResizableBehavior } from '@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-tooltip/paper-tooltip.js';
import './live-localizer-model.js';
import './live-localizer-locale-icon-view.js';
import './live-localizer-list-view.js';
import './live-localizer-storage-view.js';
import { Polymer as Polymer$0 } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
Polymer$0({
  importMeta: import.meta,

  _template: html`
    <style include="iron-flex"></style>
    <style>
      :host {
        display: block;
        width: 100%;
        height: 100%;

        --paper-icon-button: {
          padding: 0px;
          width: 32px;
          height: 24px;
          padding-left: 4px;
          padding-right: 4px;
        }

        --paper-tooltip: {
          padding: 4px;
        }
      }
      .panel-toolbar {
        display: block;
        width: 100%;
        height: 31px;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-color: var(--live-localizer-border-color);
      }
      .toolbar-item {
        display: inline-flex;
        height: 31px;
      }
      .toolbar-item.red {
        color: orangered;
      }
      .view-selector {
        border-style: solid;
        border-top-width: 1px;
        border-bottom-width: 1px;
        border-left-width: 1px;
        border-right-width: 0px;
        border-color: var(--live-localizer-border-color);
        height: 26px;
        width: 26px;
        padding: 0px 1px 0px 0px;
        margin-top: 3px;
      }
      .view-selector.first {
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
        padding-right: 0px;
      }
      .view-selector.last {
        border-right-width: 1px;
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
      }
      .view-selector[selected-view] {
        background-color: var(--live-localizer-color);
        color: var(--live-localizer-background-color);
      }
      .panelarea {
        width: 100%;
        height: calc(100% - 32px);
        max-height: calc(100% - 32px);
        overflow-y: auto;
      }
      .panel-selector {
        height: 100%;
      }
      .panel {
        height: 100%;
      }
      div.toolbar-pad {
        width: 8px;
      }
      paper-tooltip.updated-tooltip {
        --paper-tooltip-background: yellow;
        --paper-tooltip-opacity: 0.9;
        --paper-tooltip-text-color: orangered;
        --paper-tooltip: {
          font-size: 16px;
        }
      }
    </style>
    <div id="toolbar" class="panel-toolbar layout horizontal">
      <div class="flex toolbar-item"></div>
      <paper-icon-button id="iconview-button" name="iconview" class="toolbar-item view-selector first" icon="apps" on-tap="onSelectView"></paper-icon-button>
      <paper-tooltip for="iconview-button" offset="0">Show Icons</paper-tooltip>
      <paper-icon-button id="listview-button" name="listview" class="toolbar-item view-selector" icon="view-list" on-tap="onSelectView"></paper-icon-button>
      <paper-tooltip for="listview-button" offset="0">Show List</paper-tooltip>
      <paper-icon-button id="detailview-button" name="detailview" class="toolbar-item view-selector" icon="view-column" on-tap="onSelectView"></paper-icon-button>
      <paper-icon-button id="storageview-button" name="storageview" class="toolbar-item view-selector last" icon="cloud-circle" on-tap="onSelectView"></paper-icon-button>
      <paper-tooltip for="storageview-button" offset="0">Show Storage</paper-tooltip>
      <div class="toolbar-pad toolbar-item"></div>
      <paper-icon-button id="load" class="toolbar-item" icon="file-upload" on-tap="onFileLoad"></paper-icon-button>
      <paper-tooltip for="load" offset="0">Load XLIFF</paper-tooltip>
      <template is="dom-if" if="{{!serverUpdated}}">
        <paper-icon-button id="locales" class="toolbar-item" icon="language" on-tap="onLocales"></paper-icon-button>
        <paper-tooltip for="locales" offset="0" position="left">Check Updates on Locales</paper-tooltip>
      </template>
      <template is="dom-if" if="{{serverUpdated}}">
        <paper-icon-button id="reload" class="toolbar-item red" icon="refresh" on-tap="onReload"></paper-icon-button>
        <paper-tooltip for="reload" offset="0" position="left">Reload App</paper-tooltip>
      </template>
      <div class="toolbar-pad toolbar-item"></div>
    </div>
    <div id="panelarea" class="panelarea">
      <iron-pages class="panel-selector" role="panel" selected="[[panel]]" attr-for-selected="name">
        <live-localizer-locale-icon-view name="iconview" class="panel" id="icon" model="{{model}}" filelist="{{filelist}}" on-locale-badge-tap="onBadgeTap"></live-localizer-locale-icon-view>
        <live-localizer-list-view name="listview" class="panel" id="list" model="{{model}}" list-items="{{listItems}}"></live-localizer-list-view>
        <live-localizer-storage-view name="storageview" class="panel" id="storage" model="{{model}}" on-locale-badge-tap="onBadgeTap">
          <slot slot="storage-cloud" name="storage-cloud"></slot>
          <slot slot="storage-browser" name="storage-browser"></slot>
          <slot slot="storage-device" name="storage-device"></slot>
        </live-localizer-storage-view>
      </iron-pages>
    </div>
    <paper-tooltip id="updated" class="updated-tooltip" for="panelarea" offset="-40" manual-mode="">App has been updated at server</paper-tooltip>
    <paper-tooltip id="alert" class="updated-tooltip" for="panelarea" offset="-40">{{modelAlert}}</paper-tooltip>
    <live-localizer-model id="model" filelist="{{filelist}}" list-items="{{listItems}}" server-updated="{{serverUpdated}}" model-alert="{{modelAlert}}"></live-localizer-model>
`,

  is: 'live-localizer-panel',

  behaviors: [
    IronResizableBehavior
  ],

  properties: {

    /**
     * name of the currently selected view
     *
     * View names:
     *
     * | name | view |
     * |:-----|:-----|
     * | iconview | `<live-localizer-locale-icon-view>` |
     * | listview | `<live-localizer-list-view>` |
     * | storageview | `<live-localizer-storage-view>` |
     */
    panel: {
      type: String,
      value: 'iconview',
      observer: 'onPanelChanged'
    },

    /**
     * list of files bound to the model
     */
    filelist: {
      type: Array
    },

    /**
     * list of stats items bound to the model
     */
    listItems: {
      type: Array
    },

    /**
     * true if the server build has been updated
     */
    serverUpdated: {
      type: Boolean,
      observer: 'onServerUpdated'
    },

    /**
     * alert message from model
     */
    modelAlert: {
      type: String,
      observer: 'onModelAlert'
    },

    /**
     * the model object bound to the `<live-localizer-model>` element
     */
    model: {
      type: Object
    }

  },

  listeners: {
    'iron-resize': 'onIronResize'
  },

  /**
   * ready callback
   *
   * Initialize `this.model` with `this.$.model`
   */
  ready: function () {
    this.model = this.$.model;
  },

  /**
   * attached callback
   *
   * Initialize `iron-resize` event handler
   */
  attached: function () {
    if (this._parentResizable) {
      this._parentResizable.addEventListener('height-changed', this.onIronResize.bind(this));
    }
  },

  /**
   * observer of `this.panel` property
   *
   * Switch the view
   */
  onPanelChanged: function (panel) {
    var viewSelectors = dom(this.root).querySelectorAll('.view-selector');
    viewSelectors.forEach(function (viewSelector) {
      if (viewSelector.getAttribute('name') === panel) {
        viewSelector.setAttribute('selected-view', '');
      }
      else {
        viewSelector.removeAttribute('selected-view');
      }
    });
    if (panel === 'listview') {
      setTimeout(function () {
        this.$.list.refresh();
      }.bind(this), 200)
    }
    return false;
  },

  /**
   * `tap` event handler of view selector buttons
   *
   * Update `this.panel`
   */
  onSelectView: function (e) {
    var panel = dom(e).localTarget;
    this.panel = panel.getAttribute('name');
  },

  /**
   * `tap` event handler of the locales button
   */
  onLocales: function (e) {
    this.model.fetch();
  },

  /**
   * `tap` event handler of the reload button
   */
  onReload: function (e) {
    this.model.reload();
  },

  /**
   * `tap` event handler of the load button
   */
  onFileLoad: function (e) {
    this.model.storage['file-storage'].updateFiles();
    this.model.storage['file-storage'].selected = true;
    this.model.storage['file-storage'].load(e);
  },

  /**
   * `iron-resize` event handler
   */
  onIronResize: function (e) {
    this.$.panelarea.style.height = (Number(getComputedStyle(this).height.replace(/px$/,'')) - 32) + 'px';
  },

  /**
   * `tap` event handler of badges on the locale icons
   *
   * Switch the locale and the panel to the list view
   */
  onBadgeTap: function (e) {
    e.stopPropagation();
    this.model.html.lang = e.detail.locale;
    this.$['listview-button'].click();
  },

  /**
   * observer of `serverUpdated` which is bound to `model.serverUpdated`
   */
  onServerUpdated: function (serverUpdated) {
    if (serverUpdated) {
      this.$.updated.show();
    }
  },

  /**
   * observer of `modelAlert` which is bound to `model.modelAlert`
   */
  onModelAlert: function (modelAlert) {
    if (modelAlert) {
      this.$.alert.show();
    }
    else {
      this.$.alert.hide();
    }
  }
});
