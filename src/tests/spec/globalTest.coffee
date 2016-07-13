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

    it 'Zepto.js or Cash.js', ->
      expect(window.$).toBeDefined()

    it 'Vue.js', ->
      expect(window.Vue).toBeDefined()

    it 'Parallax.js', ->
      expect(window.Parallax).toBeDefined()

    return

  describe 'model setup', ->

    it 'in module', ->
      expect(window.modelSetup).toBeDefined()

    it 'as Function', ->
      expect(window.modelSetup).toBeFunction()
    return

  describe 'set background and look setup', ->

    it 'in module', ->
      expect(window.set_background_and_look).toBeDefined()

    it 'as Function', ->
      expect(window.set_background_and_look).toBeFunction()
    return

  describe 'view controller', ->

    it 'in module', ->
      expect(window.view_controller).toBeDefined()

    it 'as Function', ->
      expect(window.view_controller).toBeFunction()

    return

  describe 'global variables', ->

    it 'clouds_move_to_right in module', ->
      expect(window.clouds_move_to_right).toBeDefined()

    it 'clouds_move_to_right is false', ->
      expect(window.clouds_move_to_right).toBeFalsy()

    it 'thunders in module', ->
      expect(window.thunders).toBeDefined()

    it 'thunders is 0', ->
      expect(window.thunders).toBe 0

    it 'parallax_view in module', ->
      expect(window.parallax_view).toBeDefined()
      expect(window.parallax_view.onMouseMove).toBeFunction()

    it 'clouds animate_object setInterval ID returned', ->
      expect(window.animate_object).toBeDefined()
      expect(window.animate_object).not.toBeNull()

    return


  return