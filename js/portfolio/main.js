/**
 * Created by Anya on 21.03.14.
 */
var imagesFolder = "../../images/";

$(onload);

onload = function() {
    set_background_and_look();

    window.portfolio = {
        xx: 0,
        toRight: true,
        animation: setInterval(body_animation, 80)
    };
};