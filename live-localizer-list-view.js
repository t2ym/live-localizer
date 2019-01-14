/**
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/**

## live-localizer-list-view

`<live-localizer-list-view>` element shows the list of statistics for the locales as a table

@group I18nBehavior
@element live-localizer-list-view
@demo demo/index.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import '@vaadin/vaadin-grid/vaadin-grid.js';
import { Polymer as Polymer$0 } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

const documentContainer = document.createElement('template');
documentContainer.innerHTML = `
  <dom-module id="live-localizer-list-view-grid-theme" theme-for="vaadin-grid">
    <template>
      <style>
        thead#header {
          box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06),
                0 2px 0 rgba(0, 0, 0, 0.075),
                0 3px 0 rgba(0, 0, 0, 0.05),
                0 4px 0 rgba(0, 0, 0, 0.015);
          box-sizing: border-box;
          display: block;
          left: 0;
          position: absolute;
          top: 0;
          z-index: 10;
          padding-right: 2px;
        }
        tbody#items > tr {
          height: 48px;
        }
        tbody#items > tr[selected] > td {
          background-color: whitesmoke;
          font-weight: bold;
        }
        tbody#items > tr:hover > td {
          background-color: lightgrey;
        }
      </style>
    </template>
  </dom-module>
`;
document.head.appendChild(documentContainer.content);

Polymer$0({
  importMeta: import.meta,

  _template: html`
    <style is="custom-style">
      :host {
        display: block;
      }
      .gridlistarea {
        margin-left: 2px;
        height: 100%;
      }
      vaadin-grid.gridlistarea {

        font-family: Roboto, sans-serif;
        --divider-color: rgba(0, 0, 0, var(--dark-divider-opacity));

        --vaadin-grid-cell: {
          padding: 0;
        };

        --vaadin-grid-header-cell: {
          height: 64px;
          color: rgba(0, 0, 0, var(--dark-secondary-opacity));
          font-size: 12px;
          padding: 0 12px 0 12px;
        };

        --vaadin-grid-body-cell: {
          height: 48px;
          color: rgba(0, 0, 0, var(--dark-primary-opacity));
          font-size: 13px;
        };

        --vaadin-grid-focused-cell: {
          box-shadow: none;
          font-weight: bold;
        };
      }

      vaadin-grid.gridlistarea .cell.numericcell {
        padding-right: 0px;
      }

      vaadin-grid.gridlistarea .cell {
        font-size: 13px;
        color: rgba(0, 0, 0, var(--dark-primary-opacity));
        padding: 0 12px 0 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-right: 56px;
      }

      vaadin-grid.gridlistarea .cell.header {
        color: rgba(0, 0, 0, var(--dark-secondary-opacity));
        font-size: 12px;
        text-align: left;
        width: 100%;
      }

      vaadin-grid.gridlistarea .cell.text {
        font-size: 13px;
        color: rgba(0, 0, 0, var(--dark-primary-opacity));
        padding: 0 12px 0 12px;
        text-align: left;
        width: 100%;
      }

      vaadin-grid.gridlistarea .cell.last {
        padding-right: 24px;
      }

      vaadin-grid.gridlistarea paper-checkbox {
        --primary-color: var(--paper-indigo-500);
        margin: 0 24px;
      }

      vaadin-grid.gridlistarea vaadin-grid-sorter {
        --vaadin-grid-sorter-arrow: {
          display: none !important;
        };
      }

      vaadin-grid.gridlistarea vaadin-grid-sorter .cell {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      vaadin-grid.gridlistarea vaadin-grid-sorter iron-icon {
        transform: scale(0.8);
      }

      vaadin-grid.gridlistarea vaadin-grid-sorter:not([direction]) iron-icon {
        color: rgba(0, 0, 0, var(--dark-disabled-opacity));
      }

      vaadin-grid.gridlistarea vaadin-grid-sorter[direction] {
        color: rgba(0, 0, 0, var(--dark-primary-opacity));
      }

      vaadin-grid.gridlistarea vaadin-grid-sorter[direction=desc] iron-icon {
        transform: scale(0.8) rotate(180deg);
      }

    </style>
    <vaadin-grid id="list" class="gridlistarea" items="{{listItems}}" selection-mode="single" active-item="{{activeItem}}" on-selected-items-changed="onListSelection">

        <vaadin-grid-column flex="1">
          <template class="header">
            <div class="cell header">Name</div>
          </template>
          <template>
            <div class="cell text">[[item.0]]</div>
          </template>
        </vaadin-grid-column>

        <vaadin-grid-column flex="1">
          <template class="header">
            <div class="cell header">Locale</div>
          </template>
          <template>
            <div class="cell text">[[item.1]]</div>
          </template>
        </vaadin-grid-column>

        <vaadin-grid-column text-align="end" width="100px">
          <template class="header">
            <div class="cell header">Total Units</div>
          </template>
          <template>
            <i18n-number class="cell numericcell">[[item.2]]</i18n-number>
          </template>
        </vaadin-grid-column>

        <vaadin-grid-column text-align="end" width="100px">
          <template class="header">
            <div class="cell header">Translated</div>
          </template>
          <template>
            <i18n-number class="cell numericcell">[[item.3]]</i18n-number>
          </template>
        </vaadin-grid-column>

        <vaadin-grid-column text-align="end" width="100px">
          <template class="header">
            <div class="cell header">Needs Review</div>
          </template>
          <template>
            <i18n-number class="cell numericcell">[[item.4]]</i18n-number>
          </template>
        </vaadin-grid-column>

        <vaadin-grid-column text-align="end" width="100px">
          <template class="header">
            <div class="cell header">Needs Translation</div>
          </template>
          <template>
            <i18n-number class="cell numericcell">[[item.5]]</i18n-number>
          </template>
        </vaadin-grid-column>

        <vaadin-grid-column text-align="end" width="100px">
          <template class="header">
            <div class="cell header">New</div>
          </template>
          <template>
            <i18n-number class="cell numericcell">[[item.6]]</i18n-number>
          </template>
        </vaadin-grid-column>

    </vaadin-grid>
`,

  is: 'live-localizer-list-view',

  properties: {
    /**
     * the model object bound to the `<live-localizer-model>` element
     */
    model: {
      type: Object,
      notify: true
    },

    /**
     * list of stats items bound to the `listItems` property of the `<live-localizer-model>` element
     */
    listItems: {
      type: Array
    },

    /**
     * true if vaadin-grid is version 1.x
     */
    version1: {
      type: Boolean,
      value: false
    },

    /**
     * true if vaadin-grid is version 2.x
     */
    version2: {
      type: Boolean,
      value: true
    },

    /**
     * the current active item
     */
    activeItem: {
      observer: '_activeItemChanged'
    }
  },

  observers: [
    'modelReady(model)'
  ],

  /**
   * observer of `this.model`
   *
   * Initialize `html-lang-mutation` and `list-item-added` event listeners for `this.model`
   *
   * @param {Object} model `<live-localizer-model>` object
   */
  modelReady: function (model) {
    if (model && !this.isModelReady) {
      this.onListAddedBindThis = this.onListAdded.bind(this);
      this.onHtmlLangMutationBindThis = this.onHtmlLangMutation.bind(this);
      this.model.addEventListener('list-item-added', this.onListAddedBindThis);
      this.model.addEventListener('html-lang-mutation', this.onHtmlLangMutationBindThis);
      this.isModelReady = true;
    }
  },

  ready: function () {
  },

  /**
   * detached callback
   *
   * Uninitialize `html-lang-mutation` and `list-item-added` event listeners for `this.model`
   */
  detached: function () {
    this.model.removeEventListener('list-item-added', this.onListAddedBindThis);
    this.model.removeEventListener('html-lang-mutation', this.onHtmlLangMutationBindThis);
  },

  /**
   * true if the locale is currently selected
   *
   * @param {String} locale The target locale
   */
  isSelected: function (locale) {
    return this.model.isSelected(locale);
  },

  /**
   * Refresh the table
   */
  refresh: function () {
    this.$.list.clearCache();
  },

  /**
   * `html-lang-mutation` event handler for `this.model`
   *
   * Update the selection of the table according to the current locale of the app
   *
   * @param {Object} e `html-lang-mutation` event
   */
  onHtmlLangMutation: function (e) {
    var locale = this.model.getNormalizedLocale(this.model.html.lang);
    var selected = this.$.list.selectedItems.map(function (item) {
          for (var i = 0; i < this.model.listItems.length; i++) {
            if (this.model.listItems[i][1] === item[1]) {
              return i;
            }
          }
          return this.model.listItems.length;
        }.bind(this));
    var selectedLocale = '';
    if (selected.length > 0 &&
        this.model.listItems.length > selected[0]) {
      selectedLocale = this.model.listItems[selected[0]][1];
    }
    if (selectedLocale !== locale) {
      for (var i = 0; i < this.model.listItems.length; i++) {
        if (this.model.listItems[i][1] === locale) {
          this.$.list.selectedItems = [this.model.listItems[i]];
          break;
        }
      }
      if (i >= this.model.listItems.length) {
        this.$.list.selectedItems = [];
      }
    }
    e.stopPropagation();
  },

  /**
   * set up the renderer for numbers in the table
   *
   * The numbers are shown in right-aligned and in comma-formatted.
   */
  setUpNumberRenderer: function () {
    for (var i = 2; i <= 6; i++) {
      this.$.list.columns[i].renderer = function(cell) {
        cell.element.innerHTML = '<i18n-number style="margin-left: auto;">' + cell.data + '</i18n-number>';
      };
    }
  },

  /**
   * observer of `activeItem`
   *
   * Update the `selectedItems` according to the `activeItem`
   */
  _activeItemChanged: function(item) {
    if (item) {
      this.$.list.selectedItems = [item];
    }
  },

  /**
   * `selected-items-changed` event handler for the table
   *
   * Update the locale of the app according to the selected item in the table
   */
  onListSelection: function (e) {
    var selected = this.$.list.selectedItems;
    var selectedIndex = -1;
    if (selected.length > 0 &&
        this.model.listItems) {
      for (var i = 0; i < this.model.listItems.length; i++) {
        if (this.model.listItems[i][1] === selected[0][1]) {
          selectedIndex = i;
          break;
        }
      }
      if (selectedIndex >= 0) {
        this.model.html.lang = this.model.listItems[selectedIndex][1];
      }
    }
  },

  /**
   * `list-item-added` event handler for `this.model`
   *
   * Update the selection status according to the current locale of the app
   */
  onListAdded: function (e) {
    if (e.detail && e.detail.locale) {
      if (this.isSelected(e.detail.locale)) {
        this.$.list.selectedItems = [this.model.listItems[e.detail.index]];
      }
    }
  }
});
