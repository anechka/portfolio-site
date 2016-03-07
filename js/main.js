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

            window.to_little_flag = false;

            window.speed_thunder = 0;
            window.animate_object = setInterval(interval_handler, 120);

            set_background_and_look();
        };

isrussian = function() {
    return $("html").attr("lang") == 'ru'
};