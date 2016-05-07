# Created by menangen on 05.05.16.
describe 'Testing Vue.js ViewModels', ->
  root = ""
  fs = require 'fs'
  jsdom = require 'jsdom'

  projectsJSON = fs.readFileSync "#{ root }projects.json", "utf-8"
  indexHTML = fs.readFileSync "#{ root }dist/index.html", "utf-8"
  vendor = fs.readFileSync "#{ root }dist/js/vendor/vendor.js", "utf-8"
  viewController = fs.readFileSync "#{ root }src/js/view_controller.js", "utf-8"

  $ = null
  viewModels = null
  viewModelsArray = null
  projects = eval(projectsJSON)

  beforeAll (done) ->
    jsdom.env indexHTML, { src: [viewController, vendor] }, (err, window) ->
      # console.log("contents of a.the-link:", window.Zepto("a.the-link").text());
      # console.log(window.view_controller().counterView.getCounterText());
        $ = window.$
        window.projects = projects

        viewModels = window.view_controller()
        #viewModelsArray = Object.keys viewModels
        done()
        return
    return

  it 'Check ViewController return viewModels object', ->
    expect(typeof viewModels).not.toBe 'undefined'

  it 'Check viewModels object', ->
    viewModelsArray = Object.keys(viewModels)
    expect(viewModelsArray.length).not.toBe 0
    return

  it 'has a counterView', ->
    expect(viewModelsArray.indexOf 'counterView' ).not.toBe -1
    return

  it 'has a projectsView', ->
    expect(viewModelsArray.indexOf 'projectsView' ).not.toBe -1
    return

  it 'has a tagsView', ->
    expect(viewModelsArray.indexOf 'tagsView' ).not.toBe -1
    return

  describe 'counterView', ->

    it 'in viewModels', ->
      expect(viewModels.counterView).toBeDefined()
      return

    it 'counterView is Vue instance', ->
      expect(viewModels.counterView._isVue).toBe true
      return

    it 'has a projectsCounterText', ->
      expect(viewModels.counterView.projectsCounterText).toBeDefined()
      return

    it 'has a setCounter method', ->
      expect(viewModels.counterView.setCounter).toBeDefined()
      return

    it 'Projects counter have proper default text', ->
      expect(viewModels.counterView.getCounterText()).toBe projects.length + ' projects total'
      return

    it 'Projects counter can get text', ->
      expect(viewModels.counterView.getCounterText).toBeDefined()
      return

    it 'Projects counter can set text', ->
      expect(viewModels.counterView.setCounterText).toBeDefined()
      return

    it 'Projects counter can set number', ->
      expect(viewModels.counterView.setCounter).toBeDefined()
      return

    it 'Have a text: "1 project" for setCounter(1)', ->
      viewModels.counterView.setCounter 1
      expect(viewModels.counterView.getCounterText()).toBe '1 project'
      return

    it 'Have a text: "Test-Text" for setCounterText(Test-Text)', ->
      viewModels.counterView.setCounterText 'Test-Text'
      expect(viewModels.counterView.getCounterText()).toBe 'Test-Text'
      return

    return

  return