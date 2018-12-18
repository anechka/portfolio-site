<template lang="pug">
.app
    .container.parallax_container
        clouds
    .container.main-content-container
        include templates/headers.pug

        about
        tags
        counter
        portfolio

        include templates/feedback.pug
        include templates/social.pug

    link(rel="stylesheet", href="css/main.min.css")
    link(rel="icon", href="favicon.ico")
</template>

<script>
    import clouds from "components/parallax.vue"
    import about from "components/about.vue"
    import tags from "components/tags.vue"
    import counter from "components/counter.vue"
    import portfolio from "components/portfolio.vue"
    import email from "components/email.vue"

    import model from "core/models"
    import setupModels from "./core/controller"

    export default {
        el: "#container",
        components: { clouds, about, tags, counter, portfolio, email },
        data() {
            return {
                state: model.state
            }
        },
        methods: {},
        created() {
            setupModels();

            this.state.projects.displayCurrent()
        }
    }
</script>