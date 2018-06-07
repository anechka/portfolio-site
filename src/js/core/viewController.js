import Vue from "vue";
import App from "../components/app.vue";
import application from "../main"

export default viewsTypes = {
    flex: "flex",
    project: "project"
};

export function setupView() {
    console.log("creating Vue app instance");
    application.view = new Vue(App)
}