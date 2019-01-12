/**
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/**

## Floating fab icon for Live Localizer widget for the closed state

This draggable floating fab icon is shown at the bottom-left corner of the window when the widget is closed.  Tap it to open the widget.

@group I18nBehavior
@element live-localizer-fab
@demo demo/index.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import { IronOverlayBehaviorImpl } from '@polymer/iron-overlay-behavior/iron-overlay-behavior.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-fab/paper-fab.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/neon-animation/animations/fade-in-animation.js';
import '@polymer/neon-animation/animations/fade-out-animation.js';
import './draggable-behavior.js';
import { Polymer as Polymer$0 } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { NeonAnimationRunnerBehavior } from '@polymer/neon-animation/neon-animation-runner-behavior.js';
Polymer$0({
  importMeta: import.meta,

  _template: html`
    <style>
      :host {
        display: block;
        position: fixed;
      }
      paper-fab.label {
        padding-bottom: 6px;
        padding-top: 6px;
        --paper-fab-background: var(--live-localizer-background-color);
        --paper-fab-iron-icon: {
          color: var(--live-localizer-fab-color);
          width: 32px;
          height: 32px;
        }
      }
      paper-fab.closed {
        visibility: hidden;
      }
    </style>
    <paper-fab id="fab" class="label" icon="language" title="Live Localizer"></paper-fab>
`,

  is: 'live-localizer-fab',

  behaviors: [
    IronOverlayBehaviorImpl,
    NeonAnimationRunnerBehavior,
    BehaviorsStore.DraggableBehavior
  ],

  properties: {
    /**
     * Configurations for entry and exit animations
     */
    animationConfig: {
      type: Object,
      value: function() {
        return {
          'entry': [{
            name: 'fade-in-animation',
            node: this
          }],
          'exit': [{
            name: 'fade-out-animation',
            node: this
          }]
        };
      }
    },

    /**
     * For IronOverlayBehaviorImpl
     */
    noCancelOnEscKey: {
      type: Boolean,
      value: true
    },

    /**
     * For IronOverlayBehaviorImpl
     */
    noCancelOnOutsideClick: {
      type: Boolean,
      value: true
    }
  },

  listeners: {
    'neon-animation-finish': '_onNeonAnimationFinish'
  },

  /**
   * Attached callback
   *
   * Initialize the position
   */
  attached: function () {
    this.resetPosition();
    this.resetPositionBindThis = this.resetPosition.bind(this);
    window.addEventListener('resize', this.resetPositionBindThis);
  },

  /**
   * Detached callback
   *
   * Uninitialize `resize` event handler
   */
  detached: function () {
    window.removeEventListener('resize', this.resetPositionBindThis);
  },

  /**
   * Initialize the position at the bottom-left corner of the container app
   *
   * Note:
   * - Do nothing once the element position is reset
   */
  resetPosition: function () {
    var fullWidth = window.innerWidth;
    var fullHeight = window.innerHeight;
    var iconWidth = 56;
    var iconHeight = 56
    if (!this.reset) {
      if (fullWidth > 0 && fullHeight > 0) {
        this.x = iconWidth;
        this.y = fullHeight - iconHeight - iconHeight;
        this.reset = true;
      }
    }
    else {
      if (this.x < 0) {
        this.x = 0;
      }
      if (this.x > fullWidth - iconWidth) {
        this.x = fullWidth - iconWidth;
      }
      if (this.y < 0) {
        this.y = 0;
      }
      if (this.y > fullHeight - iconHeight) {
        this.y = fullHeight - iconHeight;
      }
    }
  },

  /**
   * Play animation at open (Live Localizer is closed)
   */
  _renderOpened: function() {
    this.cancelAnimation();
    this.$.fab.classList.remove('closed');
    this.playAnimation('entry');
  },

  /**
   * Play animation at close (Live Localizer is opened)
   */
  _renderClosed: function() {
    this.cancelAnimation();
    this.playAnimation('exit');
  },

  /**
   * `neon-animation-finish` event handler
   */
  _onNeonAnimationFinish: function() {
    if (this.opened) {
      this._finishRenderOpened();
      this.shown = true;
    } else {
      this.$.fab.classList.add('closed');
      this._finishRenderClosed();
    }
  },

  refit: Function(),
  notifyResize: Function()
});
