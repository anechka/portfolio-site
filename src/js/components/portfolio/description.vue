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

        .row
            h3 My role

            block my-role

        .row
            h3 Result

            block result
</template>

<script>
    export default {
        props: ["project"]
    }
</script>