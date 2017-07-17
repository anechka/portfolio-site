import Vue from "vue";
import App from "../components/app.vue";

export default viewsTypes = {
    flex: "flex",
    one: "project"
};

export function setupView() {
    console.log("creating Vue app instance");
    return new Vue({
        el: "#container",
        render: h => h(App)
    });
}