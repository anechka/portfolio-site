<template lang="jade">
ul#scene
    li.layer(data-depth="0.00"): img.cloud_layer(:src="layer5Src")
    li.layer(data-depth="0.10"): img.cloud_layer(:src="layer1Src")
    li.layer(data-depth="0.30"): img.cloud_layer.cloud_two(:src="layer2Src")
    li.layer(data-depth="0.60"): img.cloud_layer.cloud_three(:src="layer3Src")
    li.layer(data-depth="1.00"): img.cloud_layer.cloud_four(:src="layer4Src")
</template>

<script>
    import { interval_handler } from "../handlers"
    import Parallax from '../vendor/parallax'

    export default {
        data() {
            return {
                layer1Src: "images/clouds_layer_1.png",
                layer2Src: "images/clouds_layer_2.png",
                layer3Src: "images/clouds_layer_3.png",
                layer4Src: "images/clouds_layer_4.png",
                layer5Src: "images/clouds_layer_5.png"
            }
        },
        methods: {
            mobile_parallax_set(ismobile) {
                const parallax_view = new Parallax(this.$el);

                if (ismobile) {
                    parallax_view.scalar(10, 10);
                    parallax_view.invert(true, false);
                    parallax_view.friction(0.1, 0.1);
                    parallax_view.calibrate(true, false);
                    parallax_view.limit(true, 50);
                } else {
                    parallax_view.scalar(20, 50);
                    parallax_view.invert(true, false);
                    parallax_view.friction(0.2, 0.1);
                }
            }
        },
        mounted() {
            //setInterval(interval_handler, 120);

            switch (navigator.platform) {
                case "iPhone":
                case "iPhone Simulator":
                case "Android":
                case "iPad":
                    this.mobile_parallax_set(true); break;
                default: this.mobile_parallax_set(false);
            }
        }
    }
</script>