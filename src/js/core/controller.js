import pluralize from "pluralize"
import markdown from "markdown"
import model from "./models"

function processProjects() {
    const path = {
        portfolioFolder: "portfolio-content",
        portfolioThumbnails: "images/portfolio-thumb"
    };
    const projectsReversed = model.state.projects.source.reverse();

    for (let project of projectsReversed) {
        const projectDescriptionsArray = project.description;

        let resultHTMLDescription = "";

        if (projectDescriptionsArray instanceof Array) {
            for (let description of projectDescriptionsArray) { resultHTMLDescription += `<p>${description}</p>` }
            project.descriptionHTML = resultHTMLDescription;
        }

        // Image src updates
        project.image = `${path.portfolioThumbnails}/${project.image}`;

        project.href = `#project/${project.name}`;
        project.time = project.time ? pluralize("month", project.time, true) : "1 week";
        project.task = project.task ? project.task : "PSD to HTML";

        // Processing links like buttons on external or internal resources
        if (project.hasOwnProperty("links")) {
            //console.log(`Processing links for ${project.dir} project`);
            const linksArray = project.links;

            for (let button of linksArray) {
                // console.log(`Before: ${button.href}`);
                button.href = button.href
                // Local Images replace path
                    .replace(/(^[A-Za-z]+[_.-A-Za-z]*[0-9]*)\.(png|jpg|jpeg|gif)$/g, `${path.portfolioFolder}/${project.dir}/images/$1.$2`)
                    // Local Pages replace path
                    .replace(/(^[A-Za-z]+[_.-A-Za-z]*[0-9]*)\.(htm[l]?)$/g, `${path.portfolioFolder}/${project.dir}/$1.$2`);
                // console.log(`After: ${button.href}`);

                const iconClassString = button.class;
                button.iconClass = {
                    //TODO: [OPTIMIZE in new ES6]
                    // iconClassString.includes("btn-site-link"),
                    "icon-logout": iconClassString.indexOf("btn-site-link") !== -1,
                    //TODO: [OPTIMIZE in new ES6]
                    // iconClassString.includes("btn-primary"),
                    "icon-github-alter": iconClassString.indexOf("btn-primary") !== -1,
                    //TODO: [OPTIMIZE in new ES6]
                    // iconClassString.includes("btn-default")
                    "icon-chrome": iconClassString.indexOf("btn-default") !== -1
                }
            }
        }

        // MArkdown for project
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

    model.state.counter.text = "Choose technology above"
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