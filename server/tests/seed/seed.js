const {
  ObjectID
} = require('mongodb')
const jwt = require('jsonwebtoken')
const {
  Todo
} = require('./../../models/todo')
const {
  User
} = require('./../../models/user')

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const todos = [{
    _id: new ObjectID(),
    text: "test todo"
  },
  {
    _id: new ObjectID(),
    text: "second todo"
  },
  {
    _id: new ObjectID(),
    text: "third todo"
  }
]

const users = [{
    _id: userOneId,
    email: 'test@test.com',
    password: '12345678',
    tokens: [{
      access: 'auth',
      token: jwt.sign({
        _id: userOneId,
        access: 'auth'
      }, 'somesecretvalue').toString()
    }]
  },
  {
    _id: userTwoId,
    email: 'two@test.com',
    password: '87654321'
  }
]

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    Todo.insertMany(todos)
  }).then(() => done())
}

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save()
    var userTwo = new User(users[1]).save()

    return Promise.all([userOne, userTwo])
  }).then(() => {
    done()
  })
}

module.exports = {
  todos,
  populateTodos,
  users,
  populateUsers
}