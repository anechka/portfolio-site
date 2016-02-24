/**
 * User: Anya pesik@ane4k.in
 * Date: 19.02.14
 * Time: 19:23
 */
show_animated_button = function() {
                // Показать div за * секунд
                $(".show_portfolio_button").animate({'opacity': 1}, 3 * 1000);

                $(document).unbind();
};

mobile_parallax_set = function (ismobile) {
    var scene = document.getElementById('scene');
    window.parallax_view = new Parallax(scene);

    if (ismobile) {

        parallax_view.scalar(10, 10);
        parallax_view.invert(true, false);
        parallax_view.friction(0.1, 0.1);
        parallax_view.calibrate(true, true);
        parallax_view.limit(false, 50);

    } else {
        parallax_view.scalar(20, 50);
        parallax_view.invert(true, false);
        parallax_view.friction(0.2, 0.1);
    }
};



set_background_and_look = function() {


    var platform = navigator.platform;


    switch (platform) {

        case "iPhone": {

            show_animated_button();
            mobile_parallax_set(true);

            break;
        }

        case "iPhone Simulator": {

            show_animated_button();
            mobile_parallax_set(true);

            break;
        }

        case "Android":
        case "iPad": {

            show_animated_button();
            mobile_parallax_set(true);

            break;
        }

        default : {
            mobile_parallax_set(false);
        }
    }

};