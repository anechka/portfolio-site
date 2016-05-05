# Created by menangen on 05.05.16.

fs = require 'fs'
projectsJSON = fs.readFileSync '../../projects.json', 'utf-8'
jsdom = require 'jsdom'

polyglot = require '../../js/vendor/polyglot.min'
vue = require '../../js/vendor/vue.min'

viewModule = require '../../js/view_controller'
#viewModule = require '../../coffee/view_controller'

global.document = jsdom.jsdom '<body></body>'
global.window = document.defaultView
global.navigator = window.navigator

global.Polyglot = polyglot
global.Vue = vue
global.projects = eval projectsJSON

viewModels = viewModule.viewController()

# TESTS (Specs in Jasmine):
describe 'viewController', ->
  viewModelsArray = Object.keys viewModels

  it 'has a counterView', ->
    expect(viewModelsArray.indexOf 'counterView' ).not.toBe -1
    return

  it 'has a projectsView', ->
    expect(viewModelsArray.indexOf 'projectsView' ).not.toBe -1
    return

  it 'has a tagsView', ->
    expect(viewModelsArray.indexOf 'tagsView' ).not.toBe -1
    return

  return

describe 'counterView', ->

  it 'in viewModels', ->
    expect(viewModels.counterView).toBeDefined()
    return

  it 'counterView is Vue instance', ->
    expect(viewModels.counterView._isVue).toBe true
    return

  return

describe 'Projects counter have a text', ->

  it 'as projects number total', ->
    expect(viewModels.counterView.getCounterText()).toBe projects.length + ' projects total'
    return

  return

describe 'Projects counter', ->

  it 'can get text', ->
    expect(viewModels.counterView.getCounterText).toBeDefined()
    return

  it 'can set text', ->
    expect(viewModels.counterView.setCounterText).toBeDefined()
    return

  it 'can set number', ->
    expect(viewModels.counterView.setCounter).toBeDefined()
    return

  return

describe 'counterView have a text', ->

  it '1 project for setCounter(1)', ->
    viewModels.counterView.setCounter 1
    expect(viewModels.counterView.getCounterText()).toBe '1 project'
    return

  it 'Test-Text for setCounterText(Test-Text)', ->
    viewModels.counterView.setCounterText 'Test-Text'
    expect(viewModels.counterView.getCounterText()).toBe 'Test-Text'
    return

  return