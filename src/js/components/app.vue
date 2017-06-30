<template lang="pug">
.app
    .container.parallax_container
        clouds
    .container.main-content-container
        include templates/headers
        about
        tags
        counter
        projects
        include templates/feedback
        include templates/social
</template>

<script>
    import clouds from "./parallax.vue"
    import about from "./about.vue"
    import tags from "./tags.vue"
    import counter from "./counter.vue"
    import projects from "./projects.vue"
    import email from "./email.vue"

    export default {
        components: { clouds, about, tags, counter, projects, email }
    }
</script>