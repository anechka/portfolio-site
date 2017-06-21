import setupModels from "./controller"
import { setupView } from "./viewController"
import router from "./router"

export const loadComplete = function() {
    console.info("Processing");

    const $applicationMeta = document.querySelector("meta[name=application-name]");
    if (typeof $applicationMeta !== "undefined" && "content" in $applicationMeta) {
        const moduleName = $applicationMeta.content || "NONAME";

        console.info(`Loaded ${ moduleName } module`);

        switch (moduleName) {
            case "index":
                setupModels();
                setupView();
                //window.viewModels = view_controller();
                router();
                break;
            default:
                //portfolio_set_background_and_look();
        }
    } else {
        console.warn("Bad application module");
    }
};