modelSetup = ->
  polyglot = new Polyglot(locale: 'en')
  polyglot.extend 'months': '%{smart_count} month |||| %{smart_count} months'

  result = projects.reverse()

  for index, project of result
    projectDescriptionsArray = project.description

    resultHTMLDescription = ""

    if projectDescriptionsArray instanceof Array
      resultHTMLDescription += "<p>" + description + "</p>" for description in projectDescriptionsArray
      project.description = resultHTMLDescription

    # Image src updates
    project.image = "images/portfolio-thumb/#{project.image}"
    # Project location in dir for <a> tag
    project.href = if project.dir then "portfolio-content/#{project.dir}" else "http://www." + window.www
    project.time = if project.time then polyglot.t('months', smart_count: project.time) else "1 week"
    project.task = if project.task then project.task else "PSD to HTML"

  result