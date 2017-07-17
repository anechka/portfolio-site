import model from "../core/models"
import viewsTypes from "./viewController"
import application from "../main"

export default function() {
    const trailingSlashRE = /[^\/#]+/ig;

    if (location.hasOwnProperty("hash")) {
        const hash = location.hash || '';

        if (hash) {
            //console.info(`hash is ${hash}`);
            const urlArray = hash.match(trailingSlashRE) || [];

            if (urlArray.length === 1) {
                // Processing tag
                const tagName = decodeURI(urlArray[0]).toLowerCase();
                console.log(`Tag is ${tagName}`);

                application.view.setView(viewsTypes.flex);
                model.state.projects.displayProjectsByTag(tagName);
            }
            else if (urlArray.length === 2) {
                // Processing project
                // Second el in urlArray will be projectName like "Project%20Name"
                const projectName = decodeURI(urlArray[1]);// Second el = projectName like "Project%20Name"
                console.log(`Project is ${projectName}`);

                model.state.projects.displayByName(projectName);
                application.view.setView(viewsTypes.project)
            }
        }
    }
}