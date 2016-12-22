$ ->
  # Selecting index or portfolio controllers in module
  if $("meta[name=application-name]")[0].content is "index"

    window.projects = modelSetup()
    
    set_background_and_look()
    window.viewModels = view_controller()

    routeController()
    
  else

    portfolio_set_background_and_look()
    
  return