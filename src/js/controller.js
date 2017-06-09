import PluralizeJS from "./vendor/pluralize"
import model from "./models"

const pluralize = PluralizeJS();

function setupTags() {
    window.tags = {
        django: false,
        bootstrap: false,
        less: false,
        sass: false,
        nodejs: false,
        python: false,
        javascript: false,
        jquery: false,
        angular: false
    };
}

function processProjects() {
    const result = model.state.projects.reverse();

    for (let project of result) {
        let projectDescriptionsArray = project.description;

        let resultHTMLDescription = "";

        if (projectDescriptionsArray instanceof Array) {
            for (let description of projectDescriptionsArray) { resultHTMLDescription += `<p>${description}</p>` }
            project.description = resultHTMLDescription;
        }

        // Image src updates
        project.image = `images/portfolio-thumb/${project.image}`;
        // Project location in dir for <a> tag
        project.href = project.dir ? `portfolio-content/${project.dir}` : `http://${window.www}`;
        project.time = project.time ? pluralize("month", project.time, true) : "1 week";
        project.task = project.task ? project.task : "PSD to HTML";
    }

}

function setupAbout() {
    const exp = model.state.about.experience;
    for (let stackName in exp) {
        const yearsNumber = exp[stackName];
        exp[stackName] = pluralize("year", yearsNumber);
    }
}

export default function setupModels() {
    model.state.www = document.querySelector("meta[name=author]").content;
    processProjects();
    setupTags();
    setupAbout();

    console.info("Complete setup Models");
}