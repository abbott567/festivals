'use-strict'

const express = require('express')

const router = express.Router()

// Contact details
router.get('/attend-as-a-vendor/your-contact-details', (req, res) => {
  // Set variables
  const start = '/attend-as-a-vendor/about-your-business'
  // If the business details have not been completed
  if (req.session.data.business === undefined) {
    console.warn('req.session.data.business was not defined when providing contact details')
    return res.redirect(start)
  } else if (req.session.data.eventsAttending === undefined) {
    // If there are no events being attended
    console.warn('req.session.data.eventsAttending was not defined when providing contact details')
    return res.redirect(start)
  } else {
    // If everything has been filled out, render the page
    return res.render('pages/attend-as-a-vendor/your-contact-details/template.njk')
  }
})
router.post('/attend-as-a-vendor/your-contact-details', (req, res) => {
  const errors = validate(req.body)
  if (errors.length > 0) {
    return res.render('pages/attend-as-a-vendor/your-contact-details/template.njk', { errors })
  }
  req.session.data.owner = req.body.owner
  res.redirect('/attend-as-a-vendor/check-your-answers')
})

function validate (data) {
  const errors = []
  const name = data.owner.name.trim()
  const phone = data.owner.phone.trim().replace(/\s/g, '')
  const email = data.owner.email.trim()
  const address = data.owner.address.trim()

  if (name.length === 0) {
    errors.push({
      id: 'name',
      message: 'Name cannot be blank',
      hint: 'Enter your name'
    })
  }
  if (phone.length === 0) {
    errors.push({
      id: 'phone',
      message: 'Phone cannot be blank',
      hint: 'Enter your phone number'
    })
  } else if (!phone.match(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)) {
    errors.push({
      id: 'phone',
      message: 'Phone number is not valid',
      hint: 'Enter your phone number using just numbers'
    })
  }
  if (email.length === 0) {
    errors.push({
      id: 'email',
      message: 'Email cannot be blank',
      hint: 'Enter your email address'
    })
  } else if (!email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) {
    errors.push({
      id: 'email',
      message: 'Email is not valid',
      hint: 'Enter your email in the format: john@doe.com'
    })
  }

  if (address.length === 0) {
    errors.push({
      id: 'address',
      message: 'Address cannot be blank',
      hint: 'Enter your address'
    })
  }
  return errors
}

module.exports = router
