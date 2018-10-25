<template lang="pug">
.row
    .col-md-12.margined-top-div.text-center.text-uppercase
        span(v-text="counter.text")#counter
</template>

<script>
    import model from "../core/models"
    import pluralize from "pluralize"

    export default {
        data() {
            return {
                counter: model.state.counter
            }
        },
        methods: {
            createTyping(text) {
                let intervalId;// Butternut removing unused code fix

                const newText = text;
                const prevText = this.counter.prevText;

                const current = {
                    string: prevText,
                    position: prevText.length - 1
                };

                const delay = function( speed ) {
                    speed += Math.floor(Math.random() * 100);
                    return speed;
                };

                intervalId = setInterval(() => {typing.call(this)}, 70);

                const clear = function () {
                    clearInterval(intervalId);
                };

                let forwardDirectionFlag = false;

                const typing = function() {

                    setTimeout(() => {

                        if (forwardDirectionFlag) {
                            if (current.position < newText.length) {

                                current.string += newText[current.position];

                                this.counter.text = current.string;

                                current.position++;

                            } else {

                                clear();

                                setTimeout(() => {
                                    this.counter.text = prevText
                                }, 2000)
                            }
                        }
                        else {

                            if (current.position >= 0) {

                                current.string = current.string.substring(0, current.string.length - 1);

                                this.counter.text = current.string;

                                current.position--;
                            }
                            else {

                                current.string = "";
                                current.position = 0;

                                forwardDirectionFlag = !forwardDirectionFlag;
                            }
                        }
                    }, delay(50));
                };


            }
        },
        mounted() {
            setTimeout(() => {
                this.createTyping("Choose technology above")
            }, 3000)
        }
    }
</script>