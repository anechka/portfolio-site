$ ->
  # Selecting index or portfolio controllers in module
  if $("html").attr("data-type") is "index"

    window.projects = modelSetup()
    
    set_background_and_look()
    window.viewModels = view_controller()

    routeController()
    
  else

    portfolio_set_background_and_look()
    
  return