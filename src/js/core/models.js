import app from "../main"
import about from "../../json/about.json"
import projects from "../../json/projects.json"

const model = {
    state: {
        about,
        projects: {
            source: projects,
            visibleProjectsGroup: [],
            selectedProject: null,
            getByName(name) {
                for (let project of model.state.projects.source) {
                    if (project.name === name) return project
                }
            },
            howManyProjectsOn(tagName) {
                let projectsNumberWithTag = 0;

                for (let project of model.state.projects.source) {
                    const projectTagsArray = project.tags;

                    if (projectTagsArray.includes(tagName)) {
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
                    counterText = `${app.pluralize("project", counterProjects, true)} on ${tagName}`;

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
            },
            displayByName(name) {
                console.log(`displayByName: ${name}`);

                const project = model.state.projects.getByName(name);

                if (project) {
                    const projectName = project.name;

                    if (projectName.toLowerCase() === name.toLowerCase()) {
                        model.state.selectedProject = project;
                        model.state.counter.setCounter(projectName);
                    }
                }


            },
            displayCurrent() {
                if (!model.state.selectedProject) {
                    model.state.selectedProject = model.state.projects.getByName("Conclave")
                }

                return model.state.selectedProject
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
                if (typeof value === "string") this.text = value;
                else this.text = `Show ${app.pluralize("project", value, true)}`;
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