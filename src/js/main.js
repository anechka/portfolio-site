import setupModels from "./core/controller"
import { setupView } from "./core/viewController"
import router from "./core/router"

let application = {
};

window.addEventListener("load", () => {
    setupModels();
    application.view = setupView();
    router();

    window.addEventListener("hashchange", router, false);
}, false);

export default application