<template lang="pug">
.row.about-developer
    .col-md-12.text-center
        ul.info
            li
                h4.text-uppercase Experience
            li(v-for="(key, item) in model.experience")
                strong {{ item }}
                span {{ key }},

    .col-md-12.text-center
        ul.info
            li
                h4.text-uppercase Preferred Environment
            li
                span {{ model.environment }}

    .col-md-12.text-center
        ul.info
            li
                h4.text-uppercase Availability
            li
                span {{ model.availability }}
</template>

<script>
    import model from "../core/models"

    export default {
        data() {
            return {
                model: model.state.about
            }
        }
    }
</script>