<template lang="pug">
.row
    .tags.col-md-12.margined-top-div.text-center
        // Django tag
        tag(tagname="django")
        // Twitter Bootstrap tag
        tag(tagname="bootstrap")
        // Less framework tag
        tag(tagname="less")
        // Sass / SCSS tag
        tag(tagname="sass")
        // Node.js tag
        tag(tagname="nodejs")
        // Python tag
        tag(tagname="python")
        // Javascript ECMAScript 6 tag
        tag(tagname="javascript")
        // jQuery tag
        tag(tagname="jquery")
        // Angular tag
        tag(tagname="angular")
</template>

<script>
    import tag from "./oneTag.vue"

    export default {
        components: { tag }
    }
</script>