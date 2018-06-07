var onLoadFunction = function () {

    $(".btn-toggle").on("click", function() {
        $(".box-nav").toggleClass("bg-white");
        $(".logo-brand").css("background", "#006AFF");
    });


};

$(onLoadFunction);

