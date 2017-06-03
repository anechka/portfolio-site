const mobile_parallax_set = (ismobile) => {
    let scene = document.getElementById("scene");
    window.parallax_view = new Parallax(scene);

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

};

export function setBackgroundAndLook() {

    let $hiddenDiv = $("<div style='display:none'><img src='images/clouds_layer_5_storm1.png'><img src='images/clouds_layer_5_storm2.png'><img src='images/clouds_layer_5_storm2_extra.png'><img src='images/web-logos-hover.svg'></div>");

    $('body').append($hiddenDiv);

    switch (navigator.platform) {
        case "iPhone": case "iPhone Simulator": case "Android": case "iPad": mobile_parallax_set(true); break;
        default: mobile_parallax_set(false);
    }
}