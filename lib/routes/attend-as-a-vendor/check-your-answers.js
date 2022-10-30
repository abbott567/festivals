'use-strict'

const express = require('express')

const router = express.Router()
const sendEmail = require('../../email/mailer')

// Check your answers
router.get('/attend-as-a-vendor/check-your-answers', (req, res) => {
  // Set variables
  const start = '/attend-as-a-vendor/about-your-business'
  // If the business details have not been completed
  if (req.session.data.business === undefined) {
    console.warn('req.session.data.business was not defined when checking answers')
    return res.redirect(start)
  } else if (req.session.data.owner === undefined) {
    // If the contact details have not been completed
    console.warn('req.session.data.owner was not defined when checking answers')
    return res.redirect(start)
  } else if (req.session.data.eventsAttending === undefined) {
    // If there are no events being attended
    console.warn('req.session.data.eventsAttending was not defined when checking answers')
    return res.redirect(start)
  } else {
    // If everything has been filled out, render the page
    res.render('pages/attend-as-a-vendor/check-your-answers/template.njk')
  }
})
// const templateHTML = '../../../src/views/emails/template-html.njk'

const nunjucks = require('nunjucks')

router.post('/attend-as-a-vendor/check-your-answers', async (req, res) => {
  const data = req.session.data
  const text = nunjucks.render('emails/template-text.njk', { data })
  const html = nunjucks.render('emails/template-html.njk', { data })
  const customerEmail = data.owner.email
  const festivalEmail = process.env.FESTIVAL_EMAIL
  const recipients = `${customerEmail}, ${festivalEmail}`
  const emailed = await sendEmail(recipients, text, html)
  if (emailed) {
    req.session.success = true
    return res.redirect('/attend-as-a-vendor/success')
  } else {
    const errors = [{
      id: 'email-failed',
      message: 'Your email didn\'t send. Try again or call us on 0771111111',
      hint: 'Try again or call us on 0741111111'
    }]
    return res.render('pages/attend-as-a-vendor/check-your-answers/template.njk', { errors })
  }
})

module.exports = router
