<template lang="pug">
    .col-xs-6.col-md-6.description-project
        .row
            h3.about-project
                i.icon-briefcase
                | About project

            section(v-html="project.markdown.aboutProject")

            section
                p.col-md-12(v-text="project.description[0]")

            h4 A little bit about the team.

            section(v-html="project.markdown.aboutTeam")

        .row(v-if="project.markdown.myRole")
            h3 My role

            section(v-html="project.markdown.myRole")

        .row(v-if="project.markdown.result")
            h3 Result

            section(v-html="project.markdown.result", data-type="result")
</template>

<script>
    import model from "core/models"

    export default {
        data() {
            return {
                project: model.state.projects.displayCurrent()//Default project
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                const counter = document.getElementById("counter");
                counter.tabIndex = -1;
                counter.focus();
            })
        }
    }
</script>