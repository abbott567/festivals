'use-strict'

const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.render('pages/home/template.njk')
})

const events = require('../data/events')
router.get('/events/:id', (req, res) => {
  const id = req.params.id
  const event = events.find(x => x.id === id)
  res.render('pages/event/template.njk', { event })
})

const attendAsAVendor = require('./attend-as-a-vendor/_all')
router.use(attendAsAVendor)

module.exports = router
