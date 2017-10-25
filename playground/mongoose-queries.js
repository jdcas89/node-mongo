const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo");
const { User } = require("./../server/models/user");
const { ObjectID } = require("mongodb");

// var id = "59d8a4d8c864fa51d6764f21"
var userId = "59d5c48c94e1572c12040fb9";
// if(!ObjectID.isValid(id)){
//   console.log('ID is not valid')
// }

//Finds all according to query
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todo', todos)
// })

// //Finds first one according to query
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   if(!todo){
//     return console.log('Id not found')
//   }
//   console.log('Todo', todo)
// })

// Todo.findById(id).then((todo) => {
//   if(!todo){
//     return console.log('Id not found')
//   }
//   console.log('Todo by Id', todo)
// }).catch((err) => {
//   console.log(err)
// })

User.findById(userId)
  .then(user => {
    if (!user) {
      return console.log("User not found");
    }
    console.log("User", JSON.stringify(user, undefined, 2));
  })
  .catch(err => {
    console.log(err);
  });
