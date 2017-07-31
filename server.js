const express = require('express')
const app = express()

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

  app.get ('/', (req, res) => {
    res.send('Hello world')

  res.render('homepage')
  })

app.listen(3000, () => {
  console.log('Listening level over level 3000!')
})
