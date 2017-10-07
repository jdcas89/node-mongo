var express = require('express')
var bodyParser = require('body-parser')
const {
  ObjectID
} = require('mongodb')
var {
  mongoose
} = require('./db/mongoose')
var {
  Todo
} = require('./models/todo')
var {
  User
} = require('./models/user')

const port = process.env.PORT || 3000

var app = express()
app.use(bodyParser.json())

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  })

  todo.save().then((doc) => {
    res.send(doc)
  }, (err) => {
    res.status(400).send(err)
  })
})

app.get('/todos', (req, res) => {

  Todo.find().then((todos) => {
    res.send({
      todos
    })
  }, (err) => {
    res.status(400).send(err)
  });
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }


  Todo.findById(id).then((todo) => {
    if(!todo){
      return res.status(404).send({})
    }
    res.send({
      todo
    })
  }, (err) => {
    res.status(400).send()
  });
})


app.listen(port, () => {
  console.log(`Started server on port ${ port }`)
})

module.exports = {
  app
}