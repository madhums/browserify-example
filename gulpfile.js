'use strict';

const PORT = 3000;  // default prot browser-sync starts with

let browserSync = require('browser-sync').create();
let sourcemaps = require('gulp-sourcemaps');
let source = require('vinyl-source-stream');
let browserify = require('browserify');
let sequence = require('run-sequence');
let buffer = require('vinyl-buffer');
let watchify = require('watchify');
let gulpif = require('gulp-if');
let babel = require('babelify');
let ngrok = require('ngrok');
let gulp = require('gulp');
let psi = require('psi');
let site = '';

gulp.task('build', function () { return compile(); });
gulp.task('watch', function () { return watch(); });

gulp.task('ngrok', function(cb) {
  return ngrok.connect(PORT, function(err, url) {
    site = url;
    cb(err);
  });
});

gulp.task('psi:desktop', strategy('desktop'));
gulp.task('psi:mobile', strategy('mobile'));

gulp.task('kill-process', function () {
  process.exit();
});

/**
 * Page speed
 */

gulp.task('psi', function (cb) {
  sequence(
    'ngrok',
    'psi:desktop',
    'psi:mobile',
    'kill-process',
    cb
  );
});

gulp.task('default', ['watch']);

/**
 * Page speed strategy (mobile | desktop)
 */

function strategy (type) {
  let options = {
    nokey: 'true',
    strategy: type
  };

  return function (cb) {
    psi(site, options, function(error, data) {
      psi.output(site, options, function (err) {
        cb();
      });
    });
  };
}

/**
 * Watch and build
 */

function compile (watch) {
  let filename = watch ? 'app-dev.js' : 'app.js';
  let bundler = browserify('./app.js', { debug: true }).transform(babel)

  function rebundle () {
    return bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source(filename))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist'))
      .pipe(gulpif(watch, browserSync.stream()));
  }

  if (watch) {
    watchify(bundler).on('update', rebundle).on('log', console.log);
  }

  return rebundle();
}

/**
 * Watch for file changes and serve files using browserSync
 */

function watch() {
  browserSync.init({
    server: {
      baseDir: './',
      port: PORT
    }
  });
  return compile(true);
};
