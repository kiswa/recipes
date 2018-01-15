let models = require('../models')
let express = require('express')
let router = express.Router()

router.get('/', (req, res) => {
  models.Recipe.findAll({ include: [models.Recipe.Ingredient] }).then(
    recipes => {
      res.json(recipes)
    }
  )
})

router.post('/', (req, res) => {
  models.Recipe.create(req.body, {
    include: [{ model: models.Ingredient }]
  })
    .then(() => {
      res.json({ message: 'success' })
    })
    .catch(errors => {
      res.json({ message: 'error', errors: errors.errors })
    })
})

router.get('/:id', (req, res) => {
  models.Recipe.findById(req.params.id).then(recipe => {
    res.json(recipe)
  })
})

module.exports = router
