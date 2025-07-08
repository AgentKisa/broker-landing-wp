'use strict';
const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const { src, dest, watch, series, parallel } = gulp;

const sourcemaps = require('gulp-sourcemaps');
const autoPrefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const minifyjs = require('gulp-uglify-es').default;
const merge = require('merge2');

const jsWatch = ['./assets/js/app.js'];
const jsFiles = [
  './assets/js/app.js',
  './assets/js/*.js',
  '!./assets/js/*.min.js',
];
const cssWatch = ['./assets/css/*.css', '!./assets/css/*.min.css'];
const cssFiles = ['./assets/css/*.css', '!./assets/css/*.min.css'];

function cssTask() {
  return src(cssFiles)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(autoPrefixer())
    .pipe(cleanCSS())
    .pipe(concat('style.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./assets/css/'));
}

function jsTask() {
  const jsBackFiles = src(jsFiles, { base: './' })
    .pipe(babel({ presets: [['@babel/env', { modules: 'commonjs' }]] }))
    .pipe(minifyjs())
    .pipe(concat('app.min.js'))
    .pipe(dest('./assets/js/'));
  return merge(jsBackFiles);
}

function serveTask(done) {
  browserSync.init({
    proxy: 'http://brokertheme.local/',
    notify: false,
    open: true,
  });
  done();
}

function watchTask() {
  watch(
    cssWatch,
    series(cssTask, (cb) => {
      browserSync.reload();
      cb();
    })
  );

  watch(
    jsWatch,
    series(jsTask, (cb) => {
      browserSync.reload();
      cb();
    })
  );

  watch('./**/*.php').on('change', browserSync.reload);
}

exports.default = series(parallel(cssTask, jsTask), serveTask, watchTask);
