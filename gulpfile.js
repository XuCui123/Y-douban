var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var open = require('open');

var file = 'public/';

gulp.task('less', function () {
	gulp.src(file + 'less/index.less')
	.pipe($.less())
	.pipe($.cssmin())
	.pipe(gulp.dest(file + 'dist/css'))
	.pipe($.connect.reload());
});

gulp.task('watch', function () {
	gulp.watch(file + 'less/**/*.less', ['less']);
});

gulp.task('build', ['less', 'watch']);

gulp.task('start', function () {
  $.nodemon({
    script: 'app.js',
  });

	open('http://localhost:3000');
});

gulp.task('default', ['build', 'start']);

gulp.task('clean', function () {
	gulp.src(file + 'dist')
	.pipe($.clean());
});
