let models = require('../models')
let express = require('express')
let router = express.Router();

router.get('/', (req, res) => {
  models.Recipe.findAll().then(recipes => {
    res.json(recipes)
  })
})

module.exports = router;
