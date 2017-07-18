<template lang="pug">
    .col-md-6.description-project
        .row
            h3
                i.icon-briefcase
                | About project

            section(v-html="this.project.markdown.aboutProject")

            section
                p.col-md-12(v-text="this.project.description[0]")

            h4 A little bit about the team.

            section(v-html="this.project.markdown.aboutTeam")

        .row(v-if="this.project.markdown.myRole")
            h3 My role

            section(v-html="this.project.markdown.myRole")

        .row(v-if="this.project.markdown.result")
            h3 Result

            section(v-html="this.project.markdown.result")
</template>

<script>
    import model from "../../../core/models"

    export default {
        data() {
            return {
                project: model.state.projects.displayCurrent()//Default project
            }
        }
    }
</script>