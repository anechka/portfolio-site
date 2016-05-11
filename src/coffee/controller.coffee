modelSetup = ->
  for index, project of projects
    projectDescriptionsArray = project.description

    resultHTMLDescription = ""

    if projectDescriptionsArray instanceof Array
      resultHTMLDescription += "<p>" + description + "</p>" for description in projectDescriptionsArray
      project.description = resultHTMLDescription

  return

mobile_parallax_set = (ismobile) ->
  scene = document.getElementById "scene"
  window.parallax_view = new Parallax scene

  if ismobile
    parallax_view.scalar 10, 10
    parallax_view.invert yes, no
    parallax_view.friction 0.1, 0.1
    parallax_view.calibrate yes, no
    parallax_view.limit yes, 50
  else
    parallax_view.scalar 20, 50
    parallax_view.invert yes, no
    parallax_view.friction 0.2, 0.1

  return

set_background_and_look = ->
  window.clouds_move_to_right = false
  window.thunders = 0
  window.animate_object = setInterval(interval_handler, 120)

  switch navigator.platform
    when "iPhone", "iPhone Simulator", "Android", "iPad" then mobile_parallax_set yes;
    else mobile_parallax_set no;

  return

isrussian = ->
  $("html").attr("lang") is "ru"