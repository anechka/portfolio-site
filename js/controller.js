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


    var platform = navigator.platform;

    var image = "";

    switch (platform) {

        case "iPhone": {
            $( "body" ).css( "background-size", "100%");
            image = "background-iphone.jpg";

            show_animated_button();
            break;
        }

        case "iPhone Simulator": {
            $( "body" ).css( "background-size", "100%");
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
    $( document.body ).css( "background-image", "url(" + imagesFolder + image +")");
};