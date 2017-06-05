import model from "./models"

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

function processProjects() {
    polyglot.extend({'months': '%{smart_count} month |||| %{smart_count} months'});

    const result = model.state.projects.reverse();

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

}

function setupAbout() {
    polyglot.extend({'years': '%{smart_count} year |||| %{smart_count} years'});

    const exp = model.state.about.experience;
    for (let stackName in exp) {
        const years = exp[stackName];
        exp[stackName] = polyglot.t('years', {smart_count: years});
    }
}

export default function setupModels() {
    model.state.www = document.querySelector("meta[name=author]").content;
    processProjects();
    setupTags();
    setupAbout();

    console.info("Complete setup Models");
}