/**
 * Created by anya on 21.02.14.
 */
interval_handler = function() {

    if (parallax_view.ix <= -8) window.to_little_flag = false;
    if (parallax_view.ix >= 10 || window.to_little_flag) {parallax_view.ix -= 0.003; window.to_little_flag = true;}
    else {
        parallax_view.ix += 0.002;}

    var luke_const = Math.random();


    if ((luke_const > 0.965 && window.speed_thunder < 5) || luke_const > 0.97) {
        make_thunder();
        speed_thunder ++;

        if (window.speed_thunder > 10) window.speed_thunder = 0;
    }
};

make_thunder = function() {

    var cloud_five_image = $("#layer5");
    var cloud_five_primaryimage_source = cloud_five_image.attr('src');

    var new_images_src_arr = ["clouds_layer_5_storm1.png", "clouds_layer_5_storm2.png", "clouds_layer_5_storm2_extra.png"];

    var luke_const = Math.random();
    var src = new_images_src_arr[0];

    if (luke_const > 0.5) {
        src = new_images_src_arr[1];

        if (luke_const > 0.77) src = new_images_src_arr[2]
    }

    cloud_five_image.attr('src', imagesFolder + src);

    setTimeout(function(){
            cloud_five_image.attr('src', cloud_five_primaryimage_source);
        }
        , 100)
};