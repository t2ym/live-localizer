/**
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/**

## live-localizer-locale-icon-view

`<live-localizer-locale-icon-view>` element shows the list of `<live-localizer-locale-icon>` icons in the icon view.

- The locale of the app can be switched by clicking an unselected icon.
- XLIFF for the locale of the clicked selected icon can be downloaded as a local file.
- XLIFF file can be loaded by dragging and dropping the file from the file manager of the platform OS.

@group I18nBehavior
@element live-localizer-locale-icon-view
@demo demo/index.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import './live-localizer-locale-icon.js';
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
      }
      .droparea {
        height: 100%;
      }
      .filelistarea {
        padding: 16px;
      }
    </style>
    <div id="droparea" class="droparea layout vertical" on-dragover="onDragOver" on-drop="onDrop" on-mouseenter="onDropAreaMouseenter">
      <div class="filelistarea layout horizontal wrap">
        <template is="dom-repeat" items="{{filelist}}">
          <live-localizer-locale-icon id="locale-icon-{{item.locale}}" file="{{item}}" on-tap="onLocaleIconTap" on-badge-tap="onBadgeTap" model="{{model}}"></live-localizer-locale-icon>
        </template>
      </div>
      <div class="flex"></div>
    </div>
    <paper-tooltip id="droptooltip" for="droparea" offset="-20" manual-mode="">Drag and drop XLIFF to load</paper-tooltip>
`,

  is: 'live-localizer-locale-icon-view',

  properties: {
    /**
     * list of files bound to the `filelist` property of the `<live-localizer-model>` element
     */
    filelist: {
      type: Array
    },

    /**
     * the model object bound to the `<live-localizer-model>` element
     */
    model: {
      type: Object
    }
  },

  /**
   * `tap` event handler of the icons
   *
   * - Save the XLIFF file if it is selected
   * - Switch the current locale if it is not selected
   *
   * Note:
   * - Saving is performed via `save()` method of the registered `file-storage` in the model
   *
   * @param {Object} e `tap` event from the tapped icon
   */
  onLocaleIconTap: function (e) {
    var icon = dom(e).localTarget;
    var file = icon.file;
    if (icon.selected) {
      this.model.storage['file-storage'].save(file);
    }
    else {
      this.model.html.lang = file.locale;
    }
  },

  /**
   * `dragover` event handler for the drop area
   *
   * Prevent the default action so that the dragged file can be dropped.
   */
  onDragOver: function (e) {
    e.preventDefault();
  },

  /**
   * `drop` event handler for the drop area
   *
   * Load the dropped file via `load()` method of the registered `file-storage` in the model
   */
  onDrop: function (e) {
    e.preventDefault();
    this.model.storage['file-storage'].selected = true;
    this.model.storage['file-storage'].load(e);
  },

  /**
   * `mouseenter` event handler for the drop area
   *
   * Show the tooltip for the drop area
   */
  onDropAreaMouseenter: function (e) {
    this.$.droptooltip.show();
    setTimeout(function () {
      this.$.droptooltip.hide();
    }.bind(this), 3000);
  },

  /**
   * `badge-tap` event handler for `<live-localizer-locale-icon>` icons
   *
   * Stop propagation and fire `locale-badge-tap` event with the locale parameter
   */
  onBadgeTap: function (e) {
    e.stopPropagation();
    this.fire('locale-badge-tap', { locale: e.detail.locale });
  }
});
