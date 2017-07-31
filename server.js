const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const jsonfile = require('jsonfile')
const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

// make a new jsonfile, give it a filename and an object template as arguments
// delete static lists, templateData, and the jsonfile.writeFile we just made.
// change our gets and posts to use the new jsonfile instead of the static lists.

const todoList = ['Fix car', 'Meal prep', 'Bring meal']
const completedList = ['Wait for rain to stop', 'Fix Angel\'s phone']

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
