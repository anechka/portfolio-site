<template lang="pug">
    .col-md-10.col-md-offset-1.margined-top-div.projectsList
        //- Display filtered projects in loop
        .row(v-for="couple in group")
            .col-md-6.col-sm-6.project(v-for="project in couple")

                a.bordered-block(:href = "project.href")

                    .row
                        .col-md-12.project-header-container.text-center
                            .header-top
                                span.link
                                    i.icon-login
                                span.text(v-text="project.name")

                            i.icon.icon-calendar-empty
                            span.project-info Duration:
                                span.value(v-text="project.time")

                            i.icon.icon-flag
                            span.project-info Task:
                                span.value(v-text="project.task")

                    .row
                        .col-md-4.col-sm-12.project-thumbnail

                            .row
                                .col-md-12
                                    img.center-block.img-responsive(:src="project.image")

                            .row.center-block
                                .col-md-12.col-sm-12.col-xs-12.tags-container

                                    .tag.text-center(v-for="tag in project.tags")
                                        span.label.label-tag(v-text="tag")

                        .col-md-8.col-sm-12.description(v-html="project.descriptionHTML")
</template>

<script>
    import model from "../../core/models"

    export default {
        data() {
            return {
                group: model.state.projects.visibleProjectsGroup
            }
        },
        components: {
        }
    }
</script>