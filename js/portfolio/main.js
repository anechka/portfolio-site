/**
 * Created by Anya on 21.03.14.
 */
$(onload);

onload = function() {
    set_background_and_look("../../images");

    window.portfolio = {
        xx: 0,
        toRight: true,
        animation: setInterval(body_animation, 80)
    };
};