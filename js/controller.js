/**
 * menangen@gmail.com
 * Date: 16.03.16
 * Time: 21:30
 */

onload = function() {
    set_background_and_look();
    view_controller();
};

isrussian = function() {
    return $("html").attr("lang") == 'ru'
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
    // Creating e-mail link with JS (spamers prevent)
    var email_content_string = isrussian() ? "pesik" + "@" + "ane4k" +".in": "anya" + "@" + "anya" +".site";
    var mail_link = $("#mailto");

    mail_link.attr("href", "mailto:" + email_content_string);
    mail_link.find("span").text(email_content_string);


    window.to_little_flag = false;

    window.speed_thunder = 0;
    window.animate_object = setInterval(interval_handler, 120);

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
            mobile_parallax_set(true);

            break;
        }

        case "iPhone Simulator": {
            mobile_parallax_set(true);

            break;
        }

        case "Android":
        case "iPad": {
            mobile_parallax_set(true);

            break;
        }

        default : {
            mobile_parallax_set(false);
        }
    }

};