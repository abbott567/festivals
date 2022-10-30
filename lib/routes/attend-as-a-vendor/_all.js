'use-strict'

const express = require('express')

const router = express.Router()

router.get('/attend-as-a-vendor', (req, res) => {
  res.redirect('/attend-as-a-vendor/about-your-business')
})

router.use(require('./success'))
router.use(require('./about-your-business'))
router.use(require('./your-contact-details'))
router.use(require('./check-your-answers'))
router.use(require('./which-events'))
router.use(require('./what-is-your-setup'))

module.exports = router
