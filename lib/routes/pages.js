'use-strict'

const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.render('pages/home/template.njk')
})

const events = require('../data/events')
const newsArticles = require('../data/news-articles')
router.get('/events/:id', (req, res) => {
  const id = req.params.id
  const event = events.find(x => x.id === id)
  const articles = newsArticles.filter(x => event.articles.includes(x.id))
  res.render('pages/event/template.njk', { event, articles })
})

const attendAsAVendor = require('./attend-as-a-vendor/_all')
router.use(attendAsAVendor)

module.exports = router
