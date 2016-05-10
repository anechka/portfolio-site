# Created by menangen on 10.05.16.
describe 'Testing global objects', ->
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

  describe 'Vendors javascript in module', ->
    it 'Jquery or Zepto.js', ->
      expect(window.$).toBeDefined()

    it 'Vue.js', ->
      expect(window.Vue).toBeDefined()

    return

  describe 'view controller', ->
    it 'in module', ->
      expect(window.view_controller).toBeDefined()

    it 'as Function', ->
      expect(window.view_controller).toBeFunction()

  return


  return