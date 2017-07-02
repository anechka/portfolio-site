<template lang="pug">
.row.about-developer
    .col-md-12.text-center
        h4.text-uppercase Experience

        summary(v-for="(key, item) in model.experience")
            strong {{ item }}
            span {{ key }},

    .col-md-12.text-center
        h4.text-uppercase Preferred Environment
        span.environment {{ model.environment }}

    .col-md-12.text-center
        h4.text-uppercase Availability
        span.availability {{ model.availability }}
</template>

<script>
    import model from "../models"

    export default {
        data() {
            return {
                model: model.state.about
            }
        }
    }
</script>