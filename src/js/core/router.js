import model from "../core/models"

const RouterPlugin = {
    trailingSlashRE: /[^\/#]+/ig,
    processRoute(e) {
        const hash = location.hash || '';

        if (hash) {
            //console.info(`hash is ${hash}`);
            const urlArray = hash.match(RouterPlugin.trailingSlashRE) || [];

            if (urlArray.length === 1) {
                // Processing tag
                const tagName = decodeURI(urlArray[0]).toLowerCase();
                console.log(`Tag is ${tagName}`);

                model.state.projects.displayProjectsByTag(tagName);
                model.state.dynamicView = "flex";
            }
            else if (urlArray.length === 2) {
                // Processing project
                // Second el in urlArray will be projectName like "Project%20Name"
                const projectName = decodeURI(urlArray[1]);// Second el = projectName like "Project%20Name"
                console.log(`Project is ${projectName}`);

                model.state.projects.displayByName(projectName);
                model.state.dynamicView = "project";
            }
        }
    },
    install (Vue, options) {
        console.info("Setup route plugin");
        if (location.hasOwnProperty("hash")) {
            window.addEventListener("hashchange", RouterPlugin.processRoute, false);

            RouterPlugin.processRoute();
        }
    }
};

export default RouterPlugin