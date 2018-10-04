<template lang="pug">
    .row.portfolio
        component(v-bind:is="state.dynamicView", ref="view")
</template>

<script>
    import flexBoxComponent from "./portfolio/flexbox.vue"
    import projectComponent from "./portfolio/project.vue"

    import model from "../core/models"

    export default {
        props: ["currentView"],
        components: {
            "flex": flexBoxComponent,
            "project": projectComponent
        },
        data() {
            return {
                state: model.state
            }
        }
    }
</script>