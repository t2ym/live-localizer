/**
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2019, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
// Invalidate polyfills by @firebase/polyfill/dist/index.esm.js
const _require = typeof require === 'function' ? require : () => {};
window.require = (pkg) => {
  if (pkg.match(/[/]modules[/]_core$/)) {
    return {
      Array: Array,
      Object: Object,
      String: String,
    };
  }
  else if (pkg.match(/[/]modules[/]_wks-ext$/)) {
    return {
      f: () => {},
    };
  }
  else {
    return _require(pkg);
  }
};
window.module = {};
