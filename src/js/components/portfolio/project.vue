<template lang="pug">
    .col-md-10.col-md-offset-1.margined-top-div.description-content(style="background: white")
        descriptionComponent
        linksComponent
</template>

<script>
    import descriptionComponent from "./description.vue"
    import linksComponent from "./links.vue"

    export default {
        data() {
            return {
                currentView: ""
            }
        },
        components: {
            descriptionComponent,
            linksComponent
        }
    }
</script>