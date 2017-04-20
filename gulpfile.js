var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

var app = {
  srcPath: 'public/',
  prdPath: 'public/dist/'
}

gulp.task('css', () => {
  gulp.src(app.srcPath + 'stylus/main.styl')
      .pipe($.stylus({
        compress: true
      }))
      .pipe(gulp.dest(app.prdPath))
});

gulp.task('js', () => {
  gulp.src(app.srcPath + 'js/**/*.js')
      .pipe($.concat('main.js'))
      .pipe($.uglify())
      .pipe(gulp.dest(app.prdPath))
});

gulp.task('img', () => {
  gulp.src(app.srcPath + 'img/**/*')
      .pipe($.imagemin())
      .pipe(gulp.dest(app.prdPath + 'img'))
});

gulp.task('watch', () => {
  gulp.watch(app.srcPath + 'stylus/**/*.styl', ['css']);
  gulp.watch(app.srcPath + 'js/**/*.js', ['js']);
  gulp.watch(app.srcPath + 'img/**/*', ['img']);
})

gulp.task('production', ['clean', 'css', 'js', 'img', 'watch']);

gulp.task('server', () => {
  $.nodemon({
    script: 'app.js',
    ignore: ["gulpfile.js", "node_modules/", "public/**/*.*"],
    ext: 'js jade',
    env: {
      'NODE_ENV': 'development'
    }
  }).on('start', () => {
    browserSync.init({
      proxy: 'http://localhost:3000',
      port: 3001
    }, () => {
      console.log('browserSync refreshed.');
    });
  });

  gulp.watch('public/**/*.*').on('change', browserSync.reload);
  gulp.watch('views/**').on('change', browserSync.reload);

});

gulp.task('default', ['production', 'server']);

gulp.task('clean', () => {
  gulp.src(app.prdPath)
      .pipe($.clean());
});
