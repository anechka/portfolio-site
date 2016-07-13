interval_handler = ->
  luke_const = Math.random()

  if parallax_view.ix <= -8
    window.clouds_move_to_right = false

  if parallax_view.ix >= 10 or window.clouds_move_to_right
    parallax_view.ix -= 0.003
    window.clouds_move_to_right = true
  else
    parallax_view.ix += 0.002

  if luke_const > 0.965 and window.thunders < 5 or luke_const > 0.97
    make_thunder()
    thunders++

    if window.thunders > 10
      window.thunders = 0

  return

make_thunder = ->
  cloud_five_default_source = window.viewModels.cloudsView.layer5Src

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

  window.viewModels.cloudsView.layer5Src = "images/" + src

  setTimeout (->
    window.viewModels.cloudsView.layer5Src = cloud_five_default_source
    return
  ), 100
  return