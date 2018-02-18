let express = require('express')
let bodyParser = require('body-parser')
let compression = require('compression')

let models = require('./models')
let routes = require('./routes/index')
let recipes = require('./routes/recipes')

let app = express()

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers",
             "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")

  next()
})

app.use(bodyParser.json())
app.use(compression())

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
