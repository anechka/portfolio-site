/**
 * User: Anya pesik@ane4k.in
 * Date: 19.02.14
 * Time: 19:23
 */
show_animated_button = function() {
                // Показать div за * секунд
                var content = $(".show_portfolio_button");

                if (content.length != 1) {
                    content = $("#row_content");

                    content.slideDown(
                        {"duration": 1500}
                    );
                }
                else {
                    content.animate({'opacity': 1}, 3 * 1000);
                }


                $(document).unbind();

};

set_background_and_look = function(images_uri) {


    var platform = navigator.platform;

    var image = "";

    switch (platform) {

        case "iPhone": {
            $( "body" ).css( "background-size", "120%");
            image = "background-iphone.jpg";

            show_animated_button();
            break;
        }

        case "iPhone Simulator": {
            $( "body" ).css( "background-size", "120%");
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
    $( "body" ).css( "background-image", "url(" + images_uri + "/"+ image +")");
    //$( "body" ).css( "background-position", "center");
};