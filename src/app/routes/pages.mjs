'use-strict'

import events from '../data/events.mjs'
import articles from '../data/news-articles.mjs'
import attendAsAVendor from './attend-as-a-vendor/_all.mjs'
import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.render('pages/home/template.njk')
})

router.get('/press', (req, res) => {
  res.render('pages/press/template.njk', { articles })
})

router.get('/sitemap', (req, res) => {
  res.render('pages/sitemap/template.njk', { events, articles })
})

router.get('/events/:id', (req, res) => {
  const id = req.params.id
  const event = events.all.find(x => x.id === id)
  const filteredArticles = articles.filter(x => event.articles.includes(x.id))
  res.render('pages/event/template.njk', { event, articles: filteredArticles })
})

// Routes for WebForm
router.use(attendAsAVendor)

router.get('*', (req, res) => {
  res.status(404)
  res.render('layouts/404.njk')
})

export default router
