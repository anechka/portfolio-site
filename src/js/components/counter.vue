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
        },
        methods: {
            createTyping(text) {
                const newText = text;
                const prevText = this.model.text;

                const current = {
                    string: prevText,
                    position: prevText.length - 1
                };

                const delay = function( speed ) {
                    speed += Math.floor(Math.random() * 120);
                    return speed;
                };

                let intervalId = setInterval(() => {typing.call(this)}, 100);

                const clear = function () {
                    clearInterval(intervalId);
                };

                let forwardDirectionFlag = false;

                const typing = function() {

                    setTimeout(() => {

                        if (forwardDirectionFlag) {
                            if (current.position < newText.length) {

                                current.string += newText[current.position];

                                this.model.text = current.string;

                                current.position++;

                            } else {

                                clear();

                                setTimeout(() => {
                                    this.model.text = prevText
                                }, 2000)
                            }
                        }
                        else {

                            if (current.position >= 0) {

                                current.string = current.string.substring(0, current.string.length - 1);

                                this.model.text = current.string;

                                current.position--;
                            }
                            else {

                                current.string = "";
                                current.position = 0;

                                forwardDirectionFlag = !forwardDirectionFlag;
                            }
                        }
                    }, delay(100));
                };


            }
        },
        mounted() {
            setTimeout(() => {
                this.createTyping("⇧Choose technology above⇧")
            }, 5000)
        }
    }
</script>