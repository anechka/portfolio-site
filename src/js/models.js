import about from "./about.json"
import projects from "./projects.json"

import PluralizeJS from "./vendor/pluralize"
const pluralize = PluralizeJS();

const model = {
    state: {
        about,
        projects: {
            source: projects,
            visibleProjectsGroup: null,
            displayProjectsByTag(tagName) {
                const group = [];
                const couple = [];

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


                    this.visibleProjectsGroup = group;
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