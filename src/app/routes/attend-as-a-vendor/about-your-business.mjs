'use-strict'

function addToRoutes (router) {
  // About your business
  router.get('/attend-as-a-vendor/about-your-business', (req, res) => {
    res.render('pages/attend-as-a-vendor/about-your-business/template.njk')
  })

  router.post('/attend-as-a-vendor/about-your-business', (req, res) => {
    // Validate req.body
    const errors = validate(req.body)
    if (errors.length > 0) {
      // If there are errors re-render and show errors
      return res.render('pages/attend-as-a-vendor/about-your-business/template.njk', { errors })
    } else {
      // Create the session data
      Object.assign(req.session.data, req.body)
      // Move to which events
      return res.redirect('/attend-as-a-vendor/which-events')
    }
  })
}

function validate (data) {
  const errors = []
  const name = data.business['exhibitor-name']
  const typeOfProducts = data.business['type-of-products']
  if (name.length === 0) {
    errors.push({
      id: 'exhibitor-name',
      message: 'Exhibitor name cannot be blank',
      hint: 'Enter an exhibitor name'
    })
  }
  if (typeOfProducts.length === 0) {
    errors.push({
      id: 'type-of-products',
      message: 'Type of products cannot be blank',
      hint: 'Enter the type of products you sell'
    })
  }
  return errors
}

export default addToRoutes
