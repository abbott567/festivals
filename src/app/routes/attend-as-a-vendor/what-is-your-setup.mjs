'use-strict'

import events from '../../data/2025-events.mjs'

function addToRoutes (router) {
  // What is your setup?
  router.get('/attend-as-a-vendor/events/:id', (req, res, next) => {
    const id = req.params.id
    const eventsAttending = req.session.data.eventsAttending

    const start = '/attend-as-a-vendor/about-your-business'
    // If business or events pages have not been completed
    if (req.session.data.business === undefined) {
      console.warn('req.session.data.business was not defined when requesting items')
      return res.redirect(start)
    } else if (req.session.data.eventsAttending === undefined) {
      console.warn('req.session.data.eventsAttending was not defined when requesting items')
      return res.redirect(start)
    }
    // If event ID does not exist in the data
    const eventRef = events.all.find(x => x.id === id)
    const event = eventsAttending.find(x => x.id === id)
    if (eventRef === undefined) {
      console.warn('the event id was not in the config data when requesting items')
      return res.redirect(start)
    } else {
      // If everything else is ok, render the page
      return res.render('pages/attend-as-a-vendor/what-is-your-setup/template.njk', { event, id })
    }
  })

  router.post('/attend-as-a-vendor/events/:id', (req, res) => {
    // Set variables
    const id = req.params.id
    const items = req.body.requestedSetup
    const requestedItems = []
    let estimatedCost = 0
    // Validate the req.body
    const errors = validate(req.body)
    if (errors.length > 0) {
      // Find the event in the session data to pass to the page render
      const eventsAttending = req.session.data.eventsAttending
      const event = eventsAttending.find(x => x.id === id)
      // Re-render the page with errors
      return res.render('pages/attend-as-a-vendor/what-is-your-setup/template.njk', { event, id, errors })
    }
    // Loop through price list and append data to requested items
    items.forEach(i => {
      const event = events.all.find(x => x.id === id)
      const items = event.prices.find(x => x.id === i)
      requestedItems.push(items)
    })
    // Calculate the estimated cost
    requestedItems.forEach(i => {
      estimatedCost += i.cost
    })
    // Save to session
    const eventToAppend = req.session.data.eventsAttending.find(x => x.id === id)
    eventToAppend.requestedItems = requestedItems
    eventToAppend.estimatedCost = estimatedCost
    // Calculate which event to show next
    let nextEvent
    req.session.data.eventsAttending.forEach(event => {
      if (event.requestedItems === undefined && nextEvent === undefined) {
        nextEvent = event.id
      }
    })
    // If there's a next event show it, or redirect to contact-details
    if (nextEvent) return res.redirect(`/attend-as-a-vendor/events/${nextEvent}`)
    else return res.redirect('/attend-as-a-vendor/your-contact-details')
  })
}

function validate (data) {
  // Create empty errors array
  const errors = []
  // If no checkboxes have been selected
  if (data.requestedSetup === undefined) {
    // Push error message
    errors.push({
      id: 'requestedSetup',
      message: 'No items were requested',
      hint: 'Select the items you need for your setup'
    })
  }
  // Return array of errors
  return errors
}

export default addToRoutes
