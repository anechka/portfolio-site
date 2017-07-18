modelSetup = ->
  window.tags =
    django: off
    bootstrap: off
    less: off
    sass: off
    nodejs: off
    python: off
    javascript: off
    jquery: off
    angular: off

  window.www = $("meta[name=author]")[0].content;

  polyglot = new Polyglot(locale: 'en')
  polyglot.extend 'months': '%{smart_count} month |||| %{smart_count} months'
  polyglot.extend 'years': '%{smart_count} year |||| %{smart_count} years'

  for stack, years of about.experience
    about.experience[stack] = polyglot.t('years', smart_count: years)

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
    project.href = if project.dir then "portfolio-content/#{project.dir}" else "http://" + window.www
    project.time = if project.time then polyglot.t('months', smart_count: project.time) else "1 week"
    project.task = if project.task then project.task else "PSD to HTML"

  result