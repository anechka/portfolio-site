import { interval_handler } from "./handlers"

export let viewModels = {
    cloudsView: new Vue({
        el: '#scene',
        data: {
            layer1Src: "images/clouds_layer_1.png",
            layer2Src: "images/clouds_layer_2.png",
            layer3Src: "images/clouds_layer_3.png",
            layer4Src: "images/clouds_layer_4.png",
            layer5Src: "images/clouds_layer_5.png"
        }
    })
};

export function setupViews() {
    const animate_object = setInterval(interval_handler, 120);
}