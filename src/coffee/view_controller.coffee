# Created by menangen on 01.05.16.

view_controller = ->
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
          data = false for key, data of @tags
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
