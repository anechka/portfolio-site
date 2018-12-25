<template lang="pug">
.app
    include templates/routes.pug

    .container.parallax_container(v-else)
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
</template>

<script>
    import CDN from "../json/cdn.json"

    import clouds from "components/parallax.vue"
    import about from "components/about.vue"
    import tags from "components/tags.vue"
    import counter from "components/counter.vue"
    import portfolio from "components/portfolio.vue"
    import email from "components/email.vue"

    import setupModels from "./core/controller"

    export default {
        el: "#container",
        components: { clouds, about, tags, counter, portfolio, email },
        data() {
            return {
                CDN: CDN[CDN.use],
                displayRoutes: false
            }
        },
        methods: {},
        created() {
            setupModels();

            window.addEventListener('keydown', (event) => {

                if (event.key === "F1") {
                    this.displayRoutes = !this.displayRoutes
                }

            });
        }
    }
</script>