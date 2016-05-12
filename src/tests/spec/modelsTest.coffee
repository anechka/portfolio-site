describe 'Testing models', ->
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

      done()
      return

    return

  afterAll () ->
    window.close()
    return

  describe 'projects Model', ->

    it 'has HTML code in description', ->

      for index, project of window.projects
        projectDescriptionsHTML = project.description

        expect(projectDescriptionsHTML).toBeHtmlString();

    return