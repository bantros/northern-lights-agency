// load plugins

import browserSync from 'browser-sync';
import fs from 'fs';
import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import clean from 'gulp-clean';
import cleanCSS from 'gulp-clean-css';
import gcmq from 'gulp-group-css-media-queries';
import htmlmin from 'gulp-htmlmin';
import jshint from 'gulp-jshint';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import prettify from 'gulp-prettify';
import replace from 'gulp-replace';
import runSequence from 'run-sequence';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import twig from 'gulp-twig';
import uglify from 'gulp-uglify';
import util from 'gulp-util';
import webpack from 'webpack-stream';

const path = {
  src: './src',
  build: './build',
  css: '/assets/styles',
  js: '/assets/scripts',
  proxy: 'northernlightsagency.dev'
};

// browserSync

gulp.task('browserSync', () => {

  browserSync.init({
    // proxy: path.proxy,
    server: './build',
    notify: false
  });

});

// plumber

const onError = function(err) {
  console.log(err.message);
  this.emit('end');
};

// styles

gulp.task('styles', () => {
  return gulp.src(path.src + path.css + '/*.scss')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(!util.env.production ? sourcemaps.init() : util.noop())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(util.env.production ? gcmq() : util.noop())
    .pipe(util.env.production ? cleanCSS() : util.noop())
    .pipe(!util.env.production ? sourcemaps.write('.', { includeContent: false, sourceRoot: path.build + path.css }) : util.noop())
    .pipe(gulp.dest(path.build + path.css))
    .pipe(browserSync.stream({ match: '**/*.css' }))
    .pipe(notify({ title: 'styles', message: 'styles have been compiled into main.css', onLast: true }));
});

// scripts

gulp.task('scripts', () => {
  return gulp.src([path.src + path.js + '/**/*.js'])
    .pipe(plumber({ errorHandler: onError }))
    .pipe(!util.env.production ? jshint('.jshintrc') : util.noop())
    .pipe(!util.env.production ? jshint.reporter('jshint-stylish') : util.noop())
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(util.env.production ? uglify() : util.noop())
    .pipe(gulp.dest(path.build + path.js))
    .pipe(notify({ title: 'scripts', message: 'scripts have been compiled into bundle.js', onLast: true }));
});

gulp.task('scripts-watch', ['scripts'], (done) => {
  browserSync.reload();
  done();
});

// twig

gulp.task('twig', () => {
  return gulp.src(path.src + '/templates/**/index.html')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(twig())
    .pipe(!util.env.production ? prettify({ indent_inner_html: true }) : util.noop())
    .pipe(util.env.production ? replace(/<link rel="stylesheet" href="\/assets\/styles\/main.css"[^>]*>/, function(s) {
      var style = fs.readFileSync(path.build + path.css + '/main.css', 'utf8');
      return '<style>\n' + style + '\n</style>';
    }) : util.noop())
    .pipe(util.env.production ? htmlmin({ collapseWhitespace: true }) : util.noop())
    .pipe(gulp.dest(path.build))
    .pipe(notify({ title: 'twig', message: 'twig templates have been compiled', onLast: true }));
});

gulp.task('twig-watch', ['twig'], (done) => {
  browserSync.reload();
  done();
});

// clean

gulp.task('clean', () => {
  return gulp.src([
    path.build + path.css + '/*.css',
    path.build + path.js + '/*.js'
  ], { read: false })
    .pipe(clean());
});

// build

gulp.task('build', () => {
  runSequence('styles', ['scripts-watch', 'twig-watch']);
});

// watch

gulp.task('watch', ['browserSync'], () => {
  gulp.watch(path.src + path.css + '/**/*.scss', ['styles']);
  gulp.watch(path.src + path.js + '/**/*.js', ['scripts-watch']);
  gulp.watch(path.src + '/templates/**/*.html', ['twig-watch']);
});

// default

gulp.task('default', () => {
  gulp.start('watch');
});
