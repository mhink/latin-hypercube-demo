var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence')

gulp.task('build', function(cb) {
  var tasks = ['clean', 'sass', 'haml', 'browserify'];
  tasks.push(cb);
  gulpSequence.apply(this, tasks);
});
