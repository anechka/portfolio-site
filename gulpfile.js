/**
 * Created by menangen on 18.03.15.
 *
 *  [default: `gulp --production`] task compile production Jade, ugly Coffee and min Less to /dist dir.
 *  [default: `gulp`] task compile development version of HTML, Javascript and CSS.
 *  [jade] task compile pretty htmls to /dist/index[-ru].html
 *  [jade-portfolio] individual task for compile portfolio jade to dist/portfolio-content/id-portfolio/index.html
 *  [javascript] task compile coffeescript from src/coffee to /dist/js/all.js
 *  [test] task for testing (compiled from coffee) javascript: dist/all.js, should run [jade] task before!
 *  [less] task compile src/less/main.less to /dist/main.min.css
 *  [clean] task remove all HTMLs, Javascript and CSS files compiled by gulp.
Please use [watch] task for development process with jade and less files. */
var exec = require('child_process').execSync;
var gulp = require('gulp');
var util = require('gulp-util');

var jade = require('gulp-jade');
var less = require('gulp-less');
var coffee = require('gulp-coffee');

var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var rename = require("gulp-rename");
var concat = require('gulp-concat');
var addsrc = require('gulp-add-src');
var clean = require('gulp-clean');

var production = !!util.env.production; // False for pretty HTML output in "jade" template engine task

gulp.task('default', ['jade','jade-portfolio','less','javascript']);

gulp.task('watch', function () {
        gulp.watch(['src/jade/index.jade'], ['jade']);
        gulp.watch(['src/jade/portfolio/**/*'], ['jade-portfolio']);
        gulp.watch(['src/less/**/*'], ['less']);
    }
);

gulp.task('less', function() {
    // less styles from src/less folder
    // only one root file need compile
    gulp.src('src/less/main.less')
        .pipe(less())
        .pipe(production ? cssmin() : util.noop())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'));
});

// Compile only 2 templates: index[-RU].jade
gulp.task('jade', function() {
    // Jade templates from src/jade folder
    // gulp.src(['src/jade/index.jade', 'src/jade/index-ru.jade']) Uncomment it for RU version
    gulp.src('src/jade/index.jade')
    .pipe(jade(production ? {} : {pretty: true})) // Call jade({pretty: true}) for dev
    .pipe(gulp.dest('dist'));

});

// Compile portfolio jade files
gulp.task('jade-portfolio', function() {
    var jade_config = production ? {} : {pretty: true};

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

// Concat: vue.min.js, parallax.min.js, polyglot.min.js, cash.min.js
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
            // all compiled in one all.js and in the end wrapped by $() onload event
            'src/coffee/main.coffee'
        ])
        .pipe(concat('all.coffee'))
        .pipe(coffee({bare: true}).on('error', function(err) {console.log("Coffeescript compilation error!")}))
        .pipe(production ? uglify() : util.noop())
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