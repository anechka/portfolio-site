/**
 * Created by menangen on 05.05.16.
 */
var Jasmine = require('jasmine');
var jrunner = new Jasmine();
var SpecReporter = require('jasmine-spec-reporter');
var noop = new Function;

jrunner.configureDefaultReporter({print: noop});
jasmine.getEnv().addReporter(new SpecReporter());

jrunner.loadConfig({
    spec_dir: 'spec',
    spec_files: [
        "viewModelTest.js"
    ]
});

jrunner.execute();