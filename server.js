const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const session = require('express-session')

const app = express()

app.use(session({
  secret: 'AirportTry',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors({
  credentials: true,
  origin: 'http://localhost:8080'
}))

const path = require('path')
app.use(express.static(path.join(__dirname, 'dist/')))

let users = [
  { username: `Airport`, password: `MyAir`, panier: [] }
]
app.post('/api/login', (req, res) => {
  const user = users.find(u => u.username === req.body.username && u.password === req.body.password)
  if (!user) {
    res.json({
      message: `error`,
      error: `On ne vous connait pas`
    })
  } else {
    res.json({
      message: `connection`,
      connect: true
    })
  }
})
app.post('/api/panier/ajouter', (req, res) => {
  users[0].panier.push(req.body.avion)
})
app.post('/api/panier/supprimer', (req, res) => {
  let tmp = []
  for (let i = 0; i < req.body.id; i++) {
    tmp.push(users[0].panier[i])
  }
  for (let i = req.body.id + 1; i < users[0].panier.length; i++) {
    tmp.push(users[0].panier[i])
  }
  users[0].panier = tmp

  res.json({
    data: users[0].panier
  })
})
app.get('/api/panier', (req, res) => {
  res.json({
    data: users[0].panier
  })
})
app.get('/api/test', (req, res) => {
  res.json({
    message: users[0].panier
  })
})
const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
