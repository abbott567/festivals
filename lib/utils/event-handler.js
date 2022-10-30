const events = require('../data/events')

function eventHandler (req, res) {
  const session = req.session.data
  const eventsToAskAbout = []
  events.forEach(event => {
    if (session.events[event.id] === 'on' && session[event.id] === undefined) {
      eventsToAskAbout.push(event.id)
    }
  })
  return eventsToAskAbout
}

module.exports = eventHandler
