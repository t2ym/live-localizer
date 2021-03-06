/**
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/*
Styles for drag handles of draggable objects
*/
/*
Styles for a field of draggable objects
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import '@polymer/neon-animation/animations/scale-down-animation.js';
import '@polymer/neon-animation/animations/fade-in-animation.js';
import '@polymer/neon-animation/animations/transform-animation.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="drag-handle-mode">
  <template>
    <style>
      [drag-handle-mode=upper-left] {
        cursor: nwse-resize;
      }
      [drag-handle-mode=upper] {
        cursor: ns-resize;
      }
      [drag-handle-mode=upper-right] {
        cursor: nesw-resize;
      }
      [drag-handle-mode=middle-left] {
        cursor: ew-resize;
      }
      [drag-handle-mode=position] {
        cursor: move;
      }
      [drag-handle-mode=middle-right] {
        cursor: ew-resize;
      }
      [drag-handle-mode=lower-left] {
        cursor: nesw-resize;
      }
      [drag-handle-mode=lower] {
        cursor: ns-resize;
      }
      [drag-handle-mode=lower-right] {
        cursor: nwse-resize;
      }
      [drag-handle-mode=drag] {
        cursor: -moz-grab;
        cursor: -webkit-grab;
        cursor: grab;
      }
      .drag-target {
        cursor: -moz-grab;
        cursor: -webkit-grab;
        cursor: grab;
      }
      .drag-target[drag-state=dragging] {
        cursor: -moz-grabbing;
        cursor: -webkit-grabbing;
        cursor: grabbing;
      }
      .drop-target {
        cursor: copy;
      }
    </style>
  </template>
</dom-module><dom-module id="drag-field">
  <template>
    <style>
      .drag-field {
        z-index: 0;
      }
      .drag-target {
        z-index: 1;
      }
      .drop-target {
        z-index: 2;
        opacity: 0.75;
      }
      .drop-target[drag-state=drag-hover],
      .drop-target[drag-state=dropped] {
        margin: 4px;
        border-color: darkblue;
        border-width: 4px;
        border-style: solid;
        border-radius: 12px;
      }
      .drop-target[drag-state=drag-hover] {
        opacity: 0.25;
      }
      .drop-target[drag-state=dropped] {
        z-index: 0;
        opacity: 1;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
window.BehaviorsStore = window.BehaviorsStore || {};

/**
 * Apply `BehaviorsStore.DraggableBehavior` to implement draggable and resizable elements.
 *
 * @polymerBehavior BehaviorsStore.DraggableBehavior
 * @group I18nBehavior
 * @hero hero.svg
 * @demo demo/index.html
 */
BehaviorsStore.DraggableBehavior = {
  properties: {
    /**
     * x coordinate value of the target element in pixels
     */
    x: {
      type: Number,
      value: 0
    },

    /**
     * y coordinate value of the target element in pixels
     */
    y: {
      type: Number,
      value: 0
    },

    /**
     * width of the target element in pixels
     */
    width: {
      type: Number,
      value: 0
    },

    /**
     * height of the target element in pixels
     */
    height: {
      type: Number,
      value: 0
    },

    /**
     * differential x coordinate value of the target element in dragging in pixels
     */
    dx: {
      type: Number,
      value: 0
    },

    /**
     * differential y coordinate value of the target element in dragging in pixels
     */
    dy: {
      type: Number,
      value: 0
    },

    /**
     * state of dragging and dropping
     *
     * | state | description |
     * |:------|:------------|
     * | released | The object is released |
     * | dragged | The object has just been dragged |
     * | dragging | The object is being dragged |
     * | dropped | Another dragging object is dropped at the object |
     * | dropping | The object is dropping onto the target object |
     * | releasing | The object is being released after dropping |
     */
    dragState: {
      type: String,
      value: 'released',
      reflectToAttribute: true
    },

    /**
     * operational mode of the drag handle
     *
     * | mode | description |
     * |:-----|:------------|
     * | position | move the object |
     * | drag | drag the object |
     * | upper-left | resize the object by dragging the upper-left corner |
     * | upper | resize the object by dragging the upper edge |
     * | upper-right | resize the object by dragging the upper-right corner |
     * | middle-left | resize the object by dragging the left edge |
     * | middle-right | resize the object by dragging the right edge |
     * | lower-left | resize the object by dragging the lower-left corner |
     * | lower | resize the object by dragging the lower edge |
     * | lower-right | resize the object by dragging the lower-right corner |
     */
    dragHandleMode: {
      type: String,
      value: 'position',
      reflectToAttribute: true
    },

    /**
     * true if the object is fullscreen
     */
    fullscreen: {
      type: Boolean,
      value: false,
      reflectToAttribute: true
    },

    /**
     * true if the object is resizable
     */
    resizable: {
      type: Boolean,
      value: false,
      reflectToAttribute: true
    },

    /**
     * Space separated list of names for drag and drop groups for the object
     */
    dragDropGroups: {
      type: String,
      reflectToAttribute: true
    },

    /**
     * Space separated list of names of drag and drop groups for drop targets of the object
     */
    dropTargets: {
      type: String,
      reflectToAttribute: true
    }
  },

  observers: [
    '_onXChange(x,fullscreen)',
    '_onYChange(y,fullscreen)',
    '_onWidthChange(width,fullscreen)',
    '_onHeightChange(height,fullscreen)'
  ],

  listeners: {
    'track': '_handleTrack',
    'mouseover': 'onMouseOver',
    'mouseenter': 'onMouseOver',
    'mouseup': 'onMouseOver',
    'mouseleave': 'onMouseOver',
    'mouseout': 'onMouseOver'
  },

  /**
   * Store drag and drop group definitions
   *
   * Note: This object is shared among all the objects with DraggableBehavior
   */
  dragDropGroupMembers: {},

  /**
   * ready callback
   *
   * Initialize drag and drop group definitions and animationConfig
   */
  ready: function () {
    if (this.dragDropGroups) {
      this.dragDropGroups.split(/[ ]{1,}/).forEach(function (group) {
        this.dragDropGroupMembers[group] = this.dragDropGroupMembers[group] || new Array();
        this.dragDropGroupMembers[group].push(this);
      }, this);
      this.animationConfig = {
        'dropping': [{
          name: 'scale-down-animation',
          node: this,
          transformOrigin: '50% 50%'
        }],
        'fadingin': [{
          name: 'fade-in-animation',
          node: this
        }],
        'releasing': [{
          name: 'transform-animation',
          node: this,
          transformFrom: 'translate(0px,0px)',
          transformTo: 'translate(0px,0px)'
        }]
      };
      this.listen(this, 'neon-animation-finish', '_onDropAnimationFinish');
    }
  },

  /**
   * attached callback
   *
   * Initialize `resize` event handler for `window` object
   */
  attached: function () {
    this._onWindowResize = function (e) {
      if (this.fullscreen && this.resizable) {
        if (Number(this.style.height.replace(/px$/, '')) !== window.innerHeight) {
          this.style.height = window.innerHeight + 'px';
        }
      }
    }.bind(this);
    window.addEventListener('resize', this._onWindowResize);
  },

  /**
   * detached callback
   *
   * Uninitialize `resize` event handler for `window` object
   */
  detached: function () {
    window.removeEventListener('resize', this._onWindowResize);
  },

  /**
   * observer of x and fullscreen properties
   *
   * Update the `left` style
   */
  _onXChange: function (x, fullscreen) {
    this.style.left = (fullscreen ? 0 : x) + 'px';
  },

  /**
   * observer of y and fullscreen properties
   *
   * Update the `top` style
   */
  _onYChange: function (y, fullscreen) {
    this.style.top = (fullscreen ? 0 : y) + 'px';
  },

  /**
   * observer of width and fullscreen properties
   *
   * Update the `width` style
   */
  _onWidthChange: function (width, fullscreen) {
    if (this.resizable) {
      this.style.width = fullscreen ? '100%' : width + 'px';
    }
  },

  /**
   * observer of height and fullscreen properties
   *
   * Update the `height` style
   */
  _onHeightChange: function (height, fullscreen) {
    if (this.resizable) {
      this.style.height = (fullscreen ? window.innerHeight : height) + 'px';
      this.fire('height-changed');
    }
  },

  /**
   * `track` event handler
   *
   * Handle drag and drop events and update the styles (size and position) and the state of the object
   */
  _handleTrack: function (e) {
    switch (e.detail.state) {
    case 'start':
      this.dragState = 'dragged';
      this.dragHandleMode = this.getDragHandleMode(e);
      switch (this.dragHandleMode) {
      case 'drag':
        this.toggleClass('drag-target', true, this);
        this.dropTarget = null;
        if (this.dropTargets) {
          this.dropTargets.split(/[ ]{1,}/).forEach(function (targetGroup) {
            if (this.dragDropGroupMembers[targetGroup]) {
              this.dragDropGroupMembers[targetGroup].forEach(function (target) {
                target.toggleClass('drop-target', true, target);
              });
            }
          }, this);
        }
        break;
      default:
        this.toggleClass('drag-target', false, this);
        break;
      }
      break;
    case 'track':
      this.dragState = 'dragging';
      this.dx = Number(e.detail.dx);
      this.dy = Number(e.detail.dy);
      switch (this.dragHandleMode) {
      case 'position':
      case 'drag':
        this.style.left = (Number(this.x) + Number(this.dx)) + 'px';
        this.style.top = (Number(this.y) + Number(this.dy)) + 'px';
        break;
      case 'upper-left':
        this.style.left = (Number(this.x) + Number(this.dx)) + 'px';
        this.style.top = (Number(this.y) + Number(this.dy)) + 'px';
        this.style.width = (Number(this.width) - Number(this.dx)) + 'px';
        this.style.height = (Number(this.height) - Number(this.dy)) + 'px';
        this.fire('height-changed');
        break;
      case 'upper':
        this.style.top = (Number(this.y) + Number(this.dy)) + 'px';
        this.style.height = (Number(this.height) - Number(this.dy)) + 'px';
        this.fire('height-changed');
        break;
      case 'upper-right':
        this.style.top = (Number(this.y) + Number(this.dy)) + 'px';
        this.style.width = (Number(this.width) + Number(this.dx)) + 'px';
        this.style.height = (Number(this.height) - Number(this.dy)) + 'px';
        this.fire('height-changed');
        break;
      case 'middle-left':
        this.style.left = (Number(this.x) + Number(this.dx)) + 'px';
        this.style.width = (Number(this.width) - Number(this.dx)) + 'px';
        break;
      case 'middle-right':
        this.style.width = (Number(this.width) + Number(this.dx)) + 'px';
        break;
      case 'lower-left':
        this.style.left = (Number(this.x) + Number(this.dx)) + 'px';
        this.style.width = (Number(this.width) - Number(this.dx)) + 'px';
        this.style.height = (Number(this.height) + Number(this.dy)) + 'px';
        this.fire('height-changed');
        break;
      case 'lower':
        this.style.height = (Number(this.height) + Number(this.dy)) + 'px';
        this.fire('height-changed');
        break;
      case 'lower-right':
        this.style.width = (Number(this.width) + Number(this.dx)) + 'px';
        this.style.height = (Number(this.height) + Number(this.dy)) + 'px';
        this.fire('height-changed');
        break;
      default:
        break;
      }
      break;
    default:
    case 'end':
      switch (this.dragHandleMode) {
      case 'drag':
        this.x = Number(this.x) + Number(this.dx);
        this.y = Number(this.y) + Number(this.dy);
        if (this.dropTargets) {
          this.dropTargets.split(/[ ]{1,}/).forEach(function (targetGroup) {
            if (this.dragDropGroupMembers[targetGroup]) {
              this.dragDropGroupMembers[targetGroup].forEach(function (target) {
                if (target.dragState === 'dropped') {
                  this.dropTarget = target;
                }
              }, this);
            }
          }, this);
        }
        if (this.dropTarget) {
          this.dragState = 'dropping';
          this.cancelAnimation();
          this.playAnimation('dropping', 'dropping');
        }
        else if (this.animationConfig.releasing) {
          this.dragState = 'releasing';
          this.cancelAnimation();
          this.animationConfig.releasing[0].transformFrom = 'translate(' + this.dx + 'px,' + this.dy + 'px)';
          this.x = 0;
          this.y = 0;
          this.playAnimation('releasing', 'releasing');
        }
        break;
      case 'position':
        this.x = Number(this.x) + Number(this.dx);
        this.y = Number(this.y) + Number(this.dy);
        break;
      case 'upper-left':
        this.x = Number(this.x) + Number(this.dx);
        this.y = Number(this.y) + Number(this.dy);
        this.width = Number(this.width) - Number(this.dx);
        this.height = Number(this.height) - Number(this.dy);
        break;
      case 'upper':
        this.y = Number(this.y) + Number(this.dy);
        this.height = Number(this.height) - Number(this.dy);
        break;
      case 'upper-right':
        this.y = Number(this.y) + Number(this.dy);
        this.width = Number(this.width) + Number(this.dx);
        this.height = Number(this.height) - Number(this.dy);
        break;
      case 'middle-left':
        this.x = Number(this.x) + Number(this.dx);
        this.width = Number(this.width) - Number(this.dx);
        break;
      case 'middle-right':
        this.width = Number(this.width) + Number(this.dx);
        break;
      case 'lower-left':
        this.x = Number(this.x) + Number(this.dx);
        this.width = Number(this.width) - Number(this.dx);
        this.height = Number(this.height) + Number(this.dy);
        break;
      case 'lower':
        this.height = Number(this.height) + Number(this.dy);
        break;
      case 'lower-right':
        this.width = Number(this.width) + Number(this.dx);
        this.height = Number(this.height) + Number(this.dy);
        break;
      default:
        break;
      }
      this.dx = 0;
      this.dy = 0;
      this.dragState = 'released';
      this.dragHandleMode = this.getDragHandleMode(e);
      break;
    }
  },

  /**
   * `mouseover` event handler
   *
   * Update `this.dragState` of drop targets
   */
  onMouseOver: function (e) {
    if (this.classList.contains('drop-target')) {
      switch (e.type) {
      case 'mouseenter':
        this.dragState = 'drag-hover';
        break;
      case 'mouseleave':
        this.dragState = 'released';
        break;
      case 'mouseup':
        this.dragState = 'dropped';
        break;
      default:
        break;
      }
    }
  },

  /**
   * return the default operational mode 'position' of drag handles
   */
  getDragHandleMode: function (e) {
    return 'position';
  },

  /**
   * 'neon-animation-finish' event handler
   *
   * Handle dropping animations and fire `drag-and-drop` event
   */
  _onDropAnimationFinish: function (e) {
    //console.log('_onDropAnimationFinish', e.detail);
    if (e.detail === 'dropping' || e.detail === 'releasing') {
      this.dragState = 'released';
      this.toggleClass('drag-target', false, this);
      this.x = 0;
      this.y = 0;
      if (e.detail === 'dropping') {
        this.fire('drag-and-drop', { src: this, dest: this.dropTarget });
        this.playAnimation('fadingin', 'fadingin');
      }
      if (this.dropTargets) {
        this.dropTargets.split(/[ ]{1,}/).forEach(function (targetGroup) {
          if (this.dragDropGroupMembers[targetGroup]) {
            this.dragDropGroupMembers[targetGroup].forEach(function (target) {
              target.toggleClass('drop-target', false, target);
              target.dragState = 'released';
            }, this);
          }
        }, this);
      }
    }
  }
};
