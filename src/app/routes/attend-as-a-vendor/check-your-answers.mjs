'use-strict'

import sendEmail from '../../email/mailer.mjs'

function addToRoutes (router) {
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
  router.post('/attend-as-a-vendor/check-your-answers', async (req, res) => {
    const emailResult = await sendEmail(req)
    if (emailResult === 'success') res.redirect('/attend-as-a-vendor/success')
    else res.render('pages/attend-as-a-vendor/check-your-answers/template.njk', { errors: emailResult })
  })
}

export default addToRoutes
