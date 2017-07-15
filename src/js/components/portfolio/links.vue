<template lang="pug">
    .col-md-6.images-a-content
        .col-md-6(v-for="button in this.project.links")
            a.thumbnail(:href="button.href", target="_blank")
                img.img-thumbnail(:src="`images/portfolio-thumb/${button.img}`", :alt="button.txt")
                br
                button.btn.btn-block(type="button", :class="button.class")
                    i.icon-logout
                    |Browse
</template>

<script>
    export default {
        props: ["project"]
    }
</script>