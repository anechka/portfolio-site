import about from "../../json/about.json"
import projects from "../../json/projects.json"

import PluralizeJS from "../vendor/pluralize"
const pluralize = PluralizeJS();

const model = {
    state: {
        about,
        projects: {
            source: projects,
            visibleProjectsGroup: [],
            howManyProjectsOn(tagName) {
                let projectsNumberWithTag = 0;

                for (let project of model.state.projects.source) {
                    const projectTagsArray = project.tags;

                    if (projectTagsArray.indexOf(tagName) !== -1) {
                        projectsNumberWithTag++;
                    }
                }
                return projectsNumberWithTag
            },
            displayProjectsByTag(tagName) {
                let couple = [];
                const group = this.visibleProjectsGroup;
                // Clear group:[ Couple[ {project}, {project} ], Couple[ {project}, {project} ] ]
                group.splice(0, group.length);

                let counterText = model.state.counter.text;
                let tags = model.state.tags;

                if (tags.hasOwnProperty(tagName)) {
                    // Disable all tags on loop
                    for (let key in tags) {
                        tags[key] = false
                    }

                    // Enable one tag active
                    tags[tagName] = true;

                    const counterProjects = model.state.projects.howManyProjectsOn(tagName);
                    counterText = `${pluralize("project", counterProjects, true)} on ${tagName}`;

                    for (let project of model.state.projects.source) {
                        const projectTagsArray = project.tags;

                        if (projectTagsArray.indexOf(tagName) !== -1) {
                            couple.push(project)
                        }

                        if (couple.length === 2) {
                            group.push(couple);
                            couple = []
                        }
                    }

                    if (couple.length === 1) group.push(couple);
                }

                model.state.counter.text = counterText;
                model.state.counter.prevText = model.state.counter.text;
            }
        },
        tags: {
            django: false,
            bootstrap: false,
            less: false,
            sass: false,
            nodejs: false,
            python: false,
            javascript: false,
            jquery: false,
            angular: false
        },
        counter: {
            prevText: "",
            text: "",
            setCounter(value) {
                this.text = `Show ${pluralize("project", value, true)}`;
            },
            setDefaultCounter() {
                this.text = this.prevText;
            },
            showCounterTextForTag(tagName) {
                this.prevText = this.text;
                const counterProjects = model.state.projects.howManyProjectsOn(tagName);

                this.setCounter(counterProjects);
            }
        },
        www: null
    }
};

export default model