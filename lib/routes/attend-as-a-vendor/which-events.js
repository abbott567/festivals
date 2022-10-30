'use-strict'

const express = require('express')

const router = express.Router()
const events = require('../../data/events')

// Which events?
router.get('/attend-as-a-vendor/which-events', (req, res) => {
  // If the business details have not been filled in, redirect back to start
  if (req.session.data.business === undefined) {
    console.warn('req.session.data.business was not defined when selecting events')
    return res.redirect('/attend-as-a-vendor/about-your-business')
  } else {
    // If they have been, then render the page
    return res.render('pages/attend-as-a-vendor/which-events/template.njk', { events })
  }
})
router.post('/attend-as-a-vendor/which-events', (req, res) => {
  // Validate the req.body
  const errors = validate(req.body)
  // If there are errors re-render and show errors
  if (errors.length > 0) {
    return res.render('pages/attend-as-a-vendor/which-events/template.njk', { events, errors })
  }
  // Loop through each event selected
  const evs = req.body['events-attending']
  const eventsAttending = []
  evs.forEach(e => {
    // Push each event into the session
    const event = events.find(x => x.id === e)
    eventsAttending.push(event)
  })
  req.session.data.eventsAttending = eventsAttending
  // If there are more events to deal with
  if (eventsAttending.length > 0) {
    // Get the ID of the next event
    const nextEvent = eventsAttending[0].id
    // Redirect to the event
    return res.redirect(`/attend-as-a-vendor/events/${nextEvent}`)
  } else {
    // Redirect to contact details
    return res.redirect('/attend-as-a-vendor/your-contact-details')
  }
})

function validate (data) {
  // Create empty errors array
  const errors = []
  // If no events have been selected
  if (data['events-attending'] === undefined) {
    // Push new error
    errors.push({
      id: 'events-attending',
      message: 'No events were selected',
      hint: 'Select the events you want to attend'
    })
  }
  // Return array of errors
  return errors
}

module.exports = router
