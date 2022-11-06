'use-strict'

const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.render('pages/home/template.njk')
})

const attendAsAVendor = require('./attend-as-a-vendor/_all')
router.use(attendAsAVendor)

module.exports = router
