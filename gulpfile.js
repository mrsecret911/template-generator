var gulp = require('gulp');
var bower = require('gulp-bower');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var connect = require('gulp-connect');
var shell = require('gulp-shell');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('html', function() { 
    return gulp.src('./src/index.html')
    .pipe(gulp.dest('./public'));
});

gulp.task('styles', function() {
  return gulp.src([
   './src/styles/main.scss',
   './bower_components/perfect-scrollbar/css/perfect-scrollbar.css',
   './src/styles/preloader.scss'])
  .pipe(sass({
    includePaths: [
      './bower_components/bootstrap-sass/assets/stylesheets',
      './bower_components/fontawesome/scss'
    ]
  }))
  .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
   }))
  .pipe(minifyCSS())
  .pipe(concat('main.min.css'))
  .pipe(gulp.dest('./public/styles'));
});

gulp.task('styleTmpls', function() { 
    return gulp.src('./src/styles/tmpls.scss')
  .pipe(sass())
  .pipe(gulp.dest('./public/styles'));
});

gulp.task('img', function() { 
    return gulp.src('./src/img/*/**')
    .pipe(gulp.dest('./public/img/'));
});

gulp.task('fonts', function() { 
    return gulp.src('./bower_components/fontawesome/fonts/*')
    .pipe(gulp.dest('./public/fonts'));
});

gulp.task('libs', function() {
  return gulp.src([
    './bower_components/jquery/dist/jquery.js',
    './bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
    './src/scripts/libs/saveAs.js',
    './src/scripts/libs/parallaxMd.js',
    './bower_components/jszip/dist/jszip.js',
    './bower_components/jquery-ui/jquery-ui.js',
    './src/scripts/libs/jquery-draggable.js',
    './bower_components/perfect-scrollbar/js/perfect-scrollbar.jquery.js',
  ])
  .pipe(uglify())
  .pipe(concat('libs.min.js'))
  .pipe(gulp.dest('./public/scripts'));
});

gulp.task('scripts', function() {
  return gulp.src([
    './src/scripts/preloader.js',
    './src/scripts/builder-scripts.js',
    './src/scripts/context-menu.js',
    './src/scripts/app.js'
  ])
  .pipe(uglify())
  .pipe(concat('main.min.js'))
  .pipe(gulp.dest('./public/scripts'));
});

gulp.task('jsons', function() { 
    return gulp.src('./src/scripts/**/*.json')
    .pipe(gulp.dest('./public/scripts'));
});

gulp.task('tmpls', function() { 
    return gulp.src('./src/scripts/**/*.html')
    .pipe(gulp.dest('./public/scripts'));
});

gulp.task('localtunnel', shell.task([
    'lt --port 8080'
]));

gulp.task('watch', function () {
  gulp.watch('src/index.html', ['html']);
  gulp.watch('src/styles/*.scss', ['styles','styleTmpls']);
  gulp.watch('src/styles/*.css', ['styles']);
  gulp.watch('src/scripts/*.js', ['scripts']);
  gulp.watch('src/scripts/template/*.html', ['tmpls']);
  gulp.watch('src/scripts/**/*.json', ['jsons']);
});

gulp.task('connectDist', function () {
  connect.server({
    root: 'public',
    port: 8080,
    livereload: true
  });
});

gulp.task("default", ["html", "styles", "styleTmpls", "libs", "scripts", "fonts", "img", "jsons", "tmpls"]);

gulp.task("serve", ["watch", "connectDist", "localtunnel"]);