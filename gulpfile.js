var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

var app = {
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

gulp.task('js', () => {
  gulp.src(app.srcPath + 'js/**/*.js')
      .pipe($.concat('main.js'))
      .pipe(gulp.dest(app.devPath + 'js'))
      .pipe($.uglify())
      .pipe(gulp.dest(app.prdPath + 'js'))
});

gulp.task('watch', () => {
  gulp.watch(app.srcPath + 'less/**/*.less', ['less']);
  gulp.watch(app.srcPath + 'js/**/*.js', ['js']);
})

gulp.task('build', ['less', 'js', 'watch']);

gulp.task('server', () => {
  $.nodemon({
    script: 'app.js',
    ignore: ["gulpfile.js", "node_modules/", "public/**/*.*"],
    ext: 'js html',
    env: {
      'NODE_ENV': 'development'
    }
  }).on('start', () => {
    browserSync.init({
      proxy: 'http://localhost:3000',
      // files: ["public/**/*.*", "views/**","routes/**"],
      port: 3001
    }, () => {
      console.log('browserSync refreshed.');
    });
  });

  gulp.watch('public/**/*.*').on('change', browserSync.reload);
  gulp.watch('views/**').on('change', browserSync.reload);

});

gulp.task('default', ['clean', 'build', 'server']);

gulp.task('clean', () => {
  gulp.src([app.devPath, app.prdPath])
      .pipe($.clean());
});
