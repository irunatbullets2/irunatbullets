var gulp    		= require('gulp');
var webserver 	= require('gulp-webserver');
var watch 			= require('gulp-watch');
var sass    		= require('gulp-sass');
var prefix  		= require('gulp-autoprefixer');
var cacheBuster = require('gulp-cache-bust');

config = {
	distPath: './',
  distGlob: './**',
  cssPath:  './assets/css',
  scssPath: './src/scss',
  scssGlob: './src/scss/**/*.scss'
};

var errorHandler = function (e) {
  console.log(e);
}

gulp.task('webserver', function() {
  gulp.src(config.distPath)
  .pipe(webserver({
    livereload: true,
    open: true
  }))
});

gulp.task('sass', function () {
  return gulp.src(config.scssGlob)
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest(config.cssPath));
});

gulp.task('cacheBuster', ['sass'], function (){
	return gulp.src('./index.html')
	.pipe(cacheBuster())
	.pipe(gulp.dest('.'));
})

gulp.task('watch', function () {
  'use strict';
  gulp.watch(config.scssGlob, ['cacheBuster']);
});

gulp.task('default', ['cacheBuster', 'webserver', 'watch']);
