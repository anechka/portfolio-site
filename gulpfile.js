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
var clean = require('gulp-clean');
var concat = require('gulp-concat');

gulp.task('default', function() {
    // Start point
    production = true;
    gulp.run('jade');
    gulp.run('javascript');

});

gulp.task('jade-portfolio-content', function() {
    var jade_config = { client: true };
    if (!production) { jade_config.pretty = true }

    gulp.src('portfolio-content/sumati/description.jade')
        .pipe(jade(jade_config))
        .pipe(gulp.dest('portfolio-content/sumati'));

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
// Concat: vue.min.js, parallax.min.js, polyglot.min.js, zepto.min.js
gulp.task('vendor-js', function() {
    return gulp.src('js/vendor/src/*.js')
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('js/vendor/dist'));
});

gulp.task('javascript', function() {
    gulp.src([
        'js/vendor/dist/vendor.js',
        'js/main.js',
        'portfolio-content/projects.json',// JSON including
        'js/controller.js',
        "js/view_controller.js",
        'js/handlers.js'
        ])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('js'));
});

gulp.task('clean', function() {

    gulp.src(
        [
            "index.html",
            "index-ru.html",
            "portfolio-content/conclave/index.html",
            "portfolio-content/market/index.html",
            "portfolio-content/pp/index.html",
            "portfolio-content/imobo/index.html",
            "portfolio-content/redalgo/index.html",
            "portfolio-content/sumati/index.html",
            "js/all.js"
        ],
        {read: false}
    )
    .pipe(clean());

});

gulp.task('server-update', function() {
    exec('ansible-playbook -i deploy/ansible_config/server deploy/ansible_config/update.yml', {stdio:[0,1,2]})
});