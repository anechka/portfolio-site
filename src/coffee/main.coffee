$ ->
  # Selecting index or portfolio controllers in module
  if $("html").attr("data-type") is "index"
    modelSetup()
    set_background_and_look()
    window.viewModels = view_controller()
  else
    console.log("This is portfolio!")
    portfolio_set_background_and_look()
    portfolio_view_controller()
  return