import Vue from "vue"
import pluralize from "./vendor/pluralize"
import markdown from "./vendor/markdown"
import Parallax from "./vendor/parallax"

//Vue.use(Vuex)

export { Vue, markdown, Parallax };
export const Pluralize = pluralize();
