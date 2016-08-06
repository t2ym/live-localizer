'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var debug = require('gulp-debug');
var gulpif = require('gulp-if');
var gulpignore = require('gulp-ignore');
var gulpmatch = require('gulp-match');
var sort = require('gulp-sort');
var grepContents = require('gulp-grep-contents');
var through = require('through2');
var path = require('path');
var stripBom = require('strip-bom');
var JSONstringify = require('json-stringify-safe');
var i18nPreprocess = require('gulp-i18n-preprocess');
var i18nLeverage = require('gulp-i18n-leverage');
var XliffConv = require('xliff-conv');
var i18nAddLocales = require('gulp-i18n-add-locales');
var runSequence = require('run-sequence');

// Global object to store localizable attributes repository
var attributesRepository = {};

// Bundles object
var prevBundles = {};
var bundles = {};

var title = 'I18N transform';
var tmpDir = '.tmp';

var xliffOptions = {};

// Scan HTMLs and construct localizable attributes repository
var scan = gulpif('*.html', i18nPreprocess({
  constructAttributesRepository: true, // construct attributes repository
  attributesRepository: attributesRepository, // output object
  srcPath: '.', // path to source root
  attributesRepositoryPath: 
    '../../i18n-behavior/i18n-attr-repo.html', // path to i18n-attr-repo.html
  dropHtml: false // do not drop HTMLs
}));

var basenameSort = sort({
  comparator: function(file1, file2) {
    var base1 = path.basename(file1.path).replace(/^bundle[.]/, ' bundle.');
    var base2 = path.basename(file2.path).replace(/^bundle[.]/, ' bundle.');
    return base1.localeCompare(base2);
  }
});

var dropDefaultJSON = gulpignore([ '**/*.json', '!**/locales/*.json' ]);

var preprocess = gulpif('*.html', i18nPreprocess({
  replacingText: true, // replace UI texts with {{annotations}}
  jsonSpace: 2, // JSON format with 2 spaces
  srcPath: '.', // path to source root
  attributesRepository: attributesRepository // input attributes repository
}));

var tmpJSON = gulpif([ '**/*.json', '!**/locales/*' ], gulp.dest(tmpDir));

var unbundleFiles = [];
var importXliff = through.obj(function (file, enc, callback) {
  // bundle files must come earlier
  unbundleFiles.push(file);
  callback();
}, function (callback) {
  var match;
  var file;
  var bundleFileMap = {};
  var xliffConv = new XliffConv(xliffOptions);
  //console.log(JSONstringify(attributesRepository, null, 2));
  for (var i = 0; i < unbundleFiles.length; i++) {
    //console.log('unbundledFiles[' + i + '] = ' + unbundleFiles[i].path);
  }
  while (unbundleFiles.length > 0) {
    file = unbundleFiles.shift();
    if (path.basename(file.path).match(/^bundle[.]json$/)) {
      prevBundles[''] = JSON.parse(stripBom(String(file.contents)));
      bundleFileMap[''] = file;
    }
    else if (match = path.basename(file.path).match(/^bundle[.]([^.\/]*)[.]json$/)) {
      prevBundles[match[1]] = JSON.parse(stripBom(String(file.contents)));
      bundleFileMap[match[1]] = file;
    }
    else if (match = path.basename(file.path).match(/^bundle[.]([^.\/]*)[.]xlf$/)) {
      //console.log('prevBundles = ' + JSONstringify(prevBundles, null, 2));
      xliffConv.parseXliff(String(file.contents), { bundle: prevBundles[match[1]] }, function (output) {
        if (bundleFileMap[match[1]]) {
          bundleFileMap[match[1]].contents = new Buffer(JSONstringify(output, null, 2));
        }
      });
    }
    else if (gulpmatch(file, '**/locales/*.json') &&
             (match = path.basename(file.path, '.json').match(/^([^.]*)[.]([^.]*)/))) {
      if (prevBundles[match[2]] && prevBundles[match[2]][match[1]]) {
        file.contents = new Buffer(JSONstringify(prevBundles[match[2]][match[1]], null, 2));
      }
    }
    this.push(file);
  }
  callback();
});

var leverage = gulpif([ '**/locales/*.json', '!**/locales/bundle.*.json' ], i18nLeverage({
  jsonSpace: 2, // JSON format with 2 spaces
  srcPath: '', // path to source root
  distPath: '/' + tmpDir, // path to dist root to fetch next default JSON files
  bundles: bundles // output bundles object
}));

var bundleFiles = [];
var exportXliff = through.obj(function (file, enc, callback) {
  bundleFiles.push(file);
  callback();
}, function (callback) {
  var file;
  var cwd = bundleFiles[0].cwd;
  var base = bundleFiles[0].base;
  var xliffConv = new XliffConv(xliffOptions);
  var srcLanguage = 'en';
  var promises = [];
  var self = this;
  var lang;
  while (bundleFiles.length > 0) {
    file = bundleFiles.shift();
    if (!gulpmatch(file, [ '**/bundle.json', '**/locales/bundle.*.json', '**/xliff/bundle.*.xlf' ])) {
      this.push(file);
    }
  }
  for (lang in bundles) {
    bundles[lang].bundle = true;
    this.push(new gutil.File({
      cwd: cwd,
      base: base,
      path: lang ? path.join(cwd, 'locales', 'bundle.' + lang + '.json')
                 : path.join(cwd, 'bundle.json'),
      contents: new Buffer(JSONstringify(bundles[lang], null, 2))
    }));
  }
  for (lang in bundles) {
    if (lang) {
      (function (destLanguage) {
        promises.push(new Promise(function (resolve, reject) {
          xliffConv.parseJSON(bundles, {
            srcLanguage: srcLanguage,
            destLanguage: destLanguage
          }, function (output) {
            self.push(new gutil.File({
              cwd: cwd,
              base: base,
              path: path.join(cwd, 'xliff', 'bundle.' + destLanguage + '.xlf'),
              contents: new Buffer(output)
            }));
            resolve();
          });
        }));
      })(lang);
    }
  }
  Promise.all(promises).then(function (outputs) {
    callback();
  });
});

var feedback = gulpif([ '**/bundle.json', '**/locales/*.json', '**/*.json', '**/xliff/bundle.*.xlf' ], gulp.dest('.'));

var config = {
  // list of target locales to add
  locales: gutil.env.targets ? gutil.env.targets.split(/ /) : [],
  // firebase token
  firebase_token: gutil.env.token || '',
  // firebase project name
  firebase_project: gutil.env.project || 'live-localizer-demo'
}

// Gulp task to add locales to I18N-ready elements and pages
// Usage: gulp locales --targets="{space separated list of target locales}"
gulp.task('locales', function() {
  var elements = gulp.src([ '**/*.html' ], { base: '.' })
    .pipe(grepContents(/i18n-behavior.html/))
    .pipe(grepContents(/<dom-module /));

  return elements
    .pipe(i18nAddLocales(config.locales))
    .pipe(gulp.dest('.'))
    .pipe(debug({ title: 'Add locales:'}))
});

var xmldom = require('xmldom');
var fs = require('fs');
var exec = require('child_process').exec;

gulp.task('fetch-xliff', function (callback) {
  var parser = new (xmldom.DOMParser)();
  var fetchedFiles = {};
  var assignments;

  try {
    // read list of uid's of assigned translators from the file in JavaScript array
    assignments = require('./assigned-translators.json');
  }
  catch (e) {
    // if no list is provided, all the users including anonymous ones are regarded as assigned.
    assignments = [];
  }

  // firebase command has to be in the path or run through npm script
  exec('firebase database:get /users ' +
        (config.firebase_token ? '--token "'+ config.firebase_token + '"' : '') +
        ' --project "' + config.firebase_project + '"', function (err, stdout, stderr) {
    if (!err) {
      var users = JSON.parse(stdout);
      var user;
      var locale;
      gutil.log(gutil.colors.yellow('By All Users:'));
      for (user in users) {
        for (locale in users[user].files) {
          var file = users[user].files[locale];
          if (file && file.stats && file.stats.xliff && file.stats.xliff.file && file.stats.xliff.file.date) {
            file.date = file.stats.xliff.file.date;
          }
          else {
            var dom = parser.parseFromString(file.text, 'application/xml');
            var fileTag = dom.getElementsByTagName('file')[0];
            if (fileTag) {
              var date = fileTag.getAttribute('date');
              if (date) {
                file.date = date;
              }
            }
          }
          file.date = file.date || '';
          gutil.log(gutil.colors.grey(user + '.files.' + file.locale + ' date: ' + file.date));
          file.user = user;
          fetchedFiles[locale] = fetchedFiles[locale] || [];
          if (assignments.length > 0) {
            if (assignments.indexOf(file.user) >= 0) {
              fetchedFiles[locale].push(file);
            }
          }
          else {
            fetchedFiles[locale].push(file);
          }
        }
      }
      if (assignments.length > 0) {
        gutil.log(gutil.colors.yellow('By Assigned Users in reverse chronological order:'));
      }
      else {
        gutil.log(gutil.colors.yellow('By All Users in reverse chronological order:'));
      }
      for (locale in fetchedFiles) {
        fetchedFiles[locale].sort(function (fileA, fileB) {
          return -fileA.date.localeCompare(fileB.date, 'en');
        });
        fetchedFiles[locale].forEach(function (file, index) {
          if (index === 0) {
            fs.writeFileSync(path.join(process.cwd(), 'xliff', file.name), file.text);
          }
          gutil.log(gutil.colors[index === 0 ? 'green' : 'grey']('files[' + locale + '][' + index + '] ' +
            'user: ' + file.user + ' date: ' + file.date) +
            (index === 0 ? gutil.colors.yellow(' <= selected') : ''));
        });
      }
    }
    else {
      gutil.log(gutil.colors.red(stderr));
    }
    callback(err);
  });
});

gulp.task('i18n', () => {
  return gulp.src([ '**/*.html', '**/*.json', '**/xliff/*.xlf', '!.tmp/**' ], { base: '.' })
    // I18N processes
    .pipe(scan)
    .pipe(basenameSort)
    .pipe(dropDefaultJSON)
    .pipe(preprocess)
    .pipe(tmpJSON)
    .pipe(importXliff)
    .pipe(leverage)
    .pipe(exportXliff)
    .pipe(feedback)
    .pipe(debug({ title: title }));
});

gulp.task('default', (cb) => {
  runSequence('fetch-xliff', 'i18n', cb);
});