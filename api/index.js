let express = require('express')

let models = require('./models')
let routes = require('./routes/index')
let recipes = require('./routes/recipes')

let app = express()

app.use('/', routes)
app.use('/recipes', recipes)

app.use((req, res, next) => {
  let err = new Error('Invalid Endpoint')
  err.status = 404

  next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  })
})

models.sequelize.sync().then(() => {
  app.listen(3000)
  console.log('Listening at http://localhost:3000')
})
