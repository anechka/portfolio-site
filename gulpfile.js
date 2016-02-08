/**
 * Created by menangen on 18.03.15.
 *
 * Run Jade compilation to /ru and current folder
 *
 */
var production = false; // False for pretty HTML output in "jade" template engine task

var gulp = require('gulp');
var jade = require('gulp-jade');
var rename = require("gulp-rename");

gulp.task('default', function() {
    // Start point
    production = true;
    gulp.run('jade');

});


gulp.task('jade', function() {
    var jade_config = {};
    if (!production) { jade_config.pretty = true }// Call jade({pretty: true}) for dev

    // Jade templates from /jade folder
    // RU
    gulp.src('jade/index-ru.jade')
    .pipe(jade(jade_config))
    .pipe(rename("index.html"))
    .pipe(gulp.dest('ru'));

    // EN
    gulp.src('jade/index.jade')
    .pipe(jade(jade_config))
    .pipe(gulp.dest("."));

    // Portfolio description
    gulp.src('portfolio-content/conclave/conclave.jade')
        .pipe(jade(jade_config))
        .pipe(rename("index.html"))
        .pipe(gulp.dest("portfolio-content/conclave"));

    gulp.src('portfolio-content/market/chipmarket.jade')
        .pipe(jade(jade_config))
        .pipe(rename("index.html"))
        .pipe(gulp.dest("portfolio-content/market"));

    gulp.src('portfolio-content/pp/premium_parts.jade')
        .pipe(jade(jade_config))
        .pipe(rename("index.html"))
        .pipe(gulp.dest("portfolio-content/pp"));

});

gulp.task('clean', function() {
    var clean = require('gulp-clean');

    gulp.src(['index.html', "ru/index.html", "portfolio-content/conclave/index.html", "portfolio-content/market/index.html", "portfolio-content/pp/index.html"], {read: false})
    .pipe(clean());

});