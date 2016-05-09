modelSetup = ->
  for index of projects
    project = projects[index]
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
  window.to_little_flag = false
  window.speed_thunder = 0

  window.animate_object = setInterval(interval_handler, 120)

  mail_link = $ "#mailto"
  # Creating e-mail link with JS (spamers prevent)
  email_content_string = if isrussian() then "pesik" + "@" + "ane4k" + ".in" else "anya" + "@" + "anya" + ".site"

  mail_link.attr "href", "mailto:" + email_content_string
  mail_link.find("span").text email_content_string

  switch navigator.platform
    when "iPhone", "iPhone Simulator", "Android", "iPad" then mobile_parallax_set yes;
    else mobile_parallax_set no;

  return

isrussian = ->
  $("html").attr("lang") is "ru"