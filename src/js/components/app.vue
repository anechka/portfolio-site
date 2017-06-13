<template lang="jade">
.app
    .container.parallax_container
        clouds
    .container.main-content-container
        include templates/headers.jade
        about
        tags
        counter
</template>

<script>
    import clouds from "./parallax.vue"
    import about from "./about.vue"
    import tags from "./tags.vue"
    import counter from "./counter.vue"

    export default {
        components: { clouds, about, tags, counter }
    }
</script>