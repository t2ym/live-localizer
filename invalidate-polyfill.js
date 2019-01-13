/**
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2019, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
// Invalidate polyfills by @firebase/polyfill/dist/index.esm.js
const __require = window.require || null;
const _require = __require || (() => {});
window.require = (pkg) => {
  if (pkg.match(/[/]modules[/]_core$/)) {
    return {
      Array: Array,
      Object: Object,
      String: String,
    };
  }
  else if (pkg.match(/[/]modules[/]_wks-ext$/)) {
    // this is the last require() call to invalidate
    if (__require) {
      window.require = __require; // should not happen
    }
    else {
      delete window.require; // avoid misjudgement of the current platform by typeof require === 'function'
    }
    return {
      f: () => {},
    };
  }
  else {
    return _require(pkg);
  }
};
window.module = {
  get exports() {
    if (!window.require) {
      delete window.module;
    }
    return {};
  },
  set exports(value) {
    if (!window.require) {
      delete window.module;
    }
  }
};
