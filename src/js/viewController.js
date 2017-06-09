import Vue from "vue"
import App from "./components/app.vue"

export function setupView() {
    return new Vue({
        el: "#container",
        render: h => h(App)
    });
}