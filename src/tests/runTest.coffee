Jasmine = require 'jasmine'
jrunner = new Jasmine
SpecReporter = require 'jasmine-spec-reporter'
noop = new Function

jrunner.configureDefaultReporter print: noop
jasmine.getEnv().addReporter new SpecReporter

jrunner.loadConfig
  spec_dir: 'spec'
  spec_files: ['globalTest.coffee', 'modelsTest.coffee', 'viewModelTest.coffee' ]

jrunner.execute()