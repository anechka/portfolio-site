# Created by menangen on 01.05.16.

view_controller = ->
  cloudsView = new Vue(
    el: '#scene'
    data:
      layer1Src: "images/clouds_layer_1.png"
      layer2Src: "images/clouds_layer_2.png"
      layer3Src: "images/clouds_layer_3.png"
      layer4Src: "images/clouds_layer_4.png"
      layer5Src: "images/clouds_layer_5.png"
  )

  switch navigator.platform
    when "iPhone", "iPhone Simulator", "Android", "iPad" then mobile_parallax_set yes;
    else mobile_parallax_set no;

  mailView = new Vue(
    el: '#mail'
    data:
      # Creating e-mail link with JS (spamers prevent)
      email: if isrussian() then "pesik" + "@" + "ane4k" + ".in" else "anya" + "@" + "anya" + ".site"
  )

  polyglot = new Polyglot(locale: 'en')
  polyglot.extend 'projects': '%{smart_count} project |||| %{smart_count} projects'
  
  counterView = new Vue(
    el: '#counter'
    
    data: projectsCounterText: polyglot.t('projects', smart_count: projects.length) + ' total'
    
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

    template: '#child-template',

    created: ->
      @lessClass['sprite-' + @tagname] = true
      return

    methods:

      mouseOver: ->
        projectsNumberWithTag = 0

        for project_index, project of projects
          projectTagsArray = project.tags

          projectsNumberWithTag++ if @tagname in projectTagsArray

        @counterText = counterView.getCounterText()
        counterView.setCounter projectsNumberWithTag
        return

      mouseOut: ->
        counterView.setCounterText @counterText
        return

      click: ->
        group = []
        couple = []
        if @tags.hasOwnProperty @tagname
          # Disable all tags on loop
          @tags[key] = off for key of @tags #TODO: Create test for this action
          # Enable one tag active
          @tags[@tagname] = on

          textAfterClick = counterView.getCounterText() + ' on ' + @tagname

          @counterText = textAfterClick
          counterView.setCounterText textAfterClick

        for project_item, project of projects
          projectTagsArray = project.tags

          for tag in projectTagsArray
            couple.push project if @tagname.toString().toLowerCase() == tag.toLowerCase()

          if couple.length == 2
            group.push couple
            couple = []

        group.push couple if couple.length == 1

        projectsView.displayProjects group
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
