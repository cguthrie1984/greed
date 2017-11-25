var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var handlebars = require('gulp-compile-handlebars');
var data = require('gulp-data');
var jshint = require('gulp-jshint');
var prefixer = require('gulp-autoprefixer');
var handlebars_options = {
  batch : ['partials']
};

function reload(){
  browserSync.reload();
}

gulp.task('reload', reload);

gulp.task('sass', function(){
  gulp.src('scss/main.scss')
  .pipe(plumber())
  .pipe(sass({
    includePaths: ['scss']
  }))
  .pipe(prefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('../dist/css'))
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .pipe(gulp.dest('../dist/css'))
  .pipe(browserSync.reload({stream:true}));
});

gulp.task('js', function(){
  return gulp.src([
    'js/main.js'
  ])
  .pipe(gulp.dest('../dist/js'))
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(rename({suffix: '.min'}))
  .pipe(uglify())
  .pipe(gulp.dest('../dist/js'));
});

gulp.task('bs', function(){
  browserSync.init(['../dist/css/*.css', '../dist/js/*.js', '../dist/*.html'], {
    server: {
      baseDir: '../dist/'
    }
  });
});

gulp.task('handlebars', function(){
  var options = handlebars_options;
  var hbs_data = data(function(){
    return require('data/data.json');
  });
  
  return gulp.src('./**/*.hbs')
  .pipe(handlebars(hbs_data, handlebars_options))
  .pipe(rename({"extname": ".html"}))
  .pipe(gulp.dest('../dist'))
  .pipe(browserSync.reload({stream:true}));
});

/* Watch scss, js and html files, doing different things with each. */
gulp.task('default', ['sass', 'handlebars', 'bs'], function () {
  gulp.watch(['scss/*.scss', 'scss/**/*.scss'], ['sass']);
  gulp.watch(['js/**/*.js'], ['js']);
  gulp.watch(['./**/*.hbs'], ['handlebars']);
  gulp.watch(['../dist/**/*.html', '../dist/**/*.css'], ['reload']);
});




