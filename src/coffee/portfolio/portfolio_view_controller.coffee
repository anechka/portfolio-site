portfolio_view_controller = ->

  mailView = new Vue(
    el: '#mail'
    data:
# Creating e-mail link with JS (spamers prevent)
      email: "text"
  )

  {
    mailView: mailView
  }