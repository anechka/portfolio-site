/**
 * Created by menangen on 18.03.15.
 *
 *  [default] task compile production HTMLs
 *  [jade] task compile pretty htmls
 *  [clean] task remove all HTMLs
 *
 * Run Jade compilation from 2 folders: /jade and /portfolio-content in current folder
 * index.html for anya.site = "english" version
 * index-ru.html for ane4k.in = "russian" version
 * and into /portfolio-content/id-portfolio/index.html
 */
var production = false; // False for pretty HTML output in "jade" template engine task

var exec = require('child_process').execSync;
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
    gulp.src(['jade/index.jade', 'jade/index-ru.jade'])
    .pipe(jade(jade_config))
    .pipe(gulp.dest('.'));

    // Jade templates from /portfolio-content
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

    gulp.src('portfolio-content/imobo/imobo.jade')
        .pipe(jade(jade_config))
        .pipe(rename("index.html"))
        .pipe(gulp.dest("portfolio-content/imobo"));

    gulp.src('portfolio-content/redalgo/redalgo.jade')
        .pipe(jade(jade_config))
        .pipe(rename("index.html"))
        .pipe(gulp.dest("portfolio-content/redalgo"));

    gulp.src('portfolio-content/sumati/sumati.jade')
        .pipe(jade(jade_config))
        .pipe(rename("index.html"))
        .pipe(gulp.dest("portfolio-content/sumati"));

});

gulp.task('clean', function() {
    var clean = require('gulp-clean');

    gulp.src(
        [
            "index.html",
            "index-ru.html",
            "portfolio-content/conclave/index.html",
            "portfolio-content/market/index.html",
            "portfolio-content/pp/index.html",
            "portfolio-content/imobo/index.html",
            "portfolio-content/redalgo/index.html",
            "portfolio-content/sumati/index.html"
        ],
        {read: false})
    .pipe(clean());

});

gulp.task('server-update', function() {
    exec('ansible-playbook -i deploy/ansible_config/server deploy/ansible_config/update.yml', {stdio:[0,1,2]})
});