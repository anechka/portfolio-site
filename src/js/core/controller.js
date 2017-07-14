import PluralizeJS from "../vendor/pluralize"
import markdown from "../vendor/markdown"
import model from "./models"

const pluralize = PluralizeJS();

function processProjects() {
    const result = model.state.projects.source.reverse();

    for (let project of result) {
        const projectDescriptionsArray = project.description;

        let resultHTMLDescription = "";

        if (projectDescriptionsArray instanceof Array) {
            for (let description of projectDescriptionsArray) { resultHTMLDescription += `<p>${description}</p>` }
            project.descriptionHTML = resultHTMLDescription;
        }

        // Image src updates
        project.image = `images/portfolio-thumb/${project.image}`;
        // Project location in dir for <a> tag
        project.href = project.dir ? `portfolio-content/${project.dir}` : `http://${window.www}`;
        project.time = project.time ? pluralize("month", project.time, true) : "1 week";
        project.task = project.task ? project.task : "PSD to HTML";

        if (project.hasOwnProperty("markdown")) {
            const markdownObject = project.markdown;

            for (let markdownSection in markdownObject) {

                let markdownSectionValue = markdownObject[markdownSection];
                let CompiledHTML;

                if (markdownSectionValue instanceof Array) {

                    let resultMarkdownString = "";
                    for (let markdownItem of markdownSectionValue) { resultMarkdownString += `${markdownItem}\n` }

                    CompiledHTML = markdown(resultMarkdownString)
                }
                else if (markdownSectionValue instanceof String) {
                    CompiledHTML = markdown(markdownSectionValue)
                }

                markdownObject[markdownSection] = CompiledHTML;
            }
        }
    }

    model.state.counter.text = `More than ${pluralize("project", model.state.projects.source.length, true)} released`
}

function setupAbout() {
    const exp = model.state.about.experience;
    for (let stackName in exp) {
        const yearsNumber = exp[stackName];
        exp[stackName] = pluralize("year", yearsNumber, true);
    }
}

export default function setupModels() {
    model.state.www = document.querySelector("meta[name=author]").content;
    processProjects();
    setupAbout();

    console.info("Complete setup Models");
}