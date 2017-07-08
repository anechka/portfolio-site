import about from "./about.json"
import projects from "./projects.json"

import PluralizeJS from "./vendor/pluralize"
const pluralize = PluralizeJS();

const model = {
    state: {
        about,
        projects: {
            source: projects,
            visibleProjectsGroup: [],
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

                    counterText = counterText.substr(5) + ' on ' + tagName;

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
                return counterText
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
            text: "",
            setCounter(value) {
                if (typeof value === "string") this.text = value;
                else this.text = `Show ${pluralize("project", value, true)}`
            },
            showCounterTextForTag(tagName) {
                let projectsNumberWithTag = 0;

                for (let project of model.state.projects.source) {
                    const projectTagsArray = project.tags;

                    if (projectTagsArray.indexOf(tagName) !== -1) {
                        projectsNumberWithTag++;
                    }
                }

                const prevText = this.text;
                this.setCounter(projectsNumberWithTag);

                return prevText;
            }
        },
        www: null
    }
};

export default model