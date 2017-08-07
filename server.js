const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const expressValidator = require('express-validator')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(expressValidator())
app.use(express.static('public'))
app.use(expressSession({secret: 'max', saveUninitialized: false, resave: false}))

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

app.get('/login', (req, res) => {
  res.render('login')
})

app.post('/login', (req, res, err) => {
  const login = req.session.login

  res.redirect('/')
})

app.post('/loginSubmit', (req, res, err) => {
  const auth = {
    "email": "justin@gmail.com",
    "password": "password"
  }
  const input = {
    "email": req.body.email,
    "password": req.body.password
  }
  req.session.login = input
  if (req.session.login) {
    res.redirect('/')
  } else {
    res.render('login')
  }
})

const checkAuthenication = (req, res, next) => {
  if (req.session.login) {
    next()
  } else {
    res.redirect('login')
  }
}
app.use(checkAuthenication)

app.get('/', (req, res) => {
  const todoList = req.session.todoList || []
  const templateData = {
    uncompleted: todoList.filter(todo => !todo.completed),
    completed: todoList.filter(todo => todo.completed),
    anyItem: todoList.length > 0
  }

  res.render('home', templateData)
})

app.post('/addTodo', (req, res) => {
  const todoList = req.session.todoList || []
  const newTodoDescript = req.body.description
  //todoList.push(newTodoDescript)
  todoList.push({
    id: todoList.length + 1,
    completed: false,
    description: newTodoDescript
  })

  req.session.todoList = todoList
  res.redirect('/')
})

app.post('/markComplete', (req, res) => {
  const todoList = req.session.todoList || []
  const id = parseInt(req.body.id)
  const todo = todoList.find(todo => todo.id === id)

  if (todo) {
    todo.completed = true
    req.session.todoList = todoList
  }
  res.redirect('/')
})

app.listen(3000, () => {
  console.log('Listening over level 3000!')
})
