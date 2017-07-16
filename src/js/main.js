import setupModels from "./core/controller"
import { setupView } from "./core/viewController"
import router from "./core/router"

window.addEventListener("load", () => {
    setupModels();
    setupView();
    router();

    window.addEventListener("hashchange", router, false);
}, false);