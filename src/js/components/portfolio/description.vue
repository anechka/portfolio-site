<template lang="pug">
    .col-md-6.description-project
        .row
            h3
                i.icon-briefcase
                | About project

            block about-project

            h4 A little bit about the team.

            block about-team

        .row
            h3 My role

            block my-role

        .row
            h3 Result

            block result
</template>