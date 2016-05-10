# Created by menangen on 01.05.16.

view_controller = ->
  mail_link = $ "#mailto"
  # Creating e-mail link with JS (spamers prevent)
  email_content_string = if isrussian() then "pesik" + "@" + "ane4k" + ".in" else "anya" + "@" + "anya" + ".site"

  mail_link.attr "href", "mailto:" + email_content_string
  mail_link.find("span").text email_content_string

  cloudsComponent = Vue.extend
    template: "<li data-depth='0.00' class='layer'><img id='layer5' src='images/clouds_layer_5.png' class='cloud_layer'></li>"+
      "<li data-depth='0.10' class='layer'><img src='images/clouds_layer_1.png' class='cloud_layer'></li>" +
      "<li data-depth='0.30' class='layer'><img src='images/clouds_layer_2.png' class='cloud_layer cloud_two'></li>" +
      "<li data-depth='0.60' class='layer'><img src='images/clouds_layer_3.png' class='cloud_layer cloud_three'></li>" +
      "<li data-depth='1.00' class='layer'><img src='images/clouds_layer_4.png' class='cloud_layer cloud_four'></li>"

  Vue.component 'clouds', cloudsComponent

  cloudsView = new Vue(
    el: '#scene'
  )

  switch navigator.platform
    when "iPhone", "iPhone Simulator", "Android", "iPad" then mobile_parallax_set yes;
    else mobile_parallax_set no;

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
  
  # Tags ViewModel
  tagsView = new Vue(
    el: '#tags'
    
    data:
      tags:
        django: false
        bootstrap: false
        less: false
        sass: false
        node: false
        python: false
        javascript: false
        jquery: false
        angular: false
      counterText: ''
    
    methods:
      
      mouseOver: (incomeTag) ->

        projectsNumberWithTag = 0

        for project_index, project of projects
          projectTagsArray = project.tags

          projectsNumberWithTag++ if incomeTag in projectTagsArray

        @counterText = counterView.getCounterText()
        counterView.setCounter projectsNumberWithTag
        return
      
      mouseOut: ->
        counterView.setCounterText @counterText
        return
      
      click: (incomeTag) ->
        group = []
        couple = []
        
        if @tags.hasOwnProperty incomeTag
          # Disable all tags on loop
          @tags[key] = false for key of @tags #TODO: Create test for this action
          # Disable tag activity
          @tags[incomeTag] = true

          # Enable one tag active
          textAfterClick = counterView.getCounterText() + ' on ' + incomeTag

          @counterText = textAfterClick
          counterView.setCounterText textAfterClick

        for project_item, project of projects
          projectTagsArray = project.tags

          for tag in projectTagsArray
            couple.push project if incomeTag.toString().toLowerCase() == tag.toLowerCase()

          if couple.length == 2
            group.push couple
            couple = []

        group.push couple if couple.length == 1

        projectsView.displayProjects group
        return
  )
  {
    counterView: counterView
    projectsView: projectsView
    tagsView: tagsView
  }
