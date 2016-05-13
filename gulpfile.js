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
var less = require('gulp-less');
var coffee = require('gulp-coffee');

var cssmin = require('gulp-cssmin');
var rename = require("gulp-rename");
var concat = require('gulp-concat');
var addsrc = require('gulp-add-src');
var clean = require('gulp-clean');

gulp.task('default', function() {
    // Start point
    production = true;
    gulp.run('jade'); gulp.run('jade-portfolio');
    gulp.run('less');
    gulp.run('javascript');
});

gulp.task('dev', ['jade', 'javascript']
);

gulp.task('less', function() {
    // less styles from src/less folder
    // only one root file need compile
    gulp.src('src/less/main.less')
        .pipe(less())
        //.pipe(cssmin()) // Comment it for development
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'));

});

// Compile only 2 templates: index[-RU].jade
gulp.task('jade', function() {

    var jade_config = {};
    if (!production) { jade_config.pretty = true }// Call jade({pretty: true}) for dev

    // Jade templates from src/jade folder
    gulp.src(['src/jade/index.jade', 'src/jade/index-ru.jade'])
    .pipe(jade(jade_config))
    .pipe(gulp.dest('dist'));

});

// Compile portfolio jade files
gulp.task('jade-portfolio', function() {
    var jade_config = {};
    if (!production) { jade_config.pretty = true }

    // Jade templates from /portfolio
    gulp.src('src/jade/portfolio/conclave/conclave.jade')
        .pipe(jade(jade_config))
        .pipe(rename("index.html"))
        .pipe(gulp.dest("dist/portfolio-content/conclave"));

    gulp.src('src/jade/portfolio/market/chipmarket.jade')
        .pipe(jade(jade_config))
        .pipe(rename("index.html"))
        .pipe(gulp.dest("dist/portfolio-content/market"));

    gulp.src('src/jade/portfolio/pp/premium_parts.jade')
        .pipe(jade(jade_config))
        .pipe(rename("index.html"))
        .pipe(gulp.dest("dist/portfolio-content/pp"));

    gulp.src('src/jade/portfolio/imobo/imobo.jade')
        .pipe(jade(jade_config))
        .pipe(rename("index.html"))
        .pipe(gulp.dest("dist/portfolio-content/imobo"));

    gulp.src('src/jade/portfolio/redalgo/redalgo.jade')
        .pipe(jade(jade_config))
        .pipe(rename("index.html"))
        .pipe(gulp.dest("dist/portfolio-content/redalgo"));

    gulp.src('src/jade/portfolio/sumati/sumati.jade')
        .pipe(jade(jade_config))
        .pipe(rename("index.html"))
        .pipe(gulp.dest("dist/portfolio-content/sumati"));

});

// Concat: vue.min.js, parallax.min.js, polyglot.min.js, zepto.min.js
gulp.task('vendor-js', function() {
    return gulp.src('src/js/vendor/*.js')
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('dist/js/vendor'));
});

gulp.task('javascript', function() {
    gulp
        .src([// We can't use *.coffee because it is cause an error in jsdom testing engine with $(load) function
            'projects.coffee',
            'src/coffee/controller.coffee',
            'src/coffee/view_controller.coffee',
            'src/coffee/handlers.coffee',
            // portfolio modules
            'src/coffee/portfolio/portfolio_controller.coffee',
            'src/coffee/portfolio/portfolio_view_controller.coffee',
            'src/coffee/main.coffee'
        ])
        .pipe(concat('all.coffee'))
        .pipe(coffee({bare: true}).on('error', function(err) {console.log("Coffeescript compilation error!")}))
        .pipe(addsrc('dist/js/vendor/vendor.js'))
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('clean', function() {

    gulp.src(
        [
            "dist/index.html",
            "dist/index-ru.html",
            "dist/portfolio-content/conclave/index.html",
            "dist/portfolio-content/market/index.html",
            "dist/portfolio-content/pp/index.html",
            "dist/portfolio-content/imobo/index.html",
            "dist/portfolio-content/redalgo/index.html",
            "dist/portfolio-content/sumati/index.html",

            "dist/css/main.min.css",

            "dist/js/all.js"
        ],
        {read: false}
    )
    .pipe(clean());

});

gulp.task('test', function() {
    require('coffee-script').register();
    const jasmine = require('gulp-jasmine');

    var SpecReporter = require('jasmine-spec-reporter');

    gulp.src(['src/tests/spec/globalTest.coffee', 'src/tests/spec/modelsTest.coffee', 'src/tests/spec/viewModelTest.coffee'])
        // gulp-jasmine works on filepaths so you can't have any plugins before it
        .pipe(jasmine({
            reporter: new SpecReporter()
        }));

});

gulp.task('server-update', function() {
    exec('ansible-playbook -i deploy/ansible_config/server deploy/ansible_config/update.yml', {stdio:[0,1,2]})
});