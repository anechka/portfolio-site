<template lang="pug">
    .col-md-12.margined-top-div.description-content
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
        }
    }
</script>