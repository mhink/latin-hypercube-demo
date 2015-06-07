var gulp         = require('gulp');
var haml         = require('gulp-haml');
var browserSync  = require('browser-sync');
var handleErrors = require('../util/handleErrors');
var config       = require('../config').haml;

gulp.task('haml', function () {
  return gulp.src(config.src)
    .pipe(haml(config.settings))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}));
});
