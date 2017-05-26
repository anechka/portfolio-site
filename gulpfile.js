/**
 * Created by menangen on 18.03.15.
 *
 *  [default: `gulp --production`] task compile production Jade, ugly Coffee and min Less to deploy/docker/dist dir.
 *  [default: `gulp`] task compile development version of HTML, Javascript and CSS.
 *  [jade] task compile pretty htmls to deploy/docker/dist/index[-ru].html
 *  [jade-portfolio] individual task for compile portfolio jade to deploy/docker/dist/portfolio-content/id-portfolio/index.html
 *  [javascript] task compile coffeescript from src/coffee to deploy/docker/dist/js/all.js
 *  [test] task for testing (compiled from coffee) javascript: deploy/docker/dist/all.js, should run [jade] task before!
 *  [less] task compile src/less/main.less to deploy/docker/dist/main.min.css
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

var DockerContainerRepository = "menangen/site.anya";
var siteDomain = "novikova.us";

var production = !!util.env.production; // False for pretty HTML output in "jade" template engine task

gulp.task('default', ['jade','jade-portfolio','less','javascript']);

gulp.task('watch', ['jade', 'less'], function () {
        gulp.watch(['src/jade/index.jade', 'src/jade/index-ru.jade', 'src/jade/components/*.jade'], ['jade']);
        gulp.watch(['src/jade/portfolio/projects/**/*'], ['jade-portfolio']);
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
        .pipe(gulp.dest('deploy/docker/dist/css'));
});

// Compile only 2 templates: index[-RU].jade
gulp.task('jade', function() {
    var jadeVariables = {www: siteDomain};
    // Jade templates from src/jade folder
    gulp.src(['src/jade/index.jade', 'src/jade/index-ru.jade'])
    // Set jade({pretty: true}) for dev HTML output
        .pipe(jade(production ? {data: jadeVariables} : {pretty: true, data: jadeVariables}))
        .pipe(gulp.dest('deploy/docker/dist'));
});

// Compile portfolio jade files
gulp.task('jade-portfolio', function() {
    var jadeVariables = {www: siteDomain};
    var jadeConfig = production ? {data: jadeVariables} : {pretty: true, data: jadeVariables};

    // Jade templates from /portfolio/projects
    gulp.src('src/jade/portfolio/projects/conclave/conclave.jade')
        .pipe(jade(jadeConfig))
        .pipe(rename("index.html"))
        .pipe(gulp.dest("deploy/docker/dist/portfolio-content/conclave"));

    gulp.src('src/jade/portfolio/projects/market/chipmarket.jade')
        .pipe(jade(jadeConfig))
        .pipe(rename("index.html"))
        .pipe(gulp.dest("deploy/docker/dist/portfolio-content/market"));

    gulp.src('src/jade/portfolio/projects/pp/premium_parts.jade')
        .pipe(jade(jadeConfig))
        .pipe(rename("index.html"))
        .pipe(gulp.dest("deploy/docker/dist/portfolio-content/pp"));

    gulp.src('src/jade/portfolio/projects/imobo/imobo.jade')
        .pipe(jade(jadeConfig))
        .pipe(rename("index.html"))
        .pipe(gulp.dest("deploy/docker/dist/portfolio-content/imobo"));

    gulp.src('src/jade/portfolio/projects/redalgo/redalgo.jade')
        .pipe(jade(jadeConfig))
        .pipe(rename("index.html"))
        .pipe(gulp.dest("deploy/docker/dist/portfolio-content/redalgo"));

    gulp.src('src/jade/portfolio/projects/sumati/sumati.jade')
        .pipe(jade(jadeConfig))
        .pipe(rename("index.html"))
        .pipe(gulp.dest("deploy/docker/dist/portfolio-content/sumati"));

    gulp.src('src/jade/portfolio/projects/catapult/catapult.jade')
        .pipe(jade(jadeConfig))
        .pipe(rename("index.html"))
        .pipe(gulp.dest("deploy/docker/dist/portfolio-content/catapult"));

    gulp.src('src/jade/portfolio/projects/hammer/hammer.jade')
        .pipe(jade(jadeConfig))
        .pipe(rename("index.html"))
        .pipe(gulp.dest("deploy/docker/dist/portfolio-content/hammer"));

});

/* Concat this JS libs:
* vue.min.js for reactive UI [http://vuejs.org/]
* parallax.min.js for cloudsView [http://matthew.wagerfield.com/parallax/]
* polyglot.min.js for language features (Plural of Nouns) [https://github.com/airbnb/polyglot.js]
* cash.min.js for jQuery like attr manipulation, domready [https://github.com/kenwheeler/cash]
* director.min.js for routing /#/tagName [https://github.com/flatiron/director]
*/
gulp.task('vendor-js', function() {
    return gulp.src('src/js/vendor/*.js')
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('deploy/docker/dist/js/vendor'));
});

gulp.task('javascript', function() {
    gulp
        .src([// We can't use *.coffee because it is cause an error in jsdom testing engine with $(load) function
            'projects.coffee',
            'src/coffee/controller.coffee',
            'src/coffee/router.coffee',
            'src/coffee/view_controller.coffee',
            'src/coffee/handlers.coffee',
            // portfolio module
            'src/coffee/portfolio/portfolio_view_controller.coffee',
            // all compiled in one all.js and in the end wrapped by $() onload event
            'src/coffee/main.coffee'
        ])
        .pipe(concat('all.coffee'))
        .pipe(coffee({bare: true}).on('error', function(err) {console.log("Coffeescript compilation error!")}))
        .pipe(production ? uglify() : util.noop())
        .pipe(addsrc('deploy/docker/dist/js/vendor/vendor.js'))
        .pipe(concat('all.js'))
        .pipe(gulp.dest('deploy/docker/dist/js'));
});

gulp.task('coffee', ['javascript', 'test'], function () {
        gulp.watch(['projects.coffee', 'src/coffee/**/*'], ['javascript', 'test']);
    }
);

gulp.task('clean', function() {

    gulp.src(
        [
            "deploy/docker/dist/index.html",
            "deploy/docker/dist/index-ru.html",
            "deploy/docker/dist/portfolio-content/**/index.html",

            "deploy/docker/dist/css/main.min.css",

            "deploy/docker/dist/js/all.js"
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
    exec('ansible-playbook -i deploy/ansible/ansible_config/server deploy/ansible/ansible_config/update.yml', {stdio:[0,1,2]})
});

gulp.task('docker', function() {
    exec("find deploy/docker/dist -type f -name '*.DS_Store' -delete", {stdio:[0,1,2]});
    exec('docker build -t '+ DockerContainerRepository + ' deploy/docker', {stdio:[0,1,2]})
});