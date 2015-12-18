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


                window._gaq = window._gaq || [];

                window._gaq.push(['_setAccount', 'UA-50636137-1']);
                window._gaq.push(['_trackPageview']);



                (function() {
                    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
                    ga.src = ('https:' == document.location.protocol ?  'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
                })();

                $(document).unbind();

};

set_background_and_look = function(images_uri) {


    var platform = navigator.platform;

    var image = "";

    switch (platform) {

        case "iPhone": {
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
};