'use strict';
/*jshint esnext: true*/

import { create as bsCreate } from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';
import browserify from 'browserify';
import sequence from 'run-sequence';
import compress from 'compression';
import buffer from 'vinyl-buffer';
import uglify from 'gulp-uglify';
import watchify from 'watchify';
import gulpif from 'gulp-if';
import babel from 'babelify';
import ngrok from 'ngrok';
import gulp from 'gulp';
import psi from 'psi';

const PORT = 3000;  // default prot browser-sync starts with

let site = '';
let browserSync = bsCreate();

gulp.task('watch', () => watch());
gulp.task('build', () => compile());
gulp.task('minify', () => compile(false, true));

gulp.task('ngrok', (cb) => {
  return ngrok.connect(PORT, (err, url) => {
    site = url;
    cb(err);
  });
});

gulp.task('psi:desktop', strategy('desktop'));
gulp.task('psi:mobile', strategy('mobile'));
gulp.task('kill-process', () => process.exit());

/**
 * Page speed
 */

gulp.task('psi', (cb) => {
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

  return (cb) => {
    psi(site, options, (error, data) => {  /*jshint unused: false*/
      psi.output(site, options, (err) => {
        cb();
      });
    });
  };
}

/**
 * Watch and build
 */

function compile (watch, minify) {
  let filename = watch ? 'app-dev.js' : 'app.js';
  let bundler = browserify('./app.js', { debug: true }).transform(babel);

  if (minify) {
    filename = 'app.min.js';
  }

  function rebundle () {
    return bundler.bundle()
      .on('error', (err) => { console.error(err); this.emit('end'); })
      .pipe(source(filename))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(gulpif(minify, uglify({ compress: true })))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist'))
      .pipe(gulpif(watch, browserSync.stream()));
  }

  if (watch) {
    watchify(bundler)
      .on('update', rebundle)
      .on('log', console.log);
  }

  return rebundle();
}

/**
 * Watch for file changes and serve files using browserSync
 */

function watch () {
  browserSync.init({
    server: {
      baseDir: './',
      port: PORT,
      middleware: (req, res, next) => {
        var gzip = compress();
        gzip(req, res, next);
      }
    }
  });
  return compile(true);
}
