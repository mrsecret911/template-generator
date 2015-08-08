var gulp = require('gulp');
var bower = require('gulp-bower');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var connect = require('gulp-connect');
var shell = require('gulp-shell');

gulp.task('html', function() { 
    return gulp.src('./dev/index.html')
    .pipe(gulp.dest('./public'));
});

gulp.task('styles', function() {
  return gulp.src([
   './dev/styles/main.scss',
   './bower_components/perfect-scrollbar/css/perfect-scrollbar.css'])
  .pipe(sass({
    includePaths: [
      './bower_components/bootstrap-sass/assets/stylesheets'
    ]
  }))
  .pipe(minifyCSS())
  .pipe(concat('main.min.css'))
  .pipe(gulp.dest('./public/styles'));
});

gulp.task('img', function() { 
    return gulp.src('./dev/img/*/**')
    .pipe(gulp.dest('./public/img/'));
});

gulp.task('fonts', function() { 
    return gulp.src('./bower_components/bootstrap-sass/assets/fonts/**/*')
    .pipe(gulp.dest('./public/fonts'));
});

gulp.task('libs', function() {
  return gulp.src([
    './bower_components/jquery/dist/jquery.js',
    './bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
    './dev/scripts/libs/saveAs.js',
    './bower_components/jszip/dist/jszip.js',
    './bower_components/jquery-ui/jquery-ui.js',
    './bower_components/perfect-scrollbar/js/perfect-scrollbar.jquery.js'
  ])
  .pipe(uglify())
  .pipe(concat('libs.min.js'))
  .pipe(gulp.dest('./public/scripts'));
});

gulp.task('scripts', function() {
  return gulp.src([
    './dev/scripts/builder-scripts.js',
    './dev/scripts/app.js'
  ])
  .pipe(uglify())
  .pipe(concat('main.min.js'))
  .pipe(gulp.dest('./public/scripts'));
});

gulp.task('jsons', function() { 
    return gulp.src('./dev/scripts/model.json')
    .pipe(gulp.dest('./public/scripts'));
});

gulp.task('tmpls', function() { 
    return gulp.src('./dev/scripts/tmpl.html')
    .pipe(gulp.dest('./public/scripts'));
});

gulp.task('localtunnel', shell.task([
    'lt --port 8080'
]));

gulp.task('watch', function () {
  gulp.watch('dev/index.html', ['html']);
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

gulp.task("default", ["html", "styles", "libs", "scripts", "fonts", "img", "jsons", "tmpls"]);

gulp.task("serve", ["watch", "connectDist", "localtunnel"]);