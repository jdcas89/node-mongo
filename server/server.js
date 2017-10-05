var mongoose = require('mongoose')
const dbName = 'TodoApp'
const mongoUrl = `mongodb://localhost:27017/${dbName}`

//uses default promise library
mongoose.Promise = global.Promise

mongoose.connect(mongoUrl)


//Mongoose validators
//Mongoose schemas
// var Todo = mongoose.model('Todo', {
//   text: {
//     type: String,
//     required: true,
//     minlength:1,
//     trim: true
//   },
//   completed: {
//     type: Boolean,
//     default:false
//   },
//   completedAt:{
//     type: Number,
//     default: null
//   }
// })

// var newTodo = new Todo({
//   text: 'Cook lunch'
// })

// newTodo.save().then((doc) => {
//   console.log('Saved todo', JSON.stringify(doc, undefined, 2))
// }, (error) =>{
//   console.log('Unable to save todo')
// })

// var otherTodo = new Todo({
//   text: 'Get groceries',
//   completed: false,
//   completedAt: 123
// })

// otherTodo.save().then((doc) => {
//   console.log('Saved todo', JSON.stringify(doc, undefined, 2))
// }, (error) =>{
//   console.log('Unable to save todo')
// })



var User = mongoose.model('User', {
  email: {
    type:String,
    required:true,
    trim:true,
    minlength:1
  }
})

var newUser = new User({
  email:'test@test.com'
})

newUser.save().then((doc) =>{
  console.log('Saved new User', doc)
}, (err) =>{
  console.log('Unable to save user')
})