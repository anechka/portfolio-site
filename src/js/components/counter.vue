<template lang="jade">
.row
    .col-md-12.margined-top-div.text-center.text-uppercase
        a(id="{{* name }}", v-for="name in tagsNames")
        span(v-text="model.text")
</template>

<script>
    import model from "../models"

    export default {
        data() {
            return {
                model: model.state.counter,
                tagsNames: Object.keys(model.state.tags)
            }
        }
    }
</script>