'use-strict'

const express = require('express')

const router = express.Router()

// Success
router.get('/attend-as-a-vendor/success', (req, res) => {
  // Set variables
  const start = '/attend-as-a-vendor/about-your-business'
  // If the session exists already
  if (!req.session.success) {
    console.warn('req.session was not true when viewing success page')
    return res.redirect(start)
  } else {
    req.session.destroy()
    return res.render('pages/attend-as-a-vendor/success/template.njk')
  }
})

module.exports = router
