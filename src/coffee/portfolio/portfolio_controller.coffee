portfolio_set_background_and_look = ->

  window.portfolio = {
    xx: 0,
    toRight: true,
    animation: setInterval(portfolio_clouds_animation, 80)
  };

  $('.header_clouds')[0].style.transformStyle = 'preserve-3d'

  return

portfolio_clouds_animation = ->

  if window.portfolio.xx < 1655 and window.portfolio.toRight
    window.portfolio.xx++
  else
    window.portfolio.toRight = -1500 > window.portfolio.xx
    window.portfolio.xx--

  result = window.portfolio.xx / 100
  $('.header_clouds')[0].style.transform = 'translate3d(' + -result + '%, 0.0%, 0px)'

  return
  