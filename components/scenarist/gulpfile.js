'use strict';

const gulp = require('gulp');
const gulpif = require('gulp-if');
const runSequence = require('run-sequence');
const babel = require('gulp-babel');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const rollup = require('gulp-rollup');
const async = require('rollup-plugin-async');
const fs = require('fs');

gulp.task('umd', () => {
  const name = 'Suite';
  return gulp.src([ 'Suite.mjs' ])
    .pipe(replace(`class ${name} {`, `
(function (root, factory) {

  'use strict';

  /* istanbul ignore if: AMD is not tested */
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], function () {
      return (root.${name} = root.${name} || factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
    try {
      new Function('return class $$A$$ {}');
      if (!module.exports.toString().match(/^class /)) {
        throw new Error('Suite.min.js requires babel-runtime');
      }
    }
    catch (e) {
      // Supply Babel runtime helpers
      module.exports._createClass = module.exports._createClass || require('babel-runtime/helpers/_create-class.js').default;
      module.exports._classCallCheck = module.exports._classCallCheck || require('babel-runtime/helpers/_class-call-check.js').default;
      module.exports._possibleConstructorReturn = module.exports._possibleConstructorReturn || require('babel-runtime/helpers/_possible-constructor-return.js').default;
      module.exports._inherits = module.exports._inherits || require('babel-runtime/helpers/_inherits.js').default;
    }
  } else {
    // Browser globals
    root.${name} = root.${name} || factory();
  }

}(this, function () {
// UMD Definition above, do not remove this line
  'use strict';

class ${name} {`
    ))
    .pipe(replace(`export default ${name};`, `
  return ${name};
})); // UMD Definition
`
    ))
    .pipe(rename('Suite.js'))
    .pipe(gulp.dest('.'));
});

gulp.task('es5', () => {
  return gulp.src([ 'Suite.js' ])
    .pipe(sourcemaps.init())
    .pipe(replace(/\/[*] istanbul ignore next: only for ES6 [*]\//g, ''))
    .pipe(babel({
      "presets": [ /*'es2015'*/ ],
      "plugins": [
        'check-es2015-constants',
        'transform-es2015-arrow-functions',
        'transform-es2015-block-scoped-functions',
        'transform-es2015-block-scoping',
        'transform-es2015-classes',
        'transform-es2015-computed-properties',
        'transform-es2015-destructuring',
        'transform-es2015-duplicate-keys',
        'transform-es2015-for-of',
        'transform-es2015-function-name',
        'transform-es2015-literals',
        //'transform-es2015-modules-commonjs',
        'transform-es2015-object-super',
        'transform-es2015-parameters',
        'transform-es2015-shorthand-properties',
        'transform-es2015-spread',
        'transform-es2015-sticky-regex',
        'transform-es2015-template-literals',
        'transform-es2015-typeof-symbol',
        'transform-es2015-unicode-regex',
        'transform-regenerator'
      ]
    }))
    .pipe(rename('Suite.es5.js'))
    .pipe(gulp.dest('.'))
    .pipe(uglify({ mangle: false }))
    .pipe(rename('Suite.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('.'));
});

gulp.task('es6', () => {
  return gulp.src('Suite.mjs')
    .pipe(rollup({
      allowRealFiles: true,
      entry: 'Suite.mjs',
      format: 'umd',
      moduleName: 'Suite',
      plugins: [ async() ]
    }))
    .pipe(replace('function __async(g){return new Promise(function(s,j){function c(a,x){try{var r=g[x?"throw":"next"](a);}catch(e){j(e);return}' +
      'r.done?s(r.value):Promise.resolve(r.value).then(c,d);}function d(e){c(e,1);}c();})}',
      'function __async(g){return new Promise(function(s,j){function c(a,x){try{var r=g[x?"throw":"next"](a);}catch(e){j(e);return}' +
      'r.done?s(r.value):Promise.resolve(r.value).then(c,d);}function d(e){c(e,1);}c();})}\n' +
      '(function () {return __async(function*(){yield Promise.reject(1);}())})()'))
    .pipe(rename('Suite.es6.js'))
    .pipe(gulp.dest('.'));
});

gulp.task('build:test', () => {
  return gulp.src([ 'test/src/*.js', 'test/src/*.html' ])
    //.pipe(sourcemaps.init())
    .pipe(replace('//require(\'babel-polyfill\')', 'require(\'babel-polyfill\')'))
    .pipe(replace('<!-- <script src="../../node_modules/babel-polyfill/browser.js"></script> -->',
      '<script src="../../node_modules/babel-polyfill/browser.js"></script>'))
    .pipe(replace('/Suite.js', '/Suite.es5.js'))
    .pipe(gulpif('*.js', babel({
      "presets": [ /*'es2015'*/ ],
      "plugins": [
        'check-es2015-constants',
        'transform-es2015-arrow-functions',
        'transform-es2015-block-scoped-functions',
        'transform-es2015-block-scoping',
        'transform-es2015-classes',
        'transform-es2015-computed-properties',
        'transform-es2015-destructuring',
        'transform-es2015-duplicate-keys',
        'transform-es2015-for-of',
        'transform-es2015-function-name',
        'transform-es2015-literals',
        'transform-es2015-modules-commonjs',
        'transform-es2015-object-super',
        'transform-es2015-parameters',
        'transform-es2015-shorthand-properties',
        'transform-es2015-spread',
        'transform-es2015-sticky-regex',
        'transform-es2015-template-literals',
        'transform-es2015-typeof-symbol',
        'transform-es2015-unicode-regex',
        'transform-regenerator'
      ]
    })))
    .pipe(gulp.dest('test/es5'))
    //.pipe(uglify({ mangle: false }))
    //.pipe(sourcemaps.write('.'))
    .pipe(replace('/Suite.es5.js', '/Suite.min.js'))
    .pipe(gulp.dest('test/min'));
});

gulp.task('build:testes6', () => {
  return gulp.src([ 'test/src/*.js', 'test/src/*.html' ])
    .pipe(replace('/Suite.js', '/Suite.es6.js'))
    .pipe(gulp.dest('test/es6'));
});

gulp.task('build:testes6error2', () => {
  return gulp.src('test/src/error2.js')
    .pipe(rollup({
      allowRealFiles: true,
      entry: 'test/src/error2.js',
      format: 'umd',
      moduleName: 'error2',
      plugins: [ async() ]
    }))
    .pipe(rename('error2.js'))
    .pipe(gulp.dest('test/es6'));
});

gulp.task('build:demo', () => {
  return gulp.src([ 'demo/src/*.js', 'demo/src/*.html' ])
    .pipe(replace('//require(\'babel-polyfill\')', 'require(\'babel-polyfill\')'))
    .pipe(replace('<!-- <script src="../../node_modules/babel-polyfill/browser.js"></script> -->',
      '<script src="../../node_modules/babel-polyfill/browser.js"></script>'))
    .pipe(replace('/Suite.js', '/Suite.min.js'))
    .pipe(gulpif('*.js', babel({
      "presets": [ /*'es2015'*/ ],
      "plugins": [
        'check-es2015-constants',
        'transform-es2015-arrow-functions',
        'transform-es2015-block-scoped-functions',
        'transform-es2015-block-scoping',
        'transform-es2015-classes',
        'transform-es2015-computed-properties',
        'transform-es2015-destructuring',
        'transform-es2015-duplicate-keys',
        'transform-es2015-for-of',
        'transform-es2015-function-name',
        'transform-es2015-literals',
        'transform-es2015-modules-commonjs',
        'transform-es2015-object-super',
        'transform-es2015-parameters',
        'transform-es2015-shorthand-properties',
        'transform-es2015-spread',
        'transform-es2015-sticky-regex',
        'transform-es2015-template-literals',
        'transform-es2015-typeof-symbol',
        'transform-es2015-unicode-regex',
        'transform-regenerator'
      ]
    })))
    .pipe(gulp.dest('demo/min'));
});

gulp.task('default', (done) => {
  runSequence('umd', 'es5', 'es6', 'build:test', 'build:testes6', 'build:testes6error2', 'build:demo', done);
});