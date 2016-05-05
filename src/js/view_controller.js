/**
 * Created by menangen on 01.05.16.
 */
function view_controller () {
    var polyglot = new Polyglot({locale: "en"}); //polyglot.locale("en");
    polyglot.extend({
        "projects": "%{smart_count} project |||| %{smart_count} projects"// Do not edit %{smart_count}!
    });

    var counterView = new Vue({
        el: '#counter',
        data: {
            projectsCounterText: polyglot.t("projects", {smart_count: projects.length}) + " total"
        },
        methods: {
            setCounter: function (int) {
                this.projectsCounterText = polyglot.t("projects", {smart_count: int});
            },
            
            setCounterText: function (text) {
                this.projectsCounterText = text;
            },

            getCounterText: function () {
                return this.projectsCounterText;
            }
        }
    });

    var projectsView = new Vue({
        el: '#projectsList',
        data: {
            group: null
        },
        methods: {

            displayProjects: function (group) {
                this.group = group;
            }
        }
    });

    // Tags ViewModel
    var tagsView = new Vue({
        el: '#tags',

        // Tag list, active is disabled
        data: {
            tags: {
                django: false,
                bootstrap: false,
                less: false,
                sass: false,
                node: false,
                python: false,
                javascript: false,
                jquery: false,
                angular: false
            },
            counterText: ""
        },

        methods: {
            
            mouseOver: function (incomeTag) {
                var projectsNumberWithTag = 0;

                for (var project_item in projects) {
                    var project = projects[project_item];
                    var projectTagsArray = project.tags;

                    for (var index = 0; index < projectTagsArray.length; index++) {
                        var tag = projectTagsArray[index];

                        if (incomeTag.toString().toLowerCase() == tag.toLowerCase()) {
                            projectsNumberWithTag++;
                        }
                    }
                }

                this.counterText = counterView.getCounterText();
                counterView.setCounter(projectsNumberWithTag);

            },

            mouseOut: function () {
                counterView.setCounterText(this.counterText)
            },

            click: function (incomeTag) {
                var group = [], couple = [];

                if (this.tags.hasOwnProperty(incomeTag)) {
                    // Disable all tags on loop

                    for (var key in this.tags) {
                        this.tags[key] = false; // Disable tag activity
                    }

                    this.tags[incomeTag] = true; // Enable one tag active

                    var textAfterClick = counterView.getCounterText() + " on " + incomeTag;
                    this.counterText = textAfterClick;

                    counterView.setCounterText(textAfterClick)
                }

                for (var project_item in projects) {
                    var project = projects[project_item];
                    var projectTagsArray = project.tags;

                    for (var index = 0; index < projectTagsArray.length; index++) {
                        var tag = projectTagsArray[index];

                        if (incomeTag.toString().toLowerCase() == tag.toLowerCase()) {
                            couple.push(project);
                        }
                    }

                    if (couple.length == 2) {
                        group.push(couple);
                        couple = [];
                    }
                }

                if (couple.length == 1) {
                    group.push(couple);
                }

                projectsView.displayProjects(group);
            }

        }
    });

    return {
        counterView: counterView,
        projectsView: projectsView,
        tagsView: tagsView
    }
}
// Running in Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports.viewController = view_controller;
}