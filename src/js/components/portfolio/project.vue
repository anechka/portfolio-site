<template lang="pug">
    .col-md-10.col-md-offset-1.margined-top-div.description-content(style="background: white; color: grey")
        descriptionComponent(:project="project")
        linksComponent(:project="project")
</template>

<script>
    import descriptionComponent from "./description.vue"
    import linksComponent from "./links.vue"

    import model from "../../core/models"

    const project = model.state.projects.getByName("Conclave");

    export default {
        data() {
            return {
                project: project
            }
        },
        components: {
            descriptionComponent,
            linksComponent
        }
    }
</script>