/**
@license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
Copyright (c) 2019, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/

var gulp = require('gulp');
var through = require('through2');

// Patch polyserve/lib/make_app.js to apply lastModified: true option to express app,
// since last-modified header is required for live-localizer to detect server build changes
gulp.task('patch-polyserve-lastModified-true', () => {
  return gulp.src([ require.resolve('polyserve/lib/make_app.js') ], { base: '.' })
  	.pipe(through.obj(function (file, enc, callback) {
      let code = String(file.contents);
      code = code.replace(' lastModified: false ', ' lastModified: true ');
      file.contents = Buffer.from(code);
      callback(null, file);
    }))
    .pipe(gulp.dest('.'));
});
