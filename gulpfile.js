var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var webserver = require('gulp-webserver');

gulp.task('sass', function() {
  gulp.src('src/sass/styles.scss')
    .pipe(sass(
		{
			includePaths: ['node_modules/']
		}
	))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('css', function() {
  gulp.src('dist/css/styles.css')
    .pipe(cleanCSS())
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('serve', function() {
  gulp.src('.')
    .pipe(webserver({
      port: 1234,
      livereload: true
    }));
});

gulp.task('default', ['sass', 'css', 'serve'], function() {
  gulp.watch(['src/sass/**/*.scss'], ['sass', 'css']);
});
