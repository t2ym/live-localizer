/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import '@polymer/polymer/polymer-legacy.js';

import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import 'i18n-behavior/i18n-behavior.js';
import { Polymer as Polymer$0 } from '@polymer/polymer/lib/legacy/polymer-fn.js';

Polymer$0({
  importMeta: import.meta,

  _template: Polymer.html`
    <style>

      :host {
        display: block;
        --app-primary-color: #4285f4;
        --app-secondary-color: black;
      }

      app-header {
        background-color: var(--app-primary-color);
        color: #fff;
      }
      app-header paper-icon-button {
        --paper-icon-button-ink-color: white;
      }

      .drawer-list {
        margin: 0 20px;
      }
      .drawer-list a {
        display: block;
        padding: 0 16px;
        line-height: 40px;
        text-decoration: none;
        color: var(--app-secondary-color);
      }
      .drawer-list a.iron-selected {
        color: black;
        font-weight: bold;
      }
      .drawer-list a.subroute {
        padding-left: 32px;
      }


    </style>

    <app-location route="{{route}}"></app-location>
    <app-route route="{{route}}" pattern="{{_resolveUrlPath(':page')}}" data="{{routeData}}" tail="{{subroute}}"></app-route>

    <app-drawer-layout fullbleed="">

      <!-- Drawer content -->
      <app-drawer slot="drawer">
        <app-toolbar>Menu</app-toolbar>
        <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
          <a name="view1" href="{{_resolveUrlPath('view1')}}">View One</a>
          <a name="view2" href="{{_resolveUrlPath('view2')}}">View Two</a>
          <a name="view3" href="{{_resolveUrlPath('view3')}}">View Three</a>
        </iron-selector>
      </app-drawer>

      <!-- Main content -->
      <app-header-layout has-scrolling-region="">

        <app-header condenses="" reveals="" effects="waterfall">
          <app-toolbar>
            <paper-icon-button icon="menu" drawer-toggle=""></paper-icon-button>
            <div title="">My App</div>
          </app-toolbar>
        </app-header>

        <iron-pages role="main" selected="[[page]]" attr-for-selected="name">
          <my-view1 name="view1"></my-view1>
          <my-view2 name="view2"></my-view2>
          <my-view3 name="view3"></my-view3>
        </iron-pages>

      </app-header-layout>

    </app-drawer-layout>
`,

  is: 'my-app',
  behaviors: [ BehaviorsStore.I18nBehavior ],

  properties: {

    page: {
      type: String,
      reflectToAttribute: true,
      observer: '_pageChanged'
    },

  },

  observers: [
    '_routePageChanged(routeData.page)'
  ],

  _routePageChanged: function(page) {
    if (page === 'index.html' || (page && page.match(/-test[.]html$/))) {
      page = '';
    }
    this.page = page || 'view1';
  },

  _pageChanged: function(page) {
    if (page.indexOf('-test.html') >= 0) {
      return;
    }
    // load page import on demand.
    this.importHref(
      this.resolveUrl('my-' + page + '.html'), null, null, true);
  },

  _resolveUrlPath: function(name) {
    var url = document.createElement('a');
    url.href = this.resolveUrl('.') + name;
    return url.pathname;
  }
});
