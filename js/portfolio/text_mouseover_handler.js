/**
 * Created by anna on 30.04.14.
 */
$(function() {
        hover_text_color = "#372d7a";
        hover_background_color = "#FF9900";

        var sass_dom_element = $("#sass");
        var jade_dom_element = $("#jade");
        var less_dom_element = $("#less");
        // SASS
        sass_dom_element.on("mouseover", this.over_handler).on("mouseout", this.out_handler);
        // LESS
        less_dom_element.on("mouseover", this.over_handler).on("mouseout", this.out_handler);
        // Jade
        jade_dom_element.on("mouseover", this.over_handler).on("mouseout", this.out_handler);


        this.over_handler = function () {

            var stuff_elements = $(".btn-block");

            stuff_elements.css("background", "#EEE").css("border-color", "#EEE");
            stuff_elements.css("color", "#FFF");

            var element = $("." + this.id + "-button");
            element.css("background", hover_background_color).css("border-color", hover_background_color);
            element.css("color", hover_text_color);
        };

        this.out_handler = function () {
            var stuff_elements = $(".btn-block");
            stuff_elements.css("background", '').css("border-color", '');
            stuff_elements.css("color", '');

            var element = $("." + this.id + "-button");
            element.css("background", '').css("border-color", '');
            element.css("color", '');
        };
    }
);