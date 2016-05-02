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
            
            update: function (number) {
                this.projectsCounterText = number;
            }
        }
    });

    var projectsView = new Vue({
        el: '#projectsList',
        data: {
            items: null
        },
        methods: {

            displayProjects: function (projects) {
                this.items = projects;
            }
        }
    });

    // Tags ViewModel
    new Vue({
        el: '#tags',

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

                counterView.update(polyglot.t("projects", {smart_count: projectsNumberWithTag}));

            },

            click: function (incomeTag) {
                var result = [];

                for (var project_item in projects) {
                    var project = projects[project_item];
                    var projectTagsArray = project.tags;

                    for (var index = 0; index < projectTagsArray.length; index++) {
                        var tag = projectTagsArray[index];

                        if (incomeTag.toString().toLowerCase() == tag.toLowerCase()) {
                            result.push(project);
                        }
                    }
                }
                projectsView.displayProjects(result);
            }

        }
    });

}