# Created by menangen on 01.05.16.
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

  $hiddenDiv = $("<div style='display:none'><img src='images/clouds_layer_5_storm1.png'><img src='images/clouds_layer_5_storm2.png'><img src='images/clouds_layer_5_storm2_extra.png'><img src='images/web-logos-hover.svg'></div>")

  $('body').append $hiddenDiv

  switch navigator.platform
    when "iPhone", "iPhone Simulator", "Android", "iPad" then mobile_parallax_set yes;
    else mobile_parallax_set no;

  return

isrussian = ->
  $("html").attr("lang") is "ru"

# mouseOver action
showCounterTextForTag = (tagName) ->
  projectsNumberWithTag = 0

  for project_index, project of projects
    projectTagsArray = project.tags

    projectsNumberWithTag++ if tagName in projectTagsArray

  prevText = window.viewModels.counterView.getCounterText()
  window.viewModels.counterView.setCounter projectsNumberWithTag

  return prevText

# onClick action
displayTaggedProjects = (tagName) ->
  group = []
  couple = []
  textAfter = window.viewModels.counterView.getCounterText()

  if tags.hasOwnProperty tagName
    # Disable all tags on loop
    tags[key] = off for key of tags
    # Enable one tag active
    tags[tagName] = on

    textAfter = textAfter + ' on ' + tagName
    window.viewModels.counterView.setCounterText textAfter


    for project_item, project of projects
      projectTagsArray = project.tags

      for tag in projectTagsArray
        couple.push project if tagName.toString().toLowerCase() == tag.toLowerCase()

      if couple.length == 2
        group.push couple
        couple = []

    group.push couple if couple.length == 1
    window.viewModels.projectsView.displayProjects group

  return textAfter

view_controller = ->
  polyglot = new Polyglot(locale: 'en')
  polyglot.extend 'projects': '%{smart_count} project |||| %{smart_count} projects'

  cloudsView = new Vue(
    el: '#scene'
    data:
      layer1Src: "images/clouds_layer_1.png"
      layer2Src: "images/clouds_layer_2.png"
      layer3Src: "images/clouds_layer_3.png"
      layer4Src: "images/clouds_layer_4.png"
      layer5Src: "images/clouds_layer_5.png"
  )

  mailView = new Vue(
    el: '#mail'
    data:
      # Creating e-mail link with JS (spamers prevent)
      email: if isrussian() then "pesik" + "@" + "ane4k" + ".in" else "anya" + "@" + "anya" + ".site"

    created: ->
      @link = "mailto:" + @email
      return
  )

  counterView = new Vue(
    el: '#counter'
    
    data:
      projectsCounterText: polyglot.t('projects', smart_count: projects.length) + ' total'
      tagsNames: Object.keys tags
    
    methods:
      
      setCounter: (int) ->
        @projectsCounterText = polyglot.t('projects', smart_count: int)
        return
      
      setCounterText: (text) ->
        @projectsCounterText = text
        return
      
      getCounterText: ->
        @projectsCounterText
  )
  
  projectsView = new Vue(
    el: '#projectsList'
    
    data: group: null
    
    methods: displayProjects: (group) ->
      @group = group
      return
  )
  # Tags component
  Vue.component 'tag',
    data: ->
      tags: tags
      lessClass: {
        'sprite-django': false,
        'sprite-javascript': false,
        'sprite-python': false,
        'sprite-nodejs': false,
        'sprite-less': false,
        'sprite-sass': false,
        'sprite-bootstrap': false,
        'sprite-jquery': false,
        'sprite-angular': false
      }
      counterText: ''

    props: ['tagname'],

    template: '#tag-template',

    created: ->
      @lessClass['sprite-' + @tagname] = true
      return

    methods:

      mouseOver: ->
        @counterText = showCounterTextForTag @tagname
        return

      mouseOut: ->
        counterView.setCounterText @counterText
        return

      click: ->
        @counterText = displayTaggedProjects @tagname
        return
  # Tags ViewModel
  tagsView = new Vue(
    el: '#tags'
  )
  {
    cloudsView: cloudsView
    mailView: mailView
    counterView: counterView
    projectsView: projectsView
    tagsView: tagsView
  }
