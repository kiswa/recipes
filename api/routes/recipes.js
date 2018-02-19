let models = require('../models')
let express = require('express')
let router = express.Router()

router.get('/', (req, res) => {
  models.recipe.findAll({
    attributes: [
      'id', 'category', 'name', 'prepTime', 'cookTime', 'description', 'image'
    ]
  })
  .then(recipes => {
    res.json(recipes)
  })
})

router.post('/', (req, res) => {
  models.recipe.create(req.body, {
    include: [models.recipe.Ingredients]
  })
  .then(recipe => {
    res.json({ message: 'success', name: recipe.name })
  })
  .catch(errors => {
    res.json({ message: 'error', errors: errors.errors })
  })
})

router.put('/', (req, res) => {
  models.recipe.findById(req.body.id, {
    include: [models.recipe.Ingredients]
  })
  .then(recipe => {
    recipe = Object.assign(recipe, req.body)
    return recipe.save()
  })
  .then(() => {
    res.json({ message: 'success', name: req.body.name })
  })
})

router.get('/:id', (req, res) => {
  models.recipe.findById(req.params.id, {
    include: [models.recipe.Ingredients]
  })
  .then(recipe => {
    res.json(recipe)
  })
})

router.delete('/:id', (req, res) => {
  models.recipe.findById(req.params.id, {
    include: [models.recipe.Ingredients]
  })
  .then(recipe => {
    return recipe.destroy()
  })
  .then(() => {
    res.json({ message: 'success' })
  })
})

module.exports = router
