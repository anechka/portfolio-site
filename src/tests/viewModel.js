/**
 * Created by menangen on 05.05.16.
 */
var fs = require("fs");
var projectsJSON = fs.readFileSync("../../projects.json", "utf-8");
var jsdom = require("jsdom");

var polyglot = require("../js/vendor/polyglot.min");
var vue = require("../js/vendor/vue.min");

var viewModule = require("../js/view_controller");

global.document = jsdom.jsdom('<body></body>');
global.window = document.defaultView;
global.navigator = window.navigator;

global.Polyglot = polyglot;
global.Vue = vue;
global.projects = eval(projectsJSON);


var viewModels = viewModule.viewController();
console.log(viewModels.counterView.getCounterText());

viewModels.counterView.setCounter(12);
console.log(viewModels.counterView.getCounterText());