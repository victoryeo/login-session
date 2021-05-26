const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const redis = require('redis')
const session = require('express-session')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
require('./app/models/Users')
require('./passport-config')
const index   = require('./app/routes/index')
const passport = require('passport')

let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient()

//Configure Mongoose
mongoose.connect('mongodb://localhost/passport-tutorial',
  {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('debug', true);
mongoose.promise = global.Promise

const app = express()
const port = 8080

function logErrors (err, req, res, next) {
  //console.error(`vic ${err.stack}`)
  next(err)
}

function errorHandler (err, req, res, next) {
  res.status(500).send({ status: 0, error: err })
  next(err)
}

//app.get('/', (req, res) => res.send('Hello World!'))

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(bodyParser.text() )
app.use(bodyParser.json() )
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', index)

app.use(session({
  secret: 'hiddensecret',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false ,
  store: new RedisStore({client: redisClient, ttl: 86400})
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(methodOverride())
app.use(logErrors)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Customer app listening on port ${port}!`)
})

module.export = app
