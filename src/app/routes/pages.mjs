'use-strict'

import events from '../data/events.mjs'
import newsArticles from '../data/news-articles.mjs'
import attendAsAVendor from './attend-as-a-vendor/_all.mjs'
import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.render('pages/home/template.njk')
})

router.get('/events/:id', (req, res) => {
  const id = req.params.id
  const event = events.find(x => x.id === id)
  const articles = newsArticles.filter(x => event.articles.includes(x.id))
  res.render('pages/event/template.njk', { event, articles })
})

router.use(attendAsAVendor)

export default router