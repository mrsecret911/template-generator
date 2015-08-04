var gulp = require('gulp');
var bower = require('gulp-bower');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var connect = require('gulp-connect');

gulp.task('html', function() { 
    return gulp.src('./dev/index.html')
    .pipe(gulp.dest('./public'));
});

gulp.task('styles', function() {
  return gulp.src('./dev/styles/main.scss')
  .pipe(sass({
    includePaths: [
      './bower_components/bootstrap-sass/assets/stylesheets'
    ]
  }))
  .pipe(minifyCSS())
  .pipe(concat('main.min.css'))
  .pipe(gulp.dest('./public/styles'));
});

gulp.task('fonts', function() { 
    return gulp.src('./bower_components/bootstrap-sass/assets/fonts/**/*')
    .pipe(gulp.dest('./public/fonts'));
});

gulp.task('scripts', function() {
  return gulp.src([
    './bower_components/jquery/dist/jquery.js',
    './bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
    './dev/scripts/main.js'
  ])
  .pipe(uglify())
  .pipe(concat('main.min.js'))
  .pipe(gulp.dest('./public/scripts'));
});

gulp.task('watch', function () {
  gulp.watch('dev/styles/*.scss', ['styles']);
  gulp.watch('dev/scripts/*.js', ['scripts']);
});

gulp.task('connectDist', function () {
  connect.server({
    root: 'public',
    port: 8080,
    livereload: true
  });
});

gulp.task("default", ["html", "styles", "scripts", "fonts"]);

gulp.task("serve", ["watch", "connectDist"]);


