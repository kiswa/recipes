let models = require('../models')
let express = require('express')
let router = express.Router()

router.get('/', (req, res) => {
  models.recipe.findAll({ include: [models.ingredient] })
    .then(recipes => {
      res.json(recipes)
    })
})

router.post('/', (req, res) => {
  models.recipe.create(req.body, {
    include: [models.recipe.Ingredients]
  })
    .then(() => {
      res.json({ message: 'success' })
    })
    .catch(errors => {
      res.json({ message: 'error', errors: errors.errors })
    })
})

router.get('/:id', (req, res) => {
  models.recipe.findById(req.params.id).then(recipe => {
    res.json(recipe)
  })
})

module.exports = router
