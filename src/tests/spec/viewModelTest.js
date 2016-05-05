/**
 * Created by menangen on 05.05.16.
 */
var fs = require("fs");
var projectsJSON = fs.readFileSync("../../projects.json", "utf-8");
var jsdom = require("jsdom");

var polyglot = require("../../js/vendor/polyglot.min");
var vue = require("../../js/vendor/vue.min");

//var viewModule = require("../../js/view_controller");
var viewModule = require("../../coffee/view_controller");

global.document = jsdom.jsdom('<body></body>');
global.window = document.defaultView;
global.navigator = window.navigator;

global.Polyglot = polyglot;
global.Vue = vue;
global.projects = eval(projectsJSON);


var viewModels = viewModule.viewController();

describe("counterView", function() {

    it("in viewModels", function() {
        expect(viewModels.counterView).toBeDefined();
    });

    it("counterView is Vue instance", function() {
        expect(viewModels.counterView._isVue).toBe(true);
    });
});

describe("Projects counter have a text", function() {
    it("as projects number total", function() {
        expect(viewModels.counterView.getCounterText()).toBe(projects.length + ' projects total');
    });
});

describe("Projects counter", function() {
    it("can get text", function() {
        expect(viewModels.counterView.getCounterText).toBeDefined();
    });

    it("can set text", function() {
        expect(viewModels.counterView.setCounterText).toBeDefined();
    });

    it("can set number", function() {
        expect(viewModels.counterView.setCounter).toBeDefined();
    });
});

describe("Projects counter have a text", function() {
    it("1 project for setCounter", function() {
        viewModels.counterView.setCounter(1);
        expect(viewModels.counterView.getCounterText()).toBe('1 project');
    });

    it("Test-Text", function() {
        viewModels.counterView.setCounterText("Test-Text");
        expect(viewModels.counterView.getCounterText()).toBe('Test-Text');
    });
});