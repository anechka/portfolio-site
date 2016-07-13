# Created by menangen on 05.05.16.
describe 'Testing Vue.js ViewModels', ->
  root = ""
  fs = require 'fs'
  jsdom = require 'jsdom'

  indexHTML = fs.readFileSync "#{ root }dist/index.html", "utf-8"
  viewController = fs.readFileSync "#{ root }dist/js/all.js", "utf-8"

  beforeAll (done) ->
    require('jasmine-expect');

    jsdom.env indexHTML, { src: [viewController] }, (err, browser_window) ->
      console.log "error:" + err if err

      expect(browser_window).toBeDefined()

      global.window = browser_window
      global.viewModels = browser_window.viewModels
      global.projects = browser_window.projects

      done()
      return

    return

  afterAll () ->
    window.close()
    return

  it 'Coffeescript projects object is defined', ->
    expect(projects).toBeDefined()

  it 'full of {objects} inside', ->
    expect(projects).toBeArrayOfObjects()

  it 'Check ViewController return viewModels object', ->
    expect(viewModels).toBeDefined()
    expect(viewModels).not.toBeNull()

  it 'Check viewModels object', ->
    expect(Object.keys(viewModels)).toBeArrayOfSize(5);
    return


  describe 'counterView', ->

    it 'in viewModels', ->
      expect(viewModels.counterView).toBeDefined()
      return

    it 'counterView is Vue instance', ->
      expect(viewModels.counterView._isVue).toBeTruthy()
      return

    it 'has a tagsNames', ->
      expect(viewModels.counterView.tagsNames).toBeDefined()
      return

    it 'and tagsNames is array', ->
      expect(viewModels.counterView.tagsNames).toBeArrayOfStrings();
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
    tags = null
    methods = null
    componentsArray = null

    it 'in viewModels', ->
      expect(viewModels.tagsView).toBeDefined()
      return

    it 'has a <tag> Vue component', ->

      componentsArray = window.viewModels.tagsView.$children
      expect(componentsArray).toBeDefined()
      return


    it 'has a counterText string', ->
      expect(componentsArray[0].$data.counterText).toBeDefined()
      expect(componentsArray[0].$data.counterText).toBeEmptyString();
      return
    # tags
    it 'has a tags object', ->
      tags = componentsArray[0].$data.tags
      expect(tags).toBeObject();
      return

    it 'has a methods object', ->
      methods = componentsArray[0].$options.methods
      expect(methods).toBeObject();
      return

    it 'tags not empty', ->
      expect(tags).toBeNonEmptyObject()
      return

    it 'has a django tag', ->
      expect(tags.django).toBeDefined()
      return

    it 'has a bootstrap tag', ->
      expect(tags.bootstrap).toBeDefined()
      return

    it 'has a less tag', ->
      expect(tags.less).toBeDefined()
      return

    it 'has a sass tag', ->
      expect(tags.sass).toBeDefined()
      return

    it 'has a nodejs tag', ->
      expect(tags.nodejs).toBeDefined()
      return

    it 'has a python tag', ->
      expect(tags.python).toBeDefined()
      return

    it 'has a javascript tag', ->
      expect(tags.javascript).toBeDefined()
      return

    it 'has a jquery tag', ->
      expect(tags.jquery).toBeDefined()
      return

    it 'has an angular tag', ->
      expect(tags.angular).toBeDefined()
      return
    # methods
    describe 'mouseOver()', ->

      it 'in tagsView', ->
        expect(methods.mouseOver).toBeDefined()
        return

      it 'on default all tags is off', ->
        for key, data of tags
          expect(data).toBeFalsy()
        return

      it 'mouseOver had changed counterView projectsCounterText', ->

        for childrenComponent in componentsArray
          childrenComponent.mouseOver()
          counterText = viewModels.counterView.getCounterText()

          expect(counterText).toMatch(/\d project/);

          expect(childrenComponent.counterText).not.toBeEmptyString();

        return

    describe 'mouseOut()', ->
      it 'can setCounterText', ->

        for childrenComponent in componentsArray
          childrenComponent.mouseOut()

          counterText = viewModels.counterView.getCounterText()
          expect(counterText).not.toBeEmptyString()

        expect(counterText).toMatch(/\d project/);

        return
      return

    describe 'click()', ->
      it 'disabled all tags Except one current clicked tag', ->
        expect(flag).toBeFalsy() for tag, flag of tags

        for childrenComponent in componentsArray
          # all tags is disabled


          childrenComponent.click()
          # But only one tag is on
          tagsBooleanArray = (flag for tag, flag of tags)

          counterTrues = 0
          counterFalses = 0

          trueCounter = (flag) ->
            if flag then counterTrues++ else counterFalses++

          trueCounter(item) for item in tagsBooleanArray

          expect(counterTrues == 1 and counterFalses == tagsBooleanArray.length - 1).toBeTrue()

        return

      it 'can change counterView and counterText', ->

        for childrenComponent in componentsArray
          tag = childrenComponent.tagname
          childrenComponent.mouseOver()
          childrenComponent.click()

          counterText = viewModels.counterView.getCounterText()
          flag = tags[tag]
          # has a number with project text
          expect(counterText).toMatch(/\d project(s)? on /);
          # has a tag in end
          expect(counterText).toContain(tag)
          # tag is true
          expect(flag).toBeTruthy()

        return

      it 'can change projectsView', ->

        viewModels.projectsView.group = null

        childrenComponent = componentsArray[0]
        childrenComponent.click()

        expect(viewModels.projectsView.group).not.toBeEmptyArray()

        return

      return

    return

  return