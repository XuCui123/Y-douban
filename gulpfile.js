var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

var app = {
  viewPath: 'views/',
  srcPath: 'public/',
  devPath: 'public/build/',
  prdPath: 'public/dist/'
}

gulp.task('less', () => {
  gulp.src(app.srcPath + 'less/main.less')
      .pipe($.less())
      .pipe(gulp.dest(app.devPath + 'css'))
      .pipe($.cssmin())
      .pipe(gulp.dest(app.prdPath + 'css'))
});

gulp.task('build', ['less']);

gulp.task('server', () => {

  $.nodemon({
    script: 'app.js',
    env: {
      'NODE_ENV': 'development'
    }
  }).on('start', () => {
      browserSync.init({
        proxy: 'http://localhost:3000',
        files: ["public/**/*.*", "views/**/*.*", "routes/**/*.*"],
        port: 3001
      }, () => {
        console.log('监听变化！');
      });
  });

  gulp.watch(app.srcPath + 'less/**/*.less', ['less']);

});

gulp.task('default', ['clean', 'build', 'server']);

gulp.task('clean', () => {
  gulp.src([app.devPath, app.prdPath])
  .pipe($.clean());
});
