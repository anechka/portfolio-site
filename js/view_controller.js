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
            projectsCounterText: polyglot.t("projects", {smart_count: Math.floor(Math.random() * (3 - 1 + 1)) + 1})
        },
        // define methods under the `methods` object
        methods: {
            
            update: function (number) {
                // `this` inside methods point to the Vue instance
                this.projectsCounterText = number;
            }
        }
    });

    var projectsView = new Vue({
        el: '#projectsList',
        data: {
            items: null
        },
        // define methods under the `methods` object
        methods: {

            displayProjects: function (projects) {
                // `this` inside methods point to the Vue instance
                this.items = projects;
            }
        }
    });

    // Tags ViewModel
    new Vue({
        el: '#tags',

        methods: {
            
            update: function (incomeTag) {
                var projectsNumberWithTag = 0;
                var result = [];

                for (var project_item in projects) {
                    var project = projects[project_item];
                    var projectTagsArray = project.tags;

                    for (var index = 0; index < projectTagsArray.length; index++) {
                        var tag = projectTagsArray[index];

                        if (incomeTag.toString().toLowerCase() == tag.toLowerCase()) {
                            projectsNumberWithTag++;

                            result.push(project);
                        }
                    }
                }

                counterView.update(polyglot.t("projects", {smart_count: projectsNumberWithTag}));
                projectsView.displayProjects(result);

            }
        }
    });

}