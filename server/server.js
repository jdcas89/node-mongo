require('./config/config')
var express = require('express')
var bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')
var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo')
var {User} = require('./models/user')
var { authenticate } =  require('./middelware/authenticate')
const _ = require('lodash')

const port = process.env.PORT

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


app.delete('/todos/:id', (req, res) => {
  const id = req.params.id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }


  Todo.findByIdAndRemove(id).then((todo) => {
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


app.patch('/todos/:id', (req, res) => {
  const id = req.params.id
  const body = _.pick(req.body,['text','completed'])
  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime()
  }else{
    body.completed = false
    body.completedAt = null
  }

  Todo.findByIdAndUpdate(id, {$set:body}, {new : true}).then((todo) => { 
    if(!todo){
      res.status(404).send()
    }

    res.send({todo})

  }).catch((e) => {
    res.status(400).send()
  })

})



//User


app.post('/users', (req, res) => {
  var body = _.pick(req.body,['email','password'])

  var user = new User(body)


  user.save().then(() => {
    return user.generateAuthToken()
  }).then((token) => {
    res.header('x-auth', token).send(user)
  }).catch((err) => {
    res.status(400).send(err)
  })
})




app.get('/users/me', authenticate, (req, res) => {
 res.send(req.user)
})


app.listen(port, () => {
  console.log(`Started server on port ${ port }`)
})

module.exports = {
  app
}