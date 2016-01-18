/**
 * User: Anya pesik@ane4k.in
 * Date: 19.02.14
 * Time: 19:42
 */
english_images_path = "images";
russian_images_path = "../images";

$(onload);

onload = function() {
            // Creating e-mail link with JS (spamers prevent)
            var email_content_string = isrussian() ? "pesik" + "@" + "ane4k" +".in": "anya" + "@" + "anya" +".site";
            var link_element = $("#mailto");

            link_element.attr("href", "mailto:" + email_content_string);
            link_element.find("span").text(email_content_string);

            $(document).on("mousemove", show_animated_button);
            $(".show_portfolio_button").on("click", portfolio_click);


            set_background_and_look( getpath() );

            var scene = document.getElementById('scene');
            window.parallax_view = new Parallax(scene);

            parallax_view.scalar(20, 50);
            parallax_view.invert(true, false);
            parallax_view.friction(0.2, 0.1);

            window.to_little_flag = false;

            window.speed_thunder = 0;
            window.animate_object = setInterval(interval_handler, 120);
        };

getpath = function() {
    return isrussian() ? russian_images_path : english_images_path;
};

isrussian = function() {
    return $("html").attr("lang") == 'ru'
};