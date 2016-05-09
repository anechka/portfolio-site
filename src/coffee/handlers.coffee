interval_handler = ->
  luke_const = Math.random()

  if parallax_view.ix <= -8
    window.to_little_flag = false

  if parallax_view.ix >= 10 or window.to_little_flag
    parallax_view.ix -= 0.003
    window.to_little_flag = true
  else
    parallax_view.ix += 0.002

  if luke_const > 0.965 and window.speed_thunder < 5 or luke_const > 0.97
    make_thunder()
    speed_thunder++

    if window.speed_thunder > 10
      window.speed_thunder = 0

  return

make_thunder = ->
  cloud_five_image = $("#layer5")
  cloud_five_primaryimage_source = cloud_five_image.attr "src"

  new_images_src_arr = [
    "clouds_layer_5_storm1.png"
    "clouds_layer_5_storm2.png"
    "clouds_layer_5_storm2_extra.png"
  ]

  luke_const = Math.random()
  src = new_images_src_arr[0]

  if luke_const > 0.5
    src = new_images_src_arr[1]
    if luke_const > 0.77
      src = new_images_src_arr[2]

  cloud_five_image.attr "src", "images/" + src

  setTimeout (->
    cloud_five_image.attr "src", cloud_five_primaryimage_source
    return
  ), 100
  return