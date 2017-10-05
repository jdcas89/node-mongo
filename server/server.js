var mongoose = require('mongoose')
const dbName = 'TodoApp'
const mongoUrl = `mongodb://localhost:27017/${dbName}`

//uses default promise library
mongoose.Promise = global.Promise

mongoose.connect(mongoUrl)

var Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt:{
    type: Number
  }
})

var newTodo = new Todo({
  text: 'Cook lunch'
})

newTodo.save().then((doc) => {
  console.log('Saved todo', JSON.stringify(doc, undefined, 2))
}, (error) =>{
  console.log('Unable to save todo')
})

var otherTodo = new Todo({
  text: 'Get groceries',
  completed: false,
  completedAt: 123
})

otherTodo.save().then((doc) => {
  console.log('Saved todo', JSON.stringify(doc, undefined, 2))
}, (error) =>{
  console.log('Unable to save todo')
})