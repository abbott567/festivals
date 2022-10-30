'use-strict'

const express = require('express')

const router = express.Router()
const events = require('../data/events')

router.get('/', (req, res) => {
  res.render('pages/home/template.njk', { events })
})

const attendAsAVendor = require('./attend-as-a-vendor/_all')
router.use(attendAsAVendor)

module.exports = router
