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

    var image = "";

    switch (platform) {

        case "iPhone": {
            bodyDOM.css( "background-size", "100%");
            image = "background-iphone.jpg";

            show_animated_button();
            break;
        }

        case "iPhone Simulator": {
            bodyDOM.css( "background-size", "100%");
            image = "background-iphone.jpg";

            show_animated_button();

            break;
        }

        case "Android":
        case "iPad": {
            image = "background-ipad.jpg";

            show_animated_button();
            break;
        }

        default : {
            image = "background-hd.jpg";
        }
    }

    //alert(platform);
    bodyDOM.css( "background-image", "url(" + imagesFolder + image +")");
};