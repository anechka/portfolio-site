/**
 * menangen@gmail.com
 * Date: 16.03.16
 * Time: 21:30
 */
show_animated_button = function() {
                // Показать div за * секунд
                $(".show_portfolio_button").animate({'opacity': 1}, 3 * 1000);

                $(document).off();
};

mobile_parallax_set = function(ismobile) {
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
    var bodyDOM = $( "body" );

    $("#scene").html("<li data-depth='0.00' class='layer'><img id='layer5' src='images/clouds_layer_5.png' class='cloud_layer'></li>" +
    "<li data-depth='0.10' class='layer'><img src='images/clouds_layer_1.png' class='cloud_layer'></li>" +
    "<li data-depth='0.30' class='layer'><img src='images/clouds_layer_2.png' class='cloud_layer cloud_two'></li>" +
    "<li data-depth='0.60' class='layer'><img src='images/clouds_layer_3.png' class='cloud_layer cloud_three'></li>" +
    "<li data-depth='1.00' class='layer'><img src='images/clouds_layer_4.png' class='cloud_layer cloud_four'></li>");


    var $hiddenDiv = $( "<div style='display:none'>" +
        "<img src='images/clouds_layer_5_storm1.png'>" +
        "<img src='images/clouds_layer_5_storm2.png'>" +
        "<img src='images/clouds_layer_5_storm2_extra.png'>" +
        "<img src='images/upwork-profile-hover.svg'></div>" );

    bodyDOM.append($hiddenDiv);

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