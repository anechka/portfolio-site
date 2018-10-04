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
const exec = require('child_process').execSync;
const gulp = require('gulp');
const util = require('gulp-util');

const jade = require('gulp-jade');
const less = require('gulp-less');

const cssmin = require('gulp-cssmin');
const rename = require("gulp-rename");
const concat = require('gulp-concat');
const clean = require('gulp-clean');

const DockerContainerRepository = "menangen/site.anya";
const siteDomain = "novikova.us";

const production = !!util.env.production; // False for pretty HTML output in "jade" template engine task

gulp.task('default', ['jade', 'less']);

gulp.task('watch', () => {
        //gulp.watch(['src/jade/index.jade', 'src/jade/index-ru.jade', 'src/jade/components/*.jade'], ['jade']);
        //gulp.watch(['src/jade/portfolio/projects/**/*'], ['jade-portfolio']);
        //gulp.watch(['src/less/**/*'], ['less']);
        gulp.watch(['src/js/*.js', 'src/js/components/*.vue'], ['javascript']);
    }
);

gulp.task('less', () => {
    // less styles from src/less folder
    // only one root file need compile
    gulp.src('src/less/main.less')
        .pipe(less())
        .pipe(production ? cssmin() : util.noop())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('deploy/docker/dist/css'));
});

// Compile only 2 templates: index[-RU].jade
gulp.task('jade', () => {
    let jadeVariables = {domain: siteDomain};
    // Jade templates from src/jade folder
    gulp.src([
        'src/jade/index.jade'// ,'src/jade/index-ru.jade'
    ])
    // Set jade({pretty: true}) for dev HTML output
        .pipe(jade(production ? { data: jadeVariables } : { pretty: true, data: jadeVariables }))
        .pipe(gulp.dest('deploy/docker/dist'));
});


gulp.task('clean', () => {

    gulp.src(
        [
            "deploy/docker/dist/index.html",
            "deploy/docker/dist/index-ru.html",
            "deploy/docker/dist/portfolio-content/**/index.html",

            "deploy/docker/dist/css/main.min.css",

            "deploy/docker/dist/js/"
        ],
        {read: false}
    )
    .pipe(clean());

});

gulp.task('test', () => {
    require('coffee-script').register();
    const jasmine = require('gulp-jasmine');

    const specReporter = require('jasmine-spec-reporter');

    gulp.src(['src/tests/spec/globalTest.coffee', 'src/tests/spec/modelsTest.coffee', 'src/tests/spec/viewModelTest.coffee'])
        // gulp-jasmine works on filepaths so you can't have any plugins before it
        .pipe(jasmine({
            reporter: new specReporter()
        }))
        .on('error', function () {
            process.exit(1)
        });

});

gulp.task('server-update', () => {
    exec('ansible-playbook -i deploy/ansible/ansible_config/server deploy/ansible/ansible_config/update.yml', {stdio:[0,1,2]})
});

gulp.task('docker', () => {
    exec("find deploy/docker/dist -type f -name '*.DS_Store' -delete", {stdio:[0,1,2]});
    exec('docker build -t '+ DockerContainerRepository + ' deploy/docker', {stdio:[0,1,2]})
});