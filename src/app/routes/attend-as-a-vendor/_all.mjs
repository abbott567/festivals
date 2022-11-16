'use-strict'

import express from 'express'
import success from './success.mjs'
import aboutYourBusiness from './about-your-business.mjs'
import yourContactDetails from './your-contact-details.mjs'
import checkYourAnswers from './check-your-answers.mjs'
import whichEvents from './which-events.mjs'
import whatIsYourSetup from './what-is-your-setup.mjs'

const router = express.Router()

router.get('/attend-as-a-vendor', (req, res) => {
  res.redirect('/attend-as-a-vendor/about-your-business')
})

// Append other routes
aboutYourBusiness(router)
success(router)
yourContactDetails(router)
checkYourAnswers(router)
whichEvents(router)
whatIsYourSetup(router)

export default router
