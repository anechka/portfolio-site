<template lang="pug">
.app
    .container.parallax_container
        clouds
    .container.main-content-container
        include templates/headers
        about
        tags
        counter
        portfolio(:currentView="view")
        include templates/feedback
        include templates/social

    link(rel="stylesheet", href="css/main.min.css")
    link(rel="icon", href="favicon.ico")
</template>

<script>
    import clouds from "./parallax.vue"
    import about from "./about.vue"
    import tags from "./tags.vue"
    import counter from "./counter.vue"
    import portfolio from "./portfolio.vue"
    import email from "./email.vue"

    import model from "../core/models"
    import viewsTypes from "../core/viewController"

    export default {
        el: "#container",
        components: { clouds, about, tags, counter, portfolio, email },
        data() {
            return {
                view: viewsTypes.flex
            }
        },
        methods: {
            setPortfolioView(name) {

                if (this.view !== name) {
                    this.view = name;
                }

            }
        },
        created() { model.state.projects.displayCurrent() }
    }
</script>