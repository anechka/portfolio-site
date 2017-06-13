<template lang="jade">
.app
    .container.parallax_container
        clouds
    .container.main-content-container
        include templates/headers.jade
        about
</template>

<script>
    import clouds from "./parallax.vue"
    import about from "./about.vue"

    export default {
        components: { clouds, about }
    }
</script>