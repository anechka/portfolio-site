import about from "./about.json"
import projects from "./projects.json"

const polyglot = new Polyglot({locale: 'en'});

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

function getProjectsModel() {
    polyglot.extend({'months': '%{smart_count} month |||| %{smart_count} months'});

    const result = projects.reverse();

    for (let index in result) {
        let project = result[index];
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
        project.time = project.time ? polyglot.t('months', {smart_count: project.time}) : "1 week";
        project.task = project.task ? project.task : "PSD to HTML";
    }

    return result;
}

function setupAbout() {
    polyglot.extend({'years': '%{smart_count} year |||| %{smart_count} years'});

    const exp = about.experience;
    for (let stackName in exp) {
        const years = exp[stackName];
        exp[stackName] = polyglot.t('years', {smart_count: years});
    }
}

export default function setupModels() {
    window.www = document.querySelector("meta[name=author]").content;
    window.projects = getProjectsModel();
    setupTags();
    setupAbout();

    console.log("Complete setup Models");
}