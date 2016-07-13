# Use as .site/#tag or .site/#/tag
routeController = ->
    openDjango = ->
        showCounterTextForTag 'django'
        displayTaggedProjects 'django'
        return

    openBootstrap = ->
        showCounterTextForTag 'bootstrap'
        displayTaggedProjects 'bootstrap'
        return

    openLess = ->
        showCounterTextForTag 'less'
        displayTaggedProjects 'less'
        return

    openSass = ->
        showCounterTextForTag 'sass'
        displayTaggedProjects 'sass'
        return

    openNodejs = ->
        showCounterTextForTag 'nodejs'
        displayTaggedProjects 'nodejs'
        return

    openPython = ->
        showCounterTextForTag 'python'
        displayTaggedProjects 'python'
        return

    openJquery = ->
        showCounterTextForTag 'jquery'
        displayTaggedProjects 'jquery'
        return

    openAngular = ->
        showCounterTextForTag 'angular'
        displayTaggedProjects 'angular'
        return

    routes =
        'django':    openDjango
        'bootstrap': openBootstrap
        'less':      openLess
        'sass':      openSass
        'nodejs':    openNodejs
        'node':      openNodejs
        'python':    openPython
        'jquery':    openJquery
        'angular':   openAngular

    router = Router routes
    router.init()

    return