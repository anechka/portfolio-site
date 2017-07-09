<template lang="pug">
    a(
    :class="{'open': tags[tagname]}",
    :href="`#${tagname}`",
    @mouseover="mouseOver",
    @mouseout="mouseOut",
    @click="click")

        - var size = 96
        img(
        :class="lessClass", :alt="tagname", :title="tagname"
        src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
        width="#{size}px", height="#{size}px"
        )
</template>

<script>
    import model from "../models"

    export default {
        data() {
            return {
                tags: model.state.tags,
                lessClass: {
                    'sprite-django': false,
                    'sprite-javascript': false,
                    'sprite-python': false,
                    'sprite-nodejs': false,
                    'sprite-less': false,
                    'sprite-sass': false,
                    'sprite-bootstrap': false,
                    'sprite-jquery': false,
                    'sprite-angular': false
                },
                counterText: ""
            };
        },
        props: ['tagname'],

        created() {
            this.lessClass[`sprite-${this.tagname}`] = true;
        },

        methods: {
            mouseOver() {
                this.counterText = model.state.counter.showCounterTextForTag(this.tagname);
            },
            mouseOut() {
                this.counterText = model.state.counter.setCounter(this.counterText);
            },
            click() {
                this.counterText = model.state.projects.displayProjectsByTag(this.tagname);
            }
        }
    }
</script>