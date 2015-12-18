/**
 * Created by menangen on 18.03.15.
 *
 * Run Jade compilation to /ru and current folder
 *
 */

var gulp = require('gulp');
var jade = require('gulp-jade');
var rename = require("gulp-rename");

gulp.task('default', function() {
    // Start point

    gulp.run('jade');

});


gulp.task('jade', function() {
    // Jade templates from /jade folder
    // RU
    gulp.src('jade/index-ru.jade')
    .pipe(jade())// jade({pretty: true}) for dev
    .pipe(rename("index.html"))
    .pipe(gulp.dest('ru'));

    // EN
    gulp.src('jade/index.jade')
    .pipe(jade())// jade({pretty: true}) for dev
    .pipe(gulp.dest("."));
});

gulp.task('clean', function() {
    var clean = require('gulp-clean');

    gulp.src(['index.html', "ru/index.html"], {read: false})
    .pipe(clean());

});