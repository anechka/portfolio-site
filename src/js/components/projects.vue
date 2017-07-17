<template lang="pug">
   .row
       component(v-bind:is="currentView")
</template>

<script>
    import flexBoxComponent from "./portfolio/flexbox.vue"
    import projectComponent from "./portfolio/project.vue"

    export default {
        data() {
            return {
                currentView: "flex"
            }
        },
        components: {
            "flex": flexBoxComponent,
            "project": projectComponent
        },
        methods: {
            changeView(name) {
                this.currentView = name;
            }
        }
    }
</script>