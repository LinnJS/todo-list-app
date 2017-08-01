const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const jsonfile = require('jsonfile')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

const todoList = []
const completedList = []

app.get('/', (req, res) => {
  const templateData = {
    uncompleted: todoList.filter(todo => !todo.completed),
    completed: completedList
  }

  res.render('home', templateData)
})

app.post('/addTodo', (req, res) => {
  const newTodoDescript = req.body.description

  todoList.push(newTodoDescript)
  res.redirect('/')
})

app.post('/markComplete', (req, res) => {
  const description = req.body.description
  completedList.push(description)

  const indexOfItem = todoList.indexOf(description)

  todoList.splice(indexOfItem, 1)
  res.redirect('/')
})

app.listen(3000, () => {
  console.log('Listening level over level 3000!')
})
