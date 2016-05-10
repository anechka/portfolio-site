# Created by menangen on 05.05.16.
describe 'Testing Vue.js ViewModels', ->
  root = ""
  coffee = require('coffee-script')
  fs = require 'fs'
  jsdom = require 'jsdom'

  projectsCoffeeFile = fs.readFileSync "#{ root }projects.coffee", "utf-8"
  indexHTML = fs.readFileSync "#{ root }dist/index.html", "utf-8"
  viewController = fs.readFileSync "#{ root }dist/js/all.js", "utf-8"

  projects = coffee.eval(projectsCoffeeFile)

  beforeAll (done) ->
    require('jasmine-expect');

    jsdom.env indexHTML, { src: [viewController] }, (err, browser_window) ->
      console.log "error:" + err if err

      expect(browser_window).toBeDefined()

      global.window = browser_window
      global.viewModels = browser_window.viewModels

      done()
      return

    return

  afterAll () ->
    window.close()
    return

  it 'Coffeescript file is not empty', ->
    expect(projects).toBeDefined()

  it 'Check ViewController return viewModels object', ->
    expect(viewModels).toBeDefined()
    expect(viewModels).not.toBeNull()

  it 'Check viewModels object', ->
    expect(Object.keys(viewModels)).toBeArrayOfSize(3);
    return


  describe 'counterView', ->

    it 'in viewModels', ->
      expect(viewModels.counterView).toBeDefined()
      return

    it 'counterView is Vue instance', ->
      expect(viewModels.counterView._isVue).toBeTruthy()
      return

    it 'has a projectsCounterText', ->
      expect(viewModels.counterView.projectsCounterText).toBeDefined()
      return

    it 'and projectsCounterText is string', ->
      expect(viewModels.counterView.projectsCounterText).toBeString();
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

  describe 'projectsView', ->

    it 'in viewModels', ->
      expect(viewModels.projectsView).toBeDefined()
      return

    it 'has a group', ->
      expect(viewModels.projectsView.group).toBeDefined()
      return

    it 'has a displayProjects', ->
      expect(viewModels.projectsView.displayProjects).toBeDefined()
      return

    it 'can set group', ->
      testGroup = [["test", "test2"], ["test3", "test4"]]

      viewModels.projectsView.displayProjects(testGroup)
      viewGroup = viewModels.projectsView.group

      expect(viewGroup).toBe testGroup

      return


    return

  describe 'tagsView', ->

    it 'in viewModels', ->
      expect(viewModels.tagsView).toBeDefined()
      return
    # data
    it 'has a counterText string', ->
      expect(viewModels.tagsView.counterText).toBeDefined()
      expect(viewModels.tagsView.counterText).toBeEmptyString();
      return
    # tags
    it 'has a tags object', ->
      expect(viewModels.tagsView.tags).toBeDefined()
      expect(viewModels.tagsView.tags).toBeObject();
      return

    it 'tags not empty', ->
      expect(viewModels.tagsView.tags).toBeNonEmptyObject()
      return

    it 'has a django tag', ->
      expect(viewModels.tagsView.tags.django).toBeDefined()
      return

    it 'has a bootstrap tag', ->
      expect(viewModels.tagsView.tags.bootstrap).toBeDefined()
      return

    it 'has a less tag', ->
      expect(viewModels.tagsView.tags.less).toBeDefined()
      return

    it 'has a sass tag', ->
      expect(viewModels.tagsView.tags.sass).toBeDefined()
      return

    it 'has a node tag', ->
      expect(viewModels.tagsView.tags.node).toBeDefined()
      return

    it 'has a python tag', ->
      expect(viewModels.tagsView.tags.python).toBeDefined()
      return

    it 'has a javascript tag', ->
      expect(viewModels.tagsView.tags.javascript).toBeDefined()
      return

    it 'has a jquery tag', ->
      expect(viewModels.tagsView.tags.jquery).toBeDefined()
      return

    it 'has a angular tag', ->
      expect(viewModels.tagsView.tags.angular).toBeDefined()
      return
    # methods
    describe 'mouseOver()', ->

      it 'in tagsView', ->
        expect(viewModels.tagsView.mouseOver).toBeDefined()
        return

      it 'mouseOver had changed counterView projectsCounterText', ->

        for key, data of viewModels.tagsView.tags
          # default tag is off
          expect(data).toBe false

          viewModels.tagsView.mouseOver key
          counterText = viewModels.counterView.getCounterText()

          expect(parseInt(counterText, 10)).not.toBe 0
          expect(counterText).toContain('project')

          expect(viewModels.tagsView.counterText).not.toBeEmptyString();

        return

    describe 'mouseOut()', ->
      it 'can setCounterText', ->
        viewModels.tagsView.mouseOut()

        counterText = viewModels.counterView.getCounterText()

        expect(parseInt(counterText, 10)).not.toBe 0
        expect(counterText).toContain('project')

        return
      return

    describe 'click()', ->

      it 'can change counterView and counterText', ->

        for key of viewModels.tagsView.tags
          viewModels.tagsView.mouseOver key
          viewModels.tagsView.click key

          counterText = viewModels.counterView.getCounterText()
          data = viewModels.tagsView.tags[key]

          # has a number
          expect(parseInt(counterText, 10)).not.toBe 0
          # has a tag in end
          expect(counterText.indexOf("on " + key)).not.toBe -1
          # tag is true
          expect(data).toBeTruthy()
        return

      it 'can change projectsView', ->
        viewModels.projectsView.group = null

        keys = Object.keys viewModels.tagsView.tags
        viewModels.tagsView.click keys[0]

        expect(viewModels.projectsView.group).not.toBeNull()

        projectKeys = Object.keys viewModels.projectsView.group[0][0]
        expect(projectKeys.length).toBe 4
        return

      return

    return

  return