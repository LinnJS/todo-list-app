const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const jsonfile = require('jsonfile')
const expressSession = require('express-session')
const expressValidator = require('express-validator')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(expressValidator())
app.use(express.static('public'))
app.use(expressSession({secret: 'max', saveUninitialized: true, resave: false}))

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

// app.get("/login", (req, res) => {
//   // display the form to login
//   res.render('login')
//
// })
// app.post("/login" (req, res) => {
//   // set session
//
//   //redirect to /
//   res.redirect('/')
// })
//
// const checkAuthenication = (req, res, next) => {
//   if (req.session.username) {
//     next()
//   } else {
//     res.redirect("/login")
//   }
// }
//
// app.use(checkAuthenication)

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
  console.log('Listening level over level 3000!')
})
