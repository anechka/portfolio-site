<template lang="pug">
.row
    .col-md-12.margined-top-div.text-center.text-uppercase
        span(v-text="model.text")#counter
</template>

<script>
    import model from "../core/models"

    export default {
        data() {
            return {
                model: model.state.counter
            }
        }
    }
</script>