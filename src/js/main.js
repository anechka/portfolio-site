import PluralizeJS from "./vendor/pluralize"
import setupModels from "./core/controller"
import { setupView } from "./core/viewController"
import router from "./core/router"

let application = {
    pluralize: PluralizeJS()
};

window.addEventListener("load", () => {
    setupModels();
    setupView();
    router();

    window.addEventListener("hashchange", router, false);
}, false);

export default application