<template lang="pug">
ul#scene
    li.layer(data-depth="0.00"): img.cloud_layer(:src="cloudsImages.cloud5")
    li.layer(data-depth="0.10"): img.cloud_layer(:src="cloudsImages.cloud1")
    li.layer(data-depth="0.30"): img.cloud_layer.cloud_two(:src="cloudsImages.cloud2")
    li.layer(data-depth="0.60"): img.cloud_layer.cloud_three(:src="cloudsImages.cloud3")
    li.layer(data-depth="1.00"): img.cloud_layer.cloud_four(:src="cloudsImages.cloud4")
    li.invisible: img(v-for="(image, src) in hiddenImages", :src="image", width="0", height="0")
</template>

<script>
    import Parallax from '../vendor/parallax'
    
    let thunders = 0;
    let clouds_move_to_right = false;
    let parallaxView;
    
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
            mobileParallaxSetUp(ismobile) {
                if (ismobile) {
                    parallaxView.scalar(10, 10);
                    parallaxView.invert(true, false);
                    parallaxView.friction(0.1, 0.1);
                    parallaxView.calibrate(true, false);
                    parallaxView.limit(true, 50);
                } else {
                    parallaxView.scalar(20, 50);
                    parallaxView.invert(true, false);
                    parallaxView.friction(0.2, 0.1);
                }
            },
            intervalHandler() {
                const makeThunder = () => {
                    const cloudDefaultSource = this.cloudsImages.cloud5;

                    const luke_const = Math.random();
                    let src = this.hiddenImages.storm1;

                    if (luke_const > 0.5) {
                        src = this.hiddenImages.storm2;

                        if (luke_const > 0.77) {
                            src = this.hiddenImages.storm3
                        }
                    }

                    this.cloudsImages.cloud5 = src;

                    setTimeout(() => {
                        this.cloudsImages.cloud5 = cloudDefaultSource;
                    }, 100);
                };

                const luke_const = Math.random();

                if (parallaxView.inputX <= -8) {
                    clouds_move_to_right = false
                }

                if (parallaxView.inputX >= 10 || clouds_move_to_right) {

                    parallaxView.inputX -= 0.003;
                    clouds_move_to_right = true;

                } else {
                    parallaxView.inputX += 0.002
                }

                if ((luke_const > 0.77 && thunders < 5) || luke_const > 0.97) {
                    makeThunder();
                    thunders++;

                    if (thunders > 10) {
                        console.info("Reset thunders");
                        thunders = 0
                    }
                }
            }
        },
        mounted() {
            parallaxView = new Parallax(this.$el);

            switch (navigator.platform) {
                case "iPhone":
                case "iPhone Simulator":
                case "Android":
                case "iPad":
                    this.mobileParallaxSetUp(true); break;
                default: this.mobileParallaxSetUp(false);
            }

            setInterval(this.intervalHandler, 120);
        }
    }
</script>