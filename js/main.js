/**
 * User: Anya pesik@ane4k.in
 * Date: 19.02.14
 * Time: 19:42
 */
var imagesFolder = "images/";

$(onload);

onload = function() {
            // Creating e-mail link with JS (spamers prevent)
            var email_content_string = isrussian() ? "pesik" + "@" + "ane4k" +".in": "anya" + "@" + "anya" +".site";
            var mail_link = $("#mailto");
            var portfolioButton = $(".show_portfolio_button");

            mail_link.attr("href", "mailto:" + email_content_string);
            mail_link.find("span").text(email_content_string);

            portfolioButton.css({'opacity': 0});
            portfolioButton.on("click", portfolio_click);

            $(document).on("mousemove", show_animated_button);

            set_background_and_look();

            var scene = document.getElementById('scene');
            window.parallax_view = new Parallax(scene);

            parallax_view.scalar(20, 50);
            parallax_view.invert(true, false);
            parallax_view.friction(0.2, 0.1);

            window.to_little_flag = false;

            window.speed_thunder = 0;
            window.animate_object = setInterval(interval_handler, 120);
        };

isrussian = function() {
    return $("html").attr("lang") == 'ru'
};