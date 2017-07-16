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
                const tagName = decodeURI(urlArray[0]).toLowerCase();// Second el = projectName like "Project%20Name"
                //console.log(`Tag is ${tagName}`);
                model.state.projects.displayProjectsByTag(tagName);

                application.view.$children[0].$refs.projects.changeView(viewsTypes.flex);
            }
            else if (urlArray.length === 2) {
                // Processing project
                const projectName = decodeURI(urlArray[1]);// Second el = projectName like "Project%20Name"
                //console.log(`Project is ${projectName}`);

                application.view.$children[0].$refs.projects.changeView(viewsTypes.one)
            }
        }
    }
}