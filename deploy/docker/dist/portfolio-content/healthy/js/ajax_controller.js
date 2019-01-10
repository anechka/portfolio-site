/**
 * Created by pesik@ane4k.in on 17.08.16.
 */

$(window).scroll(function () {

    var hotel_nav = $('.navigation');

    if ($(this).scrollTop() > 50) {
        hotel_nav.css("background", "rgb(136, 35, 95)");
        $('.logo-big').css("display", "none");
        $('.btn-menu-container').show();
        $('.logo-small').show();
    }
    else {
        hotel_nav.css("background", "transparent");
        $('.logo-big').css("display", "block");
        $('.btn-menu-container').hide();
        $('.logo-small').hide();
    }
});