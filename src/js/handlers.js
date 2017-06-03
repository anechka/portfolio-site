import setupModels from "./controller"
import { setBackgroundAndLook } from "./viewController"
import { setupViews, viewModels } from "./views"

let thunders = 0;
let clouds_move_to_right = false;

export const loadComplete = function() {
    console.info("Processing");

    const $applicationMeta = document.querySelector("meta[name=application-name]");
    if (typeof $applicationMeta !== 'undefined' && "content" in $applicationMeta) {
        const moduleName = $applicationMeta.content || "NONAME";

        console.info(`Loaded ${ moduleName } module`);

        switch (moduleName) {
            case "index":
                setupModels();
                setBackgroundAndLook();
                setupViews();
                //window.viewModels = view_controller();
                //routeController();
                break;
            default:
                //portfolio_set_background_and_look();
        }
    } else {
        console.warn("Bad application module");
    }
};

export const interval_handler = function() {
    const make_thunder = () => {
        const cloud_five_default_source = viewModels.cloudsView.layer5Src;

        const new_images_src_arr = [
            "clouds_layer_5_storm1.png",
            "clouds_layer_5_storm2.png",
            "clouds_layer_5_storm2_extra.png"
        ];

        const luke_const = Math.random();
        let src = new_images_src_arr[0];

        if (luke_const > 0.5) {
            src = new_images_src_arr[1];

            if (luke_const > 0.77) {
                src = new_images_src_arr[2]
            }
        }

        viewModels.cloudsView.layer5Src = `images/${src}`;

        setTimeout(() => {
            viewModels.cloudsView.layer5Src = cloud_five_default_source;
        }, 100);
    };

    const luke_const = Math.random();

    if (parallax_view.ix <= -8) {
        clouds_move_to_right = false
    }

    if (parallax_view.ix >= 10 || clouds_move_to_right) {

        parallax_view.ix -= 0.003;
        clouds_move_to_right = true;

    } else {
        parallax_view.ix += 0.002
    }

    if ((luke_const > 0.965 && thunders < 5) || luke_const > 0.97) {
        make_thunder();
        thunders++;

        if (thunders > 10) {
            thunders = 0
        }
    }

};