let express = require('express')
let router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Nothing to see here'
  })
})

module.exports = router
