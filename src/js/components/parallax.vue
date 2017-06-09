<template lang="jade">
ul#scene
    li.layer(data-depth="0.00"): img.cloud_layer(:src="cloudsImages.cloud5")
    li.layer(data-depth="0.10"): img.cloud_layer(:src="cloudsImages.cloud1")
    li.layer(data-depth="0.30"): img.cloud_layer.cloud_two(:src="cloudsImages.cloud2")
    li.layer(data-depth="0.60"): img.cloud_layer.cloud_three(:src="cloudsImages.cloud3")
    li.layer(data-depth="1.00"): img.cloud_layer.cloud_four(:src="cloudsImages.cloud4")
    li.invisible: img(v-for="(image, src) in hiddenImages", :src="image", width="0", height="0")
</template>

<script>
    import { interval_handler } from "../handlers"
    import Parallax from '../vendor/parallax'

    export default {
        data() {
            return {
                cloudsImages: {
                    cloud1: "images/clouds_layer_1.png",
                    cloud2: "images/clouds_layer_2.png",
                    cloud3: "images/clouds_layer_3.png",
                    cloud4: "images/clouds_layer_4.png",
                    cloud5: "images/clouds_layer_5.png"
                },
                hiddenImages: {
                    storm1: "images/clouds_layer_5_storm1.png",
                    storm2: "images/clouds_layer_5_storm2.png",
                    storm3: "images/clouds_layer_5_storm2_extra.png"
                }
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