<template lang="pug">
    .col-xs-6.col-md-6.images-a-content
        .col-md-6(v-for="button in this.project.links")
            a.thumbnail(:href="button.href", target="_blank")
                img.img-thumbnail(:src="`images/portfolio-thumb/${button.img}`", :alt="button.txt")
                br
                button.btn.btn-block(type="button", :class="button.class")
                    i(:class="button.iconClass")
                    |{{ button.txt }}
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