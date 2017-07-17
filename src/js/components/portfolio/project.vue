<template lang="pug">
    .col-md-10.col-md-offset-1.margined-top-div.description-content(style="background: white; color: grey")
        descriptionComponent
        linksComponent
</template>

<script>
    import descriptionComponent from "./project/description.vue"
    import linksComponent from "./project/links.vue"

    export default {
        data() {
            return {
            }
        },
        components: {
            descriptionComponent,
            linksComponent
        },
        methods: {
        }
    }
</script>