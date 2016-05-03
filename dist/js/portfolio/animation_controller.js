/**
 * Created by Anya on 19.03.14.
 */

body_animation = function() {
        if (window.portfolio.xx < 1655 && window.portfolio.toRight) window.portfolio.xx++;
        else {
            window.portfolio.toRight = -1500 > window.portfolio.xx;
            window.portfolio.xx--;
        }

        var result = window.portfolio.xx / 100;
        $(".header_clouds").css({'transform': 'translate3d('+ -result + '%, 0.0%, 0px)', 'transform-style': 'preserve-3d'});
};