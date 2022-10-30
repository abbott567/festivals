'use-strict'

const express = require('express')
const router = express.Router()

router.get(/\.html?$/i, function (req, res) {
  let path = req.path
  const parts = path.split('.')
  parts.pop()
  path = parts.join('.')
  res.redirect(path)
})

// router.get('*', function (req, res, next) {
//   res.status(404)
//   const err = {
//     heading: 'Something has gone wrong',
//     message: `
//       The page you were looking for is not here. Go <a href="/">Home</a>.
//     `
//   }
//   res.render('layouts/error.njk', { err })
// })

module.exports = router
